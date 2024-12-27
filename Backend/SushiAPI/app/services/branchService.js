import sql from 'mssql'
import conn from '../config/db.js'

export const branchService = {
    // Lấy thông tin tất cả chi nhánh:
    getAllBranches: async () => {
        try {
            // Thiết lập kết nối trước khi chạy tiếp
            const pool = await conn; // conn là đối tượng kết nối đến cơ sở dữ liệu 
            // Gửi truy vấn đến cơ sở dữ liệu
            const result = await pool.request().query(`
                select * from dbo.uf_XemToanBoChiNhanh();
            `)
            return result.recordset;
        }
        catch (error) {
            console.error('Error fetching branches:', error);
            throw new Error('Failed to fetch branches');
        }
    },

    // Lấy thông tin chi nhánh theo MA_ChiNhanh:
    getBranchById: async (CN_MaChiNhanh) => {
        try {
            const pool = await conn;
            const result = await pool.request()
                .input('MaChiNhanh', sql.VarChar(12), CN_MaChiNhanh)
                .query('SELECT * FROM ChiNhanh WHERE CN_MaChiNhanh = @MaChiNhanh');
    
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching branch:', error);
            throw new Error('Failed to fetch branch');
        }
    },

    // Thêm một chi nhánh mới
    addBranch: async (brachData) => {
        try {
            const {CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang, CN_MaQuanLy, CN_MaKhuVuc, CN_MaHinhAnh } = brachData;
            console.log('Adding branch:', brachData);
            const pool = await conn;
            await pool.request()
                .input('MaChiNhanh', sql.VarChar(12), CN_MaChiNhanh)
                .input('Ten', sql.NVarChar(50), CN_Ten)
                .input('DiaChi', sql.NVarChar(100), CN_DiaChi)
                .input('TGMoCua', sql.DateTime, CN_TGMoCua)
                .input('TGDongCua', sql.DateTime, CN_TGDongCua)
                .input('SDT', sql.VarChar(12), CN_SDT)
                .input('BaiDoXeMay', sql.Bit, CN_BaiDoXeMay)
                .input('BaiDoXeOto', sql.Bit, CN_BaiDoXeOto)
                .input('HoTroGiaoHang', sql.Bit, CN_HoTroGiaoHang)
                .input('MaQuanLy', sql.VarChar(12), CN_MaQuanLy)
                .input('MaKhuVuc', sql.VarChar(12), CN_MaKhuVuc)
                .input('HinhAnh', sql.NVarChar(100), CN_MaHinhAnh)
                .execute('usp_ThemChiNhanh');
                // Truy vấn lại để lấy chi nhánh vừa được thêm
            const result = await pool.request()
                .input('CN_MaChiNhanh', sql.VarChar(12), CN_MaChiNhanh)
                .query('SELECT * FROM ChiNhanh WHERE CN_MaChiNhanh = @CN_MaChiNhanh');
                return result.recordset[0]; // Trả về chi nhánh đã thêm
        } 
        catch (error){
            console.error('Error adding branch: ', error);
            throw new Error('Failed to add branch');
        }
    },

    // Cập nhật nội dung chi nhánh theo CN_MaChiNhanh
    updateBranch: async (CN_MaChiNhanh, updates) => {
        try {
            const pool = await conn;
            // Tạo câu lệnh SET động từ object updates
            const setClause = Object.keys(updates)
            .map((key) => `${key} = @${key}`)
            .join(', ');

            const request = pool.request();

            //Thêm các giá trị vào request
            request.input('CN_MaChiNhanh', sql.VarChar(10), CN_MaChiNhanh);
            const sqlType = 
                typeof value === 'string' ? sql.NVarChar(50) :
                typeof value === 'number' ? sql.Float :
                typeof value === 'boolean' ? sql.Bit :
                sql.NVarChar(50);

            for (const key in updates) {
                request.input(key,sqlType, updates[key]);
            }

            const result = await request.query(`
                update ChiNhanh
                set ${setClause}
                where CN_MaChiNhanh = @CN_MaChiNhanh;

                select * from ChiNhanh where CN_MaChiNhanh = @CN_MaChiNhanh
            `);
            return result.recordset[0]; // Trả về chi nhánh vừa cập nhật
        } 
        catch (error){
            console.error('Error updating branch: ', error);
            throw new Error('Failed to update branch');
        }
    },

    // Xóa chi nhánh theo CN_MaChiNhanh
    deleteBranch: async (CN_MaChiNhanh) => {
        try {
            console.log('Attempting to delete branch:', CN_MaChiNhanh);
            const pool = await conn;
    
            // Check branch exists
            const branch = await pool.request()
                .input('MaChiNhanh', sql.VarChar(12), CN_MaChiNhanh)
                .query('SELECT * FROM ChiNhanh WHERE CN_MaChiNhanh = @MaChiNhanh');
    
            if (!branch.recordset[0]) {
                console.log('Branch not found:', CN_MaChiNhanh);
                return false;
            }
    
            // Delete branch
            const result = await pool.request()
                .input('MaChiNhanh', sql.VarChar(12), CN_MaChiNhanh)
                .execute('usp_XoaChiNhanh');
    
            console.log('Delete operation result:', result);
            
            // Check if any rows were affected
            const success = result.rowsAffected.some(count => count > 0);
            console.log('Delete success:', success);
            
            return success;
        } catch (error) {
            console.error('Delete error:', error);
            throw new Error(`Failed to delete branch: ${error.message}`);
        }
    },
    getAllRegion: async () => {
        try {
            const pool = await conn;
            const result = await pool.request().query(`
                SELECT DISTINCT KV_MaKhuVuc, KV_Ten FROM KhuVuc;
            `);

            console.log(result.recordset);
            return result.recordset;
        } catch (error) {
            console.error('Error fetching regions:', error);
            throw new Error('Failed to fetch regions');
        }
    }
};