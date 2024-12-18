import { React, useState, useEffect } from "react";
import Mgmt_General from './Mgmt_General';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_Booking";
import DetailModal from "../modals/Detail_Branch";

const columns = [
    { id: 'id', header: 'Mã', value: 'id', editable: false, visible: true },
    { id: 'name', header: 'Tên', value: 'name', editable: true, visible: true },
    { id: 'address', header: 'Địa chỉ', value: 'address', editable: true, visible: true },
    { id: 'openingTime', header: 'Giờ mở cửa', value: 'openingTime', editable: true, visible: true },
    { id: 'closingTime', header: 'Giờ đóng cửa', value: 'closingTime', editable: true, visible: true },
    { id: 'phone', header: 'Số điện thoại', value: 'phone', editable: true, visible: true },
    { id: 'isMotorPark', header: 'Có bãi xe máy', value: 'isMotorPark', editable: true, visible: false },
    { id: 'isCarPark', header: 'Có bãi xe ô tô', value: 'isCarPark', editable: true, visible: false },
    { id: 'hasDelivery', header: 'Có giao hàng', value: 'hasDelivery', editable: true, visible: false },
    { id: 'managerId', header: 'Mã quản lý', value: 'managerId', editable: true, visible: true },
    { id: 'regionId', header: 'Mã khu vực', value: 'regionId', editable: true, visible: true }
];

const branches = [
    { id: 1, name: 'Branch 1', address: '123 Main St', openingTime: '08:00', closingTime: '22:00', phone: '123-456-7890', isMotorPark: true, isCarPark: false, hasDelivery: true, managerId: 101, regionId: 1 },
    { id: 2, name: 'Branch 2', address: '456 Elm St', openingTime: '09:00', closingTime: '21:00', phone: '234-567-8901', isMotorPark: true, isCarPark: true, hasDelivery: false, managerId: 102, regionId: 2 },
    { id: 3, name: 'Branch 3', address: '789 Oak St', openingTime: '07:00', closingTime: '23:00', phone: '345-678-9012', isMotorPark: false, isCarPark: true, hasDelivery: true, managerId: 103, regionId: 3 },
    { id: 4, name: 'Branch 4', address: '101 Pine St', openingTime: '10:00', closingTime: '20:00', phone: '456-789-0123', isMotorPark: true, isCarPark: false, hasDelivery: false, managerId: 104, regionId: 4 },
    { id: 5, name: 'Branch 5', address: '202 Maple St', openingTime: '06:00', closingTime: '18:00', phone: '567-890-1234', isMotorPark: false, isCarPark: true, hasDelivery: true, managerId: 105, regionId: 5 },
    { id: 6, name: 'Branch 6', address: '303 Birch St', openingTime: '11:00', closingTime: '19:00', phone: '678-901-2345', isMotorPark: true, isCarPark: true, hasDelivery: false, managerId: 106, regionId: 6 },
    { id: 7, name: 'Branch 7', address: '404 Cedar St', openingTime: '12:00', closingTime: '22:00', phone: '789-012-3456', isMotorPark: false, isCarPark: false, hasDelivery: true, managerId: 107, regionId: 7 },
    { id: 8, name: 'Branch 8', address: '505 Walnut St', openingTime: '08:00', closingTime: '20:00', phone: '890-123-4567', isMotorPark: true, isCarPark: true, hasDelivery: false, managerId: 108, regionId: 8 },
    { id: 9, name: 'Branch 9', address: '606 Chestnut St', openingTime: '09:00', closingTime: '21:00', phone: '901-234-5678', isMotorPark: false, isCarPark: true, hasDelivery: true, managerId: 109, regionId: 9 },
    { id: 10, name: 'Branch 10', address: '707 Spruce St', openingTime: '07:00', closingTime: '19:00', phone: '012-345-6789', isMotorPark: true, isCarPark: false, hasDelivery: false, managerId: 110, regionId: 10 }
];

function Mgmt_Branch() {
    return (
        <Mgmt_General
            columns={columns}
            initialData={branches}
            title={'Quản lý chi nhánh'}
            AddModal={AddModal}
            DetailModal={DetailModal} />
    );
}

export default Mgmt_Branch;