import express from 'express';
import { register } from '../controllers/cardController.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

export default router;