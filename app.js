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
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <div style="font-size:12px;color:var(--text-muted)">EXACT LOCATION & GPS</div>
        <a href="https://www.google.com/maps/dir/?api=1&destination=11.3410,77.7172" target="_blank" class="btn-nav-gmaps" style="font-size:11px;padding:3px 8px">
          🚗 Travel Navigation (Google Maps)
        </a>
      </div>
      <div style="font-size:13px;font-weight:600">📍 ${c.location}</div>
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

  // Initialize interactive Leaflet draggable map pin
  initStep2Map(loc.latitude, loc.longitude);

  // Update checklist
  const locIcon = document.getElementById('check-location-icon');
  const locText = document.getElementById('check-location-text');
  if (locIcon) { locIcon.textContent = '✅'; }
  if (locText) { locText.textContent = 'GPS location detected'; locText.style.color = 'var(--success)'; }

  checkStep2Complete();
  showToast('📍 Precise Location captured on map!', 'success');
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
      ta.style.borderColor = 'var(--border-focus)';
      ta.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
    });
    ta.addEventListener('blur', () => {
      ta.style.borderColor = 'var(--border)';
      ta.style.boxShadow = 'none';
    });
  });
});

/* ══════════════════════════════════════════════════════
   ESCALATION LOGIC
   Auto-flag complaints where SLA has passed
══════════════════════════════════════════════════════ */
function runEscalationCheck() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let escalated = 0;

  COMPLAINTS_DATA.forEach(c => {
    if (c.status === 'resolved') return;
    if (!c.slaDeadline) return;
    const deadline = new Date(c.slaDeadline);
    if (deadline < today && !c.escalated) {
      c.escalated = true;
      escalated++;
    }
  });

  if (escalated > 0) {
    showToast(`⚠️ ${escalated} complaint${escalated > 1 ? 's' : ''} auto-escalated — SLA deadline missed`, 'warning');
  }

  // Update escalated count in sidebar badge if present
  const badge = document.querySelector('[data-nav="escalated"] .nav-badge');
  const count = COMPLAINTS_DATA.filter(c => c.escalated).length;
  if (badge) badge.textContent = count;
}

/* ══════════════════════════════════════════════════════
   LEAFLET MAP
   Real OpenStreetMap integration for the Map page
══════════════════════════════════════════════════════ */
let leafletMap = null;
let mapMarkers = [];
let currentMapFilter = 'all';

// Erode District bounding coordinates (real)
const ERODE_CENTER = [11.3410, 77.7172];
const MAP_ZOOM = 13;

// Color coding by status
const STATUS_COLORS = {
  submitted: '#2563eb',
  review:    '#d97706',
  progress:  '#0284c7',
  resolved:  '#16a34a',
  escalated: '#dc2626',
};

// Erode area coordinates for mock complaint pins
const ERODE_COORDS = [
  [11.3415, 77.7180], [11.3395, 77.7165], [11.3430, 77.7145],
  [11.3380, 77.7195], [11.3445, 77.7210], [11.3360, 77.7150],
  [11.3420, 77.7130], [11.3400, 77.7220], [11.3460, 77.7175],
  [11.3370, 77.7140],
];

function initLeafletMap() {
  const container = document.getElementById('leafletMap');
  if (!container || leafletMap) return;

  // Check Leaflet is loaded
  if (typeof L === 'undefined') {
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:8px;color:var(--text-muted)"><span style="font-size:36px">🗺️</span><span>Map requires internet connection</span></div>';
    return;
  }

  leafletMap = L.map('leafletMap', {
    center: ERODE_CENTER,
    zoom: MAP_ZOOM,
    zoomControl: true,
  });

  // OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(leafletMap);

  // Plot complaint pins
  plotMapPins('all');

  // Render nearby list
  renderNearbyComplaints();
}

function plotMapPins(filter) {
  // Clear old markers
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];

  const data = COMPLAINTS_DATA.map((c, i) => ({
    ...c,
    lat: ERODE_COORDS[i % ERODE_COORDS.length][0] + (Math.random() * 0.004 - 0.002),
    lng: ERODE_COORDS[i % ERODE_COORDS.length][1] + (Math.random() * 0.004 - 0.002),
  }));

  data.forEach(c => {
    // Apply filter
    if (filter !== 'all') {
      if (filter === 'critical' && c.priority !== 'critical') return;
      else if (filter !== 'critical' && c.category !== filter) return;
    }

    const color = c.escalated ? STATUS_COLORS.escalated : (STATUS_COLORS[c.status] || STATUS_COLORS.submitted);

    // Custom circle marker
    const marker = L.circleMarker([c.lat, c.lng], {
      radius: c.priority === 'critical' ? 10 : 7,
      fillColor: color,
      color: '#fff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    });

    // Popup
    const statusLabels = { submitted:'Submitted', review:'Under Review', progress:'In Progress', resolved:'Resolved' };
    marker.bindPopup(`
      <div style="font-family:Inter,sans-serif;min-width:200px">
        <div style="font-weight:700;font-size:13px;margin-bottom:5px">${c.icon || ''} ${c.title}</div>
        <div style="font-size:11px;color:#64748b;margin-bottom:3px">${c.id} · ${c.constituency}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
          <span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:${color}20;color:${color};border:1px solid ${color}40">
            ${c.priority.toUpperCase()}
          </span>
          <span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:600;background:#f1f5f9;color:#475569">
            ${statusLabels[c.status] || c.status}
          </span>
          ${c.escalated ? '<span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:#fef2f2;color:#dc2626">🚨 ESCALATED</span>' : ''}
        </div>
        <div style="font-size:11px;color:#94a3b8;margin-top:6px">📅 ${c.submittedDate}</div>
      </div>
    `, { maxWidth: 240 });

    marker.addTo(leafletMap);
    mapMarkers.push(marker);
  });
}

function filterMapBy(filter, btn) {
  document.querySelectorAll('#page-map .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentMapFilter = filter;

  if (leafletMap) {
    plotMapPins(filter);
  }
}

function renderNearbyComplaints() {
  const container = document.getElementById('nearbyComplaintsList');
  const countEl   = document.getElementById('nearbyCount');
  if (!container) return;

  const nearby = COMPLAINTS_DATA.filter(c => c.constituency === 'Erode East').slice(0, 5);
  if (countEl) countEl.textContent = `${nearby.length} in your constituency`;

  container.innerHTML = nearby.map(c => {
    const [statusClass, statusLabel] = {
      submitted: ['status-submitted', 'Submitted'],
      review:    ['status-review', 'Under Review'],
      progress:  ['status-progress', 'In Progress'],
      resolved:  ['status-resolved', 'Resolved'],
    }[c.status] || ['status-submitted', 'Submitted'];

    return `
      <div class="complaint-card" onclick="openComplaintDetail('${c.id}')">
        <div class="complaint-cat-icon">${c.icon}</div>
        <div class="complaint-info">
          <div class="complaint-title">${c.title}</div>
          <div class="complaint-meta">
            <span>${c.id}</span>
            <span>${c.constituency}</span>
            <span>${c.submittedDate}</span>
          </div>
        </div>
        <div class="complaint-right">
          <span class="status-badge ${statusClass}">${statusLabel}</span>
          <span class="priority-badge priority-${c.priority}">${c.priority.toUpperCase()}</span>
        </div>
      </div>
    `;
  }).join('');
}

/* ══════════════════════════════════════════════════════
   PATCH: navigateTo — trigger map init on page switch
══════════════════════════════════════════════════════ */
const _origNavigateTo = window.navigateTo;
window.navigateTo = function(page) {
  if (typeof _origNavigateTo === 'function') _origNavigateTo(page);
  if (page === 'map') {
    // Small delay to let page become visible before map init
    setTimeout(initLeafletMap, 100);
  }
};

/* Run escalation check on dashboard load */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('dashboard-body')) {
    runEscalationCheck();
  }
  // Initialize saved language
  const savedLang = localStorage.getItem('erode_portal_lang') || 'en';
  setPortalLang(savedLang, false);
});

