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
                    <li className="menu-dropdown">
                        <a href="/menu">
                            Thực đơn
                            <i className="fas fa-angle-down"></i>
                        </a>
                        <div className="dropdown-content">
                            <a href="/menu/sushi">Sushi</a>
                            <a href="/menu/appetizer">Khai vị</a>
                            <a href="/menu/tempura">Tempura</a>
                            <a href="/menu/udon">Udon</a>
                            <a href="/menu/hotpot">Lẩu</a>
                            <a href="/menu/lunch-set">Lunch Set</a>
                            <a href="/menu/specialty">Đặc sản</a>
                            <a href="/menu/dessert">Tráng miệng</a>
                            <a href="/menu/drinks">Đồ uống</a>
                        </div>
                    </li>
                    <li><a href="/about">Về chúng tôi</a></li>
                    <li>
                        <a href="/notifications">
                            Thông báo
                            <i className="fas fa-bell nav-notification-icon"></i>
                        </a>
                    </li>
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