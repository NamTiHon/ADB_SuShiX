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
    const [showRewardsModal, setShowRewardsModal] = useState(false);
    const [activeTab, setActiveTab] = useState('vouchers');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    

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

const handlePasswordClick = () => {
    setShowPasswordModal(true);
};

const handlePasswordCancel = () => {
    setShowPasswordModal(false);
};

const handlePasswordConfirm = async () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
        setError('Mật khẩu mới không khớp');
        return;
    }
    
    try {
        const response = await fetch('http://your-api/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
            })
        });

        if (response.ok) {
            setShowPasswordModal(false);
            // Reset fields
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
            alert('Thay đổi mật khẩu thành công');
        } else {
            const data = await response.json();
            setError(data.message || 'Mật khẩu cũ không đúng');
        }
    } catch (err) {
        setError('Đã xảy ra lỗi, vui lòng thử lại');
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


                        <button onClick={handlePasswordClick} className="password-btn">
                            <i className="fas fa-key"></i>
                            Thay đổi mật khẩu
                        </button>

                        {showPasswordModal && (
                            <div className="modal-overlay">
                                <div className="modal-content">
                                    <h3>Thay đổi mật khẩu</h3>
                                    {error && <div className="error-message">{error}</div>}
                                    <div className="password-inputs">
                                        <input 
                                            type="password" 
                                            placeholder="Mật khẩu cũ"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Mật khẩu mới"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Xác nhận mật khẩu mới"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-actions">
                                        <button 
                                            onClick={handlePasswordConfirm} 
                                            className="confirm-btn"
                                            disabled={!oldPassword || !newPassword || !confirmPassword}
                                        >
                                            Xác nhận
                                        </button>
                                        <button onClick={handlePasswordCancel} className="cancel-btn">
                                            Hủy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                    <div className="points-info">
                                        <span className="current-points">{user?.points || 0} điểm</span>
                                        <button 
                                            onClick={() => setShowRewardsModal(true)} 
                                            className="points-exchange-btn"
                                        >
                                            <i className="fas fa-exchange-alt"></i> Đổi điểm
                                        </button>
                                    </div>
                                    {showRewardsModal && (
                                        <div className="modal-overlay">
                                            <div className="modal-content rewards-modal">
                                                <div className="modal-header">
                                                    <h3>Đổi điểm thưởng</h3>
                                                    <button 
                                                        className="close-btn"
                                                        onClick={() => setShowRewardsModal(false)}
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>

                                                <div className="points-info">
                                                    <span>Điểm hiện có: </span>
                                                    <span className="current-points">{user?.points || 0} điểm</span>
                                                </div>

                                                <div className="modal-tabs">
                                                    <button 
                                                        className={`tab-btn ${activeTab === 'vouchers' ? 'active' : ''}`}
                                                        onClick={() => setActiveTab('vouchers')}
                                                    >
                                                        Voucher giảm giá
                                                    </button>
                                                    <button 
                                                        className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
                                                        onClick={() => setActiveTab('food')}
                                                    >
                                                        Đổi món ăn
                                                    </button>
                                                </div>

                                                <div className="rewards-grid">
                                                    {activeTab === 'vouchers' ? (
                                                        <>
                                                            <div className="reward-card">
                                                                <img src="/voucher-50k.jpg" alt="Voucher 50K" className="reward-image" />
                                                                <div className="reward-title">Voucher giảm 50.000đ</div>
                                                                <div className="reward-points">500 điểm</div>
                                                                <div className="reward-description">
                                                                    Áp dụng cho đơn hàng từ 200.000đ
                                                                </div>
                                                                <button 
                                                                    className="redeem-btn"
                                                                    disabled={user?.points < 500}
                                                                    onClick={() => {
                                                                        if (window.confirm('Bạn có chắc muốn đổi voucher này?')) {
                                                                            // Handle redemption
                                                                            alert('Đổi voucher thành công!');
                                                                        }
                                                                    }}
                                                                >
                                                                    {user?.points >= 500 ? 'Đổi ngay' : 'Không đủ điểm'}
                                                                </button>
                                                            </div>

                                                            <div className="reward-card">
                                                                <img src="/voucher-100k.jpg" alt="Voucher 100K" className="reward-image" />
                                                                <div className="reward-title">Voucher giảm 100.000đ</div>
                                                                <div className="reward-points">1000 điểm</div>
                                                                <div className="reward-description">
                                                                    Áp dụng cho đơn hàng từ 350.000đ
                                                                </div>
                                                                <button 
                                                                    className="redeem-btn"
                                                                    disabled={user?.points < 1000}
                                                                >
                                                                    {user?.points >= 1000 ? 'Đổi ngay' : 'Không đủ điểm'}
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="reward-card">
                                                                <img src="/food-1.jpg" alt="Món ăn 1" className="reward-image" />
                                                                <div className="reward-title">Mì Ý sốt bò bằm</div>
                                                                <div className="reward-points">800 điểm</div>
                                                                <div className="reward-description">
                                                                    Đổi ngay món mì Ý đặc biệt
                                                                </div>
                                                                <button 
                                                                    className="redeem-btn"
                                                                    disabled={user?.points < 800}
                                                                >
                                                                    {user?.points >= 800 ? 'Đổi ngay' : 'Không đủ điểm'}
                                                                </button>
                                                            </div>

                                                            <div className="reward-card">
                                                                <img src="/food-2.jpg" alt="Món ăn 2" className="reward-image" />
                                                                <div className="reward-title">Pizza hải sản</div>
                                                                <div className="reward-points">1200 điểm</div>
                                                                <div className="reward-description">
                                                                    Pizza size M kèm nước ngọt
                                                                </div>
                                                                <button 
                                                                    className="redeem-btn"
                                                                    disabled={user?.points < 1200}
                                                                >
                                                                    {user?.points >= 1200 ? 'Đổi ngay' : 'Không đủ điểm'}
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
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