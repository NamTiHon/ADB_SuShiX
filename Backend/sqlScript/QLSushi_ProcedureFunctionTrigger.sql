use DB_SushiX
go

--STORE PROCEDURE
--Thêm món ăn của nhà hàng
CREATE OR ALTER PROCEDURE usp_ThemMonAn
	@MaMon varchar(12), 
	@TenMon nvarchar(50), 
	@Gia float,
	@HoTroGiaoHang BIT,
	@KhauPhan int,
	@CoSan BIT,
	@TenDanhMuc nvarchar(20),
	@HinhAnh varchar(100)
AS
BEGIN
	if exists(select * from MonAn where MA_MaMon = @MaMon)
	begin
		print(N'Món ăn này đã tồn tại')
		return
	end
	else
	begin
		insert into MonAn(MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_TenDanhMuc, MA_HinhAnh)
		output inserted.*
			values
			(@MaMon, @TenMon, @Gia, @KhauPhan, @CoSan, @HoTroGiaoHang, @TenDanhMuc, @HinhAnh)

	end

	print(N'Đã thêm món ăn')
END;

go

--Chỉnh sửa thông tin món ăn
CREATE OR ALTER PROCEDURE usp_ChinhSuaThongTinMonAn
    @MaMon varchar(12), 
    @TenMon nvarchar(50) = NULL, 
    @Gia float = NULL,
    @KhauPhan int = NULL,
    @CoSan BIT = NULL,
    @HoTroGiaoHang BIT = NULL,
    @TenDanhMuc varchar(20) = NULL,
    @HinhAnh varchar(100) = NULL
AS
BEGIN
    if not exists(select * from MonAn where MA_MaMon = @MaMon)
    begin
        print(N'Món ăn không tồn tại.')
        return
    end
    else
    begin
        update MonAn
        set MA_TenMon = coalesce(@TenMon, MA_TenMon),
            MA_GiaHienTai = coalesce(@Gia, MA_GiaHienTai),
            MA_KhauPhan = coalesce(@KhauPhan, MA_KhauPhan),
            MA_CoSan = coalesce(@CoSan, MA_CoSan), 
            MA_HoTroGiaoHang = coalesce(@HoTroGiaoHang, MA_HoTroGiaoHang),
            MA_TenDanhMuc = coalesce(@TenDanhMuc, MA_TenDanhMuc),
            MA_HinhAnh = coalesce(@HinhAnh, MA_HinhAnh)
        where MA_MaMon = @MaMon;

        -- Return updated dish
        select * from MonAn where MA_MaMon = @MaMon;
    end
END;

go

--Loại bỏ món ăn khỏi nhà hàng
create or alter proc usp_XoaMonAn
	@MaMon varchar(12)
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
create or alter proc usp_ThemChiNhanh
	@MaChiNhanh varchar(12),
	@Ten nvarchar(50),
	@DiaChi nvarchar(100),
	@TGMoCua time, 
	@TGDongCua time,
	@SDT varchar(12),
	@BaiDoXeMay BIT,  -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@BaiDoXeOto BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@HoTroGiaoHang BIT, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@MaQuanLy varchar(12), 
	@MaKhuVuc varchar(12),
	@HinhAnh varchar(100)
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
		insert into ChiNhanh(CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang, CN_MaQuanLy, CN_MaKhuVuc, CN_MaHinhAnh)
			values
			(@MaChiNhanh, @Ten, @DiaChi, @TGMoCua, @TGDongCua, @SDT, @BaiDoXeMay, @BaiDoXeOto, @HoTroGiaoHang, @MaQuanLy, @MaKhuVuc, @HinhAnh)
	end

	print(N'Đã thêm chi nhánh')
end;

go 

