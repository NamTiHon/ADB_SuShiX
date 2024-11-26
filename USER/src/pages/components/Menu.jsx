// src/pages/components/Menu.jsx
import React, { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import '../css/menu.css';

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'Tất cả' },
        { id: 'sushi', name: 'Sushi' },
        { id: 'appetizer', name: 'Khai vị' },
        { id: 'tempura', name: 'Tempura' },
        { id: 'udon', name: 'Udon' },
        { id: 'hotpot', name: 'Lẩu' },
        { id: 'lunch-set', name: 'Lunch Set' },
        { id: 'specialty', name: 'Đặc sản' },
        { id: 'dessert', name: 'Tráng miệng' },
        { id: 'drinks', name: 'Đồ uống' }
    ];

    const dishes = [
        {
            id: 1,
            name: 'Salmon Sushi',
            category: 'sushi',
            price: 150000,
            image: '/images/salmon-sushi.jpg',
            description: 'Cá hồi tươi với cơm sushi'
        },
        {
            id: 2,
            name: 'Tuna Sushi',
            category: 'sushi',
            price: 140000,
            image: '/images/tuna-sushi.jpg',
            description: 'Cá ngừ tươi với cơm sushi'
        },
        {
            id: 3,
            name: 'Miso Soup',
            category: 'appetizer',
            price: 45000,
            image: '/images/miso-soup.jpg',
            description: 'Súp miso truyền thống Nhật Bản'
        },
        {
            id: 4,
            name: 'Tempura Tôm',
            category: 'tempura',
            price: 120000,
            image: '/images/shrimp-tempura.jpg',
            description: 'Tôm tẩm bột chiên giòn kiểu Nhật'
        },
        {
            id: 5,
            name: 'Udon Bò',
            category: 'udon',
            price: 95000,
            image: '/images/beef-udon.jpg',
            description: 'Mì udon với thịt bò và nước dùng nóng'
        },
        {
            id: 6,
            name: 'Lẩu Hải Sản',
            category: 'hotpot',
            price: 350000,
            image: '/images/seafood-hotpot.jpg',
            description: 'Lẩu hải sản phong cách Nhật cho 2-3 người'
        },
        {
            id: 7,
            name: 'Lunch Set A',
            category: 'lunch-set',
            price: 180000,
            image: '/images/lunch-set-a.jpg',
            description: 'Cơm, sushi, tempura và súp miso'
        },
        {
            id: 8,
            name: 'Wagyu Beef',
            category: 'specialty',
            price: 450000,
            image: '/images/wagyu-beef.jpg',
            description: 'Thịt bò Wagyu cao cấp nướng'
        },
        {
            id: 9,
            name: 'Matcha Ice Cream',
            category: 'dessert',
            price: 45000,
            image: '/images/matcha-ice-cream.jpg',
            description: 'Kem trà xanh matcha'
        },
        {
            id: 10,
            name: 'Sake',
            category: 'drinks',
            price: 180000,
            image: '/images/sake.jpg',
            description: 'Rượu sake Nhật Bản'
        }
    ];

    const filteredDishes = selectedCategory === 'all' 
        ? dishes 
        : dishes.filter(dish => dish.category === selectedCategory);

    return (
        <div>
            <Nav />
            <div className="menu-container">
                <h1>Thực đơn</h1>
                
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
                            <button className="add-to-cart-btn">
                                <i className="fas fa-cart-plus"></i>
                                Thêm vào giỏ
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Menu;