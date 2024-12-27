import React, { useState, useEffect, useMemo } from 'react';
import '../css/css-modals/add-booking.css';
import '../css/css-modals/add-dish.css';

const Add_Dish = ({ onClose, onAdd }) => {
    const [newDish, setNewDish] = useState({
        MA_MaMon: '',
        MA_TenMon: '',
        MA_GiaHienTai: '',
        MA_KhauPhan: '',
        MA_CoSan: false,
        MA_HoTroGiaoHang: false,
        MA_TenDanhMuc: '',
        MA_HinhAnh: ''
    });

    const [categories, setCategories] = useState([]); // List of all categories
    const [searchCategoryTerm, setSearchCategoryTerm] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [lastDishId, setLastDishId] = useState(0);

    useEffect(() => {
        // Fetch all categories from the server when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dishes/only/categories');
                const data = await response.json();
                console.log('Fetched categories:', data.category); // Debug log
                setCategories(data.category);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch all dishes from the server when the component mounts
        const fetchDishes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dishes/only/dishes');
                const data = await response.json();
                console.log('Fetched dishes:', data.dishes.length); // Debug log
                setLastDishId(data.dishes.length + 1);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };
        fetchDishes();
    }, []);

    const filteredCategories = useMemo(() => {
        if (searchCategoryTerm === '') {
            console.log('a', categories);
            return categories.slice(0, 10);
        }
        return categories.filter((category) => category.MA_TenDanhMuc.toLowerCase().startsWith(searchCategoryTerm.toLowerCase())).slice(0, 10);
    }, [categories, searchCategoryTerm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = e.target.type === 'checkbox' ? e.target.checked : value;

        if (name === 'MA_GiaHienTai') {
            // Remove non-digit characters
            newValue = value.replace(/\D/g, '');
        }

        setNewDish((prevDish) => ({
            ...prevDish,
            [name]: newValue,
        }));

        if (name === 'MA_TenDanhMuc') {
            setSearchCategoryTerm(value);
            setShowCategoryDropdown(true);
        }
    };

    const handleFocus = () => {
        setShowCategoryDropdown(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowCategoryDropdown(false);
        }, 200); // Delay to allow click event to register
    };

    const handleSelectCategory = (category) => {
        setNewDish((prevDish) => ({
            ...prevDish,
            MA_TenDanhMuc: category.MA_TenDanhMuc,
        }));
        setSearchCategoryTerm('');
        setShowCategoryDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dishWithInfo = {
            ...newDish,
            MA_MaMon: generateDishId(),
            MA_GiaHienTai: parseFloat(newDish.MA_GiaHienTai.replace(/\D/g, ''))
        }; 
    
        console.log('Adding dish:', dishWithInfo);
        try {
            const response = await fetch('http://localhost:3000/api/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dishWithInfo),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add dish');
            }
    
            const result = await response.json();
            console.log('Dish added:', result);
            alert('Thêm món ăn thành công');
            await onAdd(result);
            onClose();
            window.location.reload(); // Add reload after successful addition
        } catch (error) {
            console.error('Error adding dish:', error);
            alert('Failed to add dish');
        }
    };

    const generateDishId = () => {
        // Generate random number between 100 and 9999
        const randomNum = Math.floor(Math.random() * 9900) + 100;
        
        // Format with MA prefix and pad to 4 digits
        const dishId = 'MA' + randomNum.toString().padStart(4, '0');
        
        return dishId;
    };

    return (
        <div className="">
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>THÊM MÓN ĂN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN MÓN ĂN</h3>
                            <p><strong>Tên món ăn:</strong> <input type="text" name="MA_TenMon" value={newDish.MA_TenMon} onChange={handleChange} required /></p>
                            <p><strong>Giá hiện tại:</strong> <input type="text" name="MA_GiaHienTai" value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newDish.MA_GiaHienTai)} onChange={handleChange} required /></p>
                            <p><strong>Phần ăn:</strong> <input type="text" name="MA_KhauPhan" value={newDish.MA_KhauPhan} onChange={handleChange} required /></p>
                            <p><strong>Có sẵn:</strong> <input type="checkbox" name="MA_CoSan" checked={newDish.MA_CoSan} onChange={handleChange} /></p>
                            <p><strong>Có giao hàng:</strong> <input type="checkbox" name="MA_HoTroGiaoHang" checked={newDish.MA_HoTroGiaoHang} onChange={handleChange} /></p>
                            <p>
                                <strong>Tên danh mục:</strong> 
                                <input type="text" name="MA_TenDanhMuc" value={newDish.MA_TenDanhMuc} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required />
                                {showCategoryDropdown && filteredCategories.length > 0 && (
                                    <ul className="category-dropdown">
                                        {filteredCategories.map((category) => (
                                            <li key={category.MA_TenDanhMuc} onClick={() => handleSelectCategory(category)}>
                                                {category.MA_TenDanhMuc}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </p>
                            <p><strong>Hình ảnh:</strong> <input type="text" name="MA_HinhAnh" value={newDish.MA_HinhAnh} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Dish;