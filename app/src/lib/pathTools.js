const pathTools = {
    getName: (module, data) => {
        var moduleName = module
        var directory = data.Config.Directories.filter(obj => {
            return obj.Path === module
        })
        if (directory.length > 0 && 'FriendlyName' in directory[0]) {
            moduleName = directory[0].FriendlyName
        }
        const arr = moduleName.split("/")
        const [lastItem] = arr.slice(-1)
        return lastItem
    }
}
export default pathTools