--Chỉnh sửa thông tin chi nhánh
create or alter proc usp_ChinhSuaThongTinChiNhanh
	@MaChiNhanh varchar(12),
	@Ten nvarchar(50) = NULL,
	@DiaChi nvarchar(100) = NULL,
	@TGMoCua time = NULL, 
	@TGDongCua time = NULL,
	@SDT varchar(12) = NULL,
	@BaiDoXeMay BIT = NULL,  -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@BaiDoXeOto BIT = NULL, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@HoTroGiaoHang BIT = NULL, -- dùng để lưu giá trị bool: 0 là không có, 1 là có
	@MaQuanLy varchar(12) = NULL, 
	@MaKhuVuc varchar(12) = NULL
as
begin
	if @MaChiNhanh is not null and not exists(select * from NhanVien where NV_MaNhanVien = @MaQuanLy)
	begin
		print(N'Nhân viên quản lí này không tồn tại.')
		return
	end

	if @MaKhuVuc is not null and not exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
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
create or alter proc usp_XoaChiNhanh
	@MaChiNhanh varchar(12)
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
		delete from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh
	end

	print(N'Đã xóa chi nhánh')
end;

go

--Thêm thực đơn khu vực mới
create or alter proc usp_ThemKhuVuc
	@MaKhuVuc varchar(12),
	@Ten nvarchar(50),
	@MaThucDon varchar(12),
	@TenDanhMuc varchar(20)
as
begin
	if exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này đã tồn tại')
		return
	end
	else
	begin
		insert into KhuVuc(KV_MAKhuVuc, KV_Ten, KV_MaThucDon, KV_TenDanhMuc)
			values
			(@MaKhuVuc, @Ten, @MaThucDon, @TenDanhMuc)
	end

	print(N'Đã thêm khu vực')
end;

go

--Điều chỉnh thông tin khu vực nếu có thay đổi
create or alter proc usp_ChinhSuaThongTinKhuVuc
	@MaKhuVuc varchar(12),
	@Ten nvarchar(50) = NULL,
	@MaThucDon varchar(12) = NULL,
	@TenDanhMuc varchar(20) = NULL
as
begin
	if not exists(select * from KhuVuc where KV_MaKhuVuc = @MaKhuVuc)
	begin
		print(N'Khu vực này không tồn tại')
		return
	end
	else
	begin
		update KhuVuc
		set KV_Ten = coalesce(@Ten, KV_Ten),
			KV_MaThucDon = coalesce(@MaThucDon, KV_MaThucDon),
			KV_TenDanhMuc = coalesce(@TenDanhMuc, KV_TenDanhMuc)
		where KV_MaKhuVuc = @MaKhuVuc
	end

	print(N'Đã chỉnh sửa thông tin khu vực')
end;

go

--Xóa khu vực khỏi phạm vi kinh doanh của nhà hàng
create or alter proc usp_XoaKhuVuc
	@MaKhuVuc varchar(12)
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
create or alter proc usp_TaoPhieuDatMon
	@MaPhieu varchar(12),
	@ThoiGianDat datetime,
	@SDT_KH varchar(12),
	@MaNhanVien varchar(12),
	@SoBan int = NULL, 
	@SoLuongKH int = NULL,
	@DiaChiGiao nvarchar(100) = NULL,
	@MaChiNhanh varchar(12) = NULL,
	@ThoiGianDen datetime = NULL,
	@GhiChuThem nvarchar(100) = NULL
