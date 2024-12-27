import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import SideBar from './Sidebar';
import SideBarTemp from './sideBarTemp';
import '../css/components/bill.css';

const Bill = () => {
    const isUserAuth = localStorage.getItem('userAuth') === 'true';
    const location = useLocation();
    const navigate = useNavigate();
    const { billId } = location.state || {};
    const [bill, setBill] = useState(null);
    const [order, setOrder] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/bills/${billId}`);
                const data = await response.json();
                setBill(data.data);

                // Fetch order details using the bill's MaPhieu
                const orderResponse = await fetch(`http://localhost:3000/api/order/${data.data.HD_MaPhieu}`);
                const orderData = await orderResponse.json();
                setOrder(orderData.order);

                // Fetch dish details for each dish in the order
                const dishDetails = await Promise.all(
                    orderData.order.map(async (dish) => {
                        const dishResponse = await fetch(`http://localhost:3000/api/dishes/${dish.MDD_MaMon}`);
                        const dishData = await dishResponse.json();
                        return { ...dish, ...dishData.dish };
                    })
                );
                setDishes(dishDetails);
            } catch (error) {
                console.error('Error fetching bill or order:', error);
            }
        };

        fetchBill();
    }, [billId]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    const handleConfirm = () => {
        navigate('/home');
    };

    if (!bill || !order || dishes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mgmt-page'>
            <Nav />
            <div className="page-container">
                {isUserAuth ? <SideBarTemp /> : <SideBar />}
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Chi tiết hóa đơn</h1>
                    </div>
                    <div className="bill-details">
                        <h2>Mã hóa đơn: {bill.HD_MaHoaDon}</h2>
                        <p><strong>Số tiền giảm:</strong> {formatCurrency(bill.HD_SoTienGiam)}</p>
                        <p><strong>Tổng trước giảm:</strong> {formatCurrency(bill.HD_TongTruocGiam)}</p>
                        <p><strong>Mã phiếu:</strong> {bill.HD_MaPhieu}</p>
                        <h3>Chi tiết món ăn</h3>
                        <table className="bill-table">
                            <thead>
                                <tr>
                                    <th>Tên món</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dishes.map((dish, index) => (
                                    <tr key={index}>
                                        <td>{dish.MA_TenMon}</td>
                                        <td>{dish.MDD_SoLuong}</td>
                                        <td>{formatCurrency(dish.MA_GiaHienTai * 1000)}</td>
                                        <td>{formatCurrency(dish.MA_GiaHienTai * dish.MDD_SoLuong * 1000)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="total-price">
                            <h3>Tổng tiền: {formatCurrency(bill.HD_TongTienThanhToan)}</h3>
                        </div>
                        <button className="confirm-button" onClick={handleConfirm}>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bill;