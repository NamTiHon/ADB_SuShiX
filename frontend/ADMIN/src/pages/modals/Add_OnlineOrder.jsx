//FOR ONLINE ORDERS
import React, { useState } from 'react';
import '../css/css-modals/add-online-order.css';

const Add_OnlineOrder = ({ onClose, onAdd }) => {
    const [newOrder, setNewOrder] = useState({
        name: 'example',
        phone: '0123456789',
        destination: 'example',
        comment: 'example',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderWithInfo = {
            ...newOrder,
            orderId: generateOrderId(),
            orderDate: new Date().toISOString().split('T')[0],
            orderTime: new Date().toISOString().split('T')[1].slice(0, 5),
            status: 'Chờ xác nhận',
        };
        onAdd(orderWithInfo);
        alert('Thêm đơn hàng thành công');
        onClose();
    };

    const generateOrderId = () => {
        return 'ORDER' + Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="">
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>THÊM PHIẾU ĐẶT ONLINE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN ĐƠN HÀNG</h3>
                            <p><strong>Tên khách hàng:</strong> <input type="text" name="customerName" value={newOrder.name} onChange={handleChange} required /></p>
                            <p><strong>Số điện thoại:</strong> <input type="text" name="phone" value={newOrder.phone} onChange={handleChange} required /></p>
                            <p><strong>Điểm đến:</strong> <input type="text" name="address" value={newOrder.destination} onChange={handleChange} required /></p>
                            {/* <p><strong>Mặt hàng:</strong> <input type="text" name="orderItems" value={newOrder.orderItems} onChange={handleChange} required /></p>
                            <p><strong>Tổng tiền:</strong> <input type="text" name="totalAmount" value={newOrder.totalAmount} onChange={handleChange} required /></p> */}
                            <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={newOrder.comment} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_OnlineOrder;