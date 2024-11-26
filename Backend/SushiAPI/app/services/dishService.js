import sql from 'mssql';  // Import the sql module from mssql
import conn from '../config/db.js';

export const dishService = {
    // Get all dishes with category details
    getAllDishes: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query(`
                SELECT MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc, DM_TenDanhMuc
                FROM MonAn
                LEFT JOIN DanhMuc ON MonAn.MA_MaDanhMuc = DanhMuc.DM_MaDanhMuc
            `);
            return result.recordset; // Return all dishes with category details
        } catch (error) {
            console.error('Error fetching dishes:', error);
            throw new Error('Failed to fetch dishes');
        }
    },

    // Get a single dish by MA_MaMon
    getDishById: async (MA_MaMon) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MA_MaMon', sql.VarChar(10), MA_MaMon)
                .query(`
                    SELECT MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc, DM_TenDanhMuc
                    FROM MonAn
                    LEFT JOIN DanhMuc ON MonAn.MA_MaDanhMuc = DanhMuc.DM_MaDanhMuc
                    WHERE MA_MaMon = @MA_MaMon
                `);
            return result.recordset[0]; // Return single dish or undefined if not found
        } catch (error) {
            console.error('Error fetching dish by ID:', error);
            throw new Error('Failed to fetch dish');
        }
    },

    // Add a new dish
    addDish: async (dishData) => {
        try {
            const { MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc } = dishData;
            const pool = await conn;
            const result = await pool.request()
                .input('MA_MaMon', sql.VarChar(10), MA_MaMon)
                .input('MA_TenMon', sql.NVarChar(50), MA_TenMon)
                .input('MA_GiaHienTai', sql.Float, MA_GiaHienTai)
                .input('MA_KhauPhan', sql.Int, MA_KhauPhan)
                .input('MA_CoSan', sql.Bit, MA_CoSan)
                .input('MA_HoTroGiaoHang', sql.Bit, MA_HoTroGiaoHang)
                .input('MA_MaDanhMuc', sql.VarChar(10), MA_MaDanhMuc)
                .query(`
                    INSERT INTO MonAn (MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc)
                    OUTPUT INSERTED.*
                    VALUES (@MA_MaMon, @MA_TenMon, @MA_GiaHienTai, @MA_KhauPhan, @MA_CoSan, @MA_HoTroGiaoHang, @MA_MaDanhMuc)
                `);
            return result.recordset[0]; // Return the inserted dish
        } catch (error) {
            console.error('Error adding dish:', error);
            throw new Error('Failed to add dish');
        }
    },

    // Update a dish by MA_MaMon
    updateDish: async (MA_MaMon, updates) => {
        try {
            const { MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc } = updates;
            const pool = await conn;
            const result = await pool.request()
                .input('MA_MaMon', sql.VarChar(10), MA_MaMon)
                .input('MA_TenMon', sql.NVarChar(50), MA_TenMon)
                .input('MA_GiaHienTai', sql.Float, MA_GiaHienTai)
                .input('MA_KhauPhan', sql.Int, MA_KhauPhan)
                .input('MA_CoSan', sql.Bit, MA_CoSan)
                .input('MA_HoTroGiaoHang', sql.Bit, MA_HoTroGiaoHang)
                .input('MA_MaDanhMuc', sql.VarChar(10), MA_MaDanhMuc)
                .query(`
                    UPDATE MonAn
                    SET MA_TenMon = @MA_TenMon, MA_GiaHienTai = @MA_GiaHienTai, MA_KhauPhan = @MA_KhauPhan,
                        MA_CoSan = @MA_CoSan, MA_HoTroGiaoHang = @MA_HoTroGiaoHang, MA_MaDanhMuc = @MA_MaDanhMuc
                    WHERE MA_MaMon = @MA_MaMon
                    SELECT * FROM MonAn WHERE MA_MaMon = @MA_MaMon
                `);
            return result.recordset[0]; // Return the updated dish
        } catch (error) {
            console.error('Error updating dish:', error);
            throw new Error('Failed to update dish');
        }
    },

    // Delete a dish by MA_MaMon
    deleteDish: async (MA_MaMon) => {
        try {
            const pool = await conn;
            await pool.request()
                .input('MA_MaMon', sql.VarChar(10), MA_MaMon)
                .query('DELETE FROM MonAn WHERE MA_MaMon = @MA_MaMon');
            return { success: true };
        } catch (error) {
            console.error('Error deleting dish:', error);
            throw new Error('Failed to delete dish');
        }
    }
};
