import emailjs from '@emailjs/browser';

emailjs.init("-xPPBzvTaENInqHr3");

const formatItemsForTemplate = (items) => {
    const formatCurrency = (amount) => (Number(amount) || 0).toLocaleString() + 'đ';

    // Kiểm tra nếu không có sản phẩm trong danh sách
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }

    // Trả về danh sách sản phẩm dưới dạng mảng đối tượng
    return items.map(item => {
        // Kiểm tra dữ liệu sản phẩm hợp lệ
        if (!item || !item.name || !item.price || !item.quantity) return null;

        return {
            name: item.name,
            quantity: item.quantity,
            price: formatCurrency(item.price * item.quantity),
        };
    }).filter(item => item !== null);
};

export const sendOrderConfirmationEmail = async (orderDetails) => {
    try {
        const formatCurrency = (amount) => (Number(amount) || 0).toLocaleString() + 'đ';

        const templateParams = {
            orderId: orderDetails.orderId?.toUpperCase(),
            customerName: orderDetails.customerName?.trim() || 'Quý khách',
            items: formatItemsForTemplate(orderDetails.items),  // Truyền mảng sản phẩm
            subtotal: formatCurrency(orderDetails.subtotal),
            discount: orderDetails.discount > 0 ? formatCurrency(orderDetails.discount) : null,
            shippingFee: formatCurrency(orderDetails.shippingFee),
            total: formatCurrency(orderDetails.finalTotal),
            phone: orderDetails.phone?.trim() || '',
            address: orderDetails.address?.trim() || '',
            branchName: orderDetails.branchName?.trim() || '',
            estimatedDelivery: new Date(orderDetails.estimatedDelivery).toLocaleString('vi-VN'),
            trackingUrl: `http://sushix.com/tracking/${orderDetails.orderId}`,
            paymentMethod: orderDetails.paymentMethodText?.trim() || 'Tiền mặt',
            to_email: orderDetails.email?.trim(),
        };

        const response = await emailjs.send(
            'service_i6l31l3',
            'template_ou9wmka',
            templateParams
        );

        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};
