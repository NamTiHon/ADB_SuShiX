import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/profile.css';

const Profile = () => {
    const { user, setUser, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTMy2FOhsAH3MaIkUfzPTaCYhYXf4jNVi0A&s');
    const fileInputRef = useRef(null);
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
    const [showPromotionsModal, setShowPromotionsModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const email = user.email;
    const handleInputChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            // Save user data to backend
            const response = await fetch(`http://localhost:3000/api/auth/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editedUser)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();
            setIsEditing(false);
            alert('Cập nhật thông tin thành công');
        } catch (error) {
            console.error('Error saving profile:', error);
            setError('Cập nhật thông tin thất bại, vui lòng thử lại.');
        }
    };

    const handleCancel = () => {
        setEditedUser({ ...user });
        setIsEditing(false);
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
            console.log('User details:', userDetails);
            console.log('Edited user:', editedUser);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Không thể tải thông tin người dùng.');
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            const response = await fetch('/api/profile/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });

            if (!response.ok) {
                throw new Error('Failed to change password');
            }

            alert('Đổi mật khẩu thành công');
            setShowPasswordModal(false);
        } catch (error) {
            console.error('Error changing password:', error);
            setError('Đổi mật khẩu thất bại, vui lòng thử lại.');
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
                                <div className="info-item">
                                    <label>Email:</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="KH_Email"
                                            value={editedUser.KH_Email || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.KH_Email}</span>
                                    )}
                                </div>
                                <div className="info-item">
                                    <label>Số điện thoại:</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="KH_SDT"
                                            value={editedUser.KH_SDT || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.KH_SDT}</span>
                                    )}
                                </div>
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
                                        <input
                                            type="text"
                                            name="KH_GioiTinh"
                                            value={editedUser.KH_GioiTinh || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.KH_GioiTinh}</span>
                                    )}
                                </div>
                                <div className="info-item">
                                    <label>Loại thẻ:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="TTV_LoaiThe"
                                            value={editedUser.TTV_LoaiThe || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.TTV_LoaiThe}</span>
                                    )}
                                </div>
                                <div className="info-item">
                                    <label>Điểm tích lũy:</label>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            name="TTV_DiemTichLuy"
                                            value={editedUser.TTV_DiemTichLuy || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.TTV_DiemTichLuy}</span>
                                    )}
                                </div>
                                <div className="info-item">
                                    <label>Ngày tạo thẻ:</label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="TTV_NgayTao"
                                            value={editedUser.TTV_NgayTao || ''}
                                            onChange={handleInputChange}
                                            className="edit-input"
                                        />
                                    ) : (
                                        <span>{editedUser.TTV_NgayTao}</span>
                                    )}
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
                                </div>
                                {/* Thêm các thẻ ưu đãi khác nếu cần */}
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
                                <label>Mật khẩu cũ:</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <label>Mật khẩu mới:</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <label>Xác nhận mật khẩu mới:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
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