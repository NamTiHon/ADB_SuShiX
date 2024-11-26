// src/pages/components/OrderConfirmation.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/orderConfirmation.css';
import { sendOrderConfirmationEmail } from '../../utils/EmailService';
import { saveOrder } from '../../utils/OrderStorage';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, cartItems, total, shippingFee } = location.state || {};

    const handleConfirm = async () => {
        try {
            const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
            const orderDetails = {
                orderId,
                customerName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                items: cartItems,
                total,
                shippingFee,
                paymentMethod: formData.paymentMethod,
                status: 'preparing',
                orderDate: new Date().toISOString(),
                estimatedDelivery: new Date(Date.now() + 3600000).toISOString(),
                branch: formData.branch
            };

            // Save order to storage
            const saved = saveOrder(orderDetails);
            if (!saved) {
                throw new Error('Failed to save order');
            }

            // Send confirmation email
            await sendOrderConfirmationEmail(orderDetails);

            // Navigate to success page
            navigate('/order-success', {
                state: {
                    orderId,
                    formData,
                    total,
                    shippingFee,
                    items: cartItems
                }
            });
        } catch (error) {
            console.error('Error during order confirmation:', error);
            alert('Có lỗi xảy ra khi xác nhận đơn hàng. Vui lòng thử lại.');
        }
    };

    if (!formData || !cartItems) {
        navigate('/cart');
        return null;
    }

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
                                <label>Email:</label>
                                <span>{formData.email}</span>
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
                                <label>Chi nhánh:</label>
                                <span>{formData.branch}</span>
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
                        <button 
                            onClick={() => {
                                if (window.confirm('Bạn có chắc muốn quay lại? Thông tin đơn hàng sẽ không được lưu.')) {
                                    navigate(-1);
                                }
                            }} 
                            className="back-btn"
                        >
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