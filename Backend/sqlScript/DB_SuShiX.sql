-- Tạo database:
CREATE DATABASE DB_SushiX ON
    (Name = DB_SushiX_data, 
    FileName = 'D:\SINHVIEN\1.study\hk1_nam3\CSDL Nang cao\temp\DB_SushiX_data.mdf')
LOG ON
    (Name = DB_SushiX_log,
    FileName = 'D:\SINHVIEN\1.study\hk1_nam3\CSDL Nang cao\temp\DB_QLSushiX_log.ldf');
go

-- Sử dụng database:
use DB_SushiX 
go

-- Tạo bảng kèm khóa chính:
-- Mã thì varchar(10)
-- Tên thì nvarchar(50)
-- Địa chỉ nvarchar(100)
-- Số điện thoại varchar(12)
-- CCCD varchar(13)
-- Email varchar(30)

-- Bảng Chi Nhánh:
create table ChiNhanh (
	CN_MaChiNhanh varchar(10),
	CN_Ten nvarchar(50),
	CN_DiaChi nvarchar(100),
	CN_TGMoCua TIME, 
	CN_TGDongCua TIME,
	CN_SDT varchar(12),
	CN_BaiDoXeMay BIT,  -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	CN_BaiDoXeOto BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	CN_HoTroGiaoHang BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	CN_MaQuanLy varchar(10), 
	CN_MaKhuVuc varchar(10),
	primary key (CN_MaChiNhanh)
);

-- Bảng Khu Vực:
create table KhuVuc (
	KV_MaKhuVuc varchar(10),
	KV_Ten nvarchar(50),
	KV_MaThucDon varchar(10),
	primary key (KV_MaKhuVuc)
);

-- Bảng Thực Đơn
create table ThucDon (
	TD_MaThucDon varchar(10),
	primary key (TD_MaThucDon)
);

-- Bảng Danh mục trong thực đơn
create table DanhMuc_ThucDon (
	DM_TD_MaThucDon varchar(10),
	DM_TD_MaDanhMuc varchar(10),
	primary key (DM_TD_MaThucDon, DM_TD_MaDanhMuc)
);

-- Bảng Danh mục:
create table DanhMuc (
	DM_MaDanhMuc varchar(10),
	DM_TenDanhMuc nvarchar(50),
	primary key (DM_MaDanhMuc)
);

-- Bảng Món ăn:
create table MonAn (
	MA_MaMon varchar(10),
	MA_TenMon nvarchar(50),
	MA_GiaHienTai float,
	MA_KhauPhan int,
	MA_CoSan BIT, --dùng để lưu giá trị: 0 là không có, 1 là có
	MA_HoTroGiaoHang BIT,
	MA_MaDanhMuc varchar(10),
	MA_HinhAnh varchar(100),
	primary key (MA_MaMon)
);

-- Bảng Món được đặt:
create table MonDuocDat (
	MDD_MaMon varchar(10),
	MDD_MaPhieu varchar(10),
	MDD_SoLuong int,
	primary key (MDD_MaMon, MDD_MaPhieu)
);

-- Bảng Phiếu đặt món:
create table PhieuDatMon (
	PDM_MaPhieu varchar(10),
	PDM_ThoiGianDat datetime,
	PDM_SDT_KH varchar(12),
	PDM_MaNhanVien varchar(10), -- Nhân viên tạo món
	primary key (PDM_MaPhieu)
);

-- Bảng Đặt trực tiếp:
create table DatTrucTiep (
	DTT_MaPhieu varchar(10),
	DTT_SoBan int,
	DTT_SoLuongKH int,
	primary key (DTT_MaPhieu)
);

-- Bảng Đặt online:
create table DatOnline (
	DO_MaPhieu varchar(10),
	DO_DiaChiGiao nvarchar(100),
	primary key (DO_MaPhieu)
);

-- Bảng Đặt trước:
create table DatTruoc (
	DT_MaPhieu varchar(10),
	DT_MaChiNhanh varchar(10),
	DT_SoBan int, 
	DT_SoLuongKH int,
	DT_ThoiGianDen datetime,
	DT_GhiChuThem nvarchar(100),
	primary key (DT_MaPhieu)
)

-- Bảng Khách hàng:
create table KhachHang (
	KH_SDT varchar(12),
	KH_HoTen nvarchar(50), 
	KH_CCCD varchar(13),
	KH_Email varchar(30),
	KH_GioiTinh nvarchar(3),
	primary key (KH_SDT)
);

-- Bảng Loại thẻ:
create table LoaiThe (
	LT_TenLoaiThe nvarchar(30),
	primary key (LT_TenLoaiThe)
);

-- Bảng Thẻ thành viên
create table TheThanhVien (
	TTV_MaThe varchar(10),
	TTV_NgayTao date,
	TTV_SoNamSuDung int, 
	TTV_DiemTichLuy int,
	TTV_TrangThai nvarchar(30),
	TTV_LoaiThe nvarchar(30),
	TTV_SDT_KH varchar(12),
	TTV_MaNhanVien varchar(10), --Nhân viên tạo thẻ
	primary key (TTV_MaThe)
);

