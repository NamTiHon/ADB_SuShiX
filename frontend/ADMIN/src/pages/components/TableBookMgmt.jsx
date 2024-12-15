import { React, useState, useEffect, useMemo } from "react";
import AddBookingModal from "../modals/AddBookingModal";
import BookingDetailModal from "../modals/BookingDetailModal";
import Management from "./Management";

const TableBookMgmt = () => {
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

    const title = "Danh sách đặt bàn";

    return (
        <Management
            columns={TABLE_COLUMNS}
            initialData={initdata}
            title={title}
            AddModal={AddBookingModal}
            DetailModal={BookingDetailModal}
        />
    );
};

export default TableBookMgmt;