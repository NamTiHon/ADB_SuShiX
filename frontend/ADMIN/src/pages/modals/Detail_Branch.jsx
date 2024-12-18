import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_Branch = ({ item, onClose, onUpdate, onDelete, fields }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBranch, setUpdatedBranch] = useState({ ...item });

    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBranch((prevBranch) => ({
            ...prevBranch,
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
        onUpdate(updatedBranch);
        setIsEditing(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT</h2>
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
                                                    checked={updatedBranch[field.name]}
                                                    onChange={(e) => handleChange({ target: { name: field.name, value: e.target.checked } })}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    value={updatedBranch[field.name]}
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
                                    <button className="cancel-button" onClick={() => { setIsEditing(false); handleDeleteClick(); }}>Xoá</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_Branch;