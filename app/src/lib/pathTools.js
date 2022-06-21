const pathTools = {
    getName: (module, data) => {
        var moduleName = module

        var directory = data.Config.Directories.filter(obj => {
            return obj.Path === module
        })

        if ('FriendlyName' in directory) {
            moduleName = directory.FriendlyName
        }

        const arr = moduleName.split("/")
        const [lastItem] = arr.slice(-1)
        return lastItem
    }
}
export default pathTools