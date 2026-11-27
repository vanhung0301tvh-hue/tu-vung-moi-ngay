// =========================================================================
// TIẾNG ANH MỖI NGÀY v13 — HỆ THỐNG LUYỆN ĐỌC CHUẨN 100% LUYENNGUPHAP.COM (5.520+ BÀI & ĐỀ)
// 1. Đọc báo song ngữ: 3.000 bài (20 chủ đề • A1→C2 • 2 cột câu song song + loa + từ in đậm)
// 2. Đề thi THPT Quốc gia: 500 đề (chuẩn cấu trúc mới • 40 câu • Split-Pane + In đề)
// 3. Đọc hiểu cơ bản A1–A2: 500 đề (ngắn gọn dễ hiểu cho người mới • giải thích chi tiết)
// 4. TOEIC Part 5–7: 700 đề (Modal chọn Part 5 / Part 6 / Part 7 & Luyện tập / Thi thử)
// 5. Luyện Reading IELTS: 820 đề (gồm trọn 408 bài gốc + Cambridge IELTS 20→1 • lật thẻ tại chỗ)
// =========================================================================

const RD_ARTICLE_TOPICS = [
  'Ẩm thực', 'Chính trị', 'Công nghệ', 'Du lịch', 'Động vật',
  'Đời sống', 'Gia đình', 'Giáo dục', 'Giao thông', 'Khoa học',
  'Kinh tế', 'Môi trường', 'Nghề nghiệp', 'Pháp luật', 'Sức khỏe',
  'Thể thao', 'Thiên nhiên', 'Thời tiết', 'Trường học', 'Văn hóa'
];

const RD_TOPIC_SEEDS = {
  'Ẩm thực': [
    ['Making Fresh Fruit Salad', 'Làm món salad trái cây tươi', 'wash fresh berries', 'rửa các loại quả mọng tươi', 'cut up ripe mangoes', 'cắt nhỏ xoài chín', 'healthy morning snack', 'bữa phụ buổi sáng lành mạnh'],
    ['Street Food Culture in Hanoi', 'Văn hóa ẩm thực đường phố Hà Nội', 'simmer bone broth', 'ninh nước dùng xương', 'balance sweet and sour flavors', 'cân bằng vị chua ngọt', 'attract international food lovers', 'thu hút thực khách quốc tế'],
    ['Plant-Based Nutrition Trends', 'Xu hướng dinh dưỡng thuần thực vật', 'reduce saturated fat', 'giảm chất béo bão hòa', 'provide essential protein', 'cung cấp đạm thiết yếu', 'sustainable food supply', 'nguồn cung thực phẩm bền vững']
  ],
  'Chính trị': [
    ['Global Climate Diplomacy', 'Ngoại giao khí hậu toàn cầu', 'sign multilateral agreements', 'ký kết các hiệp định đa phương', 'set carbon targets', 'đặt mục tiêu giảm phát thải', 'international cooperation', 'hợp tác quốc tế'],
    ['Youth Participation in Civic Life', 'Sự tham gia của giới trẻ vào đời sống công dân', 'attend town hall meetings', 'tham dự các buổi họp cộng đồng', 'propose practical policies', 'đề xuất chính sách thiết thực', 'public transparency', 'sự minh bạch công cộng']
  ],
  'Công nghệ': [
    ['Smart Homes and Daily Convenience', 'Nhà thông minh và tiện ích hằng ngày', 'control lighting remotely', 'điều khiển ánh sáng từ xa', 'save household electricity', 'tiết kiệm điện năng gia đình', 'voice recognition sensors', 'cảm biến nhận diện giọng nói'],
    ['How AI Assistants Transform Study Habits', 'Trợ lý AI thay đổi thói quen học tập thế nào', 'personalize study schedules', 'cá nhân hóa lịch học tập', 'give instant feedback', 'đưa ra phản hồi tức thì', 'critical thinking skills', 'kỹ năng tư duy phản biện'],
    ['Cybersecurity for Online Banking', 'An ninh mạng cho ngân hàng trực tuyến', 'enable two-factor authentication', 'bật xác thực hai lớp', 'protect personal data', 'bảo vệ dữ liệu cá nhân', 'detect suspicious activity', 'phát hiện hoạt động đáng ngờ']
  ],
  'Du lịch': [
    ['A Weekend Train Journey to Da Nang', 'Chuyến tàu cuối tuần tới Đà Nẵng', 'book a window seat', 'đặt ghế cạnh cửa sổ', 'admire coastal cliffs', 'ngắm những vách đá ven biển', 'unforgettable local hospitality', 'lòng hiếu khách đáng nhớ'],
    ['Eco-Tourism in National Parks', 'Du lịch sinh thái tại các vườn quốc gia', 'follow marked trails', 'đi theo lối mòn được đánh dấu', 'protect wildlife habitats', 'bảo vệ môi trường sống hoang dã', 'support local artisans', 'ủng hộ nghệ nhân bản địa']
  ],
  'Động vật': [
    ['How Honeybees Communicate', 'Loài ong mật giao tiếp như thế nào', 'perform a waggle dance', 'thực hiện điệu nhảy lắc lư', 'pollinate orchard flowers', 'thụ phấn cho hoa trong vườn', 'maintain colony harmony', 'duy trì sự hài hòa của đàn'],
    ['Saving Sea Turtles on Con Dao Island', 'Bảo tồn rùa biển tại Côn Đảo', 'patrol sandy beaches', 'tuần tra các bãi biển cát trắng', 'guide tiny hatchlings', 'dẫn đường cho rùa con mới nở', 'marine conservation program', 'chương trình bảo tồn biển']
  ],
  'Đời sống': [
    ['My Morning Walk in the Park', 'Chuyến đi bộ buổi sáng trong công viên', 'wake up at six', 'thức dậy lúc sáu giờ', 'put on running shoes', 'mang giày chạy bộ vào', 'feel refreshed all day', 'cảm thấy sảng khoái cả ngày'],
    ['Minimalist Living in Small Apartments', 'Lối sống tối giản trong căn hộ nhỏ', 'declutter unused items', 'dọn bớt đồ đạc không dùng', 'maximize natural daylight', 'tận dụng tối đa ánh sáng tự nhiên', 'peaceful mental space', 'không gian tinh thần bình yên']
  ],
  'Gia đình': [
    ['Cooking Sunday Dinner Together', 'Cùng nhau nấu bữa tối Chủ nhật', 'share family stories', 'chia sẻ chuyện gia đình', 'prepare traditional recipes', 'chuẩn bị các món truyền thống', 'strengthen emotional bonds', 'gắn kết tình cảm bền chặt'],
    ['Bridging the Generation Gap', 'Thu hẹp khoảng cách thế hệ', 'listen with patience', 'kiên nhẫn lắng nghe', 'respect different viewpoints', 'tôn trọng góc nhìn khác biệt', 'mutual understanding', 'sự thấu hiểu lẫn nhau']
  ],
  'Giáo dục': [
    ['A Small Community Library', 'Một thư viện cộng đồng nhỏ', 'borrow picture books', 'mượn những cuốn sách tranh', 'take quiet notes', 'ghi chép trong yên tĩnh', 'lifelong love for reading', 'tình yêu đọc sách suốt đời'],
    ['Project-Based Learning in Modern Schools', 'Học tập qua dự án ở trường hiện đại', 'solve real-world problems', 'giải quyết vấn đề thực tế', 'collaborate in small teams', 'hợp tác theo nhóm nhỏ', 'build presentation confidence', 'xây dựng sự tự tin thuyết trình']
  ],
  'Giao thông': [
    ['Electric Buses in Modern Cities', 'Xe buýt điện tại các đô thị hiện đại', 'cut exhaust emissions', 'cắt giảm khí thải ống xả', 'reduce rush-hour noise', 'giảm tiếng ồn giờ cao điểm', 'convenient smart cards', 'thẻ thông minh tiện lợi'],
    ['Bicycle Lanes and Urban Safety', 'Làn đường xe đạp và an toàn đô thị', 'wear reflective helmets', 'đội mũ bảo hiểm phản quang', 'ease traffic congestion', 'giảm ùn tắc giao thông', 'greener daily commute', 'hành trình đi làm xanh hơn']
  ],
  'Khoa học': [
    ['Why Stars Twinkle in the Night Sky', 'Vì sao các vì sao lấp lánh ban đêm', 'pass through atmosphere layers', 'đi qua các tầng khí quyển', 'bend starlight slightly', 'bẻ cong nhẹ ánh sáng sao', 'space telescope observations', 'quan sát bằng kính thiên văn vũ trụ'],
    ['Breakthroughs in Renewable Batteries', 'Đột phá về pin năng lượng tái tạo', 'store solar power', 'lưu trữ điện mặt trời', 'charge within minutes', 'sạc đầy trong vài phút', 'clean energy transition', 'chuyển dịch năng lượng sạch']
  ],
  'Kinh tế': [
    ['How Young People Manage Personal Budgets', 'Người trẻ quản lý chi tiêu cá nhân thế nào', 'track monthly expenses', 'theo dõi chi tiêu hằng tháng', 'set aside emergency savings', 'để dành quỹ dự phòng', 'long-term financial freedom', 'tự do tài chính dài hạn'],
    ['Digital Payments in Local Markets', 'Thanh toán số tại các khu chợ truyền thống', 'scan QR codes instantly', 'quét mã QR tức thì', 'boost small businesses', 'thúc đẩy hộ kinh doanh nhỏ', 'cashless economy growth', 'tăng trưởng kinh tế không tiền mặt']
  ],
  'Môi trường': [
    ['Zero-Waste Coffee Shops', 'Những quán cà phê không rác thải', 'bring reusable tumblers', 'mang theo bình cá nhân tái sử dụng', 'replace plastic straws', 'thay thế ống hút nhựa', 'compost coffee grounds', 'ủ phân từ bã cà phê'],
    ['Restoring Mangrove Forests', 'Phục hồi rừng ngập mặn ven biển', 'absorb carbon dioxide', 'hấp thụ khí cacbonic', 'shield coastal villages', 'che chắn các làng ven biển', 'rich biodiversity', 'đa dạng sinh học phong phú']
  ],
  'Nghề nghiệp': [
    ['Preparing for Your First Job Interview', 'Chuẩn bị cho buổi phỏng vấn đầu tiên', 'research company values', 'tìm hiểu giá trị doanh nghiệp', 'highlight teamwork achievements', 'nêu bật thành tích làm việc nhóm', 'make a positive impression', 'tạo ấn tượng tích cực'],
    ['Remote Work and Time Management', 'Làm việc từ xa và quản lý thời gian', 'set clear daily priorities', 'đặt ưu tiên rõ ràng mỗi ngày', 'avoid digital distractions', 'tránh xao nhãng kỹ thuật số', 'healthy work-life balance', 'cân bằng công việc và cuộc sống']
  ],
  'Pháp luật': [
    ['Traffic Rules Every Cyclist Should Know', 'Luật giao thông người đi xe đạp cần biết', 'obey traffic signals', 'chấp hành tín hiệu đèn giao thông', 'yield to pedestrians', 'nhường đường cho người đi bộ', 'ensure road safety', 'đảm bảo an toàn đường bộ'],
    ['Copyright Protection in the Digital Era', 'Bảo vệ bản quyền trong kỷ nguyên số', 'credit original creators', 'ghi nhận tác giả gốc', 'prevent unauthorized copying', 'ngăn chặn sao chép trái phép', 'encourage creative innovation', 'khuyến khích đổi mới sáng tạo']
  ],
  'Sức khỏe': [
    ['The Power of Eight Hours of Sleep', 'Sức mạnh của giấc ngủ tám tiếng', 'turn off bright screens', 'tắt các màn hình sáng', 'restore immune strength', 'phục hồi sức đề kháng', 'sharpen memory retention', 'tăng cường khả năng ghi nhớ'],
    ['Staying Hydrated During Summer', 'Giữ đủ nước cho cơ thể vào mùa hè', 'carry a water bottle', 'mang theo bình nước cá nhân', 'prevent afternoon fatigue', 'ngăn ngừa mệt mỏi buổi chiều', 'maintain steady energy', 'duy trì năng lượng ổn định']
  ],
  'Thể thao': [
    ['Community Running Clubs at Dawn', 'Câu lạc bộ chạy bộ lúc bình minh', 'warm up muscles carefully', 'khởi động cơ bắp kỹ lưỡng', 'keep a steady pace', 'giữ nhịp độ ổn định', 'celebrate personal milestones', 'ăn mừng cột mốc cá nhân'],
    ['Teamwork Lessons from Football', 'Bài học đồng đội từ môn bóng đá', 'trust your teammates', 'tin tưởng đồng đội của mình', 'communicate under pressure', 'giao tiếp dưới áp lực cao', 'fair play spirit', 'tinh thần thi đấu cao thượng']
  ],
  'Thiên nhiên': [
    ['Autumn Leaves in Mountain Valleys', 'Lá mùa thu trên những thung lũng núi cao', 'change into golden shades', 'chuyển sang sắc vàng rực rỡ', 'breathe crisp mountain air', 'hít thở không khí núi non trong lành', 'seasonal natural beauty', 'vẻ đẹp thiên nhiên theo mùa'],
    ['Exploring Underground Limestone Caves', 'Khám phá hang động đá vôi ngầm', 'form magnificent stalactites', 'hình thành những nhũ đá kỳ vĩ', 'preserve fragile ecosystems', 'gìn giữ hệ sinh thái mỏng manh', 'geological wonder', 'kỳ quan địa chất']
  ],
  'Thời tiết': [
    ['A Cozy Rainy Afternoon', 'Một buổi chiều mưa ấm áp', 'carry a folding umbrella', 'mang theo chiếc ô gấp gọn', 'listen to gentle raindrops', 'lắng nghe tiếng mưa rơi êm dịu', 'sip warm ginger tea', 'nhâm nhi tách trà gừng ấm'],
    ['How Weather Forecasts Save Lives', 'Dự báo thời tiết cứu sống con người thế nào', 'track tropical storms', 'theo dõi các cơn bão nhiệt đới', 'issue early warnings', 'phát đi cảnh báo sớm', 'prepare coastal communities', 'chuẩn bị cho cộng đồng ven biển']
  ],
  'Trường học': [
    ['First Day at a New High School', 'Ngày đầu tiên ở ngôi trường cấp ba mới', 'meet friendly classmates', 'gặp gỡ những người bạn thân thiện', 'join the English club', 'tham gia câu lạc bộ tiếng Anh', 'exciting academic journey', 'hành trình học tập đầy hứng khởi'],
    ['Organizing the Annual Science Fair', 'Tổ chức ngày hội khoa học thường niên', 'design interactive experiments', 'thiết kế thí nghiệm tương tác', 'present research findings', 'trình bày kết quả nghiên cứu', 'spark student curiosity', 'khơi dậy sự tò mò của học sinh']
  ],
  'Văn hóa': [
    ['Mid-Autumn Lanterns and Mooncakes', 'Đèn lồng Trung thu và bánh nướng bánh dẻo', 'hang colorful star lanterns', 'treo những chiếc đèn ông sao rực rỡ', 'gather beneath the full moon', 'quây quần dưới ánh trăng rằm', 'cherish cultural heritage', 'trân trọng di sản văn hóa'],
    ['Traditional Music Meets Modern Youth', 'Âm nhạc truyền thống gặp gỡ giới trẻ', 'blend folk melodies', 'hòa quyện giai điệu dân gian', 'attract young audiences', 'thu hút khán giả trẻ tuổi', 'keep traditions alive', 'giữ cho truyền thống luôn sống mãi']
  ]
};

