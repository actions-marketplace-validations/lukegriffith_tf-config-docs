package renderer

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"

	"github.com/hashicorp/terraform-config-inspect/tfconfig"
)

// Render takes a config object and attempts to render
// the data output for the given configuration.
// No return is given besides an error, if no errors is
// returned it can be assumed the rendering is successful.
func Render(c Config) error {
	paths := getModulePaths(c)
	for path, _ := range paths {
		module, _ := tfconfig.LoadModule(path)
		err := outputModule(path, module, c.OutputPath)
		if err != nil {
			return err
		}
	}
	err := outputIndex(paths, c.OutputPath)
	if err != nil {
		return err
	}
	return nil
}

func outputModule(dir string, module *tfconfig.Module, outputPath string) error {
	fileName := hashPath(dir)
	file, err := json.Marshal(module)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(formatOutputPath(outputPath, fileName), file, 0644)
	if err != nil {
		return err
	}
	return nil
}

func outputIndex(path map[string]string, outputPath string) error {

	type Pair struct {
		Module string
		Root   string
	}

	index := map[string]Pair{}
	for k, v := range path {
		index[hashPath(k)] = Pair{k, v}
	}
	file, err := json.Marshal(index)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(formatOutputPath(outputPath, "index"), file, 0644)
	if err != nil {
		return err
	}
	return nil
}

func formatOutputPath(outPath string, path string) string {
	return fmt.Sprint(outPath, "/", path)
}

func hashPath(path string) string {
	h := sha1.New()
	h.Write([]byte(path))
	sha1_hash := hex.EncodeToString(h.Sum(nil))
	return sha1_hash
}
