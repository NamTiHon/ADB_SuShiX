import React, { useState } from 'react';
import '../css/customer-detail-modal.css';

const CustomerDetailModal = ({ customer, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState({ ...customer });
    
    if (!customer) return null;

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
                                <p><strong>Họ tên:</strong> {customer.name}</p>
                                <p><strong>Giới tính:</strong> {customer.gender}</p>
                                <p><strong>Số CCCD:</strong> {customer.cccd}</p>
                                <p><strong>Email:</strong> {customer.email}</p>
                                <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                            </>
                        )}
                    </div>
                    <div className="divider"></div>
                    <div className="modal-section">
                        <h3>THÔNG TIN THẺ</h3>
                        <p><strong>Mã thẻ:</strong> {customer.cardId}</p>
                        <p><strong>Ngày tạo:</strong> {customer.createdDate}</p>
                        <p><strong>Số năm sử dụng:</strong> {customer.yearsOfUsing}</p>
                        <p><strong>Điểm:</strong> {customer.points}</p>
                        <p><strong>Tình trạng thẻ:</strong> {customer.status}</p>
                        <p><strong>Loại thành viên:</strong> {customer.membershipType}</p>
                        <p><strong>Số điện thoại:</strong> {customer.phone}</p>
                        <p><strong>Mã nhân viên tạo thẻ:</strong> {customer.staffId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailModal;