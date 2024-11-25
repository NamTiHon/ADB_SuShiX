import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Link } from 'react-router-dom';
import '../css/nav.css';

function Nav() {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar">
    <div className="logo"><a href="/">SuShiX</a></div>
    <div className="menu">
        <ul>
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/menu">Thực đơn<i className="fas fa-angle-down"></i></a></li>
            <li><a href="/about">Về chúng tôi</a></li>
        </ul>
    </div>
    <div className="search-container">
        <div className="search">
            <input type="text" placeholder="Tìm kiếm..." />
            <i className="fas fa-search"></i>
        </div>
    </div>
    <div className="right-nav">
        <div className="checkorder">
            <a href="#" className="checkorder">Kiểm tra đơn hàng</a>
        </div>
        <div className="checkorder">
            <a href="/check-reservation" className="checkorder">Kiểm tra đặt bàn</a>
        </div>
        <div className="cart">
            <a href="/cart" className="cart-icon">Giỏ hàng<i className="fas fa-shopping-basket"></i></a>
        </div>
        <div className="cart">
            <a href="/reservation" className="cart-icon">Đặt bàn<i className="fas fa-table"></i></a>
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