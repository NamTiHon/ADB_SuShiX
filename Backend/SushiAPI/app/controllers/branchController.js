import {branchService} from '../services/branchService.js';

export const branchController ={

    //@desc Lấy toàn bộ chi nhánh
    //@route GET /api/branches
    getBranches: async (req, res) => {
        try {
            const branches = await branchService.getAllBranches();
            res.status(200).json({message: 'Branches retrieved successfully', branches});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }, 

    //@desc Lấy chi nhánh theo CN_MaChiNhanh
    //@route GET /api/branches:CN_MaChiNhanh
    getBranchById: async (req, res) => {
        try {
            const CN_MaChiNhanh = req.params.CN_MaChiNhanh;
            const branch = await branchService.getBranchById(CN_MaChiNhanh);
            if (!branch) {
                return res.status(404).json({message: `Branch with ID ${CN_MaChiNhanh} not found`});
            }
            res.status(200).json({message: 'Branch retrieved successfully', branch});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    addBranch: async (req, res) => {
        try {
            const newBranch = await branchService.addBranch(req.body);
            res.status(201).json({message: 'Branch added successfully', branch: newBranch});
        }
        catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    getAllRegion: async (req, res) => {
        try {
            const regions = await branchService.getAllRegion();
            res.status(200).json({message: 'Regions retrieved successfully', regions});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    updateBranch: async (req, res) => {
        try {
            const CN_MaChiNhanh = req.params.CN_MaChiNhanh;
            const updates = req.body;
            
            const updatedBranch = await branchService.updateBranch(CN_MaChiNhanh, updates);
            
            if (!updatedBranch) {
                return res.status(404).json({ 
                    message: `Cannot find branch with ID ${CN_MaChiNhanh}`
                });
            }

            res.status(200).json({
                message: 'Branch updated successfully',
                branch: updatedBranch
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteBranch: async (req, res) => {
        try {
            // Log request parameters for debugging
            console.log('Request params:', req.params);
            
            const CN_MaChiNhanh = req.params.branchId; // Change from CN_MaChiNhanh to branchId to match route
    
            // Add detailed validation
            if (!CN_MaChiNhanh || CN_MaChiNhanh.trim() === '') {
                console.log('Invalid branch ID:', CN_MaChiNhanh);
                return res.status(400).json({
                    message: 'Branch ID is required and cannot be empty'
                });
            }
    
            // Check if branch exists
            const existingBranch = await branchService.getBranchById(CN_MaChiNhanh);
            if (!existingBranch) {
                return res.status(404).json({
                    message: `Branch with ID ${CN_MaChiNhanh} not found`
                });
            }
    
            // Attempt deletion
            const isDeleted = await branchService.deleteBranch(CN_MaChiNhanh);
            
            if (!isDeleted) {
                return res.status(400).json({
                    message: `Cannot delete branch ${CN_MaChiNhanh}. It may be referenced by other records.`
                });
            }
    
            res.status(200).json({
                message: 'Branch deleted successfully',
                deletedBranchId: CN_MaChiNhanh
            });
    
        } catch (error) {
            console.error('Delete branch error:', error);
            res.status(500).json({
                message: 'Internal server error while deleting branch',
                error: error.message
            });
        }
    }
}