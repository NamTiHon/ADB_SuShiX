// src/pages/components/ReservationSuccess.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/reservationSuccess.css';

const ReservationSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { reservation } = location.state || {};

    if (!reservation) {
        navigate('/reservation');
        return null;
    }

    return (
        <div>
            <Nav />
            <div className="success-container">
                <div className="success-content">
                    <div className="success-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    
                    <h1>Đặt bàn thành công!</h1>
                    <p className="booking-id">Mã đặt bàn: #{reservation.id}</p>
                    
                    <div className="success-message">
                        <p>Cảm ơn bạn đã đặt bàn tại SuShiX!</p>
                        <p>Chúng tôi sẽ liên hệ để xác nhận trong thời gian sớm nhất.</p>
                    </div>

                    <div className="booking-info">
                        <h3>Chi tiết đặt bàn</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Khách hàng:</label>
                                <span>{reservation.name}</span>
                            </div>
                            <div className="info-item">
                                <label>Số điện thoại:</label>
                                <span>{reservation.phone}</span>
                            </div>
                            <div className="info-item">
                                <label>Ngày:</label>
                                <span>{reservation.date}</span>
                            </div>
                            <div className="info-item">
                                <label>Giờ:</label>
                                <span>{reservation.time}</span>
                            </div>
                            <div className="info-item">
                                <label>Số người:</label>
                                <span>{reservation.guests} người</span>
                            </div>
                            {reservation.note && (
                                <div className="info-item">
                                    <label>Ghi chú:</label>
                                    <span>{reservation.note}</span>
                                </div>
                            )}
                        </div>

                        {reservation.selectedItems && reservation.selectedItems.length > 0 && (
                            <div className="pre-order">
                                <h3>Món đã đặt trước</h3>
                                <div className="items-list">
                                    {reservation.selectedItems.map(item => (
                                        <div key={item.id} className="pre-order-item">
                                            <span>{item.name} x{item.quantity}</span>
                                            <span>{(item.price * item.quantity).toLocaleString()}đ</span>
                                        </div>
                                    ))}
                                    <div className="pre-order-total">
                                        <strong>Tổng cộng:</strong>
                                        <strong>
                                            {reservation.selectedItems
                                                .reduce((sum, item) => sum + (item.price * item.quantity), 0)
                                                .toLocaleString()}đ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="success-actions">
                        <button onClick={() => navigate('/')} className="home-btn">
                            <i className="fas fa-home"></i>
                            Về trang chủ
                        </button>
                        <button onClick={() => navigate('/check-reservation')} className="check-btn">
                            <i className="fas fa-search"></i>
                            Kiểm tra đặt bàn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationSuccess;