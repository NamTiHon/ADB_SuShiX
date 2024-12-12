--STORE PROCEDURE
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

--Chỉnh sửa thông tin món ăn
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
		set MA_TenMon = coalesce(@TenMon, MA_TenMon), --Nếu không thay đổi tên món, giữ tên món như cũ
			MA_GiaHienTai = coalesce(@Gia, MA_GiaHienTai),
			MA_KhauPhan = coalesce(@KhauPhan, MA_KhauPhan),
			MA_CoSan = coalesce(@CoSan, MA_CoSan), 
			MA_HoTroGiaoHang = coalesce(@HoTroGiaoHang, MA_HoTroGiaoHang),
			MA_MaDanhMuc =  coalesce(@MaDanhMuc, MA_MaDanhMuc)
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

--Chỉnh sửa thông tin chi nhánh
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
		set CN_Ten = coalesce(@Ten, CN_Ten),
			CN_DiaChi = coalesce(@DiaChi, CN_DiaChi),
			CN_TGMoCua = coalesce(@TGMoCua, CN_TGMoCua),
			CN_TGDongCua = coalesce(@TGDongCua, CN_TGDongCua), 
			CN_SDT = coalesce(@SDT, CN_SDT),
			CN_BaiDoXeMay = coalesce(@BaiDoXeMay, CN_BaiDoXeMay),
			CN_BaiDoXeOto = coalesce(@BaiDoXeOto, CN_BaiDoXeOto),
			CN_HoTroGiaoHang = coalesce(@HoTroGiaoHang, CN_HoTroGiaoHang),
			CN_MaQuanLy = coalesce(@MaQuanLy, CN_MaQuanLy),
			CN_MaKhuVuc = coalesce(@MaKhuVuc, CN_MaKhuVuc)
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

--Thêm khu vực mới
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

--Điều chỉnh thông tin khu vực nếu có thay đổi
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
		set KV_Ten = coalesce(@Ten, KV_Ten),
			KV_MaThucDon = coalesce(@MaThucDon, KV_MaThucDon)
		where KV_MaKhuVuc = @MaKhuVuc
	end

	print(N'Đã chỉnh sửa thông tin khu vực')
end;

go

--Xóa khu vực khỏi phạm vi kinh doanh của nhà hàng
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

--Tạo phiếu đặt món
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

--Chỉnh sửa thông tin phiếu đặt món
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
		set PDM_ThoiGianDat =  coalesce(@ThoiGianDat, PDM_ThoiGianDat),
			PDM_SDT_KH = coalesce(@SDT_KH, PDM_SDT_KH),
			PDM_MaNhanVien =  coalesce(@MaNhanVien, PDM_MaNhanVien)
		where PDM_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi thông tin phiếu đặt món')
end;

go

--Hủy phiếu đặt món
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

--Tạo phiếu đặt trực tiếp
create or alter proc sp_TaoPhieuDatTrucTiep
	@MaPhieu varchar(10),
	@SoBan int,
	@SoLuongKhach int
