import emailjs from '@emailjs/browser';

export const sendOrderConfirmationEmail = async (orderDetails, userEmail) => {
    try {
        const templateParams = {
            to_email: userEmail,
            order_id: orderDetails.id,
            customer_name: orderDetails.customerName,
            order_items: orderDetails.items.map(item => 
                `${item.name} x${item.quantity}`
            ).join(', '),
            total_amount: `${orderDetails.total.toLocaleString()}đ`,
            shipping_address: orderDetails.address,
            estimated_delivery: orderDetails.estimatedDelivery
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