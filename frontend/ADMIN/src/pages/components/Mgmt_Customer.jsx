import React, { useState, useEffect } from "react";
import Mgmt_General from './Mgmt_General';
import AddModal from "../modals/Add_Customer";
import DetailModal from "../modals/Detail_Customer";

const columns = [
    { id: 'customerId', header: 'Số điện thoại', value: 'KH_SDT', editable: false, visible: true },
    { id: 'name', header: 'Tên', value: 'KH_HoTen', editable: true, visible: true },
    { id: 'cccd', header: 'CCCD', value: 'KH_CCCD', editable: true, visible: true },
    { id: 'email', header: 'Email', value: 'KH_Email', editable: true, visible: true },
    { id: 'gender', header: 'Giới tính', value: 'KH_GioiTinh', editable: true, visible: true },
    { id: 'cardId', header: 'Mã thẻ', value: 'KH_MaThe', editable: true, visible: true },
    { id: 'createdDate', header: 'Ngày tạo', value: 'KH_NgayTao', editable: false, visible: true },
    { id: 'points', header: 'Điểm', value: 'KH_DiemTichLuy', editable: true, visible: true },
    {  id:'yearOfUsing', header: 'Số năm sử dụng', value: 'KH_SoNamSuDung', editable: true, visible: true },
    { id: 'status', header: 'Trạng thái', value: 'KH_TrangThai', editable: false, visible: true },
    { id: 'membershipType', header: 'Loại thành viên', value: 'KH_LoaiThanhVien', editable: true, visible: true },
    { id: 'staffCreatorId', header: 'Mã nhân viên tạo', value: 'KH_MaNVTao', editable: true, visible: false }
];

function Mgmt_Customer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100000; // Adjust as needed

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/auth`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const result = await response.json();
                console.log('Raw API Response:', result); // Debug log

                const transformedCustomers = result.users
                    .filter(customer => customer !== null)
                    .map(customer => ({
                        customerId: customer?.KH_SDT || '',
                        name: customer?.KH_HoTen || '',
                        cccd: customer?.KH_CCCD || '',
                        email: customer?.KH_Email || '',
                        gender: customer?.KH_GioiTinh || '',
                        cardId: customer?.TTV_MaThe || '',
                        createdDate: customer?.TTV_NgayTao ? new Date(customer.TTV_NgayTao).toLocaleDateString() : '',
                        points: customer?.TTV_DiemTichLuy || 0,
                        yearOfUsing: customer?.TTV_SoNamSuDung || 0,
                        status: customer?.TTV_TrangThai === "Available" ? "Hoạt động" : "Đã khóa",
                        membershipType: customer?.TTV_LoaiThe || '',
                        staffCreatorID: customer?.TTV_MaNhanVien || ''
                    }));

                console.log('Transformed Customers:', transformedCustomers); // Debug transformed data
                setCustomers(prevCustomers => [...prevCustomers, ...transformedCustomers]);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching customers:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [currentPage]);


    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner">
                    
                    </div>
                </div>
            ) : (
            <Mgmt_General
                columns={columns}
                initialData={currentCustomers}
                title={'Quản lý khách hàng'}
                AddModal={AddModal}
                DetailModal={DetailModal}
            />
            )}
        </div>
    );
}

export default Mgmt_Customer;