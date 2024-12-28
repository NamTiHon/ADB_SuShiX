import sql from 'mssql';
import conn from '../config/db.js';

export const getMonthlyRevenue = async (month, year) => {
    try {
        const pool = await conn;
        const result = await pool.request()
            .input('month', sql.Int, month)
            .input('year', sql.Int, year)
            .output('revenue', sql.Float)
            .execute('usp_DoanhThuTheoThang');

        const revenue = result.output.revenue;
        return { revenue };
    } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        throw new Error('Internal server error');
    }
};