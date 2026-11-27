// =========================================================================
// TIẾNG ANH MỖI NGÀY v13 — KHO 24 TRÒ CHƠI HỌC TIẾNG ANH ĐỒ HỌA HD CANVAS & NEON
// 8 Game Kinh Điển Nâng Cấp Đồ Họa Mới + 16 Trò Chơi Mới Độc Đáo (Tổng = 24 Game)
// Tích hợp 100% với bộ lọc Lộ trình → Chủ đề → Phần (25 từ) / Toàn bộ từ đã học & Bỏ từ đã nhớ
// =========================================================================

const ALL_ARCADE_GAMES_V13 = [
  // 8 REMASTERED CLASSICS
  { id: 'silksong', cat: 'action', badge: 'HD REMASTER', icon: '🕷️', name: 'Hollow Knight: Silksong HD', desc: 'Đồ họa Pharloom đa lớp, hiệu ứng chém tơ lụa phát sáng & giải ấn điền từ', col: '#e11d48', diff: '★★★★☆' },
  { id: 'archery', cat: 'action', badge: 'HD REMASTER', icon: '🎯', name: 'Cung Thủ Hồng Tâm 3D', desc: 'Cung tên vật lý quỹ đạo cong, gió rừng hoàng hôn & nổ hạt Hồng Tâm', col: '#0284c7', diff: '★★★☆☆' },
  { id: 'shadow', cat: 'action', badge: 'HD REMASTER', icon: '🥷', name: 'Võ Đài Shadow Fight Dojo HD', desc: 'Võ đường hoa anh đào rơi, kiếm khí Katana & Bí kỹ Lôi Ảnh hạ Boss', col: '#d97706', diff: '★★★★☆' },
  { id: 'offline', cat: 'reflex', badge: 'HD REMASTER', icon: '📡', name: 'Tam Đấu Offline: Nghe • Điền • Nói', desc: 'Vượt liên hoàn 3 ải Nghe sóng âm, Điền chữ & Thu âm giọng nói thật', col: '#0d9488', diff: '★★★☆☆' },
  { id: 'match', cat: 'puzzle', badge: 'HD REMASTER', icon: '🔗', name: 'Ma Trận Nối Từ Điện Quang', desc: 'Ghép 6 cặp thẻ từ Anh – Việt phát tia năng lượng tính giờ kỷ lục', col: '#059669', diff: '★★☆☆☆' },
  { id: 'listen_choose_vi', cat: 'reflex', badge: 'HD REMASTER', icon: '🎧', name: 'Sóng Âm Phản Xạ (Audio Radar)', desc: 'Phổ nhạc sóng âm trực tiếp + nghe giọng chuẩn/chậm chọn nhanh nghĩa Việt', col: '#2563eb', diff: '★★☆☆☆' },
  { id: 'vi_to_en', cat: 'reflex', badge: 'HD REMASTER', icon: '🇻🇳', name: 'Đấu Trường Việt → Anh Tốc Độ', desc: 'Đồng hồ áp lực đếm ngược, khiên bảo vệ chuỗi thắng & chọn từ chuẩn IPA', col: '#16a34a', diff: '★★☆☆☆' },
  { id: 'typing', cat: 'reflex', badge: 'HD REMASTER', icon: '⌨️', name: 'Bàn Phím Cầu Vồng (Neon WPM)', desc: 'Phím cơ phát sáng từng ký tự, đo tốc độ gõ WPM & pháo hoa cầu vồng', col: '#db2777', diff: '★★☆☆☆' },

  // 16 BRAND NEW GAMES (#9 -> #24)
  { id: 'galaxy_shooter', cat: 'action', badge: 'NEW v13', icon: '🚀', name: 'Phi Thuyền Ngân Hà Bắn Từ', desc: 'Điều khiển chiến hạm không gian bắn tia Plasma nổ tung thiên thạch đúng nghĩa', col: '#7c3aed', diff: '★★★★☆' },
  { id: 'f1_racer', cat: 'action', badge: 'NEW v13', icon: '🏎️', name: 'Đua Xe F1 Nitro Từ Vựng', desc: 'Đường đua tốc độ cao giả lập 3D, trả lời đúng kích hoạt bình Nitro vượt đối thủ', col: '#dc2626', diff: '★★★☆☆' },
  { id: 'deep_fishing', cat: 'action', badge: 'NEW v13', icon: '🎣', name: 'Câu Cá Đại Dương Săn Từ', desc: 'Bấm thả lưỡi câu bắt đúng chú cá nhiệt đới mang từ vựng mục tiêu dưới rạn san hô', col: '#0891b2', diff: '★★☆☆☆' },
  { id: 'wizard_td', cat: 'action', badge: 'NEW v13', icon: '🏰', name: 'Thủ Thành Pháp Sư Chữ', desc: 'Niệm chú cầu lửa phép thuật tiêu diệt quái vật trước khi chạm pha lê thành trì', col: '#9333ea', diff: '★★★★☆' },
  { id: 'bubble_pop', cat: 'action', badge: 'NEW v13', icon: '🫧', name: 'Bắn Bong Bóng Xà Phòng', desc: 'Chạm nổ ngay trên màn hình Canvas các bong bóng ánh kim mang từ đúng', col: '#06b6d4', diff: '★★☆☆☆' },
  { id: 'brick_breaker', cat: 'action', badge: 'NEW v13', icon: '🧱', name: 'Phá Gạch Năng Lượng Từ Vựng', desc: 'Di chuyển thanh đỡ hứng bóng phá vỡ tường gạch Neon và mở rương câu hỏi', col: '#f59e0b', diff: '★★★☆☆' },
  { id: 'dino_runner', cat: 'action', badge: 'NEW v13', icon: '🦖', name: 'Khủng Long Cyber Vượt Rào', desc: 'Nhảy qua xương rồng Neon tốc độ tăng dần & nạp khiên bất tử bằng từ vựng', col: '#10b981', diff: '★★★☆☆' },
  { id: 'word_snake', cat: 'puzzle', badge: 'NEW v13', icon: '🐍', name: 'Rắn Săn Chữ Cái Neon', desc: 'Điều khiển rắn ánh sáng ăn lần lượt từng chữ cái theo đúng thứ tự từ tiếng Anh', col: '#22c55e', diff: '★★★★☆' },
  { id: 'vocab_wordle', cat: 'puzzle', badge: 'NEW v13', icon: '🟩', name: 'Wordle Giải Mã Ô Chữ', desc: 'Đoán từ tiếng Anh trong 6 lượt với ô màu Xanh (đúng vị trí) & Vàng (sai vị trí)', col: '#15803d', diff: '★★★★☆' },
  { id: 'memory_flip', cat: 'puzzle', badge: 'NEW v13', icon: '🃏', name: 'Lật Thẻ Ký Ức Hoàng Gia', desc: 'Ghi nhớ vị trí 12 lá bài mạ vàng để lật khớp cặp Từ tiếng Anh & Nghĩa tiếng Việt', col: '#b45309', diff: '★★★☆☆' },
  { id: 'word_scramble', cat: 'puzzle', badge: 'NEW v13', icon: '🧩', name: 'Bậc Thầy Xếp Chữ (Anagram)', desc: 'Sắp xếp các viên gạch chữ cái bị xáo trộn về đúng từ vựng hoàn chỉnh', col: '#4f46e5', diff: '★★☆☆☆' },
  { id: 'hippo_rescue', cat: 'puzzle', badge: 'NEW v13', icon: '🦛', name: 'Giải Cứu Khinh Khí Cầu Hà Mã', desc: 'Đoán chữ cái A–Z trước khi 6 quả bóng bay nổ để cứu Bé Hà Mã Bò Sữa', col: '#ec4899', diff: '★★★☆☆' },
  { id: 'sentence_tornado', cat: 'puzzle', badge: 'NEW v13', icon: '🌪️', name: 'Lốc Xoáy Sắp Xếp Câu', desc: 'Bấm chọn các mảnh từ bị cuốn bay để ghép lại thành câu tiếng Anh hoàn chỉnh', col: '#0369a1', diff: '★★★☆☆' },
  { id: 'bomb_defuse', cat: 'reflex', badge: 'NEW v13', icon: '💣', name: 'Gỡ Bom Từ Vựng Đếm Ngược', desc: 'Dây cháy chậm đang xẹt lửa — cắt đúng dây đáp án trước khi đồng hồ về 0!', col: '#ef4444', diff: '★★★★☆' },
  { id: 'millionaire', cat: 'puzzle', badge: 'NEW v13', icon: '👑', name: 'Ai Là Triệu Phú Tiếng Anh', desc: 'Leo 15 nấc thang giải thưởng với 3 quyền trợ giúp: 50:50, Khán giả & Tổ tư vấn AI', col: '#1d4ed8', diff: '★★★★☆' },
  { id: 'blitz_tf', cat: 'reflex', badge: 'NEW v13', icon: '⚡', name: 'Đúng Hay Sai 60 Giây (Blitz)', desc: 'Phản xạ cực đại trong 60 giây: bấm ĐÚNG hoặc SAI liên hoàn lập kỷ lục điểm số', col: '#ea580c', diff: '★★☆☆☆' }
];

const ARCADE_ROUTE_IDS = new Set(ALL_ARCADE_GAMES_V13.map(g => g.id));

function getGameDistractors(targetWord, count = 3) {
  const pool = (ALL_CURRICULUM_WORDS && ALL_CURRICULUM_WORDS.length > 10) ? ALL_CURRICULUM_WORDS : getActiveGameWords();
  const out = [];
  const targetLow = String(targetWord.word || '').toLowerCase();
  let tries = 0;
  while (out.length < count && tries < 80) {
    tries++;
    const cand = pool[Math.floor(Math.random() * pool.length)];
    if (cand && String(cand.word || '').toLowerCase() !== targetLow && !out.some(x => x.word === cand.word)) {
      out.push(cand);
    }
  }
  return out;
}

function arcadeTopBarHtml(icon, title, rightStatsHtml) {
  return `
    <div class="travel-card p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2 border-2 border-slate-900/10 bg-white/95">
      <div class="flex items-center gap-2 min-w-0">
        <button onclick="go('games')" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer shrink-0">← Kho 24 Game</button>
        <span class="text-lg shrink-0">${icon}</span>
        <div class="min-w-0">
          <div class="font-black text-xs sm:text-sm text-slate-900 truncate">${escapeHtml(title)}</div>
          <div class="text-[10px] text-teal-700 font-bold truncate">Nguồn từ: ${escapeHtml(getActiveGameTitle())}</div>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2 text-xs font-mono font-extrabold">${rightStatsHtml}</div>
    </div>`;
}

