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
                    <li><Link to="/">Trang Chủ</Link></li>
                    <li className="menu-dropdown">
                        <Link to="/menu">
                            Thực đơn
                            <i className="fas fa-angle-down"></i>
                        </Link>
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
                    <Link to="/order-tracking">Kiểm tra đơn hàng</Link>
                    <Link to="/check-reservation">Kiểm tra đặt bàn</Link>
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