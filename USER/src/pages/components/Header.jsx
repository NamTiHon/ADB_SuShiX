import React from 'react';

function Nav() {
    return (
        <nav className="navbar">
            <div className="Logo">SuShiX</div>
            <div className="nav-ingredients">
                <ul>
                    <li>Trang Chủ</li>
                    <li>Thực đơn<i className="fas fa-angle-down"></i></li>
                    <li>Dịch vụ</li>
                    <li>Về chúng tôi</li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;