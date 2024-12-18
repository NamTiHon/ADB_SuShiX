import { React, useState, useEffect } from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
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
    { id: 'categoryId', header: 'Mã danh mục', value: 'categoryId', editable: true, visible: true },
    { id: 'image', header: 'Hình ảnh', value: 'image', editable: true, visible: true }
];

const dishes = [
    { dishId: '1', dishName: 'Sushi', currentPrice: 10, portion: '1 roll', available: true, hasDelivery: true, categoryId: 'A1', image: 'sushi.jpg' },
    { dishId: '2', dishName: 'Ramen', currentPrice: 12, portion: '1 bowl', available: true, hasDelivery: true, categoryId: 'A2', image: 'ramen.jpg' },
    { dishId: '3', dishName: 'Tempura', currentPrice: 15, portion: '1 plate', available: true, hasDelivery: true, categoryId: 'A3', image: 'tempura.jpg' },
    { dishId: '4', dishName: 'Sashimi', currentPrice: 20, portion: '1 plate', available: true, hasDelivery: true, categoryId: 'A4', image: 'sashimi.jpg' },
    { dishId: '5', dishName: 'Takoyaki', currentPrice: 8, portion: '6 pieces', available: true, hasDelivery: true, categoryId: 'A5', image: 'takoyaki.jpg' },
    { dishId: '6', dishName: 'Okonomiyaki', currentPrice: 10, portion: '1 pancake', available: true, hasDelivery: true, categoryId: 'A6', image: 'okonomiyaki.jpg' },
    { dishId: '7', dishName: 'Udon', currentPrice: 11, portion: '1 bowl', available: true, hasDelivery: true, categoryId: 'A7', image: 'udon.jpg' },
    { dishId: '8', dishName: 'Onigiri', currentPrice: 5, portion: '1 piece', available: true, hasDelivery: true, categoryId: 'A8', image: 'onigiri.jpg' },
    { dishId: '9', dishName: 'Miso Soup', currentPrice: 4, portion: '1 bowl', available: true, hasDelivery: true, categoryId: 'A9', image: 'misosoup.jpg' },
    { dishId: '10', dishName: 'Yakitori', currentPrice: 7, portion: '2 skewers', available: true, hasDelivery: true, categoryId: 'A10', image: 'yakitori.jpg' }
];

function Mgmt_Dish() {
    return (
        <Mgmt_General
            columns={columns}
            initialData={dishes}
            title={'Quản lý món ăn'}
            AddModal={AddModal}
            DetailModal={DetailModal} />
    );
}

export default Mgmt_Dish;