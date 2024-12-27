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
	filename = 'D:\Partition_data5.ndf'
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
as range left for values ('NV00030000', 'NV00065000') -- Phân vùng 1: có Mã nhân viên từ NV00000001 đến NV00030000
													  -- Phân vùng 2: có Mã nhân viên từ NV00030001 đến NV00065000
												      -- Phân vùng 3: có Mã nhân viên lớn hơn NV00065000

create partition scheme s_NhanVien
as partition pf_NhanVien
to ([primary], [FG_Partition_3], [FG_Partition_4])

-- Phân phối dữ liệu cho bảng BoPhanNhanVien, phân vùng theo BP_NV_MaChiNhanh
create partition function pf_BoPhanNhanVien (varchar(12))
as range left for values ('CN006', 'CN013') -- Phân vùng 1: có MaChiNhanh từ CN001 đến CN006
											-- Phân vùng 2: có MaChiNhanh từ CN007 đến CN013
											-- Phân vùng 3: có MaChiNhanh từ CN014 đến CN020

create partition scheme s_BoPhanNhanVien
as partition pf_BoPhanNhanVien
to ([primary], [FG_Partition_5], [FG_Partition_6])

-- Phân phối dữ liệu cho bảng TheThanhVien, phân vùng theo TTV_LoaiThe
create partition function pf_TheThanhVien (varchar(12))
as range left for values ('TTV0030000', 'TTV0065000') -- Phân vùng 1: Có mã thẻ từ TTV0000001 đến TTV0030000
													  -- Phân vùng 2: Có mã thẻ từ TTV0030001 đến TTV0065000
													  -- Phân vùng 3: Có mã thẻ lớn hơn TTV0065000

create partition scheme s_TheThanhVien
as partition pf_TheThanhVien
to ([primary], [FG_Partition_7], [FG_Partition_8])

-- Kiểm tra phân vùng
--Bảng Khách Hàng
SELECT DISTINCT 
    p.partition_number,
    p.rows AS rows_in_partition,
    ps.name AS partition_scheme,
    pf.name AS partition_function,
    c.name AS partition_column
FROM 
    sys.partitions p
JOIN 
    sys.tables t ON p.object_id = t.object_id
JOIN 
    sys.indexes i ON i.object_id = t.object_id
JOIN 
    sys.partition_schemes ps ON i.data_space_id = ps.data_space_id
JOIN 
    sys.partition_functions pf ON ps.function_id = pf.function_id
JOIN 
    sys.columns c ON c.object_id = t.object_id
WHERE 
    t.name = 'KhachHang' -- Tên bảng của bạn
    AND c.column_id IN (
        SELECT ic.column_id
        FROM sys.index_columns ic
        WHERE ic.object_id = t.object_id
        AND ic.index_id = 1 -- 1 là ID của primary hoặc clustered index, bạn cần điều chỉnh cho index dùng phân vùng
    );

--Bảng Thẻ Thành Viên
SELECT DISTINCT
    p.partition_number,
    p.rows AS rows_in_partition,
    ps.name AS partition_scheme,
    pf.name AS partition_function,
    c.name AS partition_column
FROM 
    sys.partitions p
JOIN 
    sys.tables t ON p.object_id = t.object_id
JOIN 
    sys.indexes i ON i.object_id = t.object_id
JOIN 
    sys.partition_schemes ps ON i.data_space_id = ps.data_space_id
JOIN 
    sys.partition_functions pf ON ps.function_id = pf.function_id
JOIN 
    sys.columns c ON c.object_id = t.object_id
WHERE 
    t.name = 'TheThanhVien' -- Tên bảng của bạn
    AND c.column_id IN (
        SELECT ic.column_id
        FROM sys.index_columns ic
        WHERE ic.object_id = t.object_id
        AND ic.index_id = 1 -- 1 là ID của primary hoặc clustered index, bạn cần điều chỉnh cho index dùng phân vùng
    );

-- Bảng Nhân Viên
SELECT DISTINCT
    p.partition_number,
    p.rows AS rows_in_partition,
    ps.name AS partition_scheme,
    pf.name AS partition_function,
    c.name AS partition_column
FROM 
    sys.partitions p
JOIN 
    sys.tables t ON p.object_id = t.object_id
JOIN 
    sys.indexes i ON i.object_id = t.object_id
JOIN 
    sys.partition_schemes ps ON i.data_space_id = ps.data_space_id
JOIN 
    sys.partition_functions pf ON ps.function_id = pf.function_id
JOIN 
    sys.columns c ON c.object_id = t.object_id
WHERE 
    t.name = 'NhanVien' -- Tên bảng của bạn
    AND c.column_id IN (
        SELECT ic.column_id
        FROM sys.index_columns ic
        WHERE ic.object_id = t.object_id
        AND ic.index_id = 1 -- 1 là ID của primary hoặc clustered index, bạn cần điều chỉnh cho index dùng phân vùng
    );

--Bảng Bộ Phận Nhân Viên
SELECT DISTINCT
    p.partition_number,
    p.rows AS rows_in_partition,
    ps.name AS partition_scheme,
    pf.name AS partition_function,
    c.name AS partition_column
FROM 
    sys.partitions p
JOIN 
    sys.tables t ON p.object_id = t.object_id
JOIN 
    sys.indexes i ON i.object_id = t.object_id
JOIN 
    sys.partition_schemes ps ON i.data_space_id = ps.data_space_id
JOIN 
    sys.partition_functions pf ON ps.function_id = pf.function_id
JOIN 
    sys.columns c ON c.object_id = t.object_id
WHERE 
    t.name = 'BoPhan_NhanVien' -- Tên bảng của bạn
    AND c.column_id IN (
        SELECT ic.column_id
        FROM sys.index_columns ic
        WHERE ic.object_id = t.object_id
        AND ic.index_id = 1 -- 1 là ID của primary hoặc clustered index, bạn cần điều chỉnh cho index dùng phân vùng
    );




