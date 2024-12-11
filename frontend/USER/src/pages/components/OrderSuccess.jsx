import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/orderSuccess.css';
import { getOrder, saveOrder } from '../../utils/OrderStorage';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData, total, orderId, shippingFee, discount, appliedCoupon } = location.state || {};

    useEffect(() => {
        if (location.state?.orderId) {
            const order = getOrder(location.state.orderId);
            console.log('Verified saved order:', order); // Debug log

            // Save the new order to the storage or backend
            saveOrder({
                orderId: orderId,
                date: new Date().toLocaleDateString(),
                status: 'Pending',
                total: total,
                ...formData
            });
        }
    }, [location.state]);

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
                    
                    <div className="delivery-info">
                        <h3>Thông tin giao hàng</h3>
                        <p><strong>Người nhận:</strong> {formData?.fullName}</p>
                        <p><strong>Số điện thoại:</strong> {formData?.phone}</p>
                        <p><strong>Địa chỉ:</strong> {formData?.address}</p>
                        <div className="order-summary">
                            <p><strong>Tạm tính:</strong> {total?.toLocaleString()}đ</p>
                            {discount > 0 && (
                                <div className="discount-info">
                                    <p><strong>Giảm giá:</strong> -{discount.toLocaleString()}đ</p>
                                    {appliedCoupon && (
                                        <small className="coupon-code">Mã giảm giá: {appliedCoupon}</small>
                                    )}
                                </div>
                            )}
                            <p><strong>Phí vận chuyển:</strong> {shippingFee?.toLocaleString()}đ</p>
                            <p className="total-amount">
                                <strong>Tổng tiền:</strong> {(total - (discount || 0) + shippingFee).toLocaleString()}đ
                            </p>
                        </div>
                    </div>

                    <div className="success-actions">
                        <button onClick={() => navigate('/')} className="home-btn">
                            <i className="fas fa-home"></i>
                            Về trang chủ
                        </button>
                        <button onClick={() => navigate('/order-management')} className="orders-btn">
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