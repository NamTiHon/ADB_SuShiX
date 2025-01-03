import React, { useState, useEffect } from 'react';
import Mgmt_General from './Mgmt_General';
import AddModal from '../modals/Add_Staff';
import DetailModal from '../modals/Detail_Staff';

const columns = [
    { id: 'staffId', header: 'Mã NV', value: 'staffId', editable: false, visible: true },
    { id: 'name', header: 'Họ tên', value: 'name', editable: true, visible: true },
    { id: 'gender', header: 'Giới tính', value: 'gender', editable: true, visible: true },
    { id: 'salary', header: 'Lương (tháng)', value: 'salary', editable: true, visible: true },
    { id: 'startDate', header: 'Ngày bắt đầu', value: 'startDate', editable: true, visible: true },
    { id: 'resignationDate', header: 'Ngày nghỉ việc', value: 'resignationDate', editable: true, visible: true },
    { id: 'workingDepartment', header: 'Phòng ban', value: 'workingDepartment', editable: true, visible: true },
    { id: 'position', header: 'Chức vụ', value: 'position', editable: true, visible: true },
    { id: 'MaChiNhanh' , header: 'Mã chi nhánh', value: 'MaChiNhanh', editable: true, visible: true }
];

// const formatDate = (datetime) => {
//     if (!datetime) return '';
//     const date = new Date(datetime);
//     if (isNaN(date)) return '';
//     return date.toLocaleDateString('vi-VN');
// };

function StaffMgmt() {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/staffs');
                if (!response.ok) {
                    throw new Error(`Failed to fetch staffs: ${response.status} ${response.statusText}`);
                }
                const result = await response.json();
                console.log('Raw API Response:', result); // Debug log

                const transformedStaffs = result.staffs
                    .filter(staff => staff !== null)
                    .map(staff => ({
                        staffId: staff?.NV_MaNhanVien || '',
                        name: staff?.NV_HoTen || '',
                        gender: staff?.NV_GioiTinh || '',
                        salary: staff?.BP_NV_Luong || 0,
                        startDate: (staff?.NV_NgayVaoLam || ''),
                        resignationDate: (staff?.NV_NgayNghiViec || ''),
                        workingDepartment: staff?.BP_NV_TenBoPhan || '',
                        position: staff?.BP_NV_ChucVu || '',
                        phone: staff?.NV_SDT || '',
                        homeNumber: staff?.NV_SoNha || '',
                        street: staff?.NV_TenDuong || '',
                        ward: staff?.NV_TenPhuong || '',
                        district: staff?.NV_TenQuan || '',
                        city: staff?.NV_TenThanhPho || '',
                        MaChiNhanh: staff?.BP_NV_MaChiNhanh || '',
                    }));
                setStaffs(transformedStaffs);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching staffs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStaffs();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <Mgmt_General
                    columns={columns}
                    initialData={staffs}
                    title={'Quản lý nhân viên'}
                    AddModal={AddModal}
                    DetailModal={DetailModal}
                />
            )}
        </div>
    );
}

export default StaffMgmt;