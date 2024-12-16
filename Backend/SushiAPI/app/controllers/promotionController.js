import { promotionService } from '../services/promotionService.js';

export const promotionController = {

    // @desc   Lấy toàn bộ các khuyến mãi
    // @route  GET /api/promotions
    getPromotions: async (req, res) => {
        try {
            const promotions = await promotionService.getPromotions();
            res.status(200).json({ message: 'Promotions retrieved successfully', promotions });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc   Lấy một khuyến mãi theo KM_MaKhuyenMai
    // @route  GET /api/promotions/:KM_MaKhuyenMai
    getPromotionById: async (req, res) => {
        try {
            const KM_MaKhuyenMai = req.params.KM_MaKhuyenMai;
            const promotion = await promotionService.getPromotionById(KM_MaKhuyenMai);
            if (!promotion) {
                return res.status(404).json({ message: `Promotion with ID ${KM_MaKhuyenMai} not found` });
            }
            res.status(200).json({ message: 'Promotion retrieved successfully', promotion });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Thêm một khuyến mãi mới
    // @route   POST /api/promotions
    addPromotion: async (req, res) => {
        try {
            const newPromotion = await promotionService.addPromotion(req.body);
            res.status(201).json({ message: 'Promotion added successfully', promotion: newPromotion });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Cập nhật mkhuyến mãi theo KM_MaKhuyenMai
    // @route   PUT /api/promotions/:KM_MaKhuyenMai
    updatePromotion: async (req, res) => {
        try {
            const KM_MaKhuyenMai = req.params.KM_MaKhuyenMai;
            const updatedPromotion = await promotionService.updatePromotion(KM_MaKhuyenMai, req.body);
            if (!updatedPromotion) {
                return res.status(404).json({ message: `Promotion with ID ${KM_MaKhuyenMai} not found` });
            }
            res.status(200).json({ message: 'Promotion updated successfully', promotion: updatedPromotion });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // @desc    Xóa khuyến mãi theo KM_MaKhuyenMai
    // @route   DELETE /api/promotions/:KM_MaKhuyenMai
    deletePromotion: async (req, res) => {
        try {
            const KM_MaKhuyenMai = req.params.KM_MaKhuyenMai;
            await promotionService.deletePromotion(KM_MaKhuyenMai);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};