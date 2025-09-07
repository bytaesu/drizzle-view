package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func (s *Server) serveStatic(ctx context.Context, distPath string, port int) error {
	// Create a custom handler to inject environment variables
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Handle index.html specially to inject environment variables
		if r.URL.Path == "/" || r.URL.Path == "/index.html" {
			s.handleIndexHTML(w, r, distPath)
			return
		}

		// Serve static files normally
		fileServer := http.FileServer(http.Dir(distPath))
		fileServer.ServeHTTP(w, r)
	})

	mux := http.NewServeMux()
	mux.Handle("/", handler)

	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: mux,
	}

	errChan := make(chan error, 1)
	go func() {
		errChan <- server.ListenAndServe()
	}()

	if err := s.waitForServer(ctx, port); err != nil {
		return err
	}

	// Open browser
	if err := openBrowser(fmt.Sprintf("http://localhost:%d", port)); err != nil {
		fmt.Printf("Warning: Could not open browser: %v\n", err)
	}

	select {
	case <-ctx.Done():
		// Handle shutdown
		shutdownCtx, cancel := context.WithTimeout(context.Background(), ShutdownTimeout)
		defer cancel()
		return server.Shutdown(shutdownCtx)
	case err := <-errChan:
		if err != nil && err != http.ErrServerClosed {
			return err
		}
		return nil
	}
}

func (s *Server) handleIndexHTML(w http.ResponseWriter, _ *http.Request, distPath string) {
	indexPath := filepath.Join(distPath, "index.html")

	data, err := os.ReadFile(indexPath)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Replace default values with provided values
	content := string(data)
	content = strings.ReplaceAll(content, "process.env.NEXT_PUBLIC_DRIZZLE_STUDIO_URL", fmt.Sprintf(`"%s"`, os.Getenv("DRIZZLE_STUDIO_URL")))
	content = strings.ReplaceAll(content, "process.env.NEXT_PUBLIC_DRIZZLE_VISUALIZER_URL", fmt.Sprintf(`"%s"`, os.Getenv("DRIZZLE_VISUALIZER_URL")))

	w.Header().Set("Content-Type", "text/html")
	w.Write([]byte(content))
}