/* ══════════════════════════════════════════════════════
   STEP 2: PRECISE LEAFLET DRAGGABLE PIN & GPS PICKER
══════════════════════════════════════════════════════ */
let step2Map = null;
let step2Marker = null;

function initStep2Map(lat, lng) {
  const container = document.getElementById('step2LeafletMap');
  if (!container || typeof L === 'undefined') return;

  const gmapsBtn = document.getElementById('step2GmapsPreview');
  if (gmapsBtn) gmapsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  if (!step2Map) {
    step2Map = L.map('step2LeafletMap').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(step2Map);

    step2Marker = L.marker([lat, lng], { draggable: true }).addTo(step2Map);

    step2Marker.on('dragend', function (e) {
      const pos = e.target.getLatLng();
      updateCapturedCoords(pos.lat, pos.lng);
    });

    step2Map.on('click', function (e) {
      step2Marker.setLatLng(e.latlng);
      updateCapturedCoords(e.latlng.lat, e.latlng.lng);
    });
  } else {
    step2Map.setView([lat, lng], 16);
    step2Marker.setLatLng([lat, lng]);
    step2Map.invalidateSize();
  }
}

function updateCapturedCoords(lat, lng) {
  if (!capturedLocation) capturedLocation = {};
  capturedLocation.latitude = lat;
  capturedLocation.longitude = lng;

  const coordsEl = document.getElementById('locationCoords');
  if (coordsEl) coordsEl.textContent = `${lat.toFixed(6)}° N, ${lng.toFixed(6)}° E (GPS Adjusted)`;

  const gmapsBtn = document.getElementById('step2GmapsPreview');
  if (gmapsBtn) gmapsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  showToast('📍 Precise Map Pin updated for field repair travel!', 'info');
}

/* ══════════════════════════════════════════════════════
   VOICE INPUT & AUDIO VOICE NOTE ATTACHMENT
══════════════════════════════════════════════════════ */
let speechRecognition = null;
let isRecognizing = false;
let mediaRecorder = null;
let audioChunks = [];
let capturedAudioBlob = null;
let isRecordingAudio = false;

function toggleSpeechRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const statusEl = document.getElementById('voiceStatus');
  const micIcon = document.getElementById('voiceMicIcon');
  const currentLang = localStorage.getItem('erode_portal_lang') || 'en';

  if (!SpeechRec) {
    showToast('Speech recognition not supported in this browser. Please use Chrome/Edge.', 'error');
    return;
  }

  if (isRecognizing) {
    if (speechRecognition) speechRecognition.stop();
    isRecognizing = false;
    if (micIcon) micIcon.textContent = '🎙️';
    if (statusEl) statusEl.textContent = '';
    return;
  }

  speechRecognition = new SpeechRec();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = currentLang === 'ta' ? 'ta-IN' : 'en-IN';

  speechRecognition.onstart = function() {
    isRecognizing = true;
    if (micIcon) micIcon.textContent = '🟢';
    if (statusEl) statusEl.textContent = currentLang === 'ta' ? '🎙️ தமிழில் பேசுங்கள்...' : '🎙️ Listening... speak clearly';
    showToast(currentLang === 'ta' ? '🎙️ தமிழில் பேசுங்கள் — உரை தானாக உள்ளிடப்படும்' : '🎙️ Voice-to-Text active — speak now', 'info');
  };

  speechRecognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    const descArea = document.getElementById('cDesc');
    if (descArea && transcript) {
      descArea.value = (descArea.value ? descArea.value + ' ' : '') + transcript;
      onDescInput(descArea);
    }
  };

  speechRecognition.onerror = function(e) {
    isRecognizing = false;
    if (micIcon) micIcon.textContent = '🎙️';
    if (statusEl) statusEl.textContent = '';
    showToast('Voice error: ' + (e.error || 'Check mic permission'), 'error');
  };

  speechRecognition.onend = function() {
    isRecognizing = false;
    if (micIcon) micIcon.textContent = '🎙️';
    if (statusEl) statusEl.textContent = '';
  };

  speechRecognition.start();
}

async function toggleAudioVoiceNote() {
  const recIcon = document.getElementById('noteRecIcon');
  const noteText = document.getElementById('voiceNoteText');
  const statusEl = document.getElementById('voiceStatus');
  const currentLang = localStorage.getItem('erode_portal_lang') || 'en';

  if (isRecordingAudio) {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    isRecordingAudio = false;
    if (recIcon) recIcon.textContent = '🔴';
    if (noteText) noteText.textContent = currentLang === 'ta' ? 'குரல் பதிவு செய்' : 'Record Voice Note';
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      capturedAudioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(capturedAudioBlob);
      const player = document.getElementById('voiceNoteAudio');
      const container = document.getElementById('voiceNotePlayerContainer');
      if (player && container) {
        player.src = audioUrl;
        container.style.display = 'flex';
      }
      stream.getTracks().forEach(t => t.stop());
      showToast('🎵 Voice Note attached to complaint!', 'success');
    };

    mediaRecorder.start();
    isRecordingAudio = true;
    if (recIcon) recIcon.textContent = '⏹️';
    if (noteText) noteText.textContent = currentLang === 'ta' ? 'நிறுத்து (Stop)' : 'Stop Recording';
    if (statusEl) statusEl.textContent = currentLang === 'ta' ? '🔴 பதிவு செய்யப்படுகிறது...' : '🔴 Recording audio note...';
    showToast(currentLang === 'ta' ? '🔴 குரல் பதிவு செய்யப்படுகிறது... முடிந்ததும் Stop கிளிக் செய்யவும்' : '🔴 Recording voice note... click Stop when finished', 'warning');
  } catch (err) {
    showToast('Microphone access denied. Please allow microphone permissions.', 'error');
  }
}

function deleteVoiceNote() {
  capturedAudioBlob = null;
  const container = document.getElementById('voiceNotePlayerContainer');
  const player = document.getElementById('voiceNoteAudio');
  if (container) container.style.display = 'none';
  if (player) player.src = '';
  showToast('🗑️ Voice note removed', 'info');
}

/* ══════════════════════════════════════════════════════
   FULL-SCREEN COMPREHENSIVE BILINGUAL ENGINE (TAMIL & ENGLISH)
══════════════════════════════════════════════════════ */
const FULL_I18N = {
  en: {
    govText: 'Government of Tamil Nadu',
    districtText: 'Erode District Administration',
    heroBadge: 'AI-Powered Civic Platform',
    heroTitle1: 'Your Voice,',
    heroTitle2: 'Our Action.',
    heroDesc: 'Report civic issues — potholes, water leaks, garbage, electricity — and track resolution in real-time with GPS verification and automated SLA escalation.',
    feat1Title: 'Live GPS & Camera',
    feat1Desc: 'Verified incident reporting',
    feat2Title: 'AI Priority Engine',
    feat2Desc: 'Smart routing & SLA',
    feat3Title: 'Field Navigation',
    feat3Desc: 'Direct maps for repair staff',
    feat4Title: 'Auto Escalation',
    feat4Desc: 'Deadline-based alerts',
    statResolved: 'Resolved',
    statRate: 'Resolution Rate',
    statResponse: 'Avg. Response',
    tabCitizen: '👤 Citizen Login',
    tabRegister: '📝 Register',
    tabAdmin: '🏛️ Official Login',
    cLoginHeader: 'Citizen Sign In',
    cLoginSub: 'Enter your registered mobile or email to track complaints',
    cLoginUserLabel: 'Mobile Number / Email',
    cLoginPassLabel: 'Password',
    btnCitizenLogin: 'Sign In as Citizen →',
    newRegHint: 'New user? Register your constituency',
    regHeader: 'Citizen Registration',
    regSub: 'Create your verified citizen account for Erode district',
    regNameLabel: 'Full Name',
    regPhoneLabel: 'Mobile Number',
    regConstLabel: 'Erode Constituency',
    regPassLabel: 'Create Password',
    btnRegister: 'Register & Open Dashboard →',
    adminHeader: 'Department Officer Sign In',
    adminSub: 'Authorized access for field engineers & resolution staff',
    adminDeptLabel: 'Select Department',
    adminUserLabel: 'Officer Username',
    adminPassLabel: 'Password',
    btnAdminLogin: 'Login to Department Dashboard →',
    navOverview: 'Overview',
    navComplaints: 'My Complaints',
    navNewComplaint: 'New Complaint',
    navMap: 'Public Map',
    navHistory: 'History',
    navAnalytics: 'Analytics',
    navProfile: 'Profile',
    navSignOut: 'Sign Out',
    pageOverviewTitle: 'Overview',
    pageOverviewSub: "Welcome back! Here's your complaint summary.",
    statTotal: 'Total Complaints',
    statTotalSub: 'Lifetime submissions',
    statPending: 'Pending Action',
    statPendingSub: 'Awaiting resolution',
    statResolvedDash: 'Resolved',
    statResolvedSub: 'Successfully closed',
    statEscalated: 'Escalated',
    statEscalatedSub: 'Past SLA deadline',
    recentComplaintsTitle: 'Recent Complaints',
    btnNewComplaintDash: '➕ New Complaint',
    constOverviewTitle: 'Constituency Overview',
    slaTrackerTitle: 'SLA Resolution Tracker',
    step1Label: 'Details',
    step2Label: 'Photo & GPS',
    step3Label: 'Review',
    cTitleLabel: 'Complaint Title *',
    cCategoryLabel: 'Category *',
    catRoad: 'Road',
    catGarbage: 'Garbage',
    catWater: 'Water',
    catElectricity: 'Electricity',
    catDrainage: 'Drainage',
    catOther: 'Other',
    cDescLabel: 'Problem Description *',
    voiceInputBtn: 'Speak (Voice-to-Text)',
    voiceNoteBtn: 'Record Voice Note',
    sevLabel: 'How severe is this issue?',
    sevLow: '😐 Minor',
    sevMed: '⚠️ Moderate',
    sevHigh: '🔴 Serious',
    sevCrit: '🚨 Emergency',
    btnNextPhoto: 'Next: Photo & Location →',
    cameraBoxTitle: '📷 Live Incident Camera',
    cameraBoxSub: 'Gallery upload disabled',
    btnStartCamera: 'Start Live Camera',
    btnCapturePhoto: '📸 Capture Verified Photo',
    gpsBoxTitle: '📍 GPS Location',
    btnDetectGps: '📡 Detect Location',
    dragPinText: '💡 Drag marker to adjust exact repair spot.',
    btnNextReview: 'Next: Review →',
    declarationText: 'I declare that this complaint represents an authentic issue and the captured photo & GPS location are accurate.',
    btnSubmitComplaint: '🚀 Submit Complaint',
    mapTitle: 'Public Complaints Map — Erode District',
    historyTitle: 'Complaint History',
    btnExportCsv: '⬇ Export CSV',
    analyticsTitle: 'Analytics & SLA Breakdown',
    adminMenuOverview: 'Overview',
    adminMenuComplaints: 'Department Complaints',
    adminMenuEscalated: 'Escalated (Overdue)',
    adminMenuResolved: 'Resolved Tasks',
    adminMenuReports: 'Analytics & SLA',
    adminLogoutBtn: '🚪 Logout to Login Screen',
    adminAssignedTasksTitle: 'Department Assigned Tasks',
    thId: 'ID',
    thComplaint: 'Complaint',
    thLocation: 'Location / Landmark',
    thNavigation: 'Field Navigation',
    thPriority: 'Priority',
    thStatus: 'Status',
    thSla: 'SLA Deadline',
    thAction: 'Update Status',
  },
  ta: {
    govText: 'தமிழ்நாடு அரசு',
    districtText: 'ஈரோடு மாவட்ட நிர்வாகம்',
    heroBadge: 'செயற்கை நுண்ணறிவு குடிமக்கள் புகார் தளம்',
    heroTitle1: 'உங்கள் குரல்,',
    heroTitle2: 'எங்கள் செயல்.',
    heroDesc: 'சாலை பள்ளங்கள், குடிநீர் கசிவு, குப்பை தேக்கம், மின்சார பிரச்சனைகளை நேரடியாகப் புகாரளித்து, நேரடி ஜிபிஎஸ் மற்றும் காலக்கெடுவுடன் தீர்வு காணுங்கள்.',
    feat1Title: 'நேரடி ஜிபிஎஸ் & கேமரா',
    feat1Desc: 'சரிபார்க்கப்பட்ட சம்பவப் பதிவு',
    feat2Title: 'செயற்கை நுண்ணறிவு முன்னுரிமை',
    feat2Desc: 'தானியங்கி துறை ஒதுக்கீடு',
    feat3Title: 'களப் பணியாளர் வரைபடம்',
    feat3Desc: 'பழுதுபார்க்கும் பணியாளர்களுக்கான வழி',
    feat4Title: 'தானியங்கி மேல்முறையீடு',
    feat4Desc: 'காலக்கெடு தவறிய எச்சரிக்கை',
    statResolved: 'தீர்க்கப்பட்டவை',
    statRate: 'தீர்வு விகிதம்',
    statResponse: 'சராசரி பதிலளிப்பு',
    tabCitizen: '👤 குடிமக்கள் உள்நுழைவு',
    tabRegister: '📝 புதிய பதிவு',
    tabAdmin: '🏛️ அதிகாரி உள்நுழைவு',
    cLoginHeader: 'குடிமக்கள் உள்நுழைவு',
    cLoginSub: 'புகார்களை கண்காணிக்க பதிவுசெய்த மொபைல் அல்லது மின்னஞ்சலை உள்ளிடவும்',
    cLoginUserLabel: 'மொபைல் எண் / மின்னஞ்சல்',
    cLoginPassLabel: 'கடவுச்சொல்',
    btnCitizenLogin: 'குடிமகனாக உள்நுழைக →',
    newRegHint: 'புதிய பயனரா? உங்கள் தொகுதியை பதிவு செய்யுங்கள்',
    regHeader: 'குடிமக்கள் பதிவு',
    regSub: 'ஈரோடு மாவட்டத்திற்கான சரிபார்க்கப்பட்ட குடிமக்கள் கணக்கை உருவாக்கவும்',
    regNameLabel: 'முழுப் பெயர்',
    regPhoneLabel: 'மொபைல் எண்',
    regConstLabel: 'ஈரோடு சட்டமன்றத் தொகுதி',
    regPassLabel: 'புதிய கடவுச்சொல்',
    btnRegister: 'பதிவு செய்து தொடரவும் →',
    adminHeader: 'துறை அதிகாரி உள்நுழைவு',
    adminSub: 'களப் பொறியாளர்கள் மற்றும் தீர்வுப் பணியாளர்களுக்கான அனுமதி',
    adminDeptLabel: 'துறையைத் தேர்ந்தெடுக்கவும்',
    adminUserLabel: 'அதிகாரி பயனர் பெயர்',
    adminPassLabel: 'கடவுச்சொல்',
    btnAdminLogin: 'துறை கட்டுப்பாட்டு அறைக்குச் செல்லவும் →',
    navOverview: 'கண்ணோட்டம்',
    navComplaints: 'என் புகார்கள்',
    navNewComplaint: 'புதிய புகார்',
    navMap: 'பொது வரைபடம்',
    navHistory: 'புகார் வரலாறு',
    navAnalytics: 'பகுப்பாய்வு',
    navProfile: 'சுயவிவரம்',
    navSignOut: 'வெளியேறு',
    pageOverviewTitle: 'கண்ணோட்டம்',
    pageOverviewSub: 'வணக்கம்! உங்கள் புகார்களின் விவரம் இங்கே.',
    statTotal: 'மொத்த புகார்கள்',
    statTotalSub: 'இதுவரை சமர்ப்பித்தவை',
    statPending: 'நிலுவையில் உள்ளவை',
    statPendingSub: 'தீர்வுக்காக காத்திருப்பவை',
    statResolvedDash: 'தீர்க்கப்பட்டவை',
    statResolvedSub: 'வெற்றிகரமாக முடிக்கப்பட்டவை',
    statEscalated: 'காலக்கெடு மீறியவை',
    statEscalatedSub: 'அவசர நடவடிக்கை தேவை',
    recentComplaintsTitle: 'சமீபத்திய புகார்கள்',
    btnNewComplaintDash: '➕ புதிய புகார்',
    constOverviewTitle: 'தொகுதி விவரக் கண்ணோட்டம்',
    slaTrackerTitle: 'காலக்கெடு கண்காணிப்பு',
    step1Label: 'விவரங்கள்',
    step2Label: 'புகைப்படம் & GPS',
    step3Label: 'சரிபார்த்தல்',
    cTitleLabel: 'புகார் தலைப்பு *',
    cCategoryLabel: 'துறை வகை *',
    catRoad: 'சாலை',
    catGarbage: 'குப்பை',
    catWater: 'குடிநீர்',
    catElectricity: 'மின்சாரம்',
    catDrainage: 'சாக்கடை',
    catOther: 'பிற',
    cDescLabel: 'புகாரின் விவரம் *',
    voiceInputBtn: 'பேசி உள்ளிடு (Voice-to-Text)',
    voiceNoteBtn: 'குரல் பதிவு செய்',
    sevLabel: 'இந்த பிரச்சனையின் தீவிரம் என்ன?',
    sevLow: '😐 குறைவு',
    sevMed: '⚠️ நடுத்தரம்',
    sevHigh: '🔴 தீவிரமானது',
    sevCrit: '🚨 அவசரம்',
    btnNextPhoto: 'அடுத்தது: புகைப்படம் & இருப்பிடம் →',
    cameraBoxTitle: '📷 நேரடி சம்பவ கேமரா',
    cameraBoxSub: 'பழைய படங்கள் பதிவேற்ற முடியாது',
    btnStartCamera: 'நேரடி கேமராவைத் தொடங்கு',
    btnCapturePhoto: '📸 சரிபார்க்கப்பட்ட புகைப்படம் எடு',
    gpsBoxTitle: '📍 ஜிபிஎஸ் இருப்பிடம்',
    btnDetectGps: '📡 ஜிபிஎஸ் கண்டறி',
    dragPinText: '💡 பழுதுபார்க்க வேண்டிய இடத்தை வரைபடத்தில் துல்லியமாக நகர்த்தவும்.',
    btnNextReview: 'அடுத்தது: சரிபார்த்தல் →',
    declarationText: 'இந்த புகார் உண்மையானது என்றும், புகைப்படம் மற்றும் ஜிபிஎஸ் துல்லியமானது என்றும் உறுதி கூறுகிறேன்.',
    btnSubmitComplaint: '🚀 புகாரை சமர்ப்பிக்கவும்',
    mapTitle: 'பொது வரைபடம் — ஈரோடு மாவட்டம்',
    historyTitle: 'புகார் வரலாறு',
    btnExportCsv: '⬇ பதிவிறக்குக (CSV)',
    analyticsTitle: 'பகுப்பாய்வு & காலக்கெடு விவரம்',
    adminMenuOverview: 'கண்ணோட்டம்',
    adminMenuComplaints: 'துறை புகார்கள்',
    adminMenuEscalated: 'காலாவதியான புகார்கள்',
    adminMenuResolved: 'முடிக்கப்பட்ட பணிகள்',
    adminMenuReports: 'பகுப்பாய்வு & SLA',
    adminLogoutBtn: '🚪 உள்நுழைவு பக்கத்திற்குச் செல்க',
    adminAssignedTasksTitle: 'துறைக்கு ஒதுக்கப்பட்ட பணிகள்',
    thId: 'எண்',
    thComplaint: 'புகார்',
    thLocation: 'இடம் / அடையாளம்',
    thNavigation: 'பயண வழிகாட்டி',
    thPriority: 'முன்னுரிமை',
    thStatus: 'நிலை',
    thSla: 'காலக்கெடு',
    thAction: 'நிலையை மாற்று',
  }
};

