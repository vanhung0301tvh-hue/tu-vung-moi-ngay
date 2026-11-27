// =========================================================================
// GOOGLE GEMINI 4 HYDROGEN (gemini-4-hydrogen) AI ENGINE + AUTOMATIC FALLBACK
// Ưu tiên gọi mô hình mới nhất Gemini 4 Hydrogen của Google; nếu chưa gắn API Key
// hoặc mạng/quota gián đoạn sẽ tự động chuyển mượt sang bản dự phòng nội tuyến!
// =========================================================================

function getActiveGeminiApiKey() {
  try {
    const localKey = (localStorage.getItem('tamn_gemini_api_key_v1') || '').trim();
    if (localKey) return localKey;
    const cfgKey = (window.TAMN_CLOUD_CONFIG && window.TAMN_CLOUD_CONFIG.geminiApiKey || '').trim();
    return cfgKey;
  } catch {
    return '';
  }
}

function getActiveAiEngineBadgeText() {
  const hasKey = Boolean(getActiveGeminiApiKey());
  return hasKey ? '⚡ Google Gemini 4 Hydrogen (Live API)' : '⚡ Gemini Hydrogen Hybrid (Miễn phí • Sẵn sàng)';
}

async function callGoogleHydrogenAi(promptText, opts = {}) {
  const apiKey = getActiveGeminiApiKey();
  if (!apiKey) return null;

  const cfg = window.TAMN_CLOUD_CONFIG || {};
  const models = [
    cfg.aiPrimaryModel || 'gemini-4-hydrogen',
    cfg.aiFallbackModel || 'gemini-2.5-flash',
    'gemini-2.0-flash'
  ];

  for (const modelName of models) {
    try {
      const ctrl = new AbortController();
      const tm = setTimeout(() => ctrl.abort(), opts.timeoutMs || 12000);
      const body = {
        contents: [{ role: 'user', parts: [{ text: String(promptText || '') }] }],
        generationConfig: {
          temperature: opts.temperature ?? 0.45,
          maxOutputTokens: opts.maxTokens || 1024
        }
      };
      if (modelName.includes('hydrogen')) {
        body.generationConfig.thinkingConfig = { thinkingLevel: opts.thinkingLevel || 'low' };
      }
      if (opts.jsonMode) {
        body.generationConfig.responseMimeType = 'application/json';
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: ctrl.signal
        }
      );
      clearTimeout(tm);
      if (!res.ok) continue;
      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts || [];
      const textOut = parts.map(p => p.text || '').join('').trim();
      if (textOut) {
        window._lastUsedGoogleModel = modelName;
        return { text: textOut, model: modelName };
      }
    } catch {}
  }
  return null;
}

function saveUserGeminiHydrogenKey(e) {
  if (e) e.preventDefault();
  const inp = document.getElementById('hydrogen-api-key-inp');
  const val = (inp?.value || '').trim();
  if (!val) {
    localStorage.removeItem('tamn_gemini_api_key_v1');
    notify('🔄 Đã chuyển về chế độ AI Dự Phòng Nội Tuyến (không cần API Key, hoạt động 24/7)!');
  } else {
    localStorage.setItem('tamn_gemini_api_key_v1', val);
    notify('⚡ Đã lưu khóa Google AI Studio — kích hoạt trực tiếp mô hình Gemini 4 Hydrogen!');
  }
  closeModal('hydrogen-ai-modal');
  render();
}

async function testHydrogenAiConnection() {
  const stEl = document.getElementById('hydrogen-test-status');
  if (stEl) stEl.textContent = '⏳ Đang kiểm tra kết nối tới Google Gemini 4 Hydrogen...';
  const inp = document.getElementById('hydrogen-api-key-inp');
  if (inp && inp.value.trim()) {
    localStorage.setItem('tamn_gemini_api_key_v1', inp.value.trim());
  }
  const ans = await callGoogleHydrogenAi('Reply in 1 short Vietnamese sentence confirming Gemini 4 Hydrogen is ready to grade English.', { maxTokens: 120 });
  if (ans && ans.text) {
    if (stEl) stEl.innerHTML = `<span class="text-emerald-700 font-extrabold">✅ Kết nối thành công (${escapeHtml(ans.model)}):</span> ${escapeHtml(ans.text)}`;
  } else {
    if (stEl) stEl.innerHTML = `<span class="text-amber-700 font-extrabold">ℹ️ Chưa gắn API Key hoặc Key hết hạn mức — Hệ thống tự động sử dụng Bộ Chấm AI Dự Phòng Nội Tuyến mượt mà 100%!</span>`;
  }
}

function openHydrogenAiConfigModal() {
  let modal = document.getElementById('hydrogen-ai-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'hydrogen-ai-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-[2px]';
    document.body.appendChild(modal);
  }
  const curKey = getActiveGeminiApiKey();
  modal.innerHTML = `
    <div class="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl border-2 border-teal-500 text-xs">
      <div class="flex justify-between items-start gap-2">
        <div>
          <span class="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-extrabold text-[10px]">⚡ GOOGLE GEMINI 4 HYDROGEN ENGINE</span>
          <h3 class="text-lg font-black text-slate-900 mt-1">Cấu Hình Trí Tuệ Nhân Tạo Gemini 4 Hydrogen</h3>
        </div>
        <button onclick="closeModal('hydrogen-ai-modal')" class="px-2.5 py-1 rounded-lg bg-slate-100 font-bold cursor-pointer">✕</button>
      </div>
      <p class="text-slate-600 leading-relaxed">
        Hệ thống được tích hợp chuẩn mô hình <strong>Google Gemini 4 Hydrogen (<code>gemini-4-hydrogen</code>)</strong> miễn phí từ Google AI Studio. Nếu bạn để trống ô dưới, web sẽ <strong>tự động dùng bản AI dự phòng tích hợp sẵn</strong> để mọi học viên vẫn chấm bài Nghe • Nói • Đọc • Viết • Ngữ pháp mượt mà 100%!
      </p>
      <form onsubmit="saveUserGeminiHydrogenKey(event)" class="space-y-3">
        <div>
          <label class="block font-extrabold text-slate-800 mb-1">🔑 Google AI Studio API Key (Tùy chọn — lấy miễn phí tại aistudio.google.com):</label>
          <input id="hydrogen-api-key-inp" type="password" value="${escapeHtml(curKey)}" placeholder="AIzaSy... (Để trống nếu muốn dùng bản AI tích hợp sẵn)" class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] font-mono" />
        </div>
        <div id="hydrogen-test-status" class="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
          Trạng thái hiện tại: <strong>${getActiveAiEngineBadgeText()}</strong>
        </div>
        <div class="flex flex-wrap justify-between gap-2 pt-1">
          <button type="button" onclick="testHydrogenAiConnection()" class="px-4 py-2 rounded-xl bg-sky-100 text-sky-900 font-extrabold cursor-pointer">🧪 Kiểm tra kết nối Hydrogen</button>
          <div class="flex gap-2">
            ${curKey ? `<button type="button" onclick="document.getElementById('hydrogen-api-key-inp').value='';saveUserGeminiHydrogenKey()" class="px-3.5 py-2 rounded-xl bg-rose-100 text-rose-700 font-bold cursor-pointer">Dùng bản dự phòng</button>` : ''}
            <button type="submit" class="px-5 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">✅ Lưu cấu hình AI</button>
          </div>
        </div>
      </form>
    </div>`;
  modal.classList.remove('hidden');
}
