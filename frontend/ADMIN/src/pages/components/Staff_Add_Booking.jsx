import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import SideBar from './Sidebar';
import SideBarTemp from './sideBarTemp';
import '../css/components/staff-add-booking.css';

const Staff_Add_Booking = () => {
    const isUserAuth = localStorage.getItem('userAuth') === 'true';
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [branches, setBranches] = useState([]);
    const [filteredStaffs, setFilteredStaffs] = useState([]);
    const [newBooking, setNewBooking] = useState({
        PDM_MaPhieu: '',
        PDM_SDT_KH: '',
        PDM_MaChiNhanh: '',
        PDM_SoBan: '',
        PDM_SoLuongKH: '',
        PDM_GhiChuThem: '',
        PDM_MaNhanVien: '',
    });
    const [currentDish, setCurrentDish] = useState({ dishId: '', dishName: '', quantity: '', price: 0 });
    const [preOrderedDishes, setPreOrderedDishes] = useState([]);
    const [notification, setNotification] = useState('');
    const suggestionsRef = useRef(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dishes/only/dishes');
                const data = await response.json();
                if (data.dishes && Array.isArray(data.dishes)) {
                    setDishes(data.dishes);
                } else {
                    console.error('Unexpected data format:', data);
                    setDishes([]);
                }
            } catch (error) {
                console.error('Error fetching dishes:', error);
                setDishes([]);
            }
        };

        const fetchStaffs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/staffs');
                const data = await response.json();
                if (data.staffs && Array.isArray(data.staffs)) {
                    setStaffs(data.staffs);
                } else {
                    console.error('Unexpected data format:', data);
                    setStaffs([]);
                }
            } catch (error) {
                console.error('Error fetching staffs:', error);
                setStaffs([]);
            }
        };

        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                const data = await response.json();
                if (data.branches && Array.isArray(data.branches)) {
                    setBranches(data.branches);
                } else {
                    console.error('Unexpected data format:', data);
                    setBranches([]);
                }
            } catch (error) {
                console.error('Error fetching branches:', error);
                setBranches([]);
            }
        };

        fetchDishes();
        fetchStaffs();
        fetchBranches();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setFilteredStaffs([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAddBooking = (newBooking) => {
        setBookings([...bookings, newBooking]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBooking({ ...newBooking, [name]: value });

        if (name === 'PDM_MaNhanVien') {
            const filtered = staffs.filter(staff =>
                staff.NV_MaNhanVien.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 10);
            setFilteredStaffs(filtered);
        }
    };

    const handleStaffSelect = (staffId) => {
        setNewBooking({ ...newBooking, PDM_MaNhanVien: staffId });
        setFilteredStaffs([]);
    };

    const handleDishChange = (e) => {
        const { name, value } = e.target;
        setCurrentDish({ ...currentDish, [name]: value });
    };

    const handleDishSelect = (dishName) => {
        const selectedDish = dishes.find(dish => dish.MA_TenMon === dishName);
        if (selectedDish) {
            setCurrentDish({ ...currentDish, dishId: selectedDish.MA_MaMon, dishName: selectedDish.MA_TenMon, price: selectedDish.MA_GiaHienTai * 1000 });
        }
    };

    const handleAddDish = () => {
        if (currentDish.dishId && currentDish.quantity) {
            setPreOrderedDishes([...preOrderedDishes, currentDish]);
            setCurrentDish({ dishId: '', dishName: '', quantity: '', price: 0 });
        } else {
            setNotification('Please enter both dish ID and quantity.');
            setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
        }
    };

    const handleRemoveDish = (index) => {
        const newDishes = preOrderedDishes.filter((_, i) => i !== index);
        setPreOrderedDishes(newDishes);
    };

    const generateMaPhieu = () => {
        return 'DO' + Math.random().toString(20).substr(2, 7).toUpperCase();
    };

    const generateMaHoaDon = () => {
        return 'HD' + Math.random().toString(20).substr(2, 7).toUpperCase();
    };

    const calculateTotalPrice = () => {
        return preOrderedDishes.reduce((total, dish) => total + dish.price * dish.quantity, 0);
    };

    const createBill = async (bookingData) => {
        const billData = {
            MaHoaDon: generateMaHoaDon(),
            SoTienGiam: 0, // Assuming no discount for now
            TongTruocGiam: calculateTotalPrice(),
            MaPhieu: bookingData.PDM_MaPhieu,
        };
        console.log('Bill data:', billData);
        try {
            const response = await fetch('http://localhost:3000/api/bills/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(billData)
            });
            const data = await response.json();
            console.log('Bill created successfully:', data);
            return billData.MaHoaDon; // Ensure the API returns the created bill ID
        } catch (error) {
            console.error('Error creating bill:', error);
            alert('Có lỗi xảy ra khi tạo hóa đơn. Vui lòng thử lại.');
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (preOrderedDishes.length === 0) {
            alert('Vui lòng chọn ít nhất một món trước khi thêm phiếu đặt.');
            return;
        }
    
        const bookingData = { ...newBooking, PDM_MaPhieu: generateMaPhieu(), preOrderedDishes };
        try {
            const response = await fetch('http://localhost:3000/api/order/direct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            const data = await response.json();
            console.log('Order posted successfully:', data);
    
            // Post each preOrderedDish
            for (const dish of preOrderedDishes) {
                await fetch('http://localhost:3000/api/order/dishes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        MDD_MaPhieu: bookingData.PDM_MaPhieu,
                        MDD_MaMon: dish.dishId,
                        MDD_SoLuong: dish.quantity,
                    }),
                });
                console.log(bookingData.PDM_MaPhieu, dish.dishId, dish.quantity, bookingData.MaHoaDon);
            }
            const billId = await createBill(bookingData);
            console.log('Bill ID:', billId);
            if (billId) {
                handleAddBooking(bookingData);
                setNewBooking({
                    PDM_MaPhieu: '',
                    PDM_SDT_KH: '',
                    PDM_MaChiNhanh: '',
                    PDM_SoBan: '',
                    PDM_SoLuongKH: '',
                    PDM_GhiChuThem: '',
                    PDM_MaNhanVien: '',
                });
                setPreOrderedDishes([]);
                alert('Đặt món thành công!');
                navigate(`/bill/${billId}`, { state: { billId } }); // Navigate to the Bill page with the billId
            }
        } catch (error) {
            console.error('Error posting order:', error);
            alert('Có lỗi xảy ra khi đặt món. Vui lòng thử lại.');
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className='mgmt-page'>
            <Nav />
            <div className="page-container">
                {isUserAuth ? <SideBarTemp /> : <SideBar />}
                <div className="main-content-box">
                    <div className="header-container">
                        <h1>Đặt món</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN CÁ NHÂN</h3>
                            <p><strong>Số điện thoại:</strong> <input type="text" name="PDM_SDT_KH" value={newBooking.PDM_SDT_KH} onChange={handleChange} required /></p>
                            <p><strong>Mã chi nhánh:</strong>
                                <select name="PDM_MaChiNhanh" value={newBooking.PDM_MaChiNhanh} onChange={handleChange} required>
                                    <option value="">Chọn chi nhánh</option>
                                    {branches.map((branch) => (
                                        <option key={branch.CN_MaChiNhanh} value={branch.CN_MaChiNhanh}>
                                            {branch.CN_MaChiNhanh} - {branch.CN_Ten}
                                        </option>
                                    ))}
                                </select>
                            </p>
                            <p><strong>Bàn số:</strong> <input type="text" name="PDM_SoBan" value={newBooking.PDM_SoBan} onChange={handleChange} required /></p>
                            <p><strong>Số khách:</strong> <input type="text" name="PDM_SoLuongKH" value={newBooking.PDM_SoLuongKH} onChange={handleChange} required /></p>
                            <p><strong>Ghi chú:</strong> <input type="text" name="PDM_GhiChuThem" value={newBooking.PDM_GhiChuThem} onChange={handleChange} /></p>
                            <p><strong>Mã nhân viên:</strong> <input type="text" name="PDM_MaNhanVien" value={newBooking.PDM_MaNhanVien} onChange={handleChange} required /></p>
                            <ul className="staff-suggestions" ref={suggestionsRef}>
                                {filteredStaffs.map((staff) => (
                                    <li key={staff.NV_MaNhanVien} onClick={() => handleStaffSelect(staff.NV_MaNhanVien)}>
                                        {staff.NV_MaNhanVien} - {staff.NV_HoTen}
                                    </li>
                                ))}
                            </ul>
                            <h3>MÓN ĐẶT TRỰC TIẾP</h3>
                            <div>
                                <div className='dish-input'>
                                    <input
                                        type="text"
                                        name="dishName"
                                        placeholder="Tên món"
                                        value={currentDish.dishName}
                                        onChange={(e) => {
                                            handleDishChange(e);
                                            handleDishSelect(e.target.value);
                                        }}
                                        list="dishes"
                                        className="dish-input-dropdown"
                                    />
                                    <datalist id="dishes">
                                        {dishes.map((dish) => (
                                            <option key={dish.MA_MaMon} value={dish.MA_TenMon} />
                                        ))}
                                    </datalist>
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Số lượng"
                                        value={currentDish.quantity}
                                        onChange={handleDishChange}
                                        min="0"
                                    />
                                    <button
                                        type="button"
                                        className="add-button"
                                        onClick={handleAddDish}
                                        disabled={!currentDish.dishId.trim() || !currentDish.quantity.trim()}
                                    >
                                        Thêm món
                                    </button>
                                </div>

                                {preOrderedDishes.length !== 0 && (
                                    <table className="work-history-table">
                                        <thead>
                                            <tr>
                                                <th>Tên món</th>
                                                <th>Số lượng</th>
                                                <th>Giá</th>
                                                <th>Tổng tiền</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preOrderedDishes.map((dish, index) => (
                                                <tr key={index}>
                                                    <td>{dish.dishName}</td>
                                                    <td>{dish.quantity}</td>
                                                    <td>{formatCurrency(dish.price)}</td>
                                                    <td>{formatCurrency(dish.price * dish.quantity)}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDish(index)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                <div className="total-price">
                                    <h3>Tổng tiền: {formatCurrency(calculateTotalPrice())}</h3>
                                </div>
                            </div>
                            <button type="submit" className="add-button">Thêm phiếu đặt</button>
                            {notification && <div className="notification">{notification}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Staff_Add_Booking;