function setPortalLang(lang, showNotification = true) {
  localStorage.setItem('erode_portal_lang', lang);

  // Update button active state across all headers
  ['masterLangEN', 'dashLangEN', 'indexLangEN', 'adminLangEN'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', lang === 'en');
  });
  ['masterLangTA', 'dashLangTA', 'indexLangTA', 'adminLangTA'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', lang === 'ta');
  });

  const t = FULL_I18N[lang] || FULL_I18N.en;

  // 1. Header Emblem
  const govText = document.querySelector('.gov-text');
  if (govText) govText.textContent = t.govText;
  const distText = document.querySelector('.district-text');
  if (distText) distText.textContent = t.districtText;

  // 2. Hero Section
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) heroBadge.innerHTML = `<span class="badge-dot"></span> ${t.heroBadge}`;
  const tLine1 = document.querySelector('.title-line:not(.gradient-text)');
  if (tLine1) tLine1.textContent = t.heroTitle1;
  const tLine2 = document.querySelector('.title-line.gradient-text');
  if (tLine2) tLine2.textContent = t.heroTitle2;
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc) heroDesc.textContent = t.heroDesc;

  // Feature Cards
  const featCards = document.querySelectorAll('.feat-card');
  if (featCards.length >= 4) {
    featCards[0].querySelector('strong').textContent = t.feat1Title;
    featCards[0].querySelector('p').textContent = t.feat1Desc;
    featCards[1].querySelector('strong').textContent = t.feat2Title;
    featCards[1].querySelector('p').textContent = t.feat2Desc;
    featCards[2].querySelector('strong').textContent = t.feat3Title;
    featCards[2].querySelector('p').textContent = t.feat3Desc;
    featCards[3].querySelector('strong').textContent = t.feat4Title;
    featCards[3].querySelector('p').textContent = t.feat4Desc;
  }

  // Hero Stats
  const statLabels = document.querySelectorAll('.stats-row .stat-label');
  if (statLabels.length >= 3) {
    statLabels[0].textContent = t.statResolved;
    statLabels[1].textContent = t.statRate;
    statLabels[2].textContent = t.statResponse;
  }

  // 3. Auth Tabs & Forms
  const tabCitizen = document.getElementById('tabBtnCitizen');
  if (tabCitizen) tabCitizen.textContent = t.tabCitizen;
  const tabRegister = document.getElementById('tabBtnRegister');
  if (tabRegister) tabRegister.textContent = t.tabRegister;
  const tabAdmin = document.getElementById('tabBtnAdmin');
  if (tabAdmin) tabAdmin.textContent = t.tabAdmin;

  // Form 1
  const f1Header = document.querySelector('#formCitizenLogin .form-header h2');
  if (f1Header) f1Header.textContent = t.cLoginHeader;
  const f1Sub = document.querySelector('#formCitizenLogin .form-header p');
  if (f1Sub) f1Sub.textContent = t.cLoginSub;
  const btnCLogin = document.getElementById('btnCitizenLogin') || document.querySelector('#formCitizenLogin button[type="submit"]');
  if (btnCLogin) btnCLogin.textContent = t.btnCitizenLogin;

  // Form 2
  const f2Header = document.querySelector('#formCitizenRegister .form-header h2');
  if (f2Header) f2Header.textContent = t.regHeader;
  const f2Sub = document.querySelector('#formCitizenRegister .form-header p');
  if (f2Sub) f2Sub.textContent = t.regSub;
  const btnReg = document.querySelector('#formCitizenRegister button[type="submit"]');
  if (btnReg) btnReg.textContent = t.btnRegister;

  // Form 3
  const f3Header = document.querySelector('#formAdminLogin .form-header h2');
  if (f3Header) f3Header.textContent = t.adminHeader;
  const f3Sub = document.querySelector('#formAdminLogin .form-header p');
  if (f3Sub) f3Sub.textContent = t.adminSub;
  const btnAdminLog = document.querySelector('#formAdminLogin button[type="submit"]');
  if (btnAdminLog) btnAdminLog.textContent = t.btnAdminLogin;

  // 4. Citizen Navigation
  const mapNav = {
    'nav-overview': t.navOverview,
    'nav-complaints': t.navComplaints,
    'nav-new-complaint': t.navNewComplaint,
    'nav-map': t.navMap,
    'nav-history': t.navHistory,
    'nav-reports': t.navAnalytics,
    'nav-profile': t.navProfile,
  };
  Object.keys(mapNav).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = ' ' + mapNav[id] + ' ';
        }
      });
    }
  });

  // Topbar titles
  const pTitle = document.getElementById('pageTitle');
  if (pTitle && pTitle.textContent === 'Overview' || pTitle && pTitle.textContent === 'கண்ணோட்டம்') {
    pTitle.textContent = t.pageOverviewTitle;
  }

  // Dashboard Stats
  const statCardLabels = document.querySelectorAll('.stat-card-label');
  if (statCardLabels.length >= 4) {
    statCardLabels[0].textContent = t.statTotal;
    statCardLabels[1].textContent = t.statPending;
    statCardLabels[2].textContent = t.statResolvedDash;
    statCardLabels[3].textContent = t.statEscalated;
  }

  // New Complaint Form
  const stepLabels = document.querySelectorAll('.step-label');
  if (stepLabels.length >= 3) {
    stepLabels[0].textContent = t.step1Label;
    stepLabels[1].textContent = t.step2Label;
    stepLabels[2].textContent = t.step3Label;
  }

  const vText = document.getElementById('voiceInputText');
  if (vText) vText.textContent = t.voiceInputBtn;
  const vnText = document.getElementById('voiceNoteText');
  if (vnText) vnText.textContent = t.voiceNoteBtn;
  const locBtn = document.getElementById('locationBtn');
  if (locBtn) locBtn.textContent = t.btnDetectGps;

  // Categories
  const catNames = { Road: t.catRoad, Garbage: t.catGarbage, Water: t.catWater, Electricity: t.catElectricity, Drainage: t.catDrainage, Other: t.catOther };
  Object.keys(catNames).forEach(k => {
    const btn = document.getElementById(`cat-${k}`);
    if (btn) {
      const span = btn.querySelector('.cat-btn-name');
      if (span) span.textContent = catNames[k];
    }
  });

  // Severities
  const sevLow = document.getElementById('sev-low');
  if (sevLow) sevLow.textContent = t.sevLow;
  const sevMed = document.getElementById('sev-medium');
  if (sevMed) sevMed.textContent = t.sevMed;
  const sevHigh = document.getElementById('sev-high');
  if (sevHigh) sevHigh.textContent = t.sevHigh;
  const sevCrit = document.getElementById('sev-critical');
  if (sevCrit) sevCrit.textContent = t.sevCrit;

  // Admin Sidebar & Buttons
  const adminNavItems = document.querySelectorAll('#view-admin .admin-nav-item');
  if (adminNavItems.length >= 5) {
    adminNavItems[0].innerHTML = `📊 ${t.adminMenuOverview}`;
    adminNavItems[1].innerHTML = `📋 ${t.adminMenuComplaints}`;
    adminNavItems[2].innerHTML = `🚨 ${t.adminMenuEscalated}`;
    adminNavItems[3].innerHTML = `✅ ${t.adminMenuResolved}`;
    adminNavItems[4].innerHTML = `📈 ${t.adminMenuReports}`;
  }

  // Admin Tables Headers
  document.querySelectorAll('.complaints-table thead tr').forEach(row => {
    const ths = row.querySelectorAll('th');
    if (ths.length >= 7) {
      ths[0].textContent = t.thId;
      ths[1].textContent = t.thComplaint;
      ths[2].textContent = t.thLocation;
      ths[3].textContent = t.thNavigation;
      ths[4].textContent = t.thPriority;
      ths[5].textContent = t.thStatus;
      ths[6].textContent = t.thSla;
      if (ths[7]) ths[7].textContent = t.thAction;
    }
  });

  if (showNotification) {
    showToast(lang === 'ta' ? '✅ முழுப் பக்கமும் தமிழுக்கு மாற்றப்பட்டது!' : '✅ Complete portal switched to English!', 'success');
  }
}


