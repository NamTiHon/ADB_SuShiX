import express from 'express';
import { DishController } from '../controllers/dishController.js';

const router = express.Router();

// Lấy danh sách món ăn
router.get('/', DishController.getDishes);

// Thêm món ăn mới
router.post('/', DishController.addDish);

// Cập nhật món ăn
router.put('/:dishId', DishController.updateDish);

// Xóa món ăn
router.delete('/:dishId', DishController.deleteDish);

export default router;
