import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';

import '../css/management.css';

function TableBookMgmt() {
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedProperty, setSelectedProperty] = useState('bookingId');

    const [currentPage, setCurrentPage] = useState(1);

    const [pageInput, setPageInput] = useState(1);

    const [selectedItem, setSelectedItem] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const itemsPerPage = 10;

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
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

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    const [items, setItems] = useState([]);

    const sortedItems = items.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const filteredItems = sortedItems.filter(item => {
        const value = selectedProperty.split('.').reduce((o, i) => o[i], item);
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
        <div className="table-book-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Danh sách đặt bàn</h1>
                </div>
            </div>
        </div>
    );
}

export default TableBookMgmt;