(() => {
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(pointer: fine)').matches;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ── data ─────────────────────────────────── */
const FLAG = [
  {t:'Sentra', c:'AI + SRE', d:'Odoo ERP with a custom car-wash module, monitored by Prometheus, Alertmanager and Grafana. An SRE agent investigates alerts with read-only tools, proposes one allowlisted fix, waits for human approval, verifies, and writes a postmortem to an append-only audit log. 100+ automated tests.', s:'Python · Odoo · PostgreSQL · Prometheus · Grafana · Docker Compose · LLM agents', u:'https://github.com/7ussain313/Sentra'},
  {t:'TaskFlow', c:'Full stack', d:'Work-item tracker with JWT auth, Manager and Member roles enforced server-side, a transition-table state machine, due-date extension approvals, an activity log, Kanban and timeline views. Unit and e2e tests in GitHub Actions against Postgres.', s:'NestJS · Next.js · TypeScript · PostgreSQL · Prisma · Docker · Jest', u:'https://github.com/7ussain313/TaskFlow'},
];
const SELECTED = [
  {t:'Secure Messenger', c:'Mobile', o:'Reboot Coding Institute', art:'cipher',
   d:'Biometric login, contacts by username or QR code, and text, image and video messages with read receipts and typing indicators. Secret one-on-one chats are end-to-end encrypted.', s:['Flutter','Firebase','E2E encryption']},
  {t:'Online Chess', c:'Mobile', o:'Reboot Coding Institute', art:'chess',
   d:'Real-time multiplayer: invite a friend or join from a waiting room. Every move is validated, and checkmate, stalemate and draws end the game. Includes AI bots and a story mode.', s:['Flutter','Dart','Real-time']},
  {t:'Buy-01 / Buy-02', c:'Java', o:'Reboot Coding Institute', art:'micro',
   d:'E-commerce on Spring Boot microservices with an Angular front end. Shipped through a Jenkins pipeline with tests, rollback, SonarQube quality gates and Nexus artifacts.', s:['Spring Boot','Angular','Jenkins','SonarQube']},
  {t:'SooQna', c:'Mobile', o:'UoB senior project', art:'shield', live:'https://sooqnaweb.vercel.app/',
   d:'A marketplace for tech products designed around safer trades: scam prevention and a dispute process for items that arrive damaged.', s:['Flutter','Supabase']},
  {t:'Vault', c:'Mobile', o:'Team of three', art:'swiss', live:'https://vaultweb-alpha.vercel.app/',
   d:'Arabic and English esports community app. I built phone-OTP sign-in, the admin console, Swiss-system tournaments, Arabic localisation and the row-level security policies.', s:['Flutter','Supabase','RLS','Vercel']},
  {t:'Social Network', c:'Full stack', o:'Reboot Coding Institute', art:'graph',
   d:'Followers, private profiles, groups, events and real-time chat over WebSockets. Go backend with SQLite migrations; front end and back end in separate Docker containers.', s:['Go','WebSockets','SQLite','Docker']},
];
const ARCHIVE = [
  ['Localhost','Systems','HTTP/1.1 server from scratch: epoll non-blocking I/O, virtual servers, CGI, uploads, cookies and sessions.','Rust · epoll · CGI'],
  ['0-Shell','Systems','Minimal Unix shell implementing ls, cd, cat, cp, mv, rm and more with system calls, no external binaries.','Rust · Unix syscalls'],
  ['Net-Cat','Systems','Multi-client TCP group chat server with history and join/leave notices, built on goroutines and channels.','Go · TCP'],
  ['Smart Road','Systems','Simulation of a traffic-light-free intersection where autonomous vehicles are coordinated to avoid collisions.','Rust · SDL2'],
  ['Ray Tracer','Systems','Renders 3D scenes with spheres, planes, cubes, cylinders, lights, shadows and a movable camera.','Rust · Graphics'],
  ['Lem-in','Systems','Moves N ants through a colony in the fewest turns by choosing non-conflicting paths.','Go · Graph algorithms'],
  ['Stock Market Simulator','Mobile','20 stocks updating five times a second, a $1M virtual wallet, history and price charts.','Flutter · Provider'],
  ['KaQuiz','Mobile','Share location with friends on a map; the app reports location to a Swagger-specified API every 5 seconds.','Flutter · Maps · REST'],
  ['Sky Map','Mobile','Uses GPS, accelerometer and magnetometer to show planets and constellations where the phone points.','Flutter · Sensors'],
  ['2048','Mobile','The puzzle game with swipe controls, animated merges, selectable grid sizes and sound.','Flutter · Animations'],
  ['Car Insurance App','Mobile','Team project for vehicle registration, policies, accident reports and payments, with an admin side.','Flutter · Firebase'],
  ['Neo4flix','Java','Movie recommendations from four Spring Boot microservices on Neo4j, with OAuth 2.0 and two-factor auth.','Spring Boot · Neo4j · Angular'],
  ['Travel Management','Java','Bookings with Stripe and PayPal, Elasticsearch autocomplete, deployed with Ansible and Jenkins, secrets in Vault.','Spring Boot · Elasticsearch · Ansible'],
  ["Let's Play API",'Java','REST CRUD API for users and products with authentication and admin/user roles.','Spring Boot · MongoDB'],
  ['Click-Shop','Full stack','Multi-role store with cart, promotions, reviews and seller applications, covered by PHPUnit tests.','Laravel 12 · MySQL · PHPUnit','https://github.com/7ussain313/Click-shop'],
  ['Angul-It','Web','Multi-stage image CAPTCHA with per-stage validation and progress that survives a refresh.','Angular · TypeScript'],
  ['Custom JS Framework','Web','DOM abstraction, routing, state and events built from scratch, shown with a TodoMVC app.','JavaScript'],
  ['GraphQL Profile','Web','JWT sign-in, GraphQL queries and hand-built SVG charts of XP and audit statistics.','TypeScript · GraphQL · SVG','https://github.com/7ussain313/GraphQL'],
  ['Groupie Tracker','Web','Presents bands, concert locations and dates from a REST API.','Go · REST'],
];
const STACK = [
  ['Languages',['TypeScript','JavaScript','Go','Rust','Java','Python','Dart','PHP','SQL']],
  ['Backend',['NestJS','Node.js','Spring Boot','Laravel','Prisma','REST','GraphQL','WebSockets','JWT auth']],
  ['Frontend and mobile',['React','Next.js','Angular','Tailwind CSS','Flutter','Provider','Firebase','Supabase']],
  ['Data',['PostgreSQL','MySQL','SQLite','MongoDB','Neo4j','Elasticsearch']],
  ['DevOps and observability',['Docker','GitHub Actions','Jenkins','SonarQube','Nexus','Ansible','Prometheus','Grafana']],
  ['Testing and AI',['Jest','Vitest','PHPUnit','pytest','Odoo','LLM agents','Human-in-the-loop design']],
];

/* ── particle name ────────────────────────── */
(function particles(){
  const stage = $('#stage'), cv = $('#px');
  const ctx = cv.getContext('2d');
  if (!ctx) return;
  let W, H, dpr, P = [], buckets = [], mouse = {x:-1e4, y:-1e4, on:false}, running = true, t = 0, raf;
  const NB = 24;
  const pearls = ['--pearl-1','--pearl-2','--pearl-3','--pearl-4'].map(css);
  const accent = css('--accent');
  function hex(h){ h = h.replace('#',''); return [0,2,4].map(i => parseInt(h.substr(i,2),16)); }
  const stops = pearls.concat([pearls[0]]).map(hex);
  const ramp = [];
  for (let i = 0; i < NB; i++){
    const f = i / NB * (stops.length - 1), k = Math.floor(f), r = f - k;
    const a = stops[k], b = stops[Math.min(k+1, stops.length-1)];
    ramp.push(`rgb(${a.map((v,j)=>Math.round(v+(b[j]-v)*r)).join(',')})`);
  }
  function build(){
    const rect = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.floor(rect.width * dpr)); H = Math.max(1, Math.floor(rect.height * dpr));
    cv.width = W; cv.height = H;
    const off = document.createElement('canvas'); off.width = W; off.height = H;
    const o = off.getContext('2d');
    const twoLines = rect.width / rect.height < 2.7;
    const font = s => `800 ${s}px "Bricolage Grotesque", "Arial Narrow", sans-serif`;
    const lines = twoLines ? ['HUSSAIN','ALI.'] : ['HUSSAIN ALI.'];
    let size = H / (twoLines ? 1.9 : 1.05);
    o.font = font(size);
    let widest = Math.max(...lines.map(l => o.measureText(l).width));
    if (widest > W * .98) { size *= (W * .98) / widest; o.font = font(size); widest = Math.max(...lines.map(l => o.measureText(l).width)); }
    o.textBaseline = 'alphabetic'; o.fillStyle = '#fff';
    const lh = size * .86, total = lh * lines.length;
    const dotStart = [];
    lines.forEach((l, i) => {
      const w = o.measureText(l).width, x = (W - w) / 2, y = (H - total) / 2 + lh * (i + 1) - size * .06;
      o.fillText(l, x, y);
      if (l.endsWith('.')) dotStart.push({x: x + o.measureText(l.slice(0,-1)).width, y0: y - size * .3, y1: y + size * .1});
    });
    const data = o.getImageData(0, 0, W, H).data;
    const maxP = FINE ? 6500 : 2600;
    let gap = Math.max(2, Math.round(size / 52));
    let pts;
    for (;;) {
      pts = [];
      for (let y = 0; y < H; y += gap) for (let x = 0; x < W; x += gap) if (data[(y * W + x) * 4 + 3] > 140) pts.push([x, y]);
      if (pts.length <= maxP) break; gap++;
    }
    const sz = Math.max(1.4 * dpr, gap * .72);
    const old = P;
    P = pts.map(([x, y], i) => {
      const prev = old[i];
      const isDot = dotStart.some(r => x >= r.x - 1 && y >= r.y0 && y <= r.y1);
      return {tx:x, ty:y, x: prev ? prev.x : (RM ? x : Math.random() * W), y: prev ? prev.y : (RM ? y : Math.random() * H),
        vx:0, vy:0, c: isDot ? -1 : Math.floor(((x / W) * NB * 1.2 + (y / H) * NB * .4)) % NB, s: sz};
    });
    buckets = Array.from({length: NB + 1}, () => []);
    document.documentElement.classList.add('px-on');
  }
  function frame(){
    t += RM ? 0 : .04;
    ctx.clearRect(0, 0, W, H);
    for (const b of buckets) b.length = 0;
    const R = 110 * dpr, R2 = R * R;
    for (const p of P){
      if (!RM){
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx*dx + dy*dy;
        if (d2 < R2){ const d = Math.sqrt(d2) || 1, f = (R - d) / R * 5.5; p.vx += dx / d * f; p.vy += dy / d * f; }
        p.vx += (p.tx - p.x) * .055; p.vy += (p.ty - p.y) * .055;
        p.vx *= .84; p.vy *= .84; p.x += p.vx; p.y += p.vy;
      }
      buckets[p.c < 0 ? NB : (p.c + Math.floor(t * 3)) % NB].push(p);
    }
    for (let i = 0; i <= NB; i++){
      const b = buckets[i]; if (!b.length) continue;
      ctx.fillStyle = i === NB ? accent : ramp[i];
      for (const p of b) ctx.fillRect(p.x, p.y, p.s, p.s);
    }
    if (running && !RM) raf = requestAnimationFrame(frame);
  }
  function pos(e){ const r = cv.getBoundingClientRect(); mouse.x = (e.clientX - r.left) * dpr; mouse.y = (e.clientY - r.top) * dpr; }
  stage.addEventListener('pointermove', pos);
  stage.addEventListener('pointerleave', () => { mouse.x = mouse.y = -1e4; });
  stage.addEventListener('pointerdown', e => {
    if (RM) return; pos(e);
    for (const p of P){ const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy) || 1, f = 2600 * dpr / (d + 60); p.vx += dx / d * f + (Math.random()-.5)*8; p.vy += dy / d * f + (Math.random()-.5)*8; }
  });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); if (RM) frame(); }, 150); });
  new IntersectionObserver(es => { running = es[0].isIntersecting; if (running && !RM){ cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } }).observe(stage);
  const go = () => { build(); frame(); };
  (document.fonts && document.fonts.load) ? document.fonts.load('800 100px "Bricolage Grotesque"').then(go, go) : go();
})();

