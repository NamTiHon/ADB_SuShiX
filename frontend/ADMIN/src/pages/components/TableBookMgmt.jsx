import { React, useState, useEffect, useMemo } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import AddBookingModal from "../modals/AddBookingModal";
import '../css/management.css';

// Columns only show on the table
const TABLE_COLUMNS = [
  { id: 'bookingId', header: 'Mã phiếu đặt', value: 'bookingId' },
  { id: 'createdDate', header: 'Ngày tạo', value: 'createdDate' },
  { id: 'branchId', header: 'Mã chi nhánh', value: 'branchId' },
  { id: 'tableNumber', header: 'Bàn số', value: 'tableNumber' },
  { id: 'numOfCustomers', header: 'Số khách', value: 'numOfCustomers' },
  { id: 'arrivalTime', header: 'Thời gian đến', value: 'arrivalTime' },
  { id: 'comment', header: 'Ghi chú', value: 'comment' },
  { id: 'status', header: 'Trạng thái', value: 'status' }
];

const data = [
    { bookingId: '1', createdDate: '2023-10-01', branchId: 'B001', tableNumber: 2, numOfCustomers: 4, arrivalTime: '18:00', arrivalDate: '2023-10-01', comment: 'Birthday party', status: 'Confirmed' },
    { bookingId: '2', createdDate: '2023-10-02', branchId: 'B002', tableNumber: 1, numOfCustomers: 2, arrivalTime: '19:00', arrivalDate: '2023-10-02', comment: 'Anniversary', status: 'Pending' },
    { bookingId: '3', createdDate: '2023-10-03', branchId: 'B003', tableNumber: 3, numOfCustomers: 6, arrivalTime: '20:00', arrivalDate: '2023-10-03', comment: 'Business meeting', status: 'Cancelled' },
    { bookingId: '4', createdDate: '2023-10-04', branchId: 'B004', tableNumber: 2, numOfCustomers: 5, arrivalTime: '17:00', arrivalDate: '2023-10-04', comment: 'Family dinner', status: 'Confirmed' },
    { bookingId: '5', createdDate: '2023-10-05', branchId: 'B005', tableNumber: 4, numOfCustomers: 8, arrivalTime: '18:30', arrivalDate: '2023-10-05', comment: 'Friends gathering', status: 'Pending' },
    { bookingId: '6', createdDate: '2023-10-06', branchId: 'B006', tableNumber: 1, numOfCustomers: 1, arrivalTime: '19:30', arrivalDate: '2023-10-06', comment: 'Solo dining', status: 'Confirmed' },
    { bookingId: '7', createdDate: '2023-10-07', branchId: 'B007', tableNumber: 2, numOfCustomers: 3, arrivalTime: '20:30', arrivalDate: '2023-10-07', comment: 'Date night', status: 'Cancelled' },
    { bookingId: '8', createdDate: '2023-10-08', branchId: 'B008', tableNumber: 3, numOfCustomers: 7, arrivalTime: '21:00', arrivalDate: '2023-10-08', comment: 'Team outing', status: 'Confirmed' },
    { bookingId: '9', createdDate: '2023-10-09', branchId: 'B009', tableNumber: 2, numOfCustomers: 4, arrivalTime: '18:45', arrivalDate: '2023-10-09', comment: 'Casual dinner', status: 'Pending' },
    { bookingId: '10', createdDate: '2023-10-10', branchId: 'B010', tableNumber: 1, numOfCustomers: 2, arrivalTime: '19:15', arrivalDate: '2023-10-10', comment: 'Quick bite', status: 'Confirmed' }
];

const initdata = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

function TableBookMgmt({ columns = TABLE_COLUMNS, initialData = initdata }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterField, setFilterField] = useState(columns[0].id);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const itemsPerPage = 10;

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

    const handleRowClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const handleUpdate = (customer) => {
        // Implement the update logic here
        console.log('Update item:', customer);
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

    const [items, setItems] = useState(initialData);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            if (!item[filterField]) return false;
            const value = String(item[filterField]).toLowerCase();
            return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [initialData, filterField, searchQuery]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // If total pages is 0, set current page to 0
    if (totalPages === 0 && currentPage !== 0) {
        setCurrentPage(0);
    }
    else if (totalPages !== 0 && currentPage === 0) {
        setCurrentPage(1);
    }

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = currentPage === 0 ? -1 : indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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
        <div className="table-book-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Danh sách đặt bàn</h1>
                        <button className="add-button" onClick={() => setIsAddModalOpen(true)}>Thêm</button>
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
                                placeholder="Tìm kiếm phiếu đặt..."
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
                                    Đang xem {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredItems.length)} trong tổng số {filteredItems.length} kết quả
                                </span>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    {columns.map(column => (
                                        <th key={column.id}>{column.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(item => (
                                    <tr key={item.bookingId} onClick={() => handleRowClick(item)}>
                                        {columns.map(column => (
                                            <td key={`${item.bookingId}-${column.id}`}>
                                                {item[column.value]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isAddModalOpen && (
                <AddBookingModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddItem} />
            )}
        </div>
    );
}

export default TableBookMgmt;