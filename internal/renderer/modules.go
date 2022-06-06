package renderer

import (
	"log"
	"os"
	"path/filepath"

	"github.com/hashicorp/terraform-config-inspect/tfconfig"
)

func getModulePaths(config Config) map[string]string {
	paths := map[string]string{}

	for _, c := range config.Directories {
		if tfconfig.IsModuleDir(c.Path) {
			paths[c.Path] = c.Path
		}
		if c.Recurse {
			dirs, err := filePathWalkDir(c.Path)
			if err != nil {
				log.Fatal(err)
			}

			for _, d := range dirs {
				if tfconfig.IsModuleDir(d) {
					paths[d] = c.Path
				}
			}
		}

	}
	return paths
}

// https://stackoverflow.com/questions/14668850/list-directory-in-go
func filePathWalkDir(root string) ([]string, error) {
	var files []string
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			files = append(files, path)
		}
		return nil
	})
	return files, err
}
