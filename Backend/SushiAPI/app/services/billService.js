import sql from 'mssql';
import conn from '../config/db.js';

export const billService = {
    // Lấy danh sách tất cả hóa đơn
    getAllBills: async () => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .execute('usp_LayTatCaHoaDon');
            return result.recordset;
        } catch (error) {
            console.error('Error fetching all bills:', error);
            throw new Error('Failed to fetch bills');
        }
    },

    // Lấy hóa đơn theo số điện thoại khách hàng
    getBillsByCustomer: async (SDT_KH) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('SDT_KH', sql.VarChar(12), SDT_KH)
                .query('SELECT * FROM uf_HoaDonKhachHang(@SDT_KH)');
            return result.recordset;
        } catch (error) {
            console.error('Error fetching bills by customer:', error);
            throw new Error('Failed to fetch bills');
        }
    },

    // Lấy hóa đơn theo ngày
    getBillsByDate: async (ThoiGianDat) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('ThoiGianDat', sql.DateTime, ThoiGianDat)
                .query('SELECT * FROM uf_HoaDonTheoNgay(@ThoiGianDat)');
            return result.recordset;
        } catch (error) {
            console.error('Error fetching bills by date:', error);
            throw new Error('Failed to fetch bills');
        }
    },

    // Lấy hóa đơn theo mã
    getBillById: async (billId) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('HD_MaHoaDon', sql.VarChar(12), billId)
                .execute('usp_LayHoaDonTheoMa');
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching bill by ID:', error);
            throw new Error('Failed to fetch bill');
        }
    },

    // Tạo hóa đơn
    createBill: async (billData) => {
        const { MaHoaDon, SoTienGiam, TongTruocGiam, MaPhieu } = billData;
        try {
            const pool = await conn;
            const response = await pool.request()
                .input('MaHoaDon', sql.VarChar(12), MaHoaDon)
                .input('SoTienGiam', sql.Float, SoTienGiam)
                .input('TongTruocGiam', sql.Float, TongTruocGiam)
                .input('MaPhieu', sql.VarChar(12), MaPhieu)
                .execute('usp_TaoHoaDon');
            console.log('Bill created:', response);
            return { success: true, message: 'Hóa đơn đã được tạo thành công.' };
        } catch (error) {
            console.error('Error creating bill:', error);
            throw new Error('Failed to create bill');
        }
    },

    // Cập nhật hóa đơn
    updateBill: async (billId, updates) => {
        const { HD_SoTienGiam, HD_TongTruocGiam, HD_TongTienThanhToan, HD_MaPhieu } = updates;
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('HD_MaHoaDon', sql.VarChar(12), billId)
                .input('HD_SoTienGiam', sql.Float, HD_SoTienGiam)
                .input('HD_TongTruocGiam', sql.Float, HD_TongTruocGiam)
                .input('HD_TongTienThanhToan', sql.Float, HD_TongTienThanhToan)
                .input('HD_MaPhieu', sql.VarChar(12), HD_MaPhieu)
                .execute('usp_CapNhatHoaDon');
            return result.recordset[0];
        } catch (error) {
            console.error('Error updating bill:', error);
            throw new Error('Failed to update bill');
        }
    },

    // Xóa hóa đơn
    deleteBill: async (billId) => {
        try {
            const pool = await conn;
            await pool.request()
                .input('HD_MaHoaDon', sql.VarChar(12), billId)
                .execute('usp_XoaHoaDon');
            return true;
        } catch (error) {
            console.error('Error deleting bill:', error);
            throw new Error('Failed to delete bill');
        }
    },
};
