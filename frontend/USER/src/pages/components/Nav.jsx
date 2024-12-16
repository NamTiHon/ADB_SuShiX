import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Link, useNavigate } from 'react-router-dom';
import { useBranch } from '../../context/BranchContext';
import '../css/nav.css';

function Nav() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { selectedBranch } = useBranch();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate('/menu', { state: { searchTerm: searchTerm.trim() } });
            setSearchTerm('');
        }
    };

    return (
        <nav className="navbar">
            <div className="logo"><Link to="/">SuShiX</Link></div>
            
            {selectedBranch && (
                <div className="selected-branch-display">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{selectedBranch.name}</span>
                </div>
            )}

            <div className="menu">
                <ul>
                    <li className="menu-dropdown">
                        <Link to="/menu">
                            Thực đơn
                           
                        </Link>
                       
                    </li>
                    <li><Link to="/about">Về chúng tôi</Link></li>
                    <li>
                        <Link to="/notifications">
                            Thông báo
                            <i className="fas fa-bell nav-notification-icon"></i>
                        </Link>
                    </li>
                    <li className="branch-search">
                        <Link to="/branch-search">
                            {selectedBranch ? 'Đổi chi nhánh' : 'Chọn chi nhánh'} 
                            <i className="fas fa-search"></i>
                        </Link>
                    </li>
                </ul>
            </div>
            
            <div className="right-nav">
                <div className="nav-actions">
                <li className="menu-dropdown">
                    <Link to="#">
                        Quản lý
                        <i className="fas fa-angle-down"></i>
                    </Link>
                    <div className="dropdown-content">
                        <Link to="/order-tracking">Kiểm tra đơn hàng</Link>
                        <Link to="/check-reservation">Kiểm tra đặt bàn</Link>
                        <Link to="/order-management">Quản lý đơn hàng</Link>
                    </div>
                </li>
                    <Link to="/cart" className="cart-icon">
                        Giỏ hàng<i className="fas fa-shopping-basket"></i>
                    </Link>
                    <Link to="/reservation" className="cart-icon">
                        Đặt bàn<i className="fas fa-table"></i>
                    </Link>
                </div>
                {user ? (
                    <div className="user-profile">
                        <Link to="/profile" className="username">
                            {user.email}
                        </Link>
                    </div>
                ) : (
                    <Link to="/login" className="login">Đăng nhập</Link>
                )}
            </div>
        </nav>
    );
}

export default Nav;