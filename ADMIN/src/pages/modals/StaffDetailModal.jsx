import React, { useState } from 'react';
import '../css/staff-detail-modal.css';

const StaffDetailModal = ({ staff, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedStaff, setUpdatedStaff] = useState({ ...staff });
    const [isWorkHistoryVisible, setIsWorkHistoryVisible] = useState(false);

    if (!staff) return null;

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
                                <p><strong>ID:</strong> {updatedStaff.staffID}</p>
                                <p><strong>Họ tên:</strong> <input type="text" name="name" value={updatedStaff.name} onChange={handleChange} /></p>
                                <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={updatedStaff.dateOfBirth} onChange={handleChange} /></p>
                                <p><strong>Giới tính:</strong> <input type="text" name="gender" value={updatedStaff.gender} onChange={handleChange} /></p>
                                <p><strong>Lương:</strong> <input type="text" name="salary" value={updatedStaff.salary} onChange={handleChange} /></p>
                                <p><strong>Ngày bắt đầu:</strong> <input type="date" name="startDate" value={updatedStaff.startDate} onChange={handleChange} /></p>
                                <p><strong>Ngày nghỉ việc:</strong> <input type="date" name="resignationDate" value={updatedStaff.resignationDate} onChange={handleChange} /></p>
                                <p><strong>Phòng ban:</strong> <input type="text" name="workingDepartment" value={updatedStaff.workingDepartment} onChange={handleChange} /></p>
                                <p><strong>Chức vụ:</strong> <input type="text" name="position" value={updatedStaff.position} onChange={handleChange} /></p>
                                <p><strong>Địa Chỉ</strong></p>
                                <p><strong>Số điện thoại:</strong> <input type="text" name="address.phoneNumber" value={updatedStaff.address.phoneNumber} onChange={handleChange} /></p>
                                <p><strong>Số nhà:</strong> <input type="text" name="address.homeNumber" value={updatedStaff.address.homeNumber} onChange={handleChange} /></p>
                                <p><strong>Đường:</strong> <input type="text" name="address.street" value={updatedStaff.address.street} onChange={handleChange} /></p>
                                <p><strong>Phường:</strong> <input type="text" name="address.ward" value={updatedStaff.address.ward} onChange={handleChange} /></p>
                                <p><strong>Quận:</strong> <input type="text" name="address.district" value={updatedStaff.address.district} onChange={handleChange} /></p>
                                <p><strong>Thành phố:</strong> <input type="text" name="address.city" value={updatedStaff.address.city} onChange={handleChange} /></p>
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                <p><strong>ID:</strong> {staff.staffID}</p>
                                <p><strong>Họ tên:</strong> {staff.name}</p>
                                <p><strong>Ngày sinh:</strong> {staff.dateOfBirth}</p>
                                <p><strong>Giới tính:</strong> {staff.gender}</p>
                                <p><strong>Lương:</strong> {staff.salary}</p>
                                <p><strong>Ngày bắt đầu:</strong> {staff.startDate}</p>
                                <p><strong>Ngày nghỉ việc:</strong> {staff.resignationDate}</p>
                                <p><strong>Phòng ban:</strong> {staff.workingDepartment}</p>
                                <p><strong>Chức vụ:</strong> {staff.position}</p>
                                <p><strong>Địa Chỉ</strong></p>
                                <p><strong>Số điện thoại:</strong> {staff.address.phoneNumber}</p>
                                <p><strong>Số nhà:</strong> {staff.address.homeNumber}</p>
                                <p><strong>Đường:</strong> {staff.address.street}</p>
                                <p><strong>Phường:</strong> {staff.address.ward}</p>
                                <p><strong>Quận:</strong> {staff.address.district}</p>
                                <p><strong>Thành phố:</strong> {staff.address.city}</p>
                                <div className="buttons">
                                    <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin cá nhân</button>
                                    <button className="see-work-history-button" onClick={() => setIsWorkHistoryVisible(!isWorkHistoryVisible)}>
                                        {isWorkHistoryVisible ? 'Ẩn lịch sử công tác' : 'Xem lịch sử công tác'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    {isWorkHistoryVisible && (
                        <div className="modal-section">
                            <h3>Lịch Sử Công Tác</h3>
                            <table className="work-history-table">
                                <thead>
                                    <tr>
                                        <th>Chi nhánh</th>
                                        <th>Ngày bắt đầu</th>
                                        <th>Ngày kết thúc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.workHistory
                                        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                                        .map((history, index) => (
                                            <tr key={index}>
                                                <td>{history.branch}</td>
                                                <td>{history.startDate}</td>
                                                <td>{history.endDate}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffDetailModal;