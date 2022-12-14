import './App.css';
import React, { useMemo, useState, useEffect } from 'react'

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Module from './components/Module';
import Button from 'react-bootstrap/Button';

import { Routes, Route, useSearchParams } from 'react-router-dom'

import Overview from './pages/OverviewView'
import ModuleView from './pages/ModuleView'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
    

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
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
          <Route path='/' element={<Overview loading={loading} error={error} data={data}/>}/>
          <Route path='/modules' element={<ModuleView loading={loading} error={error} data={data}  module={searchParams.get("module")}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
