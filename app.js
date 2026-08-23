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
    id: 'CMP-2024-004',
    title: 'Transformer humming loudly near residential block',
    category: 'Electricity',
    icon: '⚡',
    description: 'The TNEB transformer near Bhavani Main Road residential block is producing loud humming and vibrations. Residents fear short circuit.',
    status: 'review',
    priority: 'high',
    constituency: 'Bhavani',
    department: 'Tamil Nadu Electricity Board',
    submittedDate: '2024-02-01',
    reviewDate: '2024-02-02',
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-02-05',
    escalated: false,
    location: 'Bhavani Main Rd, Block B, Bhavani — 11.4450°N, 77.6830°E',
  },
  {
    id: 'CMP-2024-005',
    title: 'Illegal sand mining near Bhavani river',
    category: 'Collectorate',
    icon: '🏛️',
    description: 'Illegal sand mining is occurring near the Bhavani river bed at night. Heavy machinery noticed. Riverbank collapsing.',
    status: 'progress',
    priority: 'critical',
    constituency: 'Bhavani',
    department: 'District Collectorate',
    submittedDate: '2024-02-05',
    reviewDate: '2024-02-06',
    progressDate: '2024-02-07',
    resolvedDate: null,
    slaDeadline: '2024-02-09',
    escalated: true,
    location: 'Bhavani River Bed, Bhavani — 11.4420°N, 77.6800°E',
  },
  {
    id: 'CMP-2024-006',
    title: 'Overflowing garbage bins near bus stand',
    category: 'Garbage',
    icon: '🗑️',
    description: 'Garbage bins near the Gobichettipalayam bus stand have been overflowing for 5 days. Foul smell and health hazard for commuters.',
    status: 'progress',
    priority: 'high',
    constituency: 'Gobichettipalayam',
    department: 'Sanitation Department',
    submittedDate: '2024-02-10',
    reviewDate: '2024-02-11',
    progressDate: '2024-02-12',
    resolvedDate: null,
    slaDeadline: '2024-02-14',
    escalated: false,
    location: 'Gobichettipalayam Bus Stand, Gobichettipalayam — 11.4575°N, 77.4370°E',
  },
  {
    id: 'CMP-2024-007',
    title: 'Sewage overflow on Perundurai main road',
    category: 'Drainage',
    icon: '🌊',
    description: 'Sewage is overflowing on Perundurai-Erode main road. The drainage channel is blocked and raw sewage is flowing freely on the road.',
    status: 'submitted',
    priority: 'critical',
    constituency: 'Perundurai',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2024-02-15',
    reviewDate: null,
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-02-17',
    escalated: false,
    location: 'Perundurai Main Road, Perundurai — 11.2730°N, 77.5850°E',
  },
  {
    id: 'CMP-2024-008',
    title: 'Road cave-in after heavy rainfall',
    category: 'Road',
    icon: '🛣️',
    description: 'A significant road cave-in has occurred on Modakkurichi bypass road following heavy rain. One lane completely blocked.',
    status: 'review',
    priority: 'critical',
    constituency: 'Modakkurichi',
    department: 'Roads & Highways Dept.',
    submittedDate: '2024-02-18',
    reviewDate: '2024-02-19',
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-02-20',
    escalated: true,
    location: 'Modakkurichi Bypass Rd, Modakkurichi — 11.3170°N, 77.6360°E',
  },
  {
    id: 'CMP-2024-009',
    title: 'No drinking water in tribal hamlet',
    category: 'Water',
    icon: '💧',
    description: 'The tribal hamlet in Anthiyur hills has not received drinking water supply for 10 days. Residents walking 5 km to fetch water.',
    status: 'progress',
    priority: 'critical',
    constituency: 'Anthiyur',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2024-02-20',
    reviewDate: '2024-02-21',
    progressDate: '2024-02-22',
    resolvedDate: null,
    slaDeadline: '2024-02-23',
    escalated: true,
    location: 'Anthiyur Hills Tribal Hamlet, Anthiyur — 11.5750°N, 77.5930°E',
  },
  {
    id: 'CMP-2024-010',
    title: 'Electric pole fallen on road after storm',
    category: 'Electricity',
    icon: '⚡',
    description: 'An electric pole with live wires fell on the main road in Sathyamangalam after last night storm. Extremely dangerous.',
    status: 'progress',
    priority: 'critical',
    constituency: 'Sathyamangalam',
    department: 'Tamil Nadu Electricity Board',
    submittedDate: '2024-02-25',
    reviewDate: '2024-02-25',
    progressDate: '2024-02-25',
    resolvedDate: null,
    slaDeadline: '2024-02-26',
    escalated: true,
    location: 'Sathyamangalam Main Road, Sathyamangalam — 11.5060°N, 77.2370°E',
  },
  {
    id: 'CMP-2024-011',
    title: 'Encroachment on government land near school',
    category: 'Collectorate',
    icon: '🏛️',
    description: 'Illegal encroachment detected on government-owned land adjacent to Erode West government school. Construction started without permit.',
    status: 'review',
    priority: 'high',
    constituency: 'Erode West',
    department: 'District Collectorate',
    submittedDate: '2024-03-01',
    reviewDate: '2024-03-02',
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-03-06',
    escalated: false,
    location: 'Erode West Govt. School Area, Erode West — 11.3380°N, 77.7090°E',
  },
  {
    id: 'CMP-2024-012',
    title: 'Plastic waste dumped in open field',
    category: 'Garbage',
    icon: '🗑️',
    description: 'Tonnes of plastic waste including medical waste has been illegally dumped in the open field near the Anthiyur lake.',
    status: 'submitted',
    priority: 'high',
    constituency: 'Anthiyur',
    department: 'Sanitation Department',
    submittedDate: '2024-03-05',
    reviewDate: null,
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-03-10',
    escalated: false,
    location: 'Anthiyur Lake Side Field, Anthiyur — 11.5700°N, 77.5860°E',
  },
  {
    id: 'CMP-2024-013',
    title: 'Bridge cracks visible near Cauvery canal',
    category: 'Road',
    icon: '🛣️',
    description: 'Visible cracks on the old bridge over Cauvery canal in Erode West. Heavy vehicles still crossing daily. Risk of collapse.',
    status: 'submitted',
    priority: 'critical',
    constituency: 'Erode West',
    department: 'Roads & Highways Dept.',
    submittedDate: '2024-03-08',
    reviewDate: null,
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-03-10',
    escalated: false,
    location: 'Cauvery Canal Bridge, Erode West — 11.3356°N, 77.7080°E',
  },
  {
    id: 'CMP-2024-014',
    title: 'Blocked drain causing waterlogging in colony',
    category: 'Drainage',
    icon: '🌊',
    description: 'The main drain in Perundurai SIDCO Industrial Colony is blocked. Rainwater and industrial runoff are waterlogging the area.',
    status: 'review',
    priority: 'high',
    constituency: 'Perundurai',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2024-03-10',
    reviewDate: '2024-03-11',
    progressDate: null,
    resolvedDate: null,
    slaDeadline: '2024-03-14',
    escalated: false,
    location: 'SIDCO Industrial Colony, Perundurai — 11.2760°N, 77.5810°E',
  },
  {
    id: 'CMP-2024-015',
    title: 'Garbage van not visiting for 2 weeks',
    category: 'Garbage',
    icon: '🗑️',
    description: 'The municipal garbage collection van has not visited our area (Modakkurichi 5th ward) for the past 2 weeks. Waste piling up everywhere.',
    status: 'progress',
    priority: 'medium',
    constituency: 'Modakkurichi',
    department: 'Sanitation Department',
    submittedDate: '2024-03-12',
    reviewDate: '2024-03-13',
    progressDate: '2024-03-15',
    resolvedDate: null,
    slaDeadline: '2024-03-16',
    escalated: false,
    location: 'Modakkurichi 5th Ward, Modakkurichi — 11.3140°N, 77.6390°E',
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
  {
    id: 'CMP-2023-012',
    title: 'Power cut every evening for 4 hours',
    category: 'Electricity',
    icon: '⚡',
    description: 'Scheduled and unscheduled power cuts are occurring every evening between 6PM–10PM in Gobichettipalayam North ward. Affecting businesses and households.',
    status: 'resolved',
    priority: 'high',
    constituency: 'Gobichettipalayam',
    department: 'Tamil Nadu Electricity Board',
    submittedDate: '2023-09-01',
    reviewDate: '2023-09-02',
    progressDate: '2023-09-04',
    resolvedDate: '2023-09-09',
    slaDeadline: '2023-09-10',
    escalated: false,
    location: 'Gobichettipalayam North Ward, Gobichettipalayam — 11.4600°N, 77.4380°E',
  },
  {
    id: 'CMP-2023-007',
    title: 'Caste certificate delay — 3 months pending',
    category: 'Collectorate',
    icon: '🏛️',
    description: 'Applied for caste certificate 3 months ago at Sathyamangalam Tahsildar office. No response or update given. Urgently needed for college admission.',
    status: 'resolved',
    priority: 'medium',
    constituency: 'Sathyamangalam',
    department: 'District Collectorate',
    submittedDate: '2023-07-10',
    reviewDate: '2023-07-15',
    progressDate: '2023-07-20',
    resolvedDate: '2023-07-28',
    slaDeadline: '2023-07-30',
    escalated: false,
    location: 'Sathyamangalam Tahsildar Office, Sathyamangalam — 11.5055°N, 77.2380°E',
  },
  {
    id: 'CMP-2023-003',
    title: 'Drain blocked causing mosquito breeding',
    category: 'Drainage',
    icon: '🌊',
    description: 'Stagnant water in blocked drain near Anthiyur market is breeding mosquitoes. Dengue cases reported in the area.',
    status: 'resolved',
    priority: 'high',
    constituency: 'Anthiyur',
    department: 'Water Supply & Drainage Board',
    submittedDate: '2023-06-05',
    reviewDate: '2023-06-06',
    progressDate: '2023-06-07',
    resolvedDate: '2023-06-10',
    slaDeadline: '2023-06-12',
    escalated: false,
    location: 'Anthiyur Market Area, Anthiyur — 11.5730°N, 77.5900°E',
  },
];

const NOTIFICATIONS_DATA = [
  { id: 1, icon: '🏛️', title: 'Higher Official Intervention Directive', message: 'Office of the District Collector has issued a mandatory Show-Cause Directive to Roads & Highways for delayed resolution of CMP-2024-001.', time: '25 mins ago', read: false, type: 'danger' },
  { id: 2, icon: '🚨', title: 'SLA Escalation Alert — CMP-2024-009', message: 'Complaint CMP-2024-009 (No drinking water in tribal hamlet, Anthiyur) exceeded the 24h critical SLA. Auto-escalated to District Nodal Control.', time: '1 hour ago', read: false, type: 'warning' },
  { id: 3, icon: '⚡', title: 'Emergency — Fallen Electric Pole', message: 'CMP-2024-010: Fallen electric pole with live wires reported on Sathyamangalam Main Road. TNEB crew dispatched. Avoid the area.', time: '3 hours ago', read: false, type: 'danger' },
  { id: 4, icon: '🔄', title: 'Field Crew Dispatched', message: 'Assistant Executive Engineer acknowledged directive and dispatched field repair crew to NH-47 for CMP-2024-001.', time: '1 day ago', read: false, type: 'info' },
  { id: 5, icon: '🗺️', title: 'New Complaint Registered Near You', message: 'A new critical complaint (Bridge cracks, Cauvery Canal — CMP-2024-013) was registered in Erode West, near your area.', time: '2 days ago', read: false, type: 'warning' },
  { id: 6, icon: '🏛️', title: 'Show-Cause Memo Issued', message: 'District Collector issued a Show-Cause memo to the Bhavani sand-mining supervisor. CMP-2024-005 under immediate investigation.', time: '3 days ago', read: false, type: 'danger' },
  { id: 7, icon: '🔍', title: 'Complaint Under Review', message: 'Your complaint CMP-2024-002 (Water supply disruption, Gandhi Nagar) is now being reviewed by the Water Supply & Drainage Board.', time: '4 days ago', read: true, type: 'info' },
  { id: 8, icon: '✅', title: 'Complaint Resolved', message: 'Your complaint CMP-2023-021 (Garbage dump, Temple Street) has been marked Resolved. Please rate your experience.', time: 'Dec 14, 2023', read: true, type: 'success' },
  { id: 9, icon: '✅', title: 'Drainage Issue Resolved', message: 'CMP-2023-019 (Drainage overflow, Main Bazaar Road) has been successfully resolved by the Water Supply & Drainage Board.', time: 'Nov 27, 2023', read: true, type: 'success' },
  { id: 10, icon: '⭐', title: 'Feedback Request', message: 'Please rate your experience for resolved complaint CMP-2023-019 (Drainage overflow, Erode East).', time: 'Nov 28, 2023', read: true, type: 'info' },
  { id: 11, icon: '✅', title: 'Power Restoration Confirmed', message: 'CMP-2023-012 (Power cut, Gobichettipalayam North Ward) has been resolved. TNEB upgraded the feeder line. Power restored.', time: 'Sep 9, 2023', read: true, type: 'success' },
  { id: 12, icon: '🎉', title: 'Certificate Issued Successfully', message: 'CMP-2023-007: Your caste certificate application has been processed and the certificate has been dispatched by post.', time: 'Jul 28, 2023', read: true, type: 'success' },
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
  const container = document.getElementById('recentComplaintsList') || document.getElementById('overviewComplaintsList');
  if (!container) return;
  const recent = COMPLAINTS_DATA.slice(0, 3);
  container.innerHTML = recent.map((c, i) => renderComplaintCard(c, i * 80)).join('');
}
function renderOverviewComplaints() {
  renderRecentComplaints();
}

// My Complaints Page
function renderAllComplaints(filter = 'all') {
  const container = document.getElementById('allComplaintsList') || document.getElementById('myComplaintsList');
  if (!container) return;
  const filtered = filter === 'all' ? COMPLAINTS_DATA : COMPLAINTS_DATA.filter(c => c.status === filter);
  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">No complaints found for this filter.</div>`;
    return;
  }
  container.innerHTML = filtered.map((c, i) => renderComplaintCard(c, i * 60)).join('');
}
function renderMyComplaints(filter = 'all') {
  renderAllComplaints(filter);
}

