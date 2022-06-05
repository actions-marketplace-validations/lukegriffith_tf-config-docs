package main

import (
	"flag"
	"log"

	"github.com/hashicorp/terraform-config-inspect/tfconfig"

	"github.com/lukegriffith/tf-config-docs/internal/cli"
	"github.com/lukegriffith/tf-config-docs/internal/renderer"
)

func main() {

	var modulePath, outputPath string

	flag.StringVar(&modulePath, "modulePath", "", "Path to terrafrom module, or root.")
	flag.StringVar(&outputPath, "outputPath", "", "Path to output folder.")
	flag.Parse()

	if len(modulePath) == 0 || len(outputPath) == 0 {
		log.Fatal("Provided argumetns not acceptable")
	}

	dirs := []cli.Directory{
		{Path: modulePath, Recurse: true},
	}
	c := cli.Config{
		Directories: dirs,
		OutputPath:  outputPath,
	}
	paths := renderer.GetModulePaths(c)
	for path, _ := range paths {
		module, _ := tfconfig.LoadModule(path)
		renderer.OutputModule(path, module, c.OutputPath)
	}
	renderer.OutputIndex(paths, c.OutputPath)
}
