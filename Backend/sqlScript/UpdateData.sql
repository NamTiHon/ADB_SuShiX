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

update ChiNhanh 
set CN_MaHinhAnh = ''
where CN_MaChiNhanh = 'CN015'

update ChiNhanh 
set CN_MaHinhAnh = ''
where CN_MaChiNhanh = 'CN016'

update ChiNhanh 
set CN_MaHinhAnh = ''
where CN_MaChiNhanh = 'CN017'

update ChiNhanh 
set CN_MaHinhAnh = ''
where CN_MaChiNhanh = 'CN018'

update ChiNhanh 
set CN_MaHinhAnh = ''
where CN_MaChiNhanh = 'CN019'

update ChiNhanh 
set CN_MaHinhAnh = ''
where CN_MaChiNhanh = 'CN020'

--Update Hình ảnh Món ăn
update MonAn
set MA_HinhAnh = 'https://s.net.vn/ikdS'
where MA_MaMon = 'MA001';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/38cD'
where MA_MaMon = 'MA002';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/snJ3'
where MA_MaMon = 'MA003';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/JqQ4'
where MA_MaMon = 'MA004';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/oGxN'
where MA_MaMon = 'MA005';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/D33v'
where MA_MaMon = 'MA006';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Fbeh'
where MA_MaMon = 'MA007';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/0d8k'
where MA_MaMon = 'MA008';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/4Hqc'
where MA_MaMon = 'MA009';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/wl9I'
where MA_MaMon = 'MA010';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/8kdE'
where MA_MaMon = 'MA011';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/EZfd'
where MA_MaMon = 'MA012';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/1jDh'
where MA_MaMon = 'MA013';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/jiaA'
where MA_MaMon = 'MA014';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/61xQ'
where MA_MaMon = 'MA015';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/AApM'
where MA_MaMon = 'MA016';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/L8gh'
where MA_MaMon = 'MA017';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/dTJo'
where MA_MaMon = 'MA018';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/vGTm'
where MA_MaMon = 'MA019';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/3r3w'
where MA_MaMon = 'MA020';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/qS0K'
where MA_MaMon = 'MA021';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/A6fY'
where MA_MaMon = 'MA022';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/ox7A'
where MA_MaMon = 'MA023';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/R7O2'
where MA_MaMon = 'MA024';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/VxPq'
where MA_MaMon = 'MA025';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/7I6B'
where MA_MaMon = 'MA026';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/J5jC'
where MA_MaMon = 'MA027';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/6iKQ'
where MA_MaMon = 'MA028';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/K23R'
where MA_MaMon = 'MA029';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/JpPp'
where MA_MaMon = 'MA030';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/teeg'
where MA_MaMon = 'MA031';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/3ej0'
where MA_MaMon = 'MA032';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Tg21'
where MA_MaMon = 'MA033';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/DgWe'
where MA_MaMon = 'MA034';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/BD5y'
where MA_MaMon = 'MA035';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/kZHe'
where MA_MaMon = 'MA036';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/oIzY'
where MA_MaMon = 'MA037';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/alen'
where MA_MaMon = 'MA038';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Og9l'
where MA_MaMon = 'MA039';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/wAzL'
where MA_MaMon = 'MA040';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/6zi0'
where MA_MaMon = 'MA041';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/WGw2'
where MA_MaMon = 'MA042';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/MGOZ'
where MA_MaMon = 'MA043';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/vo9k'
where MA_MaMon = 'MA044';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Cfsd'
where MA_MaMon = 'MA045';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/l23v'
where MA_MaMon = 'MA046';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/DE9L'
where MA_MaMon = 'MA047';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/n1KZ'
where MA_MaMon = 'MA048';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/lvhN'
where MA_MaMon = 'MA049';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/jPpl'
where MA_MaMon = 'MA050';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/1Kee'
where MA_MaMon = 'MA051';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/DPKP'
where MA_MaMon = 'MA052';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/MQpI'
where MA_MaMon = 'MA053';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/ib8I'
where MA_MaMon = 'MA054';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/QUcb'
where MA_MaMon = 'MA055';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/z8tI'
where MA_MaMon = 'MA056';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/GMqt'
where MA_MaMon = 'MA057';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Baam'
where MA_MaMon = 'MA058';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/ybtE'
where MA_MaMon = 'MA059';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/1I7y'
where MA_MaMon = 'MA060';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/v3X8'
where MA_MaMon = 'MA061';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/sMP9'
where MA_MaMon = 'MA062';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/BJWk'
where MA_MaMon = 'MA063';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Nbq8'
where MA_MaMon = 'MA064';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/foLp'
where MA_MaMon = 'MA065';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/mi0w'
where MA_MaMon = 'MA066';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/O4V5'
where MA_MaMon = 'MA067';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/7awi'
where MA_MaMon = 'MA068';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/fTFe'
where MA_MaMon = 'MA069';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/ECaZ'
where MA_MaMon = 'MA070';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/u9Us'
where MA_MaMon = 'MA071';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/a0Tc'
where MA_MaMon = 'MA072';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/7LpB'
where MA_MaMon = 'MA073';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/rYz7'
where MA_MaMon = 'MA074';

update MonAn
set MA_HinhAnh = 'https://s.net.vn/Tmv1'
where MA_MaMon = 'MA075';