const STATS = [
  {
    icon: 'bi-currency-dollar', label: 'Total Revenue',
    value: '$84,240', change: '+12.4%', up: true,
    sparks: [40,55,35,70,50,80,65,90,75,100],
    accentGlow: 'rgba(198,241,53,.08)',
    iconBg: 'rgba(198,241,53,.08)', iconBorder: 'rgba(198,241,53,.2)', iconColor: 'var(--lime)',
    sparkColor: 'rgba(198,241,53,.2)', sparkActive: 'var(--lime)',
  },
  {
    icon: 'bi-people', label: 'Active Users',
    value: '24,819', change: '+8.1%', up: true,
    sparks: [60,45,70,55,80,65,90,75,85,95],
    accentGlow: 'rgba(59,130,246,.08)',
    iconBg: 'rgba(59,130,246,.08)', iconBorder: 'rgba(59,130,246,.2)', iconColor: 'var(--blue)',
    sparkColor: 'rgba(59,130,246,.2)', sparkActive: 'var(--blue)',
  },
  {
    icon: 'bi-box-seam', label: 'Orders',
    value: '3,142', change: '-2.3%', up: false,
    sparks: [80,70,90,60,75,50,65,55,70,60],
    accentGlow: 'rgba(245,158,11,.08)',
    iconBg: 'rgba(245,158,11,.08)', iconBorder: 'rgba(245,158,11,.2)', iconColor: 'var(--amber)',
    sparkColor: 'rgba(245,158,11,.2)', sparkActive: 'var(--amber)',
  },
  {
    icon: 'bi-graph-up-arrow', label: 'Conversion',
    value: '5.67%', change: '+0.8%', up: true,
    sparks: [50,60,45,70,65,80,70,85,75,90],
    accentGlow: 'rgba(20,184,166,.08)',
    iconBg: 'rgba(20,184,166,.08)', iconBorder: 'rgba(20,184,166,.2)', iconColor: 'var(--teal)',
    sparkColor: 'rgba(20,184,166,.2)', sparkActive: 'var(--teal)',
  },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const THIS_YEAR  = [42,58,47,71,63,85,74,92,80,68,88,95];
const LAST_YEAR  = [38,45,52,60,55,70,62,78,68,58,75,82];

const TRAFFIC = [
  { label: 'Organic Search', pct: 74, color: 'var(--lime)' },
  { label: 'Direct',         pct: 48, color: 'var(--blue)' },
  { label: 'Social Media',   pct: 31, color: 'var(--amber)' },
  { label: 'Referral',       pct: 18, color: 'var(--teal)' },
];

const ORDERS = [
  { id:'#V-00421', customer:'Saniya M.', product:'Pro Dashboard',  amount:'$149', status:'success' },
  { id:'#V-00420', customer:'Jay R.',  product:'Analytics Pack', amount:'$79',  status:'warn' },
  { id:'#V-00419', customer:'Ankit T.',   product:'Enterprise',     amount:'$499', status:'success' },
  { id:'#V-00418', customer:'Mahek D.',   product:'Starter Kit',    amount:'$29',  status:'danger' },
  { id:'#V-00417', customer:'Rina K.',   product:'Pro Dashboard',  amount:'$149', status:'info' },
];

const STATUS_MAP = {
  success: ['pill-success','Completed'],
  warn:    ['pill-warn',   'Pending'],
  danger:  ['pill-danger', 'Failed'],
  info:    ['pill-info',   'Processing'],
};

const ACTIVITY = [
  { color:'var(--lime)',  text:'<strong>New signup</strong> — Saniya M. just created a Pro account', time:'2m' },
  { color:'var(--blue)',  text:'<strong>Payment received</strong> — $499 Enterprise plan from Aiko T.', time:'8m' },
  { color:'var(--red)',   text:'<strong>Failed transaction</strong> — Order #V-00418 declined', time:'14m' },
  { color:'var(--amber)', text:'<strong>Server alert</strong> — API latency spike detected on us-east-1', time:'32m' },
  { color:'var(--teal)',  text:'<strong>Deployment</strong> — v3.2.1 pushed to production successfully', time:'1h' },
];

const grid = document.getElementById('stats-grid');
STATS.forEach(s => {
  const maxSpark = Math.max(...s.sparks);
  const bars = s.sparks.map((v, i) =>
    `<div class="spark-bar ${i === s.sparks.length-1 ? 'active' : ''}"
       style="height:${(v/maxSpark)*100}%;--spark-color:${s.sparkColor};--spark-active:${s.sparkActive}"></div>`
  ).join('');

  grid.insertAdjacentHTML('beforeend', `
    <div class="stat-card"
         style="--accent-glow:${s.accentGlow}">
      <div class="stat-icon"
           style="background:${s.iconBg};border-color:${s.iconBorder};color:${s.iconColor}">
        <i class="bi ${s.icon}"></i>
      </div>
      <div class="stat-val">${s.value}</div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-change ${s.up ? 'up' : 'down'}">
        <i class="bi bi-arrow-${s.up ? 'up' : 'down'}-right"></i>
        ${s.change} vs last month
      </div>
      <div class="sparkline">${bars}</div>
    </div>
  `);
});

/*  BAR CHART   */
const barChart = document.getElementById('bar-chart');
MONTHS.forEach((m, i) => {
  const maxVal = Math.max(...THIS_YEAR, ...LAST_YEAR);
  const h1 = (THIS_YEAR[i] / maxVal * 100).toFixed(1);
  const h2 = (LAST_YEAR[i] / maxVal * 100).toFixed(1);
  barChart.insertAdjacentHTML('beforeend', `
    <div class="bar-group">
      <div class="bar-wrap">
        <div class="bar secondary" style="height:${h2}%" title="${LAST_YEAR[i]}k"></div>
        <div class="bar primary"   style="height:${h1}%" title="${THIS_YEAR[i]}k"></div>
      </div>
      <div class="bar-label">${m}</div>
    </div>
  `);
});

/*  DONUT CHART (SVG)  */
(function buildDonut() {
  const svg  = document.getElementById('donut-svg');
  const leg  = document.getElementById('donut-legend');
  const cx = 70, cy = 70, r = 52, stroke = 18;
  const circ = 2 * Math.PI * r;
  const colors = TRAFFIC.map(t => t.color);
  let offset = 0;

  TRAFFIC.forEach((t, i) => {
    const dashLen = (t.pct / 100) * circ * 0.9; // 0.9 = gap
    const circle  = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r',  r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', t.color);
    circle.setAttribute('stroke-width', stroke);
    circle.setAttribute('stroke-dasharray', `${dashLen} ${circ - dashLen}`);
    circle.setAttribute('stroke-dashoffset', -offset);
    circle.setAttribute('stroke-linecap', 'round');
    circle.style.transition = 'stroke-dasharray .8s ease';
    svg.appendChild(circle);
    offset += (t.pct / 100) * circ;

    leg.insertAdjacentHTML('beforeend', `
      <div class="donut-leg-row">
        <div class="donut-leg-left">
          <div class="legend-dot" style="background:${t.color}"></div>
          ${t.label}
        </div>
        <div class="donut-leg-bar-track">
          <div class="donut-leg-bar" style="width:${t.pct}%;background:${t.color}"></div>
        </div>
        <div class="donut-leg-pct">${t.pct}%</div>
      </div>
    `);
  });
})();

