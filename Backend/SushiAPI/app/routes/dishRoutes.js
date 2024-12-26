import express from 'express';
import { dishController } from '../controllers/dishController.js';

const router = express.Router();

router.get('/', dishController.getDishes);
router.get('/:MA_MaMon', dishController.getDishById);
router.post('/', dishController.addDish);
router.put('/:MA_MaMon', dishController.updateDish);
router.delete('/:MA_MaMon', dishController.deleteDish);
router.get('/only/dishes', dishController.getOnlyDishes);
export default router;
