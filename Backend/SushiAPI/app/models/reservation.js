export class Reservation {
    constructor(
        reservationId,
        branchId,
        customerPhone,
        numberOfPeople,
        reservationTime,
        notes
    ) {
        this.reservationId = reservationId;
        this.branchId = branchId;
        this.customerPhone = customerPhone; 
        this.numberOfPeople = numberOfPeople;
        this.reservationTime = reservationTime;
        this.notes = notes;
    }
}
