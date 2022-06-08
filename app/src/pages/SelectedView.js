import Module from '../components/Module'
import ModuleList from '../components/ModuleList'
import React from 'react'

function SelectedView(props) {
    return (
        <div>
            <ModuleList loading={props.loading} error={props.error} data={props.data}/>
            <Module loading={props.loading} error={props.error} data={props.data} module={props.module}  />
        </div>
    )
}

export default SelectedView