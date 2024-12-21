import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import SideBarTemp from './sideBarTemp';
import '../css/components/mgmt-general.css';

function Mgmt_General({ columns, initialData, title, AddModal, DetailModal }) {
    const isUserAuth = localStorage.getItem('userAuth') === 'true';
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

    const handlePageInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlePageInputBlur();
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
                {isUserAuth ? <SideBarTemp /> : <SideBar /> }
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>{title}</h1>
                        <button className="add-button" onClick={() => setIsAddModalOpen(true)}>Thêm</button>
                    </div>
                    <div className="table-box">
                        <div className="search-and-pagination-container">
                            <select className="property-dropdown" value={filterField} onChange={(e) => setFilterField(e.target.value)}>
                                {columns.filter(column => column.visible).map(column => (
                                    <option key={column.id} value={column.id}>
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
                                    onKeyDown={handlePageInputKeyDown}
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
                                {currentItems.flatMap(subArray => subArray).map(item => (
                                    <tr key={item.itemId} onClick={() => handleRowClick(item)}>
                                        {columns.filter(column => column.visible).map(column => (
                                            <td key={`${item.itemId}-${column.id}`}>
                                                {column.id === 'image' ? (
                                                    <img 
                                                        src={item[column.value] || 'default-image-path.jpg'} 
                                                        alt="Product"
                                                        className="table-image"
                                                        onError={(e) => {
                                                            e.target.src = 'default-image-path.jpg';
                                                            e.target.onerror = null;
                                                        }}
                                                    />
                                                ) : (
                                                    item[column.id] === 0 ? 0 : (item[column.id] || '')
                                                )}
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
                    fields = {fields}
                />
            )}
        </div>
    );
}

export default Mgmt_General;