import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-customer.css';
import AddModal from "../modals/Add_Customer";
import DetailModal from "../modals/Detail_Customer";
import Mgmt_General from "../components/Mgmt_General"

const columns = [
    { id: 'phone', header: 'Số điện thoại', value: 'phone', editable: false, visible: true },
    { id: 'name', header: 'Tên', value: 'name', editable: true, visible: true },
    { id: 'cccd', header: 'CCCD', value: 'cccd', editable: true, visible: true },
    { id: 'email', header: 'Email', value: 'email', editable: true, visible: true },
    { id: 'gender', header: 'Giới tính', value: 'gender', editable: true, visible: true },

    { id: 'cardId', header: 'Mã thẻ', value: 'cardId', editable: true, visible: true },
    { id: 'createdDate', header: 'Ngày tạo', value: 'createdDate', editable: false, visible: false },
    { id: 'yearsOfUsing', header: 'Năm sử dụng', value: 'yearsOfUsing', editable: true, visible: true },
    { id: 'points', header: 'Điểm', value: 'points', editable: true, visible: true },
    { id: 'status', header: 'Trạng thái', value: 'status', editable: false, visible: true },
    { id: 'membershipType', header: 'Loại thành viên', value: 'membershipType', editable: true, visible: true },
    { id: 'staffCreatorId', header: 'Mã nhân viên tạo', value: 'staffCreatorId', editable: true, visible: false },
];
const initCustomers = [
    { phone: '0123456789', name: 'Nguyễn Văn Trung Thế A', cccd: '123456789', email: 'nguyenvantrungthea@example.com', gender: 'Nam', cardId: 'CARD001', createdDate: '2023-01-01', yearsOfUsing: 1, points: 100, status: 'Hoạt động', membershipType: 'Membership', staffCreatorId: 'STAFF001' },
    { phone: '0987654321', name: 'Trần Thị B', cccd: '987654321', email: 'tranthib@example.com', gender: 'Nữ', cardId: 'CARD002', createdDate: '2023-02-01', yearsOfUsing: 2, points: 200, status: 'Hoạt động', membershipType: 'Silver', staffCreatorId: 'STAFF002' },
    { phone: '0123987654', name: 'Lê Văn C', cccd: '123498765', email: 'levanc@example.com', gender: 'Nam', cardId: 'CARD003', createdDate: '2023-03-01', yearsOfUsing: 3, points: 300, status: 'Hoạt động', membershipType: 'Gold', staffCreatorId: 'STAFF003' },
    { phone: '0987123456', name: 'Phạm Thị D', cccd: '987612345', email: 'phamthid@example.com', gender: 'Nữ', cardId: 'CARD004', createdDate: '2023-04-01', yearsOfUsing: 4, points: 400, status: 'Hoạt động', membershipType: 'Membership', staffCreatorId: 'STAFF004' },
    { phone: '0123678945', name: 'Hoàng Văn E', cccd: '123467894', email: 'hoangvane@example.com', gender: 'Nam', cardId: 'CARD005', createdDate: '2023-05-01', yearsOfUsing: 5, points: 500, status: 'Hoạt động', membershipType: 'Silver', staffCreatorId: 'STAFF005' },
    { phone: '0987345612', name: 'Đỗ Thị F', cccd: '987634561', email: 'dothif@example.com', gender: 'Nữ', cardId: 'CARD006', createdDate: '2023-06-01', yearsOfUsing: 6, points: 600, status: 'Hoạt động', membershipType: 'Gold', staffCreatorId: 'STAFF006' },
    { phone: '0123456781', name: 'Ngô Văn G', cccd: '123456781', email: 'ngovang@example.com', gender: 'Nam', cardId: 'CARD007', createdDate: '2023-07-01', yearsOfUsing: 7, points: 700, status: 'Hoạt động', membershipType: 'Membership', staffCreatorId: 'STAFF007' },
    { phone: '0987654322', name: 'Vũ Thị H', cccd: '987654322', email: 'vuthih@example.com', gender: 'Nữ', cardId: 'CARD008', createdDate: '2023-08-01', yearsOfUsing: 8, points: 800, status: 'Hoạt động', membershipType: 'Silver', staffCreatorId: 'STAFF008' },
    { phone: '0123456782', name: 'Nguyễn Thị I', cccd: '123456782', email: 'nguyenthiI@example.com', gender: 'Nữ', cardId: 'CARD009', createdDate: '2023-09-01', yearsOfUsing: 9, points: 900, status: 'Hoạt động', membershipType: 'Gold', staffCreatorId: 'STAFF009' },
    { phone: '0987654323', name: 'Phạm Văn J', cccd: '987654323', email: 'phamvanj@example.com', gender: 'Nam', cardId: 'CARD010', createdDate: '2023-10-01', yearsOfUsing: 10, points: 1000, status: 'Hoạt động', membershipType: 'Silver', staffCreatorId: 'STAFF010' },
    { phone: '0123456783', name: 'Lê Thị K', cccd: '123456783', email: 'lethik@example.com', gender: 'Nữ', cardId: 'CARD011', createdDate: '2023-11-01', yearsOfUsing: 11, points: 1100, status: 'Hoạt động', membershipType: 'Membership', staffCreatorId: 'STAFF011' },
    { phone: '0987654324', name: 'Trần Văn L', cccd: '987654324', email: 'tranvanl@example.com', gender: 'Nam', cardId: 'CARD012', createdDate: '2023-12-01', yearsOfUsing: 12, points: 1200, status: 'Hoạt động', membershipType: 'Gold', staffCreatorId: 'STAFF012' },
    { phone: '0123456784', name: 'Hoàng Thị M', cccd: '123456784', email: 'hoangthim@example.com', gender: 'Nữ', cardId: 'CARD013', createdDate: '2024-01-01', yearsOfUsing: 13, points: 1300, status: 'Hoạt động', membershipType: 'Silver', staffCreatorId: 'STAFF013' },
    { phone: '0987654325', name: 'Đỗ Văn N', cccd: '987654325', email: 'dovann@example.com', gender: 'Nam', cardId: 'CARD014', createdDate: '2024-02-01', yearsOfUsing: 14, points: 1400, status: 'Hoạt động', membershipType: 'Membership', staffCreatorId: 'STAFF014' },
    { phone: '0123456785', name: 'Ngô Thị O', cccd: '123456785', email: 'ngothio@example.com', gender: 'Nữ', cardId: 'CARD015', createdDate: '2024-03-01', yearsOfUsing: 15, points: 1500, status: 'Hoạt động', membershipType: 'Gold', staffCreatorId: 'STAFF015' },
    { phone: '0987654326', name: 'Vũ Văn P', cccd: '987654326', email: 'vuvanp@example.com', gender: 'Nam', cardId: 'CARD016', createdDate: '2024-04-01', yearsOfUsing: 16, points: 1600, status: 'Hoạt động', membershipType: 'Silver', staffCreatorId: 'STAFF016' },
    { phone: '0123456786', name: 'Phạm Thị Q', cccd: '123456786', email: 'phamthiq@example.com', gender: 'Nữ', cardId: 'CARD017', createdDate: '2024-05-01', yearsOfUsing: 17, points: 1700, status: 'Hoạt động', membershipType: 'Membership', staffCreatorId: 'STAFF017' },
    { phone: '0987654327', name: 'Nguyễn Văn R', cccd: '987654327', email: 'nguyenvanr@example.com', gender: 'Nam', cardId: 'CARD018', createdDate: '2024-06-01', yearsOfUsing: 18, points: 1800, status: 'Hoạt động', membershipType: 'Gold', staffCreatorId: 'STAFF018' }
];

function Mgmt_Customer() {
    const customers = initCustomers.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

    return (
        <Mgmt_General
            columns={columns}
            initialData={customers}
            title={'Quản lý khách hàng'}
            AddModal={AddModal}
            DetailModal={DetailModal}
        />
    );
};

// function Mgmt_Customer() {
//     const [customers, setCustomers] = useState(initCustomers);

//     useEffect(() => {
//         console.log('Current customers:', customers);
//     }, [customers]);

//     const [selectedCustomer, setSelectedCustomer] = useState(null);

//     const [searchQuery, setSearchQuery] = useState('');

//     const [selectedProperty, setSelectedProperty] = useState('phone');

//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         setPageInput(currentPage);
//     }, [currentPage]);

//     const [pageInput, setPageInput] = useState(1);

//     const customersPerPage = 10;

//     const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//     };

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
//                 <DetailModal customer={selectedCustomer} onClose={closeModal} onUpdate={handleUpdate} />
//             )}
//             {isAddModalOpen && (
//                 <AddModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddCustomer} />
//             )}
//         </div>
//     );
// }

export default Mgmt_Customer;