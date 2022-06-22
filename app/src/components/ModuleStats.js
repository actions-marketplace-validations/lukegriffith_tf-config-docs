import React from 'react'
import './ModuleStats.css'

const Stats = {

    View: function(props) {
        console.log(props)
        var [header, text] = props.function(props)
        console.log(header, text)
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
            var resourceCount = 0
            for (let resource in props.moduleContext.moduleData.managed_resources) {
                resourceCount++
            }
            return [
                "Resources",
                resourceCount
            ]
        },
        function SubModules(props) {
            var moduleCount = 0
            for (let resource in props.moduleContext.moduleData.module_calls) {
                moduleCount++
            }
            return [
                "SubModules",
                moduleCount
            ]
        }
    ]
    
}

function ModuleStats(props) {
    return (
        <div className="statsContainer">
            {Stats.Functions.map((func, i) => <Stats.View function={func} moduleContext={props.moduleContext} libraryData={props.libraryData}/>)}
        </div>
    )
}


export default ModuleStats