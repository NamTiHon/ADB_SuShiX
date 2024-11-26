import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './middleware/logger.js';
import dishRoutes from './routes/dishRoutes.js';
import authRoutes from './routes/authRoutes.js';  // Import các route của auth

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));
app.use(cors());


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