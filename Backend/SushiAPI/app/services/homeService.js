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

export const getTotalCustomers = async () => {
    try {
        const pool = await conn;
        const result = await pool.request()
            .output('count', sql.Float)
            .execute('usp_ToanBoKhachHang');

        const count = result.output.count;
        return { count };
    } catch (error) {
        console.error('Error fetching total customers:', error);
        throw new Error('Internal server error');
    }
};

export const getBranchRevenue = async (branchId, month, year) => {
    try {
        const pool = await conn;
        const result = await pool.request()
            .input('MaChiNhanh', sql.VarChar(12), branchId)
            .input('month', sql.Int, month)
            .input('year', sql.Int, year)
            .output('revenue', sql.Float)
            .execute('usp_DoanhThuTheoChiNhanh');

        const revenue = result.output.revenue;
        return { revenue };
    } catch (error) {
        console.error('Error fetching branch revenue:', error);
        throw new Error('Internal server error');
    }
};
