import express from 'express';
import { orderController } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.makeOrder);
router.post('/:MaPhieu', orderController.orderDishes);
router.put('/:MaPhieu', orderController.updateDishes);
router.delete('/:MaPhieu', orderController.deleteDishes);
router.delete('/:MaPhieu', orderController.deleteOrder);
router.get('/:MaPhieu', orderController.getOrder);

export default router;
