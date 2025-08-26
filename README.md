# ADB_SuShiX


## 1. frontend:

Folder được chia ra làm 2: **user** và **admin**. Cần phải cd vào 1 trong 2 folder để chạy, tránh trường hợp sau này bị nhầm giữa admin và user

  1.1. Nếu muốn chạy admin: **cd admin** --> **npm install** --> **npm start**.
  
  1.2. Nếu muốn chạy user: **cd user** --> **npm install** --> **npm start**.
  
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

  2.1. Tạo database: chỉ chạy phần tạo database trong file **DB_SuShiX.sql** trước

  2.2. Chạy file **Partition.sql** để tạo phân vùng

  2.3. Chạy phần còn lại( tạo bảng) trong file **DB_TaoBang.sql**

  2.4. Chạy file **constraint.sql** để chạy ràng buộc

  2.5. Chạy file **QLSushi_ProcedureFunctionTrigger.sql** --> **Index.sql** tiếp theo
  
#### Lưu ý: Cần phải đặt database là DB_SuShiX trước khi chạy, đồng thời quá trình có thể tốn khá nhiều thời gian do khối lượng giao dịch nhiều.  


  2.6. Chạy file **DataConlai.sql** để nhập những data ban đầu --> **DataKhachhang.sql** --> **DataNhanvien.sql** --> **DataBophanNhanvien.sql** --> **DataThethanhvien.sql** --> **UpdateData.sql**

  

### **Chạy backend**  
- Mở terminal trong thư mục SushiAPI
- Chạy npm install express để tải express (nếu chưa có folder node_modules)
- Chạy npm run dev
- Sử dụng postman để test API



    
 
