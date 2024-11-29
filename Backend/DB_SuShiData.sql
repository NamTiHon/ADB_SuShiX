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


--select * from ChiNhanh
