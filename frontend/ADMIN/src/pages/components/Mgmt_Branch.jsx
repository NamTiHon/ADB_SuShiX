import { React, useState, useEffect } from "react";
import Mgmt_General from './Mgmt_General';
import '../css/components/mgmt-booking.css';
import AddModal from "../modals/Add_Branch";
import DetailModal from "../modals/Detail_Branch";

const columns = [
    { id: 'branchId', header: 'Mã', value: 'branchId', editable: false, visible: true },
    { id: 'name', header: 'Tên', value: 'name', editable: true, visible: true },
    { id: 'address', header: 'Địa chỉ', value: 'address', editable: true, visible: true },
    { id: 'openingTime', header: 'Giờ mở cửa', value: 'openingTime', editable: true, visible: true },
    { id: 'closingTime', header: 'Giờ đóng cửa', value: 'closingTime', editable: true, visible: true },
    { id: 'isMotorPark', header: 'Có bãi xe máy', value: 'isMotorPark', editable: true, visible: false },
    { id: 'isCarPark', header: 'Có bãi xe ô tô', value: 'isCarPark', editable: true, visible: false },
    { id: 'hasDelivery', header: 'Có giao hàng', value: 'hasDelivery', editable: true, visible: false },
    { id: 'managerId', header: 'Mã quản lý', value: 'managerId', editable: true, visible: true },
    { id: 'regionId', header: 'Mã khu vực', value: 'regionId', editable: true, visible: true },
    // { id: 'image', header: 'Hình ảnh', value: 'image', editable: true, visible: true}
];

function Mgmt_Branch() {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                if (!response.ok) {
                    throw new Error('Failed to fetch branches');
                }
                const data = await response.json();

                // Transform boolean values to "Có"/"Không"
                const transformedBranches = data.branches.map(branch => ({
                    branchId: branch.CN_MaChiNhanh,
                    name: branch.CN_Ten,
                    address: branch.CN_DiaChi,
                    openingTime: branch.CN_TGMoCua?.slice(0, 5) || '',
                    closingTime: branch.CN_TGDongCua?.slice(0, 5) || '',
                    isMotorPark: branch.CN_BaiDoXeMay ? "Có" : "Không",
                    isCarPark: branch.CN_BaiDoXeOto ? "Có" : "Không",
                    hasDelivery: branch.CN_HoTroGiaoHang ? "Có" : "Không",
                    managerId: branch.CN_MaQuanLy,
                    regionId: branch.CN_MaKhuVuc,
                }));
                console.log('Transformed branches:', transformedBranches);
                setBranches(transformedBranches);
                console.log('Branches:', branches);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching branches:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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