# ADB_SuShiX

## 1. frontend:

Folder được chia ra làm 2 cái: **user** và **admin**. Cần phải cd vào 1 trong 2 folder để chạy, tránh trường hợp sau này bị nhầm giữa admin và user

  1.1. Nếu muốn chạy admin: **cd admin** --> **npm install** --> **npm start**.
  
  1.2. nếu muốn chạy user: **cd user** --> **npm install** --> **npm start**.
  
## 2. backend:

  2.1. Chạy SQL: thực hiện chạy file **DB_QLSuShiX.sql** trước
  
  2.2. Chạy file **constraint.sql** tiếp theo.
  
  2.3. Insert bảng Khách Hàng vào database bằng cách:
  
    2.3.1. Nhấn chuột phải vào database DB_SushiX (trong sidebar Object Explorer), chọn task -> import flat file.
    
    2.3.2. Ở bước chọn input file: "Chọn vị trí của file khachhang.csv trong máy". Đặt tên bảng là KhachHang, và table schema: dbo
    
    2.3.3. Kiểm tra dữ liệu lần nữa, và chọn next. 
    
    2.3.4. Ở bảng Modify Columns, chọn primary key là KH_SDT, còn lại allow nulls (trừ KH_CCCD và email); đồng thời **chỉnh sửa datatype của KH_SDT thành varchar(12)**, và thực hiện chọn NEXT
    2.3.5. Chọn Finish và chờ insert data.
    
    2.3.6. Sau khi thành công, kiểm tra trong database DB_SuShiX đã có bảng KhachHang hay chưa. Nếu có rồi, có thể thực hiện chọn select * from KhachHang để kiểm tra dữ liệu lại lần nữa.
    
  2.4. Chạy file **DB_SuShiData.sql** tiếp theo
    
    
