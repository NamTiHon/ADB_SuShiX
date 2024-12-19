import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_OnlineOrder";
import DetailModal from "../modals/Detail_OnlineOrder";

function Mgmt_OnlineOrder() {
    const columns = [
        { id: 'orderId', header: 'Mã đơn hàng', value: 'orderId' },
        { id: 'name', header: 'Tên khách hàng', value: 'name' },
        { id: 'phone', header: 'Số điện thoại', value: 'phone' },
        { id: 'orderDate', header: 'Ngày đặt hàng', value: 'orderDate' },
        { id: 'orderTime', header: 'Giờ đặt hàng', value: 'orderTime' },
        { id: 'destination', header: 'Điểm đến', value: 'destination' },
        { id: 'comment', header: 'Ghi chú', value: 'comment' },
    ];

    const [orders, setOrders] = useState([
        { orderId: '1', name: 'John Doe', phone: '123456789', orderDate: '2023-10-01', orderTime: '18:00', destination: 'B001', comment: 'Birthday party', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 2 }, { dishId: 'D002', dishName: 'Tempura', quantity: 1 }] },
        { orderId: '2', name: 'Jane Smith', phone: '987654321', orderDate: '2023-10-02', orderTime: '19:00', destination: 'B002', comment: 'Anniversary', preOrderedDishes: [{ dishId: 'D003', dishName: 'Ramen', quantity: 1 }, { dishId: 'D004', dishName: 'Gyoza', quantity: 1 }] },
        { orderId: '3', name: 'Alice Johnson', phone: '555555555', orderDate: '2023-10-03', orderTime: '20:00', destination: 'B003', comment: 'Business meeting', preOrderedDishes: [{ dishId: 'D005', dishName: 'Sashimi', quantity: 3 }, { dishId: 'D006', dishName: 'Miso Soup', quantity: 2 }] },
        { orderId: '4', name: 'Bob Brown', phone: '444444444', orderDate: '2023-10-04', orderTime: '17:00', destination: 'B004', comment: 'Family dinner', preOrderedDishes: [{ dishId: 'D007', dishName: 'Udon', quantity: 2 }, { dishId: 'D008', dishName: 'Katsu', quantity: 3 }] },
        { orderId: '5', name: 'Charlie Davis', phone: '333333333', orderDate: '2023-10-05', orderTime: '18:30', destination: 'B005', comment: 'Friends gathering', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 4 }, { dishId: 'D002', dishName: 'Tempura', quantity: 2 }, { dishId: 'D003', dishName: 'Ramen', quantity: 3 }] },
        { orderId: '6', name: 'Diana Evans', phone: '222222222', orderDate: '2023-10-06', orderTime: '19:30', destination: 'B006', comment: 'Solo dining', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 1 }] },
        { orderId: '7', name: 'Evan Foster', phone: '111111111', orderDate: '2023-10-07', orderTime: '20:30', destination: 'B007', comment: 'Date night', preOrderedDishes: [{ dishId: 'D002', dishName: 'Tempura', quantity: 2 }, { dishId: 'D005', dishName: 'Sashimi', quantity: 1 }] },
        { orderId: '8', name: 'Fiona Green', phone: '666666666', orderDate: '2023-10-08', orderTime: '21:00', destination: 'B008', comment: 'Team outing', preOrderedDishes: [{ dishId: 'D003', dishName: 'Ramen', quantity: 3 }, { dishId: 'D004', dishName: 'Gyoza', quantity: 2 }, { dishId: 'D001', dishName: 'Sushi', quantity: 4 }] },
        { orderId: '9', name: 'George Harris', phone: '777777777', orderDate: '2023-10-09', orderTime: '18:45', destination: 'B009', comment: 'Casual dinner', preOrderedDishes: [{ dishId: 'D007', dishName: 'Udon', quantity: 2 }, { dishId: 'D008', dishName: 'Katsu', quantity: 2 }, { dishId: 'D006', dishName: 'Miso Soup', quantity: 1 }] },
        { orderId: '10', name: 'Hannah White', phone: '888888888', orderDate: '2023-10-10', orderTime: '19:15', destination: 'B010', comment: 'Quick bite', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 2 }, { dishId: 'D002', dishName: 'Tempura', quantity: 1 }] }
    ]);

    useEffect(() => {
        console.log('Current orders:', orders);
    }, [orders]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [filterField, setFilterField] = useState(columns[0].id);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

    const [pageInput, setPageInput] = useState(1);

    const ordersPerPage = 10;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRowClick = (booking) => {
        setSelectedOrder(booking);
    };

    const closeModal = () => {
        setSelectedOrder(null);
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
        setOrders([...orders, newBooking]);
    };

    const sortedOrders = orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    const filteredOrders = sortedOrders.filter(customer => {
        const value = filterField.split('.').reduce((o, i) => o[i], customer);
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // If total pages is 0, set current page to 0
    if (totalPages === 0 && currentPage !== 0) {
        setCurrentPage(0);
    }
    else if (totalPages !== 0 && currentPage === 0) {
        setCurrentPage(1);
    }

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = currentPage === 0 ? -1 : indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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
        <div className="mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Danh sách đặt online</h1>
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
                                placeholder="Tìm kiếm phiếu đặt online..."
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
                                    Đang xem {indexOfFirstOrder + 1} - {Math.min(indexOfLastOrder, filteredOrders.length)} trong tổng số {filteredOrders.length} phiếu đặt online
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
                                {currentOrders.map(item => (
                                    <tr key={item.orderId} onClick={() => handleRowClick(item)}>
                                        {columns.map(column => (
                                            <td key={`${item.orderId}-${column.id}`}>
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
            {selectedOrder && (
                <DetailModal booking={selectedOrder} onClose={closeModal} onUpdate={handleUpdate} />
            )}
            {isAddModalOpen && (
                <AddModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddBooking} />
            )}
        </div>
    );
}

export default Mgmt_OnlineOrder;