// =========================================================================
// GIAO DIỆN KHO 24 GAME LỘNG LẪY (HUB)
// =========================================================================
function renderGamesHubV13(v) {
  syncGmSource();
  const curCat = state.gmHubCat || 'all';
  const searchQ = (state.gmHubSearch || '').trim().toLowerCase();
  const shownGames = ALL_ARCADE_GAMES_V13.filter(g =>
    (curCat === 'all' || g.cat === curCat) &&
    (!searchQ || (g.name + ' ' + g.desc).toLowerCase().includes(searchQ))
  );

  const cefrMap = { IELTS: ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'], TOEIC: ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'], THPT: ['ALL', 'A1', 'A2', 'B1', 'B2'], GENERAL: ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] };
  const cefrs = cefrMap[state.gmTrack] || ['ALL'];
  const topicList = ATLAS_TOPICS.filter(t => t.track === state.gmTrack && (state.gmCefr === 'ALL' || t.cefr === state.gmCefr));
  const curTopic = ATLAS_TOPICS.find(t => t.slug === state.gmTopicSlug) || topicList[0];
  const rawWords = getRawSourceWords(state.gameSourceKey);
  const activeWords = getActiveGameWords();
  const skippedCnt = rawWords.filter(w => state.excludedWords[String(w.word || '').toLowerCase()]).length;

  v.innerHTML = `
    <div class="space-y-5">
      <!-- Neon Arcade Hero Banner -->
      <div class="rounded-3xl p-5 sm:p-6 text-white shadow-2xl relative overflow-hidden" style="background:linear-gradient(125deg,#090d16 0%,#1e1b4b 48%,#0f766e 100%);">
        <div class="relative z-10 flex flex-wrap justify-between items-center gap-4">
          <div class="space-y-1.5 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[11px] font-extrabold">
              <span>🕹️ TRUNG TÂM 24 GAME HỌC TỪ VỰNG HD</span>
              <span class="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">8 REMASTER + 16 GAME MỚI</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black tracking-tight">Đấu Trường Từ Vựng Đa Vũ Trụ (24 Trò Chơi)</h1>
            <p class="text-xs sm:text-sm text-teal-100/90">Chọn chính xác Lộ trình → Chủ đề → Từng phần (25 từ), Toàn bộ từ đã học hoặc Sổ từ cá nhân • Có quyền loại bỏ từ đã thuộc để tập trung từ khó!</p>
          </div>
          <div class="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-xs space-y-1">
            <div class="text-teal-200 font-bold">ĐANG NẠP VÀO 24 GAME:</div>
            <div class="font-extrabold text-sm text-amber-300">${escapeHtml(getActiveGameTitle())}</div>
            <div class="font-mono text-[11px] text-white/90">Từ đang chơi: <strong>${activeWords.length}</strong> / ${rawWords.length} từ • Đã bỏ nhớ: <strong>${skippedCnt}</strong></div>
          </div>
        </div>
      </div>

      <!-- Bộ chọn Nguồn Từ Vựng + Bỏ Từ Đã Nhớ (Giữ nguyên 100% tính năng gốc) -->
      <div class="travel-card p-4 sm:p-5 space-y-3.5 border-l-4 border-teal-600">
        <div class="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-[var(--border)]">
          <div class="flex flex-wrap gap-2">
            <button onclick="state.gmMode='roadmap';syncGmSource();render()" class="px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${state.gmMode==='roadmap'?'bg-[var(--primary)] text-white shadow':'bg-[var(--content)] border border-[var(--border)]'}">🎯 Chọn Lộ trình → Chủ đề → Từng phần (25 từ)</button>
            <button onclick="state.gmMode='learned';state.gameSourceKey='learned';render()" class="px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${state.gmMode==='learned'&&state.gameSourceKey==='learned'?'bg-[var(--primary)] text-white shadow':'bg-[var(--content)] border border-[var(--border)]'}">✅ Toàn bộ từ đã học (${getLearnedWordsList().length} từ)</button>
            <button onclick="state.gmMode='learned';state.gameSourceKey='myvocab';render()" class="px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${state.gmMode==='learned'&&state.gameSourceKey==='myvocab'?'bg-amber-500 text-slate-950 shadow':'bg-[var(--content)] border border-[var(--border)]'}">⭐ Sổ từ cá nhân (${getPersonalWordsList().length} từ)</button>
          </div>
        </div>

        ${state.gmMode === 'roadmap' ? `
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-xs font-bold text-[var(--muted-foreground)]">Lọc Level CEFR:</span>
            ${cefrs.map(lv => `<button onclick="state.gmCefr='${lv}';syncGmSource();render()" class="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border ${state.gmCefr===lv?'bg-slate-900 text-white border-transparent':'bg-[var(--content)] border-[var(--border)]'}">${lv==='ALL'?'Tất cả':lv}</button>`).join('')}
          </div>
          <div class="grid md:grid-cols-3 gap-2.5">
            <div>
              <label class="block text-xs font-bold mb-1">1️⃣ Bước 1: Chọn Lộ Trình</label>
              <select onchange="state.gmTrack=this.value;state.gmCefr='ALL';syncGmSource();render()" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-semibold">
                <option value="IELTS" ${state.gmTrack==='IELTS'?'selected':''}>🌍 IELTS A1–C2 (108 Chủ đề)</option>
                <option value="TOEIC" ${state.gmTrack==='TOEIC'?'selected':''}>💼 TOEIC A1–C1 (55 Chủ đề)</option>
                <option value="THPT" ${state.gmTrack==='THPT'?'selected':''}>🎓 THPT A1–B2 (84 Chủ đề)</option>
                <option value="GENERAL" ${state.gmTrack==='GENERAL'?'selected':''}>📚 Đa lĩnh vực (36 Chủ đề)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold mb-1">2️⃣ Bước 2: Chọn Chủ Đề (${topicList.length} chủ đề)</label>
              <select onchange="state.gmTopicSlug=this.value;state.gmPart=1;syncGmSource();render()" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-semibold">
                ${topicList.map(t => `<option value="${t.slug}" ${t.slug===state.gmTopicSlug?'selected':''}>${t.name} (${t.parts} phần)</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold mb-1">3️⃣ Bước 3: Chọn Phần Của Chủ Đề (25 từ/phần)</label>
              <select onchange="state.gmPart=Number(this.value)||1;syncGmSource();render()" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-mono font-semibold">
                ${Array.from({ length: Math.min(curTopic?.parts || 1, 60) }, (_, i) => {
                  const p = i + 1;
                  return `<option value="${p}" ${state.gmPart===p?'selected':''}>Phần ${p} (25 từ vựng)</option>`;
                }).join('')}
              </select>
            </div>
          </div>
        ` : ''}

        <div class="pt-2.5 border-t border-[var(--border)] flex flex-wrap justify-between items-center gap-2 text-xs">
          <label class="flex items-center gap-2 font-bold cursor-pointer">
            <input type="checkbox" ${state.excludeMemorized?'checked':''} onchange="state.excludeMemorized=this.checked;render()" />
            <span>✓ Bỏ qua các từ đã nhớ (Đang nạp <strong>${activeWords.length}/${rawWords.length}</strong> từ • Đã bỏ ${skippedCnt} từ)</span>
          </label>
          <button onclick="state.gmChecklistOpen=!state.gmChecklistOpen;render()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] hover:bg-teal-50 border border-[var(--border)] font-bold cursor-pointer">
            ${state.gmChecklistOpen ? '▲ Thu gọn danh sách từ' : '📋 Bấm chọn từ Đã nhớ để bỏ khỏi game'}
          </button>
        </div>

        ${state.gmChecklistOpen ? `
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-2 rounded-xl bg-[var(--content)] border border-[var(--border)]">
            ${rawWords.map(w => {
              const ex = Boolean(state.excludedWords[w.word.toLowerCase()]);
              return `
                <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs ${ex?'opacity-60 line-through':''}">
                  <div class="truncate"><strong>${escapeHtml(w.word)}</strong> — ${escapeHtml(w.meaning)}</div>
                  <button onclick="toggleExcludeWord('${w.word.replace(/'/g,"\\'")}')" class="px-2 py-0.5 rounded bg-[var(--content)] font-bold shrink-0 cursor-pointer">${ex?'↩ Học lại':'✓ Đã nhớ'}</button>
                </div>`;
            }).join('')}
          </div>` : ''}
      </div>

      <!-- Bộ lọc Thể loại Game & Tìm kiếm -->
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex flex-wrap gap-1.5">
          ${[
            ['all', `🔥 Tất cả (${ALL_ARCADE_GAMES_V13.length} Game)`],
            ['action', '⚔️ Hành Động & Canvas 60FPS (10)'],
            ['puzzle', '🧠 Giải Đố & Trí Tuệ (8)'],
            ['reflex', '⚡ Phản Xạ Siêu Tốc (6)']
          ].map(([k, lbl]) => `
            <button onclick="state.gmHubCat='${k}';render()" class="px-3.5 py-2 rounded-full font-extrabold cursor-pointer border ${curCat===k?'bg-slate-900 text-white border-transparent shadow':'bg-white border-[var(--border)] hover:border-teal-500'}">${lbl}</button>`).join('')}
        </div>
        <input type="text" value="${escapeHtml(state.gmHubSearch || '')}" oninput="state.gmHubSearch=this.value;render()" placeholder="🔍 Tìm tên trò chơi..." class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] w-60" />
      </div>

      <!-- Lưới 24 Thẻ Game Đồ Họa Mới -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        ${shownGames.map((m, idx) => `
          <div onclick="go('${m.id}')" class="hover-box travel-card overflow-hidden cursor-pointer flex flex-col justify-between group" style="--tile-c:${m.col};">
            <div>
              <div class="p-4 text-white flex items-start justify-between gap-2 relative overflow-hidden" style="background:linear-gradient(135deg,${m.col},#0f172a);">
                <span class="text-3xl transform group-hover:scale-115 transition duration-200">${m.icon}</span>
                <div class="text-right">
                  <span class="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${m.badge.includes('NEW')?'bg-amber-300 text-slate-950':'bg-white/20 text-white'}">${m.badge}</span>
                  <div class="text-[10px] font-mono opacity-85 mt-1">${m.diff}</div>
                </div>
              </div>
              <div class="p-4 space-y-1.5">
                <div class="font-extrabold text-sm text-slate-900 group-hover:text-teal-700 transition">${idx + 1}. ${escapeHtml(m.name)}</div>
                <p class="text-xs text-slate-500 leading-relaxed">${escapeHtml(m.desc)}</p>
              </div>
            </div>
            <div class="px-4 pb-3.5 pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-extrabold" style="color:${m.col};">
              <span>🎮 Vào chơi ngay</span>
              <span class="group-hover:translate-x-1 transition">→</span>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

// =========================================================================
// 1. HOLLOW KNIGHT: SILKSONG HD REMASTER
// =========================================================================
function renderSilksongHD(v) {
  const words = getActiveGameWords();
  const ss = { idx: 0, score: 0, combo: 0, masks: 5, silk: 0, dash: 0, shake: 0, bossHp: 100, motes: Array.from({ length: 28 }, () => ({ x: Math.random() * 780, y: Math.random() * 220, s: 1 + Math.random() * 2.5, v: 0.3 + Math.random() * 0.8 })) };
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🕷️', 'Hollow Knight: Silksong HD Remaster', `<span id="ss-m">🤍🤍🤍🤍🤍</span><span id="ss-c" class="text-orange-600">🔥 x0</span><span id="ss-p" class="text-rose-600">0 PTS</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-rose-500/50 shadow-2xl relative" style="background:#09050f;">
        <div class="absolute top-3 left-4 right-4 flex justify-between items-center text-xs text-white font-extrabold z-10">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-600/80 border border-rose-300/40">PHARLOOM CITADEL</span>
            <span id="ss-boss-lbl" class="font-mono text-rose-200">BOSS WEAVER: 100%</span>
          </div>
          <button id="ss-storm" disabled class="px-3 py-1 rounded-xl font-black cursor-pointer disabled:opacity-40 shadow-lg" style="background:linear-gradient(135deg,#e11d48,#f59e0b);color:#fff;">🕸️ Tơ Lụa 0%</button>
        </div>
        <canvas id="ss-cv" width="800" height="230" class="w-full h-auto block"></canvas>
      </div>
      <div id="ss-box" class="travel-card p-5 text-center space-y-3"></div>
    </div>`;

  const cv = document.getElementById('ss-cv'), ctx = cv.getContext('2d');
  function loop(now) {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    const t = now * 0.001;
    if (ss.dash > 0) ss.dash = Math.max(0, ss.dash - 0.042);
    if (ss.shake > 0) ss.shake = Math.max(0, ss.shake - 0.7);
    ctx.save();
    if (ss.shake > 0) ctx.translate((Math.random() - 0.5) * ss.shake, (Math.random() - 0.5) * ss.shake);

    // Deep gothic cavern gradient
    const bg = ctx.createLinearGradient(0, 0, 0, 230);
    bg.addColorStop(0, '#070410'); bg.addColorStop(0.55, '#1e0924'); bg.addColorStop(1, '#4c0519');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 800, 230);

    // Background gothic pillars & vertical silk threads
    ctx.strokeStyle = 'rgba(253,164,175,0.16)'; ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const px = 40 + i * 68;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px + Math.sin(t + i) * 3, 190); ctx.stroke();
    }

    // Floating luminescent silk motes
    ss.motes.forEach(m => {
      m.y -= m.v; if (m.y < 0) { m.y = 225; m.x = Math.random() * 800; }
      ctx.fillStyle = 'rgba(254,205,211,0.75)';
      ctx.beginPath(); ctx.arc(m.x + Math.sin(t * 2 + m.y * 0.05) * 6, m.y, m.s, 0, 6.28); ctx.fill();
    });

    // Citadel floor + glowing crimson trim
    ctx.fillStyle = '#090612'; ctx.fillRect(0, 188, 800, 42);
    const fl = ctx.createLinearGradient(0, 186, 800, 186);
    fl.addColorStop(0, '#f43f5e'); fl.addColorStop(0.5, '#fde047'); fl.addColorStop(1, '#f43f5e');
    ctx.fillStyle = fl; ctx.fillRect(0, 186, 800, 2.5);

    // Glowing Weaver Rune Seal & Boss
    ctx.save();
    ctx.translate(615, 128 + Math.sin(t * 2.8) * 6);
    ctx.strokeStyle = 'rgba(251,113,133,0.7)'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.arc(0, 0, 42 + Math.sin(t * 4) * 3, 0, 6.28); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 30, t, t + 4.5); ctx.stroke();
    // Boss body & glowing eyes
    ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); ctx.ellipse(0, 6, 24, 34, 0, 0, 6.28); ctx.fill();
    ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(0, -16, 15, 0, 6.28); ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.arc(-5, -17, 3, 0, 6.28); ctx.arc(5, -17, 3, 0, 6.28); ctx.fill();
    ctx.restore();

    // Boss HP bar on canvas
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(555, 62, 120, 6);
    ctx.fillStyle = '#fb7185'; ctx.fillRect(555, 62, 1.2 * ss.bossHp, 6);

    // Hornet HD character + Silk Dash arc
    const hx = 155 + (ss.dash > 0 ? Math.sin(ss.dash * Math.PI) * 410 : 0);
    const hy = 186 + Math.sin(t * 5) * 2;
    if (ss.dash > 0) {
      const sg = ctx.createLinearGradient(155, hy - 32, hx, hy - 32);
      sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(1, '#fef08a');
      ctx.strokeStyle = sg; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(155, hy - 30); ctx.lineTo(hx + 30, hy - 34); ctx.stroke();
    }
    // Hornet Crimson Cloak
    ctx.fillStyle = '#e11d48';
    ctx.beginPath(); ctx.moveTo(hx, hy - 44); ctx.lineTo(hx - 24 - Math.sin(t * 6) * 4, hy - 3); ctx.lineTo(hx + 20, hy - 3); ctx.closePath(); ctx.fill();
    // Hornet White Curved Horns Mask
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(hx - 11, hy - 43); ctx.quadraticCurveTo(hx - 16, hy - 76, hx - 5, hy - 78);
    ctx.lineTo(hx, hy - 54); ctx.lineTo(hx + 5, hy - 78);
    ctx.quadraticCurveTo(hx + 16, hy - 76, hx + 11, hy - 43); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.ellipse(hx + 3, hy - 52, 2.5, 4.5, 0.2, 0, 6.28); ctx.fill();
    // Gleaming Needle Weapon
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(hx - 14, hy - 28); ctx.lineTo(hx + 54 + ss.dash * 22, hy - 32); ctx.stroke();
    ctx.restore();
  }
  state.rafs.push(requestAnimationFrame(loop));

  function drawQ() {
    const w = words[ss.idx % words.length];
    const blank = (w.ex || `Practice "${w.word}" every day.`).replace(new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '________');
    document.getElementById('ss-box').innerHTML = `
      <div class="text-xs font-extrabold text-rose-600">📜 ẤN KÝ CỔ NGỮ #${ss.idx + 1} • ${w.word.length} chữ cái • ${escapeHtml(w.ipa || '')}</div>
      <div class="font-bold text-sm sm:text-base text-slate-900">"${escapeHtml(blank)}"</div>
      <div class="text-xs text-slate-600">Nghĩa tiếng Việt: <strong class="text-teal-700 text-sm">${escapeHtml(w.meaning)}</strong> • Chữ cái đầu: <code class="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">${escapeHtml(w.word[0])}</code></div>
      <div id="ss-fx" class="min-h-11 rounded-2xl bg-[var(--content)] border border-[var(--border)] flex items-center justify-center font-mono text-lg font-black"></div>
      <form id="ss-f" class="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
        <input id="ss-in" autocomplete="off" autofocus placeholder="Gõ từ tiếng Anh để Hornet phóng kim phá ấn..." class="flex-1 min-w-48 px-4 py-2.5 rounded-xl bg-white border-2 border-rose-300 focus:border-rose-600 outline-none font-mono text-sm text-center font-bold" />
        <button type="button" onclick="speak('${w.word.replace(/'/g, "\\'")}')" class="px-3 py-2.5 rounded-xl bg-slate-100 font-bold text-xs cursor-pointer">🔊 Gợi ý âm</button>
        <button type="submit" class="px-5 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer shadow-lg" style="background:linear-gradient(135deg,#be123c,#e11d48);">⚔️ Phóng Kim</button>
      </form>`;
    const inp = document.getElementById('ss-in');
    inp.oninput = () => { burstSparks(inp, 6); document.getElementById('ss-fx').innerHTML = inp.value.split('').map((c, i) => `<span class="fx-ch" style="color:${COLORS[i % COLORS.length]}">${escapeHtml(c)}</span>`).join(''); };
    const solve = (ok, storm = false) => {
      if (ok) {
        ss.combo++; ss.dash = 1; ss.shake = 12;
        ss.score += storm ? 60 : 35 * ss.combo;
        ss.silk = storm ? 0 : Math.min(100, ss.silk + 35);
        ss.bossHp = Math.max(0, ss.bossHp - (storm ? 45 : 25));
        if (ss.bossHp <= 0) { ss.bossHp = 100; ss.score += 120; notify('🏆 HẠ GỤC BOSS WEAVER! Thưởng nóng +120 PTS!'); }
        addUserGamePts(25);
        if (ss.combo >= 2 || storm) triggerStreakFx(Math.max(2, ss.combo), storm ? '⚡ BÃO TƠ LỤA XUYÊN PHÁ!' : `Hornet phá ấn "${w.word}"!`);
        else notify(`⚔️ Chính xác: "${w.word}"!`);
      } else {
        ss.combo = 0; ss.masks = Math.max(1, ss.masks - 1); ss.shake = 14;
        notify(`✕ Ấn ký đúng là "${w.word}" (${w.meaning})!`);
      }
      speak(w.word); ss.idx++;
      document.getElementById('ss-m').textContent = '🤍'.repeat(ss.masks) + '🖤'.repeat(5 - ss.masks);
      document.getElementById('ss-c').textContent = `🔥 x${ss.combo}`;
      document.getElementById('ss-p').textContent = `${ss.score} PTS`;
      const bl = document.getElementById('ss-boss-lbl'); if (bl) bl.textContent = `BOSS WEAVER: ${ss.bossHp}%`;
      const sb = document.getElementById('ss-storm'); sb.disabled = ss.silk < 100; sb.textContent = ss.silk >= 100 ? '⚡ KÍCH HOẠT BÃO TƠ!' : `🕸️ Tơ Lụa ${ss.silk}%`;
      drawQ();
    };
    document.getElementById('ss-storm').onclick = () => { if (ss.silk >= 100) solve(true, true); };
    document.getElementById('ss-f').onsubmit = (e) => { e.preventDefault(); solve(inp.value.trim().toLowerCase() === w.word.toLowerCase()); };
  }
  drawQ();
}

// =========================================================================
// 2. CUNG THỦ HỒNG TÂM 3D (ARCHERY PRO REMASTER)
// =========================================================================
function renderArcheryHD(v) {
  const words = getActiveGameWords();
  const ar = { idx: 0, score: 0, combo: 0, bulls: 0, ty: 110, arrow: null, shake: 0, particles: [] };
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🎯', 'Cung Thủ Hồng Tâm 3D (Archery Pro)', `<span>🎯 Hồng tâm: <strong id="ar-b" class="text-amber-600">0</strong></span><span id="ar-c" class="text-orange-600">🔥 x0</span><span id="ar-p" class="text-sky-700">0 PTS</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-sky-400/50 shadow-2xl"><canvas id="ar-cv" width="800" height="225" class="w-full h-auto block"></canvas></div>
      <div id="ar-box" class="travel-card p-5 text-center space-y-3"></div>
    </div>`;
  const cv = document.getElementById('ar-cv'), ctx = cv.getContext('2d');
  function loop(now) {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    const t = now * 0.001;
    ar.ty = 110 + Math.sin(t * 2.3) * 52;
    if (ar.shake > 0) ar.shake = Math.max(0, ar.shake - 0.7);
    ctx.save();
    if (ar.shake > 0) ctx.translate((Math.random() - 0.5) * ar.shake, (Math.random() - 0.5) * ar.shake);

    // Golden-hour sunset sky & mountains
    const sky = ctx.createLinearGradient(0, 0, 0, 225);
    sky.addColorStop(0, '#0f172a'); sky.addColorStop(0.5, '#0369a1'); sky.addColorStop(1, '#fb923c');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, 800, 225);
    ctx.fillStyle = 'rgba(253,224,71,0.85)'; ctx.beginPath(); ctx.arc(430, 68, 28, 0, 6.28); ctx.fill();
    // Distant mountains
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.moveTo(0, 182); ctx.lineTo(150, 110); ctx.lineTo(310, 165); ctx.lineTo(490, 98); ctx.lineTo(680, 160); ctx.lineTo(800, 120); ctx.lineTo(800, 185); ctx.closePath(); ctx.fill();
    // Meadow grass
    ctx.fillStyle = '#065f46'; ctx.fillRect(0, 182, 800, 43);

    // Composite Recurve Bow + Bowstring
    ctx.strokeStyle = '#fde68a'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(92, 120, 42, -1.22, 1.22); ctx.stroke();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(106, 81); ctx.lineTo(ar.arrow ? 106 : 82, 120); ctx.lineTo(106, 159); ctx.stroke();

    // 3D Concentric Target
    const rings = [{ r: 42, c: '#f8fafc' }, { r: 33, c: '#0f172a' }, { r: 24, c: '#0284c7' }, { r: 15, c: '#e11d48' }, { r: 7.5, c: '#facc15' }];
    rings.forEach(rg => { ctx.fillStyle = rg.c; ctx.beginPath(); ctx.arc(685, ar.ty, rg.r, 0, 6.28); ctx.fill(); });

    if (ar.arrow) {
      ar.arrow.p += 0.11;
      const p = Math.min(1, ar.arrow.p);
      const ax = 92 + (685 - 92) * p;
      const ay = 120 + (ar.arrow.ty - 120) * p - Math.sin(p * Math.PI) * 34;
      ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(ax - 34, ay + 3); ctx.lineTo(ax + 8, ay); ctx.stroke();
      if (ar.arrow.p >= 1) {
        ar.shake = 11;
        for (let k = 0; k < 18; k++) {
          const a = Math.random() * 6.28, sp = 2 + Math.random() * 5;
          ar.particles.push({ x: 685, y: ar.arrow.ty, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 1 });
        }
        ar.arrow = null;
      }
    }
    for (let i = ar.particles.length - 1; i >= 0; i--) {
      const pt = ar.particles[i]; pt.x += pt.vx; pt.y += pt.vy; pt.l -= 0.04;
      if (pt.l <= 0) { ar.particles.splice(i, 1); continue; }
      ctx.globalAlpha = pt.l; ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(pt.x, pt.y, 3.2, 0, 6.28); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  state.rafs.push(requestAnimationFrame(loop));

  function drawQ() {
    const w = words[ar.idx % words.length];
    document.getElementById('ar-box').innerHTML = `
      <div class="text-xl font-black text-sky-800">${escapeHtml(w.meaning)}</div>
      <div class="text-xs font-mono text-slate-500">${escapeHtml(w.ipa || '')} • ${w.word.length} chữ cái • Chữ đầu: <strong class="text-sky-700">${escapeHtml(w.word[0])}</strong></div>
      <div id="ar-fx" class="min-h-11 rounded-2xl bg-[var(--content)] border border-[var(--border)] flex items-center justify-center font-mono text-lg font-black"></div>
      <form id="ar-f" class="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
        <input id="ar-in" autocomplete="off" autofocus placeholder="Gõ từ tiếng Anh để giương cung bắn Hồng Tâm..." class="flex-1 min-w-48 px-4 py-2.5 rounded-xl bg-white border-2 border-sky-300 focus:border-sky-600 outline-none font-mono text-sm text-center font-bold" />
        <button type="submit" class="px-5 py-2.5 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer shadow">🏹 Bắn Tên</button>
      </form>`;
    const inp = document.getElementById('ar-in');
    inp.oninput = () => { burstSparks(inp, 5); document.getElementById('ar-fx').innerHTML = inp.value.split('').map((c, i) => `<span class="fx-ch" style="color:${COLORS[i % COLORS.length]}">${escapeHtml(c)}</span>`).join(''); };
    document.getElementById('ar-f').onsubmit = (e) => {
      e.preventDefault();
      const ok = inp.value.trim().toLowerCase() === w.word.toLowerCase();
      if (ok) {
        ar.combo++; const bull = Math.abs(ar.ty - 110) < 28; if (bull) ar.bulls++;
        const pts = (bull ? 100 : 65) * ar.combo; ar.score += pts; addUserGamePts(20);
        ar.arrow = { p: 0, ty: ar.ty };
        if (bull || ar.combo >= 2) triggerStreakFx(Math.max(2, ar.combo), bull ? `🎯 XUYÊN HỒNG TÂM +${pts} PTS!` : `✓ Trúng đích +${pts} PTS!`);
        else notify(`🎯 Trúng bia "${w.word}" +${pts} PTS!`);
      } else {
        ar.combo = 0; ar.arrow = { p: 0, ty: 28 };
        notify(`✕ Trượt mục tiêu! Từ đúng là "${w.word}"`);
      }
      speak(w.word); ar.idx++;
      document.getElementById('ar-b').textContent = ar.bulls;
      document.getElementById('ar-c').textContent = `🔥 x${ar.combo}`;
      document.getElementById('ar-p').textContent = `${ar.score} PTS`;
      drawQ();
    };
  }
  drawQ();
}

// =========================================================================
// 3. SHADOW FIGHT DOJO HD REMASTER
// =========================================================================
function renderShadowFightHD(v) {
  const words = getActiveGameWords();
  const sf = { pHp: 100, eHp: 100, energy: 0, combo: 0, idx: 0, pAtk: 0, eAtk: 0, petals: Array.from({ length: 22 }, () => ({ x: Math.random() * 800, y: Math.random() * 220, vx: -0.7 - Math.random(), vy: 0.5 + Math.random() * 0.7 })) };
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🥷', 'Võ Đài Shadow Fight Dojo HD', `<span id="sf-combo" class="text-orange-600">🔥 Combo x0</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl" style="background:#1c0a05;">
        <div class="grid grid-cols-2 gap-4 p-3.5 text-xs text-white font-extrabold bg-black/45">
          <div>
            <div class="flex justify-between mb-1"><span>🥷 LÃNG KHÁCH</span><span id="sf-php-txt" class="font-mono">100/100</span></div>
            <div class="h-3 rounded-full bg-white/15 overflow-hidden"><div id="sf-php" class="h-full transition-all" style="width:100%;background:linear-gradient(90deg,#10b981,#34d399);"></div></div>
            <div class="h-1.5 mt-1.5 rounded-full bg-white/15 overflow-hidden"><div id="sf-eng" class="h-full transition-all" style="width:0%;background:#facc15;"></div></div>
          </div>
          <div>
            <div class="flex justify-between mb-1"><span id="sf-ehp-txt" class="font-mono">100/100</span><span>👹 TƯỚNG QUÂN LYNX</span></div>
            <div class="h-3 rounded-full bg-white/15 overflow-hidden"><div id="sf-ehp" class="h-full ml-auto transition-all" style="width:100%;background:linear-gradient(90deg,#f43f5e,#dc2626);"></div></div>
            <div class="text-right mt-1"><button id="sf-fury-btn" disabled class="px-2.5 py-0.5 rounded-lg text-[11px] font-black cursor-pointer disabled:opacity-40 bg-amber-400 text-slate-950">⚡ Lôi Ảnh 0%</button></div>
          </div>
        </div>
        <canvas id="sf-canvas" width="800" height="220" class="w-full h-auto block"></canvas>
      </div>
      <div class="travel-card p-5 space-y-3">
        <div class="flex items-center justify-between"><strong id="sf-word" class="text-xl font-black text-slate-900"></strong><button id="sf-speak" class="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-extrabold cursor-pointer">🔊 Phát âm</button></div>
        <div id="sf-choices" class="grid sm:grid-cols-2 gap-2.5"></div>
      </div>
    </div>`;
  const cv = document.getElementById('sf-canvas'), ctx = cv.getContext('2d');
  function drawSamurai(x, y, dir, atk, accent) {
    ctx.save();
    const lunge = atk > 0 ? dir * 95 * Math.sin(atk * Math.PI) : 0;
    ctx.translate(x + lunge, y);
    ctx.scale(dir, 1);
    // Shadow body + conical samurai hat
    ctx.fillStyle = '#09090b';
    ctx.beginPath(); ctx.arc(0, -60, 12, 0, 6.28); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-22, -64); ctx.lineTo(0, -80); ctx.lineTo(22, -64); ctx.closePath(); ctx.fill();
    ctx.fillRect(-10, -48, 20, 32);
    ctx.fillRect(-12, -16, 8, 16); ctx.fillRect(4, -16, 8, 16);
    // Glowing headband & katana arc
    ctx.strokeStyle = accent; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-10, -62); ctx.lineTo(-28, -56); ctx.stroke();
    ctx.strokeStyle = atk > 0 ? '#fef08a' : '#e2e8f0'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(8, -38); ctx.lineTo(52 + atk * 26, -58 + atk * 18); ctx.stroke();
    if (atk > 0.2) {
      ctx.strokeStyle = accent; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.arc(28, -38, 42, -0.9, 0.8); ctx.stroke();
    }
    ctx.restore();
  }
  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    if (sf.pAtk > 0) sf.pAtk = Math.max(0, sf.pAtk - 0.048);
    if (sf.eAtk > 0) sf.eAtk = Math.max(0, sf.eAtk - 0.048);
    const g = ctx.createLinearGradient(0, 0, 0, 220);
    g.addColorStop(0, '#451a03'); g.addColorStop(0.6, '#c2410c'); g.addColorStop(1, '#fb923c');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 800, 220);
    // Glowing Crimson Sun & Shoji grid
    ctx.fillStyle = 'rgba(254,240,138,0.85)'; ctx.beginPath(); ctx.arc(400, 115, 58, 0, 6.28); ctx.fill();
    ctx.strokeStyle = 'rgba(28,25,23,0.28)'; ctx.lineWidth = 3;
    for (let x = 100; x < 800; x += 100) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 184); ctx.stroke(); }
    // Sakura petals
    ctx.fillStyle = '#fecdd3';
    sf.petals.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.y > 184) { p.x = 800; p.y = Math.random() * 120; }
      ctx.beginPath(); ctx.ellipse(p.x, p.y, 4, 2.2, 0.5, 0, 6.28); ctx.fill();
    });
    ctx.fillStyle = '#0c0a09'; ctx.fillRect(0, 184, 800, 36);
    drawSamurai(230, 184, 1, sf.pAtk, '#38bdf8');
    drawSamurai(570, 184, -1, sf.eAtk, '#f43f5e');
  }
  state.rafs.push(requestAnimationFrame(loop));

  function nextT() {
    const w = words[sf.idx % words.length]; sf.idx++;
    const opts = [w, ...getGameDistractors(w, 3)].sort(() => Math.random() - 0.5);
    document.getElementById('sf-word').textContent = `${w.word} ${w.ipa || ''}`;
    document.getElementById('sf-speak').onclick = () => speak(w.word);
    const box = document.getElementById('sf-choices');
    box.innerHTML = opts.map((o, i) => `<button data-ok="${o.word === w.word ? '1' : '0'}" class="sf-o text-left p-3.5 rounded-2xl bg-[var(--content)] border-2 border-[var(--border)] hover:border-amber-500 text-xs font-extrabold cursor-pointer transition">${String.fromCharCode(65 + i)}. ${escapeHtml(o.meaning)}</button>`).join('');
    box.querySelectorAll('.sf-o').forEach(b => b.onclick = () => {
      if (b.dataset.ok === '1') {
        sf.combo++; sf.pAtk = 1; sf.eHp = Math.max(0, sf.eHp - 25); sf.energy = Math.min(100, sf.energy + 35);
        addUserGamePts(20); speak(w.word);
        if (sf.combo >= 2) triggerStreakFx(sf.combo, 'Trảm Kiếm Liên Hoàn!');
      } else {
        sf.combo = 0; sf.eAtk = 1; sf.pHp = Math.max(10, sf.pHp - 18);
        notify(`✕ Đáp án đúng của "${w.word}" là: ${w.meaning}`);
      }
      if (sf.eHp <= 0) { notify('🏆 HẠ GỤC TƯỚNG QUÂN LYNX! Sang hiệp mới (+50 Xu)!'); sf.eHp = 100; }
      document.getElementById('sf-php').style.width = sf.pHp + '%';
      document.getElementById('sf-ehp').style.width = sf.eHp + '%';
      document.getElementById('sf-php-txt').textContent = sf.pHp + '/100';
      document.getElementById('sf-ehp-txt').textContent = sf.eHp + '/100';
      document.getElementById('sf-eng').style.width = sf.energy + '%';
      document.getElementById('sf-combo').textContent = `🔥 Combo x${sf.combo}`;
      const fb = document.getElementById('sf-fury-btn'); fb.disabled = sf.energy < 100; fb.textContent = sf.energy >= 100 ? '⚡ LÔI ẢNH (-50 HP)!' : `⚡ Lôi Ảnh ${sf.energy}%`;
      nextT();
    });
  }
  document.getElementById('sf-fury-btn').onclick = () => {
    sf.energy = 0; sf.pAtk = 1; sf.eHp = Math.max(0, sf.eHp - 50);
    triggerStreakFx(5, '⚡ BÍ KỸ LÔI ẢNH BÓNG TỐI!');
    if (sf.eHp <= 0) sf.eHp = 100;
    document.getElementById('sf-ehp').style.width = sf.eHp + '%';
    document.getElementById('sf-eng').style.width = '0%';
    document.getElementById('sf-fury-btn').disabled = true;
  };
  nextT();
}

// =========================================================================
// 9. PHI THUYỀN NGÂN HÀ BẮN TỪ (GALAXY WORD SHOOTER — CANVAS 60FPS)
// =========================================================================
function renderGalaxyShooter(v) {
  const words = getActiveGameWords();
  const gs = { score: 0, combo: 0, hp: 3, target: words[0], meteors: [], lasers: [], stars: Array.from({ length: 45 }, () => ({ x: Math.random() * 800, y: Math.random() * 280, s: 1 + Math.random() * 2 })), shipX: 400 };

  function spawnWave() {
    gs.target = words[Math.floor(Math.random() * words.length)];
    const opts = [gs.target, ...getGameDistractors(gs.target, 3)].sort(() => Math.random() - 0.5);
    gs.meteors = opts.map((w, i) => ({
      w,
      x: 110 + i * 190,
      y: 38 + (i % 2) * 18,
      vy: 0.35 + Math.min(0.45, gs.score * 0.0005),
      r: 34,
      hit: false
    }));
    const tgtEl = document.getElementById('gx-target-vi');
    if (tgtEl) tgtEl.textContent = `🎯 Bắn thiên thạch mang nghĩa: "${gs.target.meaning}"`;
  }

  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🚀', 'Phi Thuyền Ngân Hà Bắn Từ (Galaxy Shooter)', `<span id="gx-hp">❤️❤️❤️</span><span id="gx-cb" class="text-amber-500">🔥 x0</span><span id="gx-sc" class="text-purple-700">0 PTS</span>`)}
      <div class="travel-card p-3 bg-indigo-950 text-white text-center font-extrabold text-sm border-2 border-purple-400" id="gx-target-vi"></div>
      <div class="rounded-3xl overflow-hidden border-2 border-purple-500 shadow-2xl bg-slate-950">
        <canvas id="gx-cv" width="800" height="290" class="w-full h-auto block cursor-crosshair"></canvas>
      </div>
      <div id="gx-btns" class="grid grid-cols-2 sm:grid-cols-4 gap-2"></div>
    </div>`;

  function fireAtMeteor(m) {
    if (!m || m.hit) return;
    gs.shipX = m.x;
    gs.lasers.push({ x1: m.x, y1: 255, x2: m.x, y2: m.y, life: 1 });
    speak(m.w.word);
    if (m.w.word === gs.target.word) {
      m.hit = true;
      gs.combo++; gs.score += 50 * gs.combo; addUserGamePts(25);
      if (gs.combo >= 2) triggerStreakFx(gs.combo, `🚀 Bắn hạ "${m.w.word}"!`);
      spawnWave(); renderQuickBtns();
    } else {
      gs.combo = 0; gs.hp = Math.max(1, gs.hp - 1);
      notify(`💥 Bắn nhầm! "${gs.target.meaning}" = "${gs.target.word}"`);
      spawnWave(); renderQuickBtns();
    }
    document.getElementById('gx-hp').textContent = '❤️'.repeat(gs.hp);
    document.getElementById('gx-cb').textContent = `🔥 x${gs.combo}`;
    document.getElementById('gx-sc').textContent = `${gs.score} PTS`;
  }

  function renderQuickBtns() {
    const box = document.getElementById('gx-btns');
    if (!box) return;
    box.innerHTML = gs.meteors.map((m, idx) => `
      <button type="button" data-mi="${idx}" class="gx-b py-3 px-3 rounded-2xl bg-slate-900 hover:bg-purple-700 text-white font-mono font-extrabold text-xs cursor-pointer border border-purple-400/40 shadow">🔫 ${escapeHtml(m.w.word)}</button>`).join('');
    box.querySelectorAll('.gx-b').forEach(b => b.onclick = () => fireAtMeteor(gs.meteors[Number(b.dataset.mi)]));
  }

  const cv = document.getElementById('gx-cv'), ctx = cv.getContext('2d');
  cv.onclick = (ev) => {
    const r = cv.getBoundingClientRect();
    const cx = (ev.clientX - r.left) * (800 / r.width);
    const cy = (ev.clientY - r.top) * (290 / r.height);
    const hitM = gs.meteors.find(m => Math.hypot(m.x - cx, m.y - cy) < m.r + 18);
    if (hitM) fireAtMeteor(hitM);
  };

  spawnWave(); renderQuickBtns();

  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    ctx.fillStyle = '#050816'; ctx.fillRect(0, 0, 800, 290);
    ctx.fillStyle = '#e2e8f0';
    gs.stars.forEach(s => { s.y = (s.y + 0.6) % 290; ctx.fillRect(s.x, s.y, s.s, s.s); });

    // Meteors
    gs.meteors.forEach(m => {
      m.y += m.vy;
      if (m.y > 240) { m.y = 35; }
      const g = ctx.createRadialGradient(m.x - 8, m.y - 8, 4, m.x, m.y, m.r);
      g.addColorStop(0, '#c084fc'); g.addColorStop(1, '#3b0764');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.28); ctx.fill();
      ctx.strokeStyle = '#e9d5ff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center';
      ctx.fillText(m.w.word, m.x, m.y + 4);
    });

    // Lasers
    for (let i = gs.lasers.length - 1; i >= 0; i--) {
      const l = gs.lasers[i]; l.life -= 0.08;
      if (l.life <= 0) { gs.lasers.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(56,189,248,${l.life})`; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2); ctx.stroke();
    }

    // Starship
    const sx = gs.shipX;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.moveTo(sx, 242); ctx.lineTo(sx - 22, 278); ctx.lineTo(sx + 22, 278); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#facc15';
    ctx.beginPath(); ctx.moveTo(sx - 8, 278); ctx.lineTo(sx, 289); ctx.lineTo(sx + 8, 278); ctx.closePath(); ctx.fill();
  }
  state.rafs.push(requestAnimationFrame(loop));
}

// =========================================================================
// 10. ĐUA XE F1 NITRO TỪ VỰNG (TURBO VOCAB F1 — CANVAS 60FPS)
// =========================================================================
function renderF1Racer(v) {
  const words = getActiveGameWords();
  const rc = { idx: 0, score: 0, combo: 0, myX: 160, aiX: 160, nitro: 0, roadOff: 0 };
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🏎️', 'Đua Xe F1 Nitro Từ Vựng (Turbo F1)', `<span id="f1-cb" class="text-orange-600">🔥 Nitro x0</span><span id="f1-sc" class="text-rose-600">0 PTS</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-red-500 shadow-2xl"><canvas id="f1-cv" width="800" height="200" class="w-full h-auto block"></canvas></div>
      <div id="f1-box" class="travel-card p-5 space-y-3 text-center"></div>
    </div>`;
  const cv = document.getElementById('f1-cv'), ctx = cv.getContext('2d');
  function drawCar(x, y, col, label, flame) {
    ctx.save(); ctx.translate(x, y);
    if (flame) {
      ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.moveTo(-28, 0); ctx.lineTo(-56 - Math.random() * 18, -7); ctx.lineTo(-56 - Math.random() * 18, 7); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = col; ctx.fillRect(-26, -12, 54, 24);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(-18, -17, 14, 5); ctx.fillRect(10, -17, 14, 5); ctx.fillRect(-18, 12, 14, 5); ctx.fillRect(10, 12, 14, 5);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif'; ctx.fillText(label, -14, 4);
    ctx.restore();
  }
  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    rc.roadOff = (rc.roadOff + (rc.nitro > 0 ? 16 : 7)) % 80;
    if (rc.nitro > 0) rc.nitro = Math.max(0, rc.nitro - 0.03);
    rc.aiX = Math.min(700, rc.aiX + 0.22);
    if (rc.aiX >= 695) rc.aiX = 140;

    ctx.fillStyle = '#14532d'; ctx.fillRect(0, 0, 800, 200);
    ctx.fillStyle = '#334155'; ctx.fillRect(0, 28, 800, 144);
    ctx.fillStyle = '#ef4444';
    for (let x = -rc.roadOff; x < 800; x += 40) {
      ctx.fillRect(x, 22, 20, 6); ctx.fillRect(x + 20, 172, 20, 6);
    }
    ctx.strokeStyle = '#f8fafc'; ctx.setLineDash([28, 24]); ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-rc.roadOff, 100); ctx.lineTo(800, 100); ctx.stroke(); ctx.setLineDash([]);
    // Checkered finish line
    ctx.fillStyle = '#facc15'; ctx.fillRect(725, 28, 8, 144);
    drawCar(rc.aiX, 64, '#64748b', 'AI', false);
    drawCar(rc.myX, 136, '#ef4444', 'BẠN', rc.nitro > 0);
  }
  state.rafs.push(requestAnimationFrame(loop));

  function nextQ() {
    const w = words[rc.idx % words.length]; rc.idx++;
    const opts = [w, ...getGameDistractors(w, 3)].sort(() => Math.random() - 0.5);
    document.getElementById('f1-box').innerHTML = `
      <div class="text-xs font-extrabold text-rose-600">🏁 BẤM ĐÚNG NGHĨA ĐỂ PHUN NITRO VƯỢT ĐỐI THỦ!</div>
      <div class="text-2xl font-black text-slate-900">${escapeHtml(w.word)} <span class="text-sm font-mono text-slate-500">${escapeHtml(w.ipa || '')}</span></div>
      <div class="grid sm:grid-cols-2 gap-2.5 text-left">
        ${opts.map((o, i) => `<button data-ok="${o.word === w.word ? '1' : '0'}" class="f1-o p-3.5 rounded-2xl bg-[var(--content)] border-2 border-[var(--border)] hover:border-red-500 text-xs font-extrabold cursor-pointer">${i + 1}. ${escapeHtml(o.meaning)}</button>`).join('')}
      </div>`;
    document.querySelectorAll('.f1-o').forEach(b => b.onclick = () => {
      speak(w.word);
      if (b.dataset.ok === '1') {
        rc.combo++; rc.nitro = 1; rc.myX += 115; rc.score += 45 * rc.combo; addUserGamePts(20);
        if (rc.myX >= 715) { rc.myX = 140; rc.aiX = 140; rc.score += 150; triggerStreakFx(rc.combo, '🏆 VỀ ĐÍCH NHẤT CHẶNG +150 PTS!'); }
      } else {
        rc.combo = 0; rc.aiX = Math.min(700, rc.aiX + 65);
        notify(`✕ Nhầm chân ga! "${w.word}" = ${w.meaning}`);
      }
      document.getElementById('f1-cb').textContent = `🔥 Nitro x${rc.combo}`;
      document.getElementById('f1-sc').textContent = `${rc.score} PTS`;
      nextQ();
    });
  }
  nextQ();
}

// =========================================================================
// 11. CÂU CÁ ĐẠI DƯƠNG SĂN TỪ (DEEP SEA WORD ANGLER — CANVAS 60FPS)
// =========================================================================
function renderDeepFishing(v) {
  const words = getActiveGameWords();
  const fs = { score: 0, combo: 0, target: words[0], fish: [], hook: { x: 400, y: 28, dropping: false } };
  const fishCols = ['#fb7185', '#facc15', '#34d399', '#38bdf8'];

  function spawnFish() {
    fs.target = words[Math.floor(Math.random() * words.length)];
    const opts = [fs.target, ...getGameDistractors(fs.target, 3)].sort(() => Math.random() - 0.5);
    fs.fish = opts.map((w, i) => ({
      w,
      x: 110 + i * 175,
      y: 85 + (i % 3) * 46,
      vx: (i % 2 === 0 ? 1 : -1) * (0.9 + Math.random() * 0.7),
      col: fishCols[i % fishCols.length]
    }));
    const el = document.getElementById('df-target');
    if (el) el.textContent = `🎣 Hãy câu chú cá mang nghĩa: "${fs.target.meaning}"`;
  }

  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🎣', 'Câu Cá Đại Dương Săn Từ (Deep Sea Angler)', `<span id="df-cb" class="text-orange-600">🔥 x0</span><span id="df-sc" class="text-cyan-700">0 PTS</span>`)}
      <div id="df-target" class="travel-card p-3 bg-cyan-950 text-cyan-100 text-center font-extrabold text-sm"></div>
      <div class="rounded-3xl overflow-hidden border-2 border-cyan-500 shadow-2xl"><canvas id="df-cv" width="800" height="260" class="w-full h-auto block cursor-pointer"></canvas></div>
      <div class="text-center text-xs text-slate-500 font-semibold">💡 Bấm trực tiếp vào chú cá trên mặt biển để thả lưỡi câu!</div>
    </div>`;

  const cv = document.getElementById('df-cv'), ctx = cv.getContext('2d');
  spawnFish();

  cv.onclick = (ev) => {
    const r = cv.getBoundingClientRect();
    const cx = (ev.clientX - r.left) * (800 / r.width);
    const cy = (ev.clientY - r.top) * (260 / r.height);
    const hit = fs.fish.find(f => Math.hypot(f.x - cx, f.y - cy) < 48);
    fs.hook.x = cx; fs.hook.y = cy;
    setTimeout(() => { fs.hook.y = 28; }, 260);
    if (!hit) return;
    speak(hit.w.word);
    if (hit.w.word === fs.target.word) {
      fs.combo++; fs.score += 40 * fs.combo; addUserGamePts(20);
      if (fs.combo >= 2) triggerStreakFx(fs.combo, `🎣 Câu trúng cá vàng "${hit.w.word}"!`);
      else notify(`🎣 Tuyệt vời! "${hit.w.word}" = ${hit.w.meaning}`);
      spawnFish();
    } else {
      fs.combo = 0; notify(`🐟 Câu nhầm cá! "${fs.target.meaning}" là "${fs.target.word}"`);
      spawnFish();
    }
    document.getElementById('df-cb').textContent = `🔥 x${fs.combo}`;
    document.getElementById('df-sc').textContent = `${fs.score} PTS`;
  };

  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    const g = ctx.createLinearGradient(0, 0, 0, 260);
    g.addColorStop(0, '#0284c7'); g.addColorStop(0.25, '#0369a1'); g.addColorStop(1, '#082f49');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 800, 260);
    // Boat & fishing line
    ctx.fillStyle = '#fbbf24'; ctx.fillRect(fs.hook.x - 28, 8, 56, 14);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(fs.hook.x, 22); ctx.lineTo(fs.hook.x, fs.hook.y); ctx.stroke();

    fs.fish.forEach(f => {
      f.x += f.vx;
      if (f.x < 65 || f.x > 735) f.vx *= -1;
      ctx.save(); ctx.translate(f.x, f.y);
      const dir = f.vx >= 0 ? 1 : -1;
      ctx.fillStyle = f.col;
      ctx.beginPath(); ctx.ellipse(0, 0, 42, 20, 0, 0, 6.28); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-dir * 38, 0); ctx.lineTo(-dir * 56, -14); ctx.lineTo(-dir * 56, 14); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
      ctx.fillText(f.w.word, 0, 4);
      ctx.restore();
    });
  }
  state.rafs.push(requestAnimationFrame(loop));
}

// =========================================================================
// 12. THỦ THÀNH PHÁP SƯ CHỮ (WIZARD TOWER DEFENSE — CANVAS)
// =========================================================================
function renderWizardTd(v) {
  const words = getActiveGameWords();
  const td = { idx: 0, score: 0, combo: 0, castleHp: 100, mobX: 720, fireball: null };
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🏰', 'Thủ Thành Pháp Sư Chữ (Wizard Defense)', `<span>🏰 Pha lê: <strong id="td-hp" class="text-emerald-600">100%</strong></span><span id="td-sc" class="text-purple-700">0 PTS</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-purple-500 shadow-2xl"><canvas id="td-cv" width="800" height="210" class="w-full h-auto block"></canvas></div>
      <div id="td-box" class="travel-card p-5 space-y-3 text-center"></div>
    </div>`;
  const cv = document.getElementById('td-cv'), ctx = cv.getContext('2d');

  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    td.mobX -= 0.45;
    if (td.mobX <= 145) {
      td.mobX = 720; td.castleHp = Math.max(10, td.castleHp - 15);
      const hpEl = document.getElementById('td-hp'); if (hpEl) hpEl.textContent = td.castleHp + '%';
    }
    const bg = ctx.createLinearGradient(0, 0, 0, 210);
    bg.addColorStop(0, '#1e1b4b'); bg.addColorStop(1, '#312e81');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 800, 210);
    ctx.fillStyle = '#14532d'; ctx.fillRect(0, 174, 800, 36);
    // Wizard Tower & Crystal
    ctx.fillStyle = '#475569'; ctx.fillRect(65, 84, 62, 90);
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.moveTo(96, 46); ctx.lineTo(74, 84); ctx.lineTo(118, 84); ctx.closePath(); ctx.fill();
    // Monster
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(td.mobX, 152, 22, 0, 6.28); ctx.fill();
    ctx.fillStyle = '#fef08a'; ctx.fillRect(td.mobX - 9, 144, 5, 5); ctx.fillRect(td.mobX + 4, 144, 5, 5);
    if (td.fireball) {
      td.fireball.p += 0.12;
      const fx = 115 + (td.mobX - 115) * td.fireball.p;
      const fy = 74 + (152 - 74) * td.fireball.p;
      ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.arc(fx, fy, 12, 0, 6.28); ctx.fill();
      if (td.fireball.p >= 1) { td.fireball = null; td.mobX = 735; }
    }
  }
  state.rafs.push(requestAnimationFrame(loop));

  function nextSpell() {
    const w = words[td.idx % words.length]; td.idx++;
    const opts = [w, ...getGameDistractors(w, 3)].sort(() => Math.random() - 0.5);
    document.getElementById('td-box').innerHTML = `
      <div class="text-xs font-extrabold text-purple-700">🔮 NIỆM CHÚ TIẾNG ANH CHO NGHĨA:</div>
      <div class="text-xl font-black text-slate-900">${escapeHtml(w.meaning)}</div>
      <div class="grid sm:grid-cols-2 gap-2.5">
        ${opts.map(o => `<button data-ok="${o.word === w.word ? '1' : '0'}" class="td-o p-3.5 rounded-2xl bg-[var(--content)] border-2 border-[var(--border)] hover:border-purple-500 font-mono font-extrabold text-xs cursor-pointer">🔥 ${escapeHtml(o.word)} <span class="font-normal opacity-70">${escapeHtml(o.ipa || '')}</span></button>`).join('')}
      </div>`;
    document.querySelectorAll('.td-o').forEach(b => b.onclick = () => {
      speak(w.word);
      if (b.dataset.ok === '1') {
        td.combo++; td.score += 40 * td.combo; td.fireball = { p: 0 }; addUserGamePts(20);
        if (td.combo >= 2) triggerStreakFx(td.combo, `🔥 Cầu lửa "${w.word}" diệt quái!`);
      } else {
        td.combo = 0; td.mobX = Math.max(160, td.mobX - 90);
        notify(`✕ Sai thần chú! Đáp án: "${w.word}"`);
      }
      document.getElementById('td-sc').textContent = `${td.score} PTS`;
      nextSpell();
    });
  }
  nextSpell();
}

// =========================================================================
// 13. BẮN BONG BÓNG TỪ VỰNG (BUBBLE POP — CANVAS)
// =========================================================================
function renderBubblePop(v) {
  const words = getActiveGameWords();
  const bp = { score: 0, combo: 0, target: words[0], bubbles: [] };

  function spawnBubbles() {
    bp.target = words[Math.floor(Math.random() * words.length)];
    const opts = [bp.target, ...getGameDistractors(bp.target, 4)].sort(() => Math.random() - 0.5);
    bp.bubbles = opts.map((w, i) => ({
      w,
      x: 110 + i * 145,
      y: 220 + (i % 3) * 28,
      vy: 0.65 + Math.random() * 0.45,
      r: 40
    }));
    const tEl = document.getElementById('bp-target');
    if (tEl) tEl.textContent = `🫧 Chạm nổ bong bóng có nghĩa: "${bp.target.meaning}"`;
  }

  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🫧', 'Bắn Bong Bóng Xà Phòng (Bubble Pop)', `<span id="bp-cb" class="text-orange-600">🔥 x0</span><span id="bp-sc" class="text-cyan-700">0 PTS</span>`)}
      <div id="bp-target" class="travel-card p-3 bg-sky-50 border-2 border-cyan-400 text-cyan-950 font-extrabold text-sm text-center"></div>
      <div class="rounded-3xl overflow-hidden border-2 border-cyan-400 shadow-xl"><canvas id="bp-cv" width="800" height="260" class="w-full h-auto block cursor-pointer"></canvas></div>
    </div>`;
  const cv = document.getElementById('bp-cv'), ctx = cv.getContext('2d');
  spawnBubbles();

  cv.onclick = (ev) => {
    const r = cv.getBoundingClientRect();
    const cx = (ev.clientX - r.left) * (800 / r.width);
    const cy = (ev.clientY - r.top) * (260 / r.height);
    const hit = bp.bubbles.find(b => Math.hypot(b.x - cx, b.y - cy) < b.r + 10);
    if (!hit) return;
    speak(hit.w.word);
    if (hit.w.word === bp.target.word) {
      bp.combo++; bp.score += 35 * bp.combo; addUserGamePts(18);
      if (bp.combo >= 2) triggerStreakFx(bp.combo, `🫧 Nổ bong bóng "${hit.w.word}"!`);
      spawnBubbles();
    } else {
      bp.combo = 0; notify(`✕ Bong bóng đúng là "${bp.target.word}"!`);
      spawnBubbles();
    }
    document.getElementById('bp-cb').textContent = `🔥 x${bp.combo}`;
    document.getElementById('bp-sc').textContent = `${bp.score} PTS`;
  };

  function loop(now) {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    const t = now * 0.002;
    const g = ctx.createLinearGradient(0, 0, 0, 260);
    g.addColorStop(0, '#ecfeff'); g.addColorStop(1, '#bae6fd');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 800, 260);
    bp.bubbles.forEach((b, i) => {
      b.y -= b.vy; if (b.y < -35) b.y = 280;
      const bx = b.x + Math.sin(t + i) * 10;
      const rg = ctx.createRadialGradient(bx - 12, b.y - 12, 4, bx, b.y, b.r);
      rg.addColorStop(0, 'rgba(255,255,255,0.95)');
      rg.addColorStop(0.7, 'rgba(56,189,248,0.35)');
      rg.addColorStop(1, 'rgba(236,72,153,0.45)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(bx, b.y, b.r, 0, 6.28); ctx.fill();
      ctx.strokeStyle = 'rgba(14,116,144,0.45)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#0f172a'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
      ctx.fillText(b.w.word, bx, b.y + 4);
    });
  }
  state.rafs.push(requestAnimationFrame(loop));
}

