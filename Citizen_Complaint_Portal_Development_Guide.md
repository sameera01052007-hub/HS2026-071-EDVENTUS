# Citizen Complaint Portal - Full Development Guide
### AI-Powered Civic Issue Reporting & Resolution Platform (Erode District) | 7-Hour Hackathon Plan

---

## 1. Problem Statement (Summary)

Citizens face civic issues daily — potholes, garbage not collected, streetlight failures, water leakage, blocked drainage — but have **no proper channel** to report them.

Current gaps:
- No single platform to report issues (calls, scattered social media posts)
- No location proof — hard to explain exact issue location
- No status visibility — citizens don't know if/when their complaint is being handled
- No accountability — no deadlines, so issues stay pending for months
- No escalation — non-performing officials face no consequence

**ISE (Erode Civic Complaint Portal) solves this by providing a transparent, AI-prioritized, trackable complaint system with built-in accountability for departments and officials.**

---

## 2. Core Solution Concept

An AI-powered civic platform that:
1. Lets citizens **log in** (with their Erode constituency) and raise complaints with **live photo + auto-location**
2. Uses **AI to prioritize** the complaint and auto-route it to the correct department
3. **Sets a resolution deadline** (in working days) and tracks it
4. **Auto-escalates** to higher officials if deadlines are missed, with recurring 2-week escalation reports
5. Gives citizens **full status tracking + history/reports** of every complaint raised

---

## 3. Full Feature List (Reference - Not All for Hackathon)

### A. Onboarding
- Citizen registration/login (compulsory)
- **Constituency selection** (Erode district) — captured at signup
- Separate admin/official login (different portal)

### B. Complaint Submission
- Title, description, category (Road, Garbage, Water, Electricity, Drainage, Other)
- **Live camera capture** (no gallery upload — prevents fake/old photos)
- **Auto GPS location capture** tied to the live photo moment
- Manual map pin as fallback

### C. AI Prioritization & Routing Engine
- AI analyzes complaint → assigns priority (Low/Medium/High/Critical)
- Auto-routes to concerned department based on category + priority
- AI sets SLA deadline (working days only, excludes weekends/holidays)
- Auto 1-day extension if deadline missed
- Escalation report to higher official if still unresolved
- Recurring escalation report every 2 weeks until resolved

### D. Status Tracking
- 4-stage lifecycle: Submitted → Under Review → In Progress → Resolved
- Live status visible to citizen
- Public map view of all complaints (color-coded pins by status)

### E. Admin/Official Panel
- Separate login for department officers & higher officials
- View complaints assigned to their department/constituency
- Update complaint status
- View auto-generated escalation reports

### F. Reports & History (Citizen Side)
- Full history of all complaints raised by the citizen
- Individual complaint report (timeline, department, priority, dates)
- Downloadable/viewable summary

### G. Engagement (Optional)
- Upvote duplicate/nearby issues ("5 others reported this too")
- Nearby complaints alert
- Category-wise analytics for admin (bar/pie charts)

### H. Advanced AI (Future Scope)
- Real ML-based image classification (auto-detect issue type from photo)
- NLP-based severity scoring from complaint description
- Predictive analytics (which areas will have recurring issues)
- Chatbot for complaint status queries
- Multilingual support (Tamil/English/voice input)

---

## 3A. AI Algorithms Used (Core vs Demo-Level Integration)

Idha rendu category-a split pannikonga — **Core (fully implement)** vs **Demo-level (nice-to-have, integrate if time irundha)**.

### 🌟 Core Algorithms (Must Build Properly — High Impact)

| Algorithm | Use Case | Priority |
|---|---|---|
| **Sentence-BERT + GPS** | Duplicate / Same Incident Detection — new complaint-oda description-a existing complaints-oda semantic similarity (Sentence-BERT embeddings) + GPS proximity combine panni, "idhu already report pannirukanga" nu detect pannradhu | ⭐⭐⭐⭐⭐ |
| **XGBoost** | Complaint Priority Prediction — category, description features, location, past data base panni priority level (Low/Medium/High/Critical) predict pannradhu | ⭐⭐⭐⭐⭐ |
| **DBSCAN** | Complaint Hotspot Map — GPS coordinates cluster panni, "idhu area-la complaints adhigama irukku" nu density-based hotspot zones map-la kaatradhu | ⭐⭐⭐⭐ |

**Why these 3 first:**
- Sentence-BERT + GPS → duplicate detection = strong differentiator, "AI-powered deduplication" judges-ku impress pannum
- XGBoost → core "AI prioritization" requirement (Section 6 of problem statement) — real ML model use pannradhunala credibility adhigam
- DBSCAN → visual wow-factor on map, easy to demo (color-coded hotspot clusters)

### 🔧 Demo-Level Integration (Add if time permits — don't over-invest)