/* ══════════════════════════════════════════════════════
   UNIFIED DEPARTMENT ADMIN FUNCTIONS
══════════════════════════════════════════════════════ */
let currentAdminDept = 'Roads & Highways';

const ADMIN_MOCK_DATA = [
  { id:'CMP-2024-001', title:'Large pothole on NH-47 near market', category:'Road', dept:'Roads & Highways', constituency:'Erode East', priority:'critical', status:'progress', submitted:'2024-08-01', sla:'2024-08-06', escalated:true, lat:11.3410, lng:77.7172, address:'NH-47, Market Junction, Erode East' },
  { id:'CMP-2024-002', title:'Street light not working for 2 weeks', category:'Electricity', dept:'Tamil Nadu Electricity Board', constituency:'Erode West', priority:'medium', status:'submitted', submitted:'2024-08-03', sla:'2024-08-13', escalated:false, lat:11.3395, lng:77.7165, address:'Gandhi Nagar 4th St, Erode West' },
  { id:'CMP-2024-003', title:'Water supply disruption in colony', category:'Water', dept:'Water Supply', constituency:'Bhavani', priority:'high', status:'progress', submitted:'2024-08-02', sla:'2024-08-07', escalated:false, lat:11.3430, lng:77.7145, address:'Kaveri Street, Bhavani' },
  { id:'CMP-2024-004', title:'Garbage not collected for a week', category:'Garbage', dept:'Sanitation', constituency:'Erode East', priority:'medium', status:'submitted', submitted:'2024-08-04', sla:'2024-08-14', escalated:false, lat:11.3380, lng:77.7195, address:'VOC Park Road, Erode East' },
  { id:'CMP-2024-005', title:'Blocked drainage causing waterlogging', category:'Drainage', dept:'Water Supply', constituency:'Gobichettipalayam', priority:'critical', status:'submitted', submitted:'2024-08-05', sla:'2024-08-07', escalated:true, lat:11.3445, lng:77.7210, address:'Bus Stand Road, Gobichettipalayam' },
  { id:'CMP-2024-006', title:'Damaged footpath near school', category:'Road', dept:'Roads & Highways', constituency:'Perundurai', priority:'medium', status:'resolved', submitted:'2024-07-25', sla:'2024-08-04', escalated:false, resolvedDate:'2024-08-03', lat:11.3360, lng:77.7150, address:'Govt Higher Sec School, Perundurai' },
  { id:'CMP-2024-007', title:'Electrical wire hanging dangerously low', category:'Electricity', dept:'Tamil Nadu Electricity Board', constituency:'Erode East', priority:'critical', status:'review', submitted:'2024-08-06', sla:'2024-08-08', escalated:true, lat:11.3420, lng:77.7130, address:'Mettur Road, Erode East' },
  { id:'CMP-2024-008', title:'Main pipeline burst & leaking drinking water', category:'Water', dept:'Water Supply', constituency:'Erode West', priority:'critical', status:'submitted', submitted:'2024-08-06', sla:'2024-08-08', escalated:false, lat:11.3400, lng:77.7220, address:'Brough Road, Erode West' },
  { id:'CMP-2024-009', title:'Open garbage dumping near residential area', category:'Garbage', dept:'Sanitation', constituency:'Bhavani', priority:'high', status:'progress', submitted:'2024-08-01', sla:'2024-08-06', escalated:true, lat:11.3460, lng:77.7175, address:'Kaveri River Bank Rd, Bhavani' },
  { id:'CMP-2024-010', title:'Road collapse after heavy rainfall', category:'Road', dept:'Roads & Highways', constituency:'Erode East', priority:'critical', status:'submitted', submitted:'2024-08-07', sla:'2024-08-09', escalated:false, lat:11.3370, lng:77.7140, address:'Perundurai Rd Junction, Erode' },
];

