// src/pages/components/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import '../css/orderTracking.css';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [dishes, setDishes] = useState({});
    useEffect(() => {
        const savedName = localStorage.getItem('fullName');
        if (savedName) {
            setCustomerName(savedName);
        }
    }, []);
    const getStatusInfo = (status) => {
        switch (status) {
            case "Chờ xác nhận": return { label: 'Chờ xác nhận', icon: 'clock', class: 'pending' };
            case "Đã xác nhận": return { label: 'Đã xác nhận', icon: 'check', class: 'confirmed' };
            case "Đang giao": return { label: 'Đang giao', icon: 'shipping-fast', class: 'shipping' };
            case "Chờ đến": return { label: 'Chờ đến', icon: 'calendar-check', class: 'waiting' };
            case "Đã hoàn thành": return { label: 'Đã hoàn thành', icon: 'check-circle', class: 'completed' };
            case "Đã hủy": return { label: 'Đã hủy', icon: 'times-circle', class: 'cancelled' };
            default: return { label: 'Không xác định', icon: 'question', class: 'unknown' };
        }
    };
    const calculateSubtotal = (items) => {
        if (!items || !Array.isArray(items)) return 0;
        return items.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 0)), 0);
    };
    const fetchDishDetails = async (dishId) => {
        try {
            const response = await fetch('http://localhost:3000/api/dishes');
            if (response.ok) {
                const { dishes } = await response.json(); // Destructure dishes array
                console.log('Available dishes:', dishes);
                
                const dish = dishes.find(d => d.MA_MaMon === dishId);
                console.log('Found dish:', dish);
                
                if (dish) {
                    return {
                        id: dish.MA_MaMon,
                        name: dish.MA_TenMon,
                        price: dish.MA_GiaHienTai,
                        image: dish.MA_HinhAnh,
                        category: dish.MA_TenDanhMuc
                    };
                }
            }
        } catch (err) {
            console.error(`Error fetching dish ${dishId}:`, err);
        }
        return null;
    };
    
    const transformOrderItems = async (orderItems) => {
        try {
            // Handle case where MDD_MaMon is null
            if (orderItems.length === 1 && !orderItems[0].MDD_MaMon) {
                return [];
            }
    
            const itemsWithDetails = await Promise.all(
                orderItems.map(async item => {
                    if (!item.MDD_MaMon) return null;
                    
                    const dishDetails = await fetchDishDetails(item.MDD_MaMon);
                    return {
                        id: item.MDD_MaMon,
                        dishId: item.MDD_MaMon,
                        quantity: item.MDD_SoLuong,
                        name: dishDetails ? dishDetails.name : `Món #${item.MDD_MaMon}`,
                        price: dishDetails ? dishDetails.price * 1000 : 0,
                        image: dishDetails ? dishDetails.image : null
                    };
                })
            );
            return itemsWithDetails.filter(Boolean);
        } catch (err) {
            console.error('Error transforming items:', err);
            return [];
        }
    };
    const fetchBillByOrderId = async (orderId) => {
        try {
            const response = await fetch('http://localhost:3000/api/bills');
            if (response.ok) {
                const responseData = await response.json();
                console.log('Bills response:', responseData);
                
                // Access bills from data property
                const bills = responseData.data;
                if (!bills || !Array.isArray(bills)) {
                    console.error('Invalid bills data format');
                    return null;
                }
    
                const matchingBill = bills.find(bill => bill.HD_MaPhieu === orderId);
                console.log('Found bill:', matchingBill);
                
                return matchingBill;
            }
        } catch (err) {
            console.error('Error fetching bill:', err);
        }
        return null;
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Fetch order
            const response = await fetch(`http://localhost:3000/api/order/${orderId.trim()}`);
            if (!response.ok) throw new Error('Không tìm thấy đơn hàng');
            
            const data = await response.json();
            if (!data.order?.length) throw new Error('Không có thông tin đơn hàng');
    
            const orderDetails = data.order[0];
            
         
            // Fetch items and branch info
            const items = await transformOrderItems(data.order);
            let branchInfo = null;
            if (orderDetails.PDM_MaChiNhanh) {
                const branchResponse = await fetch('http://localhost:3000/api/branches');
                if (branchResponse.ok) {
                    const branchData = await branchResponse.json();
                    branchInfo = branchData.branches.find(
                        branch => branch.CN_MaChiNhanh === orderDetails.PDM_MaChiNhanh
                    );
                }
            }
            const billDetails = await fetchBillByOrderId(orderDetails.PDM_MaPhieu);
            console.log('Bill details for order:', billDetails);
            const orderTime = new Date(orderDetails.PDM_ThoiGianDat);
            const deliveryTime = new Date(orderTime.getTime() + 45 * 60000); // Add 45 minutes
            const transformedOrder = {
                orderId: orderDetails.PDM_MaPhieu,
                orderDate: orderTime.toLocaleString('vi-VN'),
                arrivalTime: orderDetails.PDM_ThoiGianDen 
                    ? new Date(orderDetails.PDM_ThoiGianDen).toLocaleString('vi-VN')
                    : deliveryTime.toLocaleString('vi-VN'),
                phone: orderDetails.PDM_SDT_KH,
                address: orderDetails.PDM_SoBan 
                    ? `Bàn ${orderDetails.PDM_SoBan} - ${orderDetails.PDM_SoLuongKH} khách` 
                    : orderDetails.PDM_DiaChiCanGiao,
                isTableBooking: !!orderDetails.PDM_SoBan,
                branchId: orderDetails.PDM_MaChiNhanh,
                customerName: customerName,
                branchName: branchInfo ? `${branchInfo.CN_DiaChi} (${branchInfo.CN_Ten})` : 'Đang cập nhật',
                status: orderDetails.PDM_TrangThai || 'Không xác định',
                items: items,
                totalBeforeDiscount: billDetails?.HD_TongTruocGiam || 0,
                discount: billDetails?.HD_SoTienGiam || 0, 
                finalTotal: billDetails?.HD_TongTienThanhToan || 0
            };
    
            setOrder(transformedOrder);
        } catch (err) {
            setError(err.message);
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
                            
                        </div>

                        <div className="tracking-timeline">
                            {[
                                ...(order.status === "Đã hủy" ? ["Đã hủy"] : []),
                                'Chờ xác nhận', 
                                'Đã xác nhận', 
                                order.isTableBooking ? 'Chờ đến' : 'Đang giao', 
                                'Đã hoàn thành'
                            ].map((step) => {
                                const statusInfo = getStatusInfo(step);
                                const orderStatus = getStatusInfo(order.status);
                                const statusOrder = [
                                    ...(order.status === "Đã hủy" ? ["Đã hủy"] : []),
                                    'Chờ xác nhận', 
                                    'Đã xác nhận', 
                                    order.isTableBooking ? 'Chờ đến' : 'Đang giao', 
                                    'Đã hoàn thành'
                                ];
                                const currentIndex = statusOrder.indexOf(order.status);
                                const stepIndex = statusOrder.indexOf(step);
                                const isActive = order.status !== 'Đã hủy' ? stepIndex <= currentIndex : step === "Đã hủy";
                                const isCurrent = step === order.status;
                                
                                return (
                                    <div key={step} 
                                        className={`timeline-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''} ${order.status === 'Đã hủy' ? 'cancelled' : ''}`}
                                    >
                                        <div className="step-icon">
                                            <i className={`fas fa-${statusInfo.icon}`}></i>
                                        </div>
                                        <span>{statusInfo.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="order-details">
                            <div className="detail-section">
                                <h4>{order.isTableBooking ? 'Thông tin đặt bàn' : 'Thông tin giao hàng'}</h4>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Thời gian đặt:</label>
                                        <span>{order.orderDate}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>{order.isTableBooking ? 'Thời gian đến:' : 'Thời gian giao:'}</label>
                                        <span>{order.arrivalTime}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Người nhận:</label>
                                        <span>{customerName}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Số điện thoại:</label>
                                        <span>{order.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>{order.isTableBooking ? 'Thông tin bàn:' : 'Địa chỉ:'}</label>
                                        <span>{order.address}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Chi nhánh:</label>
                                        <span>{order.branchName}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h4>{order.isTableBooking ? 'Món đặt trước' : 'Chi tiết đơn hàng'}</h4>
                                {order.items?.length > 0 ? (
                                    <>
                                        <div className="order-items">
                                            {order.items.map(item => (
                                                <div key={item.id} className="order-item">
                                                    {item.image && (
                                                        <div className="item-image">
                                                            <img src={item.image} alt={item.name} />
                                                        </div>
                                                    )}
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

                                        {!order.isTableBooking && (
                                            <div className="order-summary">
                                                <div className="summary-row">
                                                    <span>Tạm tính:</span>
                                                    <span>{((order.totalBeforeDiscount || 0) - (order.totalBeforeDiscount < 500000 ? 30000 : 0))?.toLocaleString()}đ</span>
                                                </div>
                                                {order.totalBeforeDiscount < 500000 && (
                                                    <div className="summary-row">
                                                        <span>Phí vận chuyển:</span>
                                                        <span>30.000đ</span>
                                                    </div>
                                                )}
                                                {order.discount > 0 && (
                                                    <div className="summary-row discount">
                                                        <span>Giảm giá:</span>
                                                        <span>-{order.discount?.toLocaleString()}đ</span>
                                                        {order?.appliedCoupon && (
                                                            <small className="coupon-code">Mã: {order.appliedCoupon}</small>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="summary-total">
                                                    <span>Tổng cộng:</span>
                                                    <span>{order.finalTotal?.toLocaleString()}đ</span>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="no-items-message">
                                        <p>Không có món ăn nào được đặt trước</p>
                                        {order.isTableBooking && (
                                            <small>Quý khách có thể đặt món khi đến nhà hàng</small>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;