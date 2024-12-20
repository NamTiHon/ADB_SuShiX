import express from 'express';
import { staffController } from '../controllers/staffController.js';

const router = express.Router();

// Cập nhật route để chấp nhận các tham số page và limit
router.get('/', staffController.ShowAllStaffs);

export default router;