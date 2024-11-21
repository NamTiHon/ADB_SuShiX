import React from 'react';
import Nav from './Nav';
import '../css/aboutus.css';

function About() {
    return (
        <div className="about-page">
            <Nav />
            <main>
                <section className="about-hero">
                    <h2>Về chúng tôi</h2>
                    <p>Chào mừng bạn đến với SuShiX! Chúng tôi tự hào mang đến cho bạn những món sushi tươi ngon nhất.</p>
                </section>
                <section className="about-content">
                    <h3>Lịch sử của chúng tôi:</h3>
                    <p>SuShiX được thành lập vào năm 2023 với sứ mệnh mang đến hương vị Nhật Bản đến với mọi người.</p>
                    <h3>Đội ngũ của chúng tôi:</h3>
                    <p>Chúng tôi có một đội ngũ đầu bếp chuyên nghiệp và nhiệt huyết, luôn sẵn sàng phục vụ bạn.</p>
                    <h3>Cam kết của chúng tôi:</h3> 
                    <p>Chúng tôi cam kết sử dụng nguyên liệu tươi ngon và chất lượng nhất để mang đến cho bạn những bữa ăn ngon nhất.</p>
                    <h3>Liên hệ:</h3>
                    
                </section>
            </main>
        </div>
    );
}

export default About;