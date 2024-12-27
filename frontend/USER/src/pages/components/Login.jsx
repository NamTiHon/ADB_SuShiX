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
            // First login request
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const loginData = await response.json();
            
            if (response.ok) {
                // Fetch additional user profile data
                const profileResponse = await fetch(`http://localhost:3000/api/auth/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${loginData.token}`
                    }
                });

                const profileData = await profileResponse.json();

                // Combine login and profile data
                const fullUserData = {
                    ...loginData,
                    profile: profileData.user
                };

                // Save complete user data
                setUser(fullUserData);
                localStorage.setItem('userData', JSON.stringify(fullUserData));
                console.log('User logged in:', fullUserData);
                navigate(from, { replace: true });
            } else {
                setError(loginData.message || 'Email hoặc mật khẩu không chính xác');
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