as
begin 
	if not exists(select * from KhachHang where KH_SDT = @SDT_KH)
	begin
		print(N'Khách hàng không tồn tại.')
		return
	end

	if @MaChiNhanh is not null and not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh) -- Kiểm tra nếu đây là phiếu đặt trước
	begin
		print(N'Chi nhánh này không tồn tại.')
		return
	end

	if not exists(select * from NhanVien where NV_MaNhanVien = @MaNhanVien) 
	begin
		print(N'Nhân viên này không tồn tại.')
		return
	end

	if exists(select * from PhieuDatMon where PDM_MaPhieu = @MaPhieu)
	begin
		print(N'Mã phiếu này này đã tồn tại')
		return
	end
	else
	begin
		insert into PhieuDatMon(PDM_MaPhieu, PDM_ThoiGianDat, PDM_SDT_KH, PDM_MaNhanVien, PDM_SoBan, PDM_SoLuongKH, PDM_DiaChiCanGiao, PDM_MaChiNhanh, PDM_ThoiGianDen, PDM_GhiChuThem, PDM_TrangThai)
			values
			(@MaPhieu, @ThoiGianDat, @SDT_KH, @MaNhanVien, @SoBan, @SoLuongKH, @DiaChiGiao, @MaChiNhanh, @ThoiGianDen, @GhiChuThem, N'Chờ xác nhận')
	end

	print(N'Đã nhận phiếu đặt món')
end;

go

--Chỉnh sửa thông tin phiếu đặt món
create or alter proc usp_ChinhSuaThongTinDatMon
	@MaPhieu varchar(12),
	@ThoiGianDat datetime = NULL,
	@SDT_KH varchar(12) = NULL,
	@MaNhanVien varchar(12) = NULL,
	@SoBan int = NULL, 
	@SoLuongKH int = NULL,
	@DiaChiGiao nvarchar(100) = NULL,
	@MaChiNhanh varchar(12) = NULL,
	@ThoiGianDen datetime = NULL,
	@GhiChuThem nvarchar(100) = NULL
