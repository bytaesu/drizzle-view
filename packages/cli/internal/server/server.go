package server

import (
	"context"
	"embed"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

// Server handles the web server operations
type Server struct {
	DistFS  embed.FS
	tempDir string
}

// Config represents the configuration returned to the frontend
type Config struct {
	StudioURL     string `json:"studioUrl"`
	VisualizerURL string `json:"visualizerUrl"`
}

// New creates a new server instance
func New(distFS embed.FS) *Server {
	return &Server{
		DistFS: distFS,
	}
}

// Start starts the web server
func (s *Server) Start(port int) error {
	// Extract embedded files to temp directory
	tempDir, err := s.extractDistFiles()
	if err != nil {
		return fmt.Errorf("failed to extract files: %v", err)
	}
	s.tempDir = tempDir

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		sigChan := make(chan os.Signal, 1)
		signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
		<-sigChan
		fmt.Println("\nShutting down server...")
		cancel()
		s.Cleanup()
	}()

	// Start `next` server
	return s.startNextServer(ctx, tempDir, port)
}

// Cleanup cleans up temporary resources
func (s *Server) Cleanup() {
	if s.tempDir != "" {
		os.RemoveAll(s.tempDir)
		s.tempDir = ""
	}
}

// HandleConfig returns the current configuration as JSON
func (s *Server) HandleConfig(w http.ResponseWriter, r *http.Request) {
	config := Config{
		StudioURL:     os.Getenv("DRIZZLE_STUDIO_URL"),
		VisualizerURL: os.Getenv("DRIZZLE_VISUALIZER_URL"),
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	if err := json.NewEncoder(w).Encode(config); err != nil {
		http.Error(w, "Failed to encode config", http.StatusInternalServerError)
		return
	}
}
