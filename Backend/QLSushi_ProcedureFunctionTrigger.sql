--Store procedure

--Thêm món ăn của nhà hàng
create or alter proc sp_ThemMonAn
	@MaMon varchar(10), 
	@TenMon nvarchar(50), 
	@Gia float,
	@KhauPhan int,
	@CoSan BIT,
	@HoTroGiaoHang BIT,
	@MaDanhMuc varchar(10)
as
begin
	if not exists(select * from DanhMuc where DM_MaDanhMuc = @MaDanhMuc)
	begin
		print(N'Danh mục không tồn tại.')
		return
	end

	if exists(select * from MonAn where MA_MaMon = @MaMon)
	begin
		print(N'Món ăn này đã tồn tại')
		return
	end
	else
	begin
		insert into MonAn(MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc)
			values
			(@MaMon, @TenMon, @Gia, @KhauPhan, @CoSan, @HoTroGiaoHang, @MaDanhMuc)
	end

	print(N'Đã thêm món ăn')
end;

go

--Chỉnh sửa thông tin món ăn: Nhập tất cả các thuộc tính của món ăn( thay đổi thông tin cần thiết, còn lại giữ nguyên)
create or alter proc sp_ChinhSuaThongTinMonAn
	@MaMon varchar(10), 
	@TenMon nvarchar(50), 
	@Gia float,
	@KhauPhan int,
	@CoSan BIT,
	@HoTroGiaoHang BIT,
	@MaDanhMuc varchar(10)
as
begin
	if not exists(select * from DanhMuc where DM_MaDanhMuc = @MaDanhMuc)
	begin
		print(N'Danh mục không tồn tại.')
		return
	end

	if not exists(select * from MonAn where MA_MaMon = @MaMon)
	begin
		print(N'Món ăn không tồn tại.')
		return
	end
	else
	begin
		update MonAn
		set MA_TenMon = @TenMon, MA_GiaHienTai = @Gia, MA_KhauPhan = @KhauPhan, MA_CoSan = @CoSan, MA_HoTroGiaoHang = @HoTroGiaoHang, MA_MaDanhMuc =  @MaDanhMuc
		where MA_MaMon = @MaMon
	end

	print(N'Đã thay đổi món ăn')
end;

go

--Loại bỏ món ăn khỏi nhà hàng
create or alter proc sp_XoaMonAn
	@MaMon varchar(10)
as 
begin
	if not exists(select * from MonAn where MA_MaMon = @MaMon)
	begin
		print(N'Món ăn không tồn tại.')
		return
	end

	if exists(select * from MonDuocDat where MDD_MaMon = @MaMon)
	begin
		print(N'Món ăn này chưa thể xóa.')
		return
	end
	else 
	begin
		delete from MonAn where MA_MaMon = @MaMon
		print(N'Đã xóa món ăn.')
	end
end;

go

--Thêm chi nhánh 
create or alter proc sp_ThemChiNhanh
	@MaChiNhanh varchar(10),
	@Ten nvarchar(50),
	@DiaChi nvarchar(100),
	@TGMoCua time, 
	@TGDongCua time,
	@SDT varchar(12),
	@BaiDoXeMay BIT,  -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@BaiDoXeOto BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@HoTroGiaoHang BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@MaQuanLy varchar(10), 
	@MaKhuVuc varchar(10)
as
begin
	if not exists(select * from NhanVien where NV_MaNhanVien = @MaQuanLy)
	begin
		print(N'Nhân viên quản lí này không tồn tại.')
		return
	end

	if not exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này không tồn tại.')
		return
	end

	if exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Chi nhánh này đã tồn tại')
		return
	end
	else
	begin
		insert into ChiNhanh(CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang, CN_MaQuanLy, CN_MaKhuVuc)
			values
			(@MaChiNhanh, @Ten, @DiaChi, @TGMoCua, @TGDongCua, @SDT, @BaiDoXeMay, @BaiDoXeOto, @HoTroGiaoHang, @MaQuanLy, @MaKhuVuc)
	end

	print(N'Đã thêm chi nhánh')
end;

go 

--Chỉnh sửa thông tin chi nhánh: Nhập tất cả các thuộc tính của món ăn( thay đổi thông tin cần thiết, còn lại giữ nguyên)
create or alter proc sp_ChinhSuaThongTinChiNhanh
	@MaChiNhanh varchar(10),
	@Ten nvarchar(50),
	@DiaChi nvarchar(100),
	@TGMoCua time, 
	@TGDongCua time,
	@SDT varchar(12),
	@BaiDoXeMay BIT,  -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@BaiDoXeOto BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@HoTroGiaoHang BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@MaQuanLy varchar(10), 
	@MaKhuVuc varchar(10)
