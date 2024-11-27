// src/components/Toast.jsx
import React, { useEffect } from 'react';
import '../css/toast.css';

const Toast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="toast-container">
            <div className="toast-message">
                <i className="fas fa-check-circle"></i>
                {message}
            </div>
        </div>
    );
};

export default Toast;