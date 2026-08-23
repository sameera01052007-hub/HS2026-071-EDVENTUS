/* =====================================================
   CITIZEN COMPLAINT PORTAL — APP LOGIC
   Erode District, Tamil Nadu
   ===================================================== */

'use strict';

/* ── Sample Data ── */
const COMPLAINTS_DATA = [
  {
    id: 'CMP-2024-001',
    title: 'Large pothole on NH-47 near Erode Market',
    category: 'Road',
    icon: '🛣️',
    description: 'A very large pothole has formed on NH-47 near the main market junction. It is causing accidents and vehicle damage.',
    status: 'progress',
    priority: 'critical',
    constituency: 'Erode East',
    department: 'Roads & Highways Dept.',
    submittedDate: '2024-01-15',
    reviewDate: '2024-01-16',
    progressDate: '2024-01-18',
    resolvedDate: null,
    slaDeadline: '2024-01-20',
    escalated: true,
    location: 'NH-47, Erode Market Junction, Erode East — 11.3410°N, 77.7172°E',
  },
  {
    id: 'CMP-2024-002',
    title: 'Water supply disruption for 3 days',
    category: 'Water',
    icon: '💧',
    description: 'No water supply in our street for the past 3 days. Pipeline seems broken at junction.',
    status: 'review',
    priority: 'high',
    constituency: 'Erode East',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2024-01-18',
    reviewDate: '2024-01-19',
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-01-23',
    escalated: false,
    location: 'Gandhi Nagar, 4th Street, Erode East — 11.3402°N, 77.7180°E',
  },
  {
    id: 'CMP-2024-003',
    title: 'Street light not working for 2 weeks',
    category: 'Electricity',
    icon: '⚡',
    description: 'The street light at the corner of Anna Nagar 2nd cross has not been working for 2 weeks. Very dangerous at night.',
    status: 'submitted',
    priority: 'medium',
    constituency: 'Erode East',
    department: 'Tamil Nadu Electricity Board',
    submittedDate: '2024-01-20',
    reviewDate: null,
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-01-27',
    escalated: false,
    location: 'Anna Nagar, 2nd Cross, Erode East — 11.3415°N, 77.7165°E',
  },
  {
    id: 'CMP-2023-021',
    title: 'Garbage dump not cleared for a week',
    category: 'Garbage',
    icon: '🗑️',
    description: 'The community garbage dump near the temple has not been cleared for over a week. Very unhygienic.',
    status: 'resolved',
    priority: 'medium',
    constituency: 'Erode East',
    department: 'Sanitation Department',
    submittedDate: '2023-12-10',
    reviewDate: '2023-12-11',
    progressDate: '2023-12-12',
    resolvedDate: '2023-12-14',
    slaDeadline: '2023-12-15',
    escalated: false,
    location: 'Temple Street, Erode East — 11.3420°N, 77.7168°E',
  },
  {
    id: 'CMP-2023-019',
    title: 'Drainage overflow on main road',
    category: 'Drainage',
    icon: '🌊',
    description: 'Main drainage is overflowing onto the road causing major water logging and health hazards.',
    status: 'resolved',
    priority: 'high',
    constituency: 'Erode East',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2023-11-22',
    reviewDate: '2023-11-23',
    progressDate: '2023-11-24',
    resolvedDate: '2023-11-27',
    slaDeadline: '2023-11-28',
    escalated: false,
    location: 'Main Bazaar Road, Erode East — 11.3408°N, 77.7175°E',
  },
  {
    id: 'CMP-2023-015',
    title: 'Damaged footpath near school',
    category: 'Road',
    icon: '🛣️',
    description: 'The footpath near the government school is completely broken and dangerous for children.',
    status: 'resolved',
    priority: 'low',
    constituency: 'Erode East',
    department: 'Roads & Highways Dept.',
    submittedDate: '2023-10-05',
    reviewDate: '2023-10-07',
    progressDate: '2023-10-09',
    resolvedDate: '2023-10-12',
    slaDeadline: '2023-10-15',
    escalated: false,
    location: 'School Road, Erode East — 11.3398°N, 77.7160°E',
  },
  {
    id: 'CMP-2023-009',
    title: 'Broken water pipe leaking',
    category: 'Water',
    icon: '💧',
    description: 'A broken water pipe is leaking at the roadside causing water wastage.',
    status: 'resolved',
    priority: 'medium',
    constituency: 'Erode East',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2023-08-14',
    reviewDate: '2023-08-15',
    progressDate: '2023-08-16',
    resolvedDate: '2023-08-18',
    slaDeadline: '2023-08-20',
    escalated: false,
    location: 'Periyar Nagar, Erode East — 11.3388°N, 77.7178°E',
  },
];

const NOTIFICATIONS_DATA = [
  { id: 1, icon: '🚨', title: 'Escalation Alert', message: 'Your complaint CMP-2024-001 (Road pothole) has been escalated to the Roads Department Supervisor.', time: '2 hours ago', read: false, type: 'danger' },
  { id: 2, icon: '🔄', title: 'Status Update', message: 'Your complaint CMP-2024-001 status changed to "In Progress".', time: '1 day ago', read: false, type: 'info' },
  { id: 3, icon: '✅', title: 'Resolved', message: 'Your complaint CMP-2023-021 (Garbage dump) has been marked as Resolved.', time: '3 days ago', read: true, type: 'success' },
  { id: 4, icon: '📋', title: 'Under Review', message: 'Your complaint CMP-2024-002 is now Under Review by the Water Board.', time: '5 days ago', read: true, type: 'warning' },
];

/* ── State ── */
let currentStep = 1;
let selectedCategory = '';
let capturedPhotoData = null;
let capturedLocation = null;
let cameraStream = null;
let currentFilter = 'all';
let currentPage = 'overview';

/* ══════════════════════════════════════════════════════
   PARTICLES (Login Page)
══════════════════════════════════════════════════════ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#3b82f6', '#0ea5e9', '#06b6d4', '#10b981', '#6366f1'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

/* ══════════════════════════════════════════════════════
   AUTH — Login Page
══════════════════════════════════════════════════════ */
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');
  const indicator = document.getElementById('tabIndicator');

  if (tab === 'login') {
    loginForm?.classList.remove('hidden');
    signupForm?.classList.add('hidden');
    tabLogin?.classList.add('active');
    tabSignup?.classList.remove('active');
    indicator?.classList.remove('right');
  } else {
    loginForm?.classList.add('hidden');
    signupForm?.classList.remove('hidden');
    tabLogin?.classList.remove('active');
    tabSignup?.classList.add('active');
    indicator?.classList.add('right');
  }
}

function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const email = document.getElementById('loginEmail')?.value;
  const pass = document.getElementById('loginPass')?.value;

  if (!email || !pass) { showToast('Please fill all fields', 'error'); return; }

  // Simulate loading
  btn.innerHTML = '<div class="spinner"></div> Signing in...';
  btn.disabled = true;

  setTimeout(() => {
    // Store session
    sessionStorage.setItem('citizen', JSON.stringify({ name: 'Ramesh Kumar', email, constituency: 'Erode East' }));
    showToast('Login successful! Redirecting...', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
  }, 1400);
}

