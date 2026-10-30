# Velvet Billiards Club

Game billiards 3D bằng **JavaScript, Three.js, Vite và Node.js/WebSocket**. Khi vào web, sảnh có **Tạo phòng / Nhập mã phòng / Đấu với máy**. Phòng online có đúng **2 người chơi chính**, tối đa **200 khán giả mặc định** (có thể cấu hình), chia sẻ mã/link chơi hoặc link xem. Vẫn có 5 chế độ, AI 3 mức, chơi local, camera, lực/xoáy, âm thanh và lịch sử trên thiết bị.

## Chơi online và triển khai Render

Dùng [Deploy to Render](https://render.com/deploy?repo=https://github.com/duchiep2310/test) để tạo dịch vụ từ `render.yaml`: kết nối tài khoản GitHub, chọn repository, xem cấu hình Free rồi Apply. Dịch vụ Node phục vụ cả giao diện và WebSocket tại cùng địa chỉ HTTPS của Render, không cần ghép API URL hay tạo khóa bí mật. Chỉ được coi là hoạt động công khai sau khi Render báo Live và đã thử kết nối. GitHub Pages riêng lẻ chỉ chơi AI/local; cần máy chủ đã triển khai để mở phòng. Xem [DEPLOYMENT.md](DEPLOYMENT.md).

Phát triển với phòng online:

```sh
npm ci
npm run dev:online
```

Hoặc mở hai terminal: `npm start` (backend cổng 3001) và `npm run dev` (Vite cổng 5173, proxy `/ws`). Máy chủ production sau build: `npm start`, dùng biến `PORT` do hosting cung cấp. Mở ít nhất hai trình duyệt để thử hai ghế chơi và trình duyệt thứ ba để xem.

- Tạo phòng chọn chế độ/điểm đích; mã phòng 6 ký tự, người thứ hai vào chơi thì trận tự bắt đầu.
- Người thứ ba trở đi tự vào xem; có thể chọn **Vào xem** ngay cả khi còn ghế trống.
- Khán giả không được đánh, đặt bi, tạm dừng hoặc tái đấu. Nếu có ghế trống, chọn **Ngồi vào bàn** để bắt đầu một trận mới.
- Máy chủ chạy vật lý/luật, xác thực lượt và truyền snapshot tối đa 20 Hz khi bi chuyển động hoặc hướng ngắm thay đổi. Trình duyệt chỉ nội suy hiển thị, không quyết định kết quả online.
- Mất mạng giữ ghế 60 giây; tải lại trang trong cùng tab tự xin nối lại bằng token trong sessionStorage. Token không xuất hiện trong link mời hoặc snapshot công khai. Rời phòng chủ động giải phóng ghế và đặt trận về trạng thái chờ.
- Kết thúc trận, cả hai người chơi phải đồng ý tái đấu. Người xem tiếp tục ở cùng phòng.
- Phòng lưu trong RAM một tiến trình, mất khi server restart/ngủ/redeploy. Chưa có tài khoản, xác minh danh tính hay cơ sở dữ liệu; ai có mã có thể vào phòng. Không chạy nhiều instance độc lập nếu chưa bổ sung shared state và routing.

## Góc nhìn và bàn lớn

Bàn hiển thị lớn hơn mặc định. Nút bốn góc **Mở rộng bàn** dùng toàn bộ chiều rộng và vẫn giữ bảng điểm, lực đánh, xoáy. Các nút **+ / −** phóng to/thu nhỏ; **R** đặt lại camera. Giữ **W** tiến góc nhìn, **S** lùi, **A/D** sang trái/phải theo hướng camera hiện tại. Các phím chỉ điều khiển camera riêng của bạn, không di chuyển bi hoặc ảnh hưởng người chơi khác. Khi nhập tên, mở hộp thoại hoặc ở sảnh, các phím này dành cho việc nhập liệu.

## Tên người chơi

Nhập tên ở sảnh hoặc chọn **Đặt / đổi tên người chơi**. Trong trận, dùng **Đổi tên** ở thanh phòng hoặc cuối trang. Chơi local có thể đặt tên riêng cho cả hai người; chơi AI dùng tên của bạn. Tên hỗ trợ tiếng Việt, tối đa 24 ký tự, được nhớ trên trình duyệt. Đổi tên online đồng bộ ngay cho đối thủ/khán giả và không đổi ghế, lượt hay điểm.

## Cài đặt và chạy

Cần Node.js `>=22.12.0`, npm và trình duyệt hỗ trợ WebGL2. Môi trường phát triển hiện tại dùng Node.js 24.

```sh
cd /workspace/test
npm install
npm run dev -- --port 5173 --strictPort
```

Khi clone về máy riêng, thay đường dẫn bằng thư mục checkout. Dùng `npm ci` để cài đúng `package-lock.json`; `npm install` dành cho lần chủ động cập nhật dependency.

```sh
npm run build
npm run preview -- --port 4173 --strictPort
npm test
```

Build sinh `dist/`. Hosting static/`preview` chỉ hỗ trợ AI/local nếu chưa cấu hình backend online. Phòng online cần `npm start`; không cần cơ sở dữ liệu hoặc khóa API. Render cấp HTTPS/WSS phía trước Node.

Nếu runner `node --test` không tạo được tiến trình con trong môi trường bị hạn chế, chạy trực tiếp từng suite; Node vẫn thực thi các kiểm tra `node:test` và trả mã lỗi khi có thất bại:

```sh
node tests/physics.test.js
node tests/rules.test.js
node tests/ai.test.js
node tests/rooms.test.js
```

Kiểm thử trình duyệt (Playwright):

```sh
npx playwright install chromium
npm run test:browser
# Nếu đã có Chromium hệ thống:
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

Bản phòng online đã đạt 73 kiểm tra Node (vật lý, luật, AI và HTTP/WebSocket) cùng 10 luồng Chromium. Suite trình duyệt bao gồm gameplay năm chế độ, UI/cài đặt, bố cục 390px, scratch/đặt bi, thắng 8-ball, AI, sảnh và bốn phiên độc lập: hai người chơi, hai khán giả, nối lại ghế và nhận ghế trống. Không có lỗi JavaScript trong các luồng đạt. Kiểm tra offline tăng tốc bước mô phỏng; kiểm tra phòng dùng máy chủ và kết nối thật theo thời gian thực. Không dùng hoạt ảnh giả lập và chưa benchmark 200 người xem thật.

## Điều khiển

| Thao tác          | Cách dùng                                                                                                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ngắm              | Nhấn/kéo chuột trái hoặc ngón tay trên bàn                                                                                                                                                                                                                                              |
| Lực đánh          | Thanh **Shot power**                                                                                                                                                                                                                                                                    |
| Đánh              | Nút **Take the shot** hoặc `Space`; desktop hỗ trợ giữ `Shift`, kéo xuống rồi thả                                                                                                                                                                                                       |
| Xoáy              | Nhấn/kéo trên hình bi cái; khi được focus, dùng phím mũi tên và `Home` để đặt lại                                                                                                                                                                                                       |
| Camera            | Nút camera đổi góc nghiêng/nhìn từ trên; kéo chuột phải hoặc `Alt` + kéo để xoay; cuộn hoặc phím **+ / −** để zoom sâu hơn; giữ **W/A/S/D** để di chuyển góc nhìn, **R** để về giữa bàn; nút **Mở rộng bàn** tăng diện tích hiển thị; trên cảm ứng dùng hai ngón tay để xoay/pinch zoom |
| Tạm dừng/tiếp tục | Nút pause hoặc `Esc`; chuyển tab tự tạm dừng khi chơi offline; trận online tiếp tục trên máy chủ                                                                                                                                                                                        |
| Bi cái trong tay  | Nhấn một vị trí trống trong bàn, tránh lỗ và bi khác                                                                                                                                                                                                                                    |
| Gọi bi/lỗ         | Bảng **Call your shot** dưới bàn; 10-ball chọn cả bi và lỗ, cú kết thúc 8-ball chọn lỗ                                                                                                                                                                                                  |

Đổi chế độ bằng thẻ phía trên hoặc **New match**. Trong **Settings**, chọn local/AI, độ khó Easy/Medium/Hard, chất lượng đồ họa, màu nỉ, kiểu bi, âm lượng, đường ngắm và ngôn ngữ. Tiếng Việt áp dụng cho các điều khiển chính; luật và bình luận vẫn bằng tiếng Anh. Điểm đích carom áp dụng từ trận mới.

## Luật đang được triển khai

Đây là luật câu lạc bộ được đơn giản hóa. Pool xử lỗi không chạm bi, chạm sai bi trước, scratch, và không có bi chạm băng hoặc xuống lỗ sau tiếp xúc. Cú phá phải đưa ít nhất một bi mục tiêu xuống lỗ hoặc bốn bi mục tiêu khác nhau chạm băng. Lỗi thông thường đổi lượt và cho đối thủ đặt bi cái ở bất kỳ vị trí hợp lệ nào.

| Chế độ            | Ghi điểm và thắng                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **8-Ball**        | Sau phá, bàn vẫn mở. Cú vào bi hợp lệ sau đó xác định trơn/sọc, không cần gọi bi nhóm. Vào bi của mình được tiếp tục; khi đã hết nhóm từ đầu cú đánh, gọi lỗ rồi vào số 8 để thắng. Vào 8 sớm, sai lỗ hoặc kèm lỗi sẽ thua. Số 8 ở cú phá được đặt lại. |
| **9-Ball**        | Chạm bi có số nhỏ nhất còn trên bàn trước. Combination hợp lệ; vào số 9 hợp lệ thắng ngay, kể cả cú phá. Số 9 vào kèm lỗi được đặt lại. Vào bi hợp lệ giữ lượt.                                                                                         |
| **10-Ball**       | Chạm số nhỏ nhất trước; sau phá phải gọi bi và lỗ. Vào đúng bi/lỗ được tiếp tục. Bi thường vào không gọi vẫn nằm dưới lỗ nhưng đổi lượt. Số 10 phải là bi cuối và được gọi đúng; vào sớm, ở cú phá, sai lỗ hoặc kèm lỗi sẽ đặt lại.                     |
| **Carom**         | Bàn không lỗ, ba bi. Player 1 dùng trắng, Player 2 dùng vàng. Bi cái chạm cả hai bi còn lại trong cùng cú được một điểm và giữ lượt; hụt đổi lượt. Đạt điểm đích trước sẽ thắng.                                                                        |
| **Three-Cushion** | Luật carom, thêm yêu cầu bi cái chạm băng ít nhất ba lần trước lần chạm bi mục tiêu thứ hai khác biệt. Băng trước bi thứ nhất và nhiều lần chạm cùng một băng đều được tính.                                                                            |

Không triển khai push-out, thua sau ba lỗi liên tiếp, lựa chọn đánh lại sau phá lỗi, hoặc quyền trả lượt trong 10-ball. Pool chơi một ván; điểm đích 3/5/10/20 chỉ dành cho carom và three-cushion.

## Kiến trúc

| Thư mục                      | Trách nhiệm                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `server/`                    | HTTP/WebSocket, phòng, hai ghế chơi, khán giả, token nối lại, phân quyền và giới hạn tài nguyên |
| `src/network/`, `src/ui/`    | Client WebSocket, nội suy snapshot và sảnh/phòng online                                         |
| `src/core/`                  | Điều phối lượt, state machine, input và vòng lặp bước cố định `1/240` giây                      |
| `src/physics/`               | Chuyển động 2D trên mặt bàn, impulse theo khối lượng, ma sát, băng, lỗ và đặt bi                |
| `src/modes/`                 | Setup bi, mục tiêu hợp lệ, phân xử sự kiện cú đánh và điều kiện thắng của từng chế độ           |
| `src/rendering/`             | Scene Three.js, bàn/bi/cơ, ánh sáng/bóng, camera, đường ngắm và hoạt ảnh xuống lỗ               |
| `src/ai/`                    | Lập kế hoạch cú đánh và đặt bi cái bằng cùng dữ liệu luật/vật lý                                |
| `src/audio/`                 | Web Audio: va chạm, cơ, băng, lỗ, thắng/thua và âm nền tùy chọn                                 |
| `src/main.js`, `src/styles/` | Giao diện responsive, dialog, HUD, cài đặt và lịch sử                                           |
| `tests/`                     | Kiểm tra vật lý, luật và AI bằng `node:test`                                                    |

Vật lý độc lập Three.js và nhận bước thời gian cố định; thời gian render không quyết định kết quả mô phỏng. Kiểm tra vật lý bao gồm truyền động lượng, va chạm xiên, khối lượng, băng, bắt lỗ, chống xuyên ở tốc độ cao, dừng bi và phản ứng xoáy. Kiểm tra luật dùng chuỗi sự kiện cho từng chế độ; kiểm tra AI bao gồm đường bị chắn, gọi bi/lỗ, đặt bi và carom với solver thật.

## Phạm vi mô phỏng và dữ liệu

Bi hiển thị 3D nhưng mô phỏng trên mặt phẳng. Follow/draw là lực hiệu chỉnh có giới hạn sau va chạm; side spin điều chỉnh phản ứng tiếp tuyến trên băng. Không có jump, massé hoặc mô hình rigid-body 3D đầy đủ. Miệng lỗ dùng vùng bắt hình tròn và biên băng kín để giữ bi ổn định; đường ngắm là gợi ý hình học, không dự báo toàn bộ cú đánh có xoáy.

AI dùng ghost-ball, kiểm tra đường trống và ước lượng lực. Medium xét thêm combination, Hard xét thêm bank; carom lấy mẫu góc và thử shortlist bằng solver vật lý. Có sai số ngắm theo độ khó, không học máy hoặc tìm kiếm chiến thuật dài hạn; không bảo đảm mọi cú đều hợp lệ hay ghi điểm. Chọn **Low** để tắt bóng và giảm độ phân giải trên thiết bị yếu. Hiệu năng trên điện thoại thật cần đo riêng; bố cục responsive không chứng minh tốc độ khung hình.

Texture bi/nỉ, hình bàn, biểu tượng và âm thanh được tạo tại chỗ; Three.js được bundle từ dependency. Game không tải asset từ CDN khi chơi. Chế độ online kết nối WebSocket tới máy chủ phòng. Lần cài dependency cần npm registry. Âm thanh chỉ mở sau tương tác người dùng và có thể bị trình duyệt hạn chế.

`localStorage` giữ cài đặt và tối đa 20 trận đã hoàn thành trong cùng trình duyệt/origin. Trận offline không được lưu khi tải lại trang; trận online có thể nối lại ghế trong 60 giây qua sessionStorage; lịch sử không đồng bộ thiết bị. Trận online được đồng bộ qua máy chủ khi kết nối.

## Môi trường đám mây

Dùng checkout hiện có tại `/workspace/test`; mỗi task đã có môi trường cô lập nên không cần tạo Git worktree. Chạy lại lệnh dev/preview khi mở máy mới và xác minh trang tải được cùng một cú đánh thực tế. Snapshot có thể giữ dependency và build, nhưng tiến trình server, kết nối và trạng thái trận trong trình duyệt không được giả định sẽ tồn tại sau khôi phục. Lưu lệnh khởi động trong cấu hình môi trường khi dùng onboarding.
