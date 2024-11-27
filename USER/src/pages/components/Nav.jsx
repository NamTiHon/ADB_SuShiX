import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Link, useNavigate } from 'react-router-dom';
import '../css/nav.css';

function Nav() {
    const { user } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate('/menu', { state: { searchTerm: searchTerm.trim() } });
            setSearchTerm(''); // Clear search after submit
        }
    };

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
                            <Link to="/menu" state={{ category: 'sushi' }}>Sushi</Link>  
                            <Link to="/menu" state={{ category: 'appetizer' }}>Khai vị</Link>
                            <Link to="/menu" state={{ category: 'tempura' }}>Tempura</Link>
                            <Link to="/menu" state={{ category: 'udon' }}>Udon</Link>
                            <Link to="/menu" state={{ category: 'hotpot' }}>Lẩu</Link>
                            <Link to="/menu" state={{ category: 'lunch-set' }}>Lunch Set</Link>
                            <Link to="/menu" state={{ category: 'specialty' }}>Đặc sản</Link>
                            <Link to="/menu" state={{ category: 'dessert' }}>Tráng miệng</Link>
                            <Link to="/menu" state={{ category: 'drinks' }}>Đồ uống</Link>
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
                <form className="search" onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            </div>
            <div className="right-nav">
                <div className="checkorder">
                    <a href="/order-tracking" className="checkorder">Kiểm tra đơn hàng</a>
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