function filterComplaints(filter, btn) {
  document.querySelectorAll('#page-complaints .filter-btn, .dash-page#page-complaints .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderAllComplaints(filter);
}

// History Page
function renderHistory() {
  const container = document.getElementById('historyList') || document.getElementById('historyComplaintsList');
  if (!container) return;
  container.innerHTML = COMPLAINTS_DATA.map((c, i) => renderComplaintCard(c, i * 60)).join('');
}

// SLA Tracker
function renderSlaTracker() {
  const container = document.getElementById('slaTrackerTimeline');
  if (!container) return;
  const activeSlaItems = COMPLAINTS_DATA.filter(c => c.status !== 'resolved').slice(0, 3);
  container.innerHTML = activeSlaItems.map(c => `
    <div style="padding:10px 12px;background:var(--bg-panel);border-radius:var(--radius-sm);margin-bottom:8px;border-left:3px solid ${c.escalated ? 'var(--danger)' : 'var(--blue)'}">
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
        <strong>${c.id}</strong>
        <span style="color:${c.escalated ? 'var(--danger)' : 'var(--warning)'};font-weight:700">${c.escalated ? '🚨 Overdue SLA' : '⏱️ SLA Active'}</span>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.title}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Target Deadline: <strong>${c.slaDeadline}</strong> • ${c.department}</div>
    </div>
  `).join('');
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
    { name: 'Road', icon: '🛣️', count: 5, color: 'hsl(220,90%,56%)', pct: 23 },
    { name: 'Water', icon: '💧', count: 4, color: 'hsl(200,85%,52%)', pct: 18 },
    { name: 'Garbage', icon: '🗑️', count: 4, color: 'hsl(38,92%,55%)', pct: 18 },
    { name: 'Electricity', icon: '⚡', count: 4, color: 'hsl(270,70%,60%)', pct: 18 },
    { name: 'Drainage', icon: '🌊', count: 4, color: 'hsl(145,65%,45%)', pct: 18 },
    { name: 'Collectorate', icon: '🏛️', count: 3, color: 'hsl(0,72%,55%)', pct: 14 },
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
    { icon: '⚡', title: 'Emergency Response Initiated', desc: 'CMP-2024-010: TNEB crew dispatched to Sathyamangalam — fallen electric pole', time: '3 hours ago', color: 'hsla(0,72%,55%,0.2)' },
    { icon: '🚨', title: 'SLA Escalation — Water Crisis', desc: 'CMP-2024-009 (Anthiyur tribal hamlet) auto-escalated to District Nodal Control', time: '5 hours ago', color: 'hsla(0,72%,55%,0.2)' },
    { icon: '🏛️', title: 'Show-Cause Memo Dispatched', desc: 'Collector issued memo to Bhavani Roads Dept for CMP-2024-008 cave-in', time: '1 day ago', color: 'hsla(38,92%,55%,0.2)' },
    { icon: '🔄', title: 'Status Updated — In Progress', desc: 'CMP-2024-006 (Garbage, Gobichettipalayam) field crew deployed', time: '2 days ago', color: 'hsla(200,85%,52%,0.2)' },
    { icon: '🔍', title: 'Under Review', desc: 'CMP-2024-011 (Encroachment, Erode West) under Collectorate review', time: '3 days ago', color: 'hsla(270,70%,60%,0.2)' },
    { icon: '📨', title: 'New Critical Complaint', desc: 'CMP-2024-013 (Bridge cracks, Cauvery Canal) submitted and flagged critical', time: '4 days ago', color: 'hsla(220,90%,56%,0.2)' },
    { icon: '✅', title: 'Complaint Resolved', desc: 'CMP-2023-019 drainage overflow resolved by Water Supply Board', time: '5 days ago', color: 'hsla(145,65%,45%,0.2)' },
    { icon: '🎉', title: 'Power Restored in Gobichettipalayam', desc: 'CMP-2023-012 fully resolved — feeder line upgraded by TNEB', time: '7 days ago', color: 'hsla(145,65%,45%,0.2)' },
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
    { label: 'Jun', val: 1 }, { label: 'Jul', val: 2 }, { label: 'Aug', val: 1 },
    { label: 'Sep', val: 3 }, { label: 'Oct', val: 2 }, { label: 'Nov', val: 3 },
    { label: 'Dec', val: 4 }, { label: 'Jan', val: 5 }, { label: 'Feb', val: 8 }, { label: 'Mar', val: 6 },
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
    { label: 'Resolved', count: 8, cls: 'status-resolved', icon: '✅' },
    { label: 'In Progress', count: 6, cls: 'status-progress', icon: '🔄' },
    { label: 'Under Review', count: 5, cls: 'status-review', icon: '🔍' },
    { label: 'Submitted', count: 5, cls: 'status-submitted', icon: '📨' },
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
    { label: 'Critical', count: 8, cls: 'priority-critical', color: 'var(--danger)' },
    { label: 'High', count: 8, cls: 'priority-high', color: 'var(--critical)' },
    { label: 'Medium', count: 4, cls: 'priority-medium', color: 'var(--warning)' },
    { label: 'Low', count: 2, cls: 'priority-low', color: 'var(--success)' },
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
    { name: 'Roads & Highways', icon: '🛣️', total: 5, resolved: 2, avgDays: 6.4 },
    { name: 'Water Supply & Drainage', icon: '💧', total: 8, resolved: 4, avgDays: 3.8 },
    { name: 'Sanitation Dept.', icon: '🗑️', total: 4, resolved: 2, avgDays: 4.2 },
    { name: 'TNEB Electricity', icon: '⚡', total: 4, resolved: 2, avgDays: 7.1 },
    { name: 'District Collectorate', icon: '🏛️', total: 3, resolved: 1, avgDays: 12.5 },
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

    ${c.status === 'resolved' ? `
      <!-- AI Verified Resolution Proof Section -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius);padding:14px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;font-size:13px;color:#15803d">
            <span>🛡️ AI Verified Work Completion Certificate</span>
          </div>
          <span style="background:#16a34a;color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px">✓ 100% VERIFIED</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:6px;text-align:center">
            <div style="font-size:10.5px;font-weight:700;color:#dc2626;margin-bottom:4px">📷 BEFORE REPAIR (CITIZEN)</div>
            <div style="height:100px;background:#1e293b;border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center">
              ${(typeof REPAIR_PROOFS_DB !== 'undefined' && REPAIR_PROOFS_DB[c.category] ? REPAIR_PROOFS_DB[c.category].beforeSvg : '')}
            </div>
          </div>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:6px;text-align:center">
            <div style="font-size:10.5px;font-weight:700;color:#16a34a;margin-bottom:4px">🛠️ AFTER REPAIR (COMPLETED)</div>
            <div style="height:100px;background:#1e293b;border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center">
              ${(typeof REPAIR_PROOFS_DB !== 'undefined' && REPAIR_PROOFS_DB[c.category] ? REPAIR_PROOFS_DB[c.category].afterSvg : '')}
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#166534;background:#dcfce7;padding:6px 10px;border-radius:4px">
          <span>📍 Place Identity: <strong>98.4% Match</strong></span>
          <span>🛠️ Defect Remediated: <strong>97.2% Fixed</strong></span>
          <span>📅 Closed: <strong>${c.resolvedDate || '2024-02-18'}</strong></span>
        </div>
      </div>
    ` : ''}

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
   FAKE DATA & CITIZEN DEMO ACCOUNTS
══════════════════════════════════════════════════════ */
const DEMO_CITIZENS = [
  {
    id: 'CIT-1001',
    name: 'Ramesh Kumar',
    email: 'ramesh@erode.in',
    phone: '9876543210',
    fullPhone: '+91 98765 43210',
    password: 'citizen123',
    constituency: 'Erode East',
    ward: 'Ward 14 - Periyar Nagar, Erode East - 638001',
    address: '142, Gandhiji Road, Near Manikoondu, Erode East',
    aadhaarMasked: 'XXXX-XXXX-8921',
    registeredDate: '12 May 2024',
    complaintsCount: 7,
    resolvedCount: 4,
    pendingCount: 3,
    escalatedCount: 1,
    avatar: 'R',
    initials: 'RK',
    status: 'active'
  },
  {
    id: 'CIT-1002',
    name: 'Priya Sundaram',
    email: 'priya@erode.in',
    phone: '9842111223',
    fullPhone: '+91 98421 11223',
    password: 'citizen123',
    constituency: 'Erode West',
    ward: 'Ward 08 - Sampath Nagar, Erode West - 638011',
    address: '28/4, EVN Road, Near GH Roundana, Erode West',
    aadhaarMasked: 'XXXX-XXXX-3419',
    registeredDate: '18 May 2024',
    complaintsCount: 4,
    resolvedCount: 2,
    pendingCount: 2,
    escalatedCount: 0,
    avatar: 'P',
    initials: 'PS',
    status: 'active'
  },
  {
    id: 'CIT-1003',
    name: 'Karthik Raja',
    email: 'karthik@erode.in',
    phone: '9789055667',
    fullPhone: '+91 97890 55667',
    password: 'citizen123',
    constituency: 'Bhavani',
    ward: 'Ward 03 - Sangameshwarar Kovil Street, Bhavani - 638301',
    address: '55, Kooduthurai North Bank, Bhavani',
    aadhaarMasked: 'XXXX-XXXX-7102',
    registeredDate: '01 Jun 2024',
    complaintsCount: 2,
    resolvedCount: 1,
    pendingCount: 1,
    escalatedCount: 1,
    avatar: 'K',
    initials: 'KR',
    status: 'active'
  },
  {
    id: 'CIT-1004',
    name: 'Anitha Murugesan',
    email: 'anitha@erode.in',
    phone: '9443299887',
    fullPhone: '+91 94432 99887',
    password: 'citizen123',
    constituency: 'Gobichettipalayam',
    ward: 'Ward 05 - Kutchery Street, Gobichettipalayam - 638452',
    address: '12-A, Market Road, Near Pariyur Junction, Gobichetti',
    aadhaarMasked: 'XXXX-XXXX-5583',
    registeredDate: '15 Jun 2024',
    complaintsCount: 5,
    resolvedCount: 3,
    pendingCount: 2,
    escalatedCount: 0,
    avatar: 'A',
    initials: 'AM',
    status: 'active'
  },
  {
    id: 'CIT-1007',
    name: 'Senthil Nathan',
    email: 'senthil@erode.in',
    phone: '9715022334',
    fullPhone: '+91 97150 22334',
    password: 'citizen123',
    constituency: 'Anthiyur',
    ward: 'Ward 01 - Gurunathaswamy Temple Rd, Anthiyur - 638501',
    address: '89, Bazaar Street, Anthiyur',
    aadhaarMasked: 'XXXX-XXXX-6638',
    registeredDate: '01 Aug 2024',
    complaintsCount: 2,
    resolvedCount: 1,
    pendingCount: 1,
    escalatedCount: 0,
    avatar: 'S',
    initials: 'SN',
    status: 'active'
  },
  {
    id: 'CIT-1008',
    name: 'Kavitha Balan',
    email: 'kavitha@erode.in',
    phone: '9865077889',
    fullPhone: '+91 98650 77889',
    password: 'citizen123',
    constituency: 'Sathyamangalam',
    ward: 'Ward 06 - Bannari Amman Kovil Road, Sathyamangalam - 638401',
    address: '34, Mysore Trunk Road, Sathyamangalam',
    aadhaarMasked: 'XXXX-XXXX-1190',
    registeredDate: '05 Aug 2024',
    complaintsCount: 1,
    resolvedCount: 1,
    pendingCount: 0,
    escalatedCount: 0,
    avatar: 'K',
    initials: 'KB',
    status: 'active'
  }
];

const RANDOM_CITIZEN_PROFILES = [
  { name: 'Muthukumar S', phone: '9843055412', constituency: 'Perundurai', address: '12, Chennimalai Road, Perundurai' },
  { name: 'Deepa Selvaraj', phone: '9629088776', constituency: 'Modakkurichi', address: '45, Railway Feeder Road, Modakkurichi' },
  { name: 'Vigneshwaran M', phone: '9952044332', constituency: 'Perundurai', address: '88, SIPCOT Industrial Complex, Perundurai' },
  { name: 'Revathi Krishnan', phone: '9894012345', constituency: 'Erode West', address: '102, Thindal Malai Foot Rd, Erode West' },
  { name: 'Saravanan Palanisamy', phone: '9787123987', constituency: 'Bhavani', address: '67, Cauvery Riverbed St, Bhavani' },
  { name: 'Meenakshi Sundaram', phone: '9442167890', constituency: 'Gobichettipalayam', address: '23, Alingiam Road, Gobichettipalayam' },
  { name: 'Gopalakrishnan V', phone: '9865432109', constituency: 'Sathyamangalam', address: '50, Bhavanisagar Dam Rd, Sathyamangalam' }
];

let randomCitizenIndex = 0;

/* ── Select Demo Citizen (Auto-fills or Auto-logins) ── */
function selectDemoCitizen(id, autoLogin = false) {
  const citizen = DEMO_CITIZENS.find(c => c.id === id) || DEMO_CITIZENS[0];
  if (!citizen) return;

  const loginInput = document.getElementById('cLoginId');
  const passInput = document.getElementById('cLoginPass');
  if (loginInput) loginInput.value = citizen.email;
  if (passInput) passInput.value = citizen.password;

  // Highlight active chip
  document.querySelectorAll('.demo-citizen-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.id === id);
  });

  // Update preview card
  const pName = document.getElementById('demoPreviewName');
  const pMeta = document.getElementById('demoPreviewMeta');
  if (pName) pName.textContent = `${citizen.name} (${citizen.id})`;
  if (pMeta) pMeta.textContent = `📍 ${citizen.constituency} • ${citizen.complaintsCount} Grievances (${citizen.resolvedCount} Resolved, ${citizen.pendingCount} Active)`;

  if (autoLogin) {
    applyCitizenSession(citizen);
    showToast(`🌟 Logged in as demo citizen: ${citizen.name} (${citizen.constituency})`, 'success');
    if (typeof showMasterView === 'function') {
      showMasterView('citizen');
    }
  }
}

/* ── Auto-Fill Random Sample Citizen in Registration Form ── */
function fillRandomCitizenRegisterData() {
  const sample = RANDOM_CITIZEN_PROFILES[randomCitizenIndex % RANDOM_CITIZEN_PROFILES.length];
  randomCitizenIndex++;

  const nameInput = document.getElementById('regName');
  const phoneInput = document.getElementById('regPhone');
  const constSelect = document.getElementById('regConstituency');
  const passInput = document.getElementById('regPass');

  if (nameInput) nameInput.value = sample.name;
  if (phoneInput) phoneInput.value = sample.phone;
  if (constSelect) constSelect.value = sample.constituency;
  if (passInput) passInput.value = 'citizen123';

  showToast(`🎲 Sample citizen details loaded: ${sample.name} (${sample.constituency})`, 'info');
}

/* ── Apply Citizen Session to Dashboard and UI Elements ── */
function applyCitizenSession(citizen) {
  sessionStorage.setItem('citizen', JSON.stringify(citizen));

  // Sidebar elements
  const sName = document.getElementById('sidebarName');
  const sAvatar = document.getElementById('sidebarAvatar');
  const sConst = document.getElementById('sidebarConst');
  if (sName) sName.textContent = citizen.name;
  if (sAvatar) sAvatar.textContent = citizen.avatar || citizen.name[0].toUpperCase();
  if (sConst) sConst.textContent = `📍 ${citizen.constituency}`;

  // Topbar subtitle
  const subEl = document.getElementById('pageSubtitle');
  if (subEl) subEl.textContent = `Welcome back, ${citizen.name.split(' ')[0]}! Here's your grievance summary for ${citizen.constituency}.`;

  // Profile View Elements
  const pName = document.getElementById('profileName');
  const pAvatar = document.getElementById('profileAvatar');
  const pNameInput = document.getElementById('profileNameInput');
  const pPhone = document.getElementById('profilePhone');
  const pEmail = document.getElementById('profileEmail');
  const pConst = document.getElementById('profileConst');
  const pConstitSelect = document.getElementById('profileConstitSelect');
  const pAddress = document.getElementById('profileAddress');
  const pAadhaar = document.getElementById('profileAadhaar');
  const pId = document.getElementById('profileCitizenId');
  const pRegDate = document.getElementById('profileRegDate');
  const pFiledCount = document.getElementById('profileFiledCount');
  const pResolvedCount = document.getElementById('profileResolvedCount');
  const pPendingCount = document.getElementById('profilePendingCount');

  if (pName) pName.textContent = citizen.name;
  if (pAvatar) pAvatar.textContent = citizen.avatar || citizen.name[0].toUpperCase();
  if (pNameInput) pNameInput.value = citizen.name;
  if (pPhone) pPhone.value = citizen.fullPhone || `+91 ${citizen.phone}`;
  if (pEmail) pEmail.value = citizen.email || `${citizen.name.toLowerCase().replace(/\s+/g, '')}@erode.in`;
  if (pConst) pConst.textContent = `📍 ${citizen.constituency} Constituency`;
  if (pConstitSelect) pConstitSelect.value = citizen.constituency;
  if (pAddress) pAddress.textContent = citizen.address || citizen.ward || `Ward in ${citizen.constituency}, Erode`;
  if (pAadhaar) pAadhaar.textContent = citizen.aadhaarMasked || 'XXXX-XXXX-8921';
  if (pId) pId.textContent = citizen.id || 'CIT-1001';
  if (pRegDate) pRegDate.textContent = citizen.registeredDate || '12 May 2024';
  if (pFiledCount) pFiledCount.textContent = citizen.complaintsCount || 7;
  if (pResolvedCount) pResolvedCount.textContent = citizen.resolvedCount || 4;
  if (pPendingCount) pPendingCount.textContent = citizen.pendingCount || 3;

  // Overview stats cards
  const statCards = document.querySelectorAll('#view-citizen .stat-card-value');
  if (statCards.length >= 4) {
    statCards[0].textContent = citizen.complaintsCount || 7;
    statCards[1].textContent = citizen.pendingCount || 3;
    statCards[2].textContent = citizen.resolvedCount || 4;
    statCards[3].textContent = citizen.escalatedCount || 1;
  }
}

/* ── Save Citizen Profile ── */
function saveCitizenProfile() {
  const name = document.getElementById('profileNameInput')?.value.trim();
  const phone = document.getElementById('profilePhone')?.value.trim();
  const email = document.getElementById('profileEmail')?.value.trim();
  const constituency = document.getElementById('profileConstitSelect')?.value;

  const current = JSON.parse(sessionStorage.getItem('citizen') || '{}');
  if (name) current.name = name;
  if (phone) { current.phone = phone; current.fullPhone = phone; }
  if (email) current.email = email;
  if (constituency) current.constituency = constituency;
  if (name) current.avatar = name[0].toUpperCase();

  applyCitizenSession(current);
  showToast('✅ Citizen profile updated successfully!', 'success');
}

function saveProfile() {
  saveCitizenProfile();
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
   AUTH — Sign Out (Universal Across All Panels)
══════════════════════════════════════════════════════ */
function handleUniversalSignOut() {
  sessionStorage.removeItem('citizen');
  sessionStorage.removeItem('admin');
  
  const isTa = currentLang === 'ta';
  showToast(isTa ? '🚪 வெற்றிகரமாக வெளியேற்றப்பட்டீர்கள்!' : '🚪 Signed out successfully!', 'info');

  if (typeof showMasterView === 'function') {
    showMasterView('auth');
  } else {
    setTimeout(() => { window.location.href = 'index.html'; }, 500);
  }
}

function handleLogout() {
  handleUniversalSignOut();
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
    demoCitizensTitle: '⚡ Demo Citizen Accounts:',
    demoBadgePill: 'Click to Auto-Fill',
    btnRandomDemo: '🎲 Fill Sample / Fake Citizen Details',
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
    demoCitizensTitle: '⚡ மாதிரி குடிமக்கள் கணக்குகள்:',
    demoBadgePill: 'தானாக நிரப்ப கிளிக் செய்',
    btnRandomDemo: '🎲 மாதிரி குடிமக்கள் விவரங்களை நிரப்பு',
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
  const demoTitle = document.querySelector('.demo-citizens-title');
  if (demoTitle) demoTitle.innerHTML = `<span>${t.demoCitizensTitle || '⚡ Demo Citizen Accounts:'}</span>`;
  const demoPill = document.querySelector('.demo-badge-pill');
  if (demoPill) demoPill.textContent = t.demoBadgePill || 'Click to Auto-Fill';
  const btnCLogin = document.getElementById('btnCitizenLogin') || document.querySelector('#formCitizenLogin button[type="submit"]');
  if (btnCLogin) btnCLogin.textContent = t.btnCitizenLogin;

  // Form 2
  const f2Header = document.querySelector('#formCitizenRegister .form-header h2');
  if (f2Header) f2Header.textContent = t.regHeader;
  const f2Sub = document.querySelector('#formCitizenRegister .form-header p');
  if (f2Sub) f2Sub.textContent = t.regSub;
  const btnRandom = document.querySelector('.btn-random-demo-data');
  if (btnRandom) btnRandom.textContent = t.btnRandomDemo || '🎲 Fill Sample / Fake Citizen Details';
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

  // Sign Out Buttons
  document.querySelectorAll('.signout-text').forEach(el => {
    el.textContent = lang === 'ta' ? 'வெளியேறு' : 'Sign Out';
  });
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.innerHTML = `<span>🚪</span> ${lang === 'ta' ? 'வெளியேறு' : 'Sign Out'}`;
  });

  if (typeof syncBotLang === 'function') {
    syncBotLang(lang);
  }

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
  updateAdminNotifBadges();
  renderDepartmentDirectives();
  showToast(`🔄 Switched view to ${dept === 'ALL' ? 'All Departments' : dept}`, 'info');
}