// =========================================================================
// 14. PHÁ GẠCH NĂNG LƯỢNG TỪ VỰNG (VOCAB BRICK BREAKER — CANVAS)
// =========================================================================
function renderBrickBreaker(v) {
  const words = getActiveGameWords();
  const bb = { score: 0, padX: 340, ball: { x: 400, y: 200, vx: 3.6, vy: -3.6 }, bricks: [], quizWord: null };
  const cols = ['#f43f5e', '#f59e0b', '#10b981', '#0ea5e9'];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      bb.bricks.push({ x: 32 + c * 106, y: 24 + r * 28, w: 96, h: 20, alive: true, col: cols[r % cols.length] });
    }
  }
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🧱', 'Phá Gạch Năng Lượng Từ Vựng (Brick Breaker)', `<span id="bb-sc" class="text-amber-600">0 PTS</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-amber-500 shadow-2xl bg-slate-950">
        <canvas id="bb-cv" width="800" height="250" class="w-full h-auto block"></canvas>
      </div>
      <div id="bb-quiz" class="travel-card p-4 text-center text-xs font-bold text-slate-600">Di chuyển chuột trên khung game để đỡ bóng phá gạch mở Rương Từ Vựng (+60 PTS)!</div>
    </div>`;
  const cv = document.getElementById('bb-cv'), ctx = cv.getContext('2d');
  cv.onmousemove = (ev) => {
    const r = cv.getBoundingClientRect();
    bb.padX = Math.max(10, Math.min(680, (ev.clientX - r.left) * (800 / r.width) - 55));
  };

  function showBonusQuiz() {
    const w = words[Math.floor(Math.random() * words.length)];
    bb.quizWord = w;
    const opts = [w, ...getGameDistractors(w, 3)].sort(() => Math.random() - 0.5);
    const qBox = document.getElementById('bb-quiz');
    if (!qBox) return;
    qBox.innerHTML = `
      <div class="space-y-2">
        <div class="text-amber-700 font-extrabold">🎁 RƯƠNG TỪ VỰNG MỞ RA: "${escapeHtml(w.meaning)}" là từ nào?</div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
          ${opts.map(o => `<button data-ok="${o.word === w.word ? '1' : '0'}" class="bb-o py-2 px-3 rounded-xl bg-slate-900 text-white font-mono font-bold cursor-pointer">${escapeHtml(o.word)}</button>`).join('')}
        </div>
      </div>`;
    qBox.querySelectorAll('.bb-o').forEach(b => b.onclick = () => {
      speak(w.word);
      if (b.dataset.ok === '1') { bb.score += 80; addUserGamePts(20); notify(`🎁 Mở rương "${w.word}" +80 PTS!`); }
      else notify(`Đáp án rương là "${w.word}"!`);
      bb.quizWord = null;
      document.getElementById('bb-sc').textContent = `${bb.score} PTS`;
      qBox.textContent = 'Tiếp tục đỡ bóng phá gạch để mở rương tiếp theo!';
    });
  }

  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    if (!bb.quizWord) {
      bb.ball.x += bb.ball.vx; bb.ball.y += bb.ball.vy;
      if (bb.ball.x < 10 || bb.ball.x > 790) bb.ball.vx *= -1;
      if (bb.ball.y < 10) bb.ball.vy *= -1;
      if (bb.ball.y > 222 && bb.ball.x >= bb.padX && bb.ball.x <= bb.padX + 115) {
        bb.ball.vy = -Math.abs(bb.ball.vy);
      }
      if (bb.ball.y > 248) { bb.ball.x = 400; bb.ball.y = 190; bb.ball.vy = -3.6; }
      bb.bricks.forEach(br => {
        if (!br.alive) return;
        if (bb.ball.x > br.x && bb.ball.x < br.x + br.w && bb.ball.y > br.y && bb.ball.y < br.y + br.h) {
          br.alive = false; bb.ball.vy *= -1; bb.score += 20;
          document.getElementById('bb-sc').textContent = `${bb.score} PTS`;
          if (bb.bricks.filter(x => !x.alive).length % 3 === 0) showBonusQuiz();
          if (bb.bricks.every(x => !x.alive)) bb.bricks.forEach(x => { x.alive = true; });
        }
      });
    }
    ctx.fillStyle = '#090d16'; ctx.fillRect(0, 0, 800, 250);
    bb.bricks.forEach(br => {
      if (!br.alive) return;
      ctx.fillStyle = br.col; ctx.fillRect(br.x, br.y, br.w, br.h);
    });
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(bb.padX, 228, 115, 11);
    ctx.fillStyle = '#fde047'; ctx.beginPath(); ctx.arc(bb.ball.x, bb.ball.y, 7.5, 0, 6.28); ctx.fill();
  }
  state.rafs.push(requestAnimationFrame(loop));
}

// =========================================================================
// 15. KHỦNG LONG CYBER VƯỢT RÀO (CYBER DINO VOCAB — CANVAS)
// =========================================================================
function renderDinoRunner(v) {
  const words = getActiveGameWords();
  const dn = { y: 160, vy: 0, score: 0, shield: 1, cactusX: 780, idx: 0 };
  v.innerHTML = `
    <div class="space-y-3 max-w-4xl mx-auto">
      ${arcadeTopBarHtml('🦖', 'Khủng Long Cyber Vượt Rào (Dino Vocab)', `<span>🛡️ Khiên: <strong id="dn-sh" class="text-emerald-600">1</strong></span><span id="dn-sc" class="text-teal-700">0 PTS</span>`)}
      <div class="rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-xl bg-slate-900">
        <canvas id="dn-cv" width="800" height="205" class="w-full h-auto block cursor-pointer"></canvas>
      </div>
      <div class="flex justify-center"><button id="dn-jmp" class="px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-black text-xs cursor-pointer shadow">⬆️ NHẢY QUA XƯƠNG RỒNG (Hoặc bấm vào màn hình)</button></div>
      <div id="dn-q" class="travel-card p-4 space-y-2 text-center"></div>
    </div>`;
  const cv = document.getElementById('dn-cv'), ctx = cv.getContext('2d');
  const jump = () => { if (dn.y >= 158) dn.vy = -10.5; };
  cv.onclick = jump;
  document.getElementById('dn-jmp').onclick = jump;

  function renderBoostQ() {
    const w = words[dn.idx % words.length]; dn.idx++;
    const opts = [w, ...getGameDistractors(w, 3)].sort(() => Math.random() - 0.5);
    const box = document.getElementById('dn-q');
    if (!box) return;
    box.innerHTML = `
      <div class="text-xs font-extrabold text-emerald-700">⚡ NẠP KHIÊN BẤT TỬ (+1 🛡️ & +50 PTS): "${escapeHtml(w.word)}" nghĩa là gì?</div>
      <div class="grid sm:grid-cols-2 gap-2 text-left">
        ${opts.map(o => `<button data-ok="${o.word === w.word ? '1' : '0'}" class="dn-o p-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] hover:border-emerald-500 text-xs font-bold cursor-pointer">${escapeHtml(o.meaning)}</button>`).join('')}
      </div>`;
    box.querySelectorAll('.dn-o').forEach(b => b.onclick = () => {
      speak(w.word);
      if (b.dataset.ok === '1') { dn.shield++; dn.score += 50; addUserGamePts(15); notify(`🛡️ +1 Khiên bảo vệ ("${w.word}")!`); }
      else notify(`✕ "${w.word}" = ${w.meaning}`);
      document.getElementById('dn-sh').textContent = dn.shield;
      renderBoostQ();
    });
  }
  renderBoostQ();

  function loop() {
    if (!document.body.contains(cv)) return;
    state.rafs.push(requestAnimationFrame(loop));
    dn.y = Math.min(160, dn.y + dn.vy);
    if (dn.y < 160) dn.vy += 0.58; else dn.vy = 0;
    dn.cactusX -= 5.2;
    if (dn.cactusX < -30) { dn.cactusX = 810; dn.score += 15; document.getElementById('dn-sc').textContent = `${dn.score} PTS`; }
    if (Math.abs(dn.cactusX - 110) < 24 && dn.y > 134) {
      dn.cactusX = 810;
      if (dn.shield > 0) { dn.shield--; document.getElementById('dn-sh').textContent = dn.shield; }
      else { dn.score = Math.max(0, dn.score - 20); }
    }
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, 800, 205);
    ctx.fillStyle = '#10b981'; ctx.fillRect(0, 184, 800, 3);
    // Dino
    ctx.fillStyle = dn.shield > 0 ? '#34d399' : '#f8fafc';
    ctx.fillRect(96, dn.y - 24, 28, 28); ctx.fillRect(110, dn.y - 38, 22, 16);
    if (dn.shield > 0) { ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(112, dn.y - 16, 28, 0, 6.28); ctx.stroke(); }
    // Neon Cactus
    ctx.fillStyle = '#f43f5e'; ctx.fillRect(dn.cactusX, 148, 16, 36); ctx.fillRect(dn.cactusX - 6, 156, 28, 10);
  }
  state.rafs.push(requestAnimationFrame(loop));
}

// =========================================================================
// 16. RẮN SĂN CHỮ CÁI NEON (WORD SNAKE)
// =========================================================================
function renderWordSnake(v) {
  const words = getActiveGameWords();
  let idx = 0, score = 0, combo = 0, pos = 0;
  function draw() {
    const w = words[idx % words.length];
    const clean = w.word.toUpperCase().replace(/[^A-Z]/g, '') || 'ENGLISH';
    const targetChar = clean[pos] || clean[0];
    const decoys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => c !== targetChar).sort(() => Math.random() - 0.5).slice(0, 5);
    const orbs = [targetChar, ...decoys].sort(() => Math.random() - 0.5);

    v.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">
        ${arcadeTopBarHtml('🐍', 'Rắn Săn Chữ Cái Neon (Word Snake)', `<span class="text-orange-600">🔥 x${combo}</span><span class="text-emerald-700">${score} PTS</span>`)}
        <div class="travel-card p-6 bg-slate-950 text-white space-y-4 text-center border-2 border-emerald-500">
          <div class="text-xs text-emerald-300 font-bold">🐍 ĐIỀU KHIỂN RẮN ĂN LẦN LƯỢT TỪNG CHỮ CÁI ĐỂ GHÉP TỪ:</div>
          <div class="text-xl font-black text-amber-300">${escapeHtml(w.meaning)}</div>
          <div class="flex flex-wrap justify-center gap-1.5 font-mono text-lg font-black">
            ${clean.split('').map((ch, ci) => `<span class="w-9 h-10 rounded-xl flex items-center justify-center border-2 ${ci < pos ? 'bg-emerald-500 border-emerald-300 text-slate-950' : ci === pos ? 'bg-slate-800 border-amber-400 text-amber-300 animate-pulse' : 'bg-slate-900 border-slate-700 text-slate-600'}">${ci < pos ? ch : '_'}</span>`).join('')}
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-2">
            ${orbs.map(ch => `<button data-ch="${ch}" class="sn-orb py-3.5 rounded-2xl bg-emerald-900/60 hover:bg-emerald-500 hover:text-slate-950 border-2 border-emerald-400/50 font-mono text-lg font-black cursor-pointer transition">🍏 ${ch}</button>`).join('')}
          </div>
        </div>
      </div>`;
    v.querySelectorAll('.sn-orb').forEach(b => b.onclick = () => {
      if (b.dataset.ch === targetChar) {
        pos++;
        if (pos >= clean.length) {
          combo++; score += 55 * combo; pos = 0; idx++; addUserGamePts(25); speak(w.word);
          if (combo >= 2) triggerStreakFx(combo, `🐍 Rắn săn trọn từ "${w.word}"!`);
          else notify(`✓ Hoàn thành từ "${w.word}"!`);
        }
      } else {
        combo = 0; notify(`✕ Chữ tiếp theo cần ăn là "${targetChar}"!`);
      }
      draw();
    });
  }
  draw();
}

