import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';

import '../css/staff-mgmt.css';

function StaffMgmt() {
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const [pageInput, setPageInput] = useState(1);

    const [selectedStaff, setSelectedStaff] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const staffsPerPage = 10;

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

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

    const [staffs, setStaffs] = useState([
        {
            staffID: 'NV001',
            name: 'Nguyễn Văn Trung Thế A',
            gender: 'Nam',
            cccd: '123456789',
            phone: '0123456789',
            email: 'nguyenvantrungthea@example.com',
            dateOfWork: '2023-01-01',
            currentBranch: 'CN001'
        },
        {
            staffID: 'NV002',
            name: 'Trần Thị B',
            gender: 'Nữ',
            cccd: '987654321',
            phone: '0987654321',
            email: 'tranthib@example.com',
            dateOfWork: '2023-02-01',
            currentBranch: 'CN002'
        },
        {
            staffID: 'NV003',
            name: 'Lê Văn C',
            gender: 'Nam',
            cccd: '123498765',
            phone: '0123987654',
            email: 'levanc@example.com',
            dateOfWork: '2023-03-01',
            currentBranch: 'CN003'
        },
        {
            staffID: 'NV004',
            name: 'Phạm Thị D',
            gender: 'Nữ',
            cccd: '987612345',
            phone: '0987123456',
            email: 'phamthid@example.com',
            dateOfWork: '2023-04-01',
            currentBranch: 'CN004'
        },
        {
            staffID: 'NV005',
            name: 'Hoàng Văn E',
            gender: 'Nam',
            cccd: '123467894',
            phone: '0123678945',
            email: 'hoangvane@example.com',
            dateOfWork: '2023-05-01',
            currentBranch: 'CN005'
        },
        {
            staffID: 'NV006',
            name: 'Đỗ Thị F',
            gender: 'Nữ',
            cccd: '987634561',
            phone: '0987345612',
            email: 'dothif@example.com',
            dateOfWork: '2023-06-01',
            currentBranch: 'CN006'
        },
        {
            staffID: 'NV007',
            name: 'Ngô Văn G',
            gender: 'Nam',
            cccd: '123456781',
            phone: '0123456781',
            email: 'ngovang@example.com',
            dateOfWork: '2023-07-01',
            currentBranch: 'CN007'
        },
        {
            staffID: 'NV008',
            name: 'Vũ Thị H',
            gender: 'Nữ',
            cccd: '987654322',
            phone: '0987654322',
            email: 'vuthih@example.com',
            dateOfWork: '2023-08-01',
            currentBranch: 'CN008'
        },
        {
            staffID: 'NV009',
            name: 'Nguyễn Thị I',
            gender: 'Nữ',
            cccd: '123456782',
            phone: '0123456782',
            email: 'nguyenthiI@example.com',
            dateOfWork: '2023-09-01',
            currentBranch: 'CN009'
        },
        {
            staffID: 'NV010',
            name: 'Phạm Văn J',
            gender: 'Nam',
            cccd: '987654323',
            phone: '0987654323',
            email: 'phamvanj@example.com',
            dateOfWork: '2023-10-01',
            currentBranch: 'CN010'
        },
        {
            staffID: 'NV011',
            name: 'Lê Thị K',
            gender: 'Nữ',
            cccd: '123456783',
            phone: '0123456783',
            email: 'lethik@example.com',
            dateOfWork: '2023-11-01',
            currentBranch: 'CN011'
        },
        {
            staffID: 'NV012',
            name: 'Trần Văn L',
            gender: 'Nam',
            cccd: '987654324',
            phone: '0987654324',
            email: 'tranvanl@example.com',
            dateOfWork: '2023-12-01',
            currentBranch: 'CN012'
        },
        {
            staffID: 'NV013',
            name: 'Hoàng Thị M',
            gender: 'Nữ',
            cccd: '123456784',
            phone: '0123456784',
            email: 'hoangthim@example.com',
            dateOfWork: '2024-01-01',
            currentBranch: 'CN013'
        },
        {
            staffID: 'NV014',
            name: 'Đỗ Văn N',
            gender: 'Nam',
            cccd: '987654325',
            phone: '0987654325',
            email: 'dovann@example.com',
            dateOfWork: '2024-02-01',
            currentBranch: 'CN014'
        },
        {
            staffID: 'NV015',
            name: 'Ngô Thị O',
            gender: 'Nữ',
            cccd: '123456785',
            phone: '0123456785',
            email: 'ngothio@example.com',
            dateOfWork: '2024-03-01',
            currentBranch: 'CN015'
        },
        {
            staffID: 'NV016',
            name: 'Vũ Văn P',
            gender: 'Nam',
            cccd: '987654326',
            phone: '0987654326',
            email: 'vuvanp@example.com',
            dateOfWork: '2024-04-01',
            currentBranch: 'CN016'
        },
        {
            staffID: 'NV017',
            name: 'Phạm Thị Q',
            gender: 'Nữ',
            cccd: '123456786',
            phone: '0123456786',
            email: 'phamthiq@example.com',
            dateOfWork: '2024-05-01',
            currentBranch: 'CN017'
        },
        {
            staffID: 'NV018',
            name: 'Nguyễn Văn R',
            gender: 'Nam',
            cccd: '987654327',
            phone: '0987654327',
            email: 'nguyenvanr@example.com',
            dateOfWork: '2024-06-01',
            currentBranch: 'CN018'
        }
    ]);

    const sortedStaffs = staffs.sort((a, b) => new Date(b.dateOfWork) - new Date(a.dateOfWork));

    const filteredStaffs = sortedStaffs.filter(staff => {
        const matchesSearch =
            staff.staffID.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.cccd.includes(searchQuery) ||
            staff.phone.includes(searchQuery) ||
            staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.dateOfWork.includes(searchQuery) ||
            staff.currentBranch.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
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
                        {/* <button className="add-staff-button" onClick={() => setIsAddModalOpen(true)}>Thêm Khách Hàng</button> */}
                    </div>
                    <div className="table-box">
                        <div className="search-and-pagination-container">
                            <input className="search-input"
                                placeholder="Nhập các thuộc tính để tìm kiếm..."
                                type="text"
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
                                    <th>Mã NV</th>
                                    <th>Họ tên</th>
                                    <th>Giới tính</th>
                                    <th>CCCD</th>
                                    <th>SĐT</th>
                                    <th>Email</th>
                                    <th>Ngày vào làm</th>
                                    <th>Chi nhánh đang làm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStaffs.map(staff => (
                                    <tr key={staff.phone} onClick={() => handleRowClick(staff)}>
                                        <td>{staff.staffID}</td>
                                        <td>{staff.name}</td>
                                        <td>{staff.gender}</td>
                                        <td>{staff.cccd}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.dateOfWork}</td>
                                        <td>{staff.currentBranch}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffMgmt;