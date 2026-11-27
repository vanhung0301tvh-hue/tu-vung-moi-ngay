/* ============================================================================
 * TIẾNG ANH MỖI NGÀY v13 — GRAMMAR (100% LUYENNGUPHAP.COM + 180K+ BANK),
 * REDESIGNED HOME DASHBOARD & ROYAL 3D LEADERBOARD
 * ========================================================================== */

(function () {
  function ensureGrammarV13State() {
    if (!state.completedItems) state.completedItems = {};
    if (!state.completedItems.grammar) state.completedItems.grammar = {};
    if (!state.grView) state.grView = 'hub'; // 'hub' | 'path' | 'lesson' | 'bank'
    if (!state.grGroupFilter) state.grGroupFilter = 'ALL';
    if (!state.grPathId) state.grPathId = '';
    if (!state.grLessonId) state.grLessonId = '';
    if (!state.grLessonTab) state.grLessonTab = 'theory'; // 'theory' | 'exercises' | 'extra_bank'
    if (!state.grExAnswers) state.grExAnswers = {};
    if (!state.grExChecked) state.grExChecked = {};
    if (!state.grLessonSubmitted) state.grLessonSubmitted = {};
    if (!state.grUnitQuery) state.grUnitQuery = '';
    if (!state.grExtraBankSet) state.grExtraBankSet = {};
    if (!state.grExtraAnswers) state.grExtraAnswers = {};
    if (!state.grExtraChecked) state.grExtraChecked = {};
  }

  function getLnpGrammarPaths() {
    return Array.isArray(window.LNP_GRAMMAR_PATHS) ? window.LNP_GRAMMAR_PATHS : [];
  }

  function normalizeGrAns(s) {
    return String(s || '')
      .trim()
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/\s+/g, ' ')
      .replace(/[.?!,;]+$/g, '')
      .trim();
  }

  function isGrAnswerCorrect(userRaw, ansRaw) {
    const u = normalizeGrAns(userRaw);
    if (!u) return false;
    const variants = String(ansRaw || '').split('|').map(x => normalizeGrAns(x)).filter(Boolean);
    if (variants.includes(u)) return true;
    const expandContractions = (txt) => txt
      .replace(/\bdon't\b/g, 'do not')
      .replace(/\bdoesn't\b/g, 'does not')
      .replace(/\bdidn't\b/g, 'did not')
      .replace(/\bisn't\b/g, 'is not')
      .replace(/\baren't\b/g, 'are not')
      .replace(/\bwasn't\b/g, 'was not')
      .replace(/\bweren't\b/g, 'were not')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/\bcan't\b/g, 'cannot')
      .replace(/\bhaven't\b/g, 'have not')
      .replace(/\bhasn't\b/g, 'has not')
      .replace(/\bhadn't\b/g, 'had not')
      .replace(/\bit's\b/g, 'it is')
      .replace(/\bi'm\b/g, 'i am')
      .replace(/\bthey're\b/g, 'they are')
      .replace(/\bwe're\b/g, 'we are')
      .replace(/\byou're\b/g, 'you are');
    const uExp = expandContractions(u);
    return variants.some(v => expandContractions(v) === uExp);
  }

  function diffBarColor(diff) {
    const d = Number(diff) || 2;
    if (d <= 2) return '#10b981';
    if (d === 3) return '#f59e0b';
    if (d === 4) return '#f97316';
    return '#ef4444';
  }

  window.openLnpGrammarPath = function (pathId) {
    ensureGrammarV13State();
    state.grPathId = pathId;
    state.grUnitQuery = '';
    state.grView = 'path';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.openLnpGrammarLesson = function (pathId, lessonId, tab) {
    ensureGrammarV13State();
    state.grPathId = pathId;
    state.grLessonId = lessonId;
    state.grLessonTab = tab || 'theory';
    state.grView = 'lesson';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.pickGrMcq = function (exKey, val) {
    ensureGrammarV13State();
    state.grExAnswers[exKey] = val;
    state.grExChecked[exKey] = true;
    render();
  };

  window.onGrTextInput = function (exKey, val) {
    ensureGrammarV13State();
    state.grExAnswers[exKey] = val;
  };

  window.appendArrangeChip = function (exKey, chipText, inpId) {
    ensureGrammarV13State();
    const cur = String(state.grExAnswers[exKey] || '').trim();
    const next = cur ? (cur + ' ' + chipText) : chipText;
    state.grExAnswers[exKey] = next;
    const el = document.getElementById(inpId);
    if (el) el.value = next;
  };

  window.clearArrangeInput = function (exKey, inpId) {
    ensureGrammarV13State();
    state.grExAnswers[exKey] = '';
    delete state.grExChecked[exKey];
    const el = document.getElementById(inpId);
    if (el) el.value = '';
    render();
  };

  window.checkSingleGrEx = function (exKey) {
    ensureGrammarV13State();
    state.grExChecked[exKey] = true;
    render();
  };

  window.submitAllLnpLessonEx = function (lessonId) {
    ensureGrammarV13State();
    const paths = getLnpGrammarPaths();
    let ls = null;
    for (const p of paths) {
      const hit = (p.ls || []).find(x => x.id === lessonId);
      if (hit) { ls = hit; break; }
    }
    if (!ls) return;
    let right = 0;
    const total = (ls.e || []).length || 1;
    (ls.e || []).forEach((ex, idx) => {
      const k = `${lessonId}_${idx}`;
      state.grExChecked[k] = true;
      if (isGrAnswerCorrect(state.grExAnswers[k], ex.ans)) right++;
    });
    const pct = Math.round((right / total) * 100);
    const band = typeof pctToIeltsBand === 'function' ? pctToIeltsBand(pct) : (Math.round((4 + (pct / 100) * 5) * 2) / 2);
    state.grLessonSubmitted[lessonId] = { right, total, pct, band };
    state.completedItems.grammar[lessonId] = band;
    if (typeof saveLearningProgressNow === 'function') saveLearningProgressNow();
    if (state.currentUser && !isAdmin()) {
      state.currentUser.coins = (state.currentUser.coins || 0) + Math.max(8, right * 2);
      state.currentUser.grindPts = (state.currentUser.grindPts || 0) + Math.max(6, right);
      saveUsers();
      syncTopRankRewards();
    }
    notify(`🎉 Đã chấm xong bài học: Đúng ${right}/${total} câu (${pct}% • IELTS Band ${band})!`);
    render();
  };

  // Expanded 180,000+ Extra Grammar Question Bank Generator (MCQ + Fill + Error Correction)
  function buildExtraBankQuestions(seedKey, count = 25) {
    ensureGrammarV13State();
    const out = [];
    let h = 2166136261;
    const sStr = String(seedKey || 'default');
    for (let i = 0; i < sStr.length; i++) {
      h ^= sStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const baseSeed = (h >>> 0);
    for (let i = 0; i < count; i++) {
      const catNum = ((baseSeed + i * 7) % 24) + 1;
      const catId = `gr-${String(catNum).padStart(2, '0')}`;
      const qIdx = (baseSeed + i * 193) % 7500;
      const baseQ = typeof generateGrammarQuestion === 'function'
        ? generateGrammarQuestion(catId, qIdx)
        : null;
      if (!baseQ) continue;
      const rightOpt = baseQ.options[baseQ.answer];
      const mode = i % 3; // 0: MCQ, 1: Fill-in-blank, 2: Error identification
      if (mode === 0) {
        out.push({
          idx: i,
          tp: 'mcq',
          tag: `Trắc nghiệm • Chuyên đề #${catNum}`,
          q: baseQ.q,
          options: baseQ.options,
          ans: rightOpt,
          exp: baseQ.explain
        });
      } else if (mode === 1) {
        out.push({
          idx: i,
          tp: 'fill',
          tag: `Điền từ / Chia dạng đúng • Chuyên đề #${catNum}`,
          q: `${baseQ.q} <span class="text-teal-700 font-bold">(Gợi ý từ gốc/nhóm: ${baseQ.options.slice(0, 2).join(' / ')})</span>`,
          ans: rightOpt,
          exp: baseQ.explain
        });
      } else {
        const wrongOpt = baseQ.options.find((_, oi) => oi !== baseQ.answer) || baseQ.options[0];
        const errSentence = baseQ.q.replace('______', `<u class="text-rose-600 font-extrabold">${escapeHtml(wrongOpt)}</u>`);
        out.push({
          idx: i,
          tp: 'mcq',
          tag: `Tìm & sửa lỗi sai • Chuyên đề #${catNum}`,
          q: `Phần gạch chân trong câu sau đang sai ngữ pháp. Chọn phương án sửa đúng:<br>${errSentence}`,
          options: baseQ.options,
          ans: rightOpt,
          exp: `Lỗi sai "${wrongOpt}" cần sửa thành "${rightOpt}". ${baseQ.explain}`
        });
      }
    }
    return out;
  }

  window.rollNewExtraGrammarSet = function (key, count) {
    ensureGrammarV13State();
    const salt = `${key}_${Date.now()}`;
    state.grExtraBankSet[key] = buildExtraBankQuestions(salt, count || 25);
    Object.keys(state.grExtraAnswers).forEach(k => { if (k.startsWith(key + '_')) delete state.grExtraAnswers[k]; });
    Object.keys(state.grExtraChecked).forEach(k => { if (k.startsWith(key + '_')) delete state.grExtraChecked[k]; });
    notify(`🎲 Đã rút bộ ${count || 25} câu hỏi mới từ Ngân hàng 180.000+ câu ngữ pháp!`);
    render();
  };

  window.gradeExtraGrammarSet = function (key) {
    ensureGrammarV13State();
    const list = state.grExtraBankSet[key] || [];
    let right = 0;
    list.forEach(item => {
      const k = `${key}_${item.idx}`;
      state.grExtraChecked[k] = true;
      if (isGrAnswerCorrect(state.grExtraAnswers[k], item.ans)) right++;
    });
    const total = list.length || 1;
    const pct = Math.round((right / total) * 100);
    notify(`🏆 Ngân hàng mở rộng: Đúng ${right}/${total} câu (${pct}%)!`);
    render();
  };

  window.renderGrammarV13 = function (v) {
    ensureGrammarV13State();
    const paths = getLnpGrammarPaths();
    const totalLessons = paths.reduce((s, p) => s + (p.ls ? p.ls.length : 0), 0);
    const totalRealEx = paths.reduce((s, p) => s + (p.ls || []).reduce((ss, l) => ss + ((l.e || []).length), 0), 0);

    // 1. HUB VIEW (Giống 100% Screenshot 11–13 luyennguphap.com/grammar)
    if (state.grView === 'hub') {
      const groupsOrder = ['Ngữ pháp cơ bản', 'Destination', 'Ngữ pháp Toeic', 'Luyện thi THPT Quốc gia'];
      const filterTabs = ['ALL', ...groupsOrder, 'BANK_180K'];
      const qStr = (state.grammarQuery || '').trim().toLowerCase();

      v.innerHTML = `
        <div class="space-y-6">
          <div class="text-center space-y-2 pt-2">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-extrabold text-emerald-800">
              📐 CHUẨN 100% LUYENNGUPHAP.COM • ${paths.length} LỘ TRÌNH • ${totalLessons} BÀI HỌC • ${totalRealEx.toLocaleString('vi-VN')} BÀI TẬP SÁCH + NGÂN HÀNG 180.000+ CÂU
            </div>
            <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">LỘ TRÌNH HỌC NGỮ PHÁP</h1>
            <p class="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">Chọn lộ trình phù hợp với trình độ của bạn — đầy đủ lý thuyết, công thức, bài tập trắc nghiệm, điền từ, sửa lỗi, sắp xếp câu và giải thích chi tiết từng câu.</p>
          </div>

          <!-- Filter Pills (Giống hệt Screenshot 11) -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            ${filterTabs.map(tab => {
              const active = state.grGroupFilter === tab;
              const label = tab === 'ALL' ? 'Tất cả' : tab === 'BANK_180K' ? '🎲 Ngân hàng 180.000+ câu & 24 Cấu trúc' : tab;
              return `<button onclick="state.grGroupFilter='${tab}';render()" class="px-4 py-2 rounded-full text-xs font-extrabold cursor-pointer transition border ${active ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'}">${escapeHtml(label)}</button>`;
            }).join('')}
          </div>

          <div class="max-w-md mx-auto">
            <input type="text" value="${escapeHtml(state.grammarQuery || '')}" oninput="state.grammarQuery=this.value;render()" placeholder="🔍 Tìm lộ trình hoặc chuyên đề ngữ pháp (VD: Destination B1, TOEIC, Mạo từ, Đảo ngữ)..." class="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-medium shadow-sm focus:outline-none focus:border-teal-500" />
          </div>

          ${state.grGroupFilter !== 'BANK_180K' ? groupsOrder.filter(g => state.grGroupFilter === 'ALL' || state.grGroupFilter === g).map(grp => {
            const grpPaths = paths.filter(p => p.grp === grp && (!qStr || (p.n + ' ' + (p.d || '') + ' ' + p.ls.map(l => l.n).join(' ')).toLowerCase().includes(qStr)));
            if (!grpPaths.length) return '';
            return `
              <section class="space-y-3.5">
                <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h2 class="text-lg sm:text-xl font-black text-slate-900">${escapeHtml(grp)}</h2>
                  <span class="text-xs font-bold text-slate-500">${grpPaths.length} lộ trình</span>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  ${grpPaths.map(p => {
                    const lsCnt = (p.ls || []).length;
                    const exCnt = (p.ls || []).reduce((s, l) => s + ((l.e || []).length), 0);
                    const doneCnt = (p.ls || []).filter(l => state.completedItems.grammar[l.id]).length;
                    const diff = Number(p.diff) || 3;
                    const barCol = diffBarColor(diff);
                    return `
                      <div onclick="openLnpGrammarPath('${p.id}')" class="group bg-white rounded-3xl border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer flex flex-col">
                        <div class="h-44 bg-slate-50 overflow-hidden relative flex items-center justify-center">
                          ${p.img ? `<img src="${p.img}" alt="${escapeHtml(p.n)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />` : `<div class="text-4xl">📘</div>`}
                          <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white text-[10px] font-extrabold backdrop-blur-sm">${lsCnt} bài • ${exCnt} câu</span>
                        </div>
                        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <h3 class="font-black text-base text-slate-900 group-hover:text-teal-700 transition">${escapeHtml(p.n)}</h3>
                            ${p.d ? `<p class="text-xs text-slate-500 line-clamp-2 mt-1">${escapeHtml(p.d)}</p>` : `<p class="text-xs text-slate-500 mt-1">Trọn bộ ${lsCnt} chuyên đề lý thuyết & ${exCnt} câu hỏi thực hành có giải thích chi tiết.</p>`}
                          </div>
                          <div class="space-y-1.5 pt-1">
                            <div class="flex items-center justify-between text-[11px] font-extrabold text-slate-500">
                              <span>ĐỘ KHÓ</span>
                              <span style="color:${barCol}">${diff}/5 • Đã xong ${doneCnt}/${lsCnt}</span>
                            </div>
                            <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div class="h-full rounded-full transition-all" style="width:${Math.min(100, diff * 20)}%;background:${barCol};"></div>
                            </div>
                          </div>
                        </div>
                      </div>`;
                  }).join('')}
                </div>
              </section>`;
          }).join('') : ''}

          <!-- Extra 180,000+ Question Bank & 24 Core Grammar Structures Section -->
          <section class="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span class="px-3 py-1 rounded-full bg-teal-400/20 border border-teal-400/40 text-teal-200 text-[11px] font-extrabold">🚀 MỞ RỘNG ĐỘC QUYỀN • 180.000+ CÂU HỎI & ĐÁP ÁN</span>
                <h2 class="text-xl font-black mt-1.5">Ngân Hàng Câu Hỏi Ngữ Pháp Khổng Lồ (24 Chuyên Đề A1 → C2)</h2>
                <p class="text-xs text-slate-300 mt-0.5">Kết hợp Trắc nghiệm A/B/C/D, Tự luận chia động từ/điền từ & Tìm sửa lỗi sai — rút đề ngẫu nhiên không bao giờ trùng lặp!</p>
              </div>
              <button onclick="state.grView='bank';if(!state.grExtraBankSet['hub'])state.grExtraBankSet['hub']=null;rollNewExtraGrammarSet('hub',30)" class="px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg hover:scale-105 transition">
                🎲 Luyện Ngay Ngân Hàng 180.000+ Câu →
              </button>
            </div>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              ${(typeof GRAMMAR_LESSONS !== 'undefined' ? GRAMMAR_LESSONS : []).map(g => `
                <button onclick="state.grammarId='${g.id}';state.grView='bank';rollNewExtraGrammarSet('${g.id}',25)" class="text-left p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition cursor-pointer">
                  <div class="flex items-center justify-between text-[10px] font-extrabold text-teal-300">
                    <span>${escapeHtml(g.cefr)}</span>
                    <span>7.500+ câu</span>
                  </div>
                  <div class="font-bold text-xs text-white mt-0.5 line-clamp-1">${escapeHtml(g.title)}</div>
                </button>
              `).join('')}
            </div>
          </section>
        </div>`;
      return;
    }

    // 2. EXTRA 180,000+ BANK PRACTICE VIEW
    if (state.grView === 'bank') {
      const gr = (typeof GRAMMAR_LESSONS !== 'undefined' ? GRAMMAR_LESSONS.find(x => x.id === state.grammarId) || GRAMMAR_LESSONS[0] : null);
      const bankKey = gr ? gr.id : 'hub';
      if (!state.grExtraBankSet[bankKey]) {
        state.grExtraBankSet[bankKey] = buildExtraBankQuestions(bankKey, 25);
      }
      const list = state.grExtraBankSet[bankKey];
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <button onclick="state.grView='hub';render()" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold cursor-pointer hover:border-teal-500">← Quay lại Lộ trình Ngữ pháp</button>
            <div class="flex flex-wrap gap-2">
              <button onclick="rollNewExtraGrammarSet('${bankKey}',25)" class="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-extrabold cursor-pointer">🎲 Đổi bộ 25 câu mới</button>
              <button onclick="rollNewExtraGrammarSet('${bankKey}',50)" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-extrabold cursor-pointer">🔥 Rút đề 50 câu</button>
              <button onclick="gradeExtraGrammarSet('${bankKey}')" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer">✅ Chấm toàn bộ & Xem giải thích</button>
            </div>
          </div>

          ${gr ? `
            <div class="bg-white rounded-3xl border border-slate-200 p-5 space-y-2">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-extrabold">${escapeHtml(gr.cefr)} • ${escapeHtml(gr.group || 'Chuyên đề')}</span>
                <select onchange="state.grammarId=this.value;rollNewExtraGrammarSet(this.value,25)" class="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold">
                  ${GRAMMAR_LESSONS.map(item => `<option value="${item.id}" ${item.id === gr.id ? 'selected' : ''}>${escapeHtml(item.cefr)} — ${escapeHtml(item.title)}</option>`).join('')}
                </select>
              </div>
              <h2 class="text-lg font-black text-slate-900">${escapeHtml(gr.title)}</h2>
              <p class="text-xs text-slate-600">${escapeHtml(gr.summary || '')}</p>
              ${gr.formula ? `<div class="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-950">📌 Công thức: ${escapeHtml(gr.formula)}</div>` : ''}
            </div>` : ''}

          <div class="space-y-3">
            ${list.map((item, idx) => {
              const k = `${bankKey}_${item.idx}`;
              const userVal = state.grExtraAnswers[k] || '';
              const checked = !!state.grExtraChecked[k];
              const ok = checked && isGrAnswerCorrect(userVal, item.ans);
              return `
                <div class="bg-white rounded-2xl border ${checked ? (ok ? 'border-emerald-400 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20') : 'border-slate-200'} p-4 space-y-2.5 text-xs">
                  <div class="flex justify-between items-center">
                    <span class="font-extrabold text-slate-500">Câu ${idx + 1} • ${escapeHtml(item.tag)}</span>
                    ${checked ? `<span class="px-2.5 py-0.5 rounded-full font-extrabold ${ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${ok ? '✓ Chính xác' : '✕ Cần xem lại'}</span>` : ''}
                  </div>
                  <div class="text-sm font-bold text-slate-900 leading-relaxed">${item.q}</div>
                  ${item.tp === 'mcq' ? `
                    <div class="grid sm:grid-cols-2 gap-2">
                      ${item.options.map((opt, oi) => {
                        const picked = normalizeGrAns(userVal) === normalizeGrAns(opt);
                        const isRight = normalizeGrAns(opt) === normalizeGrAns(item.ans);
                        let cls = 'bg-slate-50 border-slate-200 hover:border-teal-400';
                        if (checked) {
                          if (isRight) cls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold';
                          else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
                        } else if (picked) cls = 'bg-teal-50 border-teal-500 font-bold';
                        return `<button onclick="state.grExtraAnswers['${k}']=${JSON.stringify(opt).replace(/"/g, '&quot;')};state.grExtraChecked['${k}']=true;render()" class="text-left px-3.5 py-2.5 rounded-xl border cursor-pointer transition ${cls}"><span class="inline-flex w-6 h-6 items-center justify-center rounded-md bg-white border border-slate-200 font-black mr-2">${String.fromCharCode(65 + oi)}</span>${escapeHtml(opt)}</button>`;
                      }).join('')}
                    </div>` : `
                    <div class="flex gap-2">
                      <input type="text" value="${escapeHtml(userVal)}" oninput="state.grExtraAnswers['${k}']=this.value" placeholder="Nhập đáp án tiếng Anh của bạn..." class="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold" />
                      <button onclick="state.grExtraChecked['${k}']=true;render()" class="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">Kiểm tra</button>
                    </div>`}
                  ${checked ? `
                    <div class="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 space-y-1">
                      <div><strong>Đáp án đúng:</strong> <span class="font-mono font-extrabold text-emerald-700">${escapeHtml(item.ans)}</span></div>
                      <div>💡 <strong>Giải thích:</strong> ${escapeHtml(item.exp)}</div>
                    </div>` : ''}
                </div>`;
            }).join('')}
          </div>
        </div>`;
      return;
    }

    // 3. PATH DETAIL VIEW (Danh sách các bài học trong 1 Lộ trình)
    const curPath = paths.find(p => p.id === state.grPathId) || paths[0];
    if (!curPath) { state.grView = 'hub'; renderGrammarV13(v); return; }

    if (state.grView === 'path') {
      const uq = (state.grUnitQuery || '').trim().toLowerCase();
      const lessons = (curPath.ls || []).filter(l => !uq || (l.n + ' ' + (l.d || '')).toLowerCase().includes(uq));
      const doneCnt = (curPath.ls || []).filter(l => state.completedItems.grammar[l.id]).length;

      v.innerHTML = `
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <button onclick="state.grView='hub';render()" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold cursor-pointer hover:border-teal-500">← Tất cả Lộ trình học</button>
            <span class="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">Đã hoàn thành ${doneCnt}/${(curPath.ls || []).length} bài</span>
          </div>

          <div class="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 flex flex-col md:flex-row gap-5 items-center shadow-sm">
            ${curPath.img ? `<img src="${curPath.img}" alt="${escapeHtml(curPath.n)}" class="w-full md:w-64 h-40 object-cover rounded-2xl shrink-0 bg-slate-50" />` : ''}
            <div class="space-y-2 flex-1">
              <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold">${escapeHtml(curPath.grp || 'Lộ trình ngữ pháp')}</span>
              <h1 class="text-2xl font-black text-slate-900">${escapeHtml(curPath.n)}</h1>
              <p class="text-xs sm:text-sm text-slate-600">${escapeHtml(curPath.d || `Lộ trình gồm ${(curPath.ls || []).length} bài học từ cơ bản đến nâng cao kèm bài tập thực hành có đáp án và giải thích tiếng Việt chi tiết.`)}</p>
              <input type="text" value="${escapeHtml(state.grUnitQuery)}" oninput="state.grUnitQuery=this.value;render()" placeholder="🔍 Tìm bài học / Unit trong lộ trình này..." class="w-full max-w-md px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs" />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3.5">
            ${lessons.map((ls, idx) => {
              const rCnt = Array.isArray(ls.r) ? ls.r.length : 0;
              const eCnt = Array.isArray(ls.e) ? ls.e.length : 0;
              const doneBand = state.completedItems.grammar[ls.id];
              return `
                <div onclick="openLnpGrammarLesson('${curPath.id}','${ls.id}','theory')" class="bg-white rounded-2xl border ${doneBand ? 'border-emerald-400' : 'border-slate-200 hover:border-teal-400'} p-4 cursor-pointer shadow-sm hover:shadow-md transition flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl ${doneBand ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'} font-black text-xs flex items-center justify-center shrink-0">${doneBand ? '✓' : idx + 1}</div>
                  <div class="min-w-0 flex-1 space-y-1">
                    <div class="font-extrabold text-sm text-slate-900 leading-snug">${escapeHtml(ls.n)}</div>
                    ${ls.d ? `<p class="text-xs text-slate-500 line-clamp-2">${escapeHtml(ls.d)}</p>` : ''}
                    <div class="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold">
                      <span class="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-700">📘 ${rCnt} mục lý thuyết</span>
                      <span class="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800">✍️ ${eCnt} câu bài tập</span>
                      ${doneBand ? `<span class="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800">🏆 Band ${doneBand}</span>` : ''}
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>`;
      return;
    }

    // 4. LESSON PRACTICE VIEW (Giống LessonPage của luyennguphap.com + Tab Ngân hàng mở rộng)
    const lsList = curPath.ls || [];
    const lsIdx = Math.max(0, lsList.findIndex(x => x.id === state.grLessonId));
    const ls = lsList[lsIdx] || lsList[0];
    if (!ls) { state.grView = 'path'; renderGrammarV13(v); return; }

    const rules = Array.isArray(ls.r) ? ls.r : [];
    const exs = Array.isArray(ls.e) ? ls.e : [];
    const subInfo = state.grLessonSubmitted[ls.id];
    const extraKey = `ls_${ls.id}`;

    v.innerHTML = `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button onclick="state.grView='path';render()" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold cursor-pointer hover:border-teal-500">← ${escapeHtml(curPath.n)}</button>
            <button onclick="state.grView='hub';render()" class="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer">Lộ trình</button>
          </div>
          <div class="flex items-center gap-1.5 text-xs">
            ${lsIdx > 0 ? `<button onclick="openLnpGrammarLesson('${curPath.id}','${lsList[lsIdx - 1].id}','${state.grLessonTab}')" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-bold cursor-pointer">← Bài trước</button>` : ''}
            ${lsIdx < lsList.length - 1 ? `<button onclick="openLnpGrammarLesson('${curPath.id}','${lsList[lsIdx + 1].id}','${state.grLessonTab}')" class="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">Bài tiếp →</button>` : ''}
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-extrabold">${escapeHtml(curPath.n)} • Bài ${lsIdx + 1}/${lsList.length}</span>
            ${subInfo ? `<span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">🏆 Đã chấm: ${subInfo.right}/${subInfo.total} câu (${subInfo.pct}% • Band ${subInfo.band})</span>` : ''}
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900">${escapeHtml(ls.n)}</h1>
          ${ls.d ? `<p class="text-xs sm:text-sm text-slate-600">${escapeHtml(ls.d)}</p>` : ''}

          <div class="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
            <button onclick="state.grLessonTab='theory';render()" class="px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${state.grLessonTab === 'theory' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}">📘 Lý thuyết & Công thức (${rules.length})</button>
            <button onclick="state.grLessonTab='exercises';render()" class="px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${state.grLessonTab === 'exercises' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}">✍️ Bài tập chuẩn sách (${exs.length} câu)</button>
            <button onclick="state.grLessonTab='extra_bank';if(!state.grExtraBankSet['${extraKey}'])rollNewExtraGrammarSet('${extraKey}',20);else render();" class="px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${state.grLessonTab === 'extra_bank' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}">🎲 Luyện thêm Ngân hàng mở rộng (+20 câu/lần)</button>
          </div>
        </div>

        ${state.grLessonTab === 'theory' ? `
          <div class="space-y-4">
            ${rules.length ? rules.map((r, ri) => `
              <div class="bg-white rounded-3xl border border-slate-200 p-5 space-y-2.5 shadow-sm">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-teal-600 text-white font-black text-xs flex items-center justify-center">${ri + 1}</span>
                  <h3 class="text-base font-black text-slate-900">${escapeHtml(r.t || `Mục lý thuyết ${ri + 1}`)}</h3>
                </div>
                <div class="prose prose-sm max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">${r.c || ''}</div>
              </div>`).join('') : `<div class="bg-white rounded-2xl p-6 text-center text-xs text-slate-500">Bài học này tập trung thực hành trực tiếp qua ${exs.length} câu hỏi bên dưới.</div>`}
            <div class="flex justify-end">
              <button onclick="state.grLessonTab='exercises';render();window.scrollTo({top:0,behavior:'smooth'})" class="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black cursor-pointer shadow-lg">Chuyển sang Làm ${exs.length} Câu Bài Tập →</button>
            </div>
          </div>
        ` : state.grLessonTab === 'exercises' ? `
          <div class="space-y-3.5">
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span class="font-bold text-amber-950">💡 Làm lần lượt từng câu (bấm <strong>Kiểm tra</strong> để xem giải thích ngay) hoặc làm hết rồi bấm <strong>Nộp cả bài</strong>.</span>
              <button onclick="submitAllLnpLessonEx('${ls.id}')" class="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold cursor-pointer shadow">✅ Nộp cả bài (${exs.length} câu)</button>
            </div>

            ${exs.map((ex, idx) => {
              const exKey = `${ls.id}_${idx}`;
              const userVal = state.grExAnswers[exKey] || '';
              const checked = !!state.grExChecked[exKey];
              const ok = checked && isGrAnswerCorrect(userVal, ex.ans);
              const isMcq = ex.tp === 'multiple_choice' && (ex.a || ex.b || ex.c || ex.d);
              const isArrange = ex.tp === 'arrange_words';
              const inpId = `gr-inp-${idx}`;

              // Extract word chips for arrange_words
              let chips = [];
              if (isArrange) {
                const rawAfterColon = String(ex.q || '').includes(':') ? String(ex.q).split(':').slice(1).join(':') : String(ex.q || '');
                chips = rawAfterColon.replace(/<[^>]+>/g, ' ').split('/').map(s => s.trim()).filter(Boolean);
              }

              return `
                <div class="bg-white rounded-2xl border ${checked ? (ok ? 'border-emerald-400 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20') : 'border-slate-200'} p-4 sm:p-5 space-y-3 text-xs shadow-sm">
                  <div class="flex items-center justify-between gap-2">
                    <span class="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-extrabold">Câu ${idx + 1}/${exs.length} • ${isMcq ? 'Trắc nghiệm' : isArrange ? 'Sắp xếp câu' : 'Điền từ / Viết lại câu'}</span>
                    ${checked ? `<span class="px-2.5 py-0.5 rounded-full font-extrabold ${ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${ok ? '✓ Đúng' : '✕ Sai'}</span>` : ''}
                  </div>

                  <div class="text-sm font-bold text-slate-900 leading-relaxed">${ex.q || ''}</div>

                  ${isMcq ? `
                    <div class="grid sm:grid-cols-2 gap-2">
                      ${['a', 'b', 'c', 'd'].filter(k => ex[k] !== null && ex[k] !== undefined && String(ex[k]).trim() !== '').map((k, oi) => {
                        const optTxt = String(ex[k]);
                        const picked = normalizeGrAns(userVal) === normalizeGrAns(optTxt);
                        const isRight = isGrAnswerCorrect(optTxt, ex.ans);
                        let cls = 'bg-slate-50 border-slate-200 hover:border-teal-400';
                        if (checked) {
                          if (isRight) cls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold';
                          else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
                        } else if (picked) {
                          cls = 'bg-teal-50 border-teal-500 font-bold';
                        }
                        return `<button onclick='pickGrMcq(${JSON.stringify(exKey)}, ${JSON.stringify(optTxt)})' class="text-left px-3.5 py-2.5 rounded-xl border cursor-pointer transition flex items-center gap-2.5 ${cls}">
                          <span class="w-6 h-6 rounded-md bg-white border border-slate-200 font-black flex items-center justify-center shrink-0">${String.fromCharCode(65 + oi)}</span>
                          <span>${escapeHtml(optTxt)}</span>
                        </button>`;
                      }).join('')}
                    </div>
                  ` : `
                    ${isArrange && chips.length ? `
                      <div class="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                        ${chips.map(ch => `<button type="button" onclick='appendArrangeChip(${JSON.stringify(exKey)}, ${JSON.stringify(ch)}, ${JSON.stringify(inpId)})' class="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-teal-500 font-bold text-slate-800 cursor-pointer shadow-sm">+ ${escapeHtml(ch)}</button>`).join('')}
                        <button type="button" onclick='clearArrangeInput(${JSON.stringify(exKey)}, ${JSON.stringify(inpId)})' class="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold cursor-pointer">↺ Xóa</button>
                      </div>` : ''}
                    ${!isMcq && !isArrange && ex.a ? `<div class="text-[11px] text-amber-800 font-semibold">💡 Gợi ý / Từ cần chú ý: <strong>${escapeHtml(ex.a)}</strong></div>` : ''}
                    <div class="flex flex-wrap sm:flex-nowrap gap-2">
                      <input id="${inpId}" type="text" value="${escapeHtml(userVal)}" oninput='onGrTextInput(${JSON.stringify(exKey)}, this.value)' onkeydown="if(event.key==='Enter'){event.preventDefault();checkSingleGrEx('${exKey}');}" placeholder="Nhập câu trả lời của bạn rồi nhấn Enter hoặc Kiểm tra..." class="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:border-teal-500" />
                      <button type="button" onclick="checkSingleGrEx('${exKey}')" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-extrabold cursor-pointer shrink-0">Kiểm tra</button>
                    </div>
                  `}

                  ${checked ? `
                    <div class="p-3.5 rounded-xl bg-teal-50/90 border border-teal-200 text-slate-800 space-y-1">
                      <div>✅ <strong>Đáp án chuẩn:</strong> <span class="font-mono font-extrabold text-emerald-700">${escapeHtml(String(ex.ans || '').split('|').join('  HOẶC  '))}</span></div>
                      ${ex.exp ? `<div>📖 <strong>Giải thích chi tiết:</strong> ${escapeHtml(ex.exp)}</div>` : ''}
                    </div>` : ''}
                </div>`;
            }).join('')}

            <div class="flex justify-center pt-2">
              <button onclick="submitAllLnpLessonEx('${ls.id}')" class="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black cursor-pointer shadow-xl">🏆 Nộp Toàn Bộ ${exs.length} Câu & Chấm Điểm</button>
            </div>
          </div>
        ` : `
          <div class="space-y-3">
            <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span class="font-bold text-indigo-950">🎲 Bộ câu hỏi mở rộng bổ trợ thêm cho bài <strong>${escapeHtml(ls.n)}</strong>:</span>
              <div class="flex gap-2">
                <button onclick="rollNewExtraGrammarSet('${extraKey}',20)" class="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold cursor-pointer">🎲 Đổi 20 câu khác</button>
                <button onclick="gradeExtraGrammarSet('${extraKey}')" class="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold cursor-pointer">✅ Chấm bộ mở rộng</button>
              </div>
            </div>
            ${(state.grExtraBankSet[extraKey] || []).map((item, idx) => {
              const k = `${extraKey}_${item.idx}`;
              const userVal = state.grExtraAnswers[k] || '';
              const checked = !!state.grExtraChecked[k];
              const ok = checked && isGrAnswerCorrect(userVal, item.ans);
              return `
                <div class="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 text-xs">
                  <div class="font-extrabold text-slate-500">Câu mở rộng ${idx + 1} • ${escapeHtml(item.tag)}</div>
                  <div class="text-sm font-bold text-slate-900">${item.q}</div>
                  ${item.tp === 'mcq' ? `
                    <div class="grid sm:grid-cols-2 gap-2">
                      ${item.options.map((opt, oi) => `<button onclick="state.grExtraAnswers['${k}']=${JSON.stringify(opt).replace(/"/g, '&quot;')};state.grExtraChecked['${k}']=true;render()" class="text-left px-3 py-2 rounded-xl border cursor-pointer ${checked && normalizeGrAns(opt) === normalizeGrAns(item.ans) ? 'bg-emerald-100 border-emerald-500 font-bold' : 'bg-slate-50 border-slate-200'}">${String.fromCharCode(65 + oi)}. ${escapeHtml(opt)}</button>`).join('')}
                    </div>` : `
                    <div class="flex gap-2">
                      <input type="text" value="${escapeHtml(userVal)}" oninput="state.grExtraAnswers['${k}']=this.value" placeholder="Nhập đáp án..." class="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200" />
                      <button onclick="state.grExtraChecked['${k}']=true;render()" class="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">Chấm</button>
                    </div>`}
                  ${checked ? `<div class="p-2.5 rounded-xl ${ok ? 'bg-emerald-50 text-emerald-900' : 'bg-rose-50 text-rose-900'}"><strong>Đáp án:</strong> ${escapeHtml(item.ans)} — ${escapeHtml(item.exp)}</div>` : ''}
                </div>`;
            }).join('')}
          </div>
        `}
      </div>`;
  };

  // ===========================================================================
  // REDESIGNED HOME DASHBOARD V13 (BENTO HERO + 5 READING MASCOTS + 24 GAMES)
  // ===========================================================================
  window.renderHomeV13 = function (v) {
    const u = state.currentUser;
    const ranked = typeof getRankedRealUsers === 'function' ? getRankedRealUsers().slice(0, 3) : [];
    const totalWords = typeof ATLAS_TOPICS !== 'undefined' ? ATLAS_TOPICS.reduce((s, t) => s + (t.words || 0), 0) : 7075;
    const aiLabel = typeof getActiveAiEngineBadgeText === 'function' ? getActiveAiEngineBadgeText() : '⚡ Gemini 4 Hydrogen';

    const readingMascots = [
      { mode: 'article', title: 'Đọc báo song ngữ', count: '3.000 bài', bg: 'from-amber-50 to-orange-50 border-amber-200', badge: 'bg-amber-500', icon: '🦊📰' },
      { mode: 'thpt', title: 'Đề thi THPT Quốc Gia', count: '500 đề', bg: 'from-emerald-50 to-teal-50 border-emerald-200', badge: 'bg-emerald-600', icon: '🎓📘' },
      { mode: 'basic', title: 'Đọc hiểu A1 – A2', count: '500 đề', bg: 'from-pink-50 to-rose-50 border-pink-200', badge: 'bg-rose-500', icon: '🐰🌸' },
      { mode: 'toeic', title: 'TOEIC Part 5 – 7', count: '700 đề', bg: 'from-sky-50 to-blue-50 border-sky-200', badge: 'bg-sky-600', icon: '🦉💼' },
      { mode: 'ielts', title: 'Cambridge & IELTS Reading', count: '820+ đề', bg: 'from-red-50 to-orange-50 border-red-200', badge: 'bg-red-600', icon: '🦁🎯' }
    ];

    const coreSkills = [
      { nav: 'listening', icon: '🎧', name: 'Luyện Nghe Video', stat: '250+ Video chuẩn LNP', desc: 'Chép chính tả 3 cấp độ • Shadowing IPA • Bài tập', grad: 'from-teal-500 to-emerald-600', done: Object.keys(state.completedItems.listening || {}).length },
      { nav: 'speaking', icon: '🗣️', name: 'Luyện Nói Gia Sư AI', stat: '408+ Phòng hội thoại', desc: 'Mic trực tiếp • Sửa phát âm & ngữ pháp từng lượt', grad: 'from-sky-500 to-indigo-600', done: Object.keys(state.completedItems.speaking || {}).length },
      { nav: 'reading', icon: '📚', name: 'Luyện Đọc Toàn Diện', stat: '5.520+ Báo & Đề thi', desc: 'Song ngữ • THPT • A1-A2 • TOEIC • IELTS Split-Pane', grad: 'from-amber-500 to-orange-600', done: Object.keys(state.completedItems.reading || {}).length },
      { nav: 'writing', icon: '✍️', name: 'Luyện Viết IELTS & Dịch', stat: '540+ Đề + 120 Paraphrase', desc: 'Biểu đồ trực quan • Dịch theo Band • Viết từng đoạn', grad: 'from-purple-500 to-pink-600', done: Object.keys(state.completedItems.writing || {}).length },
      { nav: 'grammar', icon: '📐', name: 'Lộ Trình Ngữ Pháp', stat: '18 Lộ trình • 180.000+ câu', desc: 'Destination B1/B2/C1 • TOEIC • THPT • Giải thích chi tiết', grad: 'from-rose-500 to-red-600', done: Object.keys(state.completedItems.grammar || {}).length },
      { nav: 'vocab', icon: '🌱', name: 'Từ Vựng & Lộ Trình CEFR', stat: `283 Chủ đề (${totalWords.toLocaleString('vi-VN')} từ)`, desc: 'Flashcard IPA • Lặp lại ngắt quãng • Sổ từ cá nhân', grad: 'from-emerald-500 to-cyan-600', done: (state.learnedWords || []).length }
    ];

    v.innerHTML = `
      <div class="space-y-6">
        <!-- BENTO ROYAL HERO -->
        <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-2xl" style="background:linear-gradient(135deg,#042f2e 0%,#0f766e 48%,#0369a1 100%);">
          <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-20 pointer-events-none" style="background:radial-gradient(circle,#fde047,transparent 70%);"></div>
          <div class="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-7 space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-extrabold border border-white/25">✨ SIÊU NỀN TẢNG HỌC TIẾNG ANH TOÀN DIỆN v13</span>
                <button onclick="openHydrogenAiConfigModal()" class="px-3 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/50 text-amber-200 text-[11px] font-extrabold cursor-pointer transition">${escapeHtml(aiLabel)} ⚙️</button>
              </div>
              <h1 class="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
                Chinh Phục <span class="text-amber-300">IELTS • TOEIC • THPT</span> Với Kho Đề Khổng Lồ & AI Thế Hệ Mới
              </h1>
              <p class="text-xs sm:text-sm text-teal-50/90 leading-relaxed max-w-2xl">
                Đồng bộ đám mây thời gian thực Laptop ↔ Điện thoại • <strong>5.520+</strong> bài Đọc & Đề thi • <strong>18</strong> Lộ trình Ngữ pháp & <strong>180.000+</strong> câu hỏi • <strong>540+</strong> đề Viết IELTS • <strong>24</strong> Trò chơi đồ họa HD!
              </p>
              <div class="flex flex-wrap gap-2.5 pt-1">
                <button onclick="state.rdCatMode='home';go('reading')" class="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm cursor-pointer shadow-xl transition">📚 Vào Luyện Đọc (5.520+ Đề)</button>
                <button onclick="state.grView='hub';go('grammar')" class="px-5 py-3 rounded-2xl bg-white hover:bg-teal-50 text-teal-950 font-black text-xs sm:text-sm cursor-pointer shadow-xl transition">📐 Học 18 Lộ Trình Ngữ Pháp</button>
                <button onclick="go('games')" class="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-extrabold text-xs sm:text-sm cursor-pointer transition">🎮 Chơi 24 Game HD</button>
              </div>
            </div>

            <!-- User Passport Card -->
            <div class="lg:col-span-5 bg-slate-950/45 backdrop-blur-md border border-white/20 rounded-3xl p-5 space-y-3.5">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-teal-400 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 overflow-hidden shadow-lg">
                    ${u ? (u.avatar ? `<img src="${u.avatar}" class="w-full h-full object-cover"/>` : escapeHtml(u.name.slice(0, 1).toUpperCase())) : '✈️'}
                  </div>
                  <div class="min-w-0">
                    <div class="font-black text-sm sm:text-base truncate">${u ? nameWithBadge(u) : 'Khách Du Lịch Học Tập'}</div>
                    <div class="text-[11px] text-teal-200 font-mono truncate">${u ? `ID: ${u.accountCode} • Gói ${getEffectivePlan().toUpperCase()}` : 'Đăng nhập để đồng bộ tiến độ đa thiết bị'}</div>
                  </div>
                </div>
                ${u ? `<button onclick="go('pricing')" class="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-[11px] font-black cursor-pointer shrink-0">👑 Nâng gói</button>` : `<button onclick="openAuth('login')" class="px-3.5 py-2 rounded-xl bg-teal-400 text-slate-950 text-xs font-black cursor-pointer shrink-0">🔐 Đăng nhập</button>`}
              </div>

              <div class="grid grid-cols-3 gap-2 text-center">
                <div class="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                  <div class="text-base sm:text-lg font-black text-amber-300">🔥 ${u ? (u.streak || 1) : 0}</div>
                  <div class="text-[10px] text-teal-100 font-semibold">Ngày Streak</div>
                </div>
                <div class="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                  <div class="text-base sm:text-lg font-black text-emerald-300">🪙 ${u ? (u.coins || 0).toLocaleString('vi-VN') : 0}</div>
                  <div class="text-[10px] text-teal-100 font-semibold">Xu Tích Lũy</div>
                </div>
                <div class="p-2.5 rounded-2xl bg-white/10 border border-white/10">
                  <div class="text-base sm:text-lg font-black text-sky-300">⚔️ ${u ? (u.grindPts || 0) : 0}</div>
                  <div class="text-[10px] text-teal-100 font-semibold">Điểm Đua Top</div>
                </div>
              </div>

              <div class="flex items-center justify-between text-[11px] pt-1 text-teal-100">
                <span>🎯 Kỳ thi mục tiêu: <strong>${escapeHtml(state.selectedExam || 'IELTS')}</strong></span>
                <button onclick="go('music')" class="underline font-bold text-amber-300 cursor-pointer">🎵 Bật nhạc nền khi học →</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 READING MASCOT QUICK HUBS -->
        <section class="space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-base sm:text-lg font-black text-slate-900">📚 5 Chuyên Mục Luyện Đọc Chuẩn Quốc Tế (5.520+ Bài & Đề Thi)</h2>
            <button onclick="state.rdCatMode='home';go('reading')" class="text-xs font-extrabold text-teal-700 hover:underline cursor-pointer">Mở toàn bộ →</button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            ${readingMascots.map(m => `
              <div onclick="go('reading');if(typeof selectReadingHubCategory==='function')selectReadingHubCategory('${m.mode}');" class="bg-gradient-to-br ${m.bg} border rounded-3xl p-4 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition flex flex-col justify-between gap-2">
                <div class="flex items-center justify-between">
                  <span class="text-2xl">${m.icon}</span>
                  <span class="px-2 py-0.5 rounded-full ${m.badge} text-white text-[10px] font-extrabold">${m.count}</span>
                </div>
                <div class="font-black text-xs sm:text-sm text-slate-900 leading-snug">${m.title}</div>
              </div>`).join('')}
          </div>
        </section>

        <!-- 6 CORE SKILLS BENTO GRID -->
        <section class="space-y-3">
          <h2 class="text-base sm:text-lg font-black text-slate-900">🚀 6 Trụ Cột Kỹ Năng Chấm Điểm Bằng AI</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${coreSkills.map(s => `
              <div onclick="go('${s.nav}')" class="group bg-white rounded-3xl border border-slate-200 hover:border-teal-400 p-5 cursor-pointer shadow-sm hover:shadow-xl transition flex flex-col justify-between gap-3">
                <div class="flex items-start justify-between gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${s.grad} text-white text-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition">${s.icon}</div>
                  <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-extrabold">${s.stat}</span>
                </div>
                <div>
                  <h3 class="font-black text-base text-slate-900 group-hover:text-teal-700 transition">${s.name}</h3>
                  <p class="text-xs text-slate-500 mt-1 leading-relaxed">${s.desc}</p>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-extrabold">
                  <span class="text-emerald-700">✓ Đã chinh phục: ${s.done}</span>
                  <span class="text-teal-700 group-hover:translate-x-1 transition">Vào học ngay →</span>
                </div>
              </div>`).join('')}
          </div>
        </section>

        <!-- FEATURED 24 HD ARCADE GAMES + TOP 3 PODIUM PREVIEW -->
        <div class="grid lg:grid-cols-12 gap-5 items-stretch">
          <div class="lg:col-span-7 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 flex flex-col justify-between gap-4 shadow-xl">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span class="px-2.5 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-200 text-[10px] font-extrabold">🕹️ KHO 24 TRÒ CHƠI TỪ VỰNG ĐỒ HỌA HD MỚI</span>
                <h3 class="text-xl font-black mt-1">Vừa Chơi Game Đồ Họa Neon Vừa Thuộc Lòng Từ Vựng</h3>
              </div>
              <button onclick="go('games')" class="px-4 py-2 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-white text-xs font-black cursor-pointer">Mở 24 Game →</button>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              ${[
                { id: 'silksong', icon: '🕷️', n: 'Hollow Knight Silksong HD' },
                { id: 'galaxy_shooter', icon: '🚀', n: 'Phi Thuyền Ngân Hà' },
                { id: 'f1_racer', icon: '🏎️', n: 'Đua Xe F1 Nitro' },
                { id: 'wizard_td', icon: '🏰', n: 'Thủ Thành Pháp Sư' },
                { id: 'deep_fishing', icon: '🎣', n: 'Câu Cá Đại Dương' },
                { id: 'dino_runner', icon: '🦖', n: 'Khủng Long Cyber' },
                { id: 'millionaire', icon: '👑', n: 'Ai Là Triệu Phú' },
                { id: 'bomb_defuse', icon: '💣', n: 'Gỡ Bom Đếm Ngược' }
              ].map(g => `
                <button onclick="go('${g.id}')" class="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-left cursor-pointer transition">
                  <div class="text-xl">${g.icon}</div>
                  <div class="font-extrabold text-[11px] mt-1 line-clamp-1">${g.n}</div>
                </button>`).join('')}
            </div>
          </div>

          <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between gap-3 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">🏆 ĐẤU TRƯỜNG XẾP HẠNG</span>
                <h3 class="text-lg font-black text-slate-900">Top 1 – 3 Nhận Đặc Quyền ULTRA</h3>
              </div>
              <button onclick="go('leaderboard')" class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold cursor-pointer">Xem BXH →</button>
            </div>
            <div class="space-y-2">
              ${ranked.length ? ranked.map((ru, idx) => `
                <div class="p-3 rounded-2xl border ${idx === 0 ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50 border-slate-200'} flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="text-lg">${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                    ${avatarHtml(ru, 34)}
                    <div class="min-w-0">
                      <div class="font-extrabold truncate">${nameWithBadge(ru)}</div>
                      <div class="text-[10px] text-slate-500">💎 Đặc quyền Top ${idx + 1}</div>
                    </div>
                  </div>
                  <div class="font-mono font-black text-slate-800 shrink-0">🔥 ${ru.streak || 0} • 🪙 ${(ru.coins || 0).toLocaleString('vi-VN')}</div>
                </div>`).join('') : `<div class="text-xs text-slate-500 py-6 text-center">Hãy đăng nhập & luyện tập để ghi danh lên Bục Vinh Quang!</div>`}
            </div>
          </div>
        </div>
      </div>`;
  };

  // ===========================================================================
  // REDESIGNED LEADERBOARD V13 (3D PODIUM + MULTI-CATEGORY TABS + MY POSITION)
  // ===========================================================================
  window.renderLeaderboardV13 = function (v) {
    syncTopRankRewards();
    if (!state.lbTab) state.lbTab = 'overall';
    const realUsers = (state.users || []).filter(u => u.status === 'active' && !u.isAdmin);

    const scoreOf = (u, tab) => {
      if (tab === 'streak') return u.streak || 0;
      if (tab === 'coins') return u.coins || 0;
      if (tab === 'games') return (u.grindPts || 0) * 12 + Math.round((u.coins || 0) * 0.4);
      if (tab === 'duel') return 1000 + (u.grindPts || 0) * 8 + (u.streak || 0) * 15;
      // overall composite score matching getRankedRealUsers priority
      return (u.streak || 0) * 1000 + (u.coins || 0) + (u.grindPts || 0) * 25;
    };

    const sorted = state.lbTab === 'overall'
      ? getRankedRealUsers()
      : [...realUsers].sort((a, b) => scoreOf(b, state.lbTab) - scoreOf(a, state.lbTab));

    const [r1, r2, r3, ...rest] = sorted.slice(0, 30);
    const me = state.currentUser && !state.currentUser.isAdmin ? state.currentUser : null;
    const myIdx = me ? sorted.findIndex(x => x.id === me.id) : -1;

    const tabs = [
      { id: 'overall', label: '🏆 Tổng hợp (Xét thưởng ULTRA)' },
      { id: 'streak', label: '🔥 Chuỗi Streak' },
      { id: 'games', label: '🕹️ Cao thủ 24 Game' },
      { id: 'coins', label: '🪙 Phú hộ Kho Xu' },
      { id: 'duel', label: '⚔️ Điểm Đấu Trường' }
    ];

    const metricBadge = (u) => {
      if (state.lbTab === 'streak') return `🔥 ${u.streak || 0} ngày liên tiếp`;
      if (state.lbTab === 'coins') return `🪙 ${(u.coins || 0).toLocaleString('vi-VN')} xu`;
      if (state.lbTab === 'games') return `🕹️ ${scoreOf(u, 'games').toLocaleString('vi-VN')} điểm Arcade`;
      if (state.lbTab === 'duel') return `⚔️ ${scoreOf(u, 'duel').toLocaleString('vi-VN')} Elo`;
      return `🔥 ${u.streak || 0} ngày • 🪙 ${(u.coins || 0).toLocaleString('vi-VN')} xu`;
    };

    v.innerHTML = `
      <div class="space-y-6">
        <!-- Royal Leaderboard Header -->
        <div class="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl" style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#311042 100%);">
          <div class="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1.5">
              <span class="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[11px] font-extrabold">👑 ĐẠI SẢNH DANH VỌNG • CẬP NHẬT ĐÁM MÂY THỜI GIAN THỰC</span>
              <h1 class="text-2xl sm:text-3xl font-black">Bảng Xếp Hạng Học Viên Xuất Sắc</h1>
              <p class="text-xs sm:text-sm text-indigo-200 max-w-2xl">Top 1, Top 2, Top 3 ở bảng Tổng hợp tự động nhận <strong>Huy hiệu Vàng / Bạc / Đồng</strong> và mở khóa <strong>Đặc quyền Gói 💎 ULTRA</strong> miễn phí (khi rớt khỏi Top 3 sẽ tự động quay về gói gốc).</p>
            </div>
            ${me ? `
              <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-xs space-y-1 min-w-56">
                <div class="text-indigo-200 font-bold uppercase text-[10px]">Thứ hạng hiện tại của bạn</div>
                <div class="text-2xl font-black text-amber-300">${myIdx >= 0 ? `Hạng #${myIdx + 1}` : 'Chưa xếp hạng'}</div>
                <div class="font-mono text-white">${metricBadge(me)}</div>
              </div>` : `
              <button onclick="openAuth('register')" class="px-5 py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg">✨ Tạo tài khoản đua Top ngay</button>
            `}
          </div>

          <div class="relative z-10 flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/15">
            ${tabs.map(t => `<button onclick="state.lbTab='${t.id}';render()" class="px-4 py-2 rounded-full text-xs font-extrabold cursor-pointer transition ${state.lbTab === t.id ? 'bg-amber-400 text-slate-950 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'}">${t.label}</button>`).join('')}
          </div>
        </div>

        ${!sorted.length ? `
          <div class="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
            <div class="text-4xl">🏆</div>
            <h2 class="text-base font-extrabold">Chưa có học viên nào trên bảng xếp hạng</h2>
            <button onclick="openAuth('register')" class="px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-extrabold cursor-pointer">Đăng ký mở tài khoản đầu tiên</button>
          </div>` : `
          <!-- 3D ILLUMINATED PODIUM -->
          <div class="grid md:grid-cols-3 gap-4 items-end pt-2">
            <!-- TOP 2 SILVER -->
            ${r2 ? `
              <div class="order-2 md:order-1 bg-gradient-to-b from-slate-50 to-slate-200/80 border-2 border-slate-300 rounded-3xl p-6 flex flex-col items-center text-center gap-2.5 shadow-lg relative">
                <div class="text-3xl">🥈</div>
                <span class="px-3 py-0.5 rounded-full bg-slate-700 text-white text-[11px] font-black">Á QUÂN • TOP 2</span>
                <div class="ring-4 ring-slate-300 rounded-full">${avatarHtml(r2, 64)}</div>
                <div class="font-black text-base text-slate-900">${nameWithBadge(r2)}</div>
                <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold">💎 ĐẶC QUYỀN TOP ULTRA</span>
                <div class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 font-mono font-extrabold text-xs text-slate-800 w-full">${metricBadge(r2)}</div>
              </div>` : '<div></div>'}

            <!-- TOP 1 GOLD CHAMPION -->
            ${r1 ? `
              <div class="order-1 md:order-2 rounded-3xl p-7 flex flex-col items-center text-center gap-3 shadow-2xl border-2 border-amber-400 text-white relative md:-translate-y-3" style="background:linear-gradient(160deg,#451a03 0%,#78350f 45%,#0f172a 100%);">
                <div class="text-4xl animate-bounce">👑</div>
                <span class="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 text-slate-950 text-xs font-black shadow">🥇 QUÁN QUÂN • TOP 1</span>
                <div class="ring-4 ring-amber-400 rounded-full shadow-xl">${avatarHtml(r1, 78)}</div>
                <div class="font-black text-lg text-amber-200">${nameWithBadge(r1)}</div>
                <span class="px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-200 text-[11px] font-extrabold">💎 ĐẶC QUYỀN ULTRA VÔ ĐỊCH</span>
                <div class="px-4 py-2 rounded-2xl bg-black/35 border border-amber-400/40 font-mono font-black text-xs text-amber-300 w-full">${metricBadge(r1)}</div>
              </div>` : ''}

            <!-- TOP 3 BRONZE -->
            ${r3 ? `
              <div class="order-3 bg-gradient-to-b from-orange-50 to-amber-100/70 border-2 border-amber-300 rounded-3xl p-6 flex flex-col items-center text-center gap-2.5 shadow-lg relative">
                <div class="text-3xl">🥉</div>
                <span class="px-3 py-0.5 rounded-full bg-amber-800 text-white text-[11px] font-black">QUÝ QUÂN • TOP 3</span>
                <div class="ring-4 ring-amber-300 rounded-full">${avatarHtml(r3, 64)}</div>
                <div class="font-black text-base text-slate-900">${nameWithBadge(r3)}</div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 text-[10px] font-extrabold">💎 ĐẶC QUYỀN TOP ULTRA</span>
                <div class="px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 font-mono font-extrabold text-xs text-slate-800 w-full">${metricBadge(r3)}</div>
              </div>` : '<div></div>'}
          </div>

          <!-- FULL RANKED TABLE (#4 -> #30) -->
          ${rest.length ? `
            <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div class="px-5 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <span>Hạng & Học viên</span>
                <span>Thành tích tích lũy</span>
              </div>
              <div class="divide-y divide-slate-100">
                ${rest.map((u, idx) => {
                  const isMe = me && u.id === me.id;
                  return `
                    <div class="px-5 py-3.5 flex items-center justify-between gap-3 text-xs ${isMe ? 'bg-teal-50/70 font-bold' : 'hover:bg-slate-50'} transition">
                      <div class="flex items-center gap-3.5 min-w-0">
                        <span class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-mono font-black flex items-center justify-center shrink-0">#${idx + 4}</span>
                        ${avatarHtml(u, 36)}
                        <div class="min-w-0">
                          <div class="font-extrabold text-slate-900 truncate">${nameWithBadge(u)} ${isMe ? '<span class="ml-1 px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px]">Bạn</span>' : ''}</div>
                          <div class="text-[11px] text-slate-500">Gói ${escapeHtml((u.planTier || 'free').toUpperCase())}</div>
                        </div>
                      </div>
                      <div class="font-mono font-extrabold text-slate-800 shrink-0">${metricBadge(u)}</div>
                    </div>`;
                }).join('')}
              </div>
            </div>` : ''}
        `}
      </div>`;
  };
})();
