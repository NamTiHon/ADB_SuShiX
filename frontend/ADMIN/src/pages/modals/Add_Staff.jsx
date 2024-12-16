import React, { useState } from 'react';
import '../css/css-modals/add-staff.css';

const Add_Staff = ({ onClose, onAddStaff }) => {
    const [newStaff, setNewStaff] = useState({
        name: 'example',
        gender: 'Nam', // default to male
        email: 'e@xample.com',
        dateOfBirth: '2004-01-01',
        address: {
            phone: '0123456789',
            homeNumber: '123',
            street: 'Lê Văn Việt',
            ward: 'Phường Linh Trung',
            district: 'Quận Thủ Đức',
            city: 'TP. Hồ Chí Minh'
        },
        workingDepartment: 'nhansu',
        position: 'Nhân viên',
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
        const staffWithStaffInfo = {
            ...newStaff,
            staffId: generateStaffId(),
            salary: '1,000,000 VND',
            startDate: new Date().toISOString().split('T')[0],
            resignationDate: 'N/A',
            workHistory: [],
        };
        onAddStaff(staffWithStaffInfo);
        alert('Thêm nhân viên thành công');
        onClose();
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
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </p>
                        <p><strong>Email:</strong> <input type="email" name="email" value={newStaff.email} onChange={handleChange} required /></p>
                        <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={newStaff.dateOfBirth} onChange={handleChange} required /></p>
                        
                        <h3>THÔNG TIN ĐỊA CHỈ</h3>
                        <p><strong>Số điện thoại:</strong> <input type="text" name="address.phone" value={newStaff.address.phone} onChange={handleChange} required /></p>
                        <p><strong>Số nhà:</strong> <input type="text" name="address.homeNumber" value={newStaff.address.homeNumber} onChange={handleChange} required /></p>
                        <p><strong>Đường:</strong> <input type="text" name="address.street" value={newStaff.address.street} onChange={handleChange} required /></p>
                        <p><strong>Phường:</strong> <input type="text" name="address.ward" value={newStaff.address.ward} onChange={handleChange} required /></p>
                        <p><strong>Quận:</strong> <input type="text" name="address.district" value={newStaff.address.district} onChange={handleChange} required /></p>
                        <p><strong>Thành phố:</strong> <input type="text" name="address.city" value={newStaff.address.city} onChange={handleChange} required /></p>

                        <h3>THÔNG TIN CÔNG VIỆC</h3>
                        <p><strong>Phòng ban:</strong> <input type="text" name="workingDepartment" value={newStaff.workingDepartment} onChange={handleChange} required /></p>
                        <p><strong>Chức vụ:</strong> <input type="text" name="position" value={newStaff.position} onChange={handleChange} required /></p>

                        <button type="submit" className="add-button">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add_Staff;