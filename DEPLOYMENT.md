# Đưa game có phòng online lên web

## Cách khuyến nghị: một dịch vụ Render

Repository có sẵn `render.yaml`. Render sẽ phục vụ cả web và WebSocket tại cùng một domain HTTPS, nên người chơi chỉ cần một đường dẫn.

1. Mở **https://render.com/deploy?repo=https://github.com/duchiep2310/test**.
2. Đăng ký/đăng nhập Render, kết nối GitHub và cấp quyền đọc repository `duchiep2310/test`.
3. Chọn Blueprint từ nhánh `main`. Kiểm tra dịch vụ `velvet-billiards` và gói **Free**, rồi Apply/Deploy. Không cần nhập API key cho game.
4. Chờ dịch vụ báo **Live**. Mở URL HTTPS do Render hiển thị. Không giả định URL trước khi Render cấp tên.
5. Tạo phòng ở trình duyệt thứ nhất; mở link mời ở trình duyệt thứ hai để chơi; dùng link xem trong trình duyệt thứ ba. Chỉ chia sẻ như một website online đã hoạt động sau khi kiểm tra này đạt.

Cấu hình đã chuẩn bị:

- Build: `npm ci --include=dev --no-audit --no-fund && npm run build`.
- Start: `npm start`; Node lắng nghe `0.0.0.0` trên `PORT` do Render cấp.
- Health check: `/health`, kết quả JSON `status: ok`, `protocol: 1`.
- WebSocket: `/ws`; TLS/WSS do Render xử lý. Không dùng `vite preview` làm server phòng.
- `MAX_ROOMS=100`, `MAX_SPECTATORS=200` mỗi phòng. Điều chỉnh theo RAM/băng thông; đây là giới hạn tài nguyên, không phải kết quả benchmark 200 người thật.
- `ALLOWED_ORIGINS=https://duchiep2310.github.io` cho frontend GitHub Pages. Origin cùng host Render luôn được chấp nhận. Khi dùng frontend domain khác, thêm origin HTTPS chính xác, phân cách bằng dấu phẩy, không dùng wildcard.

**Giới hạn Free/in-memory:** dịch vụ có thể ngủ hoặc khởi động lại; lần truy cập đầu có thể chậm và phòng đang mở sẽ mất. Phòng không có kết nối được xóa sau 5 phút; ghế mất mạng được giữ 60 giây. Bản hiện tại dùng một instance, chưa có Redis/database, lưu trận bền vững hoặc đồng bộ nhiều instance. Không cam kết SLA hoặc số người xem đồng thời trên gói Free.

## Giữ giao diện trên GitHub Pages

GitHub Pages chỉ phục vụ static, không chạy Node/WebSocket. Giao diện ở nhánh `gh-pages` có thể chơi AI/local ngay. Để nối giao diện đó với backend Render đã Live:

1. Đặt `public/online-config.json` thành `{"serverUrl":"https://TEN-DICH-VU.onrender.com"}` với URL thực Render cấp. URL là địa chỉ công khai, không phải secret. Hoặc đặt `VITE_ROOM_SERVER` khi build.
2. Chạy `npm ci`, `npm test`, `npm run build`; đưa nội dung `dist/` lên nhánh `gh-pages` cùng `.nojekyll`.
3. Trong GitHub **Settings → Pages**, chọn **Deploy from a branch → gh-pages → / (root)** nếu chưa bật.
4. Chờ Pages triển khai. Thử tạo phòng từ GitHub Pages và vào cùng mã từ domain Render: phải thấy cùng một trận và cùng số người xem.

Đường dẫn mặc định dự kiến: `https://duchiep2310.github.io/test/`. Không khẳng định URL đã hoạt động trước khi Pages/Render triển khai. Nếu chưa cấu hình backend trên Pages, giao diện sẽ nói phòng online chưa được kích hoạt; chế độ đấu máy vẫn chơi được.

## Chạy và kiểm thử trên Windows hoặc cloud

```sh
npm ci
npm run build
npm start
```

`npm start` phục vụ bản build cùng máy chủ phòng. Trong development dùng `npm run dev:online` để chạy cả backend và Vite, hoặc hai terminal `npm start` + `npm run dev`.

```sh
npm test
npx playwright install chromium
npm run test:browser
```

Playwright tự khởi động/reuse Vite 5173 và backend 3001. Trong môi trường đã có Chromium hệ thống: `CHROMIUM_PATH=/usr/bin/chromium npm run test:browser`. Các phiên nhiều trình duyệt dùng chế độ đồ họa Low vì môi trường kiểm thử dựng WebGL bằng phần mềm.

## An toàn và quyền điều khiển

Máy chủ thực thi cùng vật lý và luật cho cả năm chế độ; chỉ ghế đang tới lượt được gửi cú đánh/đặt bi. Khán giả chỉ nhận snapshot, có thể xin ghế khi trống. Token riêng cho mỗi ghế không đưa vào link/snapshot; các link mời chỉ có mã phòng và cờ xem. Tên là tên hiển thị chưa xác minh. Không truyền khóa hosting hoặc token GitHub cho client. Có giới hạn payload, tốc độ thông điệp, phòng, khán giả, heartbeat và bộ đệm gửi cho kết nối chậm. Đây là game casual, chưa có tài khoản/ranking hay hệ thống chống gian lận cấp giải đấu.
