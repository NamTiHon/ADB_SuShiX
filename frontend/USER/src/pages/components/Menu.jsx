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
    const [dishes, setDishes] = useState([]); // New state for dishes
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
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
        { id: 'SUSHI', name: 'Sushi', description: 'Sushi là món ăn truyền thống Nhật Bản, gồm cơm trộn giấm kết hợp với các loại hải sản tươi sống.' },
        { id: 'KV', name: 'Khai vị', description: 'Các món khai vị nhẹ nhàng, kích thích vị giác.' },
        { id: 'TEMPURA', name: 'Tempura', description: 'Tempura là món chiên giòn đặc trưng của Nhật Bản.' },
        { id: 'UDON', name: 'Udon', description: 'Udon là loại mì dày, dai, thường được ăn với nước dùng nóng.' },
        { id: 'HPT', name: 'Lẩu', description: 'Lẩu Nhật Bản với hương vị đậm đà, phong phú.' },
        { id: 'LUNCH', name: 'Lunch Set', description: 'Các set ăn trưa tiện lợi, đầy đủ dinh dưỡng.' },
        { id: 'NIGIRI', name: 'Nigiri', description: 'Nigiri là loại sushi gồm cơm trộn giấm và hải sản tươi sống.' },
        { id: 'SASHIMI', name: 'Sashimi', description: 'Sashimi là món ăn gồm các lát hải sản tươi sống.' },
        { id: 'DRINK', name: 'Đồ uống', description: 'Các loại đồ uống phong phú, đa dạng.' }
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
        const fetchDishes = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/dishes');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch dishes');
                }
                
                const result = await response.json();
                console.log('API Response:', result); // Debug log
    
                // Safe data transformation
                const transformedDishes = [];
                
                // Handle potential data structures
                const items = result?.dishes || result || [];
                
                if (!Array.isArray(items)) {
                    throw new Error('Invalid data format');
                }
    
                // Transform with null checks
                items.forEach(dish => {
                    if (dish) {
                        transformedDishes.push({
                            id: dish?.MA_MaMon?.toString() || '',
                            name: dish?.MA_TenMon?.toString() || '',
                            category: (dish?.MA_MaDanhMuc || '').toString().toLowerCase(),
                            price: (Number(dish?.MA_GiaHienTai) || 0) * 1000,
                            image: dish?.MA_MaMon ? `/images/${dish.MA_MaMon.toString().toLowerCase()}.jpg` : '',
                            description: dish?.DM_TenDanhMuc?.toString() || '',
                            region: dish?.KV_Ten?.toString() || '',
                            branch: dish?.CN_Ten?.toString() || '',
                            available: Boolean(dish?.MA_CoSan)
                        });
                    }
                });
    
                console.log('Transformed:', transformedDishes); // Debug log
                
                setDishes(transformedDishes);

                if (selectedBranch?.name) {
                    debugger;
                    const filtered = transformedDishes.filter(dish => 
                        dish.branch === selectedBranch.name
                    );
                    setAvailableDishes(filtered);
                } else {
                    setAvailableDishes(transformedDishes);
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchDishes();
    }, [selectedBranch]);
    return (
        <div>
            <Nav />
            <div className="menu-container">
                <h1>Thực đơn</h1>
                
                {loading && (
                    <div className="loading-state">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Đang tải thực đơn...</p>
                    </div>
                )}

                {error && (
                    <div className="error-state">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>Có lỗi xảy ra: {error}</p>
                    </div>
                )}
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
                        {categories.map((category, index) => (
                            <button
                                key={`${category.id}-${index}`}
                                className={`category-btn ${selectedCategory === category.id.toLowerCase() ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id.toLocaleLowerCase())}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
                {filteredDishes.length === 0 && !loading && !error && (
                    <div className="no-dishes">
                        <p>Hiện tại cửa hàng không phục vụ những món này.</p>
                    </div>
                )}

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
                                    {dish.price.toLocaleString('vi-VN')} đ
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