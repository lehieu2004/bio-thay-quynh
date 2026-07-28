# Kết nối form với Google Sheets

Google Sheet đích:

https://docs.google.com/spreadsheets/d/1eRC8PaupzeT8WJCjuGhovm4pB8ZfApxgxbdavGVYkNQ/edit

## Triển khai endpoint

1. Mở Google Sheet, chọn **Tiện ích mở rộng → Apps Script**.
2. Thay toàn bộ nội dung file `Code.gs` trên Apps Script bằng nội dung file `google-apps-script/Code.gs` trong dự án này.
3. Chọn **Triển khai → Lần triển khai mới → Ứng dụng web**.
4. Đặt **Thực thi dưới dạng** là tài khoản của bạn.
5. Đặt **Ai có quyền truy cập** là **Bất kỳ ai**.
6. Cấp quyền khi Google yêu cầu, rồi sao chép URL kết thúc bằng `/exec`.
7. Trong `index.html`, thay:

   `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

   bằng URL `/exec` vừa nhận.

Sau mỗi lần sửa `Code.gs`, cần tạo phiên bản triển khai mới hoặc chỉnh deployment hiện tại sang phiên bản mới.
