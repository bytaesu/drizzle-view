package server

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func (s *Server) startNextServer(ctx context.Context, distPath string, port int) error {
	// Find node/npm
	nodeCmd := findNodeCommand()
	if nodeCmd == "" {
		return fmt.Errorf("node.js not found. Please install Node.js")
	}

	// Check if it's a static export or needs `next` server
	serverJsPath := filepath.Join(distPath, "server.js")
	if _, err := os.Stat(serverJsPath); os.IsNotExist(err) {
		// Static export - serve with simple HTTP server
		return s.serveStatic(ctx, distPath, port)
	}

	// Start `next` server
	cmd := exec.CommandContext(ctx, nodeCmd, "server.js")
	cmd.Dir = distPath
	cmd.Env = append(os.Environ(),
		fmt.Sprintf("PORT=%d", port),
		fmt.Sprintf("DRIZZLE_STUDIO_URL=%s", os.Getenv("DRIZZLE_STUDIO_URL")),
		fmt.Sprintf("DRIZZLE_VISUALIZER_URL=%s", os.Getenv("DRIZZLE_VISUALIZER_URL")),
	)

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		return err
	}

	// Health check
	if err := s.waitForServer(ctx, port); err != nil {
		cmd.Process.Kill()
		return err
	}

	// Open browser
	if err := openBrowser(fmt.Sprintf("http://localhost:%d", port)); err != nil {
		fmt.Printf("Warning: Could not open browser: %v\n", err)
	}

	return cmd.Wait()
}

func findNodeCommand() string {
	commands := []string{"node", "nodejs"}
	for _, cmd := range commands {
		if _, err := exec.LookPath(cmd); err == nil {
			return cmd
		}
	}
	return ""
}
