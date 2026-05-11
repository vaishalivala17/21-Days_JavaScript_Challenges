const MOVIES = [
  {
    
    id:1, title:"Neon Requiem", year:2025, runtime:"2h 14m", rating:"R",
    match:97, imdb:8.4,
    genres:["Sci-Fi","Thriller","Drama"],
    desc:"In a rain-soaked megacity where memory is traded like currency, a disgraced detective uncovers a conspiracy that could erase the last 20 years of human history.",
    cast:"Idris Elba, Zendaya, Oscar Isaac, Lupita Nyong'o",
    director:"Denis Villeneuve",
    progress:42,
    color:"#1a2a3a",
    accent:"#4a8fa8",
    gradient:"linear-gradient(135deg,#0a1520 0%,#1a3a4a 40%,#0d2535 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="m1" cx="60%" cy="40%"><stop offset="0%" stop-color="#4a8fa8" stop-opacity=".4"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        <radialGradient id="m1b" cx="20%" cy="80%"><stop offset="0%" stop-color="#e50914" stop-opacity=".15"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      </defs>
      <rect width="860" height="400" fill="#0a1520"/>
      <circle cx="516" cy="160" r="200" fill="url(#m1)"/>
      <circle cx="172" cy="320" r="150" fill="url(#m1b)"/>
      <!-- Rain lines -->
      ${Array.from({length:40},(_,i)=>`<line x1="${80+i*20}" y1="${Math.random()*-100}" x2="${70+i*20}" y2="${Math.random()*500}" stroke="rgba(74,143,168,.12)" stroke-width="1"/>`).join('')}
      <!-- City silhouette -->
      <rect x="0" y="280" width="860" height="120" fill="#050e18"/>
      ${[50,80,120,95,140,60,100,115,70,90,130,85,110,75,145,65,105,125,55,95].map((h,i)=>`<rect x="${i*44}" y="${280-h}" width="38" height="${h}" fill="#08151e"/>`).join('')}
      <!-- Window lights -->
      ${Array.from({length:60},(_,i)=>`<rect x="${Math.floor(i/3)*44+5+(i%3)*12}" y="${290-50+Math.random()*40}" width="6" height="4" fill="rgba(255,200,100,${Math.random()>.6?'.6':'0'})"/>`).join('')}
      <text x="430" y="170" text-anchor="middle" font-family="serif" font-size="96" fill="rgba(255,255,255,.025)" font-style="italic">NEON</text>
    </svg>`,
  },
  {
    id:2, title:"The Last Meridian", year:2025, runtime:"1h 58m", rating:"PG-13",
    match:94, imdb:7.9,
    genres:["Adventure","Drama","History"],
    desc:"A lone cartographer crosses an unmapped continent to deliver a treaty that could end a century of war—only to discover the map itself is the weapon.",
    cast:"Timothée Chalamet, Florence Pugh, Mahershala Ali",
    director:"Chloe Zhao",
    progress:0,
    gradient:"linear-gradient(135deg,#1a1205 0%,#3a2a10 40%,#2a1a08 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m2" cx="50%" cy="30%"><stop offset="0%" stop-color="#c8912e" stop-opacity=".3"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#140e04"/>
      <circle cx="430" cy="120" r="180" fill="url(#m2)"/>
      <!-- Desert dunes -->
      <path d="M0 350 Q215 200 430 300 Q645 380 860 260 L860 400 L0 400Z" fill="#1a0f05"/>
      <path d="M0 380 Q215 280 430 340 Q645 400 860 320 L860 400 L0 400Z" fill="#0f0803"/>
      <!-- Star field -->
      ${Array.from({length:80},(_,i)=>`<circle cx="${Math.random()*860}" cy="${Math.random()*200}" r="${Math.random()*1.5+.3}" fill="rgba(255,255,220,${Math.random()*.7+.2})"/>`).join('')}
      <!-- Sun/Moon -->
      <circle cx="430" cy="80" r="40" fill="rgba(255,190,80,.7)"/>
      <circle cx="430" cy="80" r="45" fill="none" stroke="rgba(255,190,80,.2)" stroke-width="6"/>
    </svg>`,
  },
  {
    id:3, title:"Fracture Point", year:2024, runtime:"2h 02m", rating:"R",
    match:91, imdb:8.1,
    genres:["Action","Thriller"],
    desc:"An elite extraction operative is sent to recover a stolen bioweapon—only to discover her own agency ordered the theft.",
    cast:"Ana de Armas, John David Washington, Adam Driver",
    director:"Chad Stahelski",
    progress:78,
    gradient:"linear-gradient(135deg,#150505 0%,#2a0808 40%,#1a0505 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m3" cx="50%" cy="50%"><stop offset="0%" stop-color="#e50914" stop-opacity=".2"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#100404"/>
      <circle cx="430" cy="200" r="220" fill="url(#m3)"/>
      <!-- Fracture lines -->
      <line x1="430" y1="0" x2="380" y2="400" stroke="rgba(229,9,20,.15)" stroke-width="1.5"/>
      <line x1="430" y1="0" x2="490" y2="400" stroke="rgba(229,9,20,.1)" stroke-width="1"/>
      <line x1="430" y1="0" x2="310" y2="400" stroke="rgba(229,9,20,.08)" stroke-width="1"/>
      <line x1="430" y1="0" x2="560" y2="400" stroke="rgba(229,9,20,.08)" stroke-width="1"/>
      <!-- Crosshair -->
      <circle cx="430" cy="180" r="70" fill="none" stroke="rgba(229,9,20,.18)" stroke-width="1.5"/>
      <circle cx="430" cy="180" r="35" fill="none" stroke="rgba(229,9,20,.25)" stroke-width="1"/>
      <line x1="360" y1="180" x2="500" y2="180" stroke="rgba(229,9,20,.18)" stroke-width="1"/>
      <line x1="430" y1="110" x2="430" y2="250" stroke="rgba(229,9,20,.18)" stroke-width="1"/>
    </svg>`,
  },
  {
    id:4, title:"Pale Blue Echo", year:2025, runtime:"1h 46m", rating:"PG",
    match:88, imdb:7.6,
    genres:["Sci-Fi","Romance","Drama"],
    desc:"Two astronauts on opposite sides of a dying solar system find a way to communicate across the void—and across time itself.",
    cast:"Gemma Chan, Anthony Mackie, Dev Patel",
    director:"Alex Garland",
    progress:0,
    gradient:"linear-gradient(135deg,#04101a 0%,#0a2040 40%,#061428 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="m4a" cx="30%" cy="50%"><stop offset="0%" stop-color="#2060c0" stop-opacity=".25"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        <radialGradient id="m4b" cx="75%" cy="50%"><stop offset="0%" stop-color="#20a0c0" stop-opacity=".2"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      </defs>
      <rect width="860" height="400" fill="#020810"/>
      <circle cx="258" cy="200" r="160" fill="url(#m4a)"/>
      <circle cx="645" cy="200" r="160" fill="url(#m4b)"/>
      ${Array.from({length:120},(_,i)=>`<circle cx="${Math.random()*860}" cy="${Math.random()*400}" r="${Math.random()*1.2+.2}" fill="rgba(200,230,255,${Math.random()*.6+.1})"/>`).join('')}
      <!-- Planet A -->
      <circle cx="220" cy="200" r="55" fill="#1a3a6a"/>
      <ellipse cx="220" cy="200" rx="90" ry="14" fill="none" stroke="rgba(100,180,255,.3)" stroke-width="2.5"/>
      <!-- Planet B -->
      <circle cx="640" cy="200" r="38" fill="#0a2a3a"/>
      <circle cx="640" cy="200" r="38" fill="none" stroke="rgba(32,160,192,.3)" stroke-width="2"/>
      <!-- Signal arc -->
      <path d="M275 200 Q430 80 605 200" fill="none" stroke="rgba(100,200,255,.15)" stroke-width="1.5" stroke-dasharray="8,6"/>
    </svg>`,
  },
  {
    id:5, title:"Kingdom of Dust", year:2024, runtime:"2h 31m", rating:"R",
    match:96, imdb:8.7,
    genres:["Drama","Crime","Thriller"],
    desc:"Three siblings inherit their father's empire—and the enemies he spent a lifetime making.",
    cast:"Brian Tyree Henry, Viola Davis, Pedro Pascal, Tilda Swinton",
    director:"Barry Jenkins",
    progress:35,
    gradient:"linear-gradient(135deg,#0a0804 0%,#1e1408 40%,#120e06 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m5" cx="50%" cy="50%"><stop offset="0%" stop-color="#8a6a20" stop-opacity=".3"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#080604"/>
      <circle cx="430" cy="200" r="200" fill="url(#m5)"/>
      <!-- Crown silhouette -->
      <path d="M300 250 L300 200 L340 230 L380 160 L420 230 L460 160 L500 230 L540 200 L540 250 Z" fill="rgba(200,160,50,.12)" stroke="rgba(200,160,50,.2)" stroke-width="1.5"/>
      <!-- Pillar shadows -->
      ${[180,260,340,420,500,580,660].map(x=>`<rect x="${x}" y="0" width="3" height="400" fill="rgba(255,255,255,.015)"/>`).join('')}
    </svg>`,
  },
  {
    id:6, title:"Synthetic Heart", year:2025, runtime:"1h 52m", rating:"PG-13",
    match:85, imdb:7.5,
    genres:["Sci-Fi","Comedy","Romance"],
    desc:"When an AI therapist accidentally falls in love with its most difficult patient, the consequences rewrite the rules of consciousness.",
    cast:"Riz Ahmed, Awkwafina, Daniel Kaluuya",
    director:"Michel Gondry",
    progress:0,
    gradient:"linear-gradient(135deg,#0a0520 0%,#1a0a3a 40%,#120820 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m6" cx="50%" cy="50%"><stop offset="0%" stop-color="#a050f0" stop-opacity=".25"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#080415"/>
      <circle cx="430" cy="200" r="200" fill="url(#m6)"/>
      <!-- Circuit board -->
      ${Array.from({length:12},(_,i)=>`
        <line x1="${100+i*55}" y1="0" x2="${100+i*55}" y2="400" stroke="rgba(160,80,240,.05)" stroke-width="1"/>
        <line x1="0" y1="${50+i*27}" x2="860" y2="${50+i*27}" stroke="rgba(160,80,240,.05)" stroke-width="1"/>
      `).join('')}
      <!-- Heart pulse -->
      <path d="M300 200 L330 200 L350 160 L380 240 L410 180 L440 200 L460 200 L480 150 L510 250 L540 200 L560 200" fill="none" stroke="rgba(160,80,240,.4)" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id:7, title:"Iron Meridian", year:2025, runtime:"2h 24m", rating:"PG-13",
    match:93, imdb:8.2,
    genres:["Action","Sci-Fi"],
    desc:"Earth's last defense force launches a desperate counterattack against an alien armada—using the enemy's own technology.",
    cast:"Dwayne Johnson, Zoe Saldaña, Jason Statham",
    director:"F. Gary Gray",
    progress:60,
    gradient:"linear-gradient(135deg,#04100a 0%,#082008 40%,#061408 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m7" cx="50%" cy="50%"><stop offset="0%" stop-color="#20a040" stop-opacity=".25"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#030a04"/>
      <circle cx="430" cy="200" r="180" fill="url(#m7)"/>
      <!-- HUD rings -->
      ${[60,100,140,180].map(r=>`<circle cx="430" cy="200" r="${r}" fill="none" stroke="rgba(32,160,64,.1)" stroke-width="1" stroke-dasharray="6,4"/>`).join('')}
      <!-- Target marks -->
      ${[[200,150],[620,250],[350,280],[510,130]].map(([x,y])=>`
        <line x1="${x-12}" y1="${y}" x2="${x+12}" y2="${y}" stroke="rgba(32,160,64,.3)" stroke-width="1"/>
        <line x1="${x}" y1="${y-12}" x2="${x}" y2="${y+12}" stroke="rgba(32,160,64,.3)" stroke-width="1"/>
        <circle cx="${x}" cy="${y}" r="6" fill="none" stroke="rgba(32,160,64,.2)" stroke-width="1"/>
      `).join('')}
    </svg>`,
  },
  {
    id:8, title:"The Moth & the Flame", year:2024, runtime:"1h 58m", rating:"PG-13",
    match:90, imdb:7.8,
    genres:["Romance","Drama","Musical"],
    desc:"A jazz singer and a classical violinist collide in 1950s Paris—their music, their passion, and their secrets threatening to consume them both.",
    cast:"Cynthia Erivo, Saoirse Ronan, Jeffrey Wright",
    director:"Damien Chazelle",
    progress:0,
    gradient:"linear-gradient(135deg,#1a0808 0%,#3a1010 40%,#2a0c0c 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m8" cx="50%" cy="60%"><stop offset="0%" stop-color="#e05030" stop-opacity=".3"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#120606"/>
      <circle cx="430" cy="240" r="200" fill="url(#m8)"/>
      <!-- Music staff lines -->
      ${[160,180,200,220,240].map(y=>`<line x1="200" y1="${y}" x2="660" y2="${y}" stroke="rgba(255,200,180,.08)" stroke-width="1"/>`).join('')}
      <!-- Notes -->
      ${[[280,160],[320,200],[360,180],[400,220],[440,160],[480,200],[520,180],[560,200]].map(([x,y])=>`
        <ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="rgba(255,160,120,.2)" transform="rotate(-15,${x},${y})"/>
        <line x1="${x+7}" y1="${y}" x2="${x+7}" y2="${y-30}" stroke="rgba(255,160,120,.2)" stroke-width="1.5"/>
      `).join('')}
      <!-- Flame -->
      <path d="M430 300 Q400 260 415 220 Q430 200 430 180 Q445 210 440 240 Q455 210 445 180 Q470 220 450 260 Z" fill="rgba(229,9,20,.15)"/>
    </svg>`,
  },
  {
    id:9, title:"Cascade Protocol", year:2025, runtime:"2h 08m", rating:"R",
    match:89, imdb:8.0,
    genres:["Thriller","Mystery","Crime"],
    desc:"A forensic analyst with perfect recall discovers her memories have been surgically altered—and someone will kill to keep it secret.",
    cast:"Natalie Portman, Joel Edgerton, Rebecca Ferguson",
    director:"David Fincher",
    progress:15,
    gradient:"linear-gradient(135deg,#040814 0%,#0a1428 40%,#061018 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m9" cx="40%" cy="50%"><stop offset="0%" stop-color="#2050a0" stop-opacity=".2"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#030810"/>
      <circle cx="344" cy="200" r="180" fill="url(#m9)"/>
      <!-- Data cascade -->
      ${Array.from({length:20},(_,i)=>`
        <text x="${30+i*42}" y="${50+Math.random()*300}" font-family="monospace" font-size="${10+Math.random()*8}"
          fill="rgba(32,80,160,.${Math.floor(Math.random()*4)+1})">${Math.random()>.5?'1':'0'}</text>
      `).join('')}
      <!-- Eye of surveillance -->
      <ellipse cx="430" cy="200" rx="90" ry="50" fill="none" stroke="rgba(32,80,160,.2)" stroke-width="1.5"/>
      <circle cx="430" cy="200" r="24" fill="rgba(32,80,160,.15)"/>
      <circle cx="430" cy="200" r="10" fill="rgba(32,80,160,.25)"/>
    </svg>`,
  },
  {
    id:10, title:"Sundown Protocol", year:2024, runtime:"1h 44m", rating:"R",
    match:82, imdb:7.3,
    genres:["Western","Action","Drama"],
    desc:"In the lawless frontier of a terraformed Mars colony, a veteran marshal hunts a killer who might be humanity's last hope.",
    cast:"Ethan Hawke, Tommy Lee Jones, Angela Bassett",
    director:"Taylor Sheridan",
    progress:0,
    gradient:"linear-gradient(135deg,#180808 0%,#301010 40%,#201010 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m10" cx="70%" cy="35%"><stop offset="0%" stop-color="#c03020" stop-opacity=".4"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#140606"/>
      <circle cx="602" cy="140" r="180" fill="url(#m10)"/>
      <!-- Dusty ground -->
      <path d="M0 320 Q430 280 860 330 L860 400 L0 400Z" fill="#1a0808"/>
      <!-- Mars sun -->
      <circle cx="602" cy="120" r="50" fill="rgba(220,80,40,.5)"/>
      <circle cx="602" cy="120" r="60" fill="none" stroke="rgba(220,80,40,.2)" stroke-width="4"/>
      <!-- Rock silhouettes -->
      ${[[80,60],[200,40],[500,70],[720,50],[820,45]].map(([x,h])=>`
        <path d="M${x} 320 L${x-h*.4} ${320-h} L${x+h*.5} ${320-h*.7} L${x+h*.8} 320Z" fill="#0e0404"/>
      `).join('')}
    </svg>`,
  },
  {
    id:11, title:"Vertex", year:2025, runtime:"2h 18m", rating:"PG-13",
    match:95, imdb:8.5,
    genres:["Sci-Fi","Mystery"],
    desc:"A mathematical genius discovers that reality is a simulation—and finds the backdoor left by its architect.",
    cast:"Keanu Reeves, Jennifer Connelly, Mahershala Ali",
    director:"Christopher Nolan",
    progress:0,
    gradient:"linear-gradient(135deg,#050515 0%,#0a0a30 40%,#080818 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs><radialGradient id="m11" cx="50%" cy="50%"><stop offset="0%" stop-color="#4040f0" stop-opacity=".2"/><stop offset="100%" stop-color="transparent"/></radialGradient></defs>
      <rect width="860" height="400" fill="#040412"/>
      <circle cx="430" cy="200" r="200" fill="url(#m11)"/>
      <!-- Infinite grid -->
      ${Array.from({length:22},(_,i)=>`
        <line x1="0" y1="${i*20}" x2="860" y2="${i*20}" stroke="rgba(60,60,240,.04)" stroke-width="1"/>
        <line x1="${i*40}" y1="0" x2="${i*40}" y2="400" stroke="rgba(60,60,240,.04)" stroke-width="1"/>
      `).join('')}
      <!-- Central vertex -->
      <circle cx="430" cy="200" r="6" fill="#8080ff"/>
      ${[40,80,120,160].map(r=>`<circle cx="430" cy="200" r="${r}" fill="none" stroke="rgba(80,80,255,.${5-Math.floor(r/40)})" stroke-width="1" stroke-dasharray="${r/4},${r/8}"/>`).join('')}
      <!-- Connection lines -->
      ${[[200,100],[620,100],[100,300],[700,280],[430,60]].map(([x,y])=>`
        <line x1="430" y1="200" x2="${x}" y2="${y}" stroke="rgba(80,80,255,.12)" stroke-width="1"/>
        <circle cx="${x}" cy="${y}" r="3" fill="rgba(80,80,255,.3)"/>
      `).join('')}
    </svg>`,
  },
  {
    id:12, title:"Wild Current", year:2024, runtime:"1h 38m", rating:"PG",
    match:80, imdb:7.1,
    genres:["Adventure","Family","Drama"],
    desc:"A young surfer and her estranged father embark on a journey across the Pacific that tests them both.",
    cast:"Saoirse Ronan, Sam Neill, Louis Hofmann",
    director:"Taika Waititi",
    progress:90,
    gradient:"linear-gradient(135deg,#041018 0%,#082838 40%,#062030 100%)",
    svgArt:`<svg width="100%" height="100%" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="m12w" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#082838"/><stop offset="100%" stop-color="#04101a"/></linearGradient>
      </defs>
      <rect width="860" height="400" fill="url(#m12w)"/>
      <!-- Ocean waves -->
      ${[0,1,2,3].map(i=>`
        <path d="M0 ${200+i*45} Q215 ${160+i*45} 430 ${200+i*45} Q645 ${240+i*45} 860 ${200+i*45} L860 400 L0 400Z"
          fill="rgba(0,80,140,${.15+i*.08})"/>
      `).join('')}
      <!-- Sun rays -->
      ${Array.from({length:12},(_,i)=>`
        <line x1="430" y1="60" x2="${430+Math.cos(i*30*Math.PI/180)*300}" y2="${60+Math.sin(i*30*Math.PI/180)*300}"
          stroke="rgba(255,180,60,.04)" stroke-width="2"/>
      `).join('')}
      <circle cx="430" cy="60" r="44" fill="rgba(255,180,60,.5)"/>
    </svg>`,
  },
];

