import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
                    
                    <div className="reservation-details">
                        <h2>Chi tiết đặt bàn</h2>
                        <p><strong>Mã đặt bàn:</strong> {reservation.PDM_MaPhieu}</p>
                        <p><strong>Họ tên:</strong> {reservation.fullName}</p>
                        <p><strong>Số điện thoại:</strong> {reservation.PDM_SDT_KH}</p>
                        <p><strong>Số người:</strong> {reservation.PDM_SoLuongKH}</p>
                        <p><strong>Thời gian:</strong> {new Date(reservation.PDM_ThoiGianDen).toLocaleString()}</p>
                        <p><strong>Số bàn:</strong> {reservation.PDM_SoBan}</p>
                        <p><strong>Vị trí:</strong> {reservation.tablePosition}</p>
                        <p><strong>Ghi chú:</strong> {reservation.PDM_GhiChuThem || 'Không có'}</p>
                    </div>

                    <div className="success-actions">
                        <button onClick={() => navigate('/order-management')} className="history-btn">
                            Xem lịch sử đặt bàn
                        </button>
                        <button onClick={() => navigate('/')} className="home-btn">
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationSuccess;