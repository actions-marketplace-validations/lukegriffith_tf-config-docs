package main

import (
	"log"

	"github.com/lukegriffith/tf-config-docs/internal/cli"
	"github.com/lukegriffith/tf-config-docs/internal/renderer"
)

func main() {
	config := cli.Config()
	err := renderer.Render(config)
	if err != nil {
		log.Fatal(err)
	}
}