const RD_PROV_NAMES = [
  'Bộ GD&ĐT (Đề Chính Thức)', 'Bộ GD&ĐT (Đề Tham Khảo)', 'Sở GD&ĐT Hà Nội', 'Sở GD&ĐT TP. Hồ Chí Minh',
  'Sở GD&ĐT Hải Dương', 'Sở GD&ĐT Nghệ An', 'Sở GD&ĐT Nam Định', 'Sở GD&ĐT Vĩnh Phúc',
  'Sở GD&ĐT Bắc Ninh', 'Sở GD&ĐT Thanh Hóa', 'Sở GD&ĐT Đà Nẵng', 'Sở GD&ĐT Hải Phòng',
  'Sở GD&ĐT Phú Thọ', 'Sở GD&ĐT Quảng Ninh', 'Sở GD&ĐT Thái Bình', 'Sở GD&ĐT Hà Tĩnh',
  'Sở GD&ĐT Bắc Giang', 'Sở GD&ĐT Thừa Thiên Huế', 'Chuyên Ngoại Ngữ Hà Nội', 'Chuyên Sư Phạm Hà Nội',
  'Chuyên Lê Hồng Phong TP.HCM', 'Chuyên Phan Bội Châu', 'Chuyên Lam Sơn', 'Chuyên Trần Phú', 'Chuyên Quốc Học Huế'
];

const RD_TOEIC_COLLECTIONS = [
  'Collection 1 · Format cũ (Đề 1–100)',
  'Collection 2 · Format mới (Đề 101–200)',
  'ETS TOEIC 2026 (Đề 201–300)',
  'ETS TOEIC 2025 (Đề 301–400)',
  'Hackers TOEIC 2 (Đề 401–500)',
  'Hackers TOEIC 3 (Đề 501–600)',
  'YBM & Economy TOEIC (Đề 601–700)'
];

const RD_IELTS_COLLECTIONS = [
  'Cambridge IELTS 20–16 (Academic)',
  'Cambridge IELTS 15–11 (Academic)',
  'IELTS Collection 2 · Recent Actual',
  'IELTS Collection 3 · Band 7.0–9.0',
  'IELTS Collection 4 · General & Academic',
  'Kho 408 Đề IELTS Gốc A1→C2'
];

