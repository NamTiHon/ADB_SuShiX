-- sp_help ChiNhanh;
-- delete from ChiNhanh
-- ALTER TABLE ChiNhanh ALTER COLUMN CN_TGMoCua TIME;
-- ALTER TABLE ChiNhanh ALTER COLUMN CN_TGDongCua TIME;

insert into 
ChiNhanh (CN_MaChiNhanh, CN_Ten, CN_DiaChi, CN_TGMoCua, CN_TGDongCua, CN_SDT, CN_BaiDoXeMay, CN_BaiDoXeOto, CN_HoTroGiaoHang)
values
('CN001', N'Chi nhánh 1 TPHCM', N'123 Đường Nguyễn Huệ, Quận 1, TP.HCM', '00:00:00', '23:59:00', '0909123456', 1, 0, 1),
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
('SUSHI', N'Sushi'),
('SASHIMI', N'Sashimi combo'),
('NIGIRI', N'Nigiri'),
('TEMPURA', N'Tempura'),
('UDON', N'Udon'),
('HPT', N'Hotpot'),
('LUNCH', N'Lunch set'),
('DRINK', N'Món nước');
go

-- delete from DanhMuc_ThucDon
insert into DanhMuc_ThucDon (DM_TD_MaThucDon, DM_TD_MaDanhMuc)
values
    ('TD001', 'KV'),
    ('TD001', 'SASHIMI'),
    ('TD001', 'TEMPURA'),
    ('TD001', 'NIGIRI'),
    ('TD001', 'DRINK'),
	('TD001', 'LUNCH'),
	('TD001', 'UDON'),
    ('TD001', 'SUSHI'), -- Bổ sung SUSHI cho TD001
    ('TD002', 'KV'),
    ('TD002', 'SASHIMI'),
    ('TD002', 'TEMPURA'),
    ('TD002', 'NIGIRI'),
    ('TD002', 'DRINK'),
	('TD002', 'LUNCH'),
    ('TD002', 'SUSHI'), -- Bổ sung SUSHI cho TD002
	('TD002', 'HPT'),
    ('TD003', 'KV'),
    ('TD003', 'SASHIMI'),
    ('TD003', 'TEMPURA'),
    ('TD003', 'NIGIRI'),
    ('TD003', 'DRINK'),
	('TD003', 'UDON'),
	('TD003', 'LUNCH'),
    ('TD003', 'SUSHI'), -- Bổ sung SUSHI cho TD003
    ('TD004', 'KV'),
    ('TD004', 'SASHIMI'),
    ('TD004', 'TEMPURA'),
    ('TD004', 'NIGIRI'),
    ('TD004', 'DRINK'),
	('TD004', 'HPT'),
	('TD004', 'UDON'),
    ('TD004', 'SUSHI'), -- Bổ sung SUSHI cho TD004
    ('TD005', 'KV'),
    ('TD005', 'SASHIMI'),
    ('TD005', 'TEMPURA'),
    ('TD005', 'NIGIRI'),
    ('TD005', 'DRINK'),
	('TD005', 'HPT'),
	('TD005', 'UDON'),
	('TD005', 'LUNCH'),
    ('TD005', 'SUSHI'), -- Bổ sung SUSHI cho TD005
    ('TD006', 'KV'),
    ('TD006', 'SASHIMI'),
    ('TD006', 'TEMPURA'),
    ('TD006', 'NIGIRI'),
    ('TD006', 'DRINK'),
    ('TD006', 'SUSHI'), -- Bổ sung SUSHI cho TD006
    ('TD007', 'KV'),
    ('TD007', 'SASHIMI'),
    ('TD007', 'TEMPURA'),
    ('TD007', 'NIGIRI'),
    ('TD007', 'DRINK'),
	('TD007', 'HPT'),
	('TD007', 'UDON'),
	('TD007', 'LUNCH'),
    ('TD007', 'SUSHI'); -- Bổ sung SUSHI cho TD007


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
('MA055', N'Gỏi cuốn', 30.0, 1, 1, 1, 'KV'),
('MA056', N'Sushi cá hồi đặc biệt', 200.0, 2, 1, 1, 'SUSHI'),
('MA057', N'Sushi cá ngừ đại dương', 180.0, 2, 1, 1, 'SUSHI'),
('MA058', N'Sushi tôm hùm', 250.0, 3, 1, 1, 'SUSHI'),
('MA059', N'Sushi trứng cá tầm', 300.0, 2, 1, 1, 'SUSHI'),
('MA060', N'Sushi cá chình nướng', 220.0, 2, 1, 1, 'SUSHI'),
('MA061', N'Sushi cá hồi xông khói', 210.0, 2, 1, 1, 'SUSHI'),
('MA062', N'Sushi lươn Nhật', 190.0, 2, 1, 1, 'SUSHI'),
('MA063', N'Sushi bạch tuộc', 170.0, 2, 1, 1, 'SUSHI'),
('MA064', N'Sushi hàu sống', 230.0, 2, 1, 1, 'SUSHI'),
('MA065', N'Sushi cá kiếm', 210.0, 2, 1, 1, 'SUSHI'),
('MA066', N'Sushi cá cam', 200.0, 2, 1, 1, 'SUSHI'),
('MA067', N'Sushi trứng cá hồi', 240.0, 2, 1, 1, 'SUSHI'),
('MA068', N'Sushi trứng cút', 150.0, 2, 1, 1, 'SUSHI'),
('MA069', N'Sushi cá đuối', 180.0, 2, 1, 1, 'SUSHI'),
('MA070', N'Sushi cá nhám', 220.0, 2, 1, 1, 'SUSHI'),
('MA071', N'Sushi cá tuyết', 250.0, 2, 1, 1, 'SUSHI'),
('MA072', N'Sushi cua hoàng đế', 270.0, 3, 1, 1, 'SUSHI'),
('MA073', N'Sushi cá dưa hấu', 160.0, 2, 1, 1, 'SUSHI'),
('MA074', N'Sushi sò đỏ', 200.0, 2, 1, 1, 'SUSHI'),
('MA075', N'Sushi cá bạc má', 180.0, 2, 1, 1, 'SUSHI');


