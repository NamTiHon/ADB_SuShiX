import { userService } from '../services/userService.js';
import { authService } from '../services/authService.js';

// Hiển thị danh sách tất cả user (test)
export const showAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: 'List of all users', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const UserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User found', user });
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Đăng ký user mới
export const register = async (req, res) => {
    const { KH_SDT, KH_HoTen, KH_CCCD, KH_Email, KH_GioiTinh, KH_MatKhau } = req.body;
    try {
        const result = await userService.registerUser(KH_SDT, KH_HoTen, KH_CCCD, KH_Email, KH_GioiTinh, KH_MatKhau);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(201).json({ message: 'User created successfully', user: result.user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Đăng nhập user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const result = await authService.loginUser(email, password);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.json({ message: 'Login successful', token: result.token, email: result.email });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const email = req.params.email;
        const updates = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const updatedUser = await userService.updateUser(email, updates);

        res.json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(error.status || 500).json({ 
            message: 'Error updating user',
            error: error.message 
        });
    }
};
// Add to authController
// ...existing code...

export const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await userService.changePassword(email, oldPassword, newPassword);

        res.json({ 
            success: true,
            message: 'Password changed successfully' 
        });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const updateUserFollowingSDT = async (req, res) => {
    try {
        const KH_SDT = req.params.KH_SDT;
        const updatedUser = await userService.updateUserFollowingSDT(KH_SDT, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: `Cannot update user ${KH_SDT}` });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
