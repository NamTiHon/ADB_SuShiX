import React from 'react';
import '../css/nav.css';
function Nav() {
    return (
        <nav className="navbar">
            <div className="logo">SuShiX</div>
            <div className="menu">
                <ul>
                    <li><a href="#">Trang Chủ</a></li>
                    <li><a href="#">Thực đơn<i className="fas fa-angle-down"></i></a></li>
                    <li><a href="#">Dịch vụ <i className="fas fa-angle-down"></i></a></li>
                    <li><a href="#">Về chúng tôi</a></li>
                </ul>
            </div>
            <div className="search">
                <input type="text" placeholder="Tìm kiếm..." />
                <i className="fas fa-search"></i>
            </div>
            <div className="cart">
                <a href="#" className="cart-icon">Giỏ hàng<i className="fas fa-shopping-basket"></i></a>
            </div>
            <a href="#" className="login">Đăng nhập</a>
        </nav>
    );
}

export default Nav;