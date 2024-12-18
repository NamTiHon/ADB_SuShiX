import React, { useState } from 'react';
import '../css/css-modals/add-booking.css';

const Add_Dish = ({ onClose, onAdd }) => {
    const [newDish, setNewDish] = useState({
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
        setNewDish((prevDish) => ({
            ...prevDish,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dishWithInfo = {
            ...newDish,
            dishId: generateDishId(),
            createdDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
        };
        onAdd(dishWithInfo);
        alert('Thêm món ăn thành công');
        onClose();
    };

    const generateDishId = () => {
        return 'DISH' + Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="">
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>THÊM MÓN ĂN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN CÁ NHÂN</h3>
                            <p><strong>Số điện thoại:</strong> <input type="text" name="phone" value={newDish.phone} onChange={handleChange} required /></p>
                            <p><strong>Mã chi nhánh:</strong> <input type="text" name="branchId" value={newDish.branchId} onChange={handleChange} required /></p>
                            <p><strong>Bàn số:</strong> <input type="text" name="tableNumber" value={newDish.tableNumber} onChange={handleChange} required /></p>
                            <p><strong>Số khách:</strong> <input type="text" name="numOfCustomers" value={newDish.numOfCustomers} onChange={handleChange} required /></p>
                            <p><strong>Ngày đến:</strong> <input type="date" name="arrivalDate" value={newDish.arrivalDate} onChange={handleChange} required /></p>
                            <p><strong>Giờ đến:</strong> <input type="time" name="arrivalTime" value={newDish.arrivalTime} onChange={handleChange} required /></p>
                            <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={newDish.comment} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Dish;