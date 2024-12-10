import React from 'react';
import "../css/nav.css";

function Nav(){
    return (
        <nav className= "navBar">
            <div className="left">
                <a href="/"><div className="logo">SuShiX</div></a><span className="temp">Admin</span>
            </div>
            <div className="right">
                <a href="#"><i className="fas fa-bell 2x"></i></a>
                <div className="adminBox">
                    <i className="fas fa-user"></i> 
                    <span>Admin</span>
                </div>
            </div>
        </nav>
    );
}

export default Nav;