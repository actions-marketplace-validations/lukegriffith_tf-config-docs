//import { useSearchParams } from "react-router-dom";
import React from 'react'
import pathTools from '../lib/pathTools'
import './Module.css'





function Module(props) {


    function ModuleHeader() {
        return (
            <div>
                <h1>Module</h1>
                <p>Module Hash: {props.module}</p>
            </div>

        )
    }
    
    function ModuleStats() {
    
    }
    

    function ModuleContent() {

        function SelectedModule(props) {
            console.log(props)
            return (
                <div>
                <p>Name: {props.selectedModule}</p>
                <p>{props.moduleData.path}</p>
                <pre>
                    <code>
                        {JSON.stringify(props.moduleData, null, 2)}
                    </code>
                </pre>
            </div>
            )
        }

        var selectedModule, moduleData = GetModule()

        return (
            <div>            
                <SelectedModule selectedModule={selectedModule} moduleData={moduleData} /> 
            </div>

        )
    }

    function GetModule() {
        var moduleData, selectedModule
        props.data.Modules.map(({ Module, Hash, Root, TfModule }) => {
            if (Hash === props.module) {
                selectedModule = pathTools.getName(Module, props.data)
                moduleData = TfModule
                return (selectedModule, moduleData)
            }
        });
        return selectedModule, moduleData
    }
        


    function getModuleDiv() {
        return (
            <div>
                <ModuleHeader />
                <ModuleStats />
                <ModuleContent />
            </div>

        )
    }

    var moduleNotNull = props.module != null && props.data != null

    return (
        <div className="Module">
            {moduleNotNull && getModuleDiv()}
        </div>
    )




}





export default Module