import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';

import '../css/customer-mgmt.css';

import AddCustomerModal from "../modals/AddCustomerModal";
import CustomerDetailModal from "../modals/CustomerDetailModal";
import Management from "./Management";

const TABLE_COLUMNS = [
    { id: 'phone', header: 'SĐT', value: 'phone' },
    { id: 'name', header: 'Họ tên', value: 'name' },
    { id: 'gender', header: 'Giới tính', value: 'gender' },
    { id: 'cccd', header: 'CCCD', value: 'cccd' },
    { id: 'email', header: 'Email', value: 'email' },
    { id: 'createdDate', header: 'Ngày tạo', value: 'createdDate' },
    { id: 'membershipType', header: 'Loại TV', value: 'membershipType' },
    { id: 'status', header: 'Tình trạng', value: 'status' }
];

const customers = [
    {
        phone: '0123456789',
        name: 'Nguyễn Văn Trung Thế A',
        gender: 'Nam',
        cccd: '123456789',
        email: 'nguyenvantrungthea@example.com',
        createdDate: '2023-01-01',
        membershipType: 'Membership',
        status: 'Hoạt động'
    },
    {
        phone: '0987654321',
        name: 'Trần Thị B',
        gender: 'Nữ',
        cccd: '987654321',
        email: 'tranthib@example.com',
        createdDate: '2023-02-01',
        membershipType: 'Silver',
        status: 'Hoạt động'
    },
    {
        phone: '0123987654',
        name: 'Lê Văn C',
        gender: 'Nam',
        cccd: '123498765',
        email: 'levanc@example.com',
        createdDate: '2023-03-01',
        membershipType: 'Gold',
        status: 'Hoạt động'
    },
    {
        phone: '0987123456',
        name: 'Phạm Thị D',
        gender: 'Nữ',
        cccd: '987612345',
        email: 'phamthid@example.com',
        createdDate: '2023-04-01',
        membershipType: 'Membership',
        status: 'Hoạt động'
    },
    {
        phone: '0123678945',
        name: 'Hoàng Văn E',
        gender: 'Nam',
        cccd: '123467894',
        email: 'hoangvane@example.com',
        createdDate: '2023-05-01',
        membershipType: 'Silver',
        status: 'Hoạt động'
    },
    {
        phone: '0987345612',
        name: 'Đỗ Thị F',
        gender: 'Nữ',
        cccd: '987634561',
        email: 'dothif@example.com',
        createdDate: '2023-06-01',
        membershipType: 'Gold',
        status: 'Hoạt động'
    },
    {
        phone: '0123456781',
        name: 'Ngô Văn G',
        gender: 'Nam',
        cccd: '123456781',
        email: 'ngovang@example.com',
        createdDate: '2023-07-01',
        membershipType: 'Membership',
        status: 'Hoạt động'
    },
    {
        phone: '0987654322',
        name: 'Vũ Thị H',
        gender: 'Nữ',
        cccd: '987654322',
        email: 'vuthih@example.com',
        createdDate: '2023-08-01',
        membershipType: 'Silver',
        status: 'Hoạt động'
    },
    {
        phone: '0123456782',
        name: 'Nguyễn Thị I',
        gender: 'Nữ',
        cccd: '123456782',
        email: 'nguyenthiI@example.com',
        createdDate: '2023-09-01',
        membershipType: 'Gold',
        status: 'Hoạt động'
    },
    {
        phone: '0987654323',
        name: 'Phạm Văn J',
        gender: 'Nam',
        cccd: '987654323',
        email: 'phamvanj@example.com',
        createdDate: '2023-10-01',
        membershipType: 'Silver',
        status: 'Hoạt động'
    },
    {
        phone: '0123456783',
        name: 'Lê Thị K',
        gender: 'Nữ',
        cccd: '123456783',
        email: 'lethik@example.com',
        createdDate: '2023-11-01',
        membershipType: 'Membership',
        status: 'Hoạt động'
    },
    {
        phone: '0987654324',
        name: 'Trần Văn L',
        gender: 'Nam',
        cccd: '987654324',
        email: 'tranvanl@example.com',
        createdDate: '2023-12-01',
        membershipType: 'Gold',
        status: 'Hoạt động'
    },
    {
        phone: '0123456784',
        name: 'Hoàng Thị M',
        gender: 'Nữ',
        cccd: '123456784',
        email: 'hoangthim@example.com',
        createdDate: '2024-01-01',
        membershipType: 'Silver',
        status: 'Hoạt động'
    },
    {
        phone: '0987654325',
        name: 'Đỗ Văn N',
        gender: 'Nam',
        cccd: '987654325',
        email: 'dovann@example.com',
        createdDate: '2024-02-01',
        membershipType: 'Membership',
        status: 'Hoạt động'
    },
    {
        phone: '0123456785',
        name: 'Ngô Thị O',
        gender: 'Nữ',
        cccd: '123456785',
        email: 'ngothio@example.com',
        createdDate: '2024-03-01',
        membershipType: 'Gold',
        status: 'Hoạt động'
    },
    {
        phone: '0987654326',
        name: 'Vũ Văn P',
        gender: 'Nam',
        cccd: '987654326',
        email: 'vuvanp@example.com',
        createdDate: '2024-04-01',
        membershipType: 'Silver',
        status: 'Hoạt động'
    },
    {
        phone: '0123456786',
        name: 'Phạm Thị Q',
        gender: 'Nữ',
        cccd: '123456786',
        email: 'phamthiq@example.com',
        createdDate: '2024-05-01',
        membershipType: 'Membership',
        status: 'Hoạt động'
    },
    {
        phone: '0987654327',
        name: 'Nguyễn Văn R',
        gender: 'Nam',
        cccd: '987654327',
        email: 'nguyenvanr@example.com',
        createdDate: '2024-06-01',
        membershipType: 'Gold',
        status: 'Hoạt động'
    }
];


