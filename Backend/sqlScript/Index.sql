/*
DECLARE @SQL NVARCHAR(MAX) = N'';

-- Tạo danh sách lệnh DROP INDEX cho tất cả các Non-Clustered Index
SELECT @SQL += 'DROP INDEX ' + QUOTENAME(SCHEMA_NAME(o.schema_id)) + '.' + 
               QUOTENAME(o.name) + '.' + QUOTENAME(i.name) + ';' + CHAR(13)
FROM sys.indexes i
INNER JOIN sys.objects o ON i.object_id = o.object_id
WHERE i.type_desc = 'NONCLUSTERED'  -- Lọc chỉ Non-Clustered Index
  AND i.is_primary_key = 0          -- Loại bỏ Primary Key (Clustered)
  AND i.is_unique_constraint = 0    -- Loại bỏ Unique Constraints
  AND o.type = 'U';                 -- Chỉ áp dụng cho User Tables

-- In ra câu lệnh để kiểm tra
PRINT @SQL;

-- Thực thi lệnh xóa
EXEC sp_executesql @SQL;
*/

---- DANH SÁCH CHỈ MỤC 
-- Unique Non-clustered index cho KH_Email (bảng Khách hàng)
create unique nonclustered index idx_KhachHang_Email
on KhachHang (KH_Email)

-- Non-clustered index cho PDM_SDT_KH và PDM_MaNhanVien (bảng Phiếu đặt món)
create nonclustered index idx_PhieuDatMon_SDT_KH
on PhieuDatMon (PDM_SDT_KH)

create nonclustered index idx_PhieuDatMon_MaNhanVien
on PhieuDatMon (PDM_MaNhanVien)

create nonclustered index idx_PhieuDatMon_ThoiGianDat
on PhieuDatMon (PDM_ThoiGianDat)

-- Non-clustered index cho TTV_LoaiThe (bảng Thẻ thành viên)
create nonclustered index idx_TheThanhVien_LoaiThe
on TheThanhVien (TTV_LoaiThe)

create nonclustered index idx_TheThanhVien_NhanVienTao
on TheThanhvien (TTV_MaNhanVien)

-- Non-clustered index cho HD_MaPhieu (bảng Hóa đơn)
create nonclustered index idx_HoaDon_MaPhieu
on HoaDon (HD_MaPhieu)

-- Non-clustered index cho NV_HoTen (bảng Nhân viên)
create nonclustered index idx_NhanVien_HoTen
on NhanVien (NV_HoTen)

create nonclustered index idx_NhanVien_NgayVaoLam
on NhanVien (NV_NgayVaoLam)

-- Non-clustered index cho Mã chi nhánh (bảng Bộ phận Nhân viên)
create nonclustered index idx_BoPhan_NhanVien_MaChiNhanh
on BoPhan_NhanVien (BP_NV_MaChiNhanh)

-- Composite index cho Lương và Tên bộ phận (bảng Bộ phận Nhân viên)
create nonclustered index idx_BoPhanNhanVien_TenBoPhan
on BoPhan_NhanVien (BP_NV_TenBoPhan)


-- Truy vấn 1: Tìm kiếm khách hàng dựa trên loại thẻ 'Gold':
/*
set statistics time on;
set statistics IO on;

	select * 
	from KhachHang KH join TheThanhVien TTV on KH.KH_SDT = TTV.TTV_SDT_KH
	where TTV.TTV_LoaiThe = 'Gold'

set statistics time off;
set statistics IO off;
*/

-- Truy vấn 2: Tìm kiếm nhân viên có bộ phận là Bếp.
/*
set statistics time on;
set statistics IO on;

	select * 
	from NhanVien NV join BoPhan_NhanVien BPNV on NV.NV_MaNhanVien = BPNV. BP_NV_MaNhanVien
	where BPNV.BP_NV_TenBoPhan = N'Bếp'

set statistics time off;
set statistics IO off;
*/

-- Truy vấn 3: Thống kê số lượng nhân viên có năm vào làm trong năm 2023 của từng bộ phận.
/*
set statistics time on;
set statistics IO on;

	select BPNV.BP_NV_TenBoPhan, count (NV.NV_MaNhanVien) as SoLuongNhanVien
	from NhanVien NV join BoPhan_NhanVien BPNV on NV.NV_MaNhanVien = BPNV.BP_NV_MaNhanVien
	where year (NV.NV_NgayVaoLam) = 2023
	group by (BPNV.BP_NV_TenBoPhan)

set statistics time off;
set statistics IO off;
*/

-- Truy vấn 5: Thống kê số lượng thẻ do nhân viên Nguyễn Hải Yến ở chi nhánh có mã CN005 lập.
/*
set statistics time on;
set statistics IO on;

	select count (TTV.TTV_SDT_KH) as SoLuongKH, NV.NV_HoTen, NV.NV_MaNhanVien
	from TheThanhVien TTV join NhanVien NV on TTV.TTV_MaNhanVien = NV.NV_MaNhanVien
	join BoPhan_NhanVien BPNV on NV.NV_MaNhanVien = BPNV.BP_NV_MaNhanVien
	where NV.NV_Hoten = N'Nguyễn Hải Yến' and BPNV.BP_NV_MaChiNhanh = 'CN005'
	group by NV.NV_HoTen, NV.NV_MaNhanVien 

set statistics time off;
set statistics IO off;
*/

/*
-- Tìm ra toàn bộ loại index trong database
USE DB_SushiX
GO
 
SELECT
            so.name AS TableName
            , si.name AS IndexName
            , si.type_desc AS IndexType
FROM
            sys.indexes si
            JOIN sys.objects so ON si.[object_id] = so.[object_id]
WHERE
            so.type = 'U'    --Only get indexes for User Created Tables
            AND si.name IS NOT NULL
ORDER BY
            so.name, si.type 
*/