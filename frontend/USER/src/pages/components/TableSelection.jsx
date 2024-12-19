import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/tableSelection.css';

const TableSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { reservationData} = location.state || {};
    const [selectedTable, setSelectedTable] = useState(null);

    const tables = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        seats: (index % 4 + 1) * 2, // 2, 4, 6, 8 seats
        isAvailable: index % 5 !== 0, // Every 5th table is unavailable
        position: ['Vị trí gần cửa sổ', 'Vị trí trung tâm', 'Khu vực riêng tư', 'Khu vực gần quầy bar'][index % 4]
    }));

    const handleTableSelect = (table) => {
        if (table.isAvailable && table.seats >= reservationData.PDM_SoLuongKH) {
            setSelectedTable(table);
        }
    };

    const handleConfirm = async () => {
        if (!selectedTable) return;
    
        try {
            console.log('Sending update request for:', {
                PDM_MaPhieu: reservationData.PDM_MaPhieu,
                PDM_SoBan: selectedTable.id
            });
            // Update reservation with selected table
            const response = await fetch(`http://localhost:3000/api/order/table/${reservationData.PDM_MaPhieu}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    PDM_SoBan: selectedTable.id
                })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to update table reservation');
            }
            const finalReservation = {
                ...reservationData,
                PDM_SoBan: selectedTable.id,
                tablePosition: selectedTable.position
            };

            // Update localStorage
            const reservations = JSON.parse(localStorage.getItem('reservations') || '{}');
            reservations[finalReservation.PDM_MaPhieu] = finalReservation;
            localStorage.setItem('reservations', JSON.stringify(reservations));
    
            // Navigate to success page
            navigate('/reservation-success', {
                state: { reservation: finalReservation }
            });
            console.log('Reservation updated successfully:', finalReservation);
        } catch (error) {
            console.error('Error updating reservation:', error);
            alert('Không thể cập nhật vị trí bàn. Vui lòng thử lại.');
        }
    };

    return (
        <div>
            <Nav />
            <div className="table-selection-container">
                <div className="table-selection-content">
                    <h2>Chọn bàn</h2>
                    <p className="selection-info">
                        Số người: {reservationData?.PDM_SoLuongKH} | 
                        Ngày: {reservationData?.PDM_ThoiGianDen.split(' ')[0]} | 
                        Giờ: {reservationData?.PDM_ThoiGianDen.split(' ')[1]}
                    </p>

                    <div className="floor-plan">
                        <div className="tables-grid">
                            {tables.map(table => (
                                <div
                                    key={table.id}
                                    className={`table ${
                                        table.isAvailable ? 'available' : 'unavailable'
                                    } ${selectedTable?.id === table.id ? 'selected' : ''}
                                    ${table.seats >= reservationData?.PDM_SoLuongKH ? '' : 'too-small'}`}
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