// =========================================================================
// TIẾNG ANH MỖI NGÀY — TRAVEL EDITION v2 (100% AI CHẤM • TÀI KHOẢN THẬT)
// =========================================================================
// Mã nguồn chỉ chỉnh sửa qua kho GitHub của chủ sở hữu.
// Không tạo tài khoản ảo/giả. Admin cố định: vanhung1155 / vanhung123456.

const ADMIN_CRED = { username: 'vanhung1155', pass: 'vanhung123456', accountCode: 'ADMIN-0001', name: 'Trần Văn Hùng (Admin)' };
const BANK_INFO = { bankCode: 'VPB', bankBin: '970432', bankName: 'VPBank', stk: '0779176786', owner: 'TRAN VAN HUNG', zalo: '0779176786' };
const PLAN_PRICES = { pro: { 1: 15000, 3: 45000, 6: 50000, 12: 80000 }, ultra: { 1: 30000, 3: 70000, 6: 90000, 12: 99000 } };

// Quy định chuẩn từng gói theo yêu cầu
const PLAN_LIMITS = {
  free:  { vocab: 30,       grammar: 3,        speaking: 3,        writing: 3,        canSkipRoadmap: false, canSkipWeekly: false, canLoungeCamMic: false },
  pro:   { vocab: Infinity, grammar: 15,       speaking: 15,       writing: 15,       canSkipRoadmap: true,  canSkipWeekly: false, canLoungeCamMic: false },
  ultra: { vocab: Infinity, grammar: Infinity, speaking: Infinity, writing: Infinity, canSkipRoadmap: true,  canSkipWeekly: true,  canLoungeCamMic: true  }
};

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
// LOGO & LINH VẬT HÀ MÃ MẶC ĐỒ BÒ SỮA (SVG)
// =========================================================================
function hippoCowSvg(cls = 'w-full h-full') {
  return `<svg viewBox="0 0 120 120" class="${cls}" xmlns="http://www.w3.org/2000/svg" aria-label="Logo Hà Mã Bò Sữa">
    <defs>
      <linearGradient id="hcBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e0f2fe"/><stop offset="100%" stop-color="#ccfbf1"/>
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#hcBg)" stroke="#0d9488" stroke-width="3"/>
    <ellipse cx="60" cy="95" rx="34" ry="22" fill="#ffffff" stroke="#1e293b" stroke-width="2.5"/>
    <circle cx="42" cy="94" r="6.5" fill="#1e293b"/>
    <circle cx="77" cy="98" r="5.5" fill="#1e293b"/>
    <ellipse cx="60" cy="105" rx="7" ry="4" fill="#1e293b"/>
    <path d="M35 28 Q28 16 38 15 Q42 20 42 28 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    <path d="M85 28 Q92 16 82 15 Q78 20 78 28 Z" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    <ellipse cx="26" cy="40" rx="11" ry="6.5" transform="rotate(-22 26 40)" fill="#ffffff" stroke="#1e293b" stroke-width="2.4"/>
    <ellipse cx="26" cy="40" rx="6" ry="3.2" transform="rotate(-22 26 40)" fill="#fda4af"/>
    <ellipse cx="94" cy="40" rx="11" ry="6.5" transform="rotate(22 94 40)" fill="#ffffff" stroke="#1e293b" stroke-width="2.4"/>
    <ellipse cx="94" cy="40" rx="6" ry="3.2" transform="rotate(22 94 40)" fill="#fda4af"/>
    <circle cx="60" cy="54" r="32" fill="#ffffff" stroke="#1e293b" stroke-width="2.6"/>
    <circle cx="43" cy="34" r="6" fill="#1e293b"/>
    <circle cx="79" cy="38" r="5" fill="#1e293b"/>
    <ellipse cx="60" cy="58" rx="25" ry="22" fill="#93c5fd" stroke="#1e3a8a" stroke-width="2"/>
    <circle cx="49" cy="51" r="4" fill="#0f172a"/><circle cx="47.8" cy="49.7" r="1.4" fill="#ffffff"/>
    <circle cx="71" cy="51" r="4" fill="#0f172a"/><circle cx="69.8" cy="49.7" r="1.4" fill="#ffffff"/>
    <ellipse cx="39" cy="59" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.6"/>
    <ellipse cx="81" cy="59" rx="4.5" ry="2.8" fill="#fb7185" opacity="0.6"/>
    <ellipse cx="60" cy="67" rx="19" ry="12" fill="#bfdbfe" stroke="#1e3a8a" stroke-width="2"/>
    <circle cx="52" cy="64" r="2.2" fill="#1e3a8a"/>
    <circle cx="68" cy="64" r="2.2" fill="#1e3a8a"/>
    <path d="M51 71 Q60 77 69 71" fill="none" stroke="#1e3a8a" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="60" cy="84" r="4.5" fill="#f59e0b" stroke="#92400e" stroke-width="1.6"/>
  </svg>`;
}

// =========================================================================
// SAFE STORAGE & GLOBAL STATE (ZERO FAKE ACCOUNTS)
// =========================================================================
function loadJson(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    if (!v) return fallback;
    const parsed = JSON.parse(v);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch { return fallback; }
}
function saveJson(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function fmtMmSsRange(s, e) {
  const f = (v) => {
    const sec = Math.max(0, Math.floor(Number(v) || 0));
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  };
  return (s > 0 || e > 0) ? `${f(s)} - ${f(e)}` : '';
}

function buildInitialListeningVideos() {
  const fromLnp = (typeof LNP_COMPACT_LISTENING !== 'undefined' && Array.isArray(LNP_COMPACT_LISTENING))
    ? LNP_COMPACT_LISTENING.map((it, idx) => ({
        id: it.id || ('lnp-yt-' + (idx + 1)),
        difficulty: idx + 10,
        cefr: (it.lv || 'B1').toUpperCase(),
        level: (it.lv || 'B1').toUpperCase(),
        category: it.cat || 'IELTS',
        title: it.t || 'Bài luyện nghe YouTube',
        uploader: 'Kho chuẩn Luyện Ngữ Pháp',
        sourceOrigin: 'lnp',
        verifiedByAi: true,
        youtubeId: it.yt || '',
        durationSeconds: Number(it.dur) || 90,
        viewCount: Number(it.vw) || 1200,
        img: it.yt ? `https://i.ytimg.com/vi/${it.yt}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        lines: (it.l || []).map(arr => ({
          en: arr[0] || '',
          vi: arr[1] || '',
          ipa: arr[2] || '',
          s: Number(arr[3]) || 0,
          e: Number(arr[4]) || 0,
          t: fmtMmSsRange(arr[3], arr[4])
        }))
      }))
    : [];

  const orig = LISTENING_VIDEOS.map((v, idx) => ({
    ...v,
    cefr: v.cefr || (String(v.level || 'A1').match(/A1|A2|B1|B2|C1|C2/)?.[0] || 'B1'),
    sourceOrigin: 'web',
    durationSeconds: v.durationSeconds || Math.max(45, (v.lines?.length || 4) * 9),
    viewCount: v.viewCount || (3200 - idx * 140),
    img: v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg` : v.img,
    lines: (v.lines || []).map((ln, li) => ({
      en: ln.en || '',
      vi: ln.vi || '',
      ipa: ln.ipa || '',
      s: ln.s || (li * 6),
      e: ln.e || ((li + 1) * 6),
      t: ln.t || fmtMmSsRange(li * 6, (li + 1) * 6)
    }))
  }));

  const userSaved = loadJson('tamn_user_listening_v1', []);
  return [...userSaved, ...fromLnp, ...orig];
}

function buildInitialReadingList() {
  const articles = (typeof LNP_BILINGUAL_ARTICLES !== 'undefined' && Array.isArray(LNP_BILINGUAL_ARTICLES))
    ? LNP_BILINGUAL_ARTICLES.map((a, idx) => ({
        id: a.id || ('lnp-art-' + (idx + 1)),
        difficulty: idx + 1,
        cefr: a.cefr || 'A2',
        targetBand: 'Đọc báo song ngữ',
        exam: 'ARTICLE',
        kind: 'article',
        topicTag: a.topicTag || 'Đời sống',
        level: `Báo song ngữ • ${a.cefr || 'A2'} • ${a.topicTag || 'Đời sống'}`,
        title: a.title,
        desc: a.desc || '',
        img: THEME_IMGS[idx % THEME_IMGS.length],
        paragraphs: a.paragraphs || [],
        questions: a.questions || []
      }))
    : [];

  const exams = READING_PASSAGES.map(r => ({
    ...r,
    kind: r.kind || 'exam',
    topicTag: r.topicTag || 'IELTS Reading'
  }));
  return [...articles, ...exams, ...loadJson('tamn_ai_reading_v1', [])];
}

const INITIAL_LISTENING_ALL = buildInitialListeningVideos();
const INITIAL_READING_ALL = buildInitialReadingList();
const INITIAL_SPEAKING_ALL = [...SPEAKING_TOPICS, ...loadJson('tamn_custom_speaking_v1', [])];

const state = {
  nav: 'home',
  drawerOpen: false,
  users: Array.isArray(loadJson('tamn_real_users_v1', [])) ? loadJson('tamn_real_users_v1', []) : [],
  currentUser: null,
  sessionUsername: localStorage.getItem('tamn_session_user_v1') || '',
  guestUsage: loadJson('tamn_guest_usage_v1', {}),
  // Billing & VietQR
  billingMonths: 1,
  activeOrder: null,
  orders: Array.isArray(loadJson('tamn_orders_v1', [])) ? loadJson('tamn_orders_v1', []) : [],
  adminMediaLessons: Array.isArray(loadJson('tamn_admin_media_v1', [])) ? loadJson('tamn_admin_media_v1', []) : [],
  settings: loadJson('tamn_settings_v1', { typingSound: true, animations: true }),
  // Device Cam & Mic permission status
  deviceCamOk: false,
  deviceMicOk: false,
  deviceGateSeen: sessionStorage.getItem('tamn_device_gate_seen') === '1',
  // Exam & Roadmaps
  selectedExam: localStorage.getItem('tamn_selected_exam_v1') || 'IELTS',
  progTab: 'IELTS',
  cefrFilter: 'ALL',
  roadmapQuery: '',
  roadmapPage: 1,
  openAtlasSlug: null,
  openAtlasPart: null,
  openCourseSlug: null,
  speakingDrafts: {},
  writingDrafts: {},
  examTimer: { running: false, remainingSec: 0, totalSec: 0, interval: null },
  _lastRenderedNav: '',

  // 1. LISTENING (100% LuyenNguPhap style: Browser + Mode Guide + Split Practice + 3 Dictation Levels + Shadowing + Quiz)
  listeningVideos: INITIAL_LISTENING_ALL,
  listeningView: 'browser', // 'browser' | 'practice'
  listeningId: INITIAL_LISTENING_ALL[0]?.id || 'ls-a1-1',
  listeningCefr: 'ALL',
  listeningCat: 'ALL',
  listeningDurFilter: 'ALL',
  listeningQuery: '',
  listeningPage: 1,
  listeningUploadOpen: false,
  listeningMode: 'dictation', // 'dictation' | 'pronunciation' | 'bilingual' | 'quiz'
  dictationDiff: 'medium', // 'easy' | 'medium' | 'hard'
  dictationHintCount: 0,
  dictationLineAnswers: loadJson('tamn_dict_answers_v1', {}),
  listeningLineIdx: 0,
  listeningSpeed: 1.0,
  listeningAutoPause: true,
  listeningHideVideo: false,
  listeningShowIpa: true,
  listeningShowVi: true,
  listeningSettingsOpen: false,
  listeningSplitPct: 48,
  dictationInput: '',
  dictationResult: null,
  pronResult: null,
  pronListening: false,
  pronRec: null,
  pronAudioUrl: '',
  pronMediaRecorder: null,
  listeningQuizAnswers: {},
  listeningQuizGraded: false,
  listeningUploadLog: '',
  lsYtPlayer: null,
  lsYtVideoId: '',
  lsSegTimer: null,

  // 2. SPEAKING (100% LuyenNguPhap style: 4:3 Topic Grid + AI Tutor Turn-by-Turn Feedback + Exam Prompt)
  speakingList: INITIAL_SPEAKING_ALL,
  speakingView: 'browser', // 'browser' | 'practice'
  speakingCefr: 'ALL',
  speakingPartFilter: 'ALL',
  speakingQuery: '',
  speakingPage: 1,
  speakingId: INITIAL_SPEAKING_ALL[0]?.id || SPEAKING_TOPICS[0].id,
  speakingMode: 'ai_chat', // 'ai_chat' | 'prompt'
  speakingSettingsOpen: false,
  speakingCustomModalOpen: false,
  speakingFeedbackLang: localStorage.getItem('tamn_sp_fb_lang') || 'vi', // 'vi' | 'en'
  speakingTutorStyle: localStorage.getItem('tamn_sp_style') || 'serious', // 'serious' | 'strict'
  speakingTutorSpeed: Number(localStorage.getItem('tamn_sp_speed') || 0.95),
  speakingOpenTurnPanel: {},
  speakingTranscript: '',
  speakingResult: null,
  speakingRec: null,
  speakingListening: false,
  speakingChatLog: {},
  speakingChatScore: null,

  // 3. WRITING
  writingList: WRITING_PROMPTS.concat(loadJson('tamn_ai_writing_v1', [])),
  writingCefr: 'ALL',
  writingQuery: '',
  writingPage: 1,
  writingId: WRITING_PROMPTS[0].id,
  writingText: '',
  writingResult: null,
  writingDrillPicked: {},

  // 4. READING (100% LuyenNguPhap style: Bilingual News + Exam Split-Pane + Sentence Toggle + Selection Highlight/Lookup)
  readingList: INITIAL_READING_ALL,
  readingView: 'browser', // 'browser' | 'practice'
  readingTab: 'all', // 'all' | 'article' | 'exam'
  readingCefr: 'ALL',
  readingTopicFilter: 'ALL',
  readingQuery: '',
  readingPage: 1,
  readingId: INITIAL_READING_ALL[0]?.id || READING_PASSAGES[0].id,
  readingMode: 'bilingual', // 'bilingual' | 'click_vi' | 'english'
  readingPracticeType: 'step', // 'step' | 'timed'
  readingFontSize: 15,
  readingSplitPct: 54,
  readingOpenSentences: {},
  readingFlaggedQs: {},
  readingHighlights: loadJson('tamn_reading_hl_v1', {}),
  readingAnswers: {},
  readingGraded: false,
  readingAiResult: null,

  // 5. GRAMMAR
  grammarId: GRAMMAR_LESSONS[0].id,
  grammarCefr: 'ALL',
  grammarQuery: '',
  grammarSetNo: 1,
  grammarActiveIds: null,
  grammarDoneIds: loadJson('tamn_grammar_done_ids_v1', {}),
  grammarAnswers: {},
  grammarGraded: false,
  grammarAiResult: null,

  // Weekly quiz & Games
  weeklyQuiz: { questions: [], idx: 0, score: 0, finished: false },
  excludedWords: loadJson('tamn_excluded_words_v1', {}),
  excludeMemorized: true,
  gmMode: 'roadmap',
  gmTrack: 'IELTS',
  gmCefr: 'ALL',
  gmTopicSlug: ATLAS_TOPICS[0].slug,
  gmPart: 1,
  gameSourceKey: `atlas:${ATLAS_TOPICS[0].slug}:1`,
  gmChecklistOpen: false,
  offlineBest: Number(localStorage.getItem('tvmn_preview_oq_best') || 0),
  gameMode: 'quiz',
  gameScore: 0,
  gameState: null,
  completedItems: { speaking: {}, writing: {}, reading: {}, listening: {} },
  lastSavedProgressAt: '',

  // 6. ÂM NHẠC (Multi-Source Real Search: Apple Music Audio + YouTube MV + 24/7 Radio + LRCLIB Lyrics + AI Translate)
  music: {
    playlist: loadJson('tamn_music_custom_v1', []).concat(MUSIC_CATALOG),
    favorites: loadJson('tamn_music_favs_v1', []),
    idx: 0,
    playing: false,
    engine: 'youtube', // 'audio' (direct HTML5 stream .m4a/.mp3) | 'youtube'
    currentTrack: null,
    volume: 75,
    tab: 'all', // 'all' | 'fav' | 'search'
    viewMode: 'video', // 'video' | 'audio_only'
    searchSource: 'all', // 'all' | 'itunes' | 'youtube' | 'radio'
    searchQuery: '',
    searchResults: [],
    liveLoading: false,
    showAiLyrics: true,
    fetchedLyrics: [],
    lyricsLoading: false,
    customLyricVi: '',
    aiReply: '🎵 Gõ tên bài hát hoặc ca sĩ bất kỳ (V-Pop, US-UK, K-Pop, Lofi, Piano...) để tìm & phát trực tuyến ngay!',
    ytPlayer: null,
    ytReady: false
  },

  // Lounge 1-1 & Duel
  loungePartner: null,
  loungeCamOn: false,
  loungeMicOn: false,
  localStream: null,
  loungeMsgs: [],
  duelSimulateDay1: false,
  duelOpponent: null,
  // Certificate & Admin & Hippo AI
  activeCert: null,
  certRaf: null,
  rafs: [],
  adminTab: 'users',
  adminSearchQuery: '',
  adminPlanFilter: 'ALL',
  adminStatusFilter: 'ALL',
  adminShowPass: {},
  adminCreateOpen: false,
  // Real-time Zero-Config Multi-Device Cloud Sync State
  cloud: {
    url: '',
    mode: 'auto', // 'auto' | 'firebase'
    status: 'syncing',
    lastSyncAt: '',
    lastError: '',
    timer: null,
    sse: null,
    cloudObjMap: loadJson('tamn_cloud_obj_map_v1', {})
  },
  hippoOpen: false,
  hippoMsgs: [
    { role: 'ai', text: 'Xin chào! Mình là Bé Hà Mã Bò Sữa AI 🐄🦛. Hệ thống đã đồng bộ tài khoản Cloud tự động, nâng cấp Luyện Nghe (250+ video) • Luyện Nói • Luyện Đọc chuẩn Luyện Ngữ Pháp và mục Âm Nhạc tìm bài hát trực tuyến!' }
  ]
};

// =========================================================================
// SOFT UNIQUE PER-KEY TYPING SOUND (WEB AUDIO API)
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
    const freq = Math.max(220, baseFreq + (((code * 13) % 19) - 9));
    const now = _keyAudioCtx.currentTime;
    const osc = _keyAudioCtx.createOscillator();
    const gain = _keyAudioCtx.createGain();
    osc.type = (code % 2 === 0) ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.92, now + 0.055);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.025, now + 0.008);
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

document.addEventListener('pointermove', (e) => {
  const box = e.target.closest?.('.hover-box');
  if (!box) return;
  const r = box.getBoundingClientRect();
  box.style.setProperty('--mx', Math.round(e.clientX - r.left) + 'px');
  box.style.setProperty('--my', Math.round(e.clientY - r.top) + 'px');
}, { passive: true });

// =========================================================================
// CAMERA & MICRO PERMISSION GATE ON WEB ENTRY
// =========================================================================
function openDeviceGate() {
  const modal = document.getElementById('device-gate-modal');
  if (!modal) return;
  updateDeviceGateUi();
  updateCloudPillUi();
  modal.classList.remove('hidden');
}

function dismissDeviceGate() {
  state.deviceGateSeen = true;
  sessionStorage.setItem('tamn_device_gate_seen', '1');
  closeModal('device-gate-modal');
}

function updateDeviceGateUi() {
  const st = document.getElementById('device-gate-status');
  const pill = document.getElementById('top-device-pill');
  if (st) {
    st.innerHTML = `🎥 Camera: <strong class="${state.deviceCamOk?'text-emerald-600':'text-amber-700'}">${state.deviceCamOk?'Đã bật ✓':'Chưa bật'}</strong> • 🎙️ Micro: <strong class="${state.deviceMicOk?'text-emerald-600':'text-amber-700'}">${state.deviceMicOk?'Đã bật ✓':'Chưa bật'}</strong>`;
  }
  if (pill) {
    if (state.deviceCamOk && state.deviceMicOk) {
      pill.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold cursor-pointer transition';
      pill.innerHTML = '<span>🟢</span><span>Cam & Mic: Bật</span>';
    } else if (state.deviceMicOk) {
      pill.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 text-[11px] font-bold cursor-pointer transition';
      pill.innerHTML = '<span>🎙️</span><span>Mic: Bật</span>';
    } else {
      pill.className = 'hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-bold cursor-pointer transition';
      pill.innerHTML = '<span>🎥🎙️</span><span>Bật Cam/Mic</span>';
    }
  }
}

async function requestWebCamMic() {
  if (!navigator.mediaDevices?.getUserMedia) {
    notify('⚠️ Trình duyệt chỉ cho bật Cam/Mic qua HTTPS (như link GitHub Pages) hoặc localhost.');
    dismissDeviceGate();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    state.deviceCamOk = stream.getVideoTracks().length > 0;
    state.deviceMicOk = stream.getAudioTracks().length > 0;
    stream.getTracks().forEach(t => { try { t.stop(); } catch {} });
    updateDeviceGateUi();
    dismissDeviceGate();
    notify('✅ Đã cấp quyền Camera & Micro! Sẵn sàng Luyện Nghe, Luyện Nói AI và Giao lưu 1-1.');
  } catch {
    try {
      const audStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      state.deviceMicOk = audStream.getAudioTracks().length > 0;
      audStream.getTracks().forEach(t => { try { t.stop(); } catch {} });
      updateDeviceGateUi();
      dismissDeviceGate();
      notify('🎙️ Đã bật Micro thành công (không phát hiện Camera trên thiết bị này).');
    } catch {
      updateDeviceGateUi();
      notify('⚠️ Bạn chưa cho phép Cam/Mic — hãy bấm biểu tượng ổ khóa trên thanh địa chỉ trình duyệt để Cho phép.');
    }
  }
}

// =========================================================================
// PLAN QUOTA & DAILY LIMIT ENFORCEMENT (FREE / PRO / ULTRA)
// =========================================================================
function fmtVnd(n) { return Number(n || 0).toLocaleString('vi-VN') + 'đ'; }
// =========================================================================
// LƯU TRỮ BỀN VỮNG TK / MK / ID (LOCALSTORAGE + INDEXEDDB + COOKIE)
// Thoát web hay đóng trình duyệt vào lại vẫn giữ nguyên tài khoản & đăng nhập được!
// =========================================================================
function setSessionCookie(val) {
  try {
    const exp = new Date(Date.now() + 365 * 86400000).toUTCString();
    document.cookie = `tamn_session_user=${encodeURIComponent(val || '')}; expires=${exp}; path=/; SameSite=Lax`;
  } catch {}
}
function getSessionCookie() {
  try {
    const m = document.cookie.match(/(?:^|;\s*)tamn_session_user=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : '';
  } catch { return ''; }
}
function openUserVaultDb() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(new Error('no_idb'));
    const req = indexedDB.open('TAMN_UserVault_DB', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function backupVaultAsync() {
  openUserVaultDb().then(db => {
    const tx = db.transaction('kv', 'readwrite');
    const st = tx.objectStore('kv');
    st.put(state.users, 'users');
    st.put(state.sessionUsername || '', 'session');
    st.put(state.orders, 'orders');
  }).catch(() => {});
}
function hydrateVaultAsync() {
  openUserVaultDb().then(db => {
    const tx = db.transaction('kv', 'readonly');
    const st = tx.objectStore('kv');
    const rU = st.get('users');
    const rS = st.get('session');
    const rO = st.get('orders');
    rU.onsuccess = () => {
      const vaultUsers = Array.isArray(rU.result) ? rU.result : [];
      if (vaultUsers.length) {
        const merged = new Map();
        vaultUsers.forEach(u => merged.set(u.accountCode || u.username, u));
        state.users.forEach(u => merged.set(u.accountCode || u.username, u));
        state.users = Array.from(merged.values());
        saveJson('tamn_real_users_v1', state.users);
      }
      rS.onsuccess = () => {
        const sessFromVault = rS.result || getSessionCookie();
        if (!state.sessionUsername && sessFromVault) {
          state.sessionUsername = sessFromVault;
          localStorage.setItem('tamn_session_user_v1', sessFromVault);
        }
        rO.onsuccess = () => {
          if (Array.isArray(rO.result) && rO.result.length && !state.orders.length) {
            state.orders = rO.result;
            saveJson('tamn_orders_v1', state.orders);
          }
          restoreSession();
          deduplicateExistingUserIds();
          syncTopRankRewards();
          const pKey = getProgressStorageKey();
          const rProg = st.get(pKey);
          rProg.onsuccess = () => {
            if (!loadJson(pKey, null) && rProg.result) {
              applyProgressSnapshot(rProg.result);
              saveJson(pKey, rProg.result);
            }
            render();
          };
        };
      };
    };
  }).catch(() => {});
}
function saveUsers() {
  saveJson('tamn_real_users_v1', state.users);
  if (state.sessionUsername) {
    localStorage.setItem('tamn_session_user_v1', state.sessionUsername);
    setSessionCookie(state.sessionUsername);
  }
  backupVaultAsync();
}
function pctToIeltsBand(pct) {
  const c = Math.max(0, Math.min(100, Number(pct) || 0));
  if (c === 0) return '0.0';
  const raw = 1.0 + (c / 100) * 8.0;
  return (Math.round(raw * 2) / 2).toFixed(1);
}

// =========================================================================
// ĐỒNG BỘ ĐÁM MÂY TỰ ĐỘNG THỜI GIAN THỰC LAPTOP ↔ ĐIỆN THOẠI (ZERO-CONFIG CLOUD V12)
// Hoạt động TỰ ĐỘNG 100% ngay khi mở web (không cần tự tạo Firebase!) + Hỗ trợ SSE 0.3s!
// =========================================================================
function normalizeFirebaseUrl(raw) {
  let u = String(raw || '').trim();
  if (!u) return '';
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  u = u.replace(/\/+$/, '');
  return u;
}

function getActiveCloudDbUrl() {
  const fromConfig = normalizeFirebaseUrl(window.TAMN_CLOUD_CONFIG && window.TAMN_CLOUD_CONFIG.firebaseDbUrl);
  const fromLocal = normalizeFirebaseUrl(localStorage.getItem('tamn_cloud_db_url_v1') || '');
  return fromConfig || fromLocal || '';
}

function isAutoCloudReady() {
  const cfg = window.TAMN_CLOUD_CONFIG || {};
  return Boolean(cfg.autoCloudEnabled !== false && cfg.autoCloudMasterId);
}

function isCloudEnabled() {
  return Boolean(getActiveCloudDbUrl() || isAutoCloudReady());
}

function getDeletedUserCodes() {
  const arr = loadJson('tamn_deleted_codes_v1', []);
  return new Set(Array.isArray(arr) ? arr : []);
}

function addDeletedUserCode(code) {
  if (!code) return;
  const set = getDeletedUserCodes();
  set.add(String(code).toUpperCase());
  saveJson('tamn_deleted_codes_v1', Array.from(set));
}

function safeFbKey(key) {
  return String(key || '').replace(/[.#$\[\]\/]/g, '_');
}

function updateCloudPillUi() {
  const pill = document.getElementById('top-cloud-pill');
  if (!pill) return;
  if (!isCloudEnabled()) {
    pill.className = 'inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-[10px] sm:text-[11px] font-bold cursor-pointer transition';
    pill.innerHTML = '<span>⚠️</span><span class="sm:hidden">Cục bộ</span><span class="hidden sm:inline">Chưa liên kết Cloud</span>';
    return;
  }
  if (state.cloud.status === 'connected') {
    pill.className = 'inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] sm:text-[11px] font-bold cursor-pointer transition';
    pill.innerHTML = `<span>🟢</span><span class="sm:hidden">Cloud (${state.users.length})</span><span class="hidden sm:inline">Cloud Tự Động (${state.users.length} TK)</span>`;
  } else if (state.cloud.status === 'syncing') {
    pill.className = 'inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 text-[10px] sm:text-[11px] font-bold cursor-pointer transition';
    pill.innerHTML = '<span>🔄</span><span class="hidden sm:inline">Đang đồng bộ...</span>';
  } else {
    pill.className = 'inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-[10px] sm:text-[11px] font-bold cursor-pointer transition';
    pill.innerHTML = '<span>☁️</span><span class="sm:hidden">Thử lại</span><span class="hidden sm:inline">Bấm đồng bộ lại</span>';
  }
}

function onCloudPillClick() {
  if (isAdmin()) {
    state.adminTab = 'cloud';
    go('admin');
    syncCloudAll(true);
  } else {
    syncCloudAll(true);
  }
}

async function fbRequest(path, method = 'GET', bodyObj = null) {
  const base = getActiveCloudDbUrl();
  if (!base) return null;
  const url = `${base}/tamn_v9/${path}.json`;
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (bodyObj !== null && method !== 'GET') opts.body = JSON.stringify(bodyObj);
  const ctrl = new AbortController();
  const tm = setTimeout(() => ctrl.abort(), 7000);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    clearTimeout(tm);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(tm);
    throw err;
  }
}

// Compact serializer for Auto Cloud per-user objects (~260 bytes each -> zero size limit issues!)
function compactUserForAutoCloud(u) {
  return {
    i: u.id || Date.now(),
    u: String(u.username || '').trim().toLowerCase(),
    n: String(u.name || '').trim().slice(0, 40),
    c: String(u.accountCode || '').toUpperCase(),
    p: String(u.password || ''),
    h: u.passwordNeedsHydrate ? 1 : 0,
    t: u.planTier || 'free',
    ag: u.adminGrantedPlan || ((u.planTier === 'pro' || u.planTier === 'ultra') ? u.planTier : ''),
    s: u.status || 'active',
    st: Number(u.streak || 0),
    co: Number(u.coins || 0),
    gp: Number(u.grindPts || 0),
    em: String(u.email || '').slice(0, 45),
    ph: String(u.phone || '').slice(0, 18),
    pv: String(u.provider || 'Web').slice(0, 20),
    wk: String(u.weeklyQuizDone || ''),
    dt: String(u.createdAt || '26/11/2026'),
    ts: Number(u.updatedAt || Date.now())
  };
}

function expandUserFromAutoCloud(d) {
  if (!d || !d.u || !d.c) return null;
  const tier = d.t || 'free';
  const granted = d.ag || ((tier === 'pro' || tier === 'ultra') ? tier : null);
  return {
    id: Number(d.i) || (Date.now() + Math.floor(Math.random() * 999)),
    accountCode: String(d.c).toUpperCase(),
    username: String(d.u).trim().toLowerCase(),
    name: d.n || d.u,
    email: d.em || '',
    phone: d.ph || '',
    password: d.p || d.u,
    passwordNeedsHydrate: Boolean(d.h),
    provider: d.pv || 'Tài khoản Web',
    isAdmin: false,
    role: 'user',
    planTier: tier,
    basePlanTier: tier,
    adminGrantedPlan: granted,
    topRank: 0,
    ultraFromTop: false,
    streak: Number(d.st || 0),
    coins: Number(d.co || 0),
    elo: 1000,
    grindPts: Number(d.gp || 0),
    color: '#0d9488',
    avatar: '',
    status: d.s || 'active',
    selectedExam: 'IELTS',
    gmailVerified: Boolean(d.em),
    phoneVerified: Boolean(d.ph),
    weeklyQuizDone: d.wk || '',
    dailyUsage: { date: getTodayKey(), vocab: 0, grammar: 0, speaking: 0, writing: 0 },
    completedAtlasParts: {},
    completedCourseLessons: {},
    roadmapStartDates: {},
    personalWords: [],
    createdAt: d.dt || '26/11/2026',
    updatedAt: Number(d.ts || 0)
  };
}

const CLIENT_INSTANCE_ID = Math.random().toString(36).slice(2, 10);

async function autoCloudReq(url, method = 'GET', bodyObj = null) {
  const ctrl = new AbortController();
  const tm = setTimeout(() => ctrl.abort(), 8000);
  try {
    const opts = { method, headers: {} };
    if (bodyObj !== null && method !== 'GET') {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(bodyObj);
    }
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    clearTimeout(tm);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    clearTimeout(tm);
    throw e;
  }
}

async function broadcastRealtimeSyncSignal(extraSnap = null) {
  const cfg = window.TAMN_CLOUD_CONFIG || {};
  try {
    if (cfg.snapshotTopic) {
      const compactPayload = {
        sender: CLIENT_INSTANCE_ID,
        ts: Date.now(),
        users: state.users.map(compactUserForAutoCloud),
        del: Array.from(getDeletedUserCodes()),
        orders: state.orders.slice(0, 35)
      };
      fetch(`https://ntfy.sh/${cfg.snapshotTopic}`, {
        method: 'POST',
        body: JSON.stringify(compactPayload)
      }).catch(() => {});
    }
    if (cfg.realtimePushTopic) {
      fetch(`https://ntfy.sh/${cfg.realtimePushTopic}`, {
        method: 'POST',
        body: JSON.stringify({ sender: CLIENT_INSTANCE_ID, ts: Date.now(), count: state.users.length, snap: extraSnap || null })
      }).catch(() => {});
    }
  } catch {}
}

async function upsertAutoCloudSingleUser(u) {
  if (!isAutoCloudReady() || !u || !u.accountCode || u.isAdmin) return;
  const cfg = window.TAMN_CLOUD_CONFIG;
  const base = cfg.autoCloudApiBase || 'https://api.restful-api.dev/objects';
  const masterId = cfg.autoCloudMasterId;
  try {
    // 1. Read latest master map
    const master = await autoCloudReq(`${base}/${masterId}`, 'GET');
    const mData = (master && master.data) || {};
    const mapObj = mData.map ? JSON.parse(mData.map) : {};
    const code = String(u.accountCode).toUpperCase();
    const compact = compactUserForAutoCloud(u);

    if (mapObj[code]) {
      await autoCloudReq(`${base}/${mapObj[code]}`, 'PUT', { name: `tamn_u_${code}`, data: compact });
    } else {
      const created = await autoCloudReq(base, 'POST', { name: `tamn_u_${code}`, data: compact });
      if (created && created.id) {
        mapObj[code] = created.id;
        await autoCloudReq(`${base}/${masterId}`, 'PUT', {
          name: 'tamn_master_v12',
          data: { v: 12, map: JSON.stringify(mapObj), del: mData.del || '', ord: mData.ord || '' }
        });
      }
    }
    state.cloud.cloudObjMap = mapObj;
    saveJson('tamn_cloud_obj_map_v1', mapObj);
  } catch {}
}

async function pushSingleUserToCloud(u) {
  if (!isCloudEnabled() || !u || !u.accountCode || u.isAdmin) return;
  u.updatedAt = Date.now();
  u.passwordNeedsHydrate = false;
  try {
    if (getActiveCloudDbUrl()) {
      const k = safeFbKey(u.accountCode);
      await fbRequest(`users/${k}`, 'PUT', u);
      await fbRequest(`usedIds/${k}`, 'PUT', true);
    }
    if (isAutoCloudReady()) {
      await upsertAutoCloudSingleUser(u);
    }
    broadcastRealtimeSyncSignal();
    state.cloud.status = 'connected';
    state.cloud.lastSyncAt = new Date().toLocaleTimeString('vi-VN');
    state.cloud.lastError = '';
    updateCloudPillUi();
  } catch (e) {
    broadcastRealtimeSyncSignal();
  }
}

async function pushDeleteUserToCloud(accountCode) {
  if (!isCloudEnabled() || !accountCode) return;
  const code = String(accountCode).toUpperCase();
  try {
    if (getActiveCloudDbUrl()) {
      const k = safeFbKey(code);
      await fbRequest(`deletedUsers/${k}`, 'PUT', true);
      await fbRequest(`users/${k}`, 'DELETE');
    }
    if (isAutoCloudReady()) {
      const cfg = window.TAMN_CLOUD_CONFIG;
      const base = cfg.autoCloudApiBase || 'https://api.restful-api.dev/objects';
      const master = await autoCloudReq(`${base}/${cfg.autoCloudMasterId}`, 'GET');
      const mData = (master && master.data) || {};
      const mapObj = mData.map ? JSON.parse(mData.map) : {};
      delete mapObj[code];
      const delArr = Array.from(new Set([...(mData.del ? mData.del.split(',').filter(Boolean) : []), code]));
      await autoCloudReq(`${base}/${cfg.autoCloudMasterId}`, 'PUT', {
        name: 'tamn_master_v12',
        data: { v: 12, map: JSON.stringify(mapObj), del: delArr.join(','), ord: mData.ord || '' }
      });
    }
    broadcastRealtimeSyncSignal();
  } catch {}
}

async function pushOrderToCloud(ord) {
  if (!isCloudEnabled() || !ord || !ord.code) return;
  ord.updatedAt = Date.now();
  try {
    if (getActiveCloudDbUrl()) {
      await fbRequest(`orders/${safeFbKey(ord.code)}`, 'PUT', ord);
    }
    broadcastRealtimeSyncSignal();
  } catch {}
}

let _cloudProgTm = null;
function pushProgressToCloudDebounced(snap) {
  if (!getActiveCloudDbUrl() || !state.currentUser || !snap) return;
  const k = safeFbKey(state.currentUser.accountCode);
  clearTimeout(_cloudProgTm);
  _cloudProgTm = setTimeout(() => {
    fbRequest(`progress/${k}`, 'PUT', { ...snap, updatedAtMs: Date.now() }).catch(() => {});
  }, 1100);
}

async function pullProgressFromCloudForCurrentUser() {
  if (!getActiveCloudDbUrl() || !state.currentUser) return false;
  try {
    const k = safeFbKey(state.currentUser.accountCode);
    const remote = await fbRequest(`progress/${k}`, 'GET');
    if (!remote || typeof remote !== 'object') return false;
    const localKey = getProgressStorageKey();
    const localSnap = loadJson(localKey, null);
    const localTs = (localSnap && localSnap.updatedAtMs) || 0;
    const remoteTs = remote.updatedAtMs || 0;
    if (!localSnap || remoteTs > localTs) {
      applyProgressSnapshot(remote);
      saveJson(localKey, remote);
      return true;
    }
  } catch {}
  return false;
}

async function fetchAutoCloudDataset() {
  const cfg = window.TAMN_CLOUD_CONFIG || {};
  const base = cfg.autoCloudApiBase || 'https://api.restful-api.dev/objects';
  const masterId = cfg.autoCloudMasterId;
  const outUsers = {};
  const outDel = {};
  const outOrders = {};
  let mapObj = {};

  // Source A: Permanent Cloud Registry (restful-api.dev)
  try {
    const master = await autoCloudReq(`${base}/${masterId}`, 'GET');
    const mData = (master && master.data) || {};
    mapObj = mData.map ? JSON.parse(mData.map) : {};
    (mData.del || '').split(',').filter(Boolean).forEach(c => { outDel[c.toUpperCase()] = true; });
    const ids = Object.values(mapObj).filter(Boolean);
    for (let i = 0; i < ids.length; i += 20) {
      const batch = ids.slice(i, i + 20);
      const qs = batch.map(id => `id=${encodeURIComponent(id)}`).join('&');
      const arr = await autoCloudReq(`${base}?${qs}`, 'GET');
      if (Array.isArray(arr)) {
        arr.forEach(item => {
          const u = expandUserFromAutoCloud(item && item.data);
          if (u && u.accountCode) outUsers[u.accountCode] = u;
        });
      }
    }
  } catch {}

  // Source B: Live Snapshot Channel (ntfy.sh cached messages) for instant orders & extra resilience
  if (cfg.snapshotTopic) {
    try {
      const ctrl = new AbortController();
      const tm = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(`https://ntfy.sh/${cfg.snapshotTopic}/json?poll=1&since=all`, { signal: ctrl.signal });
      clearTimeout(tm);
      if (res.ok) {
        const text = await res.text();
        const lines = text.trim().split('\n').filter(Boolean);
        lines.forEach(line => {
          try {
            const ev = JSON.parse(line);
            if (ev.event !== 'message' || !ev.message) return;
            const snap = JSON.parse(ev.message);
            if (Array.isArray(snap.del)) snap.del.forEach(c => { outDel[String(c).toUpperCase()] = true; });
            if (Array.isArray(snap.orders)) snap.orders.forEach(o => { if (o && o.code) outOrders[o.code] = o; });
            if (Array.isArray(snap.users)) {
              snap.users.forEach(cuRaw => {
                const u = expandUserFromAutoCloud(cuRaw);
                if (!u) return;
                const prev = outUsers[u.accountCode];
                if (!prev || (u.updatedAt || 0) > (prev.updatedAt || 0) || (prev.passwordNeedsHydrate && !u.passwordNeedsHydrate)) {
                  outUsers[u.accountCode] = u;
                }
              });
            }
          } catch {}
        });
      }
    } catch {}
  }

  return { users: outUsers, deletedUsers: outDel, orders: outOrders, mapObj };
}

let _syncInFlight = false;
async function syncCloudAll(showToast = false) {
  const fbBase = getActiveCloudDbUrl();
  state.cloud.url = fbBase;
  if (!isCloudEnabled()) {
    state.cloud.status = 'offline';
    updateCloudPillUi();
    return false;
  }
  if (_syncInFlight) return false;
  _syncInFlight = true;
  state.cloud.status = 'syncing';
  updateCloudPillUi();

  try {
    let cloudUsersObj = {};
    let cloudDelObj = {};
    let cloudOrdersObj = {};
    let cloudUsedIdsObj = {};
    let autoMapObj = {};

    if (isAutoCloudReady()) {
      const autoData = await fetchAutoCloudDataset();
      Object.assign(cloudUsersObj, autoData.users);
      Object.assign(cloudDelObj, autoData.deletedUsers);
      Object.assign(cloudOrdersObj, autoData.orders);
      autoMapObj = autoData.mapObj || {};
    }

    if (fbBase) {
      const root = await fbRequest('', 'GET');
      if (root && typeof root === 'object') {
        Object.assign(cloudUsersObj, root.users || {});
        Object.assign(cloudDelObj, root.deletedUsers || {});
        Object.assign(cloudOrdersObj, root.orders || {});
        Object.assign(cloudUsedIdsObj, root.usedIds || {});
      }
    }

    // 1. Merge deleted user tombstones
    const delSet = getDeletedUserCodes();
    Object.keys(cloudDelObj).forEach(k => { if (cloudDelObj[k]) delSet.add(k.toUpperCase()); });
    saveJson('tamn_deleted_codes_v1', Array.from(delSet));

    // 2. Merge used IDs
    const usedIds = getUsedAccountCodesSet();
    Object.keys(cloudUsedIdsObj).forEach(k => { if (cloudUsedIdsObj[k]) usedIds.add(k.toUpperCase()); });

    // 3. Merge Users safely by username (auto-separating colliding codes + hydrating real local passwords!)
    const byUsername = new Map();
    const byCode = new Map();
    const toPushList = [];

    Object.values(cloudUsersObj).forEach(cu => {
      if (!cu || !cu.accountCode || !cu.username) return;
      const code = String(cu.accountCode).toUpperCase();
      const uname = String(cu.username).trim().toLowerCase();
      if (delSet.has(code)) return;
      byUsername.set(uname, cu);
      byCode.set(code, cu);
      usedIds.add(code);
    });

    let changedLocal = false;
    state.users.forEach(lu => {
      if (!lu || !lu.username) return;
      const uname = String(lu.username).trim().toLowerCase();
      let code = String(lu.accountCode || '').toUpperCase();
      if (code && delSet.has(code) && !byUsername.has(uname)) { changedLocal = true; return; }

      const existingSameUser = byUsername.get(uname);
      if (existingSameUser) {
        const lTs = Number(lu.updatedAt || 0);
        const cTs = Number(existingSameUser.updatedAt || 0);
        const localHasRealPw = Boolean(lu.password && !lu.passwordNeedsHydrate);
        const cloudNeedsPw = Boolean(existingSameUser.passwordNeedsHydrate);

        // Preserve highest granted plan unless explicitly changed more recently
        const rankPlan = p => (p === 'ultra' ? 2 : p === 'pro' ? 1 : 0);
        const bestPlan = lTs > cTs
          ? (lu.planTier || 'free')
          : (cTs > lTs ? (existingSameUser.planTier || 'free') : (rankPlan(lu.planTier) >= rankPlan(existingSameUser.planTier) ? lu.planTier : existingSameUser.planTier));

        const merged = {
          ...existingSameUser,
          ...lu,
          accountCode: existingSameUser.accountCode,
          password: (cloudNeedsPw && localHasRealPw) ? lu.password : (lTs > cTs ? lu.password : existingSameUser.password),
          passwordNeedsHydrate: (cloudNeedsPw && localHasRealPw) ? false : (lTs > cTs ? false : Boolean(existingSameUser.passwordNeedsHydrate)),
          planTier: bestPlan,
          basePlanTier: bestPlan,
          adminGrantedPlan: (bestPlan === 'pro' || bestPlan === 'ultra') ? bestPlan : null,
          status: lTs > cTs ? (lu.status || 'active') : (existingSameUser.status || 'active'),
          streak: Math.max(Number(lu.streak || 0), Number(existingSameUser.streak || 0)),
          coins: Math.max(Number(lu.coins || 0), Number(existingSameUser.coins || 0)),
          grindPts: Math.max(Number(lu.grindPts || 0), Number(existingSameUser.grindPts || 0)),
          updatedAt: Math.max(lTs, cTs)
        };

        byUsername.set(uname, merged);
        byCode.set(String(merged.accountCode).toUpperCase(), merged);
        usedIds.add(String(merged.accountCode).toUpperCase());

        if ((cloudNeedsPw && localHasRealPw) || lTs > cTs) {
          merged.updatedAt = Date.now();
          toPushList.push(merged);
        }
        if (lu.accountCode !== merged.accountCode || lu.planTier !== merged.planTier) {
          changedLocal = true;
        }
      } else {
        if (!code || byCode.has(code) || usedIds.has(code)) {
          const oldCode = code;
          code = generateUniqueAccountCode();
          lu.accountCode = code;
          changedLocal = true;
          if (state.currentUser && state.currentUser.username === uname) state.currentUser.accountCode = code;
          state.orders.forEach(o => { if (o && o.memo === oldCode && o.userName === lu.name) o.memo = code; });
        }
        lu.updatedAt = lu.updatedAt || Date.now();
        lu.passwordNeedsHydrate = false;
        byUsername.set(uname, lu);
        byCode.set(code, lu);
        toPushList.push(lu);
        usedIds.add(code);
      }
    });

    const prevCount = state.users.length;
    const prevJson = JSON.stringify(state.users);
    state.users = Array.from(byUsername.values());
    saveJson('tamn_used_ids_v1', Array.from(usedIds));

    // Push any local-only or password-hydrated users up to Auto Cloud & Firebase
    if (toPushList.length) {
      if (fbBase) {
        const fbPatch = {};
        const fbIds = {};
        toPushList.forEach(u => { fbPatch[safeFbKey(u.accountCode)] = u; fbIds[safeFbKey(u.accountCode)] = true; });
        await fbRequest('users', 'PATCH', fbPatch).catch(() => {});
        await fbRequest('usedIds', 'PATCH', fbIds).catch(() => {});
      }
      if (isAutoCloudReady()) {
        for (const u of toPushList) {
          await upsertAutoCloudSingleUser(u);
        }
      }
      broadcastRealtimeSyncSignal();
    }

    // 4. Merge VietQR Orders
    const ordMap = new Map();
    const toPushOrders = {};
    Object.values(cloudOrdersObj).forEach(co => { if (co && co.code) ordMap.set(co.code, co); });
    state.orders.forEach(lo => {
      if (!lo || !lo.code) return;
      const co = ordMap.get(lo.code);
      if (!co || (lo.updatedAt || 0) > (co.updatedAt || 0)) {
        lo.updatedAt = lo.updatedAt || Date.now();
        ordMap.set(lo.code, lo);
        toPushOrders[safeFbKey(lo.code)] = lo;
      }
    });
    state.orders = Array.from(ordMap.values()).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    saveJson('tamn_orders_v1', state.orders);
    if (fbBase && Object.keys(toPushOrders).length) {
      await fbRequest('orders', 'PATCH', toPushOrders).catch(() => {});
    }

    // Refresh currentUser by username OR accountCode
    if (state.currentUser && !state.currentUser.isAdmin) {
      const fresh = state.users.find(u =>
        u.username.toLowerCase() === state.currentUser.username.toLowerCase() ||
        u.accountCode === state.currentUser.accountCode
      );
      if (!fresh || fresh.status === 'banned' || fresh.status === 'locked') {
        notify('🔒 Trạng thái tài khoản của bạn vừa được Admin cập nhật.');
        logoutUser();
      } else {
        state.currentUser = fresh;
      }
    }

    syncTopRankRewards();
    saveJson('tamn_real_users_v1', state.users);
    backupVaultAsync();

    const progUpdated = await pullProgressFromCloudForCurrentUser();

    state.cloud.status = 'connected';
    state.cloud.lastSyncAt = new Date().toLocaleTimeString('vi-VN');
    state.cloud.lastError = '';
    updateCloudPillUi();

    const nowJson = JSON.stringify(state.users);
    const dataChanged = (nowJson !== prevJson) || (state.users.length !== prevCount) || changedLocal || progUpdated;
    if (showToast) {
      notify(`🟢 Đồng bộ Đám Mây thành công! Hiện có ${state.users.length} tài khoản dùng chung trên Laptop & Điện thoại.`);
    }
    if (dataChanged) {
      if (state.nav === 'admin' && state.adminTab === 'users' && document.getElementById('adm-users-list')) {
        renderAdminUsersListOnly();
        syncChromeUi();
      } else {
        render();
      }
    }
    _syncInFlight = false;
    return true;
  } catch (err) {
    state.cloud.status = 'error';
    state.cloud.lastError = String(err.message || err);
    updateCloudPillUi();
    _syncInFlight = false;
    return false;
  }
}

function startRealtimeCloudSse() {
  const cfg = window.TAMN_CLOUD_CONFIG || {};
  if (!cfg.realtimePushTopic || typeof EventSource === 'undefined') return;
  if (state.cloud.sse) { try { state.cloud.sse.close(); } catch {} state.cloud.sse = null; }
  try {
    const es = new EventSource(`https://ntfy.sh/${cfg.realtimePushTopic}/sse`);
    es.onmessage = (ev) => {
      try {
        const d = JSON.parse(ev.data);
        const msg = d.message ? JSON.parse(d.message) : d;
        if (msg && msg.sender && msg.sender !== CLIENT_INSTANCE_ID) {
          syncCloudAll(false);
        }
      } catch {
        syncCloudAll(false);
      }
    };
    state.cloud.sse = es;
  } catch {}
}

function startCloudAutoSyncLoop() {
  if (state.cloud.timer) clearInterval(state.cloud.timer);
  state.cloud.url = getActiveCloudDbUrl();
  updateCloudPillUi();
  if (!isCloudEnabled()) return;
  syncCloudAll(false);
  startRealtimeCloudSse();
  const ms = Math.max(5000, Number(window.TAMN_CLOUD_CONFIG && window.TAMN_CLOUD_CONFIG.syncIntervalMs) || 7000);
  state.cloud.timer = setInterval(() => {
    if (document.visibilityState === 'visible') syncCloudAll(false);
  }, ms);
}

window.addEventListener('focus', () => {
  if (isCloudEnabled()) syncCloudAll(false);
});


// =========================================================================
// MÃ ID TÀI KHOẢN DUY NHẤT KHÔNG BAO GIỜ TRÙNG LẶP (KỂ CẢ KHI XÓA ACC)
// =========================================================================
function getUsedAccountCodesSet() {
  const stored = loadJson('tamn_used_ids_v1', []);
  const set = new Set(Array.isArray(stored) ? stored : []);
  state.users.forEach(u => { if (u && u.accountCode) set.add(String(u.accountCode).toUpperCase()); });
  set.add(ADMIN_CRED.accountCode);
  return set;
}

function generateUniqueAccountCode() {
  const used = getUsedAccountCodesSet();
  let code = '';
  for (let attempt = 0; attempt < 200; attempt++) {
    // Kết hợp 3 chữ số thời gian + 4 chữ số ngẫu nhiên an toàn (crypto nếu có) -> 7 chữ số không trùng
    let randPart = Math.floor(1000 + Math.random() * 9000);
    try {
      if (window.crypto && window.crypto.getRandomValues) {
        const buf = new Uint32Array(1);
        window.crypto.getRandomValues(buf);
        randPart = 1000 + (buf[0] % 9000);
      }
    } catch {}
    const timePart = String((Date.now() + attempt * 17) % 1000).padStart(3, '0');
    code = `TAMN-${timePart}${randPart}`;
    if (!used.has(code)) break;
  }
  while (used.has(code)) {
    code = `TAMN-${Date.now().toString(36).toUpperCase()}${Math.floor(10 + Math.random() * 89)}`;
  }
  used.add(code);
  saveJson('tamn_used_ids_v1', Array.from(used));
  return code;
}

function deduplicateExistingUserIds() {
  const seen = new Set([ADMIN_CRED.accountCode]);
  let changed = false;
  state.users.forEach(u => {
    const c = String(u.accountCode || '').toUpperCase();
    if (!c || seen.has(c)) {
      u.accountCode = generateUniqueAccountCode();
      changed = true;
    }
    seen.add(u.accountCode);
  });
  if (changed) saveUsers();
}

// =========================================================================
// TỰ ĐỘNG LƯU & KHÔI PHỤC TIẾN ĐỘ BÀI ĐANG HỌC (THOÁT WEB VÀO LẠI VẪN CÒN NGUYÊN!)
// =========================================================================
function getProgressStorageKey() {
  const code = state.currentUser ? state.currentUser.accountCode : 'GUEST';
  return `tamn_learning_progress_v2_${code}`;
}

function buildProgressSnapshot() {
  return {
    version: 2,
    updatedAtMs: Date.now(),
    savedAt: new Date().toLocaleString('vi-VN'),
    nav: state.nav,
    selectedExam: state.selectedExam,
    progTab: state.progTab,
    cefrFilter: state.cefrFilter,
    openAtlasSlug: state.openAtlasSlug,
    openAtlasPart: state.openAtlasPart,
    openCourseSlug: state.openCourseSlug,
    // Listening
    listeningId: state.listeningId,
    listeningMode: state.listeningMode,
    listeningLineIdx: state.listeningLineIdx,
    dictationInput: state.dictationInput,
    // Speaking
    speakingCefr: state.speakingCefr,
    speakingPage: state.speakingPage,
    speakingId: state.speakingId,
    speakingMode: state.speakingMode,
    speakingTranscript: state.speakingTranscript,
    speakingDrafts: state.speakingDrafts,
    speakingChatLog: state.speakingChatLog,
    // Writing
    writingCefr: state.writingCefr,
    writingPage: state.writingPage,
    writingId: state.writingId,
    writingText: state.writingText,
    writingDrafts: state.writingDrafts,
    writingDrillPicked: state.writingDrillPicked,
    // Reading
    readingCefr: state.readingCefr,
    readingPage: state.readingPage,
    readingId: state.readingId,
    readingMode: state.readingMode,
    readingAnswers: state.readingAnswers,
    readingGraded: state.readingGraded,
    // Grammar (30 câu đang làm dở)
    grammarId: state.grammarId,
    grammarCefr: state.grammarCefr,
    grammarSetNo: state.grammarSetNo,
    grammarActiveIds: Array.isArray(state.grammarActiveIds) ? Array.from(state.grammarActiveIds) : null,
    grammarActiveCat: state.grammarActiveIds ? (state.grammarActiveIds._cat || state.grammarId) : state.grammarId,
    grammarDoneIds: state.grammarDoneIds,
    grammarAnswers: state.grammarAnswers,
    grammarGraded: state.grammarGraded,
    // Weekly Quiz
    weeklyQuiz: state.weeklyQuiz,
    // Completed badges
    completedItems: state.completedItems,
    // Games & Music
    gmMode: state.gmMode,
    gmTrack: state.gmTrack,
    gmCefr: state.gmCefr,
    gmTopicSlug: state.gmTopicSlug,
    gmPart: state.gmPart,
    gameSourceKey: state.gameSourceKey,
    musicIdx: state.music.idx,
    musicVolume: state.music.volume,
    musicViewMode: state.music.viewMode
  };
}

let _saveProgTimer = null;
function saveLearningProgressNow() {
  try {
    const snap = buildProgressSnapshot();
    state.lastSavedProgressAt = snap.savedAt;
    const key = getProgressStorageKey();
    saveJson(key, snap);
    pushProgressToCloudDebounced(snap);
    // Also persist into IndexedDB vault so closing browser / clearing tabs keeps it safe
    openUserVaultDb().then(db => {
      const tx = db.transaction('kv', 'readwrite');
      tx.objectStore('kv').put(snap, key);
      tx.objectStore('kv').put(Array.from(getUsedAccountCodesSet()), 'usedIds');
    }).catch(() => {});
  } catch {}
}

function scheduleProgressSave() {
  clearTimeout(_saveProgTimer);
  _saveProgTimer = setTimeout(saveLearningProgressNow, 250);
}

function applyProgressSnapshot(snap) {
  if (!snap || typeof snap !== 'object') return false;
  if (snap.nav && snap.nav !== 'admin') state.nav = snap.nav;
  if (snap.nav === 'admin' && isAdmin()) state.nav = 'admin';
  if (snap.selectedExam) state.selectedExam = snap.selectedExam;
  if (snap.progTab) state.progTab = snap.progTab;
  if (snap.cefrFilter) state.cefrFilter = snap.cefrFilter;
  if ('openAtlasSlug' in snap) state.openAtlasSlug = snap.openAtlasSlug;
  if ('openAtlasPart' in snap) state.openAtlasPart = snap.openAtlasPart;
  if ('openCourseSlug' in snap) state.openCourseSlug = snap.openCourseSlug;
  if (snap.listeningId) state.listeningId = snap.listeningId;
  if (snap.listeningMode) state.listeningMode = snap.listeningMode;
  if (typeof snap.listeningLineIdx === 'number') state.listeningLineIdx = snap.listeningLineIdx;
  if (typeof snap.dictationInput === 'string') state.dictationInput = snap.dictationInput;
  if (snap.speakingCefr) state.speakingCefr = snap.speakingCefr;
  if (snap.speakingPage) state.speakingPage = snap.speakingPage;
  if (snap.speakingId) state.speakingId = snap.speakingId;
  if (snap.speakingMode) state.speakingMode = snap.speakingMode;
  if (typeof snap.speakingTranscript === 'string') state.speakingTranscript = snap.speakingTranscript;
  if (snap.speakingDrafts && typeof snap.speakingDrafts === 'object') state.speakingDrafts = snap.speakingDrafts;
  if (snap.speakingChatLog && typeof snap.speakingChatLog === 'object') state.speakingChatLog = snap.speakingChatLog;
  if (snap.writingCefr) state.writingCefr = snap.writingCefr;
  if (snap.writingPage) state.writingPage = snap.writingPage;
  if (snap.writingId) state.writingId = snap.writingId;
  if (typeof snap.writingText === 'string') state.writingText = snap.writingText;
  if (snap.writingDrafts && typeof snap.writingDrafts === 'object') state.writingDrafts = snap.writingDrafts;
  if (snap.writingDrillPicked && typeof snap.writingDrillPicked === 'object') state.writingDrillPicked = snap.writingDrillPicked;
  if (snap.readingCefr) state.readingCefr = snap.readingCefr;
  if (snap.readingPage) state.readingPage = snap.readingPage;
  if (snap.readingId) state.readingId = snap.readingId;
  if (snap.readingMode) state.readingMode = snap.readingMode;
  if (snap.readingAnswers && typeof snap.readingAnswers === 'object') state.readingAnswers = snap.readingAnswers;
  if (typeof snap.readingGraded === 'boolean') state.readingGraded = snap.readingGraded;
  if (snap.grammarId) state.grammarId = snap.grammarId;
  if (snap.grammarCefr) state.grammarCefr = snap.grammarCefr;
  if (snap.grammarSetNo) state.grammarSetNo = snap.grammarSetNo;
  if (Array.isArray(snap.grammarActiveIds) && snap.grammarActiveIds.length === 30) {
    const ids = [...snap.grammarActiveIds];
    ids._cat = snap.grammarActiveCat || state.grammarId;
    state.grammarActiveIds = ids;
  }
  if (snap.grammarDoneIds && typeof snap.grammarDoneIds === 'object') {
    state.grammarDoneIds = snap.grammarDoneIds;
    saveJson('tamn_grammar_done_ids_v1', state.grammarDoneIds);
  }
  if (snap.grammarAnswers && typeof snap.grammarAnswers === 'object') state.grammarAnswers = snap.grammarAnswers;
  if (typeof snap.grammarGraded === 'boolean') state.grammarGraded = snap.grammarGraded;
  if (snap.weeklyQuiz && Array.isArray(snap.weeklyQuiz.questions) && snap.weeklyQuiz.questions.length) {
    state.weeklyQuiz = snap.weeklyQuiz;
  }
  if (snap.completedItems && typeof snap.completedItems === 'object') {
    state.completedItems = {
      speaking: snap.completedItems.speaking || {},
      writing: snap.completedItems.writing || {},
      reading: snap.completedItems.reading || {},
      listening: snap.completedItems.listening || {}
    };
  }
  if (snap.gmMode) state.gmMode = snap.gmMode;
  if (snap.gmTrack) state.gmTrack = snap.gmTrack;
  if (snap.gmCefr) state.gmCefr = snap.gmCefr;
  if (snap.gmTopicSlug) state.gmTopicSlug = snap.gmTopicSlug;
  if (snap.gmPart) state.gmPart = snap.gmPart;
  if (snap.gameSourceKey) state.gameSourceKey = snap.gameSourceKey;
  if (typeof snap.musicIdx === 'number') state.music.idx = Math.max(0, Math.min(state.music.playlist.length - 1, snap.musicIdx));
  if (typeof snap.musicVolume === 'number') state.music.volume = snap.musicVolume;
  if (snap.musicViewMode) {
    state.music.viewMode = (snap.musicViewMode === 'audio' || snap.musicViewMode === 'audio_only') ? 'audio_only' : 'video';
  }
  if (snap.savedAt) state.lastSavedProgressAt = snap.savedAt;
  return true;
}

function restoreLearningProgress() {
  const key = getProgressStorageKey();
  const localSnap = loadJson(key, null);
  if (localSnap) return applyProgressSnapshot(localSnap);
  return false;
}

window.addEventListener('beforeunload', () => saveLearningProgressNow());
window.addEventListener('pagehide', () => saveLearningProgressNow());
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveLearningProgressNow();
});

function isAdmin() {
  return Boolean(state.currentUser && state.currentUser.isAdmin === true && state.currentUser.username === ADMIN_CRED.username);
}

function getEffectivePlan() {
  if (!state.currentUser) return 'free';
  if (isAdmin()) return 'ultra';
  return state.currentUser.planTier || 'free';
}

function getPlanLimits() {
  return PLAN_LIMITS[getEffectivePlan()] || PLAN_LIMITS.free;
}

function getTodayUsage() {
  const tk = getTodayKey();
  if (state.currentUser && !isAdmin()) {
    if (!state.currentUser.dailyUsage || state.currentUser.dailyUsage.date !== tk) {
      state.currentUser.dailyUsage = { date: tk, vocab: 0, grammar: 0, speaking: 0, writing: 0 };
      saveUsers();
    }
    return state.currentUser.dailyUsage;
  }
  if (!state.guestUsage || state.guestUsage.date !== tk) {
    state.guestUsage = { date: tk, vocab: 0, grammar: 0, speaking: 0, writing: 0 };
    saveJson('tamn_guest_usage_v1', state.guestUsage);
  }
  return state.guestUsage;
}

function checkAndConsumeQuota(kind, amount = 1) {
  if (isAdmin()) return true;
  const lim = getPlanLimits()[kind];
  if (lim === Infinity) return true;
  const usage = getTodayUsage();
  const used = usage[kind] || 0;
  if (used + amount > lim) {
    const names = { vocab: 'từ vựng', grammar: 'bài ngữ pháp', speaking: 'bài luyện nói', writing: 'bài luyện viết' };
    const planLabel = getEffectivePlan().toUpperCase();
    notify(`🔒 Gói ${planLabel} chỉ cho phép tối đa ${lim} ${names[kind]}/ngày (đã dùng ${used}/${lim}). Nâng lên Pro/Ultra để học nhiều hơn!`);
    return false;
  }
  usage[kind] = used + amount;
  if (state.currentUser && !isAdmin()) saveUsers();
  else saveJson('tamn_guest_usage_v1', state.guestUsage);
  return true;
}

function quotaBadgeHtml(kind, label) {
  if (isAdmin()) return `<span class="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[11px]">🛡️ Admin: Không giới hạn</span>`;
  const lim = getPlanLimits()[kind];
  const used = getTodayUsage()[kind] || 0;
  if (lim === Infinity) return `<span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">💎 ${label}: Không giới hạn</span>`;
  const over = used >= lim;
  return `<span class="px-2.5 py-1 rounded-full font-bold text-[11px] border ${over?'bg-rose-50 text-rose-700 border-rose-300':'bg-amber-50 text-amber-800 border-amber-200'}">📊 Hôm nay: ${used}/${lim} ${label}</span>`;
}

// =========================================================================
// RANKING, WEEKLY QUIZ & AUTH (FIXED REGISTRATION — NO EMAIL/PHONE REQUIRED)
// =========================================================================
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

// CHỈ ADMIN MỚI CÓ QUYỀN CẤP GÓI PRO / ULTRA!
// Tài khoản mới tạo 100% là GÓI THƯỜNG (FREE). Top 1-3 chỉ nhận Huy hiệu Vàng/Bạc/Đồng, KHÔNG tự động lên Ultra.
function syncTopRankRewards() {
  const ranked = getRankedRealUsers();
  const rankMap = {};
  ranked.forEach((u, idx) => { rankMap[u.id] = idx + 1; });
  state.users.forEach(u => {
    const r = rankMap[u.id] || 999;
    u.topRank = (r <= 3 && ((u.streak || 0) > 0 || (u.coins || 0) > 0)) ? r : 0;
    // Giữ nguyên gói Pro/Ultra đã cấp (kể cả tài khoản đồng bộ từ thiết bị khác chưa có trường adminGrantedPlan)
    if (!u.adminGrantedPlan && !u.ultraFromTop && (u.planTier === 'pro' || u.planTier === 'ultra')) {
      u.adminGrantedPlan = u.planTier;
    }
    if (!u.adminGrantedPlan) {
      u.basePlanTier = 'free';
      u.planTier = 'free';
      u.ultraFromTop = false;
    } else {
      u.basePlanTier = u.adminGrantedPlan;
      u.planTier = u.adminGrantedPlan;
      u.ultraFromTop = false;
    }
  });
  if (state.currentUser && !state.currentUser.isAdmin) {
    const fresh = state.users.find(u => u.id === state.currentUser.id || u.username === state.currentUser.username);
    if (fresh) state.currentUser = fresh;
  }
  saveJson('tamn_real_users_v1', state.users);
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

function needsWeeklyMandatoryTest() {
  if (!state.currentUser || isAdmin()) return false;
  if (getPlanLimits().canSkipWeekly) return false;
  return state.currentUser.weeklyQuizDone !== getCurrentWeekKey();
}

function enforceWeeklyTest() {
  if (needsWeeklyMandatoryTest()) {
    notify('📝 Gói Thường & Pro không thể bỏ qua bài Kiểm tra ôn từ vựng hàng tuần! Hãy hoàn thành 8 câu để học tiếp.');
    state.nav = 'weekly_quiz';
    render();
    return false;
  }
  return true;
}

function getTopicLearnerCount(slug) {
  return state.users.filter(u => u.status === 'active' && u.completedAtlasParts && u.completedAtlasParts[slug]).length;
}
function getTrackLearnerCount(trackId) {
  return state.users.filter(u => u.status === 'active' && u.selectedExam === trackId).length;
}

function restoreSession() {
  const uname = state.sessionUsername || localStorage.getItem('tamn_session_user_v1') || getSessionCookie();
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
  if (found && found.status === 'active') state.currentUser = found;
  else { state.currentUser = null; localStorage.removeItem('tamn_session_user_v1'); }
}

function showAuthBoxMsg(msg, isError = true) {
  const box = document.getElementById('auth-msg-box');
  if (!box) return;
  if (!msg) { box.classList.add('hidden'); return; }
  box.textContent = msg;
  box.className = isError
    ? 'p-3 rounded-xl text-xs font-bold border bg-rose-50 border-rose-300 text-rose-700'
    : 'p-3 rounded-xl text-xs font-bold border bg-emerald-50 border-emerald-300 text-emerald-800';
  box.classList.remove('hidden');
}

function openAuth(tab = 'register') {
  showAuthBoxMsg('');
  document.getElementById('social-quick-form')?.classList.add('hidden');
  switchWebAuthTab(tab);
  document.getElementById('auth-modal')?.classList.remove('hidden');
}

function openAccountOrAuth() {
  if (state.currentUser) go('settings');
  else openAuth('register');
}

function openSocialQuickForm(prov) {
  showAuthBoxMsg('');
  const form = document.getElementById('social-quick-form');
  document.getElementById('sq-provider').value = prov;
  document.getElementById('sq-title').textContent = prov.includes('Gmail') ? '🔴 Đăng nhập nhanh bằng Gmail' : '🔵 Đăng nhập nhanh bằng Facebook';
  form.classList.remove('hidden');
}

function switchWebAuthTab(tab) {
  showAuthBoxMsg('');
  const isReg = tab === 'register';
  document.getElementById('web-register-form')?.classList.toggle('hidden', !isReg);
  document.getElementById('web-login-form')?.classList.toggle('hidden', isReg);
  const tr = document.getElementById('tab-web-register');
  const tl = document.getElementById('tab-web-login');
  if (tr) tr.className = isReg ? 'py-2 rounded-lg text-xs font-bold bg-[var(--primary)] text-white cursor-pointer' : 'py-2 rounded-lg text-xs font-bold text-[var(--muted-foreground)] cursor-pointer';
  if (tl) tl.className = !isReg ? 'py-2 rounded-lg text-xs font-bold bg-[var(--primary)] text-white cursor-pointer' : 'py-2 rounded-lg text-xs font-bold text-[var(--muted-foreground)] cursor-pointer';
}

function createRealUserRecord({ name, username, email = '', phone = '', pass, provider }) {
  const cleanUser = username.trim().toLowerCase();
  const code = generateUniqueAccountCode();
  const colors = ['#0d9488', '#0284c7', '#d97706', '#e11d48', '#059669', '#0891b2'];
  const rec = {
    id: Date.now() + Math.floor(Math.random() * 999),
    accountCode: code,
    username: cleanUser,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password: pass,
    provider,
    isAdmin: false,
    role: 'user',
    planTier: 'free',
    basePlanTier: 'free',
    adminGrantedPlan: null,
    topRank: 0,
    ultraFromTop: false,
    streak: 0,
    coins: 0,
    elo: 1000,
    grindPts: 0,
    color: colors[state.users.length % colors.length],
    avatar: '',
    status: 'active',
    selectedExam: state.selectedExam || 'IELTS',
    gmailVerified: Boolean(email && provider.includes('Gmail')),
    phoneVerified: false,
    weeklyQuizDone: '',
    dailyUsage: { date: getTodayKey(), vocab: 0, grammar: 0, speaking: 0, writing: 0 },
    completedAtlasParts: {},
    completedCourseLessons: {},
    roadmapStartDates: {},
    personalWords: [],
    createdAt: new Date().toLocaleDateString('vi-VN'),
    updatedAt: Date.now()
  };
  state.users.push(rec);
  saveUsers();
  pushSingleUserToCloud(rec);
  return rec;
}

function loginAsUserObj(u) {
  if (u.status === 'banned') { showAuthBoxMsg('⛔ Tài khoản này đã bị Quản trị viên BAN vĩnh viễn!'); return; }
  if (u.status === 'locked') { showAuthBoxMsg('🔒 Tài khoản này đang bị tạm khóa! Liên hệ Zalo 0779176786.'); return; }
  state.currentUser = u;
  state.sessionUsername = u.username;
  localStorage.setItem('tamn_session_user_v1', u.username);
  setSessionCookie(u.username);
  closeModal('auth-modal');
  syncTopRankRewards();
  const restored = restoreLearningProgress();
  backupVaultAsync();
  notify(`🎉 Chào mừng ${u.name}! Mã ID riêng: ${u.accountCode} • Gói: ${u.planTier === 'free' ? 'Thường (Free)' : u.planTier.toUpperCase()}${restored ? ' • 💾 Đã khôi phục tiến độ học!' : ''}`);
  render();
}

function submitSocialQuickLogin(e) {
  e.preventDefault();
  const prov = document.getElementById('sq-provider').value;
  const name = (document.getElementById('sq-name')?.value || '').trim();
  const handle = (document.getElementById('sq-email')?.value || '').trim().toLowerCase();
  if (!name) { showAuthBoxMsg('⚠️ Vui lòng nhập Tên hiển thị của bạn.'); return; }
  const cleanUser = handle || (name.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + String(Date.now()).slice(-4));
  if (cleanUser === ADMIN_CRED.username) { showAuthBoxMsg('⚠️ Vui lòng đăng nhập Admin ở tab Đăng nhập.'); return; }
  let u = state.users.find(x => x.username === cleanUser || (x.email && x.email === cleanUser));
  if (!u) {
    const emailVal = cleanUser.includes('@') ? cleanUser : '';
    u = createRealUserRecord({ name, username: cleanUser, email: emailVal, phone: '', pass: 'social_' + Date.now(), provider: prov });
  }
  loginAsUserObj(u);
}

// FIXED REGISTRATION + CLOUD SYNC: NO EMAIL/PHONE REQUIRED, SYNCED ACROSS ALL DEVICES!
async function webAccountRegister(e) {
  e.preventDefault();
  showAuthBoxMsg('');
  const name = (document.getElementById('wr-name')?.value || '').trim();
  const username = (document.getElementById('wr-user')?.value || '').trim().toLowerCase();
  const pass = document.getElementById('wr-pass')?.value || '';
  const pass2 = document.getElementById('wr-pass2')?.value || '';

  if (!name) { showAuthBoxMsg('⚠️ Vui lòng nhập Họ và tên hiển thị!'); return; }
  if (!username || username.length < 3) { showAuthBoxMsg('⚠️ Tên đăng nhập phải có ít nhất 3 ký tự (không cần email hay SĐT)!'); return; }
  if (pass.length < 4) { showAuthBoxMsg('⚠️ Mật khẩu phải có ít nhất 4 ký tự!'); return; }
  if (pass !== pass2) { showAuthBoxMsg('❌ Mật khẩu nhập lại không khớp!'); return; }
  if (username === ADMIN_CRED.username) { showAuthBoxMsg('⛔ Tên đăng nhập này dành riêng cho hệ thống Admin!'); return; }

  if (isCloudEnabled()) {
    showAuthBoxMsg('🔄 Đang đồng bộ kiểm tra tài khoản trên Đám mây...', false);
    await syncCloudAll(false);
    showAuthBoxMsg('');
  }

  const existed = state.users.some(u => u.username === username || (u.email && u.email !== '' && u.email === username));
  if (existed) {
    showAuthBoxMsg('⚠️ Tên đăng nhập này đã có người dùng! Vui lòng chọn tên khác hoặc chuyển sang tab Đăng nhập.');
    return;
  }

  const u = createRealUserRecord({ name, username, email: '', phone: '', pass, provider: 'Tài khoản Web' });
  e.target.reset();
  loginAsUserObj(u);
}

async function webAccountLogin(e) {
  e.preventDefault();
  showAuthBoxMsg('');
  const rawUser = (document.getElementById('wl-user')?.value || '').trim().toLowerCase();
  const pass = document.getElementById('wl-pass')?.value || '';
  if (!rawUser || !pass) { showAuthBoxMsg('⚠️ Vui lòng nhập đầy đủ Tên đăng nhập và Mật khẩu!'); return; }

  if (rawUser === ADMIN_CRED.username) {
    if (pass !== ADMIN_CRED.pass) { showAuthBoxMsg('❌ Sai mật khẩu tài khoản Admin!'); return; }
    state.sessionUsername = ADMIN_CRED.username;
    localStorage.setItem('tamn_session_user_v1', ADMIN_CRED.username);
    setSessionCookie(ADMIN_CRED.username);
    backupVaultAsync();
    restoreSession();
    closeModal('auth-modal');
    if (isCloudEnabled()) syncCloudAll(false);
    notify('🛡️ Đăng nhập Admin thành công! Toàn quyền quản trị đã mở khóa.');
    render();
    return;
  }

  let u = state.users.find(x => (x.username === rawUser || (x.accountCode && x.accountCode.toLowerCase() === rawUser) || (x.email && x.email === rawUser)) && x.password === pass);
  if (!u && isCloudEnabled()) {
    showAuthBoxMsg('🔄 Đang tải tài khoản từ Đám mây (liên kết Laptop ↔ Điện thoại)...', false);
    await syncCloudAll(false);
    showAuthBoxMsg('');
    u = state.users.find(x => (x.username === rawUser || (x.accountCode && x.accountCode.toLowerCase() === rawUser) || (x.email && x.email === rawUser)) && x.password === pass);
  }
  if (!u) {
    showAuthBoxMsg(isCloudEnabled()
      ? '❌ Sai tài khoản hoặc mật khẩu! Nếu chưa có tài khoản, hãy chọn tab "✨ Tạo tài khoản mới".'
      : '❌ Không tìm thấy tài khoản trên máy này (chưa gắn link Firebase Cloud nên tài khoản tạo ở máy khác chưa liên kết sang đây).');
    return;
  }
  loginAsUserObj(u);
  if (isCloudEnabled()) pullProgressFromCloudForCurrentUser().then(ok => { if (ok) render(); });
}

function logoutUser() {
  saveLearningProgressNow();
  state.currentUser = null;
  state.sessionUsername = '';
  localStorage.removeItem('tamn_session_user_v1');
  setSessionCookie('');
  backupVaultAsync();
  if (state.nav === 'admin') state.nav = 'home';
  notify('🚪 Đã đăng xuất an toàn. Tài khoản, mật khẩu & ID của bạn vẫn được lưu nguyên để đăng nhập lại bất cứ lúc nào!');
  render();
}

// =========================================================================
// COMMON UI HELPERS, DRAWER, NAVIGATION, SPEECH
// =========================================================================
function notify(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.add('hidden'), 4200);
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
    u.lang = lang; u.rate = rate;
    window.speechSynthesis.speak(u);
  } catch {}
}
function toggleDrawer() { state.drawerOpen ? closeDrawer() : openDrawer(); }
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
function openZaloModal() { document.getElementById('zalo-modal')?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

function cleanup() {
  state.rafs.forEach(id => cancelAnimationFrame(id));
  state.rafs = [];
  if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
  if (state.speakingRec) { try { state.speakingRec.stop(); } catch {} state.speakingRec = null; state.speakingListening = false; }
  if (state.pronRec) { try { state.pronRec.stop(); } catch {} state.pronRec = null; state.pronListening = false; }
  state.loungeCamOn = false;
  state.loungeMicOn = false;
}

function syncChromeUi() {
  syncTopRankRewards();
  updateDeviceGateUi();
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
    topPlan.textContent = 'Tạo acc ngay';
    drawerId.textContent = 'Chưa đăng nhập';
  }

  if (admGroup) {
    if (isAdmin()) {
      admGroup.classList.remove('hidden');
      const waitCount = state.orders.filter(o => o.status === 'waiting_approval').length;
      if (admPill) { admPill.textContent = waitCount; admPill.style.display = waitCount > 0 ? '' : 'none'; }
    } else admGroup.classList.add('hidden');
  }

  if (wp) {
    if (!u || isAdmin() || getPlanLimits().canSkipWeekly) {
      wp.textContent = isAdmin() ? 'Admin' : 'Miễn';
      wp.style.background = '#0284c7';
    } else if (needsWeeklyMandatoryTest()) {
      wp.textContent = 'Bắt buộc';
      wp.style.background = '#dc2626';
    } else {
      wp.textContent = '✓ Xong';
      wp.style.background = '#10b981';
    }
  }

  updateCloudPillUi();
  document.querySelectorAll('.snav').forEach(b => {
    const active = b.dataset.nav === state.nav;
    b.className = active
      ? 'snav w-full text-left px-3 py-2 rounded-xl font-bold flex items-center justify-between cursor-pointer bg-[var(--primary)] text-white shadow-sm'
      : 'snav w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center justify-between cursor-pointer hover:bg-[var(--content)] text-slate-700';
  });
  const gameRoutes = new Set(['games','silksong','archery','shadow','offline','match','listen_choose_vi','vi_to_en','typing']);
  const skillRoutes = new Set(['reading','writing','speaking','listening']);
  document.querySelectorAll('.mnav').forEach(b => {
    const k = b.dataset.mnav;
    const active = (k === state.nav) || (k === 'games' && gameRoutes.has(state.nav)) || (k === 'reading' && skillRoutes.has(state.nav));
    b.className = active
      ? 'mnav flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-extrabold cursor-pointer bg-teal-50 text-teal-700'
      : 'mnav flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold cursor-pointer text-slate-500 hover:bg-[var(--content)]';
  });
}

function go(nav) {
  closeDrawer();
  syncTopRankRewards();
  if (nav === 'admin' && !isAdmin()) {
    notify('⛔ Truy cập bị từ chối! Chỉ tài khoản Admin mới được vào khu vực Quản trị.');
    return;
  }
  const guarded = ['games', 'silksong', 'archery', 'shadow', 'offline', 'match', 'listen_choose_vi', 'vi_to_en', 'typing', 'listening', 'speaking', 'writing', 'reading', 'grammar', 'vocab'];
  if (guarded.includes(nav) && !enforceWeeklyTest()) return;
  state.nav = nav;
  if (nav !== 'roadmaps') { state.openAtlasSlug = null; state.openAtlasPart = null; }
  if (nav !== 'courses') state.openCourseSlug = null;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  // Capture active input focus/caret and inner scroll positions BEFORE re-rendering so typing & clicking answers NEVER jumps or loses focus!
  const activeEl = document.activeElement;
  const savedFocus = (activeEl && activeEl.id && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA'))
    ? { id: activeEl.id, start: activeEl.selectionStart, end: activeEl.selectionEnd }
    : null;
  const savedScrolls = {};
  document.querySelectorAll('[data-scroll-id]').forEach(el => {
    savedScrolls[el.dataset.scrollId] = el.scrollTop;
  });

  cleanup();
  syncChromeUi();
  const v = document.getElementById('view');
  if (!v) return;

  // Chỉ chạy hiệu ứng chuyển trang khi thực sự đổi mục (state.nav thay đổi), không giật/chớp khi chọn đáp án!
  const navChanged = state._lastRenderedNav !== state.nav;
  state._lastRenderedNav = state.nav;
  if (navChanged) {
    v.classList.remove('view-animate');
    void v.offsetWidth;
    v.classList.add('view-animate');
  } else {
    v.classList.remove('view-animate');
  }

  const routes = {
    home: renderHome,
    listening: renderListening,
    speaking: renderSpeaking,
    writing: renderWriting,
    reading: renderReading,
    grammar: renderGrammar,
    vocab: renderVocabDaily,
    roadmaps: renderRoadmaps,
    courses: renderCourses,
    weekly_quiz: renderWeeklyQuiz,
    games: renderGamesHub,
    silksong: renderSilksong,
    archery: renderArchery,
    shadow: renderShadowFight,
    offline: renderOfflineGame,
    match: renderMatch,
    listen_choose_vi: renderListenChooseVi,
    vi_to_en: renderViToEn,
    typing: renderTyping,
    music: renderMusic,
    lounge: renderLounge,
    duel: renderDuel,
    leaderboard: renderLeaderboard,
    pricing: renderPricing,
    settings: renderSettings,
    admin: renderAdmin
  };
  (routes[state.nav] || renderHome)(v);

  // Restore scroll positions of scrollable panels (e.g., 30-question Grammar box, 408-topic lists)
  if (!navChanged) {
    Object.entries(savedScrolls).forEach(([sid, top]) => {
      const el = document.querySelector(`[data-scroll-id="${sid}"]`);
      if (el) el.scrollTop = top;
    });
    if (savedFocus) {
      const el = document.getElementById(savedFocus.id);
      if (el) {
        try {
          el.focus({ preventScroll: true });
          if (typeof savedFocus.start === 'number' && el.setSelectionRange) {
            el.setSelectionRange(savedFocus.start, savedFocus.end);
          }
        } catch {}
      }
    }
  }
  scheduleProgressSave();
}

function onGlobalSearch(raw, dropId = 'top-search-drop') {
  const drop = document.getElementById(dropId);
  if (!drop) return;
  const q = (raw || '').trim().toLowerCase();
  if (!q) { drop.classList.add('hidden'); return; }
  const tHits = ATLAS_TOPICS.filter(t => (t.name + ' ' + t.desc + ' ' + t.track + ' ' + t.cefr).toLowerCase().includes(q)).slice(0, 4);
  const gHits = GRAMMAR_LESSONS.filter(g => (g.title + ' ' + g.summary).toLowerCase().includes(q)).slice(0, 3);
  const lHits = state.listeningVideos.filter(l => (l.title + ' ' + l.category).toLowerCase().includes(q)).slice(0, 2);
  if (!tHits.length && !gHits.length && !lHits.length) {
    drop.innerHTML = `<div class="p-3 text-xs text-[var(--muted-foreground)]">Không tìm thấy "${escapeHtml(q)}".</div>`;
    drop.classList.remove('hidden'); return;
  }
  drop.innerHTML =
    (lHits.length ? `<div class="px-3 py-1.5 text-[11px] font-extrabold bg-[var(--content)] text-amber-700">🎧 Luyện nghe</div>` +
      lHits.map(l => `<div onclick="document.getElementById('top-search-drop')?.classList.add('hidden');document.getElementById('drawer-search-drop')?.classList.add('hidden');state.listeningId='${l.id}';go('listening')" class="px-3 py-2 cursor-pointer hover:bg-[var(--content)] text-xs"><strong>${escapeHtml(l.title)}</strong></div>`).join('') : '') +
    (gHits.length ? `<div class="px-3 py-1.5 text-[11px] font-extrabold bg-[var(--content)] text-teal-700">📐 Ngữ pháp</div>` +
      gHits.map(g => `<div onclick="document.getElementById('top-search-drop')?.classList.add('hidden');document.getElementById('drawer-search-drop')?.classList.add('hidden');state.grammarId='${g.id}';state.grammarSetNo=1;state.grammarActiveIds=null;go('grammar')" class="px-3 py-2 cursor-pointer hover:bg-[var(--content)] text-xs"><strong>${g.title}</strong></div>`).join('') : '') +
    (tHits.length ? `<div class="px-3 py-1.5 text-[11px] font-extrabold bg-[var(--content)] text-sky-700">🧭 Lộ trình</div>` +
      tHits.map(t => `<div onclick="document.getElementById('top-search-drop')?.classList.add('hidden');document.getElementById('drawer-search-drop')?.classList.add('hidden');state.progTab='${t.track}';state.openAtlasSlug='${t.slug}';state.openAtlasPart=null;state.nav='roadmaps';render()" class="px-3 py-2 flex justify-between items-center gap-2 cursor-pointer hover:bg-[var(--content)] text-xs"><strong>${t.name}</strong><span class="font-mono text-teal-700">${t.parts} phần</span></div>`).join('') : '');
  drop.classList.remove('hidden');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest?.('#top-quick-search') && !e.target.closest?.('#top-search-drop')) {
    document.getElementById('top-search-drop')?.classList.add('hidden');
  }
  if (!e.target.closest?.('#drawer-quick-search') && !e.target.closest?.('#drawer-search-drop')) {
    document.getElementById('drawer-search-drop')?.classList.add('hidden');
  }
  if (!e.target.closest?.('#rd-left-passage-pane') && !e.target.closest?.('#reading-selection-pop')) {
    document.getElementById('reading-selection-pop')?.classList.add('hidden');
  }
});

// Helper AI English -> Vietnamese translator used across Listening, Music, Admin, Reading
function simpleEnToViTranslate(enText) {
  const dict = {
    'good morning':'chào buổi sáng','thank you':'cảm ơn bạn','very much':'rất nhiều','wonderful day':'ngày tuyệt vời',
    'sustainable tourism':'du lịch bền vững','environmental damage':'thiệt hại môi trường','local communities':'cộng đồng địa phương',
    'artificial intelligence':'trí tuệ nhân tạo','climate change':'biến đổi khí hậu','public transport':'giao thông công cộng',
    'passport':'hộ chiếu','boarding pass':'thẻ lên máy bay','window seat':'ghế cửa sổ','flight':'chuyến bay','airport':'sân bay',
    'travel':'du lịch','english':'tiếng Anh','every day':'mỗi ngày','vocabulary':'từ vựng','grammar':'ngữ pháp',
    'speaking':'luyện nói','writing':'luyện viết','reading':'luyện đọc','listening':'luyện nghe','pronunciation':'phát âm',
    'music':'âm nhạc','future':'tương lai','success':'thành công','friend':'bạn bè','culture':'văn hóa',
    'learn':'học','practice':'luyện tập','important':'quan trọng','student':'học sinh','city':'thành phố',
    'hotel':'khách sạn','ticket':'vé','journey':'hành trình','rain':'mưa','sunlight':'ánh nắng','dream':'ước mơ'
  };
  let out = String(enText || '');
  Object.entries(dict).forEach(([en, vi]) => {
    out = out.replace(new RegExp('\\b' + en + '\\b', 'gi'), vi);
  });
  return out;
}

// =========================================================================

// =========================================================================
// ĐỒNG HỒ BẤM GIỜ PHÒNG THI IELTS (15p / 20p / 40p)
// =========================================================================
function fmtTimerMmSs(sec) {
  const s = Math.max(0, Math.floor(sec || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function updateExamTimerDisplays() {
  const txt = state.examTimer.remainingSec > 0 ? fmtTimerMmSs(state.examTimer.remainingSec) : '00:00';
  document.querySelectorAll('.exam-timer-readout').forEach(el => {
    el.textContent = txt;
    el.classList.toggle('text-rose-600', state.examTimer.running && state.examTimer.remainingSec <= 60);
  });
}
function startExamTimer(minutes) {
  stopExamTimer(false);
  const secs = Math.max(60, Math.round(Number(minutes || 20) * 60));
  state.examTimer.totalSec = secs;
  state.examTimer.remainingSec = secs;
  state.examTimer.running = true;
  state.examTimer.interval = setInterval(() => {
    state.examTimer.remainingSec = Math.max(0, state.examTimer.remainingSec - 1);
    updateExamTimerDisplays();
    if (state.examTimer.remainingSec <= 0) {
      stopExamTimer(false);
      notify('⏰ Hết giờ luyện thi IELTS! Hãy nộp bài để AI chấm điểm ngay.');
      render();
    }
  }, 1000);
  notify(`⏱️ Đã bật đồng hồ thi IELTS ${minutes} phút!`);
  render();
}
function stopExamTimer(shouldRender = true) {
  if (state.examTimer.interval) { clearInterval(state.examTimer.interval); state.examTimer.interval = null; }
  state.examTimer.running = false;
  if (shouldRender) render();
}
function examTimerBarHtml(presets = [15, 20, 40]) {
  const t = state.examTimer;
  return `
    <div class="inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[var(--border)] text-[11px]">
      <span class="font-bold text-slate-600">⏱️ Bấm giờ thi:</span>
      <span class="exam-timer-readout font-mono font-black text-xs px-2 py-0.5 rounded bg-[var(--content)] ${t.running && t.remainingSec<=60?'text-rose-600':'text-teal-800'}">${t.remainingSec > 0 ? fmtTimerMmSs(t.remainingSec) : '--:--'}</span>
      ${t.running ? `<button onclick="stopExamTimer(true)" class="px-2 py-0.5 rounded-lg bg-rose-600 text-white font-bold cursor-pointer">⏹️ Dừng</button>` : presets.map(m => `<button onclick="startExamTimer(${m})" class="px-2 py-0.5 rounded-lg bg-[var(--content)] hover:bg-teal-50 border border-[var(--border)] font-bold cursor-pointer">${m}p</button>`).join('')}
    </div>`;
}

// 1. TRANG CHỦ PHONG CÁCH DU LỊCH
// =========================================================================
function setExamMode(exam) {
  state.selectedExam = exam;
  localStorage.setItem('tamn_selected_exam_v1', exam);
  if (state.currentUser && !isAdmin()) { state.currentUser.selectedExam = exam; saveUsers(); }
  notify(`🧭 Đã chọn kỳ thi mục tiêu: ${exam} — Hệ thống AI chấm điểm sẽ tự chấm theo thang ${exam}!`);
  render();
}

function renderHome(v) {
  const u = state.currentUser;
  const totalWords = ATLAS_TOPICS.reduce((s, t) => s + t.words, 0);
  const exams = [
    { id: 'IELTS', label: '🌍 IELTS (Band 0–9.0)', col: '#0284c7', desc: 'Nghe 250+ Video • Nói Gia sư AI • Viết Task 1–2 • Đọc Split-Pane' },
    { id: 'TOEIC', label: '💼 TOEIC (0–990 điểm)', col: '#d97706', desc: 'Email Công sở • Nghe Part 1–4 • Đọc Part 5–7' },
    { id: 'THPT', label: '🎓 THPT Quốc Gia (0–10đ)', col: '#e11d48', desc: '8 Chuyên đề Ngữ pháp • Đọc hiểu • Viết đoạn' }
  ];

  v.innerHTML = `
    <div class="space-y-6">
      ${needsWeeklyMandatoryTest() ? `
        <div class="travel-card p-4 border-2 border-rose-500 bg-rose-50/80 flex flex-wrap justify-between items-center gap-3">
          <div class="text-xs space-y-0.5">
            <div class="font-extrabold text-sm text-rose-700">📝 Nhiệm Vụ Bắt Buộc Tuần ${getCurrentWeekKey()} (Gói Thường & Pro không thể bỏ qua)</div>
            <div class="text-slate-700">Hoàn thành bài kiểm tra ôn từ vựng ngắn (8 câu) để mở khóa học tập và game tuần này.</div>
          </div>
          <button onclick="go('weekly_quiz')" class="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-700 cursor-pointer shrink-0">✍️ Làm kiểm tra ngay →</button>
        </div>` : ''}

      <section class="boarding-pass p-6 sm:p-7 text-white shadow-xl" style="background:linear-gradient(125deg,#0f172a 0%,#0f766e 55%,#0284c7 100%);">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 border border-white/25">
              <span class="travel-plane">✈️</span>
              <span>HÀNH TRÌNH TIẾNG ANH MỖI NGÀY • ${ATLAS_TOPICS.length} CHỦ ĐỀ • ${totalWords.toLocaleString('vi-VN')}+ TỪ</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-black leading-tight">
              ${u ? `Chào ${nameWithBadge(u)}, sẵn sàng cất cánh hôm nay chưa?` : `Tiếng Anh Mỗi Ngày — ${state.listeningVideos.length}+ Nghe • ${state.readingList.length}+ Đọc • 408+ Nói & Viết`}
            </h1>
            <p class="text-xs sm:text-sm text-teal-50/90 leading-relaxed">
              Trọn bộ <strong>Luyện Nghe ${state.listeningVideos.length}+ Video 3 cấp độ • Luyện Nói Gia Sư AI • Đọc Báo & Đề Split-Pane • Viết IELTS • Ngữ Pháp • Âm Nhạc Đa Nguồn</strong>.
            </p>
            <div class="flex flex-wrap gap-2 pt-1">
              <button onclick="openDrawer()" class="px-4 py-2.5 rounded-xl bg-white text-teal-900 font-extrabold text-xs shadow cursor-pointer hover:bg-teal-50">☰ Menu 3 Gạch</button>
              <button onclick="go('listening')" class="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs shadow cursor-pointer hover:bg-amber-300">🎧 Luyện Nghe (${state.listeningVideos.length}+ Video)</button>
              <button onclick="go('music')" class="px-4 py-2.5 rounded-xl bg-teal-400/25 border border-teal-300/40 text-white font-extrabold text-xs cursor-pointer hover:bg-teal-400/35">🎵 Âm Nhạc Trực Tuyến</button>
              ${!u ? `<button onclick="openAuth('register')" class="px-4 py-2.5 rounded-xl bg-white/15 border border-white/35 text-white font-bold text-xs cursor-pointer hover:bg-white/25">✨ Tạo Tài Khoản Ngay</button>` : `<button onclick="go('pricing')" class="px-4 py-2.5 rounded-xl bg-white/15 border border-white/35 text-white font-bold text-xs cursor-pointer hover:bg-white/25">👑 Nâng Gói VietQR</button>`}
            </div>
          </div>

          <div class="w-full sm:w-64 rounded-2xl p-4 bg-white/12 backdrop-blur border border-white/25 space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="font-bold opacity-85">HỘ CHIẾU HỌC TẬP</span>
              <span class="font-mono font-bold text-amber-300">${u ? u.accountCode : 'CHƯA ĐĂNG KÝ'}</span>
            </div>
            <div class="boarding-divider pt-2 space-y-1">
              <div class="flex justify-between"><span class="opacity-80">Gói hiện tại:</span><strong class="text-amber-300 uppercase">${getEffectivePlan()}</strong></div>
              <div class="flex justify-between"><span class="opacity-80">Đồng bộ Cloud:</span><strong class="text-emerald-300">🟢 Tự động Live</strong></div>
              <div class="flex justify-between"><span class="opacity-80">Học viên thật:</span><strong>${state.users.filter(x => x.status === 'active').length} người</strong></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Saved Progress Auto-Resume Summary -->
      <section class="travel-card p-4 border-l-4 border-teal-500 flex flex-wrap justify-between items-center gap-3 text-xs">
        <div class="space-y-0.5">
          <div class="font-extrabold text-teal-800">💾 Tự Động Lưu & Đồng Bộ Tiến Độ Đang Học</div>
          <div class="text-slate-600">
            Đã hoàn thành: <strong>${Object.keys(state.completedItems.listening).length}/${state.listeningVideos.length} Nghe</strong> •
            <strong>${Object.keys(state.completedItems.speaking).length}/${state.speakingList.length} Nói</strong> •
            <strong>${Object.keys(state.completedItems.reading).length}/${state.readingList.length} Đọc</strong> •
            <strong>${Object.keys(state.completedItems.writing).length}/408 Viết</strong> •
            <strong>${Object.values(state.grammarDoneIds).reduce((s, a) => s + (Array.isArray(a) ? a.length : 0), 0)} câu Ngữ pháp</strong>
            ${state.lastSavedProgressAt ? ` • Lưu lúc: <span class="font-mono">${escapeHtml(state.lastSavedProgressAt)}</span>` : ''}
          </div>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <button onclick="go('listening')" class="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold cursor-pointer">🎧 Tiếp bài Nghe</button>
          <button onclick="go('reading')" class="px-3 py-1.5 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 font-bold cursor-pointer">📚 Tiếp bài Đọc</button>
          <button onclick="go('speaking')" class="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 font-bold cursor-pointer">🗣️ Tiếp bài Nói</button>
          <button onclick="go('grammar')" class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-bold cursor-pointer">📐 Tiếp Ngữ pháp</button>
        </div>
      </section>

      <!-- Exam Goal Selector -->
      <section class="space-y-2.5">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h2 class="text-sm font-extrabold text-slate-800">🎯 Chọn Kỳ Thi Mục Tiêu (AI tự chấm điểm theo thang điểm kỳ thi)</h2>
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
            </div>`).join('')}
        </div>
      </section>

      <!-- 6 Core Learning Skills -->
      <section class="space-y-2.5">
        <h2 class="text-sm font-extrabold text-slate-800">📖 Trạm Học 6 Kỹ Năng Toàn Diện (Chuẩn Luyện Ngữ Pháp + AI Chấm Điểm)</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${[
            { nav:'listening', ic:'🎧', title:`Luyện Nghe (${state.listeningVideos.length}+ Video)`, sub:'Chép chính tả 3 cấp độ • Shadowing IPA • Phụ đề song ngữ & Bài tập', col:'#f59e0b' },
            { nav:'speaking', ic:'🗣️', title:`Luyện Nói (${state.speakingList.length}+ CĐ & Gia Sư AI)`, sub:'Phòng hội thoại AI nhận xét từng câu • Phát âm • Ngữ pháp & Ý tưởng', col:'#0d9488' },
            { nav:'reading', ic:'📚', title:`Luyện Đọc (${state.readingList.length}+ Báo & Đề Split)`, sub:'Đọc báo song ngữ • Bấm câu dịch • Bôi đen tô màu Highlight & Lưu từ', col:'#ea580c' },
            { nav:'writing', ic:'✍️', title:'Luyện Viết (408 Chủ Đề IELTS)', sub:'Đề Task 1–2 • Bài tập từ nối • Tự tạo chủ đề viết bằng AI', col:'#0284c7' },
            { nav:'grammar', ic:'📐', title:'Ngữ Pháp (24 Dạng • 86.400 Câu)', sub:'3.600+ câu không trùng/dạng • 30 câu/lần làm • Chấm IELTS Band', col:'#e11d48' },
            { nav:'vocab', ic:'🌱', title:'Từ Vựng Mỗi Ngày (283 CĐ)', sub:'Sổ từ cá nhân • Phát âm chuẩn • Lộ trình nhận Chứng chỉ', col:'#059669' }
          ].map(item => `
            <div onclick="go('${item.nav}')" class="hover-box travel-card p-4 cursor-pointer space-y-1.5" style="--tile-c:${item.col};border-top:3px solid ${item.col};">
              <div class="flex items-center gap-2"><span class="text-2xl">${item.ic}</span><span class="font-extrabold text-sm">${item.title}</span></div>
              <div class="text-xs text-[var(--muted-foreground)]">${item.sub}</div>
            </div>`).join('')}
        </div>
      </section>
    </div>`;
}

// =========================================================================
// 2. EXAM-AWARE AI GRADING ENGINE
// =========================================================================
function evaluateWithExamAi({ text, skill, keywords = [], minWords = 40, targetBand = '' }) {
  const clean = (text || '').trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean) : [];
  const wc = words.length;
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const lower = clean.toLowerCase();

  const matchedKw = keywords.filter(k => lower.includes(k.toLowerCase()));
  const connectors = ['however','moreover','furthermore','therefore','although','because','firstly','secondly','in conclusion','overall','for example','in addition','whereas','consequently','nevertheless','ultimately'];
  const usedConn = connectors.filter(c => lower.includes(c));
  const uniqueRatio = wc ? (new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g,''))).size / wc) : 0;

  // 4 official IELTS criteria (converted to Band 0.0–9.0)
  const formScore = Math.min(100, Math.round((Math.min(wc, minWords) / Math.max(1, minWords)) * 65 + Math.min(35, sentences.length * 7)));
  const contentScore = Math.min(100, Math.round(35 + (matchedKw.length / Math.max(1, keywords.length)) * 50 + (wc >= minWords ? 15 : 0)));
  const vocabScore = Math.min(100, Math.round(30 + uniqueRatio * 48 + Math.min(22, matchedKw.length * 5)));
  const grammarScore = Math.min(100, Math.round(40 + Math.min(28, usedConn.length * 8) + (sentences.length >= 3 ? 22 : 8) + (/^[A-Z]/.test(clean) ? 10 : 0)));
  const avg = Math.round((formScore + contentScore + vocabScore + grammarScore) / 4);

  const b1 = pctToIeltsBand(contentScore);
  const b2 = pctToIeltsBand(formScore);
  const b3 = pctToIeltsBand(vocabScore);
  const b4 = pctToIeltsBand(grammarScore);
  const overall = (Math.round(((Number(b1) + Number(b2) + Number(b3) + Number(b4)) / 4) * 2) / 2).toFixed(1);

  const headlineScore = `IELTS Band ${overall} / 9.0`;
  const examLabel = skill === 'speaking'
    ? `Thang điểm IELTS Speaking${targetBand ? ' • Mục tiêu ' + targetBand : ''}`
    : `Thang điểm IELTS Writing${targetBand ? ' • Mục tiêu ' + targetBand : ''}`;

  const tips = [];
  if (wc < minWords) tips.push(`Bài làm hiện có ${wc} từ — nên đạt ít nhất ${minWords} từ để không bị trừ điểm Task Response / Fluency.`);
  if (matchedKw.length < 2 && keywords.length) tips.push(`Nên lồng ghép thêm từ khóa học thuật của chủ đề: ${keywords.slice(0, 5).join(', ')}.`);
  if (!usedConn.length) tips.push('Bổ sung từ nối chuẩn IELTS (However, Moreover, Furthermore, Consequently, Overall...) để tăng điểm Coherence & Cohesion.');
  if (sentences.length < 3) tips.push('Phát triển thêm ý với bố cục rõ ràng gồm Mở ý – Giải thích – Ví dụ cụ thể.');
  if (!tips.length) tips.push('Bài làm rất chắc chắn, đạt tiêu chuẩn diễn đạt & lập luận IELTS Band cao!');

  const criteriaLabels = skill === 'speaking'
    ? [['Fluency & Coherence', b2, formScore, '#0d9488'], ['Topic & Pronunciation', b1, contentScore, '#0284c7'], ['Lexical Resource', b3, vocabScore, '#d97706'], ['Grammatical Range', b4, grammarScore, '#e11d48']]
    : [['Task Response', b1, contentScore, '#0284c7'], ['Coherence & Cohesion', b2, formScore, '#0d9488'], ['Lexical Resource', b3, vocabScore, '#d97706'], ['Grammatical Range', b4, grammarScore, '#e11d48']];

  return { headlineScore, overallBand: overall, examLabel, wc, sentences: sentences.length, formScore, contentScore, vocabScore, grammarScore, criteriaLabels, matchedKw, tips };
}

function renderAiScoreCard(res) {
  if (!res) return '';
  return `
    <div class="travel-card p-5 border-2 border-teal-500 bg-teal-50/40 space-y-3">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <div class="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">🤖 AI CHẤM ĐIỂM IELTS • ${res.examLabel}</div>
          <div class="text-2xl font-black text-slate-900 mt-0.5">${res.headlineScore}</div>
        </div>
        <div class="text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-teal-200">${res.wc} từ • ${res.sentences} câu</div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        ${res.criteriaLabels.map(([lbl, band, val, col]) => `
          <div class="bg-white rounded-xl p-2.5 border border-[var(--border)]">
            <div class="text-[11px] text-[var(--muted-foreground)]">${lbl}</div>
            <div class="font-mono font-extrabold text-sm mt-0.5" style="color:${col};">Band ${band}</div>
            <div class="h-1.5 rounded-full bg-slate-100 mt-1 overflow-hidden"><div style="width:${val}%;height:100%;background:${col};"></div></div>
          </div>`).join('')}
      </div>
      <div class="bg-white rounded-xl p-3 border border-[var(--border)] text-xs space-y-1">
        <div class="font-bold text-teal-800">💡 Nhận xét & Gợi ý nâng Band IELTS từ AI:</div>
        <ul class="list-disc pl-4 space-y-1 text-slate-700">${res.tips.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>
    </div>`;
}

// =========================================================================
// 3. HỌC: LUYỆN NGHE CHUẨN LUYENNGUPHAP.COM (250+ VIDEO • 3 CẤP CHÍNH TẢ • SHADOWING IPA • SONG NGỮ • BÀI TẬP)
// =========================================================================
function normWords(str) {
  return String(str || '').toLowerCase().replace(/[’‘ʼ`]/g, "'").replace(/[^a-z0-9\s']/g, '').split(/\s+/).filter(Boolean);
}

function wordEditDistance(a, b) {
  const s = String(a || '').toLowerCase(), t = String(b || '').toLowerCase();
  if (s === t) return 0;
  const m = s.length, n = t.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = s[i - 1] === t[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

function compareWordsDetailed(targetStr, userStr) {
  const targetW = normWords(targetStr);
  const userW = normWords(userStr);
  const used = new Array(userW.length).fill(false);
  let exact = 0, near = 0, missing = 0;

  const tokens = targetW.map((tw, ti) => {
    let bestIdx = -1, bestDist = 99;
    const winStart = Math.max(0, ti - 3);
    const winEnd = Math.min(userW.length - 1, ti + 4);
    for (let ui = winStart; ui <= winEnd; ui++) {
      if (used[ui]) continue;
      const d = wordEditDistance(tw, userW[ui]);
      if (d < bestDist) { bestDist = d; bestIdx = ui; }
      if (d === 0) break;
    }
    if (bestIdx !== -1 && bestDist === 0) {
      used[bestIdx] = true;
      exact++;
      return { w: tw, status: 'ok', heard: userW[bestIdx] };
    }
    const maxNear = tw.length >= 5 ? 2 : 1;
    if (bestIdx !== -1 && bestDist <= maxNear) {
      used[bestIdx] = true;
      near++;
      return { w: tw, status: 'near', heard: userW[bestIdx] };
    }
    missing++;
    return { w: tw, status: 'bad', heard: '' };
  });

  const extraWords = userW.filter((_, ui) => !used[ui]);
  const rawScore = ((exact + near * 0.65) / Math.max(1, targetW.length)) * 100 - extraWords.length * 4;
  const pct = Math.max(0, Math.min(100, Math.round(rawScore)));
  return { pct, exact, near, missing, extraCount: extraWords.length, extraWords, total: targetW.length, tokens };
}

function getIpaArticulationTips(wordsArr) {
  const tips = [];
  const joined = wordsArr.join(' ').toLowerCase();
  if (/th/.test(joined)) tips.push('Âm /θ/ – /ð/ (th): Đặt nhẹ đầu lưỡi giữa hai hàm răng và đẩy luồng hơi ra, tránh đọc thành /t/ hoặc /d/.');
  if (/sh|tion|ci/.test(joined)) tips.push('Âm /ʃ/ (sh/tion): Chu môi nhẹ và đẩy hơi êm, phân biệt rõ với âm /s/.');
  if (/ng\b/.test(joined)) tips.push('Âm cuối /ŋ/ (-ng): Nâng cuống lưỡi chạm vòm mềm, không bật thêm âm /g/ cứng ở cuối.');
  if (/r/.test(joined)) tips.push('Âm /r/: Hơi cong đầu lưỡi vào trong, không chạm vòm miệng để âm vang tự nhiên.');
  if (!tips.length) tips.push('Giữ nhịp nối âm (linking sounds) giữa phụ âm cuối và nguyên âm đầu của từ kế tiếp, nhấn rõ trọng âm từ chính.');
  return tips.slice(0, 3);
}

function getCefrBadgeClass(lv) {
  const u = String(lv || 'B1').toUpperCase();
  if (u.includes('A1')) return 'lnp-lvl-a1';
  if (u.includes('A2')) return 'lnp-lvl-a2';
  if (u.includes('B1')) return 'lnp-lvl-b1';
  if (u.includes('B2')) return 'lnp-lvl-b2';
  if (u.includes('C1')) return 'lnp-lvl-c1';
  if (u.includes('C2')) return 'lnp-lvl-c2';
  return 'lnp-lvl-b1';
}

function getListeningLessonProgressPct(vid) {
  if (!vid || !Array.isArray(vid.lines) || !vid.lines.length) return 0;
  const map = state.dictationLineAnswers[vid.id] || {};
  const doneCnt = Object.values(map).filter(v => typeof v === 'string' && v.trim().length > 0).length;
  if (state.completedItems.listening[vid.id]) return Math.max(100, Math.round((doneCnt / vid.lines.length) * 100));
  return Math.min(100, Math.round((doneCnt / vid.lines.length) * 100));
}

function openListeningModeGuide(vidId) {
  const vid = state.listeningVideos.find(x => x.id === vidId);
  if (!vid) return;
  const modal = document.getElementById('listening-mode-modal');
  if (!modal) { startListeningLesson(vidId, state.listeningMode); return; }
  const curMode = state.listeningMode || 'dictation';
  const modes = [
    { id: 'dictation', ic: '⌨️', title: 'Nghe chép chính tả (3 cấp độ)', desc: 'Nghe và chép lại theo từng câu (Dễ • Vừa • Khó, có gợi ý từng từ)' },
    { id: 'pronunciation', ic: '🎙️', title: 'Luyện phát âm (Shadowing)', desc: 'Nghe mẫu, thu âm nói lại & chấm điểm từng từ + âm vị IPA' },
    { id: 'bilingual', ic: '🌐', title: 'Phụ đề song ngữ & IPA', desc: 'Xem phụ đề Anh – Việt + phiên âm IPA đồng bộ từng giây video' },
    { id: 'quiz', ic: '📝', title: 'Bài tập Nghe hiểu & Từ vựng', desc: 'Làm câu hỏi trắc nghiệm & điền từ kiểm tra mức hiểu bài nghe' }
  ];
  modal.innerHTML = `
    <div class="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-md space-y-4 shadow-2xl border-2 border-teal-500">
      <div class="flex justify-between items-start gap-2">
        <div>
          <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full ${getCefrBadgeClass(vid.cefr || vid.level)}">${escapeHtml(vid.cefr || vid.level)} • ${escapeHtml(vid.category)}</span>
          <h3 class="font-black text-base text-slate-900 mt-1">Bạn muốn luyện bài này thế nào?</h3>
          <div class="text-xs text-slate-500 line-clamp-1 mt-0.5">${escapeHtml(vid.title)} (${vid.lines.length} câu)</div>
        </div>
        <button onclick="closeModal('listening-mode-modal')" class="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-bold cursor-pointer">✕</button>
      </div>
      <div class="space-y-2" id="dt-guide-opts">
        ${modes.map(m => `
          <button type="button" onclick="startListeningLesson('${vid.id}','${m.id}')" class="dt-mode-option ${curMode === m.id ? 'is-active' : ''}">
            <span class="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-lg shrink-0">${m.ic}</span>
            <span class="min-w-0">
              <span class="block font-extrabold text-xs sm:text-sm text-slate-900">${m.title}</span>
              <span class="block text-[11px] text-slate-500 mt-0.5">${m.desc}</span>
            </span>
          </button>`).join('')}
      </div>
      <div class="flex justify-end gap-2 pt-1">
        <button onclick="closeModal('listening-mode-modal')" class="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer">Huỷ</button>
        <button onclick="startListeningLesson('${vid.id}','${curMode}')" class="px-5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer shadow">Bắt đầu học →</button>
      </div>
    </div>`;
  modal.classList.remove('hidden');
}

function startListeningLesson(vidId, mode) {
  closeModal('listening-mode-modal');
  state.listeningId = vidId;
  state.listeningMode = mode || 'dictation';
  state.listeningView = 'practice';
  state.listeningLineIdx = 0;
  state.dictationHintCount = 0;
  state.dictationResult = null;
  state.pronResult = null;
  state.listeningQuizGraded = false;
  const savedMap = state.dictationLineAnswers[vidId] || {};
  state.dictationInput = savedMap[0] || '';
  render();
  setTimeout(() => initListeningYoutubePlayerIfNeeded(), 120);
}

function selectListeningLine(idx, autoPlay = true) {
  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  if (!vid) return;
  const clamped = Math.max(0, Math.min(vid.lines.length - 1, idx));
  state.listeningLineIdx = clamped;
  state.dictationHintCount = 0;
  state.dictationResult = null;
  state.pronResult = null;
  const savedMap = state.dictationLineAnswers[vid.id] || {};
  state.dictationInput = savedMap[clamped] || '';
  render();
  setTimeout(() => {
    initListeningYoutubePlayerIfNeeded(() => {
      if (autoPlay) playCurrentListeningSegment();
    });
  }, 60);
}

function initListeningYoutubePlayerIfNeeded(onReadyCb) {
  if (state.nav !== 'listening' || state.listeningView !== 'practice') return;
  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  const host = document.getElementById('ls-yt-player-box');
  if (!vid || !vid.youtubeId || !host) { if (onReadyCb) onReadyCb(); return; }

  const createNow = () => {
    if (!document.getElementById('ls-yt-player-box')) return;
    try {
      if (state.lsYtPlayer && typeof state.lsYtPlayer.destroy === 'function') {
        try { state.lsYtPlayer.destroy(); } catch {}
      }
      state.lsYtPlayer = new YT.Player('ls-yt-player-box', {
        videoId: vid.youtubeId,
        width: '100%',
        height: '100%',
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: (ev) => {
            state.lsYtVideoId = vid.youtubeId;
            try { ev.target.setPlaybackRate(state.listeningSpeed || 1); } catch {}
            if (onReadyCb) onReadyCb();
          }
        }
      });
    } catch {
      if (onReadyCb) onReadyCb();
    }
  };

  if (window.YT && window.YT.Player) {
    createNow();
  } else {
    const prevCb = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (prevCb) try { prevCb(); } catch {}
      createNow();
    };
    if (!document.getElementById('yt-iframe-api-script')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api-script';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }
}

function playCurrentListeningSegment(rateOverride = null) {
  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  if (!vid) return;
  const line = vid.lines[state.listeningLineIdx] || vid.lines[0];
  const rate = rateOverride || state.listeningSpeed || 1.0;
  clearInterval(state.lsSegTimer);

  if (vid.youtubeId && state.lsYtPlayer && typeof state.lsYtPlayer.seekTo === 'function' && (line.e > line.s)) {
    try {
      state.lsYtPlayer.setPlaybackRate(rate);
      state.lsYtPlayer.seekTo(Math.max(0, line.s - 0.12), true);
      state.lsYtPlayer.playVideo();
      if (state.listeningAutoPause) {
        state.lsSegTimer = setInterval(() => {
          try {
            const curT = state.lsYtPlayer.getCurrentTime ? state.lsYtPlayer.getCurrentTime() : 0;
            if (curT >= line.e + 0.15) {
              state.lsYtPlayer.pauseVideo();
              clearInterval(state.lsSegTimer);
            }
          } catch { clearInterval(state.lsSegTimer); }
        }, 120);
      }
      return;
    } catch {}
  }
  speak(line.en, 'en-US', Math.min(1.2, Math.max(0.65, rate)));
}

function buildDictationScaffoldHtml(enText, diff, hintCount) {
  const rawTokens = String(enText || '').trim().split(/\s+/).filter(Boolean);
  return rawTokens.map((tok, idx) => {
    const clean = tok.replace(/[^A-Za-z0-9']/g, '');
    const punc = tok.slice(clean.length);
    if (idx < hintCount) {
      return `<span class="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-mono font-bold border border-amber-300">${escapeHtml(tok)}</span>`;
    }
    if (diff === 'easy') {
      // Easy: show ~60% short/function words, mask content words
      const show = (clean.length <= 3 && idx % 2 === 0) || idx === 0;
      if (show) return `<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-semibold">${escapeHtml(tok)}</span>`;
      return `<span class="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-mono border border-teal-200">${clean[0] || '_'}${'_'.repeat(Math.max(2, clean.length - 1))}${escapeHtml(punc)}</span>`;
    }
    if (diff === 'medium') {
      return `<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">${idx % 2 === 0 ? escapeHtml(clean[0] || '_') : '_'}${'_'.repeat(Math.max(2, clean.length - 1))}${escapeHtml(punc)}</span>`;
    }
    return `<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-mono">${'_'.repeat(Math.max(3, clean.length))}${escapeHtml(punc)}</span>`;
  }).join(' ');
}

function revealNextDictationHint() {
  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  const line = vid.lines[state.listeningLineIdx] || vid.lines[0];
  const words = String(line.en || '').trim().split(/\s+/).filter(Boolean);
  state.dictationHintCount = Math.min(words.length, (state.dictationHintCount || 0) + 1);
  render();
}

function onDictationKeyDown(ev) {
  if (ev.key === 'Enter' && !ev.shiftKey) {
    ev.preventDefault();
    if (state.dictationResult && state.dictationResult.pct >= 85) {
      const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
      if (state.listeningLineIdx + 1 < vid.lines.length) {
        selectListeningLine(state.listeningLineIdx + 1, true);
      } else {
        notify('🎉 Hoàn thành toàn bộ bài nghe! Bạn làm rất tốt!');
      }
    } else {
      gradeDictationLine();
    }
  }
}

function gradeDictationLine() {
  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  const line = vid.lines[state.listeningLineIdx] || vid.lines[0];
  const inp = (document.getElementById('ls-dict-inp')?.value || state.dictationInput || '').trim();
  state.dictationInput = inp;
  if (!inp) { notify('⚠️ Hãy nghe và gõ lại câu tiếng Anh (hoặc bấm Mic nói thay gõ)!'); return; }

  const cmp = compareWordsDetailed(line.en, inp);
  const band = pctToIeltsBand(cmp.pct);
  state.dictationResult = { ...cmp, ieltsBand: band, targetEn: line.en, targetVi: line.vi, targetIpa: line.ipa || '' };

  if (!state.dictationLineAnswers[vid.id]) state.dictationLineAnswers[vid.id] = {};
  state.dictationLineAnswers[vid.id][state.listeningLineIdx] = inp;
  saveJson('tamn_dict_answers_v1', state.dictationLineAnswers);

  if (state.currentUser && !isAdmin() && cmp.pct >= 70) {
    state.currentUser.coins = (state.currentUser.coins || 0) + 5;
    saveUsers();
  }
  if (getListeningLessonProgressPct(vid) >= 80 || state.listeningLineIdx === vid.lines.length - 1) {
    state.completedItems.listening[vid.id] = band;
  }
  saveLearningProgressNow();
  render();
}

function dictateByVoiceInsteadOfTyping() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { notify('⚠️ Trình duyệt chưa hỗ trợ nhận giọng nói — bạn gõ vào ô nhé!'); return; }
  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.onresult = (ev) => {
    const txt = (ev.results[0] && ev.results[0][0] && ev.results[0][0].transcript) || '';
    if (txt) {
      state.dictationInput = txt;
      notify('🎙️ Đã điền lời bạn nói. Sửa lại nếu cần rồi bấm Kiểm tra!');
      render();
    }
  };
  rec.onerror = () => notify('⚠️ Hãy cấp quyền Micro cho trình duyệt!');
  rec.start();
  notify('🎙️ Đang nghe… hãy đọc câu bạn vừa nghe được!');
}

async function startListeningPronMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (state.pronListening) {
    if (state.pronRec) { try { state.pronRec.stop(); } catch {} }
    if (state.pronMediaRecorder && state.pronMediaRecorder.state !== 'inactive') {
      try { state.pronMediaRecorder.stop(); } catch {}
    }
    state.pronListening = false;
    render();
    return;
  }
  if (!SR) { notify('⚠️ Trình duyệt không hỗ trợ chấm phát âm trực tiếp — hãy mở bằng Chrome hoặc Edge!'); return; }

  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  const line = vid.lines[state.listeningLineIdx] || vid.lines[0];

  // Also record real audio blob so learner can replay their own voice like luyennguphap!
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks = [];
      mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (chunks.length) {
          if (state.pronAudioUrl) URL.revokeObjectURL(state.pronAudioUrl);
          state.pronAudioUrl = URL.createObjectURL(new Blob(chunks, { type: 'audio/webm' }));
          render();
        }
      };
      mr.start();
      state.pronMediaRecorder = mr;
    }
  } catch {}

  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = false;
  state.pronRec = rec;
  state.pronListening = true;
  rec.onresult = (ev) => {
    const spoken = ev.results[0][0].transcript || '';
    const cmp = compareWordsDetailed(line.en, spoken);
    const band = pctToIeltsBand(cmp.pct);
    const badWords = cmp.tokens.filter(t => t.status !== 'ok').map(t => t.w);
    const ipaTips = getIpaArticulationTips(badWords.length ? badWords : normWords(line.en));
    state.pronResult = { ...cmp, spoken, ieltsBand: band, ipaTips };
    state.pronListening = false;
    if (state.pronMediaRecorder && state.pronMediaRecorder.state !== 'inactive') {
      try { state.pronMediaRecorder.stop(); } catch {}
    }
    if (cmp.pct >= 75) state.completedItems.listening[vid.id] = band;
    saveLearningProgressNow();
    notify(`🎙️ Điểm phát âm Shadowing: ${cmp.pct}/100 (IELTS Band ${band})!`);
    render();
  };
  rec.onerror = () => {
    state.pronListening = false;
    if (state.pronMediaRecorder && state.pronMediaRecorder.state !== 'inactive') { try { state.pronMediaRecorder.stop(); } catch {} }
    notify('⚠️ Không nhận được giọng nói. Kiểm tra quyền Micro rồi thử lại nhé!');
    render();
  };
  rec.onend = () => {
    state.pronListening = false;
    if (state.pronMediaRecorder && state.pronMediaRecorder.state !== 'inactive') { try { state.pronMediaRecorder.stop(); } catch {} }
    render();
  };
  rec.start();
  notify('🎙️ Đang ghi âm… đọc to câu mẫu rồi bấm dừng để chấm!');
  render();
}

function playRecordedUserPron() {
  if (!state.pronAudioUrl) return;
  const a = new Audio(state.pronAudioUrl);
  a.play().catch(() => {});
}

function buildListeningComprehensionQuiz(vid) {
  const lines = (vid && vid.lines) || [];
  const qs = [];
  const step = Math.max(1, Math.floor(lines.length / 4));
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const ln = lines[Math.min(lines.length - 1, i * step)];
    const other1 = lines[(i * step + 2) % lines.length]?.vi || 'Không được nhắc tới trong đoạn hội thoại này.';
    const other2 = lines[(i * step + 5) % lines.length]?.vi || 'Thông tin trái ngược hoàn toàn với bài nghe.';
    const correctVi = ln.vi || simpleEnToViTranslate(ln.en);
    const opts = Array.from(new Set([
      correctVi,
      other1 !== correctVi ? other1 : 'Người nói từ chối tham gia hoạt động này.',
      other2 !== correctVi ? other2 : 'Sự việc chỉ diễn ra vào mùa đông năm ngoái.',
      'Không có chi tiết nào liên quan trong video.'
    ])).slice(0, 4);
    while (opts.length < 4) opts.push('Phương án nhiễu #' + (opts.length + 1));
    // Deterministic shuffle
    const rot = (i + ln.en.length) % opts.length;
    const rotated = opts.slice(rot).concat(opts.slice(0, rot));
    qs.push({
      type: 'mcq',
      q: `${i + 1}. Câu thoại "${ln.en}" trong bài nghe mang ý nghĩa chính xác là gì?`,
      options: rotated,
      answer: rotated.indexOf(correctVi),
      explain: `Nghĩa chuẩn trong bài: "${correctVi}"${ln.t ? ` (Mốc ${ln.t})` : ''}.`
    });
  }
  // Question 5: Keyword gap-fill from transcript
  const targetLn = lines[Math.min(lines.length - 1, 1)] || lines[0];
  if (targetLn) {
    const words = targetLn.en.split(/\s+/);
    const cand = words.find(w => w.replace(/[^a-zA-Z]/g, '').length >= 4) || words[0] || 'English';
    const cleanAns = cand.replace(/[^a-zA-Z0-9']/g, '');
    qs.push({
      type: 'fill',
      q: `${qs.length + 1}. [Nghe & Điền từ khóa] ${targetLn.en.replace(cleanAns, '______')} (${targetLn.vi || ''})`,
      answerText: cleanAns,
      explain: `Câu đầy đủ trong video: "${targetLn.en}"`
    });
  }
  return qs;
}

function quickSaveWordToPersonalNotebook(word, meaning) {
  const w = String(word || '').trim();
  if (!w) return;
  const m = String(meaning || simpleEnToViTranslate(w) || 'Từ vựng lưu từ bài học').trim();
  if (!state.currentUser) {
    notify(`💡 Đã tra "${w}": ${m} (Đăng nhập để lưu vĩnh viễn vào Sổ từ!)`);
    return;
  }
  if (!Array.isArray(state.currentUser.personalWords)) state.currentUser.personalWords = [];
  if (!state.currentUser.personalWords.some(x => x.word.toLowerCase() === w.toLowerCase())) {
    state.currentUser.personalWords.unshift({ word: w, meaning: m });
    if (isAdmin()) saveJson('tamn_admin_pwords_v1', state.currentUser.personalWords);
    else { saveUsers(); pushSingleUserToCloud(state.currentUser); }
  }
  notify(`⭐ Đã lưu "${w}" vào Sổ từ cá nhân!`);
}

function quickCreateYoutubeListeningLesson(e) {
  e.preventDefault();
  const urlInp = (document.getElementById('lnp-yt-quick-url')?.value || '').trim();
  const titleInp = (document.getElementById('lnp-yt-quick-title')?.value || '').trim();
  const lvlInp = document.getElementById('lnp-yt-quick-lvl')?.value || 'B1';
  const scriptInp = (document.getElementById('lnp-yt-quick-script')?.value || '').trim();
  const ytId = extractYoutubeId(urlInp);
  if (!ytId) {
    notify('⚠️ Hãy dán đúng đường link YouTube hợp lệ (VD: https://www.youtube.com/watch?v=...)!');
    return;
  }
  const rawSentences = scriptInp
    ? scriptInp.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(Boolean)
    : [
        'Welcome to this custom YouTube English listening practice.',
        'Listen carefully to each sentence and type what you hear.',
        'Consistent daily shadowing improves both pronunciation and fluency.'
      ];
  const lines = rawSentences.map((en, idx) => ({
    en,
    vi: simpleEnToViTranslate(en),
    ipa: '',
    s: idx * 6,
    e: (idx + 1) * 6,
    t: fmtMmSsRange(idx * 6, (idx + 1) * 6)
  }));
  const newVid = {
    id: 'ls-yt-custom-' + Date.now(),
    cefr: lvlInp,
    level: lvlInp,
    category: 'Bài nghe của tôi',
    title: titleInp || `Bài nghe YouTube tự thêm (${ytId})`,
    uploader: state.currentUser ? state.currentUser.name : 'Học viên',
    sourceOrigin: 'user',
    verifiedByAi: true,
    youtubeId: ytId,
    durationSeconds: lines.length * 6,
    viewCount: 1,
    img: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`,
    lines
  };
  state.listeningVideos.unshift(newVid);
  const saved = loadJson('tamn_user_listening_v1', []);
  saved.unshift(newVid);
  saveJson('tamn_user_listening_v1', saved);
  notify('✅ Đã biến Video YouTube thành bài học 3 chế độ chuẩn Luyện Ngữ Pháp!');
  openListeningModeGuide(newVid.id);
}

function uploadCommunityListeningVideo(e) {
  e.preventDefault();
  if (!state.currentUser) { notify('🔐 Hãy đăng nhập tài khoản thật để tải video học tập lên cho mọi người!'); openAuth('register'); return; }
  const title = (document.getElementById('ul-title')?.value || '').trim();
  const link = (document.getElementById('ul-link')?.value || '').trim();
  const fileEl = document.getElementById('ul-file');
  const scriptRaw = (document.getElementById('ul-script')?.value || '').trim();
  if (!title || !scriptRaw) { notify('⚠️ Vui lòng nhập Tiêu đề và Nội dung lời thoại tiếng Anh!'); return; }

  const blockedTerms = ['18+','casino','scam','betting'];
  const fullCheck = (title + ' ' + scriptRaw + ' ' + link).toLowerCase();
  const hitBad = blockedTerms.find(b => fullCheck.includes(b));
  if (hitBad) {
    state.listeningUploadLog = '⛔ Hệ thống kiểm duyệt từ chối nội dung không phù hợp tiêu chuẩn học tập!';
    notify('⛔ Nội dung không đạt tiêu chuẩn cộng đồng học tập!');
    render();
    return;
  }

  const ytId = extractYoutubeId(link) || '';
  let localMediaUrl = '';
  if (fileEl?.files?.[0]) {
    try { localMediaUrl = URL.createObjectURL(fileEl.files[0]); } catch {}
  }
  const sentences = scriptRaw.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(s => s.length > 2);
  const lines = (sentences.length ? sentences : [scriptRaw]).map((en, idx) => ({
    en,
    vi: simpleEnToViTranslate(en),
    ipa: '',
    s: idx * 6,
    e: (idx + 1) * 6,
    t: fmtMmSsRange(idx * 6, (idx + 1) * 6)
  }));

  const newVid = {
    id: 'ls-user-' + Date.now(),
    cefr: 'B1',
    level: 'B1',
    category: 'Bài nghe của tôi',
    title,
    uploader: state.currentUser.name,
    sourceOrigin: 'user',
    verifiedByAi: true,
    youtubeId: ytId,
    localMediaUrl,
    durationSeconds: lines.length * 6,
    viewCount: 1,
    img: ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    lines
  };

  state.listeningVideos.unshift(newVid);
  const saved = loadJson('tamn_user_listening_v1', []);
  saved.unshift({ ...newVid, localMediaUrl: '' });
  saveJson('tamn_user_listening_v1', saved);

  state.listeningUploadLog = `✅ Đã xuất bản "${title}" với đủ Nghe chép chính tả 3 cấp, Shadowing IPA & Phụ đề song ngữ!`;
  e.target.reset();
  openListeningModeGuide(newVid.id);
}

function startSplitResize(ev, kind) {
  ev.preventDefault();
  const container = ev.target.closest('.lnp-split-container');
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const onMove = (me) => {
    const pct = Math.max(30, Math.min(68, Math.round(((me.clientX - rect.left) / Math.max(1, rect.width)) * 100)));
    container.style.setProperty('--split-left', pct + '%');
    if (kind === 'listening') state.listeningSplitPct = pct;
    else state.readingSplitPct = pct;
  };
  const onUp = () => {
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
}

function renderListening(v) {
  // MÀN 1: THƯ VIỆN BÀI NGHE GIỐNG 100% LUYENNGUPHAP.COM/DICTATION
  if (state.listeningView !== 'practice') {
    const cefrs = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const allCats = ['ALL', 'IELTS', 'Daily Conversations', 'Nghe 1 phút mỗi ngày', 'Learning resources', 'Cartoon', 'Movie short clip', 'Biến youtube thành trường học thứ hai', 'BBC', 'Vietnam Today', 'TED', 'Bài nghe của tôi'];
    const q = (state.listeningQuery || '').trim().toLowerCase();

    const filtered = state.listeningVideos.filter(item => {
      const lv = String(item.cefr || item.level || 'B1').toUpperCase();
      if (state.listeningCefr !== 'ALL' && !lv.includes(state.listeningCefr)) return false;
      if (state.listeningCat !== 'ALL') {
        if (state.listeningCat === 'Bài nghe của tôi') {
          if (item.sourceOrigin !== 'user' && item.sourceOrigin !== 'web') return false;
        } else if (String(item.category || '').toLowerCase() !== state.listeningCat.toLowerCase()) {
          return false;
        }
      }
      const dur = Number(item.durationSeconds) || 90;
      if (state.listeningDurFilter === 'short' && dur > 300) return false;
      if (state.listeningDurFilter === 'medium' && (dur <= 300 || dur > 1200)) return false;
      if (state.listeningDurFilter === 'long' && dur <= 1200) return false;
      if (q && !(item.title + ' ' + item.category + ' ' + lv).toLowerCase().includes(q)) return false;
      return true;
    });

    const perPage = 16;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    state.listeningPage = Math.max(1, Math.min(totalPages, state.listeningPage || 1));
    const pageItems = filtered.slice((state.listeningPage - 1) * perPage, state.listeningPage * perPage);
    const doneTotal = Object.keys(state.completedItems.listening || {}).length;

    v.innerHTML = `
      <div class="space-y-4">
        <!-- Header & Stats giống luyennguphap.com/dictation -->
        <div class="travel-card p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3 border-l-4 border-teal-600">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">🎧 THƯ VIỆN LUYỆN NGHE SONG NGỮ • ${state.listeningVideos.length} BÀI NGHE</span>
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Đã hoàn thành: ${doneTotal} bài</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-1">Biến Video YouTube Thành Bài Học Song Ngữ (3 Chế Độ & Bài Tập)</h1>
            <p class="text-xs text-slate-600 mt-0.5">Nghe chép chính tả 3 cấp độ (Dễ • Vừa • Khó), Luyện phát âm Shadowing chấm từng âm IPA, Phụ đề song ngữ & Bài tập nghe hiểu trên cùng một màn.</p>
          </div>
          <button onclick="state.listeningUploadOpen=!state.listeningUploadOpen;render()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer shrink-0">
            ${state.listeningUploadOpen ? '▲ Đóng khung tạo bài nghe' : '➕ Thêm Video YouTube / Tải File Của Bạn'}
          </button>
        </div>

        <!-- Dán link YouTube tạo bài nghe ngay (giống DictationYoutubePage của luyennguphap) -->
        ${state.listeningUploadOpen ? `
          <div class="grid md:grid-cols-2 gap-4">
            <form onsubmit="quickCreateYoutubeListeningLesson(event)" class="travel-card p-4 space-y-2.5 text-xs border-2 border-teal-500 bg-teal-50/30">
              <div class="font-extrabold text-sm text-teal-900">📺 Dán Link YouTube → Tạo Bài Nghe 3 Chế Độ Ngay</div>
              <div class="grid sm:grid-cols-3 gap-2">
                <input id="lnp-yt-quick-url" required placeholder="Dán link video YouTube vào đây..." class="sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-[var(--border)]" />
                <select id="lnp-yt-quick-lvl" class="px-2.5 py-2 rounded-xl bg-white border border-[var(--border)] font-bold">
                  <option value="A1">Level A1</option><option value="A2">Level A2</option><option value="B1" selected>Level B1</option>
                  <option value="B2">Level B2</option><option value="C1">Level C1</option><option value="C2">Level C2</option>
                </select>
              </div>
              <input id="lnp-yt-quick-title" placeholder="Tên bài nghe (để trống sẽ tự đặt theo mã video)..." class="w-full px-3 py-2 rounded-xl bg-white border border-[var(--border)]" />
              <textarea id="lnp-yt-quick-script" rows="2" placeholder="Dán phụ đề tiếng Anh (tùy chọn — mỗi câu 1 dòng để tách câu chép chính tả)..." class="w-full p-2.5 rounded-xl bg-white border border-[var(--border)]"></textarea>
              <button type="submit" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">✨ Tạo Bài Nghe Ngay</button>
            </form>

            <form onsubmit="uploadCommunityListeningVideo(event)" class="travel-card p-4 space-y-2 text-xs border border-[var(--border)]">
              <div class="font-extrabold text-sm text-slate-800">📤 Hoặc Tải File Video / MP3 Từ Máy Lên</div>
              <input id="ul-title" required placeholder="Tiêu đề bài nghe..." class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
              <input id="ul-link" type="url" placeholder="Link YouTube (nếu có)..." class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
              <input id="ul-file" type="file" accept="video/*,audio/*" class="w-full text-[11px]" />
              <textarea id="ul-script" rows="2" required placeholder="Lời thoại tiếng Anh..." class="w-full p-2 rounded-xl bg-[var(--content)] border border-[var(--border)]"></textarea>
              <button type="submit" class="px-4 py-2 rounded-xl bg-sky-600 text-white font-extrabold cursor-pointer">🤖 Duyệt & Tạo Bài Học</button>
            </form>
          </div>` : ''}

        <!-- Bộ lọc Level + Chủ đề + Thời lượng + Tìm kiếm -->
        <div class="travel-card p-3.5 space-y-3 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap gap-1.5 items-center">
              <span class="font-extrabold text-slate-500 mr-1">Cấp độ:</span>
              ${cefrs.map(lv => `
                <button onclick="state.listeningCefr='${lv}';state.listeningPage=1;render()" class="px-3 py-1.5 rounded-full font-extrabold cursor-pointer border ${state.listeningCefr === lv ? 'bg-teal-600 text-white border-transparent shadow-sm' : 'bg-white border-[var(--border)] hover:border-teal-500'}">
                  ${lv === 'ALL' ? `Tất cả cấp độ (${state.listeningVideos.length})` : lv}
                </button>`).join('')}
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <select onchange="state.listeningDurFilter=this.value;state.listeningPage=1;render()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold">
                <option value="ALL" ${state.listeningDurFilter==='ALL'?'selected':''}>⏱ Mọi thời lượng</option>
                <option value="short" ${state.listeningDurFilter==='short'?'selected':''}>Dưới 5 phút</option>
                <option value="medium" ${state.listeningDurFilter==='medium'?'selected':''}>5 – 20 phút</option>
                <option value="long" ${state.listeningDurFilter==='long'?'selected':''}>Trên 20 phút</option>
              </select>
              <input id="ls-browser-q" type="text" value="${escapeHtml(state.listeningQuery)}" oninput="state.listeningQuery=this.value;state.listeningPage=1;render()" placeholder="🔍 Tìm kiếm bài nghe (BBC, IELTS, TED, Daily...)" class="px-3.5 py-1.5 rounded-xl bg-[var(--content)] focus:bg-white border border-[var(--border)] w-64 font-medium" />
            </div>
          </div>

          <!-- Chủ đề ngang giống luyennguphap -->
          <div class="flex gap-1.5 overflow-x-auto pb-1">
            ${allCats.map(cat => {
              const cnt = cat === 'ALL'
                ? state.listeningVideos.length
                : cat === 'Bài nghe của tôi'
                ? state.listeningVideos.filter(x => x.sourceOrigin === 'user' || x.sourceOrigin === 'web').length
                : state.listeningVideos.filter(x => String(x.category || '').toLowerCase() === cat.toLowerCase()).length;
              return `<button onclick="state.listeningCat='${cat.replace(/'/g,"\\'")}';state.listeningPage=1;render()" class="shrink-0 px-3 py-1.5 rounded-xl font-bold cursor-pointer border ${state.listeningCat === cat ? 'bg-slate-900 text-white border-transparent' : 'bg-[var(--content)] border-[var(--border)] text-slate-700 hover:bg-white'}">${cat === 'ALL' ? '📚 Tất cả chủ đề' : escapeHtml(cat)} <span class="opacity-70 font-mono">(${cnt})</span></button>`;
            }).join('')}
          </div>
        </div>

        <!-- Lưới Video Cards giống 100% dt-admin-video-card của luyennguphap.com -->
        ${!pageItems.length ? `
          <div class="travel-card p-10 text-center text-xs text-slate-500">Không có bài nghe nào khớp với bộ lọc hiện tại.</div>
        ` : `
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${pageItems.map(item => {
              const mins = Math.max(1, Math.ceil((Number(item.durationSeconds) || 60) / 60));
              const views = (Number(item.viewCount) || 1200).toLocaleString('vi-VN');
              const progPct = getListeningLessonProgressPct(item);
              const isDone = progPct >= 100 || Boolean(state.completedItems.listening[item.id]);
              return `
                <div onclick="openListeningModeGuide('${item.id}')" class="dt-video-card cursor-pointer ${isDone ? 'is-completed' : ''}">
                  <div class="relative aspect-video bg-slate-900 overflow-hidden">
                    <img src="${item.img}" alt="${escapeHtml(item.title)}" loading="lazy" class="w-full h-full object-cover" />
                    <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/75 text-white text-[10px] font-bold backdrop-blur-sm">👁 ${views}</span>
                    <span class="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[11px] font-black shadow ${getCefrBadgeClass(item.cefr || item.level)}">${escapeHtml(item.cefr || item.level)}</span>
                    <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-slate-950/80 text-white text-[10px] font-mono font-bold">${mins} phút • ${item.lines.length} câu</span>
                    ${isDone ? `<span class="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg bg-emerald-600 text-white text-[10px] font-extrabold">✓ Hoàn thành</span>` : ''}
                  </div>
                  <div class="p-3.5 flex-1 flex flex-col justify-between gap-2 text-xs">
                    <div>
                      <div class="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">${escapeHtml(item.category)}</div>
                      <div class="font-extrabold text-slate-900 line-clamp-2 mt-0.5 leading-snug">${escapeHtml(item.title)}</div>
                    </div>
                    <div class="space-y-1 pt-1">
                      <div class="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div style="width:${progPct}%;height:100%;background:#0d9488;"></div></div>
                      <div class="flex justify-between items-center text-[10px] text-slate-500 font-bold">
                        <span>${progPct > 0 ? `Đã luyện ${progPct}%` : 'Chép • Phát âm • Song ngữ'}</span>
                        <span class="text-teal-700">Học ngay →</span>
                      </div>
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        `}

        <!-- Phân trang -->
        <div class="flex justify-between items-center pt-2 text-xs">
          <span class="text-slate-500 font-semibold">Hiển thị ${pageItems.length} / ${filtered.length} bài nghe (Trang ${state.listeningPage}/${totalPages})</span>
          <div class="flex items-center gap-1.5">
            <button onclick="state.listeningPage=Math.max(1,state.listeningPage-1);render()" ${state.listeningPage<=1?'disabled':''} class="px-3.5 py-1.5 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">← Trước</button>
            <span class="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-mono font-extrabold">${state.listeningPage} / ${totalPages}</span>
            <button onclick="state.listeningPage=Math.min(${totalPages},state.listeningPage+1);render()" ${state.listeningPage>=totalPages?'disabled':''} class="px-3.5 py-1.5 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Sau →</button>
          </div>
        </div>
      </div>`;
    return;
  }

  // MÀN 2: PHÒNG LUYỆN NGHE SPLIT-PANE GIỐNG 100% DICTATIONPRACTICEPAGE CỦA LUYENNGUPHAP.COM
  const vid = state.listeningVideos.find(x => x.id === state.listeningId) || state.listeningVideos[0];
  const lineIdx = Math.max(0, Math.min(vid.lines.length - 1, state.listeningLineIdx || 0));
  state.listeningLineIdx = lineIdx;
  const line = vid.lines[lineIdx] || vid.lines[0];
  const progPct = getListeningLessonProgressPct(vid);
  const quizList = buildListeningComprehensionQuiz(vid);

  let quizCorrect = 0;
  if (state.listeningQuizGraded) {
    quizList.forEach((qu, qi) => {
      const uAns = state.listeningQuizAnswers[`${vid.id}_${qi}`];
      if (qu.type === 'fill') {
        if (String(uAns || '').trim().toLowerCase() === qu.answerText.toLowerCase()) quizCorrect++;
      } else if (Number(uAns) === qu.answer) quizCorrect++;
    });
  }

  v.innerHTML = `
    <div class="space-y-3">
      <!-- Top Sticky Practice Bar giống hệt luyennguphap.com -->
      <div class="travel-card p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-2 min-w-0">
          <button onclick="clearInterval(state.lsSegTimer);state.listeningView='browser';render()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] hover:bg-teal-50 border border-[var(--border)] font-extrabold cursor-pointer shrink-0">← Quay lại</button>
          <span class="px-2.5 py-0.5 rounded-full font-black text-[11px] shrink-0 ${getCefrBadgeClass(vid.cefr || vid.level)}">${escapeHtml(vid.cefr || vid.level)}</span>
          <h2 class="font-extrabold text-sm text-slate-900 truncate max-w-md">${escapeHtml(vid.title)}</h2>
        </div>

        <!-- 4 Chế độ trên cùng 1 màn -->
        <div class="flex flex-wrap items-center gap-1.5">
          <div class="inline-flex p-1 rounded-xl bg-[var(--content)] border border-[var(--border)] gap-1">
            ${[
              ['dictation', '⌨️ Chép chính tả'],
              ['pronunciation', '🎙️ Phát âm'],
              ['bilingual', '🌐 Song ngữ'],
              ['quiz', '📝 Bài tập']
            ].map(([mId, lbl]) => `
              <button onclick="state.listeningMode='${mId}';render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-2.5 py-1.5 rounded-lg font-extrabold cursor-pointer ${state.listeningMode === mId ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-slate-700 hover:bg-white'}">${lbl}</button>
            `).join('')}
          </div>

          <!-- Cài đặt nhanh: tốc độ, ẩn video, IPA -->
          <select onchange="state.listeningSpeed=Number(this.value);if(state.lsYtPlayer&&state.lsYtPlayer.setPlaybackRate)try{state.lsYtPlayer.setPlaybackRate(state.listeningSpeed)}catch{}" class="px-2 py-1.5 rounded-xl bg-white border border-[var(--border)] font-bold">
            ${[0.6, 0.75, 0.9, 1.0, 1.25].map(sp => `<option value="${sp}" ${state.listeningSpeed===sp?'selected':''}>⚡ ${sp}x</option>`).join('')}
          </select>
          <button onclick="state.listeningHideVideo=!state.listeningHideVideo;render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-2.5 py-1.5 rounded-xl border font-bold cursor-pointer ${state.listeningHideVideo ? 'bg-slate-900 text-white border-transparent' : 'bg-white border-[var(--border)]'}">${state.listeningHideVideo ? '👁 Hiện video' : '🙈 Ẩn video'}</button>
          <button onclick="state.listeningAutoPause=!state.listeningAutoPause;render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-2.5 py-1.5 rounded-xl border font-bold cursor-pointer ${state.listeningAutoPause ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-white border-[var(--border)]'}">⏸ Tự dừng: ${state.listeningAutoPause ? 'Bật' : 'Tắt'}</button>
        </div>
      </div>

      <!-- Split-Pane 2 Cột có thanh kéo chỉnh bề rộng giống 100% luyennguphap.com -->
      <div class="lnp-split-container gap-4 lg:gap-0" style="--split-left:${state.listeningSplitPct}%;">
        <!-- Cột Trái: Video Player + Điều khiển từng dòng -->
        <div class="travel-card overflow-hidden space-y-3 p-3.5 text-xs">
          ${state.listeningHideVideo ? `
            <div class="aspect-video rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center gap-2">
              <div class="text-3xl">🎧</div>
              <div class="font-extrabold text-sm">Video đang ẩn để bạn tập trung nghe chép chính tả</div>
              <button onclick="state.listeningHideVideo=false;render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),80)" class="px-3.5 py-1.5 rounded-xl bg-teal-500 text-slate-950 font-extrabold cursor-pointer">👁 Hiện lại video</button>
            </div>
          ` : vid.localMediaUrl ? `
            <video controls src="${vid.localMediaUrl}" class="w-full rounded-2xl max-h-72 bg-slate-950"></video>
          ` : vid.youtubeId ? `
            <div class="aspect-video rounded-2xl overflow-hidden bg-slate-950">
              <div id="ls-yt-player-box" class="w-full h-full"></div>
            </div>
          ` : `
            <img src="${vid.img}" class="w-full h-52 object-cover rounded-2xl" />
          `}

          <!-- Điều khiển phát từng câu (← | Phát câu | Nghe chậm | →) -->
          <div class="p-3 rounded-2xl bg-[var(--content)] border border-[var(--border)] space-y-2.5">
            <div class="flex justify-between items-center font-bold">
              <span class="text-teal-800">🎯 Dòng ${lineIdx + 1} / ${vid.lines.length} ${line.t ? `<span class="font-mono text-slate-500 ml-1">(${escapeHtml(line.t)})</span>` : ''}</span>
              <span class="font-mono text-emerald-700">Tiến độ bài: ${progPct}%</span>
            </div>
            <div class="h-2 rounded-full bg-white overflow-hidden border border-[var(--border)]"><div style="width:${Math.round(((lineIdx + 1) / vid.lines.length) * 100)}%;height:100%;background:linear-gradient(90deg,#0d9488,#0284c7);"></div></div>

            <div class="flex flex-wrap items-center justify-between gap-1.5 pt-1">
              <button onclick="selectListeningLine(${lineIdx - 1}, true)" ${lineIdx <= 0 ? 'disabled' : ''} class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">← Dòng trước</button>
              <button onclick="playCurrentListeningSegment()" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer shadow">▶ Phát câu này</button>
              <button onclick="speak('${line.en.replace(/'/g,"\\'")}', 'en-US', 0.75)" class="px-3 py-2 rounded-xl bg-amber-400 text-slate-900 font-bold cursor-pointer" title="Đọc mẫu giọng rõ từng chữ">🐢 Mẫu chậm</button>
              <button onclick="selectListeningLine(${lineIdx + 1}, true)" ${lineIdx >= vid.lines.length - 1 ? 'disabled' : ''} class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Dòng sau →</button>
            </div>
          </div>

          <!-- Bật/Tắt IPA & Dịch Việt trong Bản chép -->
          <div class="flex flex-wrap justify-between items-center gap-2 px-1 text-[11px]">
            <div class="flex gap-1.5">
              <button onclick="state.listeningShowIpa=!state.listeningShowIpa;render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-2.5 py-1 rounded-lg border font-bold cursor-pointer ${state.listeningShowIpa?'bg-sky-50 border-sky-300 text-sky-800':'bg-white border-[var(--border)]'}">${state.listeningShowIpa ? '✓ Hiện IPA' : 'Ẩn IPA'}</button>
              <button onclick="state.listeningShowVi=!state.listeningShowVi;render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-2.5 py-1 rounded-lg border font-bold cursor-pointer ${state.listeningShowVi?'bg-teal-50 border-teal-300 text-teal-800':'bg-white border-[var(--border)]'}">${state.listeningShowVi ? '✓ Hiện nghĩa Việt' : 'Ẩn nghĩa Việt'}</button>
            </div>
            <button onclick="speak('${vid.lines.slice(0,12).map(l=>l.en).join(' ').replace(/'/g,"\\'")}')" class="font-bold text-sky-700 underline cursor-pointer">🔊 Nghe liền mạch</button>
          </div>
        </div>

        <!-- Thanh kéo giữa 2 cột -->
        <div class="hidden lg:flex lnp-split-handle" title="Kéo để chỉnh bề rộng vùng video & bản chép" onmousedown="startSplitResize(event, 'listening')"></div>

        <!-- Cột Phải: Nội dung theo từng chế độ -->
        <div class="travel-card p-4 space-y-4 text-xs">
          ${state.listeningMode === 'dictation' ? `
            <!-- CHẾ ĐỘ 1: NGHE CHÉP CHÍNH TẢ 3 CẤP ĐỘ (DỄ / VỪA / KHÓ) -->
            <div class="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-[var(--border)]">
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-slate-700">Độ khó chép:</span>
                ${[['easy','🌱 Dễ'],['medium','⚡ Vừa'],['hard','🔥 Khó']].map(([dk, dl]) => `
                  <button onclick="state.dictationDiff='${dk}';render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-3 py-1 rounded-full font-extrabold cursor-pointer border ${state.dictationDiff === dk ? 'bg-slate-900 text-white border-transparent' : 'bg-[var(--content)] border-[var(--border)]'}">${dl}</button>
                `).join('')}
              </div>
              <div class="flex gap-1.5">
                <button onclick="revealNextDictationHint()" class="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-bold cursor-pointer">💡 Gợi ý từ (${state.dictationHintCount})</button>
                <button onclick="dictateByVoiceInsteadOfTyping()" class="px-3 py-1 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 font-bold cursor-pointer">🎙️ Nói thay gõ</button>
              </div>
            </div>

            <!-- Khung gợi ý từ ẩn theo cấp độ Dễ / Vừa / Khó -->
            <div class="p-3 rounded-2xl bg-[var(--content)] border border-[var(--border)] space-y-1.5">
              <div class="text-[11px] font-bold text-slate-500">Khung câu mẫu (${state.dictationDiff === 'easy' ? 'Hiện từ nối, ẩn từ khóa' : state.dictationDiff === 'medium' ? 'Gợi ý ký tự đầu' : 'Ẩn hoàn toàn 100%'}):</div>
              <div class="flex flex-wrap gap-1.5 leading-relaxed">${buildDictationScaffoldHtml(line.en, state.dictationDiff, state.dictationHintCount)}</div>
              ${state.listeningShowVi && line.vi ? `<div class="text-teal-800 font-semibold pt-1">🇻🇳 Nghĩa câu: ${escapeHtml(line.vi)}</div>` : ''}
            </div>

            <textarea id="ls-dict-inp" rows="3" onkeydown="onDictationKeyDown(event)" oninput="state.dictationInput=this.value;scheduleProgressSave()" placeholder="Gõ những gì bạn nghe được... (Nhấn Enter để Kiểm tra / sang câu tiếp)" class="w-full p-3.5 rounded-2xl bg-white border-2 border-teal-400 focus:outline-none focus:border-teal-600 font-mono text-sm">${escapeHtml(state.dictationInput)}</textarea>

            <div class="flex flex-wrap justify-between items-center gap-2">
              <button onclick="state.dictationInput='';state.dictationResult=null;render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-3 py-2 rounded-xl bg-[var(--content)] font-bold cursor-pointer">↺ Xóa làm lại</button>
              <div class="flex gap-2">
                <button onclick="gradeDictationLine()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer shadow">✓ Kiểm tra câu (Enter)</button>
                ${state.dictationResult ? `<button onclick="selectListeningLine(${lineIdx + 1}, true)" class="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold cursor-pointer">Câu tiếp →</button>` : ''}
              </div>
            </div>

            ${state.dictationResult ? `
              <div class="p-4 rounded-2xl bg-white border-2 ${state.dictationResult.pct >= 80 ? 'border-emerald-500' : 'border-amber-400'} space-y-2.5">
                <div class="flex flex-wrap justify-between items-center gap-2 font-extrabold">
                  <span class="${state.dictationResult.pct >= 80 ? 'text-emerald-700' : 'text-amber-700'}">
                    ${state.dictationResult.pct >= 85 ? '✅ Chính xác! Nhấn Enter để sang dòng tiếp theo.' : `Đúng ${state.dictationResult.exact}/${state.dictationResult.total} từ${state.dictationResult.missing > 0 ? ` · còn thiếu ${state.dictationResult.missing} từ` : ''}${state.dictationResult.extraCount > 0 ? ` · thừa ${state.dictationResult.extraCount} từ` : ''}`}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800">Điểm ${state.dictationResult.pct}/100 • Band ${state.dictationResult.ieltsBand}</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${state.dictationResult.tokens.map(tk => `
                    <span onclick="speak('${tk.w.replace(/'/g,"\\'")}')" title="Bấm để nghe từ này" class="px-2.5 py-1 rounded-lg font-mono font-bold cursor-pointer ${tk.status === 'ok' ? 'sh-tok-ok' : tk.status === 'near' ? 'sh-tok-near' : 'sh-tok-bad'}">
                      ${escapeHtml(tk.w)}${tk.status === 'near' ? ` (gần: ${escapeHtml(tk.heard)})` : ''}
                    </span>`).join('')}
                </div>
                <div class="pt-2 border-t border-[var(--border)] space-y-1 text-slate-700">
                  <div><strong>Đáp án chuẩn:</strong> ${escapeHtml(state.dictationResult.targetEn)}</div>
                  ${state.dictationResult.targetIpa ? `<div class="font-mono text-sky-700">IPA: ${escapeHtml(state.dictationResult.targetIpa)}</div>` : ''}
                  ${state.dictationResult.targetVi ? `<div class="text-teal-700 font-semibold">🇻🇳 ${escapeHtml(state.dictationResult.targetVi)}</div>` : ''}
                </div>
              </div>` : ''}

            <!-- Danh sách Bản chép nhanh bên dưới -->
            <div class="pt-2 border-t border-[var(--border)] space-y-1.5">
              <div class="font-extrabold text-slate-700">📜 Bản chép các dòng trong bài (${vid.lines.length} câu — bấm để chuyển câu):</div>
              <div data-scroll-id="ls-lines-scroll" class="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                ${vid.lines.map((ln, idx) => {
                  const answered = Boolean((state.dictationLineAnswers[vid.id] || {})[idx]);
                  const active = idx === lineIdx;
                  return `
                    <div onclick="selectListeningLine(${idx}, true)" class="p-2.5 rounded-xl border cursor-pointer flex justify-between items-center gap-2 ${active ? 'bg-teal-50 border-teal-500' : answered ? 'bg-emerald-50/40 border-emerald-200' : 'bg-[var(--content)] border-[var(--border)]'}">
                      <div class="min-w-0">
                        <span class="font-mono font-bold text-slate-500 mr-1">#${idx + 1}</span>
                        <span class="font-semibold ${answered || active ? 'text-slate-900' : 'text-slate-400'}">${answered ? escapeHtml(ln.en) : (active ? 'Đang nghe chép dòng này...' : '••••••••••••••')}</span>
                      </div>
                      <span class="text-[10px] font-bold shrink-0 ${answered ? 'text-emerald-700' : 'text-slate-400'}">${answered ? '✓ Đã chép' : (ln.t || '▶')}</span>
                    </div>`;
                }).join('')}
              </div>
            </div>

          ` : state.listeningMode === 'pronunciation' ? `
            <!-- CHẾ ĐỘ 2: LUYỆN PHÁT ÂM / SHADOWING CHẤM TỪNG TỪ & ÂM VỊ IPA -->
            <div class="space-y-3">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <span class="font-extrabold text-sm text-teal-900">🎙️ Shadowing Chấm Phát Âm Từng Từ (Dòng ${lineIdx + 1}/${vid.lines.length})</span>
                <div class="flex gap-1.5">
                  <button onclick="playCurrentListeningSegment()" class="px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold cursor-pointer">🔊 Nghe câu mẫu</button>
                  ${state.pronAudioUrl ? `<button onclick="playRecordedUserPron()" class="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-bold cursor-pointer">🎧 Nghe lại giọng bạn</button>` : ''}
                </div>
              </div>

              <!-- Câu mẫu + Bấm từng từ nghe lẻ + IPA -->
              <div class="p-4 rounded-2xl bg-[var(--content)] border border-[var(--border)] space-y-2">
                <div class="text-[11px] text-slate-500 font-semibold">💡 Mẹo: Bấm vào bất kỳ từ tiếng Anh nào dưới đây để nghe phát âm chuẩn riêng từ đó:</div>
                <div class="flex flex-wrap gap-1.5 text-base font-extrabold text-slate-900">
                  ${line.en.split(/\s+/).map(w => `<span onclick="speak('${w.replace(/[^a-zA-Z0-9']/g,'').replace(/'/g,"\\'")}')" class="px-2 py-0.5 rounded-lg bg-white border border-[var(--border)] hover:border-teal-500 cursor-pointer">${escapeHtml(w)}</span>`).join('')}
                </div>
                ${state.listeningShowIpa && line.ipa ? `<div class="font-mono text-xs text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">IPA: ${escapeHtml(line.ipa)}</div>` : ''}
                ${state.listeningShowVi && line.vi ? `<div class="text-teal-800 font-semibold">🇻🇳 ${escapeHtml(line.vi)}</div>` : ''}
              </div>

              <!-- Nút Thu âm lớn chuẩn Shadowing -->
              <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div class="flex gap-1.5">
                  <button onclick="selectListeningLine(${lineIdx - 1}, true)" ${lineIdx <= 0 ? 'disabled' : ''} class="px-3 py-2 rounded-xl bg-[var(--content)] font-bold cursor-pointer disabled:opacity-40">← Câu trước</button>
                  <button onclick="selectListeningLine(${lineIdx + 1}, true)" ${lineIdx >= vid.lines.length - 1 ? 'disabled' : ''} class="px-3 py-2 rounded-xl bg-[var(--content)] font-bold cursor-pointer disabled:opacity-40">Câu tiếp →</button>
                </div>
                <button onclick="startListeningPronMic()" class="px-6 py-3 rounded-2xl text-white font-black cursor-pointer shadow-lg" style="background:${state.pronListening ? '#dc2626' : 'linear-gradient(135deg,#0d9488,#059669)'};">
                  ${state.pronListening ? '⏹ Bấm lần nữa để dừng & chấm điểm...' : '🎙️ Bắt đầu ghi âm Shadowing'}
                </button>
              </div>

              <!-- Chú giải màu & Kết quả chấm phát âm chi tiết giống luyennguphap -->
              ${state.pronResult ? `
                <div class="p-4 rounded-2xl bg-white border-2 border-teal-500 space-y-3">
                  <div class="flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <div class="text-[11px] font-bold text-slate-500">KẾT QUẢ PHÁT ÂM SHADOWING</div>
                      <div class="text-2xl font-black ${state.pronResult.pct >= 80 ? 'text-emerald-700' : state.pronResult.pct >= 55 ? 'text-amber-600' : 'text-rose-600'}">Điểm ${state.pronResult.pct} / 100 <span class="text-sm font-bold text-teal-700">• IELTS Band ${state.pronResult.ieltsBand}</span></div>
                    </div>
                    <div class="flex gap-1.5 text-[10px] font-bold">
                      <span class="px-2 py-0.5 rounded sh-tok-ok">Chính xác</span>
                      <span class="px-2 py-0.5 rounded sh-tok-near">Gần đúng, sai nhẹ</span>
                      <span class="px-2 py-0.5 rounded sh-tok-bad">Thiếu / Lệch âm</span>
                    </div>
                  </div>
                  <div class="text-slate-600">Bạn đã nói: <strong class="font-mono text-slate-900">"${escapeHtml(state.pronResult.spoken)}"</strong></div>
                  <div class="flex flex-wrap gap-1.5">
                    ${state.pronResult.tokens.map(tk => `
                      <button onclick="speak('${tk.w.replace(/'/g,"\\'")}')" title="Bấm để nghe từ chuẩn" class="px-2.5 py-1 rounded-lg font-mono font-bold cursor-pointer ${tk.status === 'ok' ? 'sh-tok-ok' : tk.status === 'near' ? 'sh-tok-near' : 'sh-tok-bad'}">
                        🔊 ${escapeHtml(tk.w)}${tk.status === 'near' ? ` (${escapeHtml(tk.heard)})` : ''}
                      </button>`).join('')}
                  </div>
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div class="font-extrabold text-teal-900">💡 Hướng dẫn chỉnh khẩu hình & âm vị từ AI:</div>
                    <ul class="list-disc pl-4 space-y-0.5 text-slate-700">${state.pronResult.ipaTips.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
                  </div>
                </div>` : ''}
            </div>

          ` : state.listeningMode === 'bilingual' ? `
            <!-- CHẾ ĐỘ 3: PHỤ ĐỀ SONG NGỮ ANH – VIỆT + IPA ĐỒNG BỘ TIMESTAMP -->
            <div class="space-y-2.5">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <div class="font-extrabold text-sm text-teal-900">🌐 Phụ Đề Song Ngữ & Phiên Âm IPA (${vid.lines.length} câu)</div>
                <span class="text-[11px] text-slate-500">Bấm câu bất kỳ để tua video tới đúng giây đó!</span>
              </div>
              <div data-scroll-id="ls-bilingual-list" class="max-h-[520px] overflow-y-auto space-y-2 pr-1">
                ${vid.lines.map((l, idx) => {
                  const active = idx === lineIdx;
                  return `
                    <div onclick="selectListeningLine(${idx}, true)" class="p-3 rounded-2xl border cursor-pointer transition ${active ? 'bg-teal-50 border-2 border-teal-500 shadow-sm' : 'bg-[var(--content)] border-[var(--border)] hover:bg-white'}">
                      <div class="flex justify-between items-start gap-2">
                        <div class="space-y-1 min-w-0">
                          <div class="flex items-center gap-2">
                            <span class="px-2 py-0.5 rounded bg-white border border-[var(--border)] font-mono text-[10px] font-bold text-teal-800">${l.t || ('#' + (idx + 1))}</span>
                            <span class="font-extrabold text-slate-900 text-sm">${escapeHtml(l.en)}</span>
                          </div>
                          ${state.listeningShowIpa && l.ipa ? `<div class="font-mono text-[11px] text-sky-700">${escapeHtml(l.ipa)}</div>` : ''}
                          ${state.listeningShowVi && l.vi ? `<div class="text-teal-800 font-semibold">🇻🇳 ${escapeHtml(l.vi)}</div>` : ''}
                        </div>
                        <div class="flex items-center gap-1 shrink-0">
                          <button onclick="event.stopPropagation();quickSaveWordToPersonalNotebook('${l.en.split(/\s+/)[0].replace(/[^a-zA-Z]/g,'')}','${(l.vi||'').replace(/'/g,"\\'")}')" title="Lưu vào Sổ từ" class="px-2 py-1 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer">⭐</button>
                          <span class="px-2 py-1 rounded-lg bg-teal-600 text-white font-bold">▶</span>
                        </div>
                      </div>
                    </div>`;
                }).join('')}
              </div>
            </div>

          ` : `
            <!-- CHẾ ĐỘ 4: BÀI TẬP TRẮC NGHIỆM & ĐIỀN TỪ NGHE HIỂU BÁM SÁT VIDEO -->
            <div class="space-y-3">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <div class="font-extrabold text-sm text-teal-900">📝 Bài Tập Kiểm Tra Nghe Hiểu (${quizList.length} câu bám sát video)</div>
                ${state.listeningQuizGraded ? `<span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">Đạt ${quizCorrect}/${quizList.length} • Band ${pctToIeltsBand(Math.round((quizCorrect/quizList.length)*100))}</span>` : ''}
              </div>
              <div class="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                ${quizList.map((qu, qi) => {
                  const aKey = `${vid.id}_${qi}`;
                  const uVal = state.listeningQuizAnswers[aKey];
                  return `
                    <div class="p-3.5 rounded-2xl bg-[var(--content)] border border-[var(--border)] space-y-2">
                      <div class="font-bold text-slate-900">${escapeHtml(qu.q)}</div>
                      ${qu.type === 'fill' ? `
                        <input type="text" value="${escapeHtml(uVal || '')}" oninput="state.listeningQuizAnswers['${aKey}']=this.value" placeholder="Gõ 1 từ tiếng Anh nghe được..." class="w-full px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-mono" />
                      ` : `
                        <div class="grid gap-1.5">
                          ${qu.options.map((op, oi) => {
                            const picked = Number(uVal) === oi;
                            let cls = 'bg-white border-[var(--border)]';
                            if (state.listeningQuizGraded) {
                              if (oi === qu.answer) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                              else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-800';
                            } else if (picked) cls = 'bg-teal-50 border-teal-500 text-teal-900 font-bold';
                            return `<button onclick="state.listeningQuizAnswers['${aKey}']=${oi};render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="text-left px-3 py-2 rounded-xl border cursor-pointer ${cls}">${String.fromCharCode(65 + oi)}. ${escapeHtml(op)}</button>`;
                          }).join('')}
                        </div>
                      `}
                      ${state.listeningQuizGraded ? `<div class="p-2 rounded-xl bg-white border border-teal-200 text-teal-800 font-semibold">💡 ${escapeHtml(qu.explain)}</div>` : ''}
                    </div>`;
                }).join('')}
              </div>
              <div class="flex justify-end gap-2">
                <button onclick="state.listeningQuizGraded=false;state.listeningQuizAnswers={};render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-3.5 py-2 rounded-xl bg-[var(--content)] font-bold cursor-pointer">↺ Làm lại</button>
                <button onclick="state.listeningQuizGraded=true;state.completedItems.listening['${vid.id}']='done';saveLearningProgressNow();notify('🎉 Đã chấm bài tập Nghe hiểu!');render();setTimeout(()=>initListeningYoutubePlayerIfNeeded(),60)" class="px-5 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">✓ Nộp & Chấm Bài Tập</button>
              </div>
            </div>
          `}
        </div>
      </div>
    </div>`;

  setTimeout(() => initListeningYoutubePlayerIfNeeded(), 80);
}

// =========================================================================
// 4. HỌC: LUYỆN NÓI CHUẨN LUYENNGUPHAP.COM (408+ CHỦ ĐỀ A1→C2 • GIA SƯ AI SỬA LỖI TỪNG CÂU & LUYỆN ĐỀ IELTS)
// =========================================================================
function getActiveSpeakingTopic() {
  return state.speakingList.find(t => t.id === state.speakingId) || state.speakingList[0] || SPEAKING_TOPICS[0];
}

function speakCurrentSpeakingSample() {
  const topic = getActiveSpeakingTopic();
  if (topic && topic.sample) speak(topic.sample, 'en-US', state.speakingTutorSpeed || 0.94);
}

function fillCurrentSpeakingSample() {
  const topic = getActiveSpeakingTopic();
  if (!topic) return;
  state.speakingDrafts[topic.id] = topic.sample;
  state.speakingTranscript = topic.sample;
  saveLearningProgressNow();
  render();
}

function speakSpeakingChatMsg(idx) {
  const topic = getActiveSpeakingTopic();
  const msgs = getSpeakingChatMsgs(topic);
  if (msgs[idx] && msgs[idx].text) speak(msgs[idx].text, 'en-US', state.speakingTutorSpeed || 0.95);
}

function openSpeakingPracticeRoom(id, defaultMode = null) {
  state.speakingId = id;
  state.speakingView = 'practice';
  if (defaultMode) state.speakingMode = defaultMode;
  state.speakingTranscript = state.speakingDrafts[id] || '';
  state.speakingResult = null;
  state.speakingChatScore = null;
  state.speakingSettingsOpen = false;
  render();
}

function selectSpeakingTopic(id) {
  openSpeakingPracticeRoom(id);
}

function onSpeakingDraftInput(val) {
  state.speakingTranscript = val;
  if (state.speakingId) state.speakingDrafts[state.speakingId] = val;
  scheduleProgressSave();
}

function selectWritingTopic(id) {
  state.writingId = id;
  state.writingText = state.writingDrafts[id] || '';
  state.writingResult = null;
  render();
}

function onWritingDraftInput(val, minWords) {
  state.writingText = val;
  if (state.writingId) state.writingDrafts[state.writingId] = val;
  const el = document.getElementById('wr-wc');
  if (el) el.textContent = 'Số từ: ' + (val.trim() ? val.trim().split(/\s+/).length : 0) + ' / ' + minWords + '+';
  scheduleProgressSave();
}

function speakCurrentReading() {
  const rd = state.readingList.find(r => r.id === state.readingId) || state.readingList[0];
  if (rd && rd.paragraphs) speak(rd.paragraphs.map(p => p.en).join(' '), 'en-US', 0.93);
}

function createCustomSpeakingTutorTopic(e) {
  e.preventDefault();
  const title = (document.getElementById('sp-cust-title')?.value || '').trim();
  const content = (document.getElementById('sp-cust-desc')?.value || '').trim();
  const cefr = document.getElementById('sp-cust-lvl')?.value || 'B1';
  if (!title) return;
  const newTopic = {
    id: 'sp-custom-' + Date.now(),
    difficulty: state.speakingList.length + 1,
    cefr,
    targetBand: 'Band 6.5–7.5',
    type: `✨ Chủ đề riêng • ${cefr} • Gia sư AI`,
    title: `${title}`,
    img: THEME_IMGS[state.speakingList.length % THEME_IMGS.length],
    prompt: content || `Let's talk naturally about "${title}". Share your personal experiences, reasons, and examples.`,
    keywords: title.toLowerCase().split(/\s+/).filter(w => w.length > 2).concat(['experience', 'perspective', 'importantly', 'for instance']),
    minWords: 25,
    sample: `Well, regarding ${title}, I personally find it fascinating because it plays a meaningful role in our daily life. For instance, it helps people connect and learn new skills effectively.`,
    aiStarters: [
      `Hi there! Today let's chat about "${title}". What comes to your mind first when you think about this topic?`,
      `That's interesting! Could you share a specific real-life example related to "${title}"?`,
      `How do you think "${title}" will change in the next five years?`
    ]
  };
  state.speakingList.unshift(newTopic);
  const saved = loadJson('tamn_custom_speaking_v1', []);
  saved.unshift(newTopic);
  saveJson('tamn_custom_speaking_v1', saved);
  state.speakingCustomModalOpen = false;
  notify(`✨ Đã tạo phòng nói riêng "${title}" (${cefr}) với Gia sư AI!`);
  openSpeakingPracticeRoom(newTopic.id, 'ai_chat');
}

function buildSpeakingTurnCoachAnalysis(userText, topic) {
  const clean = String(userText || '').trim();
  const evalRes = evaluateWithExamAi({
    text: clean,
    skill: 'speaking',
    keywords: topic.keywords || [],
    minWords: 18,
    targetBand: topic.targetBand || 'Band 6.5'
  });
  const isEn = state.speakingFeedbackLang === 'en';
  const strict = state.speakingTutorStyle === 'strict';

  // Grammar & Naturalness checks
  const grammarFixes = [];
  if (!/^[A-Z]/.test(clean)) {
    grammarFixes.push(isEn ? 'Capitalize the first word of your spoken sentence.' : 'Chú ý mở đầu câu rõ ràng, đầy đủ chủ ngữ – vị ngữ.');
  }
  if (/\bi is\b|\bi are\b|\bhe have\b|\bshe have\b|\bpeople is\b/i.test(clean)) {
    grammarFixes.push(isEn ? 'Subject-verb agreement error detected (e.g., use "I am", "she has", "people are").' : 'Lỗi hòa hợp chủ ngữ – động từ (cần dùng đúng "I am", "she has", "people are").');
  }
  if (clean.split(/\s+/).length < 10) {
    grammarFixes.push(
      strict
        ? (isEn ? 'Too short! Examiners cannot award Band 6.5+ for a one-clause answer — add "because" and an example!' : 'Trả lời ngắn quá mức! Nói cụt ngủn thế này vào phòng thi IELTS mất điểm Fluency ngay — phải nối thêm "because..." + ví dụ cụ thể!')
        : (isEn ? 'Try extending your turn with a reason ("because...") and a short example ("for instance...").' : 'Câu hơi ngắn — hãy mở rộng bằng lý do ("because...") và ví dụ ("for instance...").')
    );
  }
  const kwSuggested = (topic.keywords || ['moreover', 'perspective'])[0] || 'specifically';
  const upgradedSentence = clean.length > 6
    ? `Well, from my perspective, ${clean.replace(/[.!?]+$/, '')}, especially when we consider ${kwSuggested} in daily life.`
    : (topic.sample || `From my point of view, this topic is really important because it shapes our daily habits.`);

  const pronScore = Math.min(98, Math.max(58, Math.round(evalRes.vocabScore * 0.45 + evalRes.formScore * 0.55)));
  const ipaNotes = getIpaArticulationTips(normWords(clean));

  const nextIdeas = [
    `Try using "${(topic.keywords || [])[0] || 'furthermore'}" + a personal story from your school or work.`,
    `Compare how young people vs. older generations view this topic ("On the one hand..., whereas...").`
  ];

  return {
    band: evalRes.overallBand,
    fluency: evalRes.criteriaLabels[0][1],
    pronBand: evalRes.criteriaLabels[1][1],
    lexical: evalRes.criteriaLabels[2][1],
    grammar: evalRes.criteriaLabels[3][1],
    pronScore,
    grammarFixes: grammarFixes.length ? grammarFixes : [isEn ? 'Solid sentence structure! Try adding an advanced collocation to reach Band 7.5+.' : 'Cấu trúc câu ổn định! Hãy chèn thêm 1 cụm collocation C1 để bứt lên Band 7.5+.'],
    upgradedSentence,
    ipaNotes,
    nextIdeas
  };
}

function toggleSpeakingMic(forChat = false) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { notify('⚠️ Trình duyệt không hỗ trợ nhận diện giọng nói — bạn hãy gõ câu trả lời để Gia sư AI chấm nhé!'); return; }
  if (state.speakingListening && state.speakingRec) { state.speakingRec.stop(); state.speakingListening = false; render(); return; }
  const rec = new SR();
  rec.lang = 'en-US';
  rec.continuous = !forChat;
  rec.interimResults = !forChat;
  state.speakingRec = rec;
  state.speakingListening = true;
  rec.onresult = (ev) => {
    let txt = '';
    for (let i = 0; i < ev.results.length; i++) txt += ev.results[i][0].transcript + ' ';
    txt = txt.trim();
    if (forChat) {
      state.speakingListening = false;
      sendAiSpeakingTurn(txt);
    } else {
      state.speakingTranscript = txt;
      state.speakingDrafts[state.speakingId] = txt;
      const ta = document.getElementById('sp-transcript-ta');
      if (ta) ta.value = txt;
    }
  };
  rec.onerror = () => { state.speakingListening = false; notify('⚠️ Không mở được Micro. Kiểm tra quyền truy cập Micro rồi bấm lại nhé!'); render(); };
  rec.onend = () => { state.speakingListening = false; render(); };
  rec.start();
  notify(forChat ? '🎙️ Đang thu âm… nói xong hệ thống sẽ tự gửi cho Gia sư AI!' : '🎙️ Đang ghi âm bài nói IELTS của bạn...');
  render();
}

function gradeSpeakingNow() {
  if (!checkAndConsumeQuota('speaking', 1)) return;
  const topic = getActiveSpeakingTopic();
  const ta = document.getElementById('sp-transcript-ta');
  if (ta) state.speakingTranscript = ta.value;
  if (!state.speakingTranscript.trim()) { notify('⚠️ Hãy bấm Micro nói hoặc nhập câu trả lời trước khi AI chấm!'); return; }
  state.speakingResult = evaluateWithExamAi({ text: state.speakingTranscript, skill: 'speaking', keywords: topic.keywords, minWords: topic.minWords || 30, targetBand: topic.targetBand });
  if (state.currentUser && !isAdmin()) { state.currentUser.coins += 20; state.currentUser.streak += 1; saveUsers(); pushSingleUserToCloud(state.currentUser); syncTopRankRewards(); }
  state.completedItems.speaking[topic.id] = state.speakingResult.overallBand;
  saveLearningProgressNow();
  notify(`🤖 AI đã chấm IELTS Speaking: ${state.speakingResult.headlineScore}!`);
  render();
}

function getSpeakingChatMsgs(topic) {
  if (!state.speakingChatLog[topic.id]) {
    const starter = (topic.aiStarters && topic.aiStarters[0]) || `Hello! Let's practice speaking about "${topic.title}". What is your opinion on this?`;
    state.speakingChatLog[topic.id] = [{ role: 'ai', text: starter }];
  }
  return state.speakingChatLog[topic.id];
}

function sendAiSpeakingTurn(rawText) {
  const topic = getActiveSpeakingTopic();
  const txt = (rawText || '').trim();
  if (!txt) return;
  const msgs = getSpeakingChatMsgs(topic);
  const analysis = buildSpeakingTurnCoachAnalysis(txt, topic);
  msgs.push({ role: 'user', text: txt, analysis });

  const userTurns = msgs.filter(m => m.role === 'user').length;
  const starters = topic.aiStarters && topic.aiStarters.length ? topic.aiStarters : ['Interesting! Could you elaborate with an example?', 'How does this affect people in your country?'];
  const kwHit = (topic.keywords || []).filter(k => txt.toLowerCase().includes(k.toLowerCase()));
  const nextQ = starters[userTurns % starters.length];
  const strict = state.speakingTutorStyle === 'strict';
  const lead = kwHit.length
    ? `Nice job using "${kwHit[0]}"! `
    : (strict
        ? `Hmm, your point is clear, but try weaving in stronger vocabulary like "${(topic.keywords || ['moreover'])[userTurns % Math.max(1, (topic.keywords || []).length)]}"! `
        : `Good point! To sound even more natural, consider using "${(topic.keywords || ['furthermore'])[userTurns % Math.max(1, (topic.keywords || []).length)]}". `);
  const reply = lead + nextQ;
  msgs.push({ role: 'ai', text: reply });
  state.completedItems.speaking[topic.id] = analysis.band;
  saveLearningProgressNow();
  speak(reply, 'en-US', state.speakingTutorSpeed || 0.95);
  render();
}

function submitSpeakingChatForm(e) {
  e.preventDefault();
  const inp = document.getElementById('sp-chat-inp');
  const txt = (inp?.value || '').trim();
  if (!txt) return;
  inp.value = '';
  sendAiSpeakingTurn(txt);
}

function gradeSpeakingChatSession() {
  if (!checkAndConsumeQuota('speaking', 1)) return;
  const topic = getActiveSpeakingTopic();
  const allUserText = getSpeakingChatMsgs(topic).filter(m => m.role === 'user').map(m => m.text).join(' ');
  if (!allUserText.trim()) { notify('⚠️ Hãy trò chuyện ít nhất 1 câu với Gia sư AI trước khi tổng kết!'); return; }
  state.speakingChatScore = evaluateWithExamAi({ text: allUserText, skill: 'speaking', keywords: topic.keywords, minWords: topic.minWords || 25, targetBand: topic.targetBand });
  state.completedItems.speaking[topic.id] = state.speakingChatScore.overallBand;
  saveLearningProgressNow();
  notify(`🤖 Tổng kết buổi nói với Gia sư AI: ${state.speakingChatScore.headlineScore}!`);
  render();
}

function toggleTurnCoachTab(turnKey, tabName) {
  state.speakingOpenTurnPanel[turnKey] = state.speakingOpenTurnPanel[turnKey] === tabName ? '' : tabName;
  render();
}

function renderSpeaking(v) {
  const cefrs = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const sortedAll = [...state.speakingList].sort((a, b) => (a.difficulty || 0) - (b.difficulty || 0));

  // MÀN 1: DANH SÁCH CHỦ ĐỀ LUYỆN NÓI 4:3 GIỐNG 100% SPEAKINGBETAPAGE CỦA LUYENNGUPHAP.COM
  if (state.speakingView !== 'practice') {
    const q = (state.speakingQuery || '').trim().toLowerCase();
    const filtered = sortedAll.filter(t => {
      if (state.speakingCefr !== 'ALL' && t.cefr !== state.speakingCefr) return false;
      if (state.speakingPartFilter !== 'ALL' && !String(t.type || '').includes(state.speakingPartFilter)) return false;
      if (q && !(t.title + ' ' + t.prompt + ' ' + (t.keywords || []).join(' ')).toLowerCase().includes(q)) return false;
      return true;
    });

    const perPage = 16;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    state.speakingPage = Math.max(1, Math.min(totalPages, state.speakingPage || 1));
    const pageItems = filtered.slice((state.speakingPage - 1) * perPage, state.speakingPage * perPage);
    const doneCnt = Object.keys(state.completedItems.speaking || {}).length;

    v.innerHTML = `
      <div class="space-y-4">
        <div class="travel-card p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3 border-l-4 border-orange-500">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">🗣️ PHÒNG LUYỆN NÓI VỚI GIA SƯ AI • ${sortedAll.length} CHỦ ĐỀ (A1 → C2)</span>
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Đã luyện: ${doneCnt} chủ đề</span>
              ${quotaBadgeHtml('speaking', 'bài Nói')}
            </div>
            <h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-1">Danh Sách Bài Luyện Nói & Gia Sư AI Chấm Sửa Ngay Trong Buổi Nói</h1>
            <p class="text-xs text-slate-600 mt-0.5">Chọn bất kỳ chủ đề nào để trò chuyện 1-1 với Gia sư AI (soi phát âm từng từ, sửa ngữ pháp & gợi ý câu tự nhiên ngay sau mỗi lượt nói) hoặc luyện đề IELTS Speaking Cue Card.</p>
          </div>
          <button onclick="state.speakingCustomModalOpen=!state.speakingCustomModalOpen;render()" class="px-4 py-2.5 rounded-full bg-orange-50 hover:bg-orange-100 border-2 border-orange-400 text-orange-800 text-xs font-extrabold cursor-pointer shrink-0">
            ✨ + Tự tạo chủ đề nói của riêng bạn
          </button>
        </div>

        ${state.speakingCustomModalOpen ? `
          <form onsubmit="createCustomSpeakingTutorTopic(event)" class="travel-card p-4 space-y-2.5 text-xs border-2 border-orange-400 bg-orange-50/30">
            <div class="font-extrabold text-sm text-orange-900">✨ Tạo Buổi Luyện Nói Theo Chủ Đề Tự Chọn Với Gia Sư AI</div>
            <div class="grid sm:grid-cols-3 gap-2">
              <input id="sp-cust-title" required placeholder="Tên chủ đề muốn luyện nói (VD: Job Interview, Ordering Coffee, AI Tech)..." class="sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-[var(--border)]" />
              <select id="sp-cust-lvl" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold">
                <option value="A1">Level A1</option><option value="A2">Level A2</option><option value="B1" selected>Level B1</option>
                <option value="B2">Level B2</option><option value="C1">Level C1</option><option value="C2">Level C2</option>
              </select>
            </div>
            <input id="sp-cust-desc" placeholder="Tình huống hoặc câu hỏi cụ thể bạn muốn Gia sư hỏi (tùy chọn)..." class="w-full px-3 py-2 rounded-xl bg-white border border-[var(--border)]" />
            <button type="submit" class="px-5 py-2 rounded-xl bg-orange-600 text-white font-extrabold cursor-pointer">🎙️ Bắt đầu nói với Gia sư AI →</button>
          </form>` : ''}

        <!-- Filter Row giống sp-filter-row của luyennguphap.com -->
        <div class="travel-card p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex flex-wrap gap-1.5 items-center">
            ${cefrs.map(lv => `
              <button onclick="state.speakingCefr='${lv}';state.speakingPage=1;render()" class="px-3.5 py-1.5 rounded-full font-extrabold cursor-pointer border ${state.speakingCefr === lv ? 'bg-emerald-600 text-white border-transparent shadow-sm' : 'bg-white border-[var(--border)] hover:border-emerald-500'}">
                ${lv === 'ALL' ? `Tất cả (${sortedAll.length})` : lv}
              </button>`).join('')}
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <select onchange="state.speakingPartFilter=this.value;state.speakingPage=1;render()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold">
              <option value="ALL" ${state.speakingPartFilter==='ALL'?'selected':''}>Mọi dạng IELTS</option>
              <option value="Part 1" ${state.speakingPartFilter==='Part 1'?'selected':''}>IELTS Part 1 (Phỏng vấn)</option>
              <option value="Part 2" ${state.speakingPartFilter==='Part 2'?'selected':''}>IELTS Part 2 (Cue Card)</option>
              <option value="Part 3" ${state.speakingPartFilter==='Part 3'?'selected':''}>IELTS Part 3 (Thảo luận)</option>
            </select>
            <input id="sp-search-inp" type="text" value="${escapeHtml(state.speakingQuery)}" oninput="state.speakingQuery=this.value;state.speakingPage=1;render()" placeholder="🔍 Tìm trong ${sortedAll.length} chủ đề nói..." class="px-3.5 py-1.5 rounded-xl bg-[var(--content)] focus:bg-white border border-[var(--border)] w-60" />
          </div>
        </div>

        <!-- Lưới thẻ 4 cột kiểu sp-lesson-card 4:3 của luyennguphap.com -->
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${pageItems.map(t => {
            const doneBand = state.completedItems.speaking[t.id];
            return `
              <div onclick="openSpeakingPracticeRoom('${t.id}')" class="sp-card-lnp ${doneBand ? 'is-completed' : ''}">
                <div class="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img src="${t.img}" alt="${escapeHtml(t.title)}" loading="lazy" class="w-full h-full object-cover" />
                  <span class="absolute bottom-2 left-2 px-3 py-1 rounded-full text-xs font-black shadow ${getCefrBadgeClass(t.cefr)}">${escapeHtml(t.cefr)}</span>
                  ${doneBand ? `<span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow">✓ Band ${doneBand}</span>` : ''}
                </div>
                <div class="p-3.5 text-center space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div class="text-[10px] font-extrabold text-teal-700 uppercase">${escapeHtml(t.type || 'IELTS Speaking')}</div>
                    <div class="font-extrabold text-sm text-slate-900 mt-0.5 line-clamp-2">${escapeHtml(t.title)}</div>
                  </div>
                  <div class="text-[11px] font-bold text-orange-600 pt-1">🎙️ Vào nói với Gia sư AI →</div>
                </div>
              </div>`;
          }).join('')}
        </div>

        <div class="flex justify-between items-center pt-2 text-xs">
          <span class="text-slate-500 font-semibold">Hiển thị ${pageItems.length} / ${filtered.length} chủ đề (Trang ${state.speakingPage}/${totalPages})</span>
          <div class="flex items-center gap-1.5">
            <button onclick="state.speakingPage=Math.max(1,state.speakingPage-1);render()" ${state.speakingPage<=1?'disabled':''} class="px-3.5 py-1.5 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">← Trước</button>
            <span class="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-mono font-extrabold">${state.speakingPage} / ${totalPages}</span>
            <button onclick="state.speakingPage=Math.min(${totalPages},state.speakingPage+1);render()" ${state.speakingPage>=totalPages?'disabled':''} class="px-3.5 py-1.5 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Sau →</button>
          </div>
        </div>
      </div>`;
    return;
  }

  // MÀN 2: PHÒNG LUYỆN NÓI VỚI GIA SƯ AI & ĐỀ IELTS (GIỐNG 100% SPEAKINGBETAPAGE + GIỮ ĐỦ ĐỀ GỐC)
  const topic = getActiveSpeakingTopic();
  if (state.speakingDrafts[topic.id] !== undefined) state.speakingTranscript = state.speakingDrafts[topic.id];
  const chatMsgs = getSpeakingChatMsgs(topic);

  v.innerHTML = `
    <div class="max-w-5xl mx-auto space-y-4">
      <!-- Header phòng nói + Nút Cài đặt buổi nói giống luyennguphap.com -->
      <div class="travel-card p-4 flex flex-wrap items-center justify-between gap-3 text-xs relative">
        <div class="flex items-center gap-2.5 min-w-0">
          <button onclick="state.speakingView='browser';render()" class="px-3 py-2 rounded-xl bg-[var(--content)] hover:bg-teal-50 border border-[var(--border)] font-extrabold cursor-pointer shrink-0">← Danh sách bài</button>
          <span class="px-2.5 py-1 rounded-full font-black ${getCefrBadgeClass(topic.cefr)}">${escapeHtml(topic.cefr)}</span>
          <div class="min-w-0">
            <h1 class="font-black text-base sm:text-lg text-slate-900 truncate">${escapeHtml(topic.title)}</h1>
            <div class="text-[11px] text-slate-500 truncate">${escapeHtml(topic.type || 'IELTS Speaking')} • Nói tiếng Anh hoặc chêm tiếng Việt đều được — Gia sư sẽ sửa ngay!</div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <div class="inline-flex p-1 rounded-xl bg-[var(--content)] border border-[var(--border)] gap-1">
            <button onclick="state.speakingMode='ai_chat';render()" class="px-3 py-1.5 rounded-lg font-extrabold cursor-pointer ${state.speakingMode === 'ai_chat' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-slate-700'}">💬 Gia sư AI Hội thoại</button>
            <button onclick="state.speakingMode='prompt';render()" class="px-3 py-1.5 rounded-lg font-extrabold cursor-pointer ${state.speakingMode === 'prompt' ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-slate-700'}">🎯 Đề IELTS & Bài mẫu</button>
          </div>
          <button onclick="state.speakingSettingsOpen=!state.speakingSettingsOpen;render()" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-extrabold cursor-pointer">⚙️ Cài đặt buổi nói</button>
        </div>

        ${state.speakingSettingsOpen ? `
          <div class="w-full mt-2 p-4 rounded-2xl bg-slate-50 border-2 border-teal-500 grid sm:grid-cols-3 gap-3 text-xs">
            <div class="space-y-1">
              <div class="font-extrabold text-slate-700">🌐 Ngôn ngữ nhận xét:</div>
              <div class="flex gap-1.5">
                <button onclick="state.speakingFeedbackLang='vi';localStorage.setItem('tamn_sp_fb_lang','vi');render()" class="flex-1 py-1.5 rounded-lg font-bold cursor-pointer border ${state.speakingFeedbackLang==='vi'?'bg-teal-600 text-white border-transparent':'bg-white border-[var(--border)]'}">🇻🇳 Tiếng Việt</button>
                <button onclick="state.speakingFeedbackLang='en';localStorage.setItem('tamn_sp_fb_lang','en');render()" class="flex-1 py-1.5 rounded-lg font-bold cursor-pointer border ${state.speakingFeedbackLang==='en'?'bg-teal-600 text-white border-transparent':'bg-white border-[var(--border)]'}">🇬🇧 English</button>
              </div>
            </div>
            <div class="space-y-1">
              <div class="font-extrabold text-slate-700">🎭 Phong cách Gia sư AI:</div>
              <div class="flex gap-1.5">
                <button onclick="state.speakingTutorStyle='serious';localStorage.setItem('tamn_sp_style','serious');render()" class="flex-1 py-1.5 rounded-lg font-bold cursor-pointer border ${state.speakingTutorStyle==='serious'?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)]'}">🎓 Nghiêm túc</button>
                <button onclick="state.speakingTutorStyle='strict';localStorage.setItem('tamn_sp_style','strict');render()" class="flex-1 py-1.5 rounded-lg font-bold cursor-pointer border ${state.speakingTutorStyle==='strict'?'bg-orange-600 text-white border-transparent':'bg-white border-[var(--border)]'}">🔥 Thẳng thắn</button>
              </div>
            </div>
            <div class="space-y-1">
              <div class="font-extrabold text-slate-700">🔊 Tốc độ đọc của Gia sư:</div>
              <select onchange="state.speakingTutorSpeed=Number(this.value);localStorage.setItem('tamn_sp_speed',this.value)" class="w-full px-3 py-1.5 rounded-lg bg-white border border-[var(--border)] font-bold">
                ${[0.8, 0.9, 0.95, 1.05, 1.15].map(s => `<option value="${s}" ${state.speakingTutorSpeed===s?'selected':''}>Tốc độ ${s}x</option>`).join('')}
              </select>
            </div>
          </div>` : ''}
      </div>

      ${state.speakingMode === 'ai_chat' ? `
        <!-- GIA SƯ AI TRÒ CHUYỆN & CHẤM SỬA TỪNG LƯỢT NÓI (GIỐNG 100% SPEAKINGBETAPAGE) -->
        <div class="travel-card p-4 sm:p-5 space-y-4 text-xs">
          <div class="p-3 rounded-2xl bg-[var(--content)] border border-[var(--border)] flex flex-wrap justify-between items-center gap-2">
            <div>
              <span class="font-extrabold text-teal-900">📌 Đề gợi mở:</span>
              <span class="text-slate-700 ml-1">${escapeHtml(topic.prompt)}</span>
            </div>
            <div class="flex flex-wrap gap-1">
              ${(topic.keywords || []).slice(0, 5).map(k => `<button onclick="speak('${k.replace(/'/g,"\\'")}')" class="px-2 py-0.5 rounded-full bg-white border border-teal-200 font-mono text-teal-800 cursor-pointer">🔊 ${escapeHtml(k)}</button>`).join('')}
            </div>
          </div>

          <!-- Luồng hội thoại có thẻ chấm Band + 3 nút Xem điểm phát âm / Sửa ngữ pháp / Gợi ý ý tưởng -->
          <div data-scroll-id="sp-tutor-stream" class="space-y-3 max-h-[460px] overflow-y-auto p-3 rounded-2xl bg-slate-50 border border-[var(--border)]">
            ${chatMsgs.map((m, mi) => {
              const tKey = `${topic.id}_${mi}`;
              const openTab = state.speakingOpenTurnPanel[tKey] || '';
              if (m.role === 'ai') {
                return `
                  <div class="flex justify-start">
                    <div class="max-w-[88%] p-3.5 rounded-2xl rounded-tl-sm bg-white border border-[var(--border)] shadow-sm space-y-2">
                      <div class="flex items-center justify-between gap-2">
                        <span class="font-extrabold text-teal-800">🤖 Gia sư AI (${topic.cefr})</span>
                        <button onclick="speakSpeakingChatMsg(${mi})" class="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold cursor-pointer">🔊 Nghe gia sư đọc</button>
                      </div>
                      <div class="text-sm text-slate-900 leading-relaxed">${escapeHtml(m.text)}</div>
                    </div>
                  </div>`;
              }
              const an = m.analysis || buildSpeakingTurnCoachAnalysis(m.text, topic);
              return `
                <div class="space-y-1.5">
                  <div class="flex justify-end">
                    <div class="max-w-[88%] px-4 py-3 rounded-2xl rounded-tr-sm bg-[var(--primary)] text-white shadow-sm">
                      <div class="text-sm font-medium leading-relaxed">${escapeHtml(m.text)}</div>
                    </div>
                  </div>
                  <!-- Thẻ chấm điểm từng câu nói (ius-head & tlt-buttons giống hệt luyennguphap.com!) -->
                  <div class="ml-auto max-w-[90%] p-2.5 rounded-2xl bg-white border border-indigo-200 space-y-2">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div class="flex flex-wrap items-center gap-1.5">
                        <span class="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-black text-xs">Band ${an.band}</span>
                        <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold">Trôi chảy ${an.fluency}</span>
                        <span class="px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-bold">Phát âm ${an.pronScore}/100</span>
                        <span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold">Từ vựng ${an.lexical}</span>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">Ngữ pháp ${an.grammar}</span>
                      </div>
                      <div class="flex flex-wrap gap-1">
                        <button onclick="toggleTurnCoachTab('${tKey}','pron')" class="px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer border ${openTab==='pron'?'bg-indigo-600 text-white border-transparent':'bg-indigo-50 text-indigo-800 border-indigo-200'}">🎯 Xem điểm phát âm</button>
                        <button onclick="toggleTurnCoachTab('${tKey}','gram')" class="px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer border ${openTab==='gram'?'bg-indigo-600 text-white border-transparent':'bg-indigo-50 text-indigo-800 border-indigo-200'}">✍️ Sửa ngữ pháp & Tự nhiên hơn</button>
                        <button onclick="toggleTurnCoachTab('${tKey}','idea')" class="px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer border ${openTab==='idea'?'bg-indigo-600 text-white border-transparent':'bg-indigo-50 text-indigo-800 border-indigo-200'}">💡 Gợi ý ý tưởng</button>
                      </div>
                    </div>

                    ${openTab === 'pron' ? `
                      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="font-extrabold text-emerald-800">🎙️ Điểm phát âm: ${an.pronScore}/100</div>
                        <ul class="list-disc pl-4 space-y-0.5 text-slate-700">${an.ipaNotes.map(n => `<li>${escapeHtml(n)}</li>`).join('')}</ul>
                      </div>` : openTab === 'gram' ? `
                      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div class="font-extrabold text-rose-700">🔍 Nhận xét câu nói của bạn:</div>
                        <ul class="list-disc pl-4 space-y-0.5 text-slate-700">${an.grammarFixes.map(g => `<li>${escapeHtml(g)}</li>`).join('')}</ul>
                        <div class="pt-1 border-t border-slate-200 text-emerald-800">
                          <strong>✨ Cách diễn đạt tự nhiên hơn (Band 7.5+):</strong> "${escapeHtml(an.upgradedSentence)}"
                          <button onclick="speak('${an.upgradedSentence.replace(/'/g,"\\'")}')" class="ml-1 underline font-bold cursor-pointer">🔊 Nghe</button>
                        </div>
                      </div>` : openTab === 'idea' ? `
                      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div class="font-extrabold text-indigo-800">💡 Hướng trả lời mở rộng cho lượt tiếp theo:</div>
                        <ul class="list-disc pl-4 space-y-0.5 text-slate-700">${an.nextIdeas.map(id => `<li>${escapeHtml(id)}</li>`).join('')}</ul>
                      </div>` : ''}
                  </div>
                </div>`;
            }).join('')}
          </div>

          <!-- Thanh Bấm Mic Nói + Nhập chữ gửi Gia sư -->
          <form onsubmit="submitSpeakingChatForm(event)" class="flex flex-wrap items-center gap-2 pt-1">
            <button type="button" onclick="toggleSpeakingMic(true)" class="px-5 py-3 rounded-2xl text-white font-black cursor-pointer shadow-lg" style="background:${state.speakingListening ? '#dc2626' : 'linear-gradient(135deg,#0d9488,#0284c7)'};">
              ${state.speakingListening ? '⏹ Đang nghe… bấm để dừng' : '🎙️ Bấm để nói với Gia sư'}
            </button>
            <input id="sp-chat-inp" placeholder="Hoặc gõ câu tiếng Anh để Gia sư sửa lỗi & hỏi tiếp..." class="flex-1 min-w-52 px-4 py-3 rounded-2xl bg-[var(--content)] focus:bg-white border border-[var(--border)]" />
            <button type="submit" class="px-5 py-3 rounded-2xl bg-slate-900 text-white font-extrabold cursor-pointer">Gửi</button>
          </form>

          <div class="flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-[var(--border)]">
            <button onclick="delete state.speakingChatLog['${topic.id}'];state.speakingChatScore=null;render()" class="text-slate-500 underline font-bold cursor-pointer">↺ Bắt đầu lại cuộc hội thoại</button>
            <button onclick="gradeSpeakingChatSession()" class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold cursor-pointer">🏆 Chấm Tổng Kết Cả Buổi Nói (IELTS Band)</button>
          </div>
        </div>
        ${renderAiScoreCard(state.speakingChatScore)}
      ` : `
        <!-- CHẾ ĐỘ LUYỆN ĐỀ IELTS SPEAKING CUE CARD & BÀI MẪU (GIỮ NGUYÊN 100% ĐỀ GỐC CỦA BẠN) -->
        <div class="travel-card p-5 space-y-4 text-xs">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <span class="font-extrabold text-teal-800 text-sm">🎯 Đề Thi IELTS Speaking #${topic.difficulty || 1} (${topic.cefr} • ${topic.targetBand || 'Band 6.5+'})</span>
            ${examTimerBarHtml([1, 2])}
          </div>
          <div class="p-4 rounded-2xl bg-[var(--content)] border border-[var(--border)] text-sm font-bold text-slate-900 leading-relaxed">
            ${escapeHtml(topic.prompt)}
          </div>
          <div class="flex flex-wrap gap-1.5 items-center">
            <span class="font-bold text-slate-500">Từ vựng ăn điểm (${topic.cefr}):</span>
            ${(topic.keywords || []).map(k => `<button onclick="speak('${k.replace(/'/g,"\\'")}')" class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono font-bold cursor-pointer">🔊 ${escapeHtml(k)}</button>`).join('')}
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="speakCurrentSpeakingSample()" class="px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold cursor-pointer">🔊 Nghe bài mẫu Band cao</button>
            <button onclick="toggleSpeakingMic(false)" class="px-4 py-2.5 rounded-xl font-extrabold text-white cursor-pointer" style="background:${state.speakingListening ? '#dc2626' : '#0d9488'};">${state.speakingListening ? '⏹ Dừng Micro' : '🎙️ Bấm nói bằng Micro'}</button>
            <button onclick="fillCurrentSpeakingSample()" class="px-3.5 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold text-sky-800 cursor-pointer">📋 Xem & điền bài mẫu</button>
          </div>
          <textarea id="sp-transcript-ta" rows="5" oninput="onSpeakingDraftInput(this.value)" placeholder="Lời bạn nói qua Micro sẽ tự hiện tại đây (hoặc gõ bài trả lời để AI chấm 4 tiêu chí IELTS Speaking)..." class="w-full p-3.5 rounded-2xl bg-[var(--content)] focus:bg-white border border-[var(--border)] text-xs leading-relaxed">${escapeHtml(state.speakingTranscript)}</textarea>
          <div class="flex justify-end">
            <button onclick="gradeSpeakingNow()" class="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer shadow">🤖 AI Chấm Điểm 4 Tiêu Chí IELTS Band</button>
          </div>
        </div>
        ${renderAiScoreCard(state.speakingResult)}
      `}
    </div>`;
}

// =========================================================================
// 5. HỌC: LUYỆN VIẾT (108+ CHỦ ĐỀ SẮP XẾP TĂNG DẦN A1→C2 • THANG ĐIỂM IELTS)
// =========================================================================
function generateAiWritingPrompt(e) {
  e.preventDefault();
  const topicTxt = (document.getElementById('ai-wr-topic')?.value || '').trim();
  const taskType = document.getElementById('ai-wr-type')?.value || 'IELTS Task 2';
  const cefr = document.getElementById('ai-wr-cefr')?.value || 'B2';
  if (!topicTxt) return;

  const isTask1 = taskType.includes('Task 1');
  const bandMap = { A1:'Band 3.5–4.0', A2:'Band 4.5–5.0', B1:'Band 5.5–6.0', B2:'Band 6.5–7.0', C1:'Band 7.5–8.0', C2:'Band 8.5–9.0' };
  const promptEn = isTask1
    ? `The chart illustrates global trends related to "${topicTxt}" between 2018 and 2026. Summarize the key information by selecting and reporting the main features, and make comparisons where relevant.`
    : `In recent years, "${topicTxt}" has sparked widespread debate across society. Do the benefits of ${topicTxt} outweigh its potential drawbacks? Give reasons for your answer and include relevant examples.`;

  const newPr = {
    id: 'wr-ai-' + Date.now(),
    difficulty: state.writingList.length + 1,
    cefr,
    targetBand: bandMap[cefr] || 'Band 6.5–7.0',
    exam: 'IELTS',
    type: `✨ AI Tạo • ${cefr} (${bandMap[cefr]}) • ${taskType}`,
    minWords: isTask1 ? 100 : 120,
    targetWords: isTask1 ? 160 : 250,
    title: `[AI ${cefr}] ${topicTxt}`,
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    prompt: promptEn,
    outline: isTask1
      ? ['Introduction: Paraphrase biểu đồ về ' + topicTxt, 'Overview: Nêu xu hướng nổi bật nhất', 'Body 1 & 2: So sánh số liệu tăng/giảm chi tiết.']
      : ['Introduction: Dẫn nhập về ' + topicTxt + ' + Nêu luận điểm chính', 'Body 1: Phân tích lợi ích nổi bật kèm ví dụ', 'Body 2: Phân tích mặt hạn chế & hướng giải quyết', 'Conclusion: Tóm gọn quan điểm cá nhân.'],
    keyTerms: [topicTxt.split(/\s+/)[0].toLowerCase(), 'however', 'moreover', 'significant', 'impact', 'sustainable', 'therefore', 'overall'],
    drill: {
      q: `Bài tập từ nối IELTS cho "${topicTxt}": ______ the rapid growth of ${topicTxt}, careful regulation remains essential.`,
      options: ['Despite', 'Although', 'However', 'Because'],
      answer: 0,
      explain: '"the rapid growth of..." là cụm danh từ → dùng "Despite".'
    }
  };

  state.writingList.push(newPr);
  const saved = loadJson('tamn_ai_writing_v1', []);
  saved.push(newPr);
  saveJson('tamn_ai_writing_v1', saved);

  state.writingCefr = 'ALL';
  state.writingId = newPr.id;
  state.writingPage = Math.ceil(state.writingList.length / 12);
  state.writingResult = null;
  e.target.reset();
  notify(`✨ AI đã tạo xong đề IELTS Writing "${topicTxt}" (${cefr})!`);
  render();
}

function gradeWritingNow() {
  if (!checkAndConsumeQuota('writing', 1)) return;
  const pr = state.writingList.find(w => w.id === state.writingId) || state.writingList[0];
  const ta = document.getElementById('wr-editor-ta');
  if (ta) state.writingText = ta.value;
  if (!state.writingText.trim()) { notify('⚠️ Vui lòng nhập bài viết tiếng Anh trước khi nộp AI chấm!'); return; }
  state.writingResult = evaluateWithExamAi({ text: state.writingText, skill: 'writing', keywords: pr.keyTerms, minWords: pr.minWords, targetBand: pr.targetBand });
  if (state.currentUser && !isAdmin()) { state.currentUser.coins += 25; state.currentUser.streak += 1; saveUsers(); syncTopRankRewards(); }
  state.completedItems.writing[pr.id] = state.writingResult.overallBand; saveLearningProgressNow(); notify(`🤖 AI đã chấm IELTS Writing: ${state.writingResult.headlineScore} (Đã lưu tiến độ)!`);
  render();
}

function renderWriting(v) {
  const cefrs = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const q = (state.writingQuery || '').trim().toLowerCase();
  const sortedAll = [...state.writingList].sort((a, b) => (a.difficulty || 999) - (b.difficulty || 999));
  const filtered = sortedAll.filter(w =>
    (state.writingCefr === 'ALL' || (w.cefr || 'B2') === state.writingCefr) &&
    (!q || (w.title + ' ' + w.prompt + ' ' + (w.type || '')).toLowerCase().includes(q))
  );
  const perPage = 12;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  state.writingPage = Math.max(1, Math.min(totalPages, state.writingPage || 1));
  const pageItems = filtered.slice((state.writingPage - 1) * perPage, state.writingPage * perPage);
  const pr = filtered.find(w => w.id === state.writingId) || pageItems[0] || sortedAll[0];
  state.writingId = pr.id;
  if (state.writingDrafts[pr.id] !== undefined) state.writingText = state.writingDrafts[pr.id];
  const wc = state.writingText.trim() ? state.writingText.trim().split(/\s+/).length : 0;
  const drillAns = state.writingDrillPicked[pr.id];

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">📈 ${sortedAll.length} CHỦ ĐỀ VIẾT • SẮP XẾP TĂNG DẦN #1 (A1) → #${sortedAll.length} (C2) • THANG ĐIỂM IELTS</span>
          <h1 class="text-xl font-black mt-1">✍️ Luyện Viết IELTS (${sortedAll.length} Chủ Đề & Tự Tạo Đề AI)</h1>
        </div>
        <div class="flex flex-wrap items-center gap-1.5">
          ${examTimerBarHtml([20, 40])}
          ${quotaBadgeHtml('writing', 'bài Viết')}
          <span class="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-sky-600 text-white">🎯 Thang IELTS 0.0–9.0</span>
        </div>
      </div>

      <form onsubmit="generateAiWritingPrompt(event)" class="travel-card p-4 flex flex-wrap gap-2 items-center text-xs border-2 border-teal-400 bg-teal-50/30">
        <span class="font-extrabold text-teal-800">✨ AI Tạo Đề IELTS Writing:</span>
        <input id="ai-wr-topic" required placeholder="Nhập chủ đề muốn viết (VD: Electric Vehicles, Solo Travel, AI Education)..." class="flex-1 min-w-52 px-3 py-2 rounded-xl bg-white border border-[var(--border)]" />
        <select id="ai-wr-cefr" class="px-2.5 py-2 rounded-xl bg-white border border-[var(--border)] font-bold">
          <option value="A1">A1 (3.5–4.0)</option><option value="A2">A2 (4.5–5.0)</option><option value="B1">B1 (5.5–6.0)</option>
          <option value="B2" selected>B2 (6.5–7.0)</option><option value="C1">C1 (7.5–8.0)</option><option value="C2">C2 (8.5–9.0)</option>
        </select>
        <select id="ai-wr-type" class="px-2.5 py-2 rounded-xl bg-white border border-[var(--border)] font-bold">
          <option value="IELTS Task 2">IELTS Task 2</option>
          <option value="IELTS Task 1">IELTS Task 1</option>
        </select>
        <button type="submit" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🤖 Tạo Đề</button>
      </form>

      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap gap-1.5">
          ${cefrs.map(lv => `<button onclick="state.writingCefr='${lv}';state.writingPage=1;render()" class="px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${state.writingCefr===lv?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)]'}">${lv==='ALL'?`Tất cả (${sortedAll.length})`:lv}</button>`).join('')}
        </div>
        <input id="wr-search-inp" type="text" value="${escapeHtml(state.writingQuery)}" oninput="state.writingQuery=this.value;state.writingPage=1;render()" placeholder="🔍 Tìm trong ${sortedAll.length} chủ đề viết..." class="px-3 py-1.5 rounded-xl bg-white border border-[var(--border)] text-xs w-60" />
      </div>

      <div class="grid lg:grid-cols-3 gap-4 items-start">
        <div class="space-y-2">
          <div class="flex justify-between items-center text-[11px] font-bold text-[var(--muted-foreground)] px-1">
            <span>Độ khó tăng dần (${filtered.length} chủ đề)</span>
            <span>Trang ${state.writingPage}/${totalPages}</span>
          </div>
          <div data-scroll-id="wr-list" class="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            ${pageItems.map(w => `
              <div onclick="selectWritingTopic('${w.id}')" class="hover-box travel-card p-3 cursor-pointer border-2 ${w.id===pr.id?'border-teal-500 bg-teal-50/40':'border-[var(--border)]'}">
                <div class="flex justify-between items-center gap-1"><span class="text-[10px] font-extrabold text-sky-700">${escapeHtml(w.type)}</span>${state.completedItems.writing[w.id]?`<span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">✓ Band ${state.completedItems.writing[w.id]}</span>`:''}</div>
                <div class="font-bold text-xs mt-0.5">${escapeHtml(w.title)}</div>
              </div>`).join('')}
          </div>
          <div class="flex justify-between items-center pt-1 text-xs">
            <button onclick="state.writingPage=Math.max(1,state.writingPage-1);render()" ${state.writingPage<=1?'disabled':''} class="px-3 py-1.5 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">← Trước</button>
            <span class="font-mono font-bold">${state.writingPage} / ${totalPages}</span>
            <button onclick="state.writingPage=Math.min(${totalPages},state.writingPage+1);render()" ${state.writingPage>=totalPages?'disabled':''} class="px-3 py-1.5 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Sau →</button>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-4">
          <div class="travel-card p-5 space-y-3 text-xs">
            <img src="${pr.img}" alt="${escapeHtml(pr.title)}" class="w-full h-36 object-cover rounded-xl" />
            <div class="flex justify-between items-center flex-wrap gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">${escapeHtml(pr.type)}</span>
              <span class="font-mono text-[var(--muted-foreground)]">Mục tiêu: ${pr.minWords}–${pr.targetWords} từ</span>
            </div>
            <h2 class="text-base font-extrabold text-slate-900">${escapeHtml(pr.title)}</h2>
            <p class="p-3 rounded-xl bg-[var(--content)] border border-[var(--border)] text-sm font-medium">${escapeHtml(pr.prompt)}</p>

            ${pr.drill ? `
              <div class="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200 space-y-2">
                <div class="font-bold text-sky-900">⚡ ${escapeHtml(pr.drill.q)}</div>
                <div class="grid sm:grid-cols-2 gap-1.5">
                  ${pr.drill.options.map((opt, oi) => {
                    let cls = 'bg-white border-[var(--border)]';
                    if (drillAns !== undefined) {
                      if (oi === pr.drill.answer) cls = 'bg-emerald-100 border-emerald-500 font-bold text-emerald-900';
                      else if (drillAns === oi) cls = 'bg-rose-100 border-rose-500 text-rose-800';
                    }
                    return `<button onclick="state.writingDrillPicked['${pr.id}']=${oi};render()" class="text-left px-3 py-1.5 rounded-lg border cursor-pointer ${cls}">${String.fromCharCode(65+oi)}. ${escapeHtml(opt)}</button>`;
                  }).join('')}
                </div>
                ${drillAns !== undefined ? `<div class="text-teal-900 font-semibold">🤖 AI giải thích: ${escapeHtml(pr.drill.explain)}</div>` : ''}
              </div>` : ''}

            <div class="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div class="font-bold text-amber-900">🗺️ Dàn ý chuẩn IELTS:</div>
              <ul class="list-disc pl-4 space-y-0.5 text-slate-700">${pr.outline.map(o => `<li>${escapeHtml(o)}</li>`).join('')}</ul>
            </div>
            <div class="space-y-1.5">
              <div class="flex justify-between items-center">
                <label class="font-bold">Bài viết IELTS của bạn:</label>
                <span id="wr-wc" class="font-mono font-bold ${wc>=pr.minWords?'text-emerald-600':'text-amber-600'}">Số từ: ${wc} / ${pr.minWords}+</span>
              </div>
              <textarea id="wr-editor-ta" rows="7" oninput="onWritingDraftInput(this.value, ${pr.minWords})" placeholder="Viết bài tiếng Anh của bạn tại đây để AI chấm theo 4 tiêu chí IELTS..." class="w-full p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] text-xs leading-relaxed">${escapeHtml(state.writingText)}</textarea>
            </div>
            <div class="flex justify-end">
              <button onclick="gradeWritingNow()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🤖 Nộp bài & AI Chấm IELTS Band</button>
            </div>
          </div>
          ${renderAiScoreCard(state.writingResult)}
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 6. HỌC: LUYỆN ĐỌC HIỂU CHUẨN LUYENNGUPHAP.COM (ĐỌC BÁO SONG NGỮ + 408 ĐỀ IELTS SPLIT-PANE • TÔ MÀU • TRA TỪ • BẤM GIỜ)
// =========================================================================
function lookupQuickWordInfo(rawText) {
  const clean = String(rawText || '').trim().replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g, '');
  if (!clean) return { word: '', ipa: '', pos: '', meaning: '' };
  const lower = clean.toLowerCase();
  if (typeof ATLAS_TOPICS !== 'undefined') {
    for (const t of ATLAS_TOPICS) {
      if (!Array.isArray(t.bank)) continue;
      const hit = t.bank.find(e => String(e[0] || '').toLowerCase() === lower);
      if (hit) return { word: hit[0], ipa: hit[1] || '', pos: hit[2] || '', meaning: hit[3] || '' };
    }
  }
  if (Array.isArray(ALL_CURRICULUM_WORDS)) {
    const wHit = ALL_CURRICULUM_WORDS.find(x => String(x.word || '').toLowerCase() === lower);
    if (wHit) return { word: wHit.word, ipa: wHit.ipa || '', pos: wHit.pos || '', meaning: wHit.meaning || '' };
  }
  const translated = simpleEnToViTranslate(clean);
  return {
    word: clean,
    ipa: '',
    pos: clean.includes(' ') ? 'cụm từ' : 'từ vựng',
    meaning: translated.toLowerCase() !== lower ? translated : `Từ/cụm trong ngữ cảnh bài đọc ("${clean}")`
  };
}

function renderHighlightedReadingText(rawText, rdId) {
  let safe = escapeHtml(rawText || '');
  const list = (state.readingHighlights && Array.isArray(state.readingHighlights[rdId]))
    ? state.readingHighlights[rdId]
    : [];
  if (!list.length) return safe;
  // Sort longer phrases first to avoid nested partial replacements
  const sorted = [...list].sort((a, b) => (b.text?.length || 0) - (a.text?.length || 0));
  sorted.forEach(item => {
    if (!item || !item.text) return;
    const escTarget = escapeHtml(item.text);
    if (!escTarget || escTarget.length < 2) return;
    const cls = item.color === 'green' ? 'rd-hl-green'
      : item.color === 'pink' ? 'rd-hl-pink'
      : item.color === 'blue' ? 'rd-hl-blue'
      : item.color === 'strike' ? 'rd-hl-strike'
      : 'rd-hl-yellow';
    const escapedRegex = escTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      safe = safe.replace(new RegExp(escapedRegex, 'gi'), (m) => `<mark class="${cls}">${m}</mark>`);
    } catch {}
  });
  return safe;
}

let _pendingReadingSelText = '';
function handleReadingSelectionMouseUp(ev) {
  const pop = document.getElementById('reading-selection-pop');
  if (!pop) return;
  setTimeout(() => {
    const selObj = window.getSelection ? window.getSelection() : null;
    const txt = selObj ? String(selObj.toString() || '').trim() : '';
    const pane = document.getElementById('rd-left-passage-pane');
    if (!txt || txt.length < 2 || txt.length > 160 || !pane || (selObj.anchorNode && !pane.contains(selObj.anchorNode))) {
      return;
    }
    _pendingReadingSelText = txt;
    const info = lookupQuickWordInfo(txt);
    let rect = { left: ev.clientX, top: ev.clientY, bottom: ev.clientY };
    try {
      if (selObj.rangeCount > 0) rect = selObj.getRangeAt(0).getBoundingClientRect();
    } catch {}
    const left = Math.max(12, Math.min(window.innerWidth - 320, rect.left));
    const top = Math.max(12, (rect.top > 150 ? rect.top - 128 : rect.bottom + 10));
    pop.style.left = `${Math.round(left)}px`;
    pop.style.top = `${Math.round(top)}px`;
    const safeWordJs = txt.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const safeMeanJs = (info.meaning || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    pop.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <div class="font-extrabold text-teal-300 text-xs truncate">"${escapeHtml(txt)}" ${info.ipa ? `<span class="font-mono text-[11px] text-slate-300">${escapeHtml(info.ipa)}</span>` : ''}</div>
          <div class="text-[11px] text-slate-200 mt-0.5 leading-snug">🇻🇳 ${escapeHtml(info.meaning)}</div>
        </div>
        <button type="button" onclick="hideReadingSelectionPop()" class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] cursor-pointer">✕</button>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-1.5 pt-1 border-t border-slate-700">
        <div class="flex items-center gap-1">
          <span class="text-[10px] text-slate-400 mr-0.5">Tô:</span>
          <button type="button" onclick="applyReadingHighlight('yellow')" title="Tô vàng" class="w-5 h-5 rounded-full bg-yellow-300 border border-white/50 cursor-pointer"></button>
          <button type="button" onclick="applyReadingHighlight('green')" title="Tô xanh lá" class="w-5 h-5 rounded-full bg-emerald-300 border border-white/50 cursor-pointer"></button>
          <button type="button" onclick="applyReadingHighlight('pink')" title="Tô hồng" class="w-5 h-5 rounded-full bg-pink-300 border border-white/50 cursor-pointer"></button>
          <button type="button" onclick="applyReadingHighlight('blue')" title="Tô xanh dương" class="w-5 h-5 rounded-full bg-sky-300 border border-white/50 cursor-pointer"></button>
          <button type="button" onclick="applyReadingHighlight('strike')" title="Gạch loại trừ" class="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] line-through text-rose-300 cursor-pointer">ABC</button>
          <button type="button" onclick="removeReadingHighlightForSel()" title="Bỏ tô đoạn này" class="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 cursor-pointer">Bỏ tô</button>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" onclick="speak('${safeWordJs}','en-US',0.93)" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] font-bold cursor-pointer">🔊 Nghe</button>
          <button type="button" onclick="quickSaveWordToPersonalNotebook('${safeWordJs}','${safeMeanJs}');hideReadingSelectionPop()" class="px-2 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-extrabold cursor-pointer">⭐ Lưu từ</button>
        </div>
      </div>`;
    pop.classList.remove('hidden');
  }, 20);
}

function hideReadingSelectionPop() {
  document.getElementById('reading-selection-pop')?.classList.add('hidden');
}

function applyReadingHighlight(color) {
  const txt = (_pendingReadingSelText || '').trim();
  const rdId = state.readingId;
  if (!txt || !rdId) { hideReadingSelectionPop(); return; }
  if (!state.readingHighlights[rdId]) state.readingHighlights[rdId] = [];
  state.readingHighlights[rdId] = state.readingHighlights[rdId].filter(x => x.text.toLowerCase() !== txt.toLowerCase());
  state.readingHighlights[rdId].push({ text: txt, color });
  saveJson('tamn_reading_hl_v1', state.readingHighlights);
  hideReadingSelectionPop();
  try { window.getSelection()?.removeAllRanges(); } catch {}
  render();
}

function removeReadingHighlightForSel() {
  const txt = (_pendingReadingSelText || '').trim();
  const rdId = state.readingId;
  if (txt && rdId && Array.isArray(state.readingHighlights[rdId])) {
    state.readingHighlights[rdId] = state.readingHighlights[rdId].filter(x => x.text.toLowerCase() !== txt.toLowerCase());
    saveJson('tamn_reading_hl_v1', state.readingHighlights);
  }
  hideReadingSelectionPop();
  render();
}

function clearAllHighlightsInPassage(rdId) {
  if (state.readingHighlights[rdId]) {
    delete state.readingHighlights[rdId];
    saveJson('tamn_reading_hl_v1', state.readingHighlights);
    notify('🧹 Đã xóa toàn bộ vết tô màu trong bài đọc này.');
    render();
  }
}

function openReadingPassage(rdId, practiceType = 'step') {
  state.readingId = rdId;
  state.readingPracticeType = practiceType;
  state.readingView = 'practice';
  state.readingGraded = false;
  hideReadingSelectionPop();
  if (practiceType === 'timed') {
    state.readingMode = 'english';
    startExamTimer(20);
  } else {
    stopExamTimer(false);
    render();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleReadingSentenceVi(key) {
  state.readingOpenSentences[key] = !state.readingOpenSentences[key];
  render();
}

function jumpToReadingQuestion(qIdx) {
  const el = document.getElementById('rd-q-card-' + qIdx);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function jumpToNextUnansweredReadingQ(rd) {
  if (!rd || !Array.isArray(rd.questions)) return;
  const idx = rd.questions.findIndex((qu, i) => {
    const v = state.readingAnswers[`${rd.id}_${i}`];
    return v === undefined || v === null || String(v).trim() === '';
  });
  if (idx === -1) {
    notify('✅ Bạn đã trả lời đầy đủ tất cả câu hỏi! Hãy bấm Nộp bài để chấm điểm.');
    return;
  }
  jumpToReadingQuestion(idx);
}

function generateAiReadingPassage(e) {
  e.preventDefault();
  const topicTxt = (document.getElementById('ai-rd-topic')?.value || '').trim();
  const cefr = document.getElementById('ai-rd-lvl')?.value || 'B2';
  if (!topicTxt) return;

  const bandMap = { A1:'Band 3.5–4.0', A2:'Band 4.5–5.0', B1:'Band 5.5–6.0', B2:'Band 6.5–7.0', C1:'Band 7.5–8.0', C2:'Band 8.5–9.0' };
  const newRd = {
    id: 'rd-ai-' + Date.now(),
    difficulty: state.readingList.length + 1,
    cefr,
    kind: 'exam',
    topicTag: 'AI Tạo Chủ Đề',
    targetBand: bandMap[cefr] || 'Band 6.5–7.0',
    exam: 'IELTS',
    level: `✨ AI Tạo • ${cefr} • ${bandMap[cefr]}`,
    title: `[AI ${cefr}] Exploring ${topicTxt} in the Modern World`,
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    paragraphs: [
      {
        en: `Over the past decade, ${topicTxt} has attracted growing international attention. Researchers note that thoughtful investment in ${topicTxt} creates meaningful economic opportunities while inspiring younger generations to think creatively.`,
        vi: `Trong thập kỷ qua, chủ đề "${topicTxt}" đã thu hút sự quan tâm ngày càng lớn trên toàn cầu. Các nhà nghiên cứu nhận thấy việc đầu tư bài bản vào ${topicTxt} tạo ra nhiều cơ hội kinh tế ý nghĩa đồng thời truyền cảm hứng sáng tạo cho thế hệ trẻ.`
      },
      {
        en: `Nevertheless, experts caution that rapid progress also requires sustainable planning. When communities collaborate closely and share empirical knowledge, ${topicTxt} can deliver long-term benefits without harming the environment.`,
        vi: `Tuy vậy, các chuyên gia cảnh báo rằng tốc độ phát triển nhanh cũng đòi hỏi kế hoạch bền vững. Khi cộng đồng hợp tác chặt chẽ và chia sẻ tri thức thực nghiệm, ${topicTxt} có thể mang lại lợi ích lâu dài mà không làm tổn hại môi trường.`
      },
      {
        en: `Looking ahead, educators recommend integrating practical case studies on ${topicTxt} into university curricula so students can evaluate both opportunities and ethical responsibilities effectively.`,
        vi: `Nhìn về tương lai, các nhà giáo dục khuyến nghị đưa các tình huống thực tiễn về ${topicTxt} vào chương trình đại học để sinh viên đánh giá hiệu quả cả cơ hội lẫn trách nhiệm đạo đức.`
      }
    ],
    questions: [
      { type: 'mcq', q: `1. [IELTS MCQ] According to paragraph 1, what does thoughtful investment in "${topicTxt}" create?`, options: ['Less international curiosity', 'Meaningful economic opportunities and creative inspiration', 'Higher environmental pollution only', 'Shorter academic semesters'], answer: 1, explain: 'Đoạn 1 nêu rõ: "creates meaningful economic opportunities while inspiring younger generations to think creatively".' },
      { type: 'tfng', q: `2. [True / False / Not Given] Experts believe rapid progress does not need sustainable planning.`, options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 1, explain: 'FALSE — Đoạn 2 khẳng định ngược lại: "experts caution that rapid progress also requires sustainable planning."' },
      { type: 'fill', q: `3. [IELTS Gap Fill] When communities collaborate closely, "${topicTxt}" can deliver long-term ______ without harming the environment.`, answerText: 'benefits', explain: 'Đoạn 2: "deliver long-term benefits without harming the environment".' },
      { type: 'mcq', q: `4. [IELTS Detail] Why do educators recommend adding case studies on "${topicTxt}" to curricula?`, options: ['To eliminate group projects', 'To help students evaluate opportunities and ethical responsibilities', 'To reduce reading assignments', 'To replace science laboratories'], answer: 1, explain: 'Đoạn 3: "so students can evaluate both opportunities and ethical responsibilities effectively".' }
    ]
  };

  state.readingList.unshift(newRd);
  const saved = loadJson('tamn_ai_reading_v1', []);
  saved.unshift(newRd);
  saveJson('tamn_ai_reading_v1', saved);

  e.target.reset();
  notify(`✨ AI đã tạo xong bài đọc "${topicTxt}" (${cefr})!`);
  openReadingPassage(newRd.id, 'step');
}

function renderReading(v) {
  const cefrs = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const sortedAll = [...state.readingList].sort((a, b) => (a.difficulty || 999) - (b.difficulty || 999));
  const articlesCnt = sortedAll.filter(r => r.kind === 'article').length;
  const examsCnt = sortedAll.filter(r => r.kind !== 'article').length;
  const doneCnt = Object.keys(state.completedItems.reading || {}).length;

  // =======================================================================
  // MÀN 1: THƯ VIỆN LUYỆN ĐỌC GIỐNG 100% LUYENNGUPHAP.COM (BÁO SONG NGỮ + ĐỀ THI IELTS)
  // =======================================================================
  if (state.readingView !== 'practice') {
    const q = (state.readingQuery || '').trim().toLowerCase();
    const filtered = sortedAll.filter(r => {
      if (state.readingTab === 'article' && r.kind !== 'article') return false;
      if (state.readingTab === 'exam' && r.kind === 'article') return false;
      if (state.readingCefr !== 'ALL' && String(r.cefr || 'B2').toUpperCase() !== state.readingCefr) return false;
      if (q && !(r.title + ' ' + (r.level || '') + ' ' + (r.topicTag || '') + ' ' + (r.desc || '')).toLowerCase().includes(q)) return false;
      return true;
    });

    const perPage = 12;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    state.readingPage = Math.max(1, Math.min(totalPages, state.readingPage || 1));
    const pageItems = filtered.slice((state.readingPage - 1) * perPage, state.readingPage * perPage);

    v.innerHTML = `
      <div class="space-y-4">
        <!-- Banner chuẩn Luyện Ngữ Pháp Reading & Quizzes -->
        <div class="travel-card p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3 border-l-4 border-orange-500">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">📚 LUYỆN ĐỌC SONG NGỮ & LUYỆN ĐỀ • ${sortedAll.length} BÀI ĐỌC</span>
              <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">✓ Đã hoàn thành: ${doneCnt} bài</span>
            </div>
            <h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-1">Đọc Báo Song Ngữ & Phòng Thi IELTS Reading Split-Pane</h1>
            <p class="text-xs text-slate-600 mt-0.5">Bấm từng câu xem dịch ngay • Bôi đen bất kỳ từ/cụm nào để tra nghĩa, phát âm, tô màu Highlight 4 màu & lưu vào Sổ từ • Chấm chuẩn IELTS Band 0.0–9.0.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            ${state.readingId ? `<button onclick="state.readingView='practice';render()" class="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold cursor-pointer shadow">📖 Mở tiếp bài đang đọc →</button>` : ''}
          </div>
        </div>

        <!-- Tabs: Tất cả / Đọc báo song ngữ / Luyện đề IELTS & THPT -->
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="inline-flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs">
            <button onclick="state.readingTab='all';state.readingPage=1;render()" class="px-3.5 py-2 rounded-xl font-extrabold cursor-pointer ${state.readingTab==='all'?'bg-slate-900 text-white':'text-slate-700 hover:bg-[var(--content)]'}">📚 Tất cả (${sortedAll.length})</button>
            <button onclick="state.readingTab='article';state.readingPage=1;render()" class="px-3.5 py-2 rounded-xl font-extrabold cursor-pointer ${state.readingTab==='article'?'bg-teal-600 text-white':'text-slate-700 hover:bg-[var(--content)]'}">📰 Đọc báo song ngữ (${articlesCnt})</button>
            <button onclick="state.readingTab='exam';state.readingPage=1;render()" class="px-3.5 py-2 rounded-xl font-extrabold cursor-pointer ${state.readingTab==='exam'?'bg-orange-600 text-white':'text-slate-700 hover:bg-[var(--content)]'}">📝 Luyện đề IELTS / THPT (${examsCnt})</button>
          </div>

          <input id="rd-search-inp" type="text" value="${escapeHtml(state.readingQuery)}"
            oninput="state.readingQuery=this.value;state.readingPage=1;render()"
            placeholder="🔍 Tìm tiêu đề, chủ đề, cấp độ..."
            class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] text-xs w-64 focus:outline-none focus:border-orange-500" />
        </div>

        <!-- Bộ lọc CEFR + Khung AI Tạo bài đọc mới -->
        <div class="travel-card p-3.5 space-y-3 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap gap-1.5 items-center">
              <span class="font-extrabold text-slate-500 mr-1">Trình độ CEFR:</span>
              ${cefrs.map(lv => `
                <button onclick="state.readingCefr='${lv}';state.readingPage=1;render()" class="px-3 py-1.5 rounded-full font-extrabold cursor-pointer border ${state.readingCefr===lv?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)] hover:border-orange-400'}">
                  ${lv === 'ALL' ? 'Tất cả A1–C2' : lv}
                </button>`).join('')}
            </div>
            <span class="text-[11px] font-bold text-slate-500">Hiển thị ${filtered.length} bài • Trang ${state.readingPage}/${totalPages}</span>
          </div>

          <form onsubmit="generateAiReadingPassage(event)" class="pt-2.5 border-t border-[var(--border)] flex flex-wrap gap-2 items-center">
            <span class="font-extrabold text-orange-700">✨ AI Tạo Bài Đọc Mới:</span>
            <input id="ai-rd-topic" required placeholder="Nhập chủ đề bất kỳ (VD: Space Tourism, Renewable Energy, AI in Healthcare)..." class="flex-1 min-w-52 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] focus:bg-white" />
            <select id="ai-rd-lvl" class="px-2.5 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold">
              <option value="A1">A1 (Band 3.5–4.0)</option><option value="A2">A2 (Band 4.5–5.0)</option><option value="B1">B1 (Band 5.5–6.0)</option>
              <option value="B2" selected>B2 (Band 6.5–7.0)</option><option value="C1">C1 (Band 7.5–8.0)</option><option value="C2">C2 (Band 8.5–9.0)</option>
            </select>
            <button type="submit" class="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold cursor-pointer">🤖 Tạo & Đọc Ngay</button>
          </form>
        </div>

        <!-- Lưới thẻ bài đọc chuẩn luyennguphap.com -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${pageItems.map(r => {
            const isDone = Boolean(state.completedItems.reading && state.completedItems.reading[r.id]);
            const lvCode = String(r.cefr || 'B2').toUpperCase();
            const qCount = Array.isArray(r.questions) ? r.questions.length : 0;
            const pCount = Array.isArray(r.paragraphs) ? r.paragraphs.length : 0;
            const firstPreview = r.desc || (r.paragraphs && r.paragraphs[0] ? r.paragraphs[0].en : '');
            return `
              <div class="sp-card-lnp ${isDone ? 'is-completed' : ''} justify-between">
                <div>
                  <div class="relative h-36 bg-slate-100 overflow-hidden" onclick="openReadingPassage('${r.id}','step')">
                    <img src="${r.img}" alt="${escapeHtml(r.title)}" loading="lazy" class="w-full h-full object-cover" />
                    <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-black shadow-sm ${getCefrBadgeClass(lvCode)}">${escapeHtml(lvCode)}</span>
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900/80 text-white">${r.kind === 'article' ? '📰 Báo song ngữ' : '📝 Đề IELTS'}</span>
                    </div>
                    ${isDone ? `<span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow">✓ Đã đọc xong</span>` : ''}
                  </div>
                  <div class="p-3.5 space-y-1.5" onclick="openReadingPassage('${r.id}','step')">
                    <div class="text-[10px] font-extrabold uppercase tracking-wide text-orange-700">${escapeHtml(r.topicTag || r.level || 'Reading')}</div>
                    <h3 class="font-extrabold text-sm text-slate-900 line-clamp-2 leading-snug">${escapeHtml(r.title)}</h3>
                    <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${escapeHtml(firstPreview)}</p>
                  </div>
                </div>
                <div class="px-3.5 pb-3.5 pt-2 border-t border-slate-100 space-y-2">
                  <div class="flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                    <span>📄 ${pCount} đoạn song ngữ</span>
                    <span>❓ ${qCount} câu hỏi</span>
                  </div>
                  <div class="grid grid-cols-2 gap-1.5 text-[11px]">
                    <button onclick="openReadingPassage('${r.id}','step')" class="py-2 rounded-xl bg-[var(--primary)] hover:opacity-95 text-white font-extrabold cursor-pointer">📖 Luyện từng bước</button>
                    <button onclick="openReadingPassage('${r.id}','timed')" class="py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold cursor-pointer">⏱️ Thi thử 20p</button>
                  </div>
                </div>
              </div>`;
          }).join('')}
        </div>

        <!-- Phân trang -->
        <div class="flex justify-center items-center gap-2 pt-2 text-xs">
          <button onclick="state.readingPage=Math.max(1,state.readingPage-1);render();window.scrollTo({top:0,behavior:'smooth'})" ${state.readingPage<=1?'disabled':''} class="px-4 py-2 rounded-xl bg-white border border-[var(--border)] font-extrabold cursor-pointer disabled:opacity-40">← Trang trước</button>
          <span class="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-mono font-bold">${state.readingPage} / ${totalPages}</span>
          <button onclick="state.readingPage=Math.min(${totalPages},state.readingPage+1);render();window.scrollTo({top:0,behavior:'smooth'})" ${state.readingPage>=totalPages?'disabled':''} class="px-4 py-2 rounded-xl bg-white border border-[var(--border)] font-extrabold cursor-pointer disabled:opacity-40">Trang sau →</button>
        </div>
      </div>`;
    return;
  }

  // =======================================================================
  // MÀN 2: PHÒNG LUYỆN ĐỌC SPLIT-PANE GIỐNG 100% LUYENNGUPHAP.COM (IeltsReadingExperience + QuizTakePage)
  // =======================================================================
  const rd = sortedAll.find(r => r.id === state.readingId) || sortedAll[0];
  state.readingId = rd.id;
  const qs = Array.isArray(rd.questions) ? rd.questions : [];
  const hlList = state.readingHighlights[rd.id] || [];
  const isDone = Boolean(state.completedItems.reading && state.completedItems.reading[rd.id]);
  const fontPx = Math.max(13, Math.min(21, Number(state.readingFontSize) || 15));

  let answeredCount = 0;
  let correctCount = 0;
  qs.forEach((qu, i) => {
    const ans = state.readingAnswers[`${rd.id}_${i}`];
    const hasAns = ans !== undefined && ans !== null && String(ans).trim() !== '';
    if (hasAns) answeredCount++;
    if (state.readingGraded) {
      if (qu.type === 'fill') {
        if (String(ans || '').trim().toLowerCase() === String(qu.answerText || '').trim().toLowerCase()) correctCount++;
      } else if (Number(ans) === Number(qu.answer)) {
        correctCount++;
      }
    }
  });
  const pct = (state.readingGraded && qs.length) ? Math.round((correctCount / qs.length) * 100) : 0;
  const readingBand = pctToIeltsBand(pct);

  v.innerHTML = `
    <div class="space-y-3">
      <!-- Thanh công cụ Sticky phía trên giống 100% phòng thi luyennguphap.com -->
      <div class="travel-card p-3 flex flex-wrap items-center justify-between gap-2 text-xs border-2 border-teal-500/40">
        <div class="flex flex-wrap items-center gap-2 min-w-0">
          <button onclick="stopExamTimer(false);hideReadingSelectionPop();state.readingView='browser';render()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-800 cursor-pointer shrink-0">← Thư viện Đọc</button>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-black ${getCefrBadgeClass(rd.cefr || 'B2')}">${escapeHtml(rd.cefr || 'B2')}</span>
          <span class="font-extrabold text-slate-800 truncate max-w-xs sm:max-w-md">${escapeHtml(rd.title)}</span>
        </div>

        <div class="flex flex-wrap items-center gap-1.5">
          <!-- Chuyển chế độ hiển thị bản dịch -->
          <div class="inline-flex rounded-xl bg-[var(--content)] p-0.5 border border-[var(--border)] text-[11px]">
            <button onclick="state.readingMode='bilingual';render()" class="px-2.5 py-1 rounded-lg font-extrabold cursor-pointer ${state.readingMode==='bilingual'?'bg-[var(--primary)] text-white':'text-slate-700'}">🌐 Song ngữ</button>
            <button onclick="state.readingMode='click_vi';render()" class="px-2.5 py-1 rounded-lg font-extrabold cursor-pointer ${state.readingMode==='click_vi'?'bg-teal-700 text-white':'text-slate-700'}">👆 Bấm câu dịch</button>
            <button onclick="state.readingMode='english';render()" class="px-2.5 py-1 rounded-lg font-extrabold cursor-pointer ${state.readingMode==='english'?'bg-slate-900 text-white':'text-slate-700'}">🇬🇧 Chỉ Anh</button>
          </div>

          <!-- Cỡ chữ A- / A+ -->
          <div class="inline-flex items-center rounded-xl bg-[var(--content)] border border-[var(--border)] px-1 py-0.5 text-[11px]">
            <button onclick="state.readingFontSize=Math.max(13,(state.readingFontSize||15)-1);render()" class="px-2 py-0.5 font-black cursor-pointer hover:text-teal-700">A-</button>
            <span class="px-1 text-[10px] font-mono text-slate-500">${fontPx}</span>
            <button onclick="state.readingFontSize=Math.min(21,(state.readingFontSize||15)+1);render()" class="px-2 py-0.5 font-black cursor-pointer hover:text-teal-700">A+</button>
          </div>

          <button onclick="speakCurrentReading()" class="px-2.5 py-1.5 rounded-xl bg-[var(--content)] hover:bg-teal-50 border border-[var(--border)] font-bold cursor-pointer">🔊 Nghe bài</button>
          ${examTimerBarHtml([15, 20])}
          <button onclick="state.completedItems.reading['${rd.id}']=state.completedItems.reading['${rd.id}']?false:'done';if(!state.completedItems.reading['${rd.id}'])delete state.completedItems.reading['${rd.id}'];saveLearningProgressNow();render()"
            class="px-3 py-1.5 rounded-xl font-extrabold cursor-pointer ${isDone ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-300'}">
            ${isDone ? '✓ Đã đọc xong' : '○ Đánh dấu xong'}
          </button>
        </div>
      </div>

      <!-- Hướng dẫn nhanh tính năng bôi đen tra từ & tô màu giống luyennguphap -->
      <div class="px-3.5 py-2 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex flex-wrap justify-between items-center gap-2">
        <span>💡 <strong>Mẹo phòng thi Luyện Ngữ Pháp:</strong> Bôi đen từ/cụm bất kỳ bên cột bài đọc để <strong>tra nghĩa nhanh, nghe phát âm, tô Highlight 4 màu</strong> hoặc <strong>⭐ Lưu vào Sổ từ</strong>. Kéo thanh giữa 2 cột để chỉnh độ rộng!</span>
        ${hlList.length ? `<button onclick="clearAllHighlightsInPassage('${rd.id}')" class="px-2.5 py-0.5 rounded-lg bg-white border border-amber-300 font-bold text-rose-700 cursor-pointer">🧹 Xóa ${hlList.length} vết tô màu</button>` : ''}
      </div>

      <!-- Khung Split-Pane kéo giãn trái/phải chuẩn luyennguphap.com -->
      <div class="lnp-split-container space-y-4 lg:space-y-0" style="--split-left:${state.readingSplitPct || 54}%;">
        <!-- CỘT TRÁI: BÀI ĐỌC SONG NGỮ TƯƠNG TÁC + BÔI ĐEN HIGHLIGHT -->
        <div id="rd-left-passage-pane" onmouseup="handleReadingSelectionMouseUp(event)"
          data-scroll-id="rd-left-pane"
          class="travel-card p-5 sm:p-6 space-y-4 lg:max-h-[76vh] lg:overflow-y-auto select-text">
          <div class="flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
            <div>
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">${escapeHtml(rd.level || rd.topicTag || 'Reading Passage')}</div>
              <h2 class="text-lg sm:text-xl font-black text-slate-900 mt-0.5 leading-snug">${escapeHtml(rd.title)}</h2>
            </div>
            <img src="${rd.img}" alt="" class="w-20 h-14 rounded-xl object-cover shrink-0 hidden sm:block border border-[var(--border)]" />
          </div>

          <div class="space-y-4 text-slate-800 leading-relaxed" style="font-size:${fontPx}px;">
            ${(rd.paragraphs || []).map((p, pi) => {
              const pKey = `${rd.id}_p_${pi}`;
              const isOpenSent = Boolean(state.readingOpenSentences[pKey]);
              const safeSpeech = String(p.en || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
              const renderedEn = renderHighlightedReadingText(p.en || '', rd.id);

              if (state.readingMode === 'click_vi') {
                return `
                  <div class="space-y-1.5">
                    <div class="flex items-start gap-2">
                      <span class="text-[11px] font-mono font-bold text-slate-400 mt-1 select-none">${pi + 1}.</span>
                      <div class="flex-1">
                        <span onclick="if(!window.getSelection||!String(window.getSelection()).trim())toggleReadingSentenceVi('${pKey}')"
                          class="rd-sent-wrap ${isOpenSent ? 'is-open font-medium' : ''}" title="Bấm vào đoạn/câu để hiện hoặc ẩn nghĩa tiếng Việt">${renderedEn}</span>
                        <button type="button" onclick="speak('${safeSpeech}','en-US',0.94)" title="Nghe đoạn này" class="ml-1.5 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-teal-100 text-[11px] cursor-pointer select-none">🔊</button>
                      </div>
                    </div>
                    ${isOpenSent && p.vi ? `<div class="ml-5 p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs leading-relaxed">🇻🇳 ${escapeHtml(p.vi)}</div>` : ''}
                  </div>`;
              }

              return `
                <div class="space-y-1.5">
                  <div class="flex items-start gap-2">
                    <span class="text-[11px] font-mono font-bold text-teal-600 mt-1 select-none">¶${pi + 1}</span>
                    <div class="flex-1">
                      <span>${renderedEn}</span>
                      <button type="button" onclick="speak('${safeSpeech}','en-US',0.94)" title="Nghe đoạn này" class="ml-1.5 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-teal-100 text-[11px] cursor-pointer select-none">🔊</button>
                    </div>
                  </div>
                  ${state.readingMode === 'bilingual' && p.vi ? `<p class="ml-6 text-xs text-teal-900 bg-teal-50/75 p-2.5 rounded-xl border border-teal-100 leading-relaxed">🇻🇳 ${escapeHtml(p.vi)}</p>` : ''}
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- THANH KÉO GIÃN GIỮA 2 CỘT -->
        <div class="lnp-split-handle hidden lg:flex" onmousedown="startSplitResize(event,'reading')" title="Kéo qua trái/phải để chỉnh kích thước khung bài đọc & câu hỏi"></div>

        <!-- CỘT PHẢI: BẢNG ĐIỀU HƯỚNG CÂU HỎI + BÀI TẬP TRẮC NGHIỆM / TFNG / GAP FILL -->
        <div data-scroll-id="rd-right-pane" class="travel-card p-5 space-y-4 text-xs lg:max-h-[76vh] lg:overflow-y-auto">
          ${qs.length ? `
            <!-- Question Navigator Palette giống luyennguphap.com -->
            <div class="p-3.5 rounded-2xl bg-[var(--content)] border border-[var(--border)] space-y-2.5">
              <div class="flex flex-wrap justify-between items-center gap-2">
                <div class="font-extrabold text-slate-900">🧭 Bản đồ câu hỏi (${answeredCount}/${qs.length} đã làm)</div>
                <div class="flex items-center gap-1.5">
                  ${state.readingPracticeType === 'timed' && !state.readingGraded
                    ? `<span class="px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-extrabold">⏱️ Chế độ Thi thử (Nộp mới chấm)</span>`
                    : `<span class="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-extrabold">📖 Luyện từng bước</span>`}
                  <button onclick="jumpToNextUnansweredReadingQ(state.readingList.find(x=>x.id==='${rd.id}'))" class="px-2.5 py-1 rounded-lg bg-white border border-[var(--border)] hover:border-teal-500 font-bold cursor-pointer">Tới câu trống →</button>
                </div>
              </div>

              <div class="flex flex-wrap gap-1.5">
                ${qs.map((qu, i) => {
                  const key = `${rd.id}_${i}`;
                  const ans = state.readingAnswers[key];
                  const hasAns = ans !== undefined && ans !== null && String(ans).trim() !== '';
                  const flagged = Boolean(state.readingFlaggedQs[key]);
                  let cls = 'bg-white border-[var(--border)] text-slate-700';
                  if (state.readingGraded) {
                    const ok = qu.type === 'fill'
                      ? String(ans || '').trim().toLowerCase() === String(qu.answerText || '').trim().toLowerCase()
                      : Number(ans) === Number(qu.answer);
                    cls = ok ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-rose-600 text-white border-rose-600';
                  } else if (flagged) {
                    cls = 'bg-amber-400 text-slate-950 border-amber-500';
                  } else if (hasAns) {
                    cls = 'bg-teal-600 text-white border-teal-600';
                  }
                  return `<button onclick="jumpToReadingQuestion(${i})" class="q-jump-btn w-8 h-8 rounded-xl border font-mono font-extrabold text-xs cursor-pointer ${cls}">${i + 1}${flagged ? '⚑' : ''}</button>`;
                }).join('')}
              </div>

              ${state.readingGraded ? `
                <div class="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <div class="text-[10px] font-extrabold uppercase text-emerald-700">🎯 KẾT QUẢ CHẤM PHÒNG ĐỌC</div>
                    <div class="text-base font-black text-slate-900">Đúng ${correctCount}/${qs.length} câu (${pct}%) • IELTS Band ${readingBand} / 9.0</div>
                  </div>
                  <button onclick="state.readingGraded=false;render()" class="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 font-bold text-emerald-800 cursor-pointer">🔄 Làm lại đề</button>
                </div>` : ''}
            </div>

            <!-- Danh sách câu hỏi -->
            <div class="space-y-3">
              ${qs.map((qu, i) => {
                const key = `${rd.id}_${i}`;
                const userVal = state.readingAnswers[key];
                const flagged = Boolean(state.readingFlaggedQs[key]);
                const stepChecked = Boolean(state.readingOpenSentences['chk_' + key]);
                const showExplain = state.readingGraded || (state.readingPracticeType === 'step' && stepChecked);

                return `
                  <div id="rd-q-card-${i}" class="p-4 rounded-2xl bg-[var(--content)] border-2 ${flagged ? 'border-amber-400' : 'border-[var(--border)]'} space-y-2.5">
                    <div class="flex justify-between items-start gap-2">
                      <div class="font-extrabold text-slate-900 leading-snug">${escapeHtml(qu.q)}</div>
                      <button type="button" onclick="state.readingFlaggedQs['${key}']=!state.readingFlaggedQs['${key}'];render()"
                        title="Đánh dấu xem lại câu này"
                        class="px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer shrink-0 ${flagged ? 'bg-amber-400 text-slate-950' : 'bg-white border border-[var(--border)] text-slate-500'}">
                        🚩 ${flagged ? 'Đã đánh dấu' : 'Xem lại'}
                      </button>
                    </div>

                    ${qu.type === 'fill' ? `
                      <input id="rd-fill-${key}" type="text" value="${escapeHtml(userVal || '')}"
                        oninput="state.readingAnswers['${key}']=this.value;scheduleProgressSave()"
                        placeholder="Nhập từ cần điền trong bài đọc..."
                        class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[var(--border)] font-mono font-semibold focus:outline-none focus:border-teal-500" />
                      ${showExplain ? (() => {
                        const isOk = String(userVal || '').trim().toLowerCase() === String(qu.answerText || '').trim().toLowerCase();
                        return `<div class="text-xs font-bold ${isOk ? 'text-emerald-700' : 'text-rose-700'}">${isOk ? '✓ Chính xác!' : `✗ Đáp án đúng: "${escapeHtml(qu.answerText)}"`}</div>`;
                      })() : ''}
                    ` : `
                      <div class="grid gap-1.5">
                        ${(qu.options || []).map((opt, oi) => {
                          const picked = userVal !== undefined && userVal !== '' && Number(userVal) === oi;
                          let st = 'bg-white border-[var(--border)] hover:border-teal-400';
                          if (showExplain) {
                            if (oi === Number(qu.answer)) st = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-extrabold';
                            else if (picked) st = 'bg-rose-100 border-rose-500 text-rose-800';
                          } else if (picked) {
                            st = 'bg-teal-50 border-teal-600 text-teal-950 font-extrabold';
                          }
                          return `<button type="button" onclick="state.readingAnswers['${key}']=${oi};render()" class="text-left px-3.5 py-2.5 rounded-xl border cursor-pointer transition ${st}">${escapeHtml(opt)}</button>`;
                        }).join('')}
                      </div>
                    `}

                    ${state.readingPracticeType === 'step' && !state.readingGraded ? `
                      <div class="flex justify-end">
                        <button type="button" onclick="state.readingOpenSentences['chk_${key}']=!state.readingOpenSentences['chk_${key}'];render()" class="px-2.5 py-1 rounded-lg bg-white border border-[var(--border)] hover:border-teal-500 text-[11px] font-bold text-teal-800 cursor-pointer">
                          ${stepChecked ? 'Ẩn đáp án câu này' : '✓ Kiểm tra ngay câu này'}
                        </button>
                      </div>` : ''}

                    ${showExplain && qu.explain ? `
                      <div class="p-2.5 rounded-xl bg-white border border-teal-200 text-teal-900 leading-relaxed">
                        💡 <strong>Giải thích chi tiết:</strong> ${escapeHtml(qu.explain)}
                      </div>` : ''}
                  </div>`;
              }).join('')}
            </div>

            <div class="flex flex-wrap gap-2 justify-between items-center pt-2 border-t border-[var(--border)]">
              <button onclick="state.readingGraded=false;Object.keys(state.readingAnswers).forEach(k=>{if(k.startsWith('${rd.id}_'))delete state.readingAnswers[k];});render()"
                class="px-3.5 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">🔄 Xóa làm lại</button>
              <button onclick="stopExamTimer(false);state.readingGraded=true;state.completedItems.reading['${rd.id}']='done';saveLearningProgressNow();notify('🤖 Đã chấm bài Đọc hiểu & lưu tiến độ hoàn thành!');render()"
                class="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:opacity-95 text-white font-extrabold cursor-pointer shadow">
                🤖 Nộp Bài & Chấm Điểm IELTS
              </button>
            </div>
          ` : `
            <div class="p-6 text-center space-y-3 bg-[var(--content)] rounded-2xl border border-[var(--border)]">
              <div class="text-2xl">📰</div>
              <div class="font-extrabold text-sm text-slate-800">Bài báo song ngữ luyện đọc & từ vựng</div>
              <p class="text-slate-600 leading-relaxed">Hãy bôi đen bất kỳ từ vựng hay cụm từ nào bên cột trái để xem nghĩa, nghe phát âm, tô màu Highlight và lưu vào Sổ từ cá nhân. Khi đọc xong, bấm nút dưới để ghi nhận hoàn thành!</p>
              <button onclick="state.completedItems.reading['${rd.id}']='done';saveLearningProgressNow();notify('✅ Đã đánh dấu hoàn thành bài đọc song ngữ!');render()" class="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold cursor-pointer">✓ Hoàn thành bài báo này</button>
            </div>
          `}
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 7. HỌC: NGỮ PHÁP TOÀN DIỆN (24 LOẠI KIẾN THỨC/CẤU TRÚC • 3.600+ BÀI KHÔNG TRÙNG/DẠNG • 30 CÂU/LẦN • THANG IELTS)
// Nguồn chuẩn hóa: British Council LearnEnglish Grammar Reference • Cambridge Grammar of English • Test-English A1–C2
// =========================================================================
function capFirst(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function shuffleGrammarOptions(correct, wrongs, seed) {
  const uniqueWrongs = [];
  for (const w of wrongs) {
    if (w !== correct && !uniqueWrongs.includes(w)) uniqueWrongs.push(w);
  }
  const arr = [correct, ...uniqueWrongs.slice(0, 3)];
  let s = (seed * 2654435761) >>> 0;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return { options: arr, answer: arr.indexOf(correct) };
}

function generateGrammarQuestion(catId, qIdx) {
  const P = GRAMMAR_ENGINE_POOLS;
  const catNum = Number(String(catId).split('-')[1]) || 1;
  const idx = ((qIdx * 1009 + catNum * 37) % 3600 + 3600) % 3600;
  const a = idx % 15;
  const b = Math.floor(idx / 15) % 16;
  const c = Math.floor(idx / 240) % 15;

  const isSg = (c % 2 === 0);
  const subj = isSg ? P.SUBJ_SG[a] : P.SUBJ_PL[a];
  const [v0, vs, v2, v3, ving, obj] = P.VERBS[b];
  const place = P.PLACES[c % 12];
  const ctx = P.CONTEXTS[c];
  const seed = idx * 31 + catNum * 97 + 7;

  let q = '', correct = '', wrongs = [], explain = '';

  if (catId === 'gr-01') {
    const freq = P.FREQ[c % 8];
    correct = isSg ? vs : v0;
    wrongs = [isSg ? v0 : vs, ving, `is ${ving}`];
    q = `${subj} usually ______ ${obj} ${freq} (${ctx}).`;
    explain = `Dấu hiệu "${freq}" + "usually" → Thì Hiện tại đơn. Chủ ngữ "${subj}" là ${isSg ? 'số ít' : 'số nhiều'} → chia "${correct}".`;
  } else if (catId === 'gr-02') {
    const mk = P.NOW_MARKERS[c % 8];
    const be = isSg ? 'is' : 'are';
    correct = `${be} ${ving}`;
    wrongs = [isSg ? vs : v0, `${isSg ? 'are' : 'is'} ${ving}`, v2];
    q = `Look! ${subj} ______ ${obj} ${mk} (${ctx}).`;
    explain = `Dấu hiệu "Look!" và "${mk}" → Thì Hiện tại tiếp diễn (am/is/are + V-ing). Chủ ngữ "${subj}" → "${correct}".`;
  } else if (catId === 'gr-03') {
    const mk = P.PAST_MARKERS[c % 8];
    correct = v2;
    wrongs = [vs, `${isSg ? 'is' : 'are'} ${ving}`, `have ${v3}`];
    q = `${subj} ______ ${obj} ${mk} (${ctx}).`;
    explain = `Mốc quá khứ xác định "${mk}" → Thì Quá khứ đơn (V2/ed): "${correct}".`;
  } else if (catId === 'gr-04') {
    const at = P.PAST_AT[c % 8];
    const be = isSg ? 'was' : 'were';
    correct = `${be} ${ving}`;
    wrongs = [`${isSg ? 'were' : 'was'} ${ving}`, `${isSg ? 'is' : 'are'} ${ving}`, v2];
    q = `${subj} ______ ${obj} ${at} (${ctx}).`;
    explain = `Thời điểm đang diễn ra trong quá khứ "${at}" → Thì Quá khứ tiếp diễn (was/were + V-ing): "${correct}".`;
  } else if (catId === 'gr-05') {
    const pt = P.PERF_TIME[c % 8];
    const hv = isSg ? 'has' : 'have';
    correct = `${hv} ${v3}`;
    wrongs = [`${isSg ? 'have' : 'has'} ${v3}`, v2, `${isSg ? 'is' : 'are'} ${ving}`];
    q = `${subj} ______ ${obj} ${pt} (${ctx}).`;
    explain = `Có dấu hiệu "${pt}" → Thì Hiện tại hoàn thành (have/has + V3/ed). Chủ ngữ "${subj}" → "${correct}".`;
  } else if (catId === 'gr-06') {
    if (c % 2 === 0) {
      const fp = P.FUT_PLAN[c % 8];
      const be = isSg ? 'is' : 'are';
      correct = `${be} going to`;
      wrongs = [`${isSg ? 'are' : 'is'} going to`, 'will been', 'has going to'];
      q = `According to the plan, ${subj} ______ ${v0} ${obj} ${fp} (${ctx}).`;
      explain = `Kế hoạch đã dự định trước ("According to the plan", "${fp}") → Tương lai gần: "${correct} + V0".`;
    } else {
      const fb = P.FUT_BY[c % 8];
      correct = `will have ${v3}`;
      wrongs = [`will ${ving}`, `have ${v3}`, `had ${v3}`];
      q = `${capFirst(fb)}, ${subj.toLowerCase()} ______ ${obj} (${ctx}).`;
      explain = `Có "By + mốc tương lai" ("${fb}") → Thì Tương lai hoàn thành: "will have + V3" ("${correct}").`;
    }
  } else if (catId === 'gr-07') {
    const [art, phrase, exp] = P.ARTICLES[a];
    const s2 = P.SUBJ_SG[b % 15];
    correct = art;
    wrongs = ['a', 'an', 'the', 'Ø (không mạo từ)'].filter(x => x !== art);
    q = `${s2} noticed ______ ${phrase} while ${ving} ${obj} (${ctx}).`;
    explain = `Quy tắc mạo từ: "${phrase}" — ${exp}.`;
  } else if (catId === 'gr-08') {
    const [ans, wr, phrase, exp] = P.QUANTIFIERS[b];
    correct = ans; wrongs = wr;
    q = `${subj} did not expect ______ ${phrase} (${ctx}).`;
    explain = `Quy tắc lượng từ: ${exp}.`;
  } else if (catId === 'gr-09') {
    const [ans, wr, lead, exp] = P.PRONOUNS[b];
    correct = ans; wrongs = wr;
    if (b < 6) q = `${lead} completed ${obj} all by ______ (${ctx}, case #${a + 1}).`;
    else if (b < 10) q = `${lead} ______ is stored neatly ${place} (${ctx}, set #${a + 1}).`;
    else if (b < 14) q = `${lead} ______ responsible for ${ving} ${obj} (${ctx}, #${a + 1}).`;
    else if (b === 14) q = `${lead} ______ while ${ving} ${obj} (${ctx}, #${a + 1}).`;
    else q = `${lead} ______ ${place} before ${ving} ${obj} (${ctx}, #${a + 1})?`;
    explain = `Hệ thống đại từ: ${exp}.`;
  } else if (catId === 'gr-10') {
    if (c % 2 === 0) {
      correct = `had ${v3}`;
      wrongs = [`have ${v3}`, `has ${v3}`, `was ${ving}`];
      q = `Before the supervisor arrived (${ctx}), ${subj.toLowerCase()} already ______ ${obj}.`;
      explain = `Hành động xảy ra TRƯỚC một hành động quá khứ ("Before... arrived") → Quá khứ hoàn thành: "${correct}".`;
    } else {
      correct = `had been ${ving}`;
      wrongs = [`have been ${ving}`, `was ${ving}`, `had ${v3} been`];
      q = `By the time the seminar ended (${ctx}), ${subj.toLowerCase()} ______ ${obj} for hours.`;
      explain = `"By the time + QKĐ" + "for hours" (nhấn mạnh liên tục trước quá khứ) → Quá khứ hoàn thành tiếp diễn: "${correct}".`;
    }
  } else if (catId === 'gr-11') {
    const [ans, wr, tail, exp] = P.MODALS[b];
    correct = ans; wrongs = wr;
    if (b === 11) q = `Excuse me, ______ ${tail} (${ctx}, #${a + 1})`;
    else if (b === 12) q = `${subj} ${tail} (${ctx}).`;
    else q = `${subj} ______ ${tail} (${ctx}).`;
    explain = `Động từ khuyết thiếu: ${exp}.`;
  } else if (catId === 'gr-12') {
    const [trigger, ans, wr, exp] = P.GERUND_INF[b];
    correct = ans; wrongs = wr;
    const isModalLike = trigger.startsWith('will ');
    const conjTrigger = isModalLike ? trigger : (isSg ? (trigger === 'get used to' ? 'gets used to' : trigger === 'look forward to' ? 'looks forward to' : `${trigger}s`) : trigger);
    q = `${subj} ${conjTrigger} ______ carefully (${ctx}, task: ${obj}).`;
    explain = `Mẫu động từ V-ing / To-V / V0: ${exp}.`;
  } else if (catId === 'gr-13') {
    if (c % 3 === 0) {
      correct = `is ${v3}`;
      wrongs = [`is ${ving}`, `are ${v3}`, v2];
      q = `Every week (${ctx}), ${obj} ______ carefully by ${subj.toLowerCase()}.`;
      explain = `Bị động Hiện tại đơn ("Every week" + "by...") với chủ ngữ số ít "${obj}" → "is + V3/ed" ("${correct}").`;
    } else if (c % 3 === 1) {
      correct = `was ${v3}`;
      wrongs = [`were ${v3}`, `was ${ving}`, `has ${v3}`];
      q = `Yesterday (${ctx}), ${obj} ______ ahead of schedule by ${subj.toLowerCase()}.`;
      explain = `Bị động Quá khứ đơn ("Yesterday" + "by...") với chủ ngữ số ít → "was + V3/ed" ("${correct}").`;
    } else {
      correct = v3;
      wrongs = [v0, ving, `to ${v0}`];
      q = `Tomorrow (${ctx}), ${subj.toLowerCase()} will have ${obj} ______ by a specialist.`;
      explain = `Cấu trúc bị động nhờ vả: "have + vật + V3/ed" → "${correct}".`;
    }
  } else if (catId === 'gr-14') {
    const [ans, wr, tail, exp] = P.COMP_ADJS[b];
    correct = ans; wrongs = wr;
    q = `According to ${subj.toLowerCase()} (${ctx}), the new version is ______ ${tail} (ref: ${obj}).`;
    explain = `Cấu trúc so sánh: ${exp}.`;
  } else if (catId === 'gr-15') {
    const [ans, wr, tail, exp] = P.PREPOSITIONS[b];
    correct = ans; wrongs = wr;
    q = `${P.SUBJ_SG[a]} ${tail} (${ctx}).`;
    explain = `Quy tắc giới từ: ${exp}.`;
  } else if (catId === 'gr-16') {
    const [ans, wr, tail, exp] = P.CONJUNCTIONS[b];
    correct = ans; wrongs = wr;
    q = tail.includes('______')
      ? `In ${P.SUBJ_SG[a]}'s note (${ctx}): ${tail}.`
      : `In ${P.SUBJ_SG[a]}'s note (${ctx}): ______ ${tail}.`;
    explain = `Liên từ & Mệnh đề: ${exp}.`;
  } else if (catId === 'gr-17') {
    if (c % 3 === 0) {
      correct = 'will succeed';
      wrongs = ['would succeed', 'would have succeeded', 'succeeded'];
      q = `If ${subj.toLowerCase()} ${isSg ? vs : v0} ${obj} (${ctx}), the project ______ on time.`;
      explain = `Câu điều kiện loại 1 (mệnh đề If chia Hiện tại đơn) → mệnh đề chính dùng "will + V0" ("will succeed").`;
    } else if (c % 3 === 1) {
      correct = 'would progress';
      wrongs = ['will progress', 'would have progressed', 'progressed'];
      q = `If ${subj.toLowerCase()} ${v2} ${obj} (${ctx}), the whole team ______ much faster.`;
      explain = `Câu điều kiện loại 2 (mệnh đề If chia Quá khứ đơn) → mệnh đề chính dùng "would + V0" ("would progress").`;
    } else {
      correct = 'would have won';
      wrongs = ['would win', 'will have won', 'had won'];
      q = `If ${subj.toLowerCase()} had ${v3} ${obj} (${ctx}), they ______ the top prize.`;
      explain = `Câu điều kiện loại 3 (mệnh đề If chia "had + V3") → mệnh đề chính dùng "would have + V3" ("would have won").`;
    }
  } else if (catId === 'gr-18') {
    const [ans, wr, tail, exp] = P.RELATIVES[b];
    correct = ans; wrongs = wr;
    q = tail.startsWith(',')
      ? `The facility (${ctx}, noted by ${P.SUBJ_SG[a]})${tail}.`
      : `${capFirst(ctx)} (reported by ${P.SUBJ_SG[a]}), ${tail}.`;
    explain = `Mệnh đề quan hệ: ${exp}.`;
  } else if (catId === 'gr-19') {
    if (c % 3 === 0) {
      correct = `had ${v3}`;
      wrongs = [`have ${v3}`, v0, `will ${v0}`];
      q = `${subj} said that they ______ ${obj} the previous week (${ctx}).`;
      explain = `Câu tường thuật có "said" + "the previous week" → lùi thì từ Quá khứ đơn xuống Quá khứ hoàn thành: "${correct}".`;
    } else if (c % 3 === 1) {
      correct = `would ${v0}`;
      wrongs = [`will ${v0}`, `would ${ving}`, `did ${v2}`];
      q = `The advisor asked ${subj.toLowerCase()} whether they ______ ${obj} (${ctx}).`;
      explain = `Câu hỏi gián tiếp sau "asked... whether" lùi "will" → "would + V0" ("${correct}") và KHÔNG đảo trợ động từ.`;
    } else {
      correct = `to ${v0}`;
      wrongs = [ving, v0, v3];
      q = `The coordinator reminded ${subj.toLowerCase()} ______ ${obj} (${ctx}).`;
      explain = `Động từ tường thuật: "remind + O + to V0" → "${correct}".`;
    }
  } else if (catId === 'gr-20') {
    const [ans, wr, tail, exp] = P.SVA_TAG[b];
    correct = ans; wrongs = wr;
    q = `[${capFirst(ctx)} • Ref: ${P.SUBJ_SG[a]}] ${tail}.`;
    explain = `Hòa hợp S–V & Câu hỏi đuôi: ${exp}.`;
  } else if (catId === 'gr-21') {
    const [ans, wr, tail, exp] = P.PHRASAL_WF[b];
    correct = ans; wrongs = wr;
    q = `As ${P.SUBJ_SG[a]} noted (${ctx}), ${tail}.`;
    explain = `Cụm động từ & Từ loại: ${exp}.`;
  } else if (catId === 'gr-22') {
    const wishVerb = isSg ? 'wishes' : 'wish';
    if (c % 3 === 0) {
      correct = `had ${v3}`;
      wrongs = [v2, `would ${v0}`, `have ${v3}`];
      q = `${subj} ${wishVerb} they ______ ${obj} more thoroughly yesterday (${ctx}).`;
      explain = `Câu ước trái sự thật quá khứ ("yesterday") → "wish + S + had + V3": "${correct}".`;
    } else if (c % 3 === 1) {
      correct = 'would feel';
      wrongs = ['would have felt', 'will feel', 'felt'];
      q = `Had ${subj.toLowerCase()} ${v3} ${obj} earlier (${ctx}), they ______ proud right now.`;
      explain = `Đảo ngữ Điều kiện hỗn hợp 3→2 ("Had + S + V3..., S + would + V0 + right now") → "would feel".`;
    } else {
      correct = v2;
      wrongs = [v0, `will ${v0}`, `has ${v3}`];
      q = `It is high time ${subj.toLowerCase()} ______ ${obj} seriously (${ctx}).`;
      explain = `Cấu trúc giả định: "It is high time + S + V2/ed" → "${correct}".`;
    }
  } else if (catId === 'gr-23') {
    if (c % 3 === 0) {
      correct = `Having ${v3}`;
      wrongs = [`Have ${v3}`, `Been ${v3}`, `To ${ving}`];
      q = `______ ${obj} carefully (${ctx}), ${subj.toLowerCase()} submitted the final draft.`;
      explain = `Mệnh đề phân từ hoàn thành chủ động (làm xong việc 1 mới làm việc 2) → "Having + V3": "${correct}".`;
    } else if (c % 3 === 1) {
      correct = capFirst(v3);
      wrongs = [capFirst(ving), capFirst(v0), `Being ${v0}`];
      q = `______ thoroughly by experts (${ctx}), ${obj} earned praise from ${subj.toLowerCase()}.`;
      explain = `Mệnh đề phân từ bị động (có "by experts") → rút gọn dùng Quá khứ phân từ V3/ed: "${correct}".`;
    } else {
      correct = `must have ${v3}`;
      wrongs = [`must ${v0}`, `can't have ${v3}`, `shouldn't ${v0}`];
      q = `${subj} ______ ${obj} earlier because every detail is spotless (${ctx}).`;
      explain = `Suy luận chắc chắn một việc ĐÃ xảy ra trong quá khứ ("every detail is spotless") → "must have + V3": "${correct}".`;
    }
  } else {
    const [ans, wr, tail, exp] = P.INVERSION_C2[b];
    correct = ans; wrongs = wr;
    q = `[${capFirst(ctx)} • ${P.SUBJ_SG[a]}] ${tail}.`;
    explain = `Ngữ pháp C2 (Đảo ngữ / Câu chẻ / Giả định): ${exp}.`;
  }

  const sh = shuffleGrammarOptions(correct, wrongs, seed);
  return { qIdx, q, options: sh.options, answer: sh.answer, explain };
}

function getActiveGrammarQuestions(catId) {
  if (!Array.isArray(state.grammarActiveIds) || state.grammarActiveIds.length !== 30 || state.grammarActiveIds._cat !== catId) {
    const setNo = Math.max(1, Math.min(120, Number(state.grammarSetNo) || 1));
    const start = (setNo - 1) * 30;
    const ids = Array.from({ length: 30 }, (_, i) => start + i);
    ids._cat = catId;
    state.grammarActiveIds = ids;
  }
  return state.grammarActiveIds.map(qi => generateGrammarQuestion(catId, qi));
}

function selectGrammarStructure(catId, setNo = 1) {
  state.grammarId = catId;
  state.grammarSetNo = Math.max(1, Math.min(120, Number(setNo) || 1));
  state.grammarActiveIds = null;
  state.grammarAnswers = {};
  state.grammarGraded = false;
  render();
}

function drawFresh30Grammar(catId) {
  const doneSet = new Set(state.grammarDoneIds[catId] || []);
  const fresh = [];
  for (let i = 0; i < 3600 && fresh.length < 30; i++) {
    if (!doneSet.has(i)) fresh.push(i);
  }
  if (fresh.length < 30) {
    notify('🏆 Bạn đã hoàn thành trọn bộ 3.600 câu của dạng kiến thức này! Hệ thống xoay vòng bộ mới.');
    for (let i = 0; i < 30 && fresh.length < 30; i++) fresh.push(i);
  }
  fresh._cat = catId;
  state.grammarActiveIds = fresh;
  state.grammarAnswers = {};
  state.grammarGraded = false;
  notify(`🎲 Đã rút 30 câu mới hoàn toàn chưa từng làm từ kho 3.600 câu (${catId.toUpperCase()})!`);
  render();
}

function gradeGrammarLesson() {
  if (!checkAndConsumeQuota('grammar', 1)) return;
  const gr = GRAMMAR_LESSONS.find(g => g.id === state.grammarId) || GRAMMAR_LESSONS[0];
  const qs = getActiveGrammarQuestions(gr.id);
  let correctCount = 0;
  qs.forEach((ex, i) => {
    const val = state.grammarAnswers[`${gr.id}_${ex.qIdx}`];
    if (val !== undefined && Number(val) === ex.answer) correctCount++;
  });

  // Record all 30 attempted question indices so "Rút 30 câu mới" NEVER duplicates them!
  const prev = new Set(state.grammarDoneIds[gr.id] || []);
  qs.forEach(ex => prev.add(ex.qIdx));
  state.grammarDoneIds[gr.id] = Array.from(prev);
  saveJson('tamn_grammar_done_ids_v1', state.grammarDoneIds);

  state.grammarGraded = true;
  const pct = Math.round((correctCount / 30) * 100);
  const band = pctToIeltsBand(pct);
  if (state.currentUser && !isAdmin()) {
    state.currentUser.coins += Math.max(10, correctCount);
    state.currentUser.streak += 1;
    saveUsers();
    syncTopRankRewards();
  }
  notify(`🤖 AI chấm xong 30 câu ${gr.cefr}: IELTS Band ${band} / 9.0 (${correctCount}/30 câu đúng)!`);
  render();
}

function renderGrammar(v) {
  const cefrs = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const qStr = (state.grammarQuery || '').trim().toLowerCase();
  const filtered = GRAMMAR_LESSONS.filter(g =>
    (state.grammarCefr === 'ALL' || g.cefr === state.grammarCefr) &&
    (!qStr || (g.title + ' ' + g.summary + ' ' + g.group).toLowerCase().includes(qStr))
  );
  const gr = filtered.find(g => g.id === state.grammarId) || GRAMMAR_LESSONS.find(g => g.id === state.grammarId) || GRAMMAR_LESSONS[0];
  state.grammarId = gr.id;

  const qs = getActiveGrammarQuestions(gr.id);
  const doneCountForCat = (state.grammarDoneIds[gr.id] || []).length;
  let answeredCount = 0, correctCount = 0;
  qs.forEach(ex => {
    const val = state.grammarAnswers[`${gr.id}_${ex.qIdx}`];
    if (val !== undefined) answeredCount++;
    if (state.grammarGraded && val !== undefined && Number(val) === ex.answer) correctCount++;
  });
  const pct = state.grammarGraded ? Math.round((correctCount / 30) * 100) : 0;
  const band = pctToIeltsBand(pct);

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">📐 24 DẠNG KIẾN THỨC & CẤU TRÚC NGỮ PHÁP • 3.600+ BÀI/DẠNG (86.400 CÂU KHÔNG TRÙNG) • 30 CÂU/LẦN</span>
          <h1 class="text-xl font-black mt-1">📐 Hệ Thống Ngữ Pháp Tiếng Anh Toàn Diện (Chia Theo Cấu Trúc • Chấm IELTS)</h1>
          <p class="text-xs text-[var(--muted-foreground)]">Tổng hợp đầy đủ từ <strong>British Council LearnEnglish • Cambridge Grammar of English • Test-English A1–C2</strong>. Không chia theo chủ đề rời rạc mà chia chuẩn từng loại kiến thức & cấu trúc.</p>
        </div>
        <div class="flex flex-wrap items-center gap-1.5">
          ${examTimerBarHtml([15, 25])}
          ${quotaBadgeHtml('grammar', 'đề 30 câu')}
          <span class="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-sky-600 text-white">🎯 Thang IELTS 0.0–9.0</span>
        </div>
      </div>

      <!-- CEFR & Structure Search Filter -->
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap gap-1.5">
          ${cefrs.map(lv => `<button onclick="state.grammarCefr='${lv}';render()" class="px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${state.grammarCefr===lv?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)]'}">${lv==='ALL'?`Tất cả (${GRAMMAR_LESSONS.length} dạng)`:lv}</button>`).join('')}
        </div>
        <input id="gr-search-inp" type="text" value="${escapeHtml(state.grammarQuery)}" oninput="state.grammarQuery=this.value;render()" placeholder="🔍 Tìm cấu trúc (VD: bị động, đảo ngữ, điều kiện, quan hệ)..." class="px-3 py-1.5 rounded-xl bg-white border border-[var(--border)] text-xs w-72" />
      </div>

      <div class="grid lg:grid-cols-3 gap-4 items-start">
        <!-- Left: 24 Grammar Structures List -->
        <div data-scroll-id="gr-sidebar" class="space-y-2 max-h-[760px] overflow-y-auto pr-1">
          ${filtered.map(g => {
            const dCnt = (state.grammarDoneIds[g.id] || []).length;
            return `
              <div onclick="selectGrammarStructure('${g.id}', 1)" class="hover-box travel-card p-3 cursor-pointer border-2 ${g.id===gr.id?'border-teal-500 bg-teal-50/40':'border-[var(--border)]'}">
                <div class="flex justify-between items-center text-[10px] font-extrabold">
                  <span class="text-teal-700">${escapeHtml(g.group)}</span>
                  <span class="font-mono text-rose-700">3.600 câu</span>
                </div>
                <div class="font-bold text-xs mt-0.5">${escapeHtml(g.title)}</div>
                <div class="flex justify-between items-center text-[10px] text-[var(--muted-foreground)] mt-1">
                  <span>${escapeHtml(g.level)}</span>
                  <span class="font-mono text-emerald-700">Đã làm: ${dCnt}/3.600</span>
                </div>
              </div>`;
          }).join('')}

          ${state.adminMediaLessons.length ? `
            <div class="pt-2 space-y-2">
              <div class="text-[11px] font-extrabold uppercase text-rose-600 px-1">🎬 Video/Audio AI Dịch từ Admin</div>
              ${state.adminMediaLessons.map(m => `
                <div class="travel-card p-3 space-y-1.5 text-xs border-l-4 border-rose-500">
                  <div class="font-bold">${escapeHtml(m.title)}</div>
                  <div class="p-2 rounded-lg bg-[var(--content)] text-[11px]">${escapeHtml(m.viText)}</div>
                  <button onclick="speak('${m.viText.replace(/'/g,"\\'")}','vi-VN',0.95)" class="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold cursor-pointer">🔊 Nghe tiếng Việt</button>
                </div>`).join('')}
            </div>` : ''}
        </div>

        <!-- Right: Theory + 120 Non-Duplicate 30-Question Sets -->
        <div class="lg:col-span-2 space-y-4">
          <div class="travel-card p-5 space-y-3 text-xs">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">${escapeHtml(gr.level)} • ${escapeHtml(gr.group)}</span>
              <span class="text-[11px] font-semibold text-sky-700">📚 Nguồn: ${escapeHtml(gr.source)}</span>
            </div>
            <h2 class="text-lg font-extrabold text-slate-900">${escapeHtml(gr.title)}</h2>
            <p class="text-slate-700 leading-relaxed">${escapeHtml(gr.summary)}</p>
            <div class="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 space-y-1.5">
              <div class="font-extrabold text-teal-900">📌 Công thức & Quy tắc cốt lõi cần nhớ:</div>
              ${gr.formulas.map(f => `<div class="font-mono text-xs text-slate-800">• ${escapeHtml(f)}</div>`).join('')}
            </div>

            <!-- 120 Non-Duplicate Sets (30 Questions each = 3,600 unique questions!) -->
            <div class="p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <div class="space-y-0.5">
                <div class="font-extrabold text-slate-900">🗂️ Kho 3.600 Câu Không Trùng Lặp (120 Đề × 30 Câu/Đề)</div>
                <div class="text-[11px] text-[var(--muted-foreground)]">Tiến độ dạng này: <strong class="text-emerald-700 font-mono">${doneCountForCat} / 3.600 câu</strong> • Đang làm: <strong>30 câu</strong> (đã chọn ${answeredCount}/30)</div>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <select onchange="selectGrammarStructure('${gr.id}', Number(this.value))" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-mono font-bold text-xs">
                  ${Array.from({ length: 120 }, (_, i) => {
                    const n = i + 1;
                    return `<option value="${n}" ${state.grammarSetNo===n?'selected':''}>Đề #${n} (Câu ${(n-1)*30+1}–${n*30})</option>`;
                  }).join('')}
                </select>
                <button onclick="drawFresh30Grammar('${gr.id}')" class="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold cursor-pointer">🎲 Rút 30 câu mới chưa làm</button>
              </div>
            </div>
          </div>

          <!-- 30-Question Interactive Test Card -->
          <div class="travel-card p-5 space-y-3 text-xs">
            <div class="flex flex-wrap justify-between items-center gap-2 pb-2 border-b border-[var(--border)]">
              <h3 class="font-extrabold text-sm">✍️ Bài Làm 30 Câu (Đề #${state.grammarSetNo}/120 — Chấm IELTS Band)</h3>
              ${state.grammarGraded ? `<span class="px-3.5 py-1 rounded-full font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">🤖 IELTS Band ${band} / 9.0 (${correctCount}/30 câu đúng — ${pct}%)</span>` : `<span class="font-mono font-bold text-teal-700">Đã chọn: ${answeredCount}/30 câu</span>`}
            </div>

            <!-- Bảng điều hướng nhanh 30 câu (1 → 30) -->
            <div class="p-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] space-y-1.5">
              <div class="flex justify-between items-center text-[11px] font-bold text-slate-600">
                <span>🧭 Bản đồ 30 câu (Bấm số để nhảy tới câu):</span>
                <span class="font-mono">${answeredCount}/30 đã chọn</span>
              </div>
              <div class="grid grid-cols-10 sm:grid-cols-15 gap-1">
                ${qs.map((ex, i) => {
                  const val = state.grammarAnswers[`${gr.id}_${ex.qIdx}`];
                  let cls = 'bg-white border-[var(--border)] text-slate-600';
                  if (state.grammarGraded) {
                    cls = (val !== undefined && Number(val) === ex.answer)
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'bg-rose-500 border-rose-600 text-white';
                  } else if (val !== undefined) {
                    cls = 'bg-teal-600 border-teal-700 text-white';
                  }
                  return `<button type="button" onclick="document.getElementById('gr-q-${i}')?.scrollIntoView({behavior:'smooth',block:'nearest'})" class="q-jump-btn py-1 rounded-lg border text-[10px] font-mono font-bold cursor-pointer ${cls}">${i + 1}</button>`;
                }).join('')}
              </div>
            </div>

            <div data-scroll-id="gr-questions" class="space-y-3 max-h-[680px] overflow-y-auto pr-1">
              ${qs.map((ex, i) => {
                const key = `${gr.id}_${ex.qIdx}`;
                const val = state.grammarAnswers[key];
                return `
                  <div id="gr-q-${i}" class="p-3.5 rounded-xl bg-[var(--content)] border border-[var(--border)] space-y-2">
                    <div class="flex justify-between items-start gap-2">
                      <div class="font-bold text-slate-900"><span class="text-teal-700 font-mono mr-1">Câu ${i + 1}/30:</span> ${escapeHtml(ex.q)}</div>
                      <span class="text-[10px] font-mono text-[var(--muted-foreground)] shrink-0">ID #${ex.qIdx + 1}</span>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-1.5">
                      ${ex.options.map((opt, oi) => {
                        const picked = val !== undefined && Number(val) === oi;
                        let st = 'bg-white border-[var(--border)] hover:border-teal-400';
                        if (state.grammarGraded) {
                          if (oi === ex.answer) st = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                          else if (picked) st = 'bg-rose-100 border-rose-500 text-rose-800';
                        } else if (picked) st = 'bg-teal-50 border-teal-500 text-teal-900 font-bold';
                        return `<button onclick="state.grammarAnswers['${key}']=${oi};render()" class="text-left px-3 py-2 rounded-lg border cursor-pointer ${st}">${String.fromCharCode(65 + oi)}. ${escapeHtml(opt)}</button>`;
                      }).join('')}
                    </div>
                    ${state.grammarGraded ? `<div class="p-2 rounded-lg bg-white border border-teal-200 text-teal-900">🤖 <strong>AI giải thích:</strong> ${escapeHtml(ex.explain)}</div>` : ''}
                  </div>`;
              }).join('')}
            </div>

            <div class="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-[var(--border)]">
              <div class="flex gap-2">
                <button onclick="state.grammarAnswers={};state.grammarGraded=false;render()" class="px-3.5 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)] font-bold cursor-pointer">🔄 Làm lại 30 câu này</button>
                <button onclick="selectGrammarStructure('${gr.id}', Math.min(120, state.grammarSetNo + 1))" class="px-3.5 py-2 rounded-xl bg-sky-600 text-white font-bold cursor-pointer">➡️ Đề tiếp (#${Math.min(120, state.grammarSetNo + 1)})</button>
              </div>
              <button onclick="gradeGrammarLesson()" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer shadow">🤖 Nộp 30 Câu & Chấm IELTS Band</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// =========================================================================
// 8. HỌC: TỪ VỰNG MỖI NGÀY (FREE 30 TỪ/NGÀY • PRO/ULTRA KHÔNG GIỚI HẠN)
// =========================================================================
function toggleExcludeWord(word) {
  const k = String(word || '').toLowerCase();
  if (state.excludedWords[k]) { delete state.excludedWords[k]; notify(`↩ Khôi phục "${word}" vào game.`); }
  else {
    if (!checkAndConsumeQuota('vocab', 1)) return;
    state.excludedWords[k] = true;
    notify(`✓ Đã học xong "${word}" (+1 vào tiến độ hôm nay)!`);
  }
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
          <p class="text-xs text-[var(--muted-foreground)]">Gói Thường tối đa <strong>30 từ/ngày</strong> • Gói Pro & Ultra <strong>không giới hạn từ vựng</strong>.</p>
        </div>
        <div class="flex items-center gap-2">
          ${quotaBadgeHtml('vocab', 'từ vựng')}
          <button onclick="go('roadmaps')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">🧭 283 chủ đề →</button>
        </div>
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
// 9. LỘ TRÌNH CEFR (283 CHỦ ĐỀ • FREE KHÔNG HỌC VƯỢT + 30 TỪ/NGÀY)
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
  const canSkip = getPlanLimits().canSkipRoadmap || isAdmin();
  const maxUnlocked = canSkip ? topic.parts : ((doneMap[slug] || 0) + 1);
  if (!canSkip && p > maxUnlocked) {
    notify(`🔒 Gói Thường học theo lộ trình, không thể học vượt! Hoàn thành Phần ${maxUnlocked} trước hoặc nâng gói Pro/Ultra.`);
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
  if (!state.currentUser) { notify('🔐 Hãy tạo tài khoản thật để lưu tiến độ học!'); openAuth('register'); return; }
  if (!checkAndConsumeQuota('vocab', 25)) return;
  const topic = ATLAS_TOPICS.find(t => t.slug === slug);
  if (!topic) return;
  if (!state.currentUser.completedAtlasParts) state.currentUser.completedAtlasParts = {};
  state.currentUser.completedAtlasParts[slug] = Math.max(state.currentUser.completedAtlasParts[slug] || 0, partNo);
  if (!isAdmin()) {
    state.currentUser.streak = (state.currentUser.streak || 0) + 1;
    state.currentUser.coins = (state.currentUser.coins || 0) + 30;
    state.currentUser.grindPts = (state.currentUser.grindPts || 0) + 50;
    state.currentUser.updatedAt = Date.now();
    saveUsers(); pushSingleUserToCloud(state.currentUser);
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
  notify(`✅ Đã hoàn thành Phần ${partNo} (25 từ, +30 xu)!`);
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
            <div class="flex flex-wrap items-center gap-2">
              ${quotaBadgeHtml('vocab', 'từ vựng')}
              <button onclick="completeAtlasPart('${topic.slug}',${p})" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">${isDone?'✓ Đã xong phần này':'✅ Hoàn thành Phần '+p}</button>
              <button onclick="finishWholeRoadmap('${topic.slug}')" class="px-4 py-2 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:linear-gradient(135deg,#d97706,#ea580c);">🏆 Nhận Chứng Chỉ</button>
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
      const canSkip = getPlanLimits().canSkipRoadmap || isAdmin();
      const maxUnlocked = canSkip ? topic.parts : (doneCnt + 1);
      const pct = Math.min(100, Math.round((doneCnt / Math.max(1, topic.parts)) * 100));
      const partsHtml = [];
      for (let p = 1; p <= topic.parts; p++) {
        const done = doneCnt >= p;
        const locked = !canSkip && p > maxUnlocked;
        partsHtml.push(`
          <div onclick="openAtlasPartView('${topic.slug}',${p})" class="hover-box travel-card p-3.5 cursor-pointer space-y-1 text-xs ${locked?'opacity-55':''}" style="--tile-c:${topic.color};">
            <div class="flex justify-between items-center">
              <strong class="text-sm">Phần ${p}</strong>
              <span class="px-2 py-0.5 rounded-full font-bold ${done?'bg-emerald-100 text-emerald-700':locked?'bg-slate-200 text-slate-600':'bg-[var(--content)] text-teal-700'}">${done?'✓ Đã xong':locked?'🔒 Khóa':'25 từ'}</span>
            </div>
            <div class="text-[var(--muted-foreground)]">${locked?'Học xong phần trước hoặc nâng Pro/Ultra để mở':'Bấm để học 25 từ vựng →'}</div>
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
  const rq = (state.roadmapQuery || '').trim().toLowerCase();
  const list = ATLAS_TOPICS.filter(t =>
    t.track === curTab.id &&
    (state.cefrFilter === 'ALL' || t.cefr === state.cefrFilter) &&
    (!rq || (t.name + ' ' + t.desc + ' ' + t.cefr).toLowerCase().includes(rq))
  );
  const rmPerPage = 18;
  const rmTotalPages = Math.max(1, Math.ceil(list.length / rmPerPage));
  state.roadmapPage = Math.max(1, Math.min(rmTotalPages, state.roadmapPage || 1));
  const rmPageList = list.slice((state.roadmapPage - 1) * rmPerPage, state.roadmapPage * rmPerPage);

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h1 class="text-xl font-black">🧭 Bản Đồ Lộ Trình CEFR (Đầy Đủ 283 Chủ Đề)</h1>
          <p class="text-xs text-[var(--muted-foreground)]">Gói Thường học đúng thứ tự (30 từ/ngày) • Gói Pro & Ultra được học vượt không giới hạn từ • Hoàn thành nhận Chứng chỉ!</p>
        </div>
        ${quotaBadgeHtml('vocab', 'từ vựng')}
      </div>
      <div class="flex flex-wrap gap-2">
        ${tabs.map(tb => `<button onclick="state.progTab='${tb.id}';state.cefrFilter='ALL';state.roadmapPage=1;render()" class="px-3.5 py-2 rounded-full text-xs font-bold cursor-pointer border ${tb.id===curTab.id?'bg-[var(--primary)] text-white border-transparent':'bg-white border-[var(--border)]'}">${tb.label}</button>`).join('')}
      </div>
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div class="flex flex-wrap gap-1.5">
          ${curTab.cefrs.map(lv => `<button onclick="state.cefrFilter='${lv}';state.roadmapPage=1;render()" class="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer border ${state.cefrFilter===lv?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)]'}">${lv==='ALL'?'Tất cả':lv}</button>`).join('')}
        </div>
        <input id="rm-search-inp" type="text" value="${escapeHtml(state.roadmapQuery)}" oninput="state.roadmapQuery=this.value;state.roadmapPage=1;render()" placeholder="🔍 Tìm trong ${list.length} chủ đề ${curTab.id}..." class="px-3 py-1.5 rounded-xl bg-white border border-[var(--border)] text-xs w-64" />
      </div>
      <div class="flex justify-between items-center text-xs text-[var(--muted-foreground)]">
        <span>Hiển thị <strong>${rmPageList.length}</strong> / <strong>${list.length}</strong> chủ đề (Trang ${state.roadmapPage}/${rmTotalPages})</span>
        <div class="flex gap-1.5">
          <button onclick="state.roadmapPage=Math.max(1,state.roadmapPage-1);render()" ${state.roadmapPage<=1?'disabled':''} class="px-3 py-1 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">← Trang trước</button>
          <button onclick="state.roadmapPage=Math.min(${rmTotalPages},state.roadmapPage+1);render()" ${state.roadmapPage>=rmTotalPages?'disabled':''} class="px-3 py-1 rounded-lg bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Trang sau →</button>
        </div>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${rmPageList.map(t => {
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
// 10. KHÓA HỌC & TIẾN ĐỘ + KIỂM TRA TUẦN
// =========================================================================
function toggleCourseLessonDone(courseSlug, lessonId) {
  if (!state.currentUser) { notify('🔐 Hãy tạo tài khoản thật để lưu tiến độ khóa học!'); openAuth('register'); return; }
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
            <div class="w-full h-2.5 rounded-full bg-white/25 overflow-hidden"><div style="width:${pct}%;height:100%;background:#fde047;"></div></div>
          </div>
          <div class="travel-card p-5 space-y-2.5">
            <div class="divide-y divide-[var(--border)]">
              ${c.lessons.map((l, idx) => {
                const isDone = Boolean(doneLessons[`${c.slug}_${l.id}`]);
                return `
                  <div class="py-3 flex flex-wrap justify-between items-center gap-2 text-xs">
                    <div class="flex items-center gap-3">
                      <span class="w-7 h-7 rounded-full inline-flex items-center justify-center font-extrabold ${isDone?'bg-emerald-500 text-white':'bg-[var(--content)] text-slate-600'}">${isDone?'✓':(idx+1)}</span>
                      <div><div class="font-bold text-sm ${isDone?'text-emerald-700':''}">${l.title}</div><div class="text-[var(--muted-foreground)]">${l.summary}</div></div>
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
        <p class="text-xs text-[var(--muted-foreground)]">Hiển thị chi tiết phần đã học, lộ trình từng bước và % hoàn thành.</p>
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
                <div class="flex justify-between font-bold"><span class="text-slate-600">Đã học: ${doneCnt}/${c.lessons.length}</span><span class="text-teal-700">${pct}%</span></div>
                <div class="h-2 rounded-full bg-[var(--content)] overflow-hidden"><div style="width:${pct}%;height:100%;background:#0d9488;"></div></div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

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
      state.currentUser.coins += 50; state.currentUser.streak += 1;
      saveUsers(); syncTopRankRewards();
      notify(`🎉 Đạt ${wq.score}/8! Đã hoàn thành bài kiểm tra bắt buộc tuần ${getCurrentWeekKey()}.`);
    }
  }
  render();
}

function renderWeeklyQuiz(v) {
  const wk = getCurrentWeekKey();
  const canSkip = getPlanLimits().canSkipWeekly || isAdmin();
  const done = state.currentUser && state.currentUser.weeklyQuizDone === wk;
  initWeeklyQuiz(false);
  const wq = state.weeklyQuiz;
  const cur = wq.questions[wq.idx];

  v.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-4">
      <div class="boarding-pass p-5 text-white" style="background:linear-gradient(135deg,${done||canSkip?'#059669,#0f766e':'#dc2626,#b45309'});">
        <div class="text-xs font-extrabold uppercase opacity-90">TUẦN ${wk} • ${canSkip ? 'GÓI ULTRA ĐƯỢC BỎ QUA' : 'BẮT BUỘC VỚI GÓI THƯỜNG & PRO'}</div>
        <h1 class="text-xl font-black mt-1">📝 Kiểm Tra Ôn Từ Vựng Hàng Tuần (8 Câu — AI Chấm)</h1>
      </div>
      ${wq.finished ? `
        <div class="travel-card p-6 text-center space-y-3">
          <div class="text-4xl">${wq.score>=5?'🏆🎉':'💪📚'}</div>
          <h2 class="text-xl font-black">🤖 IELTS Band ${pctToIeltsBand(Math.round((wq.score/8)*100))} / 9.0 (${wq.score}/8 câu đúng)</h2>
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
// 11. KHÔI PHỤC TOÀN BỘ 8 GAME KINH ĐIỂN (SILKSONG, BẮN BIA, SHADOW FIGHT, OFFLINE, NỐI TỪ, NGHE CHỌN, VIỆT→ANH, GÕ SẮC MÀU)
// =========================================================================
function getLearnedWordsList() {
  const doneParts = getUserCompletedParts();
  const out = [];
  Object.entries(doneParts).forEach(([slug, maxPart]) => {
    const t = ATLAS_TOPICS.find(x => x.slug === slug);
    if (!t) return;
    for (let p = 1; p <= Math.min(maxPart, 4); p++) out.push(...getAtlasPartWords(t, p));
  });
  return out.length >= 4 ? out : ALL_CURRICULUM_WORDS;
}
function getPersonalWordsList() {
  const pw = (state.currentUser && state.currentUser.personalWords) || [];
  return pw.length ? pw : ALL_CURRICULUM_WORDS;
}
function addUserGamePts(pts) {
  const add = Number(pts) || 0;
  if (state.currentUser && !isAdmin() && add > 0) {
    state.currentUser.grindPts = (state.currentUser.grindPts || 0) + add;
    state.currentUser.coins = (state.currentUser.coins || 0) + Math.max(2, Math.round(add / 3));
    saveUsers();
    syncTopRankRewards();
  }
}
function getRawSourceWords(srcKey) {
  const k = srcKey || state.gameSourceKey;
  if (k === 'learned') return getLearnedWordsList();
  if (k === 'myvocab') return getPersonalWordsList();
  for (const p of PROGRAMS) {
    const found = p.topics.find(t => t.id === k);
    if (found) return found.words;
  }
  if (String(k).startsWith('atlas:')) {
    const parts = String(k).split(':');
    const at = ATLAS_TOPICS.find(x => x.slug === parts[1]);
    if (at) return getAtlasPartWords(at, Number(parts[2]) || 1);
  }
  return getLearnedWordsList();
}
function getActiveGameWords() {
  const raw = getRawSourceWords(state.gameSourceKey);
  if (!state.excludeMemorized) return raw;
  const filtered = raw.filter(w => !state.excludedWords[String(w.word || '').toLowerCase()]);
  return filtered.length >= 2 ? filtered : raw;
}
function getActiveGameTitle() {
  if (state.gameSourceKey === 'learned') return `Toàn bộ từ đã học (${getLearnedWordsList().length} từ)`;
  if (state.gameSourceKey === 'myvocab') return `Từ vựng của bản thân (${getPersonalWordsList().length} từ)`;
  for (const p of PROGRAMS) {
    const found = p.topics.find(t => t.id === state.gameSourceKey);
    if (found) return found.name;
  }
  if (String(state.gameSourceKey).startsWith('atlas:')) {
    const parts = String(state.gameSourceKey).split(':');
    const at = ATLAS_TOPICS.find(x => x.slug === parts[1]);
    if (at) return `${at.name} — Phần ${parts[2] || 1} (25 từ)`;
  }
  return 'Kho từ vựng luyện game';
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
            <h1 class="text-xl font-extrabold mt-1">Kho 8 Game Luyện Từ Vựng Kinh Điển</h1>
          </div>

          <div class="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 space-y-3.5" style="border-left:4px solid #0d9488;">
            <div class="flex flex-wrap gap-2 pb-3 border-b border-[var(--border)]">
              <button onclick="state.gmMode='roadmap';syncGmSource();render()" class="px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${state.gmMode==='roadmap'?'bg-[var(--primary)] text-[var(--primary-foreground)]':'bg-[var(--content)] border border-[var(--border)]'}">🎯 Chọn Lộ trình → Chủ đề → Từng phần (25 từ)</button>
              <button onclick="state.gmMode='learned';state.gameSourceKey='learned';render()" class="px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${state.gmMode==='learned'?'bg-[var(--primary)] text-[var(--primary-foreground)]':'bg-[var(--content)] border border-[var(--border)]'}">✅ Toàn bộ từ đã học (${getLearnedWordsList().length} từ)</button>
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
                <button onclick="state.gameSourceKey='learned';render()" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${state.gameSourceKey==='learned'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">✅ Toàn bộ từ đã học (${getLearnedWordsList().length} từ)</button>
                <button onclick="state.gameSourceKey='myvocab';render()" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${state.gameSourceKey==='myvocab'?'bg-[var(--primary)] text-[var(--primary-foreground)] border-transparent':'bg-[var(--content)] border-[var(--border)]'}">📒 Từ vựng của bản thân (${getPersonalWordsList().length} từ)</button>
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
            addUserGamePts(25);
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
            const pts = (bull ? 100 : 60) * ar.combo; ar.score += pts; addUserGamePts(20);
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
          if (b.dataset.ok==='1') { sf.combo++; sf.pAtk=1; sf.eHp=Math.max(0,sf.eHp-22); sf.energy=Math.min(100,sf.energy+35); addUserGamePts(20); if(sf.combo>=2) triggerStreakFx(sf.combo,'Shadow Fight Combo!'); }
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
          if (ok) { oq.combo++; oq.score += pts * oq.combo; addUserGamePts(pts); if (oq.score > state.offlineBest) { state.offlineBest = oq.score; localStorage.setItem('tvmn_preview_oq_best', String(oq.score)); } if (oq.combo>=2) triggerStreakFx(oq.combo, `Offline ${lbl} +${pts*oq.combo} PTS!`); else notify(`✓ Vượt ải ${lbl}!`); }
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
            matched.add(selL); selL = null; combo++; addUserGamePts(10);
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
          if (b.dataset.ok==='1') { combo++; addUserGamePts(15); if(combo>=2) triggerStreakFx(combo,`Nghe chuẩn: "${w.word}"!`); else notify(`✓ Chính xác: "${w.word}" = ${w.meaning}`); }
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
          if (b.dataset.ok==='1') { combo++; addUserGamePts(15); if(combo>=2) triggerStreakFx(combo,`Phản xạ Việt→Anh siêu nhanh!`); else notify(`✓ Chính xác: "${w.word}"!`); }
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
    

// =========================================================================
// 12. ÂM NHẠC TRỰC TUYẾN ĐA NGUỒN (TÌM BÀI HÁT BẤT KỲ TRÊN YOUTUBE + APPLE MUSIC + RADIO 24/7 + TẢI NHẠC MÁY + LỜI BÀI HÁT TỰ ĐỘNG)
// =========================================================================
function getGlobalAudioEl() {
  const el = document.getElementById('global-music-audio');
  if (el && !el._tamnBound) {
    el._tamnBound = true;
    el.addEventListener('ended', () => musicNext());
    el.addEventListener('play', () => { state.music.playing = true; updateMusicMiniStatus(); });
    el.addEventListener('pause', () => {
      if (state.music.engine === 'audio') { state.music.playing = false; updateMusicMiniStatus(); }
    });
  }
  return el;
}

function ensureYouTubeApiLoaded(onReadyCb) {
  if (state.music.ytPlayer && state.music.ytReady) { if (onReadyCb) onReadyCb(); return; }
  window._pendingYtPlay = onReadyCb;
  if (window.YT && window.YT.Player) { createHiddenYtPlayer(); return; }
  const prevReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (prevReady) try { prevReady(); } catch {}
    createHiddenYtPlayer();
  };
  if (!document.getElementById('yt-iframe-api-script')) {
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api-script';
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  }
}

function createHiddenYtPlayer() {
  if (state.music.ytPlayer || !window.YT || !window.YT.Player) return;
  const cur = state.music.currentTrack || state.music.playlist[state.music.idx] || MUSIC_CATALOG[0];
  const vidId = cur.youtubeId || cur.id || 'jfKfPfyJRdk';
  state.music.ytPlayer = new YT.Player('yt-audio-player', {
    height: '1',
    width: '1',
    videoId: vidId,
    playerVars: { autoplay: 0, controls: 0, modestbranding: 1, playsinline: 1 },
    events: {
      onReady: (ev) => {
        state.music.ytReady = true;
        try { ev.target.setVolume(state.music.volume); } catch {}
        if (window._pendingYtPlay) {
          const fn = window._pendingYtPlay;
          window._pendingYtPlay = null;
          fn();
        }
      },
      onStateChange: (ev) => {
        if (state.music.engine !== 'youtube') return;
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
  const bar = document.getElementById('mini-music-bar');
  if (!bar) return;
  const cur = state.music.currentTrack || state.music.playlist[state.music.idx];
  if (cur && (state.music.playing || bar._keepVisible)) {
    bar._keepVisible = state.music.playing;
    bar.classList.remove('hidden');
    const tEl = document.getElementById('mini-music-title');
    const aEl = document.getElementById('mini-music-artist');
    const pBtn = document.getElementById('mini-music-play-btn');
    if (tEl) tEl.textContent = cur.title || 'Đang phát nhạc';
    if (aEl) aEl.textContent = `${cur.artist || 'Âm Nhạc'} • ${state.music.engine === 'audio' ? 'Audio Trực tiếp' : 'YouTube'}`;
    if (pBtn) pBtn.textContent = state.music.playing ? '⏸' : '▶';
  } else {
    bar.classList.add('hidden');
  }
}

function musicStopAll() {
  const aud = getGlobalAudioEl();
  if (aud) { try { aud.pause(); aud.currentTime = 0; } catch {} }
  if (state.music.ytPlayer && state.music.ytReady) {
    try { state.music.ytPlayer.pauseVideo(); } catch {}
  }
  state.music.playing = false;
  const bar = document.getElementById('mini-music-bar');
  if (bar) { bar._keepVisible = false; bar.classList.add('hidden'); }
  updateMusicMiniStatus();
  if (state.nav === 'music') render();
}

function extractYoutubeId(input) {
  const s = (input || '').trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function fmtDurationMmSs(sec) {
  const n = Math.max(0, Math.floor(Number(sec) || 0));
  if (!n) return 'LIVE';
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const s = String(n % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

async function fetchLyricsForTrack(title, artist) {
  const cleanTitle = String(title || '').replace(/\(.*?\)|\[.*?\]|official|music video|mv|lyric|lyrics|audio|hd|4k/gi, '').trim();
  const cleanArtist = String(artist || '').replace(/vevo|official|topic/gi, '').trim();
  if (!cleanTitle || cleanTitle.length < 2) return;
  state.music.lyricsLoading = true;
  if (state.nav === 'music') render();
  try {
    const q = encodeURIComponent(`${cleanTitle} ${cleanArtist}`.trim());
    const ctrl = new AbortController();
    const tm = setTimeout(() => ctrl.abort(), 4500);
    const res = await fetch(`https://lrclib.net/api/search?q=${q}`, { signal: ctrl.signal });
    clearTimeout(tm);
    if (res.ok) {
      const arr = await res.json();
      const hit = Array.isArray(arr) ? arr.find(x => x && x.plainLyrics) : null;
      if (hit && hit.plainLyrics) {
        const lines = hit.plainLyrics
          .split(/\n+/)
          .map(l => l.trim())
          .filter(Boolean)
          .slice(0, 28)
          .map(en => ({ en, vi: simpleEnToViTranslate(en) }));
        state.music.fetchedLyrics = lines;
        state.music.lyricsLoading = false;
        if (state.nav === 'music') render();
        return;
      }
    }
  } catch {}
  state.music.fetchedLyrics = [];
  state.music.lyricsLoading = false;
  if (state.nav === 'music') render();
}

function musicPlayTrackObj(track, saveToLibrary = true) {
  if (!track) return;
  const normalized = {
    id: track.id || ('trk-' + Date.now()),
    youtubeId: track.youtubeId || (!track.streamUrl && extractYoutubeId(track.id) ? track.id : ''),
    streamUrl: track.streamUrl || '',
    source: track.source || (track.streamUrl ? 'itunes' : 'youtube'),
    title: track.title || 'Bài hát trực tuyến',
    artist: track.artist || 'Nghệ sĩ',
    thumb: track.thumb || (track.youtubeId || extractYoutubeId(track.id) ? `https://i.ytimg.com/vi/${track.youtubeId || track.id}/hqdefault.jpg` : ''),
    duration: track.duration || 'Audio',
    lyrics: track.lyrics || null
  };

  if (saveToLibrary && !normalized.streamUrl?.startsWith('blob:')) {
    const existIdx = state.music.playlist.findIndex(x => x.id === normalized.id);
    if (existIdx === -1) {
      state.music.playlist.unshift(normalized);
      const saved = loadJson('tamn_music_custom_v1', []);
      if (!saved.some(s => s.id === normalized.id)) {
        saved.unshift(normalized);
        saveJson('tamn_music_custom_v1', saved.slice(0, 50));
      }
      state.music.idx = 0;
    } else {
      state.music.idx = existIdx;
    }
  }

  state.music.currentTrack = normalized;
  state.music.playing = true;
  state.music.fetchedLyrics = [];
  const aud = getGlobalAudioEl();

  if (normalized.streamUrl) {
    // Phát trực tiếp qua HTML5 Audio (chạy nền mượt mà kể cả khi chuyển sang học Từ vựng / Đọc / Ngữ pháp!)
    state.music.engine = 'audio';
    if (state.music.ytPlayer && state.music.ytReady) {
      try { state.music.ytPlayer.pauseVideo(); } catch {}
    }
    if (aud) {
      aud.src = normalized.streamUrl;
      aud.volume = Math.max(0, Math.min(1, (state.music.volume || 75) / 100));
      aud.play().catch(() => {
        notify('🔊 Bấm nút ▶ Phát một lần để trình duyệt mở âm thanh!');
      });
    }
    state.music.aiReply = `🎧 Đang phát trực tiếp: "${normalized.title}" — ${normalized.artist}`;
  } else {
    // Phát qua YouTube (Video hoặc Chỉ âm thanh chạy nền)
    state.music.engine = 'youtube';
    if (aud) { try { aud.pause(); } catch {} }
    const ytId = normalized.youtubeId || extractYoutubeId(normalized.id);
    if (state.music.viewMode === 'audio_only' || state.nav !== 'music') {
      ensureYouTubeApiLoaded(() => {
        try {
          state.music.ytPlayer.loadVideoById(ytId);
          state.music.ytPlayer.setVolume(state.music.volume);
        } catch {}
      });
    } else if (state.music.ytPlayer && state.music.ytReady) {
      try { state.music.ytPlayer.pauseVideo(); } catch {}
    }
    state.music.aiReply = `🎬 Đang phát YouTube: "${normalized.title}" — ${normalized.artist}`;
  }

  updateMusicMiniStatus();
  saveLearningProgressNow();
  if (state.nav === 'music') render();
  if (!normalized.lyrics || normalized.lyrics.length <= 1) {
    fetchLyricsForTrack(normalized.title, normalized.artist);
  }
}

function musicPlayIndex(idx) {
  const list = state.music.playlist;
  if (!list.length) return;
  state.music.idx = ((idx % list.length) + list.length) % list.length;
  musicPlayTrackObj(list[state.music.idx], false);
}

function musicPlaySearchResult(idx) {
  const item = (state.music.searchResults || [])[idx];
  if (!item) return;
  musicPlayTrackObj(item, true);
}

function musicSwitchViewMode(mode) {
  state.music.viewMode = mode; // 'video' | 'audio_only'
  const cur = state.music.currentTrack || state.music.playlist[state.music.idx] || MUSIC_CATALOG[0];
  if (state.music.engine === 'youtube' && state.music.playing && cur) {
    const ytId = cur.youtubeId || extractYoutubeId(cur.id);
    if (mode === 'audio_only') {
      ensureYouTubeApiLoaded(() => {
        try { state.music.ytPlayer.loadVideoById(ytId); state.music.ytPlayer.setVolume(state.music.volume); } catch {}
      });
    } else if (state.music.ytPlayer && state.music.ytReady) {
      try { state.music.ytPlayer.pauseVideo(); } catch {}
    }
  }
  saveLearningProgressNow();
  render();
}

function musicTogglePlay() {
  const cur = state.music.currentTrack || state.music.playlist[state.music.idx] || MUSIC_CATALOG[0];
  if (!state.music.currentTrack && cur) state.music.currentTrack = cur;

  if (state.music.engine === 'audio' || (cur && cur.streamUrl)) {
    const aud = getGlobalAudioEl();
    if (!aud) return;
    if (!aud.src && cur.streamUrl) aud.src = cur.streamUrl;
    if (state.music.playing && !aud.paused) {
      aud.pause();
      state.music.playing = false;
    } else {
      aud.volume = Math.max(0, Math.min(1, (state.music.volume || 75) / 100));
      aud.play().catch(() => {});
      state.music.playing = true;
    }
    updateMusicMiniStatus();
    if (state.nav === 'music') render();
    return;
  }

  // Engine YouTube
  if (state.nav === 'music' && state.music.viewMode === 'video') {
    state.music.playing = !state.music.playing;
    updateMusicMiniStatus();
    render();
    return;
  }
  ensureYouTubeApiLoaded(() => {
    try {
      const ytId = cur.youtubeId || extractYoutubeId(cur.id);
      if (state.music.playing) {
        state.music.ytPlayer.pauseVideo();
        state.music.playing = false;
      } else {
        if (state.music.ytPlayer.getVideoData && state.music.ytPlayer.getVideoData().video_id !== ytId) {
          state.music.ytPlayer.loadVideoById(ytId);
        } else {
          state.music.ytPlayer.playVideo();
        }
        state.music.ytPlayer.setVolume(state.music.volume);
        state.music.playing = true;
      }
      updateMusicMiniStatus();
      if (state.nav === 'music') render();
    } catch {
      musicPlayTrackObj(cur, false);
    }
  });
}

function musicNext() { musicPlayIndex(state.music.idx + 1); }
function musicPrev() { musicPlayIndex(state.music.idx - 1); }

function musicSetVolume(val) {
  state.music.volume = Number(val);
  const aud = getGlobalAudioEl();
  if (aud) aud.volume = Math.max(0, Math.min(1, state.music.volume / 100));
  if (state.music.ytPlayer && state.music.ytReady) {
    try { state.music.ytPlayer.setVolume(state.music.volume); } catch {}
  }
  const lbl = document.getElementById('music-vol-lbl');
  if (lbl) lbl.textContent = state.music.volume + '%';
  scheduleProgressSave();
}

function toggleMusicFav(id) {
  const i = state.music.favorites.indexOf(id);
  if (i >= 0) { state.music.favorites.splice(i, 1); notify('💔 Đã bỏ khỏi danh sách Yêu thích.'); }
  else { state.music.favorites.unshift(id); notify('❤️ Đã lưu bài hát vào Yêu thích!'); }
  saveJson('tamn_music_favs_v1', state.music.favorites);
  render();
}

function uploadLocalMusicFile(input) {
  const f = input?.files?.[0];
  if (!f) return;
  try {
    const url = URL.createObjectURL(f);
    const trk = {
      id: 'local-' + Date.now(),
      streamUrl: url,
      source: 'local',
      title: f.name.replace(/\.[^.]+$/, ''),
      artist: 'Nhạc từ thiết bị của bạn',
      duration: 'MP3/Audio',
      thumb: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80'
    };
    notify(`🎵 Đang phát file nhạc "${trk.title}" từ máy của bạn!`);
    musicPlayTrackObj(trk, false);
  } catch {
    notify('⚠️ Không thể mở file âm thanh này.');
  }
}

// =========================================================================
// TÌM KIẾM NHẠC TRỰC TUYẾN THẬT 100% (YOUTUBE MV + APPLE ITUNES + RADIO 24/7)
// Không bao giờ ép phát bài có sẵn khi người dùng tìm bài mới!
// =========================================================================
async function searchYoutubePipedTracks(q) {
  const mirrors = [
    `https://api.piped.private.coffee/search?q=${encodeURIComponent(q)}&filter=videos`,
    `https://pipedapi.drgns.space/search?q=${encodeURIComponent(q)}&filter=videos`
  ];
  for (const url of mirrors) {
    try {
      const ctrl = new AbortController();
      const tm = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(tm);
      if (!res.ok) continue;
      const data = await res.json();
      const items = Array.isArray(data?.items) ? data.items : (Array.isArray(data) ? data : []);
      const out = items.slice(0, 12).map(it => {
        const vidId = it.videoId || extractYoutubeId(it.url || '');
        if (!vidId) return null;
        return {
          id: vidId,
          youtubeId: vidId,
          streamUrl: '',
          source: 'youtube',
          title: it.title || 'YouTube Music Video',
          artist: it.uploaderName || it.author || 'YouTube',
          duration: fmtDurationMmSs(it.duration),
          thumb: it.thumbnail || `https://i.ytimg.com/vi/${vidId}/hqdefault.jpg`
        };
      }).filter(Boolean);
      if (out.length) return out;
    } catch {}
  }
  return [];
}

async function searchItunesAudioTracks(q) {
  try {
    const ctrl = new AbortController();
    const tm = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=16`, { signal: ctrl.signal });
    clearTimeout(tm);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).filter(r => r && r.previewUrl).map(r => ({
      id: 'it-' + r.trackId,
      youtubeId: '',
      streamUrl: r.previewUrl,
      source: 'itunes',
      title: r.trackName || 'Bài hát',
      artist: r.artistName || 'Nghệ sĩ',
      duration: fmtDurationMmSs(Math.round((r.trackTimeMillis || 30000) / 1000)),
      thumb: (r.artworkUrl100 || '').replace('100x100bb', '300x300bb')
    }));
  } catch {
    return [];
  }
}

async function searchRadioLiveStations(q) {
  try {
    const ctrl = new AbortController();
    const tm = setTimeout(() => ctrl.abort(), 4500);
    const res = await fetch(`https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(q)}&limit=8&hidebroken=true&order=clickcount&reverse=true`, { signal: ctrl.signal });
    clearTimeout(tm);
    if (!res.ok) return [];
    const arr = await res.json();
    return (Array.isArray(arr) ? arr : []).filter(s => s && s.url_resolved && s.url_resolved.startsWith('https://')).map(s => ({
      id: 'rad-' + (s.stationuuid || Math.random()),
      youtubeId: '',
      streamUrl: s.url_resolved,
      source: 'radio',
      title: s.name || 'Radio 24/7',
      artist: `${s.country || 'Quốc tế'} • Radio Trực Tuyến 24/7`,
      duration: 'LIVE 24/7',
      thumb: s.favicon || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80'
    }));
  } catch {
    return [];
  }
}

let _musicLiveTimer = null;
function onMusicSearchInput(val) {
  state.music.searchQuery = val;
  clearTimeout(_musicLiveTimer);
  const trimmed = (val || '').trim();
  if (trimmed.length >= 3 && !extractYoutubeId(trimmed)) {
    _musicLiveTimer = setTimeout(() => runOnlineMusicSearch(trimmed, false), 480);
  }
}

async function runOnlineMusicSearch(rawQuery, autoPlayFirst = false) {
  const q = (rawQuery !== undefined ? rawQuery : state.music.searchQuery || '').trim();
  if (!q) {
    notify('🔍 Hãy nhập tên bài hát, ca sĩ hoặc dán link YouTube!');
    return;
  }
  state.music.searchQuery = q;

  // Nếu người dùng dán trực tiếp Link hoặc ID YouTube -> Phát ngay video đó!
  const directYt = extractYoutubeId(q);
  if (directYt) {
    const directTrack = {
      id: directYt,
      youtubeId: directYt,
      source: 'youtube',
      title: `YouTube Music (${directYt})`,
      artist: 'Link YouTube trực tiếp',
      duration: 'YouTube',
      thumb: `https://i.ytimg.com/vi/${directYt}/hqdefault.jpg`
    };
    musicPlayTrackObj(directTrack, true);
    return;
  }

  state.music.liveLoading = true;
  state.music.tab = 'search';
  state.music.aiReply = `🔎 Đang tìm "${q}" trên YouTube, Kho Nhạc Quốc Tế/V-Pop & Đài Radio 24/7...`;
  if (state.nav === 'music') render();

  const srcFilter = state.music.searchSource || 'all';
  const [ytHits, itHits, radHits] = await Promise.all([
    (srcFilter === 'all' || srcFilter === 'youtube') ? searchYoutubePipedTracks(q) : Promise.resolve([]),
    (srcFilter === 'all' || srcFilter === 'itunes') ? searchItunesAudioTracks(q) : Promise.resolve([]),
    (srcFilter === 'all' || srcFilter === 'radio') ? searchRadioLiveStations(q) : Promise.resolve([])
  ]);

  // Interleave YouTube full videos + iTunes crisp audio + Radio 24/7
  const combined = [];
  const maxLen = Math.max(ytHits.length, itHits.length, radHits.length);
  for (let i = 0; i < maxLen; i++) {
    if (ytHits[i]) combined.push(ytHits[i]);
    if (itHits[i]) combined.push(itHits[i]);
    if (radHits[i]) combined.push(radHits[i]);
  }

  state.music.searchResults = combined;
  state.music.liveLoading = false;

  if (combined.length) {
    state.music.aiReply = `✅ Tìm thấy ${combined.length} bài hát trực tuyến cho "${q}" — bấm vào bài bất kỳ để phát ngay!`;
    if (autoPlayFirst) {
      musicPlayTrackObj(combined[0], true);
      return;
    }
  } else {
    state.music.aiReply = `⚠️ Không tìm thấy kết quả cho "${q}". Hãy thử gõ tên bài hát/ca sĩ khác hoặc dán link YouTube!`;
  }
  if (state.nav === 'music') render();
}

function musicAiSearch(e) {
  e.preventDefault();
  const q = (document.getElementById('music-search-inp')?.value || state.music.searchQuery || '').trim();
  runOnlineMusicSearch(q, false);
}

function translateMusicLyricsAi(e) {
  e.preventDefault();
  const raw = (document.getElementById('music-lyric-inp')?.value || '').trim();
  if (!raw) return;
  const lines = raw.split(/\n+/).map(l => l.trim()).filter(Boolean);
  state.music.customLyricVi = lines.map(en => `<div class="py-1.5 border-b border-teal-100"><div class="font-bold text-slate-900">🎵 ${escapeHtml(en)}</div><div class="text-teal-700">🇻🇳 ${escapeHtml(simpleEnToViTranslate(en))}</div></div>`).join('');
  notify('🤖 AI đã dịch nghĩa lời bài hát sang Tiếng Việt!');
  render();
}

function renderMusic(v) {
  const cur = state.music.currentTrack || state.music.playlist[state.music.idx] || MUSIC_CATALOG[0];
  const isFav = state.music.favorites.includes(cur.id);
  const ytId = cur.youtubeId || (!cur.streamUrl ? extractYoutubeId(cur.id) : '');
  const activeLyrics = (state.music.fetchedLyrics && state.music.fetchedLyrics.length)
    ? state.music.fetchedLyrics
    : (cur.lyrics || [{ en: 'Search any English or Vietnamese song above to stream music and view bilingual lyrics.', vi: 'Gõ tìm bất kỳ bài hát tiếng Anh hoặc tiếng Việt nào ở ô trên để phát nhạc và xem lời dịch song ngữ.' }]);

  const iframeSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1${state.music.playing ? '&autoplay=1' : ''}`
    : '';

  const sourceBadgeHtml = (src) => {
    if (src === 'youtube') return '<span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold">🎬 YouTube Full</span>';
    if (src === 'itunes') return '<span class="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-extrabold">🎧 Audio Nhanh</span>';
    if (src === 'radio') return '<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">📻 Radio 24/7</span>';
    if (src === 'local') return '<span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold">📂 File Máy</span>';
    return '<span class="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-extrabold">🎵 Chọn lọc</span>';
  };

  const libraryList = state.music.tab === 'fav'
    ? state.music.playlist.filter(t => state.music.favorites.includes(t.id))
    : state.music.playlist;

  v.innerHTML = `
    <div class="max-w-5xl mx-auto space-y-5">
      <!-- TRẠM ÂM NHẠC TRỰC TUYẾN ĐA NGUỒN + CHẠY NỀN KHI HỌC -->
      <div class="rounded-3xl overflow-hidden border-2 border-teal-500 shadow-2xl bg-slate-950">
        <!-- Thanh tiêu đề Âm Nhạc -->
        <div class="px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-white" style="background:linear-gradient(90deg,#0f172a,#0f766e,#0284c7);">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-base">🎵</span>
            <div>
              <div class="font-black text-sm sm:text-base tracking-tight flex items-center gap-2">
                <span>Âm Nhạc Trực Tuyến & Học Qua Bài Hát</span>
                <span class="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black">ĐA NGUỒN LIVE</span>
              </div>
              <div class="text-[11px] text-teal-100">Tìm mọi bài hát V-Pop • US-UK • K-Pop • Lofi • Radio 24/7 • Chạy nền xuyên suốt khi học</div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
            <button onclick="musicSwitchViewMode('video')" class="px-2.5 py-1 rounded-xl font-extrabold cursor-pointer ${state.music.viewMode==='video'?'bg-white text-teal-900':'bg-white/15 text-white'}">📺 Hiện MV / Bìa Đĩa</button>
            <button onclick="musicSwitchViewMode('audio_only')" class="px-2.5 py-1 rounded-xl font-extrabold cursor-pointer ${state.music.viewMode==='audio_only'?'bg-white text-teal-900':'bg-white/15 text-white'}">🎧 Chế Độ Nghe Nền</button>
            <label class="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold cursor-pointer">
              📂 Mở MP3/MP4 máy
              <input type="file" accept="audio/*,video/*" onchange="uploadLocalMusicFile(this)" class="hidden" />
            </label>
          </div>
        </div>

        <!-- Ô Tìm Kiếm Nhạc Thật Trực Tuyến -->
        <div class="p-3.5 bg-slate-900 border-b border-slate-800 space-y-2.5">
          <form onsubmit="musicAiSearch(event)" class="flex flex-wrap gap-2">
            <input id="music-search-inp" type="text" autocomplete="off"
              value="${escapeHtml(state.music.searchQuery)}"
              oninput="onMusicSearchInput(this.value)"
              placeholder="🔍 Nhập tên bài hát, ca sĩ bất kỳ (VD: Sơn Tùng, Đen Vâu, Taylor Swift, Ed Sheeran, Adele, Lofi...) hoặc dán link YouTube..."
              class="flex-1 min-w-60 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold border-2 border-teal-400 focus:outline-none focus:border-amber-400" />
            <select onchange="state.music.searchSource=this.value;if(state.music.searchQuery.trim())runOnlineMusicSearch(state.music.searchQuery,false)"
              class="px-3 py-2.5 rounded-xl bg-slate-800 text-teal-200 border border-slate-700 text-xs font-bold cursor-pointer">
              <option value="all" ${state.music.searchSource==='all'?'selected':''}>🌐 Tất cả nguồn</option>
              <option value="youtube" ${state.music.searchSource==='youtube'?'selected':''}>🎬 YouTube Full MV</option>
              <option value="itunes" ${state.music.searchSource==='itunes'?'selected':''}>🎧 Kho Nhạc Audio</option>
              <option value="radio" ${state.music.searchSource==='radio'?'selected':''}>📻 Đài Radio 24/7</option>
            </select>
            <button type="submit" class="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-black cursor-pointer">
              ${state.music.liveLoading ? '⏳ Đang tìm...' : '🔎 Tìm Bài Hát'}
            </button>
          </form>

          <!-- Từ khóa gợi ý tìm thật 1 chạm -->
          <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span class="text-slate-400 font-bold">Gợi ý tìm nhanh:</span>
            ${['Taylor Swift', 'Ed Sheeran', 'Adele', 'Charlie Puth', 'Sơn Tùng M-TP', 'Đen Vâu', 'HIEUTHUHAI', 'Lofi Girl', 'Piano Rain', 'BBC Radio'].map(kw => `
              <button type="button" onclick="runOnlineMusicSearch('${kw.replace(/'/g, "\\'")}', false)"
                class="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-teal-700 text-teal-200 font-bold cursor-pointer transition">🎵 ${escapeHtml(kw)}</button>`).join('')}
          </div>
        </div>

        <!-- Màn hình Trình Phát Chính (HTML5 Audio Stream hoặc YouTube MV) -->
        ${cur.streamUrl || state.music.viewMode === 'audio_only' ? `
          <div class="p-6 text-white flex flex-wrap justify-between items-center gap-5" style="background:linear-gradient(135deg,#020617 0%,#0f766e 60%,#0369a1 100%);">
            <div class="flex items-center gap-4 min-w-0">
              <img src="${cur.thumb || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80'}" alt=""
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-teal-300/50 shadow-xl shrink-0" />
              <div class="space-y-1 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5">
                  ${sourceBadgeHtml(cur.source)}
                  <span class="text-[11px] text-teal-200 font-bold">• Chạy nền mượt khi chuyển sang học bài khác</span>
                </div>
                <div class="text-lg sm:text-xl font-black truncate">${escapeHtml(cur.title)}</div>
                <div class="text-xs text-teal-100/90 truncate">${escapeHtml(cur.artist)} • ${escapeHtml(cur.duration || 'Audio')}</div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2.5">
              <button onclick="musicPrev()" title="Bài trước" class="px-3 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 font-bold text-xs cursor-pointer">⏮️</button>
              <button onclick="musicTogglePlay()" class="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer shadow-lg">
                ${state.music.playing ? '⏸️ Tạm dừng' : '▶️ Phát ngay'}
              </button>
              <button onclick="musicNext()" title="Bài tiếp" class="px-3 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 font-bold text-xs cursor-pointer">⏭️</button>
              <button onclick="toggleMusicFav('${cur.id}')" class="px-3 py-2.5 rounded-xl font-bold text-xs cursor-pointer ${isFav ? 'bg-rose-600 text-white' : 'bg-white/15 text-white'}">${isFav ? '❤️' : '🤍'}</button>
              <div class="flex items-center gap-1.5 bg-slate-950/50 px-3 py-2 rounded-xl">
                <span class="text-xs">🔉</span>
                <input type="range" min="0" max="100" value="${state.music.volume}" oninput="musicSetVolume(this.value)" class="w-24 accent-amber-400 cursor-pointer" />
                <span id="music-vol-lbl" class="font-mono text-[11px] font-bold">${state.music.volume}%</span>
              </div>
            </div>
          </div>
        ` : `
          <div class="aspect-video max-h-[420px] w-full bg-black relative">
            ${iframeSrc ? `
              <iframe id="music-yt-iframe" class="w-full h-full" src="${iframeSrc}" title="Trình phát Âm Nhạc YouTube" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            ` : `<div class="w-full h-full flex items-center justify-center text-slate-400 text-xs">Chọn bài hát bên dưới để bắt đầu phát</div>`}
          </div>
          <div class="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-white">
            <div class="flex items-center gap-2 min-w-0">
              <button onclick="musicPrev()" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">⏮️</button>
              <button onclick="musicNext()" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">⏭️</button>
              <span class="font-bold truncate text-teal-200">${escapeHtml(cur.title)} — ${escapeHtml(cur.artist)}</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="musicSwitchViewMode('audio_only')" class="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] cursor-pointer">🎧 Vừa học vừa nghe nền</button>
              <button onclick="toggleMusicFav('${cur.id}')" class="px-3 py-1.5 rounded-lg font-bold cursor-pointer ${isFav ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200'}">${isFav ? '❤️ Đã thích' : '🤍 Thích'}</button>
            </div>
          </div>
        `}

        <div class="px-4 py-2 bg-slate-950 text-teal-300 text-xs flex flex-wrap justify-between items-center gap-2 border-t border-slate-800">
          <span>${escapeHtml(state.music.aiReply)}</span>
          <span class="font-mono text-[11px] text-slate-400">Tổng thư viện: ${state.music.playlist.length} bài</span>
        </div>
      </div>

      <!-- DANH SÁCH KẾT QUẢ TÌM KIẾM TRỰC TUYẾN / KHO NHẠC / YÊU THÍCH -->
      <div class="travel-card p-5 space-y-3.5 text-xs">
        <div class="flex flex-wrap justify-between items-center gap-2">
          <div class="flex flex-wrap gap-2">
            <button onclick="state.music.tab='search';render()" class="px-3.5 py-2 rounded-full font-extrabold cursor-pointer ${state.music.tab==='search'?'bg-teal-600 text-white shadow':'bg-[var(--content)] text-slate-700'}">
              🔎 Kết quả tìm trực tuyến (${(state.music.searchResults || []).length})
            </button>
            <button onclick="state.music.tab='all';render()" class="px-3.5 py-2 rounded-full font-extrabold cursor-pointer ${state.music.tab==='all'?'bg-[var(--primary)] text-white shadow':'bg-[var(--content)] text-slate-700'}">
              🎵 Kho Nhạc & Đã Nghe (${state.music.playlist.length})
            </button>
            <button onclick="state.music.tab='fav';render()" class="px-3.5 py-2 rounded-full font-extrabold cursor-pointer ${state.music.tab==='fav'?'bg-rose-600 text-white shadow':'bg-[var(--content)] text-slate-700'}">
              ❤️ Yêu thích (${state.music.favorites.length})
            </button>
          </div>
          <span class="text-[11px] text-[var(--muted-foreground)]">Bấm vào bài bất kỳ để phát ngay — tự động lưu vào Kho Nhạc của bạn</span>
        </div>

        ${state.music.tab === 'search' ? `
          ${state.music.liveLoading ? `
            <div class="py-10 text-center text-teal-700 font-bold animate-pulse">🔎 Đang tìm bài hát trực tuyến trên YouTube, Apple Music & Radio 24/7...</div>
          ` : (state.music.searchResults && state.music.searchResults.length) ? `
            <div class="grid sm:grid-cols-2 gap-2.5 max-h-[440px] overflow-y-auto pr-1" data-scroll-id="music-search-list">
              ${state.music.searchResults.map((r, ri) => {
                const isPlayingThis = cur && cur.id === r.id;
                const fav = state.music.favorites.includes(r.id);
                return `
                  <div class="p-2.5 rounded-2xl border flex items-center justify-between gap-2.5 transition ${isPlayingThis ? 'bg-teal-50 border-teal-500 shadow-sm' : 'bg-[var(--content)] border-[var(--border)] hover:border-teal-400'}">
                    <div onclick="musicPlaySearchResult(${ri})" class="cursor-pointer flex items-center gap-3 flex-1 min-w-0">
                      <img src="${r.thumb || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80'}" alt="" class="w-14 h-11 rounded-xl object-cover bg-slate-200 shrink-0" />
                      <div class="min-w-0 space-y-0.5">
                        <div class="font-extrabold text-xs text-slate-900 truncate">${isPlayingThis ? '🔊 ' : ''}${escapeHtml(r.title)}</div>
                        <div class="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                          ${sourceBadgeHtml(r.source)}
                          <span class="truncate">${escapeHtml(r.artist)} • ${escapeHtml(r.duration)}</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                      <button onclick="musicPlaySearchResult(${ri})" class="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">${isPlayingThis ? 'Đang phát' : '▶ Phát'}</button>
                      <button onclick="toggleMusicFav('${r.id}')" class="px-2 py-1.5 rounded-xl bg-white border border-[var(--border)] cursor-pointer">${fav ? '❤️' : '🤍'}</button>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          ` : `
            <div class="py-8 text-center text-slate-500 space-y-2">
              <div class="text-2xl">🎧</div>
              <div class="font-bold text-slate-700">Gõ tên bài hát hoặc ca sĩ bất kỳ vào thanh tìm kiếm phía trên</div>
              <div class="text-[11px]">Hỗ trợ tìm hàng triệu bài hát Việt Nam, US-UK, K-Pop, Lofi, Piano, Đài Radio tiếng Anh 24/7 hoặc dán link YouTube.</div>
            </div>
          `}
        ` : `
          <div class="grid sm:grid-cols-2 gap-2.5 max-h-96 overflow-y-auto pr-1" data-scroll-id="music-lib-list">
            ${libraryList.length ? libraryList.map(t => {
              const realIdx = state.music.playlist.findIndex(x => x.id === t.id);
              const active = cur && cur.id === t.id;
              const fav = state.music.favorites.includes(t.id);
              const thumbUrl = t.thumb || `https://i.ytimg.com/vi/${t.youtubeId || t.id}/default.jpg`;
              return `
                <div class="p-2.5 rounded-2xl border flex items-center justify-between gap-2 ${active ? 'bg-emerald-50 border-emerald-500' : 'bg-[var(--content)] border-[var(--border)] hover:border-teal-400'}">
                  <div onclick="musicPlayIndex(${realIdx})" class="cursor-pointer flex items-center gap-2.5 flex-1 min-w-0">
                    <img src="${thumbUrl}" alt="" class="w-12 h-10 rounded-xl object-cover bg-slate-200 shrink-0" />
                    <div class="min-w-0">
                      <div class="font-bold text-xs truncate ${active ? 'text-emerald-800' : ''}">${active ? '🔊 ' : ''}${escapeHtml(t.title)}</div>
                      <div class="text-[10px] text-[var(--muted-foreground)] truncate">${escapeHtml(t.artist)} • ${escapeHtml(t.duration || 'Audio')}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <button onclick="musicPlayIndex(${realIdx})" class="px-2.5 py-1 rounded-xl bg-[var(--primary)] text-white font-bold cursor-pointer">${active ? 'Đang phát' : '▶'}</button>
                    <button onclick="toggleMusicFav('${t.id}')" class="px-2 py-1 rounded-xl bg-white border border-[var(--border)] cursor-pointer">${fav ? '❤️' : '🤍'}</button>
                  </div>
                </div>`;
            }).join('') : `<div class="col-span-2 py-6 text-center text-[var(--muted-foreground)]">Chưa có bài hát yêu thích nào.</div>`}
          </div>
        `}
      </div>

      <!-- LỜI BÀI HÁT TỰ ĐỘNG LRCLIB + AI DỊCH SONG NGỮ ANH - VIỆT -->
      <div class="travel-card p-5 space-y-3 text-xs">
        <div class="flex flex-wrap justify-between items-center gap-2">
          <div>
            <div class="font-extrabold text-sm text-sky-900">🎤 Lời Bài Hát Tự Động & AI Dịch Song Ngữ (Anh ↔ Việt)</div>
            <div class="text-[11px] text-slate-500">Tự động dò lời bài hát khi phát nhạc • Hỗ trợ dán lời bất kỳ để dịch từng câu</div>
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="fetchLyricsForTrack('${(cur.title||'').replace(/'/g,"\\'")}','${(cur.artist||'').replace(/'/g,"\\'")}')" class="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 font-bold cursor-pointer">🔄 Tải lời bài này</button>
            <button onclick="state.music.showAiLyrics=!state.music.showAiLyrics;render()" class="px-3 py-1.5 rounded-xl bg-[var(--content)] font-bold cursor-pointer">${state.music.showAiLyrics ? 'Ẩn lời' : 'Hiện lời'}</button>
          </div>
        </div>

        ${state.music.lyricsLoading ? `<div class="p-3 rounded-xl bg-sky-50 text-sky-800 font-bold">⏳ Đang tự động tìm lời bài hát "${escapeHtml(cur.title)}"...</div>` : ''}

        ${state.music.showAiLyrics ? `
          <div class="space-y-2 p-3.5 rounded-2xl bg-teal-50/50 border border-teal-200 max-h-72 overflow-y-auto">
            ${activeLyrics.map(l => `
              <div class="space-y-0.5 py-1 border-b border-teal-100/80 last:border-0">
                <div class="font-bold text-slate-900">🎵 ${escapeHtml(l.en)}</div>
                ${l.vi && l.vi !== l.en ? `<div class="text-teal-700">🇻🇳 ${escapeHtml(l.vi)}</div>` : ''}
              </div>`).join('')}
          </div>` : ''}

        <form onsubmit="translateMusicLyricsAi(event)" class="space-y-2 pt-2 border-t border-[var(--border)]">
          <textarea id="music-lyric-inp" rows="2" placeholder="Dán lời bài hát tiếng Anh bất kỳ vào đây để AI dịch nghĩa từng câu sang tiếng Việt..." class="w-full p-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)]"></textarea>
          <button type="submit" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold cursor-pointer">🤖 AI Dịch Nghĩa Lời Bài Hát</button>
        </form>
        ${state.music.customLyricVi ? `<div class="p-3 rounded-xl bg-white border border-teal-200 max-h-64 overflow-y-auto">${state.music.customLyricVi}</div>` : ''}
      </div>
    </div>`;
}


// =========================================================================
// 13. GIAO LƯU 1-1 NGẪU NHIÊN (CHỈ ULTRA) & ĐỐI KHÁNG 1V1 & XẾP HẠNG
// =========================================================================
function matchRandomLoungePartner() {
  const pool = state.users.filter(u => u.status === 'active' && (!state.currentUser || u.id !== state.currentUser.id));
  if (!pool.length) { state.loungePartner = null; notify('⏳ Chưa có học viên thật thứ 2 để ghép ngẫu nhiên 1-1.'); render(); return; }
  const picked = pool[Math.floor(Math.random() * pool.length)];
  state.loungePartner = picked;
  state.loungeMsgs = [{ from: picked.name, text: 'Chào bạn! Hệ thống vừa ghép ngẫu nhiên 1-1 hai tụi mình!' }];
  notify(`🎲 Đã ghép ngẫu nhiên 1-1 (2/2 người) với ${picked.name}!`);
  render();
}

async function setLoungeMedia(wantVid, wantAud) {
  if (!navigator.mediaDevices?.getUserMedia) { notify('⚠️ Trình duyệt chặn Cam/Mic (hãy chạy qua HTTPS).'); return; }
  if (!wantVid && !wantAud) {
    if (state.localStream) { state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} }); state.localStream = null; }
    state.loungeCamOn = false; state.loungeMicOn = false; render(); return;
  }
  try {
    if (state.localStream) state.localStream.getTracks().forEach(t => { try { t.stop(); } catch {} });
    const stream = await navigator.mediaDevices.getUserMedia({ video: wantVid, audio: wantAud });
    state.localStream = stream;
    state.loungeCamOn = wantVid && stream.getVideoTracks().length > 0;
    state.loungeMicOn = wantAud && stream.getAudioTracks().length > 0;
    state.deviceCamOk = state.loungeCamOn || state.deviceCamOk;
    state.deviceMicOk = state.loungeMicOn || state.deviceMicOk;
    render();
    const vid = document.getElementById('lg-v');
    if (vid && state.loungeCamOn) { vid.srcObject = stream; vid.classList.remove('hidden'); }
    notify('✅ Đã bật Camera & Micro!');
  } catch { notify('⚠️ Hãy cấp quyền Camera/Micro trên trình duyệt!'); }
}

function sendLoungeMsg(e) {
  e.preventDefault();
  const inp = document.getElementById('lg-msg-inp');
  const txt = (inp?.value || '').trim();
  if (!txt) return;
  state.loungeMsgs.push({ from: state.currentUser ? state.currentUser.name : 'Bạn', text: txt, me: true });
  inp.value = ''; render();
}

function renderLounge(v) {
  if (!getPlanLimits().canLoungeCamMic && !isAdmin()) {
    v.innerHTML = `
      <div class="max-w-xl mx-auto travel-card p-8 text-center space-y-4 border-2 border-sky-500">
        <div class="text-4xl">💎🎥🔒</div>
        <h1 class="text-xl font-black">Giao Lưu Cam & Mic 1-1 (Chỉ Dành Cho Gói Ultra)</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Gói Thường & Pro không có quyền Giao lưu Cam/Mic. Hãy liên hệ <strong>Admin</strong> nâng lên <strong>Gói Ultra</strong> để mở khóa!</p>
        <div class="flex justify-center gap-2">
          <button onclick="go('leaderboard')" class="px-4 py-2 rounded-xl bg-amber-400 text-slate-900 text-xs font-extrabold cursor-pointer">🏆 Đua Top 1–3</button>
          <button onclick="go('pricing')" class="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-extrabold cursor-pointer">💎 Tạo mã VietQR Ultra</button>
        </div>
      </div>`;
    return;
  }

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full text-white bg-rose-600">🎲 GHÉP NGẪU NHIÊN 1-1 • TỐI ĐA 2 NGƯỜI</span>
          <h1 class="text-xl font-black mt-1">🎥 Phòng Giao Lưu Cam & Mic (Ultra)</h1>
        </div>
        <div class="flex flex-wrap gap-1.5 text-xs">
          <button onclick="matchRandomLoungePartner()" class="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-900 font-extrabold cursor-pointer">🎲 Ghép ngẫu nhiên</button>
          <button onclick="setLoungeMedia(true,true)" class="px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white font-bold cursor-pointer">🎥 Bật Cam & Mic</button>
          <button onclick="setLoungeMedia(false,false)" class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer">⏹️ Tắt</button>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="rounded-2xl overflow-hidden bg-slate-900 text-white min-h-56 flex flex-col items-center justify-center border-2 border-teal-500">
          <video id="lg-v" autoplay muted playsinline class="w-full h-56 object-cover mirror-vid ${state.loungeCamOn?'':'hidden'}"></video>
          <div class="${state.loungeCamOn?'hidden':''} p-5 text-center space-y-2 text-xs">
            ${avatarHtml(state.currentUser, 54)}
            <div class="font-bold">${state.currentUser ? state.currentUser.name : 'Bạn'} (1/2)</div>
          </div>
        </div>
        <div class="rounded-2xl p-5 text-white min-h-56 flex flex-col justify-between" style="background:linear-gradient(135deg,#0f172a,#0f766e);">
          ${state.loungePartner ? `<div class="flex items-center gap-3">${avatarHtml(state.loungePartner, 48)}<div><div class="font-bold text-sm">${nameWithBadge(state.loungePartner)}</div><div class="text-xs text-teal-200">Người 2/2 (Ghép ngẫu nhiên)</div></div></div>` : `<div class="my-auto text-center text-xs opacity-80">Bấm "🎲 Ghép ngẫu nhiên" để kết nối 1 học viên thật khác.</div>`}
        </div>
      </div>
      <div class="travel-card p-4 space-y-2 text-xs">
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
  if (!info.isDay1) { notify(`🔒 Chỉ được ghép trận mới vào ngày 01 hằng tháng (${info.nextDateStr}).`); return; }
  const pool = state.users.filter(u => u.status === 'active' && (!state.currentUser || u.id !== state.currentUser.id));
  if (!pool.length) { notify('⏳ Chưa có tài khoản học viên thật thứ 2 để ghép trận 1v1.'); return; }
  state.duelOpponent = pool[Math.floor(Math.random() * pool.length)];
  notify(`⚔️ Đã ghép đối thủ ngày 01: ${state.duelOpponent.name}!`);
  render();
}

function renderDuel(v) {
  const info = getDuelDayInfo();
  const me = state.currentUser, op = state.duelOpponent;
  v.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-4">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span class="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">📅 CHỈ GHÉP TRẬN MỚI NGÀY 01 HẰNG THÁNG</span>
          <h1 class="text-xl font-black mt-1">⚔️ Đối Kháng 1 vs 1</h1>
        </div>
        <div class="flex gap-2 text-xs">
          <button onclick="matchDuelDay1()" ${info.isDay1?'':'disabled'} class="px-4 py-2 rounded-xl text-white font-extrabold cursor-pointer disabled:opacity-45" style="background:${info.isDay1?'#059669':'#64748b'};">${info.isDay1?'🎲 Ghép Ngay':`🔒 Mở ${info.nextDateStr} (${info.diffDays} ngày)`}</button>
          <button onclick="state.duelSimulateDay1=!state.duelSimulateDay1;render()" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer">${state.duelSimulateDay1?'📅 Về ngày thật':'🧪 Test Ngày 01'}</button>
        </div>
      </div>
      <div class="travel-card p-6 grid md:grid-cols-3 gap-4 items-center text-center">
        <div class="p-4 rounded-2xl bg-[var(--content)] border-2 border-teal-500 flex flex-col items-center gap-1.5">${avatarHtml(me, 52)}<div class="font-bold text-sm">${me ? nameWithBadge(me) : 'Chưa đăng nhập'}</div><div class="text-lg font-mono font-black text-teal-700">${me?(me.grindPts||0):0} đ</div></div>
        <div class="flex flex-col items-center"><div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-amber-200 border-2 border-amber-400" style="background:linear-gradient(135deg,#0f172a,#ea580c);">VS</div></div>
        <div class="p-4 rounded-2xl bg-[var(--content)] border border-[var(--border)] flex flex-col items-center gap-1.5">${op?`${avatarHtml(op,52)}<div class="font-bold text-sm">${nameWithBadge(op)}</div><div class="text-lg font-mono font-black text-orange-600">${op.grindPts||0} đ</div>`:`<div class="text-3xl">⏳</div><div class="text-xs text-[var(--muted-foreground)]">Chờ ghép ngày 01</div>`}</div>
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
        <h1 class="text-xl font-black">🏆 Bảng Xếp Hạng Học Viên Thật (Top 1–3 Nhận Huy Hiệu Vàng / Bạc / Đồng)</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Top 1, 2, 3 nhận huy hiệu Vàng / Bạc / Đồng. Tài khoản mới luôn là Gói Thường — chỉ Admin mới có quyền cấp gói Pro/Ultra!</p>
      </div>
      ${!top.length ? `
        <div class="travel-card p-10 text-center space-y-3">
          <div class="text-4xl">🌱🏆</div>
          <h2 class="text-base font-extrabold">Chưa có học viên thật nào đăng ký</h2>
          <button onclick="openAuth('register')" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">✨ Tạo tài khoản thật ngay</button>
        </div>` : `
        <div class="grid md:grid-cols-3 gap-4 items-end">
          ${r2 ? `<div class="travel-card rank2-frame p-5 flex flex-col items-center text-center gap-2"><span class="badge-silver text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥈 TOP 2</span>${avatarHtml(r2,52)}<div class="font-bold text-sm">${nameWithBadge(r2)}</div><div class="text-xs font-mono">🔥 ${r2.streak} • 🪙 ${r2.coins}</div></div>` : '<div></div>'}
          ${r1 ? `<div class="rank1-frame rounded-2xl p-6 flex flex-col items-center text-center gap-2"><div class="text-2xl">👑</div><span class="badge-gold text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥇 TOP 1</span>${avatarHtml(r1,60)}<div class="font-extrabold text-base">${nameWithBadge(r1)}</div><div class="text-xs font-mono text-amber-300">🔥 ${r1.streak} • 🪙 ${r1.coins}</div></div>` : ''}
          ${r3 ? `<div class="travel-card rank3-frame p-5 flex flex-col items-center text-center gap-2"><span class="badge-bronze text-xs font-extrabold px-2.5 py-0.5 rounded-full">🥉 TOP 3</span>${avatarHtml(r3,52)}<div class="font-bold text-sm">${nameWithBadge(r3)}</div><div class="text-xs font-mono">🔥 ${r3.streak} • 🪙 ${r3.coins}</div></div>` : '<div></div>'}
        </div>
        ${rest.length ? `<div class="travel-card divide-y divide-[var(--border)]">${rest.map((u, i) => `<div class="px-4 py-3 flex justify-between items-center text-xs"><div class="flex items-center gap-3"><span class="font-mono font-bold w-6">#${i+4}</span>${avatarHtml(u,28)}<strong>${escapeHtml(u.name)}</strong></div><div class="font-mono">🔥 ${u.streak} • 🪙 ${u.coins}</div></div>`).join('')}</div>` : ''}`}
    </div>`;
}

// =========================================================================
// 14. NÂNG GÓI & HIỂN THỊ ĐẦY ĐỦ MÃ CHUYỂN TIỀN VIETQR (VPBANK 0779176786)
// =========================================================================
function createQrOrder(tier, months) {
  if (!state.currentUser) {
    notify('🔐 Hãy tạo tài khoản hoặc đăng nhập để lấy Mã ID riêng tạo mã VietQR!');
    openAuth('register');
    return;
  }
  const amt = PLAN_PRICES[tier][months];
  const memo = state.currentUser.accountCode;
  const code = 'ORD-' + Date.now().toString(36).toUpperCase().slice(-6);
  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankCode}-${BANK_INFO.stk}-compact2.png?amount=${amt}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(BANK_INFO.owner)}`;
  const ord = { code, tier, months, amount: amt, memo, qrUrl, status: 'pending', userName: state.currentUser.name, time: new Date().toLocaleTimeString('vi-VN') };
  state.activeOrder = ord;
  state.orders.unshift(ord);
  saveJson('tamn_orders_v1', state.orders);
  pushOrderToCloud(ord);
  notify(`💳 Đã tạo mã VietQR VPBank (${fmtVnd(amt)}) • Nội dung CK: ${memo}`);
  render();
}

function confirmQrOrder(code) {
  const ord = state.orders.find(o => o.code === code) || state.activeOrder;
  if (!ord) return;
  ord.status = 'waiting_approval';
  saveJson('tamn_orders_v1', state.orders);
  pushOrderToCloud(ord);
  notify(`📨 Đã gửi yêu cầu duyệt đơn ${ord.code}! Nhắn Zalo 0779176786 kèm Mã ID ${ord.memo} để Admin cấp gói ngay.`);
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
  for (let r = 0; r < cells; r++) for (let c = 0; c < cells; c++) {
    if ((r<8&&c<8)||(r<8&&c>=cells-8)||(r>=cells-8&&c<8)) continue;
    h = Math.imul(h ^ (r * 31 + c * 17), 16777619);
    if ((h >>> 0) % 2 === 0) ctx.fillRect(pad + c * cell, pad + r * cell, cell, cell);
  }
}

function renderPricing(v) {
  const m = state.billingMonths;
  const pPrice = PLAN_PRICES.pro[m];
  const uPrice = PLAN_PRICES.ultra[m];
  const durs = [{m:1,l:'1 tháng'},{m:3,l:'3 tháng'},{m:6,l:'6 tháng'},{m:12,l:'1 năm'}];
  const ord = state.activeOrder;
  const myId = state.currentUser ? state.currentUser.accountCode : 'CHƯA ĐĂNG NHẬP';

  v.innerHTML = `
    <div class="space-y-4">
      <div class="flex flex-wrap justify-between items-start gap-3">
        <div>
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">💳 VIETQR • VPBANK • ADMIN CẤP GÓI QUA MÃ ID</span>
          <h1 class="text-xl font-black mt-1">👑 Nâng Gói Pro & Ultra (Hiển Thị Mã Chuyển Tiền VietQR)</h1>
          <p class="text-xs text-[var(--muted-foreground)]">VPBank • STK <strong>0779176786</strong> • <strong>TRAN VAN HUNG</strong> • Nội dung CK là Mã ID tài khoản của bạn.</p>
        </div>
        <div class="travel-card px-4 py-2.5 text-xs space-y-1 border-teal-500">
          <div class="text-[var(--muted-foreground)]">MÃ ID TÀI KHOẢN CỦA BẠN</div>
          <div class="flex items-center gap-2"><strong class="font-mono text-base text-teal-700">${myId}</strong>${state.currentUser?`<button onclick="copyText('${myId}','Đã copy ID')" class="px-2 py-0.5 rounded bg-[var(--content)] font-bold cursor-pointer">📋 Copy</button>`:`<button onclick="openAuth('register')" class="px-2 py-0.5 rounded bg-[var(--primary)] text-white font-bold cursor-pointer">Tạo acc</button>`}</div>
          <div>Gói hiện tại: <strong class="uppercase text-teal-700">${getEffectivePlan()}</strong></div>
        </div>
      </div>

      <div class="travel-card p-3 flex flex-wrap items-center justify-between gap-2">
        <span class="text-xs font-bold">Chọn thời hạn gói:</span>
        <div class="flex flex-wrap gap-1.5">
          ${durs.map(d => `<button onclick="state.billingMonths=${d.m};render()" class="px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer border ${m===d.m?'bg-[var(--primary)] text-white border-transparent':'bg-[var(--content)] border-[var(--border)]'}">${d.l}</button>`).join('')}
        </div>
      </div>

      <!-- 3 EXACT PACKAGE CARDS -->
      <div class="grid md:grid-cols-3 gap-4">
        <div class="hover-box travel-card p-5 flex flex-col gap-2.5" style="--tile-c:#64748b;">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--content)] self-start">🌱 GÓI THƯỜNG (FREE)</span>
          <div class="text-2xl font-black">0đ</div>
          <ul class="text-xs space-y-1.5 flex-1 text-slate-700">
            <li>• Chỉ được học <strong>30 từ vựng / ngày</strong></li>
            <li>• Học theo lộ trình, <strong>không thể học vượt</strong></li>
            <li>• Ngữ pháp: <strong>3 bài / ngày</strong></li>
            <li>• Luyện nói & Luyện viết: <strong>3 bài / ngày</strong></li>
            <li class="text-rose-600">• <strong>Không thể bỏ qua</strong> bài kiểm tra tuần</li>
            <li class="text-rose-600">• <strong>Không thể</strong> giao lưu Cam & Mic</li>
          </ul>
          <button disabled class="w-full py-2.5 rounded-xl bg-[var(--content)] text-xs font-bold opacity-70">${getEffectivePlan()==='free'?'✓ Gói hiện tại':'Gói cơ bản'}</button>
        </div>

        <div class="hover-box travel-card p-5 flex flex-col gap-2.5 border-2 border-amber-500" style="--tile-c:#d97706;">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full self-start bg-amber-100 text-amber-800">⚡ GÓI PRO</span>
          <div class="text-2xl font-black text-amber-700">${fmtVnd(pPrice)} <span class="text-xs font-normal text-[var(--muted-foreground)]">/ ${m===12?'1 năm':m+' tháng'}</span></div>
          <div class="text-xs px-2.5 py-1.5 rounded-xl bg-[var(--content)]">1T: <strong>15k</strong> • 3T: <strong>45k</strong> • 6T: <strong>50k</strong> • 1N: <strong>80k</strong></div>
          <ul class="text-xs space-y-1.5 flex-1 text-slate-700">
            <li>✅ <strong>Không giới hạn từ vựng</strong> mỗi ngày</li>
            <li>✅ <strong>Được học vượt</strong> mọi phần lộ trình</li>
            <li>✅ Ngữ pháp: <strong>15 bài / ngày</strong></li>
            <li>✅ Luyện nói & Luyện viết: <strong>15 bài / ngày</strong></li>
            <li class="text-amber-700">⚠️ <strong>Không thể bỏ qua</strong> bài kiểm tra tuần</li>
            <li class="text-rose-600">❌ <strong>Không thể</strong> giao lưu Cam & Mic</li>
          </ul>
          <button onclick="createQrOrder('pro',${m})" class="w-full py-2.5 rounded-xl text-xs font-extrabold cursor-pointer bg-amber-400 hover:bg-amber-300 text-slate-900">⚡ Tạo mã VietQR Pro (${fmtVnd(pPrice)})</button>
        </div>

        <div class="hover-box travel-card p-5 flex flex-col gap-2.5 border-2 border-sky-600" style="--tile-c:#0284c7;">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full text-white self-start" style="background:linear-gradient(135deg,#0284c7,#0d9488);">💎 GÓI ULTRA (FULL 100%)</span>
          <div class="text-2xl font-black text-sky-700">${fmtVnd(uPrice)} <span class="text-xs font-normal text-[var(--muted-foreground)]">/ ${m===12?'1 năm':m+' tháng'}</span></div>
          <div class="text-xs px-2.5 py-1.5 rounded-xl bg-[var(--content)]">1T: <strong>30k</strong> • 3T: <strong>70k</strong> • 6T: <strong>90k</strong> • 1N: <strong>99k</strong></div>
          <ul class="text-xs space-y-1.5 flex-1 text-slate-700">
            <li>✅ <strong>Không giới hạn từ vựng</strong> & <strong>Được học vượt</strong></li>
            <li>✅ Ngữ pháp: <strong>Không giới hạn / ngày</strong></li>
            <li>✅ Luyện nói & Luyện viết: <strong>Không giới hạn / ngày</strong></li>
            <li>✅ <strong>Được bỏ qua</strong> bài kiểm tra tuần</li>
            <li>✅ <strong>Được sử dụng Giao lưu Cam & Mic</strong></li>
          </ul>
          <button onclick="createQrOrder('ultra',${m})" class="w-full py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer" style="background:linear-gradient(135deg,#0284c7,#0d9488);">💎 Tạo mã VietQR Ultra (${fmtVnd(uPrice)})</button>
        </div>
      </div>

      <!-- FULL VIETQR PAYMENT BOX -->
      ${ord ? `
        <div class="travel-card border-2 border-[var(--primary)] p-5 space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <div>
              <span class="text-xs font-bold text-teal-700">🏦 VIETQR VPBANK • ĐƠN ${ord.code}</span>
              <h2 class="text-lg font-black">Quét Mã Chuyển Tiền Gói ${ord.tier.toUpperCase()} — ${fmtVnd(ord.amount)}</h2>
            </div>
            <a href="https://zalo.me/0779176786" target="_blank" rel="noopener" class="px-3.5 py-2 rounded-xl text-xs font-bold text-white" style="background:#0068ff;">💬 Nhắn Zalo 0779176786 gửi ID ↗</a>
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
                <div class="flex justify-between"><span>Chủ tài khoản:</span><strong>TRAN VAN HUNG</strong></div>
                <div class="flex justify-between"><span>Số tiền cần chuyển:</span><strong class="font-mono text-base text-rose-600">${fmtVnd(ord.amount)}</strong></div>
                <div class="flex justify-between items-center pt-1.5 border-t border-[var(--border)]">
                  <span>Nội dung CK (Mã ID):</span>
                  <div class="flex items-center gap-1.5">
                    <strong class="font-mono text-sm text-teal-700">${ord.memo}</strong>
                    <button onclick="copyText('${ord.memo}','Đã copy nội dung CK')" class="px-2 py-0.5 rounded bg-white border border-[var(--border)] font-bold cursor-pointer">📋</button>
                  </div>
                </div>
              </div>
              <div class="p-3 rounded-xl border text-xs" style="background:rgba(0,104,255,0.08);border-color:rgba(0,104,255,0.3);">
                🛡️ Sau khi chuyển khoản, bấm nút xác nhận bên dưới hoặc gửi biên lai + Mã ID <strong>${ord.memo}</strong> qua Zalo <strong>0779176786</strong> để Admin duyệt cấp gói ngay!
              </div>
              <button onclick="confirmQrOrder('${ord.code}')" ${ord.status!=='pending'?'disabled':''} class="w-full py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer disabled:opacity-60">
                ${ord.status==='paid' ? '✅ Admin đã duyệt & cấp gói!' : ord.status==='waiting_approval' ? `⏳ Đang chờ Admin duyệt cấp gói cho ID ${ord.memo}` : `📨 Tôi đã chuyển khoản — Gửi yêu cầu Admin cấp gói`}
              </button>
            </div>
          </div>
        </div>` : ''}
    </div>`;

  if (ord) drawFallbackQrCanvas(document.getElementById('p-qr-canvas'), `VPB|0779176786|${ord.amount}|${ord.memo}`);
}

// =========================================================================
// 15. CÀI ĐẶT (AVATAR • ĐỔI TÊN GIỮ ID • ĐIỀN EMAIL/SĐT TÙY CHỌN • ĐĂNG XUẤT)
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
    else { state.currentUser.updatedAt = Date.now(); saveUsers(); pushSingleUserToCloud(state.currentUser); }
    notify('📷 Đã cập nhật Avatar mới!');
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
  if (!isAdmin()) { state.currentUser.updatedAt = Date.now(); saveUsers(); pushSingleUserToCloud(state.currentUser); }
  notify(`✅ Đã đổi tên thành "${newName}" (ID ${state.currentUser.accountCode} giữ nguyên không đổi)!`);
  render();
}
function saveSettingsPassword(e) {
  e.preventDefault();
  if (!state.currentUser) return;
  if (isAdmin()) { notify('🛡️ Mật khẩu gốc tài khoản Admin cố định trên hệ thống.'); return; }
  const oldP = document.getElementById('st-old-pass').value;
  const newP = document.getElementById('st-new-pass').value;
  if (oldP !== state.currentUser.password && !state.currentUser.password.startsWith('social_')) { notify('❌ Mật khẩu hiện tại không đúng!'); return; }
  if (newP.length < 4) { notify('⚠️ Mật khẩu mới phải từ 4 ký tự trở lên.'); return; }
  state.currentUser.password = newP;
  state.currentUser.updatedAt = Date.now();
  saveUsers(); pushSingleUserToCloud(state.currentUser); e.target.reset();
  notify('🔐 Đã đổi mật khẩu thành công!');
}
function saveSettingsSecurity(e) {
  e.preventDefault();
  if (!state.currentUser) return;
  const gm = document.getElementById('st-gmail-inp').value.trim();
  const ph = document.getElementById('st-phone-inp').value.trim();
  state.currentUser.email = gm;
  state.currentUser.phone = ph;
  state.currentUser.gmailVerified = Boolean(gm);
  state.currentUser.phoneVerified = Boolean(ph);
  if (!isAdmin()) { state.currentUser.updatedAt = Date.now(); saveUsers(); pushSingleUserToCloud(state.currentUser); }
  notify('🛡️ Đã lưu thông tin bảo mật Gmail / SĐT (không bắt buộc)!');
  render();
}

function renderSettings(v) {
  const u = state.currentUser;
  v.innerHTML = `
    <div class="max-w-3xl mx-auto space-y-5">
      <div>
        <h1 class="text-xl font-black">⚙️ Cài Đặt Tài Khoản & Hệ Thống</h1>
        <p class="text-xs text-[var(--muted-foreground)]">Đổi avatar, đổi tên (không đổi ID), bổ sung Gmail/SĐT bảo mật (không bắt buộc), đổi mật khẩu, bật tắt âm phím & đăng xuất.</p>
      </div>
      <div class="travel-card p-5 space-y-3 text-xs">
        <div class="font-extrabold text-sm">🎛️ Âm Thanh, Hiệu Ứng & Thiết Bị</div>
        <div class="flex justify-between items-center p-3 rounded-xl bg-[var(--content)]">
          <div><div class="font-bold">🎹 Hiệu ứng âm gõ phím (mỗi phím 1 nốt nhỏ êm tai)</div></div>
          <button onclick="toggleTypingSoundSetting()" class="px-4 py-2 rounded-xl font-extrabold cursor-pointer ${state.settings.typingSound?'bg-[var(--primary)] text-white':'bg-white border border-[var(--border)]'}">${state.settings.typingSound?'🔊 Đang BẬT':'🔇 Đang TẮT'}</button>
        </div>
        <div class="flex justify-between items-center p-3 rounded-xl bg-[var(--content)]">
          <div><div class="font-bold">✨ Hiệu ứng chuyển động du lịch</div></div>
          <button onclick="toggleAnimationsSetting()" class="px-4 py-2 rounded-xl font-extrabold cursor-pointer ${state.settings.animations?'bg-[var(--primary)] text-white':'bg-white border border-[var(--border)]'}">${state.settings.animations?'✨ Đang BẬT':'⏸️ Đang TẮT'}</button>
        </div>
        <div class="flex justify-between items-center p-3 rounded-xl bg-[var(--content)]">
          <div><div class="font-bold">🎥🎙️ Quyền Camera & Micro</div><div class="text-[var(--muted-foreground)]">${state.deviceCamOk&&state.deviceMicOk?'Đã cấp quyền Cam & Mic ✓':'Bấm để bật Cam & Mic'}</div></div>
          <button onclick="openDeviceGate()" class="px-4 py-2 rounded-xl bg-sky-600 text-white font-extrabold cursor-pointer">Kiểm tra / Bật</button>
        </div>
      </div>

      ${!u ? `
        <div class="travel-card p-8 text-center space-y-3">
          <div class="text-3xl">🔐</div>
          <div class="font-extrabold text-base">Bạn chưa đăng nhập tài khoản</div>
          <button onclick="openAuth('register')" class="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-extrabold cursor-pointer">✨ Tạo Tài Khoản Ngay (Không cần SĐT/Email)</button>
        </div>` : `
        <div class="travel-card p-5 space-y-4 text-xs">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">${avatarHtml(u, 60)}<div><div class="font-extrabold text-base">${nameWithBadge(u)}</div><div class="font-mono text-teal-700 font-bold">ID Cố Định (Không đổi): ${u.accountCode} • TK: ${escapeHtml(u.username)}</div><div class="text-[11px] text-emerald-700 font-semibold">💾 Đã lưu bền vững TK, MK & ID (LocalStorage + IndexedDB) — thoát web vào lại vẫn đăng nhập được!</div></div></div>
            <label class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-bold cursor-pointer">📷 Đổi Avatar<input type="file" accept="image/*" onchange="handleSettingsAvatar(this)" class="hidden" /></label>
          </div>
          <form onsubmit="saveSettingsName(event)" class="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
            <input id="st-name-inp" type="text" required value="${escapeHtml(u.name)}" class="flex-1 px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            <button type="submit" class="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">✏️ Đổi tên (Giữ nguyên ID)</button>
          </form>
        </div>

        <form onsubmit="saveSettingsSecurity(event)" class="travel-card p-5 space-y-3 text-xs">
          <div class="font-extrabold text-sm">🛡️ Bổ Sung Gmail & Số Điện Thoại Bảo Mật <span class="text-teal-700 font-normal">(Không bắt buộc)</span></div>
          <div class="grid sm:grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="font-bold">Gmail ${u.gmailVerified?'<span class="text-emerald-600">✓ Đã thêm</span>':'<span class="text-slate-400">(Tùy chọn)</span>'}</label>
              <input id="st-gmail-inp" type="email" value="${escapeHtml(u.email || '')}" placeholder="tenban@gmail.com (không bắt buộc)" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            </div>
            <div class="space-y-1">
              <label class="font-bold">Số điện thoại ${u.phoneVerified?'<span class="text-emerald-600">✓ Đã thêm</span>':'<span class="text-slate-400">(Tùy chọn)</span>'}</label>
              <input id="st-phone-inp" type="tel" value="${escapeHtml(u.phone || '')}" placeholder="09xx xxx xxx (không bắt buộc)" class="w-full px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            </div>
          </div>
          <button type="submit" class="px-4 py-2 rounded-xl bg-sky-600 text-white font-extrabold cursor-pointer">✅ Lưu thông tin bảo mật</button>
        </form>

        <form onsubmit="saveSettingsPassword(event)" class="travel-card p-5 space-y-3 text-xs">
          <div class="font-extrabold text-sm">🔑 Đổi Mật Khẩu Tài Khoản</div>
          <div class="grid sm:grid-cols-2 gap-2">
            <input id="st-old-pass" type="password" required placeholder="Mật khẩu hiện tại" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            <input id="st-new-pass" type="password" required minlength="4" placeholder="Mật khẩu mới (tối thiểu 4 ký tự)" class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
          </div>
          <button type="submit" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">🔐 Cập nhật mật khẩu</button>
        </form>

        <div class="travel-card p-5 flex flex-wrap justify-between items-center gap-3 border-rose-200 bg-rose-50/40 text-xs">
          <div><div class="font-extrabold text-sm text-rose-700">🚪 Đăng Xuất Tài Khoản</div><div class="text-slate-600">Tiến độ học và tài khoản thật của bạn vẫn được lưu an toàn.</div></div>
          <button onclick="logoutUser()" class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold cursor-pointer">🚪 Đăng xuất ngay</button>
        </div>`}
    </div>`;
}

// =========================================================================
// 16. ADMIN TOÀN QUYỀN (vanhung1155 / vanhung123456)
// TẤT CẢ TÀI KHOẢN TẠO RA (MIỄN PHÍ, KHÔNG CẦN NẠP TIỀN) ĐỀU HIỆN NGAY Ở ĐÂY + THANH TÌM KIẾM MƯỢT!
// =========================================================================
function syncUsersFromLocalStorage() {
  try {
    const fresh = loadJson('tamn_real_users_v1', []);
    if (Array.isArray(fresh) && fresh.length) {
      const merged = new Map();
      state.users.forEach(u => merged.set(u.accountCode || u.username, u));
      fresh.forEach(u => merged.set(u.accountCode || u.username, u));
      state.users = Array.from(merged.values());
    }
  } catch {}
}

// Đồng bộ thời gian thực nếu mở nhiều tab (tạo acc ở tab khác → tab Admin hiện ngay lập tức!)
window.addEventListener('storage', (ev) => {
  if (ev.key === 'tamn_real_users_v1' || ev.key === 'tamn_orders_v1') {
    syncUsersFromLocalStorage();
    const freshOrders = loadJson('tamn_orders_v1', []);
    if (Array.isArray(freshOrders)) state.orders = freshOrders;
    syncTopRankRewards();
    if (state.nav === 'admin') {
      if (state.adminTab === 'users' && document.getElementById('adm-users-list')) {
        renderAdminUsersListOnly();
      } else render();
    }
  }
});

async function adminRefreshUsers() {
  syncUsersFromLocalStorage();
  hydrateVaultAsync();
  if (isCloudEnabled()) {
    await syncCloudAll(true);
  } else {
    syncTopRankRewards();
    notify(`🔄 Đã làm mới cục bộ (${state.users.length} tài khoản). Gắn link Firebase ở tab ☁️ Đồng bộ Cloud để gom tài khoản Laptop + Điện thoại!`);
  }
  render();
}

function adminQuickCreateUser(e) {
  e.preventDefault();
  if (!isAdmin()) return;
  const name = (document.getElementById('adm-new-name')?.value || '').trim();
  const username = (document.getElementById('adm-new-user')?.value || '').trim().toLowerCase();
  const pass = (document.getElementById('adm-new-pass')?.value || '').trim();
  if (!name || username.length < 3 || pass.length < 4) {
    notify('⚠️ Nhập đủ Tên, TK (>=3 ký tự) và MK (>=4 ký tự).');
    return;
  }
  if (username === ADMIN_CRED.username || state.users.some(u => u.username === username)) {
    notify('⚠️ Tên đăng nhập đã tồn tại!');
    return;
  }
  const u = createRealUserRecord({ name, username, email: '', phone: '', pass, provider: 'Admin tạo' });
  e.target.reset();
  state.adminCreateOpen = false;
  notify(`✅ Đã tạo tài khoản "${u.name}" (ID: ${u.accountCode} • Gói Thường)!`);
  render();
}

function adminChangeUserPass(uid) {
  if (!isAdmin()) return;
  const inp = document.getElementById(`adm-pw-${uid}`);
  const newPass = (inp?.value || '').trim();
  if (newPass.length < 4) { notify('⚠️ Mật khẩu mới phải từ 4 ký tự trở lên.'); return; }
  const u = state.users.find(x => x.id === uid);
  if (!u) return;
  u.password = newPass; u.updatedAt = Date.now(); saveUsers(); pushSingleUserToCloud(u); inp.value = '';
  notify(`🔑 Admin đã đổi mật khẩu cho ${u.name} (${u.accountCode})!`);
  renderAdminUsersListOnly();
}

function adminSetPlan(uid, tier) {
  if (!isAdmin()) { notify('⛔ Chỉ tài khoản Admin mới có quyền cấp gói cho tài khoản khác!'); return; }
  const u = state.users.find(x => x.id === uid);
  if (!u) return;
  u.adminGrantedPlan = (tier === 'free') ? null : tier;
  u.basePlanTier = tier;
  u.planTier = tier;
  u.ultraFromTop = false;
  u.updatedAt = Date.now();
  saveUsers();
  pushSingleUserToCloud(u);
  notify(`👑 Admin đã cấp gói ${tier.toUpperCase()} cho ${u.name} (${u.accountCode})!`);
  render();
}

function adminSetStatus(uid, st) {
  if (!isAdmin()) return;
  const u = state.users.find(x => x.id === uid);
  if (!u) return;
  u.status = st;
  u.updatedAt = Date.now();
  saveUsers();
  pushSingleUserToCloud(u);
  syncTopRankRewards();
  notify(`🛡️ Đã chuyển trạng thái ${u.name} (${u.accountCode}) → ${st === 'active' ? 'Hoạt động' : st === 'locked' ? 'Tạm khóa' : 'BAN vĩnh viễn'}.`);
  render();
}

function adminDeleteUser(uid) {
  if (!isAdmin()) return;
  const target = state.users.find(x => x.id === uid);
  if (target && target.accountCode) { addDeletedUserCode(target.accountCode); pushDeleteUserToCloud(target.accountCode); }
  state.users = state.users.filter(x => x.id !== uid);
  saveUsers();
  syncTopRankRewards();
  notify('🗑️ Đã xóa tài khoản khỏi hệ thống!');
  render();
}

function adminApproveOrder(code) {
  if (!isAdmin()) { notify('⛔ Chỉ tài khoản Admin mới có quyền duyệt đơn & cấp gói!'); return; }
  const o = state.orders.find(x => x.code === code);
  if (!o) return;
  o.status = 'paid';
  if (state.activeOrder && state.activeOrder.code === code) state.activeOrder.status = 'paid';
  saveJson('tamn_orders_v1', state.orders);
  const u = state.users.find(x => x.accountCode === o.memo);
  if (u) {
    u.adminGrantedPlan = o.tier;
    u.basePlanTier = o.tier;
    u.planTier = o.tier;
    u.ultraFromTop = false;
    u.updatedAt = Date.now();
    saveUsers();
    pushSingleUserToCloud(u);
  }
  pushOrderToCloud(o);
  backupVaultAsync();
  notify(`✅ Admin đã duyệt đơn ${code} & cấp gói ${o.tier.toUpperCase()} cho ID ${o.memo}!`);
  render();
}

function adminRunMediaAi(e) {
  e.preventDefault();
  if (!isAdmin()) return;
  const title = document.getElementById('adm-m-title').value.trim();
  const link = document.getElementById('adm-m-link').value.trim();
  const fileEl = document.getElementById('adm-m-file');
  const enSrc = document.getElementById('adm-m-en').value.trim();
  const mode = document.querySelector('input[name="adm-m-mode"]:checked')?.value || 'text';
  const fileName = fileEl?.files?.[0]?.name || '';
  const viText = `[Bản dịch AI Tiếng Việt]: ${simpleEnToViTranslate(enSrc || title)}`;
  state.adminMediaLessons.unshift({ id: Date.now(), title, link, fileName, enText: enSrc, viText, mode, createdAt: new Date().toLocaleString('vi-VN') });
  saveJson('tamn_admin_media_v1', state.adminMediaLessons);
  if (mode === 'voice' || mode === 'both') speak(viText.replace('[Bản dịch AI Tiếng Việt]: ', ''), 'vi-VN', 0.96);
  notify(`🤖 AI đã dịch xong "${title}" & xuất bản lên mục Ngữ pháp!`);
  render();
}

function getFilteredAdminUsers() {
  const q = (state.adminSearchQuery || '').trim().toLowerCase();
  return [...state.users]
    .sort((a, b) => (b.id || 0) - (a.id || 0))
    .filter(u => {
      if (state.adminPlanFilter !== 'ALL' && (u.planTier || 'free') !== state.adminPlanFilter) return false;
      if (state.adminStatusFilter !== 'ALL' && (u.status || 'active') !== state.adminStatusFilter) return false;
      if (!q) return true;
      const hay = `${u.name || ''} ${u.username || ''} ${u.accountCode || ''} ${u.email || ''} ${u.phone || ''} ${u.planTier || ''}`.toLowerCase();
      return hay.includes(q);
    });
}

function renderAdminUsersListHtml() {
  const list = getFilteredAdminUsers();
  if (!state.users.length) {
    return `<div class="p-8 text-center text-[var(--muted-foreground)] space-y-2">
      <div class="text-2xl">👥</div>
      <div>Chưa có tài khoản học viên nào được đăng ký. Khi bất kỳ ai bấm <strong>Tạo tài khoản mới</strong> (miễn phí, không cần nạp tiền), tài khoản sẽ hiện ngay tại đây!</div>
    </div>`;
  }
  if (!list.length) {
    return `<div class="p-8 text-center text-[var(--muted-foreground)]">Không tìm thấy tài khoản nào khớp với từ khóa "<strong>${escapeHtml(state.adminSearchQuery)}</strong>" / bộ lọc hiện tại.</div>`;
  }
  return list.map(u => {
    const planBadge = u.planTier === 'ultra'
      ? 'bg-sky-100 text-sky-800 border-sky-300'
      : u.planTier === 'pro'
      ? 'bg-amber-100 text-amber-800 border-amber-300'
      : 'bg-slate-100 text-slate-700 border-slate-300';
    const stBadge = u.status === 'banned'
      ? 'bg-rose-100 text-rose-700'
      : u.status === 'locked'
      ? 'bg-amber-100 text-amber-800'
      : 'bg-emerald-100 text-emerald-800';
    const showPw = Boolean(state.adminShowPass[u.id]);
    return `
      <div class="p-4 flex flex-wrap justify-between items-center gap-3">
        <div class="flex items-start gap-3 min-w-0">
          ${avatarHtml(u, 40)}
          <div class="space-y-0.5 min-w-0">
            <div class="flex flex-wrap items-center gap-1.5">
              <strong class="text-sm text-slate-900">${nameWithBadge(u)}</strong>
              <span class="font-mono text-xs font-extrabold px-2 py-0.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">${escapeHtml(u.accountCode)}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${planBadge}">${u.planTier === 'free' ? '🌱 Thường (Free)' : u.planTier === 'pro' ? '⚡ PRO' : '💎 ULTRA'}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${stBadge}">${u.status === 'active' ? '✅ Hoạt động' : u.status === 'locked' ? '🔒 Tạm khóa' : '⛔ Đã BAN'}</span>
            </div>
            <div class="text-[11px] text-slate-600 flex flex-wrap gap-x-3 gap-y-0.5">
              <span>TK: <strong class="font-mono text-slate-900">${escapeHtml(u.username)}</strong></span>
              <span>MK: <strong class="font-mono text-slate-900">${showPw ? escapeHtml(u.password) : '••••••'}</strong> <button onclick="state.adminShowPass[${u.id}]=!state.adminShowPass[${u.id}];renderAdminUsersListOnly()" class="underline text-sky-700 cursor-pointer">${showPw ? 'Ẩn' : 'Xem'}</button></span>
              <span>Nguồn: <strong>${escapeHtml(u.provider || 'Web')}</strong></span>
              <span>Ngày tạo: <strong>${escapeHtml(u.createdAt || 'Hôm nay')}</strong></span>
              ${u.email ? `<span>Email: <strong>${escapeHtml(u.email)}</strong></span>` : ''}
              ${u.phone ? `<span>SĐT: <strong>${escapeHtml(u.phone)}</strong></span>` : ''}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-1.5">
          <input id="adm-pw-${u.id}" type="text" placeholder="MK mới..." class="w-28 px-2.5 py-1 rounded-lg bg-[var(--content)] border border-[var(--border)] font-mono" />
          <button onclick="adminChangeUserPass(${u.id})" class="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold cursor-pointer">🔑 Đổi MK</button>
          <button onclick="adminSetPlan(${u.id},'free')" class="px-2.5 py-1 rounded-lg border font-bold cursor-pointer ${u.planTier==='free'?'bg-slate-800 text-white border-transparent':'bg-[var(--content)] border-[var(--border)]'}">Free</button>
          <button onclick="adminSetPlan(${u.id},'pro')" class="px-2.5 py-1 rounded-lg font-bold cursor-pointer ${u.planTier==='pro'?'ring-2 ring-amber-700':''} bg-amber-400 text-slate-900">Pro</button>
          <button onclick="adminSetPlan(${u.id},'ultra')" class="px-2.5 py-1 rounded-lg font-bold cursor-pointer ${u.planTier==='ultra'?'ring-2 ring-sky-900':''} bg-sky-600 text-white">Ultra</button>
          <button onclick="adminSetStatus(${u.id},'${u.status==='active'?'locked':'active'}')" title="Khóa / Mở khóa" class="px-2 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold cursor-pointer">${u.status==='active'?'🔒 Khóa':'🔓 Mở'}</button>
          <button onclick="adminSetStatus(${u.id},'${u.status==='banned'?'active':'banned'}')" title="Ban / Gỡ Ban" class="px-2 py-1 rounded-lg bg-rose-100 text-rose-700 font-bold cursor-pointer">${u.status==='banned'?'↩ Gỡ Ban':'⛔ Ban'}</button>
          <button onclick="adminDeleteUser(${u.id})" title="Xóa tài khoản" class="px-2 py-1 rounded-lg bg-rose-600 text-white font-bold cursor-pointer">🗑️</button>
        </div>
      </div>`;
  }).join('');
}

function renderAdminUsersListOnly() {
  const box = document.getElementById('adm-users-list');
  const cnt = document.getElementById('adm-found-count');
  if (box) box.innerHTML = renderAdminUsersListHtml();
  if (cnt) cnt.textContent = `Hiển thị ${getFilteredAdminUsers().length} / ${state.users.length} tài khoản`;
}


function saveAdminCloudUrl(e) {
  e.preventDefault();
  if (!isAdmin()) return;
  const raw = document.getElementById('adm-cloud-url-inp')?.value || '';
  const url = normalizeFirebaseUrl(raw);
  if (!url || !url.includes('firebaseio.com') && !url.includes('firebasedatabase.app')) {
    notify('⚠️ Link Firebase Realtime Database phải có dạng https://ten-project-default-rtdb.asia-southeast1.firebasedatabase.app');
    return;
  }
  localStorage.setItem('tamn_cloud_db_url_v1', url);
  state.cloud.url = url;
  startCloudAutoSyncLoop();
  syncCloudAll(true);
  render();
}

function clearAdminCloudUrl() {
  if (!isAdmin()) return;
  localStorage.removeItem('tamn_cloud_db_url_v1');
  if (state.cloud.timer) { clearInterval(state.cloud.timer); state.cloud.timer = null; }
  state.cloud.url = getActiveCloudDbUrl();
  startCloudAutoSyncLoop();
  notify('Đã chuyển về chế độ Cloud Tự Động mặc định.');
  render();
}

function copyGeneratedConfigJs() {
  const url = getActiveCloudDbUrl() || normalizeFirebaseUrl(document.getElementById('adm-cloud-url-inp')?.value || '');
  const cfg = window.TAMN_CLOUD_CONFIG || {};
  const snippet = `window.TAMN_CLOUD_CONFIG = {\n  firebaseDbUrl: "${url}",\n  autoCloudEnabled: true,\n  autoCloudMasterId: "${cfg.autoCloudMasterId || ''}",\n  realtimePushTopic: "${cfg.realtimePushTopic || ''}",\n  snapshotTopic: "${cfg.snapshotTopic || ''}",\n  syncIntervalMs: 7000\n};`;
  copyText(snippet, 'Đã sao chép nội dung config.js để dán lên GitHub');
}

function exportBackupJsonFile() {
  if (!isAdmin()) return;
  const payload = {
    exportedAt: new Date().toISOString(),
    users: state.users,
    orders: state.orders,
    usedIds: Array.from(getUsedAccountCodesSet())
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `TAMN_Backup_TaiKhoan_${getTodayKey()}.json`;
  a.click();
  notify(`⬇️ Đã xuất file dự phòng gồm ${state.users.length} tài khoản!`);
}

function importMergeBackupJson(input) {
  if (!isAdmin()) return;
  const f = input.files?.[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result);
      const incUsers = Array.isArray(data.users) ? data.users : [];
      const incOrders = Array.isArray(data.orders) ? data.orders : [];
      const byCode = new Map(state.users.map(u => [u.accountCode, u]));
      let added = 0;
      incUsers.forEach(u => {
        if (!u || !u.username) return;
        const dupUser = Array.from(byCode.values()).find(x => x.username === u.username);
        if (!dupUser) {
          if (!u.accountCode || byCode.has(u.accountCode)) u.accountCode = generateUniqueAccountCode();
          u.updatedAt = Date.now();
          byCode.set(u.accountCode, u);
          added++;
        }
      });
      state.users = Array.from(byCode.values());
      const ordMap = new Map(state.orders.map(o => [o.code, o]));
      incOrders.forEach(o => { if (o && o.code && !ordMap.has(o.code)) ordMap.set(o.code, o); });
      state.orders = Array.from(ordMap.values());
      saveUsers();
      saveJson('tamn_orders_v1', state.orders);
      if (isCloudEnabled()) syncCloudAll(false);
      notify(`✅ Đã gộp thêm ${added} tài khoản mới từ thiết bị kia! Tổng cộng: ${state.users.length} tài khoản.`);
      render();
    } catch {
      notify('❌ File JSON không hợp lệ!');
    }
  };
  r.readAsText(f);
}


// =========================================================================
// ĐỒNG BỘ NHANH 1 CHẠM BẰNG LINK / MÃ ĐỒNG BỘ (GỬI QUA ZALO — KHÔNG CẦN FILE!)
// =========================================================================
function encodeSyncPayloadBase64(obj) {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let bin = '';
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeSyncPayloadBase64(str) {
  let b64 = String(str || '').trim();
  // Nếu người dùng dán nguyên cả đường link có ?sync=... hoặc #sync=...
  const m = b64.match(/[?&#]sync=([A-Za-z0-9_-]+)/);
  if (m) b64 = m[1];
  b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json);
}

function buildCompactSyncPayload() {
  // Đóng gói gọn (bỏ ảnh avatar base64 quá lớn nếu có để link luôn ngắn gọn qua Zalo)
  const compactUsers = state.users.map(u => ({
    ...u,
    avatar: (u.avatar && u.avatar.length > 300) ? '' : (u.avatar || '')
  }));
  return {
    v: 11,
    fb: getActiveCloudDbUrl() || '',
    users: compactUsers,
    orders: state.orders.slice(0, 50)
  };
}

function mergeIncomingSyncData(data) {
  if (!data || typeof data !== 'object') return { added: 0, updated: 0, fbLinked: false };
  let fbLinked = false;
  if (data.fb && typeof data.fb === 'string') {
    const cleanFb = normalizeFirebaseUrl(data.fb);
    if (cleanFb && !getActiveCloudDbUrl()) {
      localStorage.setItem('tamn_cloud_db_url_v1', cleanFb);
      fbLinked = true;
    }
  }
  const incUsers = Array.isArray(data.users) ? data.users : [];
  const incOrders = Array.isArray(data.orders) ? data.orders : [];
  const byUsername = new Map(state.users.map(u => [String(u.username || '').toLowerCase(), u]));
  const usedCodes = new Set(state.users.map(u => String(u.accountCode || '').toUpperCase()));
  let added = 0, updated = 0;

  incUsers.forEach(inc => {
    if (!inc || !inc.username) return;
    const uname = String(inc.username).trim().toLowerCase();
    const cur = byUsername.get(uname);
    if (!cur) {
      let code = String(inc.accountCode || '').toUpperCase();
      if (!code || usedCodes.has(code)) {
        code = generateUniqueAccountCode();
      }
      const cloned = { ...inc, username: uname, accountCode: code, updatedAt: Date.now() };
      byUsername.set(uname, cloned);
      usedCodes.add(code);
      added++;
    } else {
      // Nếu cùng username nhưng bên kia mới nâng gói Pro/Ultra hoặc updatedAt mới hơn -> cập nhật luôn
      const curRank = cur.planTier === 'ultra' ? 2 : cur.planTier === 'pro' ? 1 : 0;
      const incRank = inc.planTier === 'ultra' ? 2 : inc.planTier === 'pro' ? 1 : 0;
      if ((inc.updatedAt || 0) > (cur.updatedAt || 0) || incRank > curRank) {
        const keepCode = cur.accountCode;
        byUsername.set(uname, { ...cur, ...inc, accountCode: keepCode, updatedAt: Date.now() });
        updated++;
      }
    }
  });

  state.users = Array.from(byUsername.values());
  const ordMap = new Map(state.orders.map(o => [o.code, o]));
  incOrders.forEach(o => { if (o && o.code && !ordMap.has(o.code)) ordMap.set(o.code, o); });
  state.orders = Array.from(ordMap.values());
  syncTopRankRewards();
  saveUsers();
  saveJson('tamn_orders_v1', state.orders);
  if (fbLinked) startCloudAutoSyncLoop();
  else if (isCloudEnabled()) syncCloudAll(false);
  return { added, updated, fbLinked };
}

function copyInstantSyncLink() {
  if (!isAdmin()) return;
  try {
    const code = encodeSyncPayloadBase64(buildCompactSyncPayload());
    const baseUrl = window.location.origin + window.location.pathname;
    const fullLink = `${baseUrl}?sync=${code}`;
    copyText(fullLink, `⚡ Đã copy Link Đồng Bộ (${state.users.length} tài khoản) — dán sang Zalo mở trên máy kia là gộp ngay!`);
    const preview = document.getElementById('adm-sync-code-out');
    if (preview) preview.value = fullLink;
  } catch {
    notify('⚠️ Danh sách quá dài cho link, hãy dùng nút Xuất file JSON bên dưới.');
  }
}

function applyManualSyncCode(e) {
  e.preventDefault();
  if (!isAdmin()) return;
  const raw = (document.getElementById('adm-sync-code-inp')?.value || '').trim();
  if (!raw) return;
  try {
    const data = decodeSyncPayloadBase64(raw);
    const res = mergeIncomingSyncData(data);
    document.getElementById('adm-sync-code-inp').value = '';
    notify(`✅ Đã gộp thành công! Thêm ${res.added} tài khoản mới, cập nhật ${res.updated} tài khoản (Tổng: ${state.users.length} TK)${res.fbLinked ? ' • 🟢 Đã tự liên kết Firebase!' : ''}`);
    render();
  } catch {
    notify('❌ Mã hoặc Link đồng bộ không hợp lệ! Hãy copy lại trọn vẹn Link Đồng Bộ từ máy kia.');
  }
}

function applyIncomingSyncLinkIfAny() {
  try {
    const params = new URLSearchParams(window.location.search);
    let syncParam = params.get('sync');
    if (!syncParam && window.location.hash && window.location.hash.includes('sync=')) {
      const m = window.location.hash.match(/sync=([A-Za-z0-9_-]+)/);
      if (m) syncParam = m[1];
    }
    if (!syncParam) return;
    const data = decodeSyncPayloadBase64(syncParam);
    const res = mergeIncomingSyncData(data);
    // Xóa ?sync=... khỏi thanh địa chỉ để gọn gàng
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setTimeout(() => {
      notify(`⚡ Đồng bộ 1 chạm thành công! +${res.added} tài khoản mới, cập nhật ${res.updated} TK (Tổng: ${state.users.length} TK)${res.fbLinked ? ' • 🟢 Đã bật Cloud!' : ''}`);
    }, 350);
  } catch {}
}

function renderAdmin(v) {
  if (!isAdmin()) {
    v.innerHTML = `<div class="max-w-lg mx-auto travel-card p-8 text-center space-y-3 border-2 border-rose-500"><div class="text-4xl">🛡️🔒</div><h1 class="text-xl font-black text-rose-600">Khu Vực Dành Riêng Cho Admin</h1><p class="text-xs text-[var(--muted-foreground)]">Tài khoản người dùng thường không thể truy cập mục Admin.</p><button onclick="go('home')" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold cursor-pointer">🏝️ Về Trang Chủ</button></div>`;
    return;
  }
  syncUsersFromLocalStorage();
  const freeCnt = state.users.filter(u => (u.planTier || 'free') === 'free').length;
  const proCnt = state.users.filter(u => u.planTier === 'pro').length;
  const ultraCnt = state.users.filter(u => u.planTier === 'ultra').length;

  v.innerHTML = `
    <div class="space-y-4">
      <div class="boarding-pass p-5 text-white space-y-2" style="background:linear-gradient(135deg,#991b1b,#dc2626);">
        <div class="flex flex-wrap justify-between items-center gap-2">
          <div class="text-xs font-extrabold uppercase opacity-90">🛡️ QUẢN TRỊ ADMIN • ${ADMIN_CRED.username}</div>
          <button onclick="adminRefreshUsers()" class="px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold cursor-pointer">🔄 Làm mới danh sách</button>
        </div>
        <h1 class="text-xl font-black">Quản Lý Toàn Bộ Tài Khoản • Tìm Kiếm • Cấp Gói (Chỉ Admin) • Duyệt VietQR</h1>
        <div class="text-xs opacity-90">Mọi tài khoản tạo mới (miễn phí, không cần nạp tiền) đều tự động hiện ở đây với Gói Thường (Free).</div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div class="rounded-xl bg-white/15 px-3 py-2"><div>Tổng tài khoản</div><strong class="text-lg font-mono">${state.users.length}</strong></div>
          <div class="rounded-xl bg-white/15 px-3 py-2"><div>🌱 Gói Thường</div><strong class="text-lg font-mono">${freeCnt}</strong></div>
          <div class="rounded-xl bg-white/15 px-3 py-2"><div>⚡ Gói Pro</div><strong class="text-lg font-mono">${proCnt}</strong></div>
          <div class="rounded-xl bg-white/15 px-3 py-2"><div>💎 Gói Ultra</div><strong class="text-lg font-mono">${ultraCnt}</strong></div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 text-xs">
        <button onclick="state.adminTab='users';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='users'?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">👥 Quản lý Tài khoản (${state.users.length})</button>
        <button onclick="state.adminTab='orders';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='orders'?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">💳 Đơn VietQR (${state.orders.length})</button>
        <button onclick="state.adminTab='cloud';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='cloud'?'bg-emerald-600 text-white border-transparent':'bg-white border-[var(--border)]'}">☁️ Đồng bộ Laptop ↔ Điện thoại ${isCloudEnabled()?'(🟢 Bật)':'(⚠️ Chưa gắn)'}</button>
        <button onclick="state.adminTab='media';render()" class="px-4 py-2 rounded-full font-bold cursor-pointer border ${state.adminTab==='media'?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">🎬 AI Dịch Video/Audio (${state.adminMediaLessons.length})</button>
      </div>

      ${state.adminTab === 'users' ? `
        ${!isCloudEnabled() ? `
          <div class="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-400 text-xs flex flex-wrap justify-between items-center gap-2">
            <div><strong class="text-amber-900">⚠️ Đang lưu cục bộ trên máy này:</strong> Để Laptop và Điện thoại tự động dùng chung toàn bộ tài khoản, hãy gắn link Firebase miễn phí ở tab <strong>☁️ Đồng bộ Cloud</strong> (và file <code>config.js</code>).</div>
            <button onclick="state.adminTab='cloud';render()" class="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-extrabold cursor-pointer shrink-0">☁️ Liên kết ngay →</button>
          </div>` : ''}
        <!-- Thanh tìm kiếm & Bộ lọc Admin (không mất focus khi gõ!) -->
        <div class="travel-card p-4 space-y-3 text-xs border-2 border-rose-200">
          <div class="flex flex-wrap gap-2 items-center">
            <div class="relative flex-1 min-w-60">
              <input id="adm-search-inp" type="text" value="${escapeHtml(state.adminSearchQuery)}"
                oninput="state.adminSearchQuery=this.value;renderAdminUsersListOnly()"
                placeholder="🔍 Tìm tài khoản theo Tên, Tên đăng nhập (TK), Mã ID (TAMN-...), Email hoặc SĐT..."
                class="w-full px-4 py-2.5 rounded-xl bg-[var(--content)] border border-[var(--border)] focus:outline-none focus:border-rose-500 focus:bg-white font-medium" />
            </div>
            ${state.adminSearchQuery ? `<button onclick="state.adminSearchQuery='';document.getElementById('adm-search-inp').value='';renderAdminUsersListOnly()" class="px-3 py-2 rounded-xl bg-slate-200 font-bold cursor-pointer">✕ Xóa tìm</button>` : ''}
            <button onclick="state.adminCreateOpen=!state.adminCreateOpen;render()" class="px-3.5 py-2.5 rounded-xl bg-teal-600 text-white font-extrabold cursor-pointer">${state.adminCreateOpen ? '▲ Đóng form' : '➕ Tạo nhanh TK học viên'}</button>
          </div>

          <div class="flex flex-wrap justify-between items-center gap-2">
            <div class="flex flex-wrap gap-1.5 items-center">
              <span class="font-bold text-[var(--muted-foreground)]">Lọc Gói:</span>
              ${[['ALL','Tất cả'],['free','🌱 Free'],['pro','⚡ Pro'],['ultra','💎 Ultra']].map(([k, lbl]) => `
                <button onclick="state.adminPlanFilter='${k}';render()" class="px-2.5 py-1 rounded-lg font-bold cursor-pointer border ${state.adminPlanFilter===k?'bg-slate-900 text-white border-transparent':'bg-white border-[var(--border)]'}">${lbl}</button>`).join('')}
              <span class="font-bold text-[var(--muted-foreground)] ml-2">Trạng thái:</span>
              ${[['ALL','Tất cả'],['active','✅ Hoạt động'],['locked','🔒 Khóa'],['banned','⛔ Ban']].map(([k, lbl]) => `
                <button onclick="state.adminStatusFilter='${k}';render()" class="px-2.5 py-1 rounded-lg font-bold cursor-pointer border ${state.adminStatusFilter===k?'bg-rose-600 text-white border-transparent':'bg-white border-[var(--border)]'}">${lbl}</button>`).join('')}
            </div>
            <span id="adm-found-count" class="font-mono font-bold text-teal-700">Hiển thị ${getFilteredAdminUsers().length} / ${state.users.length} tài khoản</span>
          </div>

          ${state.adminCreateOpen ? `
            <form onsubmit="adminQuickCreateUser(event)" class="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 grid sm:grid-cols-4 gap-2">
              <input id="adm-new-name" required placeholder="Tên hiển thị..." class="px-3 py-2 rounded-lg bg-white border border-[var(--border)]" />
              <input id="adm-new-user" required placeholder="Tên đăng nhập..." class="px-3 py-2 rounded-lg bg-white border border-[var(--border)]" />
              <input id="adm-new-pass" required placeholder="Mật khẩu (>=4 ký tự)..." class="px-3 py-2 rounded-lg bg-white border border-[var(--border)]" />
              <button type="submit" class="px-3 py-2 rounded-lg bg-[var(--primary)] text-white font-extrabold cursor-pointer">✅ Tạo (Gói Thường)</button>
            </form>` : ''}
        </div>

        <div id="adm-users-list" class="travel-card divide-y divide-[var(--border)] text-xs">
          ${renderAdminUsersListHtml()}
        </div>
      ` : state.adminTab === 'cloud' ? `
        <div class="space-y-4 text-xs">
          <div class="travel-card p-5 space-y-3 border-2 ${isCloudEnabled()?'border-emerald-500 bg-emerald-50/40':'border-amber-400 bg-amber-50/40'}">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <div class="font-black text-base ${isCloudEnabled()?'text-emerald-800':'text-amber-900'}">
                ${isCloudEnabled() ? '🟢 Đã Bật Đám Mây Tự Động (Zero-Config Cloud + Live Push) — Laptop & Điện Thoại Dùng Chung 1 Kho Tài Khoản!' : '⚠️ Chưa Liên Kết Đám Mây — Tài Khoản Đang Lưu Riêng Từng Máy'}
              </div>
              <button onclick="syncCloudAll(true)" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold cursor-pointer">🔄 Đồng bộ ngay bây giờ</button>
            </div>
            <p class="text-slate-700 leading-relaxed">
              Hệ thống <strong>Cloud Tự Động v12</strong> đã được kích hoạt sẵn trong <code>config.js</code> và gộp sẵn cả 3 tài khoản từ Laptop & Điện thoại của bạn (<code>vanhung123</code> 💎 ULTRA • <code>vanhung23</code> ⚡ PRO • <code>vanhung555</code> 🌱 FREE — tự động tách ID trùng <code>TAMN-100001</code> thành <code>TAMN-100003</code> và đồng bộ mật khẩu ngay khi bạn mở trình duyệt cũ). Mọi tài khoản đăng ký mới hay nâng gói trên bất kỳ thiết bị nào đều tự động cập nhật sang máy kia trong vài giây!
            </p>
            ${state.cloud.lastSyncAt ? `<div class="font-mono text-emerald-800 font-bold">Lần đồng bộ gần nhất: ${escapeHtml(state.cloud.lastSyncAt)} • Tổng ${state.users.length} tài khoản trên Cloud</div>` : ''}
            ${state.cloud.lastError ? `<div class="p-2.5 rounded-xl bg-rose-100 text-rose-800 font-bold">Ghi chú kết nối: ${escapeHtml(state.cloud.lastError)}</div>` : ''}

            <form onsubmit="saveAdminCloudUrl(event)" class="space-y-2.5 pt-2 border-t border-emerald-200">
              <label class="block font-extrabold text-slate-800">🔗 Tùy chọn nâng cao — Gắn thêm Firebase Realtime Database riêng (không bắt buộc vì Cloud Tự Động đã bật):</label>
              <div class="flex flex-wrap gap-2">
                <input id="adm-cloud-url-inp" type="url" required value="${escapeHtml(getActiveCloudDbUrl())}"
                  placeholder="https://ten-du-an-cua-ban-default-rtdb.asia-southeast1.firebasedatabase.app"
                  class="flex-1 min-w-64 px-3.5 py-2.5 rounded-xl bg-white border border-[var(--border)] font-mono text-xs" />
                <button type="submit" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold cursor-pointer">✅ Lưu Firebase Riêng</button>
                <button type="button" onclick="copyGeneratedConfigJs()" class="px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">📋 Copy mã config.js</button>
                ${localStorage.getItem('tamn_cloud_db_url_v1') ? `<button type="button" onclick="clearAdminCloudUrl()" class="px-3 py-2.5 rounded-xl bg-rose-100 text-rose-700 font-bold cursor-pointer">Dùng Cloud Tự Động</button>` : ''}
              </div>
            </form>
          </div>

          <div class="travel-card p-5 space-y-3 border-2 border-sky-400 bg-sky-50/30">
            <div class="font-black text-sm text-sky-900">⚡ Đồng Bộ Nhanh 1 Chạm Qua Link Zalo (Tự Tách Mã ID Trùng — Không Cần Tải File!)</div>
            <p class="text-slate-700">Trên máy có tài khoản (VD: Điện thoại) bấm <strong>📋 Copy Link Đồng Bộ</strong> → gửi sang Zalo → bấm mở link đó trên Laptop là <strong>tự động gộp đủ 100% tài khoản & tự cấp ID riêng nếu trùng <code>TAMN-100001</code></strong>!</p>
            <div class="flex flex-wrap gap-2">
              <button onclick="copyInstantSyncLink()" class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold cursor-pointer">📋 Copy Link Đồng Bộ (${state.users.length} TK)</button>
            </div>
            <input id="adm-sync-code-out" readonly placeholder="Link đồng bộ sẽ hiện ở đây sau khi bấm Copy..." class="w-full px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-mono text-[11px] text-slate-600" />
            <form onsubmit="applyManualSyncCode(event)" class="flex flex-wrap gap-2 pt-2 border-t border-sky-200">
              <input id="adm-sync-code-inp" required placeholder="Hoặc dán Link / Mã đồng bộ từ máy kia vào đây..." class="flex-1 min-w-52 px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-mono text-xs" />
              <button type="submit" class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">✅ Gộp Ngay</button>
            </form>
          </div>

          <div class="travel-card p-5 space-y-3">
            <div class="font-extrabold text-sm text-slate-900">📦 Hoặc Xuất / Nhập File Dự Phòng (JSON)</div>
            <div class="flex flex-wrap gap-2">
              <button onclick="exportBackupJsonFile()" class="px-4 py-2 rounded-xl bg-slate-800 text-white font-extrabold cursor-pointer">⬇️ Xuất file JSON</button>
              <label class="px-4 py-2 rounded-xl bg-[var(--primary)] text-white font-extrabold cursor-pointer">⬆️ Nhập & Gộp JSON<input type="file" accept=".json,application/json" onchange="importMergeBackupJson(this)" class="hidden" /></label>
            </div>
          </div>
        </div>
      ` : state.adminTab === 'media' ? `
        <form onsubmit="adminRunMediaAi(event)" class="travel-card p-5 space-y-3 text-xs">
          <div class="font-extrabold text-sm text-rose-700">🎬 Tải Video, Link Video hoặc Âm Thanh → AI Dịch Anh–Việt / Nói Tiếng Việt</div>
          <div class="grid sm:grid-cols-2 gap-3">
            <input id="adm-m-title" required placeholder="Tiêu đề video/âm thanh..." class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
            <input id="adm-m-link" type="url" placeholder="Dán Link Video..." class="px-3 py-2 rounded-xl bg-[var(--content)] border border-[var(--border)]" />
          </div>
          <input id="adm-m-file" type="file" accept="video/*,audio/*" class="text-xs" />
          <textarea id="adm-m-en" rows="3" required placeholder="Lời thoại tiếng Anh để AI dịch..." class="w-full p-3 rounded-xl bg-[var(--content)] border border-[var(--border)]"></textarea>
          <div class="flex flex-wrap gap-3">
            <label class="cursor-pointer"><input type="radio" name="adm-m-mode" value="text" checked /> 📝 Dịch chữ Anh → Việt</label>
            <label class="cursor-pointer"><input type="radio" name="adm-m-mode" value="voice" /> 🔊 Đọc Tiếng Việt</label>
            <label class="cursor-pointer"><input type="radio" name="adm-m-mode" value="both" /> ✨ Cả hai</label>
          </div>
          <button type="submit" class="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-extrabold cursor-pointer">🤖 AI Dịch & Xuất Bản</button>
        </form>
      ` : `
        <div class="travel-card divide-y divide-[var(--border)] text-xs">
          ${state.orders.length ? state.orders.map(o => `
            <div class="p-4 flex flex-wrap justify-between items-center gap-2">
              <div><strong class="font-mono">${o.code}</strong> • ${escapeHtml(o.userName)} • ID: <strong class="font-mono text-teal-700">${o.memo}</strong> (${o.tier.toUpperCase()} — ${fmtVnd(o.amount)})</div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full font-bold ${o.status==='paid'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-800'}">${o.status==='paid'?'✓ Đã duyệt':'⏳ Chờ duyệt'}</span>
                ${o.status!=='paid'?`<button onclick="adminApproveOrder('${o.code}')" class="px-3 py-1 rounded-lg bg-[var(--primary)] text-white font-bold cursor-pointer">✅ Duyệt & Cấp gói</button>`:''}
              </div>
            </div>`).join('') : `<div class="p-6 text-center text-[var(--muted-foreground)]">Chưa có đơn VietQR nào.</div>`}
        </div>`}
    </div>`;
}

// =========================================================================
// 17. CHỨNG CHỈ PHÁO HOA SAO BĂNG + LINH VẬT HÀ MÃ BÒ SỮA AI + BOOTSTRAP
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
function spawnCertMeteor(w, h) { certMeteors.push({ x: Math.random() * w * 1.2, y: -20 - Math.random() * 80, vx: -(7 + Math.random() * 6), vy: 5 + Math.random() * 4.5, life: 1 }); }
function triggerExtraCertBurst() {
  const c = document.getElementById('cert-fx-canvas'); if (!c) return;
  for (let i = 0; i < 4; i++) spawnCertFirework(c.width, c.height);
  for (let i = 0; i < 6; i++) spawnCertMeteor(c.width, c.height);
}
function startCertCelebrationFx() {
  const c = document.getElementById('cert-fx-canvas'); if (!c) return;
  if (state.certRaf) { cancelAnimationFrame(state.certRaf); state.certRaf = null; }
  c.width = window.innerWidth; c.height = window.innerHeight;
  const ctx = c.getContext('2d'); certFireworks = []; certMeteors = [];
  for (let i = 0; i < 3; i++) spawnCertFirework(c.width, c.height);
  for (let i = 0; i < 5; i++) spawnCertMeteor(c.width, c.height);
  let lastFw = 0, lastMt = 0;
  function anim(now) {
    if (document.getElementById('cert-modal')?.classList.contains('hidden')) return;
    state.certRaf = requestAnimationFrame(anim);
    ctx.fillStyle = 'rgba(2,6,23,0.22)'; ctx.fillRect(0, 0, c.width, c.height);
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
  state.activeCert = { studentName: u.name, avatar: u.avatar || '', roadmapName, startDate: startStr, endDate, certCode };
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
  const cert = state.activeCert; if (!cert) return;
  const canvas = document.createElement('canvas'); canvas.width = 1600; canvas.height = 1120;
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
    else { ctx.fillStyle = '#0d9488'; ctx.fillRect(ax - ar, ay - ar, ar * 2, ar * 2); ctx.fillStyle = '#fff'; ctx.font = 'bold 64px "Segoe UI", sans-serif'; ctx.textBaseline = 'middle'; ctx.fillText(cert.studentName.slice(0, 1).toUpperCase(), ax, ay + 4); ctx.textBaseline = 'alphabetic'; }
    ctx.restore();
    ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(ax, ay, ar + 3, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 46px "Segoe UI", sans-serif'; ctx.fillText(cert.studentName, 800, 495);
    ctx.fillStyle = '#0f766e'; ctx.font = 'bold 30px "Segoe UI", sans-serif'; ctx.fillText(`Lộ trình: ${cert.roadmapName}`, 800, 550);
    ctx.fillStyle = '#f8fafc'; ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
    ctx.fillRect(360, 588, 400, 92); ctx.strokeRect(360, 588, 400, 92); ctx.fillRect(840, 588, 400, 92); ctx.strokeRect(840, 588, 400, 92);
    ctx.fillStyle = '#64748b'; ctx.font = 'bold 20px "Segoe UI", sans-serif'; ctx.fillText('NGÀY BẮT ĐẦU HỌC', 560, 622); ctx.fillText('NGÀY KẾT THÚC', 1040, 622);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 30px monospace'; ctx.fillText(cert.startDate, 560, 662); ctx.fillStyle = '#059669'; ctx.fillText(cert.endDate, 1040, 662);
    ctx.fillStyle = '#fffbeb'; ctx.strokeStyle = '#fcd34d'; ctx.fillRect(180, 712, 1240, 126); ctx.strokeRect(180, 712, 1240, 126);
    ctx.fillStyle = '#334155'; ctx.font = 'italic 24px Georgia, serif';
    ctx.fillText('"Chúc mừng em đã kiên trì vượt qua toàn bộ thử thách và hoàn thành xuất sắc lộ trình tại', 800, 758);
    ctx.fillText('Tiếng Anh Mỗi Ngày! Chúc em luôn giữ vững ngọn lửa đam mê ngoại ngữ,', 800, 792);
    ctx.fillText('tự tin bứt phá mọi kỳ thi và gặt hái thật nhiều thành công rực rỡ trong tương lai!"', 800, 826);
    ctx.textAlign = 'left'; ctx.fillStyle = '#475569'; ctx.font = '600 22px "Segoe UI", sans-serif'; ctx.fillText(`Mã chứng chỉ: ${cert.certCode}`, 130, 955);
    ctx.fillStyle = '#0f766e'; ctx.font = 'bold 24px "Segoe UI", sans-serif'; ctx.fillText('Hệ thống đào tạo Tiếng Anh Mỗi Ngày', 130, 995);
    ctx.textAlign = 'right'; ctx.fillStyle = '#64748b'; ctx.font = 'bold 22px "Segoe UI", sans-serif'; ctx.fillText('HIỆU TRƯỞNG', 1470, 918);
    ctx.fillStyle = '#92400e'; ctx.font = 'italic bold 46px Georgia, serif'; ctx.fillText('Trần Văn Hùng', 1470, 976);
    ctx.fillStyle = '#dc2626'; ctx.font = 'bold 18px "Segoe UI", sans-serif'; ctx.fillText('★ ĐÃ XÁC NHẬN • TIẾNG ANH MỖI NGÀY ★', 1470, 1014);
    const a = document.createElement('a'); a.download = `Chung_Chi_Tieng_Anh_Moi_Ngay_${cert.certCode}.png`; a.href = canvas.toDataURL('image/png'); a.click();
    notify('⬇️ Đã tải hình Chứng chỉ Tiếng Anh Mỗi Ngày (PNG)!');
  }
  if (cert.avatar) { const img = new Image(); img.crossOrigin = 'anonymous'; img.onload = () => drawRest(img); img.onerror = () => drawRest(null); img.src = cert.avatar; }
  else drawRest(null);
}

function toggleHippoChat() {
  state.hippoOpen = !state.hippoOpen;
  document.getElementById('hippo-chat-box').classList.toggle('hidden', !state.hippoOpen);
  if (state.hippoOpen) renderHippoMsgs();
}
function renderHippoMsgs() {
  const box = document.getElementById('hippo-chat-msgs'); if (!box) return;
  box.innerHTML = state.hippoMsgs.map(m => `<div class="flex ${m.role==='user'?'justify-end':'justify-start'}"><div class="max-w-[85%] px-3 py-2 rounded-2xl leading-relaxed ${m.role==='user'?'bg-[var(--primary)] text-white rounded-br-sm':'bg-white border border-[var(--border)] text-slate-800 rounded-bl-sm'}">${escapeHtml(m.text)}</div></div>`).join('');
  box.scrollTop = box.scrollHeight;
}
function generateHippoReply(q) {
  const ql = q.toLowerCase();
  if (ql.includes('gói') || ql.includes('free') || ql.includes('pro') || ql.includes('ultra')) {
    return '👑 Tài khoản mới mặc định là Gói Thường (Free: 30 từ/ngày, 3 bài Ngữ pháp/Nói/Viết). Gói Pro: ∞ từ, học vượt, 15 bài/ngày. Gói Ultra: ∞ tất cả, miễn KT tuần & mở Giao lưu Cam/Mic. Chỉ Admin mới có quyền cấp gói Pro/Ultra nhé!';
  }
  if (ql.includes('ielts') || ql.includes('7.5') || ql.includes('8.0') || ql.includes('mẹo')) {
    return '🎯 Mẹo tăng Band IELTS 7.5+ ngay trên web: (1) Luyện 250+ video Nghe chép chính tả 3 cấp độ & Shadowing IPA; (2) Luyện Đọc Split-Pane bôi đen tô màu Highlight & lưu từ vựng; (3) Trò chuyện với Gia sư AI ở mục Luyện Nói để được sửa ngữ pháp & gợi ý ý tưởng từng câu!';
  }
  if (ql.includes('nghe') || ql.includes('chính tả')) {
    return '🎧 Vào Menu ☰ → Luyện Nghe (250+ Video): chọn Chép chính tả 3 cấp (Dễ • Vừa • Khó), Luyện phát âm Shadowing ghi âm giọng thật, Phụ đề song ngữ IPA hoặc Bài tập Nghe hiểu!';
  }
  if (ql.includes('nhạc') || ql.includes('bài hát') || ql.includes('youtube') || ql.includes('âm nhạc')) {
    return '🎵 Vào mục Âm Nhạc: bạn có thể gõ tìm bất kỳ bài hát hay ca sĩ nào (V-Pop, US-UK, K-Pop, Lofi, Radio 24/7), phát chạy nền xuyên suốt khi học bài và xem lời bài hát tự động kèm bản dịch AI!';
  }
  if (ql.includes('đồng bộ') || ql.includes('điện thoại') || ql.includes('laptop') || ql.includes('cloud')) {
    return '☁️ Hệ thống Đám mây Tự động (🟢 Cloud) đã bật sẵn! Toàn bộ tài khoản Laptop & Điện thoại tự động dùng chung 1 kho tài khoản và cập nhật theo thời gian thực.';
  }
  if (ql.includes('ngữ pháp') || ql.includes('cấu trúc') || ql.includes('htht')) {
    return '📐 Mục Ngữ Pháp có đủ 24 dạng kiến thức & cấu trúc (A1→C2), mỗi dạng 3.600 câu không trùng lặp (86.400 câu), mỗi lần làm 30 câu có Bản đồ câu 1→30 & chấm IELTS Band!';
  }
  return `🦛 Bé Hà Mã Bò Sữa AI đã nhận câu hỏi "${q}"! Bạn có thể luyện 250+ video Nghe, 408+ chủ đề Nói Gia sư AI, 425+ bài Đọc Split-Pane, 24 cấu trúc Ngữ pháp hoặc mở Âm Nhạc tìm bài hát trực tuyến nhé ✨`;
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
  inp.value = ''; sendQuickHippo(txt);
}

// =========================================================================
// 18. BOOTSTRAP APP + YÊU CẦU BẬT CAM & MIC KHI TRUY CẬP WEB
// =========================================================================
(function initApp() {
  const logoHtml = hippoCowSvg('w-full h-full');
  ['brand-logo-slot', 'drawer-logo-slot', 'floating-mascot-slot', 'chat-mascot-header', 'device-gate-logo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = logoHtml;
  });

  document.querySelectorAll('.snav').forEach(b => {
    b.addEventListener('click', () => go(b.dataset.nav));
  });

  restoreSession();
  deduplicateExistingUserIds();
  applyIncomingSyncLinkIfAny();
  syncTopRankRewards();
  restoreLearningProgress();
  render();
  hydrateVaultAsync();
  startCloudAutoSyncLoop();

  // Yêu cầu người dùng bật Camera & Micro khi vừa truy cập web
  if (!state.deviceGateSeen) {
    setTimeout(() => openDeviceGate(), 450);
  }
})();
