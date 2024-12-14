import React, { useState } from 'react';
import '../css-modals/add-customer-modal.css';

const AddCustomerModal = ({ onClose, onAddCustomer }) => {
    const [newCustomer, setNewCustomer] = useState({
        name: 'example',
        gender: 'male', // default to male
        cccd: '888888888888',
        email: 'ex@gmail.com',
        dateOfBirth: '2004-01-01',
        phone: '0123456879'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const customerWithCardInfo = {
            ...newCustomer,
            cardId: generateCardId(),
            createdDate: new Date().toISOString().split('T')[0],
            yearsOfUsing: 0,
            points: 0,
            status: 'Active',
            membershipType: 'Membership',
            staffId: '12345' // Example staff ID, replace with actual logic if needed
        };
        onAddCustomer(customerWithCardInfo);
        alert('Thêm khách hàng thành công');
        onClose();
    };

    const generateCardId = () => {
        return 'CARD' + Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>THÊM KHÁCH HÀNG</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-section">
                        <h3>THÔNG TIN CÁ NHÂN</h3>
                        <p><strong>Họ tên:</strong> <input type="text" name="name" value={newCustomer.name} onChange={handleChange} required /></p>
                        <p><strong>Giới tính:</strong>
                            <select name="gender" value={newCustomer.gender} onChange={handleChange} required>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </p>
                        <p><strong>Số CCCD:</strong> <input type="text" name="cccd" value={newCustomer.cccd} onChange={handleChange} minLength="12" maxLength="12" required pattern="\d*" /></p>
                        <p><strong>Email:</strong> <input type="email" name="email" value={newCustomer.email} onChange={handleChange} required /></p>
                        <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={newCustomer.dateOfBirth} onChange={handleChange} required /></p>
                        <p><strong>Số điện thoại:</strong> <input type="text" name="phoneNumber" value={newCustomer.phone} onChange={handleChange} required /></p>
                        <button type="submit" className="add-button">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomerModal;