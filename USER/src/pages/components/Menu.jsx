import React from 'react';
import '../css/menu.css';
import sushi from '../img/sushi.jpg';

const MenuItem = ({ dish }) => {
    return (
        <div className="dish-item">
            <img src={dish.image} alt={dish.name} />
            <h2>{dish.name}</h2>
            <p>{dish.info}</p>
            <p>Giá: {dish.price} VND</p>
            <button>Chọn</button>
            <button>Chi tiết</button>
        </div>
    );
}

const Menu = () => {
    const typedishes = [
        { name: 'Sushi', info: 'Món ăn truyền thống của Nhật Bản' },
        { name: 'Ramen', info: 'Món mì nổi tiếng của Nhật Bản' },
        { name: 'Tempura', info: 'Món chiên giòn của Nhật Bản' },
        { name: 'Sashimi', info: 'Món cá sống tươi ngon' },
        { name: 'Takoyaki', info: 'Món bánh bạch tuộc nổi tiếng' },
        { name: 'Okonomiyaki', info: 'Món bánh xèo Nhật Bản' }
    ];

    const dishes = [
        { name: 'Sushi gà', info: 'Món sushi cùng với gà', image: sushi, price: 100000 }
    ]

    return (
        <div>
            <div className="menu-container">
                <h1 className="menu-header">Thực đơn</h1>
                <p>Chọn món ăn yêu thích của bạn</p>
                <div className="dish-list">
                    {typedishes.map((dish, index) => (
                        <div key={index} className="dish-item">
                            <h2>{dish.name}</h2>
                            <p>{dish.info}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {dishes.map((dish, index) => (
                    <MenuItem key={index} dish={dish} />
                ))}
            </div>
        </div>
    );
}

export default Menu;





// import React from 'react';
// import '../css/menu.css';

// const Menu = () => {
//     const dishes = [
//         { name: 'Sushi', info: 'Món ăn truyền thống của Nhật Bản', image: '/images/sushi.jpg', price: 100000 },
//         { name: 'Ramen', info: 'Món mì nổi tiếng của Nhật Bản', image: '/images/ramen.jpg', price: 80000 },
//         { name: 'Tempura', info: 'Món chiên giòn của Nhật Bản', image: '/images/tempura.jpg', price: 90000 },
//         { name: 'Sashimi', info: 'Món cá sống tươi ngon', image: '/images/sashimi.jpg', price: 120000 },
//         { name: 'Takoyaki', info: 'Món bánh bạch tuộc nổi tiếng', image: '/images/takoyaki.jpg', price: 70000 },
//         { name: 'Okonomiyaki', info: 'Món bánh xèo Nhật Bản', image: '/images/okonomiyaki.jpg', price: 85000 }
//     ];

//     return (
//         <div className="menu-container">
//             <h1 className="menu-header">Thực đơn</h1>
//             <p>Chọn món ăn yêu thích của bạn</p>
//             <div className="dish-list">
//                 {dishes.map((dish, index) => (
//                     <MenuItem key={index} dish={dish} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// const MenuItem = ({ dish }) => {
//     return (
//         <div className="dish-item">
//             <img src={dish.image} alt={dish.name} />
//             <h2>{dish.name}</h2>
//             <p>{dish.info}</p>
//             <p>Giá: {dish.price} VND</p>
//             <button>Chọn</button>
//             <button>Chi tiết</button>
//         </div>
//     );
// }

// export default Menu;