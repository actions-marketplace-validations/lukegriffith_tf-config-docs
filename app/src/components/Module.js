import { useSearchParams } from "react-router-dom";
import React from 'react'

function Module(props) {

    function getModule() {
        console.log(props.data.Modules)
        var selectedModule
        var moduleData
        props.data.Modules.map(({ Module, Hash, Root, TfModule }) => {
            if (Hash == props.module) {
                console.log(Hash)
                console.log(TfModule)
                selectedModule = Module
                moduleData = TfModule
            }
        });

        return (
            <div>
                <p>Name: {selectedModule}</p>
                <pre>
                    <code>
                        {JSON.stringify(moduleData, null, 2)}
                    </code>
                </pre>
            </div>
        )
    }


    return (
        <div>
            <h1>Module</h1>
            <p>Module Hash: {props.module}</p>
            {props.data && getModule()}
        </div>
    )


}

export default Module