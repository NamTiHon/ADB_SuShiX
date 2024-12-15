import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OrderManagement.css';
import { getOrders } from '../../utils/OrderStorage';
import Nav from './Nav';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch orders from the storage or API
        const fetchOrders = async () => {
            const data = await getOrders();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <Nav />
            <div className="order-management">
                <h2>Quản lý đơn hàng</h2>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                                <td>{order.total?.toLocaleString() || '0'}đ</td>
                                <td>
                                    <button onClick={() => navigate(`/order-details/${order.orderId}`)}>Xem chi tiết</button>
                                    <button onClick={() => cancelOrder(order.orderId)}>Hủy đơn</button>
                                    {order.status === 'Completed' && (
                                        <button onClick={() => navigate(`/rate-order/${order.orderId}`)}>Đánh giá đơn hàng</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => navigate('/')} className="back-home-btn">
                    <i className="fas fa-home"></i> Về trang chủ
                </button>
            </div>
        </div>
    );
};

const viewOrderDetails = (orderId) => {
    // Implement view order details functionality
    console.log(`Viewing details for order ${orderId}`);
};

const cancelOrder = (orderId) => {
    // Implement cancel order functionality
    console.log(`Cancelling order ${orderId}`);
};

export default OrderManagement;