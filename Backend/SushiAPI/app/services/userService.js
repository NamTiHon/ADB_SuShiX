import sql from 'mssql';
import conn from '../config/db.js';
import bcrypt from 'bcryptjs';

export const userService = {
    // Lấy danh sách tất cả người dùng
    getAllUsers: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query('SELECT * FROM KhachHang join TheThanhVien on KhachHang.KH_SDT = TheThanhVien.TTV_SDT_KH');
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
                .query(`
                    SELECT KhachHang.* , TheThanhVien.TTV_LoaiThe, TheThanhVien.TTV_DiemTichLuy, 
                    FORMAT(TheThanhVien.TTV_NgayTao, 'yyyy-MM-dd') AS TTV_NgayTao
                    FROM KhachHang join TheThanhVien on KhachHang.KH_SDT = TheThanhVien.TTV_SDT_KH
                    WHERE KH_Email = @Email
                `);
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
            const existingUser = await userService.findUserByEmail(KH_Email);
            if (existingUser) {
                return { success: false, message: 'User already exists' };
            }
            console.log(KH_SDT);
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

    updateUser: async (email, updates) => {
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                throw new Error(`Invalid email format: ${email}`);
            }
    
            if (!updates || typeof updates !== 'object') {
                throw new Error('Invalid updates parameter');
            }
    
            const pool = await conn;
            let query = 'UPDATE KhachHang SET ';
            const inputs = [];
    
            // Validate and add update fields
            if (updates.KH_HoTen !== undefined) {
                query += 'KH_HoTen = @KH_HoTen, ';
                inputs.push({ name: 'KH_HoTen', type: sql.NVarChar(sql.MAX), value: updates.KH_HoTen });
            }
            
            if (updates.KH_GioiTinh !== undefined) {
                query += 'KH_GioiTinh = @KH_GioiTinh, ';
                inputs.push({ name: 'KH_GioiTinh', type: sql.NVarChar(sql.MAX), value: updates.KH_GioiTinh });
            }
            
            if (updates.KH_CCCD !== undefined) {
                query += 'KH_CCCD = @KH_CCCD, ';
                inputs.push({ name: 'KH_CCCD', type: sql.NVarChar(sql.MAX), value: updates.KH_CCCD });
            }
    
            if (inputs.length === 0) {
                throw new Error('No valid fields to update');
            }
    
            // Finalize query
            query = query.slice(0, -2);
            query += ' OUTPUT inserted.* WHERE KH_Email = @Email';
    
            // Execute query
            const request = pool.request();
            inputs.forEach(input => request.input(input.name, input.type, input.value));
            request.input('Email', sql.NVarChar(100), email);
    
            const result = await request.query(query);
    
            if (!result.recordset[0]) {
                throw new Error(`User not found with email: ${email}`);
            }
    
            return result.recordset[0];
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // Preserve original error
        }
    },
};