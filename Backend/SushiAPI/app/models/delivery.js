export class Delivery {
    constructor(deliveryId, orderId, deliveryAddress, deliveryTime, deliveryStatus) {
        this.deliveryId = deliveryId;
        this.orderId = orderId; 
        this.deliveryAddress = deliveryAddress;
        this.deliveryTime = deliveryTime;
        this.deliveryStatus = deliveryStatus;
    }
}
