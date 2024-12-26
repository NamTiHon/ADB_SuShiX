use DB_SushiX
go

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
insert into KhuVuc (KV_MaKhuVuc, KV_Ten, KV_MaThucDon, KV_TenDanhMuc)
values
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Khai vị'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Sashimi combo'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Tempura'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Nigiri'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Món nước'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Lunch set'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Udon'),
    ('KV001', N'Khu vực TP.HCM', 'TD001', N'Sushi'),
	('KV001', N'Khu vực TP.HCM', 'TD001', N'Hotpot'),

    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Khai vị'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Sashimi combo'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Tempura'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Nigiri'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Món nước'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Lunch set'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Sushi'),
    ('KV002', N'Khu vực Đà Nẵng', 'TD002', N'Hotpot'),

    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Khai vị'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Sashimi combo'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Tempura'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Nigiri'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Món nước'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Udon'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Lunch set'),
    ('KV003', N'Khu vực Hà Nội', 'TD003', N'Sushi'),

    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Khai vị'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Sashimi combo'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Tempura'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Nigiri'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Món nước'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Hotpot'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Udon'),
    ('KV004', N'Khu vực Hải Phòng', 'TD004', N'Sushi'),

    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Khai vị'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Sashimi combo'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Tempura'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Nigiri'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Món nước'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Hotpot'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Udon'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Lunch set'),
    ('KV005', N'Khu vực Cần Thơ', 'TD005', N'Sushi'),

    ('KV006', N'Khu vực Bình Dương', 'TD006', N'Khai vị'),
    ('KV006', N'Khu vực Bình Dương', 'TD006', N'Sashimi combo'),
    ('KV006', N'Khu vực Bình Dương', 'TD006', N'Tempura'),
    ('KV006', N'Khu vực Bình Dương', 'TD006', N'Nigiri'),
    ('KV006', N'Khu vực Bình Dương', 'TD006', N'Món nước'),
    ('KV006', N'Khu vực Bình Dương', 'TD006', N'Sushi'),

    ('KV007', N'Khu vực Long An', 'TD007', N'Khai vị'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Sashimi combo'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Tempura'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Nigiri'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Món nước'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Hotpot'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Udon'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Lunch set'),
    ('KV007', N'Khu vực Long An', 'TD007', N'Sushi')

go
-- delete from MonDuocDat
-- delete from MonAn
insert into
MonAn (MA_MaMon, MA_TenMon, MA_GiaHienTai, MA_KhauPhan, MA_CoSan, MA_HoTroGiaoHang, MA_TenDanhMuc)
values
	('MA001', N'Sashimi cá hồi', 120.0, 2, 1, 1, N'Sashimi combo'),
    ('MA002', N'Sashimi cá ngừ', 100.0, 1, 1, 1, N'Sashimi combo'),
    ('MA003', N'Sashimi lươn', 130.0, 2, 1, 1, N'Sashimi combo'),
    ('MA004', N'Sashimi tôm', 110.0, 2, 1, 1, N'Sashimi combo'),
    ('MA005', N'Sashimi cá trích', 100.0, 1, 1, 0, N'Sashimi combo'),
    ('MA006', N'Sashimi cá mực', 90.0, 2, 1, 0, N'Sashimi combo'),
    ('MA007', N'Sashimi cá hồi nướng', 160.0, 2, 1, 0, N'Sashimi combo'),
    ('MA008', N'Sashimi cá ngừ nướng', 150.0, 2, 1, 0, N'Sashimi combo'),
    ('MA009', N'Nigiri cá hồi', 80.0, 1, 1, 1, N'Nigiri'),
    ('MA010', N'Nigiri cá ngừ', 85.0, 1, 1, 1, N'Nigiri'),
    ('MA011', N'Nigiri tôm', 90.0, 1, 1, 1, N'Nigiri'),
    ('MA012', N'Nigiri lươn', 95.0, 1, 1, 1, N'Nigiri'),
    ('MA013', N'Nigiri cá trích', 75.0, 1, 1, 0, N'Nigiri'),
    ('MA014', N'Nigiri cá mực', 85.0, 1, 1, 0, N'Nigiri'),
    ('MA015', N'Nigiri tôm nướng', 145.0, 2, 1, 0, N'Nigiri'),
    ('MA016', N'Nigiri cá ngừ nướng', 130.0, 2, 0, 0, N'Nigiri'),
    ('MA017', N'Nigiri cá hồi nướng', 150.0, 2, 1, 1, N'Nigiri'),
    ('MA018', N'Nigiri lươn nướng', 135.0, 2, 1, 1, N'Nigiri'),
    ('MA019', N'Udon thịt bò', 65.0, 2, 1, 0, N'Udon'),
    ('MA020', N'Udon gà', 60.0, 2, 1, 0, N'Udon'),
    ('MA021', N'Udon tôm', 70.0, 2, 1, 0, N'Udon'),
    ('MA022', N'Udon hải sản', 85.0, 2, 1, 0, N'Udon'),
    ('MA023', N'Udon chay', 50.0, 2, 1, 0, N'Udon'),
    ('MA024', N'Udon rau củ', 55.0, 2, 1, 0, N'Udon'),
    ('MA025', N'Tempura tôm', 90.0, 2, 1, 1, N'Tempura'),
    ('MA026', N'Tempura rau củ', 70.0, 2, 1, 1, N'Tempura'),
    ('MA027', N'Tempura cá', 80.0, 2, 1, 1, N'Tempura'),
    ('MA028', N'Hotpot cá hồi', 150.0, 2, 1, 1, N'Hotpot'),
    ('MA029', N'Hotpot tôm', 120.0, 2, 1, 1, N'Hotpot'),
    ('MA030', N'Hotpot gà', 100.0, 2, 1, 1, N'Hotpot'),
    ('MA031', N'Hotpot rau củ', 75.0, 2, 1, 1, N'Hotpot'),
    ('MA032', N'Lunch set tôm', 130.0, 2, 1, 1, N'Lunch set'),
    ('MA033', N'Lunch set gà', 110.0, 2, 1, 1, N'Lunch set'),
    ('MA034', N'Lunch set thịt bò', 120.0, 2, 1, 1, N'Lunch set'),
    ('MA035', N'Lunch set chay', 90.0, 2, 1, 1, N'Lunch set'),
    ('MA036', N'Drink nước cam', 20.0, 1, 1, 1, N'Món nước'),
    ('MA037', N'Drink trà xanh', 25.0, 1, 1, 1, N'Món nước'),
    ('MA038', N'Drink soda', 30.0, 1, 1, 1, N'Món nước'),
    ('MA039', N'Drink nước dừa', 40.0, 1, 1, 1, N'Món nước'),
    ('MA040', N'Drink sinh tố', 45.0, 1, 1, 1, N'Món nước'),
    ('MA041', N'Cháo vịt', 80.0, 2, 1, 1, N'Khai vị'),
    ('MA042', N'Canh ngao', 40.0, 1, 1, 1, N'Khai vị'),
    ('MA043', N'Bánh canh cua', 70.0, 2, 1, 1, N'Khai vị'),
    ('MA044', N'Bánh cuốn', 60.0, 1, 1, 1, N'Khai vị'),
    ('MA045', N'Phở gà', 55.0, 2, 1, 1, N'Khai vị'),
    ('MA046', N'Gỏi đu đủ', 50.0, 1, 1, 1, N'Khai vị'),
    ('MA047', N'Chả cá Lã Vọng', 150.0, 2, 1, 1, N'Khai vị'),
    ('MA048', N'Bánh tôm Hồ Tây', 100.0, 1, 1, 1, N'Khai vị'),
    ('MA049', N'Bún chả Hà Nội', 75.0, 2, 1, 1, N'Khai vị'),
    ('MA050', N'Nem rán', 40.0, 1, 1, 1, N'Khai vị'),
    ('MA051', N'Cơm rang dưa bò', 85.0, 2, 1, 1, N'Khai vị'),
    ('MA052', N'Gà xào hành tây', 95.0, 2, 1, 1, N'Khai vị'),
    ('MA053', N'Mực xào chua ngọt', 120.0, 2, 1, 1, N'Khai vị'),
    ('MA054', N'Bánh flan', 40.0, 1, 1, 1, N'Khai vị'),
    ('MA055', N'Gỏi cuốn', 30.0, 1, 1, 1, N'Khai vị'),
    ('MA056', N'Sushi cá hồi đặc biệt', 200.0, 2, 1, 1, N'Sushi'),
    ('MA057', N'Sushi cá ngừ đại dương', 180.0, 2, 1, 1, N'Sushi'),
    ('MA058', N'Sushi tôm hùm', 250.0, 3, 1, 1, N'Sushi'),
    ('MA059', N'Sushi trứng cá tầm', 300.0, 2, 1, 1, N'Sushi'),
    ('MA060', N'Sushi cá chình nướng', 220.0, 2, 1, 1, N'Sushi'),
    ('MA061', N'Sushi cá hồi xông khói', 210.0, 2, 1, 1, N'Sushi'),
    ('MA062', N'Sushi lươn Nhật', 190.0, 2, 1, 1, N'Sushi'),
	('MA063', N'Sushi bạch tuộc', 170.0, 2, 1, 1, N'Sushi'),
    ('MA064', N'Sushi hàu sống', 230.0, 2, 1, 1, N'Sushi'),
    ('MA065', N'Sushi cá kiếm', 210.0, 2, 1, 1, N'Sushi'),
    ('MA066', N'Sushi cá cam', 200.0, 2, 1, 1, N'Sushi'),
    ('MA067', N'Sushi trứng cá hồi', 240.0, 2, 1, 1, N'Sushi'),
    ('MA068', N'Sushi trứng cút', 150.0, 2, 1, 1, N'Sushi'),
    ('MA069', N'Sushi cá đuối', 180.0, 2, 1, 1, N'Sushi'),
    ('MA070', N'Sushi cá nhám', 220.0, 2, 1, 1, N'Sushi'),
    ('MA071', N'Sushi cá tuyết', 250.0, 2, 1, 1, N'Sushi'),
    ('MA072', N'Sushi cua hoàng đế', 270.0, 3, 1, 1, N'Sushi'),
    ('MA073', N'Sushi cá dưa hấu', 160.0, 2, 1, 1, N'Sushi'),
    ('MA074', N'Sushi sò đỏ', 200.0, 2, 1, 1, N'Sushi'),
    ('MA075', N'Sushi cá bạc má', 180.0, 2, 1, 1, N'Sushi');
go


insert into LoaiThe (LT_TenLoaiThe)
values
('Membership'),
('Gold'),
('Silver');

--go
-- Bảng KHÁCH HÀNG sử dụng file khachhang.csv
-- 
-- delete from KhachHang
-- drop table KhachHang
-- Bảng NHÂN VIÊN sử dụng file nhanvien.csv
-- delete from NhanVien

-- delete from LichSuLamViec
-- Chạy phần script này sau khi đã thêm data vào các bảng NhanVien và ChiNhanh



-- delete from KhuyenMai
-- Chạy phần script này sau khi đã thêm data vào các bảng ChiNhanh và LoaiThe
-- KM_LoaiTheApDung là loại thẻ thấp nhất đủ điều kiện tham gia chương trình khuyến mãi

insert into
KhuyenMai(KM_MaKhuyenMai, KM_TenKhuyenMai, KM_TenSuKien, KM_TyLeGiamGia, KM_LoaiTheApDung, KM_MaChiNhanh)
values
('KM00000001', N'Mừng Giáng Sinh', N'Giảm giá Noel', 0.2, 'Membership', 'CN001'),
('KM00000002', N'Chào Năm Mới', N'Happy New Year', 0.15, 'Membership', 'CN002'),
('KM00000003', N'Hè Rực Rỡ', N'Summer Sale', 0.25, 'Membership', 'CN001'),
('KM00000004', N'Ngày Nhà Giáo', N'Tri Ân Thầy Cô', 0.3, 'Membership', 'CN003'),
('KM00000005', N'Black Friday', N'Siêu Giảm Giá', 0.05, 'Silver', 'CN002'),
('KM00000006', N'Quốc Tế Phụ Nữ', N'Ngày 8/3', 0.1, 'Silver', 'CN001'),
('KM00000007', N'Ngày Valentine', N'Ưu đãi tình yêu', 0.1, 'Membership', 'CN003'),
('KM00000008', N'Ngày Quốc Khánh', N'Mừng Quốc Khánh', 0.12, 'Membership', 'CN002'),
('KM00000009',N'Tri Ân Khách Hàng', N'Khách Hàng Thân Thiết', 0.19, 'Gold', 'CN001'),
('KM00000010', N'Đón Tết Nguyên Đán', N'Tết Nguyên Đán', 0.12, 'Membership', 'CN003');
go


-- select * from BoPhan_NhanVien
-- select * from ChiNhanh
-- select * from KhuVuc
-- select * from KhuyenMai
-- select * from LichSuLamViec
-- select * from LoaiThe
-- select * from MonAn
-- select * from KhachHang
-- select * from NhanVien
-- select * from TheThanhVien

