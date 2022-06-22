//import { useSearchParams } from "react-router-dom";
import React from 'react'
import pathTools from '../lib/pathTools'
import './Module.css'
import ModuleStats from './ModuleStats'
import './ModuleStats.css'

function Module(props) {
    console.log(1)
    function GetModule() {
        var moduleData, selectedModule
        props.data.Modules.map(({ Module, Hash, Root, TfModule }) => {
            if (Hash === props.module) {
                selectedModule = pathTools.getName(Module, props.data)
                moduleData = TfModule
            }
        });

        return {
            selectedModule: selectedModule,
            moduleData: moduleData
        }
    }
    var moduleContext = GetModule()
    const [showJson, setShowJson] = React.useState(false)
    const jsonOnClick = () => setShowJson(!showJson)

    return (
        <div className="Module">
            <div className="moduleHeader">
                <h1>Module</h1>
                <p>Module Hash: {props.module}</p>
                <p>Name: {moduleContext.selectedModule}</p>
                <p>Path: {moduleContext.moduleData.path}</p>
            </div>
            <hr class="dashed"></hr>
            <ModuleStats moduleContext={moduleContext} libraryData={props.data}/>        
            <hr class="dashed"></hr>
            <div>
                <h1>Similar To X of Y modules</h1>
                <button>expand</button>
            </div>
            <hr class="dashed"></hr>
            <div className="moduleJson">
                <button onClick={jsonOnClick}>show json</button>
                {
                    showJson && <pre>
                        <code>
                            {JSON.stringify(moduleContext.moduleData, null, 2)}
                        </code>
                    </pre>
                }

            </div>
        </div>

    )
}





export default Module