function handleSignup(e) {
  e.preventDefault();
  const btn = document.getElementById('signupBtn');
  const name = document.getElementById('signupName')?.value;
  const phone = document.getElementById('signupPhone')?.value;
  const email = document.getElementById('signupEmail')?.value;
  const constituency = document.getElementById('signupConstituency')?.value;
  const pass = document.getElementById('signupPass')?.value;
  const confirm = document.getElementById('signupConfirm')?.value;

  if (pass !== confirm) { showToast('Passwords do not match!', 'error'); return; }
  if (!constituency) { showToast('Please select your constituency', 'error'); return; }

  btn.innerHTML = '<div class="spinner"></div> Creating account...';
  btn.disabled = true;

  setTimeout(() => {
    sessionStorage.setItem('citizen', JSON.stringify({ name, email, phone, constituency }));
    showToast('Account created successfully!', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 800);
  }, 1800);
}

function handleGoogleLogin() {
  showToast('Google Sign-In integration coming soon', 'info');
}

/* ══════════════════════════════════════════════════════
   DASHBOARD NAVIGATION
══════════════════════════════════════════════════════ */
function navigateTo(page) {
  // Deactivate all pages
  document.querySelectorAll('.dash-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Activate target
  const pageEl = document.getElementById(`page-${page}`);
  const navEl = document.getElementById(`nav-${page}`);

  if (pageEl) pageEl.classList.add('active');
  if (navEl) navEl.classList.add('active');

  currentPage = page;

  // Update topbar
  const titles = {
    'overview': ['Overview', 'Welcome back, Ramesh! Here\'s your complaint summary.'],
    'complaints': ['My Complaints', 'View and manage all your submitted complaints.'],
    'new-complaint': ['New Complaint', 'Submit a civic issue with live photo and GPS location.'],
    'map': ['Public Map', 'View all complaints in Erode District on the map.'],
    'history': ['History', 'Complete history of all your complaints.'],
    'reports': ['Analytics', 'Your complaint statistics and district analytics.'],
    'profile': ['Profile', 'Manage your account and preferences.'],
    'notifications': ['Notifications', 'View all your alerts and updates.'],
  };

  const [title, subtitle] = titles[page] || ['Dashboard', ''];
  const titleEl = document.getElementById('pageTitle');
  const subEl = document.getElementById('pageSubtitle');
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = subtitle;

  // Page-specific init
  if (page === 'complaints') renderAllComplaints();
  if (page === 'map') renderMapPins();
  if (page === 'history') renderHistory();
  if (page === 'reports') renderAnalytics();
  if (page === 'notifications') renderNotifications();
}

/* ══════════════════════════════════════════════════════
   RENDER FUNCTIONS
══════════════════════════════════════════════════════ */

// Status label helper
function statusLabel(s) {
  const map = {
    submitted: ['Submitted', 'status-submitted', '📨'],
    review: ['Under Review', 'status-review', '🔍'],
    progress: ['In Progress', 'status-progress', '🔄'],
    resolved: ['Resolved', 'status-resolved', '✅'],
  };
  return map[s] || ['Unknown', '', '❓'];
}

// Priority label helper
function priorityLabel(p) {
  const map = {
    low: ['Low', 'priority-low'],
    medium: ['Medium', 'priority-medium'],
    high: ['High', 'priority-high'],
    critical: ['Critical', 'priority-critical'],
  };
  return map[p] || ['N/A', ''];
}

// Render a single complaint card HTML
function renderComplaintCard(c, delay = 0) {
  const [statusText, statusClass, statusIcon] = statusLabel(c.status);
  const [priorityText, priorityClass] = priorityLabel(c.priority);
  return `
    <div class="complaint-card" style="animation-delay:${delay}ms" onclick="openComplaintModal('${c.id}')">
      <div class="complaint-cat-icon">${c.icon}</div>
      <div class="complaint-info">
        <div class="complaint-title">${c.title}</div>
        <div class="complaint-meta">
          <span>🆔 ${c.id}</span>
          <span>📅 ${c.submittedDate}</span>
          <span>📍 ${c.constituency}</span>
          <span>🏢 ${c.department}</span>
        </div>
      </div>
      <div class="complaint-right">
        <span class="status-badge ${statusClass}">${statusIcon} ${statusText}</span>
        <span class="priority-badge ${priorityClass}">${priorityText}</span>
        ${c.escalated ? '<span style="font-size:11px;color:var(--danger)">🚨 Escalated</span>' : ''}
      </div>
    </div>
  `;
}

// Overview — Recent Complaints
function renderRecentComplaints() {
  const container = document.getElementById('recentComplaintsList');
  if (!container) return;
  const recent = COMPLAINTS_DATA.slice(0, 3);
  container.innerHTML = recent.map((c, i) => renderComplaintCard(c, i * 80)).join('');
}

// My Complaints Page
function renderAllComplaints(filter = 'all') {
  const container = document.getElementById('allComplaintsList');
  if (!container) return;
  const filtered = filter === 'all' ? COMPLAINTS_DATA : COMPLAINTS_DATA.filter(c => c.status === filter);
  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">No complaints found for this filter.</div>`;
    return;
  }
  container.innerHTML = filtered.map((c, i) => renderComplaintCard(c, i * 60)).join('');
}

