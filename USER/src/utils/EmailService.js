import emailjs from '@emailjs/browser';

export const sendOrderConfirmationEmail = async (orderDetails, userEmail) => {
    try {
        const templateParams = {
            to_email: orderDetails.email,
            order_id: orderDetails.orderId, // Make sure orderId is included
            customer_name: orderDetails.customerName,
            order_items: orderDetails.items.map(item => 
                `${item.name} x${item.quantity}`
            ).join(', '),
            total_amount: `${orderDetails.total.toLocaleString()}đ`,
            shipping_address: orderDetails.address,
            estimated_delivery: new Date(orderDetails.estimatedDelivery).toLocaleString(),
            payment_method: orderDetails.paymentMethod === 'cash' ? 'Tiền mặt' :
                          orderDetails.paymentMethod === 'momo' ? 'Ví MoMo' :
                          'Chuyển khoản ngân hàng'
        };

        await emailjs.send(
            'service_i6l31l3',
            'template_ou9wmka', 
            templateParams,
            '-xPPBzvTaENInqHr3'
        );

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};