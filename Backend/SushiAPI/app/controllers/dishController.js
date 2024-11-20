import { Dish } from '../models/dish.js';

export class DishController {
    // Lấy danh sách món ăn
    static async getDishes(req, res) {
        try {
            // Dữ liệu mẫu
            const dishes = [
                { dishId: 1, name: 'Sushi Roll', currentPrice: 150000, portion: 2, isAvailable: true, supportsDelivery: true, categoryId: 1 },
                { dishId: 2, name: 'Sashimi Set', currentPrice: 300000, portion: 1, isAvailable: true, supportsDelivery: true, categoryId: 2 },
                { dishId: 3, name: 'Tempura', currentPrice: 120000, portion: 2, isAvailable: false, supportsDelivery: false, categoryId: 3 },
            ];

            res.status(200).json(dishes); // Trả về danh sách món ăn
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve dishes', error });
        }
    }

    // Thêm món ăn mới
    static async addDish(req, res) {
        const { name, currentPrice, portion, isAvailable, supportsDelivery, categoryId } = req.body;

        try {
            if (!name || !currentPrice || !portion) {
                return res.status(400).json({ message: 'Missing required fields: name, currentPrice, portion' });
            }

            // Dữ liệu mẫu (thêm món ăn vào danh sách)
            const newDish = {
                dishId: Math.floor(Math.random() * 1000), // Tạo ID ngẫu nhiên
                name,
                currentPrice,
                portion,
                isAvailable: isAvailable ?? true,
                supportsDelivery: supportsDelivery ?? true,
                categoryId,
            };

            res.status(201).json(newDish); // Trả về món ăn vừa tạo
        } catch (error) {
            res.status(500).json({ message: 'Failed to add dish', error });
        }
    }

    // Cập nhật món ăn
    static async updateDish(req, res) {
        const { dishId } = req.params;
        const { name, currentPrice, portion, isAvailable, supportsDelivery, categoryId } = req.body;

        try {
            // Dữ liệu mẫu (giả sử tìm thấy món ăn)
            const dish = { dishId, name: 'Sushi Roll', currentPrice: 150000, portion: 2, isAvailable: true, supportsDelivery: true, categoryId };

            if (!dish) return res.status(404).json({ message: 'Dish not found' });

            // Cập nhật thông tin món ăn
            dish.name = name || dish.name;
            dish.currentPrice = currentPrice || dish.currentPrice;
            dish.portion = portion || dish.portion;
            dish.isAvailable = isAvailable ?? dish.isAvailable;
            dish.supportsDelivery = supportsDelivery ?? dish.supportsDelivery;
            dish.categoryId = categoryId || dish.categoryId;

            res.status(200).json(dish); // Trả về món ăn đã cập nhật
        } catch (error) {
            res.status(500).json({ message: 'Failed to update dish', error });
        }
    }

    // Xóa món ăn
    static async deleteDish(req, res) {
        const { dishId } = req.params;
        try {
            // Dữ liệu mẫu (giả sử tìm thấy món ăn)
            const dish = { dishId, name: 'Sushi Roll', currentPrice: 150000, portion: 2, isAvailable: true, supportsDelivery: true, categoryId: 1 };

            if (!dish) return res.status(404).json({ message: 'Dish not found' });

            // Xóa món ăn
            res.status(204).send(); // Trả về status 204 khi xóa thành công
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete dish', error });
        }
    }
}
