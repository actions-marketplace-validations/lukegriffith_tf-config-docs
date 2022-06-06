import Module from '../components/Module'
import ModuleList from '../components/ModuleList'


function SelectedView(props) {
    return (
        <div>
            <ModuleList loading={props.loading} error={props.error} data={props.data} module={props.selectedModule} setModule={props.setSelectedModule} />
            <Module loading={props.loading} error={props.error} data={props.data} module={props.selectedModule} setModule={props.setSelectedModule} />
        </div>
    )
}

export default SelectedView