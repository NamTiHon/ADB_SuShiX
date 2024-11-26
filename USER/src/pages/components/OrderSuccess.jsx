import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/orderSuccess.css';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData, total, orderId } = location.state || {};

    useEffect(() => {
        if (!location.state) {
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!location.state) {
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
                    
                    <h1>Đặt hàng thành công!</h1>
                    <p className="order-id">Mã đơn hàng: #{orderId}</p>
                    
                    <div className="success-message">
                        <p>Cảm ơn bạn đã đặt hàng tại SuShiX!</p>
                        <p>Chúng tôi sẽ giao hàng đến bạn trong thời gian sớm nhất.</p>
                    </div>

                    <div className="delivery-info">
                        <h3>Thông tin giao hàng</h3>
                        <p><strong>Người nhận:</strong> {formData?.fullName}</p>
                        <p><strong>Số điện thoại:</strong> {formData?.phone}</p>
                        <p><strong>Địa chỉ:</strong> {formData?.address}</p>
                        <p><strong>Tổng tiền:</strong> {total?.toLocaleString()}đ</p>
                    </div>

                    <div className="success-actions">
                        <button onClick={() => navigate('/')} className="home-btn">
                            <i className="fas fa-home"></i>
                            Về trang chủ
                        </button>
                        <button onClick={() => navigate('/profile')} className="orders-btn">
                            <i className="fas fa-list"></i>
                            Xem đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;