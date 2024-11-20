export class PromotionApplication {
    constructor(
        promotionId,
        orderId,
        customerPhone,
        discountAmount
    ) {
        this.promotionId = promotionId;
        this.orderId = orderId;
        this.customerPhone = customerPhone; 
        this.discountAmount = discountAmount; 
    }
}
