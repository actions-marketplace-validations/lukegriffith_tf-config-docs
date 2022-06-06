package renderer

type Directory struct {
	Path    string
	Recurse bool
}

type Config struct {
	Directories []Directory
	OutputPath  string
}
