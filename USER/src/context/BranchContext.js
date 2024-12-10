// src/contexts/BranchContext.jsx
import React, { createContext, useContext, useState } from 'react';

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
    const [selectedBranch, setSelectedBranch] = useState(null);

    return (
        <BranchContext.Provider value={{ selectedBranch, setSelectedBranch }}>
            {children}
        </BranchContext.Provider>
    );
};

export const useBranch = () => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error('useBranch must be used within a BranchProvider');
    }
    return context;
};