as
begin
	if not exists(select * from NhanVien where NV_MaNhanVien = @MaQuanLy)
	begin
		print(N'Nhân viên quản lí này không tồn tại.')
		return
	end

	if not exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này không tồn tại.')
		return
	end

	if not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Chi nhánh này không tồn tại')
		return
	end
	else
	begin
		update ChiNhanh
		set CN_Ten = @Ten, CN_DiaChi = @DiaChi, CN_TGMoCua = @TGMoCua, CN_TGDongCua = @TGDongCua, CN_SDT = @SDT, CN_BaiDoXeMay = @BaiDoXeMay, cn_BaiDoOto = @BaiDoOto, CN_HoTroGiaoHang = @HoTroGiaoHang, CN_MaQuanLy = @MaQuanLy, CN_MaKhuVuc = @MaKhuVuc
		where CN_MaChiNhanh = @MaChiNhanh
	end

	print(N'Đã thay đổi thông tin chi nhánh')
end;

go 

---Xóa chi nhánh
create or alter proc sp_XoaChiNhanh
	@MaChiNhanh varchar(10)
as
begin
	if not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Chi nhánh này không tồn tại')
		return
	end
	else
	begin
		delete from BoPhan_NhanVien where BP_NV_MaChiNhanh = @MaChiNhanh
		delete from DatTruoc where DT_MaChiNhanh = @MaChiNhanh
		delete from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh
	end

	print(N'Đã xóa chi nhánh')
end;

go

create or alter proc sp_ThemKhuVuc
	@MaKhuVuc varchar(10),
	@Ten nvarchar(50),
	@MaThucDon varchar(10)
as
begin
	if not exists(select * from ThucDon where TD_MaThucDon = @MaThucDon)
	begin
		print(N'Thực đơn không tồn tại.')
		return
	end

	if exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này đã tồn tại')
		return
	end
	else
	begin
		insert into KhuVuc(KV_MAKhuVuc, KV_Ten, KV_MaThucDon)
			values
			(@MaKhuVuc, @Ten, @MaThucDon)
	end

	print(N'Đã thêm khu vực')
end;

go

create or alter proc sp_ChinhSuaThongTinKhuVuc
	@MaKhuVuc varchar(10),
	@Ten nvarchar(50),
	@MaThucDon varchar(10)
as
begin
	if not exists(select * from ThucDon where TD_MaThucDon = @MaThucDon)
	begin
		print(N'Thực đơn không tồn tại.')
		return
	end

	if not exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này không tồn tại')
		return
	end
	else
	begin
		update KhuVuc
		set KV_Ten = @Ten, KV_MaThucDon = @MaThucDon
		where KV_MaKhuVuc = @MaKhuVuc
	end

	print(N'Đã chỉnh sửa thông tin khu vực')
end;

go

create or alter proc sp_XoaKhuVuc
	@MaKhuVuc varchar(10)
as
begin
	if not exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này không tồn tại')
		return
	end
	else
	begin
		delete from KhuVuc where KV_MaKhuVuc = @MaKhuVuc
	end

	print(N'Đã xóa khu vực')
end;

go

create or alter proc sp_TaoPhieuDatMon
	@MaPhieu varchar(10),
	@ThoiGianDat datetime,
	@SDT_KH varchar(12),
	@MaNhanVien varchar(10)
as
begin 
	if not exists(select * from KhachHang where KH_SDT = @SDT_KH)
	begin
		print(N'Khách hàng không tồn tại.')
		return
	end

	if exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này này đã tồn tại')
		return
	end
	else
	begin
		insert into PhieuDatMon(PDM_MaPhieu, PDM_ThoiGianDat, PDM_SDT_KH, PDM_MaNhanVien)
			values
			(@MaPhieu, @ThoiGianDat, @SDT_KH, @MaNhanVien)
	end

	print(N'Đã nhận phiếu đặt món')
end;

go

create or alter proc sp_ChinhSuaThongTinDatMon
	@MaPhieu varchar(10),
	@ThoiGianDat datetime,
	@SDT_KH varchar(12),
	@MaNhanVien varchar(10)
as
begin 
	if not exists(select * from KhachHang where KH_SDT = @SDT_KH)
	begin
		print(N'Khách hàng không tồn tại.')
		return
	end

	if not exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại')
		return
	end
	else
	begin
		update PhieuDatMon
		set PDM_ThoiGianDat =  @ThoiGianDat, PDM_SDT_KH = @SDT_KH, PDM_MaNhanVien =  @MaNhanVien
		where PDM_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi thông tin phiếu đặt món')
end;

go

create or alter proc sp_HuyPhieuDatMon
	@MaPhieu varchar(10)
as
begin 
	if not exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại')
		return
	end

	if exists(select * from MonDuocDat where MDD_MaPhieu = @MaPhieu )
	begin
		print(N'Phiếu không hủy được nữa.')
		return
	end
	else
	begin
		delete from PhieuDatMon where PDM_MaPhieu = @MaPhieu
	end

	print(N'Đã hủy phiếu đặt món')
