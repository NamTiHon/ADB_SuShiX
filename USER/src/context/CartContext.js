// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                name: "Sushi Set A",
                price: 150000,
                quantity: 1,
                image: "/sushi-a.jpg"
            },
            {
                id: 2,
                name: "Sashimi Combo",
                price: 220000,
                quantity: 1,
                image: "/sashimi.jpg"
            },
            {
                id: 3,
                name: "Maki Roll",
                price: 180000,
                quantity: 1,
                image: "/maki.jpg"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};