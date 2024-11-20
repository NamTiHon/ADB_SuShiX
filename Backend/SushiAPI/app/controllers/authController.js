import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser, getAllUsers } from '../models/user.js';

const showAllUsers = (req, res) => {
    try {
        const users = getAllUsers();
        res.status(200).json({ message: 'List of all users', users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Register a new user
const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        // Check if user already exists
        const existingUser = getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = createUser({ email, password: hashedPassword, name });
        // Respond with the newly created user (without the password)
        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and return JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { register, login, showAllUsers };
