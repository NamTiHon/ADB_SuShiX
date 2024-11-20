import express from 'express';
import { register, login, showAllUsers } from '../controllers/authController.js';

const router = express.Router();

router.get('/', showAllUsers);

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

export default router;
