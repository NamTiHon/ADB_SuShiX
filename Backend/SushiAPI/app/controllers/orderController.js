import { orderService } from '../services/orderService.js';

export const orderController = {

    // @desc   Tạo phiếu đặt món trực tiếp
    // @route  POST /api/order
    makeDirectOrder: async (req, res) => {
        try {
            const order = await orderService.makeDirectOrder(req.body);
            res.status(200).json({ message: 'Order maked successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Tạo phiếu đặt trước
    // @route  POST /api/order
    makeReserveOrder: async (req, res) => {
        try {
            const order = await orderService.makeReserveOrder(req.body);
            res.status(200).json({ message: 'Order maked successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Tạo phiếu đặt online
    // @route  POST /api/order
    makeOnlineOrder: async (req, res) => {
        try {
            const order = await orderService.makeOnlineOrder(req.body);
            res.status(200).json({ message: 'Order maked successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Tạo phiếu đặt món mới
    // @route  POST /api/order
    // makeOrder: async (req, res) => {
    //     try {
    //         const order = await orderService.makeOrder(req.body);
    //         res.status(200).json({ message: 'Order maked successfully', order });
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    // @desc   Thêm món ăn vào phiếu đặt món
    // @route  POST /api/order/:MaPhieu
    orderDishes: async (req, res) => {
        try {
            const order = await orderService.orderDishes(req.body);
            res.status(200).json({ message: 'Order dishes successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Cập nhật số lượng món ăn trong phiếu đặt món
    // @route   PUT /api/order/:MaPhieu
    updateDishes: async (req, res) => {
        try {
            const PDM_MaPhieu = req.params.MaPhieu;
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
            const PDM_MaPhieu = req.params.MaPhieu;
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
            const PDM_MaPhieu = req.params.MaPhieu;
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
            const PDM_MaPhieu = req.params.MaPhieu;
            const order = await orderService.getOrder(PDM_MaPhieu);
            if (!order) {
                return res.status(404).json({ message: `Cannot find order with MaPhieu: ${PDM_MaPhieu}` });
            }
            res.status(200).json({ message: 'Order retrieved successfully', order });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateReservation: async (req, res) => {
        try {
            const { PDM_MaPhieu } = req.params;
            const { PDM_SoBan } = req.body;
            
            console.log('Updating reservation:', { PDM_MaPhieu, PDM_SoBan }); // Debug log
    
            const result = await orderService.updateTableOrder({ PDM_MaPhieu, PDM_SoBan });
            res.status(200).json(result);
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({ message: error.message });
        }
    },

    getOrderByID: async (req, res) => {
        try {
            const { PDM_MaPhieu } = req.params;
            const order = await orderService.getOrderByID(PDM_MaPhieu);
            res.status(200).json(order);
        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({ message: error.message });
        }
    }
};