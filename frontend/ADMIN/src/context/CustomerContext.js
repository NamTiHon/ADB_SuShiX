import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem('selected');
        return saved ? JSON.parse(saved) : null;
    });

    return (
        <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
};