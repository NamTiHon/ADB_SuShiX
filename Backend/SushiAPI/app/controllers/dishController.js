import { dishService } from '../services/dishService.js';

export const dishController = {
    // Get all dishes
    getDishes: async (req, res) => {
        try {
            const dishes = await dishService.getAllDishes();
            res.status(200).json({ message: 'Dishes retrieved successfully', dishes });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single dish by MA_MaMon
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

    // Add a new dish
    addDish: async (req, res) => {
        try {
            const newDish = await dishService.addDish(req.body);
            res.status(201).json({ message: 'Dish added successfully', dish: newDish });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update an existing dish by MA_MaMon
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

    // Delete a dish by MA_MaMon
    deleteDish: async (req, res) => {
        try {
            const MA_MaMon = req.params.MA_MaMon;
            await dishService.deleteDish(MA_MaMon);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