| Tool | Use Case | Notes |
|---|---|---|
| **Whisper** (pre-trained) | Voice → Text for complaint description | Citizen voice-a type pannradhukku badhila speak pannalam. Pre-trained model direct-a API/library-a call pannunga, training venaam |
| **LLM/RAG** | Simple chatbot / API | "Where is my complaint status" mathiri simple Q&A chatbot. Basic prompt-based API call podhum, complex RAG pipeline venaam unless time miguthi irundha |
| **BERT** (initial fallback) | Complaint category classification | ஆரம்பத்தில் XGBoost-ku input-a **manually/predefined category** vachikkalam (dropdown selection). Time irundha mattum BERT use panni auto-category-detection add pannalam |
| **YOLO** | Image-based issue detection (e.g., detect pothole/garbage from photo) | **Only if extra time irukku** — complex to integrate + train/fine-tune in hackathon window. Skip pannalum problem illa, "Future Scope" slide-la mention pannalam |

### 🎯 Build Priority Order (AI Algorithms)
1. **XGBoost** (priority prediction) — build first, core requirement
2. **Sentence-BERT + GPS** (duplicate detection) — build second, strong differentiator
3. **DBSCAN** (hotspot map) — build third, visual impact
4. **Predefined category → BERT upgrade** — only if time left
5. **Whisper (voice input)** — only if time left, quick pre-trained integration
6. **LLM/RAG chatbot** — only if time left, simple version
7. **YOLO (image detection)** — skip unless significant extra time

> ⚠️ **Hackathon Reality Check:** Training custom models in 7 hours is not feasible. Use **pre-trained models** (Sentence-BERT from `sentence-transformers` library, pre-trained Whisper, pre-trained/lightweight XGBoost trained on a quick synthetic/sample dataset) rather than building from scratch. Focus engineering time on **integration**, not model training.

---

## 4. What to ACTUALLY Build in 7 Hours (MVP Scope)

✅ Build these only:
1. Citizen login/signup with **constituency dropdown** (Erode district)
2. Separate admin login (department officer view)
3. Complaint submission form — **live photo capture + auto GPS location**, predefined category dropdown (feeds XGBoost)
4. **XGBoost model** for priority prediction (Low/Medium/High/Critical) → department routing
5. **Sentence-BERT + GPS** for duplicate/same-incident detection at submission time
6. **DBSCAN** hotspot clustering on the map view
7. Status tracking (4 stages) — citizen view + admin update
8. Simple SLA logic — deadline shown (working days calculation, simplified)
9. Complaint history/report page for citizen
10. Clean, polished UI

❌ Skip these (mention only in "Future Scope" slide):
- Whisper voice input, LLM/RAG chatbot, BERT auto-category, YOLO image detection — only add if all core features (1-10 above) are done early
- Actual 2-week recurring escalation cron jobs (simulate/demo on shortened timeline)
- Real working-days holiday calendar (hardcode simple weekday-only logic)
- Multi-department full admin hierarchy (demo with 1-2 departments only)
- Custom-trained deep learning models (use pre-trained/lightweight models only)

---

## 5. Tech Stack

| Purpose | Tool | Why |
|---|---|---|
| Frontend | React.js + Tailwind CSS | Fast to build, clean UI |
| Backend/DB | Firebase (Auth + Firestore) | No custom backend code needed, quick setup |
| Auth | Firebase Auth (separate roles: citizen/admin) | Quick role-based login |
| Live Camera | `navigator.mediaDevices.getUserMedia()` | Live photo capture, no gallery upload |
| Location | `navigator.geolocation` + Leaflet.js/OpenStreetMap | Free, no API key needed |
| Charts | Recharts / Chart.js | Easy admin analytics |
| Icons | Lucide React | Clean, ready-made icons |
| Hosting | Vercel or Netlify | Free, deploys in 2 minutes, gives live link |
| Priority Prediction | XGBoost (Python, small Flask/FastAPI microservice) | Fast, accurate on tabular features, easy to train quickly on sample data |
| Duplicate Detection | Sentence-BERT (`sentence-transformers` pre-trained) + GPS distance check | Semantic similarity + location proximity = accurate dedup |
| Hotspot Clustering | DBSCAN (`scikit-learn`) | Density-based clustering on GPS coordinates, no need to predefine cluster count |
| Voice Input (optional) | Whisper (pre-trained, via API/library) | Quick speech-to-text integration, no training needed |
| Chatbot (optional) | LLM/RAG (basic prompt-based API call) | Simple status-query chatbot |
| Category Auto-detect (optional) | BERT (upgrade path) | Start with predefined dropdown, upgrade to auto-classification if time permits |
| Image Detection (optional) | YOLO (pre-trained) | Only if significant extra time — pothole/garbage detection from photo |
| SLA/Working Days | Custom JS/Python utility (skip weekends) | Simplified deadline calculation |
| ML Backend | Python + Flask/FastAPI (separate microservice) | Hosts XGBoost, Sentence-BERT, DBSCAN — called via REST API from main app |