// =========================================================================
// 17. WORDLE GIẢI MÃ Ô CHỮ TIẾNG ANH (VOCAB WORDLE)
// =========================================================================
function renderVocabWordle(v) {
  const pool = getActiveGameWords().filter(w => /^[a-zA-Z]{4,8}$/.test(w.word));
  const words = pool.length ? pool : [{ word: 'travel', meaning: 'du lịch', ipa: '/ˈtræv.əl/' }];
  let wObj = words[Math.floor(Math.random() * words.length)];
  let target = wObj.word.toUpperCase();
  let guesses = [], score = 0;

  function draw() {
    const len = target.length;
    v.innerHTML = `
      <div class="space-y-4 max-w-xl mx-auto">
        ${arcadeTopBarHtml('🟩', 'Wordle Giải Mã Ô Chữ Tiếng Anh', `<span class="text-emerald-700">${score} PTS</span>`)}
        <div class="travel-card p-5 space-y-4 text-center">
          <div class="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
            <span class="font-extrabold text-emerald-800">💡 Gợi ý nghĩa:</span> <strong class="text-slate-900 text-sm">${escapeHtml(wObj.meaning)}</strong> (${len} chữ cái)
          </div>
          <div class="space-y-1.5">
            ${Array.from({ length: 6 }, (_, r) => {
              const g = guesses[r] || '';
              return `<div class="flex justify-center gap-1.5">
                ${Array.from({ length: len }, (__, c) => {
                  const ch = g[c] || '';
                  let cls = 'bg-white border-2 border-slate-300 text-slate-900';
                  if (g) {
                    if (ch === target[c]) cls = 'bg-emerald-600 border-emerald-600 text-white';
                    else if (target.includes(ch)) cls = 'bg-amber-400 border-amber-400 text-slate-950';
                    else cls = 'bg-slate-500 border-slate-500 text-white';
                  }
                  return `<div class="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-base ${cls}">${ch}</div>`;
                }).join('')}
              </div>`;
            }).join('')}
          </div>
          <form id="wd-form" class="flex gap-2 justify-center">
            <input id="wd-inp" maxlength="${len}" required autofocus placeholder="Nhập từ ${len} chữ cái..." class="px-4 py-2.5 rounded-xl bg-[var(--content)] border-2 border-emerald-400 font-mono uppercase font-black text-center text-sm w-52" />
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs cursor-pointer">Đoán</button>
            <button type="button" id="wd-new" class="px-3 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer">Đổi từ</button>
          </form>
        </div>
      </div>`;
    document.getElementById('wd-new').onclick = () => {
      wObj = words[Math.floor(Math.random() * words.length)]; target = wObj.word.toUpperCase(); guesses = []; draw();
    };
    document.getElementById('wd-form').onsubmit = (e) => {
      e.preventDefault();
      const val = document.getElementById('wd-inp').value.trim().toUpperCase();
      if (val.length !== len) { notify(`⚠️ Hãy nhập đúng ${len} chữ cái!`); return; }
      guesses.push(val);
      if (val === target) {
        score += 100; addUserGamePts(30); speak(wObj.word);
        triggerStreakFx(3, `🟩 Giải mã Wordle "${wObj.word}" xuất sắc!`);
        wObj = words[Math.floor(Math.random() * words.length)]; target = wObj.word.toUpperCase(); guesses = [];
      } else if (guesses.length >= 6) {
        notify(`Đáp án đúng là "${target}" (${wObj.meaning})!`);
        wObj = words[Math.floor(Math.random() * words.length)]; target = wObj.word.toUpperCase(); guesses = [];
      }
      draw();
    };
  }
  draw();
}

