import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OrderManagement.css';
import { getOrders } from '../../utils/OrderStorage';
import Nav from './Nav';


const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [bills, setBills] = useState({});

    const getStatusText = (status, isTableBooking) => {
        return status || 'Không xác định';
    };
    const cancelOrder = async (orderId) => {
        if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/order/cancel/${orderId}`, {
                method: 'PUT'
            });

            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }

            // Update local state correctly by mapping through array
            setOrders(prevOrders => {
                const updatedOrders = [...prevOrders];
                const orderIndex = updatedOrders.findIndex(order => order.orderId === orderId);
                if (orderIndex !== -1) {
                    updatedOrders[orderIndex] = {
                        ...updatedOrders[orderIndex],
                        status: "Đã hủy" // Changed from number to string
                    };
                }
                return updatedOrders;
            });

        } catch (err) {
            console.error('Error canceling order:', err);
            alert('Không thể hủy đơn hàng. Vui lòng thử lại sau.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch orders and bills in parallel
                const [ordersResponse, billsResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/order'),
                    fetch('http://localhost:3000/api/bills')
                ]);
    
                if (!ordersResponse.ok || !billsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const [orders, billsData] = await Promise.all([
                    ordersResponse.json(),
                    billsResponse.json()
                ]);
    
                // Create bills lookup
                const billsMap = billsData.data.reduce((acc, bill) => {
                    acc[bill.HD_MaPhieu] = bill;
                    return acc;
                }, {});
    
                // Transform orders with bill data
                const uniqueOrders = Object.values(orders.reduce((acc, order) => {
                    if (!order?.PDM_MaPhieu) return acc;
    
                    const bill = billsMap[order.PDM_MaPhieu] || {};
                    const isTableBooking = !!order.PDM_SoBan;
    
                    acc[order.PDM_MaPhieu] = {
                        orderId: order.PDM_MaPhieu,
                        date: new Date(order.PDM_ThoiGianDat || Date.now()).toLocaleString('vi-VN'),
                        status: order.PDM_TrangThai || 'Không xác định',
                        totalBeforeDiscount: bill.HD_TongTruocGiam || 0,
                        discount: bill.HD_SoTienGiam || 0,
                        total: bill.HD_TongTienThanhToan || 0,
                        customerPhone: order.PDM_SDT_KH || '',
                        address: order.PDM_DiaChiCanGiao || '',
                        branchId: order.PDM_MaChiNhanh || '',
                        tableNumber: order.PDM_SoBan || null,
                        guestCount: order.PDM_SoLuongKH || 0,
                        isTableBooking: isTableBooking,
                        billId: bill.HD_MaHoaDon || null
                    };
                    return acc;
                }, {})).sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA; // Sort descending (newest first)
                });
    
                setOrders(uniqueOrders);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    return (
        <div>
            <Nav />
            <div className="order-management">
                <h2>Quản lý đơn hàng</h2>
                
                {loading && <div className="loading">Đang tải dữ liệu...</div>}
                {error && <div className="error">Lỗi: {error}</div>}
                
                {!loading && !error && (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Ngày đặt</th>
                                <th>Loại đơn</th>
                                <th>Trạng thái</th>
                                <th>Chi tiết thanh toán</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(orders) ? orders.map(order => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.date}</td>
                                    <td>{order.isTableBooking ? 'Đặt bàn' : 'Giao hàng'}</td>
                                    <td>{getStatusText(order.status, order.isTableBooking)}</td>
                                    <td>
                                        <div className="order-amount">
                                            <span className="amount-before">{order.totalBeforeDiscount.toLocaleString()}đ</span>
                                            {order.discount > 0 && (
                                                <span className="discount">-{order.discount.toLocaleString()}đ</span>
                                            )}
                                            <span className="final-amount">{order.total.toLocaleString()}đ</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/order-details/${order.orderId}`)}>
                                            Theo dõi đơn hàng
                                        </button>
                                        {(order.status === "Chờ xác nhận" || order.status === "Đã hủy") && (
                                            <button 
                                                onClick={() => order.status === "Chờ xác nhận" ? cancelOrder(order.orderId) : null}
                                                className={`cancel-button ${order.status === "Đã hủy" ? 'cancelled' : ''}`}
                                                disabled={order.status === "Đã hủy"}
                                            >
                                                {order.status === "Đã hủy" ? 'Đã hủy' : 'Hủy đơn hàng'}
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrderManagement;