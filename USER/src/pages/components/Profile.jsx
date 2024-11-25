// src/pages/components/Profile.jsx
import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import Nav from './Nav';
import '../css/profile.css';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [previewUrl, setPreviewUrl] = useState(user?.avatar || '/default-avatar.png');
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Preview image
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);

            // Here you would typically upload to server
            // For now just update local state
            setUser({
                ...user,
                avatar: reader.result
            });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <Nav />
            <div className="profile-container">
                <div className="profile-grid">
                    {/* Left Sidebar */}
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
                            <button onClick={triggerFileInput} className="change-avatar-btn">
                                Thay đổi ảnh
                            </button>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="profile-content">
                        <h2>Thông tin cá nhân</h2>
                        <div className="profile-info">
                            <div className="info-group">
                                <div className="info-item">
                                    <label>Họ và tên:</label>
                                    <span>{user?.fullName}</span>
                                </div>
                                <div className="info-item">
                                    <label>Email:</label>
                                    <span>{user?.email}</span>
                                </div>
                                <div className="info-item">
                                    <label>Số điện thoại:</label>
                                    <span>{user?.phone}</span>
                                </div>
                                <div className="info-item">
                                    <label>Địa chỉ:</label>
                                    <span>{user?.address}</span>
                                </div>
                                <div className="info-item">
                                    <label>Ngày sinh:</label>
                                    <span>{user?.birthDate}</span>
                                </div>
                                <div className="info-item">
                                    <label>CCCD:</label>
                                    <span>{user?.idCard}</span>
                                </div>
                                <div className="info-item">
                                    <label>Giới tính:</label>
                                    <span>{user?.gender}</span>
                                </div>
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