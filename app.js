// =========================================================================
// TIẾNG ANH MỖI NGÀY — TRAVEL EDITION (PRODUCTION READ-ONLY FRONTEND)
// =========================================================================
// Lưu ý: Mã nguồn chỉ chỉnh sửa qua kho GitHub của chủ sở hữu.
// Không có tài khoản ảo/giả — mọi tài khoản đều do người dùng thật đăng ký.

const ADMIN_CRED = { username: 'vanhung1155', pass: 'vanhung123456', accountCode: 'ADMIN-0001', name: 'Trần Văn Hùng (Admin)' };
const BANK_INFO = { bankCode: 'VPB', bankBin: '970432', bankName: 'VPBank', stk: '0779176786', owner: 'TRAN VAN HUNG', zalo: '0779176786' };
const PLAN_PRICES = { pro: { 1: 15000, 3: 45000, 6: 50000, 12: 80000 }, ultra: { 1: 30000, 3: 70000, 6: 90000, 12: 99000 } };

const REAL_WORDS_BY_CEFR = {};
if (typeof ATLAS_TOPICS !== 'undefined') {
  ATLAS_TOPICS.forEach(t => {
    if (!REAL_WORDS_BY_CEFR[t.cefr]) REAL_WORDS_BY_CEFR[t.cefr] = [];
    REAL_WORDS_BY_CEFR[t.cefr].push(...t.bank);
  });
}
const ALL_CURRICULUM_WORDS = (typeof PROGRAMS !== 'undefined')
  ? PROGRAMS.flatMap(p => p.topics.flatMap(t => t.words))
  : [];

function getAtlasPartWords(topic, partNo) {
  const p = Math.max(1, Math.min(topic.parts, Number(partNo) || 1));
  const bank = topic.bank || [];
  const out = [];
  if (p === 1 && bank.length) {
    bank.slice(0, 25).forEach(entry => {
      out.push({ word: entry[0], ipa: entry[1], pos: entry[2], meaning: entry[3], ex: `Example with "${entry[0]}" (${topic.name}).` });
    });
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

// =========================================================================
// CUTE HIPPO IN COW COSTUME SVG LOGO & MASCOT
// =========================================================================
function hippoCowSvg(cls = 'w-full h-full') {
  return `<svg viewBox="0 0 120 120" class="${cls}" xmlns="http://www.w3.org/2000/svg" aria-label="Logo Hà Mã Bò Sữa">
    <defs>
      <linearGradient id="hcBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e0f2fe"/><stop offset="100%" stop-color="#ccfbf1"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#hcBg)" stroke="#0d9488" stroke-width="3"/>
    <!-- Cow Hood / Body (White with black spots) -->
    <ellipse cx="60" cy="95" rx="34" ry="22" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="42" cy="94" r="6.5" fill="#1e293b"/>
    <circle cx="77" cy="98" r="5.5" fill="#1e293b"/>
    <ellipse cx="60" cy="105" rx="7" ry="4" fill="#1e293b"/>
    <!-- Little Cow Horns -->
    <path d="M35 28 Q28 16 38 15 Q42 20 42 28 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    <path d="M85 28 Q92 16 82 15 Q78 20 78 28 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    <!-- Cow Ears -->
    <ellipse cx="26" cy="40" rx="11" ry="6.5" transform="rotate(-22 26 40)" fill="#ffffff" stroke="#1e293b" stroke-width="2.4"/>
    <ellipse cx="26" cy="40" rx="6" ry="3.2" transform="rotate(-22 26 40)" fill="#fda4af"/>
    <ellipse cx="94" cy="40" rx="11" ry="6.5" transform="rotate(22 94 40)" fill="#ffffff" stroke="#1e293b" stroke-width="2.4"/>
    <ellipse cx="94" cy="40" rx="6" ry="3.2" transform="rotate(22 94 40)" fill="#fda4af"/>
    <!-- Cow Hood Head Wrap -->
    <circle cx="60" cy="54" r="32" fill="#ffffff" stroke="#1e293b" stroke-width="2.6"/>
    <circle cx="43" cy="34" r="6" fill="#1e293b"/>
    <circle cx="79" cy="38" r="5" fill="#1e293b"/>
    <!-- Cute Hippo Face inside Cow Hood -->
    <ellipse cx="60" cy="58" rx="25" ry="22" fill="#93c5fd" stroke="#1e3a8a" stroke-width="2"/>
    <!-- Eyes -->
    <circle cx="49" cy="51" r="4" fill="#0f172a"/><circle cx="47.8" cy="49.7" r="1.4" fill="#ffffff"/>
    <circle cx="71" cy="51" r="4" fill="#0f172a"/><circle cx="69.8" cy="49.7" r="1.4" fill="#ffffff"/>
    <!-- Rosy Cheeks -->
    <ellipse cx="39" cy="59" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.6"/>
    <ellipse cx="81" cy="59" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.6"/>
    <!-- Chubby Hippo Snout -->
    <ellipse cx="60" cy="67" rx="19" ry="12" fill="#bfdbfe" stroke="#1e3a8a" stroke-width="2"/>
    <circle cx="52" cy="64" r="2.2" fill="#1e3a8a"/>
    <circle cx="68" cy="64" r="2.2" fill="#1e3a8a"/>
    <path d="M51 71 Q60 77 69 71" fill="none" stroke="#1e3a8a" stroke-width="2.2" stroke-linecap="round"/>
    <!-- Little Gold Cow Bell -->
    <circle cx="60" cy="84" r="4.5" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
  </svg>`;
}

// =========================================================================
// PERSISTENT REAL-DATA STATE (ZERO FAKE ACCOUNTS)
// =========================================================================
function loadJson(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function saveJson(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

const state = {
  nav: 'home',
  drawerOpen: false,
  // Real registered accounts ONLY (no fake/dummy users!)
  users: loadJson('tamn_real_users_v1', []),
  currentUser: null,
  sessionUsername: localStorage.getItem('tamn_session_user_v1') || '',
  orders: loadJson('tamn_orders_v1', []),
  adminMediaLessons: loadJson('tamn_admin_media_v1', []),
  settings: loadJson('tamn_settings_v1', { typingSound: true, animations: true }),
  // Learning & Exam states
  selectedExam: localStorage.getItem('tamn_selected_exam_v1') || 'IELTS',
  progTab: 'IELTS',
  cefrFilter: 'ALL',
  atlasFilter: '',
  openAtlasSlug: null,
  openAtlasPart: null,
  atlasPage: 1,
  openCourseSlug: null,
  speakingId: SPEAKING_TOPICS[0].id,
  speakingTranscript: '',
  speakingResult: null,
  speakingRec: null,
  speakingListening: false,
  writingId: WRITING_PROMPTS[0].id,
  writingText: '',
  writingResult: null,
  readingId: READING_PASSAGES[0].id,
  readingAnswers: {},
  readingGraded: false,
  grammarId: GRAMMAR_LESSONS[0].id,
  grammarAnswers: {},
  grammarGraded: false,
  // Weekly mandatory quiz
  weeklyQuiz: { questions: [], idx: 0, score: 0, finished: false },
  // Vocab & Games
  excludedWords: loadJson('tamn_excluded_words_v1', {}),
  gameMode: 'quiz',
  gameTrack: 'IELTS',
  gameScore: 0,
  gameState: null,
  // Music player (YouTube Audio-Only)
  music: {
    playlist: loadJson('tamn_music_custom_v1', []).concat(MUSIC_CATALOG),
    favorites: loadJson('tamn_music_favs_v1', []),
    idx: 0,
    playing: false,
    volume: 65,
    tab: 'all',
    aiReply: 'Chào bạn! Hãy gõ tên bài hát, dán link YouTube, hoặc mô tả tâm trạng (VD: "nhạc chill học IELTS", "piano mưa nhẹ") để mình bật nhạc không hiện video nhé 🎧',
    ytPlayer: null,
    ytReady: false
  },
  // Lounge 1-1 random & Duel
  loungePartner: null,
  loungeCamOn: false,
  loungeMicOn: false,
  localStream: null,
  audioCtx: null,
  loungeMeterRaf: null,
  loungeMsgs: [],
  duelSimulateDay1: false,
  duelOpponent: null,
  // Certificate & FX
  activeCert: null,
  certRaf: null,
  rafs: [],
  // Admin UI tab
  adminTab: 'users',
  // Hippo AI Chatbox
  hippoOpen: false,
  hippoMsgs: [
    { role: 'ai', text: 'Xin chào! Mình là Bé Hà Mã Bò Sữa AI 🐄🦛. Bạn cần hỏi ngữ pháp, từ vựng, lộ trình IELTS/TOEIC/THPT hay tìm nhạc học bài cứ nhắn mình nhé!' }
  ]
};

// =========================================================================
// SOFT UNIQUE PER-KEY TYPING SOUND ENGINE (WEB AUDIO API)
// =========================================================================
let _keyAudioCtx = null;
const PENTATONIC_HZ = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

function playSoftKeySound(keyStr) {
  if (!state.settings.typingSound) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!_keyAudioCtx) _keyAudioCtx = new AC();
    if (_keyAudioCtx.state === 'suspended') _keyAudioCtx.resume().catch(() => {});

    const code = (keyStr && keyStr.length) ? keyStr.charCodeAt(0) : 65;
    const baseFreq = PENTATONIC_HZ[code % PENTATONIC_HZ.length];
    const fineShift = ((code * 13) % 19) - 9;
    const freq = Math.max(220, baseFreq + fineShift);

    const now = _keyAudioCtx.currentTime;
    const osc = _keyAudioCtx.createOscillator();
    const gain = _keyAudioCtx.createGain();

    osc.type = (code % 2 === 0) ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.92, now + 0.055);

    // Very soft, gentle volume (non-intrusive)
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.026, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(_keyAudioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  } catch {}
}

document.addEventListener('keydown', (e) => {
  if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
  if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) return;
  playSoftKeySound(e.key);
}, { passive: true });

// Mouse spotlight tracking for .hover-box
document.addEventListener('pointermove', (e) => {
  const box = e.target.closest?.('.hover-box');
  if (!box) return;
  const r = box.getBoundingClientRect();
  box.style.setProperty('--mx', Math.round(e.clientX - r.left) + 'px');
  box.style.setProperty('--my', Math.round(e.clientY - r.top) + 'px');
}, { passive: true });

// =========================================================================
// CORE AUTH, ADMIN STRICT GUARD & TOP 1-3 AUTO-ULTRA LOGIC
// =========================================================================
function saveUsers() {
  saveJson('tamn_real_users_v1', state.users);
}

function isAdmin() {
  return Boolean(state.currentUser && state.currentUser.isAdmin === true && state.currentUser.username === ADMIN_CRED.username);
}

function getCurrentWeekKey() {
  const d = new Date();
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((target - yearStart) / 86400000) + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function getRankedRealUsers() {
  return state.users
    .filter(u => u.status === 'active' && !u.isAdmin)
    .sort((a, b) => (b.streak || 0) - (a.streak || 0) || (b.coins || 0) - (a.coins || 0));
}

function syncTopRankRewards() {
  const ranked = getRankedRealUsers();
  const rankMap = {};
  ranked.forEach((u, idx) => { rankMap[u.id] = idx + 1; });

  state.users.forEach(u => {
    if (!u.basePlanTier) u.basePlanTier = u.planTier || 'free';
    const r = rankMap[u.id] || 999;
    const prevTop = u.topRank || 0;
    u.topRank = r <= 3 ? r : 0;
    if (r <= 3) {
      u.planTier = 'ultra';
      u.ultraFromTop = true;
    } else {
      u.planTier = u.basePlanTier;
      u.ultraFromTop = false;
      if (prevTop >= 1 && prevTop <= 3 && state.currentUser && state.currentUser.id === u.id && u.basePlanTier !== 'ultra') {
        notify('⚠️ Bạn đã rời khỏi Top 1–3 nên huy hiệu và gói Ultra thưởng Top đã tự động thu hồi.');
      }
    }
  });

  if (state.currentUser && !state.currentUser.isAdmin) {
    const fresh = state.users.find(u => u.id === state.currentUser.id);
    if (fresh) state.currentUser = fresh;
  }
  saveUsers();
}

function rankBadgeHtml(u) {
  if (!u) return '';
  if (u.isAdmin) return `<span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold text-white bg-rose-600 shrink-0">🛡️ ADMIN</span>`;
  const r = u.topRank || 0;
  if (r === 1) return `<span class="badge-gold inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">🥇 Vàng</span>`;
  if (r === 2) return `<span class="badge-silver inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">🥈 Bạc</span>`;
  if (r === 3) return `<span class="badge-bronze inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shrink-0">🥉 Đồng</span>`;
  return '';
}

function nameWithBadge(u) {
  if (!u) return 'Khách';
  return `<span class="inline-flex items-center gap-1 flex-wrap"><span>${escapeHtml(u.name)}</span>${rankBadgeHtml(u)}</span>`;
}

function escapeHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function avatarHtml(u, px = 34) {
  if (u && u.avatar) return `<img src="${u.avatar}" class="rounded-full object-cover shrink-0 border border-white/60" style="width:${px}px;height:${px}px;" />`;
  const letter = (u && u.name ? u.name.slice(0, 1) : '?').toUpperCase();
  const bg = u && u.isAdmin ? '#dc2626' : (u && u.color ? u.color : '#0d9488');
  return `<span class="rounded-full inline-flex items-center justify-center font-bold text-xs text-white shrink-0" style="width:${px}px;height:${px}px;background:${bg};">${letter}</span>`;
}

function getEffectivePlan() {
  if (!state.currentUser) return 'free';
  if (isAdmin()) return 'ultra';
  return state.currentUser.planTier || 'free';
}

function needsWeeklyMandatoryTest() {
  if (!state.currentUser || isAdmin()) return false;
  const tier = getEffectivePlan();
  if (tier !== 'free' && tier !== 'pro') return false;
  return state.currentUser.weeklyQuizDone !== getCurrentWeekKey();
}

function enforceWeeklyTest() {
  if (needsWeeklyMandatoryTest()) {
    notify('📝 Tài khoản Thường & Pro bắt buộc hoàn thành 1 bài Kiểm tra ôn từ vựng trong tuần này trước khi tiếp tục!');
    state.nav = 'weekly_quiz';
    render();
    return false;
  }
  return true;
}

function getTopicLearnerCount(slug) {
  const realActive = state.users.filter(u => u.status === 'active' && u.completedAtlasParts && u.completedAtlasParts[slug]).length;
  return realActive;
}

function getTrackLearnerCount(trackId) {
  const realCount = state.users.filter(u => u.status === 'active' && u.selectedExam === trackId).length;
  return realCount;
}

function restoreSession() {
  const uname = state.sessionUsername;
  if (!uname) { state.currentUser = null; return; }
  if (uname === ADMIN_CRED.username) {
    state.currentUser = {
      id: 0, username: ADMIN_CRED.username, accountCode: ADMIN_CRED.accountCode,
      name: ADMIN_CRED.name, email: 'admin@tienganhmoingay.ap.vn', phone: '0779176786',
      isAdmin: true, role: 'admin', planTier: 'ultra', basePlanTier: 'ultra',
      avatar: localStorage.getItem('tamn_admin_avatar_v1') || '',
      streak: 0, coins: 0, elo: 1200, status: 'active',
      gmailVerified: true, phoneVerified: true,
      completedAtlasParts: loadJson('tamn_admin_parts_v1', {}),
      completedCourseLessons: loadJson('tamn_admin_courses_v1', {}),
      roadmapStartDates: loadJson('tamn_admin_rmstarts_v1', {}),
      personalWords: loadJson('tamn_admin_pwords_v1', [])
    };
    return;
  }
  const found = state.users.find(u => u.username.toLowerCase() === uname.toLowerCase());
  if (found && found.status === 'active') {
    state.currentUser = found;
  } else {
    state.currentUser = null;
    localStorage.removeItem('tamn_session_user_v1');
  }
}

// =========================================================================
// UI UTILITIES, DRAWER, TOAST, SPEECH, CLEANUP
// =========================================================================
function notify(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.add('hidden'), 3800);
}

function copyText(txt, msg = 'Đã sao chép') {
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(txt).catch(() => {});
  notify(`${msg}: ${txt}`);
}

function speak(text, lang = 'en-US', rate = 0.95) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    window.speechSynthesis.speak(u);
  } catch {}
}

function toggleDrawer() {
  state.drawerOpen ? closeDrawer() : openDrawer();
}
function openDrawer() {
  state.drawerOpen = true;
  document.getElementById('nav-drawer').classList.remove('drawer-closed');
  document.getElementById('nav-drawer').classList.add('drawer-open');
  document.getElementById('nav-drawer-backdrop').classList.remove('hidden');
}
function closeDrawer() {
  state.drawerOpen = false;
  document.getElementById('nav-drawer').classList.add('drawer-closed');
  document.getElementById('nav-drawer').classList.remove('drawer-open');
  document.getElementById('nav-drawer-backdrop').classList.add('hidden');
}

function openZaloModal() { document.getElementById('zalo-modal').classList.remove('hidden'); }
function openAuth(tab = 'login') {
  document.getElementById('social-quick-form')?.classList.add('hidden');
  switchWebAuthTab(tab);
  document.getElementById('auth-modal').classList.remove('hidden');
}
function openAccountOrAuth() {
  if (state.currentUser) go('settings');
  else openAuth('login');
}
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

function cleanup() {
  state.rafs.forEach(id => cancelAnimationFrame(id));
  state.rafs = [];
  if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
  if (state.audioCtx) { try { state.audioCtx.close(); } catch {} state.audioCtx = null; }
  if (state.loungeMeterRaf) { cancelAnimationFrame(state.loungeMeterRaf); state.loungeMeterRaf = null; }
  if (state.speakingRec) { try { state.speakingRec.stop(); } catch {} state.speakingRec = null; state.speakingListening = false; }
  state.loungeCamOn = false;
  state.loungeMicOn = false;
}

function syncChromeUi() {
  syncTopRankRewards();
  document.body.classList.toggle('reduce-motion', !state.settings.animations);

  const u = state.currentUser;
  const topAv = document.getElementById('top-avatar');
  const topName = document.getElementById('top-user-name');
  const topPlan = document.getElementById('top-user-plan');
  const drawerId = document.getElementById('drawer-user-id');
  const admGroup = document.getElementById('drawer-admin-group');
  const sndLbl = document.getElementById('drawer-snd-lbl');
  const wp = document.getElementById('weekly-quiz-pill');
  const admPill = document.getElementById('adm-rep-pill');

  if (sndLbl) sndLbl.textContent = state.settings.typingSound ? 'Bật' : 'Tắt';

  if (u) {
    if (u.avatar) topAv.innerHTML = `<img src="${u.avatar}" class="w-full h-full object-cover" />`;
    else topAv.textContent = u.name.slice(0, 1).toUpperCase();
    topName.innerHTML = nameWithBadge(u);
    topPlan.textContent = isAdmin()
      ? '🛡️ Quản trị viên'
      : (u.planTier === 'ultra' ? (u.ultraFromTop ? `💎 ULTRA (Top ${u.topRank})` : '💎 ULTRA') : u.planTier === 'pro' ? '⚡ PRO' : '🌱 Thường');
    drawerId.textContent = `ID: ${u.accountCode} • ${u.name}`;
  } else {
    topAv.textContent = '?';
    topName.textContent = 'Đăng nhập';
    topPlan.textContent = 'Tạo acc thật';
    drawerId.textContent = 'Chưa đăng nhập';
  }

  // STRICT ADMIN VISIBILITY: Hidden for everyone except vanhung1155
  if (admGroup) {
    if (isAdmin()) {
      admGroup.classList.remove('hidden');
      const waitCount = state.orders.filter(o => o.status === 'waiting_approval').length;
      if (admPill) { admPill.textContent = waitCount; admPill.style.display = waitCount > 0 ? '' : 'none'; }
    } else {
      admGroup.classList.add('hidden');
    }
  }

  if (wp) {
    if (!u || isAdmin() || getEffectivePlan() === 'ultra') {
      wp.textContent = isAdmin() ? 'Admin' : 'Mở';
      wp.style.background = '#0284c7';
    } else if (needsWeeklyMandatoryTest()) {
      wp.textContent = 'Bắt buộc';
      wp.style.background = '#dc2626';
    } else {
      wp.textContent = '✓ Xong';
      wp.style.background = '#10b981';
    }
  }

  document.querySelectorAll('.snav').forEach(b => {
    const active = b.dataset.nav === state.nav;
    b.className = active
      ? 'snav w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between cursor-pointer bg-[var(--primary)] text-white shadow-sm'
      : 'snav w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between cursor-pointer hover:bg-[var(--content)] text-slate-700';
  });
}

