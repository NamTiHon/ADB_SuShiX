// src/pages/components/Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../css/login.css';
import Nav from './Nav';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                // Lưu thông tin người dùng vào context hoặc localStorage
                setUser(data); // Giả sử bạn có hàm setUser để lưu thông tin người dùng
                console.log (data);
                navigate(from, { replace: true }); // Điều hướng đến trang ban đầu
            } else {
                setError(data.message || 'Email hoặc mật khẩu không chính xác');
            }
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="login-container">
                <div className="login-form">
                <div className="back-arrow">
                    <Link to="/">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                </div>
                    <h2>Đăng nhập</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Mật khẩu:
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <i 
                                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                        </label>
                        <button type="submit">Đăng nhập</button>
                    </form>
                    <div className="form-footer">
                        <Link to="/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;