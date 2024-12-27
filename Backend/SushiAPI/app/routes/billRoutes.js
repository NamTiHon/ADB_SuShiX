import express from 'express';
import { getBills, getBillById, getBillsByCustomer, getBillsByDate, createBill,  updateBill, deleteBill, getBillByOrderId } from '../controllers/billController.js';

const router = express.Router();

router.get('/', getBills);
router.get('/:billId', getBillById);
router.get('/customer/:SDT_KH', getBillsByCustomer);
router.get('/date/:ThoiGianDat', getBillsByDate);
router.post('/create', createBill);
router.put('/:billId', updateBill);
router.delete('/:billId', deleteBill);
router.get('/order/:orderId', getBillByOrderId);

export default router;
