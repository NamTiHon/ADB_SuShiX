// src/pages/components/About.jsx
import React from 'react';
import Nav from './Nav';
import '../css/aboutus.css';
import Footer from './Footer'; // Add this import

const About = () => {
    return (
        <div>
            <Nav />
            <div className="about-container">
                <div className="about-hero">
                    <h1>Về chúng tôi</h1>
                    <p>Nơi hội tụ tinh hoa ẩm thực Nhật Bản</p>
                </div>

                <div className="about-section">
                    <div className="about-content">
                        <h2>Câu chuyện của chúng tôi</h2>
                        <p>SushiX được thành lập vào năm 2020, với khát vọng mang đến trải nghiệm ẩm thực Nhật Bản chất lượng cao đến với người Việt Nam...</p>
                    </div>
                    <div className="about-image">
                        <img src="/about-story.jpg" alt="Our Story" />
                    </div>
                </div>

                <div className="values-section">
                    <h2>Giá trị cốt lõi</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <i className="fas fa-heart"></i>
                            <h3>Chất lượng</h3>
                            <p>Cam kết sử dụng nguyên liệu tươi ngon nhất</p>
                        </div>
                        <div className="value-item">
                            <i className="fas fa-star"></i>
                            <h3>Dịch vụ</h3>
                            <p>Phục vụ khách hàng tận tâm</p>
                        </div>
                        <div className="value-item">
                            <i className="fas fa-certificate"></i>
                            <h3>Sáng tạo</h3>
                            <p>Không ngừng đổi mới menu</p>
                        </div>
                    </div>
                </div>

                
                   
            </div>
            <Footer /> {/* Add Footer component here */}

        </div>
    );
};

export default About;