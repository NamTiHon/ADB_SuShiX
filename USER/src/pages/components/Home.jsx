// src/pages/components/Menu.jsx
import React, { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import '../css/menu.css';

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

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
          price: 160000,
          image: '/images/tuna-sushi.jpg',
          description: 'Cá ngừ tươi với cơm sushi'
      },
      {
          id: 3,
          name: 'Shrimp Tempura',
          category: 'tempura',
          price: 120000,
          image: '/images/shrimp-tempura.jpg',
          description: 'Tôm chiên giòn'
      },
      {
          id: 4,
          name: 'Beef Udon',
          category: 'udon',
          price: 180000,
          image: '/images/beef-udon.jpg',
          description: 'Mì Udon với thịt bò'
      },
      {
          id: 5,
          name: 'Chicken Hotpot',
          category: 'hotpot',
          price: 250000,
          image: '/images/chicken-hotpot.jpg',
          description: 'Lẩu gà Nhật Bản'
      },
      {
          id: 6,
          name: 'Matcha Ice Cream',
          category: 'dessert',
          price: 80000,
          image: '/images/matcha-ice-cream.jpg',
          description: 'Kem trà xanh'
      },
      {
          id: 7,
          name: 'Green Tea',
          category: 'drinks',
          price: 50000,
          image: '/images/green-tea.jpg',
          description: 'Trà xanh Nhật Bản'
      }
  ];

    const filteredDishes = selectedCategory === 'all' 
        ? dishes 
        : dishes.filter(dish => dish.category === selectedCategory);

    const selectedCategoryDescription = categories.find(category => category.id === selectedCategory)?.description;

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