let unifiedAdminData = [...ADMIN_MOCK_DATA];

function changeDeptFilter(dept) {
  currentAdminDept = dept === 'ALL' ? 'Collectorate' : dept;
  const badge1 = document.getElementById('unifiedAdminDeptName');
  if (badge1) badge1.textContent = dept === 'ALL' ? 'All Departments (Collectorate)' : dept;
  const badge2 = document.getElementById('adminDeptLabel');
  if (badge2) badge2.textContent = dept === 'ALL' ? 'All Departments' : dept;
  const badge3 = document.getElementById('topbarDeptBadge');
  if (badge3) badge3.textContent = dept === 'ALL' ? 'All Departments (Collectorate)' : dept;
  renderAdminOverview();
  renderAdminTable();
  showToast(`🔄 Switched view to ${dept === 'ALL' ? 'All Departments' : dept}`, 'info');
}

function adminNav(page, btn) {
  document.querySelectorAll('#view-admin .admin-nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#view-admin .admin-page').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const target = document.getElementById(`admin-page-${page}`);
  if (target) target.classList.add('active');

  const titles = { overview:'Overview', complaints:'Department Complaints', escalated:'Escalated Complaints', resolved:'Resolved Tasks', reports:'Analytics & SLA' };
  const titleEl = document.getElementById('adminPageTitle');
  if (titleEl) titleEl.textContent = titles[page] || page;

  if (page === 'complaints') renderAdminTable();
  if (page === 'escalated')  renderEscalatedTable();
  if (page === 'resolved')   renderResolvedTable();
  if (page === 'reports')    renderReports();
  if (page === 'overview')   renderAdminOverview();
}

function getDeptComplaints() {
  if (currentAdminDept === 'Collectorate' || currentAdminDept === 'ALL') {
    return unifiedAdminData;
  }
  return unifiedAdminData.filter(c => c.dept.toLowerCase().includes(currentAdminDept.toLowerCase()) || (c.category.toLowerCase() === 'road' && currentAdminDept.includes('Roads')));
}

function isComplaintOverdue(c) {
  if (c.status === 'resolved') return false;
  return c.sla && new Date(c.sla) < new Date();
}

function daysDifference(d1, d2) {
  return Math.round((new Date(d1) - new Date(d2)) / 86400000);
}

