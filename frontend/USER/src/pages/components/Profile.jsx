import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/profile.css';

const Profile = () => {
    const { user,logout, setUser } = useContext(UserContext);
    
    const navigate = useNavigate();
    const [previewUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTMy2FOhsAH3MaIkUfzPTaCYhYXf4jNVi0A&s');
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        KH_HoTen: '',
        KH_Email: '',
        KH_SDT: '',
        KH_CCCD: '',
        KH_GioiTinh: '',
        TTV_NgayTao: '',
        TTV_LoaiThe: '',
        TTV_DiemTichLuy: ''
    });
    const [promotions, setPromotions] = useState([]);
    const [loadingPromotions, setLoadingPromotions] = useState(false);
    const [promotionError, setPromotionError] = useState('');
    const [showPromotionsModal, setShowPromotionsModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [originalUser, setOriginalUser] = useState({});
    const email = user.email;
    const handleInputChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            if (!editedUser.KH_Email) {
                throw new Error('Email is required');
            }

            const response = await fetch(`http://localhost:3000/api/auth/${editedUser.KH_Email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    KH_HoTen: editedUser.KH_HoTen,
                    KH_GioiTinh: editedUser.KH_GioiTinh,
                    KH_CCCD: editedUser.KH_CCCD
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const updatedUser = await response.json();
            
            // Update all states with new data
            setOriginalUser(updatedUser.user);
            setEditedUser(updatedUser.user);
            setUser({...user, ...updatedUser.user}); // Update context
            
            // Update localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const newUserData = {...storedUser, ...updatedUser.user};
            localStorage.setItem('user', JSON.stringify(newUserData));
            
            setIsEditing(false);
            alert('Cập nhật thông tin thành công');
            
            // Refresh user details
            await fetchUserDetails();
        } catch (error) {
            console.error('Error saving profile:', error);
            setError(`Cập nhật thông tin thất bại: ${error.message}`);
        }
    };

    const handleCancel = () => {
        setEditedUser({...originalUser}); // Restore from original data
        setIsEditing(false);
        setError('');
    };

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
    
            const userDetails = await response.json();
            setEditedUser(userDetails.user);
            setOriginalUser(userDetails.user); // Store original data
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Không thể tải thông tin người dùng.');
        }
    };

    useEffect(() => {
        if (email) {
            fetchUserDetails();
        }
    }, [email, user]);


    const fetchPromotions = async () => {
        setLoadingPromotions(true);
        setPromotionError('');
        try {
            const response = await fetch('http://localhost:3000/api/promotions', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) throw new Error('Failed to fetch promotions');
            
            const data = await response.json();
            
            // Add future end dates to all promotions
            const futurePromotions = data.promotions.map(promo => ({
                ...promo,
                // Set end date to 1 month from now
                KM_NgayKetThuc: new Date(Date.now() + 30*24*60*60*1000).toISOString()
            }));
    
            setPromotions(futurePromotions);
        } catch (error) {
            console.error('Error fetching promotions:', error);
            setPromotionError('Không thể tải khuyến mãi');
            setPromotions([]);
        } finally {
            setLoadingPromotions(false);
        }
    };
    useEffect(() => {
        if (showPromotionsModal) {
            fetchPromotions();
        }
    }, [showPromotionsModal]);
    const handleChangePassword = async () => {
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                setError('Vui lòng điền đầy đủ thông tin');
                return;
            }
    
            if (newPassword !== confirmPassword) {
                setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
                return;
            }
    
            if (newPassword.length < 6) {
                setError('Mật khẩu mới phải có ít nhất 6 ký tự');
                return;
            }
    
            const response = await fetch('http://localhost:3000/api/auth/user/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    email: editedUser.KH_Email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Đổi mật khẩu thất bại');
            }
    
            alert('Đổi mật khẩu thành công');
            setShowPasswordModal(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Đổi mật khẩu thất bại: ' + (error.message || 'Vui lòng thử lại'));
        }
    };
    const handleLogout = () => {
        logout();
        navigate('/'); // Điều hướng về trang đăng nhập sau khi đăng xuất
    };
    return (
        <div>
            <Nav />
            <div className="profile-container">
                <div className="profile-grid">
                    <div className="profile-sidebar">
                        <div className="avatar-container">
                            <img src={previewUrl} alt="Avatar" className="avatar" />
                            <button onClick={() => setShowPromotionsModal(true)} className="promotions-btn">
                                Ưu đãi của bạn
                            </button>
                            <button onClick={() => setShowPasswordModal(true)} className="change-password-btn">
                                Đổi mật khẩu
                            </button>
                        </div>

                        <button onClick={handleLogout} className="logout-btn">
                            Đăng xuất
                        </button>
                    </div>

                    <div className="profile-content">
                        <div className="profile-header">
                            <h2>Thông tin cá nhân</h2>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="edit-btn">
                                    Chỉnh sửa
                                </button>
                            ) : (
                                <div className="edit-actions">
                                    <button onClick={handleSave} className="save-btn">
                                        Lưu
                                    </button>
                                    <button onClick={handleCancel} className="cancel-btn">
                                        Hủy
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="profile-info">
                            <div className="info-group">
                                {/* Editable Fields */}
                                <div className="info-item">
                                    <label>Họ và tên:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="KH_HoTen"
                                            value={editedUser.KH_HoTen || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.KH_HoTen}</span>
                                    )}
                                </div>

                                {/* Read-only Fields */}
                                <div className="info-item">
                                    <label>Email:</label>
                                    <span>{editedUser.KH_Email}</span>
                                </div>

                                <div className="info-item">
                                    <label>Số điện thoại:</label>
                                    <span>{editedUser.KH_SDT}</span>
                                </div>

                                {/* Editable Fields */}
                                <div className="info-item">
                                    <label>CCCD:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="KH_CCCD"
                                            value={editedUser.KH_CCCD || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.KH_CCCD}</span>
                                    )}
                                </div>

                                <div className="info-item">
                                    <label>Giới tính:</label>
                                    {isEditing ? (
                                        <select
                                            name="KH_GioiTinh"
                                            value={editedUser.KH_GioiTinh || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        >
                                            <option value="">Chọn giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    ) : (
                                        <span>{editedUser.KH_GioiTinh}</span>
                                    )}
                                </div>

                                {/* Read-only Fields */}
                                <div className="info-item">
                                    <label>Loại thẻ:</label>
                                    <span>{editedUser.TTV_LoaiThe}</span>
                                </div>

                                <div className="info-item">
                                    <label>Điểm tích lũy:</label>
                                    <span>{editedUser.TTV_DiemTichLuy}</span>
                                </div>

                                <div className="info-item">
                                    <label>Ngày tạo thẻ:</label>
                                    <span>{editedUser.TTV_NgayTao}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showPromotionsModal && (
                    <div className="modal-overlay">
                        <div className="modal-content promotions-modal">
                            <div className="modal-header">
                                <h3>Ưu đãi của bạn</h3>
                                <button className="close-btn" onClick={() => setShowPromotionsModal(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="promotions-grid">
                                {loadingPromotions ? (
                                    <div className="loading">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        <span>Đang tải ưu đãi...</span>
                                    </div>
                                ) : promotionError ? (
                                    <div className="error-message">
                                        <i className="fas fa-exclamation-circle"></i>
                                        {promotionError}
                                    </div>
                                ) : !promotions || promotions.length === 0 ? (
                                    <div className="no-promotions">
                                        <i className="fas fa-ticket-alt"></i>
                                        <p>Không có ưu đãi nào</p>
                                    </div>
                                ) : (
                                    Array.isArray(promotions) && promotions.map(promotion => (
                                        <div key={promotion?.KM_MaKhuyenMai || Math.random()} className="promotion-card">
                                            <div className="promotion-content">
                                                <div className="promotion-header">
                                                    <span className="promotion-name">{promotion?.KM_TenKhuyenMai || 'Chưa có tên'}</span>
                                                    <span className={`promotion-status ${new Date(promotion?.KM_NgayKetThuc) > new Date() ? 'status-valid' : 'status-expired'}`}>
                                                        {new Date(promotion?.KM_NgayKetThuc) > new Date() ? 'Còn hiệu lực' : 'Hết hạn'}
                                                    </span>
                                                </div>
                                                <div className="promotion-body">
                                                    <div className="promotion-discount">
                                                        <span className="discount-value">{Math.round(promotion?.KM_TyLeGiamGia * 100) || 0}%</span>
                                                        <span className="discount-label">Giảm</span>
                                                    </div>
                                                    <div className="promotion-details">
                                                        <div className="promotion-code">Mã: {promotion?.KM_MaKhuyenMai || 'N/A'}</div>
                                                        <p className="promotion-event">Sự kiện: {promotion?.KM_TenSuKien || 'Chưa có'}</p>
                                                        <p className="promotion-type">Loại thẻ: {promotion?.KM_LoaiTheApDung || 'Tất cả'}</p>
                                                        <p className="promotion-branch">Chi nhánh: {promotion?.KM_MaChiNhanh || 'Tất cả'}</p>
                                                       
                                                        <div className="promotion-desc">{promotion?.KM_MoTa || 'Không có mô tả'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {showPasswordModal && (
                    <div className="modal-overlay">
                        <div className="modal-content password-modal">
                            <div className="modal-header">
                                <h3>Đổi mật khẩu</h3>
                                <button 
                                    className="close-btn"
                                    onClick={() => setShowPasswordModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="password-field">
                                    <label>Mật khẩu cũ:</label>
                                    <div className="input-with-icon">
                                        <input
                                            type={showOldPassword ? "text" : "password"}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                        >
                                            <i className={`fas ${showOldPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="password-field">
                                    <label>Mật khẩu mới:</label>
                                    <div className="input-with-icon">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            <i className={`fas ${showNewPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="password-field">
                                    <label>Xác nhận mật khẩu mới:</label>
                                    <div className="input-with-icon">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            <i className={`fas ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                {error && <div className="error-message">{error}</div>}
                                <button onClick={handleChangePassword} className="save-btn">
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;