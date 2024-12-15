-- sp_help ChiNhanh;
-- delete from ChiNhanh
-- ALTER TABLE ChiNhanh ALTER COLUMN CN_TGMoCua TIME;
-- ALTER TABLE ChiNhanh ALTER COLUMN CN_TGDongCua TIME;

insert into 
ChiNhanh (CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang)
values
('CN001', N'Chi nhánh 1 TPHCM', N'123 Đường Nguyễn Huệ, Quận 1, TP.HCM', '8:00:00', '22:00:00', '0909123456', 1, 0, 1),
('CN002', N'Chi nhánh 2 TPHCM', N'456 Đường Lý Thường Kiệt, Quận Tân Bình, TP.HCM', '7:00:00', '21:00:00', '0932123456', 0, 1, 1),
('CN003', N'Chi nhánh 3 TP HCM', N'789 Đường Phạm Văn Đồng, Quận Thủ Đức, TP.HCM', '7:30:00', '22:00:00', '0915123456', 1, 1, 0),
('CN004', N'Chi nhánh 1 Đà Nẵng', N'123 Đường Trần Phú, Quận Hải Châu, Đà Nẵng', '8:00:00', '23:00:00', '0987123456', 1, 0, 1),
('CN005', N'Chi nhánh 2 Đà Nẵng', N'456 Đường Nguyễn Văn Linh, Quận Thanh Khê, Đà Nẵng', '9:00:00', '22:00:00', '0978123456', 0, 1, 0),
('CN006', N'Chi nhánh 3 Đà Nẵng', N'789 Đường Điện Biên Phủ, Quận Liên Chiểu, Đà Nẵng', '8:00:00', '22:00:00', '0903123456', 1, 1, 1),
('CN007', N'Chi nhánh 1 Hà Nội', N'123 Đường Kim Mã, Quận Ba Đình, Hà Nội', '7:30:00', '21:00:00', '0945123456', 1, 0, 0),
('CN008', N'Chi nhánh 2 Hà Nội', N'456 Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội', '7:30:00', '21:00:00', '0956123456', 0, 1, 1),
('CN009', N'Chi nhánh 3 Hà Nội', N'789 Đường Giải Phóng, Quận Hoàng Mai, Hà Nội', '8:00:00', '22:00:00', '0967123456', 1, 0, 1),
('CN010', N'Chi nhánh 4 Hà Nội', N'123 Đường Trần Duy Hưng, Quận Cầu Giấy, Hà Nội', '9:00:00', '23:00:00', '0908123456', 0, 1, 0),
('CN011', N'Chi nhánh 1 Hải Phòng', N'135 Đường Lê Hồng Phong, Quận Ngô Quyền, Hải Phòng', '8:00:00', '22:00:00', '988123456', 1, 1, 0),
('CN012', N'Chi nhánh 2 Hải Phòng', N'246 Đường Trần Phú, Quận Lê Chân, Hải Phòng', '7:30:00', '21:30:00', '979123456', 0, 1, 1),
('CN013', N'Chi nhánh 3 Hải Phòng', N'357 Đường Nguyễn Trãi, Quận Kiến An, Hải Phòng', '8:30:00', '22:30:00', '960123456', 1, 0, 1),
('CN014', N'Chi nhánh 1 Cần Thơ', N'123 Đường Mậu Thân, Quận Ninh Kiều, Cần Thơ', '7:00:00', '22:00:00', '951123456', 0, 1, 1),
('CN015', N'Chi nhánh 2 Cần Thơ', N'456 Đường Nguyễn Văn Linh, Quận Cái Răng, Cần Thơ', '8:00:00', '22:00:00', '942123456', 1, 0, 0),
('CN016', N'Chi nhánh 3 Cần Thơ', N'789 Đường Hòa Bình, Quận Bình Thủy, Cần Thơ', '9:00:00', '21:00:00', '933123456', 0, 1, 1),
('CN017', N'Chi nhánh 1 Bình Dương', N'123 Đường Nguyễn Ái Quốc, Thủ Dầu Một, Bình Dương', '8:00:00', '23:00:00', '924123456', 1, 1, 0),
('CN018', N'Chi nhánh 2 Bình Dương', N'456 Đường Võ Văn Kiệt, Thuận An, Bình Dương', '7:30:00', '22:00:00', '915123456', 0, 0, 1),
('CN019', N'Chi nhánh 3 Bình Dương', N'789 Đường Nguyễn Thị Minh Khai, Dĩ An, Bình Dương', '8:30:00', '21:30:00', '906123456', 1, 1, 0),
('CN020', N'Chi nhánh 1 Long An', N'123 Đường Quốc Lộ 1A, Tân An, Long An', '7:00:00', '22:30:00', '997123456', 0, 1, 1);

-- delete from KhuVuc
insert into 
KhuVuc (KV_MaKhuVuc, KV_Ten)
values
('KV001', N'Khu vực TP.HCM'),
('KV002', N'Khu vực Đà Nẵng'),
('KV003', N'Khu vực Hà Nội'),
('KV004', N'Khu vực Hải Phòng'),
('KV005', N'Khu vực Cần Thơ'),
('KV006', N'Khu vực Bình Dương'),
('KV007', N'Khu vực Long An');

