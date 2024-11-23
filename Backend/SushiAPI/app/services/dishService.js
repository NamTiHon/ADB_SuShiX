let dishes = [
    { dishId: 1, name: 'Sushi Roll', currentPrice: 150000, portion: 2, isAvailable: true, supportsDelivery: true, categoryId: 1 },
    { dishId: 2, name: 'Sashimi Set', currentPrice: 300000, portion: 1, isAvailable: true, supportsDelivery: true, categoryId: 2 },
    { dishId: 3, name: 'Tempura', currentPrice: 120000, portion: 2, isAvailable: false, supportsDelivery: false, categoryId: 3 },
];

export const dishService = {
    // Lấy danh sách tất cả món ăn
    getAllDishes: () => {
        return dishes;
    },

    // Lấy thông tin một món ăn qua ID
    getDishById: (dishId) => {
        const dish = dishes.find((dish) => dish.dishId === dishId);
        if (!dish) {
            throw new Error(`Dish with id ${dishId} not found`);
        }
        return dish;
    },

    // Thêm món ăn mới
    addDish: (newDish) => {
        const { name, currentPrice, portion, categoryId } = newDish;

        if (!name || !currentPrice || !portion) {
            throw new Error('Please include a name, price, and portion for the dish');
        }

        const dish = {
            dishId: dishes.length + 1, // Tạo ID mới dựa trên danh sách hiện tại
            name,
            currentPrice,
            portion,
            isAvailable: newDish.isAvailable ?? true,
            supportsDelivery: newDish.supportsDelivery ?? true,
            categoryId,
        };

        dishes.push(dish); // Thêm vào mảng
        return dish;
    },

    // Cập nhật món ăn
    updateDish: (dishId, updates) => {
        const dish = dishes.find((dish) => dish.dishId === dishId);
        if (!dish) {
            throw new Error(`Dish with id ${dishId} not found`);
        }

        // Cập nhật các thuộc tính
        dish.name = updates.name || dish.name;
        dish.currentPrice = updates.currentPrice || dish.currentPrice;
        dish.portion = updates.portion || dish.portion;
        dish.isAvailable = updates.isAvailable ?? dish.isAvailable;
        dish.supportsDelivery = updates.supportsDelivery ?? dish.supportsDelivery;
        dish.categoryId = updates.categoryId || dish.categoryId;

        return dish;
    },

    // Xóa món ăn
    deleteDish: (dishId) => {
        const dishIndex = dishes.findIndex((dish) => dish.dishId === dishId);
        if (dishIndex === -1) {
            throw new Error(`Dish with id ${dishId} not found`);
        }

        dishes.splice(dishIndex, 1); // Xóa món ăn
    },
};
