import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';

import '../css/staff-mgmt.css';

import AddStaffModal from "../modals/AddStaffModal";
import StaffDetailModal from "../modals/StaffDetailModal";

function StaffMgmt() {
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedProperty, setSelectedProperty] = useState('staffID');

    const [currentPage, setCurrentPage] = useState(1);

    const [pageInput, setPageInput] = useState(1);

    const [selectedStaff, setSelectedStaff] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const staffsPerPage = 10;

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

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
    //     {
    //         staffID: 'NV001',
    //         name: 'Nguyễn Văn A',
    //         gender: 'Nam',
    //         salary: '20,000,000 VND',
    //         startDate: '2020-01-01',
    //         resignationDate: 'Present',
    //         address: {
    //             phoneNumber: '0123456789',
    //             homeNumber: '123',
    //             street: 'Lê Văn Việt',
    //             ward: 'Phường Linh Trung',
    //             district: 'Quận Thủ Đức',
    //             city: 'TP. Hồ Chí Minh'
    //         },
    //         workingDepartment: 'Phòng Kỹ Thuật',
    //         position: 'Kế toán',
    //         workHistory: [
    //             { branch: 'CN000', startDate: '2019-01-01', endDate: '2019-12-31' },
    //             { branch: 'CN001', startDate: '2020-01-01', endDate: 'Present' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV002',
    //         name: 'Trần Thị B',
    //         gender: 'Nữ',
    //         cccd: '987654321',
    //         phone: '0987654321',
    //         email: 'tranthib@example.com',
    //         dateOfWork: '2023-02-01',
    //         currentBranch: 'CN002',
    //         workingDepartment: 'Phòng Nhân Sự',
    //         workHistory: [
    //             { oldBranch: 'CN001', startDate: '2022-02-01', endDate: '2023-01-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV003',
    //         name: 'Lê Văn C',
    //         gender: 'Nam',
    //         cccd: '123498765',
    //         phone: '0123987654',
    //         email: 'levanc@example.com',
    //         dateOfWork: '2023-03-01',
    //         currentBranch: 'CN003',
    //         workingDepartment: 'Phòng Kỹ Thuật',
    //         workHistory: [
    //             { oldBranch: 'CN002', startDate: '2022-03-01', endDate: '2023-02-28' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV004',
    //         name: 'Phạm Thị D',
    //         gender: 'Nữ',
    //         cccd: '987612345',
    //         phone: '0987123456',
    //         email: 'phamthid@example.com',
    //         dateOfWork: '2023-04-01',
    //         currentBranch: 'CN004',
    //         workingDepartment: 'Phòng Kinh Doanh',
    //         workHistory: [
    //             { oldBranch: 'CN003', startDate: '2022-04-01', endDate: '2023-03-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV005',
    //         name: 'Hoàng Văn E',
    //         gender: 'Nam',
    //         cccd: '123467894',
    //         phone: '0123678945',
    //         email: 'hoangvane@example.com',
    //         dateOfWork: '2023-05-01',
    //         currentBranch: 'CN005',
    //         workingDepartment: 'Phòng Marketing',
    //         workHistory: [
    //             { oldBranch: 'CN004', startDate: '2022-05-01', endDate: '2023-04-30' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV006',
    //         name: 'Đỗ Thị F',
    //         gender: 'Nữ',
    //         cccd: '987634561',
    //         phone: '0987345612',
    //         email: 'dothif@example.com',
    //         dateOfWork: '2023-06-01',
    //         currentBranch: 'CN006',
    //         workingDepartment: 'Phòng Kế Toán',
    //         workHistory: [
    //             { oldBranch: 'CN005', startDate: '2022-06-01', endDate: '2023-05-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV007',
    //         name: 'Ngô Văn G',
    //         gender: 'Nam',
    //         cccd: '123456781',
    //         phone: '0123456781',
    //         email: 'ngovang@example.com',
    //         dateOfWork: '2023-07-01',
    //         currentBranch: 'CN007',
    //         workingDepartment: 'Phòng Nhân Sự',
    //         workHistory: [
    //             { oldBranch: 'CN006', startDate: '2022-07-01', endDate: '2023-06-30' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV008',
    //         name: 'Vũ Thị H',
    //         gender: 'Nữ',
    //         cccd: '987654322',
    //         phone: '0987654322',
    //         email: 'vuthih@example.com',
    //         dateOfWork: '2023-08-01',
    //         currentBranch: 'CN008',
    //         workingDepartment: 'Phòng Kỹ Thuật',
    //         workHistory: [
    //             { oldBranch: 'CN007', startDate: '2022-08-01', endDate: '2023-07-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV009',
    //         name: 'Nguyễn Thị I',
    //         gender: 'Nữ',
    //         cccd: '123456782',
    //         phone: '0123456782',
    //         email: 'nguyenthiI@example.com',
    //         dateOfWork: '2023-09-01',
    //         currentBranch: 'CN009',
    //         workingDepartment: 'Phòng Kinh Doanh',
    //         workHistory: [
    //             { oldBranch: 'CN008', startDate: '2022-09-01', endDate: '2023-08-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV010',
    //         name: 'Phạm Văn J',
    //         gender: 'Nam',
    //         cccd: '987654323',
    //         phone: '0987654323',
    //         email: 'phamvanj@example.com',
    //         dateOfWork: '2023-10-01',
    //         currentBranch: 'CN010',
    //         workingDepartment: 'Phòng Marketing',
    //         workHistory: [
    //             { oldBranch: 'CN009', startDate: '2022-10-01', endDate: '2023-09-30' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV011',
    //         name: 'Lê Thị K',
    //         gender: 'Nữ',
    //         cccd: '123456783',
    //         phone: '0123456783',
    //         email: 'lethik@example.com',
    //         dateOfWork: '2023-11-01',
    //         currentBranch: 'CN011',
    //         workingDepartment: 'Phòng Kế Toán',
    //         workHistory: [
    //             { oldBranch: 'CN010', startDate: '2022-11-01', endDate: '2023-10-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV012',
    //         name: 'Trần Văn L',
    //         gender: 'Nam',
    //         cccd: '987654324',
    //         phone: '0987654324',
    //         email: 'tranvanl@example.com',
    //         dateOfWork: '2023-12-01',
    //         currentBranch: 'CN012',
    //         workingDepartment: 'Phòng Nhân Sự',
    //         workHistory: [
    //             { oldBranch: 'CN011', startDate: '2022-12-01', endDate: '2023-11-30' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV013',
    //         name: 'Hoàng Thị M',
    //         gender: 'Nữ',
    //         cccd: '123456784',
    //         phone: '0123456784',
    //         email: 'hoangthim@example.com',
    //         dateOfWork: '2024-01-01',
    //         currentBranch: 'CN013',
    //         workingDepartment: 'Phòng Kỹ Thuật',
    //         workHistory: [
    //             { oldBranch: 'CN012', startDate: '2023-01-01', endDate: '2023-12-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV014',
    //         name: 'Đỗ Văn N',
    //         gender: 'Nam',
    //         cccd: '987654325',
    //         phone: '0987654325',
    //         email: 'dovann@example.com',
    //         dateOfWork: '2024-02-01',
    //         currentBranch: 'CN014',
    //         workingDepartment: 'Phòng Kinh Doanh',
    //         workHistory: [
    //             { oldBranch: 'CN013', startDate: '2023-02-01', endDate: '2024-01-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV015',
    //         name: 'Ngô Thị O',
    //         gender: 'Nữ',
    //         cccd: '123456785',
    //         phone: '0123456785',
    //         email: 'ngothio@example.com',
    //         dateOfWork: '2024-03-01',
    //         currentBranch: 'CN015',
    //         workingDepartment: 'Phòng Marketing',
    //         workHistory: [
    //             { oldBranch: 'CN014', startDate: '2023-03-01', endDate: '2024-02-29' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV016',
    //         name: 'Vũ Văn P',
    //         gender: 'Nam',
    //         cccd: '987654326',
    //         phone: '0987654326',
    //         email: 'vuvanp@example.com',
    //         dateOfWork: '2024-04-01',
    //         currentBranch: 'CN016',
    //         workingDepartment: 'Phòng Kế Toán',
    //         workHistory: [
    //             { oldBranch: 'CN015', startDate: '2023-04-01', endDate: '2024-03-31' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV017',
    //         name: 'Phạm Thị Q',
    //         gender: 'Nữ',
    //         cccd: '123456786',
    //         phone: '0123456786',
    //         email: 'phamthiq@example.com',
    //         dateOfWork: '2024-05-01',
    //         currentBranch: 'CN017',
    //         workingDepartment: 'Phòng Nhân Sự',
    //         workHistory: [
    //             { oldBranch: 'CN016', startDate: '2023-05-01', endDate: '2024-04-30' }
    //         ]
    //     },
    //     {
    //         staffID: 'NV018',
    //         name: 'Nguyễn Văn R',
    //         gender: 'Nam',
    //         cccd: '987654327',
    //         phone: '0987654327',
    //         email: 'nguyenvanr@example.com',
    //         dateOfWork: '2024-06-01',
    //         currentBranch: 'CN018',
    //         workingDepartment: 'Phòng Kỹ Thuật',
    //         workHistory: [
    //             { oldBranch: 'CN017', startDate: '2023-06-01', endDate: '2024-05-31' }
    //         ]
    //     }
    // ]);

    // STAFF DATA
    const [staffs, setStaffs] = useState([
        {
            staffID: 'NV001',
            name: 'Nguyễn Văn A',
            gender: 'Nam',
            salary: '20,000,000 VND',
            startDate: '2020-01-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456789',
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
            staffID: 'NV002',
            name: 'Trần Thị B',
            gender: 'Nữ',
            salary: '18,000,000 VND',
            startDate: '2021-02-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987654321',
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
            staffID: 'NV003',
            name: 'Lê Văn C',
            gender: 'Nam',
            salary: '22,000,000 VND',
            startDate: '2019-03-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123987654',
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
            staffID: 'NV004',
            name: 'Phạm Thị D',
            gender: 'Nữ',
            salary: '19,000,000 VND',
            startDate: '2022-04-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987123456',
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
            staffID: 'NV005',
            name: 'Hoàng Văn E',
            gender: 'Nam',
            salary: '21,000,000 VND',
            startDate: '2020-05-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123678945',
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
            staffID: 'NV006',
            name: 'Đỗ Thị F',
            gender: 'Nữ',
            salary: '23,000,000 VND',
            startDate: '2021-06-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987345612',
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
            staffID: 'NV007',
            name: 'Ngô Văn G',
            gender: 'Nam',
            salary: '24,000,000 VND',
            startDate: '2018-07-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456781',
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
            staffID: 'NV008',
            name: 'Vũ Thị H',
            gender: 'Nữ',
            salary: '25,000,000 VND',
            startDate: '2019-08-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987654322',
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
            staffID: 'NV009',
            name: 'Nguyễn Thị I',
            gender: 'Nữ',
            salary: '26,000,000 VND',
            startDate: '2020-09-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456782',
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
            staffID: 'NV010',
            name: 'Phạm Văn J',
            gender: 'Nam',
            salary: '27,000,000 VND',
            startDate: '2021-10-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987654323',
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
            staffID: 'NV011',
            name: 'Lê Thị K',
            gender: 'Nữ',
            salary: '28,000,000 VND',
            startDate: '2022-11-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456783',
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
            staffID: 'NV012',
            name: 'Trần Văn L',
            gender: 'Nam',
            salary: '29,000,000 VND',
            startDate: '2023-12-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987654324',
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
            staffID: 'NV013',
            name: 'Hoàng Thị M',
            gender: 'Nữ',
            salary: '30,000,000 VND',
            startDate: '2024-01-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456784',
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
            staffID: 'NV014',
            name: 'Đỗ Văn N',
            gender: 'Nam',
            salary: '31,000,000 VND',
            startDate: '2024-02-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987654325',
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
            staffID: 'NV015',
            name: 'Nguyễn Văn O',
            gender: 'Nam',
            salary: '32,000,000 VND',
            startDate: '2024-03-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456785',
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
            staffID: 'NV016',
            name: 'Trần Thị P',
            gender: 'Nữ',
            salary: '33,000,000 VND',
            startDate: '2024-04-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0987654326',
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
            staffID: 'NV017',
            name: 'Lê Văn Q',
            gender: 'Nam',
            salary: '34,000,000 VND',
            startDate: '2024-05-01',
            resignationDate: 'Present',
            address: {
                phoneNumber: '0123456786',
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
    
    const sortedStaffs = staffs.sort((a, b) => new Date(b.dateOfWork) - new Date(a.dateOfWork));

    const filteredStaffs = sortedStaffs.filter(staff => {
        const value = selectedProperty.split('.').reduce((o, i) => o[i], staff);
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
                            <select className="property-dropdown" value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
                                <option value="staffID">Mã NV</option>
                                <option value="name">Họ tên</option>
                                <option value="gender">Giới tính</option>
                                <option value="salary">Lương</option>
                                <option value="startDate">Ngày bắt đầu</option>
                                <option value="resignationDate">Ngày nghỉ việc</option>
                                <option value="address.phoneNumber">Số điện thoại</option>
                                <option value="address.homeNumber">Số nhà</option>
                                <option value="address.street">Đường</option>
                                <option value="address.ward">Phường</option>
                                <option value="address.district">Quận</option>
                                <option value="address.city">Thành phố</option>
                                <option value="workingDepartment">Phòng ban</option>
                                <option value="position">Chức vụ</option>
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
                                    <th>Mã NV</th>
                                    <th>Họ tên</th>
                                    <th>Giới tính</th>
                                    <th>Lương</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày nghỉ việc</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Phòng ban</th>
                                    <th>Chức vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStaffs.map(staff => (
                                    <tr key={staff.staffID} onClick={() => handleRowClick(staff)}>
                                        <td>{staff.staffID}</td>
                                        <td>{staff.name}</td>
                                        <td>{staff.gender}</td>
                                        <td>{staff.salary}</td>
                                        <td>{staff.startDate}</td>
                                        <td>{staff.resignationDate}</td>
                                        <td>{staff.address.phoneNumber}</td>
                                        <td>{`${staff.address.homeNumber}, ${staff.address.street}, ${staff.address.ward}, ${staff.address.district}, ${staff.address.city}`}</td>
                                        <td>{staff.workingDepartment}</td>
                                        <td>{staff.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedStaff && (
                <StaffDetailModal staff={selectedStaff} onClose={closeModal} onUpdate={handleUpdate} />
            )}
            {isAddModalOpen && (
                <AddStaffModal onClose={() => setIsAddModalOpen(false)} onAddStaff={handleAddStaff} />
            )}
        </div>
    );
}

export default StaffMgmt;