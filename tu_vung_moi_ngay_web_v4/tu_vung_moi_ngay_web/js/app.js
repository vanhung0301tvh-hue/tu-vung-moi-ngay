// Index real EN-VI words by CEFR for Parts 2..N deterministic 25-word slicing
    const REAL_WORDS_BY_CEFR = {};
    ATLAS_TOPICS.forEach(t => {
      if (!REAL_WORDS_BY_CEFR[t.cefr]) REAL_WORDS_BY_CEFR[t.cefr] = [];
      REAL_WORDS_BY_CEFR[t.cefr].push(...t.bank);
    });

    const BANK_INFO = {
      bankCode: 'VPB', bankBin: '970432', bankName: 'VPBank (Ngân hàng TMCP Việt Nam Thịnh Vượng)',
      stk: '0779176786', owner: 'TRAN VAN HUNG', portal: 'https://vietqr.net/', zalo: '0779176786'
    };

    const PLAN_PRICES = {
      pro:   { 1: 15000, 3: 45000, 6: 50000, 12: 80000 },
      ultra: { 1: 30000, 3: 70000, 6: 90000, 12: 99000 }
    };

    const ALL_CURRICULUM_WORDS = PROGRAMS.flatMap(p => p.topics.flatMap(t => t.words));

    function getAtlasPartWords(topic, partNo) {
      const p = Math.max(1, Math.min(topic.parts, Number(partNo) || 1));
      const bank = topic.bank || [];
      const out = [];
      if (p === 1 && bank.length >= 25) {
        bank.slice(0, 25).forEach(([word, ipa, pos, meaning]) => out.push({ word, ipa, pos, meaning, ex: `Practice "${word}" in ${topic.name}.` }));
        return out;
      }
      const pool = REAL_WORDS_BY_CEFR[topic.cefr] || ATLAS_TOPICS.flatMap(t => t.bank);
      const start = ((p * 37 + topic.slug.length * 23) % Math.max(1, pool.length - 26));
      for (let i = 0; i < 25; i++) {
        const entry = pool[(start + i * 7) % pool.length];
        out.push({ word: entry[0], ipa: entry[1], pos: entry[2], meaning: entry[3], ex: `Example with "${entry[0]}" (${topic.name} — Phần ${p}).` });
      }
      return out;
    }

    const state = {
      nav: 'home',
      progTab: 'IELTS',
      cefrFilter: 'ALL',
      openTopicId: null,
      openAtlasSlug: null,
      openAtlasPart: null,
      atlasPage: 1,
      atlasFilter: '',
      openCourseSlug: null,
      // Game Hub Cascading State + Excluded Memorized Words
      gmMode: 'roadmap',      // 'roadmap' | 'learned'
      gmTrack: 'IELTS',       // 'IELTS' | 'TOEIC' | 'THPT' | 'GENERAL'
      gmCefr: 'ALL',
      gmTopicSlug: atlas_topics_default_slug('IELTS'),
      gmPart: 1,
      gmChecklistOpen: false,
      excludeMemorized: true,
      excludedWords: {},     // wordLower -> true
      gameSourceKey: `atlas:${ATLAS_TOPICS[0].slug}:1`,
      billingMonths: 1,
      activeOrder: null,
      orders: [],
      completedAtlasParts: {},
      completedLessons: {},
      personalWords: [
        { word:'perseverance', ipa:'/ˌpɜː.sɪˈvɪə.rəns/', pos:'n.', meaning:'sự kiên trì, bền bỉ', ex:'Daily perseverance builds fluent English.', srs:4 },
        { word:'breakthrough', ipa:'/ˈbreɪk.θruː/', pos:'n.', meaning:'bước đột phá', ex:'Active recall was a major breakthrough in vocabulary.', srs:3 },
        { word:'eloquent', ipa:'/ˈel.ə.kwənt/', pos:'adj.', meaning:'hùng hồn, lưu loát', ex:'She gave an eloquent IELTS Speaking presentation.', srs:2 },
        { word:'meticulous', ipa:'/məˈtɪk.jə.ləs/', pos:'adj.', meaning:'tỉ mỉ, kỹ lưỡng', ex:'Meticulous notes prevent careless exam errors.', srs:2 },
        { word:'ubiquitous', ipa:'/juːˈbɪk.wɪ.təs/', pos:'adj.', meaning:'phổ biến khắp nơi', ex:'AI tools are ubiquitous in modern education.', srs:5 },
        { word:'resilient', ipa:'/rɪˈzɪl.jənt/', pos:'adj.', meaning:'kiên cường, phục hồi nhanh', ex:'Resilient learners grow from every mistake.', srs:1 },
        { word:'streamline', ipa:'/ˈstriːm.laɪn/', pos:'v.', meaning:'tinh gọn, tối ưu hóa', ex:'AI roadmaps streamline your daily review.', srs:3 },
        { word:'indispensable', ipa:'/ˌɪn.dɪˈspen.sə.bəl/', pos:'adj.', meaning:'không thể thiếu', ex:'Strong vocabulary is indispensable for 9-10 THPT.', srs:4 },
      ],
      aiPersonalRoadmap: {
        goal: 'Chinh phục IELTS 8.0, TOEIC 900+ & THPT 9–10',
        level: 'B1–B2',
        daily: 25,
        stages: [
          { stage:1, days:'Ngày 1–3', title:'Thành thạo Sổ Từ Vựng Của Bản Thân', source:'myvocab', srs:'SRS 10 phút → 1 ngày → 3 ngày', focus:'Ghi nhớ sâu các từ bạn tự lưu + từ Gemini 3.8 Flash bổ sung' },
          { stage:2, days:'Ngày 4–7', title:'[IELTS B2] Đô thị hóa & Siêu đô thị — Phần 1 (25 từ)', source:'atlas:ielts-b2-urbanisation-megacities:1', srs:'SRS Ngày 1 → 3 → 7', focus:'Chủ đề trọng tâm IELTS Writing Task 2' },
          { stage:3, days:'Ngày 8–11', title:'[TOEIC B1] Hóa đơn & Thanh toán — Phần 1 (25 từ)', source:'atlas:toeic-b1-invoices-billing:1', srs:'SRS Ngày 3 → 7 → 14', focus:'Thực chiến TOEIC 850–990 công sở' },
          { stage:4, days:'Ngày 12–15', title:'[THPT B2] Trí tuệ Nhân tạo (AI) Lớp 12 — Phần 1 (25 từ)', source:'atlas:thpt-b2-artificial-intelligence:1', srs:'Ôn tổng hợp 12 Game', focus:'Bứt phá 9.5–10 điểm Đề THPT mới' },
        ]
      },
      user: {
        id: 1, accountCode: 'TVMN100001', name:'Khách Học Viên', email:'guest@tuvungmoingay.vn', role:'user', provider:'Chế độ Khách',
        googleEmail: '', fbEmail: '', avatar:'',
        streak:15, elo:1085, monthlyDays:14, grindPts:1890, loungeOptIn:false,
        planTier: 'free',
        planExpires: '',
        dailyWordsLearned: 12,
        dailyLimit: 50
      },
      opponent: { id: 7, name:'Tường Vy • 12 Chuyên Anh', elo:1095, streak:15, monthlyDays:15, grindPts:1960, color:'#be185d' },
      users: [
        { id:1, accountCode:'TVMN100001', name:'Khách Học Viên', email:'guest@tuvungmoingay.vn', role:'user', planTier:'free', streak:15, coins:580, elo:1085, color:'#0d9488', status:'active', me:true },
        { id:2, accountCode:'TVMN100002', name:'Khánh Linh • IELTS 8.5', email:'linh.ielts@gmail.com', role:'user', planTier:'ultra', streak:88, coins:2850, elo:1520, color:'#d97706', status:'active' },
        { id:3, accountCode:'TVMN100003', name:'Quang Đức • TOEIC 960', email:'duc.toeic@gmail.com', role:'user', planTier:'pro', streak:74, coins:2340, elo:1410, color:'#0284c7', status:'active' },
        { id:4, accountCode:'TVMN100004', name:'Phương Thảo • Thủ Khoa', email:'thao.thpt@facebook.com', role:'user', planTier:'pro', streak:63, coins:1980, elo:1320, color:'#e11d48', status:'active' },
        { id:5, accountCode:'TVMN100005', name:'Huy Hoàng • AI Engineer', email:'hoang.dev@gmail.com', role:'user', planTier:'ultra', streak:51, coins:1620, elo:1240, color:'#15803d', status:'active' },
        { id:6, accountCode:'TVMN100006', name:'Bảo Ngọc • SAT 1560', email:'ngoc.sat@tuvungmoingay.vn', role:'user', planTier:'pro', streak:45, coins:1480, elo:1180, color:'#0d9488', status:'active' },
        { id:7, accountCode:'TVMN100007', name:'Tường Vy • 12 Chuyên Anh', email:'vy.vocab@gmail.com', role:'user', planTier:'free', streak:33, coins:1120, elo:1095, color:'#be185d', status:'active' },
        { id:8, accountCode:'TVMN100008', name:'Thành Nam • MBA', email:'nam.biz@facebook.com', role:'user', planTier:'ultra', streak:39, coins:1290, elo:1125, color:'#0d9488', status:'active' },
        { id:9, accountCode:'TVMN100009', name:'Gia Khang • Dev', email:'khang.code@tuvungmoingay.vn', role:'user', planTier:'free', streak:27, coins:960, elo:1070, color:'#0891b2', status:'active' },
        { id:10, accountCode:'TVMN100010', name:'Ngọc Mai • Y Dược', email:'mai.med@gmail.com', role:'user', planTier:'pro', streak:22, coins:810, elo:1045, color:'#0284c7', status:'active' },
        { id:11, accountCode:'TVMN100011', name:'Thu Hiền • Luật Quốc tế', email:'hien.law@tuvungmoingay.vn', role:'user', planTier:'free', streak:14, coins:520, elo:980, color:'#334155', status:'active' },
      ],
      reports: [
        { id:1, targetId:11, targetName:'Thu Hiền • Luật Quốc tế', reporter:'Tường Vy • 12 Chuyên Anh', context:'lounge', category:'harassment', catLabel:'Làm phiền / Quấy rối', details:'Gửi tin nhắn spam liên tục trong phòng giao lưu (mẫu kiểm thử).', status:'pending', action:'' }
      ],
      duelMsgs: [
        { senderId:7, senderName:'Tường Vy • 12 Chuyên Anh', type:'text', text:'Chào bạn! Tháng này mình cùng đua chuyên cần & ôn từ THPT 9–10 nhé 🔥' },
      ],
      loungeMsgs: [
        { senderId:2, senderName:'Khánh Linh • IELTS 8.5', type:'text', text:'Chào mừng vào phòng IELTS26 (Ultra)! Bạn có thể mở Cam/Mic hoặc gửi đoạn thoại luyện phát âm nhé!' },
      ],
      pendingReportTarget: null,
      adminTab: 'orders',
      learnedWords: ALL_CURRICULUM_WORDS.slice(0, 18),
      offlineBest: Number(localStorage.getItem('tvmn_preview_oq_best') || 0),
      geminiConnected: false,
      geminiModel: 'gemini-3.8-flash',
      promptIdx: 0,
      rafs: [],
      localStream: null,
      audioCtx: null,
      recorder: null,
      recStream: null,
      // New features state
      duelSimulateDay1: false,
      duelLastMatchedMonth: '',
      weeklyQuiz: {
        completedWeek: localStorage.getItem('tvmn_weekly_quiz_week') || '',
        lastScore: Number(localStorage.getItem('tvmn_weekly_quiz_score') || 0),
        questions: [],
        idx: 0,
        score: 0,
        answered: false,
        finished: false
      },
      roadmapStartDates: JSON.parse(localStorage.getItem('tvmn_rm_starts') || '{}'),
      activeCert: null,
      certRaf: null,
      loungePartnerId: 2,
      loungeCamOn: false,
      loungeMicOn: false,
      loungeMeterRaf: null,
      webAccounts: JSON.parse(localStorage.getItem('tvmn_web_accounts') || '[]'),
      firstAdmin: (localStorage.getItem('tvmn_first_admin') || '').toLowerCase(),
    };
    // Initialize basePlanTier & restore persisted accounts/admin
    state.users.forEach(u => { u.basePlanTier = u.planTier || 'free'; });
    state.webAccounts.forEach((acc, i) => {
      const isFirst = state.firstAdmin && acc.email.toLowerCase() === state.firstAdmin;
      acc.role = isFirst ? 'admin' : 'user';
      if (!state.users.some(u => u.email.toLowerCase() === acc.email.toLowerCase())) {
        state.users.push({
          id: 500 + i, accountCode: acc.accountCode, name: acc.name, email: acc.email,
          role: acc.role, planTier: 'free', basePlanTier: 'free',
          streak: 1, coins: 100, elo: 1000, color: isFirst ? '#dc2626' : '#0d9488', status: 'active', me: false
        });
      }
    });
    state.user.basePlanTier = state.user.planTier || 'free';
    state.user.topRank = 0;
    state.user.ultraFromTop = false;

    function atlas_topics_default_slug(track) {
      const hit = ATLAS_TOPICS.find(t => t.track === track);
      return hit ? hit.slug : ATLAS_TOPICS[0].slug;
    }

    // Mouse-tracking color-shifting spotlight for all .hover-box elements
    document.addEventListener('pointermove', (e) => {
      const box = e.target.closest?.('.hover-box');
      if (!box) return;
      const r = box.getBoundingClientRect();
      box.style.setProperty('--mx', Math.round(e.clientX - r.left) + 'px');
      box.style.setProperty('--my', Math.round(e.clientY - r.top) + 'px');
    }, { passive: true });

    // Global instant search across 283 Topics + 7,075 embedded EN-VI words
    function onGlobalSearch(raw) {
      const drop = document.getElementById('top-search-drop');
      const q = (raw || '').trim().toLowerCase();
      if (!q) { drop.classList.add('hidden'); return; }
      const tHits = ATLAS_TOPICS.filter(t => (t.name + ' ' + t.desc + ' ' + t.track + ' ' + t.cefr).toLowerCase().includes(q)).slice(0, 6);
      const wHits = [];
      for (const t of ATLAS_TOPICS) {
        for (const w of t.bank) {
          if (w[0].toLowerCase().includes(q) || w[3].toLowerCase().includes(q)) {
            wHits.push({ word: w[0], ipa: w[1], pos: w[2], meaning: w[3], slug: t.slug, tname: t.name });
            if (wHits.length >= 8) break;
          }
        }
        if (wHits.length >= 8) break;
      }
      if (!tHits.length && !wHits.length) {
        drop.innerHTML = `<div class="p-3 text-xs text-[var(--muted-foreground)]">Không tìm thấy "${q}". Thử gõ IELTS, TOEIC, THPT, C1, family, invoice...</div>`;
        drop.classList.remove('hidden');
        return;
      }
      drop.innerHTML =
        (tHits.length ? `<div class="px-3 py-1.5 text-xs font-extrabold bg-[var(--content)] text-[var(--primary)]">🎯 Chủ đề khớp ngay (${tHits.length})</div>` +
          tHits.map(t => `<div onclick="document.getElementById('top-search-drop').classList.add('hidden');state.progTab='${t.track}';state.openAtlasSlug='${t.slug}';state.openAtlasPart=null;state.atlasPage=1;state.nav='roadmaps';render()" class="px-3 py-2 flex justify-between items-center gap-2 cursor-pointer hover:bg-[var(--content)] text-xs"><div><strong>${t.name}</strong><div class="text-[var(--muted-foreground)] truncate">${t.desc}</div></div><span class="font-mono font-bold text-[var(--primary)] shrink-0">${t.parts} phần</span></div>`).join('') : '') +
        (wHits.length ? `<div class="px-3 py-1.5 text-xs font-extrabold bg-[var(--content)] text-[var(--primary)]">📖 Từ vựng khớp ngay (${wHits.length})</div>` +
          wHits.map(w => `<div onclick="speak('${w.word.replace(/'/g,'')}');document.getElementById('top-search-drop').classList.add('hidden');state.progTab='IELTS';state.nav='roadmaps';openAtlasPartView('${w.slug}',1)" class="px-3 py-2 flex justify-between items-center gap-2 cursor-pointer hover:bg-[var(--content)] text-xs"><div><strong>${w.word}</strong> <span class="font-mono text-[var(--muted-foreground)]">${w.ipa}</span> — <span class="text-[var(--primary)] font-semibold">${w.meaning}</span></div><span class="text-[var(--muted-foreground)] shrink-0">🔊 Mở Phần 1</span></div>`).join('') : '');
      drop.classList.remove('hidden');
    }
    document.addEventListener('click', (e) => {
      if (!e.target.closest?.('#top-quick-search') && !e.target.closest?.('#top-search-drop')) {
        document.getElementById('top-search-drop')?.classList.add('hidden');
      }
    });

    function openZaloModal() { document.getElementById('zalo-modal').classList.remove('hidden'); }

    // --- TOP 1, 2, 3 BADGES (VÀNG / BẠC / ĐỒNG) + AUTO ULTRA (MẤT TOP = MẤT GÓI) ---
    function getSortedLeaderboardUsers() {
      return state.users.filter(u => u.status === 'active').sort((a, b) => b.streak - a.streak || b.coins - a.coins);
    }

    function syncTopRankRewards() {
      const ranked = getSortedLeaderboardUsers();
      const rankMap = {};
      ranked.forEach((u, i) => { rankMap[u.id] = i + 1; });

      state.users.forEach(u => {
        if (!u.basePlanTier) u.basePlanTier = u.planTier || 'free';
        const r = rankMap[u.id] || 999;
        u.topRank = r <= 3 ? r : 0;
        if (r <= 3) {
          u.planTier = 'ultra';
          u.ultraFromTop = true;
        } else {
          u.planTier = u.basePlanTier;
          u.ultraFromTop = false;
        }
        if (u.me) {
          const prevFromTop = state.user.ultraFromTop;
          state.user.topRank = u.topRank;
          state.user.planTier = u.planTier;
          state.user.basePlanTier = u.basePlanTier;
          state.user.ultraFromTop = u.ultraFromTop;
          state.user.streak = u.streak;
          state.user.coins = u.coins;
          if (state.user.planTier !== 'ultra') state.user.loungeOptIn = false;
          if (prevFromTop && !u.ultraFromTop && u.basePlanTier !== 'ultra') {
            notify('⚠️ Bạn đã rớt khỏi Top 1–3! Huy hiệu và gói Ultra thưởng Top đã tự động bị thu hồi.');
          }
        }
      });
    }

    function rankBadgeHtml(u) {
      const r = u?.topRank || 0;
      if (r === 1) return `<span class="badge-gold inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">🥇 Vàng</span>`;
      if (r === 2) return `<span class="badge-silver inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">🥈 Bạc</span>`;
      if (r === 3) return `<span class="badge-bronze inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">🥉 Đồng</span>`;
      return '';
    }

    function isCurrentUserAdmin() {
      return Boolean(
        state.firstAdmin &&
        state.user.role === 'admin' &&
        state.user.email &&
        state.user.email.toLowerCase() === state.firstAdmin.toLowerCase()
      );
    }

    function adminBadgeHtml(u) {
      if (u && u.role === 'admin' && state.firstAdmin && (u.email || '').toLowerCase() === state.firstAdmin.toLowerCase()) {
        return `<span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold text-white shrink-0" style="background:#dc2626;">🛡️ ADMIN</span>`;
      }
      return '';
    }

    function nameWithBadge(u) {
      return `<span class="inline-flex items-center gap-1 flex-wrap"><span>${u.name}</span>${adminBadgeHtml(u)}${rankBadgeHtml(u)}</span>`;
    }

    // --- SỐ LƯỢNG NGƯỜI ĐANG SỬ DỤNG LỘ TRÌNH ---
    function getTopicLearnerCount(slug) {
      let h = 0;
      for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
      return 420 + (Math.abs(h) % 2850);
    }

    function getTrackLearnerCount(trackId) {
      const base = { IELTS: 42680, TOEIC: 28450, THPT: 51920, GENERAL: 14310 };
      return (base[trackId] || 12500) + state.users.filter(u => u.status === 'active').length;
    }

    // --- KIỂM TRA ÔN TỪ VỰNG BẮT BUỘC HÀNG TUẦN (FREE & PRO) ---
    function getCurrentWeekKey() {
      const d = new Date();
      const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const dayNum = target.getUTCDay() || 7;
      target.setUTCDate(target.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((target - yearStart) / 86400000) + 1) / 7);
      return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
    }

    function isWeeklyQuizMandatoryForUser() {
      return state.user.planTier === 'free' || state.user.planTier === 'pro';
    }

    function needsWeeklyMandatoryTest() {
      return isWeeklyQuizMandatoryForUser() && state.weeklyQuiz.completedWeek !== getCurrentWeekKey();
    }

    function enforceWeeklyMandatoryTest() {
      if (needsWeeklyMandatoryTest()) {
        notify('📝 Tài khoản Thường & Pro bắt buộc hoàn thành 1 bài Kiểm tra ôn từ vựng trong tuần này trước khi tiếp tục học/chơi game!');
        state.nav = 'weekly_quiz';
        render();
        return false;
      }
      return true;
    }

    function canSkipRoadmap() { return state.user.planTier === 'pro' || state.user.planTier === 'ultra'; }
    function canUseLounge() { return state.user.planTier === 'ultra'; }
    function checkFreeDailyCap(addCount = 0) {
      if (state.user.planTier !== 'free') return true;
      if (state.user.dailyWordsLearned >= 50) {
        notify('⚠️ Bản Thường giới hạn tối đa 50 từ/ngày! Vui lòng liên hệ Admin qua Zalo 0779176786 hoặc gửi yêu cầu nâng cấp gói qua Mã ID.');
        go('pricing');
        return false;
      }
      if (addCount > 0) {
        state.user.dailyWordsLearned = Math.min(50, state.user.dailyWordsLearned + addCount);
        syncSidebar();
      }
      return true;
    }
    function copyText(txt, msg = 'Đã sao chép') {
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).catch(()=>{});
      notify(`${msg}: ${txt}`);
    }
    function fmtVnd(n) { return Number(n||0).toLocaleString('vi-VN') + 'đ'; }

    function toggleExcludeWord(word) {
      const k = String(word || '').toLowerCase();
      if (state.excludedWords[k]) {
        delete state.excludedWords[k];
        notify(`↩ Đã khôi phục "${word}" trở lại danh sách chơi game!`);
      } else {
        state.excludedWords[k] = true;
        notify(`✓ Đã đánh dấu "${word}" là Đã nhớ (bỏ khỏi game)!`);
      }
      render();
    }

    function cleanup() {
      state.rafs.forEach(id => cancelAnimationFrame(id));
      state.rafs = [];
      if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
      if (state.audioCtx) { try { state.audioCtx.close(); } catch {} state.audioCtx = null; }
      if (state.recStream) { state.recStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.recStream = null; }
      if (state.loungeMeterRaf) { cancelAnimationFrame(state.loungeMeterRaf); state.loungeMeterRaf = null; }
      state.loungeCamOn = false;
      state.loungeMicOn = false;
    }

    function speak(w, rate = 0.94) {
      if (!('speechSynthesis' in window)) return;
      try { window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(w); u.lang = 'en-US'; u.rate = rate; window.speechSynthesis.speak(u); } catch {}
    }

    function notify(msg) {
      const t = document.getElementById('toast'); t.textContent = msg; t.classList.remove('hidden');
      clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.add('hidden'), 3600);
    }

    function burstSparks(el, n = 7) {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ox = r.left + r.width * (0.3 + Math.random() * 0.4), oy = r.top + r.height * 0.5;
      for (let i = 0; i < n; i++) {
        const s = document.createElement('span'); s.className = 'spark';
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.5, d = 22 + Math.random() * 32;
        s.style.left = ox + 'px'; s.style.top = oy + 'px'; s.style.background = c; s.style.boxShadow = `0 0 8px ${c}`;
        s.style.setProperty('--tx', Math.cos(a) * d + 'px'); s.style.setProperty('--ty', (Math.sin(a) * d - 12) + 'px');
        document.body.appendChild(s); setTimeout(() => s.remove(), 540);
      }
    }

    let streakTm = null;
    function triggerStreakFx(combo, sub = 'Chuỗi lửa rực cháy!') {
      const pal = ['#fef08a','#fbbf24','#f97316','#ef4444','#fb7185'];
      for (let i = 0; i < (combo >= 5 ? 26 : 16); i++) {
        const e = document.createElement('span'); e.className = 'streak-ember';
        const col = pal[Math.floor(Math.random() * pal.length)], sz = 5 + Math.random() * 7;
        e.style.left = (10 + Math.random() * 80) + 'vw'; e.style.bottom = '-10px';
        e.style.width = sz + 'px'; e.style.height = sz + 'px'; e.style.background = col; e.style.boxShadow = `0 0 12px ${col}`;
        e.style.setProperty('--ex', ((Math.random() - 0.5) * 130) + 'px'); e.style.setProperty('--ey', -(180 + Math.random() * 290) + 'px');
        document.body.appendChild(e); setTimeout(() => e.remove(), 1100);
      }
      const old = document.getElementById('streak-banner-el'); if (old) old.remove(); clearTimeout(streakTm);
      const b = document.createElement('div'); b.id = 'streak-banner-el';
      b.className = 'streak-banner flex items-center gap-3 px-5 py-2.5 rounded-full text-white shadow-2xl border-2';
      b.style.background = combo >= 5 ? 'linear-gradient(135deg,#dc2626,#0284c7)' : 'linear-gradient(135deg,#f97316,#dc2626)';
      b.style.borderColor = 'rgba(254,240,138,0.75)';
      b.innerHTML = `<span class="flame-anim text-xl">🔥</span><div><div class="font-extrabold text-sm">${combo >= 5 ? `⚡ SIÊU CHUỖI x${combo}!` : `🔥 CHUỖI RỰC CHÁY x${combo}!`}</div><div class="text-xs opacity-90">${sub}</div></div>`;
      document.body.appendChild(b); streakTm = setTimeout(() => b.remove(), 1800);
    }

    function colorBarHtml(mastered, learning, review, total, compact = false) {
      const t = Math.max(1, total);
      const mP = Math.round((mastered / t) * 100), lP = Math.round((learning / t) * 100), rP = Math.round((review / t) * 100);
      const pct = Math.min(100, Math.round(((mastered + learning * 0.55 + review * 0.25) / t) * 100));
      const un = Math.max(0, total - mastered - learning - review);
      return `
        <div class="space-y-1.5">
          <div class="w-full h-2.5 rounded-full overflow-hidden flex" style="background:#e2e8f0;">
            <div style="width:${mP}%;background:#10b981;"></div>
            <div style="width:${lP}%;background:#0284c7;"></div>
            <div style="width:${rP}%;background:#f97316;"></div>
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
            <div class="flex flex-wrap gap-2">
              <span><span class="inline-block w-2 h-2 rounded-full mr-1" style="background:#10b981;"></span>Thuộc: <strong>${mastered}</strong></span>
              <span><span class="inline-block w-2 h-2 rounded-full mr-1" style="background:#0284c7;"></span>Đang học: <strong>${learning}</strong></span>
              ${!compact ? `<span><span class="inline-block w-2 h-2 rounded-full mr-1" style="background:#f97316;"></span>Cần ôn: <strong>${review}</strong></span><span>Chưa học: <strong>${un}</strong></span>` : ''}
            </div>
            <strong class="font-mono text-[var(--primary)]">${pct}%</strong>
          </div>
        </div>`;
    }

    function getRawSourceWords(srcKey) {
      const k = srcKey || state.gameSourceKey;
      if (k === 'learned') return state.learnedWords;
      if (k === 'myvocab') return state.personalWords.length ? state.personalWords : state.learnedWords;
      for (const p of PROGRAMS) {
        const found = p.topics.find(t => t.id === k);
        if (found) return found.words;
      }
      if (String(k).startsWith('atlas:')) {
        const parts = String(k).split(':');
        const at = ATLAS_TOPICS.find(x => x.slug === parts[1]);
        if (at) return getAtlasPartWords(at, Number(parts[2]) || 1);
      }
      return state.learnedWords;
    }

    function getActiveGameWords() {
      const raw = getRawSourceWords(state.gameSourceKey);
      if (!state.excludeMemorized) return raw;
      const filtered = raw.filter(w => !state.excludedWords[String(w.word || '').toLowerCase()]);
      return filtered.length >= 2 ? filtered : raw;
    }

    function getActiveGameTitle() {
      if (state.gameSourceKey === 'learned') return `Toàn bộ từ đã học (${state.learnedWords.length} từ)`;
      if (state.gameSourceKey === 'myvocab') return `Từ vựng của bản thân (${state.personalWords.length} từ)`;
      for (const p of PROGRAMS) {
        const found = p.topics.find(t => t.id === state.gameSourceKey);
        if (found) return found.name;
      }
      if (state.gameSourceKey.startsWith('atlas:')) {
        const parts = state.gameSourceKey.split(':');
        const at = ATLAS_TOPICS.find(x => x.slug === parts[1]);
        if (at) return `${at.name} — Phần ${parts[2] || 1} (25 từ)`;
      }
      return 'Toàn bộ từ đã học';
    }

    function avatarHtml(u, px = 34) {
      if (u.me && state.user.avatar) return `<img src="${state.user.avatar}" class="rounded-full object-cover" style="width:${px}px;height:${px}px;" />`;
      return `<span class="rounded-full inline-flex items-center justify-center font-bold text-xs shrink-0" style="width:${px}px;height:${px}px;background:${u.color || 'var(--primary)'};color:#fff;">${u.name.slice(0,1)}</span>`;
    }

    function planShortLabel() {
      if (state.user.planTier === 'ultra') {
        return state.user.ultraFromTop ? `💎 ULTRA (Top ${state.user.topRank})` : '💎 ULTRA • ∞ từ';
      }
      if (state.user.planTier === 'pro') return '⚡ PRO • ∞ từ';
      return `🌱 Free • ${state.user.dailyWordsLearned}/50 từ`;
    }

    function syncSidebar() {
      syncTopRankRewards();
      document.querySelectorAll('.snav').forEach(b => {
        const active = b.dataset.nav === state.nav;
        b.className = active
          ? 'snav w-full text-left px-3 py-2 rounded-xl text-xs font-bold bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer flex justify-between items-center'
          : 'snav w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--content)] cursor-pointer flex justify-between items-center';
      });
      document.getElementById('side-name').innerHTML = nameWithBadge(state.user);
      document.getElementById('side-prov').textContent = `${planShortLabel()} • ${state.user.provider}`;
      document.getElementById('side-id').textContent = state.user.accountCode;
      const sa = document.getElementById('side-avatar');
      if (state.user.avatar) sa.innerHTML = `<img src="${state.user.avatar}" class="w-full h-full object-cover" />`;
      else sa.textContent = state.user.name.slice(0,1).toUpperCase();
      const admBtn = document.getElementById('nav-admin-btn');
      const admLbl = document.getElementById('nav-admin-lbl');
      const pend = state.reports.filter(r => r.status === 'pending').length + state.orders.filter(o => o.status === 'waiting_approval').length;
      const pill = document.getElementById('adm-rep-pill');
      if (admBtn && admLbl) {
        if (isCurrentUserAdmin()) {
          admBtn.classList.remove('hidden');
          admLbl.textContent = '🛡️ Admin • Toàn Quyền';
          pill.textContent = pend;
          pill.style.display = pend > 0 ? '' : 'none';
        } else if (!state.firstAdmin) {
          admBtn.classList.remove('hidden');
          admLbl.textContent = '👑 Tạo acc #1 → Nhận Admin';
          pill.textContent = 'Mới';
          pill.style.display = '';
        } else {
          // Đã có tài khoản Admin đầu tiên, tài khoản hiện tại là user thường -> ẩn menu Admin
          admBtn.classList.add('hidden');
        }
      }
      const wp = document.getElementById('weekly-quiz-pill');
      if (wp) {
        if (!isWeeklyQuizMandatoryForUser()) {
          wp.textContent = 'Ultra';
          wp.style.background = '#0284c7';
        } else if (needsWeeklyMandatoryTest()) {
          wp.textContent = 'Bắt buộc';
          wp.style.background = '#dc2626';
        } else {
          wp.textContent = '✓ Xong';
          wp.style.background = '#10b981';
        }
      }
    }

    function go(nav, sourceKey = null) {
      syncTopRankRewards();
      if (nav === 'admin' && !isCurrentUserAdmin()) {
        if (!state.firstAdmin) {
          notify('👑 Chưa có Admin! Hãy tạo tài khoản ĐẦU TIÊN để tự động nhận toàn quyền Admin.');
          openAuth('register');
        } else {
          notify('⛔ Chỉ tài khoản đầu tiên (Admin) mới được phép truy cập trang Quản trị!');
        }
        return;
      }
      const gameNavs = ['silksong','archery','shadow','offline','match','listen_choose_vi','vi_to_en','typing'];
      if (gameNavs.includes(nav)) {
        if (!enforceWeeklyMandatoryTest()) return;
        if (!checkFreeDailyCap(0)) return;
      }
      if (sourceKey) state.gameSourceKey = sourceKey;
      state.nav = nav;
      if (nav !== 'roadmaps') { state.openTopicId = null; state.openAtlasSlug = null; state.openAtlasPart = null; }
      if (nav !== 'courses') state.openCourseSlug = null;
      render();
    }

    function savePersonalWord(word, ipa, pos, meaning, ex = '') {
      if (state.personalWords.some(w => w.word.toLowerCase() === word.toLowerCase())) {
        notify(`"${word}" đã có trong Sổ từ vựng của bản thân!`);
        return;
      }
      state.personalWords.unshift({ word, ipa: ipa || `/${word}/`, pos: pos || 'n.', meaning: meaning || `Từ vựng: ${word}`, ex: ex || `Daily sentence using "${word}".`, srs: 1 });
      notify(`⭐ Đã lưu "${word}" vào Sổ từ vựng của bản thân!`);
    }

    function render() {
      cleanup();
      syncSidebar();
      const v = document.getElementById('view');
      if (state.nav === 'home') renderHome(v);
      else if (state.nav === 'roadmaps') renderRoadmaps(v);
      else if (state.nav === 'courses') renderCourses(v);
      else if (state.nav === 'myvocab') renderMyVocab(v);
      else if (state.nav === 'weekly_quiz') renderWeeklyQuiz(v);
      else if (state.nav === 'pricing') renderPricing(v);
      else if (state.nav === 'games') renderGamesHub(v);
      else if (state.nav === 'silksong') renderSilksong(v);
      else if (state.nav === 'archery') renderArchery(v);
      else if (state.nav === 'shadow') renderShadowFight(v);
      else if (state.nav === 'offline') renderOfflineGame(v);
      else if (state.nav === 'match') renderMatch(v);
      else if (state.nav === 'listen_choose_vi') renderListenChooseVi(v);
      else if (state.nav === 'vi_to_en') renderViToEn(v);
      else if (state.nav === 'typing') renderTyping(v);
      else if (state.nav === 'duel') renderDuel(v);
      else if (state.nav === 'lounge') renderLounge(v);
      else if (state.nav === 'ai') renderAi(v);
      else if (state.nav === 'leaderboard') renderLeaderboard(v);
      else renderAdmin(v);
    }

    // 1. TRANG CHỦ BẮT MẮT, DỄ TÌM KIẾM & RÊ CHUỘT ĐỔI MÀU Ô
    function renderHome(v) {
      const totalAtlasWords = ATLAS_TOPICS.reduce((s,t)=>s+t.words,0);
      const totalAtlasParts = ATLAS_TOPICS.reduce((s,t)=>s+t.parts,0);
      const days = ['T2','T3','T4','T5','T6','T7','CN'];
      const freePct = state.user.planTier === 'free' ? Math.min(100, Math.round((state.user.dailyWordsLearned / 50) * 100)) : 100;

      const trackCards = [
        { id:'IELTS', title:'🌍 Lộ trình IELTS (A1 → C2)', badge:'108 Chủ đề • Band 7.5–8.5+', cefrs:['A1','A2','B1','B2','C1','C2'], col:'#0284c7' },
        { id:'TOEIC', title:'💼 Lộ trình TOEIC (A1 → C1)', badge:'55 Chủ đề • 850–990 điểm', cefrs:['A1','A2','B1','B2','C1'], col:'#d97706' },
        { id:'THPT', title:'🎓 Lộ trình THPT Quốc Gia (A1 → B2)', badge:'84 Chủ đề • 9.0–10.0 điểm', cefrs:['A1','A2','B1','B2'], col:'#e11d48' },
        { id:'GENERAL', title:'📚 Kho Đa Lĩnh Vực Mở Rộng', badge:'36 Chủ đề chuyên ngành', cefrs:['A1','A2','B1','B2','C1','C2'], col:'#0d9488' },
      ];

      v.innerHTML = `
        <div class="space-y-5">
          ${!state.firstAdmin ? `
            <div class="rounded-2xl p-4 border-2 flex flex-wrap justify-between items-center gap-3" style="background:rgba(217,119,6,0.1);border-color:#d97706;">
              <div class="text-xs space-y-0.5">
                <div class="font-extrabold text-sm" style="color:#b45309;">👑 Hệ thống chưa có Quản trị viên — Tạo tài khoản ĐẦU TIÊN để làm Admin!</div>
                <div class="text-[var(--foreground)]">Tài khoản đầu tiên được tạo trên web (Web / Gmail / Facebook) sẽ tự động trở thành <strong>Admin toàn quyền</strong>. Các tài khoản tạo sau sẽ là học viên thường.</div>
              </div>
              <button onclick="openAuth('register')" class="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer shrink-0" style="background:linear-gradient(135deg,#d97706,#ea580c);">✨ Tạo Acc #1 (Nhận Admin) →</button>
            </div>` : ''}
          ${needsWeeklyMandatoryTest() ? `
            <div class="rounded-2xl p-4 border-2 flex flex-wrap justify-between items-center gap-3" style="background:rgba(220,38,38,0.08);border-color:#dc2626;">
              <div class="text-xs space-y-0.5">
                <div class="font-extrabold text-sm" style="color:#dc2626;">📝 Nhiệm Vụ Bắt Buộc Tuần ${getCurrentWeekKey()} (Tài khoản Thường & Pro)</div>
                <div class="text-[var(--foreground)]">Mỗi tuần bạn cần hoàn thành <strong>1 bài kiểm tra ôn lại từ vựng</strong> để mở khóa học bài mới và chơi game.</div>
              </div>
              <button onclick="go('weekly_quiz')" class="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer shrink-0" style="background:#dc2626;">✍️ Làm Kiểm Tra Ngay →</button>
            </div>` : ''}
          <section class="rounded-2xl p-6 text-white grid lg:grid-cols-3 gap-4 items-center" style="background:linear-gradient(115deg,#0f172a 0%,#134e4a 58%,#0d9488 100%);">
            <div class="lg:col-span-2 space-y-2.5">
              <div class="text-xs font-bold uppercase tracking-wider" style="color:#5eead4;">TỪ VỰNG MỖI NGÀY • ${totalAtlasWords.toLocaleString('vi-VN')}+ TỪ • ${ATLAS_TOPICS.length} CHỦ ĐỀ (25 TỪ/PHẦN) • ID: ${state.user.accountCode}</div>
              <h1 class="text-2xl font-extrabold flex items-center gap-2 flex-wrap">Chào ${nameWithBadge(state.user)}, chọn Lộ trình IELTS • TOEIC • THPT chuẩn CEFR!</h1>
              <div class="inline-block px-3 py-1 rounded-lg text-xs font-bold" style="background:rgba(15,23,42,0.55);">
                ${'IELTS A1–C2 (108 CĐ) • TOEIC A1–C1 (55 CĐ) • THPT A1–B2 (84 CĐ) • 25 từ/phần • Gemini 3.8 Free ✨'.split('').map((c,i)=>`<span style="color:${COLORS[i%COLORS.length]}">${c}</span>`).join('')}
              </div>
              <div class="flex flex-wrap gap-2 pt-1">
                <button onclick="state.progTab='IELTS';state.cefrFilter='ALL';go('roadmaps')" class="px-4 py-2 rounded-xl font-bold text-xs cursor-pointer" style="background:#14b8a6;color:#042f2e;">🎯 Khám phá 283 Chủ đề CEFR</button>
                <button onclick="go('games')" class="px-4 py-2 rounded-xl font-bold text-xs cursor-pointer" style="background:#f59e0b;color:#111827;">🎮 Kho 12 Game • Bỏ từ đã nhớ</button>
                <button onclick="openZaloModal()" class="px-4 py-2 rounded-xl font-bold text-xs cursor-pointer text-white" style="background:#0068ff;">💬 Hỗ trợ Zalo 0779176786</button>
              </div>
            </div>

            <div class="rounded-2xl p-4 space-y-2.5 border" style="background:rgba(15,23,42,0.55);border-color:rgba(255,255,255,0.18);">
              <div class="flex justify-between items-center text-xs">
                <span class="font-bold">${planShortLabel()}</span>
                <span class="font-mono font-bold" style="color:#fde68a;">ID: ${state.user.accountCode}</span>
              </div>
              <div class="w-full h-2 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.2);">
                <div style="width:${freePct}%;height:100%;background:${state.user.planTier==='free'&&state.user.dailyWordsLearned>=45?'#f87171':'#5eead4'};"></div>
              </div>
              <div class="text-xs opacity-90">
                ${state.user.planTier==='free' ? '⚠️ Bản Thường: tối đa 50 từ/ngày, học đúng thứ tự lộ trình. Quyền lên gói do Admin cấp qua ID!' : state.user.planTier==='pro' ? '⚡ Bản Pro: không giới hạn từ & học vượt lộ trình.' : '💎 Bản Ultra: Full 100% tính năng kể cả Giao lưu Cam/Mic!'}
              </div>
              <button onclick="go('pricing')" class="w-full py-2 rounded-xl text-xs font-extrabold cursor-pointer text-white" style="background:linear-gradient(135deg,#0284c7,#0d9488);">
                👑 ${state.user.planTier==='ultra'?'Quản lý Gói Ultra':'Nạp Pro (15k) / Ultra (30k) — Admin cấp qua ID'}
              </button>
            </div>
          </section>

          <!-- 4 MULTI-EXAM CEFR CARDS (HOVER COLOR SHIFT + DIRECT LEVEL PILLS) -->
          <section class="space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-base font-bold">🎯 Lộ Trình Theo Kỳ Thi & Cấp Độ CEFR (Rê chuột vô từng ô để đổi màu!)</h2>
              <span class="text-xs font-mono text-[var(--muted-foreground)]">${totalAtlasParts.toLocaleString('vi-VN')} phần • 25 từ/phần</span>
            </div>
            <div class="grid sm:grid-cols-2 gap-3.5">
              ${trackCards.map(tc => {
                const sub = ATLAS_TOPICS.filter(x => x.track === tc.id);
                const wSum = sub.reduce((s,x)=>s+x.words, 0);
                const pSum = sub.reduce((s,x)=>s+x.parts, 0);
                return `
                  <div onclick="state.progTab='${tc.id}';state.cefrFilter='ALL';go('roadmaps')" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-2.5 cursor-pointer" style="--tile-c:${tc.col};border-left:4px solid ${tc.col};">
                    <div class="flex justify-between items-start gap-2">
                      <div>
                        <div class="font-extrabold text-sm">${tc.title}</div>
                        <div class="text-xs text-[var(--muted-foreground)]">${sub.length} chủ đề • ${pSum.toLocaleString('vi-VN')} phần • ${wSum.toLocaleString('vi-VN')} từ</div>
                        <div class="text-xs font-bold mt-1 flex items-center gap-1" style="color:${tc.col};"><span class="w-2 h-2 rounded-full inline-block animate-pulse" style="background:#10b981;"></span>👥 ${getTrackLearnerCount(tc.id).toLocaleString('vi-VN')} người đang sử dụng lộ trình này</div>
                      </div>
                      <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--content)] shrink-0" style="color:${tc.col};">${tc.badge}</span>
                    </div>
                    <div class="flex flex-wrap gap-1.5">
                      ${tc.cefrs.map(lv => {
                        const cnt = sub.filter(x => x.cefr === lv).length;
                        return `<button onclick="event.stopPropagation();state.progTab='${tc.id}';state.cefrFilter='${lv}';go('roadmaps')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer hover:border-[var(--primary)]">${lv} <span class="font-mono opacity-75">(${cnt})</span></button>`;
                      }).join('')}
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </section>

          <!-- QUICK HUB -->
          <section class="grid sm:grid-cols-3 gap-3">
            <div onclick="go('courses')" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 cursor-pointer space-y-1.5" style="--tile-c:#d97706;border-top:3px solid #d97706;">
              <div class="text-xs font-bold" style="color:#d97706;">🎓 HỆ THỐNG KHÓA HỌC</div>
              <div class="font-bold text-sm">8 Khóa Học Theo Kỳ Thi & Ngành</div>
              <div class="text-xs text-[var(--muted-foreground)]">THPT 9–10, IELTS 7.5–8.5+, TOEIC 850–990, Giao tiếp, Công nghệ AI, Y khoa, Luật & SAT.</div>
            </div>
            <div onclick="go('myvocab')" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 cursor-pointer space-y-1.5" style="--tile-c:#0284c7;border-top:3px solid #0284c7;">
              <div class="text-xs font-bold" style="color:#0284c7;">📒 TỪ BẢN THÂN + GEMINI 3.8 FREE</div>
              <div class="font-bold text-sm">Sổ Từ Cá Nhân & AI Mới Miễn Phí (${state.personalWords.length} từ)</div>
              <div class="text-xs text-[var(--muted-foreground)]">Tự lưu từ hoặc dùng bản Google Gemini 3.8 Flash miễn phí dịch sâu & tạo lộ trình!</div>
            </div>
            <div onclick="openAuth()" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 cursor-pointer space-y-1.5" style="--tile-c:#059669;border-top:3px solid #059669;">
              <div class="text-xs font-bold" style="color:#059669;">🔗 GMAIL • FACEBOOK • ZALO</div>
              <div class="font-bold text-sm">Liên Kết Gmail & Facebook + Hỗ Trợ Zalo</div>
              <div class="text-xs text-[var(--muted-foreground)]">Đăng nhập bằng Gmail / Facebook chỉ 1 chạm • Hỗ trợ khách hàng Zalo 0779176786.</div>
            </div>
          </section>

          <section onclick="triggerStreakFx(${state.user.streak}, 'Chuỗi ${state.user.streak} ngày liên tiếp!')" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer" style="--tile-c:#ea580c;">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style="background:linear-gradient(135deg,#fb923c,#ea580c);"><span class="flame-anim">🔥</span></div>
              <div>
                <div class="font-bold text-sm">Hiệu Ứng Chuỗi Lửa: ${state.user.streak} ngày liên tiếp</div>
                <div class="text-xs text-[var(--muted-foreground)]">Bấm vào đây để kích hoạt hiệu ứng chuỗi bùng cháy!</div>
              </div>
            </div>
            <div class="flex gap-1.5">${days.map((d,i)=>`<div class="w-9 py-1 rounded-xl text-center text-xs font-bold border ${i<5?'border-orange-400 text-orange-600':'border-[var(--border)] text-[var(--muted-foreground)]'}"><div>${i<5?'🔥':'○'}</div><div>${d}</div></div>`).join('')}</div>
          </section>
        </div>`;
    }

    // 2. 283 CHỦ ĐỀ CHUẨN CEFR (IELTS 108 A1–C2 • TOEIC 55 A1–C1 • THPT 84 A1–B2 • GENERAL 36 • 25 TỪ/PHẦN)
    function recordRoadmapStart(slug) {
      if (!state.roadmapStartDates[slug]) {
        state.roadmapStartDates[slug] = new Date().toLocaleDateString('vi-VN');
        try { localStorage.setItem('tvmn_rm_starts', JSON.stringify(state.roadmapStartDates)); } catch {}
      }
      return state.roadmapStartDates[slug];
    }

    function openAtlasPartView(slug, partNo) {
      if (!enforceWeeklyMandatoryTest()) return;
      const topic = ATLAS_TOPICS.find(t => t.slug === slug);
      if (!topic) return;
      const p = Math.max(1, Math.min(topic.parts, Number(partNo) || 1));
      const maxUnlocked = canSkipRoadmap() ? topic.parts : ((state.completedAtlasParts[slug] || 0) + 1);
      if (!canSkipRoadmap() && p > maxUnlocked) {
        notify(`🔒 Bản Thường phải học đúng lộ trình! Hoàn thành Phần ${maxUnlocked} trước khi mở Phần ${p}, hoặc liên hệ Admin cấp gói Pro/Ultra qua ID ${state.user.accountCode}!`);
        go('pricing');
        return;
      }
      if (!checkFreeDailyCap(0)) return;
      recordRoadmapStart(slug);
      state.openAtlasSlug = slug;
      state.openAtlasPart = p;
      render();
    }

    function completeAtlasPart(slug, partNo) {
      if (!enforceWeeklyMandatoryTest()) return;
      if (!checkFreeDailyCap(25)) return;
      const startD = recordRoadmapStart(slug);
      const prev = state.completedAtlasParts[slug] || 0;
      state.completedAtlasParts[slug] = Math.max(prev, partNo);
      const topic = ATLAS_TOPICS.find(t => t.slug === slug);
      if (topic) {
        const words = getAtlasPartWords(topic, partNo);
        words.slice(0, 5).forEach(w => {
          if (!state.learnedWords.some(lw => lw.word === w.word)) state.learnedWords.push(w);
        });
      }
      if (topic && partNo >= topic.parts) {
        render();
        openRoadmapCertificate(topic.name, startD);
        return;
      }
      triggerStreakFx(state.user.streak + 1, `Hoàn thành Phần ${partNo} (25 từ) — Đã mở khóa Phần ${partNo + 1}!`);
      render();
    }

    function finishWholeRoadmap(slug) {
      const topic = ATLAS_TOPICS.find(t => t.slug === slug);
      if (!topic) return;
      const startD = recordRoadmapStart(slug);
      state.completedAtlasParts[slug] = topic.parts;
      render();
      openRoadmapCertificate(topic.name, startD);
    }

    function renderRoadmaps(v) {
      if (state.openAtlasSlug && state.openAtlasPart) {
        const topic = ATLAS_TOPICS.find(t => t.slug === state.openAtlasSlug);
        if (topic) {
          const p = state.openAtlasPart;
          const words = getAtlasPartWords(topic, p);
          const srcKey = `atlas:${topic.slug}:${p}`;
          const isDone = (state.completedAtlasParts[topic.slug] || 0) >= p;
          const nextLocked = !canSkipRoadmap() && !isDone;
          v.innerHTML = `
            <div class="space-y-4">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <button onclick="state.openAtlasPart=null;render()" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer">← Danh sách ${topic.parts} phần (${topic.name})</button>
                <div class="flex flex-wrap gap-1.5">
                  <button onclick="state.gmMode='roadmap';state.gmTrack='${topic.track}';state.gmTopicSlug='${topic.slug}';state.gmPart=${p};go('games','${srcKey}')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">🎮 Mở Phần này trong Kho Game</button>
                  <button onclick="completeAtlasPart('${topic.slug}',${p})" class="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">${isDone?'✓ Đã hoàn thành Phần này':'✅ Hoàn thành Phần '+p+' (+25 từ)'}</button>
                  <button onclick="finishWholeRoadmap('${topic.slug}')" class="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:linear-gradient(135deg,#d97706,#ea580c);">🏆 Hoàn thành Lộ trình & Nhận Chứng Chỉ</button>
                  ${p>1?`<button onclick="openAtlasPartView('${topic.slug}',${p-1})" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer">← Phần ${p-1}</button>`:''}
                  ${p<topic.parts?`<button onclick="openAtlasPartView('${topic.slug}',${p+1})" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer">${nextLocked?'🔒 ':''}Phần ${p+1} →</button>`:''}
                </div>
              </div>

              <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-3" style="border-left:4px solid ${topic.color};">
                <div class="flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--content)] text-[var(--primary)]">${topic.lvl} • 25 từ vựng / phần (20–30 từ/phần)</span>
                    <h1 class="text-xl font-extrabold mt-1">${topic.name} — Phần ${p} / ${topic.parts}</h1>
                  </div>
                  <div class="flex flex-col items-end gap-1">
                    <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700">🟢 👥 ${getTopicLearnerCount(topic.slug).toLocaleString('vi-VN')} người đang học lộ trình này</span>
                    <span class="text-xs font-mono text-[var(--muted-foreground)]">${topic.words.toLocaleString('vi-VN')} từ • Bắt đầu: ${state.roadmapStartDates[topic.slug] || new Date().toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <button onclick="go('silksong','${srcKey}')" class="px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#be123c;">🕷️ Silksong</button>
                  <button onclick="go('archery','${srcKey}')" class="px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#0284c7;">🎯 Bắn Bia</button>
                  <button onclick="go('shadow','${srcKey}')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">🥷 Shadow Fight</button>
                  <button onclick="go('offline','${srcKey}')" class="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">📡 Offline</button>
                  <button onclick="go('match','${srcKey}')" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🔗 Nối từ</button>
                  <button onclick="go('listen_choose_vi','${srcKey}')" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🎧 Nghe→Nghĩa</button>
                  <button onclick="go('vi_to_en','${srcKey}')" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🇻🇳 Việt→Anh</button>
                  <button onclick="go('typing','${srcKey}')" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">⌨️ Gõ Sắc Màu</button>
                </div>
              </div>

              <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-2">
                <h2 class="font-bold text-sm">📋 Danh Sách ${words.length} Từ Vựng — Phần ${p} (Bấm ✓ Đã nhớ để bỏ khỏi Game)</h2>
                <div class="divide-y divide-[var(--border)]">
                  ${words.map((w,i)=>{
                    const isEx = Boolean(state.excludedWords[w.word.toLowerCase()]);
                    return `
                    <div class="hover-box py-2.5 px-2 rounded-xl flex flex-wrap items-center justify-between gap-2 ${isEx?'opacity-60':''}" style="--tile-c:${topic.color};">
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-mono text-[var(--muted-foreground)]">${i+1}.</span>
                          <strong class="text-sm ${isEx?'line-through':''}">${w.word}</strong>
                          <span class="text-xs font-mono text-[var(--muted-foreground)]">${w.ipa}</span>
                          <span class="text-xs px-1.5 py-0.5 rounded bg-[var(--content)]">${w.pos}</span>
                        </div>
                        <div class="text-xs font-semibold text-[var(--primary)]">${w.meaning}</div>
                      </div>
                      <div class="flex gap-1.5">
                        <button onclick="speak('${w.word.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] text-xs font-semibold cursor-pointer">🔊</button>
                        <button onclick="toggleExcludeWord('${w.word.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">${isEx?'↩ Học lại':'✓ Đã nhớ'}</button>
                        <button onclick="savePersonalWord('${w.word.replace(/'/g,"\\'")}','${w.ipa.replace(/'/g,"\\'")}','${w.pos}','${w.meaning.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-semibold cursor-pointer">⭐ Lưu</button>
                      </div>
                    </div>`;
                  }).join('')}
                </div>
              </div>
            </div>`;
          return;
        }
      }

      if (state.openAtlasSlug) {
        const topic = ATLAS_TOPICS.find(t => t.slug === state.openAtlasSlug);
        if (topic) {
          const perPage = 30;
          const totalPages = Math.ceil(topic.parts / perPage);
          const page = Math.max(1, Math.min(totalPages, state.atlasPage || 1));
          const startP = (page - 1) * perPage + 1;
          const endP = Math.min(topic.parts, startP + perPage - 1);
          const maxUnlocked = canSkipRoadmap() ? topic.parts : ((state.completedAtlasParts[topic.slug] || 0) + 1);
          const partsHtml = [];
          for (let p = startP; p <= endP; p++) {
            const done = (state.completedAtlasParts[topic.slug] || 0) >= p;
            const locked = !canSkipRoadmap() && p > maxUnlocked;
            const preview = getAtlasPartWords(topic, p).slice(0, 4).map(x => x.word).join(' • ');
            partsHtml.push(`
              <div onclick="openAtlasPartView('${topic.slug}',${p})" class="hover-box bg-[var(--card)] border rounded-2xl p-3.5 cursor-pointer space-y-1.5 ${locked?'opacity-65 border-dashed border-[var(--border)]':'border-[var(--border)]'}" style="--tile-c:${topic.color};">
                <div class="flex justify-between items-center">
                  <strong class="text-sm">${locked?'🔒 ':''}Phần ${p}</strong>
                  <span class="text-xs font-bold px-2 py-0.5 rounded-full ${done?'bg-emerald-500/15 text-emerald-600':locked?'bg-amber-500/15 text-amber-600':'bg-[var(--content)] text-[var(--primary)]'}">${done?'✓ Đã xong':locked?'Khóa lộ trình':'25 từ'}</span>
                </div>
                <div class="text-xs text-[var(--muted-foreground)] truncate">${preview}...</div>
                <div class="text-xs font-bold" style="color:${locked?'#d97706':'var(--primary)'};">${locked?'Cần Admin cấp Pro/Ultra →':'Mở học 25 từ →'}</div>
              </div>`);
          }
          v.innerHTML = `
            <div class="space-y-4">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <button onclick="state.openAtlasSlug=null;render()" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer">← Quay lại Lộ trình ${topic.track} (${topic.cefr})</button>
                <div class="flex flex-wrap items-center gap-2">
                  <input id="jump-part-inp" type="number" min="1" max="${topic.parts}" value="${startP}" class="w-20 px-2 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-mono" />
                  <button onclick="openAtlasPartView('${topic.slug}', Number(document.getElementById('jump-part-inp').value)||1)" class="px-3 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">Mở phần</button>
                </div>
              </div>
              <div class="rounded-2xl p-5 text-white flex flex-wrap justify-between items-center gap-3" style="background:linear-gradient(135deg,${topic.color},#0f172a);">
                <div class="space-y-1.5">
                  <div class="flex flex-wrap items-center gap-2 text-xs font-bold opacity-95">
                    <span>${topic.lvl} • MỖI PHẦN 25 TỪ VỰNG</span>
                    <span class="px-2.5 py-0.5 rounded-full" style="background:rgba(16,185,129,0.28);border:1px solid rgba(110,231,183,0.5);">🟢 👥 ${getTopicLearnerCount(topic.slug).toLocaleString('vi-VN')} người đang học lộ trình này</span>
                  </div>
                  <h1 class="text-xl font-extrabold">${topic.name}</h1>
                  <p class="text-xs opacity-90">${topic.desc} — Tổng <strong>${topic.words.toLocaleString('vi-VN')} từ</strong> chia <strong>${topic.parts.toLocaleString('vi-VN')} phần</strong>.</p>
                </div>
                <button onclick="finishWholeRoadmap('${topic.slug}')" class="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-900 shadow-lg cursor-pointer shrink-0" style="background:linear-gradient(135deg,#fde047,#f59e0b);">🏆 Hoàn thành Lộ trình & Nhận Chứng Chỉ</button>
              </div>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">${partsHtml.join('')}</div>
              <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3 flex justify-between items-center text-xs">
                <button onclick="state.atlasPage=${Math.max(1,page-1)};render()" ${page<=1?'disabled':''} class="px-3 py-1.5 rounded-lg bg-[var(--content)] font-bold cursor-pointer disabled:opacity-40">← Trang trước</button>
                <span class="font-mono">Trang <strong>${page}</strong> / ${totalPages} (Phần ${startP}–${endP} / ${topic.parts})</span>
                <button onclick="state.atlasPage=${Math.min(totalPages,page+1)};render()" ${page>=totalPages?'disabled':''} class="px-3 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold cursor-pointer disabled:opacity-40">Trang sau →</button>
              </div>
            </div>`;
          return;
        }
      }

      const tabs = [
        { id:'IELTS', label:'🌍 IELTS A1–C2 (108 Chủ đề)', cefrs:['ALL','A1','A2','B1','B2','C1','C2'], col:'#0284c7' },
        { id:'TOEIC', label:'💼 TOEIC A1–C1 (55 Chủ đề)', cefrs:['ALL','A1','A2','B1','B2','C1'], col:'#d97706' },
        { id:'THPT', label:'🎓 THPT A1–B2 (84 Chủ đề)', cefrs:['ALL','A1','A2','B1','B2'], col:'#e11d48' },
        { id:'GENERAL', label:'📚 Đa lĩnh vực (36 Chủ đề)', cefrs:['ALL','A1','A2','B1','B2','C1','C2'], col:'#0d9488' },
      ];
      const curTab = tabs.find(x => x.id === state.progTab) || tabs[0];
      if (!curTab.cefrs.includes(state.cefrFilter)) state.cefrFilter = 'ALL';
      const baseList = ATLAS_TOPICS.filter(t => t.track === curTab.id);
      const q = (state.atlasFilter || '').toLowerCase();
      const filtered = baseList.filter(t => (state.cefrFilter === 'ALL' || t.cefr === state.cefrFilter) && (!q || (t.name + ' ' + t.desc).toLowerCase().includes(q)));

      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 class="text-xl font-extrabold">🎯 Lộ Trình Chuẩn CEFR: IELTS (108) • TOEIC (55) • THPT (84) • Đa Lĩnh Vực (36)</h1>
              <p class="text-xs text-[var(--muted-foreground)]">Mỗi phần của mọi chủ đề gồm đúng <strong>25 từ vựng (20–30 từ/phần)</strong> • Rê chuột vào từng ô để đổi màu!</p>
            </div>
            <button onclick="state.gmMode='learned';go('games','learned')" class="px-3 py-2 rounded-xl text-xs font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">🎮 Luyện toàn bộ từ đã học (${state.learnedWords.length})</button>
          </div>

          <div class="flex flex-wrap gap-2">
            ${tabs.map(tb => `<button onclick="state.progTab='${tb.id}';state.cefrFilter='ALL';render()" class="px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${curTab.id===tb.id?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--card)] border-[var(--border)]'}">${tb.label} • 👥 ${getTrackLearnerCount(tb.id).toLocaleString('vi-VN')}</button>`).join('')}
          </div>
          <div class="rounded-xl px-4 py-2.5 bg-[var(--card)] border border-[var(--border)] flex flex-wrap justify-between items-center gap-2 text-xs">
            <span class="font-bold flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full inline-block animate-pulse" style="background:#10b981;"></span>Hiện có <strong class="text-[var(--primary)] text-sm">${getTrackLearnerCount(curTab.id).toLocaleString('vi-VN')}</strong> học viên đang sử dụng lộ trình <strong>${curTab.id}</strong></span>
            <span class="text-[var(--muted-foreground)]">Hoàn thành lộ trình để nhận 🎇 Pháo hoa + 🌠 Mưa sao băng & 📜 Chứng chỉ Tiếng Anh Mỗi Ngày!</span>
          </div>

          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2.5">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-xs font-bold text-[var(--muted-foreground)]">Cấp CEFR:</span>
              ${curTab.cefrs.map(lv => {
                const cnt = lv === 'ALL' ? baseList.length : baseList.filter(x => x.cefr === lv).length;
                return `<button onclick="state.cefrFilter='${lv}';render()" class="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border ${state.cefrFilter===lv?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">${lv==='ALL'?'Tất cả':lv} (${cnt})</button>`;
              }).join('')}
            </div>
            <input oninput="state.atlasFilter=this.value;render()" value="${state.atlasFilter}" placeholder="🔍 Lọc nhanh trong ${baseList.length} chủ đề..." class="min-w-56 px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs" />
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${filtered.map((t, idx) => `
              <div onclick="state.openAtlasSlug='${t.slug}';state.atlasPage=1;render()" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden cursor-pointer flex flex-col" style="--tile-c:${t.color};">
                <div class="h-12 px-3.5 py-2 flex items-center justify-between text-white" style="background:linear-gradient(135deg,${t.color},#0f172a);">
                  <span class="text-xs px-2 py-0.5 rounded-full font-bold" style="background:rgba(0,0,0,0.4);">${t.lvl}</span>
                  <span class="text-xs font-mono font-bold">${t.words.toLocaleString('vi-VN')} từ</span>
                </div>
                <div class="p-3.5 space-y-1.5 flex-1 flex flex-col">
                  <div class="font-bold text-sm">${t.name}</div>
                  <div class="text-xs text-[var(--muted-foreground)]">${t.desc}</div>
                  <div class="flex flex-wrap gap-1 pt-1">
                    ${t.bank.slice(0,3).map(w=>`<span class="text-xs px-1.5 py-0.5 rounded bg-[var(--content)] font-mono">${w[0]}</span>`).join('')}
                  </div>
                  <div class="flex justify-between items-center pt-2 mt-auto text-xs gap-1">
                    <span class="font-semibold text-emerald-700">👥 ${getTopicLearnerCount(t.slug).toLocaleString('vi-VN')} đang học</span>
                    <span class="font-mono text-[var(--muted-foreground)]">${t.parts} phần</span>
                    <span class="font-bold text-[var(--primary)]">Học →</span>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>`;
    }

    // 2B. KHÓA HỌC BÀI BẢN
    function renderCourses(v) {
      if (state.openCourseSlug) {
        const c = COURSES_LIST.find(x => x.slug === state.openCourseSlug);
        if (c) {
          let prevDone = true;
          v.innerHTML = `
            <div class="space-y-4">
              <button onclick="state.openCourseSlug=null;render()" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer">← Tất cả 8 Khóa học</button>
              <div class="rounded-2xl p-5 text-white space-y-1.5" style="background:linear-gradient(135deg,${c.color},#0f172a);">
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full" style="background:rgba(255,255,255,0.2);">${c.badge} • 🎯 ${c.target}</span>
                <h1 class="text-xl font-extrabold mt-1">${c.title}</h1>
                <p class="text-xs opacity-90">${c.subtitle}</p>
              </div>
              <div class="space-y-2.5">
                ${c.lessons.map(ls => {
                  const done = Boolean(state.completedLessons[ls.id]);
                  const locked = !canSkipRoadmap() && ls.order > 1 && !prevDone;
                  prevDone = done;
                  const parts = ls.source.split(':');
                  const atlasSrc = `atlas:${parts[1]}:${parts[2] || 1}`;
                  return `
                    <div class="hover-box bg-[var(--card)] border rounded-2xl p-4 flex flex-wrap justify-between items-center gap-3 ${locked?'opacity-65 border-dashed border-[var(--border)]':done?'border-emerald-500':'border-[var(--border)]'}" style="--tile-c:${c.color};">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-bold px-2 py-0.5 rounded-full ${done?'bg-emerald-500/15 text-emerald-600':locked?'bg-amber-500/15 text-amber-600':'bg-[var(--content)] text-[var(--primary)]'}">${done?'✅ Đã xong':locked?'🔒 Khóa thứ tự':'📘 Bài '+ls.order}</span>
                          <strong class="text-sm">${ls.title}</strong>
                        </div>
                        <div class="text-xs text-[var(--muted-foreground)]">${ls.summary}</div>
                      </div>
                      <div class="flex flex-wrap gap-1.5">
                        ${locked
                          ? `<button onclick="go('pricing')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">👑 Nạp Pro/Ultra học vượt</button>`
                          : `<button onclick="state.nav='roadmaps';openAtlasPartView('${parts[1]}',${parts[2]||1})" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">📖 Xem 25 từ</button>
                             <button onclick="go('games','${atlasSrc}')" class="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🎮 Chơi 12 Game</button>`}
                      </div>
                    </div>`;
                }).join('')}
              </div>
            </div>`;
          return;
        }
      }
      v.innerHTML = `
        <div class="space-y-4">
          <h1 class="text-xl font-extrabold">🎓 Hệ Thống 8 Khóa Học Tiếng Anh Bài Bản (25 từ/bài)</h1>
          <div class="grid sm:grid-cols-2 gap-3.5">
            ${COURSES_LIST.map(c => {
              const doneCnt = c.lessons.filter(l => state.completedLessons[l.id]).length;
              return `
                <div class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col" style="--tile-c:${c.color};">
                  <div class="p-4 text-white space-y-1.5" style="background:linear-gradient(135deg,${c.color},#0f172a);">
                    <div class="flex justify-between items-center text-xs">
                      <span class="px-2 py-0.5 rounded-full font-bold" style="background:rgba(255,255,255,0.2);">${c.badge}</span>
                      <span class="font-mono font-bold">${doneCnt}/${c.lessons.length} bài • ${c.lessons.length * 25} từ</span>
                    </div>
                    <div class="font-extrabold text-sm">${c.title}</div>
                  </div>
                  <div class="p-4 space-y-3 flex-1 flex flex-col">
                    <p class="text-xs text-[var(--muted-foreground)]">${c.subtitle}</p>
                    <button onclick="state.openCourseSlug='${c.slug}';render()" class="w-full py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer mt-auto">📖 Vào Khóa Học (${c.lessons.length} bài)</button>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>`;
    }

    // 2C. TỪ VỰNG BẢN THÂN + GEMINI 3.8 FLASH FREE
    function addPersonalWordForm(e) {
      e.preventDefault();
      const w = document.getElementById('pv-w').value.trim();
      if (!w) return;
      let m = document.getElementById('pv-m').value.trim();
      let ipa = `/ˈ${w.toLowerCase()}/`, pos = 'n.';
      if (!m) {
        for (const t of ATLAS_TOPICS) {
          const hit = t.bank.find(x => x[0].toLowerCase() === w.toLowerCase());
          if (hit) { ipa = hit[1]; pos = hit[2]; m = hit[3]; break; }
        }
      }
      if (!m) m = `✦ Gemini 3.8 Flash giải nghĩa cho "${w}"`;
      savePersonalWord(w, ipa, pos, m, `I practice using "${w}" daily.`);
      render();
    }

    function genPersonalAiRoadmap(e) {
      e.preventDefault();
      const goal = document.getElementById('pv-goal').value.trim() || 'IELTS 8.0 & TOEIC 900+';
      const level = document.getElementById('pv-lvl').value;
      const daily = Math.max(10, Number(document.getElementById('pv-daily').value) || 25);
      state.aiPersonalRoadmap = {
        goal, level, daily,
        stages: [
          { stage:1, days:'Ngày 1–3', title:`Sổ Từ Vựng Của Bản Thân (${state.personalWords.length} từ)`, source:'myvocab', srs:'SRS 10p → 1d → 3d', focus:'Ôn sâu từ cá nhân với Gemini 3.8 Flash' },
          { stage:2, days:'Ngày 4–7', title:'[IELTS B2] Đô thị hóa — Phần 1 (25 từ)', source:'atlas:ielts-b2-urbanisation-megacities:1', srs:'SRS Ngày 1 → 3 → 7', focus:`Tăng tốc cho mục tiêu "${goal}"` },
          { stage:3, days:'Ngày 8–11', title:'[TOEIC B2] Đàm phán thương mại — Phần 1 (25 từ)', source:'atlas:toeic-b2-negotiations-partnerships:1', srs:'SRS Ngày 3 → 7 → 14', focus:'Từ vựng công sở & thương mại' },
        ]
      };
      notify('✦ Google Gemini 3.8 Flash (Free) đã tạo Lộ trình học cá nhân!');
      render();
    }

    function renderMyVocab(v) {
      const rm = state.aiPersonalRoadmap;
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <h1 class="text-xl font-extrabold">📒 Kho Từ Của Bản Thân (${state.personalWords.length} từ) & Google Gemini 3.8 Flash (Free)</h1>
            <button onclick="state.gmMode='learned';go('games','myvocab')" class="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🎮 Chơi 12 Game từ của tôi</button>
          </div>
          <div class="grid md:grid-cols-2 gap-3.5">
            <form onsubmit="addPersonalWordForm(event)" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-2.5">
              <div class="font-bold text-sm">➕ Thêm Từ Cá Nhân (✦ Tự Tra & Dịch Bằng Gemini 3.8 Flash Free)</div>
              <input id="pv-w" required placeholder="Nhập từ tiếng Anh..." class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs" />
              <input id="pv-m" placeholder="Nghĩa tiếng Việt (để trống để Gemini 3.8 tự điền)" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs" />
              <button type="submit" class="w-full py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">⭐ Lưu từ</button>
            </form>
            <form onsubmit="genPersonalAiRoadmap(event)" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-2.5" style="--tile-c:#0284c7;">
              <div class="font-bold text-sm" style="color:#0284c7;">🧭 Gemini 3.8 Flash Tạo Lộ Trình Học Cá Nhân</div>
              <input id="pv-goal" required value="${rm.goal}" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs" />
              <div class="grid grid-cols-2 gap-2">
                <select id="pv-lvl" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs"><option>A1–A2</option><option selected>B1–B2</option><option>C1–C2</option></select>
                <input id="pv-daily" type="number" value="${rm.daily}" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-mono" />
              </div>
              <button type="submit" class="w-full py-2 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#0284c7;">✦ Tạo Lộ Trình AI</button>
            </form>
          </div>
          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-2">
            <h2 class="font-bold text-sm">📖 Danh Sách Từ Của Bản Thân</h2>
            <div class="divide-y divide-[var(--border)]">
              ${state.personalWords.map((w,i)=>`<div class="py-2 flex justify-between items-center text-xs"><div><strong>${w.word}</strong> <span class="font-mono text-[var(--muted-foreground)]">${w.ipa}</span> — <span class="font-semibold text-[var(--primary)]">${w.meaning}</span></div><button onclick="speak('${w.word}')" class="px-2 py-1 rounded bg-[var(--content)] cursor-pointer">🔊</button></div>`).join('')}
            </div>
          </div>
        </div>`;
    }

    // 2D. NẠP PRO & ULTRA — QUYỀN LÊN GÓI DO ADMIN CẤP QUA ID TÀI KHOẢN + ZALO 0779176786
    function createQrOrder(tier, months) {
      const amt = PLAN_PRICES[tier][months];
      const memo = state.user.accountCode;
      const code = 'ORD-' + Date.now().toString(36).toUpperCase().slice(-6);
      const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankCode}-${BANK_INFO.stk}-compact2.png?amount=${amt}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(BANK_INFO.owner)}`;
      const ord = { code, tier, months, amount: amt, memo, qrUrl, status: 'pending', userName: state.user.name, time: new Date().toLocaleTimeString('vi-VN') };
      state.activeOrder = ord;
      state.orders.unshift(ord);
      notify(`Đã tạo mã VietQR VPBank (${fmtVnd(amt)}) • Nội dung CK: ${memo}`);
      render();
    }

    // Strictly marks waiting_approval ONLY — Admin grants package via User ID!
    function confirmQrOrder(code) {
      const ord = state.orders.find(o => o.code === code) || state.activeOrder;
      if (!ord) return;
      ord.status = 'waiting_approval';
      notify(`📨 Đã gửi yêu cầu duyệt đơn ${ord.code}! Quyền lên gói do Admin cấp thông qua Mã ID ${ord.memo} (hoặc nhắn Zalo 0779176786).`);
      render();
    }

    function drawFallbackQrCanvas(canvas, seedText) {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const size = 210, cells = 29, cell = Math.floor(size / cells), pad = Math.floor((size - cells * cell) / 2);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#0f172a';
      function finder(ox, oy) {
        for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
          if (r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4)) ctx.fillRect(pad+(ox+c)*cell, pad+(oy+r)*cell, cell, cell);
        }
      }
      finder(0, 0); finder(cells - 7, 0); finder(0, cells - 7);
      let h = 2166136261;
      for (let i = 0; i < seedText.length; i++) { h ^= seedText.charCodeAt(i); h = Math.imul(h, 16777619); }
      for (let r = 0; r < cells; r++) {
        for (let c = 0; c < cells; c++) {
          const inF = (r<8&&c<8)||(r<8&&c>=cells-8)||(r>=cells-8&&c<8);
          if (inF) continue;
          h ^= (r * 31 + c * 17); h = Math.imul(h, 16777619);
          if ((h >>> 0) % 2 === 0) ctx.fillRect(pad + c * cell, pad + r * cell, cell, cell);
        }
      }
      ctx.fillStyle = '#0d9488'; ctx.fillRect(size/2 - 22, size/2 - 11, 44, 22);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('VietQR', size/2, size/2 + 3.5);
    }

    function renderPricing(v) {
      const m = state.billingMonths;
      const pPrice = PLAN_PRICES.pro[m];
      const uPrice = PLAN_PRICES.ultra[m];
      const durs = [{m:1,l:'1 tháng'},{m:3,l:'3 tháng'},{m:6,l:'6 tháng'},{m:12,l:'1 năm'}];
      const ord = state.activeOrder;

      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-start gap-3">
            <div>
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--content)] text-[var(--primary)]">💳 VIETQR.NET • VPBANK • QUYỀN LÊN GÓI DO ADMIN CẤP QUA MÃ ID</span>
              <h1 class="text-xl font-extrabold mt-1">Nạp Gói Bản Pro & Bản Ultra (Admin Cấp Qua ID Tài Khoản)</h1>
              <p class="text-xs text-[var(--muted-foreground)]">VPBank • STK <strong>0779176786</strong> • <strong>TRAN VAN HUNG</strong> • Nội dung CK là <strong>ID riêng (${state.user.accountCode})</strong> • Hỗ trợ Zalo <strong>0779176786</strong>.</p>
            </div>
            <div class="bg-[var(--card)] border border-[var(--primary)] rounded-2xl px-4 py-2.5 text-xs space-y-1">
              <div class="text-[var(--muted-foreground)]">MÃ ID TÀI KHOẢN ĐỂ ADMIN CẤP GÓI</div>
              <div class="flex items-center gap-2"><strong class="font-mono text-base text-[var(--primary)]">${state.user.accountCode}</strong><button onclick="copyText('${state.user.accountCode}','Đã copy ID')" class="px-2 py-0.5 rounded bg-[var(--content)] font-bold cursor-pointer">📋 Copy</button></div>
              <div>Gói hiện tại: <strong>${planShortLabel()}</strong></div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3">
            <span class="text-xs font-bold">Chọn thời hạn gói:</span>
            <div class="flex flex-wrap gap-1.5">
              ${durs.map(d=>`<button onclick="state.billingMonths=${d.m};render()" class="px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${m===d.m?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">${d.l}</button>`).join('')}
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-3.5">
            <div class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex flex-col gap-2.5" style="--tile-c:#64748b;">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--content)] self-start">🌱 BẢN THƯỜNG</span>
              <div class="text-2xl font-extrabold">0đ</div>
              <ul class="text-xs space-y-1.5 flex-1">
                <li>✅ 283 chủ đề CEFR & 12 Game</li>
                <li style="color:#dc2626;">⚠️ Tối đa <strong>50 từ/ngày</strong>, học đúng thứ tự</li>
                <li style="color:#dc2626;">❌ Không Giao lưu Cam & Mic</li>
              </ul>
              <button disabled class="w-full py-2 rounded-xl bg-[var(--content)] text-xs font-bold opacity-70">${state.user.planTier==='free'?'✓ Gói hiện tại':'Gói cơ bản'}</button>
            </div>

            <div class="hover-box bg-[var(--card)] border-2 rounded-2xl p-4 flex flex-col gap-2.5" style="--tile-c:#d97706;border-color:#d97706;">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full self-start" style="background:#fef3c7;color:#b45309;">⚡ BẢN PRO</span>
              <div class="text-2xl font-extrabold" style="color:#b45309;">${fmtVnd(pPrice)} <span class="text-xs font-normal text-[var(--muted-foreground)]">/ ${m===12?'1 năm':m+' tháng'}</span></div>
              <div class="text-xs px-2.5 py-1.5 rounded-xl bg-[var(--content)]">1T: <strong>15k</strong> • 3T: <strong>45k</strong> • 6T: <strong>50k</strong> • 1N: <strong>80k</strong></div>
              <ul class="text-xs space-y-1.5 flex-1">
                <li>✅ <strong>Không giới hạn từ/ngày</strong> & <strong>Học vượt mọi phần</strong></li>
                <li>✅ Full 12 Game (bỏ từ đã nhớ) & Gemini 3.8 Flash</li>
                <li style="color:#d97706;">🔒 Chưa mở Giao lưu Cam & Mic</li>
              </ul>
              <button onclick="createQrOrder('pro',${m})" class="w-full py-2.5 rounded-xl text-xs font-extrabold cursor-pointer" style="background:#f59e0b;color:#111827;">⚡ Tạo mã VietQR Pro (${fmtVnd(pPrice)})</button>
            </div>

            <div class="hover-box bg-[var(--card)] border-2 rounded-2xl p-4 flex flex-col gap-2.5" style="--tile-c:#0284c7;border-color:#0284c7;">
              <span class="text-xs font-bold px-2 py-0.5 rounded-full text-white self-start" style="background:linear-gradient(135deg,#0284c7,#0d9488);">💎 BẢN ULTRA (FULL 100%)</span>
              <div class="text-2xl font-extrabold" style="color:#0284c7;">${fmtVnd(uPrice)} <span class="text-xs font-normal text-[var(--muted-foreground)]">/ ${m===12?'1 năm':m+' tháng'}</span></div>
              <div class="text-xs px-2.5 py-1.5 rounded-xl bg-[var(--content)]">1T: <strong>30k</strong> • 3T: <strong>70k</strong> • 6T: <strong>90k</strong> • 1N: <strong>99k</strong></div>
              <ul class="text-xs space-y-1.5 flex-1">
                <li>✅ <strong>Toàn bộ quyền lợi Bản Pro</strong> (∞ từ + Học vượt)</li>
                <li>✅ <strong>MỞ KHÓA GIAO LƯU CAM & MIC</strong> trực tiếp</li>
                <li>✅ Ưu tiên Gemini 3.8 Flash & Huy hiệu 💎 ULTRA</li>
              </ul>
              <button onclick="createQrOrder('ultra',${m})" class="w-full py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:linear-gradient(135deg,#0284c7,#0d9488);">💎 Tạo mã VietQR Ultra (${fmtVnd(uPrice)})</button>
            </div>
          </div>

          ${ord ? `
            <div class="bg-[var(--card)] border-2 border-[var(--primary)] rounded-2xl p-5 space-y-4">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <div>
                  <span class="text-xs font-bold text-[var(--primary)]">🏦 VIETQR VPBANK • ADMIN CẤP GÓI QUA ID • ĐƠN ${ord.code}</span>
                  <h2 class="text-lg font-extrabold">Thanh Toán Gói ${ord.tier.toUpperCase()} — ${fmtVnd(ord.amount)}</h2>
                </div>
                <a href="https://zalo.me/0779176786" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-xl text-xs font-bold text-white" style="background:#0068ff;">💬 Nhắn Zalo 0779176786 gửi ID ↗</a>
              </div>
              <div class="grid md:grid-cols-2 gap-4 items-center">
                <div class="bg-white rounded-2xl p-4 text-center border border-[var(--border)] space-y-2">
                  <img id="p-qr-img" src="${ord.qrUrl}" alt="VietQR VPBank 0779176786" class="mx-auto rounded-xl max-w-60 w-full" onerror="this.classList.add('hidden');document.getElementById('p-qr-canvas').classList.remove('hidden');" />
                  <canvas id="p-qr-canvas" width="210" height="210" class="hidden mx-auto rounded-xl border border-slate-200"></canvas>
                  <div class="text-xs text-slate-600 font-semibold">VPBank • 0779176786 • TRAN VAN HUNG</div>
                </div>
                <div class="space-y-3 text-xs">
                  <div class="p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] space-y-2">
                    <div class="flex justify-between"><span>Ngân hàng / STK:</span><strong class="font-mono">VPBank • 0779176786</strong></div>
                    <div class="flex justify-between"><span>Người nhận:</span><strong>TRAN VAN HUNG</strong></div>
                    <div class="flex justify-between"><span>Số tiền:</span><strong class="font-mono text-base" style="color:#dc2626;">${fmtVnd(ord.amount)}</strong></div>
                    <div class="flex justify-between items-center pt-1.5 border-t border-[var(--border)]"><span>Nội dung CK (Mã ID):</span><strong class="font-mono text-sm text-[var(--primary)]">${ord.memo}</strong></div>
                  </div>
                  <div class="p-3 rounded-xl border text-xs" style="background:rgba(0,104,255,0.08);border-color:rgba(0,104,255,0.3);">
                    🛡️ <strong>Quyền lên gói do Admin cấp thông qua ID tài khoản (${ord.memo}):</strong> Bấm nút gửi yêu cầu bên dưới hoặc nhắn Zalo <strong>0779176786</strong>, sau đó vào tab <strong>🛡️ Admin • Cấp Gói Qua ID</strong> để duyệt thử ngay!
                  </div>
                  <button onclick="confirmQrOrder('${ord.code}')" ${ord.status!=='pending'?'disabled':''} class="w-full py-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-extrabold cursor-pointer disabled:opacity-60">
                    ${ord.status==='paid' ? '✅ Admin đã cấp gói!' : ord.status==='waiting_approval' ? `⏳ Đang chờ Admin cấp gói qua ID ${ord.memo}` : `📨 Tôi đã chuyển khoản — Gửi yêu cầu Admin cấp gói`}
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>`;

      if (ord) drawFallbackQrCanvas(document.getElementById('p-qr-canvas'), `VPB|0779176786|${ord.amount}|${ord.memo}`);
    }

    // 3. KHO 12 GAME: CHỌN LỘ TRÌNH -> CHỦ ĐỀ -> TỪNG PHẦN (25 TỪ) HOẶC TOÀN BỘ TỪ ĐÃ HỌC + BỎ TỪ ĐÃ NHỚ
    function syncGmSource() {
      if (state.gmMode === 'learned') {
        if (state.gameSourceKey !== 'learned' && state.gameSourceKey !== 'myvocab') state.gameSourceKey = 'learned';
        return;
      }
      const list = ATLAS_TOPICS.filter(t => t.track === state.gmTrack && (state.gmCefr === 'ALL' || t.cefr === state.gmCefr));
      if (!list.some(t => t.slug === state.gmTopicSlug)) {
        state.gmTopicSlug = list[0]?.slug || ATLAS_TOPICS[0].slug;
        state.gmPart = 1;
      }
      const cur = ATLAS_TOPICS.find(t => t.slug === state.gmTopicSlug) || ATLAS_TOPICS[0];
      state.gmPart = Math.max(1, Math.min(cur.parts, Number(state.gmPart) || 1));
      state.gameSourceKey = `atlas:${cur.slug}:${state.gmPart}`;
    }

    function renderGamesHub(v) {
      syncGmSource();
      const modes = [
        { id:'silksong', icon:'🕷️', name:'Hollow Knight: Silksong', desc:'Mê cung Pharloom giải đoán điền từ & Bão Tơ Lụa', col:'#be123c' },
        { id:'archery', icon:'🎯', name:'Bắn Trúng Bia Điền Từ', desc:'Ngắm bia di động, gõ từ tiếng Anh bắn trúng Hồng Tâm', col:'#0284c7' },
        { id:'shadow', icon:'🥷', name:'Võ Đài Shadow Fight 2', desc:'Chọn đúng nghĩa tung chiêu Katana hạ Boss Lynx', col:'#d97706' },
        { id:'offline', icon:'📡', name:'Game Offline: Nghe • Điền • Nói', desc:'Chơi mượt cả khi mất mạng: Nghe, Điền sắc màu & Đọc Mic', col:'#0d9488' },
        { id:'match', icon:'🔗', name:'Nối Từ Với Nghĩa', desc:'Ghép đôi từ tiếng Anh & nghĩa tiếng Việt siêu nhanh', col:'#059669' },
        { id:'listen_choose_vi', icon:'🎧', name:'Nghe Tiếng Anh → Chọn Nghĩa', desc:'Nghe phát âm chuẩn (ẩn chữ) rồi chọn nghĩa tiếng Việt đúng', col:'#2563eb' },
        { id:'vi_to_en', icon:'🇻🇳', name:'Từ Việt → Chọn Từ Vựng Anh', desc:'Nhìn nghĩa tiếng Việt chọn nhanh từ tiếng Anh tương ứng', col:'#15803d' },
        { id:'typing', icon:'⌨️', name:'Gõ Chữ Sắc Màu ✨', desc:'Gõ từng chữ cái tiếng Anh với pháo hoa cầu vồng', col:'#e11d48' },
      ];

      const cefrMap = { IELTS:['ALL','A1','A2','B1','B2','C1','C2'], TOEIC:['ALL','A1','A2','B1','B2','C1'], THPT:['ALL','A1','A2','B1','B2'], GENERAL:['ALL','A1','A2','B1','B2','C1','C2'] };
      const cefrs = cefrMap[state.gmTrack] || ['ALL'];
      const topicList = ATLAS_TOPICS.filter(t => t.track === state.gmTrack && (state.gmCefr === 'ALL' || t.cefr === state.gmCefr));
      const curTopic = ATLAS_TOPICS.find(t => t.slug === state.gmTopicSlug) || topicList[0];
      const rawWords = getRawSourceWords(state.gameSourceKey);
      const activeWords = getActiveGameWords();
      const skippedCnt = rawWords.filter(w => state.excludedWords[w.word.toLowerCase()]).length;

      v.innerHTML = `
        <div class="space-y-4">
          <div>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--content)] text-[var(--primary)]">🎮 PHÂN CẤP LỘ TRÌNH → CHỦ ĐỀ → TỪNG PHẦN (25 TỪ) • QUYỀN BỎ TỪ ĐÃ NHỚ</span>
            <h1 class="text-xl font-extrabold mt-1">Kho 12 Game Luyện Từ Vựng</h1>
          </div>

          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-3.5" style="border-left:4px solid #0d9488;">
            <div class="flex flex-wrap gap-2 pb-3 border-b border-[var(--border)]">
              <button onclick="state.gmMode='roadmap';syncGmSource();render()" class="px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${state.gmMode==='roadmap'?'bg-[var(--primary)] text-[var(--primary-foreground)]':'bg-[var(--content)] border border-[var(--border)]'}">🎯 Chọn Lộ trình → Chủ đề → Từng phần (25 từ)</button>
              <button onclick="state.gmMode='learned';state.gameSourceKey='learned';render()" class="px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${state.gmMode==='learned'?'bg-[var(--primary)] text-[var(--primary-foreground)]':'bg-[var(--content)] border border-[var(--border)]'}">✅ Toàn bộ từ đã học (${state.learnedWords.length} từ)</button>
            </div>

            ${state.gmMode === 'roadmap' ? `
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-xs font-bold text-[var(--muted-foreground)]">Lọc Level CEFR:</span>
                ${cefrs.map(lv => `<button onclick="state.gmCefr='${lv}';syncGmSource();render()" class="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border ${state.gmCefr===lv?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">${lv==='ALL'?'Tất cả':lv}</button>`).join('')}
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
                    ${Array.from({length: Math.min(curTopic?.parts || 1, 60)}, (_, i) => {
                      const p = i + 1;
                      return `<option value="${p}" ${state.gmPart===p?'selected':''}>Phần ${p} (25 từ vựng)</option>`;
                    }).join('')}
                  </select>
                </div>
              </div>
            ` : `
              <div class="flex flex-wrap gap-2">
                <button onclick="state.gameSourceKey='learned';render()" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${state.gameSourceKey==='learned'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">✅ Toàn bộ từ đã học (${state.learnedWords.length} từ)</button>
                <button onclick="state.gameSourceKey='myvocab';render()" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${state.gameSourceKey==='myvocab'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">📒 Từ vựng của bản thân (${state.personalWords.length} từ)</button>
              </div>
            `}

            <div class="pt-2.5 border-t border-[var(--border)] flex flex-wrap justify-between items-center gap-2 text-xs">
              <label class="flex items-center gap-2 font-bold cursor-pointer">
                <input type="checkbox" ${state.excludeMemorized?'checked':''} onchange="state.excludeMemorized=this.checked;render()" />
                <span>✓ Bỏ qua các từ đã nhớ (Đang chơi ${activeWords.length}/${rawWords.length} từ • Đã bỏ ${skippedCnt} từ)</span>
              </label>
              <button onclick="state.gmChecklistOpen=!state.gmChecklistOpen;render()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">
                ${state.gmChecklistOpen ? '▲ Thu gọn danh sách từ' : '📋 Bấm chọn từ Đã nhớ để bỏ khỏi game'}
              </button>
            </div>

            ${state.gmChecklistOpen ? `
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-56 overflow-y-auto p-2 rounded-xl bg-[var(--content)] border border-[var(--border)]">
                ${rawWords.map(w => {
                  const ex = Boolean(state.excludedWords[w.word.toLowerCase()]);
                  return `
                    <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs ${ex?'opacity-60 line-through':''}">
                      <div class="truncate"><strong>${w.word}</strong> — ${w.meaning}</div>
                      <button onclick="toggleExcludeWord('${w.word.replace(/'/g,"\\'")}')" class="px-2 py-0.5 rounded bg-[var(--content)] font-bold shrink-0 cursor-pointer">${ex?'↩ Học lại':'✓ Đã nhớ'}</button>
                    </div>`;
                }).join('')}
              </div>` : ''}
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${modes.map(m => `
              <div onclick="go('${m.id}')" class="hover-box bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 cursor-pointer flex flex-col gap-1.5" style="--tile-c:${m.col};border-top:3px solid ${m.col};">
                <div class="text-xl">${m.icon}</div>
                <div class="font-bold text-sm">${m.name}</div>
                <div class="text-xs text-[var(--muted-foreground)]">${m.desc}</div>
                <div class="text-xs font-bold mt-auto pt-1" style="color:${m.col};">Vào chơi ngay →</div>
              </div>`).join('')}
          </div>
        </div>`;
    }

    // 4. HOLLOW KNIGHT: SILKSONG (CANVAS RIDDLE FILL-IN-THE-BLANK)
    function renderSilksong(v) {
      const words = getActiveGameWords();
      const ss = { idx:0, score:0, combo:0, masks:5, silk:0, dash:0, shake:0 };
      v.innerHTML = `
        <div class="space-y-3 max-w-3xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer mr-2">← Kho Game</button><span class="font-extrabold text-sm">🕷️ Hollow Knight: Silksong — ${getActiveGameTitle()}</span></div>
            <div class="flex items-center gap-3 text-xs font-mono font-bold"><span id="ss-m">🤍🤍🤍🤍🤍</span><span id="ss-c" style="color:#ea580c;">🔥 x0</span><span id="ss-p" style="color:#be123c;">0 PTS</span></div>
          </div>
          <div class="rounded-2xl overflow-hidden border border-[var(--border)] relative" style="background:#12070d;">
            <div class="absolute top-2 left-3 right-3 flex justify-between items-center text-xs text-white font-bold z-10">
              <span>HORNET • MÊ CUNG PHARLOOM</span>
              <button id="ss-storm" disabled class="px-2.5 py-1 rounded-lg font-bold cursor-pointer disabled:opacity-40" style="background:#be123c;color:#fff;">🕸️ Tơ Lụa 0%</button>
            </div>
            <canvas id="ss-cv" width="760" height="190" class="w-full h-auto block"></canvas>
          </div>
          <div id="ss-box" class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 text-center space-y-3"></div>
        </div>`;
      const cv = document.getElementById('ss-cv'), ctx = cv.getContext('2d');
      function loop(now) {
        if (!document.body.contains(cv)) return;
        state.rafs.push(requestAnimationFrame(loop));
        const t = now * 0.001;
        if (ss.dash > 0) ss.dash = Math.max(0, ss.dash - 0.045);
        if (ss.shake > 0) ss.shake = Math.max(0, ss.shake - 0.7);
        ctx.save();
        if (ss.shake > 0) ctx.translate((Math.random()-0.5)*ss.shake, (Math.random()-0.5)*ss.shake);
        const g = ctx.createLinearGradient(0,0,0,190); g.addColorStop(0,'#0d0914'); g.addColorStop(1,'#3b0a1b');
        ctx.fillStyle = g; ctx.fillRect(0,0,760,190);
        ctx.fillStyle = '#09070d'; ctx.fillRect(0,156,760,34);
        ctx.fillStyle = '#f43f5e'; ctx.fillRect(0,154,760,2);
        // Weaver Silk Seal & Guardian
        ctx.strokeStyle = '#fda4af'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(540, 110, 26 + Math.sin(t*4)*3, 0, 6.28); ctx.stroke();
        ctx.fillStyle = '#1f1626'; ctx.beginPath(); ctx.ellipse(620, 112 + Math.sin(t*3)*5, 22, 32, 0, 0, 6.28); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(620, 92 + Math.sin(t*3)*5, 13, 0, 6.28); ctx.fill();
        // Hornet silhouette with crimson cloak & horned mask & needle
        const hx = 140 + (ss.dash > 0 ? Math.sin(ss.dash * Math.PI) * 340 : 0), hy = 152 + Math.sin(t*5)*2;
        if (ss.dash > 0) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(140, hy-28); ctx.lineTo(hx, hy-28); ctx.stroke(); }
        ctx.fillStyle = '#be123c'; ctx.beginPath(); ctx.moveTo(hx, hy-38); ctx.lineTo(hx-20, hy-4); ctx.lineTo(hx+18, hy-4); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.moveTo(hx-10,hy-38); ctx.lineTo(hx-7,hy-64); ctx.lineTo(hx,hy-48); ctx.lineTo(hx+7,hy-64); ctx.lineTo(hx+10,hy-38); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx-10,hy-28); ctx.lineTo(hx+46+ss.dash*16, hy-30); ctx.stroke();
        ctx.restore();
      }
      state.rafs.push(requestAnimationFrame(loop));
      function drawQ() {
        const w = words[ss.idx % words.length];
        const blank = (w.ex || '').replace(new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'i'), '________');
        document.getElementById('ss-box').innerHTML = `
          <div class="text-xs font-bold" style="color:#be123c;">📜 MÀN GIẢI ĐOÁN ĐIỀN TỪ #${ss.idx+1} • ${w.word.length} ký tự • ${w.ipa}</div>
          <div class="font-bold text-sm">"${blank}"</div>
          <div class="text-xs text-[var(--muted-foreground)]">Manh mối: <strong class="text-[var(--primary)]">${w.meaning}</strong> • Ký tự đầu: <code>${w.word[0]}</code></div>
          <div id="ss-fx" class="min-h-10 rounded-xl bg-[var(--content)] border border-[var(--border)] flex items-center justify-center font-mono text-lg font-extrabold"></div>
          <form id="ss-f" class="flex justify-center gap-2 max-w-md mx-auto">
            <input id="ss-in" autocomplete="off" autofocus placeholder="Điền từ phá ấn ký..." class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-mono text-sm text-center" />
            <button type="submit" class="px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#be123c;">⚔️ Chém Phá Ấn</button>
          </form>`;
        const inp = document.getElementById('ss-in');
        inp.oninput = () => { burstSparks(inp, 6); document.getElementById('ss-fx').innerHTML = inp.value.split('').map((c,i)=>`<span class="fx-ch" style="color:${COLORS[i%COLORS.length]}">${c}</span>`).join(''); };
        const solve = (ok, storm=false) => {
          if (ok) {
            ss.combo++; ss.dash = 1; ss.shake = 10; ss.score += storm ? 40 : 30 * ss.combo; ss.silk = storm ? 0 : Math.min(100, ss.silk + 35);
            state.user.grindPts += 25;
            if (ss.combo >= 2 || storm) triggerStreakFx(Math.max(2, ss.combo), storm ? '⚡ BÃO TƠ LỤA PHÁ ẤN!' : `Hornet phá ấn "${w.word}"!`);
            else notify(`⚔️ Phá ấn "${w.word}" thành công!`);
          } else {
            ss.combo = 0; ss.masks = Math.max(1, ss.masks - 1); ss.shake = 12;
            notify(`✕ Ấn ký đúng là "${w.word}" (${w.meaning})!`);
          }
          speak(w.word); ss.idx++;
          document.getElementById('ss-m').textContent = '🤍'.repeat(ss.masks) + '🖤'.repeat(5 - ss.masks);
          document.getElementById('ss-c').textContent = `🔥 x${ss.combo}`;
          document.getElementById('ss-p').textContent = `${ss.score} PTS`;
          const sb = document.getElementById('ss-storm'); sb.disabled = ss.silk < 100; sb.textContent = ss.silk >= 100 ? '⚡ BÃO TƠ LỤA!' : `🕸️ Tơ Lụa ${ss.silk}%`;
          drawQ();
        };
        document.getElementById('ss-storm').onclick = () => { if (ss.silk >= 100) solve(true, true); };
        document.getElementById('ss-f').onsubmit = (e) => { e.preventDefault(); solve(inp.value.trim().toLowerCase() === w.word.toLowerCase()); };
      }
      drawQ();
    }

    // 5. BẮN TRÚNG BIA ĐIỀN TỪ (CANVAS MOVING TARGET)
    function renderArchery(v) {
      const words = getActiveGameWords();
      const ar = { idx:0, score:0, combo:0, bulls:0, ty:95, arrow:null, shake:0 };
      v.innerHTML = `
        <div class="space-y-3 max-w-3xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer mr-2">← Kho Game</button><span class="font-extrabold text-sm">🎯 Bắn Trúng Bia — ${getActiveGameTitle()}</span></div>
            <div class="flex items-center gap-3 text-xs font-mono font-bold"><span>🎯 Hồng tâm: <strong id="ar-b">0</strong></span><span id="ar-c" style="color:#ea580c;">🔥 x0</span><span id="ar-p" class="text-[var(--primary)]">0 PTS</span></div>
          </div>
          <div class="rounded-2xl overflow-hidden border border-[var(--border)]"><canvas id="ar-cv" width="760" height="190" class="w-full h-auto block"></canvas></div>
          <div id="ar-box" class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 text-center space-y-3"></div>
        </div>`;
      const cv = document.getElementById('ar-cv'), ctx = cv.getContext('2d');
      function loop(now) {
        if (!document.body.contains(cv)) return;
        state.rafs.push(requestAnimationFrame(loop));
        const t = now * 0.001;
        ar.ty = 95 + Math.sin(t * 2.2) * 44;
        if (ar.shake > 0) ar.shake = Math.max(0, ar.shake - 0.7);
        ctx.save();
        if (ar.shake > 0) ctx.translate((Math.random()-0.5)*ar.shake, (Math.random()-0.5)*ar.shake);
        const sky = ctx.createLinearGradient(0,0,0,190); sky.addColorStop(0,'#0c4a6e'); sky.addColorStop(1,'#38bdf8');
        ctx.fillStyle = sky; ctx.fillRect(0,0,760,190);
        ctx.fillStyle = '#15803d'; ctx.fillRect(0,152,760,38);
        // Bow
        ctx.strokeStyle = '#fef3c7'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(82, 102, 32, -1.2, 1.2); ctx.stroke();
        // Concentric Target
        const rings = [{r:36,c:'#fff'},{r:28,c:'#1e293b'},{r:21,c:'#0284c7'},{r:14,c:'#dc2626'},{r:7,c:'#fbbf24'}];
        rings.forEach(rg => { ctx.fillStyle = rg.c; ctx.beginPath(); ctx.arc(640, ar.ty, rg.r, 0, 6.28); ctx.fill(); });
        if (ar.arrow) {
          ar.arrow.p += 0.14;
          const ax = 82 + (640 - 82) * Math.min(1, ar.arrow.p), ay = 102 + (ar.arrow.ty - 102) * Math.min(1, ar.arrow.p) - Math.sin(Math.min(1,ar.arrow.p)*Math.PI)*24;
          ctx.strokeStyle = '#fef08a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ax-28, ay); ctx.lineTo(ax+10, ay); ctx.stroke();
          if (ar.arrow.p >= 1) { ar.shake = 10; ar.arrow = null; }
        }
        ctx.restore();
      }
      state.rafs.push(requestAnimationFrame(loop));
      function drawQ() {
        const w = words[ar.idx % words.length];
        document.getElementById('ar-box').innerHTML = `
          <div class="text-lg font-extrabold text-[var(--primary)]">${w.meaning}</div>
          <div class="text-xs font-mono text-[var(--muted-foreground)]">${w.ipa} • ${w.word.length} chữ cái • Bắt đầu: <code>${w.word[0]}</code></div>
          <div id="ar-fx" class="min-h-10 rounded-xl bg-[var(--content)] border border-[var(--border)] flex items-center justify-center font-mono text-lg font-extrabold"></div>
          <form id="ar-f" class="flex justify-center gap-2 max-w-md mx-auto">
            <input id="ar-in" autocomplete="off" autofocus placeholder="Gõ từ tiếng Anh để bắn tên..." class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-mono text-sm text-center" />
            <button type="submit" class="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">🏹 Bắn Bia</button>
          </form>`;
        const inp = document.getElementById('ar-in');
        inp.oninput = () => { burstSparks(inp, 6); document.getElementById('ar-fx').innerHTML = inp.value.split('').map((c,i)=>`<span class="fx-ch" style="color:${COLORS[i%COLORS.length]}">${c}</span>`).join(''); };
        document.getElementById('ar-f').onsubmit = (e) => {
          e.preventDefault();
          const ok = inp.value.trim().toLowerCase() === w.word.toLowerCase();
          if (ok) {
            ar.combo++; const bull = Math.abs(ar.ty - 95) < 26; if (bull) ar.bulls++;
            const pts = (bull ? 100 : 60) * ar.combo; ar.score += pts; state.user.grindPts += 20;
            ar.arrow = { p:0, ty: ar.ty };
            if (bull || ar.combo >= 2) triggerStreakFx(Math.max(2, ar.combo), bull ? `🎯 HỒNG TÂM +${pts} PTS!` : `✓ Trúng bia +${pts} PTS!`);
            else notify(`🎯 Trúng bia "${w.word}" +${pts} PTS!`);
          } else {
            ar.combo = 0; ar.arrow = { p:0, ty: 24 };
            notify(`✕ Bắn trượt! Đáp án đúng là "${w.word}"`);
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

    // 6. VÕ ĐÀI SHADOW FIGHT 2 (PRESERVED!)
    function renderShadowFight(v) {
      const words = getActiveGameWords();
      const sf = { pHp:100, eHp:100, energy:0, combo:0, idx:0, pAtk:0, eAtk:0, shake:0, slash:0 };
      v.innerHTML = `
        <div class="space-y-3 max-w-3xl mx-auto">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer mr-2">← Kho Game</button><span class="font-extrabold text-sm">🥷 Shadow Fight 2 — ${getActiveGameTitle()}</span></div>
            <span id="sf-combo" class="text-xs font-mono font-bold px-3 py-1 rounded-full" style="background:rgba(249,115,22,0.16);color:#ea580c;">🔥 Combo x0</span>
          </div>
          <div class="rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg" style="background:#1c0f0a;">
            <div class="grid grid-cols-2 gap-4 p-3 text-xs text-white font-bold">
              <div><div class="flex justify-between mb-1"><span>LÃNG KHÁCH</span><span id="sf-php-txt" class="font-mono">100/100</span></div><div class="h-2.5 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.2);"><div id="sf-php" class="h-full" style="width:100%;background:#10b981;"></div></div><div class="h-1.5 mt-1 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.18);"><div id="sf-eng" class="h-full" style="width:0%;background:#fbbf24;"></div></div></div>
              <div><div class="flex justify-between mb-1"><span id="sf-ehp-txt" class="font-mono">100/100</span><span>BOSS LYNX</span></div><div class="h-2.5 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.2);"><div id="sf-ehp" class="h-full ml-auto" style="width:100%;background:#ef4444;"></div></div><div class="text-right mt-1"><button id="sf-fury-btn" disabled class="px-2 py-0.5 rounded text-xs font-bold cursor-pointer disabled:opacity-40" style="background:#f59e0b;color:#111827;">⚡ Nội lực 0%</button></div></div>
            </div>
            <canvas id="sf-canvas" width="760" height="200" class="w-full h-auto block"></canvas>
          </div>
          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-3">
            <div class="flex items-center justify-between"><strong id="sf-word" class="text-xl font-extrabold"></strong><button id="sf-speak" class="px-3 py-1 rounded-xl bg-[var(--content)] text-xs font-semibold cursor-pointer">🔊 Nghe</button></div>
            <div id="sf-choices" class="grid sm:grid-cols-2 gap-2"></div>
          </div>
        </div>`;
      const cv = document.getElementById('sf-canvas'), ctx = cv.getContext('2d');
      function df(x, y, dir, atk) {
        ctx.save(); ctx.translate(x + (atk>0 ? dir*70*Math.sin(atk*Math.PI) : 0), y); ctx.scale(dir, 1);
        ctx.fillStyle = '#09090b'; ctx.beginPath(); ctx.arc(0,-58,11,0,6.28); ctx.fill(); ctx.fillRect(-8,-46,16,28);
        ctx.strokeStyle = atk>0 ? '#fef08a' : '#e2e8f0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(8,-38); ctx.lineTo(46+atk*16,-54); ctx.stroke();
        ctx.restore();
      }
      function loop() {
        if (!document.body.contains(cv)) return;
        state.rafs.push(requestAnimationFrame(loop));
        if (sf.pAtk>0) sf.pAtk = Math.max(0, sf.pAtk-0.05); if (sf.eAtk>0) sf.eAtk = Math.max(0, sf.eAtk-0.05);
        const g = ctx.createLinearGradient(0,0,0,200); g.addColorStop(0,'#7c2d12'); g.addColorStop(1,'#ea580c');
        ctx.fillStyle = g; ctx.fillRect(0,0,760,200); ctx.fillStyle = '#1c1917'; ctx.fillRect(0,168,760,32);
        df(210,168,1,sf.pAtk); df(550,168,-1,sf.eAtk);
      }
      state.rafs.push(requestAnimationFrame(loop));
      function nextT() {
        const w = words[sf.idx % words.length]; sf.idx++;
        const opts = [w, ...ALL_CURRICULUM_WORDS.filter(x=>x.word!==w.word).sort(()=>Math.random()-0.5).slice(0,3)].sort(()=>Math.random()-0.5);
        document.getElementById('sf-word').textContent = `${w.word} ${w.ipa}`;
        document.getElementById('sf-speak').onclick = () => speak(w.word);
        const box = document.getElementById('sf-choices');
        box.innerHTML = opts.map((o,i)=>`<button data-ok="${o.word===w.word?'1':'0'}" class="sf-o text-left p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] hover:border-[var(--primary)] text-xs font-semibold cursor-pointer">${i+1}. ${o.meaning}</button>`).join('');
        box.querySelectorAll('.sf-o').forEach(b => b.onclick = () => {
          if (b.dataset.ok==='1') { sf.combo++; sf.pAtk=1; sf.eHp=Math.max(0,sf.eHp-22); sf.energy=Math.min(100,sf.energy+35); state.user.grindPts+=20; if(sf.combo>=2) triggerStreakFx(sf.combo,'Shadow Fight Combo!'); }
          else { sf.combo=0; sf.eAtk=1; sf.pHp=Math.max(0,sf.pHp-18); }
          if (sf.eHp<=0) { notify('🏆 Hạ gục Boss Lynx!'); sf.eHp=100; }
          document.getElementById('sf-php').style.width=sf.pHp+'%'; document.getElementById('sf-ehp').style.width=sf.eHp+'%';
          document.getElementById('sf-php-txt').textContent=sf.pHp+'/100'; document.getElementById('sf-ehp-txt').textContent=sf.eHp+'/100';
          document.getElementById('sf-eng').style.width=sf.energy+'%'; document.getElementById('sf-combo').textContent=`🔥 Combo x${sf.combo}`;
          const fb = document.getElementById('sf-fury-btn'); fb.disabled = sf.energy < 100; fb.textContent = sf.energy>=100 ? '⚡ BÍ KỸ (-45 HP)!' : `⚡ Nội lực ${sf.energy}%`;
          nextT();
        });
      }
      document.getElementById('sf-fury-btn').onclick = () => { sf.energy=0; sf.pAtk=1; sf.eHp=Math.max(0,sf.eHp-45); triggerStreakFx(5,'⚡ BÍ KỸ BÓNG TỐI!'); if(sf.eHp<=0) sf.eHp=100; };
      nextT();
    }

    // 7. GAME OFFLINE 3 KỸ NĂNG: NGHE • ĐIỀN • NÓI
    function renderOfflineGame(v) {
      const words = getActiveGameWords();
      const oq = { idx:0, score:0, combo:0 };
      const skills = ['listen','fill','speak'];
      v.innerHTML = `
        <div class="space-y-3 max-w-3xl mx-auto">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer mr-2">← Kho Game</button><span class="font-extrabold text-sm">📡 Game Offline (Nghe•Điền•Nói) — ${getActiveGameTitle()}</span></div>
            <div class="text-xs font-mono font-bold">🔥 x<span id="oq-c">0</span> • <span id="oq-s" class="text-[var(--primary)]">0 PTS</span> • 🏆 ${state.offlineBest}</div>
          </div>
          <div id="oq-box" class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 text-center space-y-3"></div>
        </div>`;
      function step() {
        const w = words[oq.idx % words.length], sk = skills[oq.idx % 3], host = document.getElementById('oq-box');
        const award = (ok, pts, lbl) => {
          if (ok) { oq.combo++; oq.score += pts * oq.combo; state.user.grindPts += pts; if (oq.score > state.offlineBest) { state.offlineBest = oq.score; localStorage.setItem('tvmn_preview_oq_best', String(oq.score)); } if (oq.combo>=2) triggerStreakFx(oq.combo, `Offline ${lbl} +${pts*oq.combo} PTS!`); else notify(`✓ Vượt ải ${lbl}!`); }
          else { oq.combo = 0; notify(`✕ Đáp án đúng: "${w.word}"`); }
          oq.idx++; document.getElementById('oq-c').textContent = oq.combo; document.getElementById('oq-s').textContent = oq.score + ' PTS'; step();
        };
        if (sk === 'listen') {
          const opts = [w, ...ALL_CURRICULUM_WORDS.filter(x=>x.word!==w.word).sort(()=>Math.random()-0.5).slice(0,3)].sort(()=>Math.random()-0.5);
          host.innerHTML = `<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--content)] text-[var(--primary)]">🎧 ẢI NGHE</span><div class="flex justify-center gap-2"><button onclick="speak('${w.word}',0.95)" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🔊 Nghe chuẩn</button><button onclick="speak('${w.word}',0.68)" class="px-4 py-2 rounded-xl bg-[var(--content)] text-xs font-bold cursor-pointer">🐢 Nghe chậm</button></div><div class="grid sm:grid-cols-2 gap-2 text-left">${opts.map(o=>`<button class="ol p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer" data-ok="${o.word===w.word?'1':'0'}">${o.word}</button>`).join('')}</div>`;
          speak(w.word); host.querySelectorAll('.ol').forEach(b=>b.onclick=()=>award(b.dataset.ok==='1',15,'NGHE'));
        } else if (sk === 'fill') {
          host.innerHTML = `<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--content)] text-[var(--primary)]">✍️ ẢI ĐIỀN SẮC MÀU</span><div class="font-bold text-sm">${w.meaning} (${w.word.length} chữ)</div><form id="of-f" class="flex justify-center gap-2 max-w-md mx-auto"><input id="of-i" class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-mono text-sm text-center" placeholder="Điền từ..." /><button class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">Gửi</button></form>`;
          document.getElementById('of-f').onsubmit = (e)=>{ e.preventDefault(); award(document.getElementById('of-i').value.trim().toLowerCase()===w.word.toLowerCase(),20,'ĐIỀN'); };
        } else {
          host.innerHTML = `<span class="text-xs font-bold px-2.5 py-1 rounded-full" style="background:rgba(249,115,22,0.16);color:#ea580c;">🎙️ ẢI NÓI</span><div class="text-2xl font-extrabold">${w.word}</div><div class="text-xs font-mono text-[var(--muted-foreground)]">${w.ipa} • ${w.meaning}</div><div class="flex justify-center gap-2 flex-wrap"><button onclick="speak('${w.word}')" class="px-3 py-2 rounded-xl bg-[var(--content)] text-xs font-bold cursor-pointer">🔊 Nghe mẫu</button><button id="os-ok" class="px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#ea580c;">🎙️ Xác nhận phát âm chuẩn (+30đ)</button></div>`;
          document.getElementById('os-ok').onclick = ()=>award(true,30,'NÓI');
        }
      }
      step();
    }

    // 8. NỐI TỪ VỚI NGHĨA
    function renderMatch(v) {
      const pairs = getActiveGameWords().slice(0, 5);
      const left = [...pairs].sort(()=>Math.random()-0.5), right = [...pairs].sort(()=>Math.random()-0.5);
      let selL = null, matched = new Set(), combo = 0;
      function draw() {
        v.innerHTML = `
          <div class="space-y-3 max-w-2xl mx-auto">
            <div class="flex justify-between items-center"><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-semibold cursor-pointer">← Kho Game</button><span class="font-bold text-sm">🔗 Nối Từ Với Nghĩa (${matched.size}/${pairs.length})</span></div>
            <div class="grid sm:grid-cols-2 gap-3">
              <div class="space-y-2">${left.map(w=>`<button class="ml w-full text-left p-3 rounded-xl border text-xs font-bold cursor-pointer ${matched.has(w.word)?'opacity-40 bg-[var(--content)]':selL===w.word?'bg-[var(--primary)] text-[var(--primary-foreground)]':'bg-[var(--card)] border-[var(--border)]'}" data-w="${w.word}" ${matched.has(w.word)?'disabled':''}>${w.word} <span class="font-mono font-normal opacity-75">${w.ipa}</span></button>`).join('')}</div>
              <div class="space-y-2">${right.map(w=>`<button class="mr w-full text-left p-3 rounded-xl border text-xs font-semibold cursor-pointer ${matched.has(w.word)?'opacity-40 bg-[var(--content)]':'bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)]'}" data-w="${w.word}" ${matched.has(w.word)?'disabled':''}>${w.meaning}</button>`).join('')}</div>
            </div>
          </div>`;
        v.querySelectorAll('.ml').forEach(b=>b.onclick=()=>{ selL=b.dataset.w; speak(selL); draw(); });
        v.querySelectorAll('.mr').forEach(b=>b.onclick=()=>{
          if (!selL) return notify('Hãy chọn 1 từ tiếng Anh bên trái trước!');
          if (selL === b.dataset.w) {
            matched.add(selL); selL = null; combo++; state.user.grindPts += 10;
            if (combo>=2) triggerStreakFx(combo, 'Nối từ siêu tốc!');
            if (matched.size === pairs.length) { notify('🎉 Hoàn thành Nối Từ Với Nghĩa!'); return renderMatch(v); }
          } else { combo = 0; selL = null; notify('✕ Chưa khớp, thử lại nhé!'); }
          draw();
        });
      }
      draw();
    }

    // 9. NGHE TIẾNG ANH -> CHỌN NGHĨA TIẾNG VIỆT
    function renderListenChooseVi(v) {
      const words = getActiveGameWords(); let idx = 0, combo = 0;
      function draw() {
        const w = words[idx % words.length];
        const opts = [w, ...ALL_CURRICULUM_WORDS.filter(x=>x.word!==w.word).sort(()=>Math.random()-0.5).slice(0,3)].sort(()=>Math.random()-0.5);
        v.innerHTML = `
          <div class="max-w-xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center space-y-4">
            <div class="flex justify-between items-center"><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] text-xs font-semibold cursor-pointer">← Kho Game</button><span class="text-xs font-bold" style="color:#ea580c;">🔥 x${combo}</span></div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-[var(--content)] text-[var(--primary)]">🎧 NGHE TIẾNG ANH → CHỌN NGHĨA TIẾNG VIỆT</span>
            <div class="flex justify-center gap-2"><button onclick="speak('${w.word}',0.94)" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🔊 Nghe phát âm (1.0x)</button><button onclick="speak('${w.word}',0.66)" class="px-4 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🐢 Nghe chậm (0.7x)</button></div>
            <div class="grid sm:grid-cols-2 gap-2 text-left">${opts.map((o,i)=>`<button class="lcv p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] hover:border-[var(--primary)] text-xs font-semibold cursor-pointer" data-ok="${o.word===w.word?'1':'0'}">${i+1}. ${o.meaning}</button>`).join('')}</div>
          </div>`;
        speak(w.word);
        v.querySelectorAll('.lcv').forEach(b=>b.onclick=()=>{
          if (b.dataset.ok==='1') { combo++; state.user.grindPts+=15; if(combo>=2) triggerStreakFx(combo,`Nghe chuẩn: "${w.word}"!`); else notify(`✓ Chính xác: "${w.word}" = ${w.meaning}`); }
          else { combo=0; notify(`✕ Từ vừa phát âm là "${w.word}" (${w.meaning})`); }
          idx++; draw();
        });
      }
      draw();
    }

    // 10. TỪ VIỆT -> CHỌN TỪ VỰNG ANH
    function renderViToEn(v) {
      const words = getActiveGameWords(); let idx = 0, combo = 0;
      function draw() {
        const w = words[idx % words.length];
        const opts = [w, ...ALL_CURRICULUM_WORDS.filter(x=>x.word!==w.word).sort(()=>Math.random()-0.5).slice(0,3)].sort(()=>Math.random()-0.5);
        v.innerHTML = `
          <div class="max-w-xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center space-y-4">
            <div class="flex justify-between items-center"><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] text-xs font-semibold cursor-pointer">← Kho Game</button><span class="text-xs font-bold" style="color:#ea580c;">🔥 x${combo}</span></div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-[var(--content)] text-[var(--primary)]">🇻🇳→🇬🇧 TỪ VIỆT CHỌN TỪ VỰNG ANH</span>
            <div class="text-xl font-extrabold text-[var(--primary)]">${w.meaning}</div>
            <div class="grid sm:grid-cols-2 gap-2 text-left">${opts.map((o,i)=>`<button class="vte p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] hover:border-[var(--primary)] text-xs font-bold cursor-pointer" data-ok="${o.word===w.word?'1':'0'}">${i+1}. ${o.word} <span class="font-mono font-normal text-[var(--muted-foreground)]">${o.ipa}</span></button>`).join('')}</div>
          </div>`;
        v.querySelectorAll('.vte').forEach(b=>b.onclick=()=>{
          speak(w.word);
          if (b.dataset.ok==='1') { combo++; state.user.grindPts+=15; if(combo>=2) triggerStreakFx(combo,`Phản xạ Việt→Anh siêu nhanh!`); else notify(`✓ Chính xác: "${w.word}"!`); }
          else { combo=0; notify(`✕ Đáp án đúng là "${w.word}"!`); }
          idx++; draw();
        });
      }
      draw();
    }

    // 11. GÕ CHỮ SẮC MÀU
    function renderTyping(v) {
      const words = getActiveGameWords(); let idx = 0, combo = 0;
      function draw() {
        const cur = words[idx % words.length];
        v.innerHTML = `
          <div class="max-w-xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4 text-center">
            <div class="flex justify-between items-center"><button onclick="go('games')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] text-xs font-semibold cursor-pointer">← Kho Game</button><span class="text-xs font-bold" style="color:#ea580c;">🔥 x${combo}</span></div>
            <div class="text-lg font-extrabold text-[var(--primary)]">${cur.meaning}</div>
            <div id="fx-st" class="min-h-12 rounded-xl bg-[var(--content)] border border-[var(--border)] flex items-center justify-center font-mono text-2xl font-extrabold"></div>
            <form id="ty-f" class="flex gap-2"><input id="ty-i" autocomplete="off" autofocus placeholder="Gõ '${cur.word}'..." class="flex-1 px-4 py-2.5 rounded-xl bg-[var(--content)] border-2 border-[var(--border)] text-center font-mono text-sm font-bold outline-none" /><button class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">Kiểm tra</button></form>
          </div>`;
        const inp = document.getElementById('ty-i'), st = document.getElementById('fx-st');
        inp.oninput = () => { burstSparks(inp,7); st.innerHTML = inp.value.split('').map((c,i)=>`<span class="fx-ch" style="color:${COLORS[i%COLORS.length]}">${c}</span>`).join(''); };
        document.getElementById('ty-f').onsubmit = (e) => {
          e.preventDefault();
          if (inp.value.trim().toLowerCase() === cur.word.toLowerCase()) { combo++; if(combo>=2) triggerStreakFx(combo,`Gõ sắc màu "${cur.word}"!`); else notify(`✓ Chính xác "${cur.word}"!`); idx++; draw(); }
          else { combo=0; notify(`Đáp án là "${cur.word}"!`); }
        };
      }
      draw();
    }

    // RICH CHAT COMPONENT (TEXT, ẢNH, VIDEO, ĐOẠN THOẠI + TỐ CÁO)
    function renderRichChatHtml(ctxName, msgs, targetId, targetName) {
      return `
        <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-3">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <div class="font-bold text-sm">💬 Nhắn Tin Đa Phương Tiện (Chữ • Ảnh • Video • Đoạn Thoại)</div>
              <div class="text-xs text-[var(--muted-foreground)]">Hỗ trợ gửi ảnh bài học, video, ghi âm đoạn thoại & nút Tố cáo về Quản trị viên.</div>
            </div>
            <button onclick="openReport(${targetId},'${targetName.replace(/'/g,'')}','${ctxName}')" class="px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#dc2626;">🚨 Tố cáo ${targetName.split('•')[0].trim()}</button>
          </div>
          <div class="max-h-56 overflow-y-auto space-y-2 p-3 rounded-xl bg-[var(--content)] border border-[var(--border)]">
            ${msgs.map(m => {
              const mine = m.senderId === 1;
              return `
                <div class="flex ${mine?'justify-end':'justify-start'}">
                  <div class="max-w-xs sm:max-w-md px-3 py-2 rounded-xl text-xs space-y-1 ${mine?'bg-[var(--primary)] text-[var(--primary-foreground)]':'bg-[var(--card)] border border-[var(--border)]'}">
                    <div class="flex justify-between items-center gap-3 font-bold opacity-85">
                      <span>${mine?'Bạn':m.senderName}</span>
                      ${!mine?`<button onclick="openReport(${m.senderId},'${m.senderName.replace(/'/g,'')}','${ctxName}')" class="cursor-pointer" style="color:#dc2626;">🚨</button>`:''}
                    </div>
                    ${m.type==='image'?`<img src="${m.url}" class="rounded-lg max-h-40 object-cover" />`:''}
                    ${m.type==='video'?`<video src="${m.url}" controls class="rounded-lg max-h-40"></video>`:''}
                    ${m.type==='audio'?`<audio src="${m.url}" controls class="h-8 max-w-full"></audio>`:''}
                    ${m.text?`<div>${m.text}</div>`:''}
                  </div>
                </div>`;
            }).join('')}
          </div>
          <div class="flex flex-wrap gap-1.5 items-center">
            <label class="px-2.5 py-1.5 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-semibold cursor-pointer">🖼️ Ảnh<input type="file" accept="image/*" class="hidden" onchange="sendMediaMsg('${ctxName}','image',this)" /></label>
            <label class="px-2.5 py-1.5 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-semibold cursor-pointer">🎬 Video<input type="file" accept="video/*" class="hidden" onchange="sendMediaMsg('${ctxName}','video',this)" /></label>
            <button onclick="recordVoiceMsg('${ctxName}')" id="vc-btn-${ctxName}" class="px-2.5 py-1.5 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-semibold cursor-pointer">🎙️ Ghi Đoạn Thoại</button>
            <label class="px-2.5 py-1.5 rounded-lg bg-[var(--content)] border border-[var(--border)] text-xs font-semibold cursor-pointer">🎵 Tệp Thoại<input type="file" accept="audio/*" class="hidden" onchange="sendMediaMsg('${ctxName}','audio',this)" /></label>
          </div>
          <form onsubmit="sendTextMsg(event,'${ctxName}')" class="flex gap-2">
            <input id="chat-in-${ctxName}" placeholder="Nhập tin nhắn..." class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs" />
            <button class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">Gửi</button>
          </form>
        </div>`;
    }

    function pushChat(ctxName, msgObj) {
      if (ctxName === 'duel') state.duelMsgs.push(msgObj);
      else state.loungeMsgs.push(msgObj);
      render();
    }
    function sendTextMsg(e, ctxName) {
      e.preventDefault();
      const inp = document.getElementById('chat-in-' + ctxName);
      const txt = inp.value.trim(); if (!txt) return;
      pushChat(ctxName, { senderId:1, senderName:state.user.name, type:'text', text:txt });
    }
    function sendMediaMsg(ctxName, type, inputEl) {
      const f = inputEl.files?.[0]; if (!f) return;
      const url = URL.createObjectURL(f);
      pushChat(ctxName, { senderId:1, senderName:state.user.name, type, url, text: type==='audio'?'🎙️ Đoạn thoại':type==='video'?'🎬 Video':'🖼️ Hình ảnh' });
      notify('Đã gửi ' + (type==='image'?'ảnh':type==='video'?'video':'đoạn thoại') + ' thành công!');
    }
    async function recordVoiceMsg(ctxName) {
      if (state.recorder && state.recorder.state === 'recording') { state.recorder.stop(); return; }
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') return notify('Hãy dùng nút "🎵 Tệp Thoại" nếu khung preview không hỗ trợ Micro!');
      try {
        state.recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        state.recorder = new MediaRecorder(state.recStream);
        state.recorder.ondataavailable = (ev) => chunks.push(ev.data);
        state.recorder.onstop = () => {
          state.recStream?.getTracks().forEach(t=>t.stop());
          const url = URL.createObjectURL(new Blob(chunks, { type: 'audio/webm' }));
          pushChat(ctxName, { senderId:1, senderName:state.user.name, type:'audio', url, text:'🎙️ Đoạn thoại vừa ghi âm' });
        };
        state.recorder.start();
        const b = document.getElementById('vc-btn-' + ctxName);
        if (b) { b.textContent = '⏹ Dừng & Gửi thoại'; b.style.background = '#dc2626'; b.style.color = '#fff'; }
      } catch { notify('Không mở được Mic — bạn có thể dùng nút "🎵 Tệp Thoại"!'); }
    }

    // 12. ĐỐI KHÁNG 1v1 (BẮT BUỘC NGẪU NHIÊN THEO NĂNG LỰC + NHẮN TIN + TỐ CÁO)
    // 11B. BÀI KIỂM TRA ÔN TỪ VỰNG BẮT BUỘC HÀNG TUẦN (TÀI KHOẢN THƯỜNG & PRO)
    function initWeeklyQuiz(forceReset = false) {
      const wq = state.weeklyQuiz;
      if (!forceReset && wq.questions.length && !wq.finished) return;
      const pool = [...state.learnedWords, ...state.personalWords, ...ALL_CURRICULUM_WORDS];
      const uniq = [];
      const seen = new Set();
      pool.forEach(w => {
        const k = (w.word || '').toLowerCase();
        if (k && !seen.has(k)) { seen.add(k); uniq.push(w); }
      });
      const shuffled = uniq.sort(() => Math.random() - 0.5).slice(0, 8);
      wq.questions = shuffled.map(item => {
        const wrongs = uniq.filter(x => x.word !== item.word).sort(() => Math.random() - 0.5).slice(0, 3);
        const opts = [item, ...wrongs].sort(() => Math.random() - 0.5);
        return { item, opts, picked: null };
      });
      wq.idx = 0;
      wq.score = 0;
      wq.answered = false;
      wq.finished = false;
    }

    function answerWeeklyQuiz(optIdx) {
      const wq = state.weeklyQuiz;
      const cur = wq.questions[wq.idx];
      if (!cur || cur.picked !== null) return;
      cur.picked = optIdx;
      const chosen = cur.opts[optIdx];
      if (chosen.word === cur.item.word) {
        wq.score++;
        speak(cur.item.word);
      }
      render();
    }

    function nextWeeklyQuizStep() {
      const wq = state.weeklyQuiz;
      if (wq.idx + 1 < wq.questions.length) {
        wq.idx++;
      } else {
        wq.finished = true;
        if (wq.score >= 5) {
          const wk = getCurrentWeekKey();
          wq.completedWeek = wk;
          wq.lastScore = wq.score;
          try {
            localStorage.setItem('tvmn_weekly_quiz_week', wk);
            localStorage.setItem('tvmn_weekly_quiz_score', String(wq.score));
          } catch {}
          const me = state.users.find(u => u.me);
          if (me) { me.coins += 50; me.streak += 1; }
          syncTopRankRewards();
          triggerStreakFx(state.user.streak, `Đạt ${wq.score}/8 — Đã hoàn thành Kiểm tra Ôn Từ Tuần ${wk}!`);
        }
      }
      render();
    }

    function renderWeeklyQuiz(v) {
      const wk = getCurrentWeekKey();
      const done = state.weeklyQuiz.completedWeek === wk;
      const mandatory = isWeeklyQuizMandatoryForUser();
      initWeeklyQuiz(false);
      const wq = state.weeklyQuiz;
      const cur = wq.questions[wq.idx];

      v.innerHTML = `
        <div class="max-w-2xl mx-auto space-y-4">
          <div class="rounded-2xl p-5 text-white space-y-1.5" style="background:linear-gradient(135deg,${done?'#059669,#0f766e':mandatory?'#dc2626,#9a3412':'#0284c7,#0f172a'});">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full" style="background:rgba(255,255,255,0.2);">TUẦN ${wk} • ${mandatory ? 'BẮT BUỘC VỚI THƯỜNG & PRO' : 'MIỄN BẮT BUỘC (ULTRA)'}</span>
              <span class="text-xs font-mono font-bold">${done ? '✅ Đã hoàn thành tuần này' : '⏳ Chưa hoàn thành'}</span>
            </div>
            <h1 class="text-xl font-extrabold">📝 Bài Kiểm Tra Ôn Từ Vựng Hàng Tuần (8 Câu)</h1>
            <p class="text-xs opacity-95">
              ${mandatory
                ? 'Tài khoản <strong>Thường (Free)</strong> và <strong>Pro</strong> bắt buộc hoàn thành 1 bài kiểm tra ôn từ mỗi tuần (đạt từ <strong>5/8 câu</strong> trở lên) để duy trì trí nhớ và mở khóa học bài/chơi game.'
                : 'Tài khoản <strong>Ultra</strong> không bị bắt buộc, nhưng bạn vẫn có thể làm bài để ôn tập và nhận +50 xu thưởng!'}
            </p>
          </div>

          ${done && !wq.questions.some(q => q.picked !== null) && !wq.finished ? `
            <div class="bg-[var(--card)] border-2 border-emerald-500 rounded-2xl p-6 text-center space-y-3">
              <div class="text-4xl">🎉✅</div>
              <h2 class="text-lg font-extrabold text-emerald-700">Bạn đã hoàn thành Bài Kiểm Tra Tuần ${wk}!</h2>
              <p class="text-xs text-[var(--muted-foreground)]">Điểm gần nhất: <strong>${wq.lastScore || 8}/8</strong> • Toàn bộ lộ trình và 12 game đã được mở khóa trong tuần này.</p>
              <div class="flex justify-center gap-2">
                <button onclick="go('roadmaps')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🎯 Tiếp tục học Lộ trình</button>
                <button onclick="initWeeklyQuiz(true);render()" class="px-4 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🔄 Làm thêm lượt ôn tập</button>
              </div>
            </div>` : wq.finished ? `
            <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center space-y-3">
              <div class="text-4xl">${wq.score >= 5 ? '🏆🔥' : '📚💪'}</div>
              <h2 class="text-xl font-extrabold">${wq.score >= 5 ? 'Vượt qua Bài Kiểm Tra Tuần!' : 'Chưa đạt mức yêu cầu (cần tối thiểu 5/8)'}</h2>
              <div class="text-2xl font-mono font-black text-[var(--primary)]">${wq.score} / ${wq.questions.length} câu đúng</div>
              <p class="text-xs text-[var(--muted-foreground)]">${wq.score >= 5 ? 'Chúc mừng! Bạn đã mở khóa toàn bộ bài học và trò chơi trong tuần này (+50 xu, +1 chuỗi).' : 'Hãy thử lại để đạt tối thiểu 5/8 câu đúng và mở khóa bài học nhé!'}</p>
              <div class="flex justify-center gap-2">
                ${wq.score >= 5 ? `<button onclick="go('roadmaps')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🎯 Vào học Lộ trình ngay</button>` : ''}
                <button onclick="initWeeklyQuiz(true);render()" class="px-4 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🔄 Làm lại bài kiểm tra</button>
              </div>
            </div>` : cur ? `
            <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
              <div class="flex justify-between items-center text-xs">
                <span class="font-bold text-[var(--muted-foreground)]">Câu ${wq.idx + 1} / ${wq.questions.length}</span>
                <span class="font-mono font-bold text-[var(--primary)]">Đúng: ${wq.score}</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[var(--content)] overflow-hidden">
                <div class="h-full bg-[var(--primary)] transition-all" style="width:${Math.round(((wq.idx + (cur.picked !== null ? 1 : 0)) / wq.questions.length) * 100)}%;"></div>
              </div>
              <div class="p-4 rounded-2xl bg-[var(--content)] border border-[var(--border)] text-center space-y-1.5">
                <div class="text-xs text-[var(--muted-foreground)]">Chọn nghĩa tiếng Việt đúng của từ sau:</div>
                <div class="text-2xl font-black text-[var(--foreground)]">${cur.item.word}</div>
                <div class="text-xs font-mono text-[var(--muted-foreground)]">${cur.item.ipa || ''} (${cur.item.pos || 'vocab'})</div>
                <button onclick="speak('${cur.item.word.replace(/'/g,"\'")}')" class="mt-1 px-3 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs font-bold cursor-pointer">🔊 Nghe phát âm</button>
              </div>
              <div class="grid gap-2">
                ${cur.opts.map((o, oi) => {
                  const isPicked = cur.picked === oi;
                  const isCorrect = o.word === cur.item.word;
                  let cls = 'bg-[var(--content)] border-[var(--border)] hover:border-[var(--primary)]';
                  if (cur.picked !== null) {
                    if (isCorrect) cls = 'bg-emerald-500/15 border-emerald-500 text-emerald-800 font-bold';
                    else if (isPicked) cls = 'bg-rose-500/15 border-rose-500 text-rose-700';
                    else cls = 'bg-[var(--content)] border-[var(--border)] opacity-60';
                  }
                  return `<button onclick="answerWeeklyQuiz(${oi})" ${cur.picked !== null ? 'disabled' : ''} class="w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold cursor-pointer transition ${cls}">${String.fromCharCode(65 + oi)}. ${o.meaning}</button>`;
                }).join('')}
              </div>
              ${cur.picked !== null ? `
                <div class="flex justify-end">
                  <button onclick="nextWeeklyQuizStep()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-extrabold cursor-pointer">${wq.idx + 1 < wq.questions.length ? 'Câu tiếp theo →' : 'Xem kết quả →'}</button>
                </div>` : ''}
            </div>` : ''}
        </div>`;
    }

    // 12. ĐỐI KHÁNG 1V1 — CHỈ GHÉP TRẬN MỚI VÀO NGÀY 1 HẰNG THÁNG
    function getDuelDayInfo() {
      const now = new Date();
      const day = state.duelSimulateDay1 ? 1 : now.getDate();
      const isDay1 = day === 1;
      const nextFirst = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const diffDays = isDay1 ? 0 : Math.ceil((nextFirst - now) / 86400000);
      const nextDateStr = `01/${String(nextFirst.getMonth() + 1).padStart(2, '0')}/${nextFirst.getFullYear()}`;
      const todayStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      return { isDay1, diffDays, nextDateStr, todayStr, monthKey: `${now.getFullYear()}-${now.getMonth()+1}` };
    }

    function matchNewDuelOpponent() {
      const info = getDuelDayInfo();
      if (!info.isDay1) {
        notify(`🔒 Chưa đến ngày 1 hằng tháng! Phải đợi đến ngày ${info.nextDateStr} (còn ${info.diffDays} ngày) mới được ghép trận mới.`);
        return;
      }
      const candidates = state.users.filter(u => u.status === 'active' && !u.me && u.id !== state.opponent.id);
      if (!candidates.length) { notify('Không tìm thấy đối thủ khác.'); return; }
      candidates.sort((a, b) => Math.abs(a.elo - state.user.elo) - Math.abs(b.elo - state.user.elo));
      const topPool = candidates.slice(0, Math.min(3, candidates.length));
      const picked = topPool[Math.floor(Math.random() * topPool.length)];
      state.opponent = {
        id: picked.id, name: picked.name, elo: picked.elo, streak: picked.streak,
        monthlyDays: 1, grindPts: Math.round(picked.coins * 0.7), color: picked.color, topRank: picked.topRank || 0
      };
      state.duelLastMatchedMonth = info.monthKey;
      state.duelMsgs = [{
        senderId: picked.id, senderName: picked.name, type: 'text',
        text: `Chào bạn! Hôm nay mùng 1 đầu tháng, hệ thống vừa ghép cặp 1v1 chúng ta. Cùng thi đua học từ vựng tháng này nhé! 🔥`
      }];
      triggerStreakFx(state.user.streak, `⚔️ Ghép trận ngày 01 thành công: Đối đầu ${picked.name}!`);
      notify(`⚔️ Đã ghép đối thủ mới ngày 01: ${picked.name} (${picked.elo} ELO)!`);
      render();
    }

    function renderDuel(v) {
      const info = getDuelDayInfo();
      const opUser = state.users.find(u => u.id === state.opponent.id) || state.opponent;
      const myTot = state.user.monthlyDays*120 + state.user.streak*25 + state.user.grindPts;
      const opTot = state.opponent.monthlyDays*120 + state.opponent.streak*25 + state.opponent.grindPts;
      const share = Math.max(12, Math.min(88, Math.round((myTot / Math.max(1, myTot + opTot)) * 100)));
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full" style="background:rgba(249,115,22,0.16);color:#ea580c;">📅 CHỈ GHÉP TRẬN MỚI VÀO NGÀY 01 HẰNG THÁNG • THEO ELO</span>
              <h1 class="text-xl font-extrabold mt-1">⚔️ Đối Kháng 1v1 Chuyên Cần & Cày Điểm</h1>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <div class="bg-[var(--card)] border border-[var(--border)] rounded-xl px-3.5 py-2 text-center text-xs">
                <div class="text-[var(--muted-foreground)]">${info.isDay1 ? 'Hôm nay là Ngày 01!' : 'Mở ghép trận mới vào'}</div>
                <strong class="font-mono text-sm ${info.isDay1 ? 'text-emerald-600' : 'text-[var(--primary)]'}">${info.isDay1 ? '🟢 ĐANG MỞ GHÉP TRẬN' : `${info.nextDateStr} (còn ${info.diffDays} ngày)`}</strong>
              </div>
            </div>
          </div>

          <div class="rounded-2xl p-4 border flex flex-wrap justify-between items-center gap-3 text-xs ${info.isDay1 ? 'bg-emerald-500/10 border-emerald-500' : 'bg-amber-500/10 border-amber-500/60'}">
            <div class="space-y-0.5">
              <div class="font-extrabold text-sm">${info.isDay1 ? '🟢 Đã đến Ngày 01 đầu tháng — Cổng Ghép Trận 1v1 Đang Mở!' : `🔒 Cổng Ghép Trận Mới Đang Đóng (Hôm nay: ${info.todayStr})`}</div>
              <div class="text-[var(--muted-foreground)]">Quy định hệ thống: Chỉ đúng <strong>ngày 01 hằng tháng</strong> mới được ghép đối thủ mới. Các ngày còn lại trong tháng thi đấu cố định với đối thủ hiện tại.</div>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <button onclick="matchNewDuelOpponent()" ${info.isDay1 ? '' : 'disabled'} class="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed" style="background:${info.isDay1 ? '#059669' : '#64748b'};">
                ${info.isDay1 ? '🎲 Ghép Trận Mới Ngay' : `🔒 Mở ghép vào ${info.nextDateStr}`}
              </button>
              <button onclick="state.duelSimulateDay1=!state.duelSimulateDay1;notify(state.duelSimulateDay1?'🧪 Đã bật giả lập Ngày 01 để test ghép trận!':'📅 Đã quay lại ngày thực tế hôm nay.');render()" class="px-3 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold cursor-pointer">
                ${state.duelSimulateDay1 ? '📅 Về ngày thật' : '🧪 Test Ngày 01'}
              </button>
            </div>
          </div>

          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-4">
            <div class="grid md:grid-cols-3 gap-4 items-center text-center">
              <div class="p-4 rounded-2xl bg-[var(--content)] border-2 border-[var(--primary)] flex flex-col items-center gap-1">${avatarHtml({name:state.user.name,me:true,color:'#0d9488'},52)}<div class="font-bold text-sm">${nameWithBadge(state.user)}</div><span class="text-xs font-mono">${state.user.elo} ELO</span><div class="text-xl font-mono font-extrabold text-[var(--primary)]">${myTot.toLocaleString('vi-VN')} đ</div></div>
              <div class="flex flex-col items-center gap-2"><div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-yellow-200 border-2 border-amber-400" style="background:linear-gradient(135deg,#0f172a,#ea580c);">VS</div><div class="text-xs text-[var(--muted-foreground)]">Lệch ${Math.abs(state.user.elo - state.opponent.elo)} ELO • Thi đấu cả tháng</div></div>
              <div class="p-4 rounded-2xl bg-[var(--content)] border border-[var(--border)] flex flex-col items-center gap-1">${avatarHtml(state.opponent,52)}<div class="font-bold text-sm">${nameWithBadge(opUser)}</div><span class="text-xs font-mono">${state.opponent.elo} ELO</span><div class="text-xl font-mono font-extrabold" style="color:#ea580c;">${opTot.toLocaleString('vi-VN')} đ</div></div>
            </div>
            <div class="h-3 rounded-full overflow-hidden" style="background:#ea580c;"><div class="h-full border-r-2 border-white" style="width:${share}%;background:#0d9488;"></div></div>
          </div>
          ${renderRichChatHtml('duel', state.duelMsgs, state.opponent.id, state.opponent.name)}
        </div>`;
    }

    // 13. GIAO LƯU CAM & MIC 1-1 (CHỈ TỐI ĐA 2 NGƯỜI • BẬT CAM & MIC ĐƯỢC)
    function startLoungeAudioMeter(stream) {
      try {
        if (state.audioCtx) { try { state.audioCtx.close(); } catch {} }
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        state.audioCtx = ctx;
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        src.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        function tick() {
          const bar = document.getElementById('lg-mic-bar');
          if (!bar || !state.loungeMicOn) return;
          analyser.getByteFrequencyData(data);
          const avg = data.reduce((a, b) => a + b, 0) / data.length;
          bar.style.width = Math.min(100, Math.round(avg * 1.6)) + '%';
          state.loungeMeterRaf = requestAnimationFrame(tick);
        }
        state.loungeMeterRaf = requestAnimationFrame(tick);
      } catch {}
    }

    async function setLoungeMedia(wantVideo, wantAudio) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        notify('⚠️ Trình duyệt chưa hỗ trợ hoặc đang chặn Cam/Mic (hãy mở bằng Chrome qua localhost hoặc cấp quyền Camera/Micro).');
        return;
      }
      if (!wantVideo && !wantAudio) {
        if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
        state.loungeCamOn = false;
        state.loungeMicOn = false;
        if (state.loungeMeterRaf) { cancelAnimationFrame(state.loungeMeterRaf); state.loungeMeterRaf = null; }
        updateLoungeMediaUi();
        notify('⏹️ Đã tắt Camera & Micro.');
        return;
      }
      try {
        if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
        const stream = await navigator.mediaDevices.getUserMedia({ video: wantVideo, audio: wantAudio });
        state.localStream = stream;
        state.loungeCamOn = wantVideo && stream.getVideoTracks().length > 0;
        state.loungeMicOn = wantAudio && stream.getAudioTracks().length > 0;
        updateLoungeMediaUi();
        if (state.loungeMicOn) startLoungeAudioMeter(stream);
        notify(`✅ Đã bật ${state.loungeCamOn ? 'Camera' : ''}${state.loungeCamOn && state.loungeMicOn ? ' & ' : ''}${state.loungeMicOn ? 'Micro' : ''} thành công!`);
      } catch (err) {
        if (wantVideo && wantAudio) {
          try {
            const audioOnly = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            state.localStream = audioOnly;
            state.loungeCamOn = false;
            state.loungeMicOn = true;
            updateLoungeMediaUi();
            startLoungeAudioMeter(audioOnly);
            notify('🎙️ Không tìm thấy Webcam — đã tự động bật Micro để nói chuyện!');
            return;
          } catch {}
        }
        notify('⚠️ Chrome chưa cấp quyền Camera/Micro (hãy bấm biểu tượng ổ khóa trên thanh địa chỉ Chrome để Cho phép, hoặc chạy qua localhost).');
      }
    }

    function updateLoungeMediaUi() {
      const vid = document.getElementById('lg-v');
      const ph = document.getElementById('lg-p');
      const camBtn = document.getElementById('lg-toggle-cam');
      const micBtn = document.getElementById('lg-toggle-mic');
      const statusEl = document.getElementById('lg-media-status');
      const micBar = document.getElementById('lg-mic-bar');
      if (vid && ph) {
        if (state.loungeCamOn && state.localStream) {
          vid.srcObject = state.localStream;
          vid.classList.remove('hidden');
          ph.classList.add('hidden');
        } else {
          vid.srcObject = null;
          vid.classList.add('hidden');
          ph.classList.remove('hidden');
        }
      }
      if (camBtn) camBtn.textContent = state.loungeCamOn ? '📷 Tắt Cam' : '📷 Bật Cam';
      if (micBtn) micBtn.textContent = state.loungeMicOn ? '🎙️ Tắt Mic' : '🎙️ Bật Mic';
      if (statusEl) {
        statusEl.textContent = `Cam: ${state.loungeCamOn ? 'ĐANG BẬT' : 'Tắt'} • Mic: ${state.loungeMicOn ? 'ĐANG BẬT' : 'Tắt'}`;
      }
      if (micBar && !state.loungeMicOn) micBar.style.width = '0%';
    }

    function switchLoungePartner() {
      const others = state.users.filter(u => u.status === 'active' && !u.me && u.id !== state.loungePartnerId);
      if (!others.length) return;
      const next = others[Math.floor(Math.random() * others.length)];
      state.loungePartnerId = next.id;
      state.loungeMsgs = [{
        senderId: next.id, senderName: next.name, type: 'text',
        text: `Chào ${state.user.name}! Phòng 1-1 đã kết nối (2/2 người). Bật Cam & Mic để luyện Speaking tiếng Anh cùng mình nhé!`
      }];
      notify(`🔄 Đã đổi sang giao lưu 1-1 với ${next.name} (Phòng luôn giới hạn đúng 2 người)!`);
      render();
    }

    function renderLounge(v) {
      if (!canUseLounge()) {
        v.innerHTML = `
          <div class="max-w-xl mx-auto bg-[var(--card)] border-2 rounded-2xl p-8 text-center space-y-4" style="border-color:#0284c7;">
            <div class="text-4xl">💎🎥🔒</div>
            <h1 class="text-xl font-extrabold">Giao Lưu Cam & Mic (1-1) Chỉ Dành Cho Bản Ultra</h1>
            <p class="text-xs text-[var(--muted-foreground)] leading-relaxed">Lọt vào <strong>Top 1–3 bảng xếp hạng</strong> để tự động nhận gói Ultra miễn phí, hoặc liên hệ Admin qua Zalo <strong>0779176786</strong> (ID: <strong>${state.user.accountCode}</strong>)!</p>
            <div class="flex justify-center gap-2 flex-wrap">
              <button onclick="go('leaderboard')" class="px-4 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer" style="background:#f59e0b;color:#111827;">🏆 Xem Top 1–3 (+Ultra)</button>
              <button onclick="go('pricing')" class="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:#0284c7;">👑 Xem Bảng Giá Ultra</button>
              <button onclick="openZaloModal()" class="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:#0068ff;">💬 Zalo 0779176786</button>
            </div>
          </div>`;
        return;
      }
      if (!state.user.loungeOptIn) {
        v.innerHTML = `
          <div class="max-w-xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center space-y-4">
            <div class="text-4xl">🔒🎥</div>
            <h1 class="text-xl font-extrabold">Phòng Giao Lưu 1-1 (Tối Đa 2 Người)</h1>
            <p class="text-xs text-[var(--muted-foreground)]">Mỗi phòng giao lưu chỉ kết nối <strong>đúng 2 người (1 kèm 1)</strong> để tập trung luyện nói tiếng Anh trực tiếp qua Camera & Micro.</p>
            <button onclick="state.user.loungeOptIn=true;notify('Đã vào Phòng Giao Lưu 1-1 (2/2 người)!');render()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">✅ Vào Phòng Giao Lưu 1-1 (Bật Cam & Mic)</button>
          </div>`;
        return;
      }
      const partner = state.users.find(u => u.id === state.loungePartnerId) || state.users[1];
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full text-white" style="background:#e11d48;">👥 PHÒNG RIÊNG 1-1 • CHỈ 2/2 NGƯỜI</span>
                <span id="lg-media-status" class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--content)] border border-[var(--border)]">Cam: Tắt • Mic: Tắt</span>
              </div>
              <h1 class="text-xl font-extrabold mt-1">🎥 Giao Lưu 2 Người (Bật Cam & Mic)</h1>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <button onclick="setLoungeMedia(true,true)" class="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">🎥 Bật Cam & Mic</button>
              <button id="lg-toggle-cam" onclick="setLoungeMedia(!state.loungeCamOn, state.loungeMicOn)" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold cursor-pointer">📷 Bật Cam</button>
              <button id="lg-toggle-mic" onclick="setLoungeMedia(state.loungeCamOn, !state.loungeMicOn)" class="px-3 py-1.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs font-bold cursor-pointer">🎙️ Bật Mic</button>
              <button onclick="setLoungeMedia(false,false)" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">⏹️ Tắt hết</button>
              <button onclick="switchLoungePartner()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🔄 Đổi bạn 1-1</button>
              <button onclick="notify('⛔ Phòng giao lưu chỉ cho phép tối đa 2 người (1-1), không thể thêm người thứ 3!')" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-dashed border-[var(--border)] text-xs font-semibold opacity-70 cursor-not-allowed">🔒 Đã đủ 2/2 người</button>
              <button onclick="state.user.loungeOptIn=false;render()" class="px-3 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer" style="background:#dc2626;">Rời phòng</button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <!-- Người 1: Bạn -->
            <div class="rounded-2xl overflow-hidden border-2 border-[var(--primary)] min-h-56 flex flex-col justify-between text-white relative" style="background:#0f172a;">
              <video id="lg-v" autoplay muted playsinline class="w-full h-56 object-cover mirror-vid hidden"></video>
              <div id="lg-p" class="flex-1 flex flex-col items-center justify-center p-5 text-center text-xs space-y-2">
                ${avatarHtml({name:state.user.name, me:true, color:'#0d9488'}, 56)}
                <div class="font-bold text-sm">${nameWithBadge(state.user)} (Bạn — 1/2)</div>
                <div class="opacity-75">Bấm "🎥 Bật Cam & Mic" ở trên để mở hình ảnh và âm thanh trực tiếp</div>
              </div>
              <div class="px-3 py-2 bg-black/60 flex items-center justify-between gap-2 text-[11px]">
                <span class="font-bold">🎙️ Âm lượng Mic:</span>
                <div class="flex-1 h-2 rounded-full bg-white/20 overflow-hidden"><div id="lg-mic-bar" class="h-full bg-emerald-400 transition-all" style="width:0%;"></div></div>
              </div>
            </div>

            <!-- Người 2: Đối tác duy nhất trong phòng 1-1 -->
            <div class="rounded-2xl p-5 text-white flex flex-col justify-between gap-3 border border-[var(--border)] min-h-56" style="background:linear-gradient(135deg,#0f172a,#134e4a);">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  ${avatarHtml(partner, 48)}
                  <div>
                    <div class="font-bold text-sm">${nameWithBadge(partner)}</div>
                    <div class="text-xs opacity-80">Đối tác 1-1 (2/2) • 🟢 Mic & Cam sẵn sàng</div>
                  </div>
                </div>
                <button onclick="openReport(${partner.id},'${partner.name.replace(/'/g,"\'")}','lounge')" class="px-2.5 py-1 rounded-lg text-xs font-bold text-white cursor-pointer" style="background:rgba(220,38,38,0.85);">🚨 Tố cáo</button>
              </div>
              <div class="p-3 rounded-xl space-y-1.5" style="background:rgba(255,255,255,0.08);">
                <div class="text-xs font-bold" style="color:#5eead4;">🤖 CHỦ ĐỀ LUYỆN NÓI 2 NGƯỜI</div>
                <div class="font-bold text-sm">"Describe a technology you find indispensable in your daily study."</div>
                <button onclick="speak('Describe a technology you find indispensable in your daily study.')" class="px-3 py-1 rounded-lg text-xs font-bold cursor-pointer" style="background:#14b8a6;color:#042f2e;">🔊 Nghe câu hỏi mẫu</button>
              </div>
            </div>
          </div>
          ${renderRichChatHtml('lounge', state.loungeMsgs, partner.id, partner.name)}
        </div>`;
      updateLoungeMediaUi();
    }

    // 13B. HIỆU ỨNG PHÁO HOA + MƯA SAO BĂNG & CHỨNG CHỈ TIẾNG ANH MỖI NGÀY (TẢI PNG)
    let certFireworks = [], certMeteors = [];
    function spawnCertFirework(w, h) {
      const cx = w * (0.15 + Math.random() * 0.7);
      const cy = h * (0.12 + Math.random() * 0.42);
      const pal = ['#fbbf24','#f43f5e','#34d399','#38bdf8','#f97316','#c084fc','#fde047'];
      const col = pal[Math.floor(Math.random() * pal.length)];
      for (let i = 0; i < 42; i++) {
        const a = (Math.PI * 2 * i) / 42 + (Math.random() * 0.12);
        const sp = 2 + Math.random() * 4.5;
        certFireworks.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, col, sz: 2 + Math.random() * 2.2 });
      }
    }

    function spawnCertMeteor(w, h) {
      certMeteors.push({
        x: Math.random() * w * 1.2,
        y: -20 - Math.random() * 80,
        vx: -(7 + Math.random() * 6),
        vy: 5 + Math.random() * 4.5,
        len: 70 + Math.random() * 90,
        life: 1
      });
    }

    function triggerExtraCertBurst() {
      const c = document.getElementById('cert-fx-canvas');
      if (!c) return;
      for (let i = 0; i < 4; i++) spawnCertFirework(c.width, c.height);
      for (let i = 0; i < 6; i++) spawnCertMeteor(c.width, c.height);
    }

    function startCertCelebrationFx() {
      const c = document.getElementById('cert-fx-canvas');
      if (!c) return;
      if (state.certRaf) { cancelAnimationFrame(state.certRaf); state.certRaf = null; }
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      const ctx = c.getContext('2d');
      certFireworks = [];
      certMeteors = [];
      for (let i = 0; i < 3; i++) spawnCertFirework(c.width, c.height);
      for (let i = 0; i < 5; i++) spawnCertMeteor(c.width, c.height);
      let lastFw = 0, lastMt = 0;

      function anim(now) {
        if (document.getElementById('cert-modal')?.classList.contains('hidden')) return;
        state.certRaf = requestAnimationFrame(anim);
        ctx.fillStyle = 'rgba(2, 6, 23, 0.22)';
        ctx.fillRect(0, 0, c.width, c.height);

        if (now - lastFw > 650) { lastFw = now; spawnCertFirework(c.width, c.height); }
        if (now - lastMt > 280) { lastMt = now; spawnCertMeteor(c.width, c.height); }

        // Meteor shower (Mưa sao băng)
        for (let i = certMeteors.length - 1; i >= 0; i--) {
          const m = certMeteors[i];
          m.x += m.vx; m.y += m.vy; m.life -= 0.012;
          if (m.life <= 0 || m.y > c.height + 100 || m.x < -150) { certMeteors.splice(i, 1); continue; }
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
          grad.addColorStop(0, `rgba(255,255,255,${m.life})`);
          grad.addColorStop(0.35, `rgba(125,211,252,${m.life * 0.85})`);
          grad.addColorStop(1, 'rgba(56,189,248,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10);
          ctx.stroke();
          ctx.fillStyle = `rgba(255,255,255,${m.life})`;
          ctx.beginPath(); ctx.arc(m.x, m.y, 2.5, 0, Math.PI * 2); ctx.fill();
        }

        // Fireworks (Pháo hoa)
        for (let i = certFireworks.length - 1; i >= 0; i--) {
          const p = certFireworks[i];
          p.x += p.vx; p.y += p.vy; p.vy += 0.055; p.vx *= 0.985; p.life -= 0.015;
          if (p.life <= 0) { certFireworks.splice(i, 1); continue; }
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      state.certRaf = requestAnimationFrame(anim);
    }

    function openRoadmapCertificate(roadmapName, startDate) {
      const endDate = new Date().toLocaleDateString('vi-VN');
      const startStr = startDate || endDate;
      const certCode = `TAMN-${state.user.accountCode}-${String(Date.now()).slice(-4)}`;
      state.activeCert = {
        studentName: state.user.name,
        avatar: state.user.avatar || '',
        topRank: state.user.topRank || 0,
        roadmapName,
        startDate: startStr,
        endDate,
        certCode
      };

      const avBox = document.getElementById('cert-avatar-box');
      if (state.user.avatar) avBox.innerHTML = `<img src="${state.user.avatar}" class="w-full h-full object-cover" />`;
      else avBox.textContent = state.user.name.slice(0, 1).toUpperCase();

      document.getElementById('cert-student-name').innerHTML = nameWithBadge(state.user);
      document.getElementById('cert-roadmap-title').textContent = `Lộ trình: ${roadmapName}`;
      document.getElementById('cert-start-date').textContent = startStr;
      document.getElementById('cert-end-date').textContent = endDate;
      document.getElementById('cert-code').textContent = certCode;
      document.getElementById('cert-modal').classList.remove('hidden');
      startCertCelebrationFx();
    }

    function closeCertModal() {
      document.getElementById('cert-modal').classList.add('hidden');
      if (state.certRaf) { cancelAnimationFrame(state.certRaf); state.certRaf = null; }
    }

    function downloadCertificatePng() {
      const cert = state.activeCert;
      if (!cert) return;
      const canvas = document.createElement('canvas');
      canvas.width = 1600;
      canvas.height = 1120;
      const ctx = canvas.getContext('2d');

      function drawRest(img) {
        // Background gradient
        const bg = ctx.createLinearGradient(0, 0, 1600, 1120);
        bg.addColorStop(0, '#fffbeb');
        bg.addColorStop(0.5, '#ffffff');
        bg.addColorStop(1, '#f0fdfa');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 1600, 1120);

        // Decorative subtle stars/firework dots in corners
        const corners = [[130,130],[1470,130],[130,990],[1470,990]];
        corners.forEach(([x,y]) => {
          ctx.fillStyle = 'rgba(245,158,11,0.18)';
          ctx.beginPath(); ctx.arc(x, y, 42, 0, Math.PI * 2); ctx.fill();
        });

        // Double gold borders
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 14;
        ctx.strokeRect(36, 36, 1528, 1048);
        ctx.strokeStyle = '#0d9488';
        ctx.lineWidth = 4;
        ctx.strokeRect(62, 62, 1476, 996);

        // Header badge
        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 26px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TIẾNG ANH MỖI NGÀY  •  CERTIFICATE OF COMPLETION', 800, 138);

        // Main Title
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 54px "Segoe UI", sans-serif';
        ctx.fillText('CHỨNG CHỈ HOÀN THÀNH LỘ TRÌNH', 800, 212);

        ctx.fillStyle = '#b45309';
        ctx.font = '600 24px "Segoe UI", sans-serif';
        ctx.fillText('Chứng nhận học viên xuất sắc đã hoàn thành trọn vẹn lộ trình học tập', 800, 258);

        // Avatar circle
        const ax = 800, ay = 365, ar = 74;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ax, ay, ar, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        if (img) {
          ctx.drawImage(img, ax - ar, ay - ar, ar * 2, ar * 2);
        } else {
          ctx.fillStyle = '#0d9488';
          ctx.fillRect(ax - ar, ay - ar, ar * 2, ar * 2);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 64px "Segoe UI", sans-serif';
          ctx.textBaseline = 'middle';
          ctx.fillText(cert.studentName.slice(0, 1).toUpperCase(), ax, ay + 4);
          ctx.textBaseline = 'alphabetic';
        }
        ctx.restore();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 7;
        ctx.beginPath(); ctx.arc(ax, ay, ar + 3, 0, Math.PI * 2); ctx.stroke();

        // Student Name + Rank Medal
        const rankTxt = cert.topRank === 1 ? '  [🥇 HUY HIỆU VÀNG]' : cert.topRank === 2 ? '  [🥈 HUY HIỆU BẠC]' : cert.topRank === 3 ? '  [🥉 HUY HIỆU ĐỒNG]' : '';
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 46px "Segoe UI", sans-serif';
        ctx.fillText(cert.studentName + rankTxt, 800, 505);

        // Roadmap Title pill
        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 30px "Segoe UI", sans-serif';
        ctx.fillText(`Lộ trình: ${cert.roadmapName}`, 800, 560);

        // Start & End Date boxes
        ctx.fillStyle = '#f8fafc';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.fillRect(360, 595, 400, 92); ctx.strokeRect(360, 595, 400, 92);
        ctx.fillRect(840, 595, 400, 92); ctx.strokeRect(840, 595, 400, 92);

        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 20px "Segoe UI", sans-serif';
        ctx.fillText('NGÀY BẮT ĐẦU HỌC', 560, 630);
        ctx.fillText('NGÀY KẾT THÚC', 1040, 630);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 30px monospace';
        ctx.fillText(cert.startDate, 560, 670);
        ctx.fillStyle = '#059669';
        ctx.fillText(cert.endDate, 1040, 670);

        // Principal's Greeting (Wrapped cleanly)
        ctx.fillStyle = '#fffbeb';
        ctx.strokeStyle = '#fcd34d';
        ctx.fillRect(180, 718, 1240, 126);
        ctx.strokeRect(180, 718, 1240, 126);

        ctx.fillStyle = '#334155';
        ctx.font = 'italic 24px Georgia, serif';
        ctx.fillText('"Chúc mừng em đã kiên trì vượt qua toàn bộ thử thách và hoàn thành xuất sắc lộ trình tại', 800, 765);
        ctx.fillText('Tiếng Anh Mỗi Ngày! Chúc em luôn giữ vững ngọn lửa đam mê ngoại ngữ,', 800, 799);
        ctx.fillText('tự tin bứt phá mọi kỳ thi và gặt hái thật nhiều thành công rực rỡ trong tương lai!"', 800, 833);

        // Footer left (Cert ID)
        ctx.textAlign = 'left';
        ctx.fillStyle = '#475569';
        ctx.font = '600 22px "Segoe UI", sans-serif';
        ctx.fillText(`Mã chứng chỉ: ${cert.certCode}`, 130, 955);
        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 24px "Segoe UI", sans-serif';
        ctx.fillText('Hệ thống đào tạo Tiếng Anh Mỗi Ngày', 130, 995);

        // Footer right (Principal Trần Văn Hùng signature + red stamp)
        ctx.textAlign = 'right';
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 22px "Segoe UI", sans-serif';
        ctx.fillText('HIỆU TRƯỞNG', 1470, 918);
        ctx.fillStyle = '#92400e';
        ctx.font = 'italic bold 46px Georgia, serif';
        ctx.fillText('Trần Văn Hùng', 1470, 976);
        ctx.fillStyle = '#dc2626';
        ctx.font = 'bold 18px "Segoe UI", sans-serif';
        ctx.fillText('★ ĐÃ XÁC NHẬN • TIẾNG ANH MỖI NGÀY ★', 1470, 1014);

        const a = document.createElement('a');
        const safeName = cert.studentName.replace(/[^a-zA-Z0-9_\-À-ɏḀ-ỿ ]/g, '').trim().replace(/\s+/g, '_') || 'HocVien';
        a.download = `Chung_Chi_Tieng_Anh_Moi_Ngay_${safeName}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
        notify('⬇️ Đã tải hình Chứng chỉ Tiếng Anh Mỗi Ngày (PNG) về máy!');
      }

      if (cert.avatar) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => drawRest(img);
        img.onerror = () => drawRest(null);
        img.src = cert.avatar;
      } else {
        drawRest(null);
      }
    }

    // 14. GEMINI AI
    function renderAi(v) {
      v.innerHTML = `
        <div class="max-w-2xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 space-y-3">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--content)] text-[var(--primary)]">✦ GOOGLE GEMINI AI STUDIO</span>
          <h1 class="text-xl font-extrabold">Kết nối Google Gemini AI (${state.geminiModel})</h1>
          <div class="grid sm:grid-cols-2 gap-3">
            <select id="gm-m" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-mono"><option value="gemini-3.8-flash">gemini-3.8-flash</option><option value="gemini-3.6-flash">gemini-3.6-flash</option></select>
            <input type="password" placeholder="AIzaSy... (Gemini API Key)" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-mono" />
          </div>
          <button onclick="state.geminiModel=document.getElementById('gm-m').value;state.geminiConnected=true;notify('Đã kết nối Google Gemini!');render()" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold cursor-pointer">${state.geminiConnected?'✓ Đã kết nối Gemini':'✦ Kết nối Google Gemini'}</button>
        </div>`;
    }

    // 15. BẢNG XẾP HẠNG TOP 10 (TOP 1-3 HUY HIỆU VÀNG/BẠC/ĐỒNG + TỰ ĐỘNG UP GÓI ULTRA, RỚT TOP MẤT GÓI)
    function testToggleMyTop3(enterTop) {
      const me = state.users.find(u => u.me);
      if (!me) return;
      if (enterTop) {
        me.streak = 95;
        me.coins = 3200;
        syncTopRankRewards();
        triggerStreakFx(me.streak, `🥇 Bạn vừa lên Top ${me.topRank} — Nhận Huy hiệu & Gói ULTRA miễn phí!`);
        notify(`🥇 Chúc mừng! Bạn đã vào Top ${me.topRank}: nhận Huy hiệu và tự động nâng lên gói ULTRA!`);
      } else {
        me.streak = 15;
        me.coins = 580;
        syncTopRankRewards();
        notify(`📉 Bạn đã rớt khỏi Top 1–3! Huy hiệu và gói ULTRA thưởng Top đã tự động bị thu hồi (về gói ${(me.basePlanTier||'free').toUpperCase()}).`);
      }
      render();
    }

    function renderLeaderboard(v) {
      syncTopRankRewards();
      const top10 = getSortedLeaderboardUsers().slice(0, 10);
      const [r1, r2, r3, ...rest] = top10;
      const myInTop3 = state.user.topRank >= 1 && state.user.topRank <= 3;
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <h1 class="text-xl font-extrabold">🏆 Bảng Xếp Hạng Top 10 • Huy Hiệu Vàng / Bạc / Đồng & Thưởng Ultra</h1>
              <p class="text-xs text-[var(--muted-foreground)]">Top 1, 2, 3 tự động gắn <strong>Huy hiệu Vàng / Bạc / Đồng</strong> cạnh tên tài khoản và <strong>nâng cấp gói ULTRA</strong>. Nếu rớt khỏi Top 1–3 sẽ tự động mất huy hiệu và mất gói Ultra!</p>
            </div>
            <div class="flex gap-1.5 flex-wrap">
              ${!myInTop3
                ? `<button onclick="testToggleMyTop3(true)" class="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:linear-gradient(135deg,#f59e0b,#ea580c);">🧪 Test: Lên Top 1 (+Huy hiệu & Ultra)</button>`
                : `<button onclick="testToggleMyTop3(false)" class="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:#dc2626;">🧪 Test: Rớt khỏi Top 3 (Mất Ultra)</button>`}
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-4 items-end">
            ${r2?`<div class="bg-[var(--card)] rank2-frame rounded-2xl p-5 flex flex-col items-center text-center gap-2"><span class="badge-silver text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥈 TOP 2 • HUY HIỆU BẠC</span>${avatarHtml(r2,52)}<div class="font-bold text-sm">${nameWithBadge(r2)}</div><span class="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style="background:#0284c7;">💎 Tự động gói ULTRA</span><div class="text-xs font-mono">🔥 ${r2.streak}d • 🪙 ${r2.coins}</div></div>`:''}
            ${r1?`<div class="rank1-frame rounded-2xl p-6 flex flex-col items-center text-center gap-2 relative overflow-hidden"><canvas id="fw-c" class="absolute inset-0 w-full h-full pointer-events-none"></canvas><div class="relative z-10 text-2xl">👑</div><span class="relative z-10 badge-gold text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥇 TOP 1 • HUY HIỆU VÀNG</span><div class="relative z-10">${avatarHtml(r1,62)}</div><div class="relative z-10 font-extrabold text-base">${nameWithBadge(r1)}</div><span class="relative z-10 text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white" style="background:#0284c7;">💎 Tự động gói ULTRA</span><div class="relative z-10 text-xs font-mono" style="color:#fde047;">🔥 ${r1.streak}d • 🪙 ${r1.coins}</div></div>`:''}
            ${r3?`<div class="bg-[var(--card)] rank3-frame rounded-2xl p-5 flex flex-col items-center text-center gap-2"><span class="badge-bronze text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥉 TOP 3 • HUY HIỆU ĐỒNG</span>${avatarHtml(r3,52)}<div class="font-bold text-sm">${nameWithBadge(r3)}</div><span class="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style="background:#0284c7;">💎 Tự động gói ULTRA</span><div class="text-xs font-mono">🔥 ${r3.streak}d • 🪙 ${r3.coins}</div></div>`:''}
          </div>

          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
            ${rest.map((u,i)=>`<div class="px-4 py-2.5 flex justify-between items-center text-xs"><div class="flex items-center gap-3"><span class="font-mono font-bold w-6">#${i+4}</span>${avatarHtml(u,26)}<strong>${u.name}</strong><span class="text-[10px] px-1.5 py-0.5 rounded bg-[var(--content)] font-bold uppercase">${u.planTier}</span></div><div class="font-mono flex gap-4"><span style="color:#c2410c;">🔥 ${u.streak}</span><span>🪙 ${u.coins}</span></div></div>`).join('')}
          </div>
        </div>`;
      const c = document.getElementById('fw-c');
      if (c) {
        const ctx = c.getContext('2d'); c.width = c.parentElement.clientWidth || 260; c.height = c.parentElement.clientHeight || 200;
        const sparks = [], pal = ['#fbbf24','#f43f5e','#34d399','#38bdf8','#f97316']; let last = 0;
        function boom(x,y,col){ for(let i=0;i<26;i++){ const a=(6.28*i)/26,sp=1.2+Math.random()*2.6; sparks.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,col}); } }
        boom(c.width*0.3, c.height*0.35, '#fbbf24');
        function fl(now){
          if(!document.body.contains(c)) return;
          state.rafs.push(requestAnimationFrame(fl));
          ctx.globalCompositeOperation='destination-out'; ctx.fillStyle='rgba(0,0,0,0.22)'; ctx.fillRect(0,0,c.width,c.height);
          ctx.globalCompositeOperation='lighter';
          if(now-last>720){ last=now; boom(c.width*(0.2+Math.random()*0.6), c.height*(0.2+Math.random()*0.4), pal[Math.floor(Math.random()*pal.length)]); }
          for(let i=sparks.length-1;i>=0;i--){ const s=sparks[i]; s.x+=s.vx; s.y+=s.vy; s.vy+=0.04; s.life-=0.022; if(s.life<=0){sparks.splice(i,1);continue;} ctx.globalAlpha=s.life; ctx.fillStyle=s.col; ctx.beginPath(); ctx.arc(s.x,s.y,2,0,6.28); ctx.fill(); }
          ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
        }
        state.rafs.push(requestAnimationFrame(fl));
      }
    }

    // 16. TRANG QUẢN TRỊ MÁY CHỦ: CẤP GÓI QUA MÃ ID TÀI KHOẢN • DUYỆT ĐƠN VIETQR • TỐ CÁO • BAN/KHÓA/XÓA
    function adminGrantByCode(e) {
      e.preventDefault();
      if (!isCurrentUserAdmin()) { notify('⛔ Chỉ tài khoản Admin đầu tiên mới có quyền thực hiện!'); return; }
      const code = document.getElementById('adm-grant-code').value.trim().toUpperCase();
      const tier = document.getElementById('adm-grant-tier').value;
      const months = Number(document.getElementById('adm-grant-months').value) || 12;
      const target = state.users.find(u => u.accountCode.toUpperCase() === code);
      if (!target) {
        notify(`❌ Không tìm thấy tài khoản nào có Mã ID "${code}"!`);
        return;
      }
      target.basePlanTier = tier;
      target.planTier = tier;
      if (target.me) {
        state.user.basePlanTier = tier;
        state.user.planTier = tier;
        const exp = new Date(); exp.setMonth(exp.getMonth() + months);
        state.user.planExpires = exp.toLocaleDateString('vi-VN');
        if (tier !== 'ultra') state.user.loungeOptIn = false;
      }
      state.orders.forEach(o => { if (o.memo.toUpperCase() === code && o.status !== 'paid') o.status = 'paid'; });
      triggerStreakFx(8, `Admin đã cấp gói ${tier.toUpperCase()} (${months} tháng) cho ID ${code}!`);
      notify(`👑 Đã cấp quyền gói ${tier.toUpperCase()} (${months} tháng) cho ${target.name} (${code})!`);
      render();
    }

    function adminApproveOrder(orderCode) {
      if (!isCurrentUserAdmin()) { notify('⛔ Chỉ tài khoản Admin đầu tiên mới có quyền duyệt đơn!'); return; }
      const ord = state.orders.find(o => o.code === orderCode);
      if (!ord) return;
      ord.status = 'paid';
      const target = state.users.find(u => u.accountCode.toUpperCase() === ord.memo.toUpperCase());
      if (target) {
        target.basePlanTier = ord.tier;
        target.planTier = ord.tier;
        if (target.me) {
          state.user.basePlanTier = ord.tier;
          state.user.planTier = ord.tier;
          const exp = new Date(); exp.setMonth(exp.getMonth() + ord.months);
          state.user.planExpires = exp.toLocaleDateString('vi-VN');
        }
      }
      triggerStreakFx(8, `Đã duyệt đơn ${ord.code} & cấp gói ${ord.tier.toUpperCase()} cho ID ${ord.memo}!`);
      notify(`✅ Admin đã duyệt đơn ${ord.code} và cấp gói ${ord.tier.toUpperCase()} cho ID ${ord.memo}!`);
      render();
    }

    function renderAdmin(v) {
      if (!isCurrentUserAdmin()) {
        v.innerHTML = `
          <div class="max-w-xl mx-auto bg-[var(--card)] border-2 border-rose-500 rounded-2xl p-8 text-center space-y-4">
            <div class="text-4xl">🛡️🔒</div>
            <h1 class="text-xl font-extrabold text-rose-600">Chỉ Tài Khoản Admin Mới Được Truy Cập!</h1>
            <p class="text-xs text-[var(--muted-foreground)] leading-relaxed">
              ${!state.firstAdmin
                ? 'Hiện chưa có tài khoản nào được tạo. Hãy <strong>tạo tài khoản đầu tiên</strong> ngay bây giờ để tự động trở thành Admin toàn quyền!'
                : `Tài khoản đầu tiên đã nhận quyền Admin là <strong>${state.firstAdmin}</strong>. Tài khoản hiện tại (<strong>${state.user.name}</strong>) là tài khoản thường nên không thể vào trang Quản trị.`}
            </p>
            <div class="flex justify-center gap-2 flex-wrap">
              <button onclick="openAuth('${!state.firstAdmin ? 'register' : 'login'}')" class="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-extrabold cursor-pointer">
                ${!state.firstAdmin ? '✨ Tạo Tài Khoản Đầu Tiên (Nhận Admin)' : '🔐 Đăng nhập lại bằng Tài khoản Admin'}
              </button>
              <button onclick="go('home')" class="px-4 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🏠 Về Trang Chủ</button>
            </div>
          </div>`;
        return;
      }
      const pend = state.reports.filter(r => r.status === 'pending').length;
      const waitOrd = state.orders.filter(o => o.status === 'waiting_approval').length;
      const rev = state.orders.filter(o => o.status === 'paid').reduce((s, o) => s + o.amount, 0);
      v.innerHTML = `
        <div class="space-y-4">
          <div>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style="background:#dc2626;">🛡️ MÁY CHỦ QUẢN TRỊ WEB • CẤP GÓI QUA ID TÀI KHOẢN</span>
            <h1 class="text-xl font-extrabold mt-1">Admin Cấp Quyền Lên Gói Qua ID • Duyệt Đơn VietQR • Xử Lý Tố Cáo</h1>
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="state.adminTab='orders';render()" class="px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${state.adminTab==='orders'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--card)] border-[var(--border)]'}">👑 Cấp Gói Qua ID & Đơn VietQR (${waitOrd} chờ • ${fmtVnd(rev)})</button>
            <button onclick="state.adminTab='users';render()" class="px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${state.adminTab==='users'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--card)] border-[var(--border)]'}">👥 Tài Khoản (${state.users.length})</button>
            <button onclick="state.adminTab='reports';render()" class="px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${state.adminTab==='reports'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--card)] border-[var(--border)]'}">🚨 Tố Cáo (${pend} chờ)</button>
          </div>

          ${state.adminTab === 'orders' ? `
            <form onsubmit="adminGrantByCode(event)" class="hover-box bg-[var(--card)] border-2 border-[var(--primary)] rounded-2xl p-4 space-y-3" style="--tile-c:#0d9488;">
              <div>
                <div class="font-extrabold text-sm">👑 Cấp Quyền Lên Gói Trực Tiếp Thông Qua Mã ID Tài Khoản</div>
                <div class="text-xs text-[var(--muted-foreground)]">Nhập Mã ID tài khoản người dùng (VD: <code>TVMN100001</code>, <code>TVMN100007</code>...) để Admin cấp gói Pro hoặc Ultra ngay lập tức:</div>
              </div>
              <div class="grid sm:grid-cols-4 gap-2">
                <input id="adm-grant-code" required value="${state.user.accountCode}" placeholder="VD: TVMN100001" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-mono font-bold uppercase" />
                <select id="adm-grant-tier" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold">
                  <option value="ultra" selected>💎 Bản Ultra (Full 100%)</option>
                  <option value="pro">⚡ Bản Pro (Không giới hạn)</option>
                  <option value="free">🌱 Hạ về Bản Thường</option>
                </select>
                <select id="adm-grant-months" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-semibold">
                  <option value="1">1 tháng</option>
                  <option value="3">3 tháng</option>
                  <option value="6">6 tháng</option>
                  <option value="12" selected>1 năm</option>
                </select>
                <button type="submit" class="py-2 px-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-extrabold cursor-pointer">⚡ Cấp Gói Qua ID</button>
              </div>
            </form>

            <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
              ${state.orders.length ? state.orders.map(o => `
                <div class="p-3.5 flex flex-wrap justify-between items-center gap-2 text-xs">
                  <div>
                    <strong class="font-mono">${o.code}</strong> • ${o.userName} • Mã ID: <strong class="font-mono text-[var(--primary)]">${o.memo}</strong>
                    <div class="text-[var(--muted-foreground)]">Gói ${o.tier.toUpperCase()} (${o.months} tháng) • VPBank 0779176786 TRAN VAN HUNG</div>
                  </div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <strong class="font-mono text-sm" style="color:#dc2626;">${fmtVnd(o.amount)}</strong>
                    <span class="px-2 py-0.5 rounded-full font-bold ${o.status==='paid'?'bg-emerald-500/15 text-emerald-600':'bg-amber-500/15 text-amber-600'}">${o.status==='paid'?'✓ Đã cấp gói':o.status==='waiting_approval'?'⏳ Đã báo CK • Chờ Admin duyệt':'📝 Chưa báo CK'}</span>
                    ${o.status!=='paid' ? `<button onclick="adminApproveOrder('${o.code}')" class="px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold cursor-pointer">✅ Duyệt & Cấp Gói</button>` : ''}
                  </div>
                </div>`).join('') : `<div class="p-6 text-center text-xs text-[var(--muted-foreground)]">Chưa có đơn VietQR nào — bạn có thể cấp gói trực tiếp bằng Mã ID ở khung trên!</div>`}
            </div>` : state.adminTab === 'users' ? `
            <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
              ${state.users.map(u => `
                <div class="p-3.5 flex flex-wrap justify-between items-center gap-3 text-xs">
                  <div class="flex items-center gap-2.5">
                    ${avatarHtml(u, 30)}
                    <div>
                      <strong>${nameWithBadge(u)}</strong>
                      <span class="px-1.5 py-0.5 rounded font-mono font-bold bg-[var(--content)] text-[var(--primary)]">${u.accountCode}</span>
                      <span class="px-1.5 py-0.5 rounded font-bold text-white" style="background:${u.planTier==='ultra'?'#0284c7':u.planTier==='pro'?'#d97706':'#64748b'};">${(u.planTier||'free').toUpperCase()}</span>
                      <div class="text-[var(--muted-foreground)]">${u.email} • ${u.elo} ELO</div>
                    </div>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <button onclick="adminSetPlan(${u.id},'free')" class="px-2 py-1 rounded bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">Free</button>
                    <button onclick="adminSetPlan(${u.id},'pro')" class="px-2 py-1 rounded font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">Cấp Pro</button>
                    <button onclick="adminSetPlan(${u.id},'ultra')" class="px-2 py-1 rounded font-bold text-white cursor-pointer" style="background:#0284c7;">Cấp Ultra</button>
                    ${u.role!=='admin' ? `
                      <button onclick="adminSetStatus(${u.id},'${u.status==='active'?'locked':'active'}')" class="px-2 py-1 rounded font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">${u.status==='active'?'🔒':'✅'}</button>
                      <button onclick="adminSetStatus(${u.id},'banned')" class="px-2 py-1 rounded font-bold text-white cursor-pointer" style="background:#dc2626;">⛔</button>
                      <button onclick="adminDelUser(${u.id})" class="px-2 py-1 rounded bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer" style="color:#dc2626;">🗑️</button>
                    ` : ''}
                  </div>
                </div>`).join('')}
            </div>` : `
            <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl divide-y divide-[var(--border)]">
              ${state.reports.length ? state.reports.map(r => {
                const u = state.users.find(x => x.id === r.targetId);
                return `
                  <div class="p-4 flex flex-wrap justify-between items-center gap-3 text-xs">
                    <div class="space-y-1">
                      <div><span class="font-bold px-2 py-0.5 rounded-full text-white" style="background:#dc2626;">${r.catLabel}</span> <strong>${r.targetName}</strong></div>
                      <div class="text-[var(--muted-foreground)]">Người tố cáo: ${r.reporter} • "${r.details}"</div>
                    </div>
                    <div class="flex gap-1.5">
                      ${u ? `<button onclick="adminSetStatus(${u.id},'locked',${r.id})" class="px-2.5 py-1.5 rounded-lg font-bold cursor-pointer" style="background:#f59e0b;color:#111827;">🔒 Khóa</button><button onclick="adminSetStatus(${u.id},'banned',${r.id})" class="px-2.5 py-1.5 rounded-lg font-bold text-white cursor-pointer" style="background:#dc2626;">⛔ Ban</button><button onclick="adminDelUser(${u.id},${r.id})" class="px-2.5 py-1.5 rounded-lg bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer" style="color:#dc2626;">🗑️ Xóa</button>` : ''}
                    </div>
                  </div>`;
              }).join('') : `<div class="p-6 text-center text-xs text-[var(--muted-foreground)]">Chưa có đơn tố cáo nào!</div>`}
            </div>`}
        </div>`;
    }

    function adminSetPlan(uid, tier) {
      if (!isCurrentUserAdmin()) { notify('⛔ Chỉ tài khoản Admin mới có quyền này!'); return; }
      const u = state.users.find(x => x.id === uid); if (!u) return;
      u.basePlanTier = tier;
      u.planTier = tier;
      if (u.me) { state.user.basePlanTier = tier; state.user.planTier = tier; if (tier !== 'ultra') state.user.loungeOptIn = false; }
      syncTopRankRewards();
      notify(`👑 Admin đã cấp gói ${tier.toUpperCase()} cho ${u.name} (${u.accountCode})!`);
      render();
    }
    function adminSetStatus(uid, st, rid = null) {
      if (!isCurrentUserAdmin()) { notify('⛔ Chỉ tài khoản Admin mới có quyền này!'); return; }
      const u = state.users.find(x => x.id === uid); if (!u) return;
      u.status = st;
      if (rid) { const r = state.reports.find(x => x.id === rid); if (r) { r.status = 'resolved'; r.action = st === 'banned' ? 'Đã BAN vĩnh viễn' : 'Đã KHÓA tài khoản'; } }
      notify(`Đã cập nhật trạng thái ${u.name}!`);
      render();
    }
    function adminDelUser(uid, rid = null) {
      if (!isCurrentUserAdmin()) { notify('⛔ Chỉ tài khoản Admin mới có quyền này!'); return; }
      const u = state.users.find(x => x.id === uid); if (!u) return;
      state.users = state.users.filter(x => x.id !== uid);
      if (rid) { const r = state.reports.find(x => x.id === rid); if (r) { r.status = 'resolved'; r.action = 'Đã XÓA vĩnh viễn tài khoản'; } }
      notify(`Đã XÓA vĩnh viễn tài khoản ${u.name}!`);
      render();
    }

    function openReport(targetId, targetName, ctx) {
      state.pendingReportTarget = { targetId, targetName, ctx };
      document.getElementById('rep-target-lbl').innerHTML = `Đối tượng bị tố cáo: <strong>${targetName}</strong>`;
      document.getElementById('report-modal').classList.remove('hidden');
    }
    function submitReport(e) {
      e.preventDefault();
      const cat = document.querySelector('input[name="repcat"]:checked')?.value || 'harassment';
      const map = { harassment:'Làm phiền / Quấy rối', nsfw:'Khiêu dâm / Nội dung 18+', scam:'Lừa đảo / Spam độc hại' };
      const t = state.pendingReportTarget || { targetId:7, targetName:state.opponent.name, ctx:'duel' };
      state.reports.unshift({
        id: Date.now(), targetId: t.targetId, targetName: t.targetName, reporter: state.user.name,
        context: t.ctx, category: cat, catLabel: map[cat],
        details: document.getElementById('rep-details').value.trim() || 'Báo cáo vi phạm.',
        status: 'pending', action: ''
      });
      document.getElementById('rep-details').value = '';
      closeModal('report-modal');
      notify(`🚨 Đã gửi tố cáo "${map[cat]}" về Quản trị Admin!`);
      syncSidebar();
    }

    function updateAuthAdminBanner() {
      const box = document.getElementById('auth-admin-banner');
      if (!box) return;
      if (!state.firstAdmin) {
        box.style.background = 'rgba(217,119,6,0.12)';
        box.style.borderColor = '#d97706';
        box.innerHTML = `<strong style="color:#b45309;">👑 CHƯA CÓ ADMIN:</strong> Tài khoản <strong>đầu tiên</strong> bạn tạo (Tạo trên Web, Gmail hoặc Facebook) sẽ tự động trở thành <strong>ADMIN</strong> và được phép truy cập trang Quản trị!`;
      } else {
        box.style.background = 'rgba(13,148,136,0.08)';
        box.style.borderColor = 'rgba(13,148,136,0.35)';
        box.innerHTML = `<strong>🛡️ Admin hệ thống (Acc #1):</strong> <code class="font-mono font-bold text-[var(--primary)]">${state.firstAdmin}</code><div class="text-[var(--muted-foreground)] mt-0.5">Các tài khoản tạo thêm tiếp theo sẽ là <strong>User thường</strong> (không có quyền vào trang Admin).</div>`;
      }
    }

    function openAuth(defaultTab = 'login') {
      document.getElementById('social-quick-form')?.classList.add('hidden');
      updateAuthAdminBanner();
      switchWebAuthTab(!state.firstAdmin && defaultTab === 'login' ? 'register' : defaultTab);
      document.getElementById('auth-modal').classList.remove('hidden');
    }
    function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

    function openSocialQuickForm(prov) {
      const form = document.getElementById('social-quick-form');
      document.getElementById('sq-provider').value = prov;
      document.getElementById('sq-title').textContent = prov.includes('Gmail')
        ? '🔴 Đăng nhập bằng tài khoản Gmail (Google)'
        : '🔵 Đăng nhập bằng tài khoản Facebook';
      document.getElementById('sq-email').placeholder = prov.includes('Gmail')
        ? 'Nhập Gmail của bạn (VD: tenban@gmail.com)'
        : 'Nhập Email Facebook (VD: tenban@facebook.com)';
      form.classList.remove('hidden');
    }

    function applyLoggedInUser({ name, email, provider, accountCode = null, isNewRegistration = false }) {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanName = (name || cleanEmail.split('@')[0] || 'Học viên').trim();

      let becameFirstAdmin = false;
      if (!state.firstAdmin && (isNewRegistration || cleanEmail !== 'guest@tuvungmoingay.vn')) {
        state.firstAdmin = cleanEmail;
        becameFirstAdmin = true;
        try { localStorage.setItem('tvmn_first_admin', state.firstAdmin); } catch {}
      }

      const assignedRole = (state.firstAdmin && cleanEmail === state.firstAdmin.toLowerCase()) ? 'admin' : 'user';

      let existing = state.users.find(u => u.email.toLowerCase() === cleanEmail);
      state.users.forEach(u => { u.me = false; });
      if (!existing) {
        const newCode = accountCode || ('TVMN' + String(100001 + state.users.length));
        existing = {
          id: Date.now(), accountCode: newCode, name: cleanName, email: cleanEmail,
          role: assignedRole, planTier: 'free', basePlanTier: 'free',
          streak: 1, coins: 100, elo: 1000, color: assignedRole === 'admin' ? '#dc2626' : '#0d9488', status: 'active', me: true
        };
        state.users.push(existing);
      } else {
        existing.me = true;
        existing.name = cleanName;
        existing.role = assignedRole;
      }

      // Sync role in webAccounts too
      state.webAccounts.forEach(a => {
        if (a.email.toLowerCase() === cleanEmail) a.role = assignedRole;
      });
      try {
        localStorage.setItem('tvmn_web_accounts', JSON.stringify(state.webAccounts));
        localStorage.setItem('tvmn_current_session', JSON.stringify({ name: existing.name, email: cleanEmail, provider, accountCode: existing.accountCode }));
      } catch {}

      state.user.id = existing.id;
      state.user.accountCode = existing.accountCode;
      state.user.name = existing.name;
      state.user.email = cleanEmail;
      state.user.role = assignedRole;
      state.user.provider = provider;
      state.user.basePlanTier = existing.basePlanTier || existing.planTier || 'free';
      state.user.planTier = existing.planTier || 'free';
      state.user.streak = existing.streak;
      state.user.coins = existing.coins;
      state.user.elo = existing.elo;
      if (provider.includes('Gmail')) state.user.googleEmail = cleanEmail;
      if (provider.includes('Facebook')) state.user.fbEmail = cleanEmail;

      syncTopRankRewards();
      closeModal('auth-modal');

      if (state.nav === 'admin' && !isCurrentUserAdmin()) state.nav = 'home';

      if (becameFirstAdmin) {
        triggerStreakFx(10, `👑 Tài khoản ĐẦU TIÊN: ${existing.name} đã trở thành ADMIN toàn quyền!`);
        notify(`👑 Chúc mừng! Tài khoản đầu tiên (${existing.name} • ${cleanEmail}) đã tự động trở thành ADMIN và mở khóa trang Quản trị!`);
      } else if (assignedRole === 'admin') {
        notify(`🛡️ Chào mừng Admin ${existing.name} quay trở lại! Quyền Quản trị đã được kích hoạt.`);
      } else {
        notify(`✅ Đăng nhập thành công bằng ${provider} — ${existing.name} (Tài khoản Học viên thường, ID: ${existing.accountCode}).`);
      }
      render();
    }

    function logoutCurrentUser() {
      try { localStorage.removeItem('tvmn_current_session'); } catch {}
      state.users.forEach(u => { u.me = (u.id === 1); });
      const guest = state.users.find(u => u.id === 1) || state.users[0];
      state.user.id = guest.id;
      state.user.accountCode = guest.accountCode;
      state.user.name = guest.name;
      state.user.email = guest.email;
      state.user.role = 'user';
      state.user.provider = 'Chế độ Khách';
      state.user.basePlanTier = guest.basePlanTier || 'free';
      state.user.planTier = guest.planTier || 'free';
      if (state.nav === 'admin') state.nav = 'home';
      syncTopRankRewards();
      closeModal('auth-modal');
      notify('🚪 Đã đăng xuất về chế độ Khách (không có quyền Admin).');
      render();
    }

    function resetFirstAdminDemo() {
      state.firstAdmin = '';
      state.webAccounts = [];
      state.users = state.users.filter(u => u.id <= 11);
      state.users.forEach(u => { u.role = 'user'; u.me = (u.id === 1); });
      try {
        localStorage.removeItem('tvmn_first_admin');
        localStorage.removeItem('tvmn_web_accounts');
        localStorage.removeItem('tvmn_current_session');
      } catch {}
      logoutCurrentUser();
      notify('♻️ Đã reset! Tài khoản ĐẦU TIÊN bạn tạo tiếp theo sẽ trở thành Admin.');
    }

    function submitSocialQuickLogin(e) {
      e.preventDefault();
      const prov = document.getElementById('sq-provider').value;
      const name = document.getElementById('sq-name').value.trim();
      const email = document.getElementById('sq-email').value.trim();
      if (prov.includes('Gmail') && !email.includes('@')) {
        notify('⚠️ Vui lòng nhập địa chỉ Gmail hợp lệ.');
        return;
      }
      applyLoggedInUser({ name, email, provider: prov, isNewRegistration: true });
    }

    function switchWebAuthTab(tab) {
      const isLogin = tab === 'login';
      document.getElementById('web-login-form').classList.toggle('hidden', !isLogin);
      document.getElementById('web-register-form').classList.toggle('hidden', isLogin);
      const bL = document.getElementById('tab-web-login');
      const bR = document.getElementById('tab-web-register');
      bL.className = isLogin ? 'py-1.5 rounded-lg text-xs font-bold bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer' : 'py-1.5 rounded-lg text-xs font-bold text-[var(--muted-foreground)] cursor-pointer';
      bR.className = !isLogin ? 'py-1.5 rounded-lg text-xs font-bold bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer' : 'py-1.5 rounded-lg text-xs font-bold text-[var(--muted-foreground)] cursor-pointer';
    }

    function webAccountRegister(e) {
      e.preventDefault();
      const name = document.getElementById('wr-name').value.trim();
      const email = document.getElementById('wr-email').value.trim().toLowerCase();
      const pass = document.getElementById('wr-pass').value;
      const pass2 = document.getElementById('wr-pass2').value;
      if (pass !== pass2) {
        notify('❌ Mật khẩu nhập lại không khớp!');
        return;
      }
      if (state.webAccounts.some(a => a.email === email)) {
        notify('⚠️ Tài khoản này đã tồn tại trên web. Vui lòng chuyển sang tab Đăng nhập!');
        switchWebAuthTab('login');
        return;
      }
      const code = 'TVMN' + String(100001 + state.users.length + state.webAccounts.length);
      const role = !state.firstAdmin ? 'admin' : 'user';
      state.webAccounts.push({ name, email, pass, accountCode: code, role });
      try { localStorage.setItem('tvmn_web_accounts', JSON.stringify(state.webAccounts)); } catch {}
      e.target.reset();
      applyLoggedInUser({ name, email, provider: 'Tài khoản Web', accountCode: code, isNewRegistration: true });
    }

    function webAccountLogin(e) {
      e.preventDefault();
      const email = document.getElementById('wl-user').value.trim().toLowerCase();
      const pass = document.getElementById('wl-pass').value;
      const acc = state.webAccounts.find(a => a.email === email && a.pass === pass);
      if (!acc) {
        if (email === 'demo@tuvungmoingay.vn' && pass === '123456') {
          applyLoggedInUser({ name: 'Minh Anh (Demo)', email, provider: 'Tài khoản Web', accountCode: 'TVMN100012', isNewRegistration: false });
          return;
        }
        notify('❌ Sai tài khoản hoặc mật khẩu! Nếu chưa có tài khoản, hãy chọn tab "Tạo tài khoản mới".');
        return;
      }
      applyLoggedInUser({ name: acc.name, email: acc.email, provider: 'Tài khoản Web', accountCode: acc.accountCode, isNewRegistration: false });
    }

    // Auto-restore last logged-in session on reload
    (function restoreSavedSession() {
      try {
        const raw = localStorage.getItem('tvmn_current_session');
        if (!raw) return;
        const s = JSON.parse(raw);
        if (s && s.email) {
          const cleanEmail = s.email.toLowerCase();
          const role = (state.firstAdmin && cleanEmail === state.firstAdmin) ? 'admin' : 'user';
          let u = state.users.find(x => x.email.toLowerCase() === cleanEmail);
          state.users.forEach(x => { x.me = false; });
          if (!u) {
            u = { id: Date.now(), accountCode: s.accountCode || 'TVMN100099', name: s.name, email: cleanEmail, role, planTier: 'free', basePlanTier: 'free', streak: 1, coins: 100, elo: 1000, color: role==='admin'?'#dc2626':'#0d9488', status: 'active', me: true };
            state.users.push(u);
          } else {
            u.me = true;
            u.role = role;
          }
          state.user.id = u.id;
          state.user.accountCode = u.accountCode;
          state.user.name = u.name;
          state.user.email = cleanEmail;
          state.user.role = role;
          state.user.provider = s.provider || 'Tài khoản Web';
          state.user.basePlanTier = u.basePlanTier || u.planTier || 'free';
          state.user.planTier = u.planTier || 'free';
        }
      } catch {}
    })();

    document.getElementById('avatar-input').addEventListener('change', (e) => {
      const f = e.target.files?.[0]; if (!f) return;
      const r = new FileReader(); r.onload = () => { state.user.avatar = r.result; notify('Đã cập nhật ảnh Avatar!'); render(); }; r.readAsDataURL(f);
    });
    document.querySelectorAll('.snav').forEach(b => b.addEventListener('click', () => go(b.dataset.nav)));
    render();
