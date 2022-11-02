import Module from '../components/Module'
import ModuleList from '../components/ModuleList'
import React from 'react'
import './ModuleView.css'

function SelectedView(props) {
    var loaded = !props.loading
    var moduleSelected = loaded && props.module != null;
    return (
        <div className="moduleContainer">
            {loaded && <ModuleList loading={props.loading} error={props.error} data={props.data}/>}
            {moduleSelected && <Module loading={props.loading} error={props.error} data={props.data} module={props.module}  /> }
        </div>
    )
}

export default SelectedView