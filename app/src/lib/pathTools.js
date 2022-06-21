

const pathTools = {
    getName: (module) => {
        const arr = module.split("/")
        const [lastItem] = arr.slice(-1)
        return lastItem
    }
}


export default pathTools