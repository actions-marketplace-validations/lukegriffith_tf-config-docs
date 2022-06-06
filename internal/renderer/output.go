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

	outputData := output{c, make([]moduleData, 0)}
	paths := getModulePaths(c)
	for path, root := range paths {
		module, _ := tfconfig.LoadModule(path)
		m := moduleData{path, hashPath(fmt.Sprint(root, path)), root, module}
		outputData.Modules = append(outputData.Modules, m)
	}
	err := outputDataToFile(outputData)
	if err != nil {
		return err
	}
	return nil
}

func outputDataToFile(o output) error {

	file, err := json.Marshal(o)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(fmt.Sprint(o.Config.OutputPath, "/data.json"), file, 0644)
	if err != nil {
		return err
	}
	return nil
}

func hashPath(path string) string {
	h := sha1.New()
	h.Write([]byte(path))
	sha1_hash := hex.EncodeToString(h.Sum(nil))
	return sha1_hash
}
