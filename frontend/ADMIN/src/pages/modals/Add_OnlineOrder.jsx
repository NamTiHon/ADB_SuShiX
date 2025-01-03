//FOR ONLINE ORDERS
import React, { useState } from 'react';
import '../css/css-modals/add-online-order.css';

const Add_OnlineOrder = ({ onClose, onAdd }) => {
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

    const [newOrder, setNewOrder] = useState({
        name: 'example',
        phone: '0123456789',
        destination: 'example',
        comment: 'example',
        preOrderedDishes: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderWithInfo = {
            ...newOrder,
            orderId: generateOrderId(),
            orderDate: new Date().toISOString().split('T')[0],
            orderTime: new Date().toISOString().split('T')[1].slice(0, 5),
            preOrderedDishes: preOrderedDishes,
        };
        onAdd(orderWithInfo);
        alert('Thêm đơn hàng thành công');
        onClose();
    };

    const generateOrderId = () => {
        return 'ORDER' + Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="">
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>THÊM PHIẾU ĐẶT ONLINE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN ĐƠN HÀNG</h3>
                            <p><strong>Tên khách hàng:</strong> <input type="text" name="customerName" value={newOrder.name} onChange={handleChange} required /></p>
                            <p><strong>Số điện thoại:</strong> <input type="text" name="phone" value={newOrder.phone} onChange={handleChange} required /></p>
                            <p><strong>Điểm đến:</strong> <input type="text" name="address" value={newOrder.destination} onChange={handleChange} required /></p>
                            <p><strong>Ghi chú:</strong> <input type="text" name="comment" value={newOrder.comment} onChange={handleChange} required /></p>
                            <h3>MÓN ĂN ĐƯỢC ĐẶT</h3>
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
                                    <button type="button" className="add-button" onClick={handleAddDish}>Thêm món</button>
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

export default Add_OnlineOrder;