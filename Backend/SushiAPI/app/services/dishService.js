import sql from 'mssql';  
import conn from '../config/db.js';

export const dishService = {
    // Lấy thông tin tất cả các món ăn với danh mục của chúng
    getAllDishes: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query(`
                select * from dbo.uf_MonAnTheoChiNhanh();
            `);
            return result.recordset; // Trả về danh sách món
        } catch (error) {
            console.error('Error fetching dishes:', error);
            throw new Error('Failed to fetch dishes');
        }
    },

    // Lấy thông tin một món theo MA_MaMon
    getDishById: async (MA_MaMon) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MA_MaMon', sql.VarChar(10), MA_MaMon)
                .query(`
                    SELECT MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_TenDanhMuc
                    FROM MonAn
                    WHERE MA_MaMon = @MA_MaMon
                `);
            return result.recordset[0]; // Trả về undefined nếu không tìm thấy món
        } catch (error) {
            console.error('Error fetching dish by ID:', error);
            throw new Error('Failed to fetch dish');
        }
    },

    // Thêm một món mới
    addDish: async (dishData) => {
        try {
            const { MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_TenDanhMuc, MA_HinhAnh } = dishData;
            console.log('Adding dish:', dishData);
            const pool = await conn;
            const result = await pool.request()
                .input('MaMon', sql.VarChar(12), MA_MaMon)
                .input('TenMon', sql.NVarChar(50), MA_TenMon)
                .input('Gia', sql.Float, MA_GiaHienTai)
                .input('KhauPhan', sql.Int, MA_KhauPhan)
                .input('CoSan', sql.Bit, MA_CoSan)
                .input('HoTroGiaoHang', sql.Bit, MA_HoTroGiaoHang)
                .input('TenDanhMuc', sql.NVarChar(20), MA_TenDanhMuc)
                .input('HinhAnh', sql.NVarChar(100), MA_HinhAnh)
                .execute('usp_ThemMonAn')

            return result.recordset[0]; // Trả về món vừa thêm
        } catch (error) {
            console.error('Error adding dish:', error);
            throw new Error('Failed to add dish');
        }
    },

    // Cập nhật một món theo MA_MaMon
    updateDish: async (MA_MaMon, updates) => {
        try {
            const { MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_TenDanhMuc } = updates;
            const pool = await conn;
            const result = await pool.request()
                .input('MA_MaMon', sql.VarChar(12), MA_MaMon)
                .input('MA_TenMon', sql.NVarChar(50), MA_TenMon)
                .input('MA_GiaHienTai', sql.Float, MA_GiaHienTai)
                .input('MA_KhauPhan', sql.Int, MA_KhauPhan)
                .input('MA_CoSan', sql.Bit, MA_CoSan)
                .input('MA_HoTroGiaoHang', sql.Bit, MA_HoTroGiaoHang)
                .input('MA_TenDanhMuc', sql.NVarChar(20), MA_TenDanhMuc)
                .execute('sp_ChinhSuaThongTinMonAn')

            return result.recordset[0]; // Trả về món vừa cập nhật
        } catch (error) {
            console.error('Error updating dish:', error);
            throw new Error('Failed to update dish');
        }
    },

    // Xóa món theo MA_MaMon
    deleteDish: async (MA_MaMon) => {
        try {
            const pool = await conn;
            await pool.request()
                .input('MA_MaMon', sql.VarChar(10), MA_MaMon)
                .execute('sp_XoaMonAn')
            return { success: true };
        } catch (error) {
            console.error('Error deleting dish:', error);
            throw new Error('Failed to delete dish');
        }
    },

    getOnlyDishes: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query(`
                select * from MonAn;
            `);
            return result.recordset;
        } catch (error) {
            console.error('Error fetching dishes:', error);
            throw new Error('Failed to fetch dishes');
        }
    },

    getCategory: async () => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .query(`
                    select distinct MA_TenDanhMuc from MonAn;
                `);
            return result.recordset; // Trả về danh sách món theo danh mục
        } catch (error) {
            console.error('Error fetching dishes by category:', error);
            throw new Error('Failed to fetch dishes by category');
        }
    }
};