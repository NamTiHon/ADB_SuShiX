import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser, getAllUsers } from '../models/user.js';

export const userService = {
    // Lấy thông tin tất cả users
    getAllUsers: () => {
        return getAllUsers();  // Trả về toàn bộ user (từ model giả lập)
    },

    // Tìm user theo email
    findUserByEmail: (email) => {
        return getUserByEmail(email);  // Tìm user qua email (model giả lập)
    },

    // Tạo user mới
    registerUser: async (email, password, name, role) => {
        const existingUser = getUserByEmail(email);
        if (existingUser) {
            return { success: false, message: 'User already exists' };  // Nếu email đã tồn tại
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu user mới
        const newUser = createUser({ email, password: hashedPassword, name, role });
        return { success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } };
    },

    // Kiểm tra mật khẩu
    verifyPassword: async (inputPassword, hashedPassword) => {
        return await bcrypt.compare(inputPassword, hashedPassword);  // So sánh mật khẩu
    },
};
