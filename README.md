# ADB_SuShiX
## Thực hiện phần nào thì cd vào phần đó.
  * Làm frontend: cd frontend
  * Làm backend: cd backend

## 1. frontend:

Folder được chia ra làm 2 cái: **user** và **admin**. Cần phải cd vào 1 trong 2 folder để chạy, tránh trường hợp sau này bị nhầm giữa admin và user

  1.1. Nếu muốn chạy admin: **cd admin** --> **npm install** --> **npm start**.
  
  1.2. nếu muốn chạy user: **cd user** --> **npm install** --> **npm start**.
  
## 2. backend:

### **Tạo sa user trong SQL SERVER**
- Connect vào SQL (dưới trang thái Window Authentication)
- Nhấp chuột phải vào dòng đầu tiên (SQL Server) => chọn Properities => Chọn Security, chọn SQL Server and Windows Authentication). Nhấn OK
- Nhấp chuột vào Security ở thanh Object Explorer và vào Logins => nhấp chuột phải vào *sa* và chọn Properities. Tại đây, nhập lại password là 123, và chọn Status là enabled. Nhấn OK.
- Sau khi thực hiện xong, vào thành Search của chỗ Start, tìm Services và chạy phần Services
- Tìm SQL SERVER (SQLEXPRESS), nhấn chuột phải và chọn restart.
- Chạy lại chương trình SQL SEVER, với authentication là SQL Server Authentication, login: sa, password: 123, chọn **Trust server certificate** để kết nối SQL thành công.

### **Kết nối SQL SERVER và backend**
- Vào thanh Search ở Start, tìm SQL Server Configuration Management, chọn SQL Server Network Configuration, vào Protocol for SQLEXPRESS, chọn TCP/IP, phần Enabled chọn YES.
- IP Adress, kéo xuống tìm IPAll, đổi TCP Dynamic Ports = 1433. Nhấn OK
- Vào lại SQL Server Services, chọn restart SQL Server(SQLEXPRESS).

### **Chuẩn bị database và dữ liệu**

  2.1. Chạy SQL: thực hiện chạy file **DB_SuShiX.sql** trước
   
  2.2. Insert bảng Khách Hàng vào database bằng cách:
  
    2.2.1. Nhấn chuột phải vào database DB_SushiX (trong sidebar Object Explorer), chọn task -> import flat file.
    
    2.2.2. Ở bước chọn input file: "Chọn vị trí của file khachhang.csv trong máy". Đặt tên bảng là KhachHang, và table schema: dbo
    
    2.2.3. Kiểm tra dữ liệu lần nữa, và chọn next. 
    
    2.2.4. Ở bảng Modify Columns, chọn primary key là KH_SDT, đồng thời **chỉnh sửa datatype của KH_SDT thành varchar(12), KH_MatKhau thành varchar(20)**, và thực hiện chọn NEXT
    
    2.2.5. Chọn Finish và chờ insert data.
    
    2.2.6. Sau khi thành công, kiểm tra trong database DB_SuShiX đã có bảng KhachHang hay chưa. Nếu có rồi, có thể thực hiện thay đổi từ nhánh master thành DB_SushiX và chạy select * from KhachHang để kiểm tra dữ liệu lại lần nữa.
  2.3. Tương tự, insert lần lượt bảng Nhân viên, Bộ phận nhân viên, Thẻ thành viên từ file csv sang database. Đồng thời đổi kiểu dữ liệu:
  
  - Nhân viên: primary key là NV_MaNhanVien, chỉnh NV_MaNhanVien thành varchar(12), NV_GioiTinh thành nvarchar(3), NV_SDT thành varchar(12)
 
  - Bộ phận nhân viên: primary key là BP_NV_MaNhanVien, BP_NV_MaChiNhanh, BP_NV_TenBoPhan, đổi BP_NV_MaNhanVien thành varchar(12), BP_NV_MaChiNhanh thành varchar(10), BP_NV_Luong thành float
 
  - Thẻ thành viên: đổi new table name thành TheThanhVien, primary key là TTV_MaThe, đổi TTV_MaThe thành varchar(12), TTV_SDT_KH là varchar(12), TTV_MaNhanVien la varchar(12).

  2.4. Chạy file **constraint.sql** tiếp theo.
  2.5. Chạy file **DB_SuShiData.sql** tiếp theo
  2.6. Chạy file **QLSushi_ProcedureFunctionTrigger.sql**.
 
### **Chạy backend**  
- Mở terminal trong thư mục SushiAPI
- chạy npm install express để tải express (nếu chưa có folder node_modules)
- chạy npm run dev
- sử dụng postman để test



    
 