function adminNav(page, btn) {
  document.querySelectorAll('#view-admin .admin-nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#view-admin .admin-page').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const target = document.getElementById(`admin-page-${page}`);
  if (target) target.classList.add('active');

  const titles = {
    overview: 'Department Overview',
    complaints: 'Department Tasks & Grievances',
    escalated: 'Escalated Complaints (Overdue)',
    resolved: 'Resolved Tasks & Verified Closures',
    reports: 'Analytics & SLA Performance',
    citizens: 'Manage Citizens',
    officers: 'Manage Department Officials',
    notifications: 'Higher Official Directives & Show-Cause Notices'
  };
  const titleEl = document.getElementById('adminPageTitle');
  if (titleEl) titleEl.textContent = titles[page] || page;

  if (page === 'complaints')    renderAdminTable();
  if (page === 'escalated')     renderEscalatedTable();
  if (page === 'resolved')      renderResolvedTable();
  if (page === 'reports')       renderReports();
  if (page === 'overview')      renderAdminOverview();
  if (page === 'citizens')      renderCitizensTable();
  if (page === 'officers')      renderOfficersTable();
  if (page === 'notifications') renderDepartmentDirectives();
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

/* ══════════════════════════════════════════════════════
   AI BEFORE & AFTER REPAIR PHOTO VERIFICATION ENGINE
══════════════════════════════════════════════════════ */
const REPAIR_PROOFS_DB = {
  Road: {
    title: 'Road Asphalt & Pothole Repair',
    beforeDesc: 'Deep pothole crater (75cm wide) on NH-47 lane, broken asphalt edges, exposed aggregate stones.',
    afterDesc: 'High-grade hot bituminous mix asphalt laid, compacted with mechanical roller, yellow road line repainted.',
    beforeSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#334155"/><rect y="0" width="400" height="40" fill="#64748b"/><line x1="0" y1="100" x2="400" y2="100" stroke="#facc15" stroke-dasharray="20,15" stroke-width="4"/><path d="M120,80 Q160,50 210,85 Q260,110 230,140 Q180,160 130,130 Z" fill="#0f172a" stroke="#1e293b" stroke-width="3"/><ellipse cx="170" cy="105" rx="35" ry="20" fill="#020617"/><circle cx="150" cy="95" r="4" fill="#64748b"/><circle cx="180" cy="115" r="5" fill="#475569"/><polygon points="310,130 330,130 320,90" fill="#ea580c"/><polygon points="316,110 324,110 322,100" fill="#ffffff"/><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">NH-47 Road • Pothole Defect</text></svg>`,
    afterSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#334155"/><rect y="0" width="400" height="40" fill="#64748b"/><line x1="0" y1="100" x2="400" y2="100" stroke="#facc15" stroke-dasharray="20,15" stroke-width="4"/><path d="M110,75 Q160,45 220,80 Q270,105 240,145 Q170,165 120,135 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2"/><line x1="110" y1="100" x2="240" y2="100" stroke="#facc15" stroke-width="4"/><rect x="290" y="80" width="85" height="40" rx="4" fill="rgba(22,163,74,0.25)" stroke="#16a34a" stroke-width="1.5"/><text x="300" y="105" fill="#16a34a" font-size="11" font-weight="bold" font-family="sans-serif">✓ PATCHED</text><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">NH-47 Road • Compacted Bitumen Laid</text></svg>`,
    mismatchSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#fef3c7"/><rect x="40" y="40" width="120" height="80" fill="#e2e8f0" stroke="#94a3b8"/><rect x="220" y="90" width="140" height="60" rx="8" fill="#d97706"/><circle cx="80" cy="150" r="25" fill="#16a34a"/><text x="14" y="26" fill="#b45309" font-size="11" font-weight="bold" font-family="sans-serif">⚠️ Unrelated Indoor Living Room (Mismatch)</text></svg>`
  },
  Water: {
    title: 'Water Supply Pipeline Repair',
    beforeDesc: 'Cracked 110mm PVC main pipe spraying water, pavement flooded, water loss reported.',
    afterDesc: 'Stainless-steel ductile repair clamp installed, pressure tested at 4.5 bar, trench refilled and paved.',
    beforeSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#475569"/><rect x="0" y="120" width="400" height="80" fill="#78350f"/><rect x="40" y="140" width="320" height="26" fill="#0284c7" rx="3"/><line x1="180" y1="140" x2="195" y2="166" stroke="#ef4444" stroke-width="3"/><path d="M185,140 Q170,90 200,60 Q230,90 195,140" fill="rgba(56,189,248,0.7)"/><circle cx="175" cy="80" r="8" fill="#38bdf8"/><circle cx="215" cy="70" r="6" fill="#38bdf8"/><ellipse cx="200" cy="180" rx="90" ry="14" fill="#0369a1"/><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Gandhi Nagar • High-Pressure Pipe Leak</text></svg>`,
    afterSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#475569"/><rect x="0" y="120" width="400" height="80" fill="#78350f"/><rect x="40" y="140" width="320" height="26" fill="#0284c7" rx="3"/><rect x="165" y="134" width="55" height="38" rx="4" fill="#94a3b8" stroke="#334155" stroke-width="2"/><circle cx="178" cy="153" r="3" fill="#0f172a"/><circle cx="207" cy="153" r="3" fill="#0f172a"/><rect x="290" y="80" width="85" height="40" rx="4" fill="rgba(22,163,74,0.25)" stroke="#16a34a" stroke-width="1.5"/><text x="300" y="105" fill="#16a34a" font-size="11" font-weight="bold" font-family="sans-serif">✓ COUPLING</text><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Gandhi Nagar • Clamp Fixed & Dry Trench</text></svg>`,
    mismatchSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#dcfce7"/><circle cx="200" cy="100" r="60" fill="#86efac"/><text x="14" y="26" fill="#15803d" font-size="11" font-weight="bold" font-family="sans-serif">⚠️ Unrelated Botanical Garden (Mismatch)</text></svg>`
  },
  Electricity: {
    title: 'TNEB Transformer & Cable Remediation',
    beforeDesc: 'Loose sparking 440V overhead distribution cable, humming vibration near residential building.',
    afterDesc: 'High-voltage insulators replaced, new distribution box fitted, cable conduits secured with earthing.',
    beforeSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#1e293b"/><rect x="60" y="20" width="18" height="180" fill="#94a3b8"/><rect x="45" y="60" width="48" height="55" fill="#334155" stroke="#ef4444" stroke-width="2"/><path d="M75,90 L180,140 L220,110 L320,170" stroke="#f59e0b" stroke-width="3" fill="none"/><circle cx="75" cy="90" r="14" fill="rgba(239,68,68,0.5)"/><polygon points="80,85 70,100 78,98 72,112 88,96 80,97" fill="#facc15"/><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Bhavani Main Rd • Transformer Hazard</text></svg>`,
    afterSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#1e293b"/><rect x="60" y="20" width="18" height="180" fill="#94a3b8"/><rect x="45" y="55" width="52" height="65" rx="4" fill="#475569" stroke="#10b981" stroke-width="2"/><line x1="75" y1="85" x2="350" y2="85" stroke="#0ea5e9" stroke-width="3"/><rect x="290" y="80" width="85" height="40" rx="4" fill="rgba(22,163,74,0.25)" stroke="#16a34a" stroke-width="1.5"/><text x="300" y="105" fill="#16a34a" font-size="11" font-weight="bold" font-family="sans-serif">✓ REPLACED</text><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Bhavani Main Rd • Insulated Conduits & Earthing</text></svg>`,
    mismatchSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#fbcfe8"/><text x="14" y="26" fill="#9d174d" font-size="11" font-weight="bold" font-family="sans-serif">⚠️ Unrelated Parking Garage (Mismatch)</text></svg>`
  },
  Garbage: {
    title: 'Sanitation Waste Clearance',
    beforeDesc: 'Overflowing municipal garbage containers, stray litter dumped on pedestrian walkway.',
    afterDesc: 'Waste cleared with hydraulic compactor vehicle, perimeter sanitized and treated with bleaching powder.',
    beforeSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#475569"/><rect x="70" y="70" width="90" height="100" rx="6" fill="#15803d"/><path d="M60,110 Q120,60 170,120 Q240,100 220,170 Q140,180 60,170 Z" fill="#78350f"/><circle cx="190" cy="140" r="15" fill="#dc2626"/><circle cx="210" cy="155" r="10" fill="#f59e0b"/><circle cx="160" cy="160" r="18" fill="#3b82f6"/><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Gobichetti Bus Stand • Garbage Dump</text></svg>`,
    afterSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#475569"/><rect x="0" y="140" width="400" height="60" fill="#cbd5e1"/><rect x="80" y="60" width="70" height="90" rx="6" fill="#16a34a" stroke="#14532d" stroke-width="2"/><rect x="170" y="60" width="70" height="90" rx="6" fill="#0284c7" stroke="#0c4a6e" stroke-width="2"/><rect x="290" y="80" width="85" height="40" rx="4" fill="rgba(22,163,74,0.25)" stroke="#16a34a" stroke-width="1.5"/><text x="305" y="105" fill="#16a34a" font-size="11" font-weight="bold" font-family="sans-serif">✓ SANITIZED</text><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Gobichetti Bus Stand • Sanitized & Cleared</text></svg>`,
    mismatchSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#e0e7ff"/><text x="14" y="26" fill="#3730a3" font-size="11" font-weight="bold" font-family="sans-serif">⚠️ Unrelated Dining Room (Mismatch)</text></svg>`
  },
  Drainage: {
    title: 'Storm Drainage Desilting & Reconstruction',
    beforeDesc: 'Drain channel choked with silt and sewage overflow, stagnant black water.',
    afterDesc: 'Desilted with suction tanker, channel lined with reinforced concrete, steel grating installed.',
    beforeSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#64748b"/><polygon points="40,40 360,40 320,180 80,180" fill="#1e293b"/><path d="M80,120 Q160,90 240,130 Q320,110 300,180 L100,180 Z" fill="#020617"/><circle cx="150" cy="140" r="10" fill="#ef4444"/><circle cx="210" cy="150" r="12" fill="#eab308"/><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Perundurai Main Rd • Silt Blockage</text></svg>`,
    afterSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#64748b"/><polygon points="40,40 360,40 320,180 80,180" fill="#334155"/><polygon points="80,140 320,140 310,180 90,180" fill="#0284c7"/><line x1="80" y1="60" x2="320" y2="60" stroke="#94a3b8" stroke-width="4"/><line x1="80" y1="90" x2="320" y2="90" stroke="#94a3b8" stroke-width="4"/><rect x="290" y="80" width="85" height="40" rx="4" fill="rgba(22,163,74,0.25)" stroke="#16a34a" stroke-width="1.5"/><text x="305" y="105" fill="#16a34a" font-size="11" font-weight="bold" font-family="sans-serif">✓ DESILTED</text><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Perundurai Main Rd • Flow Restored & Grated</text></svg>`,
    mismatchSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#ffedd5"/><text x="14" y="26" fill="#9a3412" font-size="11" font-weight="bold" font-family="sans-serif">⚠️ Unrelated Airport Runway (Mismatch)</text></svg>`
  },
  Collectorate: {
    title: 'Embankment & Riverbank Restoration',
    beforeDesc: 'River bank soil erosion and unauthorized excavation wheel ruts.',
    afterDesc: 'Stone-pitching retaining embankment wall constructed with barricade gate.',
    beforeSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#15803d"/><path d="M0,80 Q200,40 400,100 L400,200 L0,200 Z" fill="#0284c7"/><path d="M40,120 Q120,90 200,140 Q280,120 360,160" stroke="#78350f" stroke-width="14" fill="none"/><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Bhavani River • Sand Excavation</text></svg>`,
    afterSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#15803d"/><path d="M0,80 Q200,40 400,100 L400,200 L0,200 Z" fill="#0284c7"/><path d="M0,110 L400,120 L400,150 L0,140 Z" fill="#64748b" stroke="#334155" stroke-width="2"/><rect x="290" y="80" width="85" height="40" rx="4" fill="rgba(22,163,74,0.25)" stroke="#16a34a" stroke-width="1.5"/><text x="300" y="105" fill="#16a34a" font-size="11" font-weight="bold" font-family="sans-serif">✓ EMBANKED</text><text x="14" y="26" fill="#f8fafc" font-size="11" font-weight="bold" font-family="sans-serif">Bhavani River • Embankment Wall Built</text></svg>`,
    mismatchSvg: `<svg viewBox="0 0 400 200" style="width:100%;height:100%"><rect width="400" height="200" fill="#f3e8ff"/><text x="14" y="26" fill="#6b21a8" font-size="11" font-weight="bold" font-family="sans-serif">⚠️ Unrelated Mountain Ridge (Mismatch)</text></svg>`
  }
};

let currentVerifyingId = null;
let currentProofType = 'matched';
let isScanning = false;

function openRepairVerificationModal(id) {
  currentVerifyingId = id;
  currentProofType = 'matched';
  isScanning = false;

  const c = (typeof unifiedAdminData !== 'undefined' ? unifiedAdminData.find(x => x.id === id) : null) || 
            (typeof COMPLAINTS_DATA !== 'undefined' ? COMPLAINTS_DATA.find(x => x.id === id) : null);
  if (!c) return;

  const category = c.category || 'Road';
  const proofData = REPAIR_PROOFS_DB[category] || REPAIR_PROOFS_DB['Road'];

  const modal = document.getElementById('repairVerificationModal');
  const body = document.getElementById('repairModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <!-- Top Details Banner -->
    <div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:var(--radius);padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--blue);letter-spacing:.05em">${c.id} • ${c.category.toUpperCase()}</div>
        <div style="font-size:14px;font-weight:700;color:var(--text-primary);margin-top:2px">${c.title}</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">📍 ${c.address || c.location || c.constituency}</div>
      </div>
      <div style="text-align:right">
        <span class="status-badge status-progress">🔧 UNDER REPAIR</span>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Assigned: <strong>${c.dept || c.department}</strong></div>
      </div>
    </div>

    <!-- Proof Selection Controls for Demo/Officer -->
    <div class="sample-proofs-bar">
      <span style="font-size:12px;font-weight:700;color:var(--text-secondary)">Select Field Completion Proof:</span>
      <button type="button" class="sample-proof-btn active" id="btnProofMatched" onclick="setProofType('matched')">
        ✅ Genuine Repaired Condition (Identical Place)
      </button>
      <button type="button" class="sample-proof-btn" id="btnProofMismatch" onclick="setProofType('mismatch')">
        ⚠️ Test Mismatch Photo (Different Place)
      </button>
      <label class="sample-proof-btn" style="cursor:pointer;margin-bottom:0">
        📷 Upload Field Photo <input type="file" accept="image/*" style="display:none" onchange="handleCustomRepairPhoto(event)" />
      </label>
    </div>

    <!-- Side-by-Side Comparison Grid -->
    <div class="verify-grid">
      <!-- Left: Before Repair (Citizen Report) -->
      <div class="verify-card">
        <div class="verify-card-header">
          <span>📷 1. Before Repair (Citizen Incident Proof)</span>
          <span style="font-size:10px;background:#dc2626;padding:2px 6px;border-radius:4px">DAMAGED</span>
        </div>
        <div class="verify-photo-wrap" id="beforePhotoWrap">
          <div class="verify-badge-tag">Initial Report</div>
          <div class="verify-scanner-line" id="scannerLineBefore"></div>
          ${proofData.beforeSvg}
          <div class="verify-gps-overlay">
            <span>📍 ${c.lat || 11.3410}°N, ${c.lng || 77.7172}°E</span>
            <span>📅 ${c.submitted || c.submittedDate || '2024-01-15'}</span>
          </div>
        </div>
        <div class="verify-card-footer">
          <div style="font-weight:600;color:var(--text-primary)">Reported Defect State</div>
          <div style="font-size:11px;color:var(--text-muted)">Original condition captured by citizen camera with GPS lock.</div>
        </div>
      </div>

      <!-- Right: After Repair (Official Work Proof) -->
      <div class="verify-card">
        <div class="verify-card-header" style="background:#1e3a8a">
          <span>🛠️ 2. After Repair (Department Work Proof)</span>
          <span style="font-size:10px;background:#16a34a;padding:2px 6px;border-radius:4px" id="afterCardBadge">REPAIRED</span>
        </div>
        <div class="verify-photo-wrap" id="afterPhotoWrap">
          <div class="verify-badge-tag" id="afterPhotoTag">Work Done Photo</div>
          <div class="verify-scanner-line" id="scannerLineAfter"></div>
          <div id="afterPhotoContainer" style="width:100%;height:100%">${proofData.afterSvg}</div>
          <div class="verify-gps-overlay">
            <span id="afterGpsLabel">📍 ${c.lat || 11.3410}°N, ${c.lng || 77.7172}°E (0.00km Δ)</span>
            <span>📅 Today (Just now)</span>
          </div>
        </div>
        <div class="verify-card-footer">
          <div style="font-weight:600;color:var(--text-primary)" id="afterCardFooterTitle">Field Engineer Resolution Evidence</div>
          <div style="font-size:11px;color:var(--text-muted)" id="afterCardFooterDesc">Post-repair photo submitted by field crew for AI inspection.</div>
        </div>
      </div>
    </div>

    <!-- AI Verification Engine Panel -->
    <div class="ai-results-panel">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:20px">🤖</span>
          <div>
            <div style="font-size:13px;font-weight:700;color:#0f172a">AI Visual Place &amp; Condition Verification</div>
            <div style="font-size:11px;color:var(--text-muted)">SIFT Keypoint Spatial Geometry + Defect Remediation Classifier</div>
          </div>
        </div>
        <button type="button" class="btn-primary" id="btnRunAIScan" style="width:auto;padding:8px 18px;background:var(--blue);font-size:12.5px" onclick="runAIRepairScan()">
          🔍 Run AI Verification
        </button>
      </div>

      <!-- Telemetry Logs & Progress -->
      <div id="aiScanLogs" style="display:none;margin-top:12px;padding:10px 12px;background:#0f172a;color:#38bdf8;border-radius:6px;font-family:monospace;font-size:11px;line-height:1.6"></div>

      <!-- Result Metrics Gauges -->
      <div id="aiResultsGauges" style="display:none">
        <div class="ai-metrics-row">
          <div class="ai-metric-box">
            <div class="ai-metric-val" id="metricPlaceMatch">--</div>
            <div class="ai-metric-label">📍 Place Identity Match</div>
          </div>
          <div class="ai-metric-box">
            <div class="ai-metric-val" id="metricRepairCondition">--</div>
            <div class="ai-metric-label">🛠️ Defect Remediated</div>
          </div>
          <div class="ai-metric-box">
            <div class="ai-metric-val" id="metricTamperCheck" style="color:#16a34a">PASS</div>
            <div class="ai-metric-label">🛡️ GPS &amp; Timestamp Check</div>
          </div>
        </div>

        <div id="aiVerdictBox" class="ai-status-verdict"></div>
      </div>
    </div>

    <!-- Modal Footer Actions -->
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px">
      <button type="button" class="btn-secondary" onclick="closeRepairModal()">Cancel</button>
      <button type="button" class="btn-primary" id="btnApproveCompletion" disabled style="width:auto;padding:9px 24px;background:#94a3b8;cursor:not-allowed" onclick="confirmResolveComplaint('${c.id}')">
        🔒 Set Task as Completed (Verify First)
      </button>
    </div>
  `;

  modal.classList.add('show');
}

function closeRepairModal() {
  const modal = document.getElementById('repairVerificationModal');
  if (modal) modal.classList.remove('show');
}

function setProofType(type) {
  currentProofType = type;
  const btnMatched = document.getElementById('btnProofMatched');
  const btnMismatch = document.getElementById('btnProofMismatch');
  if (btnMatched) btnMatched.classList.toggle('active', type === 'matched');
  if (btnMismatch) btnMismatch.classList.toggle('active', type === 'mismatch');

  const c = (typeof unifiedAdminData !== 'undefined' ? unifiedAdminData.find(x => x.id === currentVerifyingId) : null) || 
            (typeof COMPLAINTS_DATA !== 'undefined' ? COMPLAINTS_DATA.find(x => x.id === currentVerifyingId) : null);
  if (!c) return;

  const category = c.category || 'Road';
  const proofData = REPAIR_PROOFS_DB[category] || REPAIR_PROOFS_DB['Road'];
  const container = document.getElementById('afterPhotoContainer');
  const afterCardBadge = document.getElementById('afterCardBadge');
  const afterGpsLabel = document.getElementById('afterGpsLabel');

  if (container) {
    if (type === 'matched') {
      container.innerHTML = proofData.afterSvg;
      if (afterCardBadge) { afterCardBadge.textContent = 'REPAIRED'; afterCardBadge.style.background = '#16a34a'; }
      if (afterGpsLabel) afterGpsLabel.textContent = `📍 ${c.lat || 11.3410}°N, ${c.lng || 77.7172}°E (0.00km Δ)`;
    } else {
      container.innerHTML = proofData.mismatchSvg;
      if (afterCardBadge) { afterCardBadge.textContent = 'MISMATCH'; afterCardBadge.style.background = '#dc2626'; }
      if (afterGpsLabel) afterGpsLabel.textContent = `📍 13.0827°N, 80.2707°E (340km Δ Mismatch)`;
    }
  }

  // Reset scan gauges
  const gauges = document.getElementById('aiResultsGauges');
  const logs = document.getElementById('aiScanLogs');
  if (gauges) gauges.style.display = 'none';
  if (logs) logs.style.display = 'none';
  const btnApprove = document.getElementById('btnApproveCompletion');
  if (btnApprove) {
    btnApprove.disabled = true;
    btnApprove.style.background = '#94a3b8';
    btnApprove.style.cursor = 'not-allowed';
    btnApprove.textContent = '🔒 Set Task as Completed (Verify First)';
  }
}

function handleCustomRepairPhoto(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const container = document.getElementById('afterPhotoContainer');
    if (container) {
      container.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover" />`;
    }
    showToast('📸 Field photo loaded! Click "Run AI Verification"', 'info');
  };
  reader.readAsDataURL(file);
}