// =========================================================================
// 18. LẬT THẺ KÝ ỨC HOÀNG GIA (ROYAL MEMORY FLIP 4x3)
// =========================================================================
function renderMemoryFlip(v) {
  const picked = getActiveGameWords().slice(0, 6);
  const deck = picked.flatMap((w, i) => [
    { uid: 'e' + i, pairId: i, txt: w.word, sub: w.ipa || 'EN', word: w.word },
    { uid: 'v' + i, pairId: i, txt: w.meaning, sub: 'VI', word: w.word }
  ]).sort(() => Math.random() - 0.5);
  let openIdx = [], doneIds = new Set(), moves = 0, lock = false;

  function draw() {
    v.innerHTML = `
      <div class="space-y-4 max-w-3xl mx-auto">
        ${arcadeTopBarHtml('🃏', 'Lật Thẻ Ký Ức Hoàng Gia (Memory Flip)', `<span>Lượt lật: <strong>${moves}</strong></span><span class="text-amber-600">Khớp: ${doneIds.size}/${picked.length}</span>`)}
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
          ${deck.map((c, idx) => {
            const isUp = openIdx.includes(idx) || doneIds.has(c.pairId);
            return `<button data-i="${idx}" class="mf-c h-24 rounded-2xl p-2 font-extrabold text-xs cursor-pointer transition transform hover:scale-102 border-2 flex flex-col items-center justify-center text-center ${doneIds.has(c.pairId) ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : isUp ? 'bg-amber-50 border-amber-500 text-slate-900 shadow-lg' : 'bg-gradient-to-br from-slate-900 to-teal-900 border-amber-400/60 text-amber-300'}">
              ${isUp ? `<span class="text-sm font-black">${escapeHtml(c.txt)}</span><span class="text-[10px] opacity-70 mt-1">${escapeHtml(c.sub)}</span>` : '<span class="text-2xl">⚜️</span><span class="text-[10px] mt-1">LẬT THẺ</span>'}
            </button>`;
          }).join('')}
        </div>
      </div>`;
    v.querySelectorAll('.mf-c').forEach(b => b.onclick = () => {
      const i = Number(b.dataset.i);
      if (lock || openIdx.includes(i) || doneIds.has(deck[i].pairId)) return;
      openIdx.push(i);
      speak(deck[i].word);
      draw();
      if (openIdx.length === 2) {
        moves++; lock = true;
        const [a, c2] = openIdx;
        if (deck[a].pairId === deck[c2].pairId) {
          doneIds.add(deck[a].pairId); openIdx = []; lock = false; addUserGamePts(18);
          if (doneIds.size === picked.length) {
            triggerStreakFx(4, `🃏 Hoàn thành Lật Thẻ sau ${moves} lượt!`);
            setTimeout(() => renderMemoryFlip(v), 900);
            return;
          }
          draw();
        } else {
          setTimeout(() => { openIdx = []; lock = false; draw(); }, 700);
        }
      }
    });
  }
  draw();
}

// =========================================================================
// 19. BẬC THẦY XẾP CHỮ (WORD SCRAMBLE / ANAGRAM)
// =========================================================================
function renderWordScramble(v) {
  const words = getActiveGameWords();
  let idx = 0, score = 0, combo = 0, pickedIdx = [];
  let curW = words[0];
  let tiles = [];

  function setupWord() {
    curW = words[idx % words.length];
    tiles = curW.word.split('').map((ch, i) => ({ ch, i })).sort(() => Math.random() - 0.5);
    pickedIdx = [];
  }
  setupWord();

  function draw() {
    const built = pickedIdx.map(pi => tiles[pi].ch).join('');
    v.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">
        ${arcadeTopBarHtml('🧩', 'Bậc Thầy Xếp Chữ (Anagram Master)', `<span class="text-orange-600">🔥 x${combo}</span><span class="text-indigo-700">${score} PTS</span>`)}
        <div class="travel-card p-6 text-center space-y-4">
          <div class="text-xs font-bold text-indigo-600">BẤM CHỌN CÁC VIÊN GẠCH CHỮ CÁI ĐỂ XẾP THÀNH TỪ ĐÚNG:</div>
          <div class="text-xl font-black text-slate-900">${escapeHtml(curW.meaning)} <span class="text-xs font-mono text-slate-400">${escapeHtml(curW.ipa || '')}</span></div>
          <div class="min-h-14 p-3 rounded-2xl bg-indigo-50 border-2 border-indigo-300 flex flex-wrap justify-center gap-1.5 font-mono text-lg font-black text-indigo-950">${escapeHtml(built) || '<span class="text-xs text-slate-400 font-sans">Chạm chữ cái bên dưới...</span>'}</div>
          <div class="flex flex-wrap justify-center gap-2">
            ${tiles.map((t, ti) => {
              const used = pickedIdx.includes(ti);
              return `<button data-ti="${ti}" ${used ? 'disabled' : ''} class="ws-t w-11 h-11 rounded-xl font-mono text-base font-black cursor-pointer border-2 ${used ? 'bg-slate-100 border-slate-200 text-slate-300' : 'bg-white border-indigo-400 text-indigo-900 hover:bg-indigo-600 hover:text-white shadow'}">${escapeHtml(t.ch)}</button>`;
            }).join('')}
          </div>
          <div class="flex justify-center gap-2 pt-2">
            <button id="ws-undo" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold cursor-pointer">⌫ Xóa 1 chữ</button>
            <button id="ws-hint" class="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold cursor-pointer">🔊 Nghe phát âm</button>
          </div>
        </div>
      </div>`;
    document.getElementById('ws-undo').onclick = () => { pickedIdx.pop(); draw(); };
    document.getElementById('ws-hint').onclick = () => speak(curW.word);
    v.querySelectorAll('.ws-t').forEach(b => b.onclick = () => {
      pickedIdx.push(Number(b.dataset.ti));
      if (pickedIdx.length === tiles.length) {
        const ans = pickedIdx.map(pi => tiles[pi].ch).join('');
        if (ans.toLowerCase() === curW.word.toLowerCase()) {
          combo++; score += 45 * combo; addUserGamePts(20); speak(curW.word);
          if (combo >= 2) triggerStreakFx(combo, `🧩 Giải mã "${curW.word}"!`);
          else notify(`✓ Chính xác: "${curW.word}"!`);
          idx++; setupWord();
        } else {
          combo = 0; notify(`✕ Chưa đúng thứ tự! Thử xếp lại "${curW.word}" nhé!`);
          pickedIdx = [];
        }
      }
      draw();
    });
  }
  draw();
}

// =========================================================================
// 20. GIẢI CỨU KHINH KHÍ CẦU HÀ MÃ (HIPPO BALLOON RESCUE)
// =========================================================================
function renderHippoRescue(v) {
  const words = getActiveGameWords();
  let idx = 0, score = 0, balloons = 6, guessed = new Set();
  function draw() {
    const w = words[idx % words.length];
    const clean = w.word.toUpperCase();
    const masked = clean.split('').map(c => (!/[A-Z]/.test(c) || guessed.has(c)) ? c : '_').join(' ');
    v.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">
        ${arcadeTopBarHtml('🦛', 'Giải Cứu Khinh Khí Cầu Hà Mã', `<span>🎈 Bóng bay: <strong>${'🎈'.repeat(balloons)}</strong></span><span class="text-pink-600">${score} PTS</span>`)}
        <div class="travel-card p-6 text-center space-y-4">
          <div class="w-16 h-16 mx-auto">${hippoCowSvg('w-full h-full')}</div>
          <div class="text-xs text-slate-500 font-bold">Đoán chữ cái tiếng Anh trước khi hết 6 quả bóng bay!</div>
          <div class="text-lg font-extrabold text-pink-700">Nghĩa: ${escapeHtml(w.meaning)}</div>
          <div class="font-mono text-2xl font-black tracking-widest text-slate-900 py-2">${escapeHtml(masked)}</div>
          <div class="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto">
            ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(ch => `
              <button data-c="${ch}" ${guessed.has(ch) ? 'disabled' : ''} class="hr-k w-9 h-9 rounded-xl font-mono text-xs font-black cursor-pointer border ${guessed.has(ch) ? (clean.includes(ch) ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-100 text-rose-400 border-rose-200') : 'bg-white hover:bg-pink-600 hover:text-white border-slate-300'}">${ch}</button>`).join('')}
          </div>
        </div>
      </div>`;
    v.querySelectorAll('.hr-k').forEach(b => b.onclick = () => {
      const ch = b.dataset.c; guessed.add(ch);
      if (!clean.includes(ch)) balloons--;
      const won = clean.split('').every(c => !/[A-Z]/.test(c) || guessed.has(c));
      if (won) {
        score += 70; addUserGamePts(25); speak(w.word);
        triggerStreakFx(3, `🦛 Giải cứu Bé Hà Mã thành công ("${w.word}")!`);
        idx++; balloons = 6; guessed = new Set();
      } else if (balloons <= 0) {
        notify(`🎈 Nổ hết bóng! Từ đúng là "${w.word}" (${w.meaning})`);
        idx++; balloons = 6; guessed = new Set();
      }
      draw();
    });
  }
  draw();
}

// =========================================================================
// 21. LỐC XOÁY SẮP XẾP CÂU (SENTENCE TORNADO)
// =========================================================================
function renderSentenceTornado(v) {
  const words = getActiveGameWords();
  let idx = 0, score = 0, picked = [];
  let tokens = [], targetSent = '', curW = words[0];

  function setup() {
    curW = words[idx % words.length];
    targetSent = (curW.ex && curW.ex.length > 10) ? curW.ex : `We should practice ${curW.word} every single day.`;
    tokens = targetSent.split(/\s+/).map((t, i) => ({ t, i })).sort(() => Math.random() - 0.5);
    picked = [];
  }
  setup();

  function draw() {
    const built = picked.map(i => tokens[i].t).join(' ');
    v.innerHTML = `
      <div class="space-y-4 max-w-2xl mx-auto">
        ${arcadeTopBarHtml('🌪️', 'Lốc Xoáy Sắp Xếp Câu (Sentence Tornado)', `<span class="text-sky-700">${score} PTS</span>`)}
        <div class="travel-card p-6 space-y-4 text-center">
          <div class="text-xs font-extrabold text-sky-700">GHÉP LẠI CÂU CHỨA TỪ KHÓA: <span class="underline">${escapeHtml(curW.word)}</span> (${escapeHtml(curW.meaning)})</div>
          <div class="min-h-14 p-3.5 rounded-2xl bg-sky-50 border-2 border-sky-300 font-bold text-sm text-slate-900">${escapeHtml(built) || '<span class="text-slate-400 text-xs">Bấm từng từ bên dưới theo đúng trật tự ngữ pháp...</span>'}</div>
          <div class="flex flex-wrap justify-center gap-2">
            ${tokens.map((tk, ti) => `<button data-i="${ti}" ${picked.includes(ti) ? 'disabled' : ''} class="st-t px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer border ${picked.includes(ti) ? 'opacity-30 bg-slate-100' : 'bg-white border-sky-400 hover:bg-sky-600 hover:text-white shadow-sm'}">${escapeHtml(tk.t)}</button>`).join('')}
          </div>
          <div class="flex justify-center gap-2">
            <button id="st-back" class="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold cursor-pointer">⌫ Lùi 1 từ</button>
            <button id="st-spk" class="px-4 py-2 rounded-xl bg-teal-100 text-teal-900 text-xs font-bold cursor-pointer">🔊 Nghe câu mẫu</button>
          </div>
        </div>
      </div>`;
    document.getElementById('st-back').onclick = () => { picked.pop(); draw(); };
    document.getElementById('st-spk').onclick = () => speak(targetSent);
    v.querySelectorAll('.st-t').forEach(b => b.onclick = () => {
      picked.push(Number(b.dataset.i));
      if (picked.length === tokens.length) {
        const res = picked.map(i => tokens[i].t).join(' ');
        if (res.toLowerCase() === targetSent.toLowerCase()) {
          score += 65; addUserGamePts(22); speak(targetSent);
          notify('🌪️ Sắp xếp câu chuẩn ngữ pháp 100%!');
          idx++; setup();
        } else {
          notify(`✕ Câu chuẩn là: "${targetSent}"`);
          picked = [];
        }
      }
      draw();
    });
  }
  draw();
}

