import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_Dish = ({ item, onClose, onUpdate, onDelete, fields }) => {
    const dish = item;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedDish, setUpdatedDish] = useState({ ...dish });

    if (!dish) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDish((prevDish) => ({
            ...prevDish,
            [name]: value,
        }));
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy phiếu đặt này?");
        if (confirmDelete) {
            onDelete(dish.dishId);
            onClose();
        }
    };

    const handleSave = () => {
        onUpdate(updatedDish);
        setIsEditing(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT MÓN ĂN</h2>
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
                                                value={updatedDish[field.name]}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <span>{dish[field.name]}</span>
                                        )}
                                    </p>
                                ))}

                                {/* <p><strong>Mã phiếu đặt:</strong> <input type="text" name="dishId" value={updatedDish.dishId} onChange={handleChange} /></p>
                                <p><strong>Mã chi nhánh:</strong> <input type="text" name="branchId" value={updatedDish.branchId} onChange={handleChange} /></p>
                                <p><strong>Ngày tạo:</strong> <input type="text" name="createdDate" value={updatedDish.createdDate} onChange={handleChange} /></p>
                                <p><strong>Số bàn:</strong> <input type="text" name="tableNumber" value={updatedDish.tableNumber} onChange={handleChange} /></p>
                                <p><strong>Số khách:</strong> <input type="text" name="numOfCustomers" value={updatedDish.numOfCustomers} onChange={handleChange} /></p>
                                <p><strong>Ngày đến:</strong> <input type="text" name="arrivalDate" value={updatedDish.arrivalDate} onChange={handleChange} /></p>
                                <p><strong>Giờ đến:</strong> <input type="text" name="arrivalTime" value={updatedDish.arrivalTime} onChange={handleChange} /></p>
                                <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={updatedDish.comment} onChange={handleChange} /></p>
                                <p><strong>Tình trạng:</strong> <input type="text" name="status" value={updatedDish.status} onChange={handleChange} /></p> */}
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                {/* <p><strong>Mã phiếu đặt:</strong> {dish.dishId}</p>
                                <p><strong>Mã chi nhánh:</strong> {dish.branchId}</p>
                                <p><strong>Ngày tạo:</strong> {dish.createdDate}</p>
                                <p><strong>Số bàn:</strong> {dish.tableNumber}</p>
                                <p><strong>Số khách:</strong> {dish.numOfCustomers}</p>
                                <p><strong>Ngày đến:</strong> {dish.arrivalDate}</p>
                                <p><strong>Giờ đến:</strong> {dish.arrivalTime}</p>
                                <p><strong>Ghi chú:</strong> {dish.comment}</p>
                                <p><strong>Tình trạng:</strong> {dish.status}</p> */}
                                {fields.map((field) => (
                                    <p key={field.name}>
                                        <strong>{field.label}:</strong> {dish[field.name]}
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

export default Detail_Dish;