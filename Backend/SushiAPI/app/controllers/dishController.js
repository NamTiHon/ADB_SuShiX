import { dishService } from '../services/dishService.js';

export const dishController = {

    // @desc   Lấy toàn bộ các món ăn
    // @route  GET /api/dishes
    getDishes: async (req, res) => {
        try {
            const dishes = await dishService.getAllDishes();
            res.status(200).json({ message: 'Dishes retrieved successfully', dishes });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Lấy một món theo MA_MaMon
    // @route  GET /api/dishes/:MA_MaMon
    getDishById: async (req, res) => {
        try {
            const MA_MaMon = req.params.MA_MaMon;
            const dish = await dishService.getDishById(MA_MaMon);
            if (!dish) {
                return res.status(404).json({ message: `Dish with ID ${MA_MaMon} not found` });
            }
            res.status(200).json({ message: 'Dish retrieved successfully', dish });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Thêm một món mới
    // @route   POST /api/dishes
    addDish: async (req, res) => {
        try {
            const newDish = await dishService.addDish(req.body);
            console.log('Dish added:', newDish);
            res.status(201).json({ message: 'Dish added successfully', dish: newDish });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Cập nhật món theo MA_MaMon
    // @route   PUT /api/dishes/:MA_MaMon
    updateDish: async (req, res) => {
        try {
            const MA_MaMon = req.params.MA_MaMon;
            const updatedDish = await dishService.updateDish(MA_MaMon, req.body);
            if (!updatedDish) {
                return res.status(404).json({ message: `Dish with ID ${MA_MaMon} not found` });
            }
            res.status(200).json({ message: 'Dish updated successfully', dish: updatedDish });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Xóa món theo MA_MaMon
    // @route   DELETE /api/dishes/:MA_MaMon
    deleteDish: async (req, res) => {
        try {
            const MA_MaMon = req.params.MA_MaMon;
            await dishService.deleteDish(MA_MaMon);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getOnlyDishes: async (req, res) => {
        try {
            const dishes = await dishService.getOnlyDishes();
            res.status(200).json({ message: 'Dishes retrieved successfully', dishes });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCategory: async (req, res) => {
        try {
            const category = await dishService.getCategory();
            res.status(200).json({ message: 'Category retrieved successfully', category });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};