// Checkout.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from './Nav';
import '../css/checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems = [], total = 0, shippingFee = 0 } = location.state || {};

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        branch: '',
        paymentMethod: ''
    });

    const branches = [
        { id: 1, name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q1' },
        { id: 2, name: 'Chi nhánh Quận 3', address: '456 Lê Văn Sỹ, Q3' },
        { id: 3, name: 'Chi nhánh Quận 7', address: '789 Nguyễn Thị Thập, Q7' }
    ];

    const paymentMethods = [
        { id: 'cash', name: 'Tiền mặt', icon: '💵' },
        { id: 'momo', name: 'Ví MoMo', icon: '🌸' },
        { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: '🏦' }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Handle order submission
            // API call would go here
            alert('Đặt hàng thành công!');
            navigate('/order-success');
        } catch (error) {
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="checkout-container">
                <div className="checkout-content">
                    <div className="checkout-form">
                        <h2>Thông tin giao hàng</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Địa chỉ giao hàng</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Chọn chi nhánh</label>
                                <select
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn chi nhánh</option>
                                    {branches.map(branch => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name} - {branch.address}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Phương thức thanh toán</label>
                                <div className="payment-methods">
                                    {paymentMethods.map(method => (
                                        <div key={method.id} className="payment-method">
                                            <input
                                                type="radio"
                                                id={method.id}
                                                name="paymentMethod"
                                                value={method.id}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label htmlFor={method.id}>
                                                {method.icon} {method.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="order-summary">
                                <h3>Tổng đơn hàng</h3>
                                <div className="summary-item">
                                    <span>Tạm tính:</span>
                                    <span>{(total || 0).toLocaleString()}đ</span>
                                </div>
                                <div className="summary-item">
                                    <span>Phí giao hàng:</span>
                                    <span>{(shippingFee || 0).toLocaleString()}đ</span>
                                </div>
                                <div className="summary-total">
                                    <span>Tổng cộng:</span>
                                    <span>{((total || 0) + (shippingFee || 0)).toLocaleString()}đ</span>
                                </div>
                            </div>

                            <button type="submit" className="checkout-btn">
                                Đặt hàng
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;