/* ════════════════════════════════
   DATA
════════════════════════════════ */
const AVATAR_COLORS = ['#f5a623','#00d2b4','#c6f135','#3b82f6','#f43f5e','#a855f7'];

const AUTHORS = [
  { name: 'Layla Hassan',  initials: 'LH', color: '#f5a623' },
  { name: 'Marcus Venn',   initials: 'MV', color: '#00d2b4' },
  { name: 'Sofia Reyes',   initials: 'SR', color: '#c6f135' },
  { name: 'Jin Park',      initials: 'JP', color: '#3b82f6' },
  { name: 'Aria Okonkwo',  initials: 'AO', color: '#f43f5e' },
  { name: 'Eli Strauss',   initials: 'ES', color: '#a855f7' },
];

const CAT_COLORS = {
  'Design':     { fg: '#b84a2b', bg: '#fdf0ec' },
  'Technology': { fg: '#1e2d4a', bg: '#eef2f8' },
  'Culture':    { fg: '#4a6741', bg: '#eef3ed' },
  'Business':   { fg: '#b5862c', bg: '#fdf6ea' },
  'Science':    { fg: '#5b3fa6', bg: '#f3f0fb' },
};

// Gradient backgrounds for cards (CSS gradients, no external images)
const BG_GRADIENTS = [
  'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
  'linear-gradient(135deg,#2d1b2e 0%,#4a1942 50%,#6b2d6b 100%)',
  'linear-gradient(135deg,#0d2137 0%,#1a4a3a 50%,#0a2818 100%)',
  'linear-gradient(135deg,#2a1a0a 0%,#4a2c10 50%,#6b3d15 100%)',
  'linear-gradient(135deg,#1a1a1a 0%,#2d3748 50%,#1a202c 100%)',
  'linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)',
  'linear-gradient(135deg,#1a0a2e 0%,#16213e 50%,#2d1b4e 100%)',
  'linear-gradient(135deg,#0a1628 0%,#1e3a5f 50%,#2a4a7a 100%)',
  'linear-gradient(135deg,#1c0a0a 0%,#3d1515 50%,#5c2222 100%)',
  'linear-gradient(135deg,#0a200a 0%,#1a3d1a 50%,#2a5a2a 100%)',
];

// Decorative SVG patterns for the card images
const SVG_PATTERNS = [
  `<svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g1" cx="30%" cy="40%"><stop offset="0%" stop-color="#c6f135" stop-opacity=".3"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
    <circle cx="80" cy="90" r="120" fill="url(#g1)"/>
    <line x1="0" y1="225" x2="400" y2="0" stroke="rgba(255,255,255,.05)" stroke-width="1"/>
    <line x1="0" y1="180" x2="400" y2="45" stroke="rgba(255,255,255,.04)" stroke-width="1"/>
    <circle cx="320" cy="40" r="60" fill="none" stroke="rgba(198,241,53,.1)" stroke-width="1"/>
    <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="80" fill="rgba(255,255,255,.06)" font-style="italic">01</text>
  </svg>`,
  `<svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g2" cx="70%" cy="60%"><stop offset="0%" stop-color="#f43f5e" stop-opacity=".25"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
    <circle cx="300" cy="140" r="140" fill="url(#g2)"/>
    <rect x="40" y="40" width="120" height="120" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1" transform="rotate(20 100 100)"/>
    <rect x="240" y="60" width="100" height="100" fill="none" stroke="rgba(244,63,94,.15)" stroke-width="1"/>
    <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="80" fill="rgba(255,255,255,.06)" font-style="italic">02</text>
  </svg>`,
  `<svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g3" x1="0" y1="0" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6" stop-opacity=".2"/><stop offset="100%" stop-color="#00d2b4" stop-opacity=".15"/></linearGradient></defs>
    <rect width="400" height="225" fill="url(#g3)"/>
    <line x1="0" y1="0"   x2="400" y2="225" stroke="rgba(255,255,255,.04)" stroke-width="1"/>
    <line x1="200" y1="0" x2="200" y2="225" stroke="rgba(255,255,255,.04)" stroke-width="1"/>
    <circle cx="200" cy="112" r="80" fill="none" stroke="rgba(59,130,246,.15)" stroke-width="1"/>
    <circle cx="200" cy="112" r="50" fill="none" stroke="rgba(0,210,180,.1)"   stroke-width="1"/>
    <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="80" fill="rgba(255,255,255,.06)" font-style="italic">03</text>
  </svg>`,
  `<svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g4" cx="50%" cy="50%"><stop offset="0%" stop-color="#f59e0b" stop-opacity=".2"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
    <circle cx="200" cy="112" r="160" fill="url(#g4)"/>
    <polygon points="200,20 380,200 20,200" fill="none" stroke="rgba(245,158,11,.12)" stroke-width="1"/>
    <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="80" fill="rgba(255,255,255,.06)" font-style="italic">04</text>
  </svg>`,
  `<svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g5" cx="20%" cy="80%"><stop offset="0%" stop-color="#a855f7" stop-opacity=".25"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
    <circle cx="80" cy="180" r="160" fill="url(#g5)"/>
    <line x1="0" y1="112" x2="400" y2="112" stroke="rgba(255,255,255,.05)" stroke-width="1"/>
    <circle cx="330" cy="50" r="70"  fill="none" stroke="rgba(168,85,247,.12)" stroke-width="1"/>
    <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="80" fill="rgba(255,255,255,.06)" font-style="italic">05</text>
  </svg>`,
  `<svg width="100%" height="100%" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g6" x1="0" y1="0" x2="100%" y2="0"><stop offset="0%" stop-color="#00d2b4" stop-opacity=".15"/><stop offset="100%" stop-color="#3b82f6" stop-opacity=".2"/></linearGradient></defs>
    <rect width="400" height="225" fill="url(#g6)"/>
    <rect x="0" y="0" width="400" height="225" fill="none" stroke="rgba(255,255,255,.04)" stroke-width="20"/>
    <text x="50%" y="55%" text-anchor="middle" font-family="Georgia,serif" font-size="80" fill="rgba(255,255,255,.06)" font-style="italic">06</text>
  </svg>`,
];

