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
function Mgmt_Customer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth');
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const result = await response.json();
                console.log('Raw API Response:', result); // Debug log
    
                // Ensure we have an array to work with
                const customersArray = Array.isArray(result) ? result : 
                Array.isArray(result.data) ? result.data :
                Array.isArray(result.customers) ? result.customers : [];

                console.log('Customers Array:', customersArray);
    
                const transformedCustomers = result.filter(customer => customer !== null).map(customer => {
                    console.log('Processing customer:', customer); // Debug individual customer
                    return {
                        phone: customer?.KH_SDT || '',
                        name: customer?.KH_HoTen || '',
                        cccd: customer?.KH_CCCD || '',
                        email: customer?.KH_Email || '',
                        gender: customer?.KH_GioiTinh || '',
                        card_id: customer?.TTV_MaThe || '',
                        createDate: customer?.TTV_NgayTao ? new Date(customer.TTV_NgayTao).toLocaleDateString() : '',
                        yearsOfUsing: customer?.TTV_SoNamSuDung || 0,
                        points: customer?.TTV_DiemTichLuy || 0,
                        status: customer?.TTV_TrangThai === "Available" ? "Hoạt động" : "Đã khóa",
                        membershipType: customer?.TTV_LoaiThe || '',
                        staffCreatorID: customer?.TTV_MaNhanVien || ''
                    };
                });
                
                console.log('Transformed Customers:', transformedCustomers); // Debug transformed data
                setCustomers(transformedCustomers);
            } catch (err) {
                setError(err.message);
                console.error('Error details:', err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCustomers();
    }, []);


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