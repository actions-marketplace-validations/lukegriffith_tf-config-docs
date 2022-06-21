

const pathTools = {
    getName: (module, data) => {
        const relPath = "."
        var moduleName = module
        if (module == relPath) {

            moduleName = data.Config.Directories.filter(obj => {
                return obj.Path == relPath
            })
        }
        const arr = moduleName.split("/")
        const [lastItem] = arr.slice(-1)
        return lastItem
    }
}


export default pathTools