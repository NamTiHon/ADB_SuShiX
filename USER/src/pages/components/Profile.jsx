// src/pages/components/Profile.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Nav from './Nav';
import '../css/profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <Nav />
            <div className="profile-container">
                <h2>Thông tin tài khoản</h2>
                <div className="profile-info">
                    <div className="info-item">
                        <label>Email:</label>
                        <span>{user?.email}</span>
                    </div>
                    <div className="info-item">
                        <label>Tên:</label>
                        <span>{user?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;