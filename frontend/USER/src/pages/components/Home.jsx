// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const popularItems = [
    {
      title: 'Sushi Set',
      image: 'https://sashimitphcm.com/wp-content/uploads/2023/10/369-giam-con-339-500x500.jpg',
      description: 'Combo sushi đặc biệt'
    },
    {
      title: 'Ramen',
      image: 'https://japan.net.vn/images/uploads/2018/03/26/2-mi-ramen-nhat-ban.jpg',
      description: 'Mì Ramen truyền thống'
    },
    {
      title: 'Tempura',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrL6hYPMx_KX3jO9ShcWsW8wUfF1ffmJ1cQ&s',
      description: 'Tempura giòn rụm'
    },
    {
      title: 'Bento Box',
      image: 'https://cdnphoto.dantri.com.vn/l0SLYuPisGdkxsxroUmEhgUFULU=/thumb_w/960/2021/05/20/comhopbentogautruc-1621499396882.jpg',
      description: 'Hộp cơm Bento'
    }
  ];

  const bestSellers = [
    {
      title: 'Salmon Sushi',
      image: 'https://aisforappleau.com/wp-content/uploads/2023/07/how-to-make-sushi-salmon-nigiri-6.jpg',
      description: 'Sushi cá hồi tươi ngon',
      price: '189.000đ',
      rating: 4.5
    },
    {
      title: 'Dragon Roll',
      image: 'https://www.justonecookbook.com/wp-content/uploads/2020/06/Dragon-Roll-0286-I.jpg',
      description: 'Cầu vồng hương vị độc đáo',
      price: '259.000đ',
      rating: 5
    },
    {
      title: 'Udon Special',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl1WwuW57ztIKRxXMfsZdYLB0QH8eS5ErZ4Q&s',
      description: 'Mì Udon đặc biệt',
      price: '149.000đ',
      rating: 4.8
    },
    {
      title: 'Sake Sashimi',
      image: 'https://cdn.hokkai.com/wp-content/uploads/2019/05/1307-Sakesashimi.jpg',
      description: 'Cá hồi sashimi thượng hạng',
      price: '219.000đ',
      rating: 4.7
    }
  ];

 
  const navigate = useNavigate();
  return (
    <div className="home">
      <Nav />
      
      {/* Hero Section */}
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
              <div className="cta-buttons">
                <button 
                    className="btn-primary"
                    onClick={() => navigate('/reservation')}
                >
                    <i className="fas fa-calendar-alt"></i>
                    Đặt ngay
                </button>
                <button 
                    className="btn-secondary"
                    onClick={() => navigate('/menu')}
                >
                    <i className="fas fa-utensils"></i>
                    Xem thực đơn
                </button>
            </div>
          </div>
        </div>

        <div className="img">
          <img src="/img/home.jpg" alt="SuShiX" className="main-image" />
        </div>
      </div>

      {/* Popular Section */}
      <div className="popular-section">
        <h2>Món mục phổ biến</h2>
        <div className="popular-grid">
          {popularItems.map((item, index) => (
            <div className="popular-card" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bestseller-section">
        <h2>Best Sellers</h2>
        <div className="bestseller-grid">
          {bestSellers.map((item, index) => (
            <div className="bestseller-card" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="info-grid">
                <span className="price">{item.price}</span>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      
      <Footer />
    </div>
  );
}

export default Home;