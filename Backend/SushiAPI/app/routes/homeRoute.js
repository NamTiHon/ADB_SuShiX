import express from 'express';
import { getMonthlyRevenue, getTotalCustomers, getBranchRevenue } from '../controllers/homeController.js';

const router = express.Router();

router.get('/monthly-revenue', getMonthlyRevenue);
router.get('/total-customers', getTotalCustomers);
router.get('/branch-revenue', getBranchRevenue);

export default router;