/* Row definitions */
const ROWS = [
  { id:'continue',  title:'Continue Watching',  icon:'▶',  filter: m => m.progress > 0 },
  { id:'trending',  title:'Trending Now',        icon:'🔥', filter: m => [11,5,1,3,7,9].includes(m.id), numbered: true },
  { id:'newrel',    title:'New Releases',        icon:'✦',  filter: m => m.year === 2025 },
  { id:'action',    title:'High-Octane Action',  icon:'⚡', filter: m => m.genres.includes('Action') },
  { id:'drama',     title:'Award-Winning Drama', icon:'🏆', filter: m => m.genres.includes('Drama') },
  { id:'scifi',     title:'Explore Sci-Fi',      icon:'🚀', filter: m => m.genres.includes('Sci-Fi') },
  { id:'mylist',    title:'My List',             icon:'＋', filter: m => STATE.myList.has(m.id) },
];

const PROFILES = [
  { name:'Alex',    initials:'AK', bg:'#e50914', text:'#fff' },
  { name:'Jordan',  initials:'JD', bg:'#f5c518', text:'#000' },
  { name:'Morgan',  initials:'MR', bg:'#46d369', text:'#000' },
  { name:'Kids',    initials:'👶', bg:'#3b82f6', text:'#fff' },
];

