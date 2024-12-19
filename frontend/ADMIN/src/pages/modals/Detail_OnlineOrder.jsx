import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_OnlineOrder = ({ booking, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedOrder, setUpdatedOrder] = useState({ ...booking });

    if (!booking) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOrder((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy phiếu đặt này?");
        if (confirmDelete) {
            onDelete(booking.bookingId);
            onClose();
        }
    };

    const handleSave = () => {
        onUpdate(updatedOrder);
        setIsEditing(false);
    };

    const columns = [
        { id: 'orderId', header: 'Mã đơn hàng', value: 'orderId' },
        { id: 'name', header: 'Tên khách hàng', value: 'name' },
        { id: 'phone', header: 'Số điện thoại', value: 'phone' },
        { id: 'orderDate', header: 'Ngày đặt hàng', value: 'orderDate' },
        { id: 'orderTime', header: 'Giờ đặt hàng', value: 'orderTime' },
        { id: 'destination', header: 'Điểm đến', value: 'destination' },
        { id: 'comment', header: 'Ghi chú', value: 'comment' },
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT PHIẾU ĐẶT</h2>
                <div className="modal-sections">
                    <div className="modal-section">
                        {isEditing ? (
                            <>
                                {columns.map((column) => (
                                    <p key={column.id}>
                                        <strong>{column.header}:</strong>
                                        <input
                                            type="text"
                                            name={column.value}
                                            value={updatedOrder[column.value]}
                                            onChange={handleChange}
                                        />
                                    </p>
                                ))}
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                {columns.map((column) => (
                                    <p key={column.id}>
                                        <strong>{column.header}:</strong> {booking[column.value]}
                                    </p>
                                ))}
                                <div>
                                    <strong>Các món đặt trước:</strong>
                                    <ul>
                                        {booking.preOrderedDishes.map((dish) => (
                                            <li key={dish}>
                                                {dish.dishName} - Số lượng: {dish.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="buttons">
                                    <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                                    <button className="cancel-button" onClick={() => { setIsEditing(false); handleDeleteClick(); }}>Hủy phiếu đặt</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_OnlineOrder;