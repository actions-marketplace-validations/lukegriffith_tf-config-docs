import React from 'react'
import './Stats.css'

const Stats = {
    TerraformVersion: function(props) {
        console.log(props)
        return (
            <div className="statsElement">
                <h4>TF Core</h4>
                <p>{props.moduleContext.moduleData.required_core}</p>
            </div>
        )
    },
    ResourceCount: function(props) {
        var resourceCount = 0
        for (let resource in props.moduleContext.moduleData.managed_resources) {
            resourceCount++
        }
        return (
            <div className="statsElement">
                <h4>Resources</h4>
                <p>{resourceCount}</p>
            </div>
        )
    },
    SubModules: function(props) {
        var moduleCount = 0
        for (let resource in props.moduleContext.moduleData.module_calls) {
            moduleCount++
        }
        return (
            <div className="statsElement">
                <h4>SubModules</h4>
                <p>{moduleCount}</p>
            </div>
        )
    }
}

export default Stats