const ALL_POSTS = [
  {
    id: 1, featured: false,
    category: 'Design',
    title: 'The Typography Renaissance: Why Type Choices Define Brand Identity',
    excerpt: 'In an era of visual noise, the choice of a typeface is no longer a minor aesthetic decision—it is a fundamental act of communication.',
    author: AUTHORS[0], date: 'Apr 28, 2026', readTime: '6 min read',
    bgIndex: 0,
    content: [
      'Typography is the backbone of visual communication. When you choose a typeface, you are selecting not just letterforms but an entire emotional register—a personality, a heritage, a voice.',
      'In the last decade, we have witnessed a profound shift in how designers approach type. The democratisation of type foundries, the proliferation of variable fonts, and the rise of editorial design online have all contributed to a renewed seriousness around typographic choices.',
      'The most memorable brands today are often those with the most disciplined typographic systems. Consider the quiet confidence of a mono-spaced serif against a geometric sans, or the tension between a heavy display weight and a whisper-thin caption.',
      'As designers, our role is to make these tensions purposeful—to ensure every typographic decision earns its place on the page.',
    ],
  },
  {
    id: 2, featured: true,
    category: 'Technology',
    title: 'AI at the Edge: How On-Device Intelligence is Reshaping Privacy',
    excerpt: 'The shift from cloud-based to on-device AI processing represents one of the most significant architectural changes in consumer technology—and its privacy implications are profound.',
    author: AUTHORS[1], date: 'May 2, 2026', readTime: '9 min read',
    bgIndex: 1,
    content: [
      'For years, the default model for AI-powered features was simple: send data to a server, process it in the cloud, return the result. This architecture was born of necessity—early mobile devices lacked the compute power to run complex neural networks locally.',
      'That constraint is dissolving rapidly. Modern mobile chips from Apple, Google, and Qualcomm now incorporate dedicated neural processing units capable of running billion-parameter models in milliseconds, entirely on-device.',
      'The privacy implications are significant. When your voice assistant processes your speech locally, that audio never traverses a network. When your camera applies AI enhancements before saving, the raw image data stays on your device.',
      'But on-device AI introduces its own set of challenges: model updates require OS-level changes, capabilities are constrained by thermal and battery limits, and the fragmentation of hardware capabilities makes consistent experiences difficult to guarantee.',
    ],
  },
  {
    id: 3, featured: false,
    category: 'Culture',
    title: 'Slow Travel in the Age of Algorithmic Tourism',
    excerpt: 'When every destination is pre-curated by an algorithm, what does authentic discovery look like?',
    author: AUTHORS[2], date: 'Apr 21, 2026', readTime: '5 min read',
    bgIndex: 2,
    content: [
      'There is a particular kind of ennui that sets in when you arrive at a destination and realise you have already seen it—not in person, but in the ten thousand identical photographs that precede every Instagram post, every travel blog, every algorithmic recommendation.',
      'Algorithmic tourism has created a paradox: we have more information about the world than ever before, and yet we are less likely to be genuinely surprised by it.',
      'The slow travel movement offers a counterpoint. Rather than optimising an itinerary for maximum coverage, slow travellers choose depth over breadth—spending weeks in a single neighbourhood, learning a few words of the local language, eating where there is no translated menu.',
      'The discovery that emerges from this approach cannot be surfaced by any algorithm, because it is inherently personal, contextual, and serendipitous.',
    ],
  },
  {
    id: 4, featured: false,
    category: 'Business',
    title: 'The Return-to-Office Paradox: Productivity vs. Presence',
    excerpt: 'Three years of remote work data tells a nuanced story that most corporate mandates ignore.',
    author: AUTHORS[3], date: 'Apr 15, 2026', readTime: '7 min read',
    bgIndex: 3,
    content: [
      'The debate over remote work has often been framed as a binary: office good, remote bad (or vice versa). But the data accumulated over three years of involuntary remote work experimentation tells a more complicated story.',
      'Output-based productivity metrics—lines of code written, tickets closed, documents produced—generally improved or held steady in remote settings. Collaborative creativity, onboarding of new employees, and cultural transmission are where remote work shows genuine deficits.',
      'The most successful companies in this new landscape are those that have resisted the urge to issue blanket mandates in either direction, instead building flexible systems that optimise for the type of work being done.',
    ],
  },
  {
    id: 5, featured: false,
    category: 'Science',
    title: 'Synthetic Photosynthesis: Engineering Our Way Out of the Carbon Crisis',
    excerpt: 'Mimicking the most efficient energy conversion system on Earth might be humanity\'s best hope.',
    author: AUTHORS[4], date: 'Apr 10, 2026', readTime: '8 min read',
    bgIndex: 4,
    content: [
      'Every second, plants across the Earth convert approximately 100 terawatts of solar energy into chemical energy—a process so efficient and elegant that scientists have spent decades trying to replicate it artificially.',
      'Artificial photosynthesis, or synthetic photosynthesis, refers to a family of technologies that aim to split water molecules using sunlight, producing hydrogen fuel and oxygen as byproducts.',
      'Recent breakthroughs in semiconductor catalysis have pushed solar-to-fuel efficiencies beyond 20%—surpassing the best natural photosystems under certain conditions. The challenge now is durability, cost-effective manufacturing, and integration with existing energy infrastructure.',
      'If these barriers can be overcome, synthetic photosynthesis could serve as both an energy source and a carbon sink, fundamentally altering our relationship with atmospheric CO₂.',
    ],
  },
  {
    id: 6, featured: false,
    category: 'Design',
    title: 'Dark Patterns, Bright Lines: The Ethics of Persuasive Interface Design',
    excerpt: 'The line between good UX and manipulation is thinner than most designers admit.',
    author: AUTHORS[5], date: 'Apr 5, 2026', readTime: '6 min read',
    bgIndex: 5,
    content: [
      'Every interface is persuasive. The question is whether that persuasion is aligned with the user\'s interests or against them.',
      'Dark patterns—design choices that steer users toward actions they did not intend—have been documented since UX researcher Harry Brignull coined the term in 2010. What has changed is the sophistication of their deployment.',
      'Modern A/B testing infrastructure allows companies to optimise continuously toward conversion, often without any individual designer making an explicit ethical choice. The dark pattern emerges from the aggregate of thousands of incremental optimisations.',
      'Responsible design requires building ethical constraints into the optimisation process itself—not just reviewing individual design decisions, but questioning what the system is being optimised for.',
    ],
  },
];

