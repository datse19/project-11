import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className = "main-nav"> 
            <ul>
                <li> <NavLink to = "/watches"> Watches </NavLink></li>
                <li> <NavLink to = "/lakes"> Lakes </NavLink></li>
                <li> <NavLink to = "/birds"> Birds </NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;