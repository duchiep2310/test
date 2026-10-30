# Xuất bản website công khai

Game là website static, không cần server backend hoặc khóa API. Bản build dùng đường dẫn tài nguyên tương đối nên có thể phục vụ ở tên miền gốc hoặc dưới `/test/`.

## GitHub Pages

Bản build được đưa lên nhánh `gh-pages` của repository `duchiep2310/test`. Để bật website lần đầu:

1. Mở repository trên GitHub → **Settings → Pages**.
2. Trong **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn nhánh **gh-pages**, thư mục **/ (root)** → **Save**.
4. Chờ GitHub hoàn tất triển khai. Trang Pages sẽ hiển thị địa chỉ website. Địa chỉ mặc định dự kiến là `https://duchiep2310.github.io/test/`.

URL chỉ truy cập được sau khi GitHub bật Pages và triển khai thành công. Repository riêng tư có thể cần gói GitHub hỗ trợ Pages. Không thay đổi mức công khai của repository chỉ để bật hosting nếu bạn chưa chủ động chọn điều đó.

Khi cập nhật game, chạy `npm ci`, `npm test`, `npm run build`, rồi cập nhật nội dung `dist/` lên nhánh `gh-pages`. Nhánh `main` giữ mã nguồn; nhánh `gh-pages` giữ bản web đã build. Không đưa `node_modules` lên website.

## Hosting khác

Có thể upload toàn bộ nội dung `dist/` lên bất kỳ dịch vụ static hosting nào. Với Netlify Drop, giải nén bản website đã build rồi kéo thư mục có `index.html` vào giao diện deploy của Netlify. Không tải mã nguồn chưa build thay cho `dist/`.

## Cách mọi người chơi

Mỗi người mở URL bằng trình duyệt hỗ trợ WebGL2. Có thể chơi với AI hoặc hai người trên cùng máy. Website công khai không tự bổ sung chức năng đối kháng online giữa hai máy; chức năng đó chưa có trong bản này. Cài đặt/lịch sử được lưu riêng trên trình duyệt của từng người.
