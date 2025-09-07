package console

import (
	"fmt"

	"github.com/fatih/color"
)

// ShowServerInfo displays server startup information
func ShowServerInfo(port int, studioUrl, visualizerUrl string) {
	green := color.New(color.FgGreen).SprintFunc()
	yellow := color.New(color.FgYellow).SprintFunc()

	fmt.Printf("=> Studio: %s\n", yellow(studioUrl))
	fmt.Printf("=> Visualizer: %s\n", yellow(visualizerUrl))
	fmt.Printf("=> Starting %s on %s\n", green("Drizzle View"), green(fmt.Sprintf("http://localhost:%d", port)))
	fmt.Println()
}
