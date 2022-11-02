import Module from '../components/Module'
import ModuleList from '../components/ModuleList'
import React from 'react'
import './OverviewView.css'

function Modules(props) {
  return (
    <div>
      <p><span>Total Mdoules:</span> {Object.keys(props.ModuleMap).length}</p>
    </div>
  )
}

function Providers(props) {
  return (
    <div>
      <h2>Count of module providers</h2>
      <div className="providers">
        {
          Object.keys(props.ProviderMap).map((key, i) => {
            var count = Object.keys(props.ProviderMap[key]).length
            return (<div className="provider" key={key}><h3>{key}</h3> <p>{count}</p></div>)
          })
        }
      </div>
    </div>
  )
}

function TopResources(props) {
  var counted_resources = []
  Object.keys(props.ResourcesMap).map((key, i) => {
    console.log(key)
   var count = Object.keys(props.ResourcesMap[key]).length
   counted_resources.push([key,count])
  })

  counted_resources.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
  console.log(counted_resources)
  return (
    <div>
      <h2>Top 10 resource by use</h2>
      {[...Array(10)].map((x, i) =>
        <p><span>{counted_resources[i][0]}</span> {counted_resources[i][1]}</p>
      )}

    </div>
  )
}

function Overview(props) {
    var loaded = !props.loading
    var moduleSelected = loaded && props.module != null;
    return (
      <section>
        <h1>Library Overview</h1>
        {loaded && <Modules ModuleMap={props.data.ModuleMap}/>}
        {loaded && <Providers ProviderMap={props.data.ProvidersMap}/>}
        {loaded && <TopResources ResourcesMap={props.data.ResourcesMap}/>}
      </section>
    )
}

export default Overview