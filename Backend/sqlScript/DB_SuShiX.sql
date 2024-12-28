-- Tạo database:
CREATE DATABASE DB_SushiX ON
    (Name = DB_SushiX_data, 
    FileName = 'D:\DB_SushiX_data.mdf')
LOG ON
    (Name = DB_SushiX_log,
    FileName = 'D:\DB_QLSushiX_log.ldf');
go

-- Sử dụng database:
use DB_SushiX 
go

-- Xóa database:
-- use master;
-- drop database DB_SushiX;