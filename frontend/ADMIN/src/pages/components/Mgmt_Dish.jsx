import { React, useState, useEffect } from "react";
import Mgmt_General from './Mgmt_General';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_Dish";
import DetailModal from "../modals/Detail_Dish";

const columns = [
    { id: 'dishId', header: 'Mã món ăn', value: 'dishId', editable: false, visible: true },
    { id: 'dishName', header: 'Tên món ăn', value: 'dishName', editable: true, visible: true },
    { id: 'currentPrice', header: 'Giá hiện tại', value: 'currentPrice', editable: true, visible: true },
    { id: 'portion', header: 'Phần ăn', value: 'portion', editable: true, visible: true },
    { id: 'available', header: 'Có sẵn', value: 'available', editable: true, visible: false },
    { id: 'hasDelivery', header: 'Có giao hàng', value: 'hasDelivery', editable: true, visible: false },
    { id: 'categoryId', header: 'Tên danh mục', value: 'categoryId', editable: true, visible: true },
    { id: 'image', header: 'Hình ảnh', value: 'image', editable: true, visible: true }
];


function Mgmt_Dish() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dishes/only/dishes');
                if (!response.ok) {
                    throw new Error('Failed to fetch dishes');
                }
                const data = await response.json();

                const transformedDishes = data.dishes.map(dish => ({
                    dishId: dish.MA_MaMon,
                    dishName: dish.MA_TenMon,
                    currentPrice: dish.MA_GiaHienTai,
                    portion: dish.MA_KhauPhan,
                    available: dish.MA_CoSan ? "Có" : "Không",
                    hasDelivery: dish.MA_HoTroGiaoHang ? "Có" : "Không",
                    categoryId: dish.MA_TenDanhMuc,
                    image: dish.MA_HinhAnh
                }));

                setDishes(transformedDishes);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching dishes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
            <Mgmt_General
                columns={columns}
                initialData={dishes}
                title={'Quản lý món ăn'}
                AddModal={AddModal}
                DetailModal={DetailModal} />
            )}
        </div>
        
    );
}

export default Mgmt_Dish;