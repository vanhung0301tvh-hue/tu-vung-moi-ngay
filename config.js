// =========================================================================
// CẤU HÌNH ĐỒNG BỘ ĐÁM MÂY GIỮA LAPTOP ↔ ĐIỆN THOẠI (FIREBASE MIỄN PHÍ 100%)
// =========================================================================
// Hướng dẫn gắn link để mọi máy (Laptop, Điện thoại, Người dùng khác) dùng CHUNG 1 kho tài khoản:
// 1. Vào https://console.firebase.google.com -> Tạo dự án -> Build -> Realtime Database -> Create Database (Test mode).
// 2. Copy đường link Database (dạng: https://ten-du-an-default-rtdb.asia-southeast1.firebasedatabase.app)
// 3. Dán vào giữa 2 dấu ngoặc kép của firebaseDbUrl bên dưới rồi Commit & Push lên GitHub Pages!
// =========================================================================
window.TAMN_CLOUD_CONFIG = {
  firebaseDbUrl: "", // <-- Dán link Firebase Realtime Database vào đây (không có dấu / ở cuối cũng được)
  syncIntervalMs: 8000
};
