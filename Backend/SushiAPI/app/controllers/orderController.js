import { orderService } from '../services/orderService.js';

export const orderController = {

    // @desc   Tạo phiếu đặt món mới
    // @route  POST /api/order
    makeOrder: async (req, res) => {
        try {
            const order = await orderService.makeOrder(req.body);
            res.status(200).json({ message: 'Order maked successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Thêm món ăn vào phiếu đặt món
    // @route  POST /api/order/:MaPhieu
    orderDishes: async (req, res) => {
        try {
            const PDM_MaPhieu = req.params.MAPhieu;
            const order = await orderService.orderDishes(PDM_MaPhieu, req.body);
            res.status(200).json({ message: 'Order dishes successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Cập nhật số lượng món ăn trong phiếu đặt món
    // @route   PUT /api/order/:MaPhieu
    updateDishes: async (req, res) => {
        try {
            const PDM_MaPhieu = req.params.MAPhieu;
            const updatedOrder = await dishService.updateDish(PDM_MaPhieu, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ message: `Cannot update dishes in ${PDM_MaPhieu}` });
            }
            res.status(200).json({ message: 'Dish updated successfully', dish: updatedOrder });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Xóa món trong phiếu đặt món
    // @route   DELETE /api/order/MaPhieu
    deleteDishes: async (req, res) => {
        try {
            const PDM_MaPhieu = req.params.MAPhieu;
            await dishService.deleteDishes(PDM_MaPhieu, req.body)
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Xóa phiếu đặt món
    // @route   DELETE /api/order/MaPhieu
    deleteOrder: async (req, res) => {
        try {
            const PDM_MaPhieu = req.params.MAPhieu;
            await dishService.deleteOrder(PDM_MaPhieu)
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Lấy danh sách món ăn trong phiếu đặt món
    // @route  GET /api/dishes/:MaPhieu
    getOrder: async (req, res) => {
        try {
            const PDM_MaPhieu = req.params.MAPhieu;
            const updatedOrder = await dishService.updateDish(PDM_MaPhieu, req.body);
            if (!updatedOrder) {
                return res.status(404).json({ message: `Cannot find order with MaPhieu: ${PDM_MaPhieu}` });
            }
            res.status(200).json({ message: 'Order retrieved successfully', dish: updatedOrder });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};