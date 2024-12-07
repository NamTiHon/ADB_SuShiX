import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';

import '../css/management.css';

function Management({ title, data, columns, onAdd, onUpdate, DetailModal, AddModal }) {
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleAddItem = (newItem) => {
        setItems([...customers, newItem]);
        onAdd(newItem);
    };




    const sortedItems = data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const filteredCustomers = sortedCustomers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.cccd.includes(searchQuery) ||
            customer.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.createdDate.includes(searchQuery) ||
            customer.membershipType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.status.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    // If total pages is 0, set current page to 0
    if (totalPages === 0 && currentPage !== 0) {
        setCurrentPage(0);
    }
    else if (totalPages !== 0 && currentPage === 0) {
        setCurrentPage(1);
    }

    // Get current customers
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = currentPage === 0 ? -1 : indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);


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
        <div className="">

        </div>
    );
}

export default Management;