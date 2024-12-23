import express from 'express';
import { 
    register, 
    login, 
    showAllUsers, 
    UserByEmail, 
    updateUser, 
    changePassword 
} from '../controllers/authController.js';

const router = express.Router();

router.get('/', showAllUsers);


router.get('/:email', UserByEmail);

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

router.put('/:email', updateUser);
router.put('/user/change-password', changePassword);
export default router;
