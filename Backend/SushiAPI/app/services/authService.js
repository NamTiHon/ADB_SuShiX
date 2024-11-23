import { userService } from './userService.js';
import { generateToken, verifyToken } from '../config/jwt.js';

export const authService = {
    // Xác thực thông tin đăng nhập
    loginUser: async (email, password) => {
        const user = userService.findUserByEmail(email);
        if (!user) {
            return { success: false, message: 'Invalid credentials' };  // User không tồn tại
        }

        // Kiểm tra mật khẩu
        const isMatch = await userService.verifyPassword(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid credentials' };  // Mật khẩu không khớp
        }

        // Tạo token nếu thông tin hợp lệ
        const token = generateToken(user);
        return { success: true, token };
    }
};