function renderAdminOverview() {
  const deptList = getDeptComplaints();
  const escalated = deptList.filter(c => c.escalated || isComplaintOverdue(c));
  const resolved  = deptList.filter(c => c.status === 'resolved');
  const pending   = deptList.filter(c => c.status !== 'resolved');

  const statsRow = document.getElementById('adminStatsRow');
  if (statsRow) {
    const stats = [
      { label:'Assigned Complaints', value: deptList.length, color:'var(--blue)' },
      { label:'Pending Resolution', value: pending.length, color:'var(--warning)' },
      { label:'Escalated (Overdue)', value: escalated.length, color:'var(--danger)' },
      { label:'Resolved by Field Staff', value: resolved.length, color:'var(--success)' },
    ];
    statsRow.innerHTML = stats.map(s => `
      <div class="admin-stat-card">
        <div class="value" style="color:${s.color}">${s.value}</div>
        <div class="label">${s.label}</div>
      </div>
    `).join('');
  }

  // Escalation alert list
  const escItems = deptList.filter(c => c.escalated || isComplaintOverdue(c));
  const escList = document.getElementById('escalationList');
  const escPanel = document.getElementById('escalationPanel');

  if (escPanel && escList) {
    if (escItems.length === 0) {
      escPanel.style.display = 'none';
    } else {
      escPanel.style.display = 'block';
      escList.innerHTML = escItems.map(c => `
        <div class="esc-item">
          <div class="esc-item-left">
            <strong>${c.id} — ${c.title}</strong>
            <span>📍 ${c.address} (${c.constituency}) · SLA deadline missed</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-shrink:0">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" class="btn-nav-gmaps">
              🚗 Travel Direction
            </a>
            <button class="btn-resolve" onclick="quickResolve('${c.id}')">Mark Resolved</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Overview table
  const tableBody = document.getElementById('overviewTableBody');
  if (tableBody) {
    const recent = [...deptList].sort((a,b) => b.submitted.localeCompare(a.submitted)).slice(0, 6);
    tableBody.innerHTML = recent.map(c => `
      <tr>
        <td><code style="font-size:11px;color:var(--blue);font-weight:700">${c.id}</code></td>
        <td>
          <div style="font-weight:600;color:var(--text-primary);font-size:13px">${c.title}</div>
          ${c.escalated || isComplaintOverdue(c) ? '<span class="escalation-tag" style="margin-top:2px">🚨 ESCALATED</span>' : ''}
        </td>
        <td>
          <div style="font-size:12px;color:var(--text-secondary)">${c.address}</div>
          <div style="font-size:10px;color:var(--text-muted);font-family:monospace">${c.lat.toFixed(4)}°N, ${c.lng.toFixed(4)}°E</div>
        </td>
        <td>
          <div style="display:flex;gap:4px">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" class="btn-nav-gmaps" title="Open Google Maps Driving Directions">
              🚗 Navigate
            </a>
            <button class="btn-map-pin" onclick="openLocationModal('${c.id}', '${(c.title||'').replace(/'/g,"\\'")}', '${(c.address||'').replace(/'/g,"\\'")}', ${c.lat}, ${c.lng})">
              📍 Pin
            </button>
          </div>
        </td>
        <td><span class="priority-badge priority-${c.priority}">${c.priority.toUpperCase()}</span></td>
        <td><span class="status-badge status-${c.status}">${c.status.toUpperCase()}</span></td>
        <td style="font-size:12px;${isComplaintOverdue(c)?'color:var(--danger);font-weight:600':'color:var(--text-muted)'}">
          ${c.sla}${isComplaintOverdue(c)?' ⚠️':''}
        </td>
        <td>
          <div style="display:flex;gap:5px;align-items:center">
            <select class="status-select" id="sel-${c.id}">
              <option value="submitted" ${c.status==='submitted'?'selected':''}>Submitted</option>
              <option value="review"    ${c.status==='review'?'selected':''}>Under Review</option>
              <option value="progress"  ${c.status==='progress'?'selected':''}>In Progress</option>
              <option value="resolved"  ${c.status==='resolved'?'selected':''}>Resolved</option>
            </select>
            <button class="btn-update" onclick="updateAdminStatus('${c.id}')">Save</button>
          </div>
        </td>
      </tr>
    `).join('');
  }
}

function renderAdminTable() {
  const tbody = document.getElementById('adminComplaintsTable')?.querySelector('tbody') || document.getElementById('adminTableBody');
  if (!tbody) return;
  const base = getDeptComplaints();
  const q    = (document.getElementById('adminSearch')?.value || '').toLowerCase();
  const st   = document.getElementById('filterStatus')?.value || '';
  const pr   = document.getElementById('filterPriority')?.value || '';

  const filtered = base.filter(c => {
    if (q && !c.id.toLowerCase().includes(q) && !c.title.toLowerCase().includes(q) && !c.address.toLowerCase().includes(q)) return false;
    if (st && c.status !== st) return false;
    if (pr && c.priority !== pr) return false;
    return true;
  });

  const countEl = document.getElementById('adminTableCount');
  if (countEl) countEl.textContent = `${filtered.length} assigned records`;

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><code style="font-size:11px;color:var(--blue);font-weight:700">${c.id}</code></td>
      <td>
        <div style="font-weight:600;color:var(--text-primary);font-size:13px">${c.title}</div>
        ${c.escalated || isComplaintOverdue(c) ? '<span class="escalation-tag" style="margin-top:2px">🚨 ESCALATED</span>' : ''}
      </td>
      <td><span style="font-size:12px;font-weight:500">${c.dept}</span></td>
      <td>
        <div style="font-size:12px">${c.address}</div>
        <div style="font-size:10px;color:var(--text-muted);font-family:monospace">${c.lat.toFixed(4)}°N, ${c.lng.toFixed(4)}°E</div>
      </td>
      <td>
        <div style="display:flex;gap:4px">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" class="btn-nav-gmaps">
            🚗 Navigate
          </a>
          <button class="btn-map-pin" onclick="openLocationModal('${c.id}', '${(c.title||'').replace(/'/g,"\\'")}', '${(c.address||'').replace(/'/g,"\\'")}', ${c.lat}, ${c.lng})">
            📍 Pin
          </button>
        </div>
      </td>
      <td><span class="priority-badge priority-${c.priority}">${c.priority.toUpperCase()}</span></td>
      <td><span class="status-badge status-${c.status}">${c.status.toUpperCase()}</span></td>
      <td style="font-size:12px;${isComplaintOverdue(c)?'color:var(--danger);font-weight:600':'color:var(--text-muted)'}">${c.sla}${isComplaintOverdue(c)?' ⚠️':''}</td>
      <td>
        <div style="display:flex;gap:5px;align-items:center">
          <select class="status-select" id="sel-all-${c.id}">
            <option value="submitted" ${c.status==='submitted'?'selected':''}>Submitted</option>
            <option value="review"    ${c.status==='review'?'selected':''}>Under Review</option>
            <option value="progress"  ${c.status==='progress'?'selected':''}>In Progress</option>
            <option value="resolved"  ${c.status==='resolved'?'selected':''}>Resolved</option>
          </select>
          <button class="btn-update" onclick="updateAdminStatus('${c.id}', 'sel-all-')">Save</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterAdminTable() { renderAdminTable(); }

function renderEscalatedTable() {
  const tbody = document.getElementById('escalatedTable')?.querySelector('tbody') || document.getElementById('escalatedTableBody');
  if (!tbody) return;
  const base = getDeptComplaints();
  const escItems = base.filter(c => c.escalated || isComplaintOverdue(c));
  tbody.innerHTML = escItems.length === 0
    ? '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted)">✅ No overdue complaints for this department</td></tr>'
    : escItems.map(c => `
        <tr>
          <td><code style="font-size:11px;color:var(--danger);font-weight:700">${c.id}</code></td>
          <td><div style="font-weight:600;color:var(--text-primary)">${c.title}</div><div style="font-size:11px;color:var(--text-muted)">${c.dept}</div></td>
          <td><div style="font-size:12px">${c.address}</div><div style="font-size:10px;color:var(--text-muted)">${c.constituency}</div></td>
          <td><a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}" target="_blank" class="btn-nav-gmaps">🚗 Travel Direction</a></td>
          <td><span class="priority-badge priority-${c.priority}">${c.priority.toUpperCase()}</span></td>
          <td style="color:var(--danger);font-weight:600;font-size:12px">${isComplaintOverdue(c) ? `${Math.abs(daysDifference(new Date(), c.sla))} days overdue` : 'Manually escalated'}</td>
          <td><button class="btn-resolve" onclick="quickResolve('${c.id}')">Mark Resolved</button></td>
        </tr>
      `).join('');
}

function renderResolvedTable() {
  const tbody = document.getElementById('resolvedTable')?.querySelector('tbody') || document.getElementById('resolvedTableBody');
  if (!tbody) return;
  const base = getDeptComplaints();
  const resolved = base.filter(c => c.status === 'resolved');
  tbody.innerHTML = resolved.length === 0
    ? '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-muted)">No resolved tasks yet</td></tr>'
    : resolved.map(c => {
        const days = c.resolvedDate ? daysDifference(c.resolvedDate, c.submitted) : '—';
        return `
          <tr>
            <td><code style="font-size:11px;color:var(--success);font-weight:700">${c.id}</code></td>
            <td style="font-weight:600;color:var(--text-primary)">${c.title}</td>
            <td style="font-size:12px">${c.dept}</td>
            <td style="font-size:12px">${c.address}</td>
            <td><span class="priority-badge priority-${c.priority}">${c.priority.toUpperCase()}</span></td>
            <td style="font-size:12px;color:var(--text-muted)">${c.submitted}</td>
            <td style="font-size:12px;color:var(--success);font-weight:600">${c.resolvedDate || '—'}</td>
            <td style="font-size:12px">${days} days</td>
          </tr>
        `;
      }).join('');
}

function renderReports() {
  const all = getDeptComplaints();
  const byStatus = {
    submitted: all.filter(c=>c.status==='submitted').length,
    review:    all.filter(c=>c.status==='review').length,
    progress:  all.filter(c=>c.status==='progress').length,
    resolved:  all.filter(c=>c.status==='resolved').length,
  };
  const resolved = all.filter(c=>c.status==='resolved');
  const avgDays = resolved.length
    ? Math.round(resolved.reduce((acc,c) => acc + (c.resolvedDate ? daysDifference(c.resolvedDate, c.submitted) : 0), 0) / resolved.length)
    : 0;

  const statsRow = document.getElementById('reportStatsRow');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="admin-stat-card"><div class="value" style="color:var(--blue)">${all.length}</div><div class="label">Total Department Tasks</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--success)">${resolved.length}</div><div class="label">Completed / Resolved</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--danger)">${all.filter(c=>c.escalated||isComplaintOverdue(c)).length}</div><div class="label">Escalated Past SLA</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--warning)">${avgDays}</div><div class="label">Avg. Resolution Days</div></div>
    `;
  }

  const breakdown = [
    { label:'Submitted (New)', val: byStatus.submitted, total: all.length, color:'#2563eb' },
    { label:'Under Review',    val: byStatus.review,    total: all.length, color:'#d97706' },
    { label:'In Progress',     val: byStatus.progress,  total: all.length, color:'#0284c7' },
    { label:'Resolved',        val: byStatus.resolved,  total: all.length, color:'#16a34a' },
  ];

  const bdContainer = document.getElementById('reportBreakdown');
  if (bdContainer) {
    bdContainer.innerHTML = breakdown.map(b => `
      <div>
        <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:13px">
          <span style="color:var(--text-secondary)">${b.label}</span>
          <span style="font-weight:600">${b.val} / ${b.total}</span>
        </div>
        <div style="height:7px;background:var(--bg-panel);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${b.total?Math.round(b.val/b.total*100):0}%;background:${b.color};border-radius:4px;transition:width 0.5s ease"></div>
        </div>
      </div>
    `).join('');
  }
}