as
begin 
	if @SDT_KH is not null and not exists(select * from KhachHang where KH_SDT = @SDT_KH)
	begin
		print(N'Khách hàng không tồn tại.')
		return
	end

	if @MaChiNhanh is not null and not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Chi nhánh này không tồn tại.')
		return
	end

	if @MaNhanVien is not null and not exists(select * from NhanVien where NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Nhân viên này không tồn tại.')
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
			PDM_MaNhanVien =  coalesce(@MaNhanVien, PDM_MaNhanVien),
			PDM_SoBan = coalesce(@SoBan, PDM_SoBan),
			PDM_SoLuongKH = coalesce(@SoLuongKH, PDM_SoluongKH), 
			PDM_ThoiGianDen = coalesce(@ThoiGianDen, PDM_ThoiGianDen),
			PDM_DiaChiCanGiao = coalesce(@DiaChiGiao, PDM_DiaChiCanGiao),
			PDM_MaChiNhanh = coalesce(@MaChiNhanh, PDM_MaChiNhanh),
			PDM_GhiChuThem = coalesce(@GhiChuThem, PDM_GhiChuThem)
		where PDM_MaPhieu = @MaPhieu
	end

	print(N'Đã thay đổi thông tin phiếu đặt món')
end;

go

--Hủy phiếu đặt món
create or alter proc usp_HuyPhieuDatMon
	@MaPhieu varchar(12)
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

--Thêm món ăn mới vào phiếu đặt món( nếu có yêu cầu thêm)
create or alter proc usp_ThemMonDuocDat
	@MaMon varchar(12),
	@MaPhieu varchar(12),
	@SoLuong int
as
begin 

	
	begin
		insert into MonDuocDat(MDD_MaMon, MDD_MaPhieu, MDD_SoLuong)
		output inserted.*
			values
			(@MaMon, @MaPhieu, @SoLuong)
	end

	print(N'Đã thêm món ăn cho phiếu đặt món.')
end;

go

--Thay đổi thông tin số lượng của món đã có trong phiếu đặt món
create or alter proc usp_ThayDoiSoLuongMon
	@MaMon varchar(12),
	@MaPhieu varchar(12),
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
create or alter proc usp_HuyMon
	@MaMon varchar(12),
	@MaPhieu varchar(12)
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
create or alter proc usp_TaoTheThanhVien
	@MaThe varchar(12),
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
		insert into TheThanhVien(TTV_MaThe, TTV_NgayTao, TTV_SoNamSuDung, TTV_DiemTichLuy, TTV_TrangThai, TTV_LoaiThe, TTV_SDT_KH, TTV_MaNhanVien)
			values
			(@MaThe, @NgayTao, 0, 0, 'Available', @LoaiThe, @SDT_KH, @MaNhanVien)

		    -- Trả về thông tin thẻ thành viên mới tạo
		SELECT * FROM TheThanhVien WHERE TTV_MaThe = @MaThe;
	end

	print(N'Đã tạo thẻ thành viên.')
end;
go
--Cập nhật thông tin thẻ thàng viên
create or alter proc usp_CapNhatThongTinTheThanhVien
	@MaThe varchar(12),
	@SoNamSuDung int = NULL,
	@DiemTichLuy int = NULL,
	@TrangThai nvarchar(30) = NULL,
	@LoaiThe nvarchar(30) = NULL
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
create or alter proc usp_TaoHoaDon
	@MaHoaDon varchar(12),
	@SoTienGiam float,
	@TongTruocGiam float, 
	@MaPhieu varchar(12)
as
begin
	if exists(select * from HoaDon where HD_MaHoaDon = @MaHoaDon)
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
create or alter proc usp_ThemKhachHang
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
	if exists(select * from KhachHang where KH_Email = @Email)
	begin
		print(N'Email này đã tồn tại khách hàng đăng ký.')
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
create or alter proc usp_ChinhSuaThongTinKhachHang
	@SDT varchar(12),
	@HoTen nvarchar(50) = NULL, 
	@CCCD varchar(13) = NULL,
	@Email varchar(30) = NULL,
	@GioiTinh nvarchar(3) = NULL
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
		where KH_SDT = @SDT		
	end
	print(N'Đã thay đổi thông tin khách hàng.')
end

go
--Thêm nhân viên mới vào danh sách nhân viên của nhà hàng
create or alter proc usp_ThemNhanVien
	@MaNhanVien varchar(12),
	@HoTen nvarchar(50),
	@NgaySinh datetime,
	@GioiTinh nvarchar(3),
	@NgayVaoLam datetime,
	@NgayNghiViec datetime = NULL,
	@DiaChi nvarchar(100),
	@SDT varchar(12),
	@SoNha int,
	@TenDuong nvarchar(30) = NULL,
	@TenPhuong nvarchar(30) = NULL,
	@TenQuan nvarchar(30) = NULL,
	@TenThanhPho nvarchar(30) = NULL
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
		output inserted.*
			values
			(@MaNhanVien, @HoTen, @NgaySinh, @GioiTinh, @NgayVaoLam, @NgayNghiViec, @DiaChi, @SDT, @SoNha, @TenDuong, @TenPhuong, @TenQuan, @TenThanhPho)
	end
	print(N'Thêm nhan viên thành công.')
end

go

--Thêm bộ phận, chức vụ cho nhân viên theo chi nhánh
create or alter proc usp_ThemBoPhanNhanVien
	@MaNhanVien varchar(12),
	@MaChiNhanh varchar(12),
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
create or alter proc usp_ThayDoiBoPhanNhanVien
	@MaNhanVien varchar(12),
	@MaChiNhanh varchar(12) = NULL,
	@TenBoPhan nvarchar(50) = NULL,
	@ChucVu nvarchar(20) = NULL,
	@Luong float = NULL
as
begin
	if not exists(select * from BoPhan_NhanVien where BP_NV_MaNhanVien = @MaNhanVien)
	begin
		print(N'Không có mã nhân viên này trong danh sách chức vụ nhà hàng. Hãy bổ sung nếu cần thiết.')
		return
	end

	if @MaChiNhanh is not null and not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
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
create or alter proc usp_BoSungLichSuLamViec
	@MaNhanVien varchar(12),
	@MaChiNhanhCu varchar(12),
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
-- Tính doanh thu theo tháng( đầu vào là tháng, năm, đầu ra là doanh thu theo tháng)
create or alter proc usp_DoanhThuTheoThang
	@month int,
	@year int,
	@revenue float out
as
begin
	set nocount on
	
	if (@month > month(getdate()) and @year = year(getdate())) or @year > year(getdate())
	begin
		print(N'Thời gian này chưa có thông tin.')
		return
	end

	set @revenue = isnull((select sum(HD_TongTienThanhToan) from HoaDon join PhieuDatMon on HD_MaPhieu = PDM_MaPhieu
				   where month(PDM_ThoiGianDat) = @month and year(PDM_ThoiGianDat) = @year), 0)

end

go
-- Tính số lượng thẻ đã lập trong tháng( đầu vào là tháng, năm, đầu ra là số lượng thẻ được lập trong tháng)
create or alter proc usp_SoTheTheoThang
	@month int,
	@year int,
	@count float out
as
begin
	set nocount on
	
	if (@month > month(getdate()) and @year = year(getdate())) or @year > year(getdate())
	begin
		print(N'Thời gian này chưa có thông tin.')
		return
	end

	set @count = isnull((select count(TTV_MaThe) from TheThanhVien
				   where month(TTV_NgayTao) = @month and year(TTV_NgayTao) = @year), 0)

end

go
-- Tính doanh thu theo chi nhánh( đầu vào là chi nhánh, đầu ra là doanh thu của chi nhánh đó)
create or alter proc usp_DoanhThuTheoChiNhanh
	@MaChiNhanh varchar(12),
	@revenue float out
as
begin
	set nocount on
	
	if not exists(select * from ChiNhanh where CN_MaChiNhanh = @MaChiNhanh)
	begin
		print(N'Không tồn tại chi nhánh này.')
		return
	end

	set @revenue = isnull((select sum(HD_TongTienThanhToan) from HoaDon join PhieuDatMon on HD_MaPhieu = PDM_MaPhieu
																		join BoPhan_NhanVien on PDM_MaNhanVien = BP_NV_MaNhanVien
				   where BP_NV_MaNhanVien = @MaChiNhanh), 0)

end

go
-- Thống kê toàn bộ khách hàng( theo thẻ thành viên còn hoạt động)
create or alter proc usp_ToanBoKhachHang
	@count float out
as
begin
	set nocount on

	set @count = isnull((select count(TTV_SDT_KH) from TheThanhVien where TTV_TrangThai = 'Available'), 0)

end


go
--FUNCTION
-- Xem danh sách các món ăn có ở khu vực X
create or alter function uf_DanhSachMonAnTheoKhuVuc
	(@MaKhuVuc varchar(12))
	returns table
as
	return ( select * from MonAn join KhuVuc on MA_TenDanhMuc = KV_TenDanhMuc
			 where KV_MaKhuVuc = @MaKhuVuc)
go

create or alter function uf_XemToanBoChiNhanh ()
returns table
as
	return 
	(select CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_MaQuanLy, CN_MaKhuVuc, KV_Ten, CN_MaHinhAnh, 
	CONVERT(VARCHAR(8), CN_TGMoCua, 108) AS CN_TGMoCua,
     CONVERT(VARCHAR(8), CN_TGDongCua, 108) AS CN_TGDongCua
	from ChiNhanh join KhuVuc on KhuVuc.KV_MaKhuVuc = ChiNhanh.CN_MaKhuVuc
	group by CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_MaQuanLy, CN_MaKhuVuc, KV_Ten, CN_TGMoCua, CN_TGDongCua, CN_MaHinhAnh )

go 

create or alter function uf_XemThongTinChiNhanhBangMaChiNhanh 
	(@MaChiNhanh varchar(12))
returns table
as
	return 
	(select CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_MaQuanLy, CN_MaKhuVuc, KV_Ten,
	CONVERT(VARCHAR(8), CN_TGMoCua, 108) AS CN_TGMoCua,
     CONVERT(VARCHAR(8), CN_TGDongCua, 108) AS CN_TGDongCua
	from ChiNhanh join KhuVuc on KhuVuc.KV_MaKhuVuc = ChiNhanh.CN_MaKhuVuc
	where ChiNhanh.CN_MaChiNhanh = @MaChiNhanh
	group by CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_MaQuanLy, CN_MaKhuVuc, KV_Ten, CN_TGMoCua, CN_TGDongCua )

go
--Xem danh sách chi nhánh có món ăn X
create or alter function uf_DanhSachChiNhanhCoMonAn
	(@MaMonAn varchar(12))
	returns table
as
	return ( select * from ChiNhanh
			 where CN_MaKhuVuc = (select KV_MaKhuVuc from KhuVuc join MonAn on MA_TenDanhMuc = KV_TenDanhMuc where MA_MaMon = @MaMonAn))
go

create or alter function uf_MonAnTheoChiNhanh()
returns table
as 
	return (
		select MonAn.*, KhuVuc.KV_Ten, CN_Ten
		from MonAn join KhuVuc on MonAn.MA_TenDanhMuc = KhuVuc.KV_TenDanhMuc
		join ChiNhanh on KhuVuc.KV_MaKhuVuc = ChiNhanh.CN_MaKhuVuc )

go

--Xem danh sách chi nhánh trong một khu vực
create or alter function uf_DanhSachChiNhanhCuaKhuVuc
	(@MaKhuVuc varchar(12))
	returns table
as
	return ( select CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang
			 from ChiNhanh
			 where CN_MaKhuVuc = @MaKhuVuc)
go

--Xem danh sách nhân viên theo chi nhánh
create or alter function uf_XemDanhSachNhanVienTheoChiNhanh
	(@MaChiNhanh varchar(12))
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
	(@MaKhuVuc varchar(12))
	returns table
as
	return ( select * from MonAn 
			 where MA_TenDanhMuc in ( select KV_TenDanhMuc from KhuVuc
									 where KV_MaKhuVuc = @MaKhuVuc))
go

--Xem thực đơn theo chi nhánh
create or alter function uf_XemThucDonTheoChiNhanh
	(@MaChiNhanh varchar(12))
	returns table
as
	return ( select * from MonAn 
			 where MA_TenDanhMuc in ( select KV_TenDanhMuc from KhuVuc join ChiNhanh on KV_MaKhuVuc = CN_MaKhuVuc
									 where CN_MaChiNhanh = @MaChiNhanh))
go

--Xem chi tiết phiếu đặt món
create or alter function uf_XemPhieuDatMon
	(@MaPhieu varchar(12))
	returns table
as
	return ( select * from MonDuocDat join PhieuDatMon on MDD_MaPhieu = PDM_MaPhieu where MDD_MaPhieu=@MaPhieu)
go

-- Thống kê top 10 món bán chạy nhất
create or alter function uf_BanChay()
	returns table
as
	return (select top 10 MA_MaMon, MA_TenMon from MonDuocDat left join MonAn on MDD_MaMon = MA_MaMon
			group by MA_MaMon, MA_TenMon
			order by sum(MDD_SoLuong) desc)
go

-- Stored Procedure cho hóa đơn
CREATE OR ALTER PROCEDURE usp_LayTatCaHoaDon
AS
BEGIN
    SELECT * FROM HoaDon;
END

GO

CREATE OR ALTER PROCEDURE usp_LayHoaDonTheoMa
    @HD_MaHoaDon VARCHAR(12)
AS
BEGIN
    SELECT * 
    FROM HoaDon
    WHERE HD_MaHoaDon = @HD_MaHoaDon;
END

GO

CREATE OR ALTER PROCEDURE usp_CapNhatHoaDon
    @HD_MaHoaDon VARCHAR(12),
    @HD_SoTienGiam FLOAT,
    @HD_TongTruocGiam FLOAT,
    @HD_TongTienThanhToan FLOAT,
    @HD_MaPhieu VARCHAR(12)
AS
BEGIN
    UPDATE HoaDon
    SET HD_SoTienGiam = @HD_SoTienGiam,
        HD_TongTruocGiam = @HD_TongTruocGiam,
        HD_TongTienThanhToan = @HD_TongTienThanhToan,
        HD_MaPhieu = @HD_MaPhieu
    WHERE HD_MaHoaDon = @HD_MaHoaDon;

    SELECT * FROM HoaDon WHERE HD_MaHoaDon = @HD_MaHoaDon;
END

GO

CREATE OR ALTER PROCEDURE usp_XoaHoaDon
    @HD_MaHoaDon VARCHAR(12)
AS
BEGIN
    DELETE FROM HoaDon
    WHERE HD_MaHoaDon = @HD_MaHoaDon;
END

GO
--TRIGGER
--- This is need for trigger

--Nhân viên đặt món không được ở bộ phận Bếp hoặc Vệ sinh.
create or alter trigger utg_NhanVienDatMon
on PhieuDatMon
for insert, update
as
begin
	declare @MaNhanVien varchar(12)
	select @MaNhanVien = PDM_MaNhanVien from inserted

	if exists( select * from BoPhan_NhanVien
				   where BP_NV_MaNhanVien = @MaNhanVien and (BP_NV_TenBoPhan = N'Bếp' or BP_NV_TenBoPhan = N'Vệ sinh'))
	begin
		raiserror(N'Lỗi: Nhân viên đặt món không được ở bộ phận Bếp hoặc Vệ sinh.', 16, 1)
		rollback transaction
	end
end

go
--Nhân viên lập thẻ thành viên không được ở bộ phận Bếp hoặc Vệ sinh.
create or alter trigger utg_NhanVienLapThe
on TheThanhVien
for insert, update
as
begin
	declare @MaNhanVien varchar(12)
	select @MaNhanVien = TTV_MaNhanVien from inserted

	if exists( select * from BoPhan_NhanVien
				   where BP_NV_MaNhanVien = @MaNhanVien and (BP_NV_TenBoPhan = N'Bếp' or BP_NV_TenBoPhan = N'Vệ sinh'))
	begin
		raiserror(N'Lỗi: Nhân viên lập thẻ thành viên không được ở bộ phận Bếp hoặc Vệ sinh.', 16, 1)
		rollback transaction
	end
end

go

--Khách hàng phải chưa có thẻ hoặc có thẻ đã khóa mới có thể lập thẻ mới
create or alter trigger utg_LapThe
on TheThanhVien
for insert, update
as
begin
	declare @SDT_KH varchar(12)
	select @SDT_KH = TTV_SDT_KH from inserted

	if( select count(TTV_SDT_KH) from TheThanhVien
				   where TTV_SDT_KH = @SDT_KH and TTV_TrangThai = 'Available') > 1
	begin
		raiserror(N'Lỗi: Khách hàng này đã có thẻ.', 16, 1)
		rollback transaction
	end
end

/*
DECLARE @ProcedureName NVARCHAR(MAX);
DECLARE @SQL NVARCHAR(MAX);

-- Tạo CURSOR để lấy tất cả các stored procedures trong database hiện tại
DECLARE proc_cursor CURSOR FOR
SELECT QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) AS ProcedureName
FROM sys.procedures;

-- Mở CURSOR và lặp qua từng procedure
OPEN proc_cursor;
FETCH NEXT FROM proc_cursor INTO @ProcedureName;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Tạo câu lệnh DROP PROCEDURE
    SET @SQL = 'DROP PROCEDURE ' + @ProcedureName + ';';
    PRINT @SQL; -- In câu lệnh DROP để kiểm tra trước khi chạy
    EXEC sp_executesql @SQL; -- Thực thi lệnh xóa

    FETCH NEXT FROM proc_cursor INTO @ProcedureName;
END;

-- Đóng và giải phóng CURSOR
CLOSE proc_cursor;
DEALLOCATE proc_cursor;
*/
