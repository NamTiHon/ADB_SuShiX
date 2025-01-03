// src/pages/components/Reservation.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/reservation.css';
import { UserContext } from '../../context/UserContext';


const categoryNameMapping = {
    'Khai vị': 'appetizer',
    'Sushi': 'sushi',
    'Tempura': 'tempura',
    'Udon': 'udon',
    'Lẩu': 'hotpot',
    'Lunch Set': 'lunch-set',
    'Đặc sản': 'specialty',
    'Tráng miệng': 'dessert',
    'Đồ uống': 'drinks'
};
const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Sushi', name: 'Sushi' },
    { id: 'Khai vị', name: 'Khai vị' },
    { id: 'Tempura', name: 'Tempura' },
    { id: 'Udon', name: 'Udon' },
    { id: 'Hotpot', name: 'Lẩu' },
    { id: 'Lunch set', name: 'Lunch Set' },
    { id: 'Nigiri', name: 'Nigiri' },
    { id: 'Sashimi combo', name: 'Sashimi' },
    { id: 'Món nước', name: 'Đồ uống' }
];


const Reservation = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [availableDishes, setAvailableDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Filter dishes by category
    const filteredDishes = React.useMemo(() => {
        const dishes = selectedCategory === 'all' 
            ? availableDishes 
            : availableDishes.filter(dish => dish.category === selectedCategory);
    
        // Add unique index to each dish
        return dishes.map((dish, index) => ({
            ...dish,
            uniqueKey: `${dish.id}-${index}`
        }));
    }, [selectedCategory, availableDishes]);
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

    useEffect(() => {
        if (customerPhone) {
            setFormData(prev => ({
                ...prev,
                phone: customerPhone
            }));
            console.log('Setting phone:', customerPhone); 
        }
    }, [customerPhone]);

    useEffect(() => {
        const fetchCustomerPhone = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`http://localhost:3000/api/auth/${user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        setCustomerPhone(data.user.KH_SDT);
                        setFormData(prev => ({
                            ...prev,
                            phone: data.user.KH_SDT
                        }));
                    }
                } catch (error) {
                    console.error('Error fetching customer phone:', error);
                }
            }
        };

        fetchCustomerPhone();
    }, [user]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                const data = await response.json();
                setBranches(data.branches.map(branch => ({
                    id: branch.CN_MaChiNhanh,
                    name: branch.CN_Ten,
                    address: branch.CN_DiaChi,
                    region: branch.KV_Ten // Add region field
                })));
                console.log('Branches with regions:', data.branches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };
        fetchBranches();
    }, []);
    useEffect(() => {
        const fetchDishes = async () => {
            if (!formData.branch) {
                setAvailableDishes([]);
                return;
            }
            
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/dishes');
                const result = await response.json();
    
                const selectedBranch = branches.find(b => b.id === formData.branch);
                
                const branchFiltered = result.dishes.filter(dish => 
                    dish.KV_Ten === selectedBranch?.region
                );
    
                const transformedDishes = branchFiltered
                    .map(dish => ({
                        id: dish.MA_MaMon,
                        name: dish.MA_TenMon,
                        price: dish.MA_GiaHienTai * 1000,
                        category: dish.MA_TenDanhMuc, // Use exact category name
                        description: categories.find(c => c.id === dish.MA_TenDanhMuc)?.description,
                        image: dish.MA_HinhAnh || `/images/menu/${dish.MA_MaMon.toLowerCase()}.jpg`,
                        available: Boolean(dish.MA_CoSan)
                    }))
                    .filter(dish => dish.available);
    
                setAvailableDishes(transformedDishes);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchDishes();
    }, [formData.branch, branches]);
    
    // Update handleInputChange
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            // Clear selected dishes when branch changes
            selectedDishes: name === 'branch' ? [] : prev.selectedDishes
        }));
        
        if (name === 'branch') {
            setAvailableDishes([]); // Clear dishes immediately
            setIsLoading(true);
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reservationId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
        try {
            // 1. Create basic reservation
            const reservation = {
                PDM_MaPhieu: reservationId,
                PDM_SDT_KH: formData.phone,
                PDM_SoBan: 1,
                PDM_SoLuongKH: parseInt(formData.guests, 10),
                PDM_ThoiGianDen: `${formData.date} ${formData.time}:00`,
                PDM_MaChiNhanh: formData.branch,
                PDM_MaNhanVien: 'NV00000000',
                PDM_GhiChuThem: formData.note,
                fullName: formData.name,
            };
    
            // Create reservation
            const reserveResponse = await fetch('http://localhost:3000/api/order/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)
            });
    
            if (!reserveResponse.ok) {
                throw new Error('Failed to create reservation');
            }
    
            // 2. Handle dishes
            if (formData.selectedDishes.length > 0) {
                // Map selected dishes
                const dishPromises = formData.selectedDishes.map(dish => {
                    return fetch('http://localhost:3000/api/order/dishes', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            MDD_MaMon: dish.id,
                            MDD_MaPhieu: reservationId,
                            MDD_SoLuong: dish.quantity
                        })
                    });
                });
                await Promise.all(dishPromises);
            } else {
                // Create null dish entry if no dishes selected
                await fetch('http://localhost:3000/api/order/dishes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        MDD_MaMon: null,
                        MDD_MaPhieu: reservationId,
                        MDD_SoLuong: 0
                    })
                });
            }
    
            // 3. Save to localStorage
            const reservationData = {
                ...reservation,
                dishes: formData.selectedDishes.length > 0 ? 
                    formData.selectedDishes.map(dish => ({
                        MDD_MaMon: dish.id,
                        MDD_SoLuong: dish.quantity,
                        name: dish.name,
                        price: dish.price
                    })) : 
                    [{
                        MDD_MaMon: null,
                        MDD_SoLuong: 0,
                        name: null,
                        price: 0
                    }]
            };
    
            localStorage.setItem(`reservation_${reservationId}`, JSON.stringify(reservationData));
    
            // Navigate to table selection
            navigate('/table-selection', { 
                state: { 
                    reservationData: reservationData,
                    reservationId: reservationId
                }
            });
    
        } catch (error) {
            console.error('Reservation error:', error);
            alert('Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại.');
        }
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
                                readOnly={!!customerPhone}
                            />
                        </div>

                        <div className="form-group">
                            <label>Chọn chi nhánh</label>
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
                                {[2,3,4,5,6,7,8].map(num => (
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
                                        <h3>Chọn món tại {branches.find(b => b.id === formData.branch)?.name}</h3>
                                        <div className="category-tabs">
                                            {categories.map(category => (
                                                <button
                                                    key={category.id}
                                                    className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                                                    onClick={() => setSelectedCategory(category.id)}
                                                    type="button"
                                                >
                                                    {category.name}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="menu-grid">
                                            {filteredDishes.map(dish => (
                                                <div key={dish.uniqueKey} className="menu-item">
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