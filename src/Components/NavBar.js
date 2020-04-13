import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <div className="nav-bar">This is the NavBar
            <Link to='/make_request'><div>Make Request</div></Link>
            <Link to='/dashboard'><div>Dashboard</div></Link>
        
        
        </div>
    )

}

export default NavBar;
