import jwt from 'jsonwebtoken';

// The secret key for signing the JWT tokens, should be stored in an environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate JWT token
export const generateToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });  // Token expires in 1 hour
};

// Function to verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);  // Verify the token using the secret
    } catch (error) {
        return null;  // Return null if token is invalid or expired
    }
};
