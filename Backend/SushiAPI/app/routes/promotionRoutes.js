import express from 'express';
import { promotionController } from '../controllers/promotionController.js';

const router = express.Router();

router.get('/', promotionController.getPromotions);
router.get('/:KM_MaKhuyenMai', promotionController.getPromotionById);
router.post('/', promotionController.addPromotion);
router.put('/:KM_MaKhuyenMai', promotionController.updatePromotion);
router.delete('/:KM_MaKhuyenMai', promotionController.deletePromotion);

export default router;