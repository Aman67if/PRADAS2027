import {
  conferenceInfo,
  importantDates,
  tracks,
  keynoteSpeakers,
  committeeData,
  sponsorTiers,
  placesToVisit,
  programSchedule,
  registrationFees,
  galleryImages
} from './data/conferenceData.js';

// Application State
const state = {
  currentRoute: 'home',
  programTab: 'keynotes',
  authTab: 'register',
  currentUser: null,
  mobileMenuOpen: false,
  lightboxIndex: null
};

// Toast notification helper
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const bgClass = type === 'success' 
    ? 'bg-emerald-600 text-white' 
    : type === 'error' 
      ? 'bg-rose-600 text-white' 
      : 'bg-[#1d1d1f] text-white';

  toast.className = `${bgClass} px-5 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-2 transition-all duration-300 transform translate-y-4 opacity-0 z-50`;
  toast.innerHTML = `
    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Countdown Timer
function initCountdown() {
  const targetTime = new Date('2025-03-21T09:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    let diff = targetTime - now;

    // If past, loop countdown to conference celebration or show day-of mode
    if (diff < 0) {
      diff = Math.abs(diff) % (365 * 24 * 60 * 60 * 1000);
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-minutes');
    const sEl = document.getElementById('cd-seconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// Client-Side Router
function handleRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '') || 'home';
  const [route, subroute] = hash.split('/');

  state.currentRoute = route;
  if (subroute && route === 'program') {
    state.programTab = subroute;
  } else if (route === 'login') {
    state.authTab = 'login';
  } else if (route === 'registration') {
    state.authTab = 'register';
  }

  // Update navigation active states
  updateNavbarActiveState(route);

  // Render view
  renderPage(route, subroute);

  // Close mobile drawer if open
  closeMobileMenu();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavbarActiveState(route) {
  document.querySelectorAll('[data-nav-link]').forEach(el => {
    const linkTarget = el.getAttribute('data-nav-link');
    const isActive = linkTarget === route || 
      (linkTarget === 'paper-submission' && ['call-for-papers', 'author-guidelines', 'important-dates'].includes(route)) ||
      (linkTarget === 'sponsors' && ['our-sponsors', 'call-for-sponsors'].includes(route)) ||
      (linkTarget === 'registration' && ['login', 'registration'].includes(route));

    if (isActive) {
      el.classList.add('text-[#0066cc]', 'font-semibold');
      el.classList.remove('text-[#1d1d1f]', 'text-[#7a7a7a]');
    } else {
      el.classList.remove('text-[#0066cc]', 'font-semibold');
      el.classList.add('text-[#1d1d1f]');
    }
  });
}

function closeMobileMenu() {
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileDrawer) {
    mobileDrawer.classList.add('hidden');
    state.mobileMenuOpen = false;
  }
}

// Main Page Renderer
function renderPage(route, subroute) {
  const app = document.getElementById('main-content');
  if (!app) return;

  switch (route) {
    case 'home':
      app.innerHTML = renderHomePage();
      initCountdown();
      break;
    case 'committee':
      app.innerHTML = renderCommitteePage();
      break;
    case 'call-for-papers':
    case 'author-guidelines':
    case 'important-dates':
    case 'paper-submission':
      app.innerHTML = renderPaperSubmissionPage(route);
      break;
    case 'sponsors':
    case 'our-sponsors':
    case 'call-for-sponsors':
      app.innerHTML = renderSponsorsPage(route);
      break;
    case 'program':
      app.innerHTML = renderProgramPage(state.programTab);
      break;
    case 'registration':
    case 'login':
      app.innerHTML = renderAuthPage(state.authTab);
      break;
    default:
      app.innerHTML = renderHomePage();
      initCountdown();
  }

  // Re-bind interactive events inside the rendered page
  bindDynamicEvents();
}

// VIEW 1: HOME PAGE
function renderHomePage() {
  return `
    <!-- Top Announcement Strip (Apple Spec) -->
    <div class="bg-[#f5f5f7] border-b border-[#e0e0e0] py-2.5 px-4 text-center text-xs sm:text-sm text-[#1d1d1f]">
      <span class="inline-flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span class="font-medium">Springer CCIS Proceedings</span> — Proceedings planned for publication with Springer CCIS Series.
        <a href="#call-for-papers" class="text-[#0066cc] hover:underline font-medium inline-flex items-center gap-1">
          Submit Paper <span aria-hidden="true">&rarr;</span>
        </a>
      </span>
    </div>

    <!-- Hero Section (Museum Gallery Apple Style) -->
    <section class="relative bg-white pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden border-b border-[#f0f0f0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs sm:text-sm text-[#333333] mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0066cc]"></span>
          <span>Centurion University of Technology and Management (CUTM), Odisha</span>
        </div>

        <!-- Main Title with tight tracking -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-[#1d1d1f] max-w-4xl mx-auto leading-[1.08] mb-4">
          Machine Intelligence & Data Science
        </h1>

        <!-- Subtitle & Hybrid Badge -->
        <p class="text-lg sm:text-2xl font-normal text-[#7a7a7a] max-w-2xl mx-auto mb-8 tracking-[-0.01em]">
          1st International Conference (MIDAS-2025)
          <span class="block text-sm sm:text-base text-[#1d1d1f] font-medium mt-1">
            March 21 – 22, 2025 • Paralakhemundi Campus & Virtual Hybrid
          </span>
        </p>

        <!-- CTAs (Apple Pill Buttons) -->
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <a href="#call-for-papers" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] shadow-sm font-medium px-6 py-3 text-base">
            Submit Paper (CMT3)
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
          <a href="#registration" class="apple-pill-btn bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] border border-[#e0e0e0] font-medium px-6 py-3 text-base">
            Register for Conference
          </a>
          <a href="#program" class="apple-pill-btn bg-white text-[#0066cc] hover:bg-blue-50/50 border border-transparent font-medium px-5 py-3 text-base">
            View Schedule & Keynotes &darr;
          </a>
        </div>

        <!-- Live Countdown Timer Component -->
        <div class="inline-block bg-[#f5f5f7] border border-[#e0e0e0] rounded-2xl p-4 sm:p-6 mb-12 shadow-sm">
          <div class="text-xs uppercase tracking-wider text-[#7a7a7a] font-semibold mb-3">Conference Commences In</div>
          <div class="grid grid-cols-4 gap-3 sm:gap-6 text-center">
            <div class="px-2">
              <span id="cd-days" class="text-2xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight block">00</span>
              <span class="text-[11px] sm:text-xs text-[#7a7a7a] uppercase">Days</span>
            </div>
            <div class="px-2 border-l border-[#e0e0e0]">
              <span id="cd-hours" class="text-2xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight block">00</span>
              <span class="text-[11px] sm:text-xs text-[#7a7a7a] uppercase">Hours</span>
            </div>
            <div class="px-2 border-l border-[#e0e0e0]">
              <span id="cd-minutes" class="text-2xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight block">00</span>
              <span class="text-[11px] sm:text-xs text-[#7a7a7a] uppercase">Minutes</span>
            </div>
            <div class="px-2 border-l border-[#e0e0e0]">
              <span id="cd-seconds" class="text-2xl sm:text-4xl font-semibold text-[#0066cc] tracking-tight block">00</span>
              <span class="text-[11px] sm:text-xs text-[#7a7a7a] uppercase">Seconds</span>
            </div>
          </div>
        </div>

        <!-- Hero Photographic Render -->
        <div class="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-[#161617]">
          <img src="/images/hero.jpg" alt="MIDAS 2025 Conference Auditorium" class="w-full h-auto max-h-[520px] object-cover object-center transform transition duration-700 hover:scale-[1.01]" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
            <span class="text-xs uppercase tracking-widest text-[#2997ff] font-semibold mb-1">Academic Congregation</span>
            <h2 class="text-xl sm:text-3xl font-semibold text-white tracking-tight">Centurion University, Paralakhemundi Campus</h2>
            <p class="text-sm sm:text-base text-[#cccccc] max-w-2xl mt-1">
              Bringing together international experts, researchers, and engineers exploring cutting-edge Machine Learning and Big Data horizons.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stat Highlights Strip -->
    <section class="bg-[#f5f5f7] py-12 border-b border-[#e0e0e0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="bg-white p-6 rounded-2xl border border-[#e0e0e0]/70">
            <div class="text-3xl sm:text-4xl font-semibold text-[#0066cc] tracking-tight">2 Days</div>
            <div class="text-xs sm:text-sm text-[#7a7a7a] mt-1">High-Impact Technical Sessions</div>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-[#e0e0e0]/70">
            <div class="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">4 Keynotes</div>
            <div class="text-xs sm:text-sm text-[#7a7a7a] mt-1">World-Renowned IEEE & ACM Fellows</div>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-[#e0e0e0]/70">
            <div class="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">Springer CCIS</div>
            <div class="text-xs sm:text-sm text-[#7a7a7a] mt-1">Blind Peer Review by 3 Reviewers</div>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-[#e0e0e0]/70">
            <div class="text-3xl sm:text-4xl font-semibold text-[#0066cc] tracking-tight">Hybrid</div>
            <div class="text-xs sm:text-sm text-[#7a7a7a] mt-1">On-Campus & Online Remote Tracks</div>
          </div>
        </div>
      </div>
    </section>

    <!-- About MIDAS & University (Alternating Clean Parchment Tile) -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold mb-2">Scope & Objectives</div>
            <h2 class="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-5">
              Exploring Machine Intelligence in Data Science
            </h2>
            <p class="text-[#333333] text-base leading-relaxed mb-4">
              The 1st International Conference on <strong>Machine Intelligence and Data Science (MIDAS-2025)</strong> will be held in Hybrid mode at the School of Engineering and Technology, Centurion University of Technology and Management, Paralakhemundi, Odisha, India.
            </p>
            <p class="text-[#333333] text-base leading-relaxed mb-6">
              MIDAS explores rapidly growing advancements across machine intelligent systems in Data Management, Data Security, Big Data Analysis, Data Mining, and Cognitive Systems. All submissions undergo blind peer review by three competent reviewers.
            </p>
            <div class="flex items-center gap-4">
              <a href="#call-for-papers" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3]">
                View Call for Papers &rarr;
              </a>
              <a href="#important-dates" class="apple-pill-btn bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] hover:bg-[#e8e8ed]">
                Important Dates
              </a>
            </div>
          </div>

          <div class="bg-[#f5f5f7] p-8 rounded-3xl border border-[#e0e0e0]">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-blue-100 text-[#0066cc] flex items-center justify-center font-bold">
                CCIS
              </div>
              <div>
                <h3 class="text-lg font-semibold text-[#1d1d1f]">Springer Publication Series</h3>
                <p class="text-xs text-[#7a7a7a]">Communications in Computer and Information Science</p>
              </div>
            </div>
            <p class="text-sm text-[#333333] leading-relaxed mb-4">
              Proceedings are planned to be published with Springer in their renowned Communications in Computer and Information Science (CCIS) series, indexed in Scopus, EI Compendex, and major scientific indexes.
            </p>
            <div class="p-4 bg-white rounded-2xl border border-[#e0e0e0] text-xs text-[#7a7a7a] space-y-2">
              <div class="flex justify-between">
                <span class="font-medium text-[#1d1d1f]">Review Process:</span>
                <span>Double-blind, 3 Expert Reviewers</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-[#1d1d1f]">Page Limit:</span>
                <span>12 – 15 Pages (LNCS Format)</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-[#1d1d1f]">Plagiarism:</span>
                <span>Strictly below 15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- University & Department Spotlight (Dark Surface Apple Tile) -->
    <section class="py-20 bg-[#272729] text-white border-y border-[#333333]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <img src="/images/campus.jpg" alt="Centurion University Campus" class="rounded-3xl shadow-xl w-full h-[380px] object-cover border border-white/10" />
          </div>
          <div class="order-1 md:order-2">
            <span class="text-xs uppercase tracking-wider text-[#2997ff] font-semibold mb-2 block">Institutional Legacy</span>
            <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
              Centurion University of Technology and Management, Odisha
            </h2>
            <p class="text-sm sm:text-base text-[#cccccc] leading-relaxed mb-4">
              Centurion University (CUTM) is the premier private University established via CUTM Act 4 in 2010. Recognised with <strong>Grade-A+ by NAAC</strong>, 12 B status by UGC, and honored by UNESCO and Niti Aayog for its skill-integrated higher education model.
            </p>
            <h3 class="text-lg font-semibold text-white mb-2">Department of Computer Science and Engineering</h3>
            <p class="text-sm text-[#cccccc] leading-relaxed mb-6">
              The Department prepares forward-thinking professionals through partnerships with AWS, IBM, Red Hat, UNITY, and Dassault Systems.
            </p>
            <a href="https://cutm.ac.in" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-white/10 text-white hover:bg-white/20 border border-white/20 text-sm">
              Visit CUTM Official Portal &nearr;
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Keynote Speakers Teaser (Apple Product Tiles Grid) -->
    <section class="py-20 bg-[#f5f5f7]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <div class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold mb-2">Eminent Minds</div>
          <h2 class="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            Keynote & Plenary Speakers
          </h2>
          <p class="text-base text-[#7a7a7a]">
            Hear from global trailblazers shaping the frontiers of machine learning, cognitive systems, and data intelligence.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${keynoteSpeakers.map(sp => `
            <div class="bg-white rounded-3xl p-6 border border-[#e0e0e0] flex flex-col justify-between apple-card text-left">
              <div>
                <div class="w-20 h-20 rounded-2xl overflow-hidden mb-5 bg-neutral-100 border border-[#e0e0e0]">
                  <img src="${sp.image}" alt="${sp.name}" class="w-full h-full object-cover" />
                </div>
                <h3 class="text-lg font-semibold text-[#1d1d1f] leading-snug mb-1">${sp.name}</h3>
                <p class="text-xs font-medium text-[#0066cc] mb-2">${sp.affiliation}</p>
                <p class="text-xs text-[#7a7a7a] line-clamp-3 mb-4">${sp.role}</p>
              </div>
              <div class="pt-4 border-t border-[#f0f0f0]">
                <span class="text-[11px] text-[#7a7a7a] block mb-2 font-mono">${sp.talkTime}</span>
                <a href="#program" data-program-tab="keynotes" class="text-xs text-[#0066cc] font-medium hover:underline inline-flex items-center gap-1">
                  Full Speaker Bio &rarr;
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="text-center mt-12">
          <a href="#program" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] px-6 py-3">
            Explore Complete Conference Program &rarr;
          </a>
        </div>
      </div>
    </section>

    <!-- Conference Technical Tracks Overview -->
    <section class="py-20 bg-white border-t border-[#e0e0e0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <div class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold mb-2">Research Horizons</div>
          <h2 class="text-3xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
            Specialized Conference Tracks
          </h2>
          <p class="text-base text-[#7a7a7a]">
            Original, unpublished papers are invited across core and multidisciplinary machine intelligence domains.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          ${tracks.map((t, idx) => `
            <div class="p-8 rounded-3xl bg-[#fafafc] border border-[#e0e0e0] apple-card">
              <div class="w-10 h-10 rounded-2xl bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center font-bold text-sm mb-4">
                0${idx + 1}
              </div>
              <h3 class="text-xl font-semibold text-[#1d1d1f] mb-2">${t.title}</h3>
              <p class="text-sm text-[#7a7a7a] mb-5">${t.description}</p>
              <div class="flex flex-wrap gap-2">
                ${t.topics.map(topic => `
                  <span class="px-3 py-1 rounded-full text-xs bg-white border border-[#e0e0e0] text-[#333333]">
                    ${topic}
                  </span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// VIEW 2: COMMITTEE PAGE
function renderCommitteePage() {
  return `
    <div class="py-12 bg-white border-b border-[#f0f0f0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#333333] mb-4">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Committee Information</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            Organizing & Advisory Committees
          </h1>
          <p class="text-base sm:text-lg text-[#7a7a7a] mb-6">
            The visionary leadership, academic chairs, and international advisors orchestrating MIDAS-2025.
          </p>

          <!-- Requested status banner -->
          <div class="p-4 sm:p-5 bg-blue-50/70 border border-blue-200/60 rounded-2xl text-left flex items-start gap-3.5 shadow-sm">
            <svg class="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <div class="text-sm text-[#1d1d1f]">
              <span class="font-semibold text-[#0066cc]">Committee Directory Update:</span>
              The names of committee members are listed below. Detailed biographies, affiliations, reviewer panels, and session coordinators will be updated and mentioned soon as review boards are finalized.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Committee Groups -->
    <div class="py-16 bg-[#f5f5f7]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <!-- Chief Patrons & Patrons -->
        <section class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
          <h2 class="text-xl font-semibold text-[#1d1d1f] mb-6 flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
            Chief Patrons & Patrons
          </h2>
          <div class="grid sm:grid-cols-3 gap-6">
            ${committeeData.patrons.map(m => `
              <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]/70 apple-card">
                <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">${m.role}</span>
                <h3 class="text-base font-semibold text-[#1d1d1f]">${m.name}</h3>
                <p class="text-xs text-[#7a7a7a] mt-1">${m.designation}</p>
                <div class="mt-3 text-[11px] text-neutral-400 italic">Full profile details will be updated soon</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- General Chair -->
        <section class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
          <h2 class="text-xl font-semibold text-[#1d1d1f] mb-6 flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
            General Chair
          </h2>
          <div class="grid sm:grid-cols-2 gap-6">
            ${committeeData.generalChairs.map(m => `
              <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]/70 apple-card">
                <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">${m.role}</span>
                <h3 class="text-base font-semibold text-[#1d1d1f]">${m.name}</h3>
                <p class="text-xs text-[#7a7a7a] mt-1">${m.designation}</p>
                <div class="mt-3 text-[11px] text-neutral-400 italic">Profile details will be mentioned soon</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Organizing Chairs -->
        <section class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
          <h2 class="text-xl font-semibold text-[#1d1d1f] mb-6 flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
            Organizing Chairs
          </h2>
          <div class="grid sm:grid-cols-3 gap-6">
            ${committeeData.organizingChairs.map(m => `
              <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]/70 apple-card">
                <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">${m.role}</span>
                <h3 class="text-base font-semibold text-[#1d1d1f]">${m.name}</h3>
                <p class="text-xs text-[#7a7a7a] mt-1">${m.designation}</p>
                <div class="mt-3 text-[11px] text-neutral-400 italic">Details will be updated soon</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Program Chairs -->
        <section class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
          <h2 class="text-xl font-semibold text-[#1d1d1f] mb-6 flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
            Program Chairs
          </h2>
          <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${committeeData.programChairs.map(m => `
              <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]/70 apple-card">
                <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">${m.role}</span>
                <h3 class="text-sm font-semibold text-[#1d1d1f]">${m.name}</h3>
                <p class="text-xs text-[#7a7a7a] mt-1">${m.designation}</p>
                <div class="mt-3 text-[11px] text-neutral-400 italic">Details will be updated soon</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Convener & Co-conveners -->
        <section class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
          <h2 class="text-xl font-semibold text-[#1d1d1f] mb-6 flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
            Convener & Co-Conveners
          </h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${committeeData.conveners.map(m => `
              <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]/70 apple-card">
                <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">${m.role}</span>
                <h3 class="text-sm font-semibold text-[#1d1d1f]">${m.name}</h3>
                <p class="text-xs text-[#7a7a7a] mt-1">${m.designation}</p>
                <div class="mt-3 text-[11px] text-neutral-400 italic">Contact details & profiles to be updated</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- International & National Advisory Board -->
        <section class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
          <h2 class="text-xl font-semibold text-[#1d1d1f] mb-6 flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
            Advisory Committee (International & National)
          </h2>
          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            ${committeeData.advisoryCommittee.map(m => `
              <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]/70 apple-card">
                <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold block mb-1">${m.role}</span>
                <h3 class="text-sm font-semibold text-[#1d1d1f]">${m.name}</h3>
                <p class="text-xs text-[#7a7a7a] mt-1">${m.designation}</p>
                <div class="mt-3 text-[11px] text-neutral-400 italic">Extended list will be mentioned soon</div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Technical Program Committee (Placeholder) -->
        <section class="bg-[#fafafc] p-8 rounded-3xl border border-dashed border-[#e0e0e0] text-center">
          <div class="max-w-md mx-auto">
            <div class="w-12 h-12 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] flex items-center justify-center mx-auto mb-4 text-[#7a7a7a]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <h3 class="text-lg font-semibold text-[#1d1d1f] mb-1">Technical Program Committee & Reviewers</h3>
            <p class="text-sm text-[#7a7a7a] mb-4">
              The full roster of peer reviewers, track coordinators, and session evaluators is currently being compiled and will be mentioned soon.
            </p>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#f5f5f7] text-[#7a7a7a] border border-[#e0e0e0]">
              Status: Details will be updated soon
            </span>
          </div>
        </section>

      </div>
    </div>
  `;
}

// VIEW 3: PAPER SUBMISSION (Sub-views: Call for Paper, Author Guidelines, Important Dates)
function renderPaperSubmissionPage(activeSubTab = 'call-for-papers') {
  const currentTab = ['call-for-papers', 'author-guidelines', 'important-dates'].includes(activeSubTab)
    ? activeSubTab
    : 'call-for-papers';

  return `
    <div class="py-12 bg-white border-b border-[#f0f0f0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#333333] mb-4">
            <span class="w-2 h-2 rounded-full bg-[#0066cc]"></span>
            <span>Paper Submission Portal</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            Research Submission Guidelines
          </h1>
          <p class="text-base sm:text-lg text-[#7a7a7a] mb-8">
            Submit your original scholarly contributions for presentation at MIDAS-2025 and publication in Springer CCIS.
          </p>

          <!-- Tab Bar Pill Switcher -->
          <div class="inline-flex p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] gap-1 overflow-x-auto max-w-full">
            <a href="#call-for-papers" class="px-5 py-2 rounded-full text-sm font-medium transition-all ${currentTab === 'call-for-papers' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-[#1d1d1f] hover:text-[#0066cc]'}">
              Call for Papers
            </a>
            <a href="#author-guidelines" class="px-5 py-2 rounded-full text-sm font-medium transition-all ${currentTab === 'author-guidelines' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-[#1d1d1f] hover:text-[#0066cc]'}">
              Author Guidelines
            </a>
            <a href="#important-dates" class="px-5 py-2 rounded-full text-sm font-medium transition-all ${currentTab === 'important-dates' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-[#1d1d1f] hover:text-[#0066cc]'}">
              Important Dates
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="py-16 bg-[#f5f5f7]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        ${currentTab === 'call-for-papers' ? renderCallForPapersContent() : ''}
        ${currentTab === 'author-guidelines' ? renderAuthorGuidelinesContent() : ''}
        ${currentTab === 'important-dates' ? renderImportantDatesContent() : ''}
      </div>
    </div>
  `;
}

function renderCallForPapersContent() {
  return `
    <div class="space-y-8">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <h2 class="text-2xl font-semibold text-[#1d1d1f] mb-4">Call for Papers — Scope & Themes</h2>
        <p class="text-base text-[#333333] leading-relaxed mb-6">
          Technical papers describing original, previously unpublished research, not currently under review by another conference or journal, are solicited. Researchers are invited to present the latest theoretical developments and practical solutions in machine intelligence and big data science.
        </p>

        <div class="p-5 bg-blue-50/70 border border-blue-200/60 rounded-2xl mb-8 flex items-start gap-3">
          <svg class="w-5 h-5 text-[#0066cc] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div class="text-sm text-[#1d1d1f]">
            <strong>Peer Review & Publication:</strong> All submitted conference papers will be blind peer reviewed by three competent reviewers. Proceedings will be published with Springer in their Communications in Computer and Information Science (CCIS) series (final approval pending).
          </div>
        </div>

        <h3 class="text-lg font-semibold text-[#1d1d1f] mb-4">Key Solicitated Topics Include:</h3>
        <div class="grid sm:grid-cols-2 gap-3 mb-8">
          ${[
            "Machine Learning Algorithms & Optimization",
            "Deep Learning & Foundation Architectures",
            "Expert Systems & Rule-based AI",
            "Artificial Intelligence & Cognitive Computing",
            "Neural Networks & Deep Architectures",
            "Data Management & Quality Analysis",
            "Big Data Analysis & Stream Processing",
            "Data Warehousing & OLAP",
            "Data Security, Privacy & Differential Models",
            "Data Mining & Pattern Discovery",
            "Data Visualizations & Human-in-the-Loop",
            "Cloud Computing & Distributed Intelligence"
          ].map(item => `
            <div class="flex items-center gap-3 p-3 bg-[#fafafc] rounded-xl border border-[#e0e0e0]/70 text-sm text-[#333333]">
              <span class="w-2 h-2 rounded-full bg-[#0066cc]"></span>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>

        <div class="border-t border-[#f0f0f0] pt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="text-xs text-[#7a7a7a] block">Primary Submission Platform</span>
            <span class="text-sm font-semibold text-[#1d1d1f]">Microsoft CMT3 Portal</span>
          </div>
          <a href="https://cmt3.research.microsoft.com/MIDAS2024" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] px-6 py-3 font-medium">
            Submit Paper via CMT &nearr;
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderAuthorGuidelinesContent() {
  return `
    <div class="space-y-8">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <h2 class="text-2xl font-semibold text-[#1d1d1f] mb-4">Author Submission Guidelines</h2>
        <p class="text-base text-[#333333] leading-relaxed mb-6">
          Prospective authors must strictly follow Springer LNCS/CCIS formatting specifications. Papers that do not comply with these instructions may be rejected without technical peer review.
        </p>

        <h3 class="text-lg font-semibold text-[#1d1d1f] mb-3">Essential Author Instructions:</h3>
        <div class="space-y-4 mb-8">
          <div class="p-4 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <div>
              <strong class="text-sm text-[#1d1d1f] block">Manuscript Length:</strong>
              <p class="text-xs text-[#7a7a7a]">Page limit is strictly 12 to 15 pages in Springer LNCS/CCIS one-column format (~400 words per page), including figures, tables, and bibliography.</p>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <div>
              <strong class="text-sm text-[#1d1d1f] block">Strict Plagiarism Threshold:</strong>
              <p class="text-xs text-[#7a7a7a]">Similarity index must be less than 15% (excluding references). Self-plagiarism and redundant publications will lead to direct disqualification.</p>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <div>
              <strong class="text-sm text-[#1d1d1f] block">Double-Blind Review Compliance:</strong>
              <p class="text-xs text-[#7a7a7a]">The initial submitted PDF manuscript must NOT contain author names, affiliations, email addresses, or acknowledgements revealing author identity.</p>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold text-[#1d1d1f] mb-4">Official Templates & Guidelines Links:</h3>
        <div class="grid sm:grid-cols-2 gap-4 mb-8">
          <a href="${conferenceInfo.templatesLink}" target="_blank" rel="noopener noreferrer" class="p-5 rounded-2xl border border-[#e0e0e0] hover:border-[#0066cc] transition-all bg-[#fafafc] group">
            <div class="text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] flex items-center justify-between">
              Springer CCIS Templates &nearr;
            </div>
            <p class="text-xs text-[#7a7a7a] mt-1">Download Word & LaTeX templates from official drive.</p>
          </a>

          <a href="https://www.springer.com/gp/computer-science/lncs/conference-proceedings-guidelines" target="_blank" rel="noopener noreferrer" class="p-5 rounded-2xl border border-[#e0e0e0] hover:border-[#0066cc] transition-all bg-[#fafafc] group">
            <div class="text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0066cc] flex items-center justify-between">
              Springer Proceedings Guidelines &nearr;
            </div>
            <p class="text-xs text-[#7a7a7a] mt-1">Detailed author guidelines on Springer official website.</p>
          </a>
        </div>

        <div class="p-6 bg-neutral-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 class="text-base font-semibold">Ready to Submit Your Paper?</h4>
            <p class="text-xs text-[#cccccc] mt-0.5">Log in to Microsoft CMT and select the MIDAS track.</p>
          </div>
          <a href="${conferenceInfo.submissionLink}" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] px-6 py-2.5">
            Open CMT Submission Portal &nearr;
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderImportantDatesContent() {
  return `
    <div class="space-y-8">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <h2 class="text-2xl font-semibold text-[#1d1d1f] mb-2">Important Conference Deadlines</h2>
        <p class="text-base text-[#7a7a7a] mb-8">
          Please make careful note of the following milestone deadlines for paper submission, reviewer feedback, and registration.
        </p>

        <div class="divide-y divide-[#f0f0f0] border border-[#e0e0e0] rounded-2xl overflow-hidden mb-8">
          ${importantDates.map((d, idx) => `
            <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${d.highlight ? 'bg-blue-50/50' : 'bg-white'}">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-full ${d.highlight ? 'bg-[#0066cc] text-white' : 'bg-[#f5f5f7] text-[#7a7a7a]'} text-xs font-semibold flex items-center justify-center shrink-0">
                  ${idx + 1}
                </span>
                <div>
                  <span class="text-sm sm:text-base font-semibold text-[#1d1d1f] block">${d.event}</span>
                  <span class="text-xs text-[#7a7a7a]">Midnight AoE (Anywhere on Earth)</span>
                </div>
              </div>
              <div class="flex items-center gap-3 sm:text-right">
                <span class="text-sm font-semibold text-[#1d1d1f] font-mono">${d.date}</span>
                <span class="px-2.5 py-1 rounded-full text-[11px] font-medium ${
                  d.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                  d.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' :
                  d.status === 'Closed' ? 'bg-neutral-100 text-neutral-600' :
                  'bg-blue-100 text-blue-800'
                }">
                  ${d.status}
                </span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-5 bg-[#f5f5f7] rounded-2xl border border-[#e0e0e0] flex items-center justify-between">
          <div class="text-xs text-[#7a7a7a]">
            Need deadline assistance or author extension clarification? Contact conference chairs.
          </div>
          <a href="#registration" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] text-xs">
            Proceed to Registration
          </a>
        </div>
      </div>
    </div>
  `;
}

// VIEW 4: SPONSORS PAGE (Our Sponsors [placeholder] & Call for Sponsors)
function renderSponsorsPage(activeSubRoute = 'sponsors') {
  return `
    <div class="py-12 bg-white border-b border-[#f0f0f0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#333333] mb-4">
            <span class="w-2 h-2 rounded-full bg-[#0066cc]"></span>
            <span>Partnership & Sponsorship</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            Conference Sponsorship
          </h1>
          <p class="text-base sm:text-lg text-[#7a7a7a] mb-6">
            Elevate your corporate brand visibility across international academic and technology leaders.
          </p>

          <div class="flex justify-center gap-3">
            <a href="#our-sponsors-section" class="apple-pill-btn bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] hover:bg-[#e8e8ed]">
              Our Sponsors
            </a>
            <a href="#call-for-sponsors-section" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3]">
              Call for Sponsors & Tiers
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="py-16 bg-[#f5f5f7] space-y-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <!-- SECTION 1: OUR SPONSORS (Requested placeholder) -->
        <section id="our-sponsors-section" class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
          <div class="text-center max-w-2xl mx-auto mb-8">
            <h2 class="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Our Sponsors</h2>
            <p class="text-sm text-[#7a7a7a]">Valued corporate and institutional patrons supporting MIDAS-2025.</p>
          </div>

          <!-- Notice Banner as requested -->
          <div class="p-6 bg-amber-50/70 border border-amber-200/70 rounded-2xl max-w-2xl mx-auto text-center mb-10">
            <div class="inline-flex items-center gap-2 text-amber-800 font-semibold text-sm mb-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>Partner Announcements Pending</span>
            </div>
            <p class="text-xs text-amber-900/80">
              Details of our confirmed sponsors and institutional collaborators will be updated and mentioned soon. Sponsorship discussions are actively underway.
            </p>
          </div>

          <!-- Elegant tier placeholders -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${['Platinum Category', 'Gold Category', 'Silver Category', 'Academic & Media'].map((tier, idx) => `
              <div class="border border-dashed border-[#e0e0e0] rounded-2xl p-6 text-center bg-[#fafafc] flex flex-col justify-center items-center h-44">
                <span class="text-xs text-[#0066cc] font-medium uppercase tracking-wider mb-2">${tier}</span>
                <span class="text-sm font-medium text-[#1d1d1f]">Sponsor Partner Slot</span>
                <span class="text-[11px] text-neutral-400 mt-2 italic">Details updated soon</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- SECTION 2: CALL FOR SPONSORS -->
        <section id="call-for-sponsors-section" class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold mb-1 block">Partnership Opportunities</span>
            <h2 class="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Call for Sponsors</h2>
            <p class="text-sm text-[#7a7a7a]">
              Choose from tailored tiers offering prominent physical booths, presentation slots, and global exposure.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            ${sponsorTiers.map(t => `
              <div class="p-6 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex flex-col justify-between apple-card">
                <div>
                  <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${t.badgeColor} inline-block mb-3">
                    ${t.tier}
                  </span>
                  <div class="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-4">${t.amount}</div>
                  <ul class="space-y-2.5 text-xs text-[#333333] mb-6">
                    ${t.features.map(f => `
                      <li class="flex items-start gap-2">
                        <svg class="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        <span>${f}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                <button data-action="apply-sponsor" data-tier="${t.tier}" class="w-full apple-pill-btn bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-xs font-medium py-2">
                  Apply for ${t.tier.split(' ')[0]}
                </button>
              </div>
            `).join('')}
          </div>

          <!-- Application CTAs -->
          <div class="p-8 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] text-center max-w-3xl mx-auto">
            <h3 class="text-lg font-semibold text-[#1d1d1f] mb-2">Interested in Sponsoring MIDAS-2025?</h3>
            <p class="text-xs sm:text-sm text-[#7a7a7a] mb-6 max-w-xl mx-auto">
              Please submit the Google Form or email our sponsorship chairs at <a href="mailto:midas2024@cutm.ac.in" class="text-[#0066cc] underline">midas2024@cutm.ac.in</a> for brochure customized entitlements.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-4">
              <a href="${conferenceInfo.sponsorFormLink}" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] px-6 py-2.5">
                Fill Sponsor Form (Google Form) &nearr;
              </a>
              <button data-action="open-contact-modal" class="apple-pill-btn bg-white text-[#1d1d1f] border border-[#e0e0e0] hover:bg-neutral-50 px-6 py-2.5">
                Direct Inquiry Modal
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  `;
}

// VIEW 5: PROGRAM PAGE (Keynotes, Schedule, Technical Sessions, Proceedings, Places to Visit, Accommodation, Photo Gallery)
function renderProgramPage(activeTab = 'keynotes') {
  const tabs = [
    { id: 'keynotes', label: 'Keynote / Plenary Talk' },
    { id: 'schedule', label: 'Program Schedule' },
    { id: 'technical', label: 'Technical Sessions' },
    { id: 'proceedings', label: 'Conference Proceedings' },
    { id: 'places', label: 'Places to Visit' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'gallery', label: 'Photo Gallery' }
  ];

  const currentTab = tabs.some(t => t.id === activeTab) ? activeTab : 'keynotes';

  return `
    <div class="py-12 bg-white border-b border-[#f0f0f0]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-8">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#333333] mb-4">
            <span class="w-2 h-2 rounded-full bg-[#0066cc]"></span>
            <span>Comprehensive Program Guide</span>
          </div>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            Conference Program & Logistics
          </h1>
          <p class="text-base sm:text-lg text-[#7a7a7a]">
            Access talk schedules, paper session tracks, proceedings catalog, venue accommodation, and Gajapati cultural landmarks.
          </p>
        </div>

        <!-- Apple Sub-Nav Frosted Pill Scroller -->
        <div class="flex items-center justify-center">
          <div class="inline-flex p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] gap-1 overflow-x-auto max-w-full no-scrollbar">
            ${tabs.map(t => `
              <button 
                data-program-tab-btn="${t.id}"
                class="px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${currentTab === t.id ? 'bg-[#0066cc] text-white shadow-sm' : 'text-[#1d1d1f] hover:text-[#0066cc] hover:bg-white/60'}"
              >
                ${t.label}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content Canvas -->
    <div class="py-16 bg-[#f5f5f7]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        ${currentTab === 'keynotes' ? renderKeynotesTab() : ''}
        ${currentTab === 'schedule' ? renderScheduleTab() : ''}
        ${currentTab === 'technical' ? renderTechnicalTab() : ''}
        ${currentTab === 'proceedings' ? renderProceedingsTab() : ''}
        ${currentTab === 'places' ? renderPlacesTab() : ''}
        ${currentTab === 'accommodation' ? renderAccommodationTab() : ''}
        ${currentTab === 'gallery' ? renderGalleryTab() : ''}
      </div>
    </div>
  `;
}

function renderKeynotesTab() {
  return `
    <div class="space-y-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Keynote & Plenary Addresses</h2>
        <p class="text-sm text-[#7a7a7a]">Four distinguished researchers delivering plenary addresses during MIDAS-2025.</p>
      </div>

      <div class="space-y-6">
        ${keynoteSpeakers.map(sp => `
          <div class="bg-white p-8 rounded-3xl border border-[#e0e0e0] apple-card">
            <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div class="w-28 h-28 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-[#e0e0e0]">
                <img src="${sp.image}" alt="${sp.name}" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 class="text-2xl font-semibold text-[#1d1d1f]">${sp.name}</h3>
                  <span class="px-3 py-1 rounded-full text-xs font-mono bg-blue-50 text-[#0066cc] border border-blue-200/50">
                    ${sp.talkTime}
                  </span>
                </div>
                <div class="text-sm font-medium text-[#0066cc] mb-1">${sp.designation}</div>
                <div class="text-xs text-[#7a7a7a] mb-4">${sp.affiliation} • <span class="text-[#333333]">${sp.role}</span></div>
                <p class="text-sm text-[#333333] leading-relaxed">${sp.bio}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderScheduleTab() {
  return `
    <div class="space-y-10">
      <div class="text-center max-w-2xl mx-auto mb-6">
        <h2 class="text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Detailed Conference Schedule</h2>
        <p class="text-sm text-[#7a7a7a]">Hybrid track timings, plenary sessions, paper presentations, and dining schedule.</p>
      </div>

      <!-- Day 1 Schedule -->
      <div class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
        <div class="flex items-center justify-between border-b border-[#f0f0f0] pb-4 mb-6">
          <div>
            <span class="text-xs font-semibold text-[#0066cc] uppercase tracking-wider block">Day 1</span>
            <h3 class="text-xl font-semibold text-[#1d1d1f]">Friday, March 21, 2025</h3>
          </div>
          <span class="px-3 py-1 bg-[#f5f5f7] rounded-full text-xs text-[#7a7a7a]">School of Eng. & Tech</span>
        </div>

        <div class="divide-y divide-[#f0f0f0]">
          ${programSchedule.day1.map(item => `
            <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="w-48 shrink-0">
                <span class="text-xs font-mono font-medium text-[#0066cc]">${item.time}</span>
              </div>
              <div class="flex-1">
                <span class="text-sm font-semibold text-[#1d1d1f] block">${item.title}</span>
                <span class="text-xs text-[#7a7a7a]">${item.speaker}</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] self-start sm:self-auto ${
                item.type === 'Keynote' ? 'bg-blue-100 text-[#0066cc] font-medium' :
                item.type === 'Ceremony' ? 'bg-purple-100 text-purple-800 font-medium' :
                item.type === 'Technical' ? 'bg-emerald-100 text-emerald-800 font-medium' :
                'bg-neutral-100 text-neutral-600'
              }">${item.type}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Day 2 Schedule -->
      <div class="bg-white p-8 rounded-3xl border border-[#e0e0e0]">
        <div class="flex items-center justify-between border-b border-[#f0f0f0] pb-4 mb-6">
          <div>
            <span class="text-xs font-semibold text-[#0066cc] uppercase tracking-wider block">Day 2</span>
            <h3 class="text-xl font-semibold text-[#1d1d1f]">Saturday, March 22, 2025</h3>
          </div>
          <span class="px-3 py-1 bg-[#f5f5f7] rounded-full text-xs text-[#7a7a7a]">School of Eng. & Tech</span>
        </div>

        <div class="divide-y divide-[#f0f0f0]">
          ${programSchedule.day2.map(item => `
            <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="w-48 shrink-0">
                <span class="text-xs font-mono font-medium text-[#0066cc]">${item.time}</span>
              </div>
              <div class="flex-1">
                <span class="text-sm font-semibold text-[#1d1d1f] block">${item.title}</span>
                <span class="text-xs text-[#7a7a7a]">${item.speaker}</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] self-start sm:self-auto ${
                item.type === 'Keynote' ? 'bg-blue-100 text-[#0066cc] font-medium' :
                item.type === 'Ceremony' ? 'bg-purple-100 text-purple-800 font-medium' :
                item.type === 'Technical' ? 'bg-emerald-100 text-emerald-800 font-medium' :
                'bg-neutral-100 text-neutral-600'
              }">${item.type}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderTechnicalTab() {
  return `
    <div class="space-y-8">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <h2 class="text-2xl font-semibold text-[#1d1d1f] mb-3">Technical Sessions & Paper Presentations</h2>
        <p class="text-sm text-[#7a7a7a] mb-8">
          MIDAS-2025 technical sessions operate in parallel tracks accommodating both in-person attendees and remote international presenters.
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="p-6 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]">
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-[#0066cc] font-semibold text-xs flex items-center justify-center mb-3">T1</span>
            <h3 class="text-base font-semibold text-[#1d1d1f] mb-1">Track 1: Machine Learning & Intelligent Models</h3>
            <p class="text-xs text-[#7a7a7a] mb-3">Auditorium A • Session Chairs: Prof. (Dr.) Sujata Chakravarty & Dr. Abhishek Das</p>
            <ul class="text-xs text-[#333333] space-y-1.5 list-disc list-inside">
              <li>15 minutes per oral paper (12 mins presentation + 3 mins Q&A)</li>
              <li>Live evaluation by technical program jury</li>
            </ul>
          </div>

          <div class="p-6 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]">
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-[#0066cc] font-semibold text-xs flex items-center justify-center mb-3">T2</span>
            <h3 class="text-base font-semibold text-[#1d1d1f] mb-1">Track 2: Big Data Analytics & Deep Mining</h3>
            <p class="text-xs text-[#7a7a7a] mb-3">Auditorium B • Session Chairs: Dr. Prafulla Kumar Panda & TPC Leads</p>
            <ul class="text-xs text-[#333333] space-y-1.5 list-disc list-inside">
              <li>High dimensional algorithms & warehousing systems</li>
              <li>Hybrid remote presentation screen sync</li>
            </ul>
          </div>

          <div class="p-6 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]">
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-[#0066cc] font-semibold text-xs flex items-center justify-center mb-3">T3</span>
            <h3 class="text-base font-semibold text-[#1d1d1f] mb-1">Track 3: Data Security, Privacy & Cloud Computing</h3>
            <p class="text-xs text-[#7a7a7a] mb-3">Seminar Hall 1 • Session Chairs: Dr. Ashish Ranjan Dash</p>
            <ul class="text-xs text-[#333333] space-y-1.5 list-disc list-inside">
              <li>Differential privacy, cryptographic database security</li>
              <li>Best Student Paper Award nomination</li>
            </ul>
          </div>

          <div class="p-6 rounded-2xl bg-[#fafafc] border border-[#e0e0e0]">
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-[#0066cc] font-semibold text-xs flex items-center justify-center mb-3">T4</span>
            <h3 class="text-base font-semibold text-[#1d1d1f] mb-1">Track 4: Applied Cognitive Systems & Smart AgTech</h3>
            <p class="text-xs text-[#7a7a7a] mb-3">Seminar Hall 2 • Session Chairs: Prof. Debendra Maharana</p>
            <ul class="text-xs text-[#333333] space-y-1.5 list-disc list-inside">
              <li>Healthcare robotics, biomedical sensors, precision agriculture</li>
              <li>Valedictory showcase</li>
            </ul>
          </div>
        </div>

        <div class="p-4 bg-blue-50/70 border border-blue-200/60 rounded-2xl text-xs text-[#1d1d1f]">
          <strong>Presenter Note:</strong> Each presenting author will receive a presentation certificate and conference kit. Authors joining online must be logged into Google Meet / Zoom 15 minutes prior to track initiation.
        </div>
      </div>
    </div>
  `;
}

function renderProceedingsTab() {
  return `
    <div class="space-y-8">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-[#f0f0f0] pb-8">
          <div>
            <span class="text-xs uppercase tracking-wider text-[#0066cc] font-semibold mb-1 block">Official Indexing</span>
            <h2 class="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">Springer CCIS Proceedings</h2>
            <p class="text-sm text-[#7a7a7a] mt-1">Communications in Computer and Information Science</p>
          </div>
          <a href="${conferenceInfo.proceedingsLink}" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] px-6 py-3">
            View Springer Link &nearr;
          </a>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 class="text-lg font-semibold text-[#1d1d1f] mb-3">About the Series</h3>
            <p class="text-sm text-[#333333] leading-relaxed mb-4">
              Communications in Computer and Information Science (CCIS) publishes high-quality conference proceedings covering fundamental computing research. It provides wide global visibility and electronic distribution via SpringerLink.
            </p>
            <p class="text-sm text-[#333333] leading-relaxed">
              All accepted and registered papers presented at MIDAS-2025 will appear in the proceedings volumes, subject to final Springer editorial review.
            </p>
          </div>

          <div class="bg-[#fafafc] p-6 rounded-2xl border border-[#e0e0e0] space-y-3">
            <h4 class="text-sm font-semibold text-[#1d1d1f]">Indexing & Quality Assurance:</h4>
            <div class="flex items-center justify-between text-xs py-1 border-b border-[#e0e0e0]/70">
              <span class="text-[#7a7a7a]">Indexing:</span>
              <span class="font-medium text-[#1d1d1f]">Scopus, EI Compendex, DBLP, Google Scholar</span>
            </div>
            <div class="flex items-center justify-between text-xs py-1 border-b border-[#e0e0e0]/70">
              <span class="text-[#7a7a7a]">Publisher:</span>
              <span class="font-medium text-[#1d1d1f]">Springer Nature Switzerland AG</span>
            </div>
            <div class="flex items-center justify-between text-xs py-1 border-b border-[#e0e0e0]/70">
              <span class="text-[#7a7a7a]">Electronic Format:</span>
              <span class="font-medium text-[#1d1d1f]">SpringerLink Digital Library</span>
            </div>
            <div class="flex items-center justify-between text-xs py-1">
              <span class="text-[#7a7a7a]">Series ISSN:</span>
              <span class="font-medium text-[#1d1d1f]">1865-0929</span>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#7a7a7a]">
          Direct Reference: <a href="${conferenceInfo.proceedingsLink}" target="_blank" class="text-[#0066cc] underline break-all">${conferenceInfo.proceedingsLink}</a>
        </div>
      </div>
    </div>
  `;
}

function renderPlacesTab() {
  return `
    <div class="space-y-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Places to Visit in Gajapati, Odisha</h2>
        <p class="text-sm text-[#7a7a7a]">Discover the rich historic palaces, natural waterfalls, and sacred monasteries near the conference venue.</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${placesToVisit.map(p => `
          <div class="bg-white rounded-3xl overflow-hidden border border-[#e0e0e0] apple-card flex flex-col justify-between">
            <div>
              <div class="h-48 overflow-hidden bg-neutral-100">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div class="p-6">
                <span class="text-xs font-semibold text-[#0066cc] block mb-1">${p.distance}</span>
                <h3 class="text-xl font-semibold text-[#1d1d1f] mb-2">${p.name}</h3>
                <p class="text-xs text-[#333333] leading-relaxed line-clamp-4">${p.description}</p>
              </div>
            </div>
            <div class="p-6 pt-0">
              <a href="https://www.google.com/maps?q=${p.mapQuery}" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-xs w-full py-2">
                Open in Google Maps &nearr;
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAccommodationTab() {
  return `
    <div class="space-y-8">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <h2 class="text-2xl font-semibold text-[#1d1d1f] mb-3">Accommodation Facilities</h2>
        <p class="text-sm text-[#7a7a7a] mb-8">
          On-campus boarding at Centurion University Parlakhemundi and affiliated hospitality partners.
        </p>

        <div class="space-y-4 mb-8">
          <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-4">
            <span class="w-8 h-8 rounded-xl bg-blue-100 text-[#0066cc] flex items-center justify-center shrink-0 text-sm font-bold">1</span>
            <div>
              <h3 class="text-sm font-semibold text-[#1d1d1f]">Campus Guest House & Hostel Facilities:</h3>
              <p class="text-xs text-[#7a7a7a] mt-1">Accommodation facilities will be provided at the lush CUTM Parlakhemundi Campus for outstation delegates and researchers.</p>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-4">
            <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold">2</span>
            <div>
              <h3 class="text-sm font-semibold text-[#1d1d1f]">Tariff & Charges Announcement:</h3>
              <p class="text-xs text-[#7a7a7a] mt-1">Accommodation charges and subsidized scholar room rates will be announced soon.</p>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-4">
            <span class="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 text-sm font-bold">3</span>
            <div>
              <h3 class="text-sm font-semibold text-[#1d1d1f]">Allocation Rule:</h3>
              <p class="text-xs text-[#7a7a7a] mt-1">Accommodation will be allocated strictly on a <strong>first-come, first-served basis</strong> due to limited on-campus executive suites.</p>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-[#fafafc] border border-[#e0e0e0] flex items-start gap-4">
            <span class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-sm font-bold">4</span>
            <div>
              <h3 class="text-sm font-semibold text-[#1d1d1f]">Accommodation Desk Inquiry:</h3>
              <p class="text-xs text-[#7a7a7a] mt-1">Direct contact numbers and online reservation form for accommodation inquiries will be updated shortly.</p>
            </div>
          </div>
        </div>

        <div class="p-6 bg-[#f5f5f7] rounded-2xl border border-[#e0e0e0] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="text-xs text-[#7a7a7a] block">Need early assistance with travel logistics?</span>
            <span class="text-sm font-semibold text-[#1d1d1f]">Email: midas2024@cutm.ac.in</span>
          </div>
          <button data-action="open-contact-modal" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] text-xs px-5 py-2.5">
            Contact Logistics Coordinator
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderGalleryTab() {
  return `
    <div class="space-y-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h2 class="text-3xl font-semibold text-[#1d1d1f] tracking-tight mb-2">Photo Gallery</h2>
        <p class="text-sm text-[#7a7a7a]">Visual moments from Centurion University campus, academic symposiums, and Gajapati landscapes.</p>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${galleryImages.map((img, idx) => `
          <div 
            data-gallery-item="${idx}" 
            class="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-[#e0e0e0] bg-neutral-100 apple-card"
          >
            <img src="${img.src}" alt="${img.title}" class="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
              <span class="text-xs text-[#2997ff] font-semibold">${img.category}</span>
              <h3 class="text-sm font-semibold leading-tight mt-1">${img.title}</h3>
              <span class="text-[11px] text-neutral-300 mt-2 flex items-center gap-1">Click to Expand &rarr;</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// VIEW 6: REGISTRATION / LOGIN PAGE
function renderAuthPage(activeTab = 'register') {
  return `
    <div class="py-12 bg-white border-b border-[#f0f0f0]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs text-[#333333] mb-4">
          <span class="w-2 h-2 rounded-full bg-[#0066cc]"></span>
          <span>Attendee & Author Portal</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
          Registration & Login
        </h1>
        <p class="text-base text-[#7a7a7a] mb-8">
          Register your accepted paper, enroll as a delegate attendee, or log in to manage your submissions.
        </p>

        <!-- Pill switcher -->
        <div class="inline-flex p-1.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] gap-1">
          <button 
            data-auth-tab-btn="register" 
            class="px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'register' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-[#1d1d1f] hover:text-[#0066cc]'}"
          >
            Conference Registration
          </button>
          <button 
            data-auth-tab-btn="login" 
            class="px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'login' ? 'bg-[#0066cc] text-white shadow-sm' : 'text-[#1d1d1f] hover:text-[#0066cc]'}"
          >
            Author / Reviewer Login
          </button>
        </div>
      </div>
    </div>

    <div class="py-16 bg-[#f5f5f7]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        ${activeTab === 'register' ? renderRegisterSection() : renderLoginSection()}
      </div>
    </div>
  `;
}

function renderRegisterSection() {
  return `
    <div class="space-y-10">
      <!-- Fee structure table -->
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl font-semibold text-[#1d1d1f]">Registration Fee Schedule</h2>
            <p class="text-xs text-[#7a7a7a] mt-1">Mandatory for at least one author per accepted paper to register.</p>
          </div>
          <a href="${conferenceInfo.registrationFormLink}" target="_blank" rel="noopener noreferrer" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] text-xs px-5 py-2.5">
            Open Official Google Form &nearr;
          </a>
        </div>

        <div class="overflow-x-auto border border-[#e0e0e0] rounded-2xl mb-8">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-[#f5f5f7] text-[#1d1d1f] font-semibold border-b border-[#e0e0e0]">
              <tr>
                <th class="p-4">Category</th>
                <th class="p-4">Indian (INR)</th>
                <th class="p-4">International (USD)</th>
                <th class="p-4">Includes</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#f0f0f0] text-[#333333]">
              ${registrationFees.map(f => `
                <tr class="hover:bg-neutral-50/50">
                  <td class="p-4 font-medium text-[#1d1d1f]">${f.category}</td>
                  <td class="p-4 font-mono font-semibold text-[#0066cc]">${f.inr}</td>
                  <td class="p-4 font-mono">${f.usd}</td>
                  <td class="p-4 text-xs text-[#7a7a7a]">${f.includes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Inclusions highlights -->
        <div class="p-5 bg-blue-50/70 border border-blue-200/60 rounded-2xl mb-8">
          <h3 class="text-sm font-semibold text-[#1d1d1f] mb-2">Author/Co-Author Registration Fee Includes:</h3>
          <div class="grid sm:grid-cols-3 gap-3 text-xs text-[#333333]">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Official Conference Kit</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>High Tea & Networking Sessions</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span>Working Lunch (Both Days)</span>
            </div>
          </div>
        </div>

        <!-- Registration form -->
        <h3 class="text-lg font-semibold text-[#1d1d1f] mb-4">Online Conference Registration Form</h3>
        <form id="registration-form" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Full Name *</label>
              <input type="text" required placeholder="e.g. Dr. Rajesh Kumar" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]" />
            </div>
            <div>
              <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Email Address *</label>
              <input type="email" required placeholder="name@institution.edu" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]" />
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Affiliation / University *</label>
              <input type="text" required placeholder="Department, University, Country" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]" />
            </div>
            <div>
              <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Paper ID (CMT3) if presenting</label>
              <input type="text" placeholder="e.g. MIDAS-2025-042" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]" />
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Participant Category *</label>
              <select class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]">
                <option>Indian Academicians / Faculty (₹ 7,000)</option>
                <option>Indian Research Scholar / Student (₹ 5,000)</option>
                <option>Industry Delegate (₹ 9,000)</option>
                <option>Foreign / International Author ($ 250)</option>
                <option>Attendee / Co-Author Non-Presenting (₹ 2,500)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Attendance Mode *</label>
              <select class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]">
                <option>In-Person (CUTM Parlakhemundi Campus)</option>
                <option>Online / Virtual Mode</option>
              </select>
            </div>
          </div>

          <button type="submit" class="apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] px-8 py-3 text-sm font-medium w-full sm:w-auto">
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderLoginSection() {
  return `
    <div class="max-w-md mx-auto">
      <div class="bg-white p-8 sm:p-10 rounded-3xl border border-[#e0e0e0] shadow-sm">
        <h2 class="text-2xl font-semibold text-[#1d1d1f] mb-1 text-center">Conference Portal Login</h2>
        <p class="text-xs text-[#7a7a7a] text-center mb-6">Enter your registered email and credentials</p>

        <form id="login-form" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Account Role</label>
            <select id="login-role" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]">
              <option value="Author">Author / Submitter</option>
              <option value="Reviewer">Technical Reviewer</option>
              <option value="Committee">Committee Member</option>
              <option value="Attendee">Registered Delegate</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Email Address</label>
            <input type="email" id="login-email" required placeholder="author@domain.com" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]" />
          </div>

          <div>
            <label class="block text-xs font-medium text-[#7a7a7a] mb-1">Password</label>
            <input type="password" id="login-password" required placeholder="••••••••" class="w-full px-4 py-2.5 rounded-xl border border-[#e0e0e0] text-sm focus:outline-none focus:border-[#0066cc] bg-[#fafafc]" />
          </div>

          <div class="flex items-center justify-between text-xs">
            <label class="flex items-center gap-2 text-[#7a7a7a]">
              <input type="checkbox" checked class="rounded border-[#e0e0e0] text-[#0066cc]" />
              <span>Remember me</span>
            </label>
            <a href="javascript:void(0)" onclick="alert('Password reset link sent to registered email.')" class="text-[#0066cc] hover:underline">Forgot password?</a>
          </div>

          <button type="submit" class="w-full apple-pill-btn bg-[#0066cc] text-white hover:bg-[#0071e3] py-3 text-sm font-medium">
            Sign In to MIDAS Portal
          </button>

          <div class="pt-4 border-t border-[#f0f0f0] text-center">
            <span class="text-xs text-[#7a7a7a]">Don't have an account? </span>
            <button type="button" data-auth-tab-btn="register" class="text-xs text-[#0066cc] font-medium hover:underline">
              Register here
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// BIND DYNAMIC EVENT LISTENERS
function bindDynamicEvents() {
  // Program tabs button click
  document.querySelectorAll('[data-program-tab-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-program-tab-btn');
      state.programTab = targetTab;
      window.location.hash = `program/${targetTab}`;
    });
  });

  // Auth tabs button click
  document.querySelectorAll('[data-auth-tab-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-auth-tab-btn');
      state.authTab = targetTab;
      window.location.hash = targetTab === 'login' ? 'login' : 'registration';
    });
  });

  // Sponsor tier apply button click
  document.querySelectorAll('[data-action="apply-sponsor"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tier = btn.getAttribute('data-tier');
      const contactModal = document.getElementById('contact-modal');
      const msgInput = document.getElementById('contact-message');
      if (msgInput) {
        msgInput.value = `Hello MIDAS Committee, our organization is interested in supporting MIDAS-2025 under the ${tier} tier. Please share the partnership agreement.`;
      }
      if (contactModal) contactModal.classList.remove('hidden');
    });
  });

  // Open contact modal
  document.querySelectorAll('[data-action="open-contact-modal"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const contactModal = document.getElementById('contact-modal');
      if (contactModal) contactModal.classList.remove('hidden');
    });
  });

  // Registration Form Submit
  const regForm = document.getElementById('registration-form');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Registration submitted successfully! Confirmation email will be dispatched.', 'success');
      regForm.reset();
    });
  }

  // Login Form Submit
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value || 'User';
      const role = document.getElementById('login-role')?.value || 'Author';
      showToast(`Welcome back, ${email} (${role})! Session authenticated.`, 'success');
    });
  }

  // Gallery Item Lightbox click
  document.querySelectorAll('[data-gallery-item]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-gallery-item'), 10);
      openLightbox(idx);
    });
  });
}

// Lightbox Modal for Gallery
function openLightbox(index) {
  state.lightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const categoryEl = document.getElementById('lightbox-category');

  if (!modal || !imgEl) return;

  const item = galleryImages[index];
  if (!item) return;

  imgEl.src = item.src;
  if (titleEl) titleEl.textContent = item.title;
  if (categoryEl) categoryEl.textContent = item.category;

  modal.classList.remove('hidden');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('hidden');
  state.lightboxIndex = null;
}

// Global Event Listeners initialization
export function initApp() {
  // Hash routing
  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeMobileDrawerBtn = document.getElementById('close-mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
      state.mobileMenuOpen = !mobileDrawer.classList.contains('hidden');
    });
  }

  if (closeMobileDrawerBtn && mobileDrawer) {
    closeMobileDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
      state.mobileMenuOpen = false;
    });
  }

  // Contact modal close button
  const closeContactModal = document.getElementById('close-contact-modal');
  const contactModal = document.getElementById('contact-modal');
  if (closeContactModal && contactModal) {
    closeContactModal.addEventListener('click', () => {
      contactModal.classList.add('hidden');
    });
  }

  // Contact form submission
  const contactForm = document.getElementById('footer-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for contacting MIDAS-2025. The secretariat will respond shortly.', 'success');
      contactForm.reset();
      if (contactModal) contactModal.classList.add('hidden');
    });
  }

  // Lightbox close button & navigation
  const closeLightboxBtn = document.getElementById('close-lightbox');
  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);

  const prevLightboxBtn = document.getElementById('prev-lightbox');
  if (prevLightboxBtn) {
    prevLightboxBtn.addEventListener('click', () => {
      if (state.lightboxIndex !== null) {
        const nextIdx = (state.lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(nextIdx);
      }
    });
  }

  const nextLightboxBtn = document.getElementById('next-lightbox');
  if (nextLightboxBtn) {
    nextLightboxBtn.addEventListener('click', () => {
      if (state.lightboxIndex !== null) {
        const nextIdx = (state.lightboxIndex + 1) % galleryImages.length;
        openLightbox(nextIdx);
      }
    });
  }

  // Copy email action buttons
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-copy-email') || 'midas2024@cutm.ac.in';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied email to clipboard: ${email}`, 'success');
      });
    });
  });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      if (contactModal) contactModal.classList.add('hidden');
      closeMobileMenu();
    }
  });
}

// Auto-run on load
document.addEventListener('DOMContentLoaded', initApp);
