export class Feedback {
    constructor(
        feedbackId,
        orderId,
        serviceRating,
        branchRating,
        foodQualityRating,
        priceRating,
        atmosphereRating,
        comments
    ) {
        this.feedbackId = feedbackId;
        this.orderId = orderId;
        this.serviceRating = serviceRating;
        this.branchRating = branchRating;
        this.foodQualityRating = foodQualityRating;
        this.priceRating = priceRating;
        this.atmosphereRating = atmosphereRating;
        this.comments = comments;
    }
}
