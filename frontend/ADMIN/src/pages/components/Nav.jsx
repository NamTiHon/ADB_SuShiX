import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/components/nav.css";

function Nav() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
    const isUserAuth = localStorage.getItem('userAuth') === 'true';
    const handleLogoClick = (e) => {
        e.preventDefault();
        if (isAuthenticated || isUserAuth) {
            navigate('/home');
        } else {
            navigate('/');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('userAuth');
        navigate('/');
    };

    return (
        <nav className="navBar">
            <div className="left">
                <a href="/" onClick={handleLogoClick}>
                    <div className="logo">SuShiX</div>
                </a>
                {isAuthenticated && <span className="temp">Admin</span>}
                {isUserAuth && !isAuthenticated && <span className="temp">Nhân viên</span>}
            </div>
            <div className="right">
                <a href="#"><i className="fas fa-bell 2x"></i></a>
                <div className="adminBox" onClick={() => setShowDropdown(!showDropdown)}>
                    <i className="fas fa-user"></i>
                    {isAuthenticated && <span>Admin</span>}
                    {isUserAuth && !isAuthenticated && <span>Nhân viên</span>}
                    {showDropdown && (isAuthenticated || isUserAuth) && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i> Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Nav;