import React, { useState } from 'react';
import '../css-modals/add-booking-modal.css';

// const bookingInput = [
//     { id: 'branchId', header: 'Mã chi nhánh', value: 'branchId' },
//     { id: 'tableNumber', header: 'Bàn số', value: 'tableNumber' },
//     { id: 'numOfCustomers', header: 'Số khách', value: 'numOfCustomers' },
//     { id: 'arrivalDate', header: 'Ngày đến', value: 'arrivalDate' },
//     { id: 'arrivalTime', header: 'Thời gian đến', value: 'arrivalTime' },
//     { id: 'comment', header: 'Ghi chú', value: 'comment' },
// ]

const AddBookingModal = ({ onClose, onAdd }) => {
    const [newBooking, setNewBooking] = useState({
        phone: '0123456789',
        branchId: '123Levanviet',
        tableNumber: '1',
        numOfCustomers: '1',
        arrivalDate: '2021-08-01',
        arrivalTime: '10:00',
        comment: 'example',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(newBooking);
        alert('Thêm phiếu đặt thành công');
        onClose();
    };

    const generateBookingId = () => {
        return 'BOOK' + Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="">
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>THÊM PHIẾU ĐẶT</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN CÁ NHÂN</h3>
                            <p><strong>Số điện thoại đặt:</strong> <input type="text" name="name" value={newBooking.phone} onChange={handleChange} required /></p>
                            <p><strong>Mã chi nhánh:</strong> <input type="text" name="branchId" value={newBooking.branchId} onChange={handleChange} required /></p>
                            <p><strong>Bàn số:</strong> <input type="text" name="tableNumber" value={newBooking.tableNumber} onChange={handleChange} required /></p>
                            <p><strong>Số khách:</strong> <input type="text" name="numOfCustomers" value={newBooking.numOfCustomers} onChange={handleChange} required /></p>
                            <p><strong>Ngày đến:</strong> <input type="date" name="arrivalDate" value={newBooking.arrivalDate} onChange={handleChange} required /></p>
                            <p><strong>Thời gian đến:</strong> <input type="time" name="arrivalTime" value={newBooking.arrivalTime} onChange={handleChange} required /></p>
                            <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={newBooking.comment} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBookingModal;