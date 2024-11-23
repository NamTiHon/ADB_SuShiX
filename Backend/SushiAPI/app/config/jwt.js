import jwt from 'jsonwebtoken';

//const JWT_SECRET = process.env.JWT_SECRET;
//console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Should print 'strong-jwt-secret-key'

const JWT_SECRET = 'strong-jwt-secret-key';  // JWT secret key

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');  // Early error check
}

export const generateToken = (user) => {
    const payload = { id: user.id, email: user.email };  // Creating payload
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });  // Signing the JWT token
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);  // Verifying the JWT token
    } catch (error) {
        return null;  // Return null if token is invalid or expired
    }
};
