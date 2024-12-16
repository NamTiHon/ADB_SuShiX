import sql from 'mssql';
import conn from '../config/db.js';
import bcrypt from 'bcryptjs';

export const userService = {
    // Lấy danh sách tất cả người dùng
    getAllUsers: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query('SELECT * FROM KhachHang');
            return result.recordset; // Return list of users
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Failed to fetch users');
        }
    },

    // Tìm user theo email
    findUserByEmail: async (email) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('Email', sql.NVarChar(100), email)
                .query('SELECT * FROM KhachHang WHERE KH_Email = @Email');
            return result.recordset[0]; // Return the first user found
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Failed to find user');
        }
    },

    // Đăng ký user mới
    registerUser: async (KH_SDT, KH_HoTen, KH_CCCD, KH_Email, KH_GioiTinh, KH_MatKhau) => {
        try {
            // Kiểm tra email đã tồn tại
            const existingUser = await userService.findUserByEmail(email);
            if (existingUser) {
                return { success: false, message: 'User already exists' };
            }

            const hashedPassword = await bcrypt.hash(KH_MatKhau, 10); // Hash password

            // Thêm user mới
            const pool = await conn;
            const result = await pool.request()
                .input('KH_SDT', sql.NVarChar(100), KH_SDT)
                .input('KH_MatKhau', sql.NVarChar(sql.MAX), hashedPassword)
                .input('KH_HoTen', sql.NVarChar(sql.MAX), KH_HoTen)
                .input('KH_CCCD', sql.NVarChar(sql.MAX), KH_CCCD)
                .input('KH_Email', sql.NVarChar(sql.MAX), KH_Email)
                .input('KH_GioiTinh', sql.NVarChar(sql.MAX), KH_GioiTinh)
                .query(`
                    INSERT INTO KhachHang (KH_SDT, KH_MatKhau, KH_HoTen, KH_CCCD, KH_Email, KH_GioiTinh)
                    OUTPUT inserted.*
                    values (@KH_SDT, @KH_MatKhau, @KH_HoTen, @KH_CCCD, @KH_Email, @KH_GioiTinh)
                `);

            return { success: true, user: result.recordset[0] }; // Return new user
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Failed to register user');
        }
    },

    // Kiểm tra mật khẩu
    verifyPassword: async (inputPassword, hashedPassword) => {
        return await bcrypt.compare(inputPassword, hashedPassword);
    },
};