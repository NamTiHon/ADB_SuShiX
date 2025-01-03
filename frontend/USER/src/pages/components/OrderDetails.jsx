import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/OrderDetails.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const [orderResponse, billResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/order/${orderId}`),
                    fetch('http://localhost:3000/api/bills')
                ]);

                if (!orderResponse.ok || !billResponse.ok) {
                    throw new Error('Failed to fetch order details');
                }

                const [orderData, billsData] = await Promise.all([
                    orderResponse.json(),
                    billResponse.json()
                ]);

                const orderDetails = orderData.order[0];
                const bill = billsData.data.find(b => b.HD_MaPhieu === orderId);

                setOrder({
                    orderId: orderDetails.PDM_MaPhieu,
                    date: new Date(orderDetails.PDM_ThoiGianDat).toLocaleString('vi-VN'),
                    status: orderDetails.PDM_TrangThai || 'Không xác định',
                    totalBeforeDiscount: bill?.HD_TongTruocGiam || 0,
                    discount: bill?.HD_SoTienGiam || 0,
                    total: bill?.HD_TongTienThanhToan || 0,
                    customerPhone: orderDetails.PDM_SDT_KH,
                    address: orderDetails.PDM_DiaChiCanGiao,
                    tableNumber: orderDetails.PDM_SoBan,
                    guestCount: orderDetails.PDM_SoLuongKH,
                    isTableBooking: !!orderDetails.PDM_SoBan,
                    arrivalTime: orderDetails.PDM_ThoiGianDen
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Lỗi: {error}</div>;
    if (!order) return <div className="not-found">Không tìm thấy đơn hàng</div>;

    return (
        <div>
            <Nav />
            <div className="order-tracking">
                <h2>Theo dõi đơn hàng #{order.orderId}</h2>

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

                <div className="order-info">
                    <div className="info-section">
                        <h3>{order.isTableBooking ? 'Thông tin đặt bàn' : 'Thông tin giao hàng'}</h3>
                        <p><i className="fas fa-clock"></i> Thời gian đặt: {order.date}</p>
                        {order.isTableBooking ? (
                            <>
                                <p><i className="fas fa-users"></i> Số khách: {order.guestCount} người</p>
                                <p><i className="fas fa-chair"></i> Bàn số: {order.tableNumber}</p>
                                {order.arrivalTime && (
                                    <p><i className="fas fa-calendar-check"></i> Thời gian đến: {new Date(order.arrivalTime).toLocaleString('vi-VN')}</p>
                                )}
                            </>
                        ) : (
                            <p><i className="fas fa-map-marker-alt"></i> Địa chỉ: {order.address}</p>
                        )}
                        <p><i className="fas fa-phone"></i> SĐT: {order.customerPhone}</p>
                    </div>

                    <div className="payment-info">
                        <h3>Chi tiết thanh toán</h3>
                        <div className="price-details">
                            <div className="price-row">
                                <span>Tạm tính:</span>
                                <span>{order.totalBeforeDiscount.toLocaleString()}đ</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="price-row discount">
                                    <span>Giảm giá:</span>
                                    <span>-{order.discount.toLocaleString()}đ</span>
                                </div>
                            )}
                            <div className="price-row total">
                                <span>Tổng cộng:</span>
                                <span>{order.total.toLocaleString()}đ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => navigate('/order-management')} className="back-btn">
                    <i className="fas fa-arrow-left"></i> Quay lại
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;