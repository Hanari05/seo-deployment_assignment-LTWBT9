# SEO & Deployment - Website E-commerce

Đây là bài tập kiểm tra kỹ năng **deploy website** và **cấu hình Metadata chuẩn SEO**, sử dụng **Next.js** cho frontend và **Node.js + Express** cho backend.

## Ngữ cảnh & Nghiệp vụ (Business Specs)

Bạn đang triển khai website cho cửa hàng nội thất **Nest**. Dự án đã có sẵn giao diện e-commerce và **6 sản phẩm mock**, không cần database.

**Yêu cầu cốt lõi:**

1. Frontend deploy trên **Vercel**, backend deploy trên **Render hoặc Railway**.
2. Website truy cập công khai qua HTTPS và hiển thị đủ sản phẩm lấy từ API backend.
3. Metadata mô tả đúng cửa hàng, sử dụng URL production và có thông tin xem trước khi chia sẻ liên kết.

---

## Cài đặt và Khởi chạy

Yêu cầu **Node.js 22+**, Git và tài khoản GitHub.

1. Fork repo về tài khoản của bạn, clone và tạo nhánh làm bài:

   ```bash
   git clone <URL-fork-cua-ban>
   cd seo-deployment_assignment
   git checkout -b lam-bai
   ```

2. Chạy backend trong terminal thứ nhất:

   ```bash
   cd backend
   npm ci
   npm run dev
   ```

   API chạy tại `http://localhost:5000`. Mock data có sẵn trong `backend/data/products.js`, không cần seed.

3. Mở terminal thứ hai từ thư mục gốc và chạy frontend:

   ```bash
   cd frontend
   npm ci
   cp .env.local.example .env.local
   npm run dev
   ```

   Trên Windows PowerShell, dùng `Copy-Item .env.local.example .env.local` thay cho `cp`. Nếu bị chặn `npm.ps1`, dùng `npm.cmd` thay cho `npm`.

   File `frontend/.env.local`:

   ```dotenv
   API_BASE_URL=http://localhost:5000
   SITE_URL=http://localhost:3000
   ```

   Mở `http://localhost:3000`. Không commit file `.env.local`.

---

## Nhiệm Vụ Của Bạn

Bạn được tự do sáng tạo giao diện, màu sắc, nội dung hoặc bổ sung tính năng, nhưng phải giữ cấu trúc thư mục bên dưới và đảm bảo frontend lấy sản phẩm từ backend. Có thể thêm file/thư mục con khi cần. Không bắt buộc xây dựng giỏ hàng, thanh toán hay đăng nhập.

```text
seo-deployment_assignment/
├── frontend/
│   ├── app/                 # Giao diện và cấu hình SEO
│   ├── public/              # Ảnh và tài nguyên tĩnh
│   └── package.json
├── backend/
│   ├── data/products.js     # Mock data sản phẩm
│   ├── index.js             # Express app và API
│   ├── server.js            # Khởi động backend
│   └── package.json
└── README.md
```

### 1. Deploy backend lên Render hoặc Railway

- Tạo tài khoản **Render hoặc Railway**, kết nối GitHub và chọn repository đã fork, nhánh `lam-bai`.
- **Render:** tạo Web Service, Root Directory là `backend`, Build Command là `npm ci`, Start Command là `npm start`.
- **Railway:** tạo service từ GitHub repo, Root Directory là `/backend`, Start Command là `npm start`; sau khi deploy, chọn **Generate Domain** để có URL công khai.
- Backend đã sử dụng `process.env.PORT` do nền tảng cung cấp. Kiểm tra `/api/health` và `/api/products` trên URL vừa deploy trả về `200`.

