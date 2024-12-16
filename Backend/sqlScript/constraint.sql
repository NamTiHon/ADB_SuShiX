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
	add constraint FK_DT_MaChiNhanh_CN_MaChiNhanh
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
--alter table ChiNhanh
--	add constraint C_ChiNhanh_ThoiGian
--	check (CN_TGMoCua < CN_TGDongCua)

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