/* ── word swap ────────────────────────────── */
(function swap(){
  const el = $('#sw'); if (RM) return;
  const words = ['full-stack products','Flutter apps','NestJS APIs','Rust servers','AI SRE agents','CI pipelines'];
  const glyphs = '!<>-_\\/[]{}=+*^?#01';
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    const to = words[i], from = el.textContent, len = Math.max(to.length, from.length);
    let f = 0;
    const iv = setInterval(() => {
      let out = '';
      for (let k = 0; k < len; k++){
        const reveal = f - k * 1.2;
        out += reveal > 6 ? (to[k] || '') : reveal > 0 ? glyphs[Math.floor(Math.random()*glyphs.length)] : (from[k] || '');
      }
      el.textContent = out;
      if (++f > len * 1.2 + 8){ clearInterval(iv); el.textContent = to; }
    }, 28);
  }, 2600);
})();

/* ── clock ────────────────────────────────── */
const tick = () => { try { $('#clock').textContent = new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Bahrain'}).format(new Date()); } catch(e){} };
tick(); setInterval(tick, 30000);

/* ── glow + magnetic + tilt ───────────────── */
if (FINE && !RM){
  const g = $('#glow'); let gx = -999, gy = -999, cx = gx, cy = gy;
  addEventListener('pointermove', e => { gx = e.clientX; gy = e.clientY; });
  (function loop(){ cx += (gx - cx) * .12; cy += (gy - cy) * .12; g.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); })();
  document.querySelectorAll('.mag').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width/2) * .22}px,${(e.clientY - r.top - r.height/2) * .3}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
  const card = $('#idcard');
  card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`; card.style.setProperty('--shine', `${(x + .5) * 100}%`); });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
}

/* ── marquee ──────────────────────────────── */
(function marquee(){
  const a = ['TypeScript','NestJS','Flutter','Rust','Go','PostgreSQL','Spring Boot','React','Docker','Prometheus'];
  const b = ['Next.js','Supabase','Angular','Firebase','Python','Odoo','Jenkins','Neo4j','GraphQL','WebSockets'];
  const row = (list) => { const h = list.map((w, i) => `<span class="${i % 2 ? 'o' : ''}">${w}</span><span class="s">✦</span>`).join(''); return h + h; };
  const m1 = $('#m1'), m2 = $('#m2'); m1.innerHTML = row(a); m2.innerHTML = row(b);
  if (RM) return;
  let x1 = 0, x2 = 0, last = scrollY, boost = 0;
  (function loop(){
    const dy = scrollY - last; last = scrollY; boost += (Math.min(Math.abs(dy), 60) - boost) * .1;
    const v = .6 + boost * .25;
    const w1 = m1.scrollWidth / 2, w2 = m2.scrollWidth / 2;
    x1 = (x1 - v) % w1; x2 = (x2 + v) % w2;
    m1.style.transform = `translateX(${x1}px)`; m2.style.transform = `translateX(${x2 - w2}px)`;
    requestAnimationFrame(loop);
  })();
})();

/* ── reveal + counters ────────────────────── */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {rootMargin:'0px 0px -8% 0px'});
if (!RM) document.querySelectorAll('.rv').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) io.observe(el); });
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, n = +el.dataset.n, t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}), {threshold:.6});
if (!RM) document.querySelectorAll('.count').forEach(el => cio.observe(el));

/* ── scroll: progress, timeline, gallery ─── */
const prog = $('#progress'), tl = $('#tl'), tlf = $('#tlfill');
const hs = $('#gallery'), track = $('#track'), hsn = $('#hsn'), hsbar = $('#hsbar');
let hsOn = false;
function layoutHS(){
  hsOn = !RM && innerWidth >= 900;
  document.documentElement.classList.toggle('no-hs', !hsOn);
  if (hsOn){ const dist = track.scrollWidth - innerWidth; hs.style.height = (innerHeight + Math.max(0, dist)) + 'px'; }
  else { hs.style.height = ''; track.style.transform = ''; }
  onScroll();
}
function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const r = tl.getBoundingClientRect();
  tlf.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * .7 - r.top) / r.height)));
  if (hsOn){
    const top = hs.offsetTop, len = hs.offsetHeight - innerHeight;
    const k = Math.max(0, Math.min(1, (scrollY - top) / (len || 1)));
    track.style.transform = `translate3d(${-k * Math.max(0, track.scrollWidth - innerWidth)}px,0,0)`;
    hsbar.style.transform = `scaleX(${k})`;
    hsn.textContent = String(Math.min(SELECTED.length, 1 + Math.floor(k * SELECTED.length * .999))).padStart(2,'0') + ' / ' + String(SELECTED.length).padStart(2,'0');
  }
}
addEventListener('scroll', onScroll, {passive:true});
addEventListener('resize', layoutHS);

/* ── gallery cards + art ──────────────────── */
const ART = {
  cipher: () => `<div class="cipher" data-cipher><span class="me">you › </span><span data-msg>see you at 8?</span>\n<span class="lock">🔒 secret chat · end-to-end encrypted</span>\n<span class="me">wire › </span><span data-wire></span></div>`,
  chess: () => { let s = '<svg viewBox="0 0 470 210" preserveAspectRatio="xMidYMid slice"><g transform="translate(131,-49)">';
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) s += `<rect x="${c*52}" y="${r*52}" width="52" height="52" fill="${(r+c)%2 ? 'var(--panel-2)' : 'var(--bg-2)'}"/>`;
    s += `<rect x="0" y="0" width="208" height="312" fill="none" stroke="var(--line)"/><g class="knight"><circle cx="26" cy="234" r="15" fill="var(--pearl-1)"/><text x="26" y="241" text-anchor="middle" font-size="20" fill="var(--bg)">♞</text></g>
      <circle cx="78" cy="130" r="5" fill="var(--accent)" opacity=".8"/><circle cx="130" cy="182" r="5" fill="var(--accent)" opacity=".8"/></g></svg>`; return s; },
  micro: () => { const svc = ['users','products','media','orders'];
    let s = '<svg viewBox="0 0 470 210"><rect x="175" y="22" width="120" height="40" rx="10" fill="var(--panel-2)" stroke="var(--pearl-3)"/><text x="235" y="47" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="var(--ink)">angular ui</text>';
    svc.forEach((n, i) => { const x = 22 + i * 110; s += `<path d="M235 62 C235 100 ${x+50} 100 ${x+50} 136" fill="none" stroke="var(--pearl-3)" stroke-width="1.5" stroke-dasharray="4 6" class="pulse"/><rect x="${x}" y="136" width="100" height="44" rx="10" fill="var(--panel-2)" stroke="var(--line)"/><text x="${x+50}" y="163" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="var(--muted)">${n}</text>`; });
    return s + '</svg>'; },
  shield: () => `<svg viewBox="0 0 470 210"><g transform="translate(235 105)">
      <circle r="78" fill="none" stroke="var(--line)"/><circle r="58" fill="none" stroke="var(--line)" stroke-dasharray="3 6" class="pulse"/>
      <path d="M0 -46 L36 -32 L36 4 C36 28 18 42 0 50 C-18 42 -36 28 -36 4 L-36 -32 Z" fill="color-mix(in srgb, var(--ok) 14%, var(--panel-2))" stroke="var(--ok)" stroke-width="2"/>
      <path d="M-14 2 L-3 13 L16 -10" fill="none" stroke="var(--ok)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
      <text x="40" y="60" font-family="JetBrains Mono, monospace" font-size="11" fill="var(--muted)">listing verified</text>
      <text x="40" y="160" font-family="JetBrains Mono, monospace" font-size="11" fill="var(--muted)">dispute: damaged item</text>
      <text x="330" y="110" font-family="JetBrains Mono, monospace" font-size="11" fill="var(--accent)" class="blinkdot">scam blocked</text></svg>`,
  swiss: () => { let s = '<svg viewBox="0 0 470 210">'; const rounds = 4;
    for (let r = 0; r < rounds; r++){ const x = 40 + r * 112;
      s += `<text x="${x}" y="24" font-family="JetBrains Mono, monospace" font-size="10.5" fill="var(--dim)">ROUND ${r+1}</text>`;
      for (let m = 0; m < 4; m++){ const y = 40 + m * 42; const win = (m + r) % 2;
        s += `<rect x="${x}" y="${y}" width="84" height="30" rx="7" fill="var(--panel-2)" stroke="var(--line)"/><circle cx="${x+16}" cy="${y+15}" r="5" fill="${win ? 'var(--pearl-2)' : 'var(--dim)'}"/><circle cx="${x+68}" cy="${y+15}" r="5" fill="${win ? 'var(--dim)' : 'var(--pearl-3)'}"/><text x="${x+42}" y="${y+19}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="var(--muted)">vs</text>`;
        if (r < rounds - 1) s += `<path d="M${x+84} ${y+15} L${x+112} ${40 + ((m + 1) % 4) * 42 + 15}" stroke="var(--line)" fill="none"/>`; } }
    return s + '</svg>'; },
  graph: () => { const N = [[80,60],[170,40],[250,90],[340,50],[410,110],[300,160],[190,150],[110,165],[220,100]];
    const E = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[8,0],[8,2],[8,5],[8,6],[1,8],[3,5]];
    let s = '<svg viewBox="0 0 470 210">';
    E.forEach(([a,b], i) => s += `<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" stroke="${i % 4 ? 'var(--line)' : 'var(--pearl-3)'}" stroke-width="1.5" ${i % 4 ? '' : 'stroke-dasharray="4 6" class="pulse"'}/>`);
    N.forEach(([x,y], i) => s += `<circle cx="${x}" cy="${y}" r="${i === 8 ? 14 : 8}" fill="${i === 8 ? 'var(--accent)' : 'var(--panel-2)'}" stroke="${i === 8 ? 'var(--accent)' : 'var(--pearl-2)'}" stroke-width="1.5"/>`);
    return s + '</svg>'; },
};
track.innerHTML = SELECTED.map(p => `
  <article class="pcard">
    <div class="art">${ART[p.art]()}</div>
    <div class="body">
      <div class="meta mono"><span style="color:var(--pearl-3)">${p.c.toUpperCase()}</span><span>${esc(p.o)}</span></div>
      <h3>${esc(p.t)}</h3>
      <p>${esc(p.d)}</p>
      <ul class="chips">${p.s.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      ${p.live ? `<a class="golink" href="${p.live}" target="_blank" rel="noopener">Open live app <svg width="14" height="14"><use href="#i-arrow"/></svg></a>` : ''}
    </div>
  </article>`).join('');
