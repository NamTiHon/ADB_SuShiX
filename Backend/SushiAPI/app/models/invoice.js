export class Invoice {
    constructor(
        invoiceId,
        discountAmount,
        totalBeforeDiscount,
        totalAfterDiscount,
        orderId
    ) {
        this.invoiceId = invoiceId;
        this.discountAmount = discountAmount;
        this.totalBeforeDiscount = totalBeforeDiscount; 
        this.totalAfterDiscount = totalAfterDiscount;
        this.orderId = orderId;
    }
}