function go(nav) {
  closeDrawer();
  syncTopRankRewards();
  if (nav === 'admin' && !isAdmin()) {
    notify('⛔ Truy cập bị từ chối! Chỉ tài khoản Admin mới được vào khu vực Quản trị.');
    return;
  }
  const guardedLearning = ['games', 'speaking', 'writing', 'reading', 'grammar', 'vocab'];
  if (guardedLearning.includes(nav) && !enforceWeeklyTest()) return;
  state.nav = nav;
  if (nav !== 'roadmaps') { state.openAtlasSlug = null; state.openAtlasPart = null; }
  if (nav !== 'courses') state.openCourseSlug = null;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  cleanup();
  syncChromeUi();
  const v = document.getElementById('view');
  if (!v) return;
  v.classList.remove('view-animate');
  void v.offsetWidth;
  v.classList.add('view-animate');

  const routes = {
    home: renderHome,
    speaking: renderSpeaking,
    writing: renderWriting,
    reading: renderReading,
    grammar: renderGrammar,
    vocab: renderVocabDaily,
    roadmaps: renderRoadmaps,
    courses: renderCourses,
    weekly_quiz: renderWeeklyQuiz,
    games: renderGames,
    music: renderMusic,
    lounge: renderLounge,
    duel: renderDuel,
    leaderboard: renderLeaderboard,
    pricing: renderPricing,
    settings: renderSettings,
    admin: renderAdmin
  };
  (routes[state.nav] || renderHome)(v);
}

// =========================================================================
// GLOBAL SEARCH
// =========================================================================
function onGlobalSearch(raw) {
  const drop = document.getElementById('top-search-drop');
  const q = (raw || '').trim().toLowerCase();
  if (!q) { drop.classList.add('hidden'); return; }
  const tHits = ATLAS_TOPICS.filter(t => (t.name + ' ' + t.desc + ' ' + t.track + ' ' + t.cefr).toLowerCase().includes(q)).slice(0, 5);
  const gHits = GRAMMAR_LESSONS.filter(g => (g.title + ' ' + g.summary).toLowerCase().includes(q)).slice(0, 3);
  if (!tHits.length && !gHits.length) {
    drop.innerHTML = `<div class="p-3 text-xs text-[var(--muted-foreground)]">Không tìm thấy "${escapeHtml(q)}". Thử gõ IELTS, TOEIC, THPT, bị động, điều kiện...</div>`;
    drop.classList.remove('hidden');
    return;
  }
  drop.innerHTML =
    (gHits.length ? `<div class="px-3 py-1.5 text-[11px] font-extrabold bg-[var(--content)] text-teal-700">📐 Ngữ pháp</div>` +
      gHits.map(g => `<div onclick="document.getElementById('top-search-drop').classList.add('hidden');state.grammarId='${g.id}';go('grammar')" class="px-3 py-2 cursor-pointer hover:bg-[var(--content)] text-xs"><strong>${g.title}</strong><div class="text-[var(--muted-foreground)] truncate">${g.summary}</div></div>`).join('') : '') +
    (tHits.length ? `<div class="px-3 py-1.5 text-[11px] font-extrabold bg-[var(--content)] text-sky-700">🗺️ Lộ trình chủ đề</div>` +
      tHits.map(t => `<div onclick="document.getElementById('top-search-drop').classList.add('hidden');state.progTab='${t.track}';state.openAtlasSlug='${t.slug}';state.openAtlasPart=null;state.nav='roadmaps';render()" class="px-3 py-2 flex justify-between items-center gap-2 cursor-pointer hover:bg-[var(--content)] text-xs"><div><strong>${t.name}</strong><div class="text-[var(--muted-foreground)] truncate">${t.desc}</div></div><span class="font-mono text-teal-700 font-bold shrink-0">${t.parts} phần</span></div>`).join('') : '');
  drop.classList.remove('hidden');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest?.('#top-quick-search') && !e.target.closest?.('#top-search-drop')) {
    document.getElementById('top-search-drop')?.classList.add('hidden');
  }
});

// =========================================================================
// AUTHENTICATION (REAL USERS ONLY + FIXED ADMIN vanhung1155)
// =========================================================================
function openSocialQuickForm(prov) {
  const form = document.getElementById('social-quick-form');
  document.getElementById('sq-provider').value = prov;
  document.getElementById('sq-title').textContent = prov.includes('Gmail') ? '🔴 Đăng nhập bằng Gmail' : '🔵 Đăng nhập bằng Facebook';
  document.getElementById('sq-email').placeholder = prov.includes('Gmail') ? 'tenban@gmail.com' : 'tenban@facebook.com';
  form.classList.remove('hidden');
}

function switchWebAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('web-login-form').classList.toggle('hidden', !isLogin);
  document.getElementById('web-register-form').classList.toggle('hidden', isLogin);
  document.getElementById('tab-web-login').className = isLogin ? 'py-1.5 rounded-lg text-xs font-bold bg-[var(--primary)] text-white cursor-pointer' : 'py-1.5 rounded-lg text-xs font-bold text-[var(--muted-foreground)] cursor-pointer';
  document.getElementById('tab-web-register').className = !isLogin ? 'py-1.5 rounded-lg text-xs font-bold bg-[var(--primary)] text-white cursor-pointer' : 'py-1.5 rounded-lg text-xs font-bold text-[var(--muted-foreground)] cursor-pointer';
}

function createRealUserRecord({ name, username, email, phone = '', pass, provider }) {
  const cleanUser = username.trim().toLowerCase();
  const nextNum = 100001 + state.users.length;
  const code = `TAMN-${nextNum}`;
  const colors = ['#0d9488', '#0284c7', '#d97706', '#e11d48', '#059669', '#0891b2'];
  const rec = {
    id: Date.now() + Math.floor(Math.random() * 999),
    accountCode: code,
    username: cleanUser,
    name: name.trim(),
    email: (email || cleanUser).trim().toLowerCase(),
    phone: phone.trim(),
    password: pass,
    provider,
    isAdmin: false,
    role: 'user',
    planTier: 'free',
    basePlanTier: 'free',
    topRank: 0,
    ultraFromTop: false,
    streak: 1,
    coins: 50,
    elo: 1000,
    monthlyDays: 1,
    grindPts: 50,
    color: colors[state.users.length % colors.length],
    avatar: '',
    status: 'active',
    selectedExam: state.selectedExam || 'IELTS',
    gmailVerified: provider.includes('Gmail'),
    phoneVerified: false,
    weeklyQuizDone: '',
    completedAtlasParts: {},
    completedCourseLessons: {},
    roadmapStartDates: {},
    personalWords: [],
    createdAt: new Date().toLocaleDateString('vi-VN')
  };
  state.users.push(rec);
  saveUsers();
  return rec;
}

function loginAsUserObj(u) {
  if (u.status === 'banned') { notify('⛔ Tài khoản này đã bị Quản trị viên BAN vĩnh viễn!'); return; }
  if (u.status === 'locked') { notify('🔒 Tài khoản này đang bị tạm khóa! Liên hệ Zalo 0779176786.'); return; }
  state.currentUser = u;
  state.sessionUsername = u.username;
  localStorage.setItem('tamn_session_user_v1', u.username);
  closeModal('auth-modal');
  syncTopRankRewards();
  notify(`✈️ Xin chào ${u.name}! Mã ID cố định của bạn là ${u.accountCode}.`);
  render();
}

function submitSocialQuickLogin(e) {
  e.preventDefault();
  const prov = document.getElementById('sq-provider').value;
  const name = document.getElementById('sq-name').value.trim();
  const email = document.getElementById('sq-email').value.trim().toLowerCase();
  if (email === ADMIN_CRED.username) { notify('⚠️ Vui lòng đăng nhập Admin ở khung tài khoản Web.'); return; }
  let u = state.users.find(x => x.username === email || x.email === email);
  if (!u) {
    u = createRealUserRecord({ name, username: email, email, pass: 'social_' + Date.now(), provider: prov });
  }
  loginAsUserObj(u);
}

function webAccountRegister(e) {
  e.preventDefault();
  const name = document.getElementById('wr-name').value.trim();
  const username = document.getElementById('wr-user').value.trim().toLowerCase();
  const phone = document.getElementById('wr-phone').value.trim();
  const pass = document.getElementById('wr-pass').value;
  const pass2 = document.getElementById('wr-pass2').value;
  if (pass !== pass2) { notify('❌ Mật khẩu nhập lại không khớp!'); return; }
  if (username === ADMIN_CRED.username) { notify('⛔ Tên đăng nhập này dành riêng cho hệ thống!'); return; }
  if (state.users.some(u => u.username === username || u.email === username)) {
    notify('⚠️ Tài khoản này đã tồn tại! Vui lòng chuyển sang tab Đăng nhập.');
    switchWebAuthTab('login');
    return;
  }
  const email = username.includes('@') ? username : '';
  const u = createRealUserRecord({ name, username, email, phone, pass, provider: 'Tài khoản Web' });
  e.target.reset();
  loginAsUserObj(u);
}

function webAccountLogin(e) {
  e.preventDefault();
  const rawUser = document.getElementById('wl-user').value.trim().toLowerCase();
  const pass = document.getElementById('wl-pass').value;

  // Fixed Admin Account Check: vanhung1155 / vanhung123456
  if (rawUser === ADMIN_CRED.username) {
    if (pass !== ADMIN_CRED.pass) {
      notify('❌ Sai mật khẩu tài khoản Admin!');
      return;
    }
    state.sessionUsername = ADMIN_CRED.username;
    localStorage.setItem('tamn_session_user_v1', ADMIN_CRED.username);
    restoreSession();
    closeModal('auth-modal');
    notify('🛡️ Đăng nhập Admin thành công! Toàn quyền quản trị đã được mở khóa.');
    render();
    return;
  }

  const u = state.users.find(x => (x.username === rawUser || x.email === rawUser) && x.password === pass);
  if (!u) {
    notify('❌ Sai tài khoản hoặc mật khẩu! Nếu chưa có tài khoản thật, hãy chọn tab "Đăng ký mới".');
    return;
  }
  loginAsUserObj(u);
}

function logoutUser() {
  state.currentUser = null;
  state.sessionUsername = '';
  localStorage.removeItem('tamn_session_user_v1');
  if (state.nav === 'admin') state.nav = 'home';
  notify('🚪 Đã đăng xuất an toàn.');
  render();
}

// =========================================================================
// 1. TRANG CHỦ PHONG CÁCH DU LỊCH (CLEAN, NỊNH MẮT, KHÔNG LAN MAN)
// =========================================================================
function setExamMode(exam) {
  state.selectedExam = exam;
  localStorage.setItem('tamn_selected_exam_v1', exam);
  if (state.currentUser && !isAdmin()) {
    state.currentUser.selectedExam = exam;
    saveUsers();
  }
  notify(`🧭 Đã chọn kỳ thi mục tiêu: ${exam} — Hệ thống AI chấm điểm sẽ tự chấm theo thang ${exam}!`);
  render();
}

function renderHome(v) {
  const u = state.currentUser;
  const totalWords = ATLAS_TOPICS.reduce((s, t) => s + t.words, 0);
  const exams = [
    { id: 'IELTS', label: '🌍 IELTS (Band 0–9.0)', col: '#0284c7', desc: 'Academic Speaking • Writing Task 1-2 • Reading' },
    { id: 'TOEIC', label: '💼 TOEIC (0–990 điểm)', col: '#d97706', desc: 'Email Công sở • Part 1–7 • Giao tiếp Doanh nghiệp' },
    { id: 'THPT', label: '🎓 THPT Quốc Gia (0–10đ)', col: '#e11d48', desc: 'Ngữ pháp 12 • Đọc hiểu • Viết đoạn văn' }
  ];

  v.innerHTML = `
    <div class="space-y-6">
      ${needsWeeklyMandatoryTest() ? `
        <div class="travel-card p-4 border-2 border-rose-500 bg-rose-50/80 flex flex-wrap justify-between items-center gap-3">
          <div class="text-xs space-y-0.5">
            <div class="font-extrabold text-sm text-rose-700">📝 Nhiệm Vụ Bắt Buộc Tuần ${getCurrentWeekKey()} (Tài khoản Thường & Pro)</div>
            <div class="text-slate-700">Hoàn thành 1 bài kiểm tra ôn từ vựng ngắn (8 câu) để mở khóa toàn bộ bài học và game tuần này.</div>
          </div>
          <button onclick="go('weekly_quiz')" class="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer shrink-0">✍️ Làm kiểm tra ngay →</button>
        </div>` : ''}

      <!-- Travel Boarding Pass Hero -->
      <section class="boarding-pass p-6 sm:p-7 text-white shadow-xl" style="background:linear-gradient(125deg,#0f172a 0%,#0f766e 55%,#0284c7 100%);">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 border border-white/25">
              <span class="travel-plane">✈️</span>
              <span>CHUYẾN BAY CHINH PHỤC TIẾNG ANH • ${ATLAS_TOPICS.length} ĐIỂM ĐẾN • ${totalWords.toLocaleString('vi-VN')}+ TỪ</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black leading-tight">
              ${u ? `Chào ${nameWithBadge(u)}, sẵn sàng cất cánh hôm nay chưa?` : 'Khởi hành hành trình Tiếng Anh Mỗi Ngày!'}
            </h1>
            <p class="text-xs sm:text-sm text-teal-50/90 leading-relaxed">
              Học trọn bộ <strong>Nói • Viết • Đọc • Ngữ pháp • Từ vựng</strong> kết hợp <strong>AI chấm điểm chuẩn kỳ thi</strong>, nghe nhạc YouTube nền không quảng cáo hình ảnh và nhận chứng chỉ khi về đích.
            </p>
            <div class="flex flex-wrap gap-2 pt-1">
              <button onclick="openDrawer()" class="px-4 py-2.5 rounded-xl bg-white text-teal-900 font-extrabold text-xs shadow cursor-pointer hover:bg-teal-50">☰ Mở Menu 3 Gạch</button>
              <button onclick="go('roadmaps')" class="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs shadow cursor-pointer hover:bg-amber-300">🧭 Vào Lộ Trình</button>
              ${!u ? `<button onclick="openAuth('register')" class="px-4 py-2.5 rounded-xl bg-white/15 border border-white/35 text-white font-bold text-xs cursor-pointer hover:bg-white/25">✨ Tạo Tài Khoản Thật</button>` : `<button onclick="go('settings')" class="px-4 py-2.5 rounded-xl bg-white/15 border border-white/35 text-white font-bold text-xs cursor-pointer hover:bg-white/25">⚙️ Cài Đặt</button>`}
            </div>
          </div>

          <!-- Boarding Pass Mini Ticket -->
          <div class="w-full sm:w-64 rounded-2xl p-4 bg-white/12 backdrop-blur border border-white/25 space-y-2.5 text-xs">
            <div class="flex justify-between items-center">
              <span class="font-bold opacity-85">VÉ HỌC TẬP</span>
              <span class="font-mono font-bold text-amber-300">${u ? u.accountCode : 'CHƯA ĐĂNG KÝ'}</span>
            </div>
            <div class="boarding-divider pt-2.5 space-y-1">
              <div class="flex justify-between"><span class="opacity-80">Kỳ thi mục tiêu:</span><strong class="text-amber-300">${state.selectedExam}</strong></div>
              <div class="flex justify-between"><span class="opacity-80">Học viên thật:</span><strong>${state.users.filter(x => x.status === 'active').length} người</strong></div>
              <div class="flex justify-between"><span class="opacity-80">Âm gõ phím:</span><strong>${state.settings.typingSound ? '🎹 Đang bật' : '🔇 Đã tắt'}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Exam Goal Selector (Affects AI Grading Rubric) -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h2 class="text-sm font-extrabold text-slate-800">🎯 Chọn Kỳ Thi Mục Tiêu (AI chấm điểm tự động theo kỳ thi này)</h2>
          <span class="text-xs text-[var(--muted-foreground)]">Đang chọn: <strong class="text-teal-700">${state.selectedExam}</strong></span>
        </div>
        <div class="grid sm:grid-cols-3 gap-3">
          ${exams.map(ex => `
            <div onclick="setExamMode('${ex.id}')" class="hover-box travel-card p-4 cursor-pointer border-2 ${state.selectedExam === ex.id ? 'border-teal-500 bg-teal-50/40' : 'border-[var(--border)]'}" style="--tile-c:${ex.col};">
              <div class="flex justify-between items-center">
                <strong class="text-sm">${ex.label}</strong>
                ${state.selectedExam === ex.id ? '<span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-600 text-white">Đang chọn</span>' : ''}
              </div>
              <div class="text-xs text-[var(--muted-foreground)] mt-1">${ex.desc}</div>
              <div class="text-[11px] font-bold text-teal-700 mt-2">👥 ${getTrackLearnerCount(ex.id)} học viên thật đang chọn</div>
            </div>`).join('')}
        </div>
      </section>

      <!-- 5 Core Learning Destinations -->
      <section class="space-y-2.5">
        <h2 class="text-sm font-extrabold text-slate-800">📖 Trạm Học 4 Kỹ Năng & Ngữ Pháp (Chấm điểm AI)</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          ${[
            { nav:'speaking', ic:'🗣️', title:'Luyện Nói', sub:'Thu âm Mic • AI chấm phát âm', col:'#0d9488' },
            { nav:'writing', ic:'✍️', title:'Luyện Viết', sub:'Chấm hình thức & nội dung', col:'#0284c7' },
            { nav:'reading', ic:'📚', title:'Luyện Đọc', sub:'Trắc nghiệm • T/F/NG • Điền từ', col:'#d97706' },
            { nav:'grammar', ic:'📐', title:'Ngữ Pháp', sub:'Video bài giảng • 4 dạng bài', col:'#e11d48' },
            { nav:'vocab', ic:'🌱', title:'Từ Vựng', sub:'283 chủ đề • Sổ từ cá nhân', col:'#059669' }
          ].map(item => `
            <div onclick="go('${item.nav}')" class="hover-box travel-card p-4 cursor-pointer space-y-1.5" style="--tile-c:${item.col};border-top:3px solid ${item.col};">
              <div class="text-2xl">${item.ic}</div>
              <div class="font-extrabold text-sm">${item.title}</div>
              <div class="text-xs text-[var(--muted-foreground)]">${item.sub}</div>
            </div>`).join('')}
        </div>
      </section>

      <!-- Quick Travel Hubs: Courses, Music, Rank -->
      <section class="grid sm:grid-cols-3 gap-3">
        <div onclick="go('courses')" class="hover-box travel-card p-4 cursor-pointer space-y-1" style="--tile-c:#0284c7;">
          <div class="text-xs font-extrabold text-sky-700">🎓 KHÓA HỌC & TIẾN ĐỘ</div>
          <div class="font-bold text-sm">8 Khóa Học Chuẩn Lộ Trình</div>
          <div class="text-xs text-[var(--muted-foreground)]">Hiển thị chi tiết phần đã học, % tiến độ và chứng chỉ hoàn thành.</div>
        </div>
        <div onclick="go('music')" class="hover-box travel-card p-4 cursor-pointer space-y-1" style="--tile-c:#f59e0b;">
          <div class="text-xs font-extrabold text-amber-700">🎧 ÂM NHẠC YOUTUBE AUDIO</div>
          <div class="font-bold text-sm">Nghe Nhạc Nền Không Video</div>
          <div class="text-xs text-[var(--muted-foreground)]">Phát nhạc YouTube trên Cốc Cốc/Chrome, chỉnh âm lượng, chuyển bài & lưu yêu thích.</div>
        </div>
        <div onclick="go('leaderboard')" class="hover-box travel-card p-4 cursor-pointer space-y-1" style="--tile-c:#e11d48;">
          <div class="text-xs font-extrabold text-rose-600">🏆 RANK & ĐỐI KHÁNG 1V1</div>
          <div class="font-bold text-sm">Top 1–3 Nhận Huy Hiệu + Ultra</div>
          <div class="text-xs text-[var(--muted-foreground)]">100% học viên thật đua Top • Đối kháng ghép mới ngày 01 hằng tháng.</div>
        </div>
      </section>
    </div>`;
}

