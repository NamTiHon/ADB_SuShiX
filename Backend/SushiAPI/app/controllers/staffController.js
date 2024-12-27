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

    addStaff: async (req, res) => {
        const staffData = req.body;
        console.log('Adding staff:', staffData);
        try {
            await staffService.addStaff(staffData);
            res.status(201).json({ message: 'Staff added successfully' });
        } catch (error) {
            console.error('Error adding staff:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    addDepartment: async (req, res) => {
        const departmentData = req.body;
        try {
            await staffService.addDepartmentStaff(departmentData);
            res.status(201).json({ message: 'Department added successfully' });
        } catch (error) {
            console.error('Error adding department:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    getDepartment: async (req, res) => {
        try {
            const departments = await staffService.getDepartment();
            res.status(200).json({ message: 'List of all departments', departments });
        } catch (error) {
            console.error('Error fetching departments:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    getSalaryByDepartment: async (req, res) => {
        const { departmentName } = req.params;
        try {
            const salary = await staffService.getSalaryByDepartment(departmentName);
            res.status(200).json({ message: 'Salary of department', salary });
        } catch (error) {
            console.error('Error fetching salary:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    deleteStaff: async (req, res) => {
        const { MaNhanVien } = req.params;
        try {
            await staffService.deleteStaff(MaNhanVien);
            res.status(200).json({ message: 'Staff deleted successfully' });
        } catch (error) {
            console.error('Error deleting staff:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },
    updateStaff: async (req, res) => {
        const { MaNhanVien } = req.params;
        const staffUpdate = req.body;
        try {
            await staffService.updateStaff(MaNhanVien, staffUpdate);
            res.status(200).json({ message: 'Staff updated successfully' });
        } catch (error) {
            console.error('Error updating staff:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    updateDepartment: async (req, res) => {
        const { MaNhanVien } = req.params;
        const departmentUpdate = req.body;
        try {
            await staffService.updateDepartmentStaff(MaNhanVien, departmentUpdate);
            res.status(200).json({ message: 'Department updated successfully' });
        } catch (error) {
            console.error('Error updating department:', error);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
    
};