const tbody = document.getElementById('orders-tbody');
ORDERS.forEach(o => {
  const [cls, label] = STATUS_MAP[o.status];
  tbody.insertAdjacentHTML('beforeend', `
    <tr>
      <td><span style="font-family:var(--font-mono);font-size:.7rem;color:var(--muted2)">${o.id}</span></td>
      <td style="font-weight:500">${o.customer}</td>
      <td style="color:var(--muted2)">${o.product}</td>
      <td style="font-family:var(--font-head);font-size:1rem;letter-spacing:.04em">${o.amount}</td>
      <td><span class="status-pill ${cls}">${label}</span></td>
    </tr>
  `);
});

const feed = document.getElementById('activity-list');
ACTIVITY.forEach(a => {
  feed.insertAdjacentHTML('beforeend', `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color}"></div>
      <div class="activity-text">${a.text}</div>
      <div class="activity-time">${a.time} ago</div>
    </div>
  `);
});

/*  LIVE COUNTER  */
function animateCounters() {
  document.querySelectorAll('.stat-val').forEach((el, i) => {
    const raw = el.textContent.replace(/[$,%]/g,'');
    const isFloat = raw.includes('.');
    const num = parseFloat(raw.replace(/,/g,''));
    const prefix = el.textContent.startsWith('$') ? '$' : '';
    const suffix = el.textContent.endsWith('%') ? '%' : '';
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      if (isFloat) {
        el.textContent = prefix + current.toFixed(2) + suffix;
      } else if (num >= 1000) {
        el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      } else {
        el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }
      if (progress < 1) requestAnimationFrame(step);
    }
    setTimeout(() => requestAnimationFrame(step), i * 100);
  });
}
setTimeout(animateCounters, 200);