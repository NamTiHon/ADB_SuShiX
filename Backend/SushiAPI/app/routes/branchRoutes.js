import express from 'express';
import { branchController } from '../controllers/branchController.js';

const router = express.Router();
// Lấy danh sách các chi nhánh
router.get('/', branchController.getBranches);

// Lấy thông tin chi nhánh theo ID
router.get('/:CN_MaChiNhanh', branchController.getBranchById);

// Thêm mới một chi nhánh
router.post('/', branchController.addBranch);

// // Cập nhật chi nhánh
// router.put('/:branchId', branchController.updateBranch);

// // Xóa chi nhánh
// router.delete('/:branchId', branchController.deleteBranch);

export default router;
