import React, { useState } from 'react';
import '../css/css-modals/detail-staff.css';

const Detail_Staff = ({ item, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedStaff, setUpdatedStaff] = useState({ ...item });
    const [isWorkHistoryVisible, setIsWorkHistoryVisible] = useState(false);

    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStaff((prevStaff) => ({
            ...prevStaff,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onUpdate(updatedStaff);
        setIsEditing(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT NHÂN VIÊN</h2>
                <div className="modal-sections">
                    <div className="modal-section">
                        <h3>THÔNG TIN CÁ NHÂN</h3>
                        
                        {isEditing ? (
                            <>
                                <p><strong>Mã nhân viên:</strong> {updatedStaff.staffId}</p>
                                <p><strong>Họ tên:</strong> <input type="text" name="name" value={updatedStaff.name} onChange={handleChange} /></p>
                                <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={updatedStaff.dateOfBirth} onChange={handleChange} /></p>
                                <p><strong>Giới tính:</strong> <input type="text" name="gender" value={updatedStaff.gender} onChange={handleChange} /></p>
                                <p><strong>Lương:</strong> <input type="text" name="salary" value={updatedStaff.salary} onChange={handleChange} /></p>
                                <p><strong>Ngày bắt đầu:</strong> <input type="date" name="startDate" value={updatedStaff.startDate} onChange={handleChange} /></p>
                                <p><strong>Ngày nghỉ việc:</strong> <input type="date" name="resignationDate" value={updatedStaff.resignationDate} onChange={handleChange} /></p>
                                <p><strong>Phòng ban:</strong> <input type="text" name="workingDepartment" value={updatedStaff.workingDepartment} onChange={handleChange} /></p>
                                <p><strong>Chức vụ:</strong> <input type="text" name="position" value={updatedStaff.position} onChange={handleChange} /></p>
                                <p><strong><h3>ĐỊA CHỈ</h3></strong></p>
                                <p><strong>Số điện thoại:</strong> <input type="text" name="address.phoneNumber" value={updatedStaff.phone || ''} onChange={handleChange} /></p>
                                <p><strong>Số nhà:</strong> <input type="text" name="address.homeNumber" value={updatedStaff.homeNumber || ''} onChange={handleChange} /></p>
                                <p><strong>Đường:</strong> <input type="text" name="address.street" value={updatedStaff.street || ''} onChange={handleChange} /></p>
                                <p><strong>Phường:</strong> <input type="text" name="address.ward" value={updatedStaff.ward || ''} onChange={handleChange} /></p>
                                <p><strong>Quận:</strong> <input type="text" name="address.district" value={updatedStaff.district || ''} onChange={handleChange} /></p>
                                <p><strong>Thành phố:</strong> <input type="text" name="address.city" value={updatedStaff.city || ''} onChange={handleChange} /></p>
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            console.log(item),
                            <>
                                <p><strong>Mã nhân viên:</strong> {item.staffId}</p>
                                <p><strong>Họ tên:</strong> {item.name}</p>
                                <p><strong>Giới tính:</strong> {item.gender}</p>
                                <p><strong>Lương:</strong> {item.salary}</p>
                                <p><strong>Ngày bắt đầu:</strong> {item.startDate}</p>
                                <p><strong>Ngày nghỉ việc:</strong> {item.resignationDate}</p>
                                <p><strong>Phòng ban:</strong> {item.workingDepartment}</p>
                                <p><strong>Chức vụ:</strong> {item.position}</p>
                                <p><strong><h3>ĐỊA CHỈ</h3></strong></p>
                                <p><strong>Số điện thoại:</strong> {item.phone || ''}</p>
                                <p><strong>Số nhà:</strong> {item.homeNumber || ''}</p>
                                <p><strong>Đường:</strong> {item.street || ''}</p>
                                <p><strong>Phường:</strong> {item.ward || ''}</p>
                                <p><strong>Quận:</strong> {item.district || ''}</p>
                                <p><strong>Thành phố:</strong> {item.city || ''}</p>
                                <div className="buttons">
                                    <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin cá nhân</button>
                                    <button className="delete-button" onClick={() => onDelete(item.staffId)}>Xóa nhân viên</button>
                                </div>
                            </>
                        )}
                    </div>    
                </div>
            </div>
        </div>
    );
};

export default Detail_Staff;