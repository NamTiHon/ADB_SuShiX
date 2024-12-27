import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_Dish = ({ item, onClose, onUpdate, onDelete, fields }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedItem, setUpdatedItem] = useState({ ...item });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleDeleteClick = async () => {
        // Map dish properties correctly
        const maMon = item.dishId || item.MA_MaMon;
        const tenMon = item.dishName || item.MA_TenMon;
    
        // Validation with mapped properties
        if (!maMon) {
            console.error('Missing dish ID:', item);
            alert('Mã món không tồn tại');
            return;
        }
    
        const confirmDelete = window.confirm(`Xác nhận xóa món ${tenMon}?`);
        if (confirmDelete) {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/dishes/${maMon}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
    
                if (!response.ok) throw new Error('Không thể xóa món ăn');
                
                await onDelete(maMon);
                window.location.reload();
                onClose();
            } catch (err) {
                console.error('Delete failed:', err);
                alert(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = () => {
        onUpdate(updatedItem);
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
                                            typeof item[field.name] === 'boolean' ? (
                                                <input
                                                    type="checkbox"
                                                    name={field.name}
                                                    checked={updatedItem[field.name]}
                                                    onChange={(e) => handleChange({ target: { name: field.name, value: e.target.checked } })}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    value={updatedItem[field.name]}
                                                    onChange={handleChange}
                                                />
                                            )
                                        ) : (
                                            <span>{typeof item[field.name] === 'boolean' ? (item[field.name] ? 'Có' : 'Không') : item[field.name]}</span>
                                        )}
                                    </p>
                                ))}
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                {fields.map((field) => (
                                    <p key={field.name}>
                                        <strong>{field.label}:</strong> {typeof item[field.name] === 'boolean' ? (item[field.name] ? 'Có' : 'Không') : item[field.name]}
                                    </p>
                                ))}
                                <div className="buttons">
                                    <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                                    <button 
                                        className="cancel-button" 
                                        onClick={handleDeleteClick}
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang xóa...' : 'Xóa'}
                                    </button>

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
