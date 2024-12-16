import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import Mgmt_General from './Mgmt_General';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_Booking";
import Detail_Booking from "../modals/Detail_Booking";

const columns = [
    { id: 'bookingId', header: 'Mã phiếu đặt', value: 'bookingId' },
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

const bookings = [
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
];

function Mgmt_Booking() {
    return (
        <Mgmt_General
            columns={columns}
            initialData={bookings}
            AddModal={AddModal}
            DetailModal={Detail_Booking} />
    );
}

export default Mgmt_Booking;