import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(props) {
    return (
        <div className="nav-bar">Approvial
            <Link to='/make_request'><div>Make Request</div></Link>
            <Link to='/dashboard'><div>Dashboard</div></Link>
        
        
        </div>
    )

}

export default NavBar;
