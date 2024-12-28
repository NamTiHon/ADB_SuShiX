import { getMonthlyRevenue as getMonthlyRevenueService } from '../services/homeService.js';

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