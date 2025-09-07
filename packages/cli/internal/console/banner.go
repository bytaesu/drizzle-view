package console

import (
	"github.com/fatih/color"
)

// ShowBanner displays the application banner
func ShowBanner() {
	green := color.New(color.FgGreen, color.Bold)
	banner := `
┌─────────────────────────────┐
│                             │
│        Drizzle View         │
│                             │
└─────────────────────────────┘
`

	green.Println(banner)
}
