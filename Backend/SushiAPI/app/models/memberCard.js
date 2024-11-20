export class MemberCard {
    constructor(
        cardId,
        createdDate,
        yearsUsed,
        points,
        status,
        type,
        customerPhone,
        employeeId
    ) {
        this.cardId = cardId;
        this.createdDate = createdDate;
        this.yearsUsed = yearsUsed;
        this.points = points;
        this.status = status;
        this.type = type;
        this.customerPhone = customerPhone;
        this.employeeId = employeeId;
    }
}