-- delete from ThucDon
insert into 
ThucDon (TD_MaThucDon)
values
('TD001'),
('TD002'),
('TD003'),
('TD004'),
('TD005'),
('TD006'),
('TD007');

-- delete from DanhMuc
insert into
DanhMuc (DM_MaDanhMuc, DM_TenDanhMuc)
values
('KV', N'Khai vị'),
('SASHIMI', N'Sashimi combo'),
('NIGIRI', N'Nigiri'),
('TEMPURA', N'Tempura'),
('UDON', N'Udon'),
('HPT', N'Hotpot'),
('LUNCH', N'Lunch set'),
('DRINK', N'Món nước');
go

insert into DanhMuc_ThucDon (DM_TD_MaDanhMuc, DM_TD_MaThucDon)
values
	('TD001', 'KV'),
    ('TD001', 'SASHIMI'),
    ('TD001', 'TEMPURA'),
    ('TD001', 'NIGIRI'),
    ('TD001', 'DRINK'),
    ('TD002', 'SASHIMI'),
    ('TD002', 'NIGIRI'),
    ('TD002', 'TEMPURA'),
    ('TD002', 'UDON'),
    ('TD003', 'KV'),
    ('TD003', 'SASHIMI'),
    ('TD003', 'NIGIRI'),
    ('TD003', 'TEMPURA'),
    ('TD004', 'HPT'),
    ('TD004', 'UDON'),
    ('TD004', 'LUNCH'),
    ('TD004', 'DRINK'),
    ('TD005', 'KV'),
    ('TD005', 'SASHIMI'),
    ('TD005', 'NIGIRI'),
    ('TD005', 'DRINK'),
    ('TD006', 'SASHIMI'),
    ('TD006', 'LUNCH'),
    ('TD006', 'HPT'),
    ('TD006', 'DRINK'),
    ('TD007', 'NIGIRI'),
    ('TD007', 'TEMPURA'),
    ('TD007', 'LUNCH'),
    ('TD007', 'DRINK');


go
-- delete from MonAn
insert into
MonAn (MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_MaDanhMuc)
values
('MA001', N'Sashimi cá hồi', 120.0, 2, 1, 1, 'SASHIMI'),
('MA002', N'Sashimi cá ngừ', 100.0, 1, 1, 1, 'SASHIMI'),
('MA003', N'Sashimi lươn', 130.0, 2, 1, 1, 'SASHIMI'),
('MA004', N'Sashimi tôm', 110.0, 2, 1, 1, 'SASHIMI'),
('MA005', N'Sashimi cá trích', 100.0, 1, 1, 0, 'SASHIMI'),
('MA006', N'Sashimi cá mực', 90.0, 2, 1, 0, 'SASHIMI'),
('MA007', N'Sashimi cá hồi nướng', 160.0, 2, 1, 0, 'SASHIMI'),
('MA008', N'Sashimi cá ngừ nướng', 150.0, 2, 1, 0, 'SASHIMI'),
('MA009', N'Nigiri cá hồi', 80.0, 1, 1, 1, 'NIGIRI'),
('MA010', N'Nigiri cá ngừ', 85.0, 1, 1, 1, 'NIGIRI'),
('MA011', N'Nigiri tôm', 90.0, 1, 1, 1, 'NIGIRI'),
('MA012', N'Nigiri lươn', 95.0, 1, 1, 1, 'NIGIRI'),
('MA013', N'Nigiri cá trích', 75.0, 1, 1, 0, 'NIGIRI'),
('MA014', N'Nigiri cá mực', 85.0, 1, 1, 0, 'NIGIRI'),
('MA015', N'Nigiri tôm nướng', 145.0, 2, 1, 0, 'NIGIRI'),
('MA016', N'Nigiri cá ngừ nướng', 130.0, 2, 0, 0, 'NIGIRI'),
('MA017', N'Nigiri cá hồi nướng', 150.0, 2, 1, 1, 'NIGIRI'),
('MA018', N'Nigiri lươn nướng', 135.0, 2, 1, 1, 'NIGIRI'),
('MA019', N'Udon thịt bò', 65.0, 2, 1, 0, 'UDON'),
('MA020', N'Udon gà', 60.0, 2, 1, 0, 'UDON'),
('MA021', N'Udon tôm', 70.0, 2, 1, 0, 'UDON'),
('MA022', N'Udon hải sản', 85.0, 2, 1, 0, 'UDON'),
('MA023', N'Udon chay', 50.0, 2, 1, 0, 'UDON'),
('MA024', N'Udon rau củ', 55.0, 2, 1, 0, 'UDON'),
('MA025', N'Tempura tôm', 90.0, 2, 1, 1, 'TEMPURA'),
('MA026', N'Tempura rau củ', 70.0, 2, 1, 1, 'TEMPURA'),
('MA027', N'Tempura cá', 80.0, 2, 1, 1, 'TEMPURA'),
('MA028', N'Hotpot cá hồi', 150.0, 2, 1, 1, 'HPT'),
('MA029', N'Hotpot tôm', 120.0, 2, 1, 1, 'HPT'),
('MA030', N'Hotpot gà', 100.0, 2, 1, 1, 'HPT'),
('MA031', N'Hotpot rau củ', 75.0, 2, 1, 1, 'HPT'),
('MA032', N'Lunch set tôm', 130.0, 2, 1, 1, 'LUNCH'),
('MA033', N'Lunch set gà', 110.0, 2, 1, 1, 'LUNCH'),
('MA034', N'Lunch set thịt bò', 120.0, 2, 1, 1, 'LUNCH'),
('MA035', N'Lunch set chay', 90.0, 2, 1, 1, 'LUNCH'),
('MA036', N'Drink nước cam', 20.0, 1, 1, 1, 'DRINK'),
('MA037', N'Drink trà xanh', 25.0, 1, 1, 1, 'DRINK'),
('MA038', N'Drink soda', 30.0, 1, 1, 1, 'DRINK'),
('MA039', N'Drink nước dừa', 40.0, 1, 1, 1, 'DRINK'),
('MA040', N'Drink sinh tố', 45.0, 1, 1, 1, 'DRINK'),
('MA041', N'Cháo vịt', 80.0, 2, 1, 1, 'KV'),
('MA042', N'Canh ngao', 40.0, 1, 1, 1, 'KV'),
('MA043', N'Bánh canh cua', 70.0, 2, 1, 1, 'KV'),
('MA044', N'Bánh cuốn', 60.0, 1, 1, 1, 'KV'),
('MA045', N'Phở gà', 55.0, 2, 1, 1, 'KV'),
('MA046', N'Gỏi đu đủ', 50.0, 1, 1, 1, 'KV'),
('MA047', N'Chả cá Lã Vọng', 150.0, 2, 1, 1, 'KV'),
('MA048', N'Bánh tôm Hồ Tây', 100.0, 1, 1, 1, 'KV'),
('MA049', N'Bún chả Hà Nội', 75.0, 2, 1, 1, 'KV'),
('MA050', N'Nem rán', 40.0, 1, 1, 1, 'KV'),
('MA051', N'Cơm rang dưa bò', 85.0, 2, 1, 1, 'KV'),
('MA052', N'Gà xào hành tây', 95.0, 2, 1, 1, 'KV'),
('MA053', N'Mực xào chua ngọt', 120.0, 2, 1, 1, 'KV'),
('MA054', N'Bánh flan', 40.0, 1, 1, 1, 'KV'),
('MA055', N'Gỏi cuốn', 30.0, 1, 1, 1, 'KV'); 
go