// =========================================================================
// 22. GỠ BOM TỪ VỰNG ĐẾM NGƯỢC (BOMB DEFUSE)
// =========================================================================
function renderBombDefuse(v) {
  const words = getActiveGameWords();
  const bd = { idx: 0, score: 0, combo: 0, timeLeft: 100 };
  v.innerHTML = `
    <div class="space-y-3 max-w-3xl mx-auto">
      ${arcadeTopBarHtml('💣', 'Gỡ Bom Từ Vựng Đếm Ngược', `<span id="bd-cb" class="text-orange-600">🔥 x0</span><span id="bd-sc" class="text-rose-600">0 PTS</span>`)}
      <div class="travel-card p-5 bg-slate-950 text-white space-y-4 border-2 border-rose-500">
        <div class="flex justify-between items-center text-xs font-mono">
          <span class="text-rose-400 font-extrabold">🧨 DÂY CHÁY CHẬM ĐANG ĐẾM NGƯỢC!</span>
          <span id="bd-tm" class="text-amber-300 font-black">10.0s</span>
        </div>
        <div class="h-3 rounded-full bg-slate-800 overflow-hidden"><div id="bd-bar" class="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-600" style="width:100%;"></div></div>
        <div id="bd-q" class="space-y-3 pt-1"></div>
      </div>
    </div>`;

  const wireCols = ['#ef4444', '#3b82f6', '#10b981', '#eab308'];
  function nextBomb() {
    bd.timeLeft = 100;
    const w = words[bd.idx % words.length]; bd.idx++;
    const opts = [w, ...getGameDistractors(w, 3)].sort(() => Math.random() - 0.5);
    const box = document.getElementById('bd-q');
    if (!box) return;
    box.innerHTML = `
      <div class="text-center space-y-1">
        <div class="text-xs text-slate-400">Cắt đúng sợi dây mang nghĩa của từ:</div>
        <div class="text-2xl font-black text-amber-300 font-mono">${escapeHtml(w.word)} <span class="text-xs text-slate-400">${escapeHtml(w.ipa || '')}</span></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-2.5">
        ${opts.map((o, i) => `<button data-ok="${o.word === w.word ? '1' : '0'}" style="border-color:${wireCols[i]};" class="bd-w p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border-2 text-left text-xs font-extrabold cursor-pointer">✂️ Dây ${i + 1}: ${escapeHtml(o.meaning)}</button>`).join('')}
      </div>`;
    box.querySelectorAll('.bd-w').forEach(b => b.onclick = () => {
      speak(w.word);
      if (b.dataset.ok === '1') {
        bd.combo++; bd.score += 50 * bd.combo; addUserGamePts(22);
        if (bd.combo >= 2) triggerStreakFx(bd.combo, `✂️ Gỡ bom thành công "${w.word}"!`);
      } else {
        bd.combo = 0; notify(`💥 NỔ TUNG! Dây đúng là: ${w.meaning}`);
      }
      document.getElementById('bd-cb').textContent = `🔥 x${bd.combo}`;
      document.getElementById('bd-sc').textContent = `${bd.score} PTS`;
      nextBomb();
    });
  }
  nextBomb();

  function tick() {
    const bar = document.getElementById('bd-bar');
    if (!bar) return;
    state.rafs.push(requestAnimationFrame(tick));
    bd.timeLeft -= 0.16;
    bar.style.width = Math.max(0, bd.timeLeft) + '%';
    const tm = document.getElementById('bd-tm');
    if (tm) tm.textContent = (Math.max(0, bd.timeLeft) / 10).toFixed(1) + 's';
    if (bd.timeLeft <= 0) { bd.combo = 0; notify('💥 Hết giờ! Sang quả bom tiếp theo!'); nextBomb(); }
  }
  state.rafs.push(requestAnimationFrame(tick));
}

// =========================================================================
// 23. AI LÀ TRIỆU PHÚ TIẾNG ANH (15 MỐC + 3 QUYỀN TRỢ GIÚP)
// =========================================================================
function renderMillionaire(v) {
  const words = getActiveGameWords();
  const prizes = ['100', '200', '300', '500', '1.000', '2.000', '4.000', '8.000', '16.000', '32.000', '64.000', '125.000', '250.000', '500.000', '1.000.000'];
  let step = 0, used50 = false, usedAud = false, usedAi = false, hiddenSet = new Set(), hintMsg = '';
  let curW = words[0], opts = [];

  function buildStep() {
    curW = words[(step * 3 + Math.floor(Math.random() * words.length)) % words.length];
    opts = [curW, ...getGameDistractors(curW, 3)].sort(() => Math.random() - 0.5);
    hiddenSet = new Set();
    hintMsg = '';
  }
  buildStep();

  function draw() {
    v.innerHTML = `
      <div class="space-y-4 max-w-4xl mx-auto">
        ${arcadeTopBarHtml('👑', 'Ai Là Triệu Phú Tiếng Anh (15 Mốc Vinh Quang)', `<span class="text-amber-500">Mốc ${step + 1}/15 • 🪙 ${prizes[step]} PTS</span>`)}
        <div class="grid lg:grid-cols-3 gap-4">
          <div class="lg:col-span-2 rounded-3xl p-6 text-white space-y-5 shadow-2xl border-2 border-amber-400/60" style="background:radial-gradient(circle at top,#1e3a8a,#020617);">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">CÂU HỎI SỐ ${step + 1}</span>
              <div class="flex gap-2 text-xs">
                <button id="ml-50" ${used50 ? 'disabled' : ''} class="px-3 py-1.5 rounded-xl bg-indigo-800 hover:bg-indigo-700 border border-amber-300/50 font-extrabold cursor-pointer disabled:opacity-35">50:50</button>
                <button id="ml-aud" ${usedAud ? 'disabled' : ''} class="px-3 py-1.5 rounded-xl bg-indigo-800 hover:bg-indigo-700 border border-amber-300/50 font-extrabold cursor-pointer disabled:opacity-35">📊 Khán giả</button>
                <button id="ml-ai" ${usedAi ? 'disabled' : ''} class="px-3 py-1.5 rounded-xl bg-indigo-800 hover:bg-indigo-700 border border-amber-300/50 font-extrabold cursor-pointer disabled:opacity-35">🤖 Tư vấn AI</button>
              </div>
            </div>
            <div class="p-5 rounded-2xl bg-indigo-950/90 border-2 border-amber-400/70 text-center space-y-1">
              <div class="text-xs text-sky-300">Từ tiếng Anh <strong class="font-mono text-base text-amber-300">"${escapeHtml(curW.word)}"</strong> ${escapeHtml(curW.ipa || '')} mang ý nghĩa chính xác là gì?</div>
            </div>
            ${hintMsg ? `<div class="p-3 rounded-xl bg-amber-400/15 border border-amber-300 text-xs text-amber-200 font-semibold">${escapeHtml(hintMsg)}</div>` : ''}
            <div class="grid sm:grid-cols-2 gap-3">
              ${opts.map((o, i) => hiddenSet.has(i)
                ? `<div class="p-3.5 rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-600 text-xs">-- Đã loại bỏ 50:50 --</div>`
                : `<button data-i="${i}" class="ml-o p-3.5 rounded-2xl bg-indigo-900/80 hover:bg-amber-400 hover:text-slate-950 border-2 border-sky-400/50 text-left text-xs font-extrabold cursor-pointer transition">💎 ${String.fromCharCode(65 + i)}: ${escapeHtml(o.meaning)}</button>`
              ).join('')}
            </div>
          </div>
          <div class="travel-card p-4 bg-slate-950 text-white space-y-1 text-xs">
            <div class="font-extrabold text-amber-300 pb-1 border-b border-slate-800">🏆 THÁP TIỀN THƯỞNG</div>
            ${[...prizes].reverse().map((p, ri) => {
              const realIdx = 14 - ri;
              const cur = realIdx === step;
              const milestone = realIdx === 4 || realIdx === 9 || realIdx === 14;
              return `<div class="px-2.5 py-1 rounded-lg flex justify-between font-mono ${cur ? 'bg-amber-400 text-slate-950 font-black' : milestone ? 'text-amber-300 font-bold' : 'text-slate-400'}"><span>Mốc ${realIdx + 1}</span><span>${p}</span></div>`;
            }).join('')}
          </div>
        </div>
      </div>`;

    document.getElementById('ml-50').onclick = () => {
      used50 = true;
      const wrongIdxs = opts.map((o, i) => o.word === curW.word ? -1 : i).filter(i => i >= 0).sort(() => Math.random() - 0.5).slice(0, 2);
      wrongIdxs.forEach(i => hiddenSet.add(i));
      draw();
    };
    document.getElementById('ml-aud').onclick = () => {
      usedAud = true;
      const rightLetter = String.fromCharCode(65 + opts.findIndex(o => o.word === curW.word));
      hintMsg = `📊 Khảo sát trường quay: 78% khán giả bình chọn phương án ${rightLetter}!`;
      draw();
    };
    document.getElementById('ml-ai').onclick = () => {
      usedAi = true;
      hintMsg = `🤖 Gemini Hydrogen gợi ý: Trong câu "${curW.ex || curW.word}", "${curW.word}" mang nghĩa "${curW.meaning}".`;
      draw();
    };
    v.querySelectorAll('.ml-o').forEach(b => b.onclick = () => {
      const picked = opts[Number(b.dataset.i)];
      speak(curW.word);
      if (picked.word === curW.word) {
        addUserGamePts(25);
        if (step >= 14) {
          triggerStreakFx(6, '👑 CHÚC MỪNG TRIỆU PHÚ TIẾNG ANH 1.000.000 PTS!');
          step = 0; used50 = false; usedAud = false; usedAi = false;
        } else {
          step++;
        }
        buildStep(); draw();
      } else {
        notify(`✕ Rất tiếc! "${curW.word}" có nghĩa là: ${curW.meaning}. Chơi lại từ Mốc 1!`);
        step = 0; used50 = false; usedAud = false; usedAi = false; buildStep(); draw();
      }
    });
  }
  draw();
}

// =========================================================================
// 24. ĐÚNG HAY SAI 60 GIÂY (TRUE / FALSE BLITZ)
// =========================================================================
function renderBlitzTf(v) {
  const words = getActiveGameWords();
  let score = 0, combo = 0, sec = 60, timer = null;
  let curW = words[0], shownMeaning = '', isTrue = true;

  function nextPair() {
    curW = words[Math.floor(Math.random() * words.length)];
    isTrue = Math.random() < 0.52;
    if (isTrue) shownMeaning = curW.meaning;
    else {
      const d = getGameDistractors(curW, 1)[0];
      shownMeaning = d ? d.meaning : 'nghĩa khác hoàn toàn';
      if (shownMeaning === curW.meaning) isTrue = true;
    }
  }
  nextPair();

  function draw() {
    v.innerHTML = `
      <div class="space-y-4 max-w-xl mx-auto">
        ${arcadeTopBarHtml('⚡', 'Đúng Hay Sai 60 Giây (True / False Blitz)', `<span id="tf-tm" class="text-rose-600">⏱ ${sec}s</span><span class="text-orange-600">🔥 x${combo}</span><span class="text-teal-700">${score} PTS</span>`)}
        <div class="travel-card p-6 text-center space-y-5 border-2 border-orange-400">
          ${sec <= 0 ? `
            <div class="text-4xl">🏁⚡</div>
            <h2 class="text-2xl font-black">Hết 60 Giây! Tổng Điểm: ${score} PTS</h2>
            <button id="tf-re" class="px-6 py-3 rounded-2xl bg-[var(--primary)] text-white font-extrabold text-xs cursor-pointer">🔄 Chơi Lại 60s</button>
          ` : `
            <div class="space-y-1">
              <div class="text-xs text-slate-400 font-bold uppercase">Cặp từ – nghĩa dưới đây ĐÚNG hay SAI?</div>
              <div class="text-3xl font-black text-slate-900 font-mono pt-1">${escapeHtml(curW.word)}</div>
              <div class="text-xs font-mono text-slate-500">${escapeHtml(curW.ipa || '')}</div>
              <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-lg font-extrabold text-amber-950 mt-2">= "${escapeHtml(shownMeaning)}" ?</div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button id="tf-yes" class="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base cursor-pointer shadow-lg">✓ ĐÚNG</button>
              <button id="tf-no" class="py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-base cursor-pointer shadow-lg">✕ SAI</button>
            </div>
          `}
        </div>
      </div>`;
    if (sec <= 0) {
      document.getElementById('tf-re').onclick = () => { clearInterval(timer); renderBlitzTf(v); };
      return;
    }
    const pick = (ans) => {
      speak(curW.word);
      if (ans === isTrue) {
        combo++; score += 30 * combo; addUserGamePts(12);
        if (combo >= 4 && combo % 4 === 0) triggerStreakFx(combo, '⚡ Phản xạ ánh sáng!');
      } else {
        combo = 0; notify(`✕ "${curW.word}" = ${curW.meaning}`);
      }
      nextPair(); draw();
    };
    document.getElementById('tf-yes').onclick = () => pick(true);
    document.getElementById('tf-no').onclick = () => pick(false);
  }

  timer = setInterval(() => {
    if (!document.getElementById('tf-tm')) { clearInterval(timer); return; }
    sec = Math.max(0, sec - 1);
    const el = document.getElementById('tf-tm');
    if (el) el.textContent = `⏱ ${sec}s`;
    if (sec <= 0) { clearInterval(timer); draw(); }
  }, 1000);
  draw();
}

function dispatchArcadeRouteV13(nav, v) {
  const map = {
    games: renderGamesHubV13,
    silksong: renderSilksongHD,
    archery: renderArcheryHD,
    shadow: renderShadowFightHD,
    offline: renderOfflineGame,
    match: renderMatch,
    listen_choose_vi: renderListenChooseVi,
    vi_to_en: renderViToEn,
    typing: renderTyping,
    galaxy_shooter: renderGalaxyShooter,
    f1_racer: renderF1Racer,
    deep_fishing: renderDeepFishing,
    wizard_td: renderWizardTd,
    bubble_pop: renderBubblePop,
    brick_breaker: renderBrickBreaker,
    dino_runner: renderDinoRunner,
    word_snake: renderWordSnake,
    vocab_wordle: renderVocabWordle,
    memory_flip: renderMemoryFlip,
    word_scramble: renderWordScramble,
    hippo_rescue: renderHippoRescue,
    sentence_tornado: renderSentenceTornado,
    bomb_defuse: renderBombDefuse,
    millionaire: renderMillionaire,
    blitz_tf: renderBlitzTf
  };
  return map[nav] ? (map[nav](v), true) : false;
}
