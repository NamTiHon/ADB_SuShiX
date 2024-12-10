// Checkout.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Nav from './Nav';
import '../css/checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { cartItems = [], total = 0, shippingFee = 0 } = location.state || {};
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        branch: '',
        paymentMethod: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || ''
            }));
        }
    }, [user]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/order-confirmation', {
            state: {
                formData: {
                    ...formData,
                    email: user.email
                },
                cartItems,
                total,
                shippingFee,
                appliedCoupon: appliedCoupon ? couponCode : null,
                discount: calculateDiscount()
            }
        });
    };
    const validateCoupon = (code) => {
        // Mock coupon database - in real app this would come from backend
        const coupons = {
          'WELCOME200': { discount: 200000, minOrder: 500000 },
          'SAVE50K': { discount: 50000, minOrder: 200000 },
        };
      
        const coupon = coupons[code];
        if (!coupon) {
          return { valid: false, message: 'Mã giảm giá không hợp lệ' };
        }
      
        if (total < coupon.minOrder) {
          return { valid: false, message: `Đơn hàng tối thiểu ${coupon.minOrder.toLocaleString()}đ` };
        }
      
        return { valid: true, coupon };
      };
    const handleApplyCoupon = () => {
        setCouponError('');
        const result = validateCoupon(couponCode.trim().toUpperCase());
        
        if (!result.valid) {
        setCouponError(result.message);
        setAppliedCoupon(null);
        return;
        }

        setAppliedCoupon(result.coupon);
        setCouponCode('');
    };
    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;
        
        if (typeof appliedCoupon.discount === 'number') {
          return appliedCoupon.discount;  // Fixed amount discount
        }
        return Math.floor(total * appliedCoupon.discount); // Percentage discount
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
                            
                            <div className="form-group">
                                <label>Mã giảm giá</label>
                                <div className="coupon-input">
                                    <input
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Nhập mã giảm giá"
                                    />
                                    <button 
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="apply-coupon-btn"
                                    >
                                    Áp dụng
                                    </button>
                                </div>
                                {couponError && <div className="error-message">{couponError}</div>}
                            </div>

                            <div className="order-summary">
                                <h3>Tổng đơn hàng</h3>
                                <div className="summary-item">
                                    <span>Tạm tính:</span>
                                    <span>{total.toLocaleString()}đ</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="summary-item discount">
                                    <span>Giảm giá:</span>
                                    <span>-{calculateDiscount().toLocaleString()}đ</span>
                                    </div>
                                )}
                                <div className="summary-item">
                                    <span>Phí giao hàng:</span>
                                    <span>{shippingFee.toLocaleString()}đ</span>
                                </div>
                                <div className="summary-total">
                                    <span>Tổng cộng:</span>
                                    <span>{(total - calculateDiscount() + shippingFee).toLocaleString()}đ</span>
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