// src/pages/components/Notifications.jsx
import React from 'react';
import Nav from './Nav';
import '../css/notifications.css';

const Notifications = () => {
    const notifications = [
        {
            id: 1,
            type: 'order',
            title: 'Đơn hàng #123 đã được xác nhận',
            message: 'Đơn hàng của bạn đang được chuẩn bị',
            time: '2 giờ trước',
            isRead: false,
            icon: 'fa-shopping-bag'
        },
        {
            id: 2,
            type: 'promotion',
            title: 'Khuyến mãi mới',
            message: 'Giảm 20% cho đơn hàng trên 500k',
            time: '1 ngày trước',
            isRead: true,
            icon: 'fa-gift'
        },
        {
            id: 3,
            type: 'reservation',
            title: 'Xác nhận đặt bàn',
            message: 'Bàn số 5 đã được xác nhận cho tối nay',
            time: '3 giờ trước',
            isRead: false,
            icon: 'fa-table'
        }
    ];

    return (
        <div>
            <Nav />
            <div className="notifications-container">
                <h2>Thông báo của bạn</h2>
                <div className="notifications-list">
                    {notifications.map(notification => (
                        <div 
                            key={notification.id} 
                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                        >
                            <div className="notification-icon">
                                <i className={`fas ${notification.icon}`}></i>
                            </div>
                            <div className="notification-content">
                                <h3>{notification.title}</h3>
                                <p>{notification.message}</p>
                                <span className="notification-time">
                                    <i className="far fa-clock"></i>
                                    {notification.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notifications;