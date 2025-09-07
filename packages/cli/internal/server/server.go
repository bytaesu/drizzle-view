package server

import (
	"context"
	"embed"
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

// Server handles the web server operations
type Server struct {
	DistFS  embed.FS
	tempDir string
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