function CustomerMgmt() {
    const [data, setCustomers] = useState(customers);
    const initdata = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const handleAddCustomer = (newCustomer) => {
        setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
    };

    return (
        <Management
            columns={TABLE_COLUMNS}
            initialData={initdata}
            title="Quản lý khách hàng"
            AddModal={(props) => <AddCustomerModal {...props} onAdd={handleAddCustomer} />}
            DetailModal={CustomerDetailModal}
        />
    );
}

// function CustomerMgmt() {
//     const [searchQuery, setSearchQuery] = useState('');

//     const [selectedProperty, setSelectedProperty] = useState('phone');

//     const [currentPage, setCurrentPage] = useState(1);

//     const [pageInput, setPageInput] = useState(1);

//     const [selectedCustomer, setSelectedCustomer] = useState(null);

//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//     const customersPerPage = 10;

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     useEffect(() => {
//         setPageInput(currentPage);
//     }, [currentPage]);

//     const handleRowClick = (customer) => {
//         setSelectedCustomer(customer);
//     };

//     const closeModal = () => {
//         setSelectedCustomer(null);
//     };

//     const handleUpdate = (customer) => {
//         // Implement the update logic here
//         console.log('Update customer:', customer);
//     };

//     const handlePageInputChange = (event) => {
//         const value = event.target.value;
//         if (value === '' || (Number(value) > 0 && Number(value) <= totalPages)) {
//             setPageInput(value);
//         }
//     };

//     const handlePageInputBlur = () => {
//         const pageNumber = Number(pageInput);
//         if (pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         } else {
//             setPageInput(currentPage);
//         }
//     };

//     const handleAddCustomer = (newCustomer) => {
//         setCustomers([...customers, newCustomer]);
//     };

//     const [customers, setCustomers] = useState([
//         {
//             phone: '0123456789',
//             name: 'Nguyễn Văn Trung Thế A',
//             gender: 'Nam',
//             cccd: '123456789',
//             email: 'nguyenvantrungthea@example.com',
//             createdDate: '2023-01-01',
//             membershipType: 'Membership',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654321',
//             name: 'Trần Thị B',
//             gender: 'Nữ',
//             cccd: '987654321',
//             email: 'tranthib@example.com',
//             createdDate: '2023-02-01',
//             membershipType: 'Silver',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123987654',
//             name: 'Lê Văn C',
//             gender: 'Nam',
//             cccd: '123498765',
//             email: 'levanc@example.com',
//             createdDate: '2023-03-01',
//             membershipType: 'Gold',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987123456',
//             name: 'Phạm Thị D',
//             gender: 'Nữ',
//             cccd: '987612345',
//             email: 'phamthid@example.com',
//             createdDate: '2023-04-01',
//             membershipType: 'Membership',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123678945',
//             name: 'Hoàng Văn E',
//             gender: 'Nam',
//             cccd: '123467894',
//             email: 'hoangvane@example.com',
//             createdDate: '2023-05-01',
//             membershipType: 'Silver',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987345612',
//             name: 'Đỗ Thị F',
//             gender: 'Nữ',
//             cccd: '987634561',
//             email: 'dothif@example.com',
//             createdDate: '2023-06-01',
//             membershipType: 'Gold',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123456781',
//             name: 'Ngô Văn G',
//             gender: 'Nam',
//             cccd: '123456781',
//             email: 'ngovang@example.com',
//             createdDate: '2023-07-01',
//             membershipType: 'Membership',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654322',
//             name: 'Vũ Thị H',
//             gender: 'Nữ',
//             cccd: '987654322',
//             email: 'vuthih@example.com',
//             createdDate: '2023-08-01',
//             membershipType: 'Silver',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123456782',
//             name: 'Nguyễn Thị I',
//             gender: 'Nữ',
//             cccd: '123456782',
//             email: 'nguyenthiI@example.com',
//             createdDate: '2023-09-01',
//             membershipType: 'Gold',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654323',
//             name: 'Phạm Văn J',
//             gender: 'Nam',
//             cccd: '987654323',
//             email: 'phamvanj@example.com',
//             createdDate: '2023-10-01',
//             membershipType: 'Silver',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123456783',
//             name: 'Lê Thị K',
//             gender: 'Nữ',
//             cccd: '123456783',
//             email: 'lethik@example.com',
//             createdDate: '2023-11-01',
//             membershipType: 'Membership',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654324',
//             name: 'Trần Văn L',
//             gender: 'Nam',
//             cccd: '987654324',
//             email: 'tranvanl@example.com',
//             createdDate: '2023-12-01',
//             membershipType: 'Gold',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123456784',
//             name: 'Hoàng Thị M',
//             gender: 'Nữ',
//             cccd: '123456784',
//             email: 'hoangthim@example.com',
//             createdDate: '2024-01-01',
//             membershipType: 'Silver',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654325',
//             name: 'Đỗ Văn N',
//             gender: 'Nam',
//             cccd: '987654325',
//             email: 'dovann@example.com',
//             createdDate: '2024-02-01',
//             membershipType: 'Membership',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123456785',
//             name: 'Ngô Thị O',
//             gender: 'Nữ',
//             cccd: '123456785',
//             email: 'ngothio@example.com',
//             createdDate: '2024-03-01',
//             membershipType: 'Gold',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654326',
//             name: 'Vũ Văn P',
//             gender: 'Nam',
//             cccd: '987654326',
//             email: 'vuvanp@example.com',
//             createdDate: '2024-04-01',
//             membershipType: 'Silver',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0123456786',
//             name: 'Phạm Thị Q',
//             gender: 'Nữ',
//             cccd: '123456786',
//             email: 'phamthiq@example.com',
//             createdDate: '2024-05-01',
//             membershipType: 'Membership',
//             status: 'Hoạt động'
//         },
//         {
//             phone: '0987654327',
//             name: 'Nguyễn Văn R',
//             gender: 'Nam',
//             cccd: '987654327',
//             email: 'nguyenvanr@example.com',
//             createdDate: '2024-06-01',
//             membershipType: 'Gold',
//             status: 'Hoạt động'
//         }
//     ]);

//     const sortedCustomers = customers.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

//     const filteredCustomers = sortedCustomers.filter(customer => {
//         const value = selectedProperty.split('.').reduce((o, i) => o[i], customer);
//         return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
//     });

//     const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

//     // If total pages is 0, set current page to 0
//     if (totalPages === 0 && currentPage !== 0) {
//         setCurrentPage(0);
//     }
//     else if (totalPages !== 0 && currentPage === 0) {
//         setCurrentPage(1);
//     }

//     // Get current customers
//     const indexOfLastCustomer = currentPage * customersPerPage;
//     const indexOfFirstCustomer = currentPage === 0 ? -1 : indexOfLastCustomer - customersPerPage;
//     const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

//     // HANDLE PAGE CHANGE
//     const nextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };
//     const prevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="customer-mgmt-page">
//             <Nav />
//             <div className="page-container">
//                 <SideBar />
//                 <div className="main-content-box">
//                     <div className="header-container">
//                         <h1>Quản lý khách hàng</h1>
//                         <button className="add-customer-button" onClick={() => setIsAddModalOpen(true)}>Thêm Khách Hàng</button>
//                     </div>
//                     <div className="table-box">
//                         <div className="search-and-pagination-container">
//                             <select className="property-dropdown" value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
//                                 <option value="phone">Số điện thoại</option>
//                                 <option value="name">Họ tên</option>
//                                 <option value="gender">Giới tính</option>
//                                 <option value="cccd">CCCD</option>
//                                 <option value="email">Email</option>
//                                 <option value="createdDate">Ngày tạo</option>
//                                 <option value="membershipType">Loại TV</option>
//                                 <option value="status">Tình trạng</option>
//                             </select>
//                             <input
//                                 type="text"
//                                 placeholder="Tìm kiếm khách hàng..."
//                                 className="search-input"
//                                 value={searchQuery}
//                                 onChange={handleSearch}
//                             />
//                             <div className="pagination-controls">
//                                 <button onClick={prevPage} disabled={currentPage === 1 || totalPages === 0}>Trước</button>
//                                 <input
//                                     type="number"
//                                     className="page-input"
//                                     value={pageInput}
//                                     onChange={handlePageInputChange}
//                                     onBlur={handlePageInputBlur}
//                                     min="1"
//                                     max={totalPages}
//                                 />
//                                 <span> trên {totalPages}</span>
//                                 <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0}>Kế</button>
//                             </div>
//                             <div className="results-info">
//                                 <span>
//                                     Đang xem {indexOfFirstCustomer + 1} - {Math.min(indexOfLastCustomer, filteredCustomers.length)} trong tổng số {filteredCustomers.length} khách hàng
//                                 </span>
//                             </div>
//                         </div>
//                         <table className="customer-table">
//                             <thead>
//                                 <tr>
//                                     <th>SĐT</th>
//                                     <th>Họ tên</th>
//                                     <th>Giới tính</th>
//                                     <th>CCCD</th>
//                                     <th>Email</th>
//                                     <th>Ngày tạo</th>
//                                     <th>Loại TV</th>
//                                     <th>Tình trạng</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentCustomers.map(customer => (
//                                     <tr key={customer.phone} onClick={() => handleRowClick(customer)}>
//                                         <td>{customer.phone}</td>
//                                         <td>{customer.name}</td>
//                                         <td>{customer.gender}</td>
//                                         <td>{customer.cccd}</td>
//                                         <td>{customer.email}</td>
//                                         <td>{customer.createdDate}</td>
//                                         <td>{customer.membershipType}</td>
//                                         <td>{customer.status}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             {selectedCustomer && (
//                 <CustomerDetailModal customer={selectedCustomer} onClose={closeModal} onUpdate={handleUpdate} />
//             )}
//             {isAddModalOpen && (
//                 <AddCustomerModal onClose={() => setIsAddModalOpen(false)} onAddCustomer={handleAddCustomer} />
//             )}
//         </div>
//     );
// }

export default CustomerMgmt;