export class Dish {
    constructor(
        dishId,
        name,
        currentPrice,
        portion,
        isAvailable,
        supportsDelivery,
        categoryId
    ) {
        this.dishId = dishId; 
        this.name = name; 
        this.currentPrice = currentPrice;
        this.portion = portion;
        this.isAvailable = isAvailable;
        this.supportsDelivery = supportsDelivery;
        this.categoryId = categoryId;
    }
}
