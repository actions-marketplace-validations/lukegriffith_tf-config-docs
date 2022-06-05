package main

import (
	"github.com/hashicorp/terraform-config-inspect/tfconfig"

	"github.com/lukegriffith/tf-config-docs/internal/cli"
	"github.com/lukegriffith/tf-config-docs/internal/renderer"
)

func main() {
	dirs := []cli.Directory{
		{Path: "C:\\Users\\lukem\\Downloads\\terraform-aws-eks-master", Recurse: true},
	}
	c := cli.Config{
		Directories: dirs,
		OutputPath:  "C:\\Users\\lukem\\code\\tf-config-docs\\www\\data",
	}
	paths := renderer.GetModulePaths(c)
	for path, _ := range paths {
		module, _ := tfconfig.LoadModule(path)
		renderer.OutputModule(path, module, c.OutputPath)
	}
	renderer.OutputIndex(paths, c.OutputPath)
}
