import express from 'express';
import { orderController } from '../controllers/orderController.js';

const router = express.Router();

router.post('/direct', orderController.makeDirectOrder);
router.post('/reserve', orderController.makeReserveOrder);
router.post('/online', orderController.makeOnlineOrder);
router.post('/dishes', orderController.orderDishes);

router.put('/:MaPhieu', orderController.updateDishes);
router.delete('/:MaPhieu', orderController.deleteDishes);
router.delete('/:MaPhieu', orderController.deleteOrder);
router.get('/:MaPhieu', orderController.getOrder);
router.put('/table/:PDM_MaPhieu', orderController.updateReservation);
router.get('/id/:PDM_MaPhieu', orderController.getOrderByID);
router.get('/', orderController.getAllOrders);
export default router;
