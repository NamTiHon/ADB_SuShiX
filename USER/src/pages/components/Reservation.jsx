// src/pages/components/Reservation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/reservation.css';

const Reservation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        note: '',
        branch: ''
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