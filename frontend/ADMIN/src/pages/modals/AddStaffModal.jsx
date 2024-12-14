import React, { useState } from 'react';
import '../css-modals/add-staff-modal.css';

const AddStaffModal = ({ onClose, onAddStaff }) => {
    const [newStaff, setNewStaff] = useState({
        name: 'example',
        gender: 'male', // default to male
        cccd: '111111111111',
        email: 'e@xample.com',
        dateOfBirth: '2004-01-01',
        address: 'example',
        phoneNumber: '1234567890',
        currentBranch: '123Levanviet',
        workingDepartment: 'nhansu'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewStaff((prevStaff) => ({
            ...prevStaff,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const staffWithCardInfo = {
            ...newStaff,
            staffId: generateCardId(),
            createdDate: new Date().toISOString().split('T')[0],

        };
        onAddStaff(staffWithCardInfo);
        alert('Thêm nhân viên thành công');
        onClose();
    };

    const generateCardId = () => {
        return 'CARD' + Math.floor(Math.random() * 1000000);
    };

    const generateStaffId = () => {
        return 'STAFF' + Math.floor(Math.random() * 1000000);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>THÊM NHÂN VIÊN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-section">
                        <h3>THÔNG TIN CÁ NHÂN</h3>
                        <p><strong>Họ tên:</strong> <input type="text" name="name" value={newStaff.name} onChange={handleChange} required /></p>
                        <p><strong>Giới tính:</strong>
                            <select name="gender" value={newStaff.gender} onChange={handleChange} required>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </p>
                        <p><strong>Số CCCD:</strong> <input type="text" name="cccd" value={newStaff.cccd} onChange={handleChange} minLength="12" maxLength="12" required pattern="\d*" /></p>
                        <p><strong>Email:</strong> <input type="email" name="email" value={newStaff.email} onChange={handleChange} required /></p>
                        <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={newStaff.dateOfBirth} onChange={handleChange} required /></p>
                        <p><strong>Số điện thoại:</strong> <input type="text" name="phoneNumber" value={newStaff.phoneNumber} onChange={handleChange} required /></p>
                        <p><strong>Chi nhánh hiện tại:</strong> <input type="text" name="currentBranch" value={newStaff.currentBranch} onChange={handleChange} required /></p>
                        <p><strong>Phòng ban làm việc:</strong> <input type="text" name="workingDepartment" value={newStaff.workingDepartment} onChange={handleChange} required /></p>
                        <button type="submit" className="add-button">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddStaffModal;