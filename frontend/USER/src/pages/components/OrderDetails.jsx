import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../../utils/OrderStorage';
import Nav from './Nav';
import '../css/OrderDetails.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            const data = await getOrder(orderId);
            setOrder(data);
        };

        fetchOrder();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Nav />
            <div className="order-details">
                <h2>Chi tiết đơn hàng #{order.orderId}</h2>
                <p><strong>Ngày đặt:</strong> {order.date}</p>
                <p><strong>Trạng thái:</strong> {order.status}</p>
                <p><strong>Tổng tiền:</strong> {order.total?.toLocaleString()}đ</p>
                <h3>Thông tin giao hàng</h3>
                <p><strong>Người nhận:</strong> {order.fullName}</p>
                <p><strong>Số điện thoại:</strong> {order.phone}</p>
                <p><strong>Địa chỉ:</strong> {order.address}</p>
                <button onClick={() => navigate('/order-management')} className="back-btn">
                    <i className="fas fa-arrow-left"></i> Quay lại
                </button>
            </div>
        </div>
    );
};

export default OrderDetails;