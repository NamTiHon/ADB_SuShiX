import { getMonthlyRevenue as getMonthlyRevenueService } from '../services/homeService.js';
import { getTotalCustomers as getTotalCustomersService } from '../services/homeService.js';
import { getBranchRevenue as getBranchRevenueService } from '../services/homeService.js';

export const getMonthlyRevenue = async (req, res) => {
    const { month, year } = req.query;

    if (!month || !year) {
        return res.status(400).json({ message: 'Month and year are required' });
    }

    try {
        const { revenue } = await getMonthlyRevenueService(month, year);
        res.status(200).json({ revenue });
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTotalCustomers = async (req, res) => {
    try {
        const { count } = await getTotalCustomersService();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching total customers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getBranchRevenue = async (req, res) => {
    const { branchId, month, year } = req.query;

    if (!branchId || !month || !year) {
        return res.status(400).json({ message: 'Branch ID, month, and year are required' });
    }

    try {
        const { revenue } = await getBranchRevenueService(branchId, month, year);
        res.status(200).json({ revenue });
    } catch (error) {
        console.error('Error fetching branch revenue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};