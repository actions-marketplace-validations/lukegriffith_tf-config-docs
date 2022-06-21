const pathTools = {
    getName: (module, data) => {
        var moduleName = module
        console.log("module", module)
        var directory = data.Config.Directories.filter(obj => {
            return obj.Path === module
        })
        console.log("directory", directory)

        if (directory.length > 0 && 'FriendlyName' in directory[0]) {
            console.log(directory[0])
            moduleName = directory[0].FriendlyName
        }
        console.log("mdoule name", moduleName)
        const arr = moduleName.split("/")
        const [lastItem] = arr.slice(-1)
        return lastItem
    }
}
export default pathTools