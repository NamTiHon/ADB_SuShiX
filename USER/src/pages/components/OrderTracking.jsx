// src/pages/components/OrderTracking.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/orderTracking.css';


const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    
    const handleSearch = (e) => {
        e.preventDefault();
        // Mock data - replace with API call
        const mockOrder = {
            id: orderId,
            status: 'preparing', // preparing, shipping, delivered
            customerName: 'Nguyễn Văn A',
            phone: '0123456789',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            items: [
                { id: 1, name: 'Sushi Cá Hồi', quantity: 2, price: 150000 },
                { id: 2, name: 'Maki Roll', quantity: 1, price: 120000 }
            ],
            total: 420000,
            shippingFee: 30000,
            orderDate: '2024-03-20 14:30',
            estimatedDelivery: '2024-03-20 15:30'
        };
        
        setOrder(mockOrder);
        setError('');
    };

    return (
        <div>
            <Nav />
            <div className="tracking-container">
                <div className="tracking-content">
                    <h2>Kiểm tra đơn hàng</h2>
                    
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Nhập mã đơn hàng..."
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                        />
                        <button type="submit">Kiểm tra</button>
                    </form>

                    {error && <div className="error-message">{error}</div>}

                    {order && (
                        <div className="order-details">
                            <div className="status-timeline">
                                <div className={`status-step ${order.status === 'preparing' ? 'active' : ''}`}>
                                    <div className="status-icon">
                                        <i className="fas fa-utensils"></i>
                                    </div>
                                    <div className="status-label">Đang chuẩn bị</div>
                                </div>
                                <div className={`status-step ${order.status === 'shipping' ? 'active' : ''}`}>
                                    <div className="status-icon">
                                        <i className="fas fa-motorcycle"></i>
                                    </div>
                                    <div className="status-label">Đang giao</div>
                                </div>
                                <div className={`status-step ${order.status === 'delivered' ? 'active' : ''}`}>
                                    <div className="status-icon">
                                        <i className="fas fa-check-circle"></i>
                                    </div>
                                    <div className="status-label">Đã giao</div>
                                </div>
                            </div>

                            <div className="order-info">
                                <h3>Thông tin đơn hàng #{order.id}</h3>
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
                                        <label>Thời gian đặt:</label>
                                        <span>{order.orderDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Dự kiến giao:</label>
                                        <span>{order.estimatedDelivery}</span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    <h4>Món đã đặt</h4>
                                    {order.items.map(item => (
                                        <div key={item.id} className="order-item">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">x{item.quantity}</span>
                                            <span className="item-price">
                                                {(item.price * item.quantity).toLocaleString()}đ
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Tạm tính:</span>
                                        <span>{order.total.toLocaleString()}đ</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Phí giao hàng:</span>
                                        <span>{order.shippingFee.toLocaleString()}đ</span>
                                    </div>
                                    <div className="summary-total">
                                        <span>Tổng cộng:</span>
                                        <span>{(order.total + order.shippingFee).toLocaleString()}đ</span>
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

export default OrderTracking;