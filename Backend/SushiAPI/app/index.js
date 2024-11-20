import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger.js';
import dishRoutes from './routes/dishRoutes.js';

const app = express()

// Body parser
app.use(bodyParser.json())

// Logger middleware
app.use(logger);

// Sử dụng route cho món ăn
app.use('/api/dishes', dishRoutes);

app.get('/', (req, res) => {
    res.json({msg: "Home Page"})
});

export default app