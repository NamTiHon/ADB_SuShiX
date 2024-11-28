// src/pages/components/CheckReservation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/checkReservation.css';

const CheckReservation = () => {
    const [reservationId, setReservationId] = useState('');
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setReservation(null);
        setIsLoading(true);

        try {
            // Get all reservations from localStorage
            const reservations = JSON.parse(localStorage.getItem('reservations') || '{}');
            
            // Look up reservation by ID
            const found = reservations[reservationId];
            
            if (found) {
                setReservation(found);
            } else {
                setError('Không tìm thấy thông tin đặt bàn với mã này');
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi tìm kiếm');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Nav />
            <div className="tracking-container">
                <div className="tracking-form">
                    <h2>Kiểm tra đặt bàn</h2>
                    <p className="tracking-desc">
                        Nhập mã đặt bàn để kiểm tra thông tin
                    </p>

                    <form onSubmit={handleSearch}>
                        <div className="search-container">
                            <input
                                type="text"
                                value={reservationId}
                                onChange={(e) => setReservationId(e.target.value)}
                                placeholder="Nhập mã đặt bàn của bạn"
                                required
                            />
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'Đang tìm...' : 'Tìm kiếm'}
                            </button>
                        </div>
                    </form>

                    {error && <div className="error-message">{error}</div>}
                </div>

                {reservation && (
                    <div className="tracking-result">
                        <div className="tracking-header">
                            <h3>Đặt bàn #{reservation.id}</h3>
                            <span className={`status-badge ${reservation.status}`}>
                                {reservation.status === 'pending' && 'Chờ xác nhận'}
                                {reservation.status === 'confirmed' && 'Đã xác nhận'}
                                {reservation.status === 'completed' && 'Hoàn thành'}
                                {reservation.status === 'cancelled' && 'Đã hủy'}
                            </span>
                        </div>

                        <div className="tracking-timeline">
                            <div className={`timeline-step ${reservation.status === 'pending' ? 'active' : ''}`}>
                                <i className="fas fa-clock"></i>
                                <span>Chờ xác nhận</span>
                            </div>
                            <div className={`timeline-step ${reservation.status === 'confirmed' ? 'active' : ''}`}>
                                <i className="fas fa-check"></i>
                                <span>Đã xác nhận</span>
                            </div>
                            <div className={`timeline-step ${reservation.status === 'completed' ? 'active' : ''}`}>
                                <i className="fas fa-utensils"></i>
                                <span>Hoàn thành</span>
                            </div>
                        </div>

                        <div className="reservation-details">
                            <h4>Thông tin đặt bàn</h4>
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
                )}
            </div>
        </div>
    );
};

export default CheckReservation;