Tham khảo: [Express trên Render](https://render.com/docs/deploy-node-express-app), [Express trên Railway](https://docs.railway.com/guides/express).

### 2. Deploy frontend lên Vercel

- Tạo tài khoản **Vercel**, kết nối GitHub và import repository đã fork.
- Chọn Root Directory là `frontend`, Framework Preset là **Next.js**, Production Branch là `lam-bai`.
- Thêm `API_BASE_URL` bằng URL HTTPS của backend, không kèm `/api/products`.
- Deploy để lấy URL frontend, sau đó đặt `SITE_URL` bằng URL production này và redeploy. Cấu hình các biến cho môi trường **Production**.
- Website phải hiển thị đủ 6 sản phẩm từ backend. Push thay đổi lên nhánh làm bài và kiểm tra Vercel tự deploy lại.

### 3. Cấu hình Metadata chuẩn SEO

Hoàn thiện `frontend/app/layout.js` bằng **Next.js Metadata API**:

- **Title và description:** thay nội dung mẫu bằng tiêu đề, mô tả phù hợp với cửa hàng Nest.
- **Metadata base và canonical:** dùng `SITE_URL`, trỏ về URL production của frontend.
- **Open Graph và Twitter Card:** có tiêu đề, mô tả và ảnh chia sẻ PNG/JPG truy cập công khai; Open Graph có URL trang, Twitter dùng `summary_large_image`.
- Tạo `frontend/app/robots.js` và `frontend/app/sitemap.js`, cho phép thu thập trang production và khai báo đúng URL trang chủ.

Giữ ngôn ngữ trang là tiếng Việt, một H1 chính và alt cho ảnh. `SITE_URL` chỉ là biến có sẵn; bạn phải tự dùng nó để cấu hình SEO. Tham khảo [Next.js Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).

---

## Kiểm tra Website sau khi Deploy

1. Chạy `npm run build` trong `frontend` để kiểm tra lỗi build.
2. Mở URL frontend bằng cửa sổ ẩn danh: truy cập được, hiển thị đủ sản phẩm và ảnh trên desktop/mobile.
3. Dùng Postman hoặc trình duyệt kiểm tra backend: `GET /api/health` trả trạng thái `ok`, `GET /api/products` trả 6 sản phẩm.
4. Dùng **View Page Source** kiểm tra metadata và nội dung sản phẩm. Mở ảnh chia sẻ, `/robots.txt`, `/sitemap.xml`; không được còn URL `localhost`.
5. Chạy **Chrome DevTools → Lighthouse → SEO** để tự kiểm tra. Không yêu cầu nộp ảnh báo cáo hoặc website xuất hiện ngay trên Google.

Nếu backend Render đang khởi động lại sau thời gian không hoạt động, truy cập `/api/health`, đợi API sẵn sàng rồi tải lại frontend.

## Nộp bài qua Fork và Pull Request

1. Sau khi code và test xong, commit và push nhánh làm bài lên fork:

   ```bash
   git add frontend
   git commit -m "Hoan thanh bai tap SEO va Deployment"
   git push -u origin lam-bai
   ```

2. Trên GitHub, bấm **Compare & pull request**:
   - Base repository: `LuckSnow/seo-deployment_assignment`, base branch: `main`.
   - Head repository: fork của bạn, compare branch: `lam-bai`.
3. Trong mô tả PR, chỉ cung cấp **mã số sinh viên và họ tên**.
4. Trong mục **About của repository GitHub đã fork** (bấm biểu tượng bánh răng), đặt **URL frontend** ở trường **Website**, đặt **URL backend** ở **Description** với nhãn `Backend:`. Dùng URL HTTPS công khai để nhóm mở website và gọi `/api/health`, `/api/products` kiểm tra API.
5. Dán link PR để nộp bài. **Giữ PR mở và website hoạt động tới khi có điểm; không đóng và không tự bấm Merge PR.**


---

# Báo cáo quá trình thực hiện

Phần này ghi lại toàn bộ quá trình hoàn thành bài tập, từ code đến deploy, cho cửa hàng nội thất **Hana**.

## 1. Chuẩn bị

- Giải nén mã nguồn, đọc README và code gốc: backend Express 5 (`/api/health`, `/api/products` trả 6 sản phẩm mock) và frontend Next.js 16 (App Router) lấy sản phẩm từ `API_BASE_URL`.
- Fork repo về tài khoản cá nhân, tạo nhánh làm bài `lam-bai`.
- Chạy thử local: backend `http://localhost:5000`, frontend `http://localhost:3000` (file `frontend/.env.local` không được commit).

## 2. Cấu hình SEO (thư mục `frontend/app`)

| File | Nội dung |
| --- | --- |
| `layout.js` | Dùng **Next.js Metadata API**: `title`, `description` về cửa hàng Hana, `metadataBase` lấy từ `SITE_URL`, canonical `/`, Open Graph (`type`, `url`, `siteName`, `locale: vi_VN`, ảnh 1200×630), Twitter Card `summary_large_image`. Giữ `lang="vi"`. |
| `robots.js` | Cho phép thu thập (`Allow: /`), khai báo `Sitemap` theo `SITE_URL`. |
| `sitemap.js` | Khai báo URL trang chủ theo `SITE_URL`. |
| `public/og-image.png` | Ảnh chia sẻ 1200×630 (PNG) truy cập công khai. |
| `page.js` | Đổi thương hiệu Nest thành Hana (logo, menu, alt ảnh, phần giới thiệu). Vẫn một thẻ H1 và mọi ảnh đều có alt. |

`SITE_URL` được đọc từ biến môi trường, không hard-code URL, nên khi deploy chỉ cần đặt biến là metadata, robots và sitemap tự dùng URL production.

## 3. Đổi giao diện

Giao diện gốc (xanh rêu và kem) được đổi sang phong cách **hồng pastel, xanh pastel và trắng**:

- Đổi bảng màu trong `globals.css` (nền trắng hồng `#fffafc`, chữ xanh tím đậm `#3a3956`, nhấn hồng `#c84e80`, thanh thông báo xanh `#cfe3f6`).
- Bo góc lớn cho ảnh hero, thẻ sản phẩm, nút (dạng viên thuốc) và khối giới thiệu; thẻ sản phẩm có viền hồng nhạt và đổ bóng khi rê chuột.
- Vẽ lại 3 ảnh SVG (`chair`, `lamp`, `vase`) theo tông pastel; nền sản phẩm xoay vòng hồng, xanh dương nhạt, xanh bạc hà.
- Giữ nguyên cấu trúc HTML và class, nên không ảnh hưởng đến SEO hay việc lấy dữ liệu từ API.

## 4. Kiểm tra local

1. `cd frontend && npm run build` không có lỗi.
2. Chạy backend và `npm start`, mở View Source: có đủ title, description, canonical, `og:*`, `twitter:*`.
3. `/robots.txt` và `/sitemap.xml` trả về đúng URL theo `SITE_URL`; trang hiển thị 6 sản phẩm.

## 5. Deploy backend lên Render

1. Push nhánh `lam-bai` lên fork, đăng nhập Render bằng GitHub.
2. New, chọn Web Service, chọn repo đã fork.
3. Cấu hình: Branch `lam-bai`, Root Directory `backend`, Build Command `npm ci`, Start Command `npm start`, Instance Type Free. Không cần biến môi trường vì Render cấp `PORT`.
4. Kết quả: `https://hana-api-seo-deployment-ltwbt9.onrender.com`. `GET /api/health` trả `{"status":"ok"}`, `GET /api/products` trả 6 sản phẩm.

Lưu ý: gói Free của Render sẽ "ngủ" khi không có truy cập, nên mở `/api/health` để đánh thức trước khi mở frontend.

## 6. Deploy frontend lên Vercel

1. Import repo đã fork, Root Directory `frontend`, Framework Preset Next.js.
2. Thêm biến `API_BASE_URL` = URL backend Render (không có `/` cuối, không kèm `/api/products`).
3. Deploy lần đầu để có URL production: `https://seo-deployment-assignment-ltwbt-9.vercel.app`.
4. Thêm biến `SITE_URL` bằng URL production này (môi trường Production).
5. **Settings, Environments, Production, Branch Tracking**: đổi Production Branch sang `lam-bai`.
6. Push một commit lên `lam-bai` để Vercel build lại từ nhánh làm bài với đúng biến môi trường.

### Vấn đề gặp phải và cách xử lý

- **Không đổi được Production Branch** (báo "No deployments found for lam-bai"): Vercel chỉ cho chọn nhánh đã có deployment. Cách xử lý là push nhánh `lam-bai` lên GitHub và đợi Vercel build nhánh này rồi mới đổi.
- **Nút Redeploy vẫn dùng nhánh `main`**: Redeploy chỉ build lại cùng mã nguồn của deployment cũ, nên muốn deploy code mới phải push commit lên nhánh Production.
- **Trang vẫn hiện logo "nest"**: đó là bản build từ `main` cũ. Sau khi build từ `lam-bai` thì trang hiển thị thương hiệu Hana.

## 7. Kiểm tra sau deploy

- Mở URL frontend bằng cửa sổ ẩn danh: truy cập được qua HTTPS, hiển thị đủ 6 sản phẩm và ảnh; tab hiển thị title "Hana — Nội thất, đèn bàn...".
- View Page Source: metadata, canonical, Open Graph, Twitter Card dùng URL production, không còn `localhost`.
- Mở `/robots.txt`, `/sitemap.xml`, `/og-image.png`.
- Chạy Lighthouse (mục SEO) trên Chrome DevTools để tự đánh giá.

## 8. Nộp bài

1. `git add frontend`, `git commit -m "Hoan thanh bai tap SEO va Deployment"`, `git push -u origin lam-bai`.
2. Mở Pull Request từ `lam-bai` (fork) vào `main` của `LuckSnow/seo-deployment_assignment`. Mô tả PR chỉ gồm mã số sinh viên và họ tên.
3. Ở About của repo fork: Website là URL frontend, Description là `Backend: <URL backend>`.
4. Giữ PR mở và website hoạt động đến khi có điểm; không tự merge, không đóng PR.

## Địa chỉ

- Frontend: https://seo-deployment-assignment-ltwbt-9.vercel.app
- Backend: https://hana-api-seo-deployment-ltwbt9.onrender.com
