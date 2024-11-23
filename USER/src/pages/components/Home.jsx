// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import '../css/home.css';

function Home() {
  return (
    <div className="home">
      <Nav />
      <div className="content-container">
        <div className="hero-section">
          <h1>
            Hương vị biển khơi <br />
            <span className="highlight">xứ anh đào</span>
          </h1>
          <p><em>
            Nơi những món ăn Nhật Bản hội tụ <br />
            với chất lượng hảo hạng.
          </em></p>
          <div className="buttons">
            <button className="btn-primary">Đặt ngay</button>
            <button className="btn-secondary">Xem thực đơn</button>
          </div>
        </div>

        <div className="img">
          <img src="/img/home.jpg" alt="SuShiX" className="main-image" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;