# ServerEbook4U
URL SERVER: https://ebook4u-server.onrender.com
# Mô tả:
Dự chủ yếu phục vụ cho website đọc sách bao gồm các tính năng trả api sách, api người dùng, api thống kê lượt ghé thăm trang web hằng ngày, ...
# Ngôn ngữ sử dụng
- Chủ yếu là NODEJS, framework ExpressJS
- Database sử dụng MongoDB dùng thư viện mongoose để tương tác
# Cách sử dụng
- Cài đặt các thư viện đã sử dụng  
**npm i**
- Chạy project  
**npm start**
# Một vài kỹ thuật sử dụng
- Dùng Crypto-JS để mã hóa với mỗi mật khâu dù giống nhau nhưng cho 2 encrypt khác nhau
- Dùng Multer + Cloudinary để lưu trữ hình ảnh
- Dùng Nodemailer + service gg để làm send mail reset mật khẩu
- Dùng socket.io để làm realtime chat + notification
- Dùng JWT để tạo accessToken, refreshToken để xác nhận phân quyền tương tác API
# API
Document API BackEnd Ebook4U  
Host: https://ebook4u-server.onrender.com  
Cấu truc API trả về:  
{  
    success: tình trạng thực hiện mang 2 giá trị true, false  
    message: "Internal server error!" (tên lỗi)  
    data: (kết quả JSON nếu thành công)  
}  
## Thành công: 
- Status: 200
- Success: true
- Data: JSON
## Thât bại:
- Status: 400
- Success: false,
## Lỗi server:
- Status: 500
- Success: false
# Các URL tương tác API
## Tạo sách
- quyền: Admin
- URL: https://ebook4u-server.onrender.com/api/book
- Method: POST
- Gửi: name,
            description,
            author,
            category (array),
            country
## Lấy tất cả sách 
- quyền: everyone
- URL: https://ebook4u-server.onrender.com/api/book/all
- method: GET
## Lấy thông tin 1 cuôn sách cụ thể
- quyền: everyone
- URL: https://ebook4u-server.onrender.com/api/book/id (id ở đây là id của cuốn sách cần lấy)
- Method: GET
## Sửa thông tin 1 cuốn sách cụ thẻ
- quyền: admin
- URL: https://ebook4u-server.onrender.com/api/book/id (id ở đây là id của cuốn sách cần sửa)
- Method: PUT
- Gửi:  name,
                description,
                author,
                category (array),
                country
## Xóa một cuốn sách cụ thể
- quyền: admin
- URL: https://ebook4u-server.onrender.com/api/book/id (id ở đây là id của cuốn sách cần xóa)
- Method: DELETE