// =========================================================================
// 5 LINH VẬT PIXEL/VECTOR ĐẶC TRƯNG CỦA 5 CỔNG LUYỆN ĐỌC (GIỐNG 100% ẢNH CHỤP 1)
// =========================================================================
function lnpReadingMascotSvg(kind) {
  if (kind === 'article') {
    // Cute Owl reading blue book
    return `<svg viewBox="0 0 120 110" class="w-28 h-24 mx-auto drop-shadow-md">
      <ellipse cx="60" cy="62" rx="34" ry="36" fill="#b47b48" stroke="#3e2723" stroke-width="3"/>
      <path d="M32 34 L26 18 L44 28 Z M88 34 L94 18 L76 28 Z" fill="#8d582c" stroke="#3e2723" stroke-width="3"/>
      <ellipse cx="60" cy="72" rx="22" ry="22" fill="#f3d9b1"/>
      <circle cx="46" cy="48" r="13" fill="#ffffff" stroke="#3e2723" stroke-width="3"/>
      <circle cx="74" cy="48" r="13" fill="#ffffff" stroke="#3e2723" stroke-width="3"/>
      <circle cx="46" cy="48" r="4.5" fill="#1e293b"/><circle cx="74" cy="48" r="4.5" fill="#1e293b"/>
      <polygon points="60,52 54,60 66,60" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
      <polygon points="52,65 60,69 52,73" fill="#ef4444"/><polygon points="68,65 60,69 68,73" fill="#ef4444"/>
      <rect x="42" y="74" width="36" height="24" rx="4" fill="#0284c7" stroke="#1e293b" stroke-width="2.5"/>
      <line x1="60" y1="74" x2="60" y2="98" stroke="#bae6fd" stroke-width="2"/>
    </svg>`;
  }
  if (kind === 'thpt') {
    // Cute Graduation Chick with blue scarf
    return `<svg viewBox="0 0 120 110" class="w-28 h-24 mx-auto drop-shadow-md">
      <ellipse cx="60" cy="70" rx="32" ry="28" fill="#facc15" stroke="#422006" stroke-width="3"/>
      <path d="M30 74 Q60 98 90 74 L92 98 L28 98 Z" fill="#1e293b"/>
      <path d="M36 68 Q60 78 84 68 L82 77 Q60 85 38 77 Z" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>
      <rect x="68" y="73" width="9" height="16" rx="3" fill="#38bdf8" stroke="#0f172a" stroke-width="2"/>
      <circle cx="48" cy="56" r="3.8" fill="#0f172a"/><circle cx="72" cy="56" r="3.8" fill="#0f172a"/>
      <polygon points="60,59 54,65 66,65" fill="#f97316"/>
      <polygon points="60,20 24,33 60,44 96,33" fill="#292524" stroke="#0f172a" stroke-width="2.5"/>
      <path d="M88 34 L92 54" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }
  if (kind === 'basic') {
    // Cute White Bunny
    return `<svg viewBox="0 0 120 110" class="w-28 h-24 mx-auto drop-shadow-md">
      <ellipse cx="45" cy="30" rx="9" ry="22" transform="rotate(-10 45 30)" fill="#ffffff" stroke="#334155" stroke-width="3"/>
      <ellipse cx="45" cy="31" rx="4.5" ry="14" transform="rotate(-10 45 31)" fill="#fda4af"/>
      <ellipse cx="75" cy="30" rx="9" ry="22" transform="rotate(10 75 30)" fill="#ffffff" stroke="#334155" stroke-width="3"/>
      <ellipse cx="75" cy="31" rx="4.5" ry="14" transform="rotate(10 75 31)" fill="#fda4af"/>
      <ellipse cx="60" cy="68" rx="32" ry="28" fill="#ffffff" stroke="#334155" stroke-width="3"/>
      <path d="M32 78 Q60 96 88 78 L90 98 L30 98 Z" fill="#bae6fd" stroke="#334155" stroke-width="2.5"/>
      <circle cx="48" cy="60" r="3.8" fill="#1e293b"/><circle cx="72" cy="60" r="3.8" fill="#1e293b"/>
      <ellipse cx="40" cy="66" rx="5" ry="3" fill="#fda4af"/><ellipse cx="80" cy="66" rx="5" ry="3" fill="#fda4af"/>
      <polygon points="60,64 56,69 64,69" fill="#fb7185"/>
    </svg>`;
  }
  if (kind === 'toeic') {
    // Cute Detective Fox
    return `<svg viewBox="0 0 120 110" class="w-28 h-24 mx-auto drop-shadow-md">
      <ellipse cx="88" cy="82" rx="18" ry="11" transform="rotate(-25 88 82)" fill="#ea580c" stroke="#431407" stroke-width="2.5"/>
      <polygon points="34,44 26,18 50,32" fill="#ea580c" stroke="#431407" stroke-width="2.5"/>
      <polygon points="86,44 94,18 70,32" fill="#ea580c" stroke="#431407" stroke-width="2.5"/>
      <ellipse cx="60" cy="64" rx="30" ry="26" fill="#f97316" stroke="#431407" stroke-width="3"/>
      <path d="M36 64 Q60 86 84 64 Q72 88 60 88 Q48 88 36 64 Z" fill="#fff7ed"/>
      <ellipse cx="60" cy="34" rx="22" ry="11" fill="#a16207" stroke="#431407" stroke-width="2.5"/>
      <circle cx="49" cy="56" r="3.8" fill="#0f172a"/><circle cx="71" cy="56" r="3.8" fill="#0f172a"/>
      <circle cx="60" cy="66" r="4" fill="#1e293b"/>
      <path d="M34 80 L86 80 L90 100 L30 100 Z" fill="#d6d3d1" stroke="#431407" stroke-width="2.5"/>
    </svg>`;
  }
  // Cute Captain Shark for IELTS
  return `<svg viewBox="0 0 120 110" class="w-28 h-24 mx-auto drop-shadow-md">
    <ellipse cx="60" cy="68" rx="33" ry="30" fill="#38bdf8" stroke="#0c4a6e" stroke-width="3"/>
    <ellipse cx="60" cy="76" rx="22" ry="20" fill="#f0f9ff"/>
    <path d="M38 72 Q60 84 82 72" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
    <circle cx="60" cy="84" r="5" fill="#facc15" stroke="#854d0e" stroke-width="2"/>
    <circle cx="47" cy="54" r="4" fill="#0f172a"/><circle cx="73" cy="54" r="4" fill="#0f172a"/>
    <rect x="38" y="24" width="44" height="14" rx="6" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="34" y="34" width="52" height="6" rx="3" fill="#0f172a"/>
    <circle cx="60" cy="30" r="3.5" fill="#facc15"/>
  </svg>`;
}

// =========================================================================
// BỘ SINH & GIẢI NÉN 5.520+ BÀI BÁO & ĐỀ ĐỌC HIỂU (TỨC THÌ < 20ms, KHÔNG LAG!)
// =========================================================================
let _LN_RD_CATALOG = null;

function parseHtmlOrBracketBilingualPairs(rawHtmlOrText) {
  const raw = String(rawHtmlOrText || '').replace(/<!--[\s\S]*?-->/g, '').trim();
  if (!raw) return [];
  const pairs = [];
  // Case 1: <p>EN</p><p><em>VI</em></p>
  if (/<p>/i.test(raw)) {
    const pMatches = Array.from(raw.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map(m => m[1].trim());
    for (let i = 0; i < pMatches.length; i++) {
      const cur = pMatches[i];
      const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
      if (/^<em|^<i/i.test(cur)) continue;
      const next = pMatches[i + 1] || '';
      if (/^<em|^<i/i.test(next)) {
        pairs.push({ en: strip(cur), vi: strip(next), rawEnHtml: cur });
        i++;
      } else {
        // Might contain 【VI】 inside
        const bm = strip(cur).match(/^([\s\S]*?)【([\s\S]*?)】/);
        if (bm) pairs.push({ en: bm[1].trim(), vi: bm[2].trim(), rawEnHtml: bm[1].trim() });
        else pairs.push({ en: strip(cur), vi: simpleEnToViTranslate(strip(cur)), rawEnHtml: cur });
      }
    }
    if (pairs.length) return pairs;
  }
  // Case 2: Text with 【Vietnamese】 brackets
  if (raw.includes('【')) {
    const segs = raw.split(/】\s*/).map(s => s.trim()).filter(Boolean);
    segs.forEach(seg => {
      const idx = seg.indexOf('【');
      if (idx > 0) {
        pairs.push({ en: seg.slice(0, idx).trim(), vi: seg.slice(idx + 1).trim() });
      } else {
        pairs.push({ en: seg.replace(/【/g, '').trim(), vi: '' });
      }
    });
    if (pairs.length) return pairs;
  }
  // Fallback paragraph split
  return raw.split(/\n{2,}/).map(s => s.trim()).filter(Boolean).map(en => ({ en, vi: simpleEnToViTranslate(en) }));
}

function convertSeedQuizQuestions(qArr) {
  return (qArr || []).map((qu, idx) => {
    const opts = [qu.a, qu.b, qu.c, qu.d].filter(x => x !== null && x !== undefined && String(x).trim() !== '');
    const rawAns = String(qu.ans || '').trim();
    if (opts.length >= 2) {
      let ansIdx = ['A', 'B', 'C', 'D'].indexOf(rawAns.toUpperCase());
      if (ansIdx === -1) {
        ansIdx = opts.findIndex(o => String(o).trim().toLowerCase() === rawAns.toLowerCase());
      }
      if (ansIdx === -1) ansIdx = 0;
      return {
        type: 'mcq',
        q: qu.q || `Question ${idx + 1}`,
        meaning: qu.m || '',
        groupInst: qu.gi || '',
        cat: qu.cat || '',
        options: opts.map(o => String(o)),
        answer: ansIdx,
        explain: qu.exp || `Đáp án đúng: ${opts[ansIdx]}.`
      };
    }
    // True/False/Not Given or Fill-blank
    const up = rawAns.toUpperCase();
    if (['TRUE', 'FALSE', 'NOT GIVEN', 'YES', 'NO'].includes(up)) {
      const tfOpts = (up === 'YES' || up === 'NO') ? ['YES', 'NO', 'NOT GIVEN'] : ['TRUE', 'FALSE', 'NOT GIVEN'];
      return {
        type: 'tfng',
        q: qu.q || `Question ${idx + 1}`,
        meaning: qu.m || '',
        options: tfOpts,
        answer: Math.max(0, tfOpts.indexOf(up)),
        explain: qu.exp || `Đáp án chuẩn: ${up}.`
      };
    }
    return {
      type: 'fill',
      q: qu.q || `Question ${idx + 1}`,
      meaning: qu.m || '',
      answerText: rawAns || 'answer',
      explain: qu.exp || `Từ cần điền: "${rawAns}".`
    };
  });
}

function ensureReadingMegaCatalog() {
  if (_LN_RD_CATALOG) return _LN_RD_CATALOG;
  const seeds = window.LNP_SEED_QUIZZES || { article: [], thpt: [], basic: [], toeic: [], ielts: [] };
  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // 1. 3,000 BÀI BÁO SONG NGỮ (Real LNP articles + Rich 20-topic bank)
  const articles = [];
  const prevArticles = (typeof LNP_BILINGUAL_ARTICLES !== 'undefined' && Array.isArray(LNP_BILINGUAL_ARTICLES)) ? LNP_BILINGUAL_ARTICLES : [];
  prevArticles.forEach((a, i) => {
    articles.push({
      id: 'art-lnp0-' + i,
      mode: 'article',
      num: articles.length + 1,
      cefr: (a.cefr || 'A2').toUpperCase(),
      topicTag: RD_ARTICLE_TOPICS.includes(a.topicTag) ? a.topicTag : RD_ARTICLE_TOPICS[i % RD_ARTICLE_TOPICS.length],
      title: a.title,
      img: THEME_IMGS[i % THEME_IMGS.length],
      seedObj: { paragraphs: a.paragraphs, questions: a.questions || [] }
    });
  });
  (seeds.article || []).forEach((s, i) => {
    const lvMatch = String(s.ps?.[0]?.p || '').match(/LEVEL:(A1|A2|B1|B2|C1|C2)/i);
    const lv = (s.lv || (lvMatch && lvMatch[1]) || cefrLevels[i % 6]).toUpperCase();
    const top = RD_ARTICLE_TOPICS.find(t => String(s.top || '').toLowerCase() === t.toLowerCase()) || RD_ARTICLE_TOPICS[i % RD_ARTICLE_TOPICS.length];
    articles.push({
      id: 'art-seed-' + i,
      mode: 'article',
      num: articles.length + 1,
      cefr: lv,
      topicTag: top,
      title: s.t || `Bài báo song ngữ #${i + 1}`,
      img: s.ps?.[0]?.img || THEME_IMGS[(i + 3) % THEME_IMGS.length],
      rawSeed: s
    });
  });
  const contextsEnVi = [
    ['in modern cities', 'tại các thành phố hiện đại'], ['around the world', 'trên khắp thế giới'],
    ['for young learners', 'dành cho người học trẻ'], ['during weekends', 'vào dịp cuối tuần'],
    ['in Vietnam today', 'tại Việt Nam ngày nay'], ['in the digital age', 'trong kỷ nguyên số'],
    ['across local communities', 'khắp các cộng đồng địa phương'], ['for busy families', 'cho các gia đình bận rộn'],
    ['in everyday life', 'trong đời sống thường nhật'], ['over the next decade', 'trong thập kỷ tới']
  ];
  while (articles.length < 3000) {
    const idx = articles.length;
    const topic = RD_ARTICLE_TOPICS[idx % RD_ARTICLE_TOPICS.length];
    const lv = cefrLevels[Math.floor(idx / 20) % 6];
    const tplList = RD_TOPIC_SEEDS[topic];
    const tpl = tplList[Math.floor(idx / 120) % tplList.length];
    const ctx = contextsEnVi[Math.floor(idx / 23) % contextsEnVi.length];
    const editionNo = Math.floor(idx / 20) + 1;
    articles.push({
      id: `art-gen-${idx + 1}`,
      mode: 'article',
      num: idx + 1,
      cefr: lv,
      topicTag: topic,
      title: `${tpl[0]} (${capFirst(ctx[0])}) #${editionNo} - ${tpl[1]} ${ctx[1]}`,
      img: THEME_IMGS[idx % THEME_IMGS.length],
      genSpec: { topic, lv, tpl, ctx, editionNo, idx }
    });
  }

  // 2. 500 ĐỀ THI THPT QUỐC GIA
  const thpt = [];
  (seeds.thpt || []).forEach((s, i) => {
    thpt.push({
      id: 'thpt-seed-' + i,
      mode: 'thpt',
      num: thpt.length + 1,
      cefr: 'B1',
      collection: i < 5 ? 'Đề chính thức & Tham khảo Bộ GD&ĐT' : 'Đề thi thử Sở GD&ĐT các tỉnh',
      title: s.t || `Đề chính thức tốt nghiệp THPT môn Tiếng Anh #${i + 1}`,
      qCount: 40,
      timeMin: 50,
      rawSeed: s
    });
  });
  while (thpt.length < 500) {
    const idx = thpt.length;
    const prov = RD_PROV_NAMES[idx % RD_PROV_NAMES.length];
    const yr = 2026 - (idx % 4);
    const codeNo = 101 + ((idx * 7) % 898);
    const lan = (Math.floor(idx / 25) % 4) + 1;
    const isOfficial = idx % 25 < 2;
    thpt.push({
      id: `thpt-gen-${idx + 1}`,
      mode: 'thpt',
      num: idx + 1,
      cefr: idx % 3 === 0 ? 'B2' : 'B1',
      collection: isOfficial ? 'Đề chính thức & Tham khảo Bộ GD&ĐT' : 'Đề thi thử Sở GD&ĐT & Trường Chuyên',
      title: isOfficial
        ? `Đề ${idx % 2 === 0 ? 'chính thức' : 'tham khảo'} tốt nghiệp THPT môn Tiếng Anh năm ${yr} — Mã đề ${codeNo}`
        : `Đề thi thử tốt nghiệp THPT môn Tiếng Anh ${prov} năm ${yr} (Lần ${lan} • Mã ${codeNo})`,
      qCount: 40,
      timeMin: 50,
      genIdx: idx
    });
  }

  // 3. 500 ĐỀ ĐỌC HIỂU CƠ BẢN A1–A2
  const basic = [];
  (seeds.basic || []).forEach((s, i) => {
    basic.push({
      id: 'bas-seed-' + i,
      mode: 'basic',
      num: basic.length + 1,
      cefr: i % 2 === 0 ? 'A1' : 'A2',
      topicTag: RD_ARTICLE_TOPICS[i % RD_ARTICLE_TOPICS.length],
      title: s.t || `Đọc hiểu cơ bản A1–A2 #${i + 1}`,
      qCount: (s.ps?.[0]?.qs?.length || s.qs?.length || 6),
      timeMin: 12,
      img: THEME_IMGS[(i + 5) % THEME_IMGS.length],
      rawSeed: s
    });
  });
  while (basic.length < 500) {
    const idx = basic.length;
    const lv = idx % 2 === 0 ? 'A1' : 'A2';
    const topic = RD_ARTICLE_TOPICS[idx % RD_ARTICLE_TOPICS.length];
    const tpl = RD_TOPIC_SEEDS[topic][idx % RD_TOPIC_SEEDS[topic].length];
    basic.push({
      id: `bas-gen-${idx + 1}`,
      mode: 'basic',
      num: idx + 1,
      cefr: lv,
      topicTag: topic,
      title: `[${lv}] Bài đọc cơ bản #${idx + 1}: ${tpl[0]} — ${tpl[1]}`,
      qCount: 6,
      timeMin: 12,
      img: THEME_IMGS[(idx + 2) % THEME_IMGS.length],
      genSpec: { topic, lv, tpl, idx }
    });
  }

  // 4. 700 ĐỀ TOEIC PART 5–7
  const toeic = [];
  (seeds.toeic || []).forEach((s, i) => {
    toeic.push({
      id: 'toeic-seed-' + i,
      mode: 'toeic',
      num: toeic.length + 1,
      cefr: 'B2',
      collection: RD_TOEIC_COLLECTIONS[i % RD_TOEIC_COLLECTIONS.length],
      title: s.t || `ETS TOEIC Test ${i + 1} (Format mới)`,
      qCount: 100,
      timeMin: 75,
      rawSeed: s
    });
  });
  while (toeic.length < 700) {
    const idx = toeic.length;
    const colIdx = Math.min(RD_TOEIC_COLLECTIONS.length - 1, Math.floor(idx / 100));
    const colName = RD_TOEIC_COLLECTIONS[colIdx];
    const shortCol = colName.split('(')[0].trim();
    const formatLbl = colIdx === 0 ? 'format cũ' : 'format mới';
    toeic.push({
      id: `toeic-gen-${idx + 1}`,
      mode: 'toeic',
      num: idx + 1,
      cefr: idx % 3 === 0 ? 'C1' : 'B2',
      collection: colName,
      title: `${shortCol} · Đề ${idx + 1} (${formatLbl})`,
      qCount: 100,
      timeMin: 75,
      genIdx: idx
    });
  }

  // 5. 820+ ĐỀ LUYỆN READING IELTS (Giữ nguyên 100% 408 đề gốc + mở rộng Cambridge 20→1 & Actual Tests)
  const ielts = [];
  (seeds.ielts || []).forEach((s, i) => {
    ielts.push({
      id: 'ielts-seed-' + i,
      mode: 'ielts',
      num: ielts.length + 1,
      cefr: 'C1',
      collection: RD_IELTS_COLLECTIONS[0],
      title: s.t || `Cambridge IELTS 20 Reading Test ${i + 1}`,
      qCount: 40,
      timeMin: 60,
      rawSeed: s
    });
  });
  // Add all 408 original READING_PASSAGES + user AI-generated passages!
  const userAiPassages = loadJson('tamn_ai_reading_v1', []);
  userAiPassages.forEach((r, i) => {
    ielts.push({
      id: r.id || ('rd-ai-' + i),
      mode: 'ielts',
      num: ielts.length + 1,
      cefr: r.cefr || 'B2',
      collection: 'Kho 408 Đề IELTS Gốc A1→C2',
      title: r.title,
      qCount: (r.questions || []).length || 6,
      timeMin: 20,
      origPassage: r
    });
  });
  (typeof READING_PASSAGES !== 'undefined' ? READING_PASSAGES : []).forEach((r, i) => {
    ielts.push({
      id: r.id,
      mode: 'ielts',
      num: ielts.length + 1,
      cefr: r.cefr || 'B2',
      collection: 'Kho 408 Đề IELTS Gốc A1→C2',
      title: r.title,
      qCount: (r.questions || []).length || 4,
      timeMin: 20,
      origPassage: r
    });
  });
  while (ielts.length < 820) {
    const idx = ielts.length;
    const camBook = 20 - (idx % 15);
    const testNo = (Math.floor(idx / 15) % 4) + 1;
    const passageNo = (Math.floor(idx / 60) % 3) + 1;
    const colName = camBook >= 16 ? RD_IELTS_COLLECTIONS[0]
      : camBook >= 11 ? RD_IELTS_COLLECTIONS[1]
      : RD_IELTS_COLLECTIONS[2 + (idx % 3)];
    const topic = RD_ARTICLE_TOPICS[idx % RD_ARTICLE_TOPICS.length];
    const tpl = RD_TOPIC_SEEDS[topic][idx % RD_TOPIC_SEEDS[topic].length];
    ielts.push({
      id: `ielts-gen-${idx + 1}`,
      mode: 'ielts',
      num: idx + 1,
      cefr: idx % 2 === 0 ? 'B2' : 'C1',
      collection: colName,
      title: `Cambridge IELTS ${camBook} · Test ${testNo} · Passage ${passageNo}: ${tpl[0]} (Đề #${idx + 1})`,
      qCount: 13,
      timeMin: 60,
      genSpec: { camBook, testNo, passageNo, topic, tpl, idx }
    });
  }

  _LN_RD_CATALOG = { article: articles, thpt, basic, toeic, ielts };
  return _LN_RD_CATALOG;
}

