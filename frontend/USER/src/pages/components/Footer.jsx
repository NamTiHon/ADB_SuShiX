// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>SuShiX</h3>
                    <p>Hương vị biển khơi xứ anh đào</p>
                    <div className="social-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Liên hệ</h4>
                    <p><i className="fas fa-phone"></i> 0123 456 789</p>
                    <p><i className="fas fa-envelope"></i> info@sushix.com</p>
                    <p><i className="fas fa-map-marker-alt"></i> 123 Đường ABC, TP.HCM</p>
                </div>

                <div className="footer-section">
                    <h4>Giờ mở cửa</h4>
                    <p>Thứ 2 - Thứ 6: 9:00 - 22:00</p>
                    <p>Thứ 7 - Chủ nhật: 8:00 - 23:00</p>
                </div>

                <div className="footer-section">
                    <h4>Menu</h4>
                    <ul>
                        <li><Link to="/menu">Thực đơn</Link></li>
                        <li><Link to="/about">Về chúng tôi</Link></li>
                        <li><Link to="/contact">Liên hệ</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 SuShiX. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;