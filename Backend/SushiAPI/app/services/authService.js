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

            const isMatch = await userService.verifyPassword(password, user.Password);
            if (!isMatch) {
                return { success: false, message: 'Invalid credentials' };
            }

            // Tao token
            const token = generateToken(user);
            return { success: true, token };
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error('Failed to login user');
        }
    },
};
