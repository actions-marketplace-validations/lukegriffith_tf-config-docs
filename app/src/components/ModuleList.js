import { Link } from 'react-router-dom'
import React from 'react'
import pathTools from '../lib/pathTools'
import './ModuleList.css'

function ModuleList(props) {


    return (
        <div className="ModuleList">
            <h1>Modules</h1>
            {props.loading && <div>A moment please...</div>}
            {props.error && (
                <div>{`There is a problem fetching the data - ${props.error}`}</div>
            )}
            <ul>
                {props.data &&
                    props.data.Modules.map(({ Module, Hash }) => (
                        <li key={Hash}>
                            <Link to={`/selected?module=${Hash}`}>{pathTools.getName(Module, props.data)}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>)
}

export default ModuleList;