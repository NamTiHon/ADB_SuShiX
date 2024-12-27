import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_OnlineOrder";
import DetailModal from "../modals/Detail_OnlineOrder";

function Mgmt_OnlineOrder() {
    const calculateDeliveryTime = (orderDate) => {
        try {
            // Parse Vietnamese date format "HH:mm:ss DD/MM/YYYY"
            const [time, date] = orderDate.split(' ');
            const [hours, minutes, seconds] = time.split(':');
            const [day, month, year] = date.split('/');
            
            // Create date object with correct format
            const parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
    
            // Validate date
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Invalid date');
            }
    
            // Add 45 minutes
            parsedDate.setMinutes(parsedDate.getMinutes() + 45);
    
            // Format output
            return parsedDate.toLocaleString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
    
        } catch (error) {
            console.error('Error in calculateDeliveryTime:', error, 'Input:', orderDate);
            return 'Invalid date';
        }
    };
    const columns = [
        { id: 'orderId', header: 'Mã phiếu', value: 'orderId' },
        { id: 'phone', header: 'Số điện thoại', value: 'phone' },
        { id: 'tableNumber', header: 'Số bàn', value: 'tableNumber' },
        { id: 'customerCount', header: 'Số khách', value: 'customerCount' },
        { id: 'orderDate', header: 'Thời gian đặt', value: 'orderDate' },
        { 
            id: 'time', 
            header: 'Thời gian', 
            value: 'arrivalTime',
            render: (item) => {
                return item.tableNumber ? 
                    item.arrivalTime : 
                    calculateDeliveryTime(item.orderDate);
            }
        },
        { id: 'status', header: 'Trạng thái', value: 'status' },
        { id: 'branch', header: 'Chi nhánh', value: 'branch' }
    ];
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/order');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            
            // Group orders by PDM_MaPhieu
            const groupedOrders = data.reduce((acc, order) => {
                if (!acc[order.PDM_MaPhieu]) {
                    acc[order.PDM_MaPhieu] = {
                        orderId: order.PDM_MaPhieu,
                        phone: order.PDM_SDT_KH,
                        tableNumber: order.PDM_SoBan,
                        customerCount: order.PDM_SoLuongKH,
                        orderDate: new Date(order.PDM_ThoiGianDat).toLocaleString(),
                        arrivalTime: new Date(order.PDM_ThoiGianDen).toLocaleString(),
                        status: order.PDM_TrangThai,
                        branch: order.PDM_MaChiNhanh,
                        comment: order.PDM_GhiChuThem,
                        staff: order.PDM_MaNhanVien,
                        dishes: []
                    };
                }
                
                if (order.MDD_MaMon) {
                    acc[order.PDM_MaPhieu].dishes.push({
                        dishId: order.MDD_MaMon,
                        quantity: order.MDD_SoLuong
                    });
                }
                
                return acc;
            }, {});
    
            // Convert to array of unique orders
            const uniqueOrders = Object.values(groupedOrders);
            setOrders(uniqueOrders);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);
    

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
        // Convert both strings to lowercase for comparison
        const searchLower = searchQuery.toLowerCase();
        const valueLower = value?.toString().toLowerCase() || '';
        return valueLower.includes(searchLower);
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
                    <div className="header-actions">
                        <button className="refresh-button" onClick={fetchOrders}>
                            <i className="fas fa-sync"></i>
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                
                {loading ? (
                    <div className="loading">Đang tải dữ liệu...</div>
                ) : (
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
                                                {column.render ? column.render(item) : item[column.value]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     )}
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