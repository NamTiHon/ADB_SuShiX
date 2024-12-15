import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/admin-login.css';
import Nav from './Nav';

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from || '/admin-dashboard';

    // Mock admin credentials - In production, this should be handled securely
    const adminCredentials = {
        email: 'admin@sushix.com',
        password: 'admin123'
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Store admin session securely
            localStorage.setItem('adminAuth', true);
            navigate(from, { replace: true });
        } else {
            setError('Email hoặc mật khẩu không chính xác');
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

export default AdminLogin;