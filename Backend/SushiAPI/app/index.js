import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './middleware/logger.js';
import dishRoutes from './routes/dishRoutes.js';
import authRoutes from './routes/authRoutes.js';  // Import các route của auth

const app = express()

app.use(express.json());  // Middleware to parse JSON bodies
app.use(cors());  // Allow cross-origin requests

// Logger middleware
app.use(logger);

// Sử dụng route cho món ăn
app.use('/api/dishes', dishRoutes);

// Đăng ký các route cho authentication
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({msg: "Home Page"})
});

export default app