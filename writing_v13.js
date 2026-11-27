/* ============================================================================
 * TIẾNG ANH MỖI NGÀY v13 — WRITING 100% LUYENNGUPHAP.COM WORKFLOW
 * (540+ TOPICS • SVG CHARTS • CHỌN CHẾ ĐỘ MODAL: DỊCH THEO BAND & VIẾT ĐOẠN • 120 PARAPHRASE)
 * ========================================================================== */

(function () {
  const TASK1_SUBTYPES = ['Line Graph', 'Bar Chart', 'Pie Chart', 'Table', 'Map', 'Process'];
  const TASK2_SUBTYPES = ['Opinion', 'Discussion', 'Advantages & Disadvantages', 'Problem & Solution', 'Two-Part'];
  const BAND_FILTERS = ['ALL', '0-6.5', '6.5-7.5', '8.0'];

  const T1_DOMAINS = [
    ['Renewable Energy Share', 'solar, wind, hydro and nuclear output (%)', 'Germany, Japan, Vietnam and Brazil', '2010 to 2025'],
    ['Urban Commuter Transport', 'daily passengers (in thousands) using metro, bus, cycling and private cars', 'four European capitals', '2005 to 2024'],
    ['Household Monthly Expenditure', 'spending proportions on housing, food, healthcare, education and leisure', 'three income brackets', '2015 and 2025'],
    ['E-Commerce Adoption by Age', 'online shopping frequency across five age groups', 'South Korea, the UK and Australia', '2012 to 2024'],
    ['International Student Enrollment', 'overseas university applicants in STEM, Business, Arts and Medicine', 'Canada, the US and Australia', '2014 to 2025'],
    ['Freshwater Consumption by Sector', 'water usage in agriculture, industry and domestic households', 'six global regions', '2000 to 2025'],
    ['Public Library Digital Borrowing', 'e-books, audiobooks and printed books borrowed per resident', 'five metropolitan cities', '2016 to 2025'],
    ['Coffee & Tea Export Volume', 'annual export tonnage and revenue', 'Vietnam, Colombia, Kenya and India', '2011 to 2024'],
    ['Remote Work Workforce Ratio', 'percentage of full-time employees working hybrid or remotely', 'IT, Finance, Education and Manufacturing', '2018 to 2025'],
    ['Electric Vehicle Charging Stations', 'newly installed fast-charging ports', 'urban highways vs city centers', '2017 to 2025'],
    ['Riverside Town Redevelopment', 'spatial layout changes including harbour, park, housing and tram line', 'Northbay coastal town', '1995 and Present'],
    ['Recycled Glass Bottle Production', 'industrial stages from collection and sorting to melting and moulding', 'modern circular recycling plant', '8 continuous stages']
  ];

  const T2_THEMES = [
    ['Artificial Intelligence in Classrooms', 'Some educators argue that AI tutoring systems personalize learning, while others fear students may lose critical thinking skills.'],
    ['Four-Day Working Week', 'Many companies are trialing a four-day workweek to boost productivity and employee well-being.'],
    ['Cashless Digital Economy', 'Digital payments have nearly replaced physical banknotes and coins in many modern cities.'],
    ['Space Exploration vs Earth Priorities', 'Governments invest billions in space missions while urgent environmental and healthcare challenges remain on Earth.'],
    ['Congestion Pricing in Mega-Cities', 'Charging private motorists a daily fee to enter city centers is increasingly used to curb traffic and air pollution.'],
    ['Remote University Degrees', 'Online university programs allow global access to higher education but lack face-to-face campus interaction.'],
    ['Youth Volunteering & Community Service', 'Some high schools require every teenager to complete unpaid community service before graduation.'],
    ['Fast Fashion & Sustainable Clothing', 'Cheap seasonal clothing has transformed consumer habits at the cost of textile waste and carbon emissions.'],
    ['Preserving Endangered Languages', 'Several minority languages disappear every year as global communication converges on a few major tongues.'],
    ['Preventive Healthcare vs Hospital Treatment', 'Public health budgets can either fund lifestyle prevention campaigns or expand hospital treatment facilities.'],
    ['Automated Vehicles on Public Roads', 'Self-driving cars and delivery pods are being tested alongside human drivers on public streets.'],
    ['Lifelong Reskilling in Modern Careers', 'Rapid technological shifts mean workers can no longer rely on a single qualification for life.']
  ];

  let _wrCatalogBuilt = false;
  let _wrTopics = [];
  let _wrParaphrases = [];

  function hashSeed(str) {
    let h = 2166136261;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // Deterministic crisp SVG Chart / Map / Process generator (matches Screenshot 14!)
  window.renderWritingChartSvg = function (topic, large) {
    const sub = topic.subtype || 'Bar Chart';
    const s = hashSeed(topic.id + sub);
    const v1 = 22 + (s % 45);
    const v2 = 35 + ((s >> 3) % 50);
    const v3 = 18 + ((s >> 6) % 55);
    const v4 = 48 + ((s >> 9) % 42);
    const hCls = large ? 'w-full h-64 sm:h-72' : 'w-full h-36';

    if (sub === 'Line Graph') {
      return `<svg viewBox="0 0 360 180" class="${hCls} rounded-2xl bg-white border border-amber-200/80 p-2">
        <line x1="40" y1="20" x2="40" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="40" y1="150" x2="335" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
        <polyline fill="none" stroke="#0d9488" stroke-width="3" points="50,${145 - v1} 135,${145 - v2} 225,${145 - v3} 320,${145 - v4}"/>
        <polyline fill="none" stroke="#f97316" stroke-width="3" stroke-dasharray="5,3" points="50,${145 - v3} 135,${145 - v1} 225,${145 - v4} 320,${145 - v2}"/>
        <circle cx="50" cy="${145 - v1}" r="4" fill="#0d9488"/><circle cx="135" cy="${145 - v2}" r="4" fill="#0d9488"/><circle cx="225" cy="${145 - v3}" r="4" fill="#0d9488"/><circle cx="320" cy="${145 - v4}" r="4" fill="#0d9488"/>
        <text x="45" y="168" font-size="10" fill="#475569">2010</text><text x="125" y="168" font-size="10" fill="#475569">2015</text><text x="215" y="168" font-size="10" fill="#475569">2020</text><text x="305" y="168" font-size="10" fill="#475569">2025</text>
        <text x="50" y="16" font-size="10" font-weight="bold" fill="#0f766e">● Nhóm A (%)   --- Nhóm B (%)</text>
      </svg>`;
    }
    if (sub === 'Pie Chart') {
      const total = v1 + v2 + v3 + 25;
      const p1 = Math.round((v1 / total) * 100), p2 = Math.round((v2 / total) * 100), p3 = Math.round((v3 / total) * 100), p4 = Math.max(5, 100 - p1 - p2 - p3);
      return `<svg viewBox="0 0 360 180" class="${hCls} rounded-2xl bg-white border border-amber-200/80 p-2">
        <circle cx="105" cy="92" r="54" fill="#0ea5e9"/>
        <path d="M105,92 L105,38 A54,54 0 0,1 156,110 Z" fill="#10b981"/>
        <path d="M105,92 L156,110 A54,54 0 0,1 72,135 Z" fill="#f59e0b"/>
        <circle cx="105" cy="92" r="22" fill="#ffffff"/>
        <text x="185" y="55" font-size="11" font-weight="bold" fill="#0f172a">Cơ cấu tỷ trọng (%)</text>
        <text x="185" y="80" font-size="10" fill="#0284c7">■ Lĩnh vực A: ${p1}%</text>
        <text x="185" y="100" font-size="10" fill="#059669">■ Lĩnh vực B: ${p2}%</text>
        <text x="185" y="120" font-size="10" fill="#d97706">■ Lĩnh vực C: ${p3}%</text>
        <text x="185" y="140" font-size="10" fill="#64748b">■ Khác: ${p4}%</text>
      </svg>`;
    }
    if (sub === 'Table') {
      return `<svg viewBox="0 0 360 180" class="${hCls} rounded-2xl bg-white border border-amber-200/80 p-2">
        <rect x="20" y="20" width="320" height="28" rx="6" fill="#0f172a"/>
        <text x="32" y="38" font-size="10" font-weight="bold" fill="#fff">Quốc gia / Nhóm</text>
        <text x="155" y="38" font-size="10" font-weight="bold" fill="#5eead4">2015</text>
        <text x="220" y="38" font-size="10" font-weight="bold" fill="#fde047">2020</text>
        <text x="285" y="38" font-size="10" font-weight="bold" fill="#fda4af">2025</text>
        ${[['Nhóm Bắc Âu', v1, v1 + 12, v1 + 24], ['Nhóm Đông Á', v2, v2 + 9, v2 + 19], ['Nhóm Bắc Mỹ', v3, v3 + 14, v3 + 21], ['Trung bình TG', 31, 42, 56]].map((r, idx) => `
          <rect x="20" y="${52 + idx * 28}" width="320" height="26" fill="${idx % 2 === 0 ? '#f8fafc' : '#eff6ff'}"/>
          <text x="32" y="${69 + idx * 28}" font-size="10" font-weight="bold" fill="#1e293b">${r[0]}</text>
          <text x="155" y="${69 + idx * 28}" font-size="10" fill="#334155">${r[1]}%</text>
          <text x="220" y="${69 + idx * 28}" font-size="10" fill="#334155">${r[2]}%</text>
          <text x="285" y="${69 + idx * 28}" font-size="10" font-weight="bold" fill="#0f766e">${r[3]}%</text>
        `).join('')}
      </svg>`;
    }
    if (sub === 'Map') {
      return `<svg viewBox="0 0 360 180" class="${hCls} rounded-2xl bg-emerald-50/60 border border-emerald-200 p-2">
        <rect x="16" y="22" width="150" height="136" rx="10" fill="#ecfdf5" stroke="#10b981"/>
        <rect x="194" y="22" width="150" height="136" rx="10" fill="#eff6ff" stroke="#0284c7"/>
        <text x="58" y="38" font-size="10" font-weight="bold" fill="#065f46">NĂM 1995</text>
        <text x="232" y="38" font-size="10" font-weight="bold" fill="#075985">HIỆN NAY</text>
        <rect x="30" y="52" width="52" height="34" rx="5" fill="#bbf7d0"/><text x="36" y="72" font-size="8.5" fill="#064e3b">Farmland</text>
        <rect x="96" y="52" width="56" height="34" rx="5" fill="#fde68a"/><text x="104" y="72" font-size="8.5" fill="#78350f">Old Port</text>
        <rect x="30" y="100" width="122" height="42" rx="6" fill="#bae6fd"/><text x="64" y="125" font-size="9" fill="#0c4a6e">River &amp; Ferry</text>
        <rect x="208" y="52" width="56" height="34" rx="5" fill="#c7d2fe"/><text x="213" y="72" font-size="8.5" fill="#312e81">Eco Park</text>
        <rect x="274" y="52" width="58" height="34" rx="5" fill="#fecdd3"/><text x="280" y="72" font-size="8.5" fill="#881337">Marina</text>
        <rect x="208" y="100" width="124" height="42" rx="6" fill="#99f6e4"/><text x="225" y="125" font-size="8.5" font-weight="bold" fill="#134e4a">Metro Bridge &amp; Mall</text>
      </svg>`;
    }
    if (sub === 'Process') {
      return `<svg viewBox="0 0 360 180" class="${hCls} rounded-2xl bg-slate-50 border border-slate-200 p-2">
        ${[['1. Thu gom', 20, 35, '#dbeafe'], ['2. Phân loại', 135, 35, '#dcfce7'], ['3. Nung chảy', 250, 35, '#fef3c7'], ['4. Định hình', 75, 110, '#fae8ff'], ['5. Kiểm định & Giao', 200, 110, '#ccfbf1']].map(st => `
          <rect x="${st[1]}" y="${st[2]}" width="92" height="44" rx="10" fill="${st[3]}" stroke="#64748b"/>
          <text x="${st[1] + 10}" y="${st[2] + 26}" font-size="9.5" font-weight="bold" fill="#0f172a">${st[0]}</text>
        `).join('')}
        <line x1="112" y1="57" x2="135" y2="57" stroke="#0f766e" stroke-width="2.5"/>
        <line x1="227" y1="57" x2="250" y2="57" stroke="#0f766e" stroke-width="2.5"/>
        <line x1="167" y1="132" x2="200" y2="132" stroke="#0f766e" stroke-width="2.5"/>
      </svg>`;
    }
    // Default Bar Chart
    return `<svg viewBox="0 0 360 180" class="${hCls} rounded-2xl bg-white border border-amber-200/80 p-2">
      <line x1="40" y1="18" x2="40" y2="148" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="40" y1="148" x2="338" y2="148" stroke="#94a3b8" stroke-width="1.5"/>
      ${[[62, v1, '#f97316', '2012'], [132, v2, '#0d9488', '2016'], [202, v3, '#0284c7', '2020'], [272, v4, '#7c3aed', '2025']].map(b => `
        <rect x="${b[0]}" y="${148 - b[1]}" width="38" height="${b[1]}" rx="5" fill="${b[2]}"/>
        <text x="${b[0] + 6}" y="${142 - b[1]}" font-size="9.5" font-weight="bold" fill="#0f172a">${b[1]}%</text>
        <text x="${b[0] + 6}" y="164" font-size="10" fill="#475569">${b[3]}</text>
      `).join('')}
    </svg>`;
  };

  function buildWritingCoachingData(topic) {
    const isT1 = topic.taskType === 'task1';
    const bandTag = topic.bandGroup || '6.5-7.5';
    const titleClean = String(topic.title || 'Modern Trends').replace(/^#\d+\s*•\s*[A-C][12]\s*—\s*/i, '');

    if (isT1) {
      return {
        sentences: [
          {
            vi: `Biểu đồ cung cấp thông tin so sánh chi tiết về ${titleClean.toLowerCase()} trong giai đoạn khảo sát.`,
            en: `The ${topic.subtype.toLowerCase()} illustrates comparative data regarding ${titleClean.toLowerCase()} over the surveyed period.`,
            vocab: ['illustrates comparative data: minh họa dữ liệu so sánh', 'surveyed period: giai đoạn khảo sát']
          },
          {
            vi: 'Nhìn chung, xu hướng nổi bật nhất là sự tăng trưởng ổn định ở nhóm dẫn đầu trong khi nhóm truyền thống giảm nhẹ.',
            en: 'Overall, the most striking trend is a steady upward trajectory in the leading category, whereas traditional segments experienced a modest decline.',
            vocab: ['striking trend: xu hướng nổi bật', 'upward trajectory: quỹ đạo tăng trưởng', 'modest decline: sự giảm nhẹ']
          },
          {
            vi: 'Ở giai đoạn đầu, tỷ lệ khởi điểm chỉ ở mức trung bình nhưng đã bứt phá mạnh mẽ vào nửa sau của chu kỳ.',
            en: 'Initially, the baseline figure stood at a moderate level before surging remarkably during the latter half of the timeframe.',
            vocab: ['baseline figure: số liệu khởi điểm', 'surging remarkably: tăng vọt đáng kể']
          },
          {
            vi: 'Ngược lại, sự chênh lệch giữa các nhóm còn lại dần thu hẹp vào năm cuối cùng của bảng số liệu.',
            en: 'By contrast, the disparity among the remaining categories narrowed considerably by the final year of the projection.',
            vocab: ['By contrast: ngược lại', 'disparity: sự chênh lệch', 'narrowed considerably: thu hẹp đáng kể']
          }
        ],
        sections: [
          { key: 'intro', name: '1. Introduction (Mở bài — Paraphrase đề)', tip: 'Viết 1–2 câu giới thiệu lại nội dung biểu đồ bằng từ đồng nghĩa (illustrate / compare / depict), tuyệt đối không chép nguyên văn đề.', sample: `The ${topic.subtype.toLowerCase()} compares key figures for ${titleClean.toLowerCase()} across the given timeframe.` },
          { key: 'overview', name: '2. Overview (Tổng quan — Quan trọng nhất để đạt 7.0+)', tip: 'Nêu 2 đặc điểm nổi bật nhất (xu hướng tăng/giảm chính & nhóm cao nhất/thấp nhất). Không đưa số liệu cụ thể vào Overview.', sample: 'Overall, it is clear that modern sectors witnessed substantial growth, while conventional categories accounted for a smaller share by the end of the period.' },
          { key: 'body1', name: '3. Body Paragraph 1 (Thân bài 1 — Nhóm số liệu nổi bật)', tip: 'Mô tả chi tiết nhóm có số liệu cao nhất hoặc tăng mạnh nhất, trích dẫn số liệu mốc đầu và mốc cuối chính xác.', sample: 'Looking first at the primary category, figures rose markedly from roughly one-quarter at the beginning to well over half by the end of the survey.' },
          { key: 'body2', name: '4. Body Paragraph 2 (Thân bài 2 — So sánh nhóm còn lại)', tip: 'Sử dụng từ nối đối lập (In contrast, Meanwhile, Respectively) để so sánh các nhóm còn lại.', sample: 'Meanwhile, the remaining groups followed a more gradual pattern, stabilizing within a narrow range throughout the final years.' }
        ]
      };
    }

    return {
      sentences: [
        {
          vi: `Trong kỷ nguyên hiện đại, chủ đề "${titleClean}" đang thu hút nhiều luồng quan điểm trái chiều từ cộng đồng.`,
          en: `In the contemporary era, the issue of ${titleClean.toLowerCase()} has sparked considerable debate among policymakers and the public alike.`,
          vocab: ['contemporary era: kỷ nguyên hiện đại', 'sparked considerable debate: làm dấy lên tranh luận sôi nổi']
        },
        {
          vi: 'Một mặt, những người ủng hộ nhấn mạnh lợi ích thiết thực về hiệu suất kinh tế và khả năng tiếp cận tri thức.',
          en: 'On the one hand, proponents emphasize tangible benefits in terms of economic productivity and broader access to knowledge.',
          vocab: ['proponents: những người ủng hộ', 'tangible benefits: lợi ích thiết thực']
        },
        {
          vi: 'Mặt khác, nếu thiếu sự quản lý hợp lý, xu hướng này có thể tạo ra áp lực tâm lý và gia tăng khoảng cách xã hội.',
          en: 'On the other hand, without proper regulation, this trend may generate psychological pressure and widen social disparities.',
          vocab: ['proper regulation: sự quản lý hợp lý', 'widen social disparities: nới rộng khoảng cách xã hội']
        },
        {
          vi: 'Tóm lại, tôi tin rằng giải pháp bền vững nhất là kết hợp đổi mới công nghệ với định hướng giáo dục nhân văn.',
          en: 'In conclusion, I firmly believe that the most sustainable approach is to balance technological innovation with human-centered education.',
          vocab: ['sustainable approach: hướng tiếp cận bền vững', 'human-centered: lấy con người làm trung tâm']
        }
      ],
      sections: [
        { key: 'intro', name: '1. Introduction (Mở bài — Background + Thesis Statement)', tip: `Paraphrase lại câu hỏi chủ đề (${bandTag}) và nêu rõ quan điểm cá nhân hoặc định hướng bài viết ở câu Thesis.`, sample: `It is widely debated whether ${titleClean.toLowerCase()} brings predominantly positive or negative outcomes. While there are valid concerns, I contend that balanced implementation yields substantial long-term benefits.` },
        { key: 'body1', name: '2. Body Paragraph 1 (Luận điểm 1 + Giải thích + Ví dụ)', tip: 'Mở đầu bằng Topic Sentence rõ ràng → Giải thích nguyên nhân/cơ chế → Đưa ví dụ thực tế cụ thể.', sample: 'First and foremost, adopting progressive practices in this domain significantly enhances efficiency and opens up equitable opportunities for learners and workers.' },
        { key: 'body2', name: '3. Body Paragraph 2 (Luận điểm 2 / Phản biện cân bằng)', tip: 'Phát triển luận điểm thứ hai hoặc phân tích mặt trái kèm giải pháp khắc phục để đạt điểm Task Response 7.5+.', sample: 'Nevertheless, potential drawbacks such as over-reliance and unequal access must be mitigated through transparent policies and practical training.' },
        { key: 'conclusion', name: '4. Conclusion (Kết bài — Khẳng định lại Thesis)', tip: 'Tóm tắt lại 2 ý chính và khẳng định lại quan điểm bằng cấu trúc từ vựng khác, không mở rộng ý mới.', sample: 'In conclusion, despite minor transitional challenges, thoughtful adoption of these measures clearly outweighs the drawbacks.' }
      ]
    };
  }

  function ensureWritingMegaCatalog() {
    if (_wrCatalogBuilt) return;
    _wrCatalogBuilt = true;
    const baseList = Array.isArray(state.writingList) ? state.writingList : [];
    const out = [];

    // 1. Preserve all 408 existing topics and enrich them with luyennguphap metadata
    baseList.forEach((w, idx) => {
      const isT1 = String(w.type || '').toLowerCase().includes('task 1') || idx % 3 === 0;
      const subtype = isT1 ? TASK1_SUBTYPES[idx % TASK1_SUBTYPES.length] : TASK2_SUBTYPES[idx % TASK2_SUBTYPES.length];
      const bandGroup = idx % 3 === 0 ? '0-6.5' : idx % 3 === 1 ? '6.5-7.5' : '8.0';
      out.push({
        ...w,
        taskType: isT1 ? 'task1' : 'task2',
        subtype,
        bandGroup,
        minWords: isT1 ? 150 : 250,
        targetWords: isT1 ? 190 : 290
      });
    });

    // 2. Top up to 540 rich topics (ensuring >= 220 Task 1 + >= 320 Task 2 = 540 total!)
    let curT1 = out.filter(x => x.taskType === 'task1').length;
    let seq = 1;
    while (curT1 < 220) {
      const dom = T1_DOMAINS[(seq - 1) % T1_DOMAINS.length];
      const sub = TASK1_SUBTYPES[(seq - 1) % TASK1_SUBTYPES.length];
      const bandGroup = BAND_FILTERS[1 + ((seq - 1) % 3)];
      out.push({
        id: `lnp-wt1-${seq}`,
        difficulty: 100 + seq,
        cefr: bandGroup === '0-6.5' ? 'B1' : bandGroup === '6.5-7.5' ? 'B2' : 'C1',
        type: `IELTS Writing Task 1 • ${sub}`,
        taskType: 'task1',
        subtype: sub,
        bandGroup,
        minWords: 150,
        targetWords: 190,
        title: `${dom[0]} (${sub} #${seq})`,
        prompt: `The ${sub.toLowerCase()} below shows ${dom[1]} across ${dom[2]} from ${dom[3]}. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.`,
        outline: ['Introduction: Paraphrase đề bài', 'Overview: 2 xu hướng lớn nhất', 'Body 1: Nhóm số liệu cao/tăng mạnh', 'Body 2: Nhóm đối lập/ổn định']
      });
      curT1++;
      seq++;
    }

    while (out.length < 540) {
      const th = T2_THEMES[(seq - 1) % T2_THEMES.length];
      const sub = TASK2_SUBTYPES[(seq - 1) % TASK2_SUBTYPES.length];
      const bandGroup = BAND_FILTERS[1 + ((seq - 1) % 3)];
      const qTail = sub === 'Opinion'
        ? 'To what extent do you agree or disagree with this statement?'
        : sub === 'Discussion'
          ? 'Discuss both these views and give your own opinion.'
          : sub === 'Advantages & Disadvantages'
            ? 'Do the advantages of this development outweigh the disadvantages?'
            : sub === 'Problem & Solution'
              ? 'What are the primary causes of this issue, and what measures can be taken to resolve it?'
              : 'Why is this happening, and is it a positive or negative development?';
      out.push({
        id: `lnp-wt2-${seq}`,
        difficulty: 300 + seq,
        cefr: bandGroup === '0-6.5' ? 'B1' : bandGroup === '6.5-7.5' ? 'B2' : 'C1',
        type: `IELTS Writing Task 2 • ${sub}`,
        taskType: 'task2',
        subtype: sub,
        bandGroup,
        minWords: 250,
        targetWords: 290,
        title: `${th[0]} (${sub} #${seq})`,
        prompt: `${th[1]} ${qTail}`,
        outline: ['Introduction: Paraphrase + Thesis', 'Body 1: Luận điểm chính + Ví dụ', 'Body 2: Góc nhìn mở rộng / Phản biện', 'Conclusion: Khẳng định lại quan điểm']
      });
      seq++;
    }

    _wrTopics = out;
    state.writingList = out;

    // 3. Build 120 Academic Paraphrase Sets
    const paraSeeds = [
      ['Governments should invest more money in public transport.', 'Authorities ought to allocate greater financial resources to mass transit systems.', 'allocate financial resources (phân bổ nguồn lực tài chính), mass transit systems (hệ thống giao thông công cộng)'],
      ['Many people believe that university education should be free for everyone.', 'It is widely argued that tertiary education ought to be universally accessible without tuition fees.', 'tertiary education (giáo dục đại học), tuition fees (học phí)'],
      ['The chart shows the percentage of households with internet access.', 'The graph illustrates the proportion of domestic residences equipped with online connectivity.', 'proportion (tỷ lệ), domestic residences (hộ gia đình)'],
      ['Children spend too much time playing video games nowadays.', 'Contemporary youngsters devote an excessive amount of leisure time to electronic gaming.', 'devote an excessive amount of (dành quá nhiều), electronic gaming (trò chơi điện tử)'],
      ['Air pollution in big cities is becoming worse every year.', 'Atmospheric contamination in metropolitan areas is deteriorating annually.', 'atmospheric contamination (ô nhiễm không khí), deteriorating (trầm trọng hơn)'],
      ['Working from home has both benefits and drawbacks for employees.', 'Telecommuting presents both merits and demerits for members of the workforce.', 'telecommuting (làm việc từ xa), merits and demerits (ưu và nhược điểm)'],
      ['Tourists can damage historical sites if visitor numbers are not controlled.', 'Unregulated tourism can inflict irreversible harm on cultural heritage landmarks.', 'unregulated tourism (du lịch thiếu kiểm soát), cultural heritage landmarks (di sản văn hóa)'],
      ['Fast food consumption leads to serious health problems such as obesity.', 'Frequent intake of processed convenience meals contributes to chronic ailments including obesity.', 'frequent intake (tiêu thụ thường xuyên), chronic ailments (bệnh mãn tính)'],
      ['Sales of electric cars rose sharply between 2018 and 2024.', 'Purchases of battery-powered vehicles experienced a dramatic surge from 2018 to 2024.', 'experienced a dramatic surge (tăng vọt mạnh mẽ), battery-powered vehicles (xe điện)'],
      ['Schools should teach practical life skills alongside academic subjects.', 'Educational institutions ought to integrate pragmatic life competencies into the core curriculum.', 'pragmatic life competencies (kỹ năng sống thực tiễn), core curriculum (chương trình chính khóa)']
    ];
    _wrParaphrases = [];
    for (let i = 0; i < 120; i++) {
      const base = paraSeeds[i % paraSeeds.length];
      const method = ['Dùng từ đồng nghĩa học thuật (Academic Synonyms)', 'Đổi cấu trúc Chủ động ↔ Bị động', 'Danh hóa cụm động từ (Nominalization)', 'Đổi cấu trúc Mệnh đề nhượng bộ / Nguyên nhân'][i % 4];
      _wrParaphrases.push({
        id: `para-${i + 1}`,
        idx: i + 1,
        method,
        band: i % 3 === 0 ? '6.5+' : i % 3 === 1 ? '7.5+' : '8.0+',
        source: base[0],
        model: base[1],
        hint: base[2]
      });
    }
  }

  function ensureWritingV13State() {
    ensureWritingMegaCatalog();
    if (!state.wrTab) state.wrTab = 'task2'; // 'task1' | 'task2' | 'paraphrase' | 'mine'
    if (!state.wrBandFilter) state.wrBandFilter = 'ALL';
    if (!state.wrSubFilter) state.wrSubFilter = 'ALL';
    if (!state.wrPracticeView) state.wrPracticeView = 'hub'; // 'hub' | 'translate' | 'sections'
    if (!state.wrActiveTopicId) state.wrActiveTopicId = '';
    if (!state.wrModalTopicId) state.wrModalTopicId = '';
    if (!state.wrSentDrafts) state.wrSentDrafts = {};
    if (!state.wrSentResults) state.wrSentResults = {};
    if (!state.wrSecDrafts) state.wrSecDrafts = {};
    if (!state.wrParaDrafts) state.wrParaDrafts = {};
    if (!state.wrParaResults) state.wrParaResults = {};
    if (!state.wrZoomChart) state.wrZoomChart = false;
  }

  // Exact "CHỌN CHẾ ĐỘ" Modal matching Screenshot 15
  window.openWritingModeModal = function (topicId) {
    ensureWritingV13State();
    state.wrModalTopicId = topicId;
    render();
  };

  window.closeWritingModeModal = function () {
    state.wrModalTopicId = '';
    render();
  };

  window.startWritingPracticeMode = function (topicId, mode) {
    ensureWritingV13State();
    state.wrActiveTopicId = topicId;
    state.writingId = topicId;
    state.wrModalTopicId = '';
    state.wrPracticeView = mode; // 'translate' | 'sections'
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function computeTokenSimilarity(a, b) {
    const tok = s => String(s || '').toLowerCase().replace(/[^a-z0-9\s']/g, ' ').split(/\s+/).filter(w => w.length > 2);
    const setA = new Set(tok(a));
    const setB = new Set(tok(b));
    if (!setA.size || !setB.size) return 0;
    let hit = 0;
    setA.forEach(w => { if (setB.has(w)) hit++; });
    return hit / Math.max(1, Math.min(setA.size, setB.size));
  }

  window.gradeSentenceTranslation = async function (topicId, sIdx) {
    ensureWritingV13State();
    const topic = _wrTopics.find(x => x.id === topicId);
    if (!topic) return;
    const coach = buildWritingCoachingData(topic);
    const item = coach.sentences[sIdx];
    const key = `${topicId}_${sIdx}`;
    const draft = String(state.wrSentDrafts[key] || '').trim();
    if (draft.split(/\s+/).filter(Boolean).length < 4) {
      notify('⚠️ Hãy dịch đầy đủ câu tiếng Anh (ít nhất 4 từ) trước khi chấm nhé!');
      return;
    }

    const sim = computeTokenSimilarity(draft, item.en);
    const baseBand = Math.min(8.5, Math.max(5.0, Math.round((5.5 + sim * 3.0) * 2) / 2));
    state.wrSentResults[key] = {
      band: baseBand,
      feedback: 'Đang đối chiếu cấu trúc ngữ pháp & từ vựng học thuật với câu mẫu...',
      model: item.en
    };
    render();

    if (typeof callGoogleHydrogenAi === 'function' && typeof getActiveGeminiApiKey === 'function' && getActiveGeminiApiKey()) {
      const aiRes = await callGoogleHydrogenAi(
        `Chấm câu dịch Việt -> Anh IELTS Writing sau bằng tiếng Việt ngắn gọn (3 câu: Điểm Band 0-9, ưu điểm, cách sửa nâng band).\nCâu gốc tiếng Việt: ${item.vi}\nBản dịch của học viên: ${draft}\nCâu mẫu Band 8.0: ${item.en}`,
        { thinkingLevel: 'low', maxTokens: 320 }
      );
      if (aiRes && aiRes.text) {
        state.wrSentResults[key].feedback = `⚡ [${aiRes.model}] ${aiRes.text}`;
        render();
        return;
      }
    }
    state.wrSentResults[key].feedback = sim >= 0.55
      ? `✅ Bản dịch bám sát ý nghĩa và dùng tốt cấu trúc học thuật (Ước tính Band ${baseBand}). Hãy đối chiếu thêm cụm từ nâng cao ở câu mẫu bên dưới!`
      : `💡 Bản dịch đã truyền tải ý cơ bản (Ước tính Band ${baseBand}). Bạn nên bổ sung các cụm học thuật gợi ý để câu văn tự nhiên chuẩn IELTS 7.5+ hơn.`;
    render();
  };

  window.gradeFullSectionsWriting = async function (topicId) {
    ensureWritingV13State();
    const topic = _wrTopics.find(x => x.id === topicId);
    if (!topic) return;
    const coach = buildWritingCoachingData(topic);
    const combined = coach.sections.map(sec => String(state.wrSecDrafts[`${topicId}_${sec.key}`] || '').trim()).filter(Boolean).join('\n\n');
    const fullText = combined || String(state.writingDrafts[topicId] || '').trim();
    const wc = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;
    if (wc < 20) {
      notify('⚠️ Hãy viết ít nhất 20 từ ở các đoạn (hoặc ô bài viết hoàn chỉnh) để AI chấm điểm IELTS!');
      return;
    }
    state.writingDrafts[topicId] = fullText;
    state.writingText = fullText;
    const localScore = evaluateWithExamAi({
      text: fullText,
      skill: 'writing',
      keywords: topic.title.split(/\W+/).filter(w => w.length > 4),
      minWords: topic.minWords || 150
    });
    const bandVal = localScore.overallBand ?? localScore.band ?? 6.5;
    localScore.band = bandVal;
    state.writingResult = localScore;
    state.completedItems.writing[topicId] = bandVal;
    if (typeof saveLearningProgressNow === 'function') saveLearningProgressNow();

    if (typeof callGoogleHydrogenAi === 'function' && typeof getActiveGeminiApiKey === 'function' && getActiveGeminiApiKey()) {
      notify('⚡ Đang chấm chi tiết 4 tiêu chí IELTS bằng Google Gemini 4 Hydrogen...');
      const aiRes = await callGoogleHydrogenAi(
        `Bạn là giám khảo IELTS Writing. Hãy chấm bài viết sau theo 4 tiêu chí (Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy), cho Band 0-9.0 và gợi ý sửa 2 câu cụ thể bằng tiếng Việt.\nĐề bài: ${topic.prompt}\nBài làm (${wc} từ):\n${fullText}`,
        { thinkingLevel: 'low', maxTokens: 700 }
      );
      if (aiRes && aiRes.text) {
        state.writingResult.aiDeepFeedback = `⚡ Nhận xét chuyên sâu từ ${aiRes.model}:\n${aiRes.text}`;
      }
    }
    notify(`🎉 Đã chấm bài Writing: IELTS Band ${bandVal} / 9.0 (${wc} từ)!`);
    render();
  };

  window.gradeParaphraseDrill = function (paraId) {
    ensureWritingV13State();
    const item = _wrParaphrases.find(x => x.id === paraId);
    if (!item) return;
    const draft = String(state.wrParaDrafts[paraId] || '').trim();
    if (draft.split(/\s+/).filter(Boolean).length < 4) {
      notify('⚠️ Hãy nhập câu Paraphrase của bạn trước khi kiểm tra!');
      return;
    }
    const simSource = computeTokenSimilarity(draft, item.source);
    const simModel = computeTokenSimilarity(draft, item.model);
    const band = simModel >= 0.45 ? 8.0 : simSource < 0.85 ? 7.0 : 6.0;
    state.wrParaResults[paraId] = {
      band,
      note: simSource > 0.88
        ? '⚠️ Câu của bạn còn trùng khá nhiều từ gốc. Hãy thay thế bằng các cụm đồng nghĩa học thuật bên dưới!'
        : `✅ Tuyệt vời! Bạn đã biến đổi cấu trúc hiệu quả (Ước tính Paraphrase Band ${band}).`
    };
    state.completedItems.writing[paraId] = band;
    if (typeof saveLearningProgressNow === 'function') saveLearningProgressNow();
    render();
  };

  window.renderWritingV13 = function (v) {
    ensureWritingV13State();

    // PRACTICE VIEW 1: DỊCH BÀI THEO BAND (Sentence-by-sentence VI -> EN)
    if (state.wrPracticeView === 'translate') {
      const topic = _wrTopics.find(x => x.id === state.wrActiveTopicId) || _wrTopics[0];
      const coach = buildWritingCoachingData(topic);
      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <button onclick="state.wrPracticeView='hub';render()" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold cursor-pointer hover:border-teal-500">← Danh sách 540+ đề Writing</button>
            <div class="flex gap-2">
              <button onclick="state.wrPracticeView='sections';render()" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-extrabold cursor-pointer">📄 Chuyển sang chế độ Viết đoạn →</button>
            </div>
          </div>

          <div class="grid lg:grid-cols-12 gap-5 items-start">
            <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-sm lg:sticky lg:top-20">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold">${escapeHtml(topic.subtype)} • Band ${escapeHtml(topic.bandGroup)}</span>
                <span class="text-xs font-bold text-teal-700">✏️ Dịch bài theo Band</span>
              </div>
              <h1 class="text-lg font-black text-slate-900">${escapeHtml(topic.title)}</h1>
              <p class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">${escapeHtml(topic.prompt)}</p>
              ${topic.taskType === 'task1' ? `<div>${renderWritingChartSvg(topic, true)}</div>` : ''}
            </div>

            <div class="lg:col-span-7 space-y-3.5">
              <div class="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 text-xs text-teal-950 font-semibold">
                💡 <strong>Phương pháp Dịch bài theo Band (Chuẩn Luyện Ngữ Pháp):</strong> Dịch từng câu tiếng Việt sang tiếng Anh học thuật dựa trên từ vựng gợi ý, bấm <strong>Chấm câu</strong> để AI sửa lỗi & đối chiếu câu mẫu Band 8.0+.
              </div>
              ${coach.sentences.map((s, idx) => {
                const key = `${topic.id}_${idx}`;
                const res = state.wrSentResults[key];
                return `
                  <div class="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 text-xs shadow-sm">
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-extrabold">Câu ${idx + 1}/${coach.sentences.length}</span>
                      ${res ? `<span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black">🎯 Band ~${res.band}</span>` : ''}
                    </div>
                    <div class="text-sm font-bold text-slate-900 leading-relaxed">🇻🇳 ${escapeHtml(s.vi)}</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${s.vocab.map(vc => `<span class="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-semibold">✨ ${escapeHtml(vc)}</span>`).join('')}
                    </div>
                    <textarea rows="2" oninput="state.wrSentDrafts['${key}']=this.value" placeholder="Gõ câu dịch tiếng Anh của bạn tại đây..." class="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-teal-500">${escapeHtml(state.wrSentDrafts[key] || '')}</textarea>
                    <div class="flex justify-end">
                      <button onclick="gradeSentenceTranslation('${topic.id}', ${idx})" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold cursor-pointer">🤖 AI Chấm câu ${idx + 1}</button>
                    </div>
                    ${res ? `
                      <div class="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5 text-slate-800">
                        <div class="whitespace-pre-line">${escapeHtml(res.feedback)}</div>
                        <div class="pt-1 border-t border-emerald-200/70"><strong>🇬🇧 Câu mẫu Band 8.0+:</strong> <span class="font-semibold text-teal-900">${escapeHtml(res.model)}</span></div>
                      </div>` : ''}
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>`;
      return;
    }

    // PRACTICE VIEW 2: VIẾT ĐOẠN (Section-by-section coaching + Full IELTS Grading)
    if (state.wrPracticeView === 'sections') {
      const topic = _wrTopics.find(x => x.id === state.wrActiveTopicId) || _wrTopics[0];
      const coach = buildWritingCoachingData(topic);
      const fullDraft = coach.sections.map(sec => String(state.wrSecDrafts[`${topic.id}_${sec.key}`] || '').trim()).filter(Boolean).join('\n\n') || String(state.writingDrafts[topic.id] || '');
      const wc = fullDraft.trim() ? fullDraft.trim().split(/\s+/).length : 0;

      v.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <button onclick="state.wrPracticeView='hub';render()" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold cursor-pointer hover:border-teal-500">← Danh sách 540+ đề Writing</button>
            <div class="flex flex-wrap items-center gap-2">
              ${typeof examTimerBarHtml === 'function' ? examTimerBarHtml([20, 40]) : ''}
              <button onclick="state.wrPracticeView='translate';render()" class="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-extrabold cursor-pointer">✏️ Chuyển sang Dịch theo Band</button>
            </div>
          </div>

          <div class="grid lg:grid-cols-12 gap-5 items-start">
            <!-- Left: Prompt + Visual Chart + Section Guide -->
            <div class="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 space-y-3.5 shadow-sm lg:sticky lg:top-20">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-[11px] font-extrabold">${escapeHtml(topic.type || topic.subtype)}</span>
                <span class="font-mono text-xs font-bold ${wc >= topic.minWords ? 'text-emerald-600' : 'text-amber-600'}">${wc} / ${topic.minWords}+ từ</span>
              </div>
              <h1 class="text-lg font-black text-slate-900">${escapeHtml(topic.title)}</h1>
              <p class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">${escapeHtml(topic.prompt)}</p>
              ${topic.taskType === 'task1' ? `
                <div class="space-y-1.5">
                  ${renderWritingChartSvg(topic, true)}
                </div>` : ''}
              <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <div class="font-extrabold text-amber-950">🧭 Cấu trúc đạt Band ${escapeHtml(topic.bandGroup)}:</div>
                ${coach.sections.map(sec => `<div class="text-slate-700">• <strong>${escapeHtml(sec.name)}:</strong> ${escapeHtml(sec.tip)}</div>`).join('')}
              </div>
            </div>

            <!-- Right: Paragraph-by-paragraph Boxes + AI Grading -->
            <div class="lg:col-span-7 space-y-3.5">
              ${coach.sections.map(sec => {
                const sKey = `${topic.id}_${sec.key}`;
                return `
                  <div class="bg-white rounded-3xl border border-slate-200 p-5 space-y-2.5 text-xs shadow-sm">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <span class="font-black text-sm text-slate-900">${escapeHtml(sec.name)}</span>
                      <button type="button" onclick="state.wrSecDrafts['${sKey}']=${JSON.stringify(sec.sample).replace(/"/g, '&quot;')};render()" class="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-bold cursor-pointer">✨ Chèn khung mẫu tham khảo</button>
                    </div>
                    <p class="text-slate-500">${escapeHtml(sec.tip)}</p>
                    <textarea rows="3" oninput="state.wrSecDrafts['${sKey}']=this.value" placeholder="Viết phần ${escapeHtml(sec.name)} bằng tiếng Anh..." class="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-teal-500">${escapeHtml(state.wrSecDrafts[sKey] || '')}</textarea>
                  </div>`;
              }).join('')}

              <div class="flex flex-wrap justify-between items-center gap-3 bg-white rounded-2xl border border-slate-200 p-4">
                <span class="text-xs font-bold text-slate-600">⚡ Chấm theo 4 tiêu chí IELTS bằng <strong>Gemini 4 Hydrogen</strong> (tự động dự phòng Offline AI)</span>
                <button onclick="gradeFullSectionsWriting('${topic.id}')" class="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black cursor-pointer shadow-lg">🤖 Nộp Bài & Chấm IELTS Band 0–9.0</button>
              </div>

              ${state.writingResult ? `
                <div class="space-y-3">
                  ${typeof renderAiScoreCard === 'function' ? renderAiScoreCard(state.writingResult) : ''}
                  ${state.writingResult.aiDeepFeedback ? `<div class="bg-slate-900 text-teal-100 rounded-3xl p-5 text-xs whitespace-pre-line leading-relaxed border border-teal-500/40">${escapeHtml(state.writingResult.aiDeepFeedback)}</div>` : ''}
                </div>` : ''}
            </div>
          </div>
        </div>`;
      return;
    }

    // HUB VIEW: 4 TOP MODE CARDS + FILTERS + PEACH HEADER TOPIC GRID (Screenshot 14) + MODAL (Screenshot 15)
    const t1Count = _wrTopics.filter(x => x.taskType === 'task1').length;
    const t2Count = _wrTopics.filter(x => x.taskType === 'task2').length;
    const myDoneIds = Object.keys(state.completedItems.writing || {});
    const subOptions = state.wrTab === 'task1' ? TASK1_SUBTYPES : TASK2_SUBTYPES;
    const q = (state.writingQuery || '').trim().toLowerCase();

    const filteredTopics = _wrTopics.filter(t => {
      if (state.wrTab === 'task1' && t.taskType !== 'task1') return false;
      if (state.wrTab === 'task2' && t.taskType !== 'task2') return false;
      if (state.wrTab === 'mine' && !state.completedItems.writing[t.id] && !state.writingDrafts[t.id]) return false;
      if (state.wrBandFilter !== 'ALL' && t.bandGroup !== state.wrBandFilter) return false;
      if (state.wrSubFilter !== 'ALL' && t.subtype !== state.wrSubFilter) return false;
      if (q && !(t.title + ' ' + t.prompt + ' ' + t.subtype).toLowerCase().includes(q)) return false;
      return true;
    });

    const perPage = 12;
    const totalPages = Math.max(1, Math.ceil(filteredTopics.length / perPage));
    state.writingPage = Math.max(1, Math.min(totalPages, state.writingPage || 1));
    const pageItems = filteredTopics.slice((state.writingPage - 1) * perPage, state.writingPage * perPage);
    const modalTopic = state.wrModalTopicId ? _wrTopics.find(x => x.id === state.wrModalTopicId) : null;

    v.innerHTML = `
      <div class="space-y-5">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span class="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-extrabold">✍️ CHUẨN 100% LUYENNGUPHAP.COM • ${_wrTopics.length} ĐỀ IELTS WRITING + ${_wrParaphrases.length} BÀI PARAPHRASE</span>
            <h1 class="text-2xl font-black text-slate-900 mt-1">Luyện Viết IELTS Theo Band & Từng Đoạn</h1>
          </div>
          <button onclick="openHydrogenAiConfigModal()" class="px-3.5 py-2 rounded-xl bg-slate-900 text-amber-300 text-xs font-extrabold cursor-pointer">⚡ ${typeof getActiveAiEngineBadgeText === 'function' ? escapeHtml(getActiveAiEngineBadgeText()) : 'Gemini 4 Hydrogen'}</button>
        </div>

        <!-- 4 TOP MODE CARDS (Giống 100% bố cục luyennguphap.com/writing) -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          ${[
            { id: 'task1', icon: '📊', title: 'Writing Task 1', sub: `${t1Count} đề Biểu đồ • Map • Process`, activeBg: 'border-orange-500 bg-orange-50/70' },
            { id: 'task2', icon: '📝', title: 'Writing Task 2', sub: `${t2Count} đề Essay học thuật`, activeBg: 'border-teal-600 bg-teal-50/70' },
            { id: 'paraphrase', icon: '🔄', title: 'Luyện Paraphrase', sub: `${_wrParaphrases.length} câu viết lại Band 7.5+`, activeBg: 'border-indigo-600 bg-indigo-50/70' },
            { id: 'mine', icon: '🗂️', title: 'Bài của tôi', sub: `${myDoneIds.length} bài đã lưu / đã chấm`, activeBg: 'border-emerald-600 bg-emerald-50/70' }
          ].map(card => `
            <button onclick="state.wrTab='${card.id}';state.wrSubFilter='ALL';state.writingPage=1;render()" class="text-left p-4 rounded-3xl border-2 transition cursor-pointer shadow-sm hover:shadow-md ${state.wrTab === card.id ? card.activeBg : 'bg-white border-slate-200'}">
              <div class="text-2xl">${card.icon}</div>
              <div class="font-black text-sm sm:text-base text-slate-900 mt-1.5">${card.title}</div>
              <div class="text-[11px] font-semibold text-slate-500 mt-0.5">${card.sub}</div>
            </button>`).join('')}
        </div>

        <!-- AI Custom Prompt Generator (Giữ nguyên tính năng sáng tạo đề theo ý muốn) -->
        <form onsubmit="generateAiWritingPrompt(event);_wrCatalogBuilt=false;ensureWritingMegaCatalog();render();" class="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-wrap gap-2 items-center text-xs shadow-sm">
          <span class="font-extrabold text-teal-800">✨ Tạo thêm đề AI bất kỳ:</span>
          <input id="ai-wr-topic" required placeholder="Nhập chủ đề muốn viết (VD: Space Tourism, Cashless Society, Nuclear Energy)..." class="flex-1 min-w-52 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200" />
          <select id="ai-wr-cefr" class="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold">
            <option value="B1">Band 0-6.5</option><option value="B2" selected>Band 6.5-7.5</option><option value="C1">Band 8.0+</option>
          </select>
          <select id="ai-wr-type" class="px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 font-bold">
            <option value="IELTS Task 2">Writing Task 2</option><option value="IELTS Task 1">Writing Task 1</option>
          </select>
          <button type="submit" class="px-4 py-2 rounded-xl bg-teal-600 text-white font-extrabold cursor-pointer">+ Tạo Đề</button>
        </form>

        ${state.wrTab === 'paraphrase' ? `
          <div class="space-y-3.5">
            <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-950 font-semibold">
              🔄 <strong>Luyện Paraphrase (${_wrParaphrases.length} bài):</strong> Viết lại câu gốc bằng từ đồng nghĩa học thuật & biến đổi cấu trúc ngữ pháp để ăn trọn điểm mở bài IELTS Writing!
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              ${_wrParaphrases.slice(0, 30).map(p => {
                const res = state.wrParaResults[p.id];
                return `
                  <div class="bg-white rounded-3xl border border-slate-200 p-5 space-y-2.5 text-xs shadow-sm">
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold">#${p.idx} • ${escapeHtml(p.method)}</span>
                      <span class="font-mono font-bold text-amber-700">Mục tiêu ${p.band}</span>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900">Câu gốc: "${escapeHtml(p.source)}"</div>
                    <div class="text-[11px] text-teal-800">💡 Gợi ý cụm từ: <strong>${escapeHtml(p.hint)}</strong></div>
                    <textarea rows="2" oninput="state.wrParaDrafts['${p.id}']=this.value" placeholder="Viết câu Paraphrase của bạn..." class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200">${escapeHtml(state.wrParaDrafts[p.id] || '')}</textarea>
                    <div class="flex justify-end">
                      <button onclick="gradeParaphraseDrill('${p.id}')" class="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold cursor-pointer">Kiểm tra & Xem câu mẫu</button>
                    </div>
                    ${res ? `<div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1"><div>${escapeHtml(res.note)}</div><div><strong>Câu mẫu Band 8.0:</strong> ${escapeHtml(p.model)}</div></div>` : ''}
                  </div>`;
              }).join('')}
            </div>
          </div>
        ` : `
          <!-- Band & Subtype Filter Bar (Giống Screenshot 14) -->
          <div class="bg-white rounded-3xl border border-slate-200 p-4 space-y-3 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-xs font-extrabold text-slate-500 mr-1">Mức Band:</span>
                ${BAND_FILTERS.map(bf => `<button onclick="state.wrBandFilter='${bf}';state.writingPage=1;render()" class="px-3.5 py-1.5 rounded-full text-xs font-extrabold cursor-pointer border ${state.wrBandFilter === bf ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'}">${bf === 'ALL' ? 'Tất cả Band' : `Band ${bf}`}</button>`).join('')}
              </div>
              <input type="text" value="${escapeHtml(state.writingQuery || '')}" oninput="state.writingQuery=this.value;state.writingPage=1;render()" placeholder="🔍 Tìm kiếm trong ${filteredTopics.length} đề viết..." class="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs w-64" />
            </div>

            ${state.wrTab !== 'mine' ? `
              <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                <span class="text-xs font-extrabold text-slate-500 mr-1">Dạng bài:</span>
                <button onclick="state.wrSubFilter='ALL';state.writingPage=1;render()" class="px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${state.wrSubFilter === 'ALL' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'}">Tất cả (${filteredTopics.length})</button>
                ${subOptions.map(sub => `<button onclick="state.wrSubFilter=${JSON.stringify(sub).replace(/"/g, '&quot;')};state.writingPage=1;render()" class="px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${state.wrSubFilter === sub ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'}">${escapeHtml(sub)}</button>`).join('')}
              </div>` : ''}
          </div>

          <!-- Topic Cards Grid (Peach Header + Chart Preview matching Screenshot 14!) -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            ${pageItems.map(t => {
              const doneBand = state.completedItems.writing[t.id];
              return `
                <div onclick="openWritingModeModal('${t.id}')" class="group bg-white rounded-3xl border border-slate-200 hover:border-orange-400 overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col">
                  <div class="p-4 border-b border-orange-100" style="background:linear-gradient(135deg,#fff7ed 0%,#ffedd5 100%);">
                    <div class="flex items-center justify-between gap-2 mb-2">
                      <span class="px-2.5 py-0.5 rounded-full bg-white text-orange-800 border border-orange-200 text-[10px] font-extrabold">${escapeHtml(t.subtype)}</span>
                      <span class="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 text-[10px] font-extrabold">Band ${escapeHtml(t.bandGroup)}</span>
                    </div>
                    ${t.taskType === 'task1' ? renderWritingChartSvg(t, false) : `
                      <div class="h-28 rounded-2xl bg-white/90 border border-orange-200/70 p-3 flex flex-col justify-between">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-teal-700">IELTS ACADEMIC ESSAY</span>
                        <p class="text-xs text-slate-700 line-clamp-3 font-medium">${escapeHtml(t.prompt)}</p>
                      </div>`}
                  </div>
                  <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 class="font-black text-sm text-slate-900 group-hover:text-orange-600 transition line-clamp-2">${escapeHtml(t.title)}</h3>
                      ${t.taskType === 'task1' ? `<p class="text-xs text-slate-500 line-clamp-2 mt-1">${escapeHtml(t.prompt)}</p>` : ''}
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-extrabold">
                      ${doneBand ? `<span class="text-emerald-700">✓ Đã chấm: Band ${doneBand}</span>` : `<span class="text-slate-500">Mục tiêu ${t.minWords}+ từ</span>`}
                      <span class="text-orange-600 group-hover:translate-x-1 transition">Chọn chế độ →</span>
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>

          <!-- Pagination -->
          <div class="flex items-center justify-center gap-3 pt-2 text-xs">
            <button onclick="state.writingPage=Math.max(1,state.writingPage-1);render();window.scrollTo({top:0,behavior:'smooth'})" ${state.writingPage <= 1 ? 'disabled' : ''} class="px-4 py-2 rounded-xl bg-white border border-slate-200 font-extrabold cursor-pointer disabled:opacity-40">← Trang trước</button>
            <span class="font-mono font-black text-slate-700">Trang ${state.writingPage} / ${totalPages} (${filteredTopics.length} đề)</span>
            <button onclick="state.writingPage=Math.min(${totalPages},state.writingPage+1);render();window.scrollTo({top:0,behavior:'smooth'})" ${state.writingPage >= totalPages ? 'disabled' : ''} class="px-4 py-2 rounded-xl bg-white border border-slate-200 font-extrabold cursor-pointer disabled:opacity-40">Trang sau →</button>
          </div>
        `}

        <!-- EXACT "CHỌN CHẾ ĐỘ" MODAL (Screenshot 15) -->
        ${modalTopic ? `
          <div onclick="closeWritingModeModal()" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div onclick="event.stopPropagation()" class="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="text-[11px] font-extrabold uppercase tracking-widest text-orange-600">CHỌN CHẾ ĐỘ LUYỆN VIẾT</div>
                  <h3 class="text-base font-black text-slate-900 mt-0.5 line-clamp-2">${escapeHtml(modalTopic.title)}</h3>
                </div>
                <button onclick="closeWritingModeModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 font-bold text-xs cursor-pointer">✕</button>
              </div>

              <div class="space-y-3">
                <button onclick="startWritingPracticeMode('${modalTopic.id}','translate')" class="w-full text-left p-4 rounded-2xl border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 transition cursor-pointer flex items-start gap-3.5">
                  <div class="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 text-xl flex items-center justify-center shrink-0">✏️</div>
                  <div>
                    <div class="font-black text-sm text-slate-900">Dịch bài theo band (${escapeHtml(modalTopic.bandGroup)})</div>
                    <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">Luyện dịch từng câu từ Tiếng Việt sang Tiếng Anh chuẩn học thuật kèm gợi ý từ vựng & câu mẫu Band 8.0+.</p>
                  </div>
                </button>

                <button onclick="startWritingPracticeMode('${modalTopic.id}','sections')" class="w-full text-left p-4 rounded-2xl border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50/40 transition cursor-pointer flex items-start gap-3.5">
                  <div class="w-11 h-11 rounded-2xl bg-orange-100 text-orange-800 text-xl flex items-center justify-center shrink-0">📄</div>
                  <div>
                    <div class="font-black text-sm text-slate-900">Viết đoạn (${modalTopic.taskType === 'task1' ? 'Intro • Overview • Body 1–2' : 'Intro • Body 1–2 • Conclusion'})</div>
                    <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">Hướng dẫn chi tiết từng đoạn văn, khung mẫu tham khảo và AI chấm điểm toàn bài theo 4 tiêu chí IELTS 0–9.0.</p>
                  </div>
                </button>
              </div>
            </div>
          </div>` : ''}
      </div>`;
  };

  // Trigger initial re-render once all v13 modules have loaded
  if (typeof render === 'function') {
    setTimeout(() => {
      state._lastRenderedNav = null;
      render();
    }, 0);
  }
})();
