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
                    props.data.Modules.map(({ Module }) => (
                        <li key={Module}>
                            <h3>{Module}</h3>
                        </li>
                    ))
                }
            </ul>
        </div>)
}

export default ModuleList;