import app from './app/index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000; 

console.log(PORT);

console.log('PORT:', PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});