import express from 'express';
import { staffController } from '../controllers/staffController.js';

const router = express.Router();

// Cập nhật route để chấp nhận các tham số page và limit
router.get('/', staffController.ShowAllStaffs);
router.post('/', staffController.addStaff);
router.post('/department', staffController.addDepartment);
router.get('/department', staffController.getDepartment);
router.get('/salary/:departmentName', staffController.getSalaryByDepartment);
router.delete('/:MaNhanVien', staffController.deleteStaff);
router.put('/:MaNhanVien', staffController.updateStaff); 
router.put('/department/:MaNhanVien', staffController.updateDepartment);
export default router;