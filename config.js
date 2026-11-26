// =========================================================================
// CẤU HÌNH ĐỒNG BỘ ĐÁM MÂY TỰ ĐỘNG GIỮA LAPTOP ↔ ĐIỆN THOẠI (ZERO-CONFIG CLOUD V12)
// =========================================================================
// - Hệ thống ĐÃ KÍCH HOẠT SẴN Cloud Tự Động (autoCloudMasterId + Kênh Realtime Push SSE)
//   ngay trong file này — KHÔNG cần tự tạo Firebase vẫn đồng bộ tức thì giữa Laptop & Điện thoại!
// - Mọi tài khoản cũ trên Laptop (vanhung555) & Điện thoại (vanhung23 PRO, vanhung123 ULTRA)
//   được tự động gộp chung, tự động tách mã ID nếu trùng và giữ nguyên gói Pro/Ultra!
// - Tùy chọn nâng cao: Nếu muốn gắn thêm Firebase Realtime Database riêng, dán vào firebaseDbUrl.
// =========================================================================
window.TAMN_CLOUD_CONFIG = {
  autoCloudEnabled: true,
  autoCloudApiBase: "https://api.restful-api.dev/objects",
  autoCloudMasterId: "ff808181a09d98f701a21939eb1958fd",
  realtimePushTopic: "tamn_v12_live_1939eb1958fd",
  snapshotTopic: "tamn_v12_state_1939eb1958fd",
  firebaseDbUrl: "",
  syncIntervalMs: 6000
};
