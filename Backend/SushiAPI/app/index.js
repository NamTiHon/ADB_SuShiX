import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import dishRoutes from './routes/dishRoutes.js';
import authRoutes from './routes/authRoutes.js';
import branchRoutes from './routes/branchRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import promotionRoutes from './routes/promotionRoutes.js';
import billRoutes from './routes/billRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));
app.use(cors());
app.use(logger);

app.use('/api/dishes', dishRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/cards', cardRoutes);
app.get('/', (req, res) => {
    res.json({ msg: "Home Page" })
});

app.use('/api/staffs', staffRoutes);
// Error Handler
app.use(errorHandler);

export default app