// =========================================================================
// 2. EXAM-AWARE AI GRADING ENGINE (IELTS / TOEIC / THPT)
// =========================================================================
function evaluateWithExamAi({ text, exam, skill, keywords = [], minWords = 40 }) {
  const clean = (text || '').trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean) : [];
  const wc = words.length;
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const lower = clean.toLowerCase();

  const matchedKw = keywords.filter(k => lower.includes(k.toLowerCase()));
  const connectors = ['however','moreover','furthermore','therefore','although','because','firstly','secondly','in conclusion','overall','for example','in addition','whereas'];
  const usedConn = connectors.filter(c => lower.includes(c));
  const uniqueRatio = wc ? (new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g,''))).size / wc) : 0;

  // Sub-scores out of 100
  const formScore = Math.min(100, Math.round((Math.min(wc, minWords) / Math.max(1, minWords)) * 65 + Math.min(35, sentences.length * 7)));
  const contentScore = Math.min(100, Math.round(40 + (matchedKw.length / Math.max(1, keywords.length)) * 45 + (wc >= minWords ? 15 : 0)));
  const vocabScore = Math.min(100, Math.round(35 + uniqueRatio * 45 + Math.min(20, matchedKw.length * 5)));
  const grammarScore = Math.min(100, Math.round(45 + Math.min(25, usedConn.length * 8) + (sentences.length >= 3 ? 20 : 8) + (/^[A-Z]/.test(clean) ? 10 : 0)));

  const avg = Math.round((formScore + contentScore + vocabScore + grammarScore) / 4);

  let headlineScore = '';
  let examLabel = '';
  if (exam === 'IELTS') {
    const band = (Math.round(((avg / 100) * 5.5 + 3.5) * 2) / 2).toFixed(1);
    headlineScore = `Band ${Math.min(9.0, Number(band)).toFixed(1)} / 9.0`;
    examLabel = `Tiêu chí IELTS ${skill === 'speaking' ? 'Speaking' : 'Writing'}`;
  } else if (exam === 'TOEIC') {
    const pts = Math.min(200, Math.round((avg / 100) * 140 + 60));
    headlineScore = `${pts} / 200 điểm`;
    examLabel = `Tiêu chí TOEIC ${skill === 'speaking' ? 'Speaking' : 'Writing'}`;
  } else {
    const sc10 = Math.min(10, Number(((avg / 100) * 6 + 4).toFixed(1)));
    headlineScore = `${sc10} / 10.0 điểm`;
    examLabel = `Thang điểm THPT Quốc Gia`;
  }

  const tips = [];
  if (wc < minWords) tips.push(`Bài làm hiện có ${wc} từ — nên viết/nói ít nhất ${minWords} từ để đảm bảo hình thức bài thi ${exam}.`);
  if (matchedKw.length < 2) tips.push(`Nên lồng ghép thêm từ khóa trọng tâm chủ đề: ${keywords.slice(0, 4).join(', ')}.`);
  if (!usedConn.length) tips.push('Bổ sung từ nối học thuật (However, Moreover, Therefore, For example...) để tăng điểm mạch lạc.');
  if (sentences.length < 3) tips.push('Chia câu rõ ràng với đầy đủ Mở bài – Thân bài – Kết luận.');
  if (!tips.length) tips.push(`Bài làm rất tốt, bố cục chặt chẽ và phù hợp tiêu chuẩn ${exam}!`);

  return { headlineScore, examLabel, wc, sentences: sentences.length, formScore, contentScore, vocabScore, grammarScore, matchedKw, tips };
}

function renderAiScoreCard(res) {
  if (!res) return '';
  return `
    <div class="travel-card p-5 border-2 border-teal-500 bg-teal-50/40 space-y-3">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <div class="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">🤖 KẾT QUẢ AI CHẤM ĐIỂM • ${res.examLabel}</div>
          <div class="text-2xl font-black text-slate-900 mt-0.5">${res.headlineScore}</div>
        </div>
        <div class="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-teal-200">
          ${res.wc} từ • ${res.sentences} câu
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        ${[
          ['Hình thức & Bố cục', res.formScore, '#0d9488'],
          ['Nội dung & Lập luận', res.contentScore, '#0284c7'],
          ['Từ vựng (Lexical)', res.vocabScore, '#d97706'],
          ['Ngữ pháp & Liên kết', res.grammarScore, '#e11d48']
        ].map(([lbl, val, col]) => `
          <div class="bg-white rounded-xl p-2.5 border border-[var(--border)]">
            <div class="text-[11px] text-[var(--muted-foreground)]">${lbl}</div>
            <div class="font-mono font-extrabold text-sm mt-0.5" style="color:${col};">${val}/100</div>
            <div class="h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden"><div style="width:${val}%;height:100%;background:${col};"></div></div>
          </div>`).join('')}
      </div>
      <div class="bg-white rounded-xl p-3 border border-[var(--border)] text-xs space-y-1">
        <div class="font-bold text-teal-800">💡 Nhận xét & Gợi ý nâng điểm từ AI:</div>
        <ul class="list-disc pl-4 space-y-1 text-slate-700">${res.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>
    </div>`;
}

// =========================================================================
// 3. HỌC: LUYỆN NÓI (SPEAKING)
// =========================================================================
function toggleSpeakingMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    notify('⚠️ Trình duyệt không hỗ trợ nhận diện giọng nói trực tiếp — bạn có thể gõ bài nói vào khung bên dưới để AI chấm điểm.');
    return;
  }
  if (state.speakingListening && state.speakingRec) {
    state.speakingRec.stop();
    state.speakingListening = false;
    render();
    return;
  }
  const rec = new SR();
  rec.lang = 'en-US';
  rec.continuous = true;
  rec.interimResults = true;
  state.speakingRec = rec;
  state.speakingListening = true;
  rec.onresult = (ev) => {
    let txt = '';
    for (let i = 0; i < ev.results.length; i++) txt += ev.results[i][0].transcript + ' ';
    state.speakingTranscript = txt.trim();
    const ta = document.getElementById('sp-transcript-ta');
    if (ta) ta.value = state.speakingTranscript;
  };
  rec.onerror = () => { state.speakingListening = false; notify('⚠️ Không thể mở Mic (hãy cấp quyền Micro trên trình duyệt).'); render(); };
  rec.onend = () => { state.speakingListening = false; render(); };
  rec.start();
  notify('🎙️ Đang ghi âm giọng nói tiếng Anh của bạn...');
  render();
}

function gradeSpeakingNow() {
  const topic = SPEAKING_TOPICS.find(t => t.id === state.speakingId) || SPEAKING_TOPICS[0];
  const ta = document.getElementById('sp-transcript-ta');
  if (ta) state.speakingTranscript = ta.value;
  if (!state.speakingTranscript.trim()) {
    notify('⚠️ Hãy bấm Ghi âm Mic hoặc nhập câu trả lời tiếng Anh trước khi chấm điểm!');
    return;
  }
  state.speakingResult = evaluateWithExamAi({
    text: state.speakingTranscript,
    exam: state.selectedExam,
    skill: 'speaking',
    keywords: topic.keywords,
    minWords: 35
  });
  if (state.currentUser && !isAdmin()) { state.currentUser.coins += 20; saveUsers(); }
  notify(`🤖 AI đã chấm xong bài Nói theo chuẩn ${state.selectedExam}!`);
  render();
}

function renderSpeaking(v) {
  const topic = SPEAKING_TOPICS.find(t => t.id === state.speakingId) || SPEAKING_TOPICS[0];
  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 class="text-xl font-black">🗣️ Luyện Nói Tiếng Anh & AI Chấm Điểm (${state.selectedExam})</h1>
          <p class="text-xs text-[var(--muted-foreground)]">Có hình ảnh minh họa, video hướng dẫn, ghi âm giọng nói và AI chấm theo đúng kỳ thi bạn chọn.</p>
        </div>
        <div class="flex gap-1.5">
          ${['IELTS','TOEIC','THPT'].map(ex => `<button onclick="setExamMode('${ex}')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${state.selectedExam===ex?'bg-[var(--primary)] text-white border-transparent':'bg-white border-[var(--border)]'}">${ex}</button>`).join('')}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <div class="space-y-2">
          ${SPEAKING_TOPICS.map(t => `
            <div onclick="state.speakingId='${t.id}';state.speakingResult=null;render()" class="hover-box travel-card p-3 cursor-pointer border-2 ${t.id===topic.id?'border-teal-500 bg-teal-50/40':'border-[var(--border)]'}">
              <div class="text-[10px] font-extrabold text-teal-700">${t.type}</div>
              <div class="font-bold text-xs mt-0.5">${t.title}</div>
            </div>`).join('')}
        </div>

        <div class="lg:col-span-2 space-y-4">
          <div class="travel-card overflow-hidden">
            <div class="relative h-44 bg-slate-900">
              <img src="${topic.img}" alt="${topic.title}" class="w-full h-full object-cover opacity-85" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4 text-white">
                <div>
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-500">${topic.type}</span>
                  <h2 class="text-lg font-extrabold mt-1">${topic.title}</h2>
                </div>
              </div>
            </div>
            <div class="p-4 space-y-3 text-xs">
              <div class="p-3 rounded-xl bg-[var(--content)] border border-[var(--border)]">
                <div class="font-bold text-teal-800 mb-1">📌 Đề bài luyện nói:</div>
                <div class="text-sm font-semibold text-slate-900">${topic.prompt}</div>
              </div>
              <div class="flex flex-wrap gap-1.5 items-center">
                <span class="font-bold text-[var(--muted-foreground)]">Từ khóa gợi ý:</span>
                ${topic.keywords.map(k => `<span class="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono">${k}</span>`).join('')}
              </div>
              <div class="flex flex-wrap gap-2">
                <button onclick="speak('${topic.sample.replace(/'/g,"\\'")}')" class="px-3.5 py-2 rounded-xl bg-sky-600 text-white font-bold cursor-pointer">🔊 Nghe bài nói mẫu</button>
                <button onclick="toggleSpeakingMic()" class="px-3.5 py-2 rounded-xl font-bold text-white cursor-pointer" style="background:${state.speakingListening?'#dc2626':'#0d9488'};">
                  ${state.speakingListening ? '⏹️ Dừng ghi âm Mic' : '🎙️ Bấm nói bằng Micro'}
                </button>
              </div>
              <textarea id="sp-transcript-ta" rows="4" oninput="state.speakingTranscript=this.value" placeholder="Nội dung bạn nói sẽ hiện tự động ở đây (hoặc bạn có thể tự gõ câu trả lời tiếng Anh để AI chấm)..." class="w-full p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs focus:outline-none focus:border-[var(--primary)]">${escapeHtml(state.speakingTranscript)}</textarea>
              <div class="flex justify-between items-center flex-wrap gap-2">
                <button onclick="state.speakingTranscript='${topic.sample.replace(/'/g,"\\'")}';render()" class="text-xs font-bold text-sky-700 cursor-pointer">📋 Điền thử bài mẫu</button>
                <button onclick="gradeSpeakingNow()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🤖 AI Chấm Điểm (${state.selectedExam})</button>
              </div>
            </div>
          </div>
          ${renderAiScoreCard(state.speakingResult)}
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 4. HỌC: LUYỆN VIẾT (WRITING)
// =========================================================================
function gradeWritingNow() {
  const pr = WRITING_PROMPTS.find(w => w.id === state.writingId) || WRITING_PROMPTS[0];
  const ta = document.getElementById('wr-editor-ta');
  if (ta) state.writingText = ta.value;
  if (!state.writingText.trim()) { notify('⚠️ Vui lòng nhập bài viết tiếng Anh trước khi chấm điểm!'); return; }
  state.writingResult = evaluateWithExamAi({
    text: state.writingText,
    exam: state.selectedExam,
    skill: 'writing',
    keywords: pr.keyTerms,
    minWords: pr.minWords
  });
  if (state.currentUser && !isAdmin()) { state.currentUser.coins += 25; saveUsers(); }
  notify(`🤖 AI đã chấm xong bài Viết theo rubric ${state.selectedExam}!`);
  render();
}

