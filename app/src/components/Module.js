//import { useSearchParams } from "react-router-dom";
import React from 'react'
import pathTools from '../lib/pathTools'
import './Module.css'
import Stats from './Stats'
import './Stats.css'

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
            <ModuleStats moduleContext={moduleContext} libraryData={props.data}/>        
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

function ModuleStats(props) {
    return (
        <div className="statsContainer">
            <Stats.TerraformVersion moduleContext={props.moduleContext} libraryData={props.libraryData}/>
            <Stats.ResourceCount moduleContext={props.moduleContext} libraryData={props.libraryData}/>
            <Stats.SubModules moduleContext={props.moduleContext} libraryData={props.libraryData}/>
        </div>
    )
}




export default Module