/* ════ STATE ════ */
let activeFilter = 'all';
let visibleCount = 6;

/* ════ MARQUEE ════ */
(function buildMarquee() {
  const items = ['Latest Stories', '·', 'Design', '·', 'Technology', '·', 'Culture', '·', 'Business', '·', 'Science', '·'];
  const doubled = [...items, ...items];
  document.getElementById('marquee').innerHTML = doubled.map(t =>
    `<span>${t}</span>`
  ).join('');
})();

/* ════ HERO POST ════ */
function buildHero() {
  const p = ALL_POSTS.find(p => p.featured) || ALL_POSTS[0];
  const catStyle = CAT_COLORS[p.category] || {};
  document.getElementById('hero-section').innerHTML = `
    <div class="hero-post" onclick="openPost(${p.id})">
      <div class="hero-image">
        <div class="hero-image-inner" style="background:${BG_GRADIENTS[p.bgIndex]}">
          ${SVG_PATTERNS[p.bgIndex % SVG_PATTERNS.length]}
        </div>
      </div>
      <div class="hero-content">
        <div>
          <div class="hero-tag">${p.category}</div>
          <h1 class="hero-title">${p.title.replace(/:/,':<em>').replace(/<em>(.*)/,'<em>$1</em>')}</h1>
          <p class="hero-excerpt">${p.excerpt}</p>
        </div>
        <div class="hero-meta">
          <div class="hero-author">
            <div class="author-dot" style="background:${p.author.color}">${p.author.initials}</div>
            ${p.author.name}
          </div>
          <div class="read-time">${p.readTime}</div>
        </div>
      </div>
    </div>
  `;
}
buildHero();

