import express from 'express';
import { register, login, showAllUsers, UserByEmail, updateUser } from '../controllers/authController.js';

const router = express.Router();

router.get('/', showAllUsers);

router.get('/:email', UserByEmail);

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

router.put('/:email', updateUser);

export default router;
