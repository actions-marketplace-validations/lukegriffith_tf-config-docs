package main

import (
	"flag"
	"log"
	"path/filepath"

	"github.com/lukegriffith/tf-config-docs/internal/renderer"
)

func main() {
	var modulePath, outputPath string
	var recurse bool

	flag.StringVar(&modulePath, "modulePath", "", "Path to terrafrom module, or root.")
	flag.StringVar(&outputPath, "outputPath", "", "Path to output folder.")
	flag.BoolVar(&recurse, "recurse", false,
		"Specify if the directory should be recursively searched for terraform modules")
	flag.Parse()

	if len(modulePath) == 0 || len(outputPath) == 0 {
		log.Fatal("Provided argumetns not acceptable")
	}

	dirs := []renderer.Directory{
		{Path: resolvePath(modulePath), Recurse: recurse},
	}
	c := renderer.Config{
		Directories: dirs,
		OutputPath:  outputPath,
	}
	err := renderer.Render(c)
	if err != nil {
		log.Fatal(err)
	}

}

func resolvePath(path string) string {
	relativeDot := "."
	if relativeDot == path {
		p, err := filepath.Abs(path)
		if err != nil {
			log.Fatal(err)
		}
		return p
	}
	return path
}
