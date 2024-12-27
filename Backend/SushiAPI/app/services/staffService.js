import sql from 'mssql';
import conn from '../config/db.js';

export const staffService = {
    // Lấy danh sách tất cả nhân viên với phân trang
    getAllStaffs: async () => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .query(`
                    SELECT *
                    FROM NhanVien JOIN BoPhan_NhanVien ON NhanVien.NV_MaNhanVien = BoPhan_NhanVien.BP_NV_MaNhanVien
                    ORDER BY NhanVien.NV_MaNhanVien
                `);

            return result.recordset;
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    },

    // Lấy danh sách nhân viên theo chi nhánh
    getBranchStaffs: async (MaChiNhanh) => {
        const NV_MaChiNhanh = MaChiNhanh

        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaChiNhanh', sql.VarChar(12), NV_MaChiNhanh)
                .query(`
                    SELECT *
                    FROM dbo.uf_XemDanhSachNhanVienTheoChiNhanh(@MaChiNhanh)
                `);

            return result.recordset;
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    },

    //Thêm một nhân viên mới
    addStaff: async (staffData) => {
        const {
            MaNhanVien,
            HoTen,
            NgaySinh,
            GioiTinh,
            NgayVaoLam,
            NgayNghiViec,
            DiaChi,
            SDT,
            SoNha,
            TenDuong,
            TenPhuong,
            TenQuan,
            TenThanhPho 
        } = staffData

        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaNhanVien', sql.VarChar(12), MaNhanVien)
                .input('HoTen', sql.NVarChar(50), HoTen)
                .input('NgaySinh', sql.Date, NgaySinh)
                .input('GioiTinh', sql.NVarChar(3), GioiTinh) 
                .input('NgayVaoLam', sql.Date, NgayVaoLam)
                .input('NgayNghiViec', sql.Date, NgayNghiViec)
                .input('DiaChi', sql.NVarChar(100), DiaChi)
                .input('SDT', sql.VarChar(12), SDT)
                .input('SoNha', sql.Int, SoNha)
                .input('TenDuong', sql.NVarChar(30), TenDuong)
                .input('TenPhuong', sql.NVarChar(30), TenPhuong)
                .input('TenQuan', sql.NVarChar(30), TenQuan)
                .input('TenThanhPho', sql.NVarChar(30), TenThanhPho)
                .execute('usp_ThemNhanVien')

            console.log(result);
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    },

    //Bổ sung bộ phận cho nhân viên
    addDepartmentStaff: async (staffData) => {
        const {
            MaNhanVien,
	        MaChiNhanh,
	        TenBoPhan,
	        ChucVu,
	        Luong
        } = staffData
        console.log('Adding department:', staffData);
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaNhanVien', sql.VarChar(12), MaNhanVien)
                .input('MaChiNhanh', sql.VarChar(12), MaChiNhanh) 
                .input('TenBoPhan', sql.NVarChar(50), TenBoPhan)  
                .input('ChucVu', sql.NVarChar(20), ChucVu)        
                .input('Luong', sql.Int, Luong) 
                .execute('usp_ThemBoPhanNhanVien')

            console.log(result);
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    },

    // Thay đổi thông tin làm việc của nhân viên
    updateDepartmentStaff: async (MaNhanVien, staffUpdate) => {
        const {
	        MaChiNhanh,
	        TenBoPhan,
	        ChucVu,
	        Luong
        } = staffUpdate

        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaNhanVien', sql.VarChar(12), MaNhanVien)
                .input('MaChiNhanh', sql.VarChar(12), MaChiNhanh) 
                .input('TenBoPhan', sql.NVarChar(50), TenBoPhan)  
                .input('ChucVu', sql.NVarChar(20), ChucVu)        
                .input('Luong', sql.Int, Luong) 
                .execute('usp_ThayDoiBoPhanNhanVien')

            console.log(result);
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    },
    
    getDepartment: async () => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .query(`
                    SELECT distinct BP_NV_TenBoPhan
                    FROM BoPhan_NhanVien
                `);

            return result.recordset;
        } catch (error) {
            console.error('Error fetching departments:', error);
            throw new Error('Failed to fetch departments');
        }
    },

    
    getSalaryByDepartment: async (departmentName) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('TenBoPhan', sql.NVarChar(50), departmentName)
                .query(`
                    SELECT distinct BP_NV_Luong
                    FROM BoPhan_NhanVien
                    WHERE BP_NV_TenBoPhan = @TenBoPhan
                `);
    
            return result.recordset[0]?.BP_NV_Luong || 0;
        } catch (error) {
            console.error('Error fetching salary by department:', error);
            throw new Error('Failed to fetch salary by department');
        }
    },
    
    deleteStaff: async (MaNhanVien) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaNhanVien', sql.VarChar(12), MaNhanVien)
                .query(`
                    DELETE FROM BoPhan_NhanVien
                    WHERE BP_NV_MaNhanVien = @MaNhanVien
                    DELETE FROM NhanVien
                    WHERE NV_MaNhanVien = @MaNhanVien
                `);
            console.log(result);
        } catch (error) {
            console.error('Error fetching all staffs:', error);
            throw new Error('Failed to fetch staffs');
        }
    }
};