insert into LoaiThe (LT_TenLoaiThe)
values
('Membership'),
('Gold'),
('Silver');

go
-- Bảng KHÁCH HÀNG sử dụng file khachhang.csv
-- 
-- delete from KhachHang

-- Bảng NHÂN VIÊN sử dụng file nhanvien.csv
-- delete from NhanVien

update ChiNhanh
set 
	CN_TGDongCua = cast (CN_TGDongCua as time),
	CN_TGMoCua = cast (CN_TGMoCua as time);

-- Update Mã khu vực cho Chi Nhánh
update ChiNhanh
set CN_MaKhuVuc = 'KV001'
where CN_DiaChi like N'%TP.HCM%'

update ChiNhanh
set CN_MaKhuVuc = 'KV002'
where CN_DiaChi like N'%Đà Nẵng%'

update ChiNhanh
set CN_MaKhuVuc = 'KV003'
where CN_DiaChi like N'%Hà Nội%'

update ChiNhanh
set CN_MaKhuVuc = 'KV004'
where CN_DiaChi like N'%Hải Phòng%'

update ChiNhanh
set CN_MaKhuVuc = 'KV005'
where CN_DiaChi like N'%Cần Thơ%'

update ChiNhanh
set CN_MaKhuVuc = 'KV006'
where CN_DiaChi like N'%Bình Dương%'

update ChiNhanh
set CN_MaKhuVuc = 'KV007'
where CN_DiaChi like N'%Long An%'


update KhuVuc
set KV_MaThucDon = 'TD001'
where KV_MaKhuVuc = 'KV001'

update KhuVuc
set KV_MaThucDon = 'TD002'
where KV_MaKhuVuc = 'KV002'

update KhuVuc
set KV_MaThucDon = 'TD003'
where KV_MaKhuVuc = 'KV003'

update KhuVuc
set KV_MaThucDon = 'TD004'
where KV_MaKhuVuc = 'KV004'

update KhuVuc
set KV_MaThucDon = 'TD005'
where KV_MaKhuVuc = 'KV005'

update KhuVuc
set KV_MaThucDon = 'TD006'
where KV_MaKhuVuc = 'KV006'

update KhuVuc
set KV_MaThucDon = 'TD007'
where KV_MaKhuVuc = 'KV007'


-- select * from ChiNhanh
-- select * from KhuVuc
-- select * from ThucDon
-- select * from DanhMuc
-- select * from MonAn
-- select * from KhachHang
-- select * from NhanVien
-- select * from DanhMuc_ThucDon