/* ════ FILTER ════ */
function setFilter(btn, cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  visibleCount = 6;
  renderGrid();
}

function filterPosts() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  renderGrid(q);
}

/* ════ RENDER GRID ════ */
function renderGrid(search = '') {
  const filtered = ALL_POSTS.filter(p => {
    const matchCat = activeFilter === 'all' || p.category === activeFilter;
    const matchQ   = !search || p.title.toLowerCase().includes(search) || p.excerpt.toLowerCase().includes(search);
    return matchCat && matchQ;
  });

  const visible = filtered.slice(0, visibleCount);
  document.getElementById('post-count').textContent = `${filtered.length} post${filtered.length !== 1 ? 's' : ''}`;

  const grid = document.getElementById('posts-grid');
  grid.innerHTML = '';

  let i = 0;
  visible.forEach((p, idx) => {
    // Insert quote card every 5 posts
    if (idx === 4) {
      grid.insertAdjacentHTML('beforeend', buildQuoteCard(idx));
    }

    const delay = idx * 60;
    grid.insertAdjacentHTML('beforeend', buildCard(p, delay));
  });

  // Load more visibility
  document.getElementById('load-more-btn').style.display =
    filtered.length > visibleCount ? 'flex' : 'none';
}

function buildCard(p, delay) {
  const cat     = CAT_COLORS[p.category] || { fg:'#666', bg:'#eee' };
  const featured = p.featured ? 'featured' : '';
  return `
    <div class="post-card ${featured}" style="animation-delay:${delay}ms" onclick="openPost(${p.id})">
      <div class="card-img-wrap">
        <div class="card-img-inner" style="background:${BG_GRADIENTS[p.bgIndex]}">
          ${SVG_PATTERNS[p.bgIndex % SVG_PATTERNS.length]}
        </div>
      </div>
      <div class="card-body-custom">
        <div class="card-cat" style="color:${cat.fg}">${p.category}</div>
        <div class="card-title">${p.title}</div>
        <div class="card-excerpt">${p.excerpt}</div>
        <div class="card-footer-row">
          <div class="card-author">
            <div class="card-author-dot" style="background:${p.author.color}">${p.author.initials}</div>
            ${p.author.name}
          </div>
          <div class="card-date">${p.date}</div>
        </div>
      </div>
    </div>
  `;
}

function buildQuoteCard(idx) {
  const quotes = [
    { text: '"Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible."', author: 'Don Norman' },
    { text: '"The best way to predict the future is to invent it."', author: 'Alan Kay' },
  ];
  const q = quotes[Math.floor(idx / 4) % quotes.length];
  return `
    <div class="quote-card" style="animation-delay:${idx * 60}ms">
      <div class="quote-mark">"</div>
      <div class="quote-text">${q.text.replace(/^"|"$/g,'')}</div>
      <div class="quote-author">— ${q.author}</div>
    </div>
  `;
}

/* ════ LOAD MORE ════ */
function loadMore() {
  const btn = document.getElementById('load-more-btn');
  btn.classList.add('loading');
  btn.querySelector('.btn-label').textContent = 'Loading…';

  setTimeout(() => {
    visibleCount += 3;
    renderGrid(document.getElementById('search-input').value.trim().toLowerCase());
    btn.classList.remove('loading');
    btn.querySelector('.btn-label').textContent = 'Load More Stories';
  }, 800);
}

/* ════ POST MODAL ════ */
function openPost(id) {
  const p = ALL_POSTS.find(p => p.id === id);
  if (!p) return;
  const cat = CAT_COLORS[p.category] || {};
  document.getElementById('post-modal-inner').innerHTML = `
    <button class="modal-close" onclick="closePost()"><i class="bi bi-x"></i></button>
    <div style="aspect-ratio:16/7;background:${BG_GRADIENTS[p.bgIndex]};overflow:hidden">
      ${SVG_PATTERNS[p.bgIndex % SVG_PATTERNS.length]}
    </div>
    <div class="modal-body">
      <div class="modal-cat" style="color:${cat.fg || '#666'}">${p.category}</div>
      <h1 class="modal-title">${p.title}</h1>
      <div class="modal-meta">
        <div style="display:flex;align-items:center;gap:8px">
          <div class="card-author-dot" style="background:${p.author.color};width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:600;color:#000">${p.author.initials}</div>
          ${p.author.name}
        </div>
        <span>${p.date}</span>
        <span>${p.readTime}</span>
      </div>
      <div class="modal-content-text">
        ${p.content.map(para => `<p>${para}</p>`).join('')}
      </div>
    </div>
  `;
  document.getElementById('post-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePost() {
  document.getElementById('post-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target === e.currentTarget) closePost();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePost();
});

/* ════ INIT ════ */
renderGrid();