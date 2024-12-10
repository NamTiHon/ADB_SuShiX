// src/components/MessengerIcon.jsx
import React from 'react';
import '../css/messenger.css';

const MessengerIcon = () => {
    return (
        <a 
            href="https://m.me/stella.nguyen.7549" 
            target="_blank" 
            rel="noopener noreferrer"
            className="messenger-icon"
            aria-label="Chat on Messenger"
        >
            <i className="fab fa-facebook-messenger"></i>
        </a>
    );
};

export default MessengerIcon;