as
begin 
	if exists(select * from DatTrucTiep where DTT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này này đã tồn tại')
		return
	end
	else
	begin
		insert into DatTrucTiep(DTT_MaPhieu, DTT_SoBan, DTT_SoLuongKH)
			values
			(@MaPhieu, @SoBan, @SoLuongKhach)
	end

	print(N'Đã nhận phiếu đặt trực tiếp.')
end;

go

--Chỉnh sửa thông tin phiếu đặt trực tiếp
create or alter proc sp_ChinhSuaThongTinDatTrucTiep
	@MaPhieu varchar(10),
	@SoBan int,
	@SoLuongKhach int
as
begin 
	if not exists(select * from DatTrucTiep where DTT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại.')
		return
	end
	else
	begin
		update DatTrucTiep
		set DTT_SoBan =  coalesce(@SoBan, DTT_SoBan),
			DTT_SoLuongKH =  coalesce(@SoLuongKhach, DTT_SoLuongKH)
		where DTT_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi thông tin phiếu đặt trực tiếp.')
end;

go

--Hủy phiếu đặt trực tiếp
create or alter proc sp_HuyPhieuDatTrucTiep
	@MaPhieu varchar(10)
as
begin 
	if not exists(select * from DatTrucTiep where DTT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại')
		return
	end
	else
	begin
		delete from DatTrucTiep where DTT_MaPhieu = @MaPhieu
	end

	print(N'Đã hủy phiếu đặt trực tiếp.')
end;

go

--Tạo phiếu đặt trước
create or alter proc sp_TaoPhieuDatTruoc
	@MaPhieu varchar(10),
	@MaChiNhanh varchar(10),
	@SoBan int, 
	@SoLuongKH int,
	@ThoiGianDen datetime,
	@GhiChuThem nvarchar(100)
as
begin 
	if exists(select * from DatTruoc where DT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này này đã tồn tại')
		return
	end
	else
	begin
		insert into DatTruoc(DT_MaPhieu, DT_MaChiNhanh, DT_SoBan, DT_SoLuongKH, DT_ThoiGianDen, DT_GhiChuThem)
			values
			(@MaPhieu, @MaChiNhanh, @SoBan, @SoLuongKH, @ThoiGianDen, @GhiChuThem)
	end

	print(N'Đã nhận phiếu đặt trước.')
end;

go

--Chỉnh sửa thông tin phiếu đặt trước
create or alter proc sp_ChinhSuaThongTinDatTruoc
	@MaPhieu varchar(10),
	@MaChiNhanh varchar(10),
	@SoBan int, 
	@SoLuongKH int,
	@ThoiGianDen datetime,
	@GhiChuThem nvarchar(100)
as
begin 
	if not exists(select * from DatTruoc where DT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại.')
		return
	end
	else
	begin
		update DatTruoc
		set DT_MaChiNhanh =  coalesce(@SoBan, DT_MaChiNhanh),
			DT_SoBan =  coalesce(@SoBan, DT_SoBan),
			DT_SoLuongKH = coalesce(@SoLuongKH, DT_SoLuongKH),
			DT_ThoiGianDen = coalesce(@ThoiGianDen, DT_ThoiGianDen),
			DT_GhiChuThem = coalesce(@GhiChuThem, DT_GhiChuThem)
		where DT_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi thông tin phiếu đặt trước.')
end;

go

--Hủy phiếu đặt trước
create or alter proc sp_HuyPhieuDatTruoc
	@MaPhieu varchar(10)
as
begin 
	if not exists(select * from DatTruoc where DT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại')
		return
	end
	else
	begin
		delete from DatTruoc where DT_MaPhieu = @MaPhieu
	end

	print(N'Đã hủy phiếu đặt trước')
end;

go

--Tạo phiếu đặt online
create or alter proc sp_TaoPhieuDatOnline
	@MaPhieu varchar(10),
	@DiaChiGiao nvarchar(100)
as
begin 
	if exists(select * from DatOnline where DO_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này này đã tồn tại')
		return
	end
	else
	begin
		insert into DatOnline(DO_MaPhieu, DO_DiaChiGiao)
			values
			(@MaPhieu, @DiaChiGiao)
	end

	print(N'Đã nhận phiếu đặt online.')
end;

go

--Chỉnh sửa địa chỉ giao hàng phiếu đặt online
create or alter proc sp_ChinhSuaThongTinDatTruoc
	@MaPhieu varchar(10),
	@DiaChiGiao nvarchar(100)
as
begin 
	if not exists(select * from DatTruoc where DT_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại.')
		return
	end
	else
	begin
		update DatOnline
		set DO_DiaChiGiao =  coalesce(@DiaChiGiao, DO_DiaChiGiao)
		where DO_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi thông tin phiếu đặt online.')
end;

go

--Hủy phiếu đặt online
create or alter proc sp_HuyPhieuDatOnline
	@MaPhieu varchar(10)
as
begin 
	if not exists(select * from DatOnline where DO_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này không tồn tại.')
		return
	end
	else
	begin
		delete from DatOnline where DO_MaPhieu = @MaPhieu
	end

	print(N'Đã hủy phiếu đặt online.')
end;

go

--Thêm món ăn mới vào phiếu đặt món( nếu có yêu cầu thêm)
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

--Thay đổi thông tin số lượng của món đã có trong phiếu đặt món
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
		set MDD_SoLuong =  coalesce(@SoLuong, MDD_SoLuong)
		where MDD_MaMon = @MaMon and MDD_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi số lượng món ăn.')
end;

go

--Hủy món ăn có trong phiếu đặt món
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

--Tạo thẻ thành viên cho khách hàng mới
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

--Cập nhật thông tin thẻ thàng viên
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

	if exists(select * from TheThanhVien where TTV_MaThe = @MaThe and TTV_TrangThai = N'Đã khóa')
	begin
		print(N'Thẻ đã bị vô hiệu hóa.')
		return
	end
	else
	begin
		update TheThanhVien
		set TTV_SoNamSuDung = coalesce(@SoNamSuDung, TTV_SoNamSuDung),
			TTV_DiemTichLuy = coalesce(@DiemTichLuy, TTV_DiemTichLuy),
			TTV_TrangThai = coalesce(@TrangThai, TTV_TrangThai),
			TTV_LoaiThe = coalesce(@LoaiThe, TTV_LoaiThe)
		where TTV_MaThe = @MaThe
	end

	print(N'Đã cập nhật thông tin thẻ thành viên.')
end;

go

--Tạo hóa đơn theo phiếu đặt món
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
		print(N'Mã hóa đơn này đã tồn tại.')
		return
	end
	else
	begin
		insert into HoaDon(HD_MaHoaDon, HD_SoTienGiam, HD_TongTruocGiam, HD_TongTienThanhToan, HD_MaPhieu)
			values
			(@MaHoaDon, @SoTienGiam, @TongTruocGiam, @TongTruocGiam - @SoTienGiam, @MaPhieu)
	end

	print(N'Đã tạo hóa đơn thành công.')
end

go

--Thêm khách hàng mới
create or alter proc sp_ThemKhachHang
	@SDT varchar(12),
	@HoTen nvarchar(50), 
	@CCCD varchar(13),
	@Email varchar(30),
	@GioiTinh nvarchar(3)
as
begin
	if exists(select * from KhachHang where KH_SDT = @SDT)
	begin
		print(N'Số điện thoại này đã tồn tại khách hàng đăng ký.')
		return
	end
	else
	begin
		insert into KhachHang(KH_SDT , KH_HoTen , KH_CCCD , KH_Email , KH_GioiTinh)
		values
		(@SDT, @HoTen, @CCCD, @Email, @GioiTinh)
	end
	print(N'Đã thêm khách hàng mới.')
end

go
--Chỉnh sửa thông tin khách hàng
create or alter proc sp_ChinhSuaThongTinKhachHang
	@SDT varchar(12),
	@HoTen nvarchar(50), 
	@CCCD varchar(13),
	@Email varchar(30),
	@GioiTinh nvarchar(3)
as
begin
	if not exists(select * from KhachHang where KH_SDT = @SDT)
	begin
		print(N'Số điện thoại này không có trong danh sách khách hàng.')
		return
	end
	else
	begin
		update KhachHang
		set KH_HoTen = coalesce(@HoTen, KH_HoTen),
			KH_CCCD = coalesce(@CCCD, KH_CCCD),
			KH_Email = coalesce(@Email, KH_Email),
			KH_GioiTinh = coalesce(@GioiTinh, KH_GioiTinh)			
	end
	print(N'Đã thay đổi thông tin khách hàng.')
end

go
--Thêm nhân viên mới vào danh sách nhân viên của nhà hàng
create or alter proc sp_ThemNhanVien
	@MaNhanVien varchar(10),
	@HoTen nvarchar(50),
	@NgaySinh datetime,
	@GioiTinh nvarchar(3),
	@NgayVaoLam datetime,
	@NgayNghiViec datetime,
	@DiaChi nvarchar(100),
	@SDT varchar(12),
	@SoNha int,
	@TenDuong nvarchar(30),
	@TenPhuong nvarchar(30),
	@TenQuan nvarchar(30),
	@TenThanhPho nvarchar(30)
as
begin
	if exists(select *  from NhanVien where NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Đã tồn tại mã nhân viên này.')
		return
	end
	else
	begin
		insert into NhanVien(NV_MaNhanVien, NV_HoTen, NV_NgaySinh, NV_GioiTinh, NV_NgayVaoLam, NV_NgayNghiViec, NV_DiaChi, NV_SDT, NV_SoNha, NV_TenDuong, NV_TenPhuong, NV_TenQuan, NV_TenThanhPho)
			values
			(@MaNhanVien, @HoTen, @NgaySinh, @GioiTinh, @NgayVaoLam, @NgayNghiViec, @DiaChi, @SDT, @SoNha, @TenDuong, @TenPhuong, @TenQuan, @TenThanhPho)
	end
	print(N'Thêm nhan viên thành công.')
end

go

--Thêm bộ phận, chức vụ cho nhân viên theo chi nhánh
create or alter proc sp_ThemBoPhanNhanVien
	@MaNhanVien varchar(10),
	@MaChiNhanh varchar(10),
	@TenBoPhan nvarchar(50),
	@ChucVu nvarchar(20),
	@Luong float
as
begin
	if not exists(select * from NhanVien where NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Không có mã nhân viên này')
		return
	end

	if not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Không tồn tại chi nhánh này.')
		return
	end

	if exists(select * from BoPhan_NhanVien where BP_NV_MaChiNhanh = @MaChiNhanh and BP_NV_MaNhanVien = @MaNhanVien and BP_NV_TenBoPhan = @TenBoPhan)
	begin
		print(N'Nhân viên này đang ở trong bộ phận này.')
		return
	end
	else
	begin
		insert into BoPhan_NhanVien(BP_NV_MaNhanVien, BP_NV_MaChiNhanh, BP_NV_TenBoPhan, BP_NV_ChucVu, BP_NV_Luong)
			values
			(@MaNhanVien, @MaChiNhanh, @TenBoPhan, @ChucVu, @Luong)
	end
	print(N'Thêm thông tin bộ phận của nhân viên thành công.')
end

go

--Thay đổi bộ phận và/hoặc chi nhánh nhân viên nếu có thay đổi về nơi làm việc và/hoặc chức vụ tại nhà hàng
create or alter proc sp_ThayDoiBoPhanNhanVien
	@MaNhanVien varchar(10),
	@MaChiNhanh varchar(10),
	@TenBoPhan nvarchar(50),
	@ChucVu nvarchar(20),
	@Luong float
as
begin
	if not exists(select * from BoPhan_NhanVien where BP_NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Không có mã nhân viên này trong danh sách chức vụ nhà hàng. Hãy bổ sung nếu cần thiết.')
		return
	end

	if not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Không tồn tại chi nhánh này.')
		return
	end

	if exists(select * from BoPhan_NhanVien where BP_NV_MaChiNhanh = @MaChiNhanh and BP_NV_MaNhanVien = @MaNhanVien and BP_NV_TenBoPhan = @TenBoPhan)
	begin
		print(N'Nhân viên này đang ở trong bộ phận này của chi nhánh.')
		return
	end
	else
	begin
		update BoPhan_NhanVien
		set BP_NV_MaChiNhanh = @MaChiNhanh, BP_NV_TenBoPhan = @TenBoPhan, BP_NV_ChucVu = @ChucVu, BP_NV_Luong = @Luong
		where BP_NV_MaNhanVien = @MaNhanVien
	end
	print(N'Cập nhật thông tin bộ phận của nhân viên thành công.')
end
	
go
--Bổ sung lịch sử làm việc của nhân viên tại nhà hàng nếu có thay đổi về nơi làm việc và/hoặc chức vụ tại nhà hàng
create or alter proc sp_BoSungLichSuLamViec
	@MaNhanVien varchar(10),
	@MaChiNhanhCu varchar(10),
	@NgayBatDau datetime,
	@NgayKetThuc datetime
as
begin
	if not exists(select * from NhanVien where NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Không có mã nhân viên này')
		return
	end

	if not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanhCu)
	begin
		print(N'Không tồn tại chi nhánh này.')
		return
	end

	if exists(select * from LichSuLamViec where LSLV_MaChiNhanhCu = @MaChiNhanhCu and LSLV_MaNhanVien = @MaNhanVien and LSLV_NgayBatDau = @NgayBatDau)
	begin
		print(N'Đã tồn tại lịch sử làm việc này.')
		return
	end
	else
	begin
		insert into LichSulamViec(LSLV_MaNhanVien, LSLV_MaChiNhanhCu, LSLV_NgayBatDau, LSLV_NgayKetThuc)
			values
			(@MaNhanVien, @MaChiNhanhCu, @NgayBatDau, @NgayKetThuc)
	end
	print(N'Thêm lịch sử làm việc của nhân viên thành công.')
end

go
--FUNCTION
create or alter function uf_DanhSachMonAnTheoKhuVuc
	(@MaKhuVuc varchar(10))
	returns table
as
	return ( select * from MonAn join DanhMuc_ThucDon on MA_MaDanhMuc = DM_TD_MaDanhMuc
			 where DM_TD_MaThucDon = (select KV_MaThucDon from KhuVuc where KV_MaKhuVuc = @MaKhuVuc))


go
--Xem danh sách chi nhánh có món ăn X
create or alter function uf_DanhSachKhuVucCoMonAn
	(@MaMonAn varchar(10))
	returns table
as
	return ( select * from KhuVuc
			 where KV_MaThucDon = (select DM_TD_MaThucDon from MonAn join DanhMuc_ThucDon on MA_MaDanhMuc = DM_TD_MaDanhMuc where MA_MaMon = @MaMonAn))

go
--Xem danh sách chi nhánh trong một khu vực
create or alter function uf_DanhSachChiNhanhCuaKhuVuc
	(@MaKhuVuc varchar(10))
	returns table
as
	return ( select CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang
			 from ChiNhanh
			 where CN_MaKhuVuc = @MaKhuVuc)
go

--Xem danh sách nhân viên theo chi nhánh
create or alter function uf_XemDanhSachNhanVienTheoChiNhanh
	(@MaChiNhanh varchar(10))
	returns table
as
	return ( select * from NhanVien join BoPhan_NhanVien on NV_MaNhanVien = BP_NV_MaNhanVien
			 where BP_NV_MaChiNhanh = @MaChiNhanh)
go

--Xem danh sách nhân viên theo bộ phận
create or alter function uf_XemDanhSachNhanVienTheoChiNhanh
	(@TenBoPhan nvarchar(50))
	returns table
as
	return ( select * from NhanVien join BoPhan_NhanVien on NV_MaNhanVien = BP_NV_MaNhanVien
			 where BP_NV_TenBoPhan = @TenBoPhan)
go

--Xem thông tin nhân viên
create or alter function uf_XemThongTinNhanVien
	(@MaNhanVien varchar(10))
	returns table
as
	return ( select * from NhanVien where NV_MaNhanVien = @MaNhanVien)
go

--Tìm hóa đơn theo khách hàng
create or alter function uf_HoaDonKhachHang
	(@SDT_KH varchar(12))
	returns table
as
	return ( select * from HoaDon join PhieuDatMon on HD_MaPhieu = PDM_MaPhieu
			 where PDM_SDT_KH = @SDT_KH)
go

--Tìm hóa đơn theo ngày
create or alter function uf_HoaDonTheoNgay
	(@ThoiGianDat datetime)
	returns table
as
	return ( select * from HoaDon join PhieuDatMon on HD_MaPhieu = PDM_MaPhieu
			 where PDM_ThoiGianDat = @ThoiGianDat)
go

--Xem thực đơn theo khu vực
create or alter function uf_XemThucDonTheoKhuVuc
	(@MaKhuVuc varchar(10))
	returns table
as
	return ( select * from MonAn 
			 where MA_MaDanhMuc in ( select DM_TD_MaDanhMuc from DanhMuc_ThucDon 
									 where DM_TD_MaThucDon in (select KV_MaThucDon from KhuVuc	
															   where KV_MaKhuVuc = @MaKhuVuc)))
go

--Xem thực đơn theo chi nhánh
create or alter function uf_XemThucDonTheoChiNhanh
	(@MaChiNhanh varchar(10))
	returns table
as
	return ( select * from MonAn 
			 where MA_MaDanhMuc in ( select DM_TD_MaDanhMuc from DanhMuc_ThucDon 
									 where DM_TD_MaThucDon in (select KV_MaThucDon from KhuVuc join ChiNhanh on KV_MaKhuVuc = CN_MaKhuVuc
															   where CN_MaChiNhanh = @MaChiNhanh)))
go

--TRIGGER

