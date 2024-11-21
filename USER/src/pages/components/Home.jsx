import React from 'react';
import Nav from './Nav';
import '../css/home.css';

function Home() {
  /*code js*/
  return (
    <div className="Home">
      <Nav />
      <main>
        <section className="hero">
          <h2>Sushi tươi ngon giao đến tận nhà</h2>
          <p>Trải nghiệm hương vị Nhật Bản với nhiều lựa chọn sushi của chúng tôi.</p>
          <button>Đặt hàng ngay</button>
        </section>
        <section className="products">
          <h2>Sản phẩm bán chạy</h2>
          <div className="product-list">
            <div className="product-item">
              <img src="/images/sushi1.jpg" alt="Sushi 1" />
              <p>Sushi Cá Hồi</p>
            </div>
            <div className="product-item">
              <img src="/images/sushi2.jpg" alt="Sushi 2" />
              <p>Sushi Cá Ngừ</p>
            </div>
            <div className="product-item">
              <img src="/images/sushi3.jpg" alt="Sushi 3" />
              <p>Sushi Tôm</p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>© 2023 SushiX. Bản quyền thuộc về chúng tôi.</p>
      </footer>
    </div>
  );
}

export default Home;