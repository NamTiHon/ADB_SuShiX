import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');  // Early error check
}

export const generateToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role };  // Creating payload
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });  // Signing the JWT token
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);  // Verifying the JWT token
    } catch (error) {
        return null;  // Return null if token is invalid or expired
    }
};
