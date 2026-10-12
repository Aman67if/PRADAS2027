# 🌐 Academic Conference Portal Website

> An Apple-inspired, photography-first academic conference website built with **Vite**, **Tailwind CSS v4**, and **Vanilla JavaScript**. Designed for high visual clarity, seamless client-side routing, and responsive mobile performance.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/ES6+-Vanilla_JS-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Features & Pages Overview

### 1. 🏠 Home Page *(Default)*
* **Museum-Gallery Hero Section**: High-resolution conference visual framing title, host university accreditation, hybrid mode badge, and primary action CTAs.
* **Live Countdown Timer**: Real-time ticker counting down days, hours, minutes, and seconds until the conference commencement.
* **Springer CCIS Publication Announcement**: Prominent badge highlighting publication with Springer in the *Communications in Computer and Information Science* (CCIS) series.
* **Quick Stats Ticker**: 2 Days, 4 Keynotes, 12+ Specialized Tracks, Springer CCIS indexing.
* **Scope & Institutional Spotlight**: In-depth academic scope and background on the host university and Computer Science & Engineering department.
* **Keynote Speaker Previews**: Card grid spotlighting international plenary speakers with one-click links to full bios.

### 2. 👥 Committee Page
* **Hierarchical Leadership**: Chief Patrons, Patrons, General Chairs, Organizing Chairs, Program Chairs, Conveners, and International/National Advisory Boards.
* **Status Badges & Placeholders**: Clean notice badges indicating that detailed biographies, track chairs, and reviewer panels will be updated soon.

### 3. 📄 Paper Submission *(Dropdown Navigation)*
* **Call for Papers**: Comprehensive scope, 12 core research topics (ML, Deep Learning, Big Data, Security, Cognitive Systems), and Microsoft CMT3 submission portal integration.
* **Author Guidelines**:
  * 12–15 pages in Springer LNCS/CCIS one-column format (~400 words/page).
  * Strict plagiarism threshold ($<15\%$).
  * Anonymized double-blind review compliance instructions.
  * Direct download links for official Springer Word and LaTeX templates.
* **Important Dates**: Structured timeline with color-coded status badges (*Active*, *Upcoming*, *Completed*).

### 4. 🤝 Sponsors Page
* **Our Sponsors Section**: Placeholder showcase with an announcement card indicating partner details are being finalized.
* **Call for Sponsors Section**:
  * Tier packages: **Platinum** (INR 5.0L), **Gold** (INR 3.0L), **Silver** (INR 2.0L), and **Bronze** (INR 1.0L).
  * Detailed breakdown of complimentary delegate passes, prime exhibition booths, presentation slots, and brochure placement.
  * Direct link to official sponsorship Google Form and interactive inquiry modal.

### 5. 📅 Program & Logistics Page *(7 Dedicated Sub-views)*
* **Keynote / Plenary Talk**: Comprehensive profiles, IEEE/ACM credentials, and scheduled talk dates/times for keynote speakers.
* **Program Schedule**: Day 1 and Day 2 agenda timelines detailing registrations, inaugurations, technical sessions, high tea, and valedictory.
* **Technical Sessions**: Information on presentation formats (In-Person and Virtual), track rules, and session jury.
* **Conference Proceedings**: Catalog metadata and SpringerLink indexing references (Scopus, EI Compendex, DBLP).
* **Places to Visit**: Curated cards highlighting regional landmarks with distance from the venue and Google Maps directions.
* **Accommodation**: On-campus guest house info, first-come first-served guidelines, and tariff announcement notices.
* **Photo Gallery**: Masonry grid featuring campus architecture, academic halls, and local landmarks with an interactive fullscreen Lightbox modal.

### 6. 📝 Registration & Login Portal
* **Registration Tab**:
  * Fee structure for Indian & International Academicians, Research Scholars, Industry Delegates, and Non-presenting Attendees.
  * Inclusions: Conference Kit, High Tea, Working Lunch, Certificate, and Proceedings.
  * Interactive online registration form with simulated validation and official Google Form link.
* **Login Tab**: Author, Reviewer, Committee, and Attendee portal login form with toast feedback.

### 7. 📞 Permanent Contact Us Footer
* Host institution address and geographical coordinates.
* Official contact coordinates for Conveners and Program Chairs.
* Dedicated secretariat email with one-click copy button.
* Interactive **"Send Message"** inquiry modal drawer.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **[Vite 6](https://vitejs.dev/)** | High-performance build tool and local dev server with lightning-fast HMR |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first styling via `@tailwindcss/vite` |
| **HTML5 & Vanilla JavaScript** | Lightweight, framework-agnostic client logic and hash-based routing |
| **Apple Museum-Gallery Design** | Frosted glass navigation (`backdrop-blur`), subtle `#0066cc` / `#393185` accents, clean pill CTAs, and SF Pro typography hierarchy |

---

## 📁 Project Structure

```text
Conference project/
├── public/
│   └── images/
│       ├── hero.jpg             # High-tech conference auditorium
│       ├── campus.jpg           # University campus view
│       ├── gajapati_palace.jpg  # Historic landmark photo
│       └── logo.png             # Official conference / university logo
├── src/
│   ├── data/
│   │   └── conferenceData.js    # Centralized data store (speakers, dates, schedule, fees)
│   ├── main.js                  # Client-side router, countdown timer, modals & interactions
│   └── style.css                # Tailwind CSS v4 entry point & design tokens
├── index.html                   # Shell with frosted nav, modal containers & footer
├── vite.config.js               # Vite configuration with Tailwind CSS plugin
├── package.json                 # Project dependencies & scripts
├── DESIGN.md                    # Apple design specification & token guidelines
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18+` (Tested on `v22.17.1`)
* **npm**: `v9+` (Tested on `v10.9.2`)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Aman67if/PRADAS2027.git
cd "Conference project"
npm install
```

### 2. Development Server
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173/
```
*(With `--host`, accessible on your local network as well).*

### 3. Production Build
Compile and bundle optimized static assets for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## ⚙️ Customization Guide

### 1. Updating Conference Data
All content is centralized in [`src/data/conferenceData.js`](src/data/conferenceData.js):
* **Conference Dates & Venue**: Edit `conferenceInfo`.
* **Important Deadlines**: Edit `importantDates`.
* **Keynote Speakers**: Edit `keynoteSpeakers`.
* **Committee Roster**: Edit `committeeData`.
* **Sponsor Packages**: Edit `sponsorTiers`.
* **Schedule & Agendas**: Edit `programSchedule`.
* **Registration Tariffs**: Edit `registrationFees`.
* **Local Attractions**: Edit `placesToVisit`.

### 2. Customizing Brand Colors & Fonts
Theme tokens are configured in [`src/style.css`](src/style.css):
```css
@theme {
  --color-apple-primary: #393185;       /* Primary brand action color */
  --color-apple-primary-hover: #0071e3; /* Button hover state */
  --color-apple-ink: #1d1d1f;          /* Headline and text color */
  --color-apple-parchment: #f5f5f7;    /* Off-white background canvas */
}
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
