# Turbo Console Log Enhanced 🚀

Dựa trên [Turbo Console Log](https://github.com/Chakroun-Anas/turbo-console-log) với các cải tiến bổ sung.

---

## 🌟 Tại sao nên dùng Turbo Console Log Enhanced?

Turbo Console Log Enhanced là công cụ hỗ trợ debug mạnh mẽ cho các nhà phát triển, giúp bạn:

- **Thêm console.log thông minh** với ngữ cảnh rõ ràng
- **Tránh lỗi cú pháp** khi thêm log vào các vị trí không an toàn
- **Tiết kiệm thời gian** với các phím tắt tiện lợi
- **Tùy chỉnh định dạng log** theo nhu cầu của bạn

---

## 🚀 Tính năng nổi bật

✔️ **Thêm log thông minh** - Tự động thêm console.log với thông tin ngữ cảnh hữu ích  
✔️ **Kiểm tra vị trí an toàn** - Tránh thêm log vào các vị trí không hợp lệ  
✔️ **Quản lý log dễ dàng** - Comment, uncomment hoặc xóa log với phím tắt đơn giản  
✔️ **Hỗ trợ multi-cursor** - Debug nhiều biến cùng lúc  
✔️ **Tùy chỉnh định dạng log** - Cá nhân hóa cách hiển thị log trong code

---

## 🔧 Cấu hình & Tùy chỉnh

Bạn có thể tùy chỉnh log theo nhiều cách:

✅ Tiền tố & Hậu tố  
✅ Hàm log (`console.log`, `console.warn`, `console.error`, v.v.)  
✅ Loại dấu ngoặc kép (`'`, `"`, hoặc \``)  
✅ Hiển thị tên file & số dòng

---

## ✨ Cải tiến mới trong phiên bản này

- **🛡️ Kiểm tra vị trí an toàn:**  
  Tự động phát hiện và bỏ qua các vị trí không an toàn khi thêm log

- **🔍 Phát hiện thông minh:**  
  Nhận biết các trường hợp đặc biệt như:

  - Bên trong dấu ngoặc đơn chưa đóng
  - Bên trong hàm `.test()` của RegExp
  - Bên trong object literal chưa đóng
  - Bên trong array literal chưa đóng

- **🧹 Code sạch hơn:**  
  Loại bỏ các console.log debug không cần thiết trong mã nguồn

- **🔄 Cải thiện hiệu suất:**  
  Tối ưu hóa quá trình phân tích cú pháp và thêm log

---

## 🔌 Cách sử dụng

### Phím tắt mặc định

- **Thêm log cho biến được chọn:** `Ctrl+Alt+L`
- **Thêm log cho tất cả các biến:** `Ctrl+Alt+Shift+A`
- **Comment tất cả các log:** `Ctrl+Alt+C`
- **Uncomment tất cả các log:** `Ctrl+Alt+U`
- **Xóa tất cả các log:** `Ctrl+Alt+D`

### Ví dụ

Khi bạn chọn một biến và nhấn `Ctrl+Alt+L`, extension sẽ thêm một dòng log như sau:

```javascript
const user = { name: 'John', age: 30 };
console.log('user => ', user);
```

Khi bạn sử dụng `Ctrl+Alt+Shift+A` trên một biến, extension sẽ thêm log cho tất cả các lần xuất hiện của biến đó, với số thứ tự STEP:

```javascript
const user = { name: 'John', age: 30 };
console.log('STEP 1: user => ', user);
// ... code khác ...
updateUser(user);
console.log('STEP 2: user => ', user);
```

---

## 🔒 Tính năng an toàn

Extension sẽ tự động kiểm tra và không thêm log vào các vị trí không an toàn như:

```javascript
// Không thêm log vào giữa tham số hàm
someFunction(
  param1,
  user, // Không thêm log ở đây
  param3,
);

// Không thêm log vào giữa object literal
const config = {
  user: user, // Không thêm log ở đây
  options: {},
};

// Không thêm log vào giữa array
const items = [
  user, // Không thêm log ở đây
  otherItem,
];
```

---

## 🎯 Đóng góp

Nếu bạn muốn cải thiện extension này, hãy tạo pull request hoặc báo cáo lỗi trên GitHub.

---

## 📜 Giấy phép

MIT License
