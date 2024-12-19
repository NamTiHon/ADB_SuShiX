-- Tạo database trong file DB_SuShiX.sql, sau đó chạy file này, tiếp tục chạy phần tại bảng trong file DB_SuShiX.sql và phần còn lại theo README.md

use DB_SuShiX

go

alter database DB_SushiX add filegroup FG_partition_1;
alter database DB_SushiX add filegroup FG_partition_2;
alter database DB_SushiX add filegroup FG_partition_3;
alter database DB_SushiX add filegroup FG_partition_4;
alter database DB_SushiX add filegroup FG_partition_5;
alter database DB_SushiX add filegroup FG_partition_6;
alter database DB_SushiX add filegroup FG_partition_7;
alter database DB_SushiX add filegroup FG_partition_8;


alter database DB_SushiX
add file (
	name = 'Partition_data1',
	filename = 'D:\Partition_data1.ndf'
) to filegroup FG_Partition_1

alter database DB_SushiX
add file (
	name = 'Partition_data2',
	filename = 'D:\Partition_data2.ndf'
) to filegroup FG_Partition_2

alter database DB_SushiX
add file (
	name = 'Partition_data3',
	filename = 'D:\Partition_data3.ndf'
) to filegroup FG_Partition_3

alter database DB_SushiX
add file (
	name = 'Partition_data4',
	filename = 'D:\Partition_data4.ndf'
) to filegroup FG_Partition_4

alter database DB_SushiX
add file (
	name = 'Partition_data5',
	filename = 'C:\Users\ANH TU\Documents\Third Year\HK I\Advance Database\Project\Database\Partition_data5.ndf'
) to filegroup FG_Partition_5

alter database DB_SushiX
add file (
	name = 'Partition_data6',
	filename = 'D:\Partition_data6.ndf'
) to filegroup FG_Partition_6

alter database DB_SushiX
add file (
	name = 'Partition_data7',
	filename = 'D:\Partition_data7.ndf'
) to filegroup FG_Partition_7

alter database DB_SushiX
add file (
	name = 'Partition_data8',
	filename = 'D:\Partition_data8.ndf'
) to filegroup FG_Partition_8




-- Phân phối dữ liệu cho bảng KhachHang, phân vùng theo KH_SDT
create partition function pf_KhachHang (varchar(12))
as range left for values ('035', '065') -- Phân vùng 1: có SĐT từ 00xxxxxxxxx đến 0350000000
										-- Phân vùng 2: có SĐT từ 035xxxxxxxx đến 0650000000
										-- Phân vùng 3: có SĐT từ 065xxxxxxxx đến các giá trị lớn hơn

create partition scheme s_KhachHang
as partition pf_KhachHang
to ([primary], [FG_Partition_1], [FG_Partition_2])


-- Phân phối dữ liệu cho bảng NhanVien, phân vùng theo NV_SDT
create partition function pf_NhanVien (varchar(12))
as range left for values ('03', '06') -- Phân vùng 1: có SĐT từ 00xxxxxxxxx đến 0350000000
									  -- Phân vùng 2: có SĐT từ 035xxxxxxxx đến 0650000000
									  -- Phân vùng 3: có SĐT từ 065xxxxxxxx đến các giá trị lớn hơn

create partition scheme s_NhanVien
as partition pf_NhanVien
to ([primary], [FG_Partition_3], [FG_Partition_4])

-- Phân phối dữ liệu cho bảng BoPhanNhanVien, phân vùng theo BP_NV_MaChiNhanh
create partition function pf_BoPhanNhanVien (varchar(12))
as range left for values ('CN006', 'CN013') -- Phân vùng 1: có MaChiNhanh từ CN001 đến CN006
											-- Phân vùng 2: có MaChiNhanh từ CN007 đến CN013
											-- Phân vùng 3: có MaChiNhanh từ CN014 đến CN020

create partition scheme s_BoPhanNhanVien
as partition pf_NhanVien
to ([primary], [FG_Partition_5], [FG_Partition_6])

-- Phân phối dữ liệu cho bảng TheThanhVien, phân vùng theo TTV_LoaiThe
create partition function pf_TheThanhVien (nvarchar(30))
as range left for values ('Gold', 'Membership') -- Phân vùng 1: thẻ Gold
												-- Phân vùng 2: thẻ Membership
												-- Phân vùng 3: thẻ Silver

create partition scheme s_TheThanhVien
as partition pf_NhanVien
to ([primary], [FG_Partition_7], [FG_Partition_8])
