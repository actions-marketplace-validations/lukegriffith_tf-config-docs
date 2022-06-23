import React from 'react'
import './ModuleStats.css'

const Stats = {
    View: function(props) {
        var [header, text] = props.function(props)
        return (
            <div className="statsElement">
                <h4>{header}</h4>
                <p>{text}</p>
            </div>
        )
    },
    Functions: [
        function TerraformVersion (props) {
            return [
                "TF Core", 
                props.moduleContext.moduleData.required_core
            ]
        },
        function ResourceCount(props) {
            return [
                "Resources",
                CountProperties(props.moduleContext.moduleData.managed_resources)
            ]
        },
        function SubModules(props) {
            return [
                "SubModules",
                CountProperties(props.moduleContext.moduleData.module_calls)
            
            ]
        },
        function Variables(props) {
            return [
                "Variables",
                CountProperties(props.moduleContext.moduleData.variables)
            ]
        },
        function Outputs(props) {
            return [
                "Outputs",
                CountProperties(props.moduleContext.moduleData.outputs)
            ]
        }
    ]
}
function CountProperties(object) {
    let count = 0
    for (let property in object) {
        count++
    }  
    return count
}
function ModuleStats(props) {
    return (
        <div className="statsContainer">
            {Stats.Functions.map((func, i) => <Stats.View function={func} moduleContext={props.moduleContext} libraryData={props.libraryData}/>)}
        </div>
    )
}
export default ModuleStats