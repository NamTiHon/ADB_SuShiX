import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_Booking";
import DetailModal from "../modals/Detail_Booking";

function Mgmt_Booking() {
    const columns = [
        { id: 'bookingId', header: 'Mã đặt bàn', value: 'bookingId' },
        { id: 'phone', header: 'Số điện thoại', value: 'phone' },
        { id: 'createdDate', header: 'Ngày tạo', value: 'createdDate' },
        { id: 'branchId', header: 'Chi nhánh', value: 'branchId' },
        { id: 'tableNumber', header: 'Số bàn', value: 'tableNumber' },
        { id: 'numOfCustomers', header: 'Số khách', value: 'numOfCustomers' },
        { id: 'arrivalDate', header: 'Ngày đến', value: 'arrivalDate' },
        { id: 'arrivalTime', header: 'Giờ đến', value: 'arrivalTime' },
        { id: 'comment', header: 'Ghi chú', value: 'comment' },
        { id: 'status', header: 'Trạng thái', value: 'status' }
    ];

    const [bookings, setBookings] = useState([
        { bookingId: '1', phone: '0912345678', createdDate: '2023-10-01', branchId: 'B001', tableNumber: 2, numOfCustomers: 4, arrivalDate: '2023-10-01', arrivalTime: '18:00', comment: 'Birthday party', status: 'Confirmed' },
        { bookingId: '2', phone: '0923456789', createdDate: '2023-10-02', branchId: 'B002', tableNumber: 1, numOfCustomers: 2, arrivalDate: '2023-10-02', arrivalTime: '19:00', comment: 'Anniversary', status: 'Pending' },
        { bookingId: '3', phone: '0934567890', createdDate: '2023-10-03', branchId: 'B003', tableNumber: 3, numOfCustomers: 6, arrivalDate: '2023-10-03', arrivalTime: '20:00', comment: 'Business meeting', status: 'Cancelled' },
        { bookingId: '4', phone: '0945678901', createdDate: '2023-10-04', branchId: 'B004', tableNumber: 2, numOfCustomers: 5, arrivalDate: '2023-10-04', arrivalTime: '17:00', comment: 'Family dinner', status: 'Confirmed' },
        { bookingId: '5', phone: '0956789012', createdDate: '2023-10-05', branchId: 'B005', tableNumber: 4, numOfCustomers: 8, arrivalDate: '2023-10-05', arrivalTime: '18:30', comment: 'Friends gathering', status: 'Pending' },
        { bookingId: '6', phone: '0967890123', createdDate: '2023-10-06', branchId: 'B006', tableNumber: 1, numOfCustomers: 1, arrivalDate: '2023-10-06', arrivalTime: '19:30', comment: 'Solo dining', status: 'Confirmed' },
        { bookingId: '7', phone: '0978901234', createdDate: '2023-10-07', branchId: 'B007', tableNumber: 2, numOfCustomers: 3, arrivalDate: '2023-10-07', arrivalTime: '20:30', comment: 'Date night', status: 'Cancelled' },
        { bookingId: '8', phone: '0989012345', createdDate: '2023-10-08', branchId: 'B008', tableNumber: 3, numOfCustomers: 7, arrivalDate: '2023-10-08', arrivalTime: '21:00', comment: 'Team outing', status: 'Confirmed' },
        { bookingId: '9', phone: '0990123456', createdDate: '2023-10-09', branchId: 'B009', tableNumber: 2, numOfCustomers: 4, arrivalDate: '2023-10-09', arrivalTime: '18:45', comment: 'Casual dinner', status: 'Pending' },
        { bookingId: '10', phone: '0901234567', createdDate: '2023-10-10', branchId: 'B010', tableNumber: 1, numOfCustomers: 2, arrivalDate: '2023-10-10', arrivalTime: '19:15', comment: 'Quick bite', status: 'Confirmed' }
    ]);

    useEffect(() => {
        console.log('Current bookings:', bookings);
    }, [bookings]);

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [filterField, setFilterField] = useState(columns[0].id);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

    const [pageInput, setPageInput] = useState(1);

    const bookingsPerPage = 10;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRowClick = (booking) => {
        setSelectedBooking(booking);
    };

    const closeModal = () => {
        setSelectedBooking(null);
    };

    const handleUpdate = (booking) => {
        // Implement the update logic here
        console.log('Update booking:', booking);
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

    const handleAddBooking = (newBooking) => {
        setBookings([...bookings, newBooking]);
    };

    const sortedBooking = bookings.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const filteredBookings = sortedBooking.filter(customer => {
        const value = filterField.split('.').reduce((o, i) => o[i], customer);
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

    // If total pages is 0, set current page to 0
    if (totalPages === 0 && currentPage !== 0) {
        setCurrentPage(0);
    }
    else if (totalPages !== 0 && currentPage === 0) {
        setCurrentPage(1);
    }

    // Get current Bookings
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = currentPage === 0 ? -1 : indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

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
        <div className="customer-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Danh sách đặt món</h1>
                        <button className="add-customer-button" onClick={() => setIsAddModalOpen(true)}>Thêm Phiếu Đặt</button>
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
                                placeholder="Tìm kiếm khách hàng..."
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
                                    Đang xem {indexOfFirstBooking + 1} - {Math.min(indexOfLastBooking, filteredBookings.length)} trong tổng số {filteredBookings.length} khách hàng
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
                                {currentBookings.map(item => (
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
            {selectedBooking && (
                <DetailModal booking={selectedBooking} onClose={closeModal} onUpdate={handleUpdate} />
            )}
            {isAddModalOpen && (
                <AddModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddBooking} />
            )}
        </div>
    );
}

export default Mgmt_Booking;