import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import SideBar from './Sidebar';
import SideBarTemp from './sideBarTemp';
import '../css/components/checkdish.css';

const CheckDish = () => {
    const isUserAuth = localStorage.getItem('userAuth') === 'true';
    const [phoneNumber, setPhoneNumber] = useState('');
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [notification, setNotification] = useState('');
    const [newDish, setNewDish] = useState({ MA_MaMon: '', MDD_SoLuong: '' });
    const [availableDishes, setAvailableDishes] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch the list of available dishes when the component mounts
        const fetchDishes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dishes/only/dishes');
                const data = await response.json();
                setAvailableDishes(data.dishes);
            } catch (error) {
                console.error('Error fetching available dishes:', error);
            }
        };

        fetchDishes();
    }, []);

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            setNotification('Vui lòng nhập số điện thoại.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/order/phone/${phoneNumber}`);
            const data = await response.json();
            if (data.length === 0) {
                setNotification('Không tìm thấy phiếu đặt món nào cho số điện thoại này.');
                setOrders([]);
            } else {
                // Sort orders by PDM_ThoiGianDat in descending order
                data.sort((a, b) => new Date(b.PDM_ThoiGianDat) - new Date(a.PDM_ThoiGianDat));
                setOrders(data);
                setNotification('');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setNotification('Có lỗi xảy ra khi lấy thông tin phiếu đặt món.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        }
    };

    const handleOrderClick = async (orderId) => {
        if (expandedOrder === orderId) {
            setExpandedOrder(null);
            setDishes([]);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/order/${orderId}`);
            const data = await response.json();
            console.log('Order data:', data);
            const dishesWithDetails = await Promise.all(
                data.order.map(async (dish) => {
                    const dishResponse = await fetch(`http://localhost:3000/api/dishes/${dish.MDD_MaMon}`);
                    const dishData = await dishResponse.json();
                    console.log('Dish data:', dishData);
                    return {
                        ...dish,
                        MA_TenMon: dishData.dish.MA_TenMon,
                        MA_GiaHienTai: dishData.dish.MA_GiaHienTai * 1000,
                    };
                })
            );
            console.log('Dishes with details:', dishesWithDetails);
            setDishes(dishesWithDetails);
            setExpandedOrder(orderId);
        } catch (error) {
            console.error('Error fetching dishes:', error);
            setNotification('Có lỗi xảy ra khi lấy thông tin món ăn.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        }
    };

    const handleNewDishChange = (e) => {
        const { name, value } = e.target;
        setNewDish({ ...newDish, [name]: value });
    };

    const handleAddDish = async (e) => {
        e.preventDefault();
        if (!newDish.MA_MaMon || !newDish.MDD_SoLuong) {
            setNotification('Vui lòng nhập mã món và số lượng.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
            return;
        }

        try {
            const orderId = expandedOrder;
            const response = await fetch(`http://localhost:3000/api/order/dishes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MDD_MaMon: newDish.MA_MaMon,
                    MDD_MaPhieu: orderId,
                    MDD_SoLuong: newDish.MDD_SoLuong,
                }),
            });
            console.log(newDish.MA_MaMon, orderId, newDish.MDD_SoLuong);
            const result = await response.json();
            console.log('Add dish result:', result);

            if (result.order.success) {
                const dishResponse = await fetch(`http://localhost:3000/api/dishes/${newDish.MA_MaMon}`);
                const dishData = await dishResponse.json();
                console.log('New dish data:', dishData);

                const updatedDishes = [
                    ...dishes,
                    {
                        ...newDish,
                        MA_TenMon: dishData.dish.MA_TenMon,
                        MA_GiaHienTai: dishData.dish.MA_GiaHienTai * 1000,
                    },
                ];
                setDishes(updatedDishes);
                setNewDish({ MA_MaMon: '', MDD_SoLuong: '' });
                setNotification('Món ăn đã được thêm thành công.');
                setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds

                // Recalculate the total price after adding the new dish
                const newTotalPrice = calculateTotalPrice() + (dishData.dish.MA_GiaHienTai*1000 * newDish.MDD_SoLuong);
                setTotalPrice(newTotalPrice);

                // Update the bill after adding the dish
                await handleUpdateBill(newTotalPrice);
            } else {
                setNotification('Có lỗi xảy ra khi thêm món ăn.');
                setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
            }
        } catch (error) {
            console.error('Error adding new dish:', error);
            setNotification('Có lỗi xảy ra khi thêm món ăn.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        }
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const calculateTotalPrice = () => {
        return dishes.reduce((total, dish) => total + dish.MA_GiaHienTai * dish.MDD_SoLuong, 0);
    };

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [dishes]);

    const handleUpdateBill = async (newTotalPrice) => {
        try {
            const response = await fetch(`http://localhost:3000/api/bills/order/${expandedOrder}`);
            const billData = await response.json();
            const billId = billData.data.HD_MaHoaDon;
            const updates = {
                HD_SoTienGiam: 0, // Assuming no discount for simplicity
                HD_TongTruocGiam: newTotalPrice,
                HD_TongTienThanhToan: newTotalPrice,
                HD_MaPhieu: expandedOrder,
            };
            console.log('Bill updates:', updates);
            const updateResponse = await fetch(`http://localhost:3000/api/bills/${billId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            const updateResult = await updateResponse.json();
            console.log('Update bill result:', updateResult);
            setNotification('Hóa đơn đã được cập nhật thành công.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        } catch (error) {
            console.error('Error updating bill:', error);
            setNotification('Có lỗi xảy ra khi cập nhật hóa đơn.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        }
    };

    return (
        <div className='mgmt-page'>
            <Nav />
            <div className="page-container">
                {isUserAuth ? <SideBarTemp /> : <SideBar />}
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Kiểm tra phiếu đặt món</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-section">
                            <label htmlFor="phoneNumber">Số điện thoại:</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <button type="submit" className="check-button">Kiểm tra</button>
                        </div>
                        {notification && <div className="notification">{notification}</div>}
                    </form>
                    {orders.length > 0 && (
                        <div className="orders-section">
                            <h2>Phiếu đặt món của khách hàng</h2>
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>Mã phiếu</th>
                                        <th>Thời gian đặt</th>
                                        <th>Số bàn</th>
                                        <th>Số lượng khách</th>
                                        <th>Chi nhánh</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <React.Fragment key={order.PDM_MaPhieu}>
                                            <tr
                                                className={index === 0 ? 'highlight' : ''}
                                                onClick={() => handleOrderClick(order.PDM_MaPhieu)}
                                            >
                                                <td>{order.PDM_MaPhieu}</td>
                                                <td>{new Date(order.PDM_ThoiGianDat).toLocaleString()}</td>
                                                <td>{order.PDM_SoBan}</td>
                                                <td>{order.PDM_SoLuongKH}</td>
                                                <td>{order.PDM_MaChiNhanh}</td>
                                                <td>{order.PDM_GhiChuThem}</td>
                                            </tr>
                                            {expandedOrder === order.PDM_MaPhieu && (
                                                <tr>
                                                    <td colSpan="6">
                                                        <table className="dishes-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tên món</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Giá theo món</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {dishes.map((dish, dishIndex) => (
                                                                    <tr key={`${dish.MA_MaMon}-${dishIndex}`}>
                                                                        <td>{dish.MA_TenMon}</td>
                                                                        <td>{dish.MDD_SoLuong}</td>
                                                                        <td>{formatCurrency(dish.MA_GiaHienTai)}</td>
                                                                    </tr>
                                                                ))}
                                                                <tr>
                                                                    <td colSpan="2" style={{ textAlign: 'right', fontWeight: 'bold' }}>Tổng tiền:</td>
                                                                    <td style={{ fontWeight: 'bold' }}>{formatCurrency(totalPrice)}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        {index === 0 && (
                                                            <form onSubmit={handleAddDish} className="add-dish-form">
                                                                <h3>Thêm món mới</h3>
                                                                <div className="input-section">
                                                                    <label htmlFor="MA_MaMon">Tên món:</label>
                                                                    <select
                                                                        id="MA_MaMon"
                                                                        name="MA_MaMon"
                                                                        value={newDish.MA_MaMon}
                                                                        onChange={handleNewDishChange}
                                                                        required
                                                                    >
                                                                        <option value="">Chọn món</option>
                                                                        {availableDishes.map((dish) => (
                                                                            <option key={dish.MA_MaMon} value={dish.MA_MaMon}>
                                                                                {dish.MA_TenMon}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="input-section">
                                                                    <label htmlFor="MDD_SoLuong">Số lượng:</label>
                                                                    <input
                                                                        type="number"
                                                                        id="MDD_SoLuong"
                                                                        name="MDD_SoLuong"
                                                                        value={newDish.MDD_SoLuong}
                                                                        onChange={handleNewDishChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <button type="submit" className="add-button">Thêm món</button>
                                                            </form>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckDish;