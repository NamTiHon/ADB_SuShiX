import sql from 'mssql';
import conn from '../config/db.js';

export const promotionService = {
    // Lấy thông tin tất cả các khuyến mãi
    getPromotions: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query(`
                SELECT KM_MaKhuyenMai, KM_TenKhuyenMai, MA_TenMon, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh
                FROM KhuyenMai
            `);
            return result.recordset; // Trả về danh sách khuyến mãi
        } catch (error) {
            console.error('Error fetching promotions:', error);
            throw new Error('Failed to fetch promotions');
        }
    },

    // Lấy thông tin một khuyến mãi theo KM_MaKhuyenMai
    getPromotionById: async (KM_MaKhuyenMai) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MA_MaMon', sql.VarChar(10), KM_MaKhuyenMai)
                .query(`
                    SELECT KM_MaKhuyenMai, KM_TenKhuyenMai, MA_TenMon, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh
                    FROM KhuyenMai
                    WHERE KM_MaKhuyenMai = @KM_MaKhuyenMai
                `);
            return result.recordset[0]; // Trả về undefined nếu không tìm thấy khuyến mãi
        } catch (error) {
            console.error('Error fetching promotion by ID:', error);
            throw new Error('Failed to fetch promotion');
        }
    },
    // Thêm một khuyến mãi mới
    addPromotion: async (promotionData) => {
        try {
            const { KM_MaKhuyenMai, KM_TenKhuyenMai, MA_TenMon, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh } = promotionData;
            const pool = await conn;
            const result = await pool.request()
                .input('KM_MaKhuyenMai', sql.VarChar(10), KM_MaKhuyenMai)
                .input('KM_TenKhuyenMai', sql.NVarChar(50), KM_TenKhuyenMai)
                .input('KM_TenSuKien', sql.NVarChar(50), KM_TenSuKien)
                .input('KM_TyLeGiamGia', sql.Float, KM_TyLeGiamGia)
                .input('KM_LoaiTheApDung', sql.NVarChar(50), KM_LoaiTheApDung)
                .input('KM_MaChiNhanh', sql.VarChar(10), KM_MaChiNhanh)
                .query(`
                    INSERT INTO KhuyenMai (KM_MaKhuyenMai, KM_TenKhuyenMai, MA_TenMon, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh)
                    OUTPUT INSERTED.*
                    VALUES (@KM_MaKhuyenMai, @KM_TenKhuyenMai, @MA_TenMon, @KM_TenSuKien, @KM_TyLeGiamGia, @KM_LoaiTheApDung, @KM_MaChiNhanh)
                `);
            return result.recordset[0]; // Trả về khuyến mãi vừa thêm
        } catch (error) {
            console.error('Error adding promotion:', error);
            throw new Error('Failed to add promotion');
        }
    },
    // Cập nhật một khuyến mãi theo KM_MaKhuyenMai
    updatePromotion: async (KM_MaKhuyenMai, updates) => {
        try {
            const { KM_TenKhuyenMai, MA_TenMon, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh } = updates;
            const pool = await conn;
            const result = await pool.request()
                .input('KM_MaKhuyenMai', sql.VarChar(10), KM_MaKhuyenMai)
                .input('KM_TenKhuyenMai', sql.NVarChar(50), KM_TenKhuyenMai)
                .input('KM_TenSuKien', sql.NVarChar(50), KM_TenSuKien)
                .input('KM_TyLeGiamGia', sql.Float, KM_TyLeGiamGia)
                .input('KM_LoaiTheApDung', sql.NVarChar(50), KM_LoaiTheApDung)
                .input('KM_MaChiNhanh', sql.VarChar(10), KM_MaChiNhanh)
                .query(`
                    UPDATE KhuyenMai
                    SET KM_TenKhuyenMai = @KM_TenKhuyenMai, KM_TenSuKien = @MKM_TenSuKien,
                    KM_TyLeGiamGia = @KM_TyLeGiamGia, KM_LoaiTheApDung = @KM_LoaiTheApDung, KM_MaChiNhanh = @ KM_MaChiNhanh
                    WHERE KM_MaKhuyenMai = @KM_MaKhuyenMai
                    SELECT * FROM KhuyenMai WHERE KM_MaKhuyenMai = @KM_MaKhuyenMai
                `);
            return result.recordset[0]; // Trả về khuyến mãi vừa cập nhật
        } catch (error) {
            console.error('Error updating promotion:', error);
            throw new Error('Failed to update promotion');
        }
    },

    // Xóa khuyến mãi theo KM_MaKhuyenMai
    deletePromotion: async (KM_MaKhuyenMai) => {
        try {
            const pool = await conn;
            await pool.request()
                .input('KM_MaKhuyenMai', sql.VarChar(10), KM_MaKhuyenMai)
                .query('DELETE FROM KhuyenMai WHERE KM_MaKhuyenMai = @KM_MaKhuyenMai');
            return { success: true };
        } catch (error) {
            console.error('Error deleting promotion:', error);
            throw new Error('Failed to delete promotion');
        }
    }
}