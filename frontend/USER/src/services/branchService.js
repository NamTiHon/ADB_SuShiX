export const getBranches = async () => {
    try {
        const response = await fetch(`${API_URL}/branches`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const responseData = await response.json();

        if (!responseData?.branches?.length) {
            return []; // Return empty array instead of throwing
        }

        return responseData.branches.map(branch => ({
            id: branch.CN_MaChiNhanh || '',
            name: branch.CN_Ten || '',
            address: branch.CN_DiaChi || '',
            district: branch.CN_MaKhuVuc || '',
            area: branch.KV_Ten || '',
            phone: branch.CN_SDT || '',
            openHours: branch.CN_TGMoCua && branch.CN_TGDongCua 
                ? `${branch.CN_TGMoCua.slice(0,5)} - ${branch.CN_TGDongCua.slice(0,5)}`
                : '',
            features: [
                branch.CN_BaiDoXeOto && "Bãi giữ xe ô tô",
                branch.CN_BaiDoXeMay && "Bãi giữ xe máy", 
                branch.CN_HoTroGiaoHang && "Hỗ trợ giao hàng"
            ].filter(Boolean)
        }));
    } catch (error) {
        console.error('Error fetching branches:', error);
        return []; // Return empty array on error
    }
};