function updateAdminStatus(id, prefix = 'sel-') {
  const sel = document.getElementById(`${prefix}${id}`) || document.getElementById(`sel-${id}`);
  if (!sel) return;
  const newStatus = sel.value;
  const idx = unifiedAdminData.findIndex(c => c.id === id);
  if (idx === -1) return;
  unifiedAdminData[idx].status = newStatus;
  if (newStatus === 'resolved') {
    unifiedAdminData[idx].resolvedDate = new Date().toISOString().split('T')[0];
    unifiedAdminData[idx].escalated = false;
  }
  showToast(`✅ ${id} status updated to "${newStatus.toUpperCase()}"`, 'success');
  renderAdminOverview();
}

function quickResolve(id) {
  const idx = unifiedAdminData.findIndex(c => c.id === id);
  if (idx === -1) return;
  unifiedAdminData[idx].status = 'resolved';
  unifiedAdminData[idx].resolvedDate = new Date().toISOString().split('T')[0];
  unifiedAdminData[idx].escalated = false;
  showToast(`✅ ${id} marked as Resolved & Closed.`, 'success');
  renderAdminOverview();
}

function downloadReport() {
  const headers = ['ID','Title','Category','Department','Address','Latitude','Longitude','Constituency','Priority','Status','Submitted','SLA','ResolvedDate'];
  const rows = getDeptComplaints().map(c => [c.id,`"${c.title}"`,c.category,`"${c.dept}"`,`"${c.address}"`,c.lat,c.lng,c.constituency,c.priority,c.status,c.submitted,c.sla,c.resolvedDate||''].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type:'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `${currentAdminDept.replace(/\s+/g,'_')}_Complaints_Report.csv`; a.click();
  showToast('📥 Report CSV downloaded', 'success');
}

/* ── Modal Leaflet Map ── */
let modalMap = null;
let modalMarker = null;

function openLocationModal(id, title, address, lat, lng) {
  const titleEl = document.getElementById('modalMapTitle');
  if (titleEl) titleEl.textContent = `📍 ${id} — ${title}`;
  const addrEl = document.getElementById('modalMapAddress');
  if (addrEl) addrEl.textContent = `Address: ${address}`;
  const coordsEl = document.getElementById('modalMapCoords');
  if (coordsEl) coordsEl.textContent = `GPS: ${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E`;
  const gmapsBtn = document.getElementById('modalGmapsBtn');
  if (gmapsBtn) gmapsBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const modal = document.getElementById('locationModal');
  if (modal) modal.classList.add('show');

  setTimeout(() => {
    const mapEl = document.getElementById('modalLeafletMap');
    if (!mapEl || typeof L === 'undefined') return;
    if (!modalMap) {
      modalMap = L.map('modalLeafletMap').setView([lat, lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(modalMap);
      modalMarker = L.marker([lat, lng]).addTo(modalMap);
    } else {
      modalMap.setView([lat, lng], 15);
      modalMarker.setLatLng([lat, lng]);
      modalMap.invalidateSize();
    }
  }, 150);
}

function closeMapModal() {
  const modal = document.getElementById('locationModal');
  if (modal) modal.classList.remove('show');
}



