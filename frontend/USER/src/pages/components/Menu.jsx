// src/pages/components/Menu.jsx
import React, { useState, useRef, useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import '../css/menu.css';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useBranch } from '../../context/BranchContext'; // Thêm import này

export const dishes = [
    {
        id: 1,
        name: 'Salmon Sushi',
        category: 'sushi',
        price: 150000,
        image: '/images/salmon-sushi.jpg',
        description: 'Cá hồi tươi với cơm sushi',
        availableAt: [1, 2, 3]
    },
    {
        id: 2,
        name: 'California Roll',
        category: 'sushi',
        price: 120000,
        image: '/images/california-roll.jpg',
        description: 'Sushi cuộn với cua, bơ và dưa chuột',
        availableAt: [1, 3]
    },
    {
        id: 3,
        name: 'Miso Soup',
        category: 'appetizer',
        price: 45000,
        image: '/images/miso-soup.jpg',
        description: 'Súp miso truyền thống Nhật Bản',
        availableAt: [1, 3, 4, 5, 6]
    },
    {
        id: 4,
        name: 'Tempura Moriawase',
        category: 'tempura',
        price: 180000,
        image: '/images/tempura-moriawase.jpg',
        description: 'Tổng hợp tempura hải sản và rau củ',
        availableAt: [1, 3, 4, 5, 7]
    },
    {
        id: 5,
        name: 'Kitsune Udon',
        category: 'udon',
        price: 95000,
        image: '/images/kitsune-udon.jpg',
        description: 'Mì udon với đậu phụ chiên',
        availableAt: [3, 4, 5, 6, 7]
    },
    {
        id: 6,
        name: 'Shabu Shabu',
        category: 'hotpot',
        price: 350000,
        image: '/images/shabu-shabu.jpg',
        description: 'Lẩu shabu shabu với thịt bò cắt lát mỏng',
        availableAt: [1, 4, 2, 6, 7]
    },
    {
        id: 7,
        name: 'Bento Box',
        category: 'lunch-set',
        price: 165000,
        image: '/images/bento-box.jpg',
        description: 'Set ăn trưa với cơm, tempura và sashimi',
        availableAt: [1, 4, 5, 7, 8]
    },
    {
        id: 8,
        name: 'Wagyu Steak',
        category: 'specialty',
        price: 850000,
        image: '/images/wagyu-steak.jpg',
        description: 'Thịt bò wagyu cao cấp',
        availableAt: [3, 4, 5, 6, 8]
    },
    {
        id: 9,
        name: 'Matcha Ice Cream',
        category: 'dessert',
        price: 55000,
        image: '/images/matcha-ice-cream.jpg',
        description: 'Kem trà xanh Nhật Bản',
        availableAt: [1, 4, 5, 6, 7]
    },
    {
        id: 10,
        name: 'Sake',
        category: 'drinks',
        price: 180000,
        image: '/images/sake.jpg',
        description: 'Rượu sake truyền thống',
        availableAt: [3, 4, 5, 1, 7]
    },
    {
        id: 11,
        name: 'Dragon Roll',
        category: 'sushi',
        price: 165000,
        image: '/images/dragon-roll.jpg',
        description: 'Sushi cuộn lươn với bơ',
        availableAt: [3, 4, 5, 6, 2]
    },
    {
        id: 12,
        name: 'Gyoza',
        category: 'appetizer',
        price: 75000,
        image: '/images/gyoza.jpg',
        description: 'Bánh xếp Nhật chiên giòn',
        availableAt: [3, 4, 5, 6, 7]
    }
];
const Menu = () => {
    
    const { addToCart } = useCart();
    const location = useLocation();
    const [toastDishId, setToastDishId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(
        location.state?.category || 'all'
    );
    
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const { selectedBranch } = useBranch();
    const [availableDishes, setAvailableDishes] = useState(dishes);
    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsSearching(false);
    };
    

    const handleAddToCart = (dish) => {
        addToCart(dish);
        setToastDishId(dish.id);
        setTimeout(() => {
            setToastDishId(null);
        }, 3000);
    };
    

    const categories = [
        { id: 'all', name: 'Tất cả', description: 'Tất cả các món ăn trong thực đơn.' },
        { id: 'sushi', name: 'Sushi', description: 'Sushi là món ăn truyền thống Nhật Bản, gồm cơm trộn giấm kết hợp với các loại hải sản tươi sống.' },
        { id: 'appetizer', name: 'Khai vị', description: 'Các món khai vị nhẹ nhàng, kích thích vị giác.' },
        { id: 'tempura', name: 'Tempura', description: 'Tempura là món chiên giòn đặc trưng của Nhật Bản.' },
        { id: 'udon', name: 'Udon', description: 'Udon là loại mì dày, dai, thường được ăn với nước dùng nóng.' },
        { id: 'hotpot', name: 'Lẩu', description: 'Lẩu Nhật Bản với hương vị đậm đà, phong phú.' },
        { id: 'lunch-set', name: 'Lunch Set', description: 'Các set ăn trưa tiện lợi, đầy đủ dinh dưỡng.' },
        { id: 'specialty', name: 'Đặc sản', description: 'Các món đặc sản cao cấp, độc đáo.' },
        { id: 'dessert', name: 'Tráng miệng', description: 'Các món tráng miệng ngọt ngào, hấp dẫn.' },
        { id: 'drinks', name: 'Đồ uống', description: 'Các loại đồ uống phong phú, đa dạng.' }
    ];

    

    const filteredDishes = availableDishes.filter(dish => {
        const matchesSearch = searchTerm ? (
            dish.name.toLowerCase().includes(searchTerm) ||
            dish.description.toLowerCase().includes(searchTerm) ||
            dish.category.toLowerCase().includes(searchTerm)
        ) : true;

        const matchesCategory = selectedCategory === 'all' || 
            dish.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const selectedCategoryDescription = categories.find(category => category.id === selectedCategory)?.description;
    // Cập nhật danh sách món ăn khi chi nhánh thay đổi
    useEffect(() => {
        if (selectedBranch) {
            const filteredDishes = dishes.filter(dish => 
                dish.availableAt.includes(Number(selectedBranch.id)) // Chuyển id thành number
            );
            setAvailableDishes(filteredDishes);
        } else {
            setAvailableDishes(dishes);
        }
    }, [selectedBranch]);
    return (
        <div>
            <Nav />
            <div className="menu-container">
                <h1>Thực đơn</h1>
                {!selectedBranch && (
                    <div className="branch-warning">
                        <i className="fas fa-exclamation-circle"></i>
                        Vui lòng chọn chi nhánh để xem thực đơn đầy đủ
                    </div>
                )}
                {selectedBranch && (
                    <div className="selected-branch-info">
                        <i className="fas fa-store"></i>
                        Thực đơn tại: {selectedBranch.name}
                    </div>
                )}
                <div className="menu-search-container">
                    <form className="menu-search-form">
                        <input 
                            type="text"
                            placeholder="Tìm kiếm món ăn..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="menu-search-input"
                        />
                        {searchTerm && (
                            <button 
                                type="button" 
                                onClick={clearSearch}
                                className="menu-search-clear"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </form>
                </div>

                {searchTerm && (
                    <div className="search-results">
                        <div className="search-header">
                            <div>
                                <h2>Kết quả tìm kiếm cho: "{searchTerm}"</h2>
                                <p>Tìm thấy {filteredDishes.length} món</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="category-container">
                    <div className="category-nav">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedCategoryDescription && (
                    <div className="category-description">
                        <p>{selectedCategoryDescription}</p>
                    </div>
                )}

                <div className="dishes-grid">
                    {filteredDishes.map(dish => (
                        <div key={dish.id} className="dish-card">
                            <div className="dish-image">
                                <img src={dish.image} alt={dish.name} />
                            </div>
                            <div className="dish-info">
                                <h3>{dish.name}</h3>
                                <p>{dish.description}</p>
                                <div className="dish-price">
                                    {dish.price.toLocaleString()}đ
                                </div>
                            </div>
                            <button 
                                onClick={() => handleAddToCart(dish)}
                                className="add-to-cart-btn"
                            >
                                <i className="fas fa-shopping-cart"></i>
                                Thêm vào giỏ hàng
                            </button>

                            {toastDishId === dish.id && (
                                <div className="dish-toast-container">
                                    <div className="dish-toast">
                                        <div className="toast-icon">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <div className="toast-message">
                                            <span className="dish-name">{dish.name}</span>
                                            <span>đã được thêm vào giỏ hàng!</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Menu;