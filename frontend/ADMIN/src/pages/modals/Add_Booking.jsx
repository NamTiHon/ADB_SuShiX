import React, { useState } from 'react';
import '../css/css-modals/add-booking.css';

const Add_Booking = ({ onClose, onAdd }) => {
    const [preOrderedDishes, setPreOrderedDishes] = useState([]);
    const [currentDish, setCurrentDish] = useState({ dishName: '', quantity: 0 });

    // Add handleAddDish function
    const handleAddDish = () => {
        if (currentDish.dishName && currentDish.quantity > 0) {
            setPreOrderedDishes([...preOrderedDishes, { ...currentDish }]);
            setCurrentDish({ dishName: '', quantity: 0 });
        }
    };

    // Add handleDishChange function
    const handleDishChange = (e) => {
        setCurrentDish({
            ...currentDish,
            [e.target.name]: e.target.value
        });
    };

    const [newBooking, setNewBooking] = useState({
        phone: '0123456789',
        branchId: '123Levanviet',
        tableNumber: '1',
        numOfCustomers: '1',
        arrivalDate: '2021-08-01',
        arrivalTime: '10:00',
        comment: 'example',
        preOrderedDishes: [],
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
        const bookingWithInfo = {
            ...newBooking,
            bookingId: generateBookingId(),
            createdDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            preOrderedDishes: preOrderedDishes,
        };
        onAdd(bookingWithInfo);
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
                            <p><strong>Số điện thoại:</strong> <input type="text" name="phone" value={newBooking.phone} onChange={handleChange} required /></p>
                            <p><strong>Mã chi nhánh:</strong> <input type="text" name="branchId" value={newBooking.branchId} onChange={handleChange} required /></p>
                            <p><strong>Bàn số:</strong> <input type="text" name="tableNumber" value={newBooking.tableNumber} onChange={handleChange} required /></p>
                            <p><strong>Số khách:</strong> <input type="text" name="numOfCustomers" value={newBooking.numOfCustomers} onChange={handleChange} required /></p>
                            <p><strong>Ngày đến:</strong> <input type="date" name="arrivalDate" value={newBooking.arrivalDate} onChange={handleChange} required /></p>
                            <p><strong>Giờ đến:</strong> <input type="time" name="arrivalTime" value={newBooking.arrivalTime} onChange={handleChange} required /></p>
                            <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={newBooking.comment} onChange={handleChange} required /></p>
                            <h3>MÓN ĐẶT TRỰC TIẾP</h3>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        name="dishName"
                                        placeholder="Tên món"
                                        value={currentDish.dishName}
                                        onChange={handleDishChange}
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Số lượng"
                                        value={currentDish.quantity}
                                        onChange={handleDishChange}
                                        min="0"
                                    />
                                    <button type="button" className='add-button' onClick={handleAddDish}>Thêm món</button>
                                </div>

                                {preOrderedDishes.length !== 0 && (
                                    <table className="work-history-table">
                                        <thead>
                                            <tr>
                                                <th>Tên món</th>
                                                <th>Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preOrderedDishes
                                                .map((dish, index) => (
                                                    <tr key={index}>
                                                        {/* <td>{dish.dishId}</td> */}
                                                        <td>{dish.dishName}</td>
                                                        <td>{dish.quantity}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Booking;