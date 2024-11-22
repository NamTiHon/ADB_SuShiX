import React from 'react';
import '../css/menu.css';
import sushi from '../img/sushi.jpg';

const MenuItem = ({ dish }) => {
    return (
        <div className="dish-item">
            <img src={dish.image} alt={dish.name} />
            <h2 className="dish-name">{dish.name}</h2>
            <p className="dish-price">{dish.price} đ</p>
            <p className="dish-button-select">Chọn</p>
            {/* <button>Chi tiết</button> */}
        </div>
    );
}

const Menu = () => {
    const typedishes = [
        { name: 'Sushi', info: 'Món ăn truyền thống Nhật Bản, gồm cơm trộn giấm kết hợp với hải sản, rau củ, hoặc các nguyên liệu khác, thường được cuốn trong rong biển.' },
        { name: 'Khai vị', info: 'Khai vị là các món ăn nhẹ được phục vụ đầu bữa để kích thích vị giác, thường có hương vị tinh tế và dễ ăn.' },
        { name: 'Tempura', info: 'Gồm hải sản hoặc rau củ được tẩm bột và chiên giòn, tạo lớp vỏ nhẹ và xốp.' },
        { name: 'Udon', info: 'Món mì Nhật Bản với sợi mì dày, dai, thường được phục vụ trong nước dùng thanh nhẹ kèm rau củ và thịt.' },
        { name: 'Hotpot', info: 'Món lẩu phổ biến ở châu Á, với nồi nước dùng sôi để nhúng các loại thịt, hải sản, rau củ, và nấm, thường ăn kèm nước chấm.' },
        { name: 'Lunch set', info: 'Gồm nhiều món nhỏ được kết hợp trong một khay hoặc đĩa, thường bao gồm món chính, cơm, súp, rau, và tráng miệng, nhằm mang lại bữa ăn cân bằng dinh dưỡng.' }
    ];

    const dishes = [
        { name: 'Dish Name', info: 'Dish info', image: sushi, price: 100000 }
    ]

    return (
        <div>
            <div className="menu-container">
                {/* <h1 className="menu-header">Thực đơn</h1> */}
                {/* <p>Chọn món ăn yêu thích của bạn</p> */}
                <div className="dish-list">
                    {typedishes.map((dish, index) => (
                        <div key={index} className="dish-list">
                            <h2 className="type-header">{dish.name}</h2>
                            <p className="description">{dish.info}</p>
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