function runAIRepairScan() {
  if (isScanning) return;
  isScanning = true;

  const btnScan = document.getElementById('btnRunAIScan');
  if (btnScan) { btnScan.disabled = true; btnScan.textContent = '⏳ Scanning Photos...'; }

  const scanBefore = document.getElementById('scannerLineBefore');
  const scanAfter = document.getElementById('scannerLineAfter');
  if (scanBefore) scanBefore.style.display = 'block';
  if (scanAfter) scanAfter.style.display = 'block';

  const logs = document.getElementById('aiScanLogs');
  if (logs) {
    logs.style.display = 'block';
    logs.innerHTML = `<div>🔍 [STAGE 1/4] Extracting 2,048 deep visual feature descriptors...</div>`;
  }

  setTimeout(() => {
    if (logs) logs.innerHTML += `<div>📍 [STAGE 2/4] SIFT Keypoint alignment &amp; background geometry correlation...</div>`;
  }, 600);

  setTimeout(() => {
    if (logs) logs.innerHTML += `<div>🛠️ [STAGE 3/4] Defect region segmentation &amp; repair material detection...</div>`;
  }, 1200);

  setTimeout(() => {
    if (logs) logs.innerHTML += `<div>🛡️ [STAGE 4/4] EXIF GPS proximity validation &amp; anti-fraud verification...</div>`;
  }, 1800);

  setTimeout(() => {
    isScanning = false;
    if (scanBefore) scanBefore.style.display = 'none';
    if (scanAfter) scanAfter.style.display = 'none';
    if (btnScan) { btnScan.disabled = false; btnScan.textContent = '🔄 Re-Run AI Scan'; }

    const isMatched = currentProofType === 'matched';
    const placeScore = isMatched ? (97.8 + Math.random() * 1.8).toFixed(1) : (12.4 + Math.random() * 6).toFixed(1);
    const repairScore = isMatched ? (96.5 + Math.random() * 2.5).toFixed(1) : (15.2 + Math.random() * 8).toFixed(1);

    const gauges = document.getElementById('aiResultsGauges');
    if (gauges) gauges.style.display = 'block';

    const pMatchEl = document.getElementById('metricPlaceMatch');
    const rCondEl = document.getElementById('metricRepairCondition');
    const tCheckEl = document.getElementById('metricTamperCheck');
    const verdictEl = document.getElementById('aiVerdictBox');
    const btnApprove = document.getElementById('btnApproveCompletion');

    if (pMatchEl) {
      pMatchEl.textContent = `${placeScore}%`;
      pMatchEl.style.color = isMatched ? '#16a34a' : '#dc2626';
    }
    if (rCondEl) {
      rCondEl.textContent = `${repairScore}%`;
      rCondEl.style.color = isMatched ? '#16a34a' : '#dc2626';
    }
    if (tCheckEl) {
      tCheckEl.textContent = isMatched ? 'PASS' : 'FAIL';
      tCheckEl.style.color = isMatched ? '#16a34a' : '#dc2626';
    }

    if (verdictEl) {
      if (isMatched) {
        verdictEl.className = 'ai-status-verdict ai-verdict-success';
        verdictEl.innerHTML = `
          <span>✅</span>
          <div>
            <div>VERIFIED: Identical Location &amp; Defect Repair Confirmed</div>
            <div style="font-size:11px;font-weight:400;color:#166534">Both places match within 98% spatial confidence. Repair condition verified authentic.</div>
          </div>
        `;
        if (btnApprove) {
          btnApprove.disabled = false;
          btnApprove.style.background = '#16a34a';
          btnApprove.style.cursor = 'pointer';
          btnApprove.innerHTML = '✅ Approve &amp; Set Task as Completed →';
        }
      } else {
        verdictEl.className = 'ai-status-verdict ai-verdict-failed';
        verdictEl.innerHTML = `
          <span>❌</span>
          <div>
            <div>REJECTED: Location Mismatch / Unverified Repair Condition</div>
            <div style="font-size:11px;font-weight:400;color:#991b1b">The submitted after-repair photo belongs to a different place (${placeScore}% match). Cannot resolve.</div>
          </div>
        `;
        if (btnApprove) {
          btnApprove.disabled = true;
          btnApprove.style.background = '#94a3b8';
          btnApprove.style.cursor = 'not-allowed';
          btnApprove.textContent = '🚫 Completion Blocked (Mismatch)';
        }
      }
    }
  }, 2200);
}

