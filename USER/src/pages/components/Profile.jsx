// src/pages/components/Profile.jsx
import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/profile.css';

const Profile = () => {
    const { user, setUser, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '/default-avatar.png');
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({...user});
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [email, setEmail] = useState('');
    const [showPromotionsModal, setShowPromotionsModal] = useState(false);

    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setUser({
                ...user,
                avatar: reader.result
            });
        }
    };

    const handleInputChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(editedUser));
    
            // If using an API, add this:
            /*
            const response = await fetch('/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUser)
            });
            
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            */
    
            setUser(editedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile:', error);
            // Handle error (show error message to user)
        }
    };
    
    // Load saved profile on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const parsedProfile = JSON.parse(savedProfile);
            setUser(parsedProfile);
            setEditedUser(parsedProfile);
        }
    }, []);

    const handleCancel = () => {
        setEditedUser({...user});
        setIsEditing(false);
    };

    const renderField = (label, field, type = "text") => {
        return (
            <div className="info-item">
                <label>{label}:</label>
                {isEditing ? (
                    <input
                        type={type}
                        name={field}
                        value={editedUser[field] || ''}
                        onChange={handleInputChange}
                        className="edit-input"
                    />
                ) : (
                    <span>{user[field]}</span>
                )}
            </div>
        );
    };
    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
        navigate('/');
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };


    // Add handler functions
const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
};

const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
        // API call to send reset password email
        // const response = await fetch('/api/forgot-password', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email })
        // });
        alert('Liên kết đặt lại mật khẩu đã được gửi đến email của bạn');
        setShowForgotPasswordModal(false);
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
};

    return (
        <div>
            <Nav />
            <div className="profile-container">
                <div className="profile-grid">
                    <div className="profile-sidebar">
                        <div className="avatar-container">
                            <img src={previewUrl} alt="Avatar" className="avatar" />
                            <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <button onClick={() => fileInputRef.current.click()} className="change-avatar-btn">
                                Thay đổi ảnh
                            </button>
                        </div>
                        <button onClick={handleLogoutClick} className="logout-btn">
                            <i className="fas fa-sign-out-alt"></i>
                            Đăng xuất
                        </button>

                        {showLogoutModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Xác nhận đăng xuất</h3>
                                    <p>Bạn có chắc chắn muốn đăng xuất?</p>
                                    <div className="modal-actions">
                                        <button onClick={handleLogoutConfirm} className="confirm-btn">
                                            Xác nhận
                                        </button>
                                        <button onClick={handleLogoutCancel} className="cancel-btn">
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button onClick={handleForgotPasswordClick} className="forgot-password-btn">
                            <i className="fas fa-key"></i>
                            Quên mật khẩu
                        </button>

                        {showForgotPasswordModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Quên mật khẩu</h3>
                                    <p>Nhập email để nhận liên kết đặt lại mật khẩu</p>
                                    <form onSubmit={handleForgotPasswordSubmit}>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Nhập email của bạn"
                                            className="forgot-password-input"
                                            required
                                        />
                                        <div className="modal-actions">
                                            <button type="submit" className="confirm-btn">
                                                Gửi
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => setShowForgotPasswordModal(false)} 
                                                className="cancel-btn"
                                            >
                                                Hủy
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <button onClick={() => setShowPromotionsModal(true)} className="promotions-btn">
                            <i className="fas fa-gift"></i>
                            Ưu đãi của tôi
                        </button>
                        {showPromotionsModal && (
                            <div className="modal-overlay">
                                <div className="modal-content promotions-modal">
                                    <div className="modal-header">
                                        <h3>Ưu đãi của tôi</h3>
                                        <button 
                                            className="close-btn"
                                            onClick={() => setShowPromotionsModal(false)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>

                                    <div className="promotions-grid">
                                        <div className="promotion-card">
                                            <span className="promotion-status status-valid">Còn hiệu lực</span>
                                            <div className="promotion-discount">Giảm 20%</div>
                                            <div className="promotion-code">WELCOME20</div>
                                            <div className="promotion-expiry">Hết hạn: 31/12/2024</div>
                                            <div className="promotion-terms">
                                                Áp dụng cho đơn hàng từ 500.000đ
                                            </div>
                                            <button 
                                                className="copy-btn"
                                                onClick={() => {
                                                    navigator.clipboard.writeText('WELCOME20');
                                                    alert('Đã sao chép mã');
                                                }}
                                            >
                                                <i className="fas fa-copy"></i> Sao chép mã
                                            </button>
                                        </div>
                                        
                                        {/* Add more promotion cards here */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="profile-content">
                        <div className="profile-header">
                            <h2>Thông tin cá nhân</h2>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="edit-btn">
                                    <i className="fas fa-edit"></i> Chỉnh sửa
                                </button>
                            ) : (
                                <div className="edit-actions">
                                    <button onClick={handleSave} className="save-btn">
                                        <i className="fas fa-save"></i> Lưu
                                    </button>
                                    <button onClick={handleCancel} className="cancel-btn">
                                        <i className="fas fa-times"></i> Hủy
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="profile-info">
                            <div className="info-group">
                                {renderField("Họ và tên", "fullName")}
                                {renderField("Email", "email", "email")}
                                {renderField("Số điện thoại", "phone", "tel")}
                                {renderField("Địa chỉ", "address")}
                                {renderField("Ngày sinh", "birthDate", "date")}
                                {renderField("CCCD", "idCard")}
                                {renderField("Giới tính", "gender")}
                            </div>

                            <div className="membership-info">
                                <h3>Thông tin thành viên</h3>
                                <div className="info-item">
                                    <label>Hạng thành viên:</label>
                                    <span className="member-tier">{user?.membershipTier}</span>
                                </div>
                                <div className="info-item">
                                    <label>Điểm tích lũy:</label>
                                    <span className="points">{user?.points}</span>
                                </div>
                                <div className="info-item">
                                    <label>Ngày tham gia:</label>
                                    <span>{user?.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;