end;

go

create or alter proc sp_ThemMonDuocDat
	@MaMon varchar(10),
	@MaPhieu varchar(10),
	@SoLuong int
as
begin 
	if not exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Phiếu đặt món không tồn tại.')
		return
	end

	if exists(select * from MonDuocDat where MDD_MaMon = @MaMon) and exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Món ăn này đã được đặt rồi.')
		return
	end
	else
	begin
		insert into MonDuocDat(MDD_MaMon, MDD_MaPhieu, MDD_SoLuong)
			values
			(@MaMon, @MaPhieu, @SoLuong)
	end

	print(N'Đã thêm món ăn cho phiếu đặt món.')
end;

go

create or alter proc sp_ThayDoiSoLuongMon
	@MaMon varchar(10),
	@MaPhieu varchar(10),
	@SoLuong int
as
begin 
	if not exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Phiếu đặt món không tồn tại.')
		return
	end

	if not (exists(select * from MonDuocDat where MDD_MaMon = @MaMon) and exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu))
	begin
		print(N'Món ăn này không có trong phiếu đặt món.')
		return
	end
	else
	begin
		update MonDuocDat
		set MDD_SoLuong =  @SoLuong
		where MDD_MaMon = @MaMon and MDD_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi số lượng món ăn.')
end;

go

create or alter proc sp_HuyMon
	@MaMon varchar(10),
	@MaPhieu varchar(10)
as
begin 
	if not (exists(select * from MonDuocDat where MDD_MaMon = @MaMon) and exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu))
	begin
		print(N'Món ăn này không có trong phiếu đặt món.')
		return
	end
	else
	begin
		delete from MonDuocDat where MDD_MaMon = @MaMon and MDD_MaPhieu = @MaPhieu
	end

	print(N'Đã hủy món khỏi phiếu đặt món.')
end;

go

create or alter proc sp_TaoTheThanhVien
	@MaThe varchar(10),
	@NgayTao date,
	@LoaiThe nvarchar(30),
	@SDT_KH varchar(12),
	@MaNhanVien varchar(10)
as
begin 
	if not exists(select * from KhachHang where KH_SDT = @SDT_KH)
	begin
		print(N'Khách hàng chưa được lưu.')
		return
	end

	if not exists(select * from NhanVien where NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Nhân viên lập thẻ không hợp lệ.')
		return
	end

	if exists(select * from TheThanhVien where TTV_MaThe = @MaThe)
	begin
		print(N'Mã thể này đã có chủ sở hữu.')
		return
	end
	else
	begin
		insert into TheThanhVien(TTV_MaThe, TTV_NgayTao, TTV_LoaiThe, TTV_SDT_KH, TTV_MaNhanVien)
			values
			(@MaThe, @NgayTao, @LoaiThe, @SDT_KH, @MaNhanVien)
	end

	print(N'Đã tạo thẻ thành viên.')
end;

go
	
create or alter proc sp_CapNhatThongTinTheThanhVien
	@MaThe varchar(10),
	@SoNamSuDung int,
	@DiemTichLuy int,
	@TrangThai nvarchar(30),
	@LoaiThe nvarchar(30)
as
begin 
	if not exists(select * from TheThanhVien where TTV_MaThe = @MaThe)
	begin
		print(N'Mã thể không hợp lệ.')
		return
	end

	if exists(select * from TheThanhVien where TTV_MaThe = @MaThe and TTV_Trang_Thai = N'Đã khóa')
	begin
		print(N'Thẻ đã bị vô hiệu hóa.')
		return
	end
	else
	begin
		update TheThanhVien
		set TTV_SoNamSuDung = @SoNamSuDung, TTV_DiemTichLuy = @DiemTichLuy, TTV_TrangThai = @TrangThai, TTV_LoaiThe = @LoaiThe
		where TTV_MaThe = @MaThe
	end

	print(N'Đã cập nhật thông tin thẻ thành viên.')
end;

go

create or alter proc sp_TaoHoaDon
	@MaHoaDon varchar(10),
	@SoTienGiam float,
	@TongTruocGiam float, 
	@MaPhieu varchar(10)
as
begin
	if not exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Phiếu đặt món không hợp lệ.')
		return
	end

	if not exists(select * from HoaDon where HD_MaHoaDon = @MaHoaDon)
	begin
		print(N'Mã hóa dơn này đã tồn tại.')
		return
	end
	else
	begin
		insert into HoaDon(HD_MaHoaDon, HD_SoTienGiam, HD_TongTruocGiam, HD_TongTienThanhToan, HD_MaPhieu)
			values
			(@MaHoaDon, @SoTienGiam, @TongTruocGiam, @TongTruocGiam - @SoTienGiam, @MaPhieu)
	end

	print(N'Đã tạo hóa đơn thành công.')
end;
