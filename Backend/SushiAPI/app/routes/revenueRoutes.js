import express from 'express';
import { RevenueController } from '../controllers/revenueController.js';

const router = express.Router();

// Get daily revenue
router.get('/daily', RevenueController.getDailyRevenue);

// Get monthly revenue
router.get('/monthly', RevenueController.getMonthlyRevenue);

// Get best sellers (revenue by dish)
router.get('/bestsellers', RevenueController.getBestSellers);

export default router;