// src/pages/components/Login.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../css/login.css';
import Nav from './Nav';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const users = [
        { email: 'user1@gmail.com', password: 'user123', name: 'User One' },
        { email: 'admin@gmail.com', password: 'admin123', name: 'Admin' },
        { email: 'test@gmail.com', password: 'test123' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            setUser(user);  // Changed from setCurrentUser to setUser
            navigate('/');
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
export default Login;