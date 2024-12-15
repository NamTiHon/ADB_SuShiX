import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import '../css/RateOrder.css';

const RateOrder = () => {
    const { orderId } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the rating and comment to the storage or backend
        console.log(`Order ${orderId} rated with ${rating} stars and comment: ${comment}`);
        navigate('/order-management');
    };

    return (
        <div>
            <Nav />
            <div className="rate-order">
                <h2>Đánh giá đơn hàng #{orderId}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="rating">
                        <label>
                            Đánh giá:
                            <select value={rating} onChange={handleRatingChange}>
                                <option value="0">Chọn đánh giá</option>
                                <option value="1">1 sao</option>
                                <option value="2">2 sao</option>
                                <option value="3">3 sao</option>
                                <option value="4">4 sao</option>
                                <option value="5">5 sao</option>
                            </select>
                        </label>
                    </div>
                    <div className="comment">
                        <label>
                            Bình luận:
                            <textarea value={comment} onChange={handleCommentChange}></textarea>
                        </label>
                    </div>
                    <button type="submit" className="submit-btn">Gửi đánh giá</button>
                </form>
                <button onClick={() => navigate('/order-management')} className="back-btn">
                    <i className="fas fa-arrow-left"></i> Quay lại
                </button>
            </div>
        </div>
    );
};

export default RateOrder;