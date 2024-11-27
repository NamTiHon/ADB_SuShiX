// src/pages/components/TableSelection.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/tableSelection.css';

const TableSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { reservationData } = location.state || {};
    const [selectedTable, setSelectedTable] = useState(null);

    const tables = [
        { id: 1, seats: 2, isAvailable: true, position: 'window' },
        { id: 2, seats: 4, isAvailable: true, position: 'window' },
        { id: 3, seats: 6, isAvailable: true, position: 'center' },
        { id: 4, seats: 4, isAvailable: false, position: 'center' },
        { id: 5, seats: 8, isAvailable: true, position: 'private' },
        { id: 6, seats: 2, isAvailable: true, position: 'bar' },
    ];

    const handleTableSelect = (table) => {
        if (table.isAvailable && table.seats >= reservationData.guests) {
            setSelectedTable(table);
        }
    };

    const handleConfirm = () => {
        if (!selectedTable) return;

        const finalReservation = {
            ...reservationData,
            tableId: selectedTable.id,
            tablePosition: selectedTable.position
        };

        navigate('/reservation-success', { 
            state: { reservation: finalReservation }
        });
    };

    return (
        <div>
            <Nav />
            <div className="table-selection-container">
                <div className="table-selection-content">
                    <h2>Chọn bàn</h2>
                    <p className="selection-info">
                        Số người: {reservationData?.guests} | 
                        Ngày: {reservationData?.date} | 
                        Giờ: {reservationData?.time}
                    </p>

                    <div className="floor-plan">
                        <div className="tables-grid">
                            {tables.map(table => (
                                <div
                                    key={table.id}
                                    className={`table ${
                                        table.isAvailable ? 'available' : 'unavailable'
                                    } ${selectedTable?.id === table.id ? 'selected' : ''}
                                    ${table.seats >= reservationData?.guests ? '' : 'too-small'}`}
                                    onClick={() => handleTableSelect(table)}
                                >
                                    <div className="table-content">
                                        <span className="table-number">Bàn {table.id}</span>
                                        <span className="table-seats">{table.seats} chỗ</span>
                                        <span className="table-position">{table.position}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="legend">
                            <div className="legend-item">
                                <span className="legend-color available"></span>
                                <span>Còn trống</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color unavailable"></span>
                                <span>Đã đặt</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color selected"></span>
                                <span>Đang chọn</span>
                            </div>
                        </div>
                    </div>

                    <div className="selection-actions">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="back-btn"
                        >
                            Quay lại
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="confirm-btn"
                            disabled={!selectedTable}
                        >
                            Xác nhận đặt bàn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableSelection;