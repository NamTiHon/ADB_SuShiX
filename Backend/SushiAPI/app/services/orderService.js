import sql from 'mssql';
import conn from '../config/db.js';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export const orderService = {
    //Lập phiếu đặt trực tiếp
    makeDirectOrder: async (orderData) => {
        const { PDM_SDT_KH, PDM_SoBan , PDM_SoLuongKH, PDM_MaNhanVien, PDM_MaChiNhanh, PDM_GhiChuThem, PDM_MaPhieu } = orderData

        const now = dayjs();
        const PDM_ThoiGianDat = now.format('YYYY-MM-DD HH:mm:ss')

        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), PDM_MaPhieu)
                .input('ThoiGianDat', sql.DateTime, PDM_ThoiGianDat)
                .input('SDT_KH', sql.VarChar(12), PDM_SDT_KH)
                .input('SoBan', sql.Int, PDM_SoBan)
                .input('SoLuongKH', sql.Int, PDM_SoLuongKH)
                .input('MaNhanVien', sql.VarChar(12), PDM_MaNhanVien)
                .input('MaChiNhanh', sql.VarChar(12), PDM_MaChiNhanh)
                .input('GhiChuThem', sql.NVarChar(100), PDM_GhiChuThem)
                .execute('usp_TaoPhieuDatMon')

            const OrderID = result.output.PDM_MaPhieu

            // Trả về kết quả thành công
            return {
                success: true,
                message: 'Direct order created successfully',
                OrderID
            };

        } catch (error) {
            console.error('Error create order:', error);
            throw new Error('Failed to create order.');
        }
    },

    //Lập phiếu đặt trước
    makeReserveOrder: async (orderData) => {
        const { PDM_MaPhieu, PDM_SDT_KH, PDM_SoBan , PDM_SoLuongKH ,  PDM_ThoiGianDen , PDM_MaChiNhanh ,PDM_MaNhanVien, PDM_GhiChuThem } = orderData

        const now = dayjs();
        const PDM_ThoiGianDat = now.format('YYYY-MM-DD HH:mm:ss')


        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), PDM_MaPhieu)
                .input('ThoiGianDat', sql.DateTime, PDM_ThoiGianDat)
                .input('SDT_KH', sql.VarChar(12), PDM_SDT_KH)
                .input('SoBan', sql.Int, PDM_SoBan)
                .input('SoLuongKH', sql.Int, PDM_SoLuongKH)
                .input('ThoiGianDen', sql.DateTime, PDM_ThoiGianDen)
                .input('MaChiNhanh', sql.VarChar(12), PDM_MaChiNhanh)
                .input('MaNhanVien', sql.VarChar(12), PDM_MaNhanVien)
                .input('GhiChuThem', sql.NVarChar(100), PDM_GhiChuThem)
                .execute('usp_TaoPhieuDatMon')

            const OrderID = result.output.PDM_MaPhieu

            // Trả về kết quả thành công
            return {
                success: true,
                message: 'Reserve order created successfully',
                OrderID
            };

        } catch (error) {
            console.error('Error create order:', error);
            throw new Error('Failed to create order.');
        }
    },

    //Lập phiếu đặt trước
    makeOnlineOrder: async (orderData) => {
        const { PDM_MaPhieu, PDM_SDT_KH, PDM_MaNhanVien, PDM_DiaChiCanGiao, PDM_MaChiNhanh, PDM_GhiChuThem } = orderData

        const now = dayjs();
        const PDM_ThoiGianDat = now.format('YYYY-MM-DD HH:mm:ss')
    
    
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), PDM_MaPhieu)
                .input('ThoiGianDat', sql.DateTime, PDM_ThoiGianDat)
                .input('SDT_KH', sql.VarChar(12), PDM_SDT_KH)
                .input('MaNhanVien', sql.VarChar(12), PDM_MaNhanVien)
                .input('MaChiNhanh', sql.VarChar(12), PDM_MaChiNhanh)
                .input('DiaChiGiao', sql.NVarChar(100), PDM_DiaChiCanGiao)
                .input('GhiChuThem', sql.NVarChar(100), PDM_GhiChuThem)
                .execute('usp_TaoPhieuDatMon')
            console.log(result);
            // Trả về kết quả thành công
            return {
                success: true,
                message: 'Online order created successfully',
            };
    
        } catch (error) {
            console.error('Error create order:', error);
            throw new Error('Failed to create order.');
        }
    },
    updateTableOrder: async (orderData) => {
        const { PDM_MaPhieu, PDM_SoBan } = orderData;

        try {
            const pool = await conn;
            await pool.request()
                .input('PDM_MaPhieu', sql.VarChar(12), PDM_MaPhieu)
                .input('PDM_SoBan', sql.Int, PDM_SoBan)
                .query('UPDATE PhieuDatMon SET PDM_SoBan = @PDM_SoBan WHERE PDM_MaPhieu = @PDM_MaPhieu');

            return {
                success: true,
                message: 'Reservation updated successfully',
                data: {
                    PDM_MaPhieu,
                    PDM_SoBan
                }
            };

        } catch (error) {
            console.error('Error updating reservation:', error);
            throw new Error('Failed to update reservation.');
        }
    },


    //Lập phiếu đặt món mới
    // makeOrder: async (orderData) => {
    //     const { PDM_SDT_KH, PDM_SoBan , PDM_SoLuongKH ,  PDM_ThoiGianDen , PDM_DiaChiCanGiao , PDM_MaChiNhanh ,PDM_MaNhanVien, PDM_GhiChuThem } = orderData

    //     const now = dayjs();
    //     const PDM_ThoiGianDat = now.format('YYYY-MM-DD HH:mm:ss')

    //     const uuid = uuidv4();
    //     const PDM_MaPhieu = uuid.replace(/-/g, '').slice(0, 10);


    //     try {
    //         const pool = await conn;
    //         const result = await pool.request()
    //             .input('MaPhieu', sql.VarChar(12), PDM_MaPhieu)
    //             .input('ThoiGianDat', sql.DateTime, PDM_ThoiGianDat)
    //             .input('SDT_KH', sql.VarChar(12), PDM_SDT_KH)
    //             .input('SoBan', sql.Int, PDM_SoBan)
    //             .input('SoLuongKH', sql.Int, PDM_SoLuongKH)
    //             .input('ThoiGianDen', sql.DateTime, PDM_ThoiGianDen)
    //             .input('DiaChiGiao', sql.NVarChar(100), PDM_DiaChiCanGiao)
    //             .input('MaChiNhanh', sql.VarChar(12), PDM_MaChiNhanh)
    //             .input('MaNhanVien', sql.VarChar(12), PDM_MaNhanVien)
    //             .input('GhiChuThem', sql.NVarChar(100), PDM_GhiChuThem)
    //             .execute('sp_TaoPhieuDatMon')

    //         const OrderID = result.output.PDM_MaPhieu

    //         // Trả về kết quả thành công
    //         return {
    //             success: true,
    //             message: 'Order created successfully',
    //             OrderID
    //         };

    //     } catch (error) {
    //         console.error('Error create order:', error);
    //         throw new Error('Failed to create order.');
    //     }
    // },

    //Đặt món cho phiếu đặt món
    orderDishes: async (item) => {
            const { MDD_MaMon, MDD_MaPhieu, MDD_SoLuong } = item;
            console.log (item);
            try {
                const pool = await conn;
                const result = await pool.request()
                    .input('MaMon', sql.VarChar(12), MDD_MaMon)
                    .input('MaPhieu', sql.VarChar(12), MDD_MaPhieu)
                    .input('SoLuong', sql.Int, MDD_SoLuong)
                    .execute('usp_ThemMonDuocDat')

                console.log(result);
                // Trả về kết quả thành công
                return {
                    success: true,
                    message: 'Order dish successfully',
                };

            } catch (error) {
                console.error('Error order dish:', error);
                throw new Error('Failed to order dish.');
            }
    },

    // Thay đổi thông tin phiếu đặt món
    updateDishes: async (MaPhieu, updates) => {
        for (const item of updates) {

            const { MaMon, update_SoLuong } = item

            try {
                const pool = await conn;
                const result = await pool.request()
                    .input('MaMon', sql.VarChar(12), MaMon)
                    .input('MaPhieu', sql.VarChar(12), MaPhieu)
                    .input('SoLuong', sql.Int, update_SoLuong)
                    .execute('usp_ThayDoiSoLuongMon')

                // Trả về kết quả thành công
                return {
                    success: true,
                    message: 'Delete dish successfully',
                };

            } catch (error) {
                console.error('Error delete dish:', error);
                throw new Error('Failed to delete dish.');
            }
        }
    },

    // Xóa món ăn được đặt
    deleteDishes: async (MaPhieu, deletes) => {
        for (const item of deletes) {

            const { MaMon } = item

            try {
                const pool = await conn;
                await pool.request()
                    .input('MaMon', sql.VarChar(12), MaMon)
                    .input('MaPhieu', sql.VarChar(12), MaPhieu)
                    .execute('sp_HuyMon')
                return { success: true }

            } catch (error) {
                console.error('Error order dish:', error);
                throw new Error('Failed to order dish.');
            }
        }
    },

    deleteOrder: async (MaPhieu) => {
        try {
            const pool = await conn;
            await pool.request()
                .input('MaPhieu', sql.VarChar(12), MaPhieu)
                .execute('usp_HuyPhieuDatMon')
            return { success: true }

        } catch (error) {
            console.error('Error delete order:', error);
            throw new Error('Failed to delete order.');
        }

    },

    // Lấy danh sách các món ăn trong phiếu đặt món
    getOrder: async (MaPhieu) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), MaPhieu)
                .query(`
                    SELECT * 
                    FROM dbo.uf_XemPhieuDatMon(@MaPhieu)
                `);
            return result.recordset; // Trả về undefined nếu không tìm thấy món
        } catch (error) {
            console.error('Error fetching dish by MaPhieu:', error);
            throw new Error('Failed to fetch dish');
        }
    },
    // Lấy riêng phiếu đặt món
    getOrderByID: async (MaPhieu) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), MaPhieu)
                .query(`
                    SELECT * 
                    FROM PhieuDatMon
                    where PDM_MaPhieu = @MaPhieu
                `);
            return result.recordset; // Trả về undefined nếu không tìm thấy món
        } catch (error) {
            console.error('Error fetching dish by MaPhieu:', error);
            throw new Error('Failed to fetch dish');
        }
    },
    
    // Lấy toàn bộ phiếu đặt món:
    getAllOrders: async () => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .query(`
                    SELECT * 
                    FROM PhieuDatMon join MonDuocDat on PhieuDatMon.PDM_MaPhieu = MonDuocDat.MDD_MaPhieu
                `);
            return result.recordset;
        } catch (error) {
            console.error('Error fetching all orders:', error);
            throw new Error('Failed to fetch all orders');
        }
    },
    cancelOrder: async (MaPhieu) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), MaPhieu)
                .query(`
                    UPDATE PhieuDatMon 
                    SET PDM_TrangThai = N'Đã hủy'
                    WHERE PDM_MaPhieu = @MaPhieu
                `);

            if (result.rowsAffected[0] === 0) {
                throw new Error('Order not found');
            }

            return {
                success: true,
                message: 'Order cancelled successfully',
                orderID: MaPhieu
            };

        } catch (error) {
            console.error('Error cancelling order:', error);
            throw new Error('Failed to cancel order');
        }
    },

    getOrderByPhone: async (SDT_KH) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('SDT_KH', sql.VarChar(12), SDT_KH)
                .query(`
                    SELECT * 
                    FROM PhieuDatMon
                    WHERE PDM_SDT_KH = @SDT_KH
                `);
            return result.recordset;
        } catch (error) {
            console.error('Error fetching order by phone:', error);
            throw new Error('Failed to fetch order')
        }
    },

    updateOrderStatus: async (MaPhieu, newStatus) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaPhieu', sql.VarChar(12), MaPhieu)
                .input('TrangThai', sql.NVarChar(50), newStatus)
                .query(`
                    UPDATE PhieuDatMon 
                    SET PDM_TrangThai = @TrangThai
                    WHERE PDM_MaPhieu = @MaPhieu
                `);
    
            if (result.rowsAffected[0] === 0) {
                throw new Error('Order not found');
            }
    
            return {
                success: true,
                message: 'Order status updated successfully',
                orderID: MaPhieu
            };
    
        } catch (error) {
            console.error('Error updating order status:', error);
            throw new Error('Failed to update order status');
        }
    },
};