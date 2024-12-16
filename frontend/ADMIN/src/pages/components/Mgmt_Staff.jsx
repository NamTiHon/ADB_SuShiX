import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-staff.css';
import AddModal from "../modals/Add_Staff";
import DetailModal from "../modals/Detail_Staff";

function StaffMgmt() {
    const columns = [
        { id: 'staffId', header: 'Mã NV', value: 'staffId' },
        { id: 'name', header: 'Họ tên', value: 'name' },
        { id: 'gender', header: 'Giới tính', value: 'gender' },
        { id: 'salary', header: 'Lương (tháng)', value: 'salary' },
        { id: 'startDate', header: 'Ngày bắt đầu', value: 'startDate' },
        { id: 'resignationDate', header: 'Ngày nghỉ việc', value: 'resignationDate' },
        { id: 'workingDepartment', header: 'Phòng ban', value: 'workingDepartment' },
        { id: 'position', header: 'Chức vụ', value: 'position' }
    ];

    const [staffs, setStaffs] = useState([
        {
            staffId: 'NV001',
            name: 'Nguyễn Văn A',
            dateOfBirth: '1990-01-01',
            gender: 'Nam',
            salary: '20,000,000 VND',
            startDate: '2020-01-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456789',
                homeNumber: '123',
                street: 'Lê Văn Việt',
                ward: 'Phường Linh Trung',
                district: 'Quận Thủ Đức',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kế toán',
            workHistory: [
                { branch: 'CN000', startDate: '2019-01-01', endDate: '2019-12-31' },
                { branch: 'CN001', startDate: '2020-01-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV002',
            name: 'Trần Thị B',
            dateOfBirth: '1992-02-02',
            gender: 'Nữ',
            salary: '18,000,000 VND',
            startDate: '2021-02-01',
            resignationDate: 'Present',
            address: {
                phone: '0987654321',
                homeNumber: '456',
                street: 'Nguyễn Văn Cừ',
                ward: 'Phường 1',
                district: 'Quận 5',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Nhân Sự',
            position: 'Nhân viên',
            workHistory: [
                { branch: 'CN001', startDate: '2020-02-01', endDate: '2021-01-31' },
                { branch: 'CN002', startDate: '2021-02-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV003',
            name: 'Lê Văn C',
            dateOfBirth: '1988-03-03',
            gender: 'Nam',
            salary: '22,000,000 VND',
            startDate: '2019-03-01',
            resignationDate: 'Present',
            address: {
                phone: '0123987654',
                homeNumber: '789',
                street: 'Trần Hưng Đạo',
                ward: 'Phường 2',
                district: 'Quận 1',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN002', startDate: '2018-03-01', endDate: '2019-02-28' },
                { branch: 'CN003', startDate: '2019-03-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV004',
            name: 'Phạm Thị D',
            dateOfBirth: '1993-04-04',
            gender: 'Nữ',
            salary: '19,000,000 VND',
            startDate: '2022-04-01',
            resignationDate: 'Present',
            address: {
                phone: '0987123456',
                homeNumber: '321',
                street: 'Lý Thường Kiệt',
                ward: 'Phường 3',
                district: 'Quận 10',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kinh Doanh',
            position: 'Nhân viên',
            workHistory: [
                { branch: 'CN003', startDate: '2021-04-01', endDate: '2022-03-31' },
                { branch: 'CN004', startDate: '2022-04-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV005',
            name: 'Hoàng Văn E',
            dateOfBirth: '1991-05-05',
            gender: 'Nam',
            salary: '21,000,000 VND',
            startDate: '2020-05-01',
            resignationDate: 'Present',
            address: {
                phone: '0123678945',
                homeNumber: '654',
                street: 'Nguyễn Trãi',
                ward: 'Phường 4',
                district: 'Quận 5',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN004', startDate: '2019-05-01', endDate: '2020-04-30' },
                { branch: 'CN005', startDate: '2020-05-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV006',
            name: 'Đỗ Thị F',
            dateOfBirth: '1994-06-06',
            gender: 'Nữ',
            salary: '23,000,000 VND',
            startDate: '2021-06-01',
            resignationDate: 'Present',
            address: {
                phone: '0987345612',
                homeNumber: '987',
                street: 'Phan Đăng Lưu',
                ward: 'Phường 5',
                district: 'Quận Phú Nhuận',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kinh Doanh',
            position: 'Trưởng phòng',
            workHistory: [
                { branch: 'CN005', startDate: '2020-06-01', endDate: '2021-05-31' },
                { branch: 'CN006', startDate: '2021-06-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV007',
            name: 'Ngô Văn G',
            dateOfBirth: '1987-07-07',
            gender: 'Nam',
            salary: '24,000,000 VND',
            startDate: '2018-07-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456781',
                homeNumber: '321',
                street: 'Điện Biên Phủ',
                ward: 'Phường 6',
                district: 'Quận Bình Thạnh',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN006', startDate: '2017-07-01', endDate: '2018-06-30' },
                { branch: 'CN007', startDate: '2018-07-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV008',
            name: 'Vũ Thị H',
            dateOfBirth: '1995-08-08',
            gender: 'Nữ',
            salary: '25,000,000 VND',
            startDate: '2019-08-01',
            resignationDate: 'Present',
            address: {
                phone: '0987654322',
                homeNumber: '654',
                street: 'Trường Chinh',
                ward: 'Phường 7',
                district: 'Quận Tân Bình',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Nhân Sự',
            position: 'Nhân viên',
            workHistory: [
                { branch: 'CN007', startDate: '2018-08-01', endDate: '2019-07-31' },
                { branch: 'CN008', startDate: '2019-08-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV009',
            name: 'Nguyễn Thị I',
            dateOfBirth: '1996-09-09',
            gender: 'Nữ',
            salary: '26,000,000 VND',
            startDate: '2020-09-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456782',
                homeNumber: '987',
                street: 'Cách Mạng Tháng 8',
                ward: 'Phường 8',
                district: 'Quận 3',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kinh Doanh',
            position: 'Trưởng phòng',
            workHistory: [
                { branch: 'CN008', startDate: '2019-09-01', endDate: '2020-08-31' },
                { branch: 'CN009', startDate: '2020-09-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV010',
            name: 'Phạm Văn J',
            dateOfBirth: '1989-10-10',
            gender: 'Nam',
            salary: '27,000,000 VND',
            startDate: '2021-10-01',
            resignationDate: 'Present',
            address: {
                phone: '0987654323',
                homeNumber: '321',
                street: 'Lê Lợi',
                ward: 'Phường 9',
                district: 'Quận 1',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN009', startDate: '2020-10-01', endDate: '2021-09-30' },
                { branch: 'CN010', startDate: '2021-10-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV011',
            name: 'Lê Thị K',
            dateOfBirth: '1997-11-11',
            gender: 'Nữ',
            salary: '28,000,000 VND',
            startDate: '2022-11-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456783',
                homeNumber: '654',
                street: 'Nguyễn Huệ',
                ward: 'Phường 10',
                district: 'Quận 1',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Nhân Sự',
            position: 'Nhân viên',
            workHistory: [
                { branch: 'CN010', startDate: '2021-11-01', endDate: '2022-10-31' },
                { branch: 'CN011', startDate: '2022-11-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV012',
            name: 'Trần Văn L',
            dateOfBirth: '1986-12-12',
            gender: 'Nam',
            salary: '29,000,000 VND',
            startDate: '2023-12-01',
            resignationDate: 'Present',
            address: {
                phone: '0987654324',
                homeNumber: '987',
                street: 'Lý Tự Trọng',
                ward: 'Phường 11',
                district: 'Quận 1',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN011', startDate: '2022-12-01', endDate: '2023-11-30' },
                { branch: 'CN012', startDate: '2023-12-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV013',
            name: 'Hoàng Thị M',
            dateOfBirth: '1998-01-13',
            gender: 'Nữ',
            salary: '30,000,000 VND',
            startDate: '2024-01-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456784',
                homeNumber: '321',
                street: 'Nguyễn Thị Minh Khai',
                ward: 'Phường 12',
                district: 'Quận 3',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kinh Doanh',
            position: 'Trưởng phòng',
            workHistory: [
                { branch: 'CN012', startDate: '2023-01-01', endDate: '2023-12-31' },
                { branch: 'CN013', startDate: '2024-01-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV014',
            name: 'Đỗ Văn N',
            dateOfBirth: '1999-02-14',
            gender: 'Nam',
            salary: '31,000,000 VND',
            startDate: '2024-02-01',
            resignationDate: 'Present',
            address: {
                phone: '0987654325',
                homeNumber: '654',
                street: 'Nguyễn Đình Chiểu',
                ward: 'Phường 13',
                district: 'Quận 3',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Nhân Sự',
            position: 'Nhân viên',
            workHistory: [
                { branch: 'CN013', startDate: '2023-02-01', endDate: '2024-01-31' },
                { branch: 'CN014', startDate: '2024-02-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV015',
            name: 'Nguyễn Văn O',
            dateOfBirth: '1985-03-15',
            gender: 'Nam',
            salary: '32,000,000 VND',
            startDate: '2024-03-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456785',
                homeNumber: '987',
                street: 'Nguyễn Văn Linh',
                ward: 'Phường 14',
                district: 'Quận 7',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN014', startDate: '2023-03-01', endDate: '2024-02-29' },
                { branch: 'CN015', startDate: '2024-03-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV016',
            name: 'Trần Thị P',
            dateOfBirth: '1990-04-16',
            gender: 'Nữ',
            salary: '33,000,000 VND',
            startDate: '2024-04-01',
            resignationDate: 'Present',
            address: {
                phone: '0987654326',
                homeNumber: '321',
                street: 'Nguyễn Văn Cừ',
                ward: 'Phường 15',
                district: 'Quận 5',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kinh Doanh',
            position: 'Trưởng phòng',
            workHistory: [
                { branch: 'CN015', startDate: '2023-04-01', endDate: '2024-03-31' },
                { branch: 'CN016', startDate: '2024-04-01', endDate: 'Present' }
            ]
        },
        {
            staffId: 'NV017',
            name: 'Lê Văn Q',
            dateOfBirth: '1984-05-17',
            gender: 'Nam',
            salary: '34,000,000 VND',
            startDate: '2024-05-01',
            resignationDate: 'Present',
            address: {
                phone: '0123456786',
                homeNumber: '654',
                street: 'Nguyễn Văn Trỗi',
                ward: 'Phường 16',
                district: 'Quận Phú Nhuận',
                city: 'TP. Hồ Chí Minh'
            },
            workingDepartment: 'Phòng Kỹ Thuật',
            position: 'Kỹ sư',
            workHistory: [
                { branch: 'CN016', startDate: '2023-05-01', endDate: '2024-04-30' },
                { branch: 'CN017', startDate: '2024-05-01', endDate: 'Present' }
            ]
        }
    ]);

    useEffect(() => {
            console.log('Current staffs:', staffs);
        }, [staffs]);

    const [selectedStaff, setSelectedStaff] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [filterField, setFilterField] = useState(columns[0].id);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

    const [pageInput, setPageInput] = useState(1);

    const staffsPerPage = 10;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRowClick = (staff) => {
        setSelectedStaff(staff);
    };

    const closeModal = () => {
        setSelectedStaff(null);
    };

    const handleUpdate = (staff) => {
        // Implement the update logic here
        console.log('Update staff:', staff);
    };

    const handlePageInputChange = (event) => {
        const value = event.target.value;
        if (value === '' || (Number(value) > 0 && Number(value) <= totalPages)) {
            setPageInput(value);
        }
    };

    const handlePageInputBlur = () => {
        const pageNumber = Number(pageInput);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        } else {
            setPageInput(currentPage);
        }
    };

    const handleAddStaff = (newstaff) => {
        setStaffs([...staffs, newstaff]);
    };
    
    const sortedStaffs = staffs.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    const filteredStaffs = sortedStaffs.filter(staff => {
        const value = filterField.split('.').reduce((o, i) => o[i], staff);
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

    const totalPages = Math.ceil(filteredStaffs.length / staffsPerPage);

    // If total pages is 0, set current page to 0
    if (totalPages === 0 && currentPage !== 0) {
        setCurrentPage(0);
    }
    else if (totalPages !== 0 && currentPage === 0) {
        setCurrentPage(1);
    }

    // Get current staffs
    const indexOfLastStaff = currentPage * staffsPerPage;
    const indexOfFirstStaff = currentPage === 0 ? -1 : indexOfLastStaff - staffsPerPage;
    const currentStaffs = filteredStaffs.slice(indexOfFirstStaff, indexOfLastStaff);

    // HANDLE PAGE CHANGE
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="staff-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Quản lý nhân viên</h1>
                        <button className="add-staff-button" onClick={() => setIsAddModalOpen(true)}>Thêm Nhân Viên</button>
                    </div>
                    <div className="table-box">
                        <div className="search-and-pagination-container">
                            <select className="property-dropdown" value={filterField} onChange={(e) => setFilterField(e.target.value)}>
                                {columns.map(column => (
                                    <option key={column.id} value={column.value}>
                                        {column.header}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Tìm kiếm nhân viên..."
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <div className="pagination-controls">
                                <button onClick={prevPage} disabled={currentPage === 1 || totalPages === 0}>Trước</button>
                                <input
                                    type="number"
                                    className="page-input"
                                    value={pageInput}
                                    onChange={handlePageInputChange}
                                    onBlur={handlePageInputBlur}
                                    min="1"
                                    max={totalPages}
                                />
                                <span> trên {totalPages}</span>
                                <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>Kế</button>
                            </div>
                            <div className="results-info">
                                <span>
                                    Đang xem {indexOfFirstStaff + 1} - {Math.min(indexOfLastStaff, filteredStaffs.length)} trong tổng số {filteredStaffs.length} nhân viên
                                </span>
                            </div>
                        </div>
                        <table className="customer-table">
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th key={column.id}>{column.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentStaffs.map(staff => (
                                    <tr key={staff.staffId} onClick={() => handleRowClick(staff)}>
                                        {columns.map(column => (
                                            <td key={`${staff.staffId}-${column.id}`}>
                                                {staff[column.value]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedStaff && (
                <DetailModal staff={selectedStaff} onClose={closeModal} onUpdate={handleUpdate} />
            )}
            {isAddModalOpen && (
                <AddModal onClose={() => setIsAddModalOpen(false)} onAddStaff={handleAddStaff} />
            )}
        </div>
    );
}

export default StaffMgmt;