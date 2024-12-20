import sql from 'mssql';
import conn from '../config/db.js';

export const staffService = {
    // Lấy danh sách tất cả nhân viên với phân trang
    getAllStaffs: async () => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .query(`
                    SELECT *
                    FROM NhanVien JOIN BoPhan_NhanVien ON NhanVien.NV_MaNhanVien = BoPhan_NhanVien.BP_NV_MaNhanVien
                    ORDER BY NhanVien.NV_MaNhanVien
                `);

            return result.recordset;
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    }
};