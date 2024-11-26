// src/pages/components/OrderConfirmation.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/orderConfirmation.css';
import { sendOrderConfirmationEmail } from '../../utils/EmailService';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, cartItems, total, shippingFee } = location.state || {};

    const handleConfirm = async () => {
        try {
            const orderDetails = {
                id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                customerName: formData.fullName,
                items: cartItems,
                total: total + shippingFee,
                address: formData.address,
                estimatedDelivery: new Date(Date.now() + 3600000).toLocaleString() // 1 hour from now
            };
    
            // Send confirmation email
            await sendOrderConfirmationEmail(orderDetails, formData.email);
    
            navigate('/order-success', {
                state: {
                    formData,
                    total,
                    orderId: orderDetails.id
                }
            });
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="confirmation-container">
                <div className="confirmation-content">
                    <h2>Xác nhận đơn hàng</h2>
                    
                    <div className="order-details">
                        <h3>Thông tin giao hàng</h3>
                        <div className="info-group">
                            <div className="info-item">
                                <label>Họ và tên:</label>
                                <span>{formData.fullName}</span>
                            </div>
                            <div className="info-item">
                                <label>Số điện thoại:</label>
                                <span>{formData.phone}</span>
                            </div>
                            <div className="info-item">
                                <label>Địa chỉ:</label>
                                <span>{formData.address}</span>
                            </div>
                            <div className="info-item">
                                <label>Phương thức thanh toán:</label>
                                <span>{
                                    formData.paymentMethod === 'cash' ? 'Tiền mặt' :
                                    formData.paymentMethod === 'momo' ? 'Ví MoMo' :
                                    'Chuyển khoản ngân hàng'
                                }</span>
                            </div>
                        </div>

                        <h3>Món đã chọn</h3>
                        <div className="selected-items">
                            {cartItems?.map(item => (
                                <div key={item.id} className="item-card">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-info">
                                        <h4>{item.name}</h4>
                                        <p>Số lượng: {item.quantity}</p>
                                        <p className="price">
                                            {(item.price * item.quantity).toLocaleString()}đ
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Tạm tính:</span>
                                <span>{total.toLocaleString()}đ</span>
                            </div>
                            <div className="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span>{shippingFee.toLocaleString()}đ</span>
                            </div>
                            <div className="summary-total">
                                <span>Tổng cộng:</span>
                                <span>{(total + shippingFee).toLocaleString()}đ</span>
                            </div>
                        </div>
                    </div>

                    <div className="confirmation-actions">
                        <button onClick={() => navigate(-1)} className="back-btn">
                            Quay lại
                        </button>
                        <button onClick={handleConfirm} className="confirm-btn">
                            Xác nhận đặt hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;