---

## 6. Hour-by-Hour Plan

### Hour 1 — Planning + Setup
- Assign roles: 1 frontend dev, 1 backend/logic dev, 1 UI/design, 1 presentation lead
- Quick wireframe (5-10 min sketch, paper or Figma)
- Setup React project + Firebase project + Tailwind
- Prepare Erode constituency list (dropdown data) + department list

### Hour 2 — Auth & Onboarding
- Citizen signup/login (name, phone/email, password, **constituency dropdown**)
- Separate admin login screen/route (`/admin/login`)
- Store user role (citizen/admin) + constituency in Firestore

### Hour 3 — Complaint Submission (Core Feature)
- Complaint form: title, description, category dropdown
- **Live camera capture** component (webcam access, capture button)
- **Auto GPS capture** at same moment as photo, reverse geocode address
- Save complaint to Firestore (linked to citizen + constituency)

### Hour 4 — AI Prioritization + Duplicate Detection (Core ML)
- Setup Python Flask/FastAPI microservice for ML endpoints
- **XGBoost**: train quickly on a small synthetic/sample dataset (category, keywords, location density, etc. as features) → predict priority (Low/Medium/High/Critical)
- **Sentence-BERT + GPS**: on new complaint submission, generate embedding of description, compare with recent nearby complaints (GPS radius filter) using cosine similarity → flag as duplicate if similarity + proximity both high
- Auto-assign department based on category + priority
- Set SLA deadline (simple working-days calculator, e.g., +3 days for High, +7 for Low)
- Store priority, department, deadline, duplicate-flag on complaint record

### Hour 5 — Status Tracking + Admin Panel + DBSCAN Hotspots
- Citizen "My Complaints" list with status badges
- Admin dashboard: list of complaints assigned to department, filter by status/priority
- Admin status update dropdown (Submitted → Under Review → In Progress → Resolved)
- **DBSCAN**: cluster all complaint GPS coordinates → identify hotspot zones → render as highlighted clusters on map
- Simple escalation flag: if deadline passed → mark "Escalated" + (mock) notify higher official

### Hour 6 — Reports, Map View & Polish
- Citizen complaint history page + individual complaint report view (timeline)
- Public/admin map view with color-coded pins (status-based) + DBSCAN hotspot overlay — Leaflet
- If time permits: Whisper voice input on complaint form, simple LLM chatbot widget for status queries
- UI cleanup (colors, spacing, responsive layout)

### Hour 7 — Testing + Presentation Prep
- Test full flow start to finish (citizen submit → AI prioritize → admin update → citizen sees resolution)
- Fix bugs
- Slides: Problem → Solution → Live Demo → Future Scope
- Practice demo flow (decide who says what)
- Deploy final build to Vercel, test live link

---

## 7. Presentation Structure (Slides)

1. **Problem Statement** — lack of transparent civic issue reporting/accountability
2. **Our Solution** — Citizen Complaint Portal overview, one-line pitch
3. **How It Works** — login (constituency) → submit (live photo+location) → AI prioritize & route → track → resolve
4. **Live Demo** — show working app (citizen + admin sides)
5. **Tech Stack** — what you used
6. **Impact** — transparency for citizens, accountability for officials, faster resolution
7. **Future Scope** — real ML prioritization, image-based issue detection, full 2-week escalation automation, multilingual support
8. **Thank You / Team**

---

## 8. Key Reminders for Judges

- Don't try to build everything — **one polished, fully working flow beats five broken ones**
- Explain the concept clearly even if the AI is "faked" with rule-based logic
- Focus on: **Problem-solution fit + working demo + clear accountability story**
- Keep the story simple: "Citizen reports issue with proof → AI prioritizes & routes it → Deadline tracked → Escalates if ignored → Citizen sees full history"

---

## 9. Quick Checklist Before Demo

- [ ] Citizen login/signup (with constituency) working
- [ ] Admin login (separate) working
- [ ] Complaint submission with live photo + auto location working
- [ ] **XGBoost** priority prediction + department routing working
- [ ] **Sentence-BERT + GPS** duplicate detection working (even on a small test set)
- [ ] **DBSCAN** hotspot clusters showing on map
- [ ] Status tracking (citizen + admin update) working
- [ ] SLA deadline + escalation flag showing (even if simplified)
- [ ] Complaint history/report page working
- [ ] (Optional) Whisper voice input / LLM chatbot / YOLO — only if core is 100% done
- [ ] App deployed with live link
- [ ] Slides ready — highlight the 3 core AI algorithms clearly
- [ ] Demo practiced at least once as a team
