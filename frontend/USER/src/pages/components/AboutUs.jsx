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
                        <p>
                            SushiX được thành lập vào năm 2020, với khát vọng mang đến trải nghiệm ẩm thực Nhật Bản chất lượng cao đến với người Việt Nam. Bắt đầu từ một nhà hàng nhỏ tại trung tâm Thành phố Hồ Chí Minh, chúng tôi đã không ngừng phát triển và hoàn thiện để trở thành một trong những thương hiệu ẩm thực Nhật Bản được yêu thích nhất.
                        </p>
                        <p>
                            Với đội ngũ đầu bếp được đào tạo chuyên nghiệp tại Nhật Bản, chúng tôi tự hào mang đến những món ăn không chỉ ngon miệng mà còn giữ trọn vẹn tinh hoa ẩm thực của xứ sở hoa anh đào. Mỗi món ăn tại SushiX đều được chế biến từ những nguyên liệu tươi ngon nhất, được nhập khẩu trực tiếp từ các nhà cung cấp uy tín tại Nhật Bản và các vùng biển sạch của Việt Nam.
                        </p>
                        <p>
                            Không chỉ đơn thuần là một nhà hàng, SushiX còn là nơi giao thoa văn hóa Việt - Nhật, nơi thực khách không chỉ thưởng thức ẩm thực mà còn được trải nghiệm không gian và phong cách phục vụ mang đậm chất Nhật Bản. Chúng tôi luôn nỗ lực để mỗi bữa ăn tại SushiX đều là một trải nghiệm đáng nhớ với khách hàng.
                        </p>
                        <p>
                            Với tầm nhìn trở thành chuỗi nhà hàng Nhật Bản hàng đầu tại Việt Nam, SushiX cam kết không ngừng đổi mới và nâng cao chất lượng, mang đến cho khách hàng những trải nghiệm ẩm thực tuyệt vời nhất.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="https://media.istockphoto.com/id/1314931162/vector/sushi-modern-restaurant-design.jpg?s=612x612&w=0&k=20&c=cu2aOP7Hy3qepMgg4F9Sdw3Eekf2hKLcZPbFzYjnwek=" alt="Our Story" />
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