(function cipher(){
  const w = document.querySelector('[data-wire]'); if (!w) return;
  const hexs = '0123456789abcdef';
  const gen = () => Array.from({length: 46}, (_, i) => i % 3 === 2 ? ' ' : hexs[Math.floor(Math.random()*16)]).join('');
  w.textContent = gen();
  if (!RM) setInterval(() => { w.textContent = gen(); }, 900);
})();
layoutHS();

/* ── Sentra simulator ─────────────────────── */
(function sentra(){
  const cv = $('#chart'), ctx = cv.getContext('2d');
  const logEl = $('#log'), gate = $('#gate'), btn = $('#trigger'), st = $('#sStatus'), iclock = $('#iclock');
  const stages = [...document.querySelectorAll('#stages li')];
  const N = 90, YMAX = 1600, TH = 800;
  const data = Array.from({length: N}, () => 140 + Math.random() * 40);
  let state = 'ok', target = 150, over = 0, timers = [], t0 = 0, clockIv, below = 0;
  const col = n => css(n);
  function size(){ const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d,0,0,d,0,0); draw(); }
  function draw(){
    const w = cv.clientWidth, h = cv.clientHeight, L = 44, R = 12, T = 14, B = 22;
    const X = i => L + (w - L - R) * i / (N - 1), Y = v => T + (h - T - B) * (1 - Math.min(v, YMAX) / YMAX);
    ctx.clearRect(0, 0, w, h);
    ctx.font = '10.5px "JetBrains Mono", monospace'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    [0, 400, 800, 1200, 1600].forEach(v => { ctx.strokeStyle = col('--line'); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(w - R, Y(v)); ctx.stroke(); ctx.fillStyle = col('--dim'); ctx.fillText(v, L - 8, Y(v)); });
    ctx.setLineDash([5, 5]); ctx.strokeStyle = col('--accent'); ctx.beginPath(); ctx.moveTo(L, Y(TH)); ctx.lineTo(w - R, Y(TH)); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'left'; ctx.fillStyle = col('--accent'); ctx.fillText('alert threshold', L + 6, Y(TH) - 9);
    const hot = state === 'firing' || state === 'awaiting' || state === 'rejected' || state === 'investigating';
    const line = hot ? col('--accent') : col('--pearl-3');
    const grad = ctx.createLinearGradient(0, T, 0, h - B);
    grad.addColorStop(0, hot ? 'rgba(236,58,80,.28)' : 'rgba(205,226,236,.18)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath(); data.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)));
    ctx.lineTo(X(N - 1), h - B); ctx.lineTo(X(0), h - B); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath(); data.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)));
    ctx.strokeStyle = line; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.stroke();
    const lv = data[N - 1]; ctx.beginPath(); ctx.arc(X(N - 1), Y(lv), 4.5, 0, 7); ctx.fillStyle = line; ctx.fill();
    ctx.textAlign = 'right'; ctx.fillStyle = col('--ink'); ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(Math.round(lv) + ' ms', X(N - 1) - 10, Math.max(T + 8, Y(lv) - 14));
  }
  function log(html, cls = ''){
    const s = ((performance.now() - t0) / 1000);
    const d = document.createElement('div');
    d.innerHTML = `<span class="t">${t0 ? '+' + s.toFixed(1).padStart(5, ' ') + 's' : '      '}</span> <span class="${cls}">${html}</span>`;
    logEl.appendChild(d); logEl.scrollTop = logEl.scrollHeight;
  }
  function setStage(i, gateNow){ stages.forEach((s, k) => { s.classList.toggle('done', k < i); s.classList.toggle('now', k === i); }); }
  function setStatus(txt, cls){ st.textContent = txt; st.className = 'status ' + cls; }
  function later(ms, fn){ timers.push(setTimeout(fn, ms)); }
  function step(){
    if (state === 'degrading') target = Math.min(1420, target + 75);
    if (state === 'recovering') target = Math.max(150, target * .82);
    const noise = (Math.random() - .5) * (target > 400 ? 160 : 45);
    data.push(Math.max(40, target + noise)); data.shift();
    const v = data[N - 1];
    if (state === 'degrading'){ over = v > TH ? over + 1 : 0; if (over >= 3) fire(); }
    if (state === 'recovering'){ below = v < 300 ? below + 1 : 0; if (below >= 6) resolve(); }
    draw();
  }
  function startClock(){ clearInterval(clockIv); clockIv = setInterval(() => { const s = Math.floor((performance.now() - t0) / 1000); iclock.textContent = String(Math.floor(s / 60)).padStart(2,'0') + ':' + String(s % 60).padStart(2,'0'); }, 250); }
  function reset(){
    timers.forEach(clearTimeout); timers = []; clearInterval(clockIv);
    logEl.innerHTML = ''; gate.classList.remove('show'); iclock.textContent = '00:00'; t0 = 0;
    setStage(-1); setStatus('Healthy', 'ok');
  }
  function idle(){
    log('<span class="w">sentra-agent ready.</span> Watching odoo via Prometheus.');
    log('All checks passing. Press <span class="w">Simulate an incident</span> to begin.');
  }
  function begin(){
    reset(); t0 = performance.now(); startClock();
    state = 'degrading'; target = 260; over = 0;
    btn.disabled = true; btn.lastChild.textContent = ' Incident running…';
    log('Load spike on odoo web workers. Response times climbing…', 'y');
  }
  function fire(){
    state = 'firing'; setStage(0); setStatus('Alert firing', 'fire');
    log('ALERT OdooHighLatency firing · p95 &gt; 800 ms for 3 checks', 'a');
    log('Alertmanager → routed to sentra-agent');
    later(1100, () => { state = 'investigating'; setStage(1); log('Investigating with read-only tools. No write access at this stage.', 'w'); });
    later(2000, () => log('query_metrics("odoo_http_p95", 15m) → spike began 40s ago'));
    later(2800, () => log('read_logs("odoo", level="error") → worker pool exhausted, requests queueing'));
    later(3600, () => log('check_db() → PostgreSQL healthy, no lock contention'));
    later(4500, () => { setStage(2); log('Diagnosis: Odoo workers saturated; database not the cause.', 'w'); });
    later(5300, () => { log('Proposal: restart_odoo_workers (allowlisted action). Expected recovery under 60s.', 'g'); });
    later(6000, () => { state = 'awaiting'; setStage(3); setStatus('Awaiting human', 'wait'); log('Waiting for human approval. Nothing will change without it.', 'y'); gate.classList.add('show'); $('#approve').focus({preventScroll:true}); });
  }
  function approve(){
    if (state !== 'awaiting') return;
    gate.classList.remove('show'); log('Approved by you. Executing restart_odoo_workers…', 'g');
    state = 'fixing'; setStage(4); setStatus('Fix running', 'wait');
    later(1200, () => { state = 'recovering'; log('Workers restarted. Watching recovery…'); });
  }
  function reject(){
    if (state !== 'awaiting') return;
    gate.classList.remove('show'); state = 'rejected'; setStatus('Escalated', 'fire');
    log('Rejected by you. No change made.', 'a');
    log('Agent stands down and escalates to the on-call engineer with its findings attached.');
    later(1400, () => { log('Audit log: proposal rejected, recorded with reason "operator declined".', 'w'); done(); });
  }
  function resolve(){
    state = 'ok'; setStage(5); setStatus('Resolved', 'ok'); clearInterval(clockIv);
    log('Verified: p95 back under 300 ms for 6 consecutive checks.', 'g');
    later(700, () => log('Postmortem written to append-only audit log: cause, evidence, action, approver, outcome.', 'w'));
    later(1300, () => { log('Incident closed.', 'g'); done(); });
  }
  function done(){ btn.disabled = false; btn.lastChild.textContent = ' Run it again'; if (state === 'rejected'){ state = 'recovering'; } }
  btn.addEventListener('click', begin);
  $('#approve').addEventListener('click', approve);
  $('#reject').addEventListener('click', reject);
  idle(); size(); addEventListener('resize', size);
  let iv = null;
  new IntersectionObserver(es => { const vis = es[0].isIntersecting; if (vis && !iv) iv = setInterval(step, 260); if (!vis && iv){ clearInterval(iv); iv = null; } }).observe(cv);
})();

