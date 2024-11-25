import { userService } from '../services/userService.js';
import { authService } from '../services/authService.js';

// Hiển thị danh sách user
export const showAllUsers = (req, res) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json({ message: 'List of all users', users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Đăng ký user mới
export const register = async (req, res) => {
    const { email, password, name, role } = req.body;

    try {
        const result = await userService.registerUser(email, password, name, role);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(201).json({ message: 'User created successfully', user: result.user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Đăng nhập user
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const result = await authService.loginUser(email, password);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.json({ message: 'Login successful', token: result.token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
