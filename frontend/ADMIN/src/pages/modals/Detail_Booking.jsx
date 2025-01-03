import React, { useState, useEffect } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_Booking = ({ item, onClose, onUpdate, onDelete, fields }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBooking, setUpdatedBooking] = useState({ ...item });

    useEffect(() => {
        setUpdatedBooking({ ...item });
    }, [item]);

    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá?");
        if (confirmDelete) {
            onDelete(item);
            onClose();
        }
    };

    const handleSave = () => {
        onUpdate(updatedBooking);
        setIsEditing(false);
    };

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
                                        <strong>{field.label}: </strong>
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
                                <div>
                                    <strong>CÁC MÓN ĐƯỢC ĐẶT:</strong>
                                    <table className="work-history-table">
                                        <thead>
                                            <tr>
                                                <th>Tên món</th>
                                                <th>Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.preOrderedDishes
                                                .map((dish, index) => (
                                                    <tr key={index}>
                                                        {/* <td>{dish.dishId}</td> */}
                                                        <td>{dish.dishName}</td>
                                                        <td>{dish.quantity}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
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

export default Detail_Booking;