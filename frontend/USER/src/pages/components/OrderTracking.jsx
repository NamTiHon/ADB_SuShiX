// src/pages/components/OrderTracking.jsx
import React, { useState } from 'react';
import Nav from './Nav';
import '../css/orderTracking.css';
import { getOrder } from '../../utils/OrderStorage';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [setIsLoading] = useState(false);
    const calculateSubtotal = (items) => {
        if (!items || !Array.isArray(items)) return 0;
        return items.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const searchId = orderId.trim().toUpperCase();
            const foundOrder = getOrder(searchId);
            
            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                setError('Không tìm thấy đơn hàng với mã này');
                setOrder(null);
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi tìm kiếm đơn hàng');
            setOrder(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Nav />
            <div className="tracking-container">
                <div className="tracking-form">
                    <h2>Kiểm tra đơn hàng</h2>
                    <p className="tracking-desc">
                        Nhập mã đơn hàng để theo dõi tình trạng giao hàng của bạn
                    </p>
                    
                    <form onSubmit={handleSearch}>
                        <div className="search-container">
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Nhập mã đơn hàng của bạn"
                                required
                            />
                            <button type="submit">Tìm kiếm</button>
                        </div>
                    </form>

                    {error && <div className="error-message">{error}</div>}
                </div>

                {order && (
                    <div className="tracking-result">
                        <div className="order-header">
                            <h3>Đơn hàng #{order.orderId}</h3>
                            <span className={`status-badge ${order.status}`}>
                                {order.status === 'preparing' && 'Đang chuẩn bị'}
                                {order.status === 'shipping' && 'Đang giao'}
                                {order.status === 'delivered' && 'Đã giao'}
                            </span>
                        </div>

                        <div className="tracking-timeline">
                            <div className={`timeline-step ${order.status === 'preparing' ? 'active' : ''}`}>
                                <i className="fas fa-box"></i>
                                <span>Đang chuẩn bị</span>
                            </div>
                            <div className={`timeline-step ${order.status === 'shipping' ? 'active' : ''}`}>
                                <i className="fas fa-shipping-fast"></i>
                                <span>Đang giao</span>
                            </div>
                            <div className={`timeline-step ${order.status === 'delivered' ? 'active' : ''}`}>
                                <i className="fas fa-check-circle"></i>
                                <span>Đã giao</span>
                            </div>
                        </div>

                        <div className="order-details">
                            <div className="detail-section">
                                <h4>Thông tin giao hàng</h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Người nhận:</label>
                                        <span>{order.customerName}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Số điện thoại:</label>
                                        <span>{order.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Địa chỉ:</label>
                                        <span>{order.address}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Chi nhánh:</label>
                                        <span>{order.branchName}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>Chi tiết đơn hàng</h4>
                                <div className="order-items">
                                    {order.items?.map(item => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-info">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-quantity">x{item.quantity}</span>
                                            </div>
                                            <span className="item-price">
                                                {(item.price * item.quantity).toLocaleString()}đ
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Tạm tính:</span>
                                        <span>{calculateSubtotal(order?.items || []).toLocaleString()}đ</span>
                                    </div>
                                    {(order?.discount > 0) && (
                                        <div className="summary-row discount">
                                            <span>Giảm giá:</span>
                                            <span>-{(order?.discount || 0).toLocaleString()}đ</span>
                                            {order?.appliedCoupon && (
                                                <small className="coupon-code">Mã: {order.appliedCoupon}</small>
                                            )}
                                        </div>
                                    )}
                                    <div className="summary-row">
                                        <span>Phí vận chuyển:</span>
                                        <span>{(order?.shippingFee || 0).toLocaleString()}đ</span>
                                    </div>
                                    <div className="summary-total">
                                        <span>Tổng cộng:</span>
                                        <span>
                                            {(calculateSubtotal(order?.items || []) - (order?.discount || 0) + (order?.shippingFee || 0)).toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;