go


--insert into LoaiThe (LT_TenLoaiThe)
--values
--('Membership'),
--('Gold'),
--('Silver');

--go
-- Bảng KHÁCH HÀNG sử dụng file khachhang.csv
-- 
-- delete from KhachHang
-- drop table KhachHang
-- Bảng NHÂN VIÊN sử dụng file nhanvien.csv
-- delete from NhanVien

-- delete from LichSuLamViec
-- Chạy phần script này sau khi đã thêm data vào các bảng NhanVien và ChiNhanh
insert into
LichSuLamViec(LSLV_MaNhanVien, LSLV_MaChiNhanhCu, LSLV_NgayBatDau, LSLV_NgayKetThuc)
values
('NV00001234', 'CN003', '2019-10-01', '2020-01-12'),
('NV00006423', 'CN004', '2023-01-23', '2023-06-20'),
('NV00031236', 'CN010', '2019-07-08', '2021-12-02'),
('NV00022013', 'CN003', '2023-10-01', '2024-01-12'),
('NV00054302', 'CN004', '2022-06-13', '2023-02-28'),
('NV00054329', 'CN012', '2021-09-07', '2022-04-21'),
('NV00007653', 'CN002', '2022-04-01', '2023-02-11'),
('NV00044325', 'CN007', '2021-05-23', '2022-03-30'),
('NV00071234', 'CN006', '2019-12-29', '2021-11-10'),
('NV00055434', 'CN001', '2020-07-22', '2021-06-09'),
('NV00067788', 'CN002', '2021-04-15', '2023-02-12');
go


-- delete from KhuyenMai
-- Chạy phần script này sau khi đã thêm data vào các bảng ChiNhanh và LoaiThe
-- KM_LoaiTheApDung là loại thẻ thấp nhất đủ điều kiện tham gia chương trình khuyến mãi
insert into
KhuyenMai(KM_MaKhuyenMai, KM_TenKhuyenMai, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh)
values
('KM00000001', 'Mừng Giáng Sinh', 'Giảm giá Noel', 0.2, 'Membership', 'CN001'),
('KM00000002', 'Chào Năm Mới', 'Happy New Year', 0.15, 'Membership', 'CN002'),
('KM00000003', 'Hè Rực Rỡ', 'Summer Sale', 0.25, 'Membership', 'CN001'),
('KM00000004', 'Ngày Nhà Giáo', 'Tri Ân Thầy Cô', 0.3, 'Membership', 'CN003'),
('KM00000005', 'Black Friday', 'Siêu Giảm Giá', 0.05, 'Silver', 'CN002'),
('KM00000006', 'Quốc Tế Phụ Nữ', 'Ngày 8/3', 0.1, 'Silver', 'CN001'),
('KM00000007', 'Ngày Valentine', 'Ưu đãi tình yêu', 0.1, 'Membership', 'CN003'),
('KM00000008', 'Ngày Quốc Khánh', 'Mừng Quốc Khánh', 0.12, 'Membership', 'CN002'),
('KM00000009', 'Tri Ân Khách Hàng', 'Khách Hàng Thân Thiết', 0.19, 'Gold', 'CN001'),
('KM00000010', 'Đón Tết Nguyên Đán', 'Tết Nguyên Đán', 0.12, 'Membership', 'CN003');
go


update ChiNhanh
set 
	CN_TGDongCua = cast (CN_TGDongCua as time),
	CN_TGMoCua = cast (CN_TGMoCua as time);

-- Update Mã khu vực cho Chi Nhánh
update ChiNhanh
set 
CN_MaKhuVuc = 'KV001',
CN_MaQuanLy = 'NV00000000'
where CN_DiaChi like N'%TP.HCM%'

update ChiNhanh
set CN_MaKhuVuc = 'KV002',
CN_MaQuanLy = 'NV00000001'
where CN_DiaChi like N'%Đà Nẵng%'

update ChiNhanh
set CN_MaKhuVuc = 'KV003',
CN_MaQuanLy = 'NV00000002'
where CN_DiaChi like N'%Hà Nội%'

update ChiNhanh
set CN_MaKhuVuc = 'KV004',
CN_MaQuanLy = 'NV00000003'
where CN_DiaChi like N'%Hải Phòng%'

update ChiNhanh
set CN_MaKhuVuc = 'KV005',
CN_MaQuanLy = 'NV00000004'
where CN_DiaChi like N'%Cần Thơ%'

update ChiNhanh
set CN_MaKhuVuc = 'KV006',
CN_MaQuanLy = 'NV00000006'
where CN_DiaChi like N'%Bình Dương%'

update ChiNhanh
set CN_MaKhuVuc = 'KV007',
CN_MaQuanLy = 'NV00000007'
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