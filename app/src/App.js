import './App.css';
import React, { useMemo, useState, useEffect } from 'react'

import ModuleList from './components/ModuleList';
import Module from './components/Module';
import Button from 'react-bootstrap/Button';

import { Routes, Route } from 'react-router-dom'

import SelectedVIew from './pages/SelectedView'


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null)

  useEffect(() => {
    fetch("data.json")
      .then(res => {
        if (!res.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${res.status}`
          )
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false)
      });

  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<ModuleList loading={loading} error={error} data={data} module={selectedModule} setModule={setSelectedModule} />} />
        <Route path='/selected' element={<SelectedVIew loading={loading} error={error} data={data} module={selectedModule} setModule={setSelectedModule} />} />
      </Routes>

    </div>
  );
}

export default App;
