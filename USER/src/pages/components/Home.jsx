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
      image: '/img/sushi-set.jpg',
      description: 'Combo sushi đặc biệt'
    },
    {
      title: 'Ramen',
      image: '/img/ramen.jpg',
      description: 'Mì Ramen truyền thống'
    },
    {
      title: 'Tempura',
      image: '/img/tempura.jpg',
      description: 'Tempura giòn rụm'
    },
    {
      title: 'Bento Box',
      image: '/img/bento.jpg',
      description: 'Hộp cơm Bento'
    }
  ];

  const bestSellers = [
    {
      title: 'Salmon Sushi',
      image: '/img/salmon-sushi.jpg',
      description: 'Sushi cá hồi tươi ngon',
      price: '189.000đ',
      rating: 4.5
    },
    {
      title: 'Dragon Roll',
      image: '/img/dragon-roll.jpg',
      description: 'Cầu vồng hương vị độc đáo',
      price: '259.000đ',
      rating: 5
    },
    {
      title: 'Udon Special',
      image: '/img/udon.jpg',
      description: 'Mì Udon đặc biệt',
      price: '149.000đ',
      rating: 4.8
    },
    {
      title: 'Sake Sashimi',
      image: '/img/sashimi.jpg',
      description: 'Cá hồi sashimi thượng hạng',
      price: '219.000đ',
      rating: 4.7
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }
    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }
    return stars;
  };
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
              <button 
                  className="btn-primary" 
                  onClick={() => navigate('/reservation')}
              >
                  Đặt ngay
              </button>
              <button 
                  className="btn-secondary"
                  onClick={() => navigate('/menu')}
              >
                  Xem thực đơn
              </button>
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
                <div className="rating">
                  <span>{item.rating}</span>
                  <i className="fas fa-star"></i>
                </div>
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