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
    const { formData, cartItems, total, shippingFee, discount, appliedCoupon } = location.state || {};

    // Get branch name helper
    const getBranchName = (branchId) => {
        const branches = {
            '1': 'Chi nhánh Quận 1 - 123 Nguyễn Huệ',
            '2': 'Chi nhánh Quận 3 - 456 Lê Văn Sỹ',
            '3': 'Chi nhánh Quận 7 - 789 Nguyễn Thị Thập'
        };
        return branches[branchId] || 'Chi nhánh không xác định';
    };

    const handleConfirm = async () => {
        try {
            // Generate better order ID
            const date = new Date();
            const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
            const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
            const orderId = `SX${dateStr}${randomStr}`;

            // Calculate final total with proper validation
            const subtotal = total || 0;
            const discountAmount = discount || 0;
            const shipping = shippingFee || 0;
            const finalTotal = subtotal - discountAmount + shipping;

            // Validate inputs
            if (!formData?.fullName || !formData?.email || !formData?.phone || !formData?.address) {
                throw new Error('Vui lòng điền đầy đủ thông tin giao hàng');
            }

            if (!cartItems?.length) {
                throw new Error('Giỏ hàng trống');
            }

            const orderDetails = {
                orderId,
                customerName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity
                })),
                subtotal: subtotal,
                discount: discountAmount,
                appliedCoupon: appliedCoupon || null,
                shippingFee: shipping,
                finalTotal,
                paymentMethod: formData.paymentMethod,
                paymentMethodText: formData.paymentMethod === 'cash' ? 'Tiền mặt' :
                                 formData.paymentMethod === 'momo' ? 'Ví MoMo' :
                                 'Chuyển khoản ngân hàng',
                status: 'preparing',
                orderDate: new Date().toISOString(),
                estimatedDelivery: new Date(Date.now() + 2 * 3600000).toISOString(),
                branch: formData.branch,
                branchName: getBranchName(formData.branch),
                trackingUrl: `http://sushix.com/tracking/${orderId}`
            };

            // Save order
            const saved = await saveOrder(orderDetails);
            if (!saved) {
                throw new Error('Không thể lưu đơn hàng');
            }

            // Send confirmation email
            await sendOrderConfirmationEmail(orderDetails);

            // Navigate to success page
            navigate('/order-success', {
                state: {
                    orderId,
                    formData,
                    total: subtotal,
                    discount: discountAmount,
                    appliedCoupon,
                    shippingFee: shipping,
                    finalTotal
                }
            });

        } catch (error) {
            console.error('Lỗi xác nhận đơn hàng:', error);
            alert(error.message || 'Có lỗi xảy ra khi xác nhận đơn hàng. Vui lòng thử lại.');
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

                        <h3>Thông tin đơn hàng</h3>
                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Tạm tính:</span>
                                <span>{total.toLocaleString()}đ</span>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Giảm giá:</span>
                                    <span>-{discount.toLocaleString()}đ</span>
                                    {appliedCoupon && (
                                        <small className="coupon-code">Mã: {appliedCoupon}</small>
                                    )}
                                </div>
                            )}
                            <div className="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span>{shippingFee.toLocaleString()}đ</span>
                            </div>
                            <div className="summary-total">
                                <span>Tổng cộng:</span>
                                <span>{(total - (discount || 0) + shippingFee).toLocaleString()}đ</span>
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