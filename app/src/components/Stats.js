import React from 'react'
import './Stats.css'

const Stats = {

    View: function(props) {
        console.log(props)
        var header, text = props.function(props)
        return (
            <div className="statsElement">
                <h4>{header}</h4>
                <p>{text}</p>
            </div>
        )
    },
    Functions: {
        TerraformVersion: function(props) {
            console.log(props)
            return (
                "TF Core", 
                props.moduleContext.moduleData.required_core
            )
        },
        ResourceCount: function(props) {
            var resourceCount = 0
            for (let resource in props.moduleContext.moduleData.managed_resources) {
                resourceCount++
            }
            return (
                "Resources",
                resourceCount
            )
        },
        SubModules: function(props) {
            var moduleCount = 0
            for (let resource in props.moduleContext.moduleData.module_calls) {
                moduleCount++
            }
            return (
                "SubModules",
                moduleCount
            )
        }
    }
    
}

export default Stats