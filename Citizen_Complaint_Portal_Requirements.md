# 🏙️ Citizen Complaint Portal — Project Requirements

**Track:** Citizen Complaint Portal (Published Track)
**Scope:** Erode District (Tamil Nadu) — Pilot Implementation

---

## 📋 Original Problem Statement

> Develop a platform where citizens can report civic issues with location tagging and tracking. The platform should enable users to submit complaints and track their status until resolution.

---

## ✅ 1. Core Basic Features (MVP — Mandatory)

| # | Feature | Description |
|---|---|---|
| 1 | **Complaint Submission Form** | Title, description, category (Road, Garbage, Water, Electricity, Drainage, Other), photo upload |
| 2 | **Location Tagging** | Auto-detect GPS location + manual map pin fallback + reverse geocoded address |
| 3 | **Photo Upload** | Proof image attached with every complaint |
| 4 | **Status Tracking (4 stages)** | Submitted → Under Review → In Progress → Resolved |
| 5 | **My Complaints List (User View)** | Citizen can see all complaints they raised with current status |
| 6 | **Public Complaints Map View** | All complaints shown as color-coded pins on a map (by status) |
| 7 | **Admin Panel — Status Update** | Admin/department can update complaint status through its lifecycle |

---

## 🔐 2. Authentication — Login Page (Compulsory)

- **Login is mandatory** — no anonymous submissions.
- Citizen must **register/login** before raising a complaint.
- Required fields at signup:
  - Name
  - Phone number / Email
  - Password
  - **Constituency** (see Section 4 below — captured at login/signup)
- Session-based auth (JWT or Firebase Auth) to keep citizen logged in and linked to their complaint history.

---

## 🛠️ 3. Admin — Separate Login & Panel

- **Admin has a completely separate login system** from citizens (different route, e.g. `/admin/login`).
- Admin roles to consider:
  - **Department Officer** — handles complaints assigned to their department (e.g., Water Dept, Roads Dept, Electricity Dept)
  - **Higher Official / Supervisor** — receives escalation reports (see Section 6)
- Admin dashboard shows:
  - All complaints (filterable by department, status, constituency)
  - Ability to update complaint status
  - Escalation reports (auto-generated — see Section 6)

---

## 🗺️ 4. Erode District — Constituency-Based Scoping

