import { Dish } from '../models/dish.js';

// Dữ liệu mẫu
let dishes = [
    { dishId: 1, name: 'Sushi Roll', currentPrice: 150000, portion: 2, isAvailable: true, supportsDelivery: true, categoryId: 1 },
    { dishId: 2, name: 'Sashimi Set', currentPrice: 300000, portion: 1, isAvailable: true, supportsDelivery: true, categoryId: 2 },
    { dishId: 3, name: 'Tempura', currentPrice: 120000, portion: 2, isAvailable: false, supportsDelivery: false, categoryId: 3 },
];

export class DishController {
    // @desc   Get all dishes
    // @route  GET /api/dishes
    static async getDishes(req, res) {
        try {
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve dishes', error });
        }
    }

    // @desc   Get a single dish
    // @route  GET /api/dishes/:dishId
    static async updateDish(req, res) {
    try {
        const dishId = parseInt(req.params.dishId);
        const dish = dishes.find((dish) => dish.dishId === dishId); 

        if (!dish) {
            return res.status(404).json({ message: `Dish with id ${dishId} not found` });
        }

        dish.name = req.body.name || dish.name;
        dish.currentPrice = req.body.currentPrice || dish.currentPrice;
        dish.portion = req.body.portion || dish.portion;
        dish.isAvailable = req.body.isAvailable ?? dish.isAvailable;
        dish.supportsDelivery = req.body.supportsDelivery ?? dish.supportsDelivery;
        dish.categoryId = req.body.categoryId || dish.categoryId;

        // Return the updated dish
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update dish', error });
    }
}


    // @desc    Create new dish
    // @route   POST /api/dishes
    static async addDish(req, res) {
        try {
            const newDish = {
                dishId: dishes.length + 1,
                name: req.body.name,
                currentPrice: req.body.currentPrice,
                portion: req.body.portion,
                isAvailable: req.body.isAvailable ?? true,  // Default to true if not provided
                supportsDelivery: req.body.supportsDelivery ?? true,  // Default to true if not provided
                categoryId: req.body.categoryId
            };

            if (!newDish.name || !newDish.currentPrice || !newDish.portion) {
                const error = new Error('Please include a name, price, and portion for the dish');
            }

            dishes.push(newDish);
            res.status(201).json(dishes);
        } catch (error) {
            res.status(500).json({ message: 'An unexpected error occurred while adding the dish', error });
        }
    }


    // @desc    Update dish
    // @route   PUT /api/dishes/:dishId
    static async updateDish(req, res) {
        try {
            const dishId = parseInt(req.params.dishId); 
            const dish = dishes.find((dish) => dish.dishId === dishId); 

            if (!dish) {
                return res.status(404).json({ message: `Dish with id ${dishId} not found` });
            }

            dish.name = req.body.name || dish.name;
            dish.currentPrice = req.body.currentPrice || dish.currentPrice;
            dish.portion = req.body.portion || dish.portion;
            dish.isAvailable = req.body.isAvailable ?? dish.isAvailable;
            dish.supportsDelivery = req.body.supportsDelivery ?? dish.supportsDelivery;
            dish.categoryId = req.body.categoryId || dish.categoryId;

            res.status(200).json(dish);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update dish', error });
        }
    }


    // @desc    Delete dish
    // @route   Delete /api/dishes/:dishId
    static async deleteDish(req, res) {
        try {
            const dishId = parseInt(req.params.dishId);
            const dish = dishes.find((dish) => dish.dishId === dishId);

            if (!dish) {
                return res.status(404).json({ message: `Dish with id ${dishId} not found` });
            }

            dishes = dishes.filter((dish) => dish.dishId !== dishId);
            res.status(204).json(dishes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete dish', error });
        }
    }

}
