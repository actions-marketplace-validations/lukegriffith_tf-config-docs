package renderer

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/hashicorp/terraform-config-inspect/tfconfig"
)

func OutputModule(dir string, module *tfconfig.Module, outputPath string) {
	fileName := HashPath(dir)
	file, err := json.Marshal(module)
	if err != nil {
		log.Fatal(err)
	}
	err = ioutil.WriteFile(FormatOutputPath(outputPath, fileName), file, 0644)
	if err != nil {
		log.Fatal(err)
	}
}

func OutputIndex(path map[string]string, outputPath string) {

	type Pair struct {
		Module string
		Root   string
	}

	index := map[string]Pair{}
	for k, v := range path {
		index[HashPath(k)] = Pair{k, v}
	}
	file, err := json.Marshal(index)
	if err != nil {
		log.Fatal(err)
	}
	err = ioutil.WriteFile(FormatOutputPath(outputPath, "index"), file, 0644)
	if err != nil {
		log.Fatal(err)
	}
}

func FormatOutputPath(outPath string, path string) string {
	return fmt.Sprint(outPath, "/", path)
}

func HashPath(path string) string {
	h := sha1.New()
	h.Write([]byte(path))
	sha1_hash := hex.EncodeToString(h.Sum(nil))
	return sha1_hash
}
