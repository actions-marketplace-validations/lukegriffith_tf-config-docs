import { Link } from 'react-router-dom'

function ModuleList(props) {
    return (
        <div className="App">
            <h1>Modules</h1>
            {props.loading && <div>A moment please...</div>}
            {props.error && (
                <div>{`There is a problem fetching the data - ${props.error}`}</div>
            )}
            <ul>
                {props.data &&
                    props.data.Modules.map(({ Module, Hash }) => (
                        <li key={Hash}>
                            <Link to={`/selected?module=${Hash}`}>{Module}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>)
}

export default ModuleList;