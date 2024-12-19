import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_Booking";
import DetailModal from "../modals/Detail_Booking";

const columns = [
    { id: 'bookingId', header: 'Mã phiếu đặt', value: 'bookingId', editable: false, visible: true },
    { id: 'phone', header: 'Số điện thoại', value: 'phone', editable: false, visible: true },
    { id: 'createdDate', header: 'Ngày tạo', value: 'createdDate', editable: false, visible: true },
    { id: 'branchId', header: 'Chi nhánh', value: 'branchId', editable: true, visible: true },
    { id: 'tableNumber', header: 'Số bàn', value: 'tableNumber', editable: true, visible: true },
    { id: 'numOfCustomers', header: 'Số khách', value: 'numOfCustomers', editable: true, visible: true },
    { id: 'arrivalDate', header: 'Ngày đến', value: 'arrivalDate', editable: true, visible: true },
    { id: 'arrivalTime', header: 'Giờ đến', value: 'arrivalTime', editable: true, visible: true },
    { id: 'comment', header: 'Ghi chú', value: 'comment', editable: true, visible: true },
    // { id: 'preOrderedDishes', header: 'Món đã đặt', value: 'preOrderedDishes', editable: false, visible: false },
    // { id: 'dishId', header: 'Mã món', value: 'dishId', editable: false, visible: false },
    // { id: 'dishName', header: 'Tên món', value: 'dishName', editable: false, visible: false },
    // { id: 'quantity', header: 'Số lượng', value: 'quantity', editable: false, visible: false }
];

const bookings = [
    { bookingId: '1', phone: '0912345678', createdDate: '2023-10-01', branchId: 'B001', tableNumber: 2, numOfCustomers: 4, arrivalDate: '2023-10-01', arrivalTime: '18:00', comment: 'Birthday party', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 2 }, { dishId: 'D002', dishName: 'Tempura', quantity: 1 }] },
    { bookingId: '2', phone: '0923456789', createdDate: '2023-10-02', branchId: 'B002', tableNumber: 1, numOfCustomers: 2, arrivalDate: '2023-10-02', arrivalTime: '19:00', comment: 'Anniversary', preOrderedDishes: [{ dishId: 'D003', dishName: 'Ramen', quantity: 1 }, { dishId: 'D004', dishName: 'Gyoza', quantity: 1 }] },
    { bookingId: '3', phone: '0934567890', createdDate: '2023-10-03', branchId: 'B003', tableNumber: 3, numOfCustomers: 6, arrivalDate: '2023-10-03', arrivalTime: '20:00', comment: 'Business meeting', preOrderedDishes: [{ dishId: 'D005', dishName: 'Sashimi', quantity: 3 }, { dishId: 'D006', dishName: 'Miso Soup', quantity: 2 }] },
    { bookingId: '4', phone: '0945678901', createdDate: '2023-10-04', branchId: 'B004', tableNumber: 2, numOfCustomers: 5, arrivalDate: '2023-10-04', arrivalTime: '17:00', comment: 'Family dinner', preOrderedDishes: [{ dishId: 'D007', dishName: 'Udon', quantity: 2 }, { dishId: 'D008', dishName: 'Katsu', quantity: 3 }] },
    { bookingId: '5', phone: '0956789012', createdDate: '2023-10-05', branchId: 'B005', tableNumber: 4, numOfCustomers: 8, arrivalDate: '2023-10-05', arrivalTime: '18:30', comment: 'Friends gathering', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 4 }, { dishId: 'D002', dishName: 'Tempura', quantity: 2 }, { dishId: 'D003', dishName: 'Ramen', quantity: 3 }] },
    { bookingId: '6', phone: '0967890123', createdDate: '2023-10-06', branchId: 'B006', tableNumber: 1, numOfCustomers: 1, arrivalDate: '2023-10-06', arrivalTime: '19:30', comment: 'Solo dining', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 1 }] },
    { bookingId: '7', phone: '0978901234', createdDate: '2023-10-07', branchId: 'B007', tableNumber: 2, numOfCustomers: 3, arrivalDate: '2023-10-07', arrivalTime: '20:30', comment: 'Date night', preOrderedDishes: [{ dishId: 'D002', dishName: 'Tempura', quantity: 2 }, { dishId: 'D005', dishName: 'Sashimi', quantity: 1 }] },
    { bookingId: '8', phone: '0989012345', createdDate: '2023-10-08', branchId: 'B008', tableNumber: 3, numOfCustomers: 7, arrivalDate: '2023-10-08', arrivalTime: '21:00', comment: 'Team outing', preOrderedDishes: [{ dishId: 'D003', dishName: 'Ramen', quantity: 3 }, { dishId: 'D004', dishName: 'Gyoza', quantity: 2 }, { dishId: 'D001', dishName: 'Sushi', quantity: 4 }] },
    { bookingId: '9', phone: '0990123456', createdDate: '2023-10-09', branchId: 'B009', tableNumber: 2, numOfCustomers: 4, arrivalDate: '2023-10-09', arrivalTime: '18:45', comment: 'Casual dinner', preOrderedDishes: [{ dishId: 'D007', dishName: 'Udon', quantity: 2 }, { dishId: 'D008', dishName: 'Katsu', quantity: 2 }, { dishId: 'D006', dishName: 'Miso Soup', quantity: 1 }] },
    { bookingId: '10', phone: '0901234567', createdDate: '2023-10-10', branchId: 'B010', tableNumber: 1, numOfCustomers: 2, arrivalDate: '2023-10-10', arrivalTime: '19:15', comment: 'Quick bite', preOrderedDishes: [{ dishId: 'D001', dishName: 'Sushi', quantity: 2 }, { dishId: 'D002', dishName: 'Tempura', quantity: 1 }] }
];