- Platform scoped specifically to **Erode District**.
- At citizen **signup/login**, user must select their **constituency** (from Erode district's list of constituencies/wards).
- This constituency field is used to:
  - Auto-route complaints to the correct local department/zone
  - Filter/group complaints by constituency in admin dashboard
  - Enable constituency-wise analytics (e.g., "which constituency has the most pending complaints")

> 📝 **To-Do:** Prepare the list of Erode district constituencies/wards to populate the dropdown (e.g., Erode East, Erode West, Modakkurichi, Bhavani, Gobichettipalayam, etc. — confirm exact official list before build).

---

## 📸 5. Complaint Raising — Live Photo + Location Capture

- When a citizen raises a complaint:
  - **Photo must be captured live** via camera (not uploaded from gallery) — similar to "you are here, take a picture" style verification, to prevent fake/old photos.
  - **Location is auto-captured** at the same time as the photo (GPS coordinates tied to the live capture moment).
- Implementation approach:
  - Use browser `navigator.mediaDevices.getUserMedia()` for live camera capture (web) or native camera intent (if mobile app).
  - Immediately fetch GPS coordinates via `navigator.geolocation.getCurrentPosition()` at capture time.
  - Lock the photo + location together as a single complaint record (prevents mismatched/fraudulent submissions).

---

## 🤖 6. AI-Based Prioritization, Routing & Escalation System

This is the **core intelligent workflow** of the platform:

### Step 1 — AI Prioritization
- When a complaint is submitted, an **AI model analyzes the complaint** (category, description, severity keywords, possibly image analysis) and assigns a **priority level** (e.g., Low / Medium / High / Critical).

### Step 2 — Auto-Routing to Department
- Based on category + priority, the complaint is **automatically routed to the concerned department** (e.g., Water complaints → Water Dept, Road complaints → Roads Dept).

### Step 3 — AI-Set Resolution Time (SLA)
- The AI sets a **time period (deadline)** for the department to resolve the complaint, based on:
  - Priority level
  - Category norms (e.g., pothole = X days, water leakage = Y days)

### Step 4 — Extension Handling
- If the assigned department **does not resolve the complaint within the AI-set deadline**:
  - System automatically grants a **1-day extension**.

### Step 5 — Escalation Reporting
- If the complaint is **still unresolved after the extension**:
  - System auto-generates an **escalation report** and sends it to the **higher official** (supervisor) of that department/officer.
- **Recurring escalation reports:**
  - Generated **every 2 weeks** for any officer/department with pending overdue complaints.
  - This creates ongoing accountability pressure until resolution.

### Step 6 — Working Days Calculation
- **All deadlines, extensions, and the 2-week escalation cycle are calculated in working days only** (exclude weekends and public holidays).
- Need a working-days calculation utility/logic (holiday calendar for Tamil Nadu/Erode district).

### 🔁 Summary Flow
```
Complaint Submitted
   ↓
AI Prioritization (Low/Medium/High/Critical)
   ↓
Auto-Routed to Concerned Department
   ↓
AI Sets SLA Deadline (in working days)
   ↓
Deadline Reached?
   ├── Resolved → Status: Resolved ✅
   └── Not Resolved → +1 Day Extension
          ↓
   Still Not Resolved?
          ↓
   Escalation Report → Higher Official
   (Auto-repeats every 2 weeks until resolved)
```

---

## 📊 7. Citizen Reports & Complaint History

- Every citizen should be able to access:
  - **Full history** of all complaints they've raised
  - **Individual complaint report** — status, timeline (submitted date, review date, in-progress date, resolved date), department assigned, priority level
  - Downloadable/viewable summary report per complaint (or overall history)

---

## 🧩 Feature Priority Matrix (For 7-Hour Build Planning)

| Priority | Features |
|---|---|
| **P0 — Core (must finish)** | Login/Signup (citizen + admin), constituency selection, complaint submission (live photo + location), status tracking, admin status update, complaint list/history |
| **P1 — High value (if time allows)** | AI prioritization (can start rule-based, upgrade to ML if time permits), auto-routing to department, map view |
| **P2 — Stretch goals** | SLA deadline engine + 1-day extension logic, escalation report generation, working-days calculator, 2-week recurring escalation cycle, downloadable reports |

> ⚠️ **Recommendation:** Given hackathon time constraints, build P0 fully first. For P1 (AI prioritization), a **rule-based scoring system** (keyword/category-based severity scoring) can simulate "AI" convincingly within time limits — full ML training may not be feasible in a short hackathon window. P2 features can be simplified for demo (e.g., show escalation logic working on a shortened/simulated timeline instead of real 2-week cycles).

---

## 🗂️ Suggested Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express (or Firebase Functions for speed)
- **Database:** Firebase Firestore / MongoDB
- **Auth:** Firebase Auth (separate roles: citizen / admin / higher official) or JWT-based custom auth
- **Live Camera Capture:** `navigator.mediaDevices.getUserMedia()`
- **Location:** `navigator.geolocation` + Leaflet.js/OpenStreetMap or Google Maps API
- **AI Prioritization:** Rule-based scoring engine (MVP) → optional ML classifier (stretch goal) using simple NLP keyword/severity analysis
- **Scheduled Jobs (SLA/escalation checks):** Cron job (node-cron) or Firebase Scheduled Functions
- **Working Days Calculation:** Custom utility function with TN public holiday list

---

## 📌 Open Items / To Confirm Before Build

- [ ] Exact list of Erode district constituencies for dropdown
- [ ] Department list (Water, Roads, Electricity, Garbage, Drainage, etc.) and their respective "higher officials" for escalation
- [ ] SLA time norms per category/priority (e.g., how many working days for each severity level)
- [ ] Public holiday calendar for working-days calculation
- [ ] Whether AI prioritization will be rule-based or actual ML model (time-dependent decision)
