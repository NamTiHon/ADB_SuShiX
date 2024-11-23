import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Link } from 'react-router-dom';
import '../css/nav.css';

function Nav() {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="logo"><a href="/home">SuShiX</a></div>
            <div className="menu">
                <ul>
                    <li><a href="/home">Trang Chủ</a></li>
                    <li><a href="/menu">Thực đơn<i className="fas fa-angle-down"></i></a></li>
                    <li><a href="/about">Về chúng tôi</a></li>
                </ul>
            </div>
            <div className="search">
                <input type="text" placeholder="Tìm kiếm..." />
                <i className="fas fa-search"></i>
            </div>
            <div className="cart">
                <a href="#" className="cart-icon">Giỏ hàng<i className="fas fa-shopping-basket"></i></a>
            </div>
            <div className="checkorder">
                <a href="#" className="checkorder">Kiểm tra đơn hàng</a>
            </div>
            
            {user ? (
                <div className="user-profile">
                    <span className="username">{user.email}</span>
                </div>
            ) : (
                <Link to="/login" className="login">Đăng nhập</Link>
            )}
        </nav>
    );
}

export default Nav;