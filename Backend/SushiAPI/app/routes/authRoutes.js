import express from 'express';
import { register, login, showAllUsers, findUserByEmail } from '../controllers/authController.js';

const router = express.Router();

router.get('/', showAllUsers);

router.get('/:email', findUserByEmail);

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

export default router;
