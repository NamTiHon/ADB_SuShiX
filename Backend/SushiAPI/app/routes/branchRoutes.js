import express from 'express';
import { branchController } from '../controllers/branchController.js';

const router = express.Router();
// Lấy danh sách các chi nhánh
router.get('/', branchController.getBranches);

// Lấy thông tin chi nhánh theo ID
router.get('/id/:CN_MaChiNhanh', branchController.getBranchById);

// Thêm mới một chi nhánh
router.post('/', branchController.addBranch);

// // Lấy danh sách khu vực
router.get('/regions', branchController.getAllRegion);

// Cập nhật chi nhánh
router.put('/:CN_MaChiNhanh', branchController.updateBranch);

// // Xóa chi nhánh
// router.delete('/:branchId', branchController.deleteBranch);

export default router;
