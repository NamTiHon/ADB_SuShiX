// src/pages/components/Cart.jsx
import React, { useContext, useState } from 'react'; // Add useState import
import { UserContext } from '../../context/UserContext';
import Nav from './Nav';
import '../css/cart.css';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const handleCheckout = () => {
        if (selectedItems.length === 0) return;
        
        navigate('/checkout', {
            state: {
                cartItems: cartItems.filter(item => selectedItems.includes(item.id)),
                total: selectedTotal,
                shippingFee: shippingFee
            }
        });
    };
    
    const updateQuantity = (id, change) => {
        setCartItems(items => 
            items.map(item => 
                item.id === id ? 
                    {...item, quantity: Math.max(1, item.quantity + change)} 
                    : item
            )
        );
    };
    
    const deleteItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    };

    const toggleSelect = (id) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    const selectAllItems = () => {
        // If all items are selected, deselect all
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        }
        // Otherwise select all items
        else {
            const allItemIds = cartItems.map(item => item.id);
            setSelectedItems(allItemIds);
        }
    };
    
    const deleteAllSelected = () => {
        setCartItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
    };
    
    const selectedTotal = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

        const shippingFee = selectedTotal === 0 ? 0 : selectedTotal < 500000 ? 30000 : 0;    return (
        <div>
            <Nav />
            <div className="cart-container">
                <h2>Giỏ hàng của bạn</h2>
                <div className="cart-actions">
                    <button 
                        className="select-all-btn"
                        onClick={selectAllItems}
                        disabled={cartItems.length === 0}
                    >
                        {selectedItems.length === cartItems.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                    </button>
                    <button 
                        className="delete-all-btn"
                        onClick={deleteAllSelected}
                        disabled={selectedItems.length === 0}
                    >
                        Xóa mục đã chọn
                    </button>
                </div>
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                                className="item-checkbox"
                            />
                            <img src={item.image} alt={item.name} className="item-image" />
                            
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                            <button 
                                className="delete-button"
                                onClick={() => deleteItem(item.id)}
                            >
                                Xóa khỏi giỏ hàng
                            </button>
                            <p className="item-total">
                                {(item.price * item.quantity).toLocaleString()}đ
                            </p>
                        </div>
                    ))}
                    </div>
                    
                    <div className="cart-summary">
                        <h3>Tổng đơn hàng ({selectedItems.length} món được chọn)</h3>
                        <div className="summary-row">
                            <span>Tạm tính:</span>
                            <span>{selectedTotal.toLocaleString()}đ</span>
                        </div>
                        {shippingFee > 0 && (
                            <div className="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span>{shippingFee.toLocaleString()}đ</span>
                            </div>
                        )}
                        <div className="summary-total">
                            <span>Tổng cộng:</span>
                            <span>{(selectedTotal + shippingFee).toLocaleString()}đ</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="checkout-btn"
                            disabled={selectedItems.length === 0}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Cart;