function filterComplaints(filter, btn) {
  document.querySelectorAll('#page-complaints .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAllComplaints(filter);
}

// History Page
function renderHistory() {
  const container = document.getElementById('historyList');
  if (!container) return;
  container.innerHTML = COMPLAINTS_DATA.map((c, i) => renderComplaintCard(c, i * 60)).join('');
}

// Nearby Complaints (Map Page)
function renderNearbyComplaints() {
  const container = document.getElementById('nearbyComplaintsList');
  if (!container) return;
  const nearby = COMPLAINTS_DATA.filter(c => c.status !== 'resolved').slice(0, 4);
  container.innerHTML = nearby.map((c, i) => renderComplaintCard(c, i * 60)).join('');
}

// Category Breakdown
function renderCategoryBreakdown() {
  const container = document.getElementById('categoryBreakdown');
  if (!container) return;
  const cats = [
    { name: 'Road', icon: '🛣️', count: 2, color: 'hsl(220,90%,56%)', pct: 29 },
    { name: 'Water', icon: '💧', count: 2, color: 'hsl(200,85%,52%)', pct: 29 },
    { name: 'Garbage', icon: '🗑️', count: 1, color: 'hsl(38,92%,55%)', pct: 14 },
    { name: 'Electricity', icon: '⚡', count: 1, color: 'hsl(270,70%,60%)', pct: 14 },
    { name: 'Drainage', icon: '🌊', count: 1, color: 'hsl(145,65%,45%)', pct: 14 },
  ];
  container.innerHTML = cats.map(cat => `
    <div class="cat-item">
      <div class="cat-row">
        <span>${cat.icon} ${cat.name}</span>
        <span>${cat.count} complaints</span>
      </div>
      <div class="cat-bar">
        <div class="cat-fill" style="width:${cat.pct}%;background:${cat.color}"></div>
      </div>
    </div>
  `).join('');
}

// Activity Timeline
function renderTimeline() {
  const container = document.getElementById('activityTimeline');
  if (!container) return;
  const events = [
    { icon: '🚨', title: 'Escalation Report Sent', desc: 'CMP-2024-001 escalated to Roads Dept. Supervisor', time: '2 hours ago', color: 'hsla(0,72%,55%,0.2)' },
    { icon: '🔄', title: 'Status Updated', desc: 'CMP-2024-001 moved to "In Progress"', time: '1 day ago', color: 'hsla(200,85%,52%,0.2)' },
    { icon: '🔍', title: 'Under Review', desc: 'CMP-2024-002 is now under review', time: '2 days ago', color: 'hsla(38,92%,55%,0.2)' },
    { icon: '✅', title: 'Complaint Resolved', desc: 'CMP-2023-021 garbage issue resolved', time: '3 days ago', color: 'hsla(145,65%,45%,0.2)' },
    { icon: '📨', title: 'New Complaint Submitted', desc: 'CMP-2024-003 street light issue submitted', time: '4 days ago', color: 'hsla(220,90%,56%,0.2)' },
  ];
  container.innerHTML = events.map(e => `
    <div class="timeline-item">
      <div class="timeline-dot" style="background:${e.color};">${e.icon}</div>
      <div class="timeline-content">
        <div class="timeline-title">${e.title}</div>
        <div class="timeline-desc">${e.desc}</div>
        <div class="timeline-time">${e.time}</div>
      </div>
    </div>
  `).join('');
}

// Notifications
function renderNotifications() {
  const container = document.getElementById('notifList');
  if (!container) return;
  const typeColors = { danger: 'var(--danger)', info: 'var(--info)', success: 'var(--success)', warning: 'var(--warning)' };
  container.innerHTML = NOTIFICATIONS_DATA.map(n => `
    <div style="background:var(--bg-card);border:1px solid ${n.read ? 'var(--border)' : typeColors[n.type] + '44'};border-left:3px solid ${typeColors[n.type]};border-radius:var(--radius);padding:16px;display:flex;gap:14px;opacity:${n.read ? '0.7' : '1'};transition:all var(--transition);cursor:pointer" onclick="markRead(${n.id})">
      <span style="font-size:22px">${n.icon}</span>
      <div style="flex:1">
        <div style="font-size:14px;font-weight:600;margin-bottom:4px">${n.title} ${!n.read ? '<span style="background:var(--primary);color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:8px;vertical-align:middle">NEW</span>' : ''}</div>
        <div style="font-size:13px;color:var(--text-secondary)">${n.message}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:6px">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function markRead(id) {
  const n = NOTIFICATIONS_DATA.find(n => n.id === id);
  if (n) { n.read = true; renderNotifications(); }
}

function markAllRead() {
  NOTIFICATIONS_DATA.forEach(n => n.read = true);
  document.getElementById('notifBadge').style.display = 'none';
  renderNotifications();
  showToast('All notifications marked as read', 'success');
}

// Map Pins (Simulated)
function renderMapPins() {
  renderNearbyComplaints();
}

function filterMapBy(f, btn) {
  document.querySelectorAll('#page-map .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function loadMap() {
  showToast('Map would load Leaflet.js / OpenStreetMap here', 'info');
}

// Analytics
function renderAnalytics() {
  renderTrendChart();
  renderStatusSplit();
  renderPriorityDist();
  renderDeptPerformance();
}

function renderTrendChart() {
  const chart = document.getElementById('trendChart');
  const labels = document.getElementById('trendLabels');
  if (!chart) return;
  const months = [
    { label: 'Aug', val: 1 }, { label: 'Sep', val: 2 }, { label: 'Oct', val: 1 },
    { label: 'Nov', val: 1 }, { label: 'Dec', val: 2 }, { label: 'Jan', val: 3 },
  ];
  const max = Math.max(...months.map(m => m.val));
  chart.innerHTML = months.map(m => `
    <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div style="width:100%;background:linear-gradient(180deg,var(--primary),var(--accent));border-radius:4px 4px 0 0;height:${(m.val/max)*160}px;transition:height 1s ease;min-height:6px"></div>
      <div style="font-size:11px;font-weight:600;color:var(--text-primary)">${m.val}</div>
    </div>
  `).join('');
  if (labels) labels.innerHTML = months.map(m => `<span>${m.label}</span>`).join('');
}

function renderStatusSplit() {
  const container = document.getElementById('statusSplit');
  if (!container) return;
  const statuses = [
    { label: 'Resolved', count: 4, cls: 'status-resolved', icon: '✅' },
    { label: 'In Progress', count: 1, cls: 'status-progress', icon: '🔄' },
    { label: 'Under Review', count: 1, cls: 'status-review', icon: '🔍' },
    { label: 'Submitted', count: 1, cls: 'status-submitted', icon: '📨' },
  ];
  container.innerHTML = statuses.map(s => `
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span class="status-badge ${s.cls}">${s.icon} ${s.label}</span>
      <strong style="color:var(--text-primary)">${s.count}</strong>
    </div>
  `).join('');
}

function renderPriorityDist() {
  const container = document.getElementById('priorityDist');
  if (!container) return;
  const priorities = [
    { label: 'Critical', count: 1, cls: 'priority-critical', color: 'var(--danger)' },
    { label: 'High', count: 2, cls: 'priority-high', color: 'var(--critical)' },
    { label: 'Medium', count: 3, cls: 'priority-medium', color: 'var(--warning)' },
    { label: 'Low', count: 1, cls: 'priority-low', color: 'var(--success)' },
  ];
  const total = priorities.reduce((s, p) => s + p.count, 0);
  container.innerHTML = priorities.map(p => `
    <div style="display:flex;align-items:center;gap:10px">
      <span class="priority-badge ${p.cls}">${p.label}</span>
      <div style="flex:1;height:6px;background:var(--bg-base);border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${(p.count/total)*100}%;background:${p.color};border-radius:3px"></div>
      </div>
      <strong style="color:var(--text-primary);font-size:13px;min-width:20px;text-align:right">${p.count}</strong>
    </div>
  `).join('');
}

function renderDeptPerformance() {
  const container = document.getElementById('deptPerformance');
  if (!container) return;
  const depts = [
    { name: 'Roads & Highways', icon: '🛣️', total: 2, resolved: 1, avgDays: 5.2 },
    { name: 'Water Supply & Drainage', icon: '💧', total: 3, resolved: 2, avgDays: 3.8 },
    { name: 'Sanitation', icon: '🗑️', total: 1, resolved: 1, avgDays: 4.0 },
    { name: 'TNEB Electricity', icon: '⚡', total: 1, resolved: 0, avgDays: '-' },
  ];
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:0">
      <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:8px;padding:8px 0;font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border);margin-bottom:8px">
        <span>Department</span><span style="text-align:center">Total</span><span style="text-align:center">Resolved</span><span style="text-align:center">Avg. Days</span>
      </div>
      ${depts.map(d => `
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center;font-size:13px">
          <span>${d.icon} ${d.name}</span>
          <span style="text-align:center;font-weight:600">${d.total}</span>
          <span style="text-align:center;color:var(--success);font-weight:600">${d.resolved}</span>
          <span style="text-align:center;color:var(--warning)">${d.avgDays}d</span>
        </div>
      `).join('')}
    </div>
  `;
}

/* ══════════════════════════════════════════════════════
   COMPLAINT MODAL
══════════════════════════════════════════════════════ */
function openComplaintModal(id) {
  const c = COMPLAINTS_DATA.find(x => x.id === id);
  if (!c) return;
  const modal = document.getElementById('complaintModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  const [statusText, statusClass, statusIcon] = statusLabel(c.status);
  const [priorityText, priorityClass] = priorityLabel(c.priority);

  const timeline = [
    { label: 'Submitted', date: c.submittedDate, done: !!c.submittedDate },
    { label: 'Under Review', date: c.reviewDate, done: !!c.reviewDate },
    { label: 'In Progress', date: c.progressDate, done: !!c.progressDate },
    { label: 'Resolved', date: c.resolvedDate, done: !!c.resolvedDate },
  ];

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">
      <div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">${c.id}</div>
        <h2 style="font-family:var(--font-display);font-size:18px;font-weight:700;margin-bottom:8px">${c.icon} ${c.title}</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span class="status-badge ${statusClass}">${statusIcon} ${statusText}</span>
          <span class="priority-badge ${priorityClass}">${priorityText}</span>
          ${c.escalated ? '<span style="font-size:11px;font-weight:700;color:var(--danger);background:hsla(0,72%,55%,0.1);padding:3px 10px;border-radius:8px">🚨 Escalated</span>' : ''}
        </div>
      </div>
      <button onclick="closeModal()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--text-muted);padding:4px">✕</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;font-size:12px">
      <div style="background:var(--bg-base);padding:10px;border-radius:var(--radius-sm)">
        <div style="color:var(--text-muted);margin-bottom:3px">CATEGORY</div>
        <div style="font-weight:600">${c.icon} ${c.category}</div>
      </div>
      <div style="background:var(--bg-base);padding:10px;border-radius:var(--radius-sm)">
        <div style="color:var(--text-muted);margin-bottom:3px">DEPARTMENT</div>
        <div style="font-weight:600">${c.department}</div>
      </div>
      <div style="background:var(--bg-base);padding:10px;border-radius:var(--radius-sm)">
        <div style="color:var(--text-muted);margin-bottom:3px">CONSTITUENCY</div>
        <div style="font-weight:600">📍 ${c.constituency}</div>
      </div>
      <div style="background:var(--bg-base);padding:10px;border-radius:var(--radius-sm)">
        <div style="color:var(--text-muted);margin-bottom:3px">SLA DEADLINE</div>
        <div style="font-weight:600;color:${c.escalated ? 'var(--danger)' : 'var(--warning)'}">${c.slaDeadline || 'N/A'}</div>
      </div>
    </div>

    <div style="background:var(--bg-base);padding:12px;border-radius:var(--radius-sm);margin-bottom:16px">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">DESCRIPTION</div>
      <div style="font-size:13px;line-height:1.6">${c.description}</div>
    </div>

    <div style="background:var(--bg-base);padding:12px;border-radius:var(--radius-sm);margin-bottom:16px">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">LOCATION</div>
      <div style="font-size:13px">📍 ${c.location}</div>
    </div>

    <div>
      <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px">Resolution Timeline</div>
      <div style="display:flex;gap:0">
        ${timeline.map((t, i) => `
          <div style="flex:1;text-align:center;position:relative">
            ${i < timeline.length - 1 ? `<div style="position:absolute;top:14px;left:50%;right:-50%;height:2px;background:${t.done ? 'var(--primary)' : 'var(--border)'}"></div>` : ''}
            <div style="width:28px;height:28px;border-radius:50%;background:${t.done ? 'var(--primary)' : 'var(--bg-card2)'};border:2px solid ${t.done ? 'var(--primary)' : 'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:12px;margin:0 auto;position:relative;z-index:1">${t.done ? '✓' : i + 1}</div>
            <div style="font-size:10px;font-weight:600;margin-top:6px;color:${t.done ? 'var(--primary)' : 'var(--text-muted)'}">${t.label}</div>
            <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${t.date || '—'}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('complaintModal');
  if (modal) modal.style.display = 'none';
}

/* ══════════════════════════════════════════════════════
   NEW COMPLAINT — Multi-Step Form
══════════════════════════════════════════════════════ */

// ── Autocomplete suggestions database ──
const TITLE_SUGGESTIONS = [
  { icon:'🛣️', text:'Large pothole on main road', sub:'Road · High priority', cat:'Road' },
  { icon:'🛣️', text:'Damaged footpath near school', sub:'Road · Medium priority', cat:'Road' },
  { icon:'🛣️', text:'Road needs urgent repair after rain', sub:'Road · High priority', cat:'Road' },
  { icon:'💧', text:'No water supply in our area', sub:'Water · High priority', cat:'Water' },
  { icon:'💧', text:'Water pipe leaking on street', sub:'Water · High priority', cat:'Water' },
  { icon:'💧', text:'Contaminated water coming from tap', sub:'Water · Critical priority', cat:'Water' },
  { icon:'🗑️', text:'Garbage not collected for a week', sub:'Garbage · Medium priority', cat:'Garbage' },
  { icon:'🗑️', text:'Overflowing garbage bin near market', sub:'Garbage · High priority', cat:'Garbage' },
  { icon:'⚡', text:'Street light not working for 2 weeks', sub:'Electricity · Medium priority', cat:'Electricity' },
  { icon:'⚡', text:'Electrical wire hanging dangerously low', sub:'Electricity · Critical priority', cat:'Electricity' },
  { icon:'🌊', text:'Drainage overflow on main road', sub:'Drainage · High priority', cat:'Drainage' },
  { icon:'🌊', text:'Blocked drain causing waterlogging', sub:'Drainage · High priority', cat:'Drainage' },
  { icon:'📌', text:'Stray dogs menace in residential area', sub:'Other · Medium priority', cat:'Other' },
  { icon:'📌', text:'Illegal construction blocking footpath', sub:'Other · Medium priority', cat:'Other' },
];

const CAT_HINTS = {
  Road: { text:'🛣️ Will be routed to Roads & Highways Dept. Expect quick action for safety hazards.', color:'var(--primary)', border:'hsla(220,90%,56%,.3)' },
  Water: { text:'💧 Will be routed to Water Supply & Drainage Board. Supply disruptions get High priority.', color:'var(--info)', border:'hsla(200,85%,52%,.3)' },
  Garbage: { text:'🗑️ Will be routed to Sanitation Department. Scheduled clearance happens every 48 hours.', color:'var(--warning)', border:'hsla(38,92%,55%,.3)' },
  Electricity: { text:'⚡ Will be routed to Tamil Nadu Electricity Board (TNEB). Hazards escalated immediately.', color:'hsl(270,70%,60%)', border:'hsla(270,70%,60%,.3)' },
  Drainage: { text:'🌊 Will be routed to Water Supply & Drainage Board. Overflow issues get urgent SLA.', color:'hsl(175,70%,45%)', border:'hsla(175,70%,45%,.3)' },
  Other: { text:'📌 Will be reviewed by District Collectorate and routed to the appropriate department.', color:'var(--text-secondary)', border:'var(--border)' },
};

const DESC_CHIPS_MAP = {
  Road:        ['Pothole', 'Damaged road', 'No signage', 'Broken divider', 'Accident prone'],
  Water:       ['No supply', 'Leaking pipe', 'Low pressure', 'Contaminated', 'Overflowing tank'],
  Garbage:     ['Not collected', 'Overflowing bin', 'Burning garbage', 'Open dumping', 'Pest infestation'],
  Electricity: ['Street light off', 'Wire snapped', 'No power', 'Flickering light', 'Transformer fault'],
  Drainage:    ['Overflow', 'Blocked drain', 'Waterlogging', 'Foul smell', 'Mosquito breeding'],
  Other:       ['Stray animals', 'Illegal construction', 'Noise pollution', 'Tree fell', 'Encroachment'],
};

let suggestIndex = -1;
let selectedSeverity = '';

function onTitleInput(input) {
  const val = input.value.trim();
  const clearBtn = document.getElementById('titleClear');
  const icon = document.getElementById('titleValidIcon');
  const sugBox = document.getElementById('titleSuggestions');

  if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';

  if (val.length < 2) {
    if (sugBox) sugBox.style.display = 'none';
    if (icon) icon.textContent = '';
    updateAIPriority();
    updateStep1Progress();
    return;
  }

  // Filter suggestions
  const matches = TITLE_SUGGESTIONS.filter(s =>
    s.text.toLowerCase().includes(val.toLowerCase()) ||
    s.cat.toLowerCase().includes(val.toLowerCase())
  ).slice(0, 5);

  if (matches.length && sugBox) {
    sugBox.style.display = 'block';
    suggestIndex = -1;
    sugBox.innerHTML = matches.map((s, i) => `
      <div class="suggest-item" data-idx="${i}" onclick="selectSuggestion(${i})"
           onmouseover="setSuggestActive(${i})">
        <span class="suggest-icon">${s.icon}</span>
        <div class="suggest-text">
          <strong>${highlightMatch(s.text, val)}</strong>
          <span>${s.sub}</span>
        </div>
      </div>
    `).join('');
    sugBox._matches = matches;
  } else {
    if (sugBox) sugBox.style.display = 'none';
  }

  // Validate
  if (val.length >= 10) {
    if (icon) { icon.textContent = '✅'; icon.style.color = 'var(--success)'; }
  } else {
    if (icon) { icon.textContent = `${val.length}/10`; icon.style.color = 'var(--text-muted)'; }
  }

  updateAIPriority();
  updateStep1Progress();
}

function highlightMatch(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + `<mark style="background:hsla(220,90%,56%,.25);color:var(--primary);border-radius:2px">${text.slice(idx, idx + query.length)}</mark>` + text.slice(idx + query.length);
}

function setSuggestActive(i) { suggestIndex = i; }

function onSuggestKey(e) {
  const sugBox = document.getElementById('titleSuggestions');
  if (!sugBox || sugBox.style.display === 'none') return;
  const items = sugBox.querySelectorAll('.suggest-item');
  if (e.key === 'ArrowDown') { suggestIndex = Math.min(suggestIndex + 1, items.length - 1); }
  else if (e.key === 'ArrowUp') { suggestIndex = Math.max(suggestIndex - 1, 0); }
  else if (e.key === 'Enter' && suggestIndex >= 0) { e.preventDefault(); selectSuggestion(suggestIndex); return; }
  else if (e.key === 'Escape') { sugBox.style.display = 'none'; return; }
  items.forEach((el, i) => el.classList.toggle('active', i === suggestIndex));
}

function selectSuggestion(i) {
  const sugBox = document.getElementById('titleSuggestions');
  const matches = sugBox?._matches;
  if (!matches || !matches[i]) return;
  const s = matches[i];
  const input = document.getElementById('cTitle');
  if (input) input.value = s.text;
  if (sugBox) sugBox.style.display = 'none';
  const clearBtn = document.getElementById('titleClear');
  if (clearBtn) clearBtn.style.display = 'block';
  const icon = document.getElementById('titleValidIcon');
  if (icon) { icon.textContent = '✅'; icon.style.color = 'var(--success)'; }
  // Auto-select matching category
  const catBtn = document.getElementById(`cat-${s.cat}`);
  if (catBtn) selectCategory(s.cat, catBtn);
  updateAIPriority();
  updateStep1Progress();
}

function clearTitle() {
  const input = document.getElementById('cTitle');
  const clearBtn = document.getElementById('titleClear');
  const icon = document.getElementById('titleValidIcon');
  const sugBox = document.getElementById('titleSuggestions');
  if (input) { input.value = ''; input.focus(); }
  if (clearBtn) clearBtn.style.display = 'none';
  if (icon) icon.textContent = '';
  if (sugBox) sugBox.style.display = 'none';
  updateAIPriority();
  updateStep1Progress();
}

// Close suggestions on outside click
document.addEventListener('click', e => {
  const sugBox = document.getElementById('titleSuggestions');
  if (sugBox && !sugBox.contains(e.target) && e.target.id !== 'cTitle') {
    sugBox.style.display = 'none';
  }
});

function selectCategory(cat, btn) {
  selectedCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Update label
  const label = document.getElementById('catSelectedLabel');
  if (label) label.textContent = `✅ ${cat} selected`;

  // Show category hint
  const hint = document.getElementById('catHint');
  const info = CAT_HINTS[cat];
  if (hint && info) {
    hint.style.display = 'block';
    hint.style.color = info.color;
    hint.style.borderColor = info.border;
    hint.style.background = 'transparent';
    hint.textContent = info.text;
  }

  // Update description chips
  const chips = document.getElementById('descChips');
  if (chips) {
    const chipList = DESC_CHIPS_MAP[cat] || [];
    chips.innerHTML = chipList.map(c => `
      <button class="desc-chip" onclick="appendChip('${c}')">+ ${c}</button>
    `).join('');
  }

  updateAIPriority();
  updateStep1Progress();
}

function appendChip(text) {
  const ta = document.getElementById('cDesc');
  if (!ta) return;
  const val = ta.value.trim();
  ta.value = val ? `${val} ${text.toLowerCase()}.` : `${text}.`;
  onDescInput(ta);
  ta.focus();
}

function onDescInput(ta) {
  const len = ta.value.length;
  const counter = document.getElementById('descCounter');
  const bar = document.getElementById('descQualBar');
  const label = document.getElementById('descQualLabel');

  if (counter) {
    counter.textContent = `${len} / 500`;
    counter.style.color = len > 400 ? 'var(--danger)' : len > 200 ? 'var(--success)' : 'var(--text-muted)';
  }

  // Quality score
  const words = ta.value.trim().split(/\s+/).filter(Boolean).length;
  const hasLocation = /road|street|nagar|colony|cross|junction|near|opposite|behind|temple|school|market|bridge/i.test(ta.value);
  const hasDuration = /days?|weeks?|months?|hours?|since|from|ago/i.test(ta.value);
  let score = Math.min(words * 4 + (hasLocation ? 20 : 0) + (hasDuration ? 15 : 0), 100);

  if (bar) {
    bar.style.width = `${score}%`;
    bar.style.background = score < 30 ? 'var(--danger)' : score < 60 ? 'var(--warning)' : 'var(--success)';
  }
  if (label) {
    label.textContent = score < 30 ? 'Weak' : score < 60 ? 'Good' : 'Strong';
    label.style.color = score < 30 ? 'var(--danger)' : score < 60 ? 'var(--warning)' : 'var(--success)';
  }

  updateAIPriority();
  updateStep1Progress();
}

function setSeverity(level, btn) {
  selectedSeverity = level;
  document.querySelectorAll('.severity-btn').forEach(b => b.removeAttribute('data-sel'));
  btn.setAttribute('data-sel', level);
  updateAIPriority();
  updateStep1Progress();
}

function updateStep1Progress() {
  const title = document.getElementById('cTitle')?.value.trim() || '';
  const desc = document.getElementById('cDesc')?.value.trim() || '';
  const label = document.getElementById('step1Progress');
  const missing = [];
  if (title.length < 10) missing.push('title (min 10 chars)');
  if (!selectedCategory) missing.push('category');
  if (desc.length < 20) missing.push('description (min 20 chars)');
  if (!selectedSeverity) missing.push('severity level');

  if (label) {
    if (missing.length === 0) {
      label.textContent = '✅ All details filled — ready to proceed';
      label.style.color = 'var(--success)';
    } else {
      label.textContent = `Missing: ${missing.join(', ')}`;
      label.style.color = 'var(--text-muted)';
    }
  }
}

const AI_KEYWORDS = {
  critical: ['accident', 'danger', 'collapse', 'flood', 'emergency', 'sewage overflow', 'fire', 'electrocution', 'blocked drain', 'major', 'serious', 'hazardous', 'contaminated'],
  high: ['broken', 'leaking', 'overflowing', 'pothole', 'no water', 'water cut', 'outage', 'dark', 'night', 'street light', 'pipeline', 'burst'],
  medium: ['garbage', 'dirty', 'slow', 'delay', 'repair', 'damage', 'issue', 'problem', 'not working', 'week'],
  low: ['minor', 'small', 'paint', 'signage', 'request', 'suggestion', 'inconvenient'],
};

const DEPT_MAP = {
  Road: 'Roads & Highways Dept.',
  Water: 'Water Supply & Drainage Board',
  Garbage: 'Sanitation Department',
  Electricity: 'Tamil Nadu Electricity Board',
  Drainage: 'Water Supply & Drainage Board',
  Other: 'District Collectorate',
};

const SLA_MAP = { critical: 2, high: 5, medium: 10, low: 15 };

function computeAIPriority(title = '', desc = '') {
  // Severity override takes precedence
  if (selectedSeverity) return selectedSeverity;
  const text = (title + ' ' + desc).toLowerCase();
  for (const level of ['critical', 'high', 'medium', 'low']) {
    if (AI_KEYWORDS[level].some(kw => text.includes(kw))) return level;
  }
  if (selectedCategory === 'Water' || selectedCategory === 'Electricity') return 'high';
  if (selectedCategory === 'Road') return 'medium';
  return 'medium';
}

function updateAIPriority() {
  const title = document.getElementById('cTitle')?.value || '';
  const desc = document.getElementById('cDesc')?.value || '';
  const banner = document.getElementById('aiPriorityBanner');
  const slaBanner = document.getElementById('slaBanner');
  if (!banner) return;

  const hasEnough = title.length >= 3 || selectedCategory;
  if (!hasEnough) {
    banner.style.display = 'none';
    if (slaBanner) slaBanner.style.display = 'none';
    return;
  }

  const priority = computeAIPriority(title, desc);
  const dept = DEPT_MAP[selectedCategory] || 'District Collectorate';
  const sla = SLA_MAP[priority];
  const colorMap = { critical: 'critical', high: 'high', medium: 'medium', low: 'low' };
  const emojiMap = { critical: '🚨', high: '⚠️', medium: '📋', low: '📌' };

  banner.style.display = 'flex';
  banner.className = `ai-priority-banner ${colorMap[priority]}`;
  banner.innerHTML = `
    <span class="ai-icon">🤖</span>
    <div class="ai-priority-text">
      <strong>${emojiMap[priority]} AI Priority: ${priority.toUpperCase()}</strong>
      <span>Based on category and description keywords</span>
    </div>
  `;

  // SLA Banner
  if (slaBanner) {
    slaBanner.style.display = 'block';
    const slaEl = document.getElementById('slaDays');
    const deptEl = document.getElementById('sladept');
    const deadlineEl = document.getElementById('slaDeadlinePreview');
    if (slaEl) slaEl.textContent = sla;
    if (deptEl) deptEl.textContent = dept;
    if (deadlineEl) {
      const deadline = addWorkingDays(new Date(), sla);
      deadlineEl.textContent = `Deadline: ${deadline.toLocaleDateString('en-IN', { day:'numeric', month:'short' })}`;
    }
  }
}

function addWorkingDays(date, days) {
  let count = 0;
  const d = new Date(date);
  while (count < days) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) count++;
  }
  return d;
}

function goToStep(step) {
  if (step === 2) {
    const title = document.getElementById('cTitle')?.value.trim() || '';
    const desc = document.getElementById('cDesc')?.value.trim() || '';
    if (title.length < 5) { showToast('Please enter a complaint title (min 5 characters)', 'error'); return; }
    if (!selectedCategory) { showToast('Please select a category', 'error'); return; }
    if (desc.length < 10) { showToast('Please add a description (min 10 characters)', 'error'); return; }
  }
  if (step === 3) {
    if (!capturedPhotoData) { showToast('Please capture a live photo before proceeding', 'error'); return; }
    if (!capturedLocation) { showToast('Please detect your GPS location', 'error'); return; }
    renderReviewSummary();
  }

  // Update steps UI
  for (let i = 1; i <= 3; i++) {
    const stepEl = document.getElementById(`step-${i}`);
    const contentEl = document.getElementById(`complaint-step-${i}`);
    if (stepEl) {
      stepEl.className = 'step' + (i < step ? ' completed' : i === step ? ' active' : '');
      stepEl.querySelector('.step-num').textContent = i < step ? '✓' : i;
    }
    if (contentEl) contentEl.style.display = i === step ? 'flex' : 'none';
  }
  currentStep = step;
}

function renderReviewSummary() {
  const container = document.getElementById('reviewSummary');
  const title = document.getElementById('cTitle')?.value || '';
  const desc = document.getElementById('cDesc')?.value || '';
  const priority = computeAIPriority(title, desc);
  const dept = DEPT_MAP[selectedCategory] || 'District Collectorate';
  const sla = SLA_MAP[priority];
  const [, priorityClass] = priorityLabel(priority);
  const deadline = addWorkingDays(new Date(), sla);
  const deadlineStr = deadline.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short', year:'numeric' });

  // Set preview ID
  const previewId = `CMP-2024-00${COMPLAINTS_DATA.length + 1}`;
  const previewIdEl = document.getElementById('previewComplaintId');
  if (previewIdEl) previewIdEl.textContent = previewId;

  // Review summary rows
  if (container) {
    const rows = [
      ['📝 Title', title],
      ['🏷️ Category', `${selectedCategory}`],
      ['📝 Description', desc.length > 80 ? desc.slice(0, 80) + '...' : desc],
      ['📍 Location', capturedLocation
        ? `${capturedLocation.latitude.toFixed(4)}°N, ${capturedLocation.longitude.toFixed(4)}°E`
        : 'GPS Captured'],
      ['📸 Photo', '✅ Live photo attached'],
      ['💪 Severity', selectedSeverity ? selectedSeverity.toUpperCase() : 'Auto-detected'],
    ];
    container.innerHTML = rows.map(([k, v]) => `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">
        <span style="font-size:12px;color:var(--text-muted);min-width:100px">${k}</span>
        <strong style="font-size:13px;text-align:right;color:var(--text-primary)">${v}</strong>
      </div>
    `).join('');
  }

  // Photo thumbnail in review
  const reviewPhotoRow = document.getElementById('reviewPhotoRow');
  const reviewPhoto = document.getElementById('reviewPhoto');
  if (capturedPhotoData && reviewPhotoRow && reviewPhoto) {
    reviewPhotoRow.style.display = 'block';
    reviewPhoto.src = capturedPhotoData;
  }

  // AI fields
  const reviewPriority = document.getElementById('reviewPriority');
  const reviewDept = document.getElementById('reviewDept');
  const reviewSLA = document.getElementById('reviewSLA');
  const finalAI = document.getElementById('finalAIPriority');
  const [, pc] = priorityLabel(priority);
  if (reviewPriority) { reviewPriority.textContent = priority.toUpperCase(); reviewPriority.className = `priority-badge ${pc}`; }
  if (reviewDept) reviewDept.textContent = dept;
  if (reviewSLA) reviewSLA.textContent = `${sla} working days (by ${deadlineStr})`;
  if (finalAI) finalAI.textContent = `Your complaint will be auto-routed to ${dept}. AI set a ${sla}-working-day SLA. If unresolved, it will escalate to the supervisor.`;
}

function checkDeclaration() {
  const checked = document.getElementById('declarationCheck')?.checked;
  const btn = document.getElementById('submitBtn');
  if (btn) btn.disabled = !checked;
}

/* ── Camera ── */
async function startCamera() {
  const idle = document.getElementById('cameraIdle');
  const preview = document.getElementById('cameraPreview');
  const feed = document.getElementById('cameraFeed');
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    feed.srcObject = cameraStream;
    if (idle) idle.style.display = 'none';
    if (preview) preview.style.display = 'block';
    captureLocation();
    showToast('📷 Camera ready — aim at the issue and capture!', 'info');
  } catch (err) {
    showToast('Camera access denied. Please allow camera permissions in your browser.', 'error');
  }
}

function capturePhoto() {
  const feed = document.getElementById('cameraFeed');
  const canvas = document.getElementById('captureCanvas');
  const preview = document.getElementById('cameraPreview');
  const captured = document.getElementById('capturedPreview');
  const img = document.getElementById('capturedImg');
  const ts = document.getElementById('photoTimestamp');

  canvas.width = feed.videoWidth || 640;
  canvas.height = feed.videoHeight || 480;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(feed, 0, 0);

  // Add timestamp watermark
  const now = new Date();
  const stamp = now.toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, canvas.height - 28, canvas.width, 28);
  ctx.fillStyle = '#fff';
  ctx.font = '13px monospace';
  ctx.fillText(`📍 Erode District  ${stamp}`, 10, canvas.height - 10);

  capturedPhotoData = canvas.toDataURL('image/jpeg', 0.85);
  img.src = capturedPhotoData;
  if (ts) ts.textContent = stamp;

  if (preview) preview.style.display = 'none';
  if (captured) captured.style.display = 'block';
  stopCamera();

  // Update checklist
  const photoIcon = document.getElementById('check-photo-icon');
  const photoText = document.getElementById('check-photo-text');
  if (photoIcon) { photoIcon.textContent = '✅'; }
  if (photoText) { photoText.textContent = 'Live photo captured'; photoText.style.color = 'var(--success)'; }

  checkStep2Complete();
  showToast('📸 Photo captured with timestamp!', 'success');
}

function retakePhoto() {
  capturedPhotoData = null;
  document.getElementById('capturedPreview').style.display = 'none';
  document.getElementById('cameraIdle').style.display = 'block';
  const photoIcon = document.getElementById('check-photo-icon');
  const photoText = document.getElementById('check-photo-text');
  if (photoIcon) photoIcon.textContent = '⬜';
  if (photoText) { photoText.textContent = 'Live photo captured'; photoText.style.color = 'var(--text-muted)'; }
  checkStep2Complete();
}

function stopCamera() {
  if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
}

/* ── Location with animated loading ── */
function captureLocation() {
  const btn = document.getElementById('locationBtn');
  const idle = document.getElementById('locationIdle');
  const loading = document.getElementById('locationLoading');
  const display = document.getElementById('locationDisplay');
  const progressBar = document.getElementById('locationProgressBar');

  if (btn) btn.disabled = true;
  if (idle) idle.style.display = 'none';
  if (loading) loading.style.display = 'block';
  if (display) display.style.display = 'none';

  // Animate progress bar
  let prog = 0;
  const progTimer = setInterval(() => {
    prog = Math.min(prog + Math.random() * 15, 85);
    if (progressBar) progressBar.style.width = `${prog}%`;
  }, 200);

  function onSuccess(pos) {
    clearInterval(progTimer);
    if (progressBar) progressBar.style.width = '100%';
    setTimeout(() => {
      capturedLocation = { latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy };
      showLocationResult(capturedLocation);
    }, 300);
  }

  function onError() {
    clearInterval(progTimer);
    // Fallback demo location (Erode East area)
    capturedLocation = {
      latitude: 11.3410 + (Math.random() * 0.008 - 0.004),
      longitude: 77.7172 + (Math.random() * 0.008 - 0.004),
      accuracy: 12 + Math.random() * 8
    };
    showLocationResult(capturedLocation);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 8000 });
  } else {
    onError();
  }
}

function showLocationResult(loc) {
  const loading = document.getElementById('locationLoading');
  const display = document.getElementById('locationDisplay');
  const addressEl = document.getElementById('locationAddress');
  const coordsEl = document.getElementById('locationCoords');
  const accuracyEl = document.getElementById('locationAccuracy');
  const btn = document.getElementById('locationBtn');

  if (loading) loading.style.display = 'none';
  if (display) display.style.display = 'block';

  // Reverse geocode simulation (in real app, use Nominatim/Google Maps)
  const erodeAreas = [
    'Gandhi Nagar, 3rd Street, Erode East',
    'Anna Nagar, 2nd Cross Road, Erode East',
    'Periyar Nagar, Main Road, Erode East',
    'Temple Street, Near Bhavani Kovil, Erode East',
    'NH-47 Service Road, Near Market Junction, Erode East',
    'KSR Colony, 5th Cross, Erode East',
  ];
  const address = erodeAreas[Math.floor(Math.random() * erodeAreas.length)];

  if (addressEl) addressEl.textContent = address;
  if (coordsEl) coordsEl.textContent = `${loc.latitude.toFixed(6)}° N, ${loc.longitude.toFixed(6)}° E`;
  if (accuracyEl) accuracyEl.textContent = `± ${Math.round(loc.accuracy)}m accuracy · GPS Verified`;
  if (btn) { btn.disabled = false; btn.textContent = '🔄 Re-detect'; }

  // Update checklist
  const locIcon = document.getElementById('check-location-icon');
  const locText = document.getElementById('check-location-text');
  if (locIcon) locIcon.textContent = '✅';
  if (locText) { locText.textContent = 'GPS location detected'; locText.style.color = 'var(--success)'; }

  checkStep2Complete();
  showToast('📍 Location captured!', 'success');
}

function checkStep2Complete() {
  const nextBtn = document.getElementById('step2NextBtn');
  if (nextBtn) nextBtn.disabled = !(capturedPhotoData && capturedLocation);
}

/* ── Submit ── */
function submitComplaint() {
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<div class="spinner"></div> Submitting to server...';
  btn.disabled = true;

  // Simulate progressive submission stages
  const stages = ['Uploading photo...', 'Attaching GPS data...', 'Running AI analysis...', 'Routing to department...'];
  let stageIdx = 0;
  const stageTimer = setInterval(() => {
    stageIdx++;
    if (stageIdx < stages.length) {
      btn.innerHTML = `<div class="spinner"></div> ${stages[stageIdx]}`;
    } else {
      clearInterval(stageTimer);
    }
  }, 500);

  setTimeout(() => {
    clearInterval(stageTimer);
    const newId = `CMP-2024-00${COMPLAINTS_DATA.length + 1}`;
    const title = document.getElementById('cTitle')?.value || '';
    const desc = document.getElementById('cDesc')?.value || '';
    const priority = computeAIPriority(title, desc);

    COMPLAINTS_DATA.unshift({
      id: newId,
      title,
      category: selectedCategory,
      icon: { Road:'🛣️', Water:'💧', Garbage:'🗑️', Electricity:'⚡', Drainage:'🌊', Other:'📌' }[selectedCategory] || '📌',
      description: desc,
      status: 'submitted',
      priority,
      constituency: 'Erode East',
      department: DEPT_MAP[selectedCategory],
      submittedDate: new Date().toISOString().split('T')[0],
      reviewDate: null, progressDate: null, resolvedDate: null,
      slaDeadline: addWorkingDays(new Date(), SLA_MAP[priority]).toISOString().split('T')[0],
      escalated: false,
      location: capturedLocation
        ? `${capturedLocation.latitude.toFixed(4)}°N, ${capturedLocation.longitude.toFixed(4)}°E`
        : 'Erode East',
    });

    showToast(`✅ ${newId} submitted! AI priority: ${priority.toUpperCase()} → ${DEPT_MAP[selectedCategory]}`, 'success');

    // Reset all form state
    selectedCategory = '';
    selectedSeverity = '';
    capturedPhotoData = null;
    capturedLocation = null;
    document.getElementById('cTitle').value = '';
    document.getElementById('cDesc').value = '';
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.severity-btn').forEach(b => b.removeAttribute('data-sel'));
    const aiB = document.getElementById('aiPriorityBanner');
    const slaB = document.getElementById('slaBanner');
    const catH = document.getElementById('catHint');
    const catL = document.getElementById('catSelectedLabel');
    const ttIcon = document.getElementById('titleValidIcon');
    const ttClear = document.getElementById('titleClear');
    const ttHint = document.getElementById('titleHint');
    const descQ = document.getElementById('descQualBar');
    const descL = document.getElementById('descQualLabel');
    const descCount = document.getElementById('descCounter');
    const chips = document.getElementById('descChips');
    const step1Prog = document.getElementById('step1Progress');
    if (aiB) aiB.style.display = 'none';
    if (slaB) slaB.style.display = 'none';
    if (catH) catH.style.display = 'none';
    if (catL) catL.textContent = '';
    if (ttIcon) ttIcon.textContent = '';
    if (ttClear) ttClear.style.display = 'none';
    if (ttHint) ttHint.textContent = '💡 Be specific — include the street name or landmark';
    if (descQ) { descQ.style.width = '0%'; }
    if (descL) descL.textContent = '';
    if (descCount) descCount.textContent = '0 / 500';
    if (chips) chips.innerHTML = '';
    if (step1Prog) { step1Prog.textContent = 'Fill all fields to continue'; step1Prog.style.color = 'var(--text-muted)'; }

    // Reset camera
    const cIdle = document.getElementById('cameraIdle');
    const cPrev = document.getElementById('capturedPreview');
    const locDisp = document.getElementById('locationDisplay');
    const locIdle = document.getElementById('locationIdle');
    const locLoading = document.getElementById('locationLoading');
    const photoIcon = document.getElementById('check-photo-icon');
    const photoText = document.getElementById('check-photo-text');
    const locIcon = document.getElementById('check-location-icon');
    const locText = document.getElementById('check-location-text');
    const declarCheck = document.getElementById('declarationCheck');
    if (cIdle) cIdle.style.display = 'block';
    if (cPrev) cPrev.style.display = 'none';
    if (locDisp) { locDisp.style.display = 'none'; }
    if (locIdle) { locIdle.style.display = 'flex'; }
    if (locLoading) locLoading.style.display = 'none';
    if (photoIcon) photoIcon.textContent = '⬜';
    if (photoText) { photoText.textContent = 'Live photo captured'; photoText.style.color = 'var(--text-muted)'; }
    if (locIcon) locIcon.textContent = '⬜';
    if (locText) { locText.textContent = 'GPS location detected'; locText.style.color = 'var(--text-muted)'; }
    if (declarCheck) declarCheck.checked = false;
    const locationBtn = document.getElementById('locationBtn');
    if (locationBtn) { locationBtn.disabled = false; locationBtn.textContent = '📡 Detect Location'; }

    // Go back to step 1
    goToStep(1);
    setTimeout(() => navigateTo('complaints'), 1500);
  }, 2200);
}

/* ══════════════════════════════════════════════════════
   PROFILE
══════════════════════════════════════════════════════ */
function saveProfile() {
  const name = document.getElementById('profileNameInput')?.value;
  const constituency = document.getElementById('profileConstitSelect')?.value;
  if (name) {
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileAvatar').textContent = name[0].toUpperCase();
    document.getElementById('sidebarName').textContent = name;
    document.getElementById('sidebarAvatar').textContent = name[0].toUpperCase();
    const profileAvatarEl = document.getElementById('profileAvatar');
    if (profileAvatarEl) profileAvatarEl.textContent = name[0].toUpperCase();
  }
  if (constituency) {
    const label = document.querySelector(`#profileConstitSelect option[value="${constituency}"]`)?.textContent;
    if (label) document.getElementById('sidebarConst').textContent = `📍 ${label}`;
  }
  showToast('Profile updated successfully!', 'success');
}

/* ══════════════════════════════════════════════════════
   SEARCH
══════════════════════════════════════════════════════ */
function searchComplaints(q) {
  if (!q) return;
  const results = COMPLAINTS_DATA.filter(c =>
    c.title.toLowerCase().includes(q.toLowerCase()) ||
    c.id.toLowerCase().includes(q.toLowerCase()) ||
    c.category.toLowerCase().includes(q.toLowerCase())
  );
  if (results.length) {
    navigateTo('complaints');
    const container = document.getElementById('allComplaintsList');
    if (container) container.innerHTML = results.map((c, i) => renderComplaintCard(c, i * 60)).join('');
  }
}

/* ══════════════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target) || 0;
    let current = 0;
    const increment = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

/* ══════════════════════════════════════════════════════
   AUTH — Logout
══════════════════════════════════════════════════════ */
function handleLogout() {
  sessionStorage.removeItem('citizen');
  showToast('Signed out successfully', 'info');
  setTimeout(() => { window.location.href = 'index.html'; }, 700);
}

/* ══════════════════════════════════════════════════════
   DOWNLOAD REPORT
══════════════════════════════════════════════════════ */
function downloadHistory() {
  const header = 'ID,Title,Category,Status,Priority,Submitted,Resolved,Department\n';
  const rows = COMPLAINTS_DATA.map(c =>
    `${c.id},"${c.title}",${c.category},${c.status},${c.priority},${c.submittedDate},${c.resolvedDate || '-'},"${c.department}"`
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Erode_Complaint_History.csv';
  a.click();
  showToast('📥 Report downloaded!', 'success');
}

/* ══════════════════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.className = `toast show ${type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ══════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Login Page
  initParticles();

  // Dashboard Page
  const isDashboard = document.body.classList.contains('dashboard-body');
  if (isDashboard) {
    // Load user from session
    const user = JSON.parse(sessionStorage.getItem('citizen') || '{"name":"Ramesh Kumar","constituency":"Erode East"}');
    const nameEl = document.getElementById('sidebarName');
    const avatarEl = document.getElementById('sidebarAvatar');
    const constEl = document.getElementById('sidebarConst');
    if (nameEl) nameEl.textContent = user.name;
    if (avatarEl) avatarEl.textContent = user.name[0].toUpperCase();
    if (constEl) constEl.textContent = `📍 ${user.constituency || 'Erode East'}`;

    // Profile page sync
    const profileNameEl = document.getElementById('profileName');
    const profileAvatarEl = document.getElementById('profileAvatar');
    const profileNameInputEl = document.getElementById('profileNameInput');
    if (profileNameEl) profileNameEl.textContent = user.name;
    if (profileAvatarEl) profileAvatarEl.textContent = user.name[0].toUpperCase();
    if (profileNameInputEl) profileNameInputEl.value = user.name;

    // Init overview
    renderRecentComplaints();
    renderCategoryBreakdown();
    renderTimeline();
    animateCounters();

    // Update subtitle
    const subEl = document.getElementById('pageSubtitle');
    if (subEl) subEl.textContent = `Welcome back, ${user.name.split(' ')[0]}! Here's your complaint summary.`;

    // Modal close on overlay click
    document.getElementById('complaintModal')?.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });

    // Keyboard shortcut
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }
});

// Handle textarea focus styling
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('textarea').forEach(ta => {
    ta.addEventListener('focus', () => {
      ta.style.outline = 'none';
      ta.style.borderColor = 'var(--primary)';
      ta.style.boxShadow = '0 0 0 3px var(--primary-glow)';
      ta.style.background = 'var(--bg-card2)';
    });
    ta.addEventListener('blur', () => {
      ta.style.borderColor = 'var(--border)';
      ta.style.boxShadow = 'none';
      ta.style.background = 'var(--bg-base)';
    });
  });
});
