// src/pages/components/Reservation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/reservation.css';
import { dishes } from './Menu'; // Import dishes array

const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'sushi', name: 'Sushi' },
    { id: 'appetizer', name: 'Khai vị' },
    { id: 'tempura', name: 'Tempura' },
    { id: 'udon', name: 'Udon' },
    { id: 'hotpot', name: 'Lẩu' },
    { id: 'lunch-set', name: 'Lunch Set' },
    { id: 'specialty', name: 'Đặc sản' },
    { id: 'dessert', name: 'Tráng miệng' },
    { id: 'drinks', name: 'Đồ uống' }
];

const Reservation = () => {
   
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    // Filter dishes by category
    const filteredDishes = selectedCategory === 'all' 
        ? dishes 
        : dishes.filter(dish => dish.category === selectedCategory);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        note: '',
        branch: '',
        selectedDishes: [] // Add this
    });

    const timeSlots = [
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
    ];

    const branches = [
        { id: 1, name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, Q1' },
        { id: 2, name: 'Chi nhánh Quận 3', address: '456 Lê Văn Sỹ, Q3' },
        { id: 3, name: 'Chi nhánh Quận 7', address: '789 Nguyễn Thị Thập, Q7' }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDishSelect = (dish) => {
        setFormData(prev => {
            const existingDish = prev.selectedDishes.find(d => d.id === dish.id);
            if (existingDish) {
                return {
                    ...prev,
                    selectedDishes: prev.selectedDishes.map(d =>
                        d.id === dish.id 
                            ? {...d, quantity: d.quantity + 1}
                            : d
                    )
                };
            }
            return {
                ...prev,
                selectedDishes: [...prev.selectedDishes, {...dish, quantity: 1}]
            };
        });
    };

    const handleQuantityChange = (dishId, change) => {
        setFormData(prev => ({
            ...prev,
            selectedDishes: prev.selectedDishes.map(dish => {
                if (dish.id === dishId) {
                    const newQuantity = dish.quantity + change;
                    return newQuantity > 0 
                        ? {...dish, quantity: newQuantity}
                        : null;
                }
                return dish;
            }).filter(Boolean)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate reservation ID
        const reservationId = Math.random().toString(36).substr(2, 9).toUpperCase();
        const reservation = {
            ...formData,
            id: reservationId,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
    
        // Save to localStorage
        const reservations = JSON.parse(localStorage.getItem('reservations') || '{}');
        reservations[reservationId] = reservation;
        localStorage.setItem('reservations', JSON.stringify(reservations));
    
        // Pass reservation data with ID to table selection
        navigate('/table-selection', { 
            state: { reservationData: reservation } // Change this line only
        });
    };

    const totalAmount = formData.selectedDishes.reduce(
        (sum, dish) => sum + (dish.price * dish.quantity), 
        0
    );

    const [showMenuModal, setShowMenuModal] = useState(false);

    return (
        <div>
            <Nav />
            <div className="reservation-container">
                <div className="reservation-content">
                    <h2>Đặt bàn</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Chi nhánh</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Chọn chi nhánh</option>
                                {branches.map(branch => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name} - {branch.address}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Ngày</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Giờ</label>
                                <select
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Chọn giờ</option>
                                    {timeSlots.map(time => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Số người</label>
                            <select
                                name="guests"
                                value={formData.guests}
                                onChange={handleInputChange}
                                required
                            >
                                {[2,3,4,5,6,7,8,9,10].map(num => (
                                    <option key={num} value={num}>
                                        {num} người
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Ghi chú</label>
                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleInputChange}
                                placeholder="Yêu cầu đặc biệt (nếu có)"
                            />
                        </div>

                        <div className="form-group">
                            <label>Đặt món trước (không bắt buộc)</label>
                            <button 
                                type="button" 
                                className="menu-select-btn"
                                onClick={() => setShowMenuModal(true)}
                            >
                                Chọn món
                            </button>
                            
                            {formData.selectedDishes.length > 0 && (
                                <div className="selected-dishes">
                                    <h3>Món đã chọn:</h3>
                                    {formData.selectedDishes.map(dish => (
                                        <div key={dish.id} className="selected-dish-item">
                                            <span>{dish.name}</span>
                                            <div className="quantity-controls">
                                                <button 
                                                    type="button"
                                                    onClick={() => handleQuantityChange(dish.id, -1)}
                                                >-</button>
                                                <span>{dish.quantity}</span>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleQuantityChange(dish.id, 1)}
                                                >+</button>
                                            </div>
                                            <span>{(dish.price * dish.quantity).toLocaleString()}đ</span>
                                        </div>
                                    ))}
                                    <div className="total-amount">
                                        Tổng cộng: {totalAmount.toLocaleString()}đ
                                    </div>
                                </div>
                            )}

                            {showMenuModal && (
                                        <div className="menu-modal">
                                            <div className="menu-modal-content">
                                                <h3>Chọn món</h3>
                                                <div className="category-tabs">
                                                    {categories.map(category => (
                                                        <button
                                                            key={category.id}
                                                            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                                                            onClick={() => setSelectedCategory(category.id)}
                                                        >
                                                            {category.name}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="menu-grid">
                                                    {filteredDishes.map(dish => (
                                                        <div key={dish.id} className="menu-item">
                                                            <img src={dish.image} alt={dish.name} />
                                                            <div className="menu-item-info">
                                                                <h4>{dish.name}</h4>
                                                                <p className="description">{dish.description}</p>
                                                                <p className="price">{dish.price.toLocaleString()}đ</p>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => handleDishSelect(dish)}
                                                                    className="add-dish-btn"
                                                                >
                                                                    Thêm vào đơn
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className="close-modal-btn"
                                                    onClick={() => setShowMenuModal(false)}
                                                >
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    )}
    

                        </div>

                        <button type="submit" className="submit-btn">
                            Xác nhận đặt bàn
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reservation;