function confirmResolveComplaint(id) {
  const c = (typeof unifiedAdminData !== 'undefined' ? unifiedAdminData.find(x => x.id === id) : null) || 
            (typeof COMPLAINTS_DATA !== 'undefined' ? COMPLAINTS_DATA.find(x => x.id === id) : null);
  if (!c) return;

  c.status = 'resolved';
  c.resolvedDate = new Date().toISOString().split('T')[0];
  c.escalated = false;
  c.resolutionProof = {
    verified: true,
    placeScore: '98.4%',
    repairScore: '97.2%',
    timestamp: new Date().toLocaleString(),
    officer: 'Er. Field Inspection Team'
  };

  // Sync with COMPLAINTS_DATA
  const globalComp = (typeof COMPLAINTS_DATA !== 'undefined') ? COMPLAINTS_DATA.find(x => x.id === id) : null;
  if (globalComp) {
    globalComp.status = 'resolved';
    globalComp.resolvedDate = c.resolvedDate;
    globalComp.escalated = false;
    globalComp.resolutionProof = c.resolutionProof;
  }

  closeRepairModal();
  showToast(`🎉 ${id} Verified by AI & Work Marked Completed!`, 'success');

  if (typeof renderAdminOverview === 'function') renderAdminOverview();
  if (typeof renderAllComplaints === 'function') renderAllComplaints();
  if (typeof renderRecentComplaints === 'function') renderRecentComplaints();
  if (typeof renderSlaTracker === 'function') renderSlaTracker();
}

function updateAdminStatus(id, prefix = 'sel-') {
  const sel = document.getElementById(`${prefix}${id}`) || document.getElementById(`sel-${id}`);
  if (!sel) return;
  const newStatus = sel.value;
  if (newStatus === 'resolved') {
    openRepairVerificationModal(id);
    return;
  }
  const idx = unifiedAdminData.findIndex(c => c.id === id);
  if (idx === -1) return;
  unifiedAdminData[idx].status = newStatus;
  showToast(`✅ ${id} status updated to "${newStatus.toUpperCase()}"`, 'success');
  renderAdminOverview();
}

function quickResolve(id) {
  openRepairVerificationModal(id);
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

/* ══════════════════════════════════════════════════════
   MASTER USER MANAGEMENT (CITIZENS & OFFICIALS)
══════════════════════════════════════════════════════ */
let CITIZENS_DATA = [
  { id: 'CIT-1001', name: 'Ramesh Kumar', phone: '+91 98765 43210', constituency: 'Erode East', registeredDate: '2024-05-12', complaintsCount: 7, status: 'active' },
  { id: 'CIT-1002', name: 'Priya Sundaram', phone: '+91 98421 11223', constituency: 'Erode West', registeredDate: '2024-05-18', complaintsCount: 4, status: 'active' },
  { id: 'CIT-1003', name: 'Karthik Raja', phone: '+91 97890 55667', constituency: 'Bhavani', registeredDate: '2024-06-01', complaintsCount: 2, status: 'active' },
  { id: 'CIT-1004', name: 'Anitha Murugesan', phone: '+91 94432 99887', constituency: 'Gobichettipalayam', registeredDate: '2024-06-15', complaintsCount: 5, status: 'active' },
  { id: 'CIT-1005', name: 'Vigneshwaran M', phone: '+91 99520 44332', constituency: 'Perundurai', registeredDate: '2024-07-02', complaintsCount: 1, status: 'suspended' },
  { id: 'CIT-1006', name: 'Deepa Selvaraj', phone: '+91 96290 88776', constituency: 'Modakkurichi', registeredDate: '2024-07-20', complaintsCount: 3, status: 'active' },
  { id: 'CIT-1007', name: 'Senthil Nathan', phone: '+91 97150 22334', constituency: 'Anthiyur', registeredDate: '2024-08-01', complaintsCount: 2, status: 'active' },
  { id: 'CIT-1008', name: 'Kavitha Balan', phone: '+91 98650 77889', constituency: 'Sathyamangalam', registeredDate: '2024-08-05', complaintsCount: 1, status: 'active' },
];

let OFFICERS_DATA = [
  { id: 'OFF-01', name: 'Er. S. Murugan', dept: 'Roads & Highways', role: 'Executive Engineer (EE)', phone: '+91 94433 12001', activeTasks: 5, status: 'active' },
  { id: 'OFF-02', name: 'Er. R. Soundararajan', dept: 'Water Supply', role: 'Assistant Executive Engineer', phone: '+91 94433 12002', activeTasks: 3, status: 'active' },
  { id: 'OFF-03', name: 'Thiru. K. Velusamy', dept: 'Sanitation', role: 'Sanitary Inspector', phone: '+91 94433 12003', activeTasks: 4, status: 'active' },
  { id: 'OFF-04', name: 'Er. M. Gunasekaran', dept: 'Tamil Nadu Electricity Board', role: 'Assistant Engineer (O&M)', phone: '+91 94433 12004', activeTasks: 3, status: 'active' },
  { id: 'OFF-05', name: 'Er. P. Dhanalakshmi', dept: 'Drainage', role: 'Assistant Engineer (Public Works)', phone: '+91 94433 12005', activeTasks: 2, status: 'leave' },
  { id: 'OFF-06', name: 'Dr. V. Rajendran, DRO', dept: 'District Collectorate', role: 'District Revenue Officer', phone: '+91 94433 12000', activeTasks: 8, status: 'active' },
];

/* ── Render Citizens Management Table ── */
function renderCitizensTable() {
  const tbody = document.getElementById('citizensTableBody');
  if (!tbody) return;

  const total = CITIZENS_DATA.length;
  const active = CITIZENS_DATA.filter(c => c.status === 'active').length;
  const suspended = CITIZENS_DATA.filter(c => c.status === 'suspended').length;
  const totalComplaints = CITIZENS_DATA.reduce((acc, c) => acc + c.complaintsCount, 0);

  const statsRow = document.getElementById('citizenStatsRow');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="admin-stat-card"><div class="value" style="color:var(--blue)">${total}</div><div class="label">Total Registered Citizens</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--success)">${active}</div><div class="label">Active Citizens</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--danger)">${suspended}</div><div class="label">Suspended Accounts</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--warning)">${totalComplaints}</div><div class="label">Total Grievances Filed</div></div>
    `;
  }

  filterCitizensTable();
}

function filterCitizensTable() {
  const tbody = document.getElementById('citizensTableBody');
  if (!tbody) return;

  const q = (document.getElementById('citizenSearch')?.value || '').toLowerCase();
  const cConst = document.getElementById('filterCitizenConst')?.value || '';
  const cStatus = document.getElementById('filterCitizenStatus')?.value || '';

  const filtered = CITIZENS_DATA.filter(c => {
    if (q && !c.name.toLowerCase().includes(q) && !c.phone.toLowerCase().includes(q) && !c.id.toLowerCase().includes(q)) return false;
    if (cConst && c.constituency !== cConst) return false;
    if (cStatus && c.status !== cStatus) return false;
    return true;
  });

  const countEl = document.getElementById('citizenTableCount');
  if (countEl) countEl.textContent = `${filtered.length} citizens found`;

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><code style="font-size:11px;color:var(--blue);font-weight:700">${c.id}</code></td>
      <td>
        <div style="font-weight:600;color:var(--text-primary)">${c.name}</div>
        <div style="font-size:11px;color:var(--text-muted)">Registered: ${c.registeredDate}</div>
      </td>
      <td><span style="font-size:12px;font-family:monospace">${c.phone}</span></td>
      <td><span style="font-size:12px;font-weight:500">📍 ${c.constituency}</span></td>
      <td><span style="font-size:12px">${c.registeredDate}</span></td>
      <td><span class="badge" style="background:#eff6ff;color:var(--blue);font-weight:700">${c.complaintsCount} Submissions</span></td>
      <td>
        <span class="status-badge ${c.status === 'active' ? 'status-resolved' : 'status-escalated'}">
          ${c.status === 'active' ? '🟢 ACTIVE' : '🔴 SUSPENDED'}
        </span>
      </td>
      <td>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn-update" style="font-size:11px;padding:3px 8px;background:${c.status === 'active' ? '#dc2626' : '#16a34a'}" onclick="toggleCitizenStatus('${c.id}')">
            ${c.status === 'active' ? 'Suspend' : 'Activate'}
          </button>
          <button class="btn-secondary" style="font-size:11px;padding:3px 8px" onclick="resetCitizenPass('${c.id}')" title="Send Password Reset Link">
            🔑 Reset
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleCitizenStatus(id) {
  const c = CITIZENS_DATA.find(item => item.id === id);
  if (!c) return;
  c.status = c.status === 'active' ? 'suspended' : 'active';
  showToast(`Account ${id} (${c.name}) set to ${c.status.toUpperCase()}`, c.status === 'active' ? 'success' : 'warning');
  renderCitizensTable();
}

function resetCitizenPass(id) {
  const c = CITIZENS_DATA.find(item => item.id === id);
  if (!c) return;
  showToast(`🔑 Password reset SMS link sent to ${c.phone}`, 'info');
}

/* ── Render Officers Management Table ── */
function renderOfficersTable() {
  const tbody = document.getElementById('officersTableBody');
  if (!tbody) return;

  const total = OFFICERS_DATA.length;
  const active = OFFICERS_DATA.filter(o => o.status === 'active').length;
  const leave = OFFICERS_DATA.filter(o => o.status === 'leave').length;
  const deptsCount = new Set(OFFICERS_DATA.map(o => o.dept)).size;

  const statsRow = document.getElementById('officerStatsRow');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="admin-stat-card"><div class="value" style="color:var(--blue)">${total}</div><div class="label">Total Officials</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--success)">${active}</div><div class="label">Active On Duty</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--warning)">${leave}</div><div class="label">On Leave</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--navy)">${deptsCount}</div><div class="label">Departments Covered</div></div>
    `;
  }

  filterOfficersTable();
}

