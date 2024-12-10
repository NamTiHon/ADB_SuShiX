import sql from 'mssql';
import conn from '../config/db.js';
import bcrypt from 'bcryptjs';

export const userService = {
    // Lấy danh sách tất cả người dùng
    getAllUsers: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query('SELECT * FROM Users');
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
                .query('SELECT * FROM Users WHERE Email = @Email');
            return result.recordset[0]; // Return the first user found
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Failed to find user');
        }
    },

    // Đăng ký user mới
    registerUser: async (email, password, name, role = 'customer') => {
        try {
            // Kiểm tra email đã tồn tại
            const existingUser = await userService.findUserByEmail(email);
            if (existingUser) {
                return { success: false, message: 'User already exists' };
            }

            const hashedPassword = await bcrypt.hash(password, 10); // Hash password

            // Thêm user mới
            const pool = await conn;
            const result = await pool.request()
                .input('Email', sql.NVarChar(100), email)
                .input('Password', sql.NVarChar(sql.MAX), hashedPassword)
                .input('Name', sql.NVarChar(100), name)
                .input('Role', sql.NVarChar(50), role)
                .query(`
                    INSERT INTO Users (Email, Password, Name, Role)
                    OUTPUT INSERTED.*
                    VALUES (@Email, @Password, @Name, @Role)
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