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
    const [branches, setBranches] = useState([]);
    const [branchLoading, setBranchLoading] = useState(true);
    const [branchError, setBranchError] = useState('');
    const [userCoupons, setUserCoupons] = useState([]);
    const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
    const [showCouponList, setShowCouponList] = useState(false);
    const [customerPhone, setCustomerPhone] = useState('');

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

    useEffect(() => {
        if (customerPhone) {
            setFormData(prev => ({
                ...prev,
                phone: customerPhone
            }));
            console.log('Setting phone:', customerPhone); 
        }
    }, [customerPhone]);
    
    useEffect(() => {
        const fetchCustomerPhone = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`http://localhost:3000/api/auth/${user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCustomerPhone(data.user.KH_SDT);
                        setFormData(prev => ({
                            ...prev,
                            phone: data.user.KH_SDT
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching customer phone:', error);
                }
            }
        };
    
        fetchCustomerPhone();
    }, [user]);
    const fetchBranches = async () => {
        try {
            setBranchLoading(true);
            const response = await fetch('http://localhost:3000/api/branches', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) throw new Error('Failed to fetch branches');
            
            const data = await response.json();
            // Format branch data to only include required fields
            const simplifiedBranches = (data.branches || []).map(branch => ({
                CN_MaChiNhanh: branch.CN_MaChiNhanh,
                CN_Ten: branch.CN_Ten || 'Chưa có tên',
                CN_DiaChi: branch.CN_DiaChi || 'Chưa có địa chỉ'
            }));
            
            setBranches(simplifiedBranches);
            
        } catch (error) {
            console.error('Branch fetch error:', error);
            setBranchError('Không thể tải danh sách chi nhánh');
            setBranches([]);
        } finally {
            setBranchLoading(false);
        }
    };
    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchUserCoupons = async () => {
        try {
            setIsLoadingCoupons(true);
            const response = await fetch(`http://localhost:3000/api/promotions`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch coupons');
            
            const data = await response.json();
            setUserCoupons(data.promotions || []);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        } finally {
            setIsLoadingCoupons(false);
        }
    };

    useEffect(() => {
        fetchUserCoupons();
    }, []);

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
        const selectedBranch = branches.find(b => b.CN_MaChiNhanh === formData.branch);
        
        if (!selectedBranch) {
            alert('Vui lòng chọn chi nhánh');
            return;
        }
    
        navigate('/order-confirmation', {
            state: {
                formData: {
                    ...formData,
                    email: user.email,
                    branch: selectedBranch
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
        const coupon = userCoupons.find(c => c.KM_MaKhuyenMai === code);
        
        if (!coupon) {
            return { valid: false, message: 'Mã giảm giá không hợp lệ' };
        }
    
        if (new Date(coupon.KM_NgayKetThuc) < new Date()) {
            return { valid: false, message: 'Mã giảm giá đã hết hạn' };
        }
    
        return { 
            valid: true, 
            coupon: {
                discount: coupon.KM_TyLeGiamGia, // Store as decimal (e.g., 0.1 for 10%)
                code: coupon.KM_MaKhuyenMai
            }
        };
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
        return Math.floor(total * appliedCoupon.discount); // Always calculate as percentage
    };

    const CouponList = () => (
        <div className="modal-overlay" onClick={() => setShowCouponList(false)}>
            <div className="coupon-list">
                <div className="coupon-list-header">
                    <h4>Mã giảm giá của bạn</h4>
                    <button onClick={() => setShowCouponList(false)}>✕</button>
                </div>
                {isLoadingCoupons ? (
                    <div>Đang tải...</div>
                ) : userCoupons.length === 0 ? (
                    <div>Không có mã giảm giá</div>
                ) : (
                    userCoupons.map(coupon => (
                        <div 
                            key={coupon.KM_MaKhuyenMai} 
                            className="coupon-item"
                            onClick={() => {
                                setCouponCode(coupon.KM_MaKhuyenMai);
                                setShowCouponList(false);
                            }}
                        >
                            <div className="coupon-code">{coupon.KM_MaKhuyenMai}</div>
                            <div className="coupon-details">
                                <div>{coupon.KM_TenKhuyenMai}</div>
                                <div>Giảm {Math.round(coupon.KM_TyLeGiamGia * 100)}%</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

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
                                    readOnly={!!customerPhone}
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
                                {branchLoading ? (
                                    <div className="loading">Đang tải chi nhánh...</div>
                                ) : branchError ? (
                                    <div className="error-message">{branchError}</div>
                                ) : branches && branches.length > 0 ? (
                                    <select
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn chi nhánh</option>
                                        {branches.map(branch => (
                                            <option 
                                                key={branch.CN_MaChiNhanh} 
                                                value={branch.CN_MaChiNhanh}
                                            >
                                                {`${branch.CN_DiaChi} (${branch.CN_Ten})`}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div className="error-message">Không có chi nhánh nào</div>
                                )}
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
                                    onClick={() => setShowCouponList(true)}
                                    className="view-coupons-btn"
                                    >
                                    Xem mã giảm giá
                                    </button>
                                    <button 
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="apply-coupon-btn"
                                    >
                                    Áp dụng
                                    </button>
                                </div>
                                {showCouponList && <CouponList />}
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
                                        <span>Giảm giá ({Math.round(appliedCoupon.discount * 100)}%):</span>
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