import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_OnlineOrder = ({ booking, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedOrder, setUpdatedOrder] = useState({ ...booking });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!booking) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const columns = [
        { id: 'orderId', header: 'Mã phiếu', value: 'orderId' },
        { id: 'phone', header: 'Số điện thoại', value: 'phone' },
        { id: 'tableNumber', header: 'Số bàn', value: 'tableNumber' },
        { id: 'customerCount', header: 'Số khách', value: 'customerCount' },
        { id: 'orderDate', header: 'Thời gian đặt', value: 'orderDate' },
        { id: 'arrivalTime', header: 'Thời gian đến', value: 'arrivalTime' },
        { id: 'status', header: 'Trạng thái', value: 'status' },
        { id: 'branch', header: 'Chi nhánh', value: 'branch' },
        { id: 'comment', header: 'Ghi chú', value: 'comment' }
    ];

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            await onUpdate(updatedOrder);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy phiếu đặt này?");
        if (confirmDelete) {
            try {
                setLoading(true);
                setError(null);
                await onDelete(booking.orderId);
                onClose();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT PHIẾU ĐẶT</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="modal-sections">
                    <div className="modal-section">
                        {isEditing ? (
                            <>
                                {columns.map((column) => (
                                    <p key={column.id}>
                                        <strong>{column.header}:</strong>
                                        <input
                                            type="text"
                                            name={column.value}
                                            value={updatedOrder[column.value] || ''}
                                            onChange={handleChange}
                                            disabled={loading || column.value === 'orderId'}
                                        />
                                    </p>
                                ))}
                                <button 
                                    className="save-button" 
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang lưu...' : 'Lưu'}
                                </button>
                            </>
                        ) : (
                            <>
                                {columns.map((column) => (
                                    <p key={column.id}>
                                        <strong>{column.header}:</strong> {booking[column.value]}
                                    </p>
                                ))}
                                <div>
                                    <strong>CÁC MÓN ĐƯỢC ĐẶT:</strong>
                                    <table className="work-history-table">
                                        <thead>
                                            <tr>
                                                <th>Mã món</th>
                                                <th>Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {booking.dishes?.map((dish, index) => (
                                                <tr key={index}>
                                                    <td>{dish.dishId}</td>
                                                    <td>{dish.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="buttons">
                                    <button 
                                        className="update-button" 
                                        onClick={() => setIsEditing(true)}
                                        disabled={loading}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button 
                                        className="cancel-button" 
                                        onClick={handleDeleteClick}
                                        disabled={loading}
                                    >
                                        Hủy phiếu đặt
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_OnlineOrder;