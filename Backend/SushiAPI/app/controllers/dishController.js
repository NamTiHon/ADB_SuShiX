import { dishService } from '../services/dishService.js';

export class DishController {
    // @desc   Get all dishes
    // @route  GET /api/dishes
    static async getDishes(req, res) {
        try {
            const allDishes = dishService.getAllDishes();
            res.status(200).json(allDishes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve dishes', error: error.message });
        }
    }

    // @desc   Get a single dish
    // @route  GET /api/dishes/:dishId
    static async getDish(req, res) {
        try {
            const dishId = parseInt(req.params.dishId);
            const dish = dishService.getDishById(dishId);
            res.status(200).json(dish);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // @desc    Create new dish
    // @route   POST /api/dishes
    static async addDish(req, res) {
        try {
            const newDish = req.body; // Nhận dữ liệu từ request
            const addedDish = dishService.addDish(newDish); // Gọi service để thêm
            res.status(201).json(addedDish);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // @desc    Update dish
    // @route   PUT /api/dishes/:dishId
    static async updateDish(req, res) {
        try {
            const dishId = parseInt(req.params.dishId);
            const updates = req.body; // Dữ liệu cập nhật từ request
            const updatedDish = dishService.updateDish(dishId, updates); // Gọi service để cập nhật
            res.status(200).json(updatedDish);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // @desc    Delete dish
    // @route   DELETE /api/dishes/:dishId
    static async deleteDish(req, res) {
        try {
            const dishId = parseInt(req.params.dishId);
            dishService.deleteDish(dishId); // Gọi service để xóa
            res.status(204).send(); // Không trả về dữ liệu
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