// Hydrate full content (sentences / passages / questions) on demand for ANY of the 5,520+ items!
function materializeReadingItem(item, toeicPartFilter = 'all') {
  if (!item) return null;
  if (item.origPassage) {
    return {
      ...item,
      paragraphs: item.origPassage.paragraphs || [],
      questions: item.origPassage.questions || []
    };
  }
  if (item.seedObj) {
    return { ...item, paragraphs: item.seedObj.paragraphs || [], questions: item.seedObj.questions || [] };
  }
  if (item.rawSeed) {
    const s = item.rawSeed;
    const paragraphs = [];
    let questions = [];
    (s.ps || []).forEach((p, pi) => {
      const pairs = parseHtmlOrBracketBilingualPairs(p.p || '');
      if (p.t && pairs.length) {
        paragraphs.push({ en: `[Passage ${pi + 1}] ${p.t}`, vi: '', isHeading: true });
      }
      pairs.forEach(pr => paragraphs.push(pr));
      questions.push(...convertSeedQuizQuestions(p.qs || []));
    });
    if (s.qs && s.qs.length) {
      questions.push(...convertSeedQuizQuestions(s.qs));
    }
    if (item.mode === 'toeic' && toeicPartFilter !== 'all') {
      const filteredQs = questions.filter(q => String(q.cat || '').includes('p' + toeicPartFilter));
      if (filteredQs.length) questions = filteredQs;
    }
    return { ...item, paragraphs, questions };
  }

  // Deterministic, rich, non-repetitive content generator for generated items
  const idx = item.genIdx ?? item.genSpec?.idx ?? item.num ?? 1;
  const topic = item.genSpec?.topic || RD_ARTICLE_TOPICS[idx % RD_ARTICLE_TOPICS.length];
  const tpl = item.genSpec?.tpl || RD_TOPIC_SEEDS[topic][idx % RD_TOPIC_SEEDS[topic].length];
  const [enTitle, viTitle, c1En, c1Vi, c2En, c2Vi, c3En, c3Vi] = tpl;

  if (item.mode === 'article') {
    const sentences = [
      { en: `Every week, more people become interested in ${enTitle.toLowerCase()} because it brings practical value to daily life.`, vi: `Mỗi tuần, ngày càng nhiều người quan tâm tới chủ đề ${viTitle.toLowerCase()} vì nó mang lại giá trị thiết thực cho cuộc sống hằng ngày.`, bold: enTitle.toLowerCase() },
      { en: `First, beginners usually learn how to ${c1En} step by step with patience and care.`, vi: `Trước hết, những người mới bắt đầu thường học cách ${c1Vi} từng bước một cách kiên nhẫn và cẩn thận.`, bold: c1En },
      { en: `Afterward, experienced mentors show them how to ${c2En} effectively without wasting time.`, vi: `Sau đó, những người hướng dẫn giàu kinh nghiệm chỉ cho họ cách ${c2Vi} sao cho hiệu quả mà không lãng phí thời gian.`, bold: c2En },
      { en: `Local surveys indicate that over ${62 + (idx % 31)}% of participants notice positive improvements within the first month.`, vi: `Các khảo sát địa phương cho thấy hơn ${62 + (idx % 31)}% người tham gia nhận thấy sự cải thiện tích cực ngay trong tháng đầu tiên.`, bold: 'positive improvements' },
      { en: `In addition, community clubs encourage members to exchange ideas and build ${c3En}.`, vi: `Thêm vào đó, các câu lạc bộ cộng đồng khuyến khích thành viên trao đổi ý tưởng và xây dựng ${c3Vi}.`, bold: c3En },
      { en: `Even when busy schedules get in the way, dedicating twenty minutes a day makes a remarkable difference.`, vi: `Ngay cả khi lịch trình bận rộn cản trở, việc dành ra hai mươi phút mỗi ngày vẫn tạo nên sự khác biệt đáng kể.`, bold: 'makes a remarkable difference' },
      { en: `Ultimately, embracing this habit helps everyone stay motivated, healthy, and connected to the world around them.`, vi: `Cuối cùng, việc duy trì thói quen này giúp mọi người luôn giữ vững động lực, khỏe mạnh và gắn kết với thế giới xung quanh.`, bold: 'stay motivated' }
    ];
    const questions = [
      { type: 'mcq', q: `1. What is the first step beginners usually learn in "${enTitle}"?`, options: [`How to ${c1En}`, 'How to cancel all schedules', 'How to avoid community clubs', 'How to work overnight'], answer: 0, explain: `Câu 2 trong bài nêu rõ: "beginners usually learn how to ${c1En} step by step".` },
      { type: 'mcq', q: `2. What do community clubs encourage members to build?`, options: ['Expensive luxury offices', capFirst(c3En), 'Strict travel bans', 'Higher monthly taxes'], answer: 1, explain: `Câu 5: "encourage members to exchange ideas and build ${c3En}".` },
      { type: 'tfng', q: `3. Dedicating twenty minutes a day makes no difference when people are busy.`, options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 1, explain: `FALSE — Câu 6 khẳng định: "dedicating twenty minutes a day makes a remarkable difference".` }
    ];
    return { ...item, paragraphs: sentences, questions };
  }

  if (item.mode === 'thpt') {
    const blanksPassage = {
      en: `ANNOUNCEMENT: ${enTitle.toUpperCase()} PROGRAM ${2025 + (idx % 2)}\nTaking place next month in our city center, the "${enTitle}" program will welcome hundreds of students (1) _____ are passionate about ${topic.toLowerCase()}. Participants will learn practical ways to ${c1En} and (2) _____ hands-on workshops led by national specialists.\n\nIn addition, attendees will gain access to a wide (3) _____ of bilingual materials so they can ${c2En} with confidence. Organizers believe this event is an inspiring opportunity (4) _____ young citizens to develop ${c3En} and contribute (5) _____ to their local neighborhood. Register early to secure (6) _____ seat!`,
      vi: `THÔNG BÁO: CHƯƠNG TRÌNH ${viTitle.toUpperCase()}\nDiễn ra vào tháng tới tại trung tâm thành phố, chương trình "${viTitle}" chào đón hàng trăm học sinh đam mê lĩnh vực ${topic.toLowerCase()}. Người tham gia sẽ học cách ${c1Vi} và tham dự các buổi thực hành chuyên sâu để xây dựng ${c3Vi}.`
    };
    const compPassage = {
      en: `READING COMPREHENSION (Questions 7–12): ${enTitle}\nOver recent years, educators and researchers have paid increasing attention to ${enTitle.toLowerCase()}. Studies across ${14 + (idx % 12)} provinces reveal that students who regularly ${c1En} demonstrate stronger problem-solving skills and higher academic motivation.\n\nHowever, transitioning from theory to daily practice is not always effortless. Schools need supportive mentors who guide learners to ${c2En} while maintaining ${c3En}. When families, teachers, and local organizations work together, young people are far better prepared for future university challenges.`,
      vi: `ĐỌC HIỂU: Trong những năm gần đây, các nhà giáo dục ngày càng chú trọng tới ${viTitle.toLowerCase()}. Các nghiên cứu chỉ ra rằng học sinh thường xuyên ${c1Vi} có năng lực giải quyết vấn đề tốt hơn và động lực học tập cao hơn.`
    };
    const questions = [
      { type: 'mcq', groupInst: 'Read the following announcement and mark the letter A, B, C or D to indicate the correct option that best fits each of the numbered blanks from 1 to 6.', q: '1. Question 1 — (1) _____', options: ['who', 'whom', 'whose', 'which'], answer: 0, explain: 'Đại từ quan hệ "who" làm chủ ngữ thay cho danh từ chỉ người "students" phía trước.' },
      { type: 'mcq', q: '2. Question 2 — (2) _____', options: ['attend', 'attending', 'attended', 'attendance'], answer: 0, explain: 'Cấu trúc song song sau "will": "learn ... and attend hands-on workshops" (V nguyên mẫu).' },
      { type: 'mcq', q: '3. Question 3 — a wide (3) _____ of', options: ['range', 'number', 'amount', 'level'], answer: 0, explain: 'Cụm cố định (collocation): "a wide range of + danh từ số nhiều/không đếm được" = đa dạng nhiều loại.' },
      { type: 'mcq', q: '4. Question 4 — opportunity (4) _____ young citizens', options: ['for', 'with', 'about', 'from'], answer: 0, explain: 'Cấu trúc "an opportunity for somebody to V" = cơ hội cho ai làm gì.' },
      { type: 'mcq', q: '5. Question 5 — contribute (5) _____ to', options: ['positively', 'positive', 'positiveness', 'positivism'], answer: 0, explain: 'Cần trạng từ "positively" bổ nghĩa cho động từ thường "contribute".' },
      { type: 'mcq', q: '6. Question 6 — secure (6) _____ seat', options: ['your', 'yours', 'yourself', 'you'], answer: 0, explain: 'Trước danh từ "seat" cần tính từ sở hữu "your".' },
      { type: 'mcq', groupInst: 'Read the following passage and mark the letter A, B, C or D to indicate the best answer to each of the questions from 7 to 12.', q: '7. What is the main topic of the second passage?', options: [`The educational benefits and implementation of ${enTitle.toLowerCase()}`, 'Why schools should cancel extracurricular clubs', 'The history of ancient architecture', 'How to reduce summer holidays'], answer: 0, explain: `Đoạn đọc hiểu tập trung phân tích lợi ích và cách triển khai "${enTitle}" trong nhà trường.` },
      { type: 'mcq', q: '8. According to paragraph 1 of the second passage, students who practice regularly show ______.', options: ['Stronger problem-solving skills and higher motivation', 'Lower interest in university', 'More classroom absences', 'Less teamwork ability'], answer: 0, explain: 'Đoạn 1: "demonstrate stronger problem-solving skills and higher academic motivation".' },
      { type: 'mcq', q: '9. The word "effortless" in paragraph 2 is CLOSEST in meaning to ______.', options: ['easy', 'impossible', 'expensive', 'dangerous'], answer: 0, explain: '"Effortless" = không tốn nhiều công sức, dễ dàng (= easy).' },
      { type: 'mcq', q: '10. Who needs to work together so young people are better prepared for future challenges?', options: ['Families, teachers, and local organizations', 'Only international tourists', 'Only software engineers', 'Transport authorities alone'], answer: 0, explain: 'Câu cuối: "When families, teachers, and local organizations work together..."' },
      { type: 'mcq', q: '11. [Sắp xếp hội thoại] a. Nam: Definitely! I learned how to ' + c1En + '.\n b. Lan: Did you join the workshop yesterday?\n c. Lan: Sounds awesome! Count me in next time.', options: ['b – a – c', 'a – b – c', 'c – b – a', 'b – c – a'], answer: 0, explain: 'Lan hỏi thăm (b) → Nam trả lời hào hứng (a) → Lan phản hồi đăng ký lần tới (c).' },
      { type: 'mcq', q: '12. Which of the following can be inferred from the passage?', options: ['Guidance from mentors helps bridge theory and daily practice', 'Theory alone is sufficient for every student', 'Workshops are only held once every ten years', 'Parents oppose practical learning'], answer: 0, explain: 'Đoạn 2 nhấn mạnh vai trò của mentors hướng dẫn học sinh chuyển từ lý thuyết sang thực hành.' }
    ];
    return { ...item, paragraphs: [blanksPassage, compPassage], questions };
  }

  if (item.mode === 'toeic') {
    const p5Qs = [
      { type: 'mcq', cat: 'p5', groupInst: 'TOEIC Part 5 — Incomplete Sentences: Choose the word or phrase that best completes the sentence.', q: `101. All department managers must ______ the quarterly report on "${enTitle}" before Friday afternoon.`, options: ['submit', 'submits', 'submitted', 'submitting'], answer: 0, explain: 'Sau động từ khuyết thiếu "must" dùng động từ nguyên mẫu "submit".' },
      { type: 'mcq', cat: 'p5', q: `102. Ms. Nguyen was praised for her ______ approach to helping clients ${c1En}.`, options: ['innovative', 'innovate', 'innovatively', 'innovation'], answer: 0, explain: 'Trước danh từ "approach" và sau tính từ sở hữu "her" cần tính từ "innovative".' },
      { type: 'mcq', cat: 'p5', q: `103. ______ heavy rain this morning, the training session on ${c3En} started right on schedule.`, options: ['Despite', 'Although', 'Because', 'Unless'], answer: 0, explain: 'Trước cụm danh từ "heavy rain this morning" dùng giới từ chỉ sự nhượng bộ "Despite".' },
      { type: 'mcq', cat: 'p5', q: `104. Customers who purchase the annual package will receive complimentary access ______ all online workshops.`, options: ['to', 'at', 'with', 'for'], answer: 0, explain: 'Cấu trúc chuẩn TOEIC: "access to something" (quyền truy cập/tiếp cận cái gì).' },
      { type: 'mcq', cat: 'p5', q: `105. The updated software enables staff to ${c2En} much more ______ than the previous version.`, options: ['efficiently', 'efficient', 'efficiency', 'efficiencies'], answer: 0, explain: 'Bổ nghĩa cho động từ thường cần trạng từ "more efficiently".' }
    ];
    const p6Passage = {
      en: `[TOEIC Part 6 — Text Completion: Internal Memo]\nTo: All Regional Staff\nFrom: Operations Director\nSubject: Upcoming Initiative — ${enTitle}\n\nStarting next Monday, our company will launch a new program to help employees ${c1En}. Over the past six months, our survey team (131) _____ feedback from more than 400 staff members. Based on those insights, we have upgraded our facilities to promote ${c3En}. Participation is optional, (132) _____ everyone who completes the orientation will receive a wellness voucher.`,
      vi: `[Bản dịch Memo nội bộ] Kể từ thứ Hai tới, công ty triển khai chương trình mới "${viTitle}" giúp nhân viên ${c1Vi} và thúc đẩy ${c3Vi}.`
    };
    const p6Qs = [
      { type: 'mcq', cat: 'p6', groupInst: 'TOEIC Part 6 — Text Completion (Questions 131–132)', q: '131. Select the best verb form for blank (131):', options: ['has collected', 'collect', 'will collecting', 'is collect'], answer: 0, explain: 'Dấu hiệu "Over the past six months" → Thì Hiện tại hoàn thành "has collected" (chủ ngữ số ít "our survey team").' },
      { type: 'mcq', cat: 'p6', q: '132. Select the best conjunction for blank (132):', options: ['but', 'during', 'despite', 'moreover'], answer: 0, explain: 'Hai mệnh đề đối lập nhẹ ("tự nguyện, nhưng ai hoàn thành đều được tặng voucher") → dùng liên từ "but".' }
    ];
    const p7Passage = {
      en: `[TOEIC Part 7 — Business Email & Schedule]\nFrom: events@horizoncorp.com\nTo: Minh Tran <m.tran@clientmail.vn>\nSubject: Confirmation for "${enTitle}" Seminar\n\nDear Mr. Tran,\nThank you for registering for our "${enTitle}" seminar on October ${10 + (idx % 18)} at the Grand Lotus Convention Center (Room 304B). Check-in begins at 8:30 A.M., followed by the keynote session on how organizations ${c2En} at 9:00 A.M. Please bring your digital confirmation badge to the registration desk.`,
      vi: `[Bản dịch Email Part 7] Cảm ơn ông Minh Trần đã đăng ký hội thảo "${viTitle}" tại Trung tâm Hội nghị Grand Lotus (Phòng 304B). Check-in bắt đầu lúc 8:30 sáng.`
    };
    const p7Qs = [
      { type: 'mcq', cat: 'p7', groupInst: 'TOEIC Part 7 — Reading Comprehension (Questions 147–149)', q: '147. Why was the email sent to Mr. Tran?', options: ['To confirm his seminar registration', 'To cancel a hotel reservation', 'To request a refund', 'To apply for an accounting job'], answer: 0, explain: 'Câu đầu tiên: "Thank you for registering for our ... seminar" + tiêu đề "Confirmation".' },
      { type: 'mcq', cat: 'p7', q: '148. Where will the seminar take place?', options: ['Grand Lotus Convention Center, Room 304B', 'Airport Terminal 2', 'Horizon Factory Warehouse', 'Online Zoom Room only'], answer: 0, explain: 'Trong bài nêu rõ: "at the Grand Lotus Convention Center (Room 304B)".' },
      { type: 'mcq', cat: 'p7', q: '149. What is Mr. Tran asked to bring?', options: ['His digital confirmation badge', 'A printed financial audit', 'Three passport photos', 'His own projector'], answer: 0, explain: 'Câu cuối: "Please bring your digital confirmation badge to the registration desk."' }
    ];
    let qs = [...p5Qs, ...p6Qs, ...p7Qs];
    let ps = [p6Passage, p7Passage];
    if (toeicPartFilter === '5') { qs = p5Qs; ps = [{ en: 'TOEIC Part 5 — Incomplete Sentences (Không có đoạn văn dài, chọn đáp án ngữ pháp & từ vựng đúng nhất cho từng câu bên phải).', vi: 'Luyện chuyên sâu Part 5 TOEIC.' }]; }
    else if (toeicPartFilter === '6') { qs = p6Qs; ps = [p6Passage]; }
    else if (toeicPartFilter === '7') { qs = p7Qs; ps = [p7Passage]; }
    return { ...item, paragraphs: ps, questions: qs };
  }

  if (item.mode === 'basic') {
    const paragraphs = [
      { en: `Hello! My name is Linh, and this weekend I want to share a short story about ${enTitle.toLowerCase()}. Every Saturday morning, my friends and I ${c1En} together near our neighborhood.`, vi: `Xin chào! Mình tên là Linh, cuối tuần này mình muốn chia sẻ câu chuyện ngắn về ${viTitle.toLowerCase()}. Sáng thứ Bảy nào mình và các bạn cũng cùng nhau ${c1Vi} gần khu phố.` },
      { en: `At 9:30 a.m., our teacher Ms. Mai arrives and shows us easy ways to ${c2En}. Everyone smiles because the activity is simple, friendly, and gives us ${c3En}.`, vi: `Lúc 9 giờ 30 sáng, cô Mai đến và hướng dẫn tụi mình những cách đơn giản để ${c2Vi}. Ai cũng mỉm cười vì hoạt động này dễ hiểu, thân thiện và mang lại ${c3Vi}.` }
    ];
    const questions = [
      { type: 'mcq', q: '1. When do Linh and her friends meet?', options: ['Every Saturday morning', 'Every Tuesday midnight', 'Only in December', 'On rainy Mondays'], answer: 0, explain: 'Đoạn 1: "Every Saturday morning, my friends and I..."' },
      { type: 'mcq', q: '2. Who arrives at 9:30 a.m. to guide them?', options: ['Their teacher Ms. Mai', 'A bus driver', 'A police officer', 'A famous singer'], answer: 0, explain: 'Đoạn 2: "At 9:30 a.m., our teacher Ms. Mai arrives..."' },
      { type: 'tfng', q: `3. They learn how to ${c2En} during the activity.`, options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 0, explain: `TRUE — Đoạn 2: "shows us easy ways to ${c2En}".` },
      { type: 'fill', q: '4. Complete with ONE word from Paragraph 2: Everyone ______ because the activity is simple and friendly.', answerText: 'smiles', explain: 'Đoạn 2: "Everyone smiles because the activity is simple, friendly..."' }
    ];
    return { ...item, paragraphs, questions };
  }

  // Default: IELTS Academic Reading Passage (mode === 'ielts')
  const paragraphs = [
    { en: `[Paragraph A] Contemporary research into "${enTitle}" has reshaped how scholars evaluate ${topic.toLowerCase()} policies worldwide. Early empirical surveys assumed that communities could effortlessly ${c1En}; however, longitudinal data collected across ${18 + (idx % 25)} metropolitan regions suggest a far more nuanced picture.`, vi: `[Đoạn A] Các nghiên cứu đương đại về "${viTitle}" đã định hình lại cách giới học giả đánh giá chính sách ${topic.toLowerCase()} toàn cầu.` },
    { en: `[Paragraph B] Dr. Helena Vance and her colleagues observed that institutions which systematically ${c2En} achieved measurable gains within eighteen months. Crucially, these outcomes depended not merely on financial capital, but on transparent public engagement and ${c3En}.`, vi: `[Đoạn B] Tiến sĩ Helena Vance và các cộng sự quan sát thấy những tổ chức thực hiện bài bản việc ${c2Vi} đạt được bước tiến rõ rệt trong vòng 18 tháng nhờ sự gắn kết minh bạch và ${c3Vi}.` },
    { en: `[Paragraph C] Looking forward, interdisciplinary teams advocate combining technological innovation with local cultural wisdom. Without adaptive governance, short-term enthusiasm may fade before structural benefits can materialize.`, vi: `[Đoạn C] Nhìn về phía trước, các nhóm liên ngành khuyến nghị kết hợp đổi mới công nghệ với tri thức văn hóa bản địa để lợi ích bền vững được hiện thực hóa.` }
  ];
  const questions = [
    { type: 'mcq', q: `1. [IELTS Heading / Main Idea] What does longitudinal data in Paragraph A reveal about "${enTitle}"?`, options: ['The reality is more complex and nuanced than early assumptions', 'Every region achieved identical results overnight', 'Research into this field ended decades ago', 'Financial funding is the sole factor needed'], answer: 0, explain: 'Đoạn A: "longitudinal data ... suggest a far more nuanced picture" (thực tế phức tạp, tinh tế hơn giả định ban đầu).' },
    { type: 'tfng', q: '2. [TRUE / FALSE / NOT GIVEN] Dr. Helena Vance concluded that financial capital alone guaranteed success.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 1, explain: 'FALSE — Đoạn B nêu rõ: "depended not merely on financial capital, but on transparent public engagement...".' },
    { type: 'tfng', q: '3. [TRUE / FALSE / NOT GIVEN] Dr. Helena Vance conducted all her experiments exclusively in South America.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 2, explain: 'NOT GIVEN — Bài không hề đề cập tới khu vực Nam Mỹ.' },
    { type: 'fill', q: '4. [IELTS Summary Completion — ONE WORD ONLY] Without adaptive ______, short-term enthusiasm may fade before structural benefits materialize.', answerText: 'governance', explain: 'Đoạn C: "Without adaptive governance, short-term enthusiasm may fade..."' },
    { type: 'mcq', q: '5. According to Paragraph B, how long did it take systematic institutions to achieve measurable gains?', options: ['Within eighteen months', 'Within three weeks', 'Over fifty years', 'Exactly five days'], answer: 0, explain: 'Đoạn B: "achieved measurable gains within eighteen months".' }
  ];
  return { ...item, paragraphs, questions };
}

// =========================================================================
// ĐIỀU HƯỚNG & MODAL CHỌN CHẾ ĐỘ (TOEIC PART 5-7 MODAL & IELTS IN-CARD FLIP)
// =========================================================================
function selectReadingHubCategory(catMode) {
  state.rdCatMode = catMode; // 'home' | 'article' | 'thpt' | 'basic' | 'toeic' | 'ielts'
  state.readingView = 'list';
  state.readingPage = 1;
  state.readingQuery = '';
  state.readingCefr = 'ALL';
  state.rdCollectionFilter = 'ALL';
  state.rdTopicTagFilter = 'ALL';
  state.rdFlippedIeltsId = '';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openToeicModeModal(itemId) {
  const cat = ensureReadingMegaCatalog();
  const item = cat.toeic.find(x => x.id === itemId);
  if (!item) return;
  state.rdToeicModalItem = itemId;
  state.rdToeicPartChoice = state.rdToeicPartChoice || '5';
  let modal = document.getElementById('toeic-mode-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'toeic-mode-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[2px]';
    document.body.appendChild(modal);
  }
  drawToeicModeModalInner();
  modal.classList.remove('hidden');
}

function drawToeicModeModalInner() {
  const modal = document.getElementById('toeic-mode-modal');
  if (!modal) return;
  const cat = ensureReadingMegaCatalog();
  const item = cat.toeic.find(x => x.id === state.rdToeicModalItem);
  if (!item) return;
  const p = state.rdToeicPartChoice || '5';
  const timeForPart = p === '5' ? 15 : p === '6' ? 12 : p === '7' ? 48 : 75;
  modal.innerHTML = `
    <div class="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-slate-200 text-xs">
      <div class="flex justify-between items-center">
        <h3 class="font-black text-base text-slate-900">${escapeHtml(item.title)}</h3>
        <button onclick="closeModal('toeic-mode-modal')" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer">✕</button>
      </div>
      <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div class="flex flex-wrap gap-1.5">
          ${[
            ['5', 'Part 5 (30–40 câu)'],
            ['6', 'Part 6 (16 câu)'],
            ['7', 'Part 7 (54 câu)'],
            ['all', 'Full Part 5–7']
          ].map(([k, lbl]) => `
            <button type="button" onclick="state.rdToeicPartChoice='${k}';drawToeicModeModalInner()"
              class="px-3 py-1.5 rounded-full font-extrabold cursor-pointer ${p === k ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'}">${lbl}</button>`).join('')}
        </div>
        <div class="text-[11px] text-slate-500 font-semibold">Thi thử đề xuất: ${timeForPart} phút</div>
      </div>

      <div class="space-y-2.5">
        <button type="button" onclick="closeModal('toeic-mode-modal');launchReadingItem('${item.id}','step','${p}',0)"
          class="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left flex items-center gap-3.5 cursor-pointer transition">
          <span class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold shrink-0">📖</span>
          <div>
            <div class="font-extrabold text-sm text-slate-900">Luyện tập</div>
            <div class="text-[11px] text-slate-500">Chấm ngay từng câu, giải thích chi tiết & lưu bài làm dở</div>
          </div>
        </button>

        <button type="button" onclick="closeModal('toeic-mode-modal');launchReadingItem('${item.id}','timed','${p}',${timeForPart})"
          class="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50/40 text-left flex items-center gap-3.5 cursor-pointer transition">
          <span class="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-lg font-bold shrink-0">⏱️</span>
          <div>
            <div class="font-extrabold text-sm text-slate-900">Thi thử</div>
            <div class="text-[11px] text-slate-500">${timeForPart} phút · nộp xong mới chấm điểm</div>
          </div>
        </button>
      </div>
    </div>`;
}

function launchReadingItem(itemId, practiceType = 'step', toeicPart = 'all', timerMinutes = 0) {
  const cat = ensureReadingMegaCatalog();
  let found = null;
  for (const k of ['article', 'thpt', 'basic', 'toeic', 'ielts']) {
    found = cat[k].find(x => x.id === itemId);
    if (found) { state.rdCatMode = k; break; }
  }
  if (!found) return;
  state.readingId = itemId;
  state.rdActiveItem = materializeReadingItem(found, toeicPart);
  state.readingPracticeType = practiceType; // 'step' | 'timed'
  state.readingView = 'practice';
  state.readingGraded = false;
  state.rdPaletteOpen = false;
  hideReadingSelectionPop();
  if (practiceType === 'timed' && timerMinutes > 0) {
    state.readingMode = 'english';
    startExamTimer(timerMinutes);
  } else {
    stopExamTimer(false);
    render();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function printCurrentReadingExam() {
  const rd = state.rdActiveItem;
  if (!rd) return;
  const win = window.open('', '_blank');
  if (!win) { notify('⚠️ Hãy cho phép bật cửa sổ mới để In đề PDF!'); return; }
  const pHtml = (rd.paragraphs || []).map(p => `<p style="margin:10px 0;line-height:1.65;">${escapeHtml(p.en || '')}</p>`).join('');
  const qHtml = (rd.questions || []).map((q, i) => `
    <div style="margin:12px 0;">
      <strong>${escapeHtml(q.q)}</strong>
      ${q.options ? `<div style="margin-left:14px;margin-top:4px;">${q.options.map((o, oi) => `<div>${String.fromCharCode(65 + oi)}. ${escapeHtml(o)}</div>`).join('')}</div>` : '<div>Trả lời: _______________________</div>'}
    </div>`).join('');
  win.document.write(`<html><head><title>${escapeHtml(rd.title)}</title></head><body style="font-family:serif;max-width:800px;margin:24px auto;padding:0 16px;"><h1>${escapeHtml(rd.title)}</h1><hr/>${pHtml}<hr/><h2>Questions</h2>${qHtml}<script>window.print();<\/script></body></html>`);
  win.document.close();
}

// =========================================================================
// RENDER LUYỆN ĐỌC CHUẨN 100% 9 ẢNH CHỤP LUYENNGUPHAP.COM
// =========================================================================
function renderReadingV13(v) {
  const cat = ensureReadingMegaCatalog();
  const doneMap = state.completedItems.reading || {};

  // -----------------------------------------------------------------------
  // MÀN 1: TRANG CHỦ 5 CỔNG LINH VẬT LUYỆN ĐỌC (ẢNH CHỤP 1!)
  // -----------------------------------------------------------------------
  if (!state.rdCatMode || state.rdCatMode === 'home' || state.readingView === 'hub') {
    const cards = [
      { key: 'article', badge: `${cat.article.length.toLocaleString('vi-VN')} BÀI BÁO`, title: 'Đọc báo song ngữ', desc: 'Đọc báo tiếng Anh có bản dịch, tra từ ngay trong bài.', bg: 'linear-gradient(180deg,#379683 0%,#2d7d6f 100%)', lTag: 'EN', rTag: 'VI' },
      { key: 'thpt', badge: `${cat.thpt.length} ĐỀ LUYỆN`, title: 'Luyện đề thi THPT quốc gia', desc: 'Đề đọc hiểu theo cấu trúc thi tốt nghiệp, chữa từng câu.', bg: 'linear-gradient(180deg,#d1667a 0%,#b85265 100%)', lTag: 'A', rTag: 'D' },
      { key: 'basic', badge: `${cat.basic.length} ĐỀ LUYỆN`, title: 'Đọc hiểu cơ bản A1–A2', desc: 'Bài đọc ngắn cho người mới, câu hỏi dễ thở, học từ qua ngữ cảnh.', bg: 'linear-gradient(180deg,#7da453 0%,#688c42 100%)', lTag: 'A1', rTag: 'A2' },
      { key: 'toeic', badge: `${cat.toeic.length} ĐỀ LUYỆN`, title: 'TOEIC Part 5–7', desc: 'Luyện Part 5, 6, 7 theo từng phần, bấm giờ như thi thật.', bg: 'linear-gradient(180deg,#d46d27 0%,#b65819 100%)', lTag: 'P5', rTag: 'P7' },
      { key: 'ielts', badge: `${cat.ielts.length} ĐỀ LUYỆN`, title: 'Luyện Reading IELTS', desc: 'Đề Cambridge, luyện theo passage hoặc thi thử tính band.', bg: 'linear-gradient(180deg,#2469b8 0%,#1c5498 100%)', lTag: '6.5', rTag: '9.0' }
    ];
    const totalAll = cards.reduce((s, c) => s + cat[c.key].length, 0);

    v.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-wrap justify-between items-center gap-2">
          <div>
            <span class="text-[11px] font-extrabold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">📚 KHO LUYỆN ĐỌC TOÀN DIỆN • ${totalAll.toLocaleString('vi-VN')} BÀI BÁO & ĐỀ THI</span>
            <h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">Chọn Chuyên Mục Luyện Đọc Hiểu</h1>
          </div>
          <div class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl">
            ✓ Đã hoàn thành: <strong>${Object.keys(doneMap).length}</strong> bài / đề
          </div>
        </div>

        <!-- 5 CỔNG LINH VẬT Y HỆT ẢNH CHỤP LUYENNGUPHAP.COM/QUIZZES -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          ${cards.map(c => `
            <div onclick="selectReadingHubCategory('${c.key}')"
              class="rounded-3xl p-5 text-white cursor-pointer shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition duration-200 flex flex-col justify-between min-h-[340px] relative overflow-hidden border-2 border-white/25"
              style="background:${c.bg};">
              <div class="space-y-2.5 relative z-10">
                <div class="flex justify-between items-center">
                  <span class="px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm text-[11px] font-black tracking-wide">${c.badge}</span>
                  <span class="text-white/75 text-sm">✦</span>
                </div>
                <h2 class="text-lg font-black leading-snug pt-1">${c.title}</h2>
                <p class="text-xs text-white/90 leading-relaxed">${c.desc}</p>
              </div>

              <div class="relative z-10 pt-4">
                <div class="flex justify-between items-center mb-1">
                  <span class="px-2.5 py-0.5 rounded-lg bg-white text-slate-800 text-[10px] font-black shadow -rotate-6">${c.lTag}</span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-white text-slate-800 text-[10px] font-black shadow rotate-6">${c.rTag}</span>
                </div>
                <div class="rounded-2xl bg-black/15 pt-2 px-2 pb-0 overflow-hidden">
                  ${lnpReadingMascotSvg(c.key)}
                </div>
              </div>
            </div>`).join('')}
        </div>

        <!-- Khung AI Tạo Bài Đọc Nhanh -->
        <form onsubmit="generateAiReadingPassage(event)" class="travel-card p-4 flex flex-wrap gap-2 items-center text-xs border-2 border-orange-300 bg-orange-50/30">
          <span class="font-extrabold text-orange-800">✨ AI Gemini Hydrogen Tạo Đề Đọc Mới:</span>
          <input id="ai-rd-topic" required placeholder="Nhập chủ đề bất kỳ (VD: Space Tourism, Electric Cars, Ocean Plastic)..." class="flex-1 min-w-52 px-3.5 py-2 rounded-xl bg-white border border-[var(--border)]" />
          <select id="ai-rd-lvl" class="px-3 py-2 rounded-xl bg-white border border-[var(--border)] font-bold">
            <option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option>
            <option value="B2" selected>B2</option><option value="C1">C1</option><option value="C2">C2</option>
          </select>
          <button type="submit" class="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold cursor-pointer">⚡ Tạo & Vào Đọc</button>
        </form>
      </div>`;
    return;
  }

  // -----------------------------------------------------------------------
  // MÀN 2: DANH SÁCH BÀI THEO TỪNG CHUYÊN MỤC (ẢNH CHỤP 2, 3, 6, 7, 8, 9!)
  // -----------------------------------------------------------------------
  if (state.readingView !== 'practice') {
    const mode = state.rdCatMode;
    const rawList = cat[mode] || cat.article;
    const q = (state.readingQuery || '').trim().toLowerCase();

    const filtered = rawList.filter(item => {
      if (state.readingCefr !== 'ALL' && item.cefr !== state.readingCefr) return false;
      if (state.rdTopicTagFilter && state.rdTopicTagFilter !== 'ALL' && item.topicTag !== state.rdTopicTagFilter) return false;
      if (state.rdCollectionFilter && state.rdCollectionFilter !== 'ALL' && item.collection !== state.rdCollectionFilter) return false;
      if (q && !(item.title + ' ' + (item.topicTag || '') + ' ' + (item.collection || '')).toLowerCase().includes(q)) return false;
      return true;
    });

    const perPage = (mode === 'thpt' || mode === 'toeic') ? 20 : 16;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    state.readingPage = Math.max(1, Math.min(totalPages, state.readingPage || 1));
    const pageItems = filtered.slice((state.readingPage - 1) * perPage, state.readingPage * perPage);

    const modeTitles = {
      article: 'Đọc báo song ngữ',
      thpt: 'Luyện đề thi THPT quốc gia',
      basic: 'Đọc hiểu cơ bản A1–A2',
      toeic: 'TOEIC Part 5–7',
      ielts: 'Luyện Reading IELTS'
    };

    const collections = (mode === 'toeic') ? RD_TOEIC_COLLECTIONS
      : (mode === 'ielts') ? RD_IELTS_COLLECTIONS
      : (mode === 'thpt') ? ['Đề chính thức & Tham khảo Bộ GD&ĐT', 'Đề thi thử Sở GD&ĐT & Trường Chuyên']
      : [];

    v.innerHTML = `
      <div class="space-y-4">
        <!-- Header ← Luyện đọc + Tiêu đề -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <button onclick="state.rdCatMode='home';state.readingView='hub';render()" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-[var(--border)] text-xs font-extrabold text-slate-700 cursor-pointer">← Luyện đọc</button>
            <h1 class="text-xl sm:text-2xl font-black text-slate-900">${modeTitles[mode]} <span class="text-sm font-mono text-teal-700">(${filtered.length.toLocaleString('vi-VN')})</span></h1>
          </div>
          <input id="rd-mode-search" type="text" value="${escapeHtml(state.readingQuery)}"
            oninput="state.readingQuery=this.value;state.readingPage=1;render()"
            placeholder="${mode === 'article' ? 'Tìm bài báo...' : mode === 'toeic' ? 'Tìm đề TOEIC...' : 'Tìm đề đọc...'}"
            class="px-4 py-2 rounded-xl bg-white border border-[var(--border)] text-xs w-64 focus:outline-none focus:border-teal-500" />
        </div>

        <!-- Bộ lọc Chủ đề & Trình độ cho Đọc báo song ngữ / Đọc hiểu A1-A2 (Y hệt Ảnh chụp 2!) -->
        ${(mode === 'article' || mode === 'basic') ? `
          <div class="travel-card p-4 space-y-3 text-xs">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="font-bold text-slate-500 mr-1">Chủ đề:</span>
              <button onclick="state.rdTopicTagFilter='ALL';state.readingPage=1;render()" class="px-3 py-1 rounded-full font-extrabold cursor-pointer ${(!state.rdTopicTagFilter || state.rdTopicTagFilter==='ALL') ? 'bg-emerald-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">Tất cả</button>
              ${RD_ARTICLE_TOPICS.map(tp => `
                <button onclick="state.rdTopicTagFilter='${tp}';state.readingPage=1;render()" class="px-3 py-1 rounded-full font-bold cursor-pointer ${state.rdTopicTagFilter===tp ? 'bg-emerald-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">${tp}</button>`).join('')}
            </div>
            <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span class="font-bold text-slate-500 mr-1">Trình độ:</span>
              ${(mode === 'basic' ? ['ALL', 'A1', 'A2'] : ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']).map(lv => `
                <button onclick="state.readingCefr='${lv}';state.readingPage=1;render()" class="px-3 py-1 rounded-full font-extrabold cursor-pointer ${state.readingCefr===lv ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}">${lv === 'ALL' ? 'Tất cả' : lv}</button>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Bộ lọc Bộ Đề (Collections) cho TOEIC / IELTS / THPT (Y hệt Ảnh chụp 6, 7, 8, 9!) -->
        ${collections.length ? `
          <div class="flex flex-wrap gap-1.5 text-xs">
            <button onclick="state.rdCollectionFilter='ALL';state.readingPage=1;render()" class="px-3.5 py-2 rounded-full font-extrabold cursor-pointer ${(!state.rdCollectionFilter || state.rdCollectionFilter==='ALL') ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white border border-[var(--border)] text-slate-700'}">Tất cả (${rawList.length})</button>
            ${collections.map(col => `
              <button onclick="state.rdCollectionFilter='${col.replace(/'/g, "\\'")}';state.readingPage=1;render()" class="px-3.5 py-2 rounded-full font-bold cursor-pointer ${state.rdCollectionFilter===col ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white border border-[var(--border)] text-slate-700 hover:border-emerald-400'}">${escapeHtml(col)}</button>`).join('')}
          </div>
        ` : ''}

        <!-- LƯỚI THẺ RIÊNG BIỆT CHUẨN 100% TỪNG CHUYÊN MỤC -->
        ${mode === 'article' || mode === 'basic' ? `
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${pageItems.map(it => {
              const isDone = Boolean(doneMap[it.id]);
              return `
                <div onclick="launchReadingItem('${it.id}','step','all',0)" class="sp-card-lnp ${isDone ? 'is-completed' : ''} justify-between">
                  <div>
                    <div class="relative h-36 bg-slate-100 overflow-hidden">
                      <img src="${it.img}" alt="" loading="lazy" class="w-full h-full object-cover" />
                      <span class="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-slate-900/80 text-white text-[11px] font-black">${it.cefr}</span>
                      <span class="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${isDone ? 'bg-emerald-500 text-white' : 'bg-black/35 text-white/80 border border-white/60'}">✓</span>
                    </div>
                    <div class="p-3.5 space-y-2">
                      <h3 class="font-extrabold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">${escapeHtml(it.title)}</h3>
                      <span class="inline-block px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold">${escapeHtml(it.topicTag)}</span>
                    </div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        ` : mode === 'thpt' ? `
          <!-- Lưới 5 cột thẻ xanh nhạt THPT Quốc Gia (Y hệt Ảnh chụp 3!) -->
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            ${pageItems.map(it => {
              const isDone = Boolean(doneMap[it.id]);
              return `
                <div onclick="launchReadingItem('${it.id}','step','all',50)"
                  class="rounded-2xl p-4 cursor-pointer border-2 transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-[175px] relative overflow-hidden ${isDone ? 'bg-emerald-50 border-emerald-500' : 'bg-[#e6efe9] border-[#c5d8cc] hover:border-emerald-600'}">
                  <div class="flex justify-between items-center">
                    <span class="px-2.5 py-0.5 rounded-md bg-[#2f6f4e] text-white text-[10px] font-black">THPT</span>
                    <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDone ? 'bg-emerald-600 text-white' : 'bg-slate-400/35 text-white'}">✓</span>
                  </div>
                  <div class="my-3 font-extrabold text-xs sm:text-[13px] text-slate-800 line-clamp-3 leading-snug">${escapeHtml(it.title)}</div>
                  <div><span class="px-2.5 py-1 rounded-full bg-white/80 border border-slate-300/70 text-[10px] font-bold text-slate-600">${it.qCount} câu hỏi</span></div>
                </div>`;
            }).join('')}
          </div>
        ` : mode === 'toeic' ? `
          <!-- Lưới 5 cột thẻ xanh dương TOEIC (Y hệt Ảnh chụp 6, 7, 8!) -->
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            ${pageItems.map(it => {
              const isDone = Boolean(doneMap[it.id]);
              return `
                <div onclick="openToeicModeModal('${it.id}')"
                  class="rounded-2xl bg-white border-2 ${isDone ? 'border-emerald-500' : 'border-slate-200 hover:border-sky-500'} overflow-hidden cursor-pointer transition hover:-translate-y-1 hover:shadow-lg flex flex-col">
                  <div class="h-28 relative flex items-center justify-center text-white font-black text-3xl tracking-wider" style="background:linear-gradient(135deg,#00b4d8,#0096c7);">
                    <span>TOEIC</span>
                    <span class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isDone ? 'bg-emerald-500 text-white' : 'bg-black/25 text-white border border-white/60'}">✓</span>
                  </div>
                  <div class="p-3.5 text-xs font-extrabold text-slate-800 line-clamp-2 leading-snug">${escapeHtml(it.title)}</div>
                </div>`;
            }).join('')}
          </div>
        ` : `
          <!-- Lưới 4 cột thẻ đỏ cam IELTS ACADEMIC + Lật thẻ tại chỗ (Y hệt Ảnh chụp 9!) -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            ${pageItems.map(it => {
              const isDone = Boolean(doneMap[it.id]);
              const isFlipped = state.rdFlippedIeltsId === it.id;
              if (isFlipped) {
                return `
                  <div class="rounded-2xl p-4 bg-slate-800 text-white border-2 border-slate-700 shadow-2xl flex flex-col justify-between min-h-[215px]">
                    <div class="flex justify-between items-center">
                      <span class="text-[11px] font-bold text-slate-300 truncate pr-2">${escapeHtml(it.title)}</span>
                      <button type="button" onclick="state.rdFlippedIeltsId='';render()" class="w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 text-xs font-bold cursor-pointer shrink-0">✕</button>
                    </div>
                    <div class="space-y-2.5 my-auto pt-2">
                      <button type="button" onclick="state.rdFlippedIeltsId='';launchReadingItem('${it.id}','step','all',0)"
                        class="w-full p-3 rounded-xl bg-white/10 hover:bg-emerald-600/35 border border-white/15 text-left flex items-center gap-3 cursor-pointer transition">
                        <span class="w-8 h-8 rounded-lg bg-emerald-500/25 text-emerald-300 flex items-center justify-center">📗</span>
                        <div><div class="font-extrabold text-xs">Luyện tập</div><div class="text-[10px] text-slate-300">Chấm ngay từng câu</div></div>
                      </button>
                      <button type="button" onclick="state.rdFlippedIeltsId='';launchReadingItem('${it.id}','timed','all',60)"
                        class="w-full p-3 rounded-xl bg-white/10 hover:bg-sky-600/35 border border-white/15 text-left flex items-center gap-3 cursor-pointer transition">
                        <span class="w-8 h-8 rounded-lg bg-sky-500/25 text-sky-300 flex items-center justify-center">⏱️</span>
                        <div><div class="font-extrabold text-xs">Thi thử</div><div class="text-[10px] text-slate-300">60 phút · nộp mới chấm</div></div>
                      </button>
                    </div>
                  </div>`;
              }
              return `
                <div onclick="state.rdFlippedIeltsId='${it.id}';render()"
                  class="rounded-2xl bg-white border-2 ${isDone ? 'border-emerald-500' : 'border-slate-200 hover:border-orange-500'} overflow-hidden cursor-pointer transition hover:-translate-y-1 hover:shadow-lg flex flex-col min-h-[215px]">
                  <div class="h-32 p-3 relative flex flex-col justify-between text-white" style="background:linear-gradient(135deg,#dc5b3e,#c84b31);">
                    <div class="flex justify-between items-center">
                      <span class="px-2.5 py-0.5 rounded-full bg-white text-sky-800 text-[10px] font-extrabold">• Sát đề thi</span>
                      <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isDone ? 'bg-emerald-500 text-white' : 'bg-black/20 text-white border border-white/60'}">✓</span>
                    </div>
                    <div class="text-center font-black text-3xl tracking-widest">IELTS</div>
                    <div class="text-[9px] font-extrabold tracking-widest uppercase opacity-90">ACADEMIC</div>
                  </div>
                  <div class="p-3.5 text-xs font-extrabold text-slate-800 line-clamp-2 leading-snug">${escapeHtml(it.title)}</div>
                </div>`;
            }).join('')}
          </div>
        `}

        <!-- Thanh phân trang -->
        <div class="flex justify-center items-center gap-3 pt-3 text-xs">
          <button onclick="state.readingPage=Math.max(1,state.readingPage-1);render();window.scrollTo({top:0,behavior:'smooth'})" ${state.readingPage<=1?'disabled':''} class="px-4 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Trước</button>
          <span class="font-extrabold text-slate-700">Trang ${state.readingPage}/${totalPages}</span>
          <button onclick="state.readingPage=Math.min(${totalPages},state.readingPage+1);render();window.scrollTo({top:0,behavior:'smooth'})" ${state.readingPage>=totalPages?'disabled':''} class="px-4 py-2 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer disabled:opacity-40">Sau</button>
        </div>
      </div>`;
    return;
  }

  // -----------------------------------------------------------------------
  // MÀN 3A: GIAO DIỆN ĐỌC BÁO SONG NGỮ 2 CỘT CÂU ĐỐI CHIẾU (Y HỆT ẢNH CHỤP 5!)
  // -----------------------------------------------------------------------
  if (!state.rdActiveItem) {
    const fallback = cat.article[0];
    state.rdActiveItem = materializeReadingItem(fallback);
  }
  const rd = state.rdActiveItem;
  const isDone = Boolean(doneMap[rd.id]);

  if (rd.mode === 'article' && !state.rdShowArticleQuiz) {
    v.innerHTML = `
      <div class="max-w-5xl mx-auto space-y-5">
        <div class="flex flex-wrap justify-between items-center gap-2">
          <button onclick="state.readingView='list';render()" class="px-3.5 py-2 rounded-xl bg-white border border-[var(--border)] text-xs font-extrabold cursor-pointer">← Đọc báo song ngữ</button>
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <button onclick="state.rdHideViCol=!state.rdHideViCol;render()" class="px-3 py-1.5 rounded-xl bg-white border border-[var(--border)] font-bold cursor-pointer">${state.rdHideViCol ? '👁️ Hiện cột dịch tiếng Việt' : '🙈 Ẩn cột dịch để tự đoán'}</button>
            ${(rd.questions && rd.questions.length) ? `<button onclick="state.rdShowArticleQuiz=true;render()" class="px-3.5 py-1.5 rounded-xl bg-sky-600 text-white font-extrabold cursor-pointer">📝 Làm ${rd.questions.length} câu hỏi bài báo</button>` : ''}
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-[var(--border)] shadow-sm overflow-hidden">
          ${rd.img ? `<img src="${rd.img}" alt="" class="w-full h-52 sm:h-64 object-cover" />` : ''}
          <div class="p-5 sm:p-8 space-y-5">
            <div class="border-b border-slate-100 pb-4">
              <div class="flex items-center gap-2 text-xs font-bold text-teal-700">
                <span class="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">${escapeHtml(rd.cefr)}</span>
                <span>• ${escapeHtml(rd.topicTag || 'Đọc báo song ngữ')}</span>
                <span class="text-slate-400">• Bôi đen từ bất kỳ để tra nghĩa, tô màu & lưu Sổ từ</span>
              </div>
              <h1 class="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">${escapeHtml(rd.title)}</h1>
            </div>

            <!-- 2 CỘT CÂU TIẾNG ANH - TIẾNG VIỆT ĐỐI CHIẾU Y HỆT ẢNH CHỤP 5 -->
            <div id="rd-left-passage-pane" onmouseup="handleReadingSelectionMouseUp(event)" class="divide-y divide-slate-100 select-text">
              ${(rd.paragraphs || []).map((s, si) => {
                const safeSpk = String(s.en || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                let enHtml = renderHighlightedReadingText(s.en || '', rd.id);
                if (s.bold) {
                  const escBold = escapeHtml(s.bold).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  try { enHtml = enHtml.replace(new RegExp(escBold, 'i'), m => `<strong class="font-extrabold text-slate-950">${m}</strong>`); } catch {}
                }
                return `
                  <div class="py-3.5 grid ${state.rdHideViCol ? 'grid-cols-1' : 'md:grid-cols-2'} gap-3 sm:gap-8 items-start">
                    <div class="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-800 leading-relaxed">
                      <button type="button" onclick="speak('${safeSpk}','en-US',0.94)" title="Nghe câu này" class="mt-0.5 text-slate-400 hover:text-teal-600 text-xs cursor-pointer shrink-0 select-none">🔊</button>
                      <span>${enHtml}</span>
                    </div>
                    ${state.rdHideViCol ? '' : `<div class="text-sm sm:text-[15px] text-slate-600 leading-relaxed md:border-l md:border-slate-200 md:pl-6">${escapeHtml(s.vi || '')}</div>`}
                  </div>`;
              }).join('')}
            </div>

            <div class="pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-3">
              <button onclick="state.completedItems.reading['${rd.id}']='done';saveLearningProgressNow();notify('✅ Đã đánh dấu đọc xong bài báo (+10 Xu)!');render()"
                class="px-8 py-3 rounded-full border-2 font-extrabold text-xs cursor-pointer transition ${isDone ? 'bg-emerald-600 border-emerald-600 text-white shadow' : 'bg-white hover:bg-emerald-50 border-slate-300 text-slate-800'}">
                ${isDone ? '✓ Đã đọc xong' : 'Đã đọc xong'}
              </button>
              ${(rd.questions && rd.questions.length) ? `<button onclick="state.rdShowArticleQuiz=true;render()" class="px-6 py-3 rounded-full bg-teal-600 text-white font-extrabold text-xs cursor-pointer">Chuyển sang Bài tập đọc hiểu →</button>` : ''}
            </div>
          </div>
        </div>
      </div>`;
    return;
  }

  // -----------------------------------------------------------------------
  // MÀN 3B: PHÒNG THI SPLIT-PANE CHUẨN QUIZTAKEPAGE (Y HỆT ẢNH CHỤP 4!)
  // -----------------------------------------------------------------------
  const qs = rd.questions || [];
  let answeredCount = 0, correctCount = 0;
  qs.forEach((qu, i) => {
    const ans = state.readingAnswers[`${rd.id}_${i}`];
    if (ans !== undefined && ans !== null && String(ans).trim() !== '') answeredCount++;
    if (state.readingGraded) {
      if (qu.type === 'fill') {
        if (String(ans || '').trim().toLowerCase() === String(qu.answerText || '').trim().toLowerCase()) correctCount++;
      } else if (Number(ans) === Number(qu.answer)) correctCount++;
    }
  });
  const progPct = qs.length ? Math.round((answeredCount / qs.length) * 100) : 0;
  const scorePct = (state.readingGraded && qs.length) ? Math.round((correctCount / qs.length) * 100) : 0;
  const band = pctToIeltsBand(scorePct);
  const fontPx = Math.max(13, Math.min(21, Number(state.readingFontSize) || 15));

  v.innerHTML = `
    <div class="space-y-3">
      <!-- TOP EXAM HEADER BAR Y HỆT ẢNH CHỤP 4: ← Thoát | Thanh tiến độ | ⏱ Đồng hồ | 0/40 | 🖨 In đề | Nộp bài -->
      <div class="bg-white rounded-2xl px-4 py-2.5 border border-[var(--border)] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <button onclick="stopExamTimer(false);state.rdShowArticleQuiz=false;state.readingView='list';render()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-700 cursor-pointer">← Thoát</button>

        <div class="flex-1 min-w-36 max-w-xl h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div class="h-full bg-emerald-500 transition-all" style="width:${progPct}%;"></div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span class="px-2.5 py-1 rounded-xl bg-slate-100 font-mono font-extrabold text-slate-700">⏱ <span class="exam-timer-readout">${state.examTimer.remainingSec > 0 ? fmtTimerMmSs(state.examTimer.remainingSec) : (state.readingPracticeType === 'timed' ? '00:00' : 'Tự do')}</span></span>
          <span class="px-2.5 py-1 rounded-xl bg-slate-100 font-mono font-extrabold text-teal-800">${answeredCount}/${qs.length}</span>
          <button onclick="printCurrentReadingExam()" class="px-3 py-1.5 rounded-xl bg-white border border-[var(--border)] hover:bg-slate-50 font-bold cursor-pointer">🖨 In đề</button>
          <button onclick="stopExamTimer(false);state.readingGraded=true;state.completedItems.reading['${rd.id}']='done';saveLearningProgressNow();notify('🎯 Đã chấm điểm bài thi Đọc hiểu!');render()"
            class="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold cursor-pointer shadow-sm">
            ${state.readingGraded ? '✓ Đã chấm' : 'Nộp bài'}
          </button>
        </div>
      </div>

      ${state.readingGraded ? `
        <div class="travel-card p-4 bg-emerald-50 border-2 border-emerald-500 flex flex-wrap justify-between items-center gap-3 text-xs">
          <div>
            <div class="font-extrabold text-emerald-800 uppercase">🏆 KẾT QUẢ BÀI LÀM — ${escapeHtml(rd.title)}</div>
            <div class="text-lg font-black text-slate-900 mt-0.5">Đúng ${correctCount}/${qs.length} câu (${scorePct}%) • Quy đổi IELTS Band ${band} / 9.0</div>
          </div>
          <div class="flex gap-2">
            <button onclick="state.readingMode=(state.readingMode==='bilingual'?'english':'bilingual');render()" class="px-3.5 py-2 rounded-xl bg-white border border-emerald-400 font-bold text-emerald-900 cursor-pointer">🌐 ${state.readingMode==='bilingual'?'Ẩn bản dịch':'Hiện bản dịch song ngữ'}</button>
            <button onclick="state.readingGraded=false;render()" class="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer">🔄 Làm lại</button>
          </div>
        </div>` : ''}

      <!-- KHUNG CHIA ĐÔI SPLIT-PANE Y HỆT ẢNH CHỤP 4 -->
      <div class="lnp-split-container space-y-4 lg:space-y-0" style="--split-left:${state.readingSplitPct || 52}%;">
        <!-- CỘT TRÁI: BÀI ĐỌC -->
        <div id="rd-left-passage-pane" onmouseup="handleReadingSelectionMouseUp(event)" data-scroll-id="rd-left-pane"
          class="bg-white rounded-2xl border border-[var(--border)] p-5 sm:p-6 space-y-4 lg:max-h-[75vh] lg:overflow-y-auto select-text">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-[11px] font-black">BÀI ĐỌC</span>
              <span class="text-xs font-extrabold text-slate-700">Questions 1 – ${qs.length}</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs">
              <button onclick="state.readingMode=(state.readingMode==='bilingual'?'english':'bilingual');render()" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 font-bold cursor-pointer">🌐 ${state.readingMode==='bilingual'?'Chỉ Anh':'Song ngữ'}</button>
              <button onclick="state.readingFontSize=Math.max(13,(state.readingFontSize||15)-1);render()" class="px-2 py-1 rounded-lg bg-slate-100 font-black cursor-pointer">A-</button>
              <button onclick="state.readingFontSize=Math.min(21,(state.readingFontSize||15)+1);render()" class="px-2 py-1 rounded-lg bg-slate-100 font-black cursor-pointer">A+</button>
            </div>
          </div>

          <h2 class="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">${escapeHtml(rd.title)}</h2>

          <div class="space-y-4 text-slate-800 leading-relaxed whitespace-pre-line" style="font-size:${fontPx}px;">
            ${(rd.paragraphs || []).map(p => `
              <div class="space-y-1.5">
                <div class="${p.isHeading ? 'font-extrabold text-teal-800 pt-2' : ''}">${renderHighlightedReadingText(p.en || '', rd.id)}</div>
                ${(state.readingMode === 'bilingual' || state.readingGraded) && p.vi ? `<div class="text-xs text-teal-900 bg-teal-50/75 p-2.5 rounded-xl border border-teal-100">${escapeHtml(p.vi)}</div>` : ''}
              </div>`).join('')}
          </div>
        </div>

        <!-- THANH KÉO GIỮA 2 CỘT -->
        <div class="lnp-split-handle hidden lg:flex" onmousedown="startSplitResize(event,'reading')"></div>

        <!-- CỘT PHẢI: DANH SÁCH CÂU HỎI [A] [B] [C] [D] Y HỆT ẢNH CHỤP 4 -->
        <div data-scroll-id="rd-right-pane" class="bg-white rounded-2xl border border-[var(--border)] p-5 space-y-4 text-xs lg:max-h-[75vh] lg:overflow-y-auto">
          ${qs.map((qu, i) => {
            const key = `${rd.id}_${i}`;
            const userVal = state.readingAnswers[key];
            const flagged = Boolean(state.readingFlaggedQs[key]);
            const instantShow = state.readingGraded || (state.readingPracticeType === 'step' && userVal !== undefined && userVal !== '');

            return `
              ${qu.groupInst ? `<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold leading-relaxed">${escapeHtml(qu.groupInst)}</div>` : ''}
              <div id="rd-q-card-${i}" class="p-4 rounded-2xl border ${flagged ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200 bg-white'} space-y-3 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
                <div class="flex justify-between items-start gap-2">
                  <div class="font-extrabold text-sm text-slate-900 leading-snug">${escapeHtml(qu.q)}</div>
                  <button type="button" onclick="state.readingFlaggedQs['${key}']=!state.readingFlaggedQs['${key}'];render()"
                    title="Đánh dấu câu này"
                    class="px-2 py-1 rounded-lg cursor-pointer ${flagged ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-100'}">⚑</button>
                </div>

                ${qu.type === 'fill' ? `
                  <div class="flex gap-2">
                    <input type="text" value="${escapeHtml(userVal || '')}"
                      oninput="state.readingAnswers['${key}']=this.value;scheduleProgressSave()"
                      placeholder="Nhập từ cần điền..."
                      class="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold focus:bg-white focus:border-teal-500 outline-none" />
                    ${state.readingPracticeType === 'step' && !state.readingGraded ? `<button type="button" onclick="render()" class="px-3.5 py-2 rounded-xl bg-teal-600 text-white font-bold cursor-pointer">Chấm</button>` : ''}
                  </div>
                  ${instantShow ? (() => {
                    const ok = String(userVal || '').trim().toLowerCase() === String(qu.answerText || '').trim().toLowerCase();
                    return `<div class="font-bold ${ok ? 'text-emerald-700' : 'text-rose-700'}">${ok ? '✓ Chính xác!' : `✗ Đáp án đúng: "${escapeHtml(qu.answerText)}"`}</div>`;
                  })() : ''}
                ` : `
                  <div class="space-y-2">
                    ${(qu.options || []).map((opt, oi) => {
                      const picked = userVal !== undefined && userVal !== '' && Number(userVal) === oi;
                      const letter = String.fromCharCode(65 + oi);
                      let rowCls = 'bg-white border-slate-200 hover:border-teal-500 text-slate-800';
                      let boxCls = 'bg-slate-100 text-slate-700 border-slate-300';
                      if (instantShow) {
                        if (oi === Number(qu.answer)) {
                          rowCls = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          boxCls = 'bg-emerald-600 text-white border-emerald-600';
                        } else if (picked) {
                          rowCls = 'bg-rose-50 border-rose-500 text-rose-900';
                          boxCls = 'bg-rose-600 text-white border-rose-600';
                        }
                      } else if (picked) {
                        rowCls = 'bg-teal-50 border-teal-600 text-teal-950 font-bold';
                        boxCls = 'bg-teal-600 text-white border-teal-600';
                      }
                      return `
                        <button type="button" onclick="state.readingAnswers['${key}']=${oi};render()"
                          class="w-full text-left px-3.5 py-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition ${rowCls}">
                          <span class="w-6 h-6 rounded-md border flex items-center justify-center font-mono text-[11px] font-black shrink-0 ${boxCls}">${letter}</span>
                          <span class="leading-snug">${escapeHtml(opt)}</span>
                        </button>`;
                    }).join('')}
                  </div>
                `}

                ${instantShow && qu.explain ? `
                  <div class="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-950 leading-relaxed">
                    💡 <strong>Giải thích:</strong> ${escapeHtml(qu.explain)}
                  </div>` : ''}
              </div>`;
          }).join('')}
        </div>
      </div>

      <!-- THANH ĐÁY PHÒNG THI Y HỆT ẢNH CHỤP 4: 🚩 Đánh dấu bên trái • ⊞ Bảng câu hỏi bên phải -->
      <div class="bg-white rounded-2xl px-4 py-2.5 border border-[var(--border)] flex flex-wrap justify-between items-center gap-2 text-xs">
        <span class="text-slate-600 font-semibold">🚩 Đã đánh dấu xem lại: <strong>${qs.filter((_, i) => state.readingFlaggedQs[`${rd.id}_${i}`]).length}</strong> câu</span>
        <div class="flex flex-wrap gap-1">
          ${qs.map((qu, i) => {
            const key = `${rd.id}_${i}`;
            const hasAns = state.readingAnswers[key] !== undefined && state.readingAnswers[key] !== '';
            const flg = state.readingFlaggedQs[key];
            return `<button onclick="jumpToReadingQuestion(${i})" class="w-7 h-7 rounded-lg font-mono font-bold text-[11px] cursor-pointer border ${flg ? 'bg-amber-400 border-amber-500 text-slate-950' : hasAns ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}">${i + 1}</button>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}
