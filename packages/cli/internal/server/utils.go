package server

import (
	"context"
	"fmt"
	"net/http"
	"os/exec"
	"runtime"
	"time"
)

const (
	MaxHealthCheckAttempts = 30
	HealthCheckInterval    = 1 * time.Second
	ShutdownTimeout        = 5 * time.Second
)

// waitForServer waits for the server to be ready by making health check requests
func (s *Server) waitForServer(ctx context.Context, port int) error {
	url := fmt.Sprintf("http://localhost:%d", port)
	client := &http.Client{Timeout: HealthCheckInterval}

	for i := 0; i < MaxHealthCheckAttempts; i++ {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		resp, err := client.Get(url)
		if err == nil {
			defer resp.Body.Close()
			return nil
		}

		time.Sleep(HealthCheckInterval)
	}

	return fmt.Errorf("server failed to start within %d seconds", MaxHealthCheckAttempts)
}

func openBrowser(url string) error {
	var cmd string
	var args []string

	switch runtime.GOOS {
	case "windows":
		cmd = "cmd"
		args = []string{"/c", "start"}
	case "darwin":
		cmd = "open"
	default: // "linux" ... and others
		cmd = "xdg-open"
	}
	args = append(args, url)

	return exec.Command(cmd, args...).Start()
}
