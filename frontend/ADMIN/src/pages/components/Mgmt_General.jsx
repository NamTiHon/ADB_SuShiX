import { React, useState, useEffect, useMemo } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/components/mgmt-general.css';

function Mgmt_General({ columns, initialData, title, AddModal, DetailModal }) {
    const [items, setItems] = useState(initialData);

    useEffect(() => {
        setItems(initialData);
        console.log("Initial data set:", initialData);
    }, [initialData]);

    const handleAddItem = (newItem) => {
        setItems(prevItems => {
            const updatedItems = [...prevItems, newItem];
            console.log("Updated items after adding:", updatedItems);
            return updatedItems;
        });
    };

    const handleDelete = (bookingId) => {
        setItems(prevItems => prevItems.filter(item => item.bookingId !== bookingId));
    };

    const [filterField, setFilterField] = useState(columns[0].id);

    const [searchQuery, setSearchQuery] = useState('');

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

    const handleUpdate = (item) => {
        // Implement the update logic here
        console.log('Update item:', item);
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
                        <h1>{title}</h1>
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
                                    <tr key={item} onClick={() => handleRowClick(item)}>
                                        {columns.map(column => (
                                            <td key={`${item}-${column.id}`}>
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
                <DetailModal customer={selectedItem} onClose={closeModal} onUpdate={handleUpdate} onDelete={handleDelete} />
            )}
            {isAddModalOpen && (
                <AddModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddItem} />
            )}
        </div>
    );
}

export default Mgmt_General;