/* ── terminal ─────────────────────────────── */
(function terminal(){
  const out = $('#tout'), form = $('#tform'), input = $('#tin');
  const ALL = [...FLAG.map(p => ({t:p.t, c:p.c, d:p.d, s:p.s, u:p.u})), ...SELECTED.map(p => ({t:p.t, c:p.c, d:p.d, s:p.s.join(' · '), u:p.live})), ...ARCHIVE.map(a => ({t:a[0], c:a[1], d:a[2], s:a[3], u:a[4]}))];
  const hist = []; let hi = 0;
  const print = (h, cls = '') => { const d = document.createElement('div'); if (cls) d.className = cls; d.innerHTML = h; out.appendChild(d); out.scrollTop = out.scrollHeight; };
  const CMDS = {
    help: () => print(['<span class="h">Commands</span>',
      '  whoami            who I am, in one paragraph',
      '  ls [filter]       list projects (try: ls rust, ls mobile, ls java)',
      '  open &lt;project&gt;    details for one project (try: open sentra)',
      '  skills            my stack',
      '  experience        where I have worked and studied',
      '  contact           how to reach me',
      '  cv                link to my CV',
      '  hire              the shortcut',
      '  clear             clear the screen'].join('\n')),
    whoami: () => print('Hussain Ali. Full-stack software engineer from Aali, Bahrain.\nB.S. Computer Science, University of Bahrain (2022–2026). Trained at Reboot Coding Institute (01 Edu), with Java and Mobile specializations.\nI build web and mobile apps end to end and ship them with tests, docs and CI.'),
    ls: (arg) => {
      const q = (arg || '').toLowerCase();
      const list = q ? ALL.filter(p => (p.t + ' ' + p.c + ' ' + p.s).toLowerCase().includes(q)) : ALL;
      if (!list.length) return print(`No projects match "${esc(arg)}".`, 'r');
      print(list.map(p => `<span class="c">${esc(p.t.padEnd(24, ' '))}</span>${esc(p.c)}`).join('\n') + `\n<span class="h">${list.length} project${list.length > 1 ? 's' : ''}</span>. Type open &lt;name&gt; for details.`);
    },
    open: (arg) => {
      if (!arg) return print('Usage: open &lt;project&gt;   e.g. open taskflow', 'r');
      const q = arg.toLowerCase(), p = ALL.find(x => x.t.toLowerCase().startsWith(q)) || ALL.find(x => x.t.toLowerCase().includes(q));
      if (!p) return print(`No project called "${esc(arg)}". Try ls.`, 'r');
      print(`<span class="h">${esc(p.t)}</span>  [${esc(p.c)}]\n${esc(p.d)}\n<span class="c">${esc(p.s)}</span>${p.u ? `\n<a href="${p.u}" target="_blank" rel="noopener">${esc(p.u)}</a>` : ''}`);
    },
    skills: () => print(STACK.map(([h, s]) => `<span class="h">${h.padEnd(26, ' ')}</span>${s.join(', ')}`).join('\n')),
    experience: () => print('<span class="h">2026</span>  IT Intern, Canvas Design Studio. Flutter + Firebase booking app, data model, handover docs.\n<span class="h">    </span>  Reboot Coding Institute (01 Edu). Full-stack program, Java and Mobile tracks.\n<span class="h">2022–2026</span>  B.S. Computer Science, University of Bahrain. Senior project: SooQna.'),
    contact: () => print('email     hussainali04.dev@gmail.com\nlinkedin  <a href="https://www.linkedin.com/in/hussainali04/" target="_blank" rel="noopener">linkedin.com/in/hussainali04</a>\ngithub    <a href="https://github.com/7ussain313" target="_blank" rel="noopener">github.com/7ussain313</a>'),
    cv: () => print('<a href="https://7ussain313.github.io/portfolio/Hussain_Ali_CV.pdf" target="_blank" rel="noopener">Hussain_Ali_CV.pdf</a>  (opens in a new tab)'),
    hire: () => { print('Excellent decision. Taking you to the contact section…', 'p'); setTimeout(() => $('#contact').scrollIntoView({behavior: RM ? 'auto' : 'smooth'}), 700); },
    sudo: () => print('Permission granted after a short interview. Type hire.', 'r'),
    clear: () => { out.innerHTML = ''; },
  };
  CMDS.cat = CMDS.open; CMDS.projects = CMDS.ls; CMDS.email = CMDS.contact;
  function run(raw){
    const line = raw.trim(); if (!line) return;
    hist.push(line); hi = hist.length;
    print(`<span class="p">guest@hussain:~$</span> <span class="c">${esc(line)}</span>`);
    const [cmd, ...rest] = line.split(/\s+/);
    const f = CMDS[cmd.toLowerCase()];
    f ? f(rest.join(' ')) : print(`command not found: ${esc(cmd)}. Type help.`, 'r');
  }
  print('<span class="h">hussain-os 1.0</span>  ·  27 projects loaded  ·  type <span class="c">help</span> to start');
  print('');
  run('whoami');
  form.addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && hi > 0){ input.value = hist[--hi]; e.preventDefault(); }
    if (e.key === 'ArrowDown'){ hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; e.preventDefault(); }
  });
  $('#tchips').innerHTML = ['help','ls','ls rust','open sentra','skills','experience','hire'].map(c => `<button type="button" data-c="${c}">${c}</button>`).join('');
  $('#tchips').addEventListener('click', e => { const b = e.target.closest('button'); if (b) run(b.dataset.c); });
})();

