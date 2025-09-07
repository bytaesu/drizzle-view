package main

import (
	"embed"
	"fmt"
	"os"

	"github.com/bytaesu/drizzle-view/cmd"
)

//go:embed out/*
var distFS embed.FS

func main() {
	rootCmd := cmd.NewRootCmd(distFS)
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
