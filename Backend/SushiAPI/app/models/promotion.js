export class Promotion {
    constructor(
        promotionId,
        name,
        eventName,
        discountRate,
        minCardType,
        branchId
    ) {
        this.promotionId = promotionId;
        this.name = name;
        this.eventName = eventName; 
        this.discountRate = discountRate; 
        this.minCardType = minCardType;
        this.branchId = branchId; 
    }
}