-- Bảng Khuyến mãi:
create table KhuyenMai (
	KM_MaKhuyenMai varchar(10),
	KM_TenKhuyenMai nvarchar(50),
	KM_TenSuKien nvarchar(50),
	KM_TyLeGiamGia float, -- dùng dạng thập phân
	KM_LoaiTheApDung nvarchar(30),
	KM_MaChiNhanh varchar(10),
	primary key (KM_MaKhuyenMai)
);

-- Bảng Hóa đơn:
create table HoaDon (
	HD_MaHoaDon varchar(10),
	HD_SoTienGiam float, -- Số tiền giảm giá
	HD_TongTruocGiam float, -- Tổng tiền trước khi giảm
	HD_TongTienThanhToan float, 
	HD_MaPhieu varchar(10),
	primary key (HD_MaHoaDon)
);

-- Bảng Phiếu đánh giá:
create table PhieuDanhGia (
	DG_MaHoaDon varchar(10),
	DG_BinhLuan nvarchar(100),
	DG_DiemPhucVu int,
	DG_DiemChiNhanh int, 
	DG_DiemCLMonAn int,
	DG_DiemGiaCa int,
	DG_DiemKhongGian int,
	primary key (DG_MaHoaDon)
)

-- Bảng Nhân viên:
create table NhanVien (
	NV_MaNhanVien varchar(10),
	NV_HoTen nvarchar(50),
	NV_NgaySinh datetime,
	NV_GioiTinh nvarchar(3),
	NV_NgayVaoLam datetime,
	NV_NgayNghiViec datetime,
	NV_DiaChi nvarchar(100),
	NV_SDT varchar(12),
	NV_SoNha int,
	NV_TenDuong nvarchar(30),
	NV_TenPhuong nvarchar(30),
	NV_TenQuan nvarchar(30),
	NV_TenThanhPho nvarchar(30),
	primary key (NV_MaNhanVien)
);

-- Bảng Bộ phận của Nhân viên:
create table BoPhan_NhanVien (
	BP_NV_MaNhanVien varchar(10),
	BP_NV_MaChiNhanh varchar(10),
	BP_NV_TenBoPhan nvarchar(50),
	BP_NV_ChucVu nvarchar(20),
	BP_NV_Luong float,
	primary key (BP_NV_MaNhanVien, BP_NV_MaChiNhanh, BP_NV_TenBoPhan)
);

-- Bảng Lịch sử làm việc:
create table LichSuLamViec (
	LSLV_MaNhanVien varchar(10),
	LSLV_MaChiNhanhCu varchar(10),
	LSLV_NgayBatDau datetime,
	LSLV_NgayKetThuc datetime,
	primary key (LSLV_MaNhanVien, LSLV_MaChiNhanhCu, LSLV_NgayBatDau)
);

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY, -- Tự động tăng ID cho mỗi user
    Email NVARCHAR(100) NOT NULL UNIQUE, -- Email phải là duy nhất
    Password NVARCHAR(MAX) NOT NULL,     -- Lưu mật khẩu đã được mã hóa (hashed password)
    Name NVARCHAR(100) NOT NULL,         -- Tên người dùng
    Role NVARCHAR(50) NOT NULL DEFAULT 'customer', -- Vai trò: customer, employee, admin
    CreatedAt DATETIME DEFAULT GETDATE(), -- Thời gian tạo tài khoản
    UpdatedAt DATETIME DEFAULT GETDATE()  -- Thời gian cập nhật tài khoản
);

go
-- Xóa database:
-- use master;
-- drop database DB_SushiX;

-- -- Thêm dữ liệu mẫu vào bảng DanhMuc
-- INSERT INTO DanhMuc (DM_MaDanhMuc, DM_TenDanhMuc)
-- VALUES
-- ('DM001', 'Khai vị'),
-- ('DM002', 'Món chính'),
-- ('DM003', 'Tráng miệng'),
-- ('DM004', 'Đồ uống');

-- -- Thêm dữ liệu mẫu vào bảng MonAn
-- INSERT INTO MonAn (MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc)
-- VALUES	
-- ('MA001', 'Gỏi cuốn', 50000, 2, 1, 1, 'DM001'),
-- ('MA002', 'Sashimi cá hồi', 200000, 1, 1, 1, 'DM002'),
-- ('MA003', 'Tempura', 150000, 1, 0, 1, 'DM002'),
-- ('MA004', 'Bánh chocolate', 80000, 1, 1, 0, 'DM003'),
-- ('MA005', 'Trà đá', 10000, 1, 1, 1, 'DM004'),
-- ('MA006', 'Combo lẩu thập cẩm', 400000, 4, 1, 0, 'DM002'),
-- ('MA007', 'Súp miso', 25000, 1, 1, 1, 'DM001'),
-- ('MA008', 'Kem trà xanh', 50000, 1, 1, 0, 'DM003'),
-- ('MA009', 'Chanh đá', 15000, 1, 1, 1, 'DM004');

--create table HinhAnh_MonAn (
--	HA_MA_MaMon varchar(10), 
--	HA_MA_DuongLink nvarchar(100),
--	primary key (HA_MA_MaMon, HA_MA_DuongLink)
--)
