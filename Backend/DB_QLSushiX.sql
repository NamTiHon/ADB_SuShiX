-- Tạo database:
CREATE DATABASE DB_SushiX ON
    (Name = DB_SushiX_data, 
    FileName = 'D:\SINHVIEN\tempCSDLNC\DB_SushiX_data.mdf')
LOG ON
    (Name = DB_SushiX_log,
    FileName = 'D:\SINHVIEN\tempCSDLNC\DB_QLSushiX_log.ldf');
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
	CN_TGMoCua time, 
	CN_TGDongCua time,
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
go
-- Tạo khóa ngoại và ràng buộc:
-- Tạo khóa ngoại:
-- Bảng Chi Nhánh:
alter table ChiNhanh
	add constraint FK_CN_MaQuanLy_NV_NhanVien
	foreign key (CN_MaQuanLy)
	references NhanVien(NV_MaNhanVien)

alter table ChiNhanh
	add constraint FK_CN_MaKhuVuc_KV_MaKhuVuc
	foreign key (CN_MaKhuVuc)
	references KhuVuc(KV_MaKhuVuc)

-- Bảng Khu vực:
alter table KhuVuc
	add constraint FK_KV_MaThucDon_TD_MaThucDon
	foreign key (KV_MaThucDon)
	references ThucDon(TD_MaThucDon)

--Bảng Danh mục trong thực đơn
alter table DanhMuc_ThucDon
	add constraint FK_DM_TD_MaThucDon_TD_MaThucDon
	foreign key (DM_TD_MaThucDon)
	references ThucDon(TD_MaTHucDon)

alter table DanhMuc_ThucDon
	add constraint FK_DM_TD_MaDanhMuc_DM_MaDanhMuc
	foreign key (DM_TD_MaDanhMuc)
	references DanhMuc(DM_MaDanhMuc)

--Bảng Món ăn
alter table MonAn
	add constraint FK_MA_MaDanhMuc_DM_MaDanhMuc
	foreign key (MA_MaDanhMuc)
	references DanhMuc(DM_MaDanhMuc)

--Bảng Món được đặt
alter table MonDuocDat
	add constraint FK_MDD_MaMon_MA_MaMon
	foreign key (MDD_MaMon)
	references MonAn(MA_MaMon)

alter table MonDuocDat
	add constraint FK_MDD_MaPhieu_PDM_MaPhieu
	foreign key (MDD_MaPhieu)
	references PhieuDatMon(PDM_MaPhieu)

--Bảng Phiếu đặt món
alter table PhieuDatMon
	add constraint FK_PDM_SDT_KH_KH_SDT
	foreign key (PDM_SDT_KH)
	references KhachHang(KH_SDT)

alter table PhieuDatMon
	add constraint FK_PDM_MaNhanVien_NV_MaNhanVien
	foreign key (PDM_MaNhanVien)
	references NhanVien(NV_MaNhanVien)

--Bảng Đặt trước
alter table DatTruoc
	add constraint FK_DT_MaChiNhanh_CN_MaChiNHanh
	foreign key (DT_MaChiNhanh)
	references ChiNhanh(CN_MaChiNhanh)

--Bảng Thẻ thành viên
alter table TheThanhVien
	add constraint FK_TTV_LoaiThe_LT_TenLoaiThe
	foreign key (TTV_LoaiThe)
	references LoaiThe(LT_TenLoaiThe)

alter table TheThanhVien
	add constraint FK_TTV_SDT_KH_KH_SDT
	foreign key (TTV_SDT_KH)
	references KhachHang(KH_SDT)

alter table TheThanhVien
	add constraint FK_TTV_MaNhanVien_NV_MaNhanVien
	foreign key (TTV_MaNhanVien)
	references NhanVien(NV_MaNhanVien)

--Bảng Khuyến mãi
alter table KhuyenMai
	add constraint FK_KM_MaChiNhanh_CN_MaChiNhanh
	foreign key (KM_MaChiNhanh)
	references ChiNhanh(CN_MaChiNhanh)

alter table KhuyenMai
	add constraint FK_KM_LoaiTheApDung_LT_TenLoaiThe
	foreign key (KM_LoaiTheApDung)
	references LoaiThe(LT_TenLoaiThe)

--Bảng hóa đơn
alter table HoaDon
	add constraint FK_HD_MaPhieu_PDM_MaPhieu
	foreign key (HD_MaPhieu)
	references PhieuDatMon(PDM_MaPhieu)

--Bảng Phiếu đánh giá
alter table PhieuDanhGia
	add constraint FK_PDG_MaHoaDon_HD_MaHoaDon
	foreign key (DG_MaHoaDon)
	references HoaDon(HD_MaHoaDon)

--Bảng Bộ phận của nhân viên
alter table BoPhan_NhanVien
	add constraint FK_BP_NV_MaNhanVien_NV_MaNhanVien
	foreign key (BP_NV_MaNhanVien)
	references NhanVien(NV_MaNhanVien)

alter table BoPhan_NhanVien
	add constraint FK_BP_NV_MaChiNhanh_CN_MaChiNhanh
	foreign key (BP_NV_MaChiNhanh)
	references ChiNhanh(CN_MaChiNhanh)

--Bảng Lịch sử làm việc
alter table LichSuLamViec
	add constraint FK_LSLV_MaChiNhanhCu_CN_MaChiNhanh
	foreign key (LSLV_MaChiNhanhCu)
	references ChiNhanh(CN_MaChiNhanh)

alter table LichSuLamViec
	add constraint FK_LSLV_MaNhanVien_NV_BangNhanVien
	foreign key (LSLV_MaNhanVien)
	references NhanVien(NV_MaNhanVien)

