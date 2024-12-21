import sql from 'mssql';
import conn from '../config/db.js';

export const cardService = {
    register: async (MaThe, NgayTao, LoaiThe, SDT_KH, MaNhanVien) => {
        try {
            // Tạo câu lệnh EXECUTE để in ra
            const execStatement = `
                EXEC usp_TaoTheThanhVien
                @MaThe = '${MaThe}',
                @NgayTao = '${NgayTao}',
                @LoaiThe = '${LoaiThe}',
                @SDT_KH = '${SDT_KH}',
                @MaNhanVien = '${MaNhanVien}'
            `;
            console.log('Executing SQL:', execStatement);
            // Thêm thẻ user mới
            const pool = await conn;
            const result = await pool.request()
                .input('MaThe', sql.VarChar(12), MaThe)
                .input('NgayTao', sql.Date, NgayTao)
                .input('LoaiThe', sql.NVarChar(30), LoaiThe)
                .input('SDT_KH', sql.VarChar(12), SDT_KH)
                .input('MaNhanVien', sql.VarChar(12), MaNhanVien)
                .execute('usp_TaoTheThanhVien');
            console.log('Result:', result);

            return { success: true, user: result.recordset[0] }; // Return new user
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Failed to register user');
        }
    },
};

export default cardService;