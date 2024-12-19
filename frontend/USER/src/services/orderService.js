import axios from 'axios';

export const createOnlineOrder = async (orderData) => {
    const response = await axios.post('http://localhost:3000/api/order/online', orderData);
    return response.data;
};
  
export const addOrderedDishes = async (orderId, dish) => {
    console.log('Adding dish to order:', dish); // Debug log
    const dishData = {
        MDD_MaPhieu: orderId,
        MDD_MaMon: dish.MDD_MaMon,
        MDD_SoLuong: dish.MDD_SoLuong
    };
    console.log('Dish data:', dishData); // Debug log
    const response = await axios.post('http://localhost:3000/api/order/dishes', dishData);

    return response.data;
};

export const createBill = async (billData) => {
    console.log('Creating bill:', billData); // Debug log
    try {
        const response = await axios.post('http://localhost:3000/api/bills/create', billData);
        return response.data;
    } catch (error) {
        console.error('Error creating bill:', error);
        throw error;
    }
};