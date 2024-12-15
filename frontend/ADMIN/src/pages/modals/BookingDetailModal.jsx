import React, { useState } from 'react';
import '../css-modals/booking-detail-modal.css';

const BookingDetailModal = ({ booking, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBooking, setUpdatedBooking] = useState({ ...booking });

    if (!booking) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy phiếu đặt này?");
        if (confirmDelete) {
            onDelete(booking.bookingId);
            onClose();
        }
    };

    const handleSave = () => {
        onUpdate(updatedBooking);
        setIsEditing(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT PHIẾU ĐẶT</h2>
                <div className="modal-sections">
                    <div className="modal-section">
                        {isEditing ? (
                            <>
                                <p><strong>Mã phiếu đặt:</strong> <input type="text" name="bookingId" value={updatedBooking.bookingId} onChange={handleChange} /></p>
                                <p><strong>Mã chi nhánh:</strong> <input type="text" name="bookingId" value={updatedBooking.branchId} onChange={handleChange} /></p>
                                <p><strong>Ngày tạo:</strong> <input type="text" name="createdDate" value={updatedBooking.createdDate} onChange={handleChange} /></p>
                                <p><strong>Giờ tạo:</strong> <input type="text" name="createdTime" value={updatedBooking.createdTime} onChange={handleChange} /></p>
                                <p><strong>Số bàn:</strong> <input type="text" name="tableNumber" value={updatedBooking.tableNumber} onChange={handleChange} /></p>
                                <p><strong>Số khách:</strong> <input type="text" name="numOfCustomers" value={updatedBooking.numOfCustomers} onChange={handleChange} /></p>
                                <p><strong>Ngày đến:</strong> <input type="text" name="arrivalDate" value={updatedBooking.arrivalDate} onChange={handleChange} /></p>
                                <p><strong>Giờ đến:</strong> <input type="text" name="arrivalTime" value={updatedBooking.arrivalTime} onChange={handleChange} /></p>
                                <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={updatedBooking.comment} onChange={handleChange} /></p>
                                <p><strong>Tình trạng:</strong> <input type="text" name="status" value={updatedBooking.status} onChange={handleChange} /></p>
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Mã phiếu đặt:</strong> {booking.bookingId}</p>
                                <p><strong>Mã chi nhánh:</strong> {booking.branchId}</p>
                                <p><strong>Ngày tạo:</strong> {booking.createdDate}</p>
                                <p><strong>Giờ tạo:</strong> {booking.createdTime}</p>
                                <p><strong>Số bàn:</strong> {booking.tableNumber}</p>
                                <p><strong>Số khách:</strong> {booking.numOfCustomers}</p>
                                <p><strong>Ngày đến:</strong> {booking.arrivalDate}</p>
                                <p><strong>Giờ đến:</strong> {booking.arrivalTime}</p>
                                <p><strong>Ghi chú:</strong> {booking.comment}</p>
                                <p><strong>Tình trạng:</strong> {booking.status}</p>
                                <div className="buttons">
                                    <button className="update-button" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                                    <button className="cancel-button" onClick={() => { setIsEditing(false); handleDeleteClick(); }}>Hủy phiếu đặt</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailModal;