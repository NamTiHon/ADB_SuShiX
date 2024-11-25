// src/pages/components/Cart.jsx
import React, { useContext, useState } from 'react'; // Add useState import
import { UserContext } from '../../context/UserContext';
import Nav from './Nav';
import '../css/cart.css';
import { CartContext } from '../../context/CartContext';
const Cart = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const updateQuantity = (id, change) => {
        setCartItems(items => 
            items.map(item => 
                item.id === id ? 
                    {...item, quantity: Math.max(1, item.quantity + change)} 
                    : item
            )
        );
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <Nav />
            <div className="cart-container">
                <h2>Giỏ hàng của bạn</h2>
                
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">{item.price.toLocaleString()}đ</p>
                                </div>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                                <p className="item-total">
                                    {(item.price * item.quantity).toLocaleString()}đ
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <h3>Tổng đơn hàng</h3>
                        <div className="summary-row">
                            <span>Tạm tính:</span>
                            <span>{total.toLocaleString()}đ</span>
                        </div>
                        <div className="summary-row">
                            <span>Phí vận chuyển:</span>
                            <span>30,000đ</span>
                        </div>
                        <div className="summary-total">
                            <span>Tổng cộng:</span>
                            <span>{(total + 30000).toLocaleString()}đ</span>
                        </div>
                        <button className="checkout-btn">Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;