import express from 'express';
import cors from 'cors';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import dishRoutes from './routes/dishRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));
app.use(cors());
app.use(logger);

app.use('/api/dishes', dishRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({msg: "Home Page"})
});

// Error Handler
app.use(errorHandler);

export default app