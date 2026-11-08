# 🥐 Bonjour Français - Nền Tảng Học Tiếng Pháp Tương Tác Thông Minh

Ứng dụng web học tiếng Pháp hiện đại với giao diện thanh lịch mang đậm phong cách Parisienne, tích hợp phương pháp phản xạ âm thanh, flashcards 3D, thi thử trắc nghiệm và hội thoại đời thực.

---

## ✨ Tính Năng Nổi Bật

### 1. 🔐 Trang Đăng Nhập & Đăng Ký Chuyên Nghiệp
- **Trang Đăng Nhập:** 
  - Giao diện tách đôi chuẩn quốc tế với hình ảnh nghệ thuật và danh ngôn tiếng Pháp.
  - Hỗ trợ lưu phiên đăng nhập (`Remember Me`), hiển thị/ẩn mật khẩu an toàn.
  - Nút **"Trải nghiệm nhanh" (1-Click Demo Login)** giúp xem thử ngay giao diện học viên mà không cần nhập liệu.
- **Trang Đăng Ký Chi Tiết:**
  - Nhập họ tên, email, mật khẩu với thanh đo độ mạnh mật khẩu (Password Strength Meter) theo thời gian thực.
  - **Khảo sát trình độ đầu vào:** Lựa chọn từ A1 (Débutant), A2 (Élémentaire), B1 (Intermédiaire) đến B2 (Avancé).
  - **Mục tiêu luyện tập mỗi ngày:** Lựa chọn thời gian phù hợp (10 phút, 15 phút, 30 phút).
  - Tặng ngay **+100 XP thưởng khởi đầu** cùng hiệu ứng pháo hoa chúc mừng.

### 2. 🃏 Hệ Thống Flashcards 3D & Phát Âm Chuẩn Paris
- Thẻ từ vựng hiệu ứng lật 3D hai mặt mượt mà.
- Tích hợp công nghệ tổng hợp âm thanh **Web Speech API (fr-FR)** cho phép nghe giọng đọc bản xứ chuẩn từng từ và từng câu ví dụ.
- Phân loại theo chủ đề: *Chào hỏi, Ẩm thực, Đời sống, Văn hóa, Du lịch*.
- Cơ chế đánh dấu từ vựng yêu thích, ghi nhận từ đã thuộc và tích lũy XP.

### 3. 📚 Giáo Trình Khóa Học Chuẩn CEFR (A1 - B2)
- Lộ trình bài học khoa học: Từ vựng, ngữ pháp, mẹo nối âm (*Liaison*), quy tắc giống đực/cái (*Masculin / Féminin*).
- Modal tương tác xem chi tiết bài học và nút hoàn thành nhận điểm thưởng.

### 4. ☕ Hội Thoại Đời Thường Tại Paris
- Tái hiện chân thực các tình huống giao tiếp: *Gọi món tại quán Café de Flore*, *Hỏi đường đến Bảo tàng Louvre*.
- Giao diện dạng tin nhắn bong bóng chat với avatar nhân vật sinh động.
- Tính năng bật/tắt phụ đề tiếng Việt để rèn luyện kỹ năng nghe hiểu tiếng Pháp.

### 5. 🎯 Đố Vui & Thi Thử Phản Xạ
- Bộ câu hỏi trắc nghiệm kèm giải thích ngữ pháp chi tiết.
- Hiển thị kết quả, tỉ lệ phần trăm và trao điểm XP.

### 6. 👤 Hồ Sơ Học Viên & Huy Hiệu Danh Dự
- Theo dõi chuỗi ngày học liên tục (**Streak 🔥**), tổng điểm XP, số từ vựng đã nắm vững.
- Hệ thống huy hiệu: *Khởi đầu rực rỡ*, *Chuỗi lửa nhiệt huyết*, *Chuyên gia Café*, *Nhà leo tháp Eiffel*...

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Biểu Tượng:** Lucide React
- **Âm Thanh:** Web Speech API (`SpeechSynthesis` với locale `fr-FR`)
- **Hiệu Ứng:** Canvas Confetti, CSS 3D Transforms
- **Lưu Trữ Cục Bộ:** LocalStorage API

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

1. Cài đặt các thư viện phụ thuộc:
```bash
npm install
```

2. Chạy môi trường phát triển:
```bash
npm run dev
```
Trang web sẽ sẵn sàng tại `http://localhost:5173`.

3. Đóng gói cho môi trường Production:
```bash
npm run build
```
