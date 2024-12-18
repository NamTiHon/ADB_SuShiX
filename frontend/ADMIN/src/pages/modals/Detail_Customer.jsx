import React, { useState } from 'react';
import '../css/css-modals/detail-customer.css';

const Detail_Customer = ({ item, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState({ ...item });
    
    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onUpdate(updatedCustomer);
        setIsEditing(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT KHÁCH HÀNG</h2>
                <div className="modal-sections">
                    <div className="modal-section">
                        <h3>THÔNG TIN CÁ NHÂN</h3>
                        
                        {isEditing ? (
                            <>
                                <p><strong>Họ tên:</strong> <input type="text" name="name" value={updatedCustomer.name} onChange={handleChange} /></p>
                                <p><strong>Giới tính:</strong> <input type="text" name="gender" value={updatedCustomer.gender} onChange={handleChange} /></p>
                                <p><strong>Số CCCD:</strong> <input type="text" name="cccd" value={updatedCustomer.cccd} onChange={handleChange} /></p>
                                <p><strong>Email:</strong> <input type="email" name="email" value={updatedCustomer.email} onChange={handleChange} /></p>
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Họ tên:</strong> {item.name}</p>
                                <p><strong>Giới tính:</strong> {item.gender}</p>
                                <p><strong>Số CCCD:</strong> {item.cccd}</p>
                                <p><strong>Email:</strong> {item.email}</p>
                                <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                            </>
                        )}
                    </div>
                    <div className="divider"></div>
                    <div className="modal-section">
                        <h3>THÔNG TIN THẺ</h3>
                        <p><strong>Mã thẻ:</strong> {item.cardId}</p>
                        <p><strong>Ngày tạo:</strong> {item.createdDate}</p>
                        <p><strong>Số năm sử dụng:</strong> {item.yearsOfUsing}</p>
                        <p><strong>Điểm:</strong> {item.points}</p>
                        <p><strong>Tình trạng thẻ:</strong> {item.status}</p>
                        <p><strong>Loại thành viên:</strong> {item.membershipType}</p>
                        <p><strong>Số điện thoại:</strong> {item.phone}</p>
                        <p><strong>Mã nhân viên tạo thẻ:</strong> {item.staffId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_Customer;