function filterOfficersTable() {
  const tbody = document.getElementById('officersTableBody');
  if (!tbody) return;

  const q = (document.getElementById('officerSearch')?.value || '').toLowerCase();
  const oDept = document.getElementById('filterOfficerDept')?.value || '';

  const filtered = OFFICERS_DATA.filter(o => {
    if (q && !o.name.toLowerCase().includes(q) && !o.role.toLowerCase().includes(q) && !o.id.toLowerCase().includes(q)) return false;
    if (oDept && o.dept !== oDept) return false;
    return true;
  });

  const countEl = document.getElementById('officerTableCount');
  if (countEl) countEl.textContent = `${filtered.length} officers found`;

  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td><code style="font-size:11px;color:var(--blue);font-weight:700">${o.id}</code></td>
      <td>
        <div style="font-weight:700;color:var(--text-primary)">${o.name}</div>
      </td>
      <td><span style="font-size:12px;font-weight:600;color:var(--blue)">${o.dept}</span></td>
      <td><span style="font-size:12px">${o.role}</span></td>
      <td><span style="font-size:12px;font-family:monospace">${o.phone}</span></td>
      <td><span class="badge" style="background:#fef3c7;color:#b45309;font-weight:700">${o.activeTasks} Active Tasks</span></td>
      <td>
        <span class="status-badge ${o.status === 'active' ? 'status-resolved' : 'status-review'}">
          ${o.status === 'active' ? '🟢 ON DUTY' : '🟡 ON LEAVE'}
        </span>
      </td>
      <td>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="btn-update" style="font-size:11px;padding:3px 8px;background:${o.status === 'active' ? '#ca8a04' : '#16a34a'}" onclick="toggleOfficerStatus('${o.id}')">
            ${o.status === 'active' ? 'Mark Leave' : 'Mark On Duty'}
          </button>
          <button class="btn-secondary" style="font-size:11px;padding:3px 8px;color:var(--danger)" onclick="deleteOfficer('${o.id}')" title="Revoke access">
            ✕ Remove
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleOfficerStatus(id) {
  const o = OFFICERS_DATA.find(item => item.id === id);
  if (!o) return;
  o.status = o.status === 'active' ? 'leave' : 'active';
  showToast(`Officer ${o.name} duty status updated to ${o.status.toUpperCase()}`, 'info');
  renderOfficersTable();
}

function deleteOfficer(id) {
  const idx = OFFICERS_DATA.findIndex(item => item.id === id);
  if (idx === -1) return;
  const name = OFFICERS_DATA[idx].name;
  if (confirm(`Are you sure you want to revoke official access for ${name} (${id})?`)) {
    OFFICERS_DATA.splice(idx, 1);
    showToast(`🗑️ Access revoked for ${name}`, 'warning');
    renderOfficersTable();
  }
}

/* ── Add Officer Modal ── */
function openAddOfficerModal() {
  const modal = document.getElementById('addOfficerModal');
  if (modal) modal.classList.add('show');
}

function closeAddOfficerModal() {
  const modal = document.getElementById('addOfficerModal');
  if (modal) modal.classList.remove('show');
}

function handleSaveOfficer(e) {
  e.preventDefault();
  const name = document.getElementById('newOfficerName').value.trim();
  const dept = document.getElementById('newOfficerDept').value;
  const role = document.getElementById('newOfficerRole').value.trim();
  const phone = document.getElementById('newOfficerPhone').value.trim();

  if (!name || !dept || !role || !phone) {
    showToast('Please fill all required officer details', 'error');
    return;
  }

  const newId = `OFF-0${OFFICERS_DATA.length + 1}`;
  OFFICERS_DATA.push({
    id: newId,
    name: name,
    dept: dept,
    role: role,
    phone: phone,
    activeTasks: 0,
    status: 'active'
  });

  showToast(`✅ Registered new Department Officer: ${name} (${newId})`, 'success');
  closeAddOfficerModal();
  document.getElementById('formAddOfficer').reset();
  renderOfficersTable();
}

/* ══════════════════════════════════════════════════════
   HIGHER OFFICIAL DIRECTIVES & SHOW-CAUSE ALERTS
══════════════════════════════════════════════════════ */
let DEPARTMENT_DIRECTIVES_DATA = [
  {
    id: 'DIR-2024-001',
    sender: '🏛️ Office of the District Collector, Erode',
    senderRole: 'District Collector & Magistrate',
    dept: 'Roads & Highways',
    targetComplaintId: 'CMP-2024-001',
    complaintTitle: 'Large pothole on NH-47 near market',
    complaintLocation: 'NH-47, Market Junction, Erode East',
    lat: 11.3410,
    lng: 77.7172,
    severity: 'CRITICAL',
    type: 'show_cause',
    subject: '⚠️ Show-Cause Notice: Unresolved NH-47 Pothole SLA Breach',
    message: 'Grievance CMP-2024-001 has been pending for over 72 hours exceeding the mandatory SLA. Immediate field repair team must be mobilized within 12 hours. Submit compliance report before 5:00 PM today.',
    deadline: 'Today, 5:00 PM',
    time: '25 mins ago',
    read: false,
    status: 'action_required'
  },
  {
    id: 'DIR-2024-002',
    sender: '🚨 Master Administrator (Sanjai)',
    senderRole: 'District Nodal Grievance Controller',
    dept: 'Tamil Nadu Electricity Board',
    targetComplaintId: 'CMP-2024-007',
    complaintTitle: 'Electrical wire hanging dangerously low',
    complaintLocation: 'Mettur Road, Erode East',
    lat: 11.3420,
    lng: 77.7130,
    severity: 'EMERGENCY',
    type: 'immediate_action',
    subject: '⚡ Emergency Safety Directive: Live High Voltage Hazard',
    message: 'Immediate safety hazard reported by citizens in Erode East. High probability of electric shock. Line inspector must isolate and secure overhead cable immediately.',
    deadline: 'Immediate (within 2 hours)',
    time: '1 hour ago',
    read: false,
    status: 'action_required'
  },
  {
    id: 'DIR-2024-003',
    sender: '🏛️ District Revenue Officer (DRO), Erode',
    senderRole: 'Public Grievance Appellate Authority',
    dept: 'Water Supply',
    targetComplaintId: 'CMP-2024-005',
    complaintTitle: 'Blocked drainage causing waterlogging',
    complaintLocation: 'Bus Stand Road, Gobichettipalayam',
    lat: 11.3445,
    lng: 77.7210,
    severity: 'HIGH',
    type: 'show_cause',
    subject: '🌊 Urgent Drainage De-silting Directive',
    message: 'Monsoon waterlogging risk near Gobichettipalayam Bus Stand. Deploy suction pump and clearing crew immediately.',
    deadline: 'Tomorrow, 10:00 AM',
    time: '3 hours ago',
    read: true,
    status: 'acknowledged'
  },
  {
    id: 'DIR-2024-004',
    sender: '🚨 Master Administrator (Sanjai)',
    senderRole: 'District Nodal Grievance Controller',
    dept: 'Sanitation',
    targetComplaintId: 'CMP-2024-009',
    complaintTitle: 'Open garbage dumping near residential area',
    complaintLocation: 'Kaveri River Bank Rd, Bhavani',
    lat: 11.3460,
    lng: 77.7175,
    severity: 'HIGH',
    type: 'escalation',
    subject: '🗑️ Sanitation Compliance Notice: River Bank Solid Waste',
    message: 'River bank contamination risk. Clear solid waste and install warning signboard immediately.',
    deadline: 'Tomorrow, 1:00 PM',
    time: '5 hours ago',
    read: true,
    status: 'action_required'
  }
];

let currentDirectiveFilter = 'all';

function filterDirectives(type, btn) {
  currentDirectiveFilter = type;
  document.querySelectorAll('#admin-page-notifications .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderDepartmentDirectives();
}

function updateAdminNotifBadges() {
  const activeDept = currentAdminDept;
  const filtered = DEPARTMENT_DIRECTIVES_DATA.filter(d => {
    if (activeDept === 'Collectorate' || activeDept === 'ALL') return true;
    return d.dept.toLowerCase().includes(activeDept.toLowerCase());
  });

  const unreadCount = filtered.filter(d => !d.read || d.status === 'action_required').length;
  
  const sideBadge = document.getElementById('adminNotifSidebarCount');
  if (sideBadge) {
    sideBadge.textContent = unreadCount;
    sideBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  const topDot = document.getElementById('adminTopNotifDot');
  if (topDot) {
    topDot.style.display = unreadCount > 0 ? 'block' : 'none';
  }
}

function renderDepartmentDirectives() {
  const container = document.getElementById('departmentDirectivesList');
  if (!container) return;

  updateAdminNotifBadges();

  const activeDept = currentAdminDept;
  const deptDirectives = DEPARTMENT_DIRECTIVES_DATA.filter(d => {
    if (activeDept === 'Collectorate' || activeDept === 'ALL') return true;
    return d.dept.toLowerCase().includes(activeDept.toLowerCase());
  });

  // KPI Stats
  const total = deptDirectives.length;
  const actionReq = deptDirectives.filter(d => d.status === 'action_required').length;
  const ack = deptDirectives.filter(d => d.status === 'acknowledged').length;
  const compliant = deptDirectives.filter(d => d.status === 'compliant').length;

  const statsRow = document.getElementById('directiveStatsRow');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="admin-stat-card"><div class="value" style="color:#dc2626">${total}</div><div class="label">Total Official Directives</div></div>
      <div class="admin-stat-card"><div class="value" style="color:#ef4444">${actionReq}</div><div class="label">Action Overdue / Required</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--warning)">${ack}</div><div class="label">Acknowledged &amp; In-Progress</div></div>
      <div class="admin-stat-card"><div class="value" style="color:var(--success)">${compliant}</div><div class="label">Compliance Verified</div></div>
    `;
  }

  const filtered = deptDirectives.filter(d => {
    if (currentDirectiveFilter === 'all') return true;
    if (currentDirectiveFilter === 'show_cause') return d.type === 'show_cause';
    if (currentDirectiveFilter === 'immediate_action') return d.type === 'immediate_action';
    if (currentDirectiveFilter === 'compliant') return d.status === 'compliant';
    return true;
  });

  const countText = document.getElementById('directivesCountText');
  if (countText) countText.textContent = `${filtered.length} active directives for ${activeDept === 'Collectorate' ? 'All Departments' : activeDept}`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:var(--radius-lg);padding:40px 20px;text-align:center">
        <div style="font-size:36px;margin-bottom:10px">✅</div>
        <div style="font-size:16px;font-weight:700;color:#0f172a">No Pending Directives or Show-Cause Notices</div>
        <div style="font-size:13px;color:#64748b;margin-top:4px">All department grievances are within acceptable SLA time limits.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => {
    const isOverdue = d.status === 'action_required';
    const borderColor = d.type === 'show_cause' ? '#ef4444' : (d.type === 'immediate_action' ? '#dc2626' : '#f59e0b');
    const badgeBg = d.type === 'show_cause' ? '#fef2f2' : (d.type === 'immediate_action' ? '#fee2e2' : '#fef3c7');
    const badgeColor = d.type === 'show_cause' ? '#dc2626' : (d.type === 'immediate_action' ? '#991b1b' : '#b45309');
    const typeLabel = d.type === 'show_cause' ? '⚠️ SHOW-CAUSE MEMO' : (d.type === 'immediate_action' ? '⚡ EMERGENCY DIRECTIVE' : '🚨 COLLECTORATE ESCALATION');

    return `
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-left:5px solid ${borderColor};border-radius:var(--radius-lg);padding:22px 24px;box-shadow:0 2px 6px rgba(0,0,0,0.03);position:relative">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="background:${badgeBg};color:${badgeColor};font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;letter-spacing:0.04em">
              ${typeLabel}
            </span>
            <code style="font-size:12px;font-weight:700;color:var(--blue)">${d.id}</code>
            <span style="font-size:12px;color:var(--text-muted)">• Issued ${d.time}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:12px;font-weight:700;color:#dc2626;background:#fef2f2;padding:3px 8px;border-radius:4px;border:1px solid #fecaca">
              ⏱️ Deadline: ${d.deadline}
            </span>
            <span class="status-badge ${d.status === 'compliant' ? 'status-resolved' : (d.status === 'acknowledged' ? 'status-progress' : 'status-escalated')}">
              ${d.status === 'compliant' ? '✅ COMPLIED' : (d.status === 'acknowledged' ? '⚡ ACKNOWLEDGED' : '🔴 ACTION OVERDUE')}
            </span>
          </div>
        </div>

        <div style="margin-bottom:12px">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px">${d.subject}</h3>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:var(--radius-sm);padding:12px 16px;font-size:13px;color:#334155;line-height:1.6">
            <div style="margin-bottom:6px"><strong>🏛️ From:</strong> ${d.sender} <span style="color:#64748b">(${d.senderRole})</span></div>
            <div style="margin-bottom:6px"><strong>🏢 Target:</strong> Incharge, <span style="color:var(--blue);font-weight:600">${d.dept}</span></div>
            <div style="margin-bottom:6px"><strong>📋 Target Grievance:</strong> <code style="color:var(--blue);font-weight:700">${d.targetComplaintId}</code> — ${d.complaintTitle} (📍 ${d.complaintLocation})</div>
            <div style="padding-top:8px;border-top:1px dashed #cbd5e1;color:#1e293b;font-weight:500">
              💬 <em>"${d.message}"</em>
            </div>
          </div>
        </div>

        <!-- Action Toolbar -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;border-top:1px solid #f1f5f9;flex-wrap:wrap;gap:10px">
          <div style="display:flex;gap:8px">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}" target="_blank" class="btn-nav-gmaps" style="padding:6px 14px">
              🚗 Travel Direction (Google Maps)
            </a>
            <button class="btn-map-pin" onclick="openLocationModal('${d.targetComplaintId}', '${(d.complaintTitle||'').replace(/'/g,"\\'")}', '${(d.complaintLocation||'').replace(/'/g,"\\'")}', ${d.lat}, ${d.lng})">
              📍 Inspect Pin
            </button>
          </div>

          <div style="display:flex;gap:8px">
            ${d.status === 'action_required' ? `
              <button class="btn-update" style="background:#ca8a04;padding:6px 14px" onclick="acknowledgeDirective('${d.id}')">
                ⚡ Acknowledge &amp; Dispatch Crew
              </button>
            ` : ''}
            ${d.status !== 'compliant' ? `
              <button class="btn-update" style="background:#16a34a;padding:6px 16px" onclick="complyDirective('${d.id}')">
                ✅ Submit Compliance &amp; Close
              </button>
            ` : `
              <span style="font-size:12.5px;font-weight:700;color:var(--success);display:flex;align-items:center;gap:4px">
                ✅ Compliance report verified &amp; approved by District Collectorate
              </span>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function acknowledgeDirective(id) {
  const d = DEPARTMENT_DIRECTIVES_DATA.find(item => item.id === id);
  if (!d) return;
  d.status = 'acknowledged';
  d.read = true;
  showToast(`⚡ Directive ${id} acknowledged. Field repair crew dispatch recorded.`, 'info');
  renderDepartmentDirectives();
}

function complyDirective(id) {
  const d = DEPARTMENT_DIRECTIVES_DATA.find(item => item.id === id);
  if (!d) return;
  d.status = 'compliant';
  d.read = true;

  // Also close the linked complaint in mock data
  const cIdx = unifiedAdminData.findIndex(c => c.id === d.targetComplaintId);
  if (cIdx !== -1) {
    unifiedAdminData[cIdx].status = 'resolved';
    unifiedAdminData[cIdx].escalated = false;
    unifiedAdminData[cIdx].resolvedDate = new Date().toISOString().split('T')[0];
  }

  showToast(`✅ Compliance report submitted for ${id}. Complaint ${d.targetComplaintId} marked Resolved!`, 'success');
  renderDepartmentDirectives();
  renderAdminOverview();
}

/* ── Modal for Super Admin to Issue Directive ── */
function openIssueDirectiveModal() {
  const modal = document.getElementById('issueDirectiveModal');
  if (modal) {
    modal.classList.add('show');
    const deptSelect = document.getElementById('dirTargetDept');
    if (deptSelect) populateOverdueSelect(deptSelect.value);
  }
}

function closeIssueDirectiveModal() {
  const modal = document.getElementById('issueDirectiveModal');
  if (modal) modal.classList.remove('show');
}

function populateOverdueSelect(dept) {
  const complaintSelect = document.getElementById('dirTargetComplaint');
  if (!complaintSelect) return;

  const list = unifiedAdminData.filter(c => c.dept.toLowerCase().includes(dept.toLowerCase()) || (c.category.toLowerCase() === 'road' && dept.includes('Roads')));
  if (list.length === 0) {
    complaintSelect.innerHTML = `<option value="">No active complaints in ${dept}</option>`;
    return;
  }

  complaintSelect.innerHTML = list.map(c => `
    <option value="${c.id}">${c.id} — ${c.title} (${c.constituency}) [Status: ${c.status.toUpperCase()}]</option>
  `).join('');
}

function handleSendDirective(e) {
  e.preventDefault();
  const dept = document.getElementById('dirTargetDept').value;
  const compId = document.getElementById('dirTargetComplaint').value;
  const dirType = document.getElementById('dirType').value;
  const deadline = document.getElementById('dirDeadline').value.trim();
  const msg = document.getElementById('dirMessage').value.trim();

  if (!compId || !deadline || !msg) {
    showToast('Please fill all directive fields and select target complaint', 'error');
    return;
  }

  const comp = unifiedAdminData.find(c => c.id === compId) || { title: 'Civic Grievance', address: 'Erode District', lat: 11.3410, lng: 77.7172 };

  const newId = `DIR-2024-00${DEPARTMENT_DIRECTIVES_DATA.length + 1}`;
  DEPARTMENT_DIRECTIVES_DATA.unshift({
    id: newId,
    sender: '🚨 Master Administrator (Sanjai)',
    senderRole: 'District Nodal Grievance Controller',
    dept: dept,
    targetComplaintId: compId,
    complaintTitle: comp.title,
    complaintLocation: comp.address,
    lat: comp.lat || 11.3410,
    lng: comp.lng || 77.7172,
    severity: dirType === 'immediate_action' ? 'EMERGENCY' : 'CRITICAL',
    type: dirType,
    subject: dirType === 'show_cause' ? `⚠️ Show-Cause Notice: ${compId} Resolution Delay` : `⚡ Urgent Field Directive: ${compId}`,
    message: msg,
    deadline: deadline,
    time: 'Just now',
    read: false,
    status: 'action_required'
  });

  showToast(`🚨 High-Priority Directive ${newId} dispatched to Incharge, ${dept}!`, 'success');
  closeIssueDirectiveModal();
  renderDepartmentDirectives();
  updateAdminNotifBadges();
}

/* ══════════════════════════════════════════════════════
   BILINGUAL CIVIC GUIDE CHATBOT ENGINE (EN & தமிழ்)
══════════════════════════════════════════════════════ */
let botLanguage = 'en';
let botChatHistory = [];

const BOT_DATA = {
  en: {
    title: 'Erode Civic Guide',
    sub: 'Online • Bilingual Assistant',
    placeholder: 'Ask a question or select a topic...',
    welcome: `👋 <strong>Hello! Welcome to Erode Civic Complaint Portal.</strong><br/>I am your AI Assistant. I can guide you step-by-step on how to file complaints, use voice recording, track field engineers, access the Admin hub, and more.<br/><br/><em>How can I assist you today?</em>`,
    chips: [
      { label: '📝 How to file a complaint?', query: 'how to file a complaint' },
      { label: '🎙️ How voice note works?', query: 'voice note recording' },
      { label: '📍 GPS & Live Camera', query: 'gps location and camera' },
      { label: '🚗 How officers navigate?', query: 'how officers navigate' },
      { label: '🚨 SLA & Escalations', query: 'sla deadlines and escalations' },
      { label: '🏛️ Official/Admin Login', query: 'official admin login' },
      { label: '👑 Super Admin Access', query: 'super admin sanjai090' },
      { label: '🔔 Higher Directives', query: 'higher official directives' },
    ],
    knowledge: [
      {
        keys: ['file', 'register', 'new complaint', 'how to report', 'submit', 'problem'],
        answer: `📝 <strong>How to File a Civic Grievance (4 Simple Steps):</strong><br/>
1. <strong>Step 1 (Category):</strong> Pick category (Roads, Water, Sanitation, TNEB, etc.) and write or speak your complaint.<br/>
2. <strong>Step 2 (Evidence):</strong> Take a live photo with camera or upload proof, and verify GPS pinpoint.<br/>
3. <strong>Step 3 (Urgency):</strong> Select severity (Normal, High, Emergency) and constituency.<br/>
4. <strong>Step 4 (Submit):</strong> Review summary, accept declaration, and receive your tracking ID (e.g. <code>CMP-2024-001</code>).`,
        action: { label: '➕ Open New Complaint Form', handler: "showMasterView('citizen'); navigateTo('new-complaint'); toggleCivicBot();" }
      },
      {
        keys: ['voice', 'audio', 'mic', 'speak', 'record', 'speech'],
        answer: `🎙️ <strong>Voice Note Recording Feature:</strong><br/>
You don't need to type! Just click <strong>"🎙️ Speak in Tamil / English"</strong> in Step 1 of the Complaint Form. The portal uses browser Speech Recognition to transcribe your voice directly into text in either English or Tamil in real time.`,
        action: { label: '🎙️ Try Voice Input Now', handler: "showMasterView('citizen'); navigateTo('new-complaint'); toggleCivicBot();" }
      },
      {
        keys: ['gps', 'camera', 'photo', 'location', 'live photo', 'picture', 'map'],
        answer: `📍 <strong>GPS & Live Camera Access:</strong><br/>
• <strong>Live Camera:</strong> Captures verifiable evidence with timestamp and geo-tag to prevent fake complaints.<br/>
• <strong>Automatic GPS:</strong> Click <em>"Detect GPS"</em> to pin your exact latitude & longitude coordinates. Field workers will use this exact spot for travel.`,
        action: { label: '🗺️ View Public Grievance Map', handler: "showMasterView('citizen'); navigateTo('map'); toggleCivicBot();" }
      },
      {
        keys: ['travel', 'navigate', 'google maps', 'officer travel', 'direction', 'repair'],
        answer: `🚗 <strong>Field Travel & Navigation for Officers:</strong><br/>
Every assigned grievance includes a <strong>"🚗 Travel Direction (Google Maps)"</strong> button. When clicked, field engineers get turn-by-turn driving directions straight from their current location to the exact repair site in Erode!`,
        action: { label: '📋 View Department Tasks', handler: "showMasterView('admin'); adminNav('complaints'); toggleCivicBot();" }
      },
      {
        keys: ['sla', 'escalat', 'deadline', 'overdue', 'delay', 'time limit', 'emergency'],
        answer: `🚨 <strong>SLA & Automatic Escalation Protocol:</strong><br/>
• <strong>Normal issues:</strong> 7 days SLA.<br/>
• <strong>High Priority:</strong> 48 hours SLA.<br/>
• <strong>Critical Hazards:</strong> 24 hours SLA.<br/>
If unresolved past deadline, complaints are automatically highlighted in red with <code>🚨 ESCALATED</code> status and flagged to the District Collector.`,
        action: { label: '🚨 View Escalated Tasks', handler: "showMasterView('admin'); adminNav('escalated'); toggleCivicBot();" }
      },
      {
        keys: ['admin', 'official', 'department login', 'officer login', 'staff'],
        answer: `🏛️ <strong>Official & Department Login:</strong><br/>
• <strong>Username:</strong> <code>admin</code><br/>
• <strong>Password:</strong> <code>admin@2026</code><br/>
Select your department (Roads, Water, Sanitation, TNEB, Drainage, Collectorate) to access assigned field tasks and resolution controls.`,
        action: { label: '🔑 Open Official Login', handler: "showMasterView('auth'); switchTab('admin'); toggleCivicBot();" }
      },
      {
        keys: ['super admin', 'sanjai', 'sanjai090', 'user management', 'manage citizen', 'manage official'],
        answer: `👑 <strong>Super Admin & Master User Management:</strong><br/>
• <strong>Super Admin ID:</strong> <code>sanjai090</code><br/>
• <strong>Password:</strong> <code>Sanjai@0505</code><br/>
Unlocks Master District Control, Citizen Account Management (Suspend/Activate/Reset), Official Staff Directory, and Directives Dispatch.`,
        action: { label: '🛡️ Manage Citizens & Officials', handler: "showMasterView('admin'); adminNav('citizens'); toggleCivicBot();" }
      },
      {
        keys: ['directive', 'show cause', 'memo', 'collector', 'warning', 'higher official', 'order'],
        answer: `🔔 <strong>Higher Official Directives & Show-Cause Memos:</strong><br/>
When a department fails to resolve a complaint in time, the District Collectorate or Master Admin can issue an official <strong>Show-Cause Directive</strong> with strict deadlines (e.g. 12 hours). Officers can acknowledge, navigate to site, and submit compliance reports directly online.`,
        action: { label: '🔔 View Directives & Alerts', handler: "showMasterView('admin'); adminNav('notifications'); toggleCivicBot();" }
      },
      {
        keys: ['language', 'tamil', 'english', 'change language', 'translate'],
        answer: `🌐 <strong>Full Bilingual Support (Tamil & English):</strong><br/>
You can switch the entire portal between English and Tamil by clicking the language pill <code>EN | தமிழ்</code> at the top-right header or inside this chatbot. Every screen, button, form, and table updates instantly!`,
        action: { label: 'தமிழ் மொழிக்கு மாற்றுக', handler: "setPortalLang('ta'); toggleCivicBot();" }
      }
    ],
    defaultReply: `🤖 I'm here to help with the Erode Citizen Complaint Portal! You can ask about filing grievances, voice recording, GPS location, officer navigation, Admin credentials (<code>admin / admin@2026</code>), Super Admin (<code>sanjai090</code>), or select a quick topic below.`
  },

  ta: {
    title: 'ஈரோடு உதவி வழிகாட்டி பாட்',
    sub: 'இணைய சேவை • இருமொழி உதவி',
    placeholder: 'கேள்வியைக் கேளுங்கள் அல்லது தலைப்பைத் தேர்ந்தெடுக்கவும்...',
    welcome: `👋 <strong>வணக்கம்! ஈரோடு மாவட்ட மக்கள் குறைதீர்க்கும் தளத்திற்கு வரவேற்கிறோம்.</strong><br/>நான் உங்கள் AI வழிகாட்டி. புகார் பதிவு செய்வது, குரல் பதிவு (Voice Note), அதிகாரிகள் சம்பவ இடத்திற்கு வருவது, அட்மின் உள்நுழைவு போன்றவற்றிற்கு நான் வழிகாட்டுகிறேன்.<br/><br/><em>இன்று உங்களுக்கு நான் எவ்வாறு உதவ வேண்டும்?</em>`,
    chips: [
      { label: '📝 புகார் பதிவு செய்வது எப்படி?', query: 'புகார் பதிவு செய்வது எப்படி' },
      { label: '🎙️ குரல் பதிவு (Voice Note) எப்படி?', query: 'குரல் பதிவு' },
      { label: '📍 ஜிபிஎஸ் & கேமரா எப்படி?', query: 'ஜிபிஎஸ் மற்றும் கேமரா' },
      { label: '🚗 அதிகாரிகள் எப்படி வருகிறார்கள்?', query: 'அதிகாரிகள் பயணம்' },
      { label: '🚨 காலக்கெடு (SLA) & எச்சரிக்கை', query: 'காலக்கெடு மற்றும் எச்சரிக்கை' },
      { label: '🏛️ அதிகாரி உள்நுழைவு (Admin)', query: 'அதிகாரி லாகின்' },
      { label: '👑 முதன்மை அட்மின் (sanjai090)', query: 'சூப்பர் அட்மின் சஞ்சய்' },
      { label: '🔔 உயர் அதிகாரிகள் உத்தரவு', query: 'உயர் அதிகாரிகள் உத்தரவு' },
    ],
    knowledge: [
      {
        keys: ['புகார்', 'பதிவு', 'எப்படி', 'குறை', 'புதிய', 'விண்ணப்பம்'],
        answer: `📝 <strong>புகார் பதிவு செய்யும் 4 எளிய வழிகள்:</strong><br/>
1. <strong>படி 1 (துறை தேர்வு):</strong> சாலை, குடிநீர், மின்சாரம், சுகாதாரம் போன்ற துறையைத் தேர்ந்தெடுத்து உங்கள் புகாரை டைப் செய்யவும் அல்லது பேசவும்.<br/>
2. <strong>படி 2 (ஆதாரம்):</strong> நேரலை கேமரா மூலம் புகைப்படம் எடுத்து, உங்கள் GPS இருப்பிடத்தைக் கண்டறியவும்.<br/>
3. <strong>படி 3 (அவசர நிலை):</strong> அவசரத் தன்மையைத் தேர்வு செய்யவும்.<br/>
4. <strong>படி 4 (சமர்ப்பிப்பு):</strong> விவரங்களைச் சரிபார்த்து சமர்ப்பிக்கவும். உங்களுக்கு புகார் எண் (எ.கா. <code>CMP-2024-001</code>) கிடைக்கும்.`,
        action: { label: '➕ புதிய புகார் படிவத்தைத் திறக்க', handler: "showMasterView('citizen'); navigateTo('new-complaint'); toggleCivicBot();" }
      },
      {
        keys: ['குரல்', 'வாய்ஸ்', 'மைக்', 'பேசு', 'voice'],
        answer: `🎙️ <strong>குரல் பதிவு (Voice Note) வசதி:</strong><br/>
நீங்கள் தட்டச்சு செய்யத் தேவையில்லை! படிவம் 1-ல் உள்ள <strong>"🎙️ தமிழில் / ஆங்கிலத்தில் பேசுங்கள்"</strong> பொத்தானை அழுத்தினால், நீங்கள் பேசுவதை தானாகவே எழுத்துக்களாக மாற்றும் Speech-to-Text தொழில்நுட்பம் செயல்படும்.`,
        action: { label: '🎙️ குரல் பதிவை சோதிக்க', handler: "showMasterView('citizen'); navigateTo('new-complaint'); toggleCivicBot();" }
      },
      {
        keys: ['ஜிபிஎஸ்', 'கேமரா', 'இருப்பிடம்', 'படம்', 'போட்டோ', 'gps', 'camera'],
        answer: `📍 <strong>நேரலை கேமரா & ஜிபிஎஸ் வசதி:</strong><br/>
• <strong>நேரலை கேமரா:</strong> போலிப் புகார்களைத் தவிர்க்க நேரலை கேமரா மூலம் சம்பவ இடத்தைப் படம் எடுக்கலாம்.<br/>
• <strong>தானியங்கி GPS:</strong> <em>"GPS இருப்பிடத்தைக் கண்டறி"</em> பொத்தானை அழுத்தினால் உங்கள் துல்லியமான அட்சரேகை மற்றும் தீர்க்கரேகை தானாகப் பதிவாகும்.`,
        action: { label: '🗺️ பொதுமக்கள் குறைதீர்ப்பு வரைபடத்தைப் பார்க்க', handler: "showMasterView('citizen'); navigateTo('map'); toggleCivicBot();" }
      },
      {
        keys: ['பயணம்', 'நேவிகேஷன்', 'வரைபடம்', 'கூகுள் மேப்', 'அதிகாரி', 'travel', 'maps'],
        answer: `🚗 <strong>அதிகாரிகள் சம்பவ இடத்திற்குப் பயணிக்கும் வசதி:</strong><br/>
ஒதுக்கப்பட்ட ஒவ்வொரு புகாரிலும் <strong>"🚗 Travel Direction (Google Maps)"</strong> பொத்தான் உள்ளது. இதை கிளிக் செய்தால் களப்பொறியாளர்கள் தங்கள் இருக்கும் இடத்திலிருந்து பழுதுபார்க்கும் இடத்திற்கு நேவிகேட் செய்து உடனடியாக வர முடியும்.`,
        action: { label: '📋 துறைப் பணிகளைப் பார்க்க', handler: "showMasterView('admin'); adminNav('complaints'); toggleCivicBot();" }
      },
      {
        keys: ['காலக்கெடு', 'தாமதம்', 'எச்சரிக்கை', 'sla', 'escalat'],
        answer: `🚨 <strong>SLA காலக்கெடு & தானியங்கி எச்சரிக்கை:</strong><br/>
• <strong>சாதாரண பிரச்சனைகள்:</strong> 7 நாட்கள் காலக்கெடு.<br/>
• <strong>முக்கிய பிரச்சனைகள்:</strong> 48 மணி நேரம்.<br/>
• <strong>அவசர ஆபத்துகள்:</strong> 24 மணி நேரம்.<br/>
காலக்கெடு முடிந்தும் தீர்க்கப்படாத புகார்கள் தானாகவே சிவப்பு நிறத்தில் <code>🚨 ESCALATED</code> என மாவட்ட ஆட்சியருக்கு அனுப்பப்படும்.`,
        action: { label: '🚨 காலக்கெடு மீறிய புகார்கள்', handler: "showMasterView('admin'); adminNav('escalated'); toggleCivicBot();" }
      },
      {
        keys: ['அதிகாரி', 'அட்மின்', 'லாகின்', 'admin', 'officer'],
        answer: `🏛️ <strong>துறை அதிகாரி உள்நுழைவு:</strong><br/>
• <strong>பயனர் பெயர்:</strong> <code>admin</code><br/>
• <strong>கடவுச்சொல்:</strong> <code>admin@2026</code><br/>
உங்கள் துறையைத் (Roads, Water, Sanitation, TNEB, Drainage, Collectorate) தேர்ந்தெடுத்து லாகின் செய்யலாம்.`,
        action: { label: '🔑 அதிகாரி உள்நுழைவு', handler: "showMasterView('auth'); switchTab('admin'); toggleCivicBot();" }
      },
      {
        keys: ['சூப்பர் அட்மின்', 'சஞ்சய்', 'sanjai', 'sanjai090', 'மேலாண்மை'],
        answer: `👑 <strong>முதன்மை சூப்பர் அட்மின் & பயனர் மேலாண்மை:</strong><br/>
• <strong>முதன்மை Admin ID:</strong> <code>sanjai090</code><br/>
• <strong>கடவுச்சொல்:</strong> <code>Sanjai@0505</code><br/>
குடிமக்கள் மற்றும் துறை அதிகாரிகள் அனைவரையும் நிர்வகிக்கவும், முடக்கவும், புதிய அதிகாரிகளைச் சேர்க்கவும் முழு அனுமதி உண்டு.`,
        action: { label: '🛡️ குடிமக்கள் & அதிகாரிகள் மேலாண்மை', handler: "showMasterView('admin'); adminNav('citizens'); toggleCivicBot();" }
      },
      {
        keys: ['உத்தரவு', 'ஆட்சியர்', 'நோட்டீஸ்', 'memo', 'directive', 'show cause'],
        answer: `🔔 <strong>உயர் அதிகாரிகள் உத்தரவு & Show-Cause நோட்டீஸ்:</strong><br/>
துறைகள் புகாரைத் தீர்க்கத் தவறினால், மாவட்ட ஆட்சியர் அலுவலகம் நேரடியாக <strong>Show-Cause உத்தரவு</strong> பிறப்பிக்கும். அதிகாரிகள் களப்பணியாளர்களை அனுப்பி 12 மணி நேரத்திற்குள் பணியை முடித்து ஆன்லைனில் அறிக்கை சமர்ப்பிக்கலாம்.`,
        action: { label: '🔔 உயர் உத்தரவுகளைப் பார்க்க', handler: "showMasterView('admin'); adminNav('notifications'); toggleCivicBot();" }
      },
      {
        keys: ['மொழி', 'ஆங்கிலம்', 'தமிழ்', 'language', 'english'],
        answer: `🌐 <strong>முழு இருமொழி ஆதரவு (தமிழ் & ஆங்கிலம்):</strong><br/>
வலதுபுற மேல் பகுதியில் உள்ள <code>EN | தமிழ்</code> பொத்தானை அழுத்தி முழு இணையதளத்தையும் உடனுக்குடன் தமிழுக்கு மாற்றலாம்!`,
        action: { label: 'Switch to English', handler: "setPortalLang('en'); toggleCivicBot();" }
      }
    ],
    defaultReply: `🤖 ஈரோடு மக்கள் குறைதீர்க்கும் தளம் பற்றிய சந்தேகங்களை என்னிடம் கேளுங்கள்! புதிய புகார் பதிவு செய்தல், வாய்ஸ் நோட், ஜிபிஎஸ், அட்மின் நற்சான்றிதழ்கள் (<code>admin / admin@2026</code>), சூப்பர் அட்மின் (<code>sanjai090</code>) பற்றி நான் உங்களுக்கு வழிகாட்டுகிறேன்.`
  }
};

