package cli

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/lukegriffith/tf-config-docs/internal/renderer"
)

const (
	RELATIVE_FRIENDLY_NAME = "WORKDIR_FRIENDLY_NAME"
)

func Config() renderer.Config {
	var modulePath, outputPath string
	var recurse, loadRelativeEnvName bool

	flag.StringVar(&modulePath, "modulePath", "", "Path to terrafrom module, or root.")
	flag.StringVar(&outputPath, "outputPath", "", "Path to output folder.")
	flag.BoolVar(&recurse, "recurse", false,
		"Specify if the directory should be recursively searched for terraform modules")
	flag.BoolVar(&loadRelativeEnvName, "loadEnvName", false, fmt.Sprintf(`
	Typically in CI, a git repository will be checked out as the working directory
	this parameter loads the relative . directory friendly name via $%s
	`, RELATIVE_FRIENDLY_NAME))
	flag.Parse()

	if len(modulePath) == 0 || len(outputPath) == 0 {
		log.Fatal("Provided argumetns not acceptable")
	}

	var friendlyName string

	if loadRelativeEnvName {
		friendlyName = os.Getenv(RELATIVE_FRIENDLY_NAME)
	}

	dirs := []renderer.Directory{
		{Path: resolvePath(modulePath, friendlyName), Recurse: recurse},
	}
	c := renderer.Config{
		Directories: dirs,
		OutputPath:  outputPath,
	}
	return c
}

func resolvePath(path string, friendlyName string) string {
	const relativeDot = "."
	if relativeDot == path {
		if friendlyName == "" {
			return friendlyName
		}
		p, err := filepath.Abs(path)
		if err != nil {
			log.Fatal(err)
		}
		return p
	}
	return path
}
