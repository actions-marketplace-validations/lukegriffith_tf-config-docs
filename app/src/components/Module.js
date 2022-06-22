//import { useSearchParams } from "react-router-dom";
import React from 'react'
import pathTools from '../lib/pathTools'
import './Module.css'


class Module extends React.Component {
    render(props) {
        return ModuleImpl(this.props)
    }
}


function ModuleImpl(props) {

    function getModule() {
        var selectedModule
        var moduleData
        props.data.Modules.map(({ Module, Hash, Root, TfModule }) => {
            if (Hash === props.module) {
                selectedModule = pathTools.getName(Module, props.data)
                moduleData = TfModule
            }
            return null
        });

        

        return (
            <div>
                <p>Name: {selectedModule}</p>
                <p>{moduleData.path}</p>
                <pre>
                    <code>
                        {JSON.stringify(moduleData, null, 2)}
                    </code>
                </pre>
            </div>
        )
    }
    function getModuleDiv() {
        return (
            <div>
                <h1>Module</h1>
                <p>Module Hash: {props.module}</p>
                {props.data && getModule()}
            </div>
        )
    }

    var moduleNotNull = props.module != null

    return (
        <div className="Module">
            {moduleNotNull && getModuleDiv()}
        </div>
    )




}

export default Module