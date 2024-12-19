import React, { useState } from 'react';
import '../css/css-modals/add-booking.css';

const Add_Dish = ({ onClose, onAdd }) => {
    const [newDish, setNewDish] = useState({
        dishName: 'asw',
        currentPrice: '123',
        portion: '1',
        available: false,
        hasDelivery: false,
        categoryId: '0122',
        image: 'asw.jpg'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = e.target.type === 'checkbox' ? e.target.checked : value;
        setNewDish((prevDish) => ({
            ...prevDish,
            [name]: newValue,
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
                            <h3>THÔNG TIN MÓN ĂN</h3>
                            <p><strong>Tên món ăn:</strong> <input type="text" name="dishName" value={newDish.dishName} onChange={handleChange} required /></p>
                            <p><strong>Giá hiện tại:</strong> <input type="text" name="currentPrice" value={newDish.currentPrice} onChange={handleChange} required /></p>
                            <p><strong>Phần ăn:</strong> <input type="text" name="portion" value={newDish.portion} onChange={handleChange} required /></p>
                            <p><strong>Có sẵn:</strong> <input type="checkbox" name="available" checked={newDish.available} onChange={handleChange} /></p>
                            <p><strong>Có giao hàng:</strong> <input type="checkbox" name="hasDelivery" checked={newDish.hasDelivery} onChange={handleChange} /></p>
                            <p><strong>Mã danh mục:</strong> <input type="text" name="categoryId" value={newDish.categoryId} onChange={handleChange} required /></p>
                            <p><strong>Hình ảnh:</strong> <input type="text" name="image" value={newDish.image} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Dish;