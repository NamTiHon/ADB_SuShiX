import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_Booking = ({ item, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBooking, setUpdatedBooking] = useState({ ...item });

    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy mục này?");
        if (confirmDelete) {
            onDelete(item);
            onClose();
        }
    };

    const handleSave = () => {
        onUpdate(updatedBooking);
        setIsEditing(false);
    };

    const fields = [
        { label: "Mã phiếu đặt", name: "bookingId", editable: false },
        { label: "Mã chi nhánh", name: "branchId", editable: true },
        { label: "Ngày tạo", name: "createdDate", editable: true },
        { label: "Số bàn", name: "tableNumber", editable: true },
        { label: "Số khách", name: "numOfCustomers", editable: true },
        { label: "Ngày đến", name: "arrivalDate", editable: true },
        { label: "Giờ đến", name: "arrivalTime", editable: true },
        { label: "Ghi chú", name: "comment", editable: true },
        { label: "Tình trạng", name: "status", editable: true },
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
                                {fields.map((field) => (
                                    <p key={field.name}>
                                        <strong>{field.label}:</strong>
                                        {field.editable ? (
                                            <input
                                                type="text"
                                                name={field.name}
                                                value={updatedBooking[field.name]}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <span>{item[field.name]}</span>
                                        )}
                                    </p>
                                ))}
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                {fields.map((field) => (
                                    <p key={field.name}>
                                        <strong>{field.label}:</strong> {item[field.name]}
                                    </p>
                                ))}
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

export default Detail_Booking;