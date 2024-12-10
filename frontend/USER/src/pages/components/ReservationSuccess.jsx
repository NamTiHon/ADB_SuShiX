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
                <p className="booking-id">Mã đặt bàn: #{reservation.id}</p>  {/* Add this line */}

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
                            <div className="info-item">
                                <label>Bàn số:</label>
                                <span>{reservation.tableId}</span>
                            </div>
    
                            {reservation.note && (
                                <div className="info-item">
                                    <label>Ghi chú:</label>
                                    <span>{reservation.note}</span>
                                </div>
                            )}
                        </div>

                        {reservation.selectedDishes && reservation.selectedDishes.length > 0 && (
                            <div className="pre-order">
                                <h3>Món đã đặt trước</h3>
                                <div className="items-list">
                                    {reservation.selectedDishes.map(dish => (
                                        <div key={dish.id} className="pre-order-item">
                                            <img src={dish.image} alt={dish.name} className="dish-image" />
                                            <div className="dish-info">
                                                <h4 className="dish-name">{dish.name}</h4>
                                                <p className="dish-description">{dish.description}</p>
                                                <div className="dish-details">
                                                    <span className="quantity">Số lượng: {dish.quantity}</span>
                                                    <span className="price">
                                                        {(dish.price * dish.quantity).toLocaleString()}đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pre-order-total">
                                        <strong>Tổng cộng:</strong>
                                        <strong className="total-amount">
                                            {reservation.selectedDishes
                                                .reduce((sum, dish) => sum + (dish.price * dish.quantity), 0)
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