const GENRES = ['All','Action','Sci-Fi','Drama','Thriller','Romance','Comedy','Adventure'];

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
const STATE = {
  currentProfile: null,
  myList: new Set(),
  heroIdx: 0,
  heroTimer: null,
  activeGenre: 'all',
  searchOpen: false,
};

/* ═══════════════════════════════════════════════════
   LOGIN GRID ANIMATION
═══════════════════════════════════════════════════ */
(function buildLoginGrid() {
  const g = document.getElementById('login-grid');
  for (let i = 0; i < 40; i++) {
    const cell = document.createElement('div');
    cell.className = 'login-grid-cell';
    g.appendChild(cell);
    setInterval(() => {
      cell.style.opacity = Math.random() > 0.7 ? '0.6' : '0.15';
    }, 1500 + Math.random() * 2000);
  }
})();

/* ═══════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goToProfiles(e) {
  e.preventDefault();
  buildProfiles();
  showScreen('screen-profiles');
}

function buildProfiles() {
  const grid = document.getElementById('profiles-grid');
  grid.innerHTML = '';
  PROFILES.forEach((p, i) => {
    grid.insertAdjacentHTML('beforeend', `
      <div class="profile-item" onclick="selectProfile(${i})" style="animation-delay:${i*.08}s">
        <div class="profile-avatar" style="background:${p.bg};color:${p.text}">
          ${p.initials}
        </div>
        <div class="profile-name">${p.name}</div>
      </div>
    `);
  });
}

function selectProfile(idx) {
  STATE.currentProfile = PROFILES[idx];
  buildApp();
  showScreen('screen-app');
  toast(`Welcome, ${STATE.currentProfile.name}!`, '👋');
}

function switchProfile() {
  clearInterval(STATE.heroTimer);
  buildProfiles();
  showScreen('screen-profiles');
}

/* ═══════════════════════════════════════════════════
   APP BUILD
═══════════════════════════════════════════════════ */
function buildApp() {
  // Nav avatar
  const p = STATE.currentProfile;
  document.getElementById('nav-avatar').style.cssText = `background:${p.bg};color:${p.text}`;
  document.getElementById('nav-avatar').textContent = p.initials;
  document.getElementById('nav-username').textContent = p.name;

  buildHero();
  buildGenreNav();
  buildRows();
  setupNavScroll();
}

