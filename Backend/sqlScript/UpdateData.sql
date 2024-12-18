use DB_SushiX
go

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

-- Update Mã quản lý cho Chi Nhánh
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

-- Update Mã khu vực cho chi nhánh
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


--Update Hình Ảnh Chi Nhánh
update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/sKP8'
where CN_MaChiNhanh = 'CN001'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/GjWq'
where CN_MaChiNhanh = 'CN002'

update ChiNhanh 
set CN_MaHinhAnh = 'https://short.com.vn/QMcC'
where CN_MaChiNhanh = 'CN003'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/diGY'
where CN_MaChiNhanh = 'CN004'

update ChiNhanh 
set CN_MaHinhAnh = 'https://short.com.vn/F5PF'
where CN_MaChiNhanh = 'CN005'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/Acs2'
where CN_MaChiNhanh = 'CN006'

update ChiNhanh 
set CN_MaHinhAnh = 'https://short.com.vn/lQGN'
where CN_MaChiNhanh = 'CN007'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/vbqn'
where CN_MaChiNhanh = 'CN008'

update ChiNhanh 
set CN_MaHinhAnh = 'https://short.com.vn/pTQ3'
where CN_MaChiNhanh = 'CN009'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/2wC6'
where CN_MaChiNhanh = 'CN010'

update ChiNhanh 
set CN_MaHinhAnh = 'https://short.com.vn/xQaB'
where CN_MaChiNhanh = 'CN011'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/DsJI'
where CN_MaChiNhanh = 'CN012'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/RMwx'
where CN_MaChiNhanh = 'CN013'

update ChiNhanh 
set CN_MaHinhAnh = 'https://s.pro.vn/xuoo'
where CN_MaChiNhanh = 'CN014'
--Update Hình ảnh Món ăn
update MonAn
set MA_HinhAnh = 'https://s.pro.vn/sKP8'
where MA_MaMon = 'MA001'