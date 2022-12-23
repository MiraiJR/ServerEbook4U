# ServerEbook4U
URL SERVER: https://ebook4u-server.onrender.com
# DESCRIPTION
COMING SOON
Document API BackEnd Ebook4U
Host: https://ebook4u-server.onrender.com/ 
Cấu truc API trả về:
{
    success: tình trạng thực hiện mang 2 giá trị true, false
    message: "Internal server error!" (tên lỗi)
    data: (kết quả JSON nếu thành công)
}
Thành công: 
-	Status: 200
-	Success: true
-	Data: JSON
Thât bại:
-	Status: 400
-	Success: false,
Lỗi server:
-	Status: 500
-	Success: false
Login
-	Front-End: 
Phương thức: POST
URL: https://ebook4u-server.onrender.com/auth/login 
 Lúc post thì gửi 2 fields: username, password
-	Back-End:
Trả về accessToken (FrontEnd nên lưu cái này về máy) nếu thành công
Register:
-	Front-End: 
Phương thức: POST
URL: https://ebook4u-server.onrender.com/auth/register 
Lúc post thì gửi các fields: fullname, username, password, email, retypePassword
-	Back-End: 
Trả về thành công (Front-End tự redirect sang login)
Logout:
ở đây Front-End xóa đi cái accessToken đã lưu
API CATEGORY
Method	Fields	URL
GET		https://ebook4u-server.onrender.com/api/category/all

POST	nameCategory	https://ebook4u-server.onrender.com/api/category 

PUT	nameCategory	https://ebook4u-server.onrender.com/api/category/{id} 

DELETE		https://ebook4u-server.onrender.com/api/category/{id}

GET		https://ebook4u-server.onrender.com/api/category/{id}
(Kết quả trả về tất cả nhưng cuốn sách có thể loại này)

API COUNTRY
Method	Fields	URL
GET		https://ebook4u-server.onrender.com/api/country/all

POST	nameCountry	https://ebook4u-server.onrender.com/api/country  

PUT	nameCountry	https://ebook4u-server.onrender.com/api/country/{id} 

DELETE		https://ebook4u-server.onrender.com/api/country/{id}

GET		https://ebook4u-server.onrender.com/api/country/{id}
(Kết quả trả về tất cả nhưng cuốn sách có thuộc quốc gia này)

API BOOK
Method	Fields	URL
GET		https://ebook4u-server.onrender.com/api/book/all

POST	name, description, author, category, country 
(cho chosefile để upload ảnh cho sách)	https://ebook4u-server.onrender.com/api/book  

PUT	nameCountry	https://ebook4u-server.onrender.com/api/country/{id} 

DELETE		https://ebook4u-server.onrender.com/api/country/{id}

GET		https://ebook4u-server.onrender.com/api/country/{id}
(Kết quả trả về tất cả nhưng cuốn sách có thuộc quốc gia này)