function toggleCivicBot() {
  const win = document.getElementById('civicBotWindow');
  if (!win) return;
  const isOpen = win.classList.toggle('open');
  if (isOpen && botChatHistory.length === 0) {
    initBotChat();
  }
}

function setBotLanguage(lang) {
  botLanguage = lang;
  document.querySelectorAll('.bot-lang-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(lang === 'ta' ? 'botLangTA' : 'botLangEN');
  if (activeBtn) activeBtn.classList.add('active');

  const data = BOT_DATA[lang];
  const titleEl = document.getElementById('botHeaderTitle');
  const subEl = document.getElementById('botHeaderSub');
  const inputEl = document.getElementById('civicBotInput');

  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.sub;
  if (inputEl) inputEl.placeholder = data.placeholder;

  renderBotChips();
  addBotMessage(data.welcome);
}

function syncBotLang(lang) {
  if (botLanguage !== lang) {
    setBotLanguage(lang);
  }
}

function renderBotChips() {
  const container = document.getElementById('civicBotChips');
  if (!container) return;
  const chips = BOT_DATA[botLanguage].chips;
  container.innerHTML = chips.map(c => `
    <button type="button" class="chat-chip" onclick="handleBotChipClick('${c.query}')">${c.label}</button>
  `).join('');
}

function initBotChat() {
  const container = document.getElementById('civicBotMessages');
  if (!container) return;
  container.innerHTML = '';
  botChatHistory = [];
  setBotLanguage(botLanguage);
}

function addBotMessage(html, actionObj = null) {
  const container = document.getElementById('civicBotMessages');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble bot';
  bubble.innerHTML = `
    <div class="bot-sender-tag">🤖 ${botLanguage === 'ta' ? 'ஈரோடு வழிகாட்டி' : 'Erode Civic Guide'}</div>
    <div>${html}</div>
    ${actionObj ? `<button class="chat-action-btn" onclick="${actionObj.handler}">${actionObj.label} →</button>` : ''}
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function addUserMessage(text) {
  const container = document.getElementById('civicBotMessages');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble user';
  bubble.textContent = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function handleBotChipClick(query) {
  processUserBotQuery(query);
}

function handleBotUserSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('civicBotInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  input.value = '';
  processUserBotQuery(query);
}

function processUserBotQuery(query) {
  addUserMessage(query);

  // Auto-detect Tamil query or language request
  const isTamilQuery = /[\u0B80-\u0BFF]/.test(query);
  if (isTamilQuery && botLanguage !== 'ta') {
    setBotLanguage('ta');
  }

  const data = BOT_DATA[botLanguage];
  const qLower = query.toLowerCase();

  // Search Knowledge Base
  let matched = null;
  for (const item of data.knowledge) {
    if (item.keys.some(k => qLower.includes(k))) {
      matched = item;
      break;
    }
  }

  setTimeout(() => {
    if (matched) {
      addBotMessage(matched.answer, matched.action);
    } else {
      addBotMessage(data.defaultReply);
    }
  }, 300);
}

// Auto-initialize chatbot chips on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderBotChips();
});



