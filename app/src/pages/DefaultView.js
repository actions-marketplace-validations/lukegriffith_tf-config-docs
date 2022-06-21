import Module from '../components/Module'
import ModuleList from '../components/ModuleList'
import React from 'react'
import './Layout.css'

function SelectedView(props) {
    return (
        <div className="moduleContainer">
            <ModuleList loading={props.loading} error={props.error} data={props.data}/>
        </div>
    )
}

export default SelectedView