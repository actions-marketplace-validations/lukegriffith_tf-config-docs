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

	var (
		resources resourceMap
		providers providerMap
		modules   moduleMap
	)

	resources = make(resourceMap)
	providers = make(providerMap)
	modules = make(moduleMap)

	outputData := output{c, make([]moduleData, 0), &resources, &providers, &modules}
	paths := getModulePaths(c)
	for path, root := range paths {
		module, _ := tfconfig.LoadModule(path)
		m := moduleData{path, hashPath(fmt.Sprint(root, path)), root, module}

		modules[m.Hash] = path
		for _, resource := range module.ManagedResources {
			if _, ok := resources[resource.Type]; !ok {
				resources[resource.Type] = make(stringSet)
			}
			resources[resource.Type][m.Hash] = exists{}
		}
		for _, provider := range module.ProviderConfigs {
			if _, ok := providers[provider.Name]; !ok {
				providers[provider.Name] = make(stringSet)
			}
			providers[provider.Name][m.Hash] = exists{}
		}
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