const initialData = bookings.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

function Mgmt_Booking() {
    const [items, setItems] = useState(initialData);

    useEffect(() => {
        setItems(initialData);
    }, [initialData]);

    useEffect(() => {
        console.log('Current items:', items);
    }, [items]);

    const fields = columns.map(column => ({
        label: column.header,
        name: column.value,
        editable: column.editable
    }));

    const [selectedItem, setSelectedItem] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [filterField, setFilterField] = useState(columns[0].id);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageInput(currentPage);
    }, [currentPage]);

    const [pageInput, setPageInput] = useState(1);

    const itemsPerPage = 10;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const handleUpdate = (item) => {
        // Implement the update logic here
        console.log('Update item:', item);
    };

    const handleDeleteItem = (itemToDelete) => {
        setItems(items.filter(item => item !== itemToDelete));
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

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    const sortedItems = items.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const filteredItems = (sortedItems || []).filter(item => {
        const value = filterField.split('.').reduce((o, i) => o[i], item);
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

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
        <div className="mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Quản lý đặt món</h1>
                        <button className="add-button" onClick={() => setIsAddModalOpen(true)}>Thêm</button>
                    </div>
                    <div className="table-box">
                        <div className="search-and-pagination-container">
                            <select className="property-dropdown" value={filterField} onChange={(e) => setFilterField(e.target.value)}>
                                {columns.filter(column => column.visible).map(column => (
                                    <option key={column.id} value={column.value}>
                                        {column.header}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
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
                                    Đang xem {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredItems.length)} trong tổng số {filteredItems.length}
                                </span>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    {columns.filter(column => column.visible).map(column => (
                                        <th key={column.id}>{column.header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(item => (
                                    <tr key={item.itemId} onClick={() => handleRowClick(item)}>
                                        {columns.filter(column => column.visible).map(column => (
                                            <td key={`${item.itemId}-${column.id}`}>
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
            {selectedItem && (
                <DetailModal
                    item={selectedItem}
                    onClose={closeModal}
                    onUpdate={handleUpdate}
                    onDelete={handleDeleteItem}
                    fields={fields}
                />
            )}
            {isAddModalOpen && (
                <AddModal
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddItem}
                    fields={fields}
                />
            )}
        </div>
    );
}

export default Mgmt_Booking;