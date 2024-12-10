export const saveOrder = (orderDetails) => {
    try {
        console.log('Saving order:', orderDetails); // Debug log
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        orders[orderDetails.orderId] = orderDetails;
        localStorage.setItem('orders', JSON.stringify(orders));
        console.log('Orders after save:', orders); // Debug log
        return true;
    } catch (error) {
        console.error('Error saving order:', error);
        return false;
    }
};

export const getOrder = (orderId) => {
    try {
        const orders = JSON.parse(localStorage.getItem('orders') || '{}');
        return orders[orderId] || null;
    } catch (error) {
        console.error('Error getting order:', error);
        return null;
    }
};