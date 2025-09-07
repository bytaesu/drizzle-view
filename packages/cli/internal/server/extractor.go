package server

import (
	"io/fs"
	"os"
	"path/filepath"
)

func (s *Server) extractDistFiles() (string, error) {
	tempDir, err := os.MkdirTemp("", "drizzle-view-*")
	if err != nil {
		return "", err
	}

	distFiles, err := fs.Sub(s.DistFS, "out")
	if err != nil {
		return "", err
	}

	err = fs.WalkDir(distFiles, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		destPath := filepath.Join(tempDir, path)

		if d.IsDir() {
			return os.MkdirAll(destPath, 0755)
		}

		data, err := fs.ReadFile(distFiles, path)
		if err != nil {
			return err
		}

		return os.WriteFile(destPath, data, 0644)
	})

	return tempDir, err
}
