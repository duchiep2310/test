# Velvet Billiards Club

Game billiards 3D chạy trong trình duyệt bằng **JavaScript, Three.js và Vite**. Có 5 chế độ, hai người chơi trên cùng thiết bị hoặc chơi với AI, camera xoay/nhìn từ trên, chọn lực và xoáy, âm thanh tổng hợp và lịch sử trận lưu trên thiết bị.

## Cài đặt và chạy

Cần Node.js `^20.19.0 || >=22.12.0`, npm và trình duyệt hỗ trợ WebGL2. Môi trường phát triển hiện tại dùng Node.js 24.

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

Build sinh thư mục `dist/`, có thể phục vụ bằng máy chủ static. `preview` dùng kiểm tra build, không thay thế máy chủ production. Không cần backend, tài khoản, khóa API, cơ sở dữ liệu hoặc biến môi trường.

Nếu runner `node --test` không tạo được tiến trình con trong môi trường bị hạn chế, chạy trực tiếp từng suite; Node vẫn thực thi các kiểm tra `node:test` và trả mã lỗi khi có thất bại:

```sh
node tests/physics.test.js
node tests/rules.test.js
node tests/ai.test.js
```

Kiểm thử trình duyệt (Playwright):

```sh
npx playwright install chromium
npm run test:browser
# Nếu đã có Chromium hệ thống:
CHROMIUM_PATH=/usr/bin/chromium npm run test:browser
```

Suite Chromium kiểm tra cú đánh ở cả năm chế độ, UI/cài đặt, bố cục 390px, scratch/đặt bi, thắng 8-ball từ sự kiện vật lý và AI. Khi bàn giao, 58 kiểm tra vật lý/luật/AI và 5 kiểm tra trình duyệt đã đạt; không có lỗi JavaScript hay tài nguyên lỗi trong lượt kiểm tra năm chế độ. Browser tests tăng tốc bước mô phỏng để xác minh kết thúc cú, không dùng hoạt ảnh giả lập.

## Điều khiển

| Thao tác          | Cách dùng                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| Ngắm              | Nhấn/kéo chuột trái hoặc ngón tay trên bàn                                                     |
| Lực đánh          | Thanh **Shot power**                                                                           |
| Đánh              | Nút **Take the shot** hoặc `Space`; desktop hỗ trợ giữ `Shift`, kéo xuống rồi thả              |
| Xoáy              | Nhấn/kéo trên hình bi cái; khi được focus, dùng phím mũi tên và `Home` để đặt lại              |
| Camera            | Nút camera đổi góc nghiêng/nhìn từ trên; kéo chuột phải hoặc `Alt` + kéo để xoay; cuộn để zoom; trên cảm ứng dùng hai ngón tay để xoay/pinch zoom |
| Tạm dừng/tiếp tục | Nút pause hoặc `Esc`; chuyển tab tự tạm dừng                                                   |
| Bi cái trong tay  | Nhấn một vị trí trống trong bàn, tránh lỗ và bi khác                                           |
| Gọi bi/lỗ         | Bảng **Call your shot** dưới bàn; 10-ball chọn cả bi và lỗ, cú kết thúc 8-ball chọn lỗ         |

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

| Thư mục                      | Trách nhiệm                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `src/core/`                  | Điều phối lượt, state machine, input và vòng lặp bước cố định `1/240` giây            |
| `src/physics/`               | Chuyển động 2D trên mặt bàn, impulse theo khối lượng, ma sát, băng, lỗ và đặt bi      |
| `src/modes/`                 | Setup bi, mục tiêu hợp lệ, phân xử sự kiện cú đánh và điều kiện thắng của từng chế độ |
| `src/rendering/`             | Scene Three.js, bàn/bi/cơ, ánh sáng/bóng, camera, đường ngắm và hoạt ảnh xuống lỗ     |
| `src/ai/`                    | Lập kế hoạch cú đánh và đặt bi cái bằng cùng dữ liệu luật/vật lý                      |
| `src/audio/`                 | Web Audio: va chạm, cơ, băng, lỗ, thắng/thua và âm nền tùy chọn                       |
| `src/main.js`, `src/styles/` | Giao diện responsive, dialog, HUD, cài đặt và lịch sử                                 |
| `tests/`                     | Kiểm tra vật lý, luật và AI bằng `node:test`                                          |

Vật lý độc lập Three.js và nhận bước thời gian cố định; thời gian render không quyết định kết quả mô phỏng. Kiểm tra vật lý bao gồm truyền động lượng, va chạm xiên, khối lượng, băng, bắt lỗ, chống xuyên ở tốc độ cao, dừng bi và phản ứng xoáy. Kiểm tra luật dùng chuỗi sự kiện cho từng chế độ; kiểm tra AI bao gồm đường bị chắn, gọi bi/lỗ, đặt bi và carom với solver thật.

## Phạm vi mô phỏng và dữ liệu

Bi hiển thị 3D nhưng mô phỏng trên mặt phẳng. Follow/draw là lực hiệu chỉnh có giới hạn sau va chạm; side spin điều chỉnh phản ứng tiếp tuyến trên băng. Không có jump, massé hoặc mô hình rigid-body 3D đầy đủ. Miệng lỗ dùng vùng bắt hình tròn và biên băng kín để giữ bi ổn định; đường ngắm là gợi ý hình học, không dự báo toàn bộ cú đánh có xoáy.

AI dùng ghost-ball, kiểm tra đường trống và ước lượng lực. Medium xét thêm combination, Hard xét thêm bank; carom lấy mẫu góc và thử shortlist bằng solver vật lý. Có sai số ngắm theo độ khó, không học máy hoặc tìm kiếm chiến thuật dài hạn; không bảo đảm mọi cú đều hợp lệ hay ghi điểm. Chọn **Low** để tắt bóng và giảm độ phân giải trên thiết bị yếu. Hiệu năng trên điện thoại thật cần đo riêng; bố cục responsive không chứng minh tốc độ khung hình.

Texture bi/nỉ, hình bàn, biểu tượng và âm thanh được tạo tại chỗ; Three.js được bundle từ dependency. Game không gọi API hay tải asset từ CDN khi chơi. Lần cài dependency cần npm registry. Âm thanh chỉ mở sau tương tác người dùng và có thể bị trình duyệt hạn chế.

`localStorage` giữ cài đặt và tối đa 20 trận đã hoàn thành trong cùng trình duyệt/origin. Trận đang chơi không được lưu để tiếp tục khi tải lại trang; không có đồng bộ thiết bị hoặc multiplayer online.

## Môi trường đám mây

Dùng checkout hiện có tại `/workspace/test`; mỗi task đã có môi trường cô lập nên không cần tạo Git worktree. Chạy lại lệnh dev/preview khi mở máy mới và xác minh trang tải được cùng một cú đánh thực tế. Snapshot có thể giữ dependency và build, nhưng tiến trình server, kết nối và trạng thái trận trong trình duyệt không được giả định sẽ tồn tại sau khôi phục. Lưu lệnh khởi động trong cấu hình môi trường khi dùng onboarding.
