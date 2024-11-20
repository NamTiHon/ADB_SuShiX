export class Branch {
    constructor(
        branchId,
        name,
        address,
        openTime,
        closeTime,
        phone,
        hasMotorParking,
        hasCarParking,
        supportsDelivery,
        managerId,
        areaId
    ) {
        this.branchId = branchId;
        this.name = name;
        this.address = address;
        this.openTime = openTime;
        this.closeTime = closeTime;
        this.phone = phone;
        this.hasMotorParking = hasMotorParking;
        this.hasCarParking = hasCarParking;
        this.supportsDelivery = supportsDelivery;
        this.managerId = managerId;
        this.areaId = areaId;
    }
}
