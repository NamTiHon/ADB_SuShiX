import { staffService } from '../services/staffService.js';

export const staffController = {
    // Lấy danh sách tất cả nhân viên với phân trang
    ShowAllStaffs: async (req, res) => {
    try {
        const staffs = await staffService.getAllStaffs();
        res.status(200).json({ message: 'List of all staffs', staffs });
    } catch (error) {
        console.error('Error fetching staffs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    },
};