import { userService } from './userService.js';
import { generateToken } from '../config/jwt.js';

export const authService = {
    // Xác thực thông tin đăng nhập
    loginUser: async (email, password) => {
        try {
            const user = await userService.findUserByEmail(email);
            if (!user) {
                return { success: false, message: 'Invalid credentials' };
            }

            const isMatch = await userService.verifyPassword(password, user.KH_MatKhau);
            if (!isMatch) {
                return { success: false, message: 'Invalid credentials' };
            }

            // Tạo token
            const token = generateToken(user);
            return { success: true, token, email: user.KH_Email};
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Failed to login user');
        }
    },
};
