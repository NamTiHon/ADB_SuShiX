import React, { useState } from 'react';
import '../css/css-modals/detail-online-order.css';

const Detail_OnlineOrder = ({ booking, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedOrder, setUpdatedOrder] = useState({ ...booking });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const ORDER_STATUSES = {
        TABLE: {
            PENDING: 'Chờ xác nhận',
            CONFIRMED: 'Đã xác nhận', 
            WAITING: 'Chờ đến',
            COMPLETED: 'Đã hoàn thành',
            CANCELLED: 'Đã hủy'
        },
        DELIVERY: {
            PENDING: 'Chờ xác nhận',
            CONFIRMED: 'Đã xác nhận',
            DELIVERING: 'Đang giao',
            COMPLETED: 'Đã hoàn thành',
            CANCELLED: 'Đã hủy'
        }
    };
    const StatusSelect = ({ currentStatus, isTableOrder, onStatusChange, loading }) => {
        const statuses = isTableOrder ? [
            ORDER_STATUSES.TABLE.PENDING,
            ORDER_STATUSES.TABLE.CONFIRMED,
            ORDER_STATUSES.TABLE.WAITING,
            ORDER_STATUSES.TABLE.COMPLETED
        ] : [
            ORDER_STATUSES.DELIVERY.PENDING,
            ORDER_STATUSES.DELIVERY.CONFIRMED,
            ORDER_STATUSES.DELIVERY.DELIVERING,
            ORDER_STATUSES.DELIVERY.COMPLETED
        ];
    
        return (
            <select 
                value={currentStatus}
                onChange={(e) => {
                    if(window.confirm(`Bạn có chắc muốn chuyển sang trạng thái "${e.target.value}"?`)) {
                        onStatusChange(e.target.value);
                    }
                }}
                disabled={loading || currentStatus === ORDER_STATUSES.TABLE.CANCELLED || 
                         currentStatus === ORDER_STATUSES.TABLE.COMPLETED ||
                         currentStatus === ORDER_STATUSES.DELIVERY.COMPLETED}
                className="status-select"
            >
                {statuses.map(status => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        );
    };
    const handleStatusUpdate = async (newStatus) => {
        try {
            setLoading(true);
            setError(null);
    
            const response = await fetch(`http://localhost:3000/api/order/status/${booking.orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    orderId: booking.orderId,
                    status: newStatus 
                })
            });
    
            if (!response.ok) throw new Error('Không thể cập nhật trạng thái');
    
            const result = await response.json();
            if (result.success) {
                await onUpdate({ ...booking, status: newStatus });
                onClose(); // Close modal first
                window.location.reload(); // Then reload page
            }
        } catch (err) {
            setError('Lỗi: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    const calculateDeliveryTime = (orderDate) => {
        try {
            const [time, date] = orderDate.split(' ');
            const [hours, minutes, seconds] = time.split(':');
            const [day, month, year] = date.split('/');
            
            const parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Invalid date');
            }
    
            parsedDate.setMinutes(parsedDate.getMinutes() + 45);
            return parsedDate.toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Error calculating delivery time:', error);
            return orderDate;
        }
    };
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
        { 
            id: 'time', 
            header: (booking) => booking.tableNumber ? 'Thời gian đến' : 'Thời gian giao',
            value: (booking) => {
                if (booking.tableNumber) {
                    return booking.arrivalTime;
                }
                return calculateDeliveryTime(booking.orderDate);
            },
            render: true
        },
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
        if (!window.confirm('Bạn có chắc chắn muốn hủy phiếu đặt này?')) {
            return;
        }
    
        try {
            setLoading(true);
            setError(null);
    
            const response = await fetch(`http://localhost:3000/api/order/cancel/${booking.orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId: booking.orderId })
            });
    
            if (response.status === 404) {
                throw new Error('Không tìm thấy phiếu đặt');
            }
    
            if (!response.ok) {
                throw new Error('Không thể hủy phiếu đặt');
            }
    
            const result = await response.json();
    
            if (result.success) {
                const updatedOrder = {
                    ...booking,
                    status: 'Đã hủy'
                };
                await onUpdate(updatedOrder);
                onClose();
                window.location.reload(); // Add reload here
            } else {
                throw new Error(result.message || 'Hủy phiếu đặt không thành công');
            }
        } catch (err) {
            console.error('Error canceling order:', err);
            setError('Không thể hủy phiếu đặt: ' + err.message);
        } finally {
            setLoading(false);
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
                                        <strong>
                                            {typeof column.header === 'function' ? 
                                                column.header(booking) : 
                                                column.header}:
                                        </strong>
                                        {' '}
                                        {column.render ? 
                                            (typeof column.value === 'function' ? column.value(booking) : booking[column.value]) :
                                            booking[column.value]}
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
                                    {booking.status !== ORDER_STATUSES.TABLE.CANCELLED && (
                                        <div className="status-buttons">
                                            <StatusSelect 
                                                currentStatus={booking.status}
                                                isTableOrder={Boolean(booking.tableNumber)}
                                                onStatusChange={handleStatusUpdate}
                                                loading={loading}
                                            />
                                            {booking.status !== ORDER_STATUSES.TABLE.COMPLETED && 
                                            booking.status !== ORDER_STATUSES.DELIVERY.COMPLETED && (
                                                <button 
                                                    className="cancel-button" 
                                                    onClick={handleDeleteClick}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Đang hủy...' : 'Hủy đơn'}
                                                </button>
                                            )}
                                        </div>
                                    )}
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