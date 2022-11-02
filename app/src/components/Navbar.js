import React from 'react'
import './Navbar.css'

import { NavLink } from 'react-router-dom';

function Nav() {
    return <nav>
        <NavLink to="/">Overview</NavLink>
        <NavLink to="/modules">Modules</NavLink>
    </nav>
}

export default Nav
