import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger.js'

const app = express()

// Body parser
app.use(bodyParser.json())

// Logger middleware
app.use(logger);


app.get('/', (req, res) => {
    res.json({msg: "Home Page"})
});

export default app