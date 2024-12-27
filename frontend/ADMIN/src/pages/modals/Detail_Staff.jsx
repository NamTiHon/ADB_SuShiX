import React, { useState, useEffect } from 'react';
import '../css/css-modals/detail-staff.css';

const Detail_Staff = ({ item, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedStaff, setUpdatedStaff] = useState({});
    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        if (item) {
            setUpdatedStaff({
                MaNhanVien: item.staffId,
                HoTen: item.name,
                GioiTinh: item.gender,
                NgayVaoLam: item.startDate,
                NgayNghiViec: item.resignationDate,
                DiaChi: item.address,
                SDT: item.phone,
                SoNha: item.homeNumber,
                TenDuong: item.street,
                TenPhuong: item.ward,
                TenQuan: item.district,
                TenThanhPho: item.city,
                MaChiNhanh: item.MaChiNhanh,
                TenBoPhan: item.workingDepartment,
                ChucVu: item.position,
                Luong: item.salary
            });
        }
    }, [item]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                if (!response.ok) {
                    throw new Error('Failed to fetch branches');
                }
                const result = await response.json();
                setBranches(result.branches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/staffs/department');
                if (!response.ok) {
                    throw new Error('Failed to fetch departments');
                }
                const result = await response.json();
                setDepartments(result.departments);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchBranches();
        fetchDepartments();
    }, []);

    const fetchSalaryByDepartment = async (departmentName) => {
        try {
            const response = await fetch(`http://localhost:3000/api/staffs/salary/${departmentName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch salary');
            }
            const result = await response.json();
            setUpdatedStaff((prevStaff) => ({
                ...prevStaff,
                Luong: result.salary,
            }));
        } catch (error) {
            console.error('Error fetching salary:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStaff((prevStaff) => ({
            ...prevStaff,
            [name]: name === 'Luong' ? Number(value.replace(/[^0-9.-]+/g, "")) : value,
        }));

        if (name === 'TenBoPhan') {
            fetchSalaryByDepartment(value);
        }
    };

    const handleSave = async () => {
        const formattedNgayVaoLam = formatDateForSave(updatedStaff.NgayVaoLam);
        const formattedNgayNghiViec = formatDateForSave(updatedStaff.NgayNghiViec);
        const staffToSave = {
            ...updatedStaff,
            NgayVaoLam: formattedNgayVaoLam,
            NgayNghiViec: formattedNgayNghiViec
        };

        try {
            // Update personal information
            const response = await fetch(`http://localhost:3000/api/staffs/${item.staffId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staffToSave),
            });

            if (!response.ok) {
                throw new Error('Failed to update staff');
            }

            // Update department information if it has changed
            if (updatedStaff.MaChiNhanh !== item.MaChiNhanh || updatedStaff.TenBoPhan !== item.workingDepartment || updatedStaff.ChucVu !== item.position || updatedStaff.Luong !== item.salary) {
                const departmentResponse = await fetch(`http://localhost:3000/api/staffs/department/${item.staffId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MaChiNhanh: updatedStaff.MaChiNhanh,
                        TenBoPhan: updatedStaff.TenBoPhan,
                        ChucVu: updatedStaff.ChucVu,
                        Luong: updatedStaff.Luong
                    }),
                });

                if (!departmentResponse.ok) {
                    throw new Error('Failed to update department information');
                }
            }

            const result = await response.json();
            onUpdate(result);
            setIsEditing(false);
            window.location.reload(); // Reload the page after saving
        } catch (error) {
            console.error('Error updating staff:', error);
            alert('Có lỗi xảy ra khi cập nhật nhân viên');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/staffs/${item.staffId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete staff');
            }
            onDelete(item.staffId);
            onClose();
            window.location.reload(); 
        } catch (error) {
            console.error('Error deleting staff:', error);
            alert('Có lỗi xảy ra khi xóa nhân viên');
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        const month = `0${d.getMonth() + 1}`.slice(-2); // Increment month by 1
        const day = `0${d.getDate()}`.slice(-2);
        return `${d.getFullYear()}-${month}-${day}`;
    };

    const formatDateForSave = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return isNaN(d.getTime()) ? null : d.toISOString();
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
                                <p><strong>Mã nhân viên:</strong> {updatedStaff.MaNhanVien}</p>
                                <p><strong>Họ tên:</strong> <input type="text" name="HoTen" value={updatedStaff.HoTen} onChange={handleChange} /></p>
                                <p><strong>Giới tính:</strong> <input type="text" name="GioiTinh" value={updatedStaff.GioiTinh} onChange={handleChange} /></p>
                                <p><strong>Ngày bắt đầu:</strong> <input type="date" name="NgayVaoLam" value={formatDate(updatedStaff.NgayVaoLam)} onChange={handleChange} /></p>
                                <p><strong>Ngày nghỉ việc:</strong> <input type="date" name="NgayNghiViec" value={formatDate(updatedStaff.NgayNghiViec)} onChange={handleChange} /></p>
                            </>
                        ) : (
                            <>
                                <p><strong>Mã nhân viên:</strong> {item.staffId}</p>
                                <p><strong>Họ tên:</strong> {item.name}</p>
                                <p><strong>Giới tính:</strong> {item.gender}</p>
                                <p><strong>Ngày bắt đầu:</strong> {formatDate(item.startDate)}</p>
                                <p><strong>Ngày nghỉ việc:</strong> {formatDate(item.resignationDate)}</p>
                            </>
                        )}
                    </div>
                    <div className="modal-section">
                        <h3>ĐỊA CHỈ</h3>
                        {isEditing ? (
                            <>
                                <p><strong>Số điện thoại:</strong> <input type="text" name="SDT" value={updatedStaff.SDT || ''} onChange={handleChange} /></p>
                                <p><strong>Số nhà:</strong> <input type="text" name="SoNha" value={updatedStaff.SoNha || ''} onChange={handleChange} /></p>
                                <p><strong>Đường:</strong> <input type="text" name="TenDuong" value={updatedStaff.TenDuong || ''} onChange={handleChange} /></p>
                                <p><strong>Phường:</strong> <input type="text" name="TenPhuong" value={updatedStaff.TenPhuong || ''} onChange={handleChange} /></p>
                                <p><strong>Quận:</strong> <input type="text" name="TenQuan" value={updatedStaff.TenQuan || ''} onChange={handleChange} /></p>
                                <p><strong>Thành phố:</strong> <input type="text" name="TenThanhPho" value={updatedStaff.TenThanhPho || ''} onChange={handleChange} /></p>
                            </>
                        ) : (
                            <>
                                <p><strong>Số điện thoại:</strong> {item.phone || ''}</p>
                                <p><strong>Số nhà:</strong> {item.homeNumber || ''}</p>
                                <p><strong>Đường:</strong> {item.street || ''}</p>
                                <p><strong>Phường:</strong> {item.ward || ''}</p>
                                <p><strong>Quận:</strong> {item.district || ''}</p>
                                <p><strong>Thành phố:</strong> {item.city || ''}</p>
                            </>
                        )}
                    </div>
                    <div className="modal-section">
                        <h3>THÔNG TIN CÔNG VIỆC</h3>
                        {isEditing ? (
                            <>
                                <p><strong>Mã chi nhánh:</strong>
                                    <select name="MaChiNhanh" value={updatedStaff.MaChiNhanh} onChange={handleChange}>
                                        <option value="" disabled>Chọn chi nhánh</option>
                                        {branches.map(branch => (
                                            <option key={branch.CN_MaChiNhanh} value={branch.CN_MaChiNhanh}>
                                                {branch.CN_MaChiNhanh} - {branch.CN_Ten}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p><strong>Phòng ban:</strong>
                                    <select name="TenBoPhan" value={updatedStaff.TenBoPhan} onChange={handleChange}>
                                        <option value="" disabled>Chọn phòng ban</option>
                                        {departments.map(department => (
                                            <option key={department.BP_NV_TenBoPhan} value={department.BP_NV_TenBoPhan}>
                                                {department.BP_NV_TenBoPhan}
                                            </option>
                                        ))}
                                    </select>
                                </p>
                                <p><strong>Chức vụ:</strong> <input type="text" name="ChucVu" value={updatedStaff.ChucVu} onChange={handleChange} /></p>
                                <p><strong>Lương:</strong> <input type="number" name="Luong" value={updatedStaff.Luong} onChange={handleChange} /></p>
                            </>
                        ) : (
                            <>
                                <p><strong>Mã chi nhánh:</strong> {item.MaChiNhanh}</p>
                                <p><strong>Phòng ban:</strong> {item.workingDepartment}</p>
                                <p><strong>Chức vụ:</strong> {item.position}</p>
                                <p><strong>Lương:</strong> {item.salary}</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="buttons">
                    {isEditing ? (
                        <button className="save-button" onClick={handleSave}>Lưu</button>
                    ) : (
                        <>
                            <button className="update-button-temp" onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin cá nhân</button>
                            <button className="delete-button-temp" onClick={handleDelete}>Xóa nhân viên</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Detail_Staff;