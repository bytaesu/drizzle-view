package cmd

import (
	"embed"
	"fmt"
	"os"
	"strconv"

	"github.com/bytaesu/drizzle-view/internal/console"
	"github.com/bytaesu/drizzle-view/internal/server"
	"github.com/spf13/cobra"
)

var (
	studioUrl     string
	visualizerUrl string
	port          int
)

// NewRootCmd creates the root command
func NewRootCmd(distFS embed.FS) *cobra.Command {
	rootCmd := &cobra.Command{
		Use:   "drizzle-view",
		Short: "Unified interface for Drizzle Studio and Drizzle Visualizer",
		Long: `
Drizzle View provides a unified web interface to access both 
Drizzle Studio and Drizzle Visualizer in a single application.

You can customize the URLs for your Drizzle Studio and Visualizer instances,
and specify the port for the web interface.
`,
		Example: `
# Start with default settings
  drizzle-view

# Use custom URLs
  drizzle-view --studio http://localhost:1234 --visualizer http://localhost:5678

# Use custom port
  drizzle-view --port 7777
`,
		Run: func(cmd *cobra.Command, args []string) {
			startServer(distFS)
		},
	}

	rootCmd.Flags().StringVarP(&studioUrl, "studio", "s", "http://local.drizzle.studio", "Drizzle Studio URL")
	rootCmd.Flags().StringVarP(&visualizerUrl, "visualizer", "v", "http://localhost:64738", "Drizzle Visualizer URL")
	rootCmd.Flags().IntVarP(&port, "port", "p", 3333, "Web interface port")

	return rootCmd
}

func startServer(distFS embed.FS) {
	// Show banner
	console.ShowBanner()

	// Set environment variables for Next.js
	os.Setenv("DRIZZLE_STUDIO_URL", studioUrl)
	os.Setenv("DRIZZLE_VISUALIZER_URL", visualizerUrl)
	os.Setenv("PORT", strconv.Itoa(port))

	// Show server info
	console.ShowServerInfo(port, studioUrl, visualizerUrl)

	// Start server
	srv := server.New(distFS)
	if err := srv.Start(port); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to start server: %v\n", err)
		os.Exit(1)
	}
}