/* ── NAVBAR SCROLL ── */
function setupNavScroll() {
  const nav = document.getElementById('sv-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════
   HERO BANNER
═══════════════════════════════════════════════════ */
const HERO_MOVIES = [MOVIES[4], MOVIES[0], MOVIES[10], MOVIES[2], MOVIES[7]];

function buildHero() {
  const banner = document.getElementById('hero-banner');
  banner.innerHTML = '';

  HERO_MOVIES.forEach((m, i) => {
    const slide = document.createElement('div');
    slide.className = `hero-slide${i === 0 ? ' active' : ''}`;
    slide.innerHTML = `
      <div class="hero-bg" style="background:${m.gradient}">${m.svgArt || ''}</div>
      <div class="hero-content">
        <div class="hero-genre-tags">
          ${m.genres.map(g => `<span class="hero-tag">${g}</span>`).join('')}
        </div>
        <h1 class="hero-title">${m.title}</h1>
        <div class="hero-meta-row">
          <span class="hero-match">${m.match}% Match</span>
          <span class="hero-year">${m.year}</span>
          <span class="hero-runtime">${m.runtime}</span>
          <span class="hero-rating">${m.rating}</span>
        </div>
        <p class="hero-desc">${m.desc}</p>
        <div class="hero-btns">
          <button class="hero-btn primary" onclick="openModal(${m.id})">
            <i class="bi bi-play-fill"></i> Play
          </button>
          <button class="hero-btn secondary" onclick="openModal(${m.id})">
            <i class="bi bi-info-circle"></i> More Info
          </button>
          <button class="hero-btn list-btn ${STATE.myList.has(m.id) ? 'added' : ''}"
            onclick="toggleMyList(event,${m.id})" id="hero-list-${m.id}">
            <i class="bi bi-${STATE.myList.has(m.id) ? 'check2' : 'plus-lg'}"></i>
          </button>
        </div>
      </div>
      <div class="age-badge"><span class="age-box">${m.rating}</span></div>
    `;
    banner.appendChild(slide);
  });

  // Dots
  const dotsEl = document.createElement('div');
  dotsEl.className = 'hero-dots';
  HERO_MOVIES.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `hero-dot${i === 0 ? ' active' : ''}`;
    dot.onclick = () => goHeroSlide(i);
    dotsEl.appendChild(dot);
  });
  banner.appendChild(dotsEl);

  // Auto-rotate
  clearInterval(STATE.heroTimer);
  STATE.heroTimer = setInterval(() => {
    goHeroSlide((STATE.heroIdx + 1) % HERO_MOVIES.length);
  }, 6000);
}

function goHeroSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  dots.forEach((d, i)   => d.classList.toggle('active', i === idx));
  STATE.heroIdx = idx;
}

/* ═══════════════════════════════════════════════════
   GENRE NAV
═══════════════════════════════════════════════════ */
function buildGenreNav() {
  const nav = document.getElementById('genre-nav');
  nav.innerHTML = '';
  GENRES.forEach(g => {
    const btn = document.createElement('button');
    btn.className = `genre-pill${STATE.activeGenre === g.toLowerCase() ? ' active' : ''}`;
    btn.textContent = g;
    btn.onclick = () => {
      STATE.activeGenre = g.toLowerCase();
      document.querySelectorAll('.genre-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildRows();
    };
    nav.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════════
   CONTENT ROWS
═══════════════════════════════════════════════════ */
function buildRows() {
  const container = document.getElementById('rows-container');
  container.innerHTML = '';

  ROWS.forEach(row => {
    let movies = MOVIES.filter(row.filter);

    // Apply genre filter (skip myList row)
    if (STATE.activeGenre !== 'all' && row.id !== 'mylist') {
      const filtered = movies.filter(m =>
        m.genres.map(g => g.toLowerCase()).includes(STATE.activeGenre)
      );
      if (filtered.length >= 1) movies = filtered;
    }

    if (movies.length === 0) {
      if (row.id === 'mylist') {
        container.insertAdjacentHTML('beforeend', `
          <div class="content-row">
            <div class="row-header"><span class="row-title">${row.icon} ${row.title}</span></div>
            <div class="mylist-empty">
              <i class="bi bi-plus-circle" style="font-size:1.4rem;color:var(--red)"></i>
              Add movies to your list by clicking the <strong style="margin:0 4px">+</strong> button on any title.
            </div>
          </div>
        `);
      }
      return;
    }

    const rowEl = document.createElement('div');
    rowEl.className = 'content-row';
    rowEl.id = `row-${row.id}`;
    rowEl.innerHTML = `
      <div class="row-header">
        <span class="row-title">${row.icon} ${row.title} <span class="see-all">Explore All →</span></span>
      </div>
      <div class="carousel-wrap">
        <button class="carousel-arrow left" onclick="scrollRow('${row.id}',-1)">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="cards-track" id="track-${row.id}"></div>
        <button class="carousel-arrow right" onclick="scrollRow('${row.id}',1)">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    `;
    container.appendChild(rowEl);

    const track = document.getElementById(`track-${row.id}`);
    movies.forEach((m, idx) => {
      track.insertAdjacentHTML('beforeend', buildCard(m, row.numbered ? idx + 1 : null));
    });
  });
}

function buildCard(m, number = null) {
  const inList = STATE.myList.has(m.id);
  return `
    <div class="movie-card" id="card-${m.id}" onclick="openModal(${m.id})">
      <div class="card-thumb">
        <div class="card-thumb-inner" style="background:${m.gradient}">${m.svgArt || ''}</div>
        ${m.progress > 0 ? `
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width:${m.progress}%"></div>
          </div>` : ''}
        ${number ? `<div class="trend-num">${number}</div>` : ''}
      </div>
      <div class="card-hover-panel" onclick="event.stopPropagation()">
        <div class="hover-title">${m.title}</div>
        <div class="hover-actions">
          <button class="hover-act-btn play-sm" onclick="openModal(${m.id})"><i class="bi bi-play-fill"></i></button>
          <button class="hover-act-btn ${inList ? 'added' : ''}" id="hov-list-${m.id}"
            onclick="toggleMyList(event,${m.id})">
            <i class="bi bi-${inList ? 'check2' : 'plus-lg'}"></i>
          </button>
          <button class="hover-act-btn" onclick="openModal(${m.id})"><i class="bi bi-hand-thumbs-up"></i></button>
          <button class="hover-act-btn hover-more" onclick="openModal(${m.id})"><i class="bi bi-chevron-down"></i></button>
        </div>
        <div class="hover-meta">
          <span class="hover-match">${m.match}%</span>
          <span class="hover-year">${m.year}</span>
          <span class="hover-year">${m.runtime}</span>
        </div>
        <div class="hover-genre-tags">
          ${m.genres.map(g => `<span class="hover-tag">${g}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════
   CAROUSEL SCROLL
═══════════════════════════════════════════════════ */
function scrollRow(rowId, dir) {
  const track = document.getElementById(`track-${rowId}`);
  if (!track) return;
  track.scrollBy({ left: dir * 460, behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════
   MY LIST
═══════════════════════════════════════════════════ */
function toggleMyList(e, id) {
  e.stopPropagation();
  const movie = MOVIES.find(m => m.id === id);
  if (!movie) return;

  if (STATE.myList.has(id)) {
    STATE.myList.delete(id);
    toast(`Removed "${movie.title}" from your list`, '✕');
  } else {
    STATE.myList.add(id);
    toast(`Added "${movie.title}" to your list`, '✓');
  }

  // Refresh hero button
  const heroBtn = document.getElementById(`hero-list-${id}`);
  if (heroBtn) {
    heroBtn.className = `hero-btn list-btn ${STATE.myList.has(id) ? 'added' : ''}`;
    heroBtn.innerHTML = `<i class="bi bi-${STATE.myList.has(id) ? 'check2' : 'plus-lg'}"></i>`;
  }

  // Refresh hover buttons
  const hovBtn = document.getElementById(`hov-list-${id}`);
  if (hovBtn) {
    hovBtn.className = `hover-act-btn ${STATE.myList.has(id) ? 'added' : ''}`;
    hovBtn.innerHTML = `<i class="bi bi-${STATE.myList.has(id) ? 'check2' : 'plus-lg'}"></i>`;
  }

  // Refresh modal button
  const modalBtn = document.getElementById(`modal-list-${id}`);
  if (modalBtn) {
    modalBtn.className = `modal-btn icon-btn ${STATE.myList.has(id) ? 'added' : ''}`;
    modalBtn.innerHTML = `<i class="bi bi-${STATE.myList.has(id) ? 'check2' : 'plus-lg'}"></i>`;
    modalBtn.title = STATE.myList.has(id) ? 'Remove from My List' : 'Add to My List';
  }

  // Re-render my list row
  const myListRow = document.getElementById('row-mylist');
  if (myListRow) {
    const after = myListRow.nextSibling;
    myListRow.remove();
  }
  buildRows();
}

function showMyList() {
  const el = document.getElementById('row-mylist');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* ═══════════════════════════════════════════════════
   SEARCH
═══════════════════════════════════════════════════ */
function toggleSearch() {
  STATE.searchOpen = !STATE.searchOpen;
  const ov = document.getElementById('search-overlay');
  ov.classList.toggle('open', STATE.searchOpen);
  if (STATE.searchOpen) {
    setTimeout(() => document.getElementById('search-input').focus(), 100);
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-input').value = '';
  }
}

function doSearch(q) {
  const results = document.getElementById('search-results');
  if (!q.trim()) { results.innerHTML = ''; return; }

  const found = MOVIES.filter(m =>
    m.title.toLowerCase().includes(q.toLowerCase()) ||
    m.genres.some(g => g.toLowerCase().includes(q.toLowerCase())) ||
    m.cast.toLowerCase().includes(q.toLowerCase())
  );

  if (found.length === 0) {
    results.innerHTML = `<div class="search-no-results" style="grid-column:1/-1;padding-top:20px">
      No results for "<em>${q}</em>"
    </div>`;
    return;
  }

  results.innerHTML = found.map(m => `
    <div onclick="toggleSearch();openModal(${m.id})" style="cursor:pointer;border-radius:6px;overflow:hidden;transition:transform .2s" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform=''">
      <div style="aspect-ratio:16/9;background:${m.gradient}">${m.svgArt || ''}</div>
      <div style="background:#1a1a1a;padding:8px 10px">
        <div style="font-size:.78rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.title}</div>
        <div style="font-size:.65rem;color:var(--muted2)">${m.year} · ${m.genres[0]}</div>
      </div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════
   MOVIE MODAL
═══════════════════════════════════════════════════ */
function openModal(id) {
  const m = MOVIES.find(m => m.id === id);
  if (!m) return;

  const similar = MOVIES.filter(x => x.id !== id && x.genres.some(g => m.genres.includes(g))).slice(0, 6);
  const inList  = STATE.myList.has(id);

  document.getElementById('movie-modal-inner').innerHTML = `
    <div class="modal-hero">
      <div class="modal-hero-bg" style="background:${m.gradient}">${m.svgArt || ''}</div>
      <button class="modal-close-btn" onclick="closeModal()"><i class="bi bi-x-lg"></i></button>
      <div class="modal-hero-content">
        <h2 class="modal-title">${m.title}</h2>
        <div class="modal-action-row">
          <button class="modal-btn primary"><i class="bi bi-play-fill"></i> Play</button>
          <button class="modal-btn primary" style="background:rgba(42,42,42,.8);color:var(--white)"><i class="bi bi-download me-1"></i> Download</button>
          <button class="modal-btn icon-btn ${inList ? 'added' : ''}"
            id="modal-list-${id}" onclick="toggleMyList(event,${id})"
            title="${inList ? 'Remove from My List' : 'Add to My List'}">
            <i class="bi bi-${inList ? 'check2' : 'plus-lg'}"></i>
          </button>
          <button class="modal-btn icon-btn" title="Rate this"><i class="bi bi-hand-thumbs-up"></i></button>
          <button class="modal-btn icon-btn" title="Share"><i class="bi bi-share"></i></button>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-info-row">
        <div class="modal-main-info">
          <div class="modal-meta-strip">
            <span class="modal-match">${m.match}% Match</span>
            <span class="modal-year">${m.year}</span>
            <span class="modal-runtime">${m.runtime}</span>
            <span class="modal-age">${m.rating}</span>
            <span class="modal-hd">HD</span>
          </div>
          <p class="modal-desc">${m.desc}</p>
          ${m.progress > 0 ? `
            <div style="margin-top:12px">
              <div style="font-size:.72rem;color:var(--muted);margin-bottom:6px;font-family:var(--font-m)">
                ${m.progress}% watched
              </div>
              <div style="height:3px;background:rgba(255,255,255,.15);border-radius:2px">
                <div style="height:100%;width:${m.progress}%;background:var(--red);border-radius:2px"></div>
              </div>
            </div>` : ''}
        </div>
        <div class="modal-side-info">
          <p class="modal-cast"><strong>Cast:</strong> ${m.cast}</p>
          <p class="modal-cast mt-2"><strong>Director:</strong> ${m.director}</p>
          <p class="modal-cast mt-2">
            <strong>IMDb:</strong>
            <span style="color:var(--gold)">★ ${m.imdb}</span>
          </p>
          <div class="modal-genres">
            ${m.genres.map(g => `<span class="modal-genre-tag">${g}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="modal-similar-title">More Like This</div>
      <div class="modal-similar-grid">
        ${similar.map(s => `
          <div class="similar-card" onclick="closeModal();setTimeout(()=>openModal(${s.id}),300)">
            <div class="similar-thumb" style="background:${s.gradient}">${s.svgArt || ''}</div>
            <div class="similar-info">
              <div class="similar-title">${s.title}</div>
              <div class="similar-meta">
                <span style="color:var(--green)">${s.match}% Match</span>
                <span>${s.year}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('movie-modal').classList.add('open');
  document.body.classList.add('modal-open-custom');
}

function closeModal() {
  document.getElementById('movie-modal').classList.remove('open');
  document.body.classList.remove('modal-open-custom');
}

function handleModalBackdrop(e) {
  if (e.target === e.currentTarget) closeModal();
}

/* ═══════════════════════════════════════════════════
   GENRE FILTER (via nav links)
═══════════════════════════════════════════════════ */
function filterGenre(e, genre) {
  e.preventDefault();
  STATE.activeGenre = genre;
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  e.target.classList.add('active');
  buildGenreNav();
  buildRows();
}

/* ═══════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════ */
function toast(msg, icon = '✓') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'sv-toast';
  el.innerHTML = `
    <span style="font-size:1rem">${icon}</span>
    ${msg}
  `;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('hide');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

/* ═══════════════════════════════════════════════════
   KEYBOARD SHORTCUTS
═══════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('movie-modal').classList.contains('open')) closeModal();
    else if (STATE.searchOpen) toggleSearch();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (document.getElementById('screen-app').classList.contains('active')) toggleSearch();
  }
});