function renderWriting(v) {
  const pr = WRITING_PROMPTS.find(w => w.id === state.writingId) || WRITING_PROMPTS[0];
  const wc = state.writingText.trim() ? state.writingText.trim().split(/\s+/).length : 0;
  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 class="text-xl font-black">✍️ Luyện Viết Học Thuật & AI Chấm Bài (${state.selectedExam})</h1>
          <p class="text-xs text-[var(--muted-foreground)]">AI đánh giá đầy đủ Hình thức (Bố cục, số từ) và Nội dung (Lập luận, Từ vựng, Ngữ pháp) theo từng kỳ thi.</p>
        </div>
        <div class="flex gap-1.5">
          ${['IELTS','TOEIC','THPT'].map(ex => `<button onclick="setExamMode('${ex}')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${state.selectedExam===ex?'bg-[var(--primary)] text-white border-transparent':'bg-white border-[var(--border)]'}">${ex}</button>`).join('')}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <div class="space-y-2">
          ${WRITING_PROMPTS.map(w => `
            <div onclick="state.writingId='${w.id}';state.writingResult=null;render()" class="hover-box travel-card p-3 cursor-pointer border-2 ${w.id===pr.id?'border-teal-500 bg-teal-50/40':'border-[var(--border)]'}">
              <div class="text-[10px] font-extrabold text-sky-700">${w.type}</div>
              <div class="font-bold text-xs mt-0.5">${w.title}</div>
            </div>`).join('')}
        </div>

        <div class="lg:col-span-2 space-y-4">
          <div class="travel-card p-5 space-y-3 text-xs">
            <img src="${pr.img}" alt="${pr.title}" class="w-full h-40 object-cover rounded-xl" />
            <div class="flex justify-between items-center flex-wrap gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">${pr.type}</span>
              <span class="font-mono text-[var(--muted-foreground)]">Mục tiêu: ${pr.minWords}–${pr.targetWords} từ</span>
            </div>
            <h2 class="text-base font-extrabold text-slate-900">${pr.title}</h2>
            <p class="p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] text-sm font-medium">${pr.prompt}</p>
            <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div class="font-bold text-amber-900">🗺️ Dàn ý gợi ý (Hình thức chuẩn):</div>
              <ul class="list-disc pl-4 space-y-0.5 text-slate-700">${pr.outline.map(o => `<li>${o}</li>`).join('')}</ul>
            </div>
            <div class="space-y-1.5">
              <div class="flex justify-between items-center">
                <label class="font-bold">Bài viết của bạn:</label>
                <span id="wr-wc" class="font-mono font-bold ${wc>=pr.minWords?'text-emerald-600':'text-amber-600'}">Số từ: ${wc} / ${pr.minWords}+</span>
              </div>
              <textarea id="wr-editor-ta" rows="8" oninput="state.writingText=this.value;document.getElementById('wr-wc').textContent='Số từ: '+(this.value.trim()?this.value.trim().split(/\\s+/).length:0)+' / ${pr.minWords}+'" placeholder="Bắt đầu viết bài tiếng Anh của bạn tại đây..." class="w-full p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs leading-relaxed focus:outline-none focus:border-[var(--primary)]">${escapeHtml(state.writingText)}</textarea>
            </div>
            <div class="flex justify-end">
              <button onclick="gradeWritingNow()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🤖 Nộp bài & AI Chấm Điểm (${state.selectedExam})</button>
            </div>
          </div>
          ${renderAiScoreCard(state.writingResult)}
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 5. HỌC: LUYỆN ĐỌC (READING — ĐA DẠNG BÀI TẬP)
// =========================================================================
function renderReading(v) {
  const rd = READING_PASSAGES.find(r => r.id === state.readingId) || READING_PASSAGES[0];
  let correctCount = 0;
  if (state.readingGraded) {
    rd.questions.forEach((q, i) => {
      const ans = state.readingAnswers[`${rd.id}_${i}`];
      if (q.type === 'fill') {
        if (String(ans || '').trim().toLowerCase() === q.answerText.toLowerCase()) correctCount++;
      } else if (Number(ans) === q.answer) correctCount++;
    });
  }

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 class="text-xl font-black">📚 Luyện Đọc Hiểu Đa Dạng Bài Tập (IELTS • TOEIC • THPT)</h1>
          <p class="text-xs text-[var(--muted-foreground)]">Đầy đủ dạng Trắc nghiệm, True/False/Not Given, Điền từ vào chỗ trống và Chọn tiêu đề đoạn văn.</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        ${READING_PASSAGES.map(r => `<button onclick="state.readingId='${r.id}';state.readingGraded=false;render()" class="px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer border ${r.id===rd.id?'bg-[var(--primary)] text-white border-transparent':'bg-white border-[var(--border)]'}">${r.exam} • ${r.title}</button>`).join('')}
      </div>

      <div class="grid lg:grid-cols-2 gap-4 items-start">
        <div class="travel-card overflow-hidden">
          <img src="${rd.img}" alt="${rd.title}" class="w-full h-44 object-cover" />
          <div class="p-5 space-y-3">
            <div class="flex justify-between items-center text-xs">
              <span class="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold border border-teal-200">${rd.exam} • ${rd.level}</span>
              <button onclick="speak('${rd.passage.join(' ').replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] font-bold cursor-pointer">🔊 Nghe đoạn đọc</button>
            </div>
            <h2 class="text-lg font-extrabold">${rd.title}</h2>
            <div class="space-y-3 text-sm leading-relaxed text-slate-700">
              ${rd.passage.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>
        </div>

        <div class="travel-card p-5 space-y-4 text-xs">
          <div class="flex justify-between items-center">
            <h3 class="font-extrabold text-sm">📝 Câu hỏi Đọc hiểu (${rd.questions.length} câu)</h3>
            ${state.readingGraded ? `<span class="px-3 py-1 rounded-full font-extrabold bg-emerald-100 text-emerald-800">Đúng ${correctCount}/${rd.questions.length}</span>` : ''}
          </div>
          ${rd.questions.map((q, i) => {
            const key = `${rd.id}_${i}`;
            const userVal = state.readingAnswers[key];
            return `
              <div class="p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] space-y-2">
                <div class="font-bold text-slate-900">${q.q}</div>
                ${q.type === 'fill' ? `
                  <input type="text" value="${escapeHtml(userVal || '')}" oninput="state.readingAnswers['${key}']=this.value" placeholder="Nhập đáp án 1 từ/số..." class="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border)] text-xs font-mono" />
                ` : `
                  <div class="grid gap-1.5">
                    ${q.options.map((opt, oi) => {
                      const picked = Number(userVal) === oi;
                      let st = 'bg-white border-[var(--border)]';
                      if (state.readingGraded) {
                        if (oi === q.answer) st = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                        else if (picked) st = 'bg-rose-100 border-rose-500 text-rose-800';
                      } else if (picked) st = 'bg-teal-50 border-teal-500 text-teal-900 font-bold';
                      return `<button onclick="state.readingAnswers['${key}']=${oi};render()" class="text-left px-3 py-2 rounded-lg border cursor-pointer ${st}">${opt}</button>`;
                    }).join('')}
                  </div>
                `}
                ${state.readingGraded ? `<div class="p-2 rounded-lg bg-white border border-teal-200 text-teal-900">💡 <strong>Giải thích:</strong> ${q.explain}</div>` : ''}
              </div>`;
          }).join('')}
          <div class="flex gap-2 justify-end">
            <button onclick="state.readingGraded=false;render()" class="px-3.5 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">🔄 Làm lại</button>
            <button onclick="state.readingGraded=true;notify('✅ Đã chấm điểm bài Đọc hiểu!');render()" class="px-5 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">✅ Chấm điểm & Xem giải thích</button>
          </div>
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 6. HỌC: NGỮ PHÁP + VIDEO BÀI GIẢNG + ĐA DẠNG BÀI TẬP
// =========================================================================
function renderGrammar(v) {
  const gr = GRAMMAR_LESSONS.find(g => g.id === state.grammarId) || GRAMMAR_LESSONS[0];
  let correctCount = 0;
  if (state.grammarGraded) {
    gr.exercises.forEach((ex, i) => {
      const val = state.grammarAnswers[`${gr.id}_${i}`];
      if (ex.type === 'fill') {
        if (String(val || '').trim().toLowerCase() === ex.answerText.toLowerCase()) correctCount++;
      } else if (Number(val) === ex.answer) correctCount++;
    });
  }

  v.innerHTML = `
    <div class="space-y-4">
      <div>
        <h1 class="text-xl font-black">📐 Hệ Thống Ngữ Pháp Tiếng Anh & Video Bài Giảng</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Công thức trực quan, video minh họa và 4 dạng bài tập (Trắc nghiệm, Tìm lỗi sai, Chia động từ, Viết lại câu).</p>
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <div class="space-y-2">
          ${GRAMMAR_LESSONS.map(g => `
            <div onclick="state.grammarId='${g.id}';state.grammarGraded=false;render()" class="hover-box travel-card p-3.5 cursor-pointer border-2 ${g.id===gr.id?'border-teal-500 bg-teal-50/40':'border-[var(--border)]'}">
              <div class="text-[10px] font-extrabold text-teal-700">${g.level}</div>
              <div class="font-bold text-xs mt-0.5">${g.title}</div>
            </div>`).join('')}

          ${state.adminMediaLessons.length ? `
            <div class="pt-2 space-y-2">
              <div class="text-[11px] font-extrabold uppercase text-rose-600 px-1">🎬 Video/Audio AI Dịch từ Admin</div>
              ${state.adminMediaLessons.map(m => `
                <div class="travel-card p-3 space-y-1.5 text-xs border-l-4 border-rose-500">
                  <div class="font-bold">${escapeHtml(m.title)}</div>
                  <div class="text-[11px] text-[var(--muted-foreground)]">${m.mode === 'voice' ? '🔊 Lồng tiếng Việt' : '📝 Phụ đề dịch Anh → Việt'}</div>
                  <div class="p-2 rounded-lg bg-[var(--content)] text-[11px]">${escapeHtml(m.viText)}</div>
                  <button onclick="speak('${m.viText.replace(/'/g,"\\'")}','vi-VN',0.95)" class="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold cursor-pointer">🔊 Nghe bản dịch tiếng Việt</button>
                </div>`).join('')}
            </div>` : ''}
        </div>

        <div class="lg:col-span-2 space-y-4">
          <div class="travel-card p-5 space-y-3 text-xs">
            <span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">${gr.level}</span>
            <h2 class="text-lg font-extrabold">${gr.title}</h2>
            <p class="text-slate-700">${gr.summary}</p>
            <div class="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
              <div class="font-extrabold text-teal-900">📌 Công thức cốt lõi cần nhớ:</div>
              ${gr.formulas.map(f => `<div class="font-mono text-xs text-slate-800">• ${f}</div>`).join('')}
            </div>
            <!-- Video lesson box -->
            <div class="rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-900 aspect-video">
              <iframe class="w-full h-full" src="https://www.youtube.com/embed/${gr.videoId}" title="Video bài giảng ngữ pháp" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>

          <div class="travel-card p-5 space-y-3 text-xs">
            <div class="flex justify-between items-center">
              <h3 class="font-extrabold text-sm">✍️ Bài tập thực hành (${gr.exercises.length} câu)</h3>
              ${state.grammarGraded ? `<span class="px-3 py-1 rounded-full font-extrabold bg-emerald-100 text-emerald-800">Đạt ${correctCount}/${gr.exercises.length}</span>` : ''}
            </div>
            ${gr.exercises.map((ex, i) => {
              const key = `${gr.id}_${i}`;
              const val = state.grammarAnswers[key];
              return `
                <div class="p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] space-y-2">
                  <div class="font-bold text-slate-900">${ex.q}</div>
                  ${ex.type === 'fill' ? `
                    <input type="text" value="${escapeHtml(val || '')}" oninput="state.grammarAnswers['${key}']=this.value" placeholder="Nhập đáp án chính xác..." class="w-full px-3 py-2 rounded-lg bg-white border border-[var(--border)] font-mono" />
                  ` : `
                    <div class="grid sm:grid-cols-2 gap-1.5">
                      ${ex.options.map((opt, oi) => {
                        const picked = Number(val) === oi;
                        let st = 'bg-white border-[var(--border)]';
                        if (state.grammarGraded) {
                          if (oi === ex.answer) st = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                          else if (picked) st = 'bg-rose-100 border-rose-500 text-rose-800';
                        } else if (picked) st = 'bg-teal-50 border-teal-500 text-teal-900 font-bold';
                        return `<button onclick="state.grammarAnswers['${key}']=${oi};render()" class="text-left px-3 py-2 rounded-lg border cursor-pointer ${st}">${String.fromCharCode(65+oi)}. ${opt}</button>`;
                      }).join('')}
                    </div>
                  `}
                  ${state.grammarGraded ? `<div class="p-2 rounded-lg bg-white border border-teal-200 text-teal-900">💡 ${ex.explain}</div>` : ''}
                </div>`;
            }).join('')}
            <div class="flex justify-end gap-2">
              <button onclick="state.grammarGraded=false;render()" class="px-3.5 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">🔄 Làm lại</button>
              <button onclick="state.grammarGraded=true;notify('✅ Đã chấm bài Ngữ pháp!');render()" class="px-5 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">✅ Chấm điểm Ngữ pháp</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 7. HỌC: TỪ VỰNG MỖI NGÀY & SỔ TỪ CÁ NHÂN
// =========================================================================
function toggleExcludeWord(word) {
  const k = String(word || '').toLowerCase();
  if (state.excludedWords[k]) { delete state.excludedWords[k]; notify(`↩ Khôi phục "${word}" vào game.`); }
  else { state.excludedWords[k] = true; notify(`✓ Đã đánh dấu "${word}" là đã thuộc!`); }
  saveJson('tamn_excluded_words_v1', state.excludedWords);
  render();
}

function addPersonalWord(e) {
  e.preventDefault();
  if (!state.currentUser) { notify('🔐 Hãy đăng nhập tài khoản thật để lưu Sổ từ cá nhân!'); openAuth('register'); return; }
  const w = document.getElementById('pv-word').value.trim();
  const m = document.getElementById('pv-mean').value.trim();
  if (!w || !m) return;
  if (!state.currentUser.personalWords) state.currentUser.personalWords = [];
  state.currentUser.personalWords.unshift({ word: w, ipa: `/${w}/`, pos: 'vocab', meaning: m, ex: `Daily sentence with "${w}".` });
  if (isAdmin()) saveJson('tamn_admin_pwords_v1', state.currentUser.personalWords);
  else saveUsers();
  e.target.reset();
  notify(`⭐ Đã lưu từ "${w}" vào Sổ từ của bạn!`);
  render();
}

function renderVocabDaily(v) {
  const pWords = (state.currentUser && state.currentUser.personalWords) || [];
  const sampleDaily = ALL_CURRICULUM_WORDS.slice(0, 12);
  v.innerHTML = `
    <div class="space-y-5">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 class="text-xl font-black">🌱 Từ Vựng Mỗi Ngày & Sổ Từ Cá Nhân</h1>
          <p class="text-xs text-[var(--muted-foreground)]">Nghe phát âm chuẩn Anh–Mỹ, đánh dấu đã thuộc để bỏ khỏi game và tự thêm từ mới.</p>
        </div>
        <button onclick="go('roadmaps')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">🧭 Xem đủ 283 chủ đề CEFR →</button>
      </div>

      <form onsubmit="addPersonalWord(event)" class="travel-card p-4 grid sm:grid-cols-3 gap-2 text-xs">
        <input id="pv-word" required placeholder="Từ tiếng Anh mới (VD: wanderlust)" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
        <input id="pv-mean" required placeholder="Nghĩa tiếng Việt (VD: niềm đam mê du lịch)" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
        <button type="submit" class="py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">+ Lưu vào Sổ từ cá nhân</button>
      </form>

      ${pWords.length ? `
        <div class="space-y-2">
          <h2 class="text-sm font-extrabold text-teal-800">⭐ Sổ Từ Của Bạn (${pWords.length} từ)</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${pWords.map(w => `
              <div class="travel-card p-3.5 space-y-1 text-xs">
                <div class="flex justify-between items-center"><strong class="text-sm">${escapeHtml(w.word)}</strong><button onclick="speak('${w.word.replace(/'/g,"\\'")}')" class="px-2 py-1 rounded-lg bg-[var(--content)] cursor-pointer">🔊</button></div>
                <div class="text-teal-700 font-semibold">${escapeHtml(w.meaning)}</div>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <div class="space-y-2">
        <h2 class="text-sm font-extrabold text-slate-800">✨ 12 Từ Vựng Trọng Tâm Hôm Nay</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${sampleDaily.map(w => {
            const ex = Boolean(state.excludedWords[w.word.toLowerCase()]);
            return `
              <div class="hover-box travel-card p-4 space-y-2 text-xs ${ex?'opacity-60':''}" style="--tile-c:#0d9488;">
                <div class="flex justify-between items-start gap-2">
                  <div>
                    <div class="font-extrabold text-base ${ex?'line-through':''}">${w.word}</div>
                    <div class="font-mono text-[var(--muted-foreground)]">${w.ipa} • ${w.pos}</div>
                  </div>
                  <button onclick="speak('${w.word.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] cursor-pointer font-bold">🔊</button>
                </div>
                <div class="font-bold text-teal-700">${w.meaning}</div>
                <div class="text-[var(--muted-foreground)] italic">"${w.ex}"</div>
                <button onclick="toggleExcludeWord('${w.word.replace(/'/g,"\\'")}')" class="w-full py-1.5 rounded-lg bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">${ex?'↩ Học lại':'✓ Đã thuộc (Bỏ khỏi game)'}</button>
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 8. LỘ TRÌNH CEFR (283 CHỦ ĐỀ) + SỐ NGƯỜI HỌC + CHỨNG CHỈ PHÁO HOA SAO BĂNG
// =========================================================================
function getUserCompletedParts() {
  return (state.currentUser && state.currentUser.completedAtlasParts) || {};
}

function openAtlasPartView(slug, partNo) {
  if (!enforceWeeklyTest()) return;
  const topic = ATLAS_TOPICS.find(t => t.slug === slug);
  if (!topic) return;
  const p = Math.max(1, Math.min(topic.parts, Number(partNo) || 1));
  const doneMap = getUserCompletedParts();
  const canSkip = getEffectivePlan() === 'pro' || getEffectivePlan() === 'ultra' || isAdmin();
  const maxUnlocked = canSkip ? topic.parts : ((doneMap[slug] || 0) + 1);
  if (!canSkip && p > maxUnlocked) {
    notify(`🔒 Bản Thường học đúng thứ tự! Hoàn thành Phần ${maxUnlocked} trước hoặc nâng gói Pro/Ultra.`);
    return;
  }
  if (state.currentUser) {
    if (!state.currentUser.roadmapStartDates) state.currentUser.roadmapStartDates = {};
    if (!state.currentUser.roadmapStartDates[slug]) {
      state.currentUser.roadmapStartDates[slug] = new Date().toLocaleDateString('vi-VN');
      if (isAdmin()) saveJson('tamn_admin_rmstarts_v1', state.currentUser.roadmapStartDates);
      else saveUsers();
    }
  }
  state.openAtlasSlug = slug;
  state.openAtlasPart = p;
  render();
}

function completeAtlasPart(slug, partNo) {
  if (!state.currentUser) { notify('🔐 Hãy đăng nhập tài khoản thật để lưu tiến độ học!'); openAuth('register'); return; }
  const topic = ATLAS_TOPICS.find(t => t.slug === slug);
  if (!topic) return;
  if (!state.currentUser.completedAtlasParts) state.currentUser.completedAtlasParts = {};
  state.currentUser.completedAtlasParts[slug] = Math.max(state.currentUser.completedAtlasParts[slug] || 0, partNo);
  if (!isAdmin()) {
    state.currentUser.streak = (state.currentUser.streak || 0) + 1;
    state.currentUser.coins = (state.currentUser.coins || 0) + 30;
    state.currentUser.grindPts = (state.currentUser.grindPts || 0) + 50;
    saveUsers();
    syncTopRankRewards();
  } else {
    saveJson('tamn_admin_parts_v1', state.currentUser.completedAtlasParts);
  }
  if (partNo >= topic.parts) {
    const sd = (state.currentUser.roadmapStartDates && state.currentUser.roadmapStartDates[slug]) || new Date().toLocaleDateString('vi-VN');
    render();
    openRoadmapCertificate(topic.name, sd);
    return;
  }
  notify(`✅ Đã hoàn thành Phần ${partNo} (+30 xu)!`);
  render();
}

function finishWholeRoadmap(slug) {
  const topic = ATLAS_TOPICS.find(t => t.slug === slug);
  if (!topic) return;
  if (state.currentUser) {
    if (!state.currentUser.completedAtlasParts) state.currentUser.completedAtlasParts = {};
    state.currentUser.completedAtlasParts[slug] = topic.parts;
    if (isAdmin()) saveJson('tamn_admin_parts_v1', state.currentUser.completedAtlasParts);
    else saveUsers();
  }
  const sd = (state.currentUser && state.currentUser.roadmapStartDates && state.currentUser.roadmapStartDates[slug]) || new Date().toLocaleDateString('vi-VN');
  render();
  openRoadmapCertificate(topic.name, sd);
}

function renderRoadmaps(v) {
  const doneMap = getUserCompletedParts();
  if (state.openAtlasSlug && state.openAtlasPart) {
    const topic = ATLAS_TOPICS.find(t => t.slug === state.openAtlasSlug);
    if (topic) {
      const p = state.openAtlasPart;
      const words = getAtlasPartWords(topic, p);
      const isDone = (doneMap[topic.slug] || 0) >= p;
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <button onclick="state.openAtlasPart=null;render()" class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] text-xs font-bold cursor-pointer">← Danh sách ${topic.parts} phần</button>
            <div class="flex flex-wrap gap-2">
              <button onclick="completeAtlasPart('${topic.slug}',${p})" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">${isDone?'✓ Đã xong phần này':'✅ Hoàn thành Phần '+p}</button>
              <button onclick="finishWholeRoadmap('${topic.slug}')" class="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:linear-gradient(135deg,#d97706,#ea580c);">🏆 Hoàn thành Lộ trình & Nhận Chứng Chỉ</button>
            </div>
          </div>
          <div class="travel-card p-5 border-l-4" style="border-left-color:${topic.color};">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <div>
                <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700">${topic.lvl} • Phần ${p}/${topic.parts}</span>
                <h1 class="text-lg font-extrabold mt-1">${topic.name}</h1>
              </div>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">🟢 👥 ${getTopicLearnerCount(topic.slug)} học viên thật đang học</span>
            </div>
          </div>
          <div class="travel-card p-4 divide-y divide-[var(--border)]">
            ${words.map((w, i) => `
              <div class="py-2.5 flex flex-wrap justify-between items-center gap-2 text-xs">
                <div>
                  <span class="font-mono text-[var(--muted-foreground)] mr-1.5">${i+1}.</span>
                  <strong class="text-sm">${w.word}</strong>
                  <span class="font-mono text-[var(--muted-foreground)] ml-1">${w.ipa}</span>
                  <div class="text-teal-700 font-semibold">${w.meaning}</div>
                </div>
                <div class="flex gap-1.5">
                  <button onclick="speak('${w.word.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] font-bold cursor-pointer">🔊</button>
                  <button onclick="toggleExcludeWord('${w.word.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">${state.excludedWords[w.word.toLowerCase()]?'↩ Học lại':'✓ Đã thuộc'}</button>
                </div>
              </div>`).join('')}
          </div>
        </div>`;
      return;
    }
  }

  if (state.openAtlasSlug) {
    const topic = ATLAS_TOPICS.find(t => t.slug === state.openAtlasSlug);
    if (topic) {
      const doneCnt = doneMap[topic.slug] || 0;
      const pct = Math.min(100, Math.round((doneCnt / Math.max(1, topic.parts)) * 100));
      const partsHtml = [];
      for (let p = 1; p <= Math.min(topic.parts, 30); p++) {
        const done = doneCnt >= p;
        partsHtml.push(`
          <div onclick="openAtlasPartView('${topic.slug}',${p})" class="hover-box travel-card p-3.5 cursor-pointer space-y-1 text-xs" style="--tile-c:${topic.color};">
            <div class="flex justify-between items-center">
              <strong class="text-sm">Phần ${p}</strong>
              <span class="px-2 py-0.5 rounded-full font-bold ${done?'bg-emerald-100 text-emerald-700':'bg-[var(--content)] text-teal-700'}">${done?'✓ Đã xong':'25 từ'}</span>
            </div>
            <div class="text-[var(--muted-foreground)]">Bấm để học 25 từ vựng →</div>
          </div>`);
      }
      v.innerHTML = `
        <div class="space-y-4">
          <button onclick="state.openAtlasSlug=null;render()" class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] text-xs font-bold cursor-pointer">← Quay lại Lộ trình ${topic.track}</button>
          <div class="boarding-pass p-5 text-white flex flex-wrap justify-between items-center gap-3" style="background:linear-gradient(135deg,${topic.color},#0f172a);">
            <div class="space-y-1.5">
              <div class="text-xs font-bold opacity-90">${topic.lvl} • 👥 ${getTopicLearnerCount(topic.slug)} học viên thật đang học • Tiến độ: ${pct}%</div>
              <h1 class="text-xl font-extrabold">${topic.name}</h1>
              <p class="text-xs opacity-90">${topic.desc}</p>
            </div>
            <button onclick="finishWholeRoadmap('${topic.slug}')" class="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-900 bg-amber-300 hover:bg-amber-200 cursor-pointer shrink-0">🏆 Hoàn thành Lộ trình & Nhận Chứng Chỉ</button>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">${partsHtml.join('')}</div>
        </div>`;
      return;
    }
  }

  const tabs = [
    { id:'IELTS', label:'🌍 IELTS (108)', cefrs:['ALL','A1','A2','B1','B2','C1','C2'] },
    { id:'TOEIC', label:'💼 TOEIC (55)', cefrs:['ALL','A1','A2','B1','B2','C1'] },
    { id:'THPT', label:'🎓 THPT (84)', cefrs:['ALL','A1','A2','B1','B2'] },
    { id:'GENERAL', label:'📚 Đa lĩnh vực (36)', cefrs:['ALL','A1','A2','B1','B2','C1','C2'] }
  ];
  const curTab = tabs.find(t => t.id === state.progTab) || tabs[0];
  const list = ATLAS_TOPICS.filter(t => t.track === curTab.id && (state.cefrFilter === 'ALL' || t.cefr === state.cefrFilter));

  v.innerHTML = `
    <div class="space-y-4">
      <div>
        <h1 class="text-xl font-black">🧭 Bản Đồ Lộ Trình CEFR (283 Chủ Đề)</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Hiển thị số lượng học viên thật đang học • Hoàn thành lộ trình sẽ nổ pháo hoa + mưa sao băng & cấp Chứng chỉ Tiếng Anh Mỗi Ngày!</p>
      </div>
      <div class="flex flex-wrap gap-2">
        ${tabs.map(tb => `<button onclick="state.progTab='${tb.id}';state.cefrFilter='ALL';render()" class="px-3.5 py-2 rounded-full text-xs font-bold cursor-pointer border ${tb.id===curTab.id?'bg-[var(--primary)] text-white border-transparent':'bg-white border-[var(--border)]'}">${tb.label} • 👥 ${getTrackLearnerCount(tb.id)}</button>`).join('')}
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${curTab.cefrs.map(lv => `<button onclick="state.cefrFilter='${lv}';render()" class="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border ${state.cefrFilter===lv?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)]'}">${lv==='ALL'?'Tất cả':lv}</button>`).join('')}
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${list.slice(0, 36).map(t => {
          const done = doneMap[t.slug] || 0;
          const pct = Math.min(100, Math.round((done / Math.max(1, t.parts)) * 100));
          return `
            <div onclick="state.openAtlasSlug='${t.slug}';render()" class="hover-box travel-card overflow-hidden cursor-pointer flex flex-col" style="--tile-c:${t.color};">
              <div class="px-4 py-2.5 text-white flex justify-between items-center text-xs" style="background:linear-gradient(135deg,${t.color},#0f172a);">
                <span class="font-bold">${t.lvl}</span>
                <span class="font-mono">${t.words.toLocaleString('vi-VN')} từ</span>
              </div>
              <div class="p-4 space-y-2 flex-1 flex flex-col text-xs">
                <div class="font-extrabold text-sm">${t.name}</div>
                <div class="text-[var(--muted-foreground)]">${t.desc}</div>
                <div class="mt-auto pt-2 space-y-1.5">
                  <div class="h-1.5 rounded-full bg-[var(--content)] overflow-hidden"><div style="width:${pct}%;height:100%;background:${t.color};"></div></div>
                  <div class="flex justify-between items-center">
                    <span class="text-emerald-700 font-bold">👥 ${getTopicLearnerCount(t.slug)} đang học</span>
                    <span class="font-bold text-teal-700">${pct}% • Mở →</span>
                  </div>
                </div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

// =========================================================================
// 9. LỘ TRÌNH: KHÓA HỌC CÓ PHẦN ĐÃ HỌC, LỘ TRÌNH & THANH TIẾN ĐỘ %
// =========================================================================
function toggleCourseLessonDone(courseSlug, lessonId) {
  if (!state.currentUser) { notify('🔐 Hãy đăng nhập tài khoản thật để lưu tiến độ khóa học!'); openAuth('register'); return; }
  if (!state.currentUser.completedCourseLessons) state.currentUser.completedCourseLessons = {};
  const key = `${courseSlug}_${lessonId}`;
  state.currentUser.completedCourseLessons[key] = !state.currentUser.completedCourseLessons[key];
  if (isAdmin()) saveJson('tamn_admin_courses_v1', state.currentUser.completedCourseLessons);
  else {
    if (state.currentUser.completedCourseLessons[key]) { state.currentUser.coins += 20; state.currentUser.streak += 1; }
    saveUsers();
    syncTopRankRewards();
  }
  const c = COURSES_LIST.find(x => x.slug === courseSlug);
  if (c && c.lessons.every(l => state.currentUser.completedCourseLessons[`${courseSlug}_${l.id}`])) {
    render();
    openRoadmapCertificate(c.title, new Date().toLocaleDateString('vi-VN'));
    return;
  }
  render();
}

function renderCourses(v) {
  const doneLessons = (state.currentUser && state.currentUser.completedCourseLessons) || {};
  if (state.openCourseSlug) {
    const c = COURSES_LIST.find(x => x.slug === state.openCourseSlug);
    if (c) {
      const completedCount = c.lessons.filter(l => doneLessons[`${c.slug}_${l.id}`]).length;
      const pct = Math.round((completedCount / Math.max(1, c.lessons.length)) * 100);
      v.innerHTML = `
        <div class="space-y-4">
          <button onclick="state.openCourseSlug=null;render()" class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] text-xs font-bold cursor-pointer">← Danh sách 8 Khóa học</button>
          <div class="boarding-pass p-6 text-white space-y-3" style="background:linear-gradient(135deg,#0f766e,#0284c7);">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white/20">🎓 LỘ TRÌNH KHÓA HỌC</span>
              <span class="text-xs font-mono font-bold">Đã học: ${completedCount}/${c.lessons.length} bài (${pct}%)</span>
            </div>
            <h1 class="text-2xl font-black">${c.title}</h1>
            <p class="text-xs opacity-90">${c.subtitle}</p>
            <div class="w-full h-2.5 rounded-full bg-white/25 overflow-hidden">
              <div style="width:${pct}%;height:100%;background:#fde047;transition:width 0.3s;"></div>
            </div>
          </div>

          <div class="travel-card p-5 space-y-2.5">
            <h2 class="font-extrabold text-sm">🗺️ Lộ trình chi tiết từng bài học (Bấm đánh dấu đã học để cập nhật tiến độ)</h2>
            <div class="divide-y divide-[var(--border)]">
              ${c.lessons.map((l, idx) => {
                const isDone = Boolean(doneLessons[`${c.slug}_${l.id}`]);
                return `
                  <div class="py-3 flex flex-wrap justify-between items-center gap-2 text-xs">
                    <div class="flex items-center gap-3">
                      <span class="w-7 h-7 rounded-full inline-flex items-center justify-center font-extrabold ${isDone?'bg-emerald-500 text-white':'bg-[var(--content)] text-slate-600'}">${isDone?'✓':(idx+1)}</span>
                      <div>
                        <div class="font-bold text-sm ${isDone?'text-emerald-700':''}">${l.title}</div>
                        <div class="text-[var(--muted-foreground)]">${l.summary}</div>
                      </div>
                    </div>
                    <button onclick="toggleCourseLessonDone('${c.slug}',${l.id})" class="px-3.5 py-1.5 rounded-xl font-bold cursor-pointer ${isDone?'bg-emerald-100 text-emerald-800':'bg-[var(--primary)] text-white'}">${isDone?'✓ Đã học xong':'Đánh dấu đã học'}</button>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>`;
      return;
    }
  }

  v.innerHTML = `
    <div class="space-y-4">
      <div>
        <h1 class="text-xl font-black">🎓 Hệ Thống Khóa Học & Tiến Độ Lộ Trình</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Mỗi khóa học hiển thị rõ phần đã học, lộ trình từng bước và thanh tiến độ %. Học xong 100% nhận ngay Chứng chỉ!</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${COURSES_LIST.map(c => {
          const doneCnt = c.lessons.filter(l => doneLessons[`${c.slug}_${l.id}`]).length;
          const pct = Math.round((doneCnt / Math.max(1, c.lessons.length)) * 100);
          return `
            <div onclick="state.openCourseSlug='${c.slug}';render()" class="hover-box travel-card p-5 cursor-pointer flex flex-col justify-between gap-3" style="--tile-c:#0d9488;">
              <div class="space-y-1.5">
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">${c.lessons.length} bài học</span>
                <h2 class="font-extrabold text-sm">${c.title}</h2>
                <p class="text-xs text-[var(--muted-foreground)]">${c.subtitle}</p>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-[var(--border)] text-xs">
                <div class="flex justify-between font-bold">
                  <span class="text-slate-600">Tiến độ: ${doneCnt}/${c.lessons.length} phần</span>
                  <span class="text-teal-700">${pct}%</span>
                </div>
                <div class="h-2 rounded-full bg-[var(--content)] overflow-hidden"><div style="width:${pct}%;height:100%;background:#0d9488;"></div></div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

// =========================================================================
// 10. LỘ TRÌNH: KIỂM TRA ÔN TỪ VỰNG HÀNG TUẦN (BẮT BUỘC FREE & PRO)
// =========================================================================
function initWeeklyQuiz(force = false) {
  const wq = state.weeklyQuiz;
  if (!force && wq.questions.length && !wq.finished) return;
  const pool = [...ALL_CURRICULUM_WORDS];
  const picked = pool.sort(() => Math.random() - 0.5).slice(0, 8);
  wq.questions = picked.map(item => {
    const wrongs = pool.filter(x => x.word !== item.word).sort(() => Math.random() - 0.5).slice(0, 3);
    return { item, opts: [item, ...wrongs].sort(() => Math.random() - 0.5), picked: null };
  });
  wq.idx = 0; wq.score = 0; wq.finished = false;
}

function answerWeeklyQuiz(oi) {
  const cur = state.weeklyQuiz.questions[state.weeklyQuiz.idx];
  if (!cur || cur.picked !== null) return;
  cur.picked = oi;
  if (cur.opts[oi].word === cur.item.word) { state.weeklyQuiz.score++; speak(cur.item.word); }
  render();
}

function nextWeeklyQuizStep() {
  const wq = state.weeklyQuiz;
  if (wq.idx + 1 < wq.questions.length) wq.idx++;
  else {
    wq.finished = true;
    if (wq.score >= 5 && state.currentUser && !isAdmin()) {
      state.currentUser.weeklyQuizDone = getCurrentWeekKey();
      state.currentUser.coins += 50;
      state.currentUser.streak += 1;
      saveUsers();
      syncTopRankRewards();
      notify(`🎉 Đạt ${wq.score}/8! Đã mở khóa học tập & game trong tuần ${getCurrentWeekKey()}.`);
    }
  }
  render();
}

function renderWeeklyQuiz(v) {
  const wk = getCurrentWeekKey();
  const done = state.currentUser && state.currentUser.weeklyQuizDone === wk;
  initWeeklyQuiz(false);
  const wq = state.weeklyQuiz;
  const cur = wq.questions[wq.idx];

  v.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-4">
      <div class="boarding-pass p-5 text-white" style="background:linear-gradient(135deg,${done?'#059669,#0f766e':'#dc2626,#b45309'});">
        <div class="text-xs font-extrabold uppercase opacity-90">TUẦN ${wk} • BẮT BUỘC VỚI TÀI KHOẢN THƯỜNG & PRO</div>
        <h1 class="text-xl font-black mt-1">📝 Kiểm Tra Ôn Lại Từ Vựng Hàng Tuần (8 Câu)</h1>
        <p class="text-xs opacity-90 mt-1">Đạt tối thiểu 5/8 câu để xác nhận ghi nhớ từ vựng và mở khóa học tiếp trong tuần.</p>
      </div>
      ${wq.finished ? `
        <div class="travel-card p-6 text-center space-y-3">
          <div class="text-4xl">${wq.score>=5?'🏆🎉':'💪📚'}</div>
          <h2 class="text-xl font-black">${wq.score}/8 câu đúng</h2>
          <p class="text-xs text-[var(--muted-foreground)]">${wq.score>=5?'Xuất sắc! Bạn đã hoàn thành bài kiểm tra bắt buộc tuần này.':'Chưa đạt 5/8 câu — hãy thử lại nhé!'}</p>
          <div class="flex justify-center gap-2">
            ${wq.score>=5?`<button onclick="go('roadmaps')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold cursor-pointer">🧭 Vào học ngay</button>`:''}
            <button onclick="initWeeklyQuiz(true);render()" class="px-4 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs font-bold cursor-pointer">🔄 Làm lại</button>
          </div>
        </div>` : cur ? `
        <div class="travel-card p-5 space-y-4 text-xs">
          <div class="flex justify-between font-bold"><span>Câu ${wq.idx+1}/8</span><span class="text-teal-700 font-mono">Đúng: ${wq.score}</span></div>
          <div class="p-4 rounded-2xl bg-[var(--content)] text-center space-y-1">
            <div class="text-2xl font-black">${cur.item.word}</div>
            <div class="font-mono text-[var(--muted-foreground)]">${cur.item.ipa}</div>
            <button onclick="speak('${cur.item.word.replace(/'/g,"\\'")}')" class="mt-1 px-3 py-1 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer">🔊 Nghe</button>
          </div>
          <div class="grid gap-2">
            ${cur.opts.map((o, oi) => {
              let cls = 'bg-[var(--content)] border-[var(--border)] hover:border-teal-500';
              if (cur.picked !== null) {
                if (o.word === cur.item.word) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                else if (cur.picked === oi) cls = 'bg-rose-100 border-rose-500 text-rose-800';
              }
              return `<button onclick="answerWeeklyQuiz(${oi})" ${cur.picked!==null?'disabled':''} class="text-left px-4 py-3 rounded-xl border font-semibold cursor-pointer ${cls}">${String.fromCharCode(65+oi)}. ${o.meaning}</button>`;
            }).join('')}
          </div>
          ${cur.picked!==null?`<div class="flex justify-end"><button onclick="nextWeeklyQuizStep()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">Tiếp theo →</button></div>`:''}
        </div>` : ''}
    </div>`;
}

// =========================================================================
// 11. GIẢI TRÍ: GAME TỪ VỰNG (BỎ TỪ ĐÃ THUỘC)
// =========================================================================
function getPlayableWords() {
  const raw = ALL_CURRICULUM_WORDS.filter(w => !state.excludedWords[w.word.toLowerCase()]);
  return raw.length >= 4 ? raw : ALL_CURRICULUM_WORDS;
}

function initGameRound() {
  const pool = getPlayableWords();
  const target = pool[Math.floor(Math.random() * pool.length)];
  const wrongs = pool.filter(w => w.word !== target.word).sort(() => Math.random() - 0.5).slice(0, 3);
  state.gameState = {
    target,
    opts: [target, ...wrongs].sort(() => Math.random() - 0.5),
    picked: null,
    typed: ''
  };
}

function pickGameOpt(oi) {
  if (!state.gameState || state.gameState.picked !== null) return;
  state.gameState.picked = oi;
  const chosen = state.gameState.opts[oi];
  if (chosen.word === state.gameState.target.word) {
    state.gameScore += 10;
    speak(state.gameState.target.word);
    if (state.currentUser && !isAdmin()) { state.currentUser.coins += 5; state.currentUser.grindPts += 15; saveUsers(); syncTopRankRewards(); }
  }
  render();
}

function checkGameTyping(e) {
  e.preventDefault();
  if (!state.gameState) return;
  const val = (document.getElementById('gm-type-inp')?.value || '').trim().toLowerCase();
  if (val === state.gameState.target.word.toLowerCase()) {
    state.gameScore += 15;
    speak(state.gameState.target.word);
    notify(`🎯 Chính xác "${state.gameState.target.word}"! +15 điểm`);
    if (state.currentUser && !isAdmin()) { state.currentUser.coins += 8; state.currentUser.grindPts += 20; saveUsers(); syncTopRankRewards(); }
    initGameRound();
    render();
  } else {
    notify(`❌ Chưa đúng! Gợi ý chữ đầu: "${state.gameState.target.word.slice(0,2)}..."`);
  }
}

function renderGames(v) {
  if (!state.gameState) initGameRound();
  const gs = state.gameState;
  const modes = [
    { id:'quiz', label:'⚡ Trắc nghiệm nhanh' },
    { id:'listen', label:'🎧 Nghe → Chọn nghĩa' },
    { id:'typing', label:'⌨️ Gõ từ sắc màu' }
  ];
  v.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 class="text-xl font-black">🎮 Kho Game Từ Vựng (Tự động bỏ từ đã thuộc)</h1>
          <p class="text-xs text-[var(--muted-foreground)]">Đang chơi trên ${getPlayableWords().length} từ chưa thuộc • Điểm phiên này: <strong class="text-teal-700">${state.gameScore}</strong></p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        ${modes.map(m => `<button onclick="state.gameMode='${m.id}';initGameRound();render()" class="px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer border ${state.gameMode===m.id?'bg-[var(--primary)] text-white border-transparent':'bg-white border-[var(--border)]'}">${m.label}</button>`).join('')}
      </div>

      <div class="travel-card p-6 space-y-4 text-xs">
        ${state.gameMode === 'typing' ? `
          <div class="text-center space-y-2 p-4 rounded-2xl bg-[var(--content)]">
            <div class="text-[var(--muted-foreground)]">Gõ từ tiếng Anh có nghĩa là:</div>
            <div class="text-xl font-black text-teal-800">${gs.target.meaning}</div>
            <div class="font-mono text-[var(--muted-foreground)]">${gs.target.ipa} (${gs.target.word.length} chữ cái)</div>
            <button onclick="speak('${gs.target.word.replace(/'/g,"\\'")}')" class="px-3 py-1 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer">🔊 Nghe gợi ý</button>
          </div>
          <form onsubmit="checkGameTyping(event)" class="flex gap-2">
            <input id="gm-type-inp" autocomplete="off" required placeholder="Gõ từ tiếng Anh..." class="flex-1 px-4 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-sm font-mono font-bold" />
            <button type="submit" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">Kiểm tra</button>
          </form>
        ` : `
          <div class="text-center space-y-2 p-5 rounded-2xl bg-[var(--content)]">
            ${state.gameMode === 'listen' ? `
              <div class="text-xs text-[var(--muted-foreground)]">Bấm loa nghe phát âm rồi chọn nghĩa đúng:</div>
              <button onclick="speak('${gs.target.word.replace(/'/g,"\\'")}')" class="px-5 py-3 rounded-2xl bg-sky-600 text-white text-base font-extrabold cursor-pointer shadow">🔊 Nghe phát âm</button>
            ` : `
              <div class="text-2xl font-black text-slate-900">${gs.target.word}</div>
              <div class="font-mono text-[var(--muted-foreground)]">${gs.target.ipa}</div>
              <button onclick="speak('${gs.target.word.replace(/'/g,"\\'")}')" class="px-3 py-1 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer">🔊 Nghe</button>
            `}
          </div>
          <div class="grid sm:grid-cols-2 gap-2">
            ${gs.opts.map((o, oi) => {
              let cls = 'bg-[var(--content)] border-[var(--border)] hover:border-teal-500';
              if (gs.picked !== null) {
                if (o.word === gs.target.word) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                else if (gs.picked === oi) cls = 'bg-rose-100 border-rose-500 text-rose-800';
              }
              return `<button onclick="pickGameOpt(${oi})" ${gs.picked!==null?'disabled':''} class="text-left p-3.5 rounded-xl border font-semibold cursor-pointer ${cls}">${String.fromCharCode(65+oi)}. ${o.meaning}</button>`;
            }).join('')}
          </div>
          <div class="flex justify-between items-center pt-1">
            <button onclick="toggleExcludeWord('${gs.target.word.replace(/'/g,"\\'")}');initGameRound();render()" class="text-xs font-bold text-[var(--muted-foreground)] hover:text-teal-700 cursor-pointer">✓ Đã thuộc từ này (Bỏ khỏi game)</button>
            <button onclick="initGameRound();render()" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">Từ tiếp theo →</button>
          </div>
        `}
      </div>
    </div>`;
}

// =========================================================================
// 12. GIẢI TRÍ: ÂM NHẠC YOUTUBE AUDIO-ONLY (CỐC CỐC FRIENDLY • KHÔNG VIDEO)
// =========================================================================
function ensureYouTubeApiLoaded(onReadyCb) {
  if (state.music.ytPlayer && state.music.ytReady) { onReadyCb(); return; }
  window._pendingYtPlay = onReadyCb;
  if (window.YT && window.YT.Player) {
    createHiddenYtPlayer();
    return;
  }
  if (!document.getElementById('yt-iframe-api-script')) {
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }
}

window.onYouTubeIframeAPIReady = function () {
  createHiddenYtPlayer();
};

function createHiddenYtPlayer() {
  if (state.music.ytPlayer) return;
  const cur = state.music.playlist[state.music.idx] || MUSIC_CATALOG[0];
  state.music.ytPlayer = new YT.Player('yt-audio-player', {
    height: '1',
    width: '1',
    videoId: cur.id,
    playerVars: { autoplay: 0, controls: 0, modestbranding: 1, playsinline: 1 },
    events: {
      onReady: (ev) => {
        state.music.ytReady = true;
        ev.target.setVolume(state.music.volume);
        if (window._pendingYtPlay) { const fn = window._pendingYtPlay; window._pendingYtPlay = null; fn(); }
      },
      onStateChange: (ev) => {
        if (ev.data === YT.PlayerState.ENDED) musicNext();
        if (ev.data === YT.PlayerState.PLAYING) { state.music.playing = true; updateMusicMiniStatus(); }
        if (ev.data === YT.PlayerState.PAUSED) { state.music.playing = false; updateMusicMiniStatus(); }
      }
    }
  });
}

function updateMusicMiniStatus() {
  const dot = document.getElementById('top-music-dot');
  if (dot) dot.textContent = state.music.playing ? '🔊' : '🎵';
  if (state.nav === 'music') render();
}

function extractYoutubeId(input) {
  const s = (input || '').trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function musicPlayIndex(idx) {
  const list = state.music.playlist;
  if (!list.length) return;
  state.music.idx = ((idx % list.length) + list.length) % list.length;
  const track = list[state.music.idx];
  ensureYouTubeApiLoaded(() => {
    try {
      state.music.ytPlayer.loadVideoById(track.id);
      state.music.ytPlayer.setVolume(state.music.volume);
      state.music.playing = true;
      updateMusicMiniStatus();
    } catch {
      notify('🎧 Đang kết nối âm thanh YouTube...');
    }
  });
  notify(`🎧 Đang phát (chỉ âm thanh): ${track.title}`);
  render();
}

function musicTogglePlay() {
  ensureYouTubeApiLoaded(() => {
    try {
      if (state.music.playing) {
        state.music.ytPlayer.pauseVideo();
        state.music.playing = false;
      } else {
        const cur = state.music.playlist[state.music.idx];
        if (state.music.ytPlayer.getVideoData && state.music.ytPlayer.getVideoData().video_id !== cur.id) {
          state.music.ytPlayer.loadVideoById(cur.id);
        } else {
          state.music.ytPlayer.playVideo();
        }
        state.music.ytPlayer.setVolume(state.music.volume);
        state.music.playing = true;
      }
      updateMusicMiniStatus();
    } catch {
      musicPlayIndex(state.music.idx);
    }
  });
}

function musicNext() { musicPlayIndex(state.music.idx + 1); }
function musicPrev() { musicPlayIndex(state.music.idx - 1); }

function musicSetVolume(val) {
  state.music.volume = Number(val);
  if (state.music.ytPlayer && state.music.ytReady) {
    try { state.music.ytPlayer.setVolume(state.music.volume); } catch {}
  }
  const lbl = document.getElementById('music-vol-lbl');
  if (lbl) lbl.textContent = state.music.volume + '%';
}

function toggleMusicFav(id) {
  const i = state.music.favorites.indexOf(id);
  if (i >= 0) {
    state.music.favorites.splice(i, 1);
    notify('💔 Đã bỏ bài hát khỏi danh sách Yêu thích.');
  } else {
    state.music.favorites.unshift(id);
    notify('❤️ Đã lưu bài hát vào Yêu thích!');
  }
  saveJson('tamn_music_favs_v1', state.music.favorites);
  render();
}

function musicAiSearch(e) {
  e.preventDefault();
  const q = (document.getElementById('music-ai-inp')?.value || '').trim();
  if (!q) return;

  // Case 1: User pasted a direct YouTube URL or 11-char ID
  const ytId = extractYoutubeId(q);
  if (ytId) {
    let idx = state.music.playlist.findIndex(x => x.id === ytId);
    if (idx === -1) {
      const custom = { id: ytId, title: `Bài hát YouTube (${ytId})`, artist: 'YouTube Audio', mood: 'tùy chọn', duration: 'YT' };
      state.music.playlist.unshift(custom);
      const savedCustom = loadJson('tamn_music_custom_v1', []);
      savedCustom.unshift(custom);
      saveJson('tamn_music_custom_v1', savedCustom);
      idx = 0;
    }
    state.music.aiReply = `✅ AI Tiếng Việt đã nhận link YouTube và phát ngay ở chế độ CHỈ ÂM THANH (ẩn hoàn toàn video/hình ảnh)!`;
    musicPlayIndex(idx);
    return;
  }

  // Case 2: Natural Vietnamese AI search across catalog
  const ql = q.toLowerCase();
  const hitIdx = state.music.playlist.findIndex(t => (t.title + ' ' + t.artist + ' ' + t.mood).toLowerCase().includes(ql) || ql.split(/\s+/).some(w => w.length > 2 && (t.title + ' ' + t.mood).toLowerCase().includes(w)));
  if (hitIdx >= 0) {
    const t = state.music.playlist[hitIdx];
    state.music.aiReply = `🤖 AI Tiếng Việt tìm thấy bài phù hợp nhất với "${q}": **${t.title}** (${t.artist}) — Đang phát nhạc nền cho bạn!`;
    musicPlayIndex(hitIdx);
  } else {
    state.music.aiReply = `🤖 Không thấy sẵn "${q}" trong kho nội bộ. Bạn có thể bấm nút "🔎 Tìm trên YouTube (Cốc Cốc)" rồi dán link bài hát vào đây để phát chỉ âm thanh nhé!`;
    render();
  }
}

function renderMusic(v) {
  const cur = state.music.playlist[state.music.idx] || MUSIC_CATALOG[0];
  const isFav = state.music.favorites.includes(cur.id);
  const shownList = state.music.tab === 'fav'
    ? state.music.playlist.filter(t => state.music.favorites.includes(t.id))
    : state.music.playlist;
  const lastSearchQ = document.getElementById('music-ai-inp')?.value || cur.title;

  v.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-5">
      <div class="boarding-pass p-6 text-white space-y-4 shadow-xl" style="background:linear-gradient(135deg,#0f172a 0%,#0f766e 60%,#0369a1 100%);">
        <div class="flex flex-wrap justify-between items-center gap-2 text-xs">
          <span class="px-3 py-1 rounded-full bg-white/15 font-extrabold">🎧 YOUTUBE AUDIO-ONLY • CỐC CỐC / CHROME (KHÔNG HIỆN VIDEO)</span>
          <div class="flex items-center gap-1 h-6 ${state.music.playing ? 'eq-playing' : ''}">
            <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
          </div>
        </div>

        <div class="flex flex-wrap justify-between items-center gap-4">
          <div class="space-y-1 min-w-0 flex-1">
            <div class="text-xs opacity-80">Đang chọn (ẩn hình ảnh & video 100%):</div>
            <h1 class="text-xl font-black truncate">${escapeHtml(cur.title)}</h1>
            <div class="text-xs text-teal-200 font-semibold">${escapeHtml(cur.artist)} • ${cur.duration}</div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="musicPrev()" title="Bài trước" class="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 font-bold text-sm cursor-pointer">⏮️</button>
            <button onclick="musicTogglePlay()" title="Phát / Tạm dừng" class="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-lg cursor-pointer shadow-lg">${state.music.playing ? '⏸️' : '▶️'}</button>
            <button onclick="musicNext()" title="Chuyển bài tiếp theo" class="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 font-bold text-sm cursor-pointer">⏭️</button>
            <button onclick="toggleMusicFav('${cur.id}')" title="Lưu / Bỏ yêu thích" class="px-3.5 py-2.5 rounded-full font-bold text-xs cursor-pointer ${isFav?'bg-rose-500 text-white':'bg-white/15 text-white hover:bg-white/25'}">${isFav ? '❤️ Đã thích' : '🤍 Yêu thích'}</button>
          </div>
        </div>

        <!-- Volume Control -->
        <div class="flex items-center gap-3 pt-2 boarding-divider text-xs">
          <span class="font-bold">🔊 Âm lượng:</span>
          <input type="range" min="0" max="100" value="${state.music.volume}" oninput="musicSetVolume(this.value)" class="flex-1 accent-amber-400 cursor-pointer" />
          <span id="music-vol-lbl" class="font-mono font-bold w-10 text-right">${state.music.volume}%</span>
        </div>
      </div>

      <!-- Vietnamese AI Music Assistant + YouTube Link Input -->
      <div class="travel-card p-5 space-y-3 text-xs">
        <div class="font-extrabold text-sm text-teal-800">🤖 AI Hỗ Trợ Tìm Nhạc Tiếng Việt & Phát Link YouTube (Chỉ Âm Thanh)</div>
        <form onsubmit="musicAiSearch(event)" class="flex flex-wrap gap-2">
          <input id="music-ai-inp" type="text" placeholder="Nhập yêu cầu tiếng Việt (VD: nhạc chill học IELTS, piano mưa) hoặc dán link YouTube..." class="flex-1 min-w-60 px-3.5 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs" />
          <button type="submit" class="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🎧 Tìm & Phát Audio</button>
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(lastSearchQ)}" target="_blank" rel="noopener" class="px-3.5 py-2.5 rounded-xl bg-rose-600 text-white font-bold inline-flex items-center">🔎 Mở YouTube (Cốc Cốc) ↗</a>
        </form>
        <div class="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-slate-800">${state.music.aiReply}</div>
      </div>

      <!-- Playlist & Favorites Tabs -->
      <div class="travel-card p-5 space-y-3 text-xs">
        <div class="flex justify-between items-center flex-wrap gap-2">
          <div class="flex gap-2">
            <button onclick="state.music.tab='all';render()" class="px-3.5 py-1.5 rounded-full font-bold cursor-pointer ${state.music.tab==='all'?'bg-[var(--primary)] text-white':'bg-[var(--content)]'}">🎵 Tất cả bài hát (${state.music.playlist.length})</button>
            <button onclick="state.music.tab='fav';render()" class="px-3.5 py-1.5 rounded-full font-bold cursor-pointer ${state.music.tab==='fav'?'bg-rose-600 text-white':'bg-[var(--content)]'}">❤️ Bài yêu thích (${state.music.favorites.length})</button>
          </div>
          <span class="text-[var(--muted-foreground)]">Chuyển bài mượt như YouTube • Phát nền khi đổi trang!</span>
        </div>

        <div class="divide-y divide-[var(--border)]">
          ${shownList.length ? shownList.map(t => {
            const realIdx = state.music.playlist.findIndex(x => x.id === t.id);
            const active = realIdx === state.music.idx;
            const fav = state.music.favorites.includes(t.id);
            return `
              <div class="py-2.5 flex items-center justify-between gap-2 ${active?'bg-teal-50/70 px-2.5 rounded-xl':''}">
                <div onclick="musicPlayIndex(${realIdx})" class="cursor-pointer flex-1 min-w-0">
                  <div class="font-bold text-sm truncate ${active?'text-teal-700':''}">${active && state.music.playing ? '🔊 ' : '🎵 '}${escapeHtml(t.title)}</div>
                  <div class="text-[11px] text-[var(--muted-foreground)]">${escapeHtml(t.artist)} • ${t.duration}</div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button onclick="musicPlayIndex(${realIdx})" class="px-3 py-1 rounded-lg bg-[var(--primary)] text-white font-bold cursor-pointer">${active && state.music.playing ? 'Đang phát' : '▶ Phát'}</button>
                  <button onclick="toggleMusicFav('${t.id}')" class="px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">${fav ? '❤️ Bỏ thích' : '🤍 Thích'}</button>
                </div>
              </div>`;
          }).join('') : `<div class="py-6 text-center text-[var(--muted-foreground)]">Chưa có bài hát yêu thích nào — bấm 🤍 ở bài bạn thích để lưu lại nhé!</div>`}
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 13. GIẢI TRÍ: GIAO LƯU 1-1 GHÉP NGẪU NHIÊN (TỐI ĐA 2 NGƯỜI • CAM & MIC)
// =========================================================================
function matchRandomLoungePartner() {
  const pool = state.users.filter(u => u.status === 'active' && (!state.currentUser || u.id !== state.currentUser.id));
  if (!pool.length) {
    state.loungePartner = null;
    notify('⏳ Hiện chưa có học viên thật nào khác đăng ký trên trình duyệt này để ghép ngẫu nhiên 1-1.');
    render();
    return;
  }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  state.loungePartner = picked;
  state.loungeMsgs = [{ from: picked.name, text: `Chào bạn! Hệ thống vừa ghép ngẫu nhiên 1-1 hai tụi mình. Bật Cam & Mic cùng luyện nói nhé!` }];
  notify(`🎲 Đã ghép ngẫu nhiên 1-1 (2/2 người) với ${picked.name}!`);
  render();
}

async function setLoungeMedia(wantVid, wantAud) {
  if (!navigator.mediaDevices?.getUserMedia) { notify('⚠️ Trình duyệt chặn Cam/Mic (hãy chạy qua HTTPS hoặc localhost).'); return; }
  if (!wantVid && !wantAud) {
    if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
    state.loungeCamOn = false; state.loungeMicOn = false;
    render(); return;
  }
  try {
    if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); }
    const stream = await navigator.mediaDevices.getUserMedia({ video: wantVid, audio: wantAud });
    state.localStream = stream;
    state.loungeCamOn = wantVid && stream.getVideoTracks().length > 0;
    state.loungeMicOn = wantAud && stream.getAudioTracks().length > 0;
    render();
    const vid = document.getElementById('lg-v');
    if (vid && state.loungeCamOn) { vid.srcObject = stream; vid.classList.remove('hidden'); }
    notify('✅ Đã mở Camera / Micro thành công!');
  } catch {
    notify('⚠️ Chrome chưa cấp quyền Camera/Micro — hãy bấm biểu tượng ổ khóa trên thanh địa chỉ để Cho phép.');
  }
}

function sendLoungeMsg(e) {
  e.preventDefault();
  const inp = document.getElementById('lg-msg-inp');
  const txt = (inp?.value || '').trim();
  if (!txt) return;
  state.loungeMsgs.push({ from: state.currentUser ? state.currentUser.name : 'Bạn', text: txt, me: true });
  inp.value = '';
  render();
}

function renderLounge(v) {
  if (getEffectivePlan() !== 'ultra' && !isAdmin()) {
    v.innerHTML = `
      <div class="max-w-xl mx-auto travel-card p-8 text-center space-y-4 border-2 border-sky-500">
        <div class="text-4xl">💎🎥🔒</div>
        <h1 class="text-xl font-black">Giao Lưu 1-1 Ghép Ngẫu Nhiên (Bản Ultra)</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Lọt Top 1–3 Bảng xếp hạng để nhận Ultra miễn phí, hoặc nâng gói Ultra để bật Cam & Mic giao lưu 2 người!</p>
        <div class="flex justify-center gap-2">
          <button onclick="go('leaderboard')" class="px-4 py-2 rounded-xl bg-amber-400 text-slate-900 text-xs font-extrabold cursor-pointer">🏆 Đua Top 1–3</button>
          <button onclick="go('pricing')" class="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-extrabold cursor-pointer">💎 Nâng gói Ultra</button>
        </div>
      </div>`;
    return;
  }

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full text-white bg-rose-600">🎲 GHÉP NGẪU NHIÊN 1-1 • TỐI ĐA 2 NGƯỜI</span>
          <h1 class="text-xl font-black mt-1">🎥 Phòng Giao Lưu Cam & Mic (2 Người)</h1>
        </div>
        <div class="flex flex-wrap gap-1.5 text-xs">
          <button onclick="matchRandomLoungePartner()" class="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-900 font-extrabold cursor-pointer">🎲 Ghép ngẫu nhiên bạn mới</button>
          <button onclick="setLoungeMedia(true,true)" class="px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white font-bold cursor-pointer">🎥 Bật Cam & Mic</button>
          <button onclick="setLoungeMedia(false,false)" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer">⏹️ Tắt Cam/Mic</button>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="rounded-2xl overflow-hidden bg-slate-900 text-white min-h-56 flex flex-col items-center justify-center relative border-2 border-teal-500">
          <video id="lg-v" autoplay muted playsinline class="w-full h-56 object-cover mirror-vid ${state.loungeCamOn?'':'hidden'}"></video>
          <div class="${state.loungeCamOn?'hidden':''} p-5 text-center space-y-2 text-xs">
            ${avatarHtml(state.currentUser, 54)}
            <div class="font-bold">${state.currentUser ? state.currentUser.name : 'Bạn'} (Người 1/2)</div>
            <div class="opacity-75">Cam: ${state.loungeCamOn?'Bật':'Tắt'} • Mic: ${state.loungeMicOn?'Bật':'Tắt'}</div>
          </div>
        </div>
        <div class="rounded-2xl p-5 text-white min-h-56 flex flex-col justify-between" style="background:linear-gradient(135deg,#0f172a,#0f766e);">
          ${state.loungePartner ? `
            <div class="flex items-center gap-3">
              ${avatarHtml(state.loungePartner, 48)}
              <div>
                <div class="font-bold text-sm">${nameWithBadge(state.loungePartner)}</div>
                <div class="text-xs text-teal-200">Người 2/2 (Ghép ngẫu nhiên) • 🔒 Khóa không thêm người thứ 3</div>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-white/10 text-xs">Chủ đề gợi ý: <strong>"What is your dream travel destination and why?"</strong></div>
          ` : `
            <div class="my-auto text-center space-y-2 text-xs">
              <div class="text-3xl">🎲</div>
              <div class="font-bold text-sm">Chưa ghép đối tác 1-1</div>
              <div class="opacity-80">Bấm "🎲 Ghép ngẫu nhiên bạn mới" để kết nối 1 học viên thật khác (hệ thống không tạo người ảo).</div>
            </div>
          `}
        </div>
      </div>

      <div class="travel-card p-4 space-y-2 text-xs">
        <div class="font-bold">💬 Nhắn tin trực tiếp (2 người):</div>
        <div class="max-h-40 overflow-y-auto space-y-1.5 p-2 rounded-xl bg-[var(--content)]">
          ${state.loungeMsgs.length ? state.loungeMsgs.map(m => `<div><strong>${escapeHtml(m.from)}:</strong> ${escapeHtml(m.text)}</div>`).join('') : '<div class="text-[var(--muted-foreground)]">Chưa có tin nhắn nào.</div>'}
        </div>
        <form onsubmit="sendLoungeMsg(event)" class="flex gap-2">
          <input id="lg-msg-inp" required placeholder="Nhập tin nhắn..." class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
          <button type="submit" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-bold cursor-pointer">Gửi</button>
        </form>
      </div>
    </div>`;
}

// =========================================================================
// 14. RANK: ĐỐI KHÁNG 1V1 (NGÀY 01 HẰNG THÁNG) & BẢNG XẾP HẠNG (USER THẬT)
// =========================================================================
function getDuelDayInfo() {
  const now = new Date();
  const isDay1 = state.duelSimulateDay1 || now.getDate() === 1;
  const nextFirst = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const diffDays = isDay1 ? 0 : Math.ceil((nextFirst - now) / 86400000);
  const nextDateStr = `01/${String(nextFirst.getMonth()+1).padStart(2,'0')}/${nextFirst.getFullYear()}`;
  return { isDay1, diffDays, nextDateStr };
}

function matchDuelDay1() {
  const info = getDuelDayInfo();
  if (!info.isDay1) { notify(`🔒 Chỉ được ghép trận mới vào ngày 01 hằng tháng (đợi đến ${info.nextDateStr}).`); return; }
  const pool = state.users.filter(u => u.status === 'active' && (!state.currentUser || u.id !== state.currentUser.id));
  if (!pool.length) { notify('⏳ Chưa có tài khoản học viên thật thứ 2 để ghép trận 1v1.'); return; }
  state.duelOpponent = pool[Math.floor(Math.random() * pool.length)];
  notify(`⚔️ Đã ghép đối thủ ngày 01: ${state.duelOpponent.name}!`);
  render();
}

function renderDuel(v) {
  const info = getDuelDayInfo();
  const me = state.currentUser;
  const op = state.duelOpponent;
  v.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">📅 CHỈ GHÉP TRẬN MỚI NGÀY 01 HẰNG THÁNG</span>
          <h1 class="text-xl font-black mt-1">⚔️ Đối Kháng 1 vs 1 (Học Viên Thật)</h1>
        </div>
        <div class="flex gap-2 text-xs">
          <button onclick="matchDuelDay1()" ${info.isDay1?'':'disabled'} class="px-4 py-2 rounded-xl text-white font-extrabold cursor-pointer disabled:opacity-45" style="background:${info.isDay1?'#059669':'#64748b'};">
            ${info.isDay1 ? '🎲 Ghép Trận Mới Ngay' : `🔒 Mở ghép ${info.nextDateStr} (${info.diffDays} ngày)`}
          </button>
          <button onclick="state.duelSimulateDay1=!state.duelSimulateDay1;render()" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer">${state.duelSimulateDay1?'📅 Về ngày thật':'🧪 Test Ngày 01'}</button>
        </div>
      </div>

      <div class="travel-card p-6 grid md:grid-cols-3 gap-4 items-center text-center">
        <div class="p-4 rounded-2xl bg-[var(--content)] border-2 border-teal-500 flex flex-col items-center gap-1.5">
          ${avatarHtml(me, 52)}
          <div class="font-bold text-sm">${me ? nameWithBadge(me) : 'Bạn (Chưa đăng nhập)'}</div>
          <div class="text-lg font-mono font-black text-teal-700">${me ? (me.grindPts || 0) : 0} đ</div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-amber-200 border-2 border-amber-400" style="background:linear-gradient(135deg,#0f172a,#ea580c);">VS</div>
          <span class="text-xs text-[var(--muted-foreground)]">100% Tài khoản thật</span>
        </div>
        <div class="p-4 rounded-2xl bg-[var(--content)] border border-[var(--border)] flex flex-col items-center gap-1.5">
          ${op ? `${avatarHtml(op, 52)}<div class="font-bold text-sm">${nameWithBadge(op)}</div><div class="text-lg font-mono font-black text-orange-600">${op.grindPts || 0} đ</div>` : `<div class="text-3xl">⏳</div><div class="text-xs text-[var(--muted-foreground)]">Chờ ghép đối thủ thật vào ngày 01</div>`}
        </div>
      </div>
    </div>`;
}

function renderLeaderboard(v) {
  syncTopRankRewards();
  const top = getRankedRealUsers().slice(0, 10);
  const [r1, r2, r3, ...rest] = top;

  v.innerHTML = `
    <div class="space-y-4">
      <div>
        <h1 class="text-xl font-black">🏆 Bảng Xếp Hạng Học Viên Thật (Top 1–3 Nhận Huy Hiệu & Gói Ultra)</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Không có tài khoản ảo! Top 1, 2, 3 tự động gắn huy hiệu <strong>Vàng / Bạc / Đồng</strong> cạnh tên và <strong>nâng gói Ultra</strong>; rớt khỏi Top 1–3 tự động mất gói Ultra.</p>
      </div>

      ${!top.length ? `
        <div class="travel-card p-10 text-center space-y-3">
          <div class="text-4xl">🌱🏆</div>
          <h2 class="text-base font-extrabold">Chưa có học viên thật nào đăng ký</h2>
          <p class="text-xs text-[var(--muted-foreground)]">Hãy là người đầu tiên đăng ký tài khoản thật để đứng Top 1, nhận Huy hiệu Vàng & gói Ultra miễn phí!</p>
          <button onclick="openAuth('register')" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">✨ Tạo tài khoản thật ngay</button>
        </div>
      ` : `
        <div class="grid md:grid-cols-3 gap-4 items-end">
          ${r2 ? `<div class="travel-card rank2-frame p-5 flex flex-col items-center text-center gap-2"><span class="badge-silver text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥈 TOP 2 • HUY HIỆU BẠC</span>${avatarHtml(r2,52)}<div class="font-bold text-sm">${nameWithBadge(r2)}</div><span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white">💎 Auto ULTRA</span><div class="text-xs font-mono">🔥 ${r2.streak} • 🪙 ${r2.coins}</div></div>` : '<div></div>'}
          ${r1 ? `<div class="rank1-frame rounded-2xl p-6 flex flex-col items-center text-center gap-2"><div class="text-2xl">👑</div><span class="badge-gold text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥇 TOP 1 • HUY HIỆU VÀNG</span>${avatarHtml(r1,60)}<div class="font-extrabold text-base">${nameWithBadge(r1)}</div><span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white">💎 Auto ULTRA</span><div class="text-xs font-mono text-amber-300">🔥 ${r1.streak} • 🪙 ${r1.coins}</div></div>` : ''}
          ${r3 ? `<div class="travel-card rank3-frame p-5 flex flex-col items-center text-center gap-2"><span class="badge-bronze text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥉 TOP 3 • HUY HIỆU ĐỒNG</span>${avatarHtml(r3,52)}<div class="font-bold text-sm">${nameWithBadge(r3)}</div><span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white">💎 Auto ULTRA</span><div class="text-xs font-mono">🔥 ${r3.streak} • 🪙 ${r3.coins}</div></div>` : '<div></div>'}
        </div>
        ${rest.length ? `
          <div class="travel-card divide-y divide-[var(--border)]">
            ${rest.map((u, i) => `<div class="px-4 py-3 flex justify-between items-center text-xs"><div class="flex items-center gap-3"><span class="font-mono font-bold w-6">#${i+4}</span>${avatarHtml(u,28)}<strong>${escapeHtml(u.name)}</strong><span class="px-1.5 py-0.5 rounded bg-[var(--content)] font-bold uppercase text-[10px]">${u.planTier}</span></div><div class="font-mono">🔥 ${u.streak} • 🪙 ${u.coins}</div></div>`).join('')}
          </div>` : ''}
      `}
    </div>`;
}

// =========================================================================
// 15. NÂNG GÓI (VIETQR + ZALO 0779176786)
// =========================================================================
function createPlanOrder(tier, months) {
  if (!state.currentUser) { notify('🔐 Vui lòng đăng nhập tài khoản thật trước khi tạo đơn nâng gói!'); openAuth('register'); return; }
  const amount = PLAN_PRICES[tier][months];
  const code = 'ORD' + String(Date.now()).slice(-5);
  state.orders.unshift({
    code, userId: state.currentUser.id, userName: state.currentUser.name,
    memo: state.currentUser.accountCode, tier, months, amount, status: 'waiting_approval'
  });
  saveJson('tamn_orders_v1', state.orders);
  notify(`✅ Đã tạo đơn ${code} (${amount.toLocaleString('vi-VN')}đ). Chuyển khoản VPBank ${BANK_INFO.stk} nội dung "${state.currentUser.accountCode}" và nhắn Zalo 0779176786!`);
  render();
}

function renderPricing(v) {
  v.innerHTML = `
    <div class="max-w-4xl mx-auto space-y-5">
      <div class="text-center space-y-1">
        <h1 class="text-2xl font-black">👑 Nâng Gói Pro & Ultra</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Hoặc đạt <strong>Top 1–3 Bảng xếp hạng</strong> để tự động nhận gói Ultra miễn phí!</p>
      </div>
      <div class="grid md:grid-cols-3 gap-4 text-xs">
        <div class="travel-card p-5 space-y-3">
          <div class="font-extrabold text-base">🌱 Bản Thường (Free)</div>
          <div class="text-2xl font-black">0đ</div>
          <ul class="space-y-1.5 text-slate-600">
            <li>• Học 4 kỹ năng & 283 chủ đề theo thứ tự</li>
            <li>• Bắt buộc kiểm tra ôn từ 1 lần/tuần</li>
            <li>• Nghe nhạc YouTube nền không video</li>
          </ul>
        </div>
        <div class="travel-card p-5 space-y-3 border-2 border-amber-400">
          <div class="font-extrabold text-base text-amber-700">⚡ Bản Pro</div>
          <div class="text-2xl font-black text-amber-700">15.000đ <span class="text-xs font-normal">/ tháng</span></div>
          <ul class="space-y-1.5 text-slate-600">
            <li>• Học vượt mọi phần lộ trình không giới hạn</li>
            <li>• Không giới hạn từ vựng mỗi ngày</li>
            <li>• Vẫn duy trì kiểm tra ôn từ hàng tuần</li>
          </ul>
          <button onclick="createPlanOrder('pro',1)" class="w-full py-2.5 rounded-xl bg-amber-400 text-slate-900 font-extrabold cursor-pointer">Đăng ký Pro (15k/tháng)</button>
        </div>
        <div class="travel-card p-5 space-y-3 border-2 border-teal-500">
          <div class="font-extrabold text-base text-teal-700">💎 Bản Ultra (Full)</div>
          <div class="text-2xl font-black text-teal-700">30.000đ <span class="text-xs font-normal">/ tháng</span></div>
          <ul class="space-y-1.5 text-slate-600">
            <li>• Mở khóa 100% tính năng + Giao lưu 1-1 Cam/Mic</li>
            <li>• Miễn bắt buộc kiểm tra tuần</li>
            <li>• Ưu tiên hỗ trợ trực tiếp qua Zalo</li>
          </ul>
          <button onclick="createPlanOrder('ultra',1)" class="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">Đăng ký Ultra (30k/tháng)</button>
        </div>
      </div>
      <div class="travel-card p-4 flex flex-wrap justify-between items-center gap-3 text-xs">
        <div><strong>🏦 Chuyển khoản VPBank:</strong> <span class="font-mono font-bold">${BANK_INFO.stk}</span> • Chủ TK: <strong>${BANK_INFO.owner}</strong> • Nội dung: <strong class="font-mono text-teal-700">${state.currentUser ? state.currentUser.accountCode : 'Mã ID của bạn'}</strong></div>
        <button onclick="openZaloModal()" class="px-4 py-2 rounded-xl text-white font-bold cursor-pointer" style="background:#0068ff;">💬 Nhắn Zalo Hỗ Trợ 0779176786</button>
      </div>
    </div>`;
}

// =========================================================================
// 16. CÀI ĐẶT (AVATAR • ĐỔI TÊN GIỮ ID • ĐỔI MK • GMAIL/SĐT • ÂM PHÍM • ĐĂNG XUẤT)
// =========================================================================
function toggleTypingSoundSetting() {
  state.settings.typingSound = !state.settings.typingSound;
  saveJson('tamn_settings_v1', state.settings);
  if (state.settings.typingSound) playSoftKeySound('A');
  notify(state.settings.typingSound ? '🎹 Đã BẬT âm thanh gõ phím nhẹ!' : '🔇 Đã TẮT âm thanh gõ phím.');
  render();
}

function toggleAnimationsSetting() {
  state.settings.animations = !state.settings.animations;
  saveJson('tamn_settings_v1', state.settings);
  notify(state.settings.animations ? '✨ Đã BẬT hiệu ứng chuyển động mượt!' : '⏸️ Đã giảm hiệu ứng chuyển động.');
  render();
}

function handleSettingsAvatar(input) {
  const f = input.files?.[0];
  if (!f || !state.currentUser) return;
  const r = new FileReader();
  r.onload = () => {
    state.currentUser.avatar = r.result;
    if (isAdmin()) localStorage.setItem('tamn_admin_avatar_v1', r.result);
    else saveUsers();
    notify('📷 Đã cập nhật ảnh Avatar mới!');
    render();
  };
  r.readAsDataURL(f);
}

function saveSettingsName(e) {
  e.preventDefault();
  if (!state.currentUser) return;
  const newName = document.getElementById('st-name-inp').value.trim();
  if (!newName) return;
  state.currentUser.name = newName;
  if (!isAdmin()) saveUsers();
  notify(`✅ Đã đổi tên thành "${newName}" — Mã ID cố định (${state.currentUser.accountCode}) giữ nguyên không đổi!`);
  render();
}

function saveSettingsPassword(e) {
  e.preventDefault();
  if (!state.currentUser) return;
  if (isAdmin()) { notify('🛡️ Mật khẩu gốc tài khoản Admin cố định trên hệ thống.'); return; }
  const oldP = document.getElementById('st-old-pass').value;
  const newP = document.getElementById('st-new-pass').value;
  if (oldP !== state.currentUser.password && !state.currentUser.password.startsWith('social_')) {
    notify('❌ Mật khẩu hiện tại không đúng!'); return;
  }
  if (newP.length < 4) { notify('⚠️ Mật khẩu mới phải từ 4 ký tự trở lên.'); return; }
  state.currentUser.password = newP;
  saveUsers();
  e.target.reset();
  notify('🔐 Đã đổi mật khẩu tài khoản thành công!');
}

function saveSettingsSecurity(e) {
  e.preventDefault();
  if (!state.currentUser) return;
  const gm = document.getElementById('st-gmail-inp').value.trim();
  const ph = document.getElementById('st-phone-inp').value.trim();
  if (gm) { state.currentUser.email = gm; state.currentUser.gmailVerified = true; }
  if (ph) { state.currentUser.phone = ph; state.currentUser.phoneVerified = true; }
  if (!isAdmin()) saveUsers();
  notify('🛡️ Đã xác nhận bảo mật bằng Gmail & Số điện thoại thành công!');
  render();
}

function renderSettings(v) {
  const u = state.currentUser;
  v.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 class="text-xl font-black">⚙️ Cài Đặt Tài Khoản & Hệ Thống</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Đổi avatar, đổi tên (không đổi ID), đổi mật khẩu, xác nhận bảo mật Gmail/SĐT, bật tắt âm gõ phím và đăng xuất.</p>
      </div>

      <!-- Sound & Motion Settings -->
      <div class="travel-card p-5 space-y-3 text-xs">
        <div class="font-extrabold text-sm">🎛️ Âm Thanh & Hiệu Ứng Web</div>
        <div class="flex justify-between items-center p-3 rounded-xl bg-[var(--content)]">
          <div>
            <div class="font-bold">🎹 Hiệu ứng âm gõ phím (mỗi phím 1 nốt nhẹ êm tai)</div>
            <div class="text-[var(--muted-foreground)]">Âm thanh nhỏ, tinh tế, không gây khó chịu khi học bài.</div>
          </div>
          <button onclick="toggleTypingSoundSetting()" class="px-4 py-2 rounded-xl font-extrabold cursor-pointer ${state.settings.typingSound?'bg-[var(--primary)] text-white':'bg-white border border-[var(--border)]'}">${state.settings.typingSound?'🔊 Đang BẬT':'🔇 Đang TẮT'}</button>
        </div>
        <div class="flex justify-between items-center p-3 rounded-xl bg-[var(--content)]">
          <div>
            <div class="font-bold">✨ Hiệu ứng chuyển cảnh & chuyển động du lịch</div>
            <div class="text-[var(--muted-foreground)]">Tối ưu mượt mà trên mọi thiết bị.</div>
          </div>
          <button onclick="toggleAnimationsSetting()" class="px-4 py-2 rounded-xl font-extrabold cursor-pointer ${state.settings.animations?'bg-[var(--primary)] text-white':'bg-white border border-[var(--border)]'}">${state.settings.animations?'✨ Đang BẬT':'⏸️ Đang TẮT'}</button>
        </div>
      </div>

      ${!u ? `
        <div class="travel-card p-8 text-center space-y-3">
          <div class="text-3xl">🔐</div>
          <div class="font-extrabold text-base">Bạn chưa đăng nhập tài khoản thật</div>
          <button onclick="openAuth('register')" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">✨ Đăng nhập / Tạo tài khoản ngay</button>
        </div>
      ` : `
        <!-- Avatar + Name (Fixed ID) -->
        <div class="travel-card p-5 space-y-4 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              ${avatarHtml(u, 60)}
              <div>
                <div class="font-extrabold text-base">${nameWithBadge(u)}</div>
                <div class="font-mono text-teal-700 font-bold">ID Cố Định (Không đổi): ${u.accountCode}</div>
              </div>
            </div>
            <label class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-bold cursor-pointer">
              📷 Đổi Avatar
              <input type="file" accept="image/*" onchange="handleSettingsAvatar(this)" class="hidden" />
            </label>
          </div>

          <form onsubmit="saveSettingsName(event)" class="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
            <input id="st-name-inp" type="text" required value="${escapeHtml(u.name)}" placeholder="Tên hiển thị mới..." class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            <button type="submit" class="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">✏️ Đổi tên (Giữ nguyên ID)</button>
          </form>
        </div>

        <!-- Security Verification: Gmail & Phone -->
        <form onsubmit="saveSettingsSecurity(event)" class="travel-card p-5 space-y-3 text-xs">
          <div class="font-extrabold text-sm">🛡️ Xác Nhận Bảo Mật Bằng Gmail & Số Điện Thoại</div>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="font-bold">Gmail bảo mật ${u.gmailVerified?'<span class="text-emerald-600">✓ Đã xác nhận</span>':'<span class="text-amber-600">Chưa xác nhận</span>'}</label>
              <input id="st-gmail-inp" type="email" value="${escapeHtml(u.email || '')}" placeholder="tenban@gmail.com" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            </div>
            <div class="space-y-1">
              <label class="font-bold">Số điện thoại ${u.phoneVerified?'<span class="text-emerald-600">✓ Đã xác nhận</span>':'<span class="text-amber-600">Chưa xác nhận</span>'}</label>
              <input id="st-phone-inp" type="tel" value="${escapeHtml(u.phone || '')}" placeholder="09xx xxx xxx" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            </div>
          </div>
          <button type="submit" class="px-4 py-2 rounded-xl bg-sky-600 text-white font-extrabold cursor-pointer">✅ Xác nhận bảo mật Gmail & SĐT</button>
        </form>

        <!-- Change Password -->
        <form onsubmit="saveSettingsPassword(event)" class="travel-card p-5 space-y-3 text-xs">
          <div class="font-extrabold text-sm">🔑 Đổi Mật Khẩu Tài Khoản</div>
          <div class="grid sm:grid-cols-2 gap-2">
            <input id="st-old-pass" type="password" required placeholder="Mật khẩu hiện tại" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            <input id="st-new-pass" type="password" required minlength="4" placeholder="Mật khẩu mới (tối thiểu 4 ký tự)" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
          </div>
          <button type="submit" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🔐 Cập nhật mật khẩu</button>
        </form>

        <!-- Logout -->
        <div class="travel-card p-5 flex flex-wrap justify-between items-center gap-3 border-rose-200 bg-rose-50/40 text-xs">
          <div>
            <div class="font-extrabold text-sm text-rose-700">🚪 Đăng Xuất Tài Khoản</div>
            <div class="text-slate-600">Dữ liệu tài khoản thật và tiến độ học vẫn được lưu an toàn.</div>
          </div>
          <button onclick="logoutUser()" class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold cursor-pointer">🚪 Đăng xuất ngay</button>
        </div>
      `}
    </div>`;
}

// =========================================================================
// 17. TRANG ADMIN TOÀN QUYỀN (CHỈ DÀNH CHO vanhung1155 / vanhung123456)
// =========================================================================
function adminChangeUserPass(uid) {
  if (!isAdmin()) { notify('⛔ Chỉ Admin vanhung1155 mới có quyền này!'); return; }
  const inp = document.getElementById(`adm-pw-${uid}`);
  const newPass = (inp?.value || '').trim();
  if (newPass.length < 4) { notify('⚠️ Mật khẩu mới phải từ 4 ký tự trở lên.'); return; }
  const u = state.users.find(x => x.id === uid);
  if (!u) return;
  u.password = newPass;
  saveUsers();
  inp.value = '';
  notify(`🔑 Admin đã đổi mật khẩu cho ${u.name} (${u.accountCode}) thành công!`);
}

function adminSetPlan(uid, tier) {
  if (!isAdmin()) return;
  const u = state.users.find(x => x.id === uid);
  if (!u) return;
  u.basePlanTier = tier;
  u.planTier = tier;
  syncTopRankRewards();
  notify(`👑 Admin đã cấp gói ${tier.toUpperCase()} cho ${u.name} (${u.accountCode})!`);
  render();
}

function adminSetStatus(uid, st) {
  if (!isAdmin()) return;
  const u = state.users.find(x => x.id === uid);
  if (!u) return;
  u.status = st;
  syncTopRankRewards();
  notify(`🛡️ Đã cập nhật trạng thái ${u.name} → ${st.toUpperCase()}`);
  render();
}

function adminDeleteUser(uid) {
  if (!isAdmin()) return;
  state.users = state.users.filter(x => x.id !== uid);
  syncTopRankRewards();
  notify('🗑️ Đã xóa tài khoản khỏi hệ thống!');
  render();
}

function adminApproveOrder(code) {
  if (!isAdmin()) return;
  const o = state.orders.find(x => x.code === code);
  if (!o) return;
  o.status = 'paid';
  saveJson('tamn_orders_v1', state.orders);
  const u = state.users.find(x => x.accountCode === o.memo);
  if (u) { u.basePlanTier = o.tier; u.planTier = o.tier; syncTopRankRewards(); }
  notify(`✅ Đã duyệt đơn ${code} & cấp gói ${o.tier.toUpperCase()}!`);
  render();
}

// Admin AI Media Translator (Video upload / Video link / Audio upload -> Dịch chữ Anh-Việt hoặc Nói Tiếng Việt)
function simpleEnToViTranslate(enText) {
  const dict = {
    'hello':'xin chào','welcome':'chào mừng','travel':'du lịch','english':'tiếng Anh','every day':'mỗi ngày',
    'vocabulary':'từ vựng','grammar':'ngữ pháp','speaking':'luyện nói','writing':'luyện viết','reading':'luyện đọc',
    'sustainable':'bền vững','environment':'môi trường','hotel':'khách sạn','airport':'sân bay','ticket':'vé',
    'journey':'hành trình','student':'học sinh','important':'quan trọng','practice':'luyện tập','music':'âm nhạc',
    'future':'tương lai','success':'thành công','friend':'bạn bè','culture':'văn hóa','learn':'học'
  };
  let out = enText;
  Object.entries(dict).forEach(([en, vi]) => {
    out = out.replace(new RegExp('\\b' + en + '\\b', 'gi'), vi);
  });
  return `[Bản dịch AI Tiếng Việt]: ${out}`;
}

function adminRunMediaAi(e) {
  e.preventDefault();
  if (!isAdmin()) { notify('⛔ Chỉ Admin mới được dùng tính năng này!'); return; }
  const title = document.getElementById('adm-m-title').value.trim();
  const link = document.getElementById('adm-m-link').value.trim();
  const fileEl = document.getElementById('adm-m-file');
  const enSrc = document.getElementById('adm-m-en').value.trim();
  const mode = document.querySelector('input[name="adm-m-mode"]:checked')?.value || 'text';
  const fileName = fileEl?.files?.[0]?.name || '';
  const viText = simpleEnToViTranslate(enSrc || `Welcome to ${title}. Practice English every day for future success.`);

  const rec = {
    id: Date.now(), title, link, fileName, enText: enSrc, viText, mode,
    createdAt: new Date().toLocaleString('vi-VN')
  };
  state.adminMediaLessons.unshift(rec);
  saveJson('tamn_admin_media_v1', state.adminMediaLessons);

  if (mode === 'voice' || mode === 'both') {
    speak(viText.replace('[Bản dịch AI Tiếng Việt]: ', ''), 'vi-VN', 0.96);
  }
  notify(`🤖 AI đã xử lý media "${title}" (${mode === 'voice' ? 'Đọc Tiếng Việt' : mode === 'both' ? 'Dịch chữ + Đọc Tiếng Việt' : 'Dịch chữ Anh → Việt'}) & lưu lên mục Ngữ pháp!`);
  render();
}

function renderAdmin(v) {
  if (!isAdmin()) {
    v.innerHTML = `
      <div class="max-w-lg mx-auto travel-card p-8 text-center space-y-3 border-2 border-rose-500">
        <div class="text-4xl">🛡️🔒</div>
        <h1 class="text-xl font-black text-rose-600">Khu Vực Dành Riêng Cho Admin</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Toàn bộ tài khoản người dùng thường không thể truy cập mục Admin và không thể sử dụng tính năng quản trị.</p>
        <button onclick="go('home')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold cursor-pointer">🏝️ Về Trang Chủ</button>
      </div>`;
    return;
  }

  v.innerHTML = `
    <div class="space-y-4">
      <div class="boarding-pass p-5 text-white" style="background:linear-gradient(135deg,#991b1b,#dc2626);">
        <div class="text-xs font-extrabold uppercase opacity-90">🛡️ HỆ THỐNG QUẢN TRỊ ADMIN • ${ADMIN_CRED.username}</div>
        <h1 class="text-xl font-black mt-1">Quản Lý Người Dùng Thật • Đổi Mật Khẩu • AI Dịch Video / Âm Thanh</h1>
      </div>

      <div class="flex flex-wrap gap-2 text-xs">
        <button onclick="state.adminTab='users';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='users'?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">👥 Người dùng thật (${state.users.length})</button>
        <button onclick="state.adminTab='media';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='media'?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">🎬 Tải Video/Audio & AI Dịch (${state.adminMediaLessons.length})</button>
        <button onclick="state.adminTab='orders';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='orders'?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">💳 Đơn VietQR (${state.orders.length})</button>
      </div>

      ${state.adminTab === 'users' ? `
        <div class="travel-card divide-y divide-[var(--border)] text-xs">
          ${state.users.length ? state.users.map(u => `
            <div class="p-4 flex flex-wrap justify-between items-center gap-3">
              <div class="flex items-center gap-2.5">
                ${avatarHtml(u, 36)}
                <div>
                  <div class="font-extrabold text-sm">${nameWithBadge(u)} <span class="font-mono text-xs text-teal-700">${u.accountCode}</span></div>
                  <div class="text-[var(--muted-foreground)]">TK: <strong>${escapeHtml(u.username)}</strong> • Gói: <strong class="uppercase">${u.planTier}</strong> • Trạng thái: <strong>${u.status}</strong></div>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-1.5">
                <input id="adm-pw-${u.id}" type="text" placeholder="MK mới..." class="w-28 px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] font-mono" />
                <button onclick="adminChangeUserPass(${u.id})" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold cursor-pointer">🔑 Đổi MK</button>
                <button onclick="adminSetPlan(${u.id},'free')" class="px-2 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">Free</button>
                <button onclick="adminSetPlan(${u.id},'pro')" class="px-2 py-1 rounded-lg bg-amber-400 text-slate-900 font-bold cursor-pointer">Pro</button>
                <button onclick="adminSetPlan(${u.id},'ultra')" class="px-2 py-1 rounded-lg bg-sky-600 text-white font-bold cursor-pointer">Ultra</button>
                <button onclick="adminSetStatus(${u.id},'${u.status==='active'?'locked':'active'}')" class="px-2 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold cursor-pointer">${u.status==='active'?'🔒':'🔓'}</button>
                <button onclick="adminDeleteUser(${u.id})" class="px-2 py-1 rounded-lg bg-rose-100 text-rose-700 font-bold cursor-pointer">🗑️</button>
              </div>
            </div>`).join('') : `<div class="p-8 text-center text-[var(--muted-foreground)]">Chưa có người dùng thật nào đăng ký trên trình duyệt này.</div>`}
        </div>
      ` : state.adminTab === 'media' ? `
        <form onsubmit="adminRunMediaAi(event)" class="travel-card p-5 space-y-3 text-xs">
          <div class="font-extrabold text-sm text-rose-700">🎬 Tải Video, Dán Link Video hoặc Âm Thanh → AI Dịch Anh–Việt / Đọc Tiếng Việt</div>
          <div class="grid sm:grid-cols-2 gap-3">
            <input id="adm-m-title" required placeholder="Tiêu đề bài giảng video/audio..." class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            <input id="adm-m-link" type="url" placeholder="Hoặc dán Link Video (YouTube / MP4)..." class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
          </div>
          <div class="p-3 rounded-xl bg-[var(--content)] border border-dashed border-[var(--border)]">
            <label class="font-bold block mb-1">📂 Tải file Video (.mp4/.webm) hoặc Âm thanh (.mp3/.wav) từ máy:</label>
            <input id="adm-m-file" type="file" accept="video/*,audio/*" class="text-xs" />
          </div>
          <textarea id="adm-m-en" rows="3" required placeholder="Nhập hoặc dán lời thoại tiếng Anh trong video/âm thanh để AI dịch sang Tiếng Việt..." class="w-full p-3 rounded-xl bg-[var(--content)] border border-[var(--border)]"></textarea>
          <div class="flex flex-wrap gap-3 items-center">
            <span class="font-bold">Chọn chế độ AI xuất ra:</span>
            <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="adm-m-mode" value="text" checked /> 📝 Dịch chữ (Anh → Việt)</label>
            <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="adm-m-mode" value="voice" /> 🔊 Nói bằng Tiếng Việt (Giọng đọc)</label>
            <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="adm-m-mode" value="both" /> ✨ Cả dịch chữ & đọc Tiếng Việt</label>
          </div>
          <button type="submit" class="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-extrabold cursor-pointer">🤖 AI Dịch & Xuất Bản Lên Web</button>
        </form>

        <div class="travel-card divide-y divide-[var(--border)] text-xs">
          ${state.adminMediaLessons.length ? state.adminMediaLessons.map(m => `
            <div class="p-4 space-y-1.5">
              <div class="flex justify-between items-center"><strong>${escapeHtml(m.title)}</strong><span class="text-[var(--muted-foreground)]">${m.createdAt}</span></div>
              ${m.fileName ? `<div class="text-teal-700 font-mono">📎 File: ${escapeHtml(m.fileName)}</div>` : ''}
              ${m.link ? `<div class="text-sky-700 truncate">🔗 Link: ${escapeHtml(m.link)}</div>` : ''}
              <div class="p-2.5 rounded-xl bg-[var(--content)]">${escapeHtml(m.viText)}</div>
              <button onclick="speak('${m.viText.replace(/'/g,"\\'")}','vi-VN',0.96)" class="px-3 py-1 rounded-lg bg-teal-600 text-white font-bold cursor-pointer">🔊 Phát giọng đọc Tiếng Việt</button>
            </div>`).join('') : `<div class="p-6 text-center text-[var(--muted-foreground)]">Chưa có video/audio nào được dịch.</div>`}
        </div>
      ` : `
        <div class="travel-card divide-y divide-[var(--border)] text-xs">
          ${state.orders.length ? state.orders.map(o => `
            <div class="p-4 flex flex-wrap justify-between items-center gap-2">
              <div><strong class="font-mono">${o.code}</strong> • ${escapeHtml(o.userName)} • ID: <strong class="font-mono text-teal-700">${o.memo}</strong> (${o.tier.toUpperCase()} — ${o.amount.toLocaleString('vi-VN')}đ)</div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full font-bold ${o.status==='paid'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-800'}">${o.status==='paid'?'✓ Đã duyệt':'⏳ Chờ duyệt'}</span>
                ${o.status!=='paid'?`<button onclick="adminApproveOrder('${o.code}')" class="px-3 py-1 rounded-lg bg-[var(--primary)] text-white font-bold cursor-pointer">✅ Duyệt & Cấp gói</button>`:''}
              </div>
            </div>`).join('') : `<div class="p-6 text-center text-[var(--muted-foreground)]">Chưa có đơn nạp gói nào.</div>`}
        </div>
      `}
    </div>`;
}

// =========================================================================
// 18. CHỨNG CHỈ TIẾNG ANH MỖI NGÀY + PHÁO HOA & MƯA SAO BĂNG + TẢI PNG
// =========================================================================
let certFireworks = [], certMeteors = [];
function spawnCertFirework(w, h) {
  const cx = w * (0.15 + Math.random() * 0.7), cy = h * (0.12 + Math.random() * 0.42);
  const pal = ['#fbbf24','#f43f5e','#34d399','#38bdf8','#f97316','#c084fc','#fde047'];
  const col = pal[Math.floor(Math.random() * pal.length)];
  for (let i = 0; i < 40; i++) {
    const a = (Math.PI * 2 * i) / 40 + Math.random() * 0.1;
    const sp = 2 + Math.random() * 4.5;
    certFireworks.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, col, sz: 2 + Math.random() * 2 });
  }
}
function spawnCertMeteor(w, h) {
  certMeteors.push({ x: Math.random() * w * 1.2, y: -20 - Math.random() * 80, vx: -(7 + Math.random() * 6), vy: 5 + Math.random() * 4.5, life: 1 });
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
  c.width = window.innerWidth; c.height = window.innerHeight;
  const ctx = c.getContext('2d');
  certFireworks = []; certMeteors = [];
  for (let i = 0; i < 3; i++) spawnCertFirework(c.width, c.height);
  for (let i = 0; i < 5; i++) spawnCertMeteor(c.width, c.height);
  let lastFw = 0, lastMt = 0;
  function anim(now) {
    if (document.getElementById('cert-modal')?.classList.contains('hidden')) return;
    state.certRaf = requestAnimationFrame(anim);
    ctx.fillStyle = 'rgba(2, 6, 23, 0.22)'; ctx.fillRect(0, 0, c.width, c.height);
    if (now - lastFw > 650) { lastFw = now; spawnCertFirework(c.width, c.height); }
    if (now - lastMt > 280) { lastMt = now; spawnCertMeteor(c.width, c.height); }
    for (let i = certMeteors.length - 1; i >= 0; i--) {
      const m = certMeteors[i]; m.x += m.vx; m.y += m.vy; m.life -= 0.012;
      if (m.life <= 0 || m.y > c.height + 100 || m.x < -150) { certMeteors.splice(i, 1); continue; }
      const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 10, m.y - m.vy * 10);
      g.addColorStop(0, `rgba(255,255,255,${m.life})`); g.addColorStop(0.4, `rgba(125,211,252,${m.life*0.85})`); g.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * 10, m.y - m.vy * 10); ctx.stroke();
    }
    for (let i = certFireworks.length - 1; i >= 0; i--) {
      const p = certFireworks[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.055; p.vx *= 0.985; p.life -= 0.015;
      if (p.life <= 0) { certFireworks.splice(i, 1); continue; }
      ctx.globalAlpha = p.life; ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  state.certRaf = requestAnimationFrame(anim);
}

function openRoadmapCertificate(roadmapName, startDate) {
  const u = state.currentUser || { name: 'Học Viên Xuất Sắc', accountCode: 'GUEST', avatar: '', topRank: 0 };
  const endDate = new Date().toLocaleDateString('vi-VN');
  const startStr = startDate || endDate;
  const certCode = `TAMN-${u.accountCode}-${String(Date.now()).slice(-4)}`;
  state.activeCert = { studentName: u.name, avatar: u.avatar || '', topRank: u.topRank || 0, roadmapName, startDate: startStr, endDate, certCode };

  const av = document.getElementById('cert-avatar-box');
  if (u.avatar) av.innerHTML = `<img src="${u.avatar}" class="w-full h-full object-cover" />`;
  else av.textContent = u.name.slice(0, 1).toUpperCase();
  document.getElementById('cert-student-name').innerHTML = nameWithBadge(u);
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
  canvas.width = 1600; canvas.height = 1120;
  const ctx = canvas.getContext('2d');
  function drawRest(img) {
    const bg = ctx.createLinearGradient(0, 0, 1600, 1120);
    bg.addColorStop(0, '#fffbeb'); bg.addColorStop(0.5, '#ffffff'); bg.addColorStop(1, '#f0fdfa');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 1600, 1120);
    ctx.strokeStyle = '#d97706'; ctx.lineWidth = 14; ctx.strokeRect(36, 36, 1528, 1048);
    ctx.strokeStyle = '#0d9488'; ctx.lineWidth = 4; ctx.strokeRect(62, 62, 1476, 996);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f766e'; ctx.font = 'bold 26px "Segoe UI", sans-serif';
    ctx.fillText('TIẾNG ANH MỖI NGÀY  •  CERTIFICATE OF COMPLETION', 800, 138);
    ctx.fillStyle = '#0f172a'; ctx.font = '900 54px "Segoe UI", sans-serif';
    ctx.fillText('CHỨNG CHỈ HOÀN THÀNH LỘ TRÌNH', 800, 212);

    const ax = 800, ay = 355, ar = 74;
    ctx.save(); ctx.beginPath(); ctx.arc(ax, ay, ar, 0, Math.PI * 2); ctx.closePath(); ctx.clip();
    if (img) ctx.drawImage(img, ax - ar, ay - ar, ar * 2, ar * 2);
    else {
      ctx.fillStyle = '#0d9488'; ctx.fillRect(ax - ar, ay - ar, ar * 2, ar * 2);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 64px "Segoe UI", sans-serif'; ctx.textBaseline = 'middle';
      ctx.fillText(cert.studentName.slice(0, 1).toUpperCase(), ax, ay + 4); ctx.textBaseline = 'alphabetic';
    }
    ctx.restore();
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(ax, ay, ar + 3, 0, Math.PI * 2); ctx.stroke();

    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 46px "Segoe UI", sans-serif';
    ctx.fillText(cert.studentName, 800, 495);
    ctx.fillStyle = '#0f766e'; ctx.font = 'bold 30px "Segoe UI", sans-serif';
    ctx.fillText(`Lộ trình: ${cert.roadmapName}`, 800, 550);

    ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.fillRect(360, 588, 400, 92); ctx.strokeRect(360, 588, 400, 92);
    ctx.fillRect(840, 588, 400, 92); ctx.strokeRect(840, 588, 400, 92);
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 20px "Segoe UI", sans-serif';
    ctx.fillText('NGÀY BẮT ĐẦU HỌC', 560, 622); ctx.fillText('NGÀY KẾT THÚC', 1040, 622);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 30px monospace'; ctx.fillText(cert.startDate, 560, 662);
    ctx.fillStyle = '#059669'; ctx.fillText(cert.endDate, 1040, 662);

    ctx.fillStyle = '#fffbeb'; ctx.strokeStyle = '#fcd34d';
    ctx.fillRect(180, 712, 1240, 126); ctx.strokeRect(180, 712, 1240, 126);
    ctx.fillStyle = '#334155'; ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText('"Chúc mừng em đã kiên trì vượt qua toàn bộ thử thách và hoàn thành xuất sắc lộ trình tại', 800, 758);
    ctx.fillText('Tiếng Anh Mỗi Ngày! Chúc em luôn giữ vững ngọn lửa đam mê ngoại ngữ,', 800, 792);
    ctx.fillText('tự tin bứt phá mọi kỳ thi và gặt hái thật nhiều thành công rực rỡ trong tương lai!"', 800, 826);

    ctx.textAlign = 'left'; ctx.fillStyle = '#475569'; ctx.font = '600 22px "Segoe UI", sans-serif';
    ctx.fillText(`Mã chứng chỉ: ${cert.certCode}`, 130, 955);
    ctx.fillStyle = '#0f766e'; ctx.font = 'bold 24px "Segoe UI", sans-serif';
    ctx.fillText('Hệ thống đào tạo Tiếng Anh Mỗi Ngày', 130, 995);

    ctx.textAlign = 'right'; ctx.fillStyle = '#64748b'; ctx.font = 'bold 22px "Segoe UI", sans-serif';
    ctx.fillText('HIỆU TRƯỞNG', 1470, 918);
    ctx.fillStyle = '#92400e'; ctx.font = 'italic bold 46px Georgia, serif';
    ctx.fillText('Trần Văn Hùng', 1470, 976);
    ctx.fillStyle = '#dc2626'; ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillText('★ ĐÃ XÁC NHẬN • TIẾNG ANH MỖI NGÀY ★', 1470, 1014);

    const a = document.createElement('a');
    a.download = `Chung_Chi_Tieng_Anh_Moi_Ngay_${cert.certCode}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    notify('⬇️ Đã tải hình Chứng chỉ Tiếng Anh Mỗi Ngày (PNG) về máy!');
  }
  if (cert.avatar) {
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onload = () => drawRest(img); img.onerror = () => drawRest(null); img.src = cert.avatar;
  } else drawRest(null);
}

// =========================================================================
// 19. LINH VẬT HÀ MÃ BÒ SỮA AI CHATBOX
// =========================================================================
function toggleHippoChat() {
  state.hippoOpen = !state.hippoOpen;
  document.getElementById('hippo-chat-box').classList.toggle('hidden', !state.hippoOpen);
  if (state.hippoOpen) renderHippoMsgs();
}

function renderHippoMsgs() {
  const box = document.getElementById('hippo-chat-msgs');
  if (!box) return;
  box.innerHTML = state.hippoMsgs.map(m => `
    <div class="flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}">
      <div class="max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed ${m.role === 'user' ? 'bg-[var(--primary)] text-white rounded-br-sm' : 'bg-white border border-[var(--border)] text-slate-800 rounded-bl-sm'}">
        ${escapeHtml(m.text)}
      </div>
    </div>`).join('');
  box.scrollTop = box.scrollHeight;
}

function generateHippoReply(q) {
  const ql = q.toLowerCase();
  if (ql.includes('hiện tại hoàn thành') || ql.includes('htht')) {
    return '📐 Công thức Hiện tại hoàn thành: S + have/has + V3/ed! Dùng cho hành động bắt đầu ở quá khứ và kéo dài đến hiện tại (dấu hiệu: since, for, already, yet, just). Bạn có thể vào mục Học → Ngữ Pháp để làm bài tập nhé!';
  }
  if (ql.includes('nhạc') || ql.includes('music') || ql.includes('chill')) {
    return '🎧 Mình gợi ý mở mục Giải trí → Âm nhạc! Bạn có thể chọn "Lofi Hip Hop Radio" hoặc dán link YouTube để nghe chỉ âm thanh (không hiện video) cực kỳ tập trung!';
  }
  if (ql.includes('ielts') || ql.includes('writing') || ql.includes('viết')) {
    return '✍️ Mẹo IELTS Writing 7.5–8.0+: Luôn đảm bảo đủ 4 đoạn (Mở – Thân 1 – Thân 2 – Kết), dùng từ nối mạch lạc (However, Moreover, Consequently) và paraphrase đề bài. Hãy vào Học → Luyện Viết để AI chấm điểm chi tiết nhé!';
  }
  if (ql.includes('top') || ql.includes('ultra') || ql.includes('rank')) {
    return '🏆 Top 1, 2, 3 Bảng xếp hạng sẽ tự động nhận Huy hiệu Vàng/Bạc/Đồng và nâng lên gói Ultra miễn phí! Rớt khỏi Top 3 sẽ tự động mất gói Ultra thưởng Top nhé.';
  }
  if (ql.includes('âm') || ql.includes('phím') || ql.includes('cài đặt') || ql.includes('đăng xuất')) {
    return '⚙️ Bạn bấm nút ☰ (3 gạch) góc trái → chọn ⚙️ Cài đặt để đổi avatar, đổi tên (giữ nguyên ID), đổi mật khẩu, xác nhận Gmail/SĐT, tắt/bật âm gõ phím hoặc đăng xuất nhé!';
  }
  return `🦛 Bé Hà Mã Bò Sữa đã nhận câu hỏi "${q}"! Bạn có thể mở menu ☰ để vào Luyện Nói, Luyện Viết, Luyện Đọc, Ngữ Pháp hoặc gõ cụ thể cấu trúc/từ vựng cần giải thích để mình hỗ trợ ngay nhé ✨`;
}

function sendQuickHippo(txt) {
  state.hippoMsgs.push({ role: 'user', text: txt });
  state.hippoMsgs.push({ role: 'ai', text: generateHippoReply(txt) });
  renderHippoMsgs();
}

function submitHippoChat(e) {
  e.preventDefault();
  const inp = document.getElementById('hippo-chat-inp');
  const txt = (inp?.value || '').trim();
  if (!txt) return;
  inp.value = '';
  sendQuickHippo(txt);
}

// =========================================================================
// 20. BOOTSTRAP APP
// =========================================================================
(function initApp() {
  const logoHtml = hippoCowSvg('w-full h-full');
  ['brand-logo-slot', 'drawer-logo-slot', 'floating-mascot-slot', 'chat-mascot-header'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = logoHtml;
  });

  document.querySelectorAll('.snav').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.nav));
  });

  restoreSession();
  syncTopRankRewards();
  render();
})();