/* ── archive ──────────────────────────────── */
(function archive(){
  const cats = ['All', ...new Set(ARCHIVE.map(a => a[1]))];
  const fl = $('#filters'), grid = $('#agrid');
  let cur = 'All';
  try { const s = localStorage.getItem('ha2-filter'); if (s && cats.includes(s)) cur = s; } catch(e){}
  function render(){
    fl.innerHTML = cats.map(c => `<button type="button" id="f2-${c.replace(/\s/g,'')}" data-c="${c}" aria-pressed="${c === cur}">${c}<span>${c === 'All' ? ARCHIVE.length : ARCHIVE.filter(a => a[1] === c).length}</span></button>`).join('');
    grid.innerHTML = ARCHIVE.filter(a => cur === 'All' || a[1] === cur).map(a => `
      <article class="acard"><div class="top"><h4>${esc(a[0])}</h4><span class="cat">${a[1]}</span></div><p>${esc(a[2])}</p><em>${esc(a[3])}</em>
      ${a[4] ? `<a class="golink" href="${a[4]}" target="_blank" rel="noopener">Source code <svg width="14" height="14"><use href="#i-arrow"/></svg></a>` : ''}</article>`).join('');
  }
  fl.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; cur = b.dataset.c; render(); try { localStorage.setItem('ha2-filter', cur); } catch(e){} });
  render();
})();

$('#stackGrid').innerHTML = STACK.map(([h, s]) => `<div><h3>${h}</h3><p>${s.map(esc).join(' <i>/</i> ')}</p></div>`).join('');

})();
