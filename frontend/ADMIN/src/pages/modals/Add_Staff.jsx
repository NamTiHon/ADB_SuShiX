import React, { useState, useEffect } from 'react';
import '../css/css-modals/add-staff.css';

const Add_Staff = ({ onClose, onAddStaff }) => {
    const [newStaff, setNewStaff] = useState({
        name: '',
        gender: '',
        email: '',
        dateOfBirth: '',
        address: {
            phone: '',
            generalAddress: '',
            homeNumber: '',
            street: '',
            ward: '',
            district: '',
            city: ''
        },
        workingDepartment: '',
        position: '',
        MaChiNhanh: '',
        Luong: 0
    });

    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                if (!response.ok) {
                    throw new Error('Failed to fetch branches');
                }
                const result = await response.json();
                console.log('Branches:', result.branches);
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
                console.log('Departments:', result.departments);
                setDepartments(result.departments);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchBranches();
        fetchDepartments();
    }, []);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        const [field, subfield] = name.split('.');
        if (subfield) {
            setNewStaff((prevStaff) => ({
                ...prevStaff,
                [field]: {
                    ...prevStaff[field],
                    [subfield]: value,
                },
            }));
        } else {
            setNewStaff((prevStaff) => ({
                ...prevStaff,
                [name]: value,
            }));
        }

        if (name === 'workingDepartment') {
            try {
                const response = await fetch(`http://localhost:3000/api/staffs/salary/${value}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch salary');
                }
                const result = await response.json();
                setNewStaff((prevStaff) => ({
                    ...prevStaff,
                    Luong: result.salary,
                }));
            } catch (error) {
                console.error('Error fetching salary:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Adding staff:', newStaff);
        const staffWithStaffInfo = {
            MaNhanVien: generateStaffId(),
            HoTen: newStaff.name,
            NgaySinh: newStaff.dateOfBirth,
            GioiTinh: newStaff.gender,
            NgayVaoLam: new Date().toISOString().split('T')[0],
            NgayNghiViec: null,
            DiaChi: newStaff.address.generalAddress,
            SDT: newStaff.address.phone,
            SoNha: newStaff.address.homeNumber,
            TenDuong: newStaff.address.street,
            TenPhuong: newStaff.address.ward,
            TenQuan: newStaff.address.district,
            TenThanhPho: newStaff.address.city
        };
        const departmentData = {
            MaNhanVien: staffWithStaffInfo.MaNhanVien,
            MaChiNhanh: newStaff.MaChiNhanh,
            TenBoPhan: newStaff.workingDepartment,
            ChucVu: newStaff.position,
            Luong: newStaff.Luong
        };
        console.log('Staff with staff info:', staffWithStaffInfo);
        console.log('Department data:', departmentData);
        try {
            const response = await fetch('http://localhost:3000/api/staffs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staffWithStaffInfo),
            });
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Failed to add staff');
            }

            const result = await response.json();
            console.log('Staff added successfully:', result);

            // Post department data
            const departmentResponse = await fetch('http://localhost:3000/api/staffs/department', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(departmentData),
            });
            console.log('Department Response:', departmentResponse);
            if (!departmentResponse.ok) {
                throw new Error('Failed to add department');
            }

            const departmentResult = await departmentResponse.json();
            console.log('Department added successfully:', departmentResult);

            alert('Thêm nhân viên thành công');
            onClose();
        } catch (error) {
            console.error('Error adding staff:', error);
            alert('Có lỗi xảy ra khi thêm nhân viên');
        }
    };

    const generateStaffId = () => {
        return 'ST' + Math.floor(Math.random() * 10000000);
    };

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
                                <option value="" disabled>Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </p>
                        <p><strong>Email:</strong> <input type="email" name="email" value={newStaff.email} onChange={handleChange} required /></p>
                        <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={newStaff.dateOfBirth} onChange={handleChange} required /></p>
                        
                        <h3>THÔNG TIN ĐỊA CHỈ</h3>
                        <p><strong>Số điện thoại:</strong> <input type="text" name="address.phone" value={newStaff.address.phone} onChange={handleChange} required /></p>
                        <p><strong>Địa chỉ:</strong> <input type="text" name="address.generalAddress" value={newStaff.address.generalAddress} onChange={handleChange} /></p>
                        <p><strong>Số nhà:</strong> <input type="text" name="address.homeNumber" value={newStaff.address.homeNumber} onChange={handleChange} /></p>
                        <p><strong>Đường:</strong> <input type="text" name="address.street" value={newStaff.address.street} onChange={handleChange} /></p>
                        <p><strong>Phường:</strong> <input type="text" name="address.ward" value={newStaff.address.ward} onChange={handleChange} /></p>
                        <p><strong>Quận:</strong> <input type="text" name="address.district" value={newStaff.address.district} onChange={handleChange} /></p>
                        <p><strong>Thành phố:</strong> <input type="text" name="address.city" value={newStaff.address.city} onChange={handleChange} /></p>

                        <h3>THÔNG TIN CÔNG VIỆC</h3>
                        <p><strong>Phòng ban:</strong>
                            <select name="workingDepartment" value={newStaff.workingDepartment} onChange={handleChange} required>
                                <option value="" disabled>Chọn phòng ban</option>
                                {departments.map(department => (
                                    <option key={department.BP_NV_TenBoPhan} value={department.BP_NV_TenBoPhan}>
                                        {department.BP_NV_TenBoPhan}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <p><strong>Chức vụ:</strong> <input type="text" name="position" value={newStaff.position} onChange={handleChange} required /></p>
                        <p><strong>Mã chi nhánh:</strong>
                            <select name="MaChiNhanh" value={newStaff.MaChiNhanh} onChange={handleChange} required>
                                <option value="" disabled>Chọn chi nhánh</option>
                                {branches.map(branch => (
                                    <option key={branch.CN_MaChiNhanh} value={branch.CN_MaChiNhanh}>
                                        {branch.CN_Ten}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <p><strong>Lương:</strong> <input type="number" name="Luong" value={newStaff.Luong} onChange={handleChange} required readOnly /></p>

                        <button type="submit" className="add-button">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add_Staff;