-- Ràng buộc: 
-- Bảng Chi Nhánh:
alter table ChiNhanh
	add constraint C_ChiNhanh_ThoiGian
	check (CN_TGMoCua < CN_TGDongCua)

alter table ChiNhanh
	add constraint C_ChiNhanh_BaiXeMay
	check (CN_BaiDoXeMay in (0, 1))

alter table ChiNhanh
	add constraint C_ChiNhanh_BaiXeOto
	check (CN_BaiDoXeOto in (0, 1))

alter table ChiNhanh
	add constraint C_ChiNhanh_HoTroGiaoHang
	check (CN_HoTroGiaoHang in (0, 1))

-- Bảng Món ăn:
alter table MonAn
	add constraint C_MonAn_CoSan
	check (MA_CoSan in (0, 1))

alter table MonAn
	add constraint C_MonAn_HoTroGiaoHang
	check (MA_HoTroGiaoHang in (0, 1))

alter table MonAn
	add constraint C_MonAn_KhauPhanAn
	check (MA_KhauPhan > 0)

-- Bảng món được đặt:
alter table MonDuocDat
	add constraint C_MonDuocDat_SoLuong
	check (MDD_SoLuong >0)

-- Bảng Đặt trực tiếp
alter table DatTrucTiep
	add constraint C_DTT_SoBan
	check (DTT_SoBan > 0)

alter table DatTrucTiep
	add constraint C_DTT_SoLuongKH
	check (DTT_SoLuongKH > 0)

-- Bảng Đặt trước
alter table DatTruoc
	add constraint C_DT_SoBan
	check (DT_SoBan > 0 )

alter table DatTruoc
	add constraint C_DT_SoLuongKH
	check (DT_SoLuongKH > 0)

-- Bảng khách hàng
alter table KhachHang
	add constraint C_KH_GioiTinh
	check (KH_GioiTinh in ('Nam', N'Nữ'))

-- Bảng Loại thẻ
alter table LoaiThe
	add constraint C_LT_TenLoaiThe
	check (LT_TenLoaiThe in ('Membership', 'Silver', 'Gold'))

-- Bảng Thẻ Thành Viên
alter table TheThanhVien
	add constraint C_TTV_SoNamSuDung
	check (TTV_SoNamSuDung > 0)

alter table TheThanhVien
	add constraint C_TTV_DiemTichLuy
	check (TTV_DiemTichLuy > 0)

alter table TheThanhVien
	add constraint C_TTV_TrangThai
	check (TTV_TrangThai in (N'Mở', N'Đóng'))

-- Khuyến mãi
alter table KhuyenMai
	add constraint C_KM_TyLeGiamGia
	check (KM_TyLeGiamGia > 0 and KM_TyLeGiamGia < 1)


-- Hóa đơn:
alter table HoaDon
	add constraint C_HD_Tien
	check ( HD_SoTienGiam > 0 and HD_SoTienGiam < HD_TongTruocGiam  and HD_SoTienGiam < HD_TongTienThanhToan)

-- Bảng Phiếu đánh giá:
alter table PhieuDanhGia
	add constraint C_PDG_DiemPhucVu
	check (DG_DiemPhucVu > 0 and DG_DiemPhucVu < 6)

alter table PhieuDanhGia
	add constraint C_PDG_DiemChiNhanh
	check (DG_DiemChiNhanh > 0 and DG_DiemChiNhanh < 6)

alter table PhieuDanhGia
	add constraint C_PDG_DiemCLMonAn
	check (DG_DiemCLMonAn > 0 and DG_DiemCLMonAn < 6)

alter table PhieuDanhGia
	add constraint C_PDG_DiemGiaCa
	check (DG_DiemGiaCa > 0 and DG_DiemGiaCa < 6)

alter table PhieuDanhGia
	add constraint C_PDG_DiemKhongGian
	check (DG_DiemKhongGian > 0 and DG_DiemKhongGian < 6)

-- Bảng Nhân Viên:
alter table NhanVien
	add constraint C_NV_ThoiGian
	check (NV_NgayVaoLam < NV_NgayNghiViec)

alter table NhanVien
	add constraint C_NV_GioiTinh
	check (NV_GioiTinh in ('Nam', N'Nữ'))

alter table NhanVien
	add constraint C_NV_NgaySinh
	check (NV_NgaySinh < NV_NgayVaoLam)

-- Bảng Bộ phận của nhân viên
alter table BoPhan_NhanVien
	add constraint C_BP_NV_Luong
	check (BP_NV_Luong > 0.0)

-- Bảng lịch sử làm việc
alter table LichSuLamViec
	add constraint C_LSLV_ThoiGian
	check (LSLV_NgayBatDau < LSLV_NgayKetThuc)
-- Xóa database:
-- use master;
-- drop database DB_SushiX;6

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

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY, -- Tự động tăng ID cho mỗi user
    Email NVARCHAR(100) NOT NULL UNIQUE, -- Email phải là duy nhất
    Password NVARCHAR(MAX) NOT NULL,     -- Lưu mật khẩu đã được mã hóa (hashed password)
    Name NVARCHAR(100) NOT NULL,         -- Tên người dùng
    Role NVARCHAR(50) NOT NULL DEFAULT 'customer', -- Vai trò: customer, employee, admin
    CreatedAt DATETIME DEFAULT GETDATE(), -- Thời gian tạo tài khoản
    UpdatedAt DATETIME DEFAULT GETDATE()  -- Thời gian cập nhật tài khoản
);