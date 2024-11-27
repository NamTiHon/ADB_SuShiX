// src/pages/components/CheckReservation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/checkReservation.css';

const CheckReservation = () => {
    const [reservationId, setReservationId] = useState('');
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setReservation(null);
    
        // Get all reservations from localStorage
        const reservations = JSON.parse(localStorage.getItem('reservations') || '{}');
        
        // Look up reservation by ID
        const found = reservations[reservationId];
        
        if (found) {
            setReservation(found);
        } else {
            setError('Không tìm thấy đơn đặt bàn với mã này');
        }
    };

    return (
        <div>
            <Nav />
            <div className="tracking-container">
                <div className="tracking-content">
                    <h2>Kiểm tra đặt bàn</h2>
                    
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Nhập mã đặt bàn..."
                            value={reservationId}
                            onChange={(e) => setReservationId(e.target.value.toUpperCase())}
                            required
                        />
                        <button type="submit">Kiểm tra</button>
                    </form>

                    {error && <div className="error-message">{error}</div>}

                    {reservation && (
                        <div className="order-details">
                            <div className="status-timeline">
                                <div className={`status-step ${reservation.status === 'pending' ? 'active' : ''}`}>
                                    <div className="status-icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div className="status-label">Chờ xác nhận</div>
                                </div>
                                <div className={`status-step ${reservation.status === 'confirmed' ? 'active' : ''}`}>
                                    <div className="status-icon">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="status-label">Đã xác nhận</div>
                                </div>
                            </div>

                            <div className="details-container">
                                <div className="details-section">
                                    <h3>Thông tin đặt bàn</h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <label>Mã đặt bàn:</label>
                                            <span>#{reservation.id}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Khách hàng:</label>
                                            <span>{reservation.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Số điện thoại:</label>
                                            <span>{reservation.phone}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Chi nhánh:</label>
                                            <span>{reservation.branch}</span>
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
                                            <div className="info-item full-width">
                                                <label>Ghi chú:</label>
                                                <span>{reservation.note}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckReservation;