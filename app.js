const $ = id => document.getElementById(id);

let userData = null;
let timerInterval = null;
let cravingTimerInterval = null;
let currentTab = 'tabHome';

const MILESTONES_DATA = [
  { t: 20*60*1000, k:'20 min', ka:'٢٠ دقيقة', icon:'M3 12h4l2-4 4 8 2-4h6', title:'Heart rate normalizes', titlea:'معدل ضربات القلب يستقر', body:'Your blood pressure drops back to baseline.', bodya:'ضغط الدم يعود لطبيعته.' },
  { t: 8*3600*1000, k:'8 hours', ka:'٨ ساعات', icon:'M12 4v9 M12 13c0-3-2-5-4-5s-4 2-4 5v3a4 4 0 0 0 4 4c1 0 2-1 2-2v-5 M12 13c0-3 2-5 4-5s4 2 4 5v3a4 4 0 0 1-4 4c-1 0-2-1-2-2v-5', title:'Oxygen returns', titlea:'الأكسجين يعود', body:'Carbon monoxide clears, oxygen levels normalize.', bodya:'أول أكسيد الكربون يزول، الأكسجين يعود لطبيعته.' },
  { t: 24*3600*1000, k:'24 hours', ka:'٢٤ ساعة', icon:'M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20z', title:'Heart attack risk drops', titlea:'خطر الأزمة القلبية ينخفض', body:'Your cardiovascular system begins recovering.', bodya:'جهازك القلبي الوعائي يبدأ التعافي.' },
  { t: 48*3600*1000, k:'2 days', ka:'يومان', icon:'M12 3s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z', title:'Taste & smell return', titlea:'عودة الذوق والشم', body:'Damaged nerve endings start regenerating.', bodya:'النهايات العصبية تبدأ التجدد.' },
  { t: 72*3600*1000, k:'3 days', ka:'٣ أيام', icon:'M3 8h12a3 3 0 1 0-3-3 M3 16h16a3 3 0 1 1-3 3 M3 12h10', title:'Breathing eases', titlea:'التنفس يتحسن', body:'Bronchial tubes relax, breathing becomes easier.', bodya:'الشعب الهوائية تسترخي.' },
  { t: 5*86400*1000, k:'5 days', ka:'٥ أيام', icon:'M12 3c-3 0-5.5 2-7 5 1.5 3 4 5 7 5s5.5-2 7-5c-1.5-3-4-5-7-5z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', title:'Vision sharpens', titlea:'الرؤية تتحسّن', body:'Blood flow to the eyes improves, vision gets clearer.', bodya:'تدفق الدم للعينين يتحسّن والرؤية أوضح.' },
  { t: 7*86400*1000, k:'1 week', ka:'أسبوع', icon:'M12 3a9 9 0 1 0 9 9 M12 3v9l6-6', title:'Nicotine fully cleared', titlea:'النيكوتين يخرج تمامًا', body:'All nicotine and its metabolites have left your body.', bodya:'كل النيكوتين ومشتقاته غادرت جسمك.' },
  { t: 10*86400*1000, k:'10 days', ka:'١٠ أيام', icon:'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0 M9 10c.5-.5 1-1 1.5-1s1 .5 1.5 1 M14.5 10c-.5-.5-1-1-1.5-1s-1 .5-1.5 1 M8 15c1 2 3 3 4 3s3-1 4-3', title:'Gum circulation restored', titlea:'الدورة الدموية للثة تتعافى', body:'Your gums and teeth are getting better blood supply.', bodya:'اللثة والأسنان تحصل على تدفق دم أفضل.' },
  { t: 14*86400*1000, k:'2 weeks', ka:'أسبوعان', icon:'M12 22V11 M12 11c-4-2-6-6-4-9 3-1 6 2 7 5 M12 11c4-2 6-6 4-9-3-1-6 2-7 5', title:'Circulation improves', titlea:'تحسن الدورة الدموية', body:'Walking and exercise feel noticeably easier.', bodya:'المشي والتمرين أسهل بوضوح.' },
  { t: 21*86400*1000, k:'3 weeks', ka:'٣ أسابيع', icon:'M12 3v18 M5 8c2-3 5-5 7-5s5 2 7 5 M5 16c2 3 5 5 7 5s5-2 7-5', title:'Brain receptors normalizing', titlea:'مستقبلات الدماغ تتعافى', body:'Nicotine receptors return to normal levels.', bodya:'مستقبلات النيكوتين في الدماغ تعود لمستوياتها الطبيعية.' },
  { t: 30*86400*1000, k:'1 month', ka:'شهر', icon:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', title:'Lungs self-cleaning', titlea:'الرئتان تتطهران', body:'Cilia regrow, infection risk drops sharply.', bodya:'الأهداب تتجدد، خطر العدوى ينخفض.' },
  { t: 60*86400*1000, k:'2 months', ka:'شهران', icon:'M3 12h4l2-4 4 8 2-4h6', title:'Heart rhythm stabilizes', titlea:'نبض القلب يستقر', body:'Your resting heart rate has dropped significantly.', bodya:'معدل نبض القلب أثناء الراحة انخفض بشكل ملحوظ.' },
  { t: 90*86400*1000, k:'3 months', ka:'٣ أشهر', icon:'M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z', title:'Lung function +10%', titlea:'وظيفة الرئة +١٠٪', body:'Significantly easier breathing during activity.', bodya:'تنفس أسهل بكثير أثناء النشاط.' },
  { t: 180*86400*1000, k:'6 months', ka:'٦ أشهر', icon:'M12 4v9 M12 13c0-3-2-5-4-5s-4 2-4 5v3a4 4 0 0 0 4 4c1 0 2-1 2-2v-5 M12 13c0-3 2-5 4-5s4 2 4 5v3a4 4 0 0 1-4 4c-1 0-2-1-2-2v-5', title:'Coughing subsides', titlea:'السعال يتراجع', body:'Chronic cough and shortness of breath are dramatically reduced.', bodya:'السعال المزمن وضيق التنفس تراجعا بشكل ملحوظ.' },
  { t: 270*86400*1000, k:'9 months', ka:'٩ أشهر', icon:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', title:'Lung repair complete', titlea:'إصلاح الرئتين يكتمل', body:'Cilia fully restored; infections and colds decline sharply.', bodya:'الأهداب استُعيدت بالكامل؛ العدوى ونزلات البرد تنخفض.' },
  { t: 365*86400*1000, k:'1 year', ka:'سنة', icon:'M8 4h8v4a4 4 0 0 1-8 0z M5 4H3v2a3 3 0 0 0 3 3 M19 4h2v2a3 3 0 0 1-3 3 M10 14h4v3a2 2 0 0 1-2 2 2 2 0 0 1-2-2z M8 21h8', title:'Heart disease risk halved', titlea:'خطر أمراض القلب ينخفض للنصف', body:"Your coronary risk is now half a smoker's.", bodya:'خطر أمراض الشريان التاجي نصف ما عند المدخن.' },
  { t: 2*365*86400*1000, k:'2 years', ka:'سنتان', icon:'M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20z', title:'Stroke risk normalized', titlea:'خطر السكتة الدماغية يعود لطبيعته', body:'Your stroke risk is now comparable to a non-smoker.', bodya:'خطر السكتة الدماغية أصبح مماثلًا لغير المدخن.' },
  { t: 5*365*86400*1000, k:'5 years', ka:'٥ سنوات', icon:'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0 M9 12h6 M12 8v8', title:'Cancer risk halved', titlea:'خطر السرطان ينخفض للنصف', body:'Mouth, throat, esophagus and bladder cancer risk cut by 50%.', bodya:'خطر سرطان الفم والحلق والمريء والمثانة انخفض بنسبة ٥٠٪.' },
  { t: 10*365*86400*1000, k:'10 years', ka:'١٠ سنوات', icon:'M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z', title:'Lung cancer risk halved', titlea:'خطر سرطان الرئة ينخفض للنصف', body:'Your lung cancer risk is now half that of a continuing smoker.', bodya:'خطر سرطان الرئة نصف ما عند المدخن المستمر.' },
];

const checkSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-11"/></svg>';

function svgIcon(pathD, size=16) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${pathD}"/></svg>`;
}

function loadData() {
  const raw = localStorage.getItem('qt_data');
  if (raw) { userData = JSON.parse(raw); return true; }
  return false;
}
function saveData() { localStorage.setItem('qt_data', JSON.stringify(userData)); }

/* ============ INIT ============ */
function init() {
  const theme = localStorage.getItem('qt_theme') || 'dark';
  document.documentElement.dataset.theme = theme;
  setLanguage(currentLang);

  if (loadData() && localStorage.getItem('qt_onboarded') === '1') {
    showApp();
  } else {
    showOnboarding();
  }
  bindEvents();
}

function bindEvents() {
  // Tabs
  document.querySelectorAll('.tab[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  // FAB
  $('fabSOS').addEventListener('click', openCravingSheet);
  $('cravingBtn').addEventListener('click', openCravingSheet);
  $('sheetBackdrop').addEventListener('click', closeCravingSheet);
  $('sheetClose').addEventListener('click', closeCravingSheet);
  // Settings
  $('settingsBtn').addEventListener('click', () => switchTab('tabProfile'));
  // Reset
  $('resetBtn').addEventListener('click', () => {
    if (confirm(currentLang === 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?')) {
      localStorage.clear();
      userData = null;
      location.reload();
    }
  });
  // Lang toggles
  document.querySelectorAll('.toggle-btn[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      renderAll();
    });
  });
  // Theme toggles
  document.querySelectorAll('.toggle-btn[data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.dataset.theme = btn.dataset.theme;
      localStorage.setItem('qt_theme', btn.dataset.theme);
      updateToggleButtons();
      updateThemeIcon();
    });
  });
}

function switchTab(tabId) {
  currentTab = tabId;
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.tab[data-tab]').forEach(tb => tb.classList.remove('active'));
  $(tabId).classList.add('active');
  document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
  // Show FAB only on home
  $('fabSOS').style.display = tabId === 'tabHome' ? 'flex' : 'none';
  // Scroll to top
  $('appScroll').scrollTop = 0;
  renderAll();
}

function updateThemeIcon() {
  const theme = document.documentElement.dataset.theme;
  const el = $('themeIcon');
  if (theme === 'dark') {
    el.innerHTML = '<path d="M21 13A9 9 0 0 1 11 3a7 7 0 1 0 10 10z"/>';
  } else {
    el.innerHTML = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  }
}

/* ============ ONBOARDING ============ */
let obStep = 0;
let obData = { perDay: 20, price: 60, perPack: 20, when: 'now' };
const obIcons = [
  'M2 16h16v4H2z M18 16v4 M14 16v4 M19 9c0-2 2-2 2-4 M16 9c0-2 2-2 2-4',
  'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0 M9 12h6 M12 8v8',
  'M12 22V11 M12 11c-4-2-6-6-4-9 3-1 6 2 7 5 M12 11c4-2 6-6 4-9-3-1-6 2-7 5',
  'M3 5h18v16H3z M3 10h18 M8 3v4 M16 3v4',
];
const obKeys = ['perDay', 'price', 'perPack', 'when'];
const obDefaults = [20, 60, 20, 'now'];

function showOnboarding() {
  $('onboarding').classList.add('active');
  $('onboarding').style.display = 'flex';
  $('app').style.display = 'none';
  obStep = 0;
  renderObStep();
  $('obNext').addEventListener('click', nextObStep);
}

function renderObStep() {
  const lang = currentLang;
  $('obStep').textContent = `${t('step')} ${obStep + 1} / 4`;
  $('obBar').style.width = `${((obStep + 1) / 4) * 100}%`;

  // Icon
  const paths = obIcons[obStep].split(' M');
  $('obIcon').innerHTML = paths.map((p, i) => `<path d="${i > 0 ? 'M' : ''}${p}"/>`).join('');

  $('obTitle').textContent = t(`obStep${obStep + 1}`);
  $('obSub').textContent = t(`obStep${obStep + 1}Sub`);

  if (obStep < 3) {
    $('obInputArea').style.display = '';
    $('obWhenArea').style.display = 'none';
    $('obInput').value = obData[obKeys[obStep]];
    $('obSuffix').textContent = t(`obStep${obStep + 1}Suffix`);
  } else {
    $('obInputArea').style.display = 'none';
    $('obWhenArea').style.display = '';
    renderWhenOptions();
  }

  // Projection on step 2
  if (obStep === 1) {
    $('obProjection').style.display = '';
    const yearly = Math.round((obData.perDay / obData.perPack) * obData.price * 365);
    $('obProjLabel').textContent = t('projection');
    $('obProjValue').textContent = `${fmtNum(yearly)} EGP`;
    $('obProjSub').textContent = t('savedFirstYear');
  } else {
    $('obProjection').style.display = 'none';
  }

  $('obNext').innerHTML = obStep < 3
    ? `${t('continue')} ${svgIcon('M5 12h14M13 6l6 6-6 6', 18)}`
    : `${t('beginJourney')} ${svgIcon('M5 12h14M13 6l6 6-6 6', 18)}`;
}

function renderWhenOptions() {
  const options = [
    { v: 'now', l: t('rightNow'), s: t('rightNowSub') },
    { v: 'today', l: t('earlierToday'), s: t('earlierTodaySub') },
    { v: 'past', l: t('aWhileAgo'), s: t('aWhileAgoSub') },
  ];

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const nowStr = now.toISOString().slice(0, 16);

  let html = options.map(o => `
    <button class="ob-when-option ${obData.when === o.v ? 'selected' : ''}" data-when="${o.v}">
      <div class="col" style="align-items:flex-start;flex:1">
        <div style="font-size:15px;font-weight:600">${o.l}</div>
        <div class="t-cap" style="margin-top:2px">${o.s}</div>
      </div>
      <div class="ob-radio">${obData.when === o.v ? '<div class="ob-radio-dot"></div>' : ''}</div>
    </button>
  `).join('');

  if (obData.when === 'today') {
    html += `
      <div class="card mt-3" style="padding:14px 16px">
        <label class="t-label" style="display:block;margin-bottom:8px">${t('pickTime')}</label>
        <input type="time" id="obTimeInput" class="ob-datetime-input" value="${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}">
      </div>`;
  } else if (obData.when === 'past') {
    html += `
      <div class="card mt-3" style="padding:14px 16px">
        <label class="t-label" style="display:block;margin-bottom:8px">${t('pickDateTime')}</label>
        <input type="datetime-local" id="obDateTimeInput" class="ob-datetime-input" value="${nowStr}" max="${nowStr}">
      </div>`;
  }

  $('obWhenArea').innerHTML = html;
  $('obWhenArea').querySelectorAll('.ob-when-option').forEach(btn => {
    btn.addEventListener('click', () => {
      obData.when = btn.dataset.when;
      renderWhenOptions();
    });
  });
}

function nextObStep() {
  if (obStep < 3) {
    obData[obKeys[obStep]] = Number($('obInput').value) || obDefaults[obStep];
  }
  if (obStep < 3) {
    obStep++;
    renderObStep();
  } else {
    finishOnboarding();
  }
}

function finishOnboarding() {
  let startedAt;
  if (obData.when === 'now') {
    startedAt = Date.now();
  } else if (obData.when === 'today') {
    const timeInput = $('obTimeInput');
    if (timeInput && timeInput.value) {
      const [h, m] = timeInput.value.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      startedAt = d.getTime();
    } else {
      startedAt = Date.now() - 4 * 3600 * 1000;
    }
  } else {
    const dtInput = $('obDateTimeInput');
    if (dtInput && dtInput.value) {
      startedAt = new Date(dtInput.value).getTime();
    } else {
      startedAt = Date.now() - 38 * 3600 * 1000;
    }
  }
  userData = {
    perDay: obData.perDay,
    price: obData.price,
    perPack: obData.perPack,
    startedAt,
    cravings: 0,
    unlockedAchievements: [],
  };
  saveData();
  localStorage.setItem('qt_onboarded', '1');
  showApp();
}

/* ============ APP ============ */
function showApp() {
  $('onboarding').classList.remove('active');
  $('onboarding').style.display = 'none';
  $('app').style.display = 'flex';
  $('app').classList.add('active');
  updateThemeIcon();
  updateToggleButtons();
  startTimer();
  renderAll();
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!userData) return;
  const elapsed = Math.max(0, Date.now() - userData.startedAt);
  const totalSec = Math.floor(elapsed / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  $('timerDays').textContent = fmtNum(days);
  $('timerHours').textContent = String(hrs).padStart(2, '0');
  $('timerMinutes').textContent = String(mins).padStart(2, '0');
  $('timerSeconds').textContent = String(secs).padStart(2, '0');

  // Ring progress (target: next milestone)
  const nextMs = MILESTONES_DATA.find(m => m.t > elapsed);
  const target = nextMs ? nextMs.t : MILESTONES_DATA[MILESTONES_DATA.length - 1].t;
  const pct = Math.min(100, (elapsed / target) * 100);
  const C = 2 * Math.PI * 64;
  $('heroRing').setAttribute('stroke-dasharray', C);
  $('heroRing').setAttribute('stroke-dashoffset', C - (C * pct) / 100);

  // Day label
  $('dayLabel').textContent = `${t('today')} — ${t('days').charAt(0).toUpperCase()}${t('days').slice(1)} ${fmtNum(days + 1)}`;

  // Streak
  $('streakText').textContent = currentLang === 'ar'
    ? `سلسلة ${fmtNum(days + 1)} يوم`
    : `${days + 1}-day streak`;
  $('streakPct').textContent = currentLang === 'ar'
    ? `${fmtNum(Math.round(pct))}٪ للشارة التالية`
    : `${Math.round(pct)}% to next badge`;

  // Stats
  const cigsAvoided = (elapsed / 86400000) * userData.perDay;
  const moneySaved = (cigsAvoided / userData.perPack) * userData.price;
  const lifeMin = cigsAvoided * 11;

  $('moneySaved').textContent = fmtNum(Math.round(moneySaved));
  $('cigsAvoided').textContent = fmtNum(Math.floor(cigsAvoided));
  $('lifeRegained').textContent = `${fmtNum(Math.floor(lifeMin / 60))}h`;

  // Craving count
  $('cravingCount').textContent = fmtNum(userData.cravings || 0);

  // Next milestone card
  renderNextMilestone(elapsed);

  // Stats tab (only update if visible)
  if (currentTab === 'tabStats') renderStatsTab(elapsed, cigsAvoided, moneySaved, lifeMin);
}

function renderNextMilestone(elapsed) {
  const nextIdx = MILESTONES_DATA.findIndex(m => m.t > elapsed);
  if (nextIdx < 0) {
    $('nextMsContent').innerHTML = `<div style="font-size:16px;font-weight:600">${currentLang === 'ar' ? 'جميع الإنجازات مكتملة!' : 'All milestones complete!'}</div>`;
    $('nextMsBar').style.width = '100%';
    return;
  }
  const m = MILESTONES_DATA[nextIdx];
  const prev = nextIdx > 0 ? MILESTONES_DATA[nextIdx - 1].t : 0;
  const pct = Math.min(100, ((elapsed - prev) / (m.t - prev)) * 100);
  const title = currentLang === 'ar' ? m.titlea : m.title;
  const k = currentLang === 'ar' ? m.ka : m.k;

  $('nextMsContent').innerHTML = `
    <div style="width:44px;height:44px;border-radius:14px;background:var(--surface);display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${m.icon.split(' M').map((p,i) => `<path d="${i>0?'M':''}${p}"/>`).join('')}</svg>
    </div>
    <div style="flex:1">
      <div style="font-size:16px;font-weight:600">${title}</div>
      <div class="t-cap" style="margin-top:2px">${t('unlocksAt')} ${k}</div>
    </div>
    <div class="t-num text-gold" style="font-size:18px">${Math.round(pct)}%</div>
  `;
  $('nextMsBar').style.width = `${pct}%`;
}

function renderAll() {
  if (!userData) return;
  renderMilestones();
  renderProfileTab();
  updateThemeIcon();
  updateToggleButtons();
}

/* ============ MILESTONES TAB ============ */
function renderMilestones() {
  const elapsed = Date.now() - userData.startedAt;
  const nextIdx = MILESTONES_DATA.findIndex(m => m.t > elapsed);

  $('milestonesTimeline').innerHTML = MILESTONES_DATA.map((m, i) => {
    const done = elapsed >= m.t;
    const isNext = i === nextIdx;
    const cls = done ? 'done' : isNext ? 'now' : '';
    const title = currentLang === 'ar' ? m.titlea : m.title;
    const body = currentLang === 'ar' ? m.bodya : m.body;
    const k = currentLang === 'ar' ? m.ka : m.k;
    const iconPaths = m.icon.split(' M').map((p, j) => `<path d="${j > 0 ? 'M' : ''}${p}"/>`).join('');

    return `
      <div class="ms ${cls}">
        <div class="ms-dot">${done ? checkSvg : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconPaths}</svg>`}</div>
        <div class="ms-body">
          <div class="when">${k}</div>
          <h4>${title}</h4>
          <p>${body}</p>
        </div>
      </div>
    `;
  }).join('');
}

/* ============ STATS TAB ============ */
function renderStatsTab(elapsed, cigsAvoided, moneySaved, lifeMin) {
  const days = elapsed / 86400000;
  $('statsMoney').textContent = fmtNum(Math.round(moneySaved));
  $('statsMoneyRate').textContent = `EGP · ${t('atThisRate')} ${fmtNum(Math.round(moneySaved * 365 / Math.max(days, 0.1)))} / ${t('year')}`;
  $('statsCigs').textContent = fmtNum(Math.floor(cigsAvoided));
  $('statsLife').innerHTML = `${fmtNum(Math.floor(lifeMin / 60))}<span style="font-size:18px;color:var(--ink-2)">h ${fmtNum(Math.floor(lifeMin % 60))}m</span>`;

  const equivs = [
    { l: t('coffees'), v: fmtNum(Math.floor(moneySaved / 80)) },
    { l: t('marathons'), v: fmtNum((lifeMin / 60 / 4).toFixed(1)) },
    { l: t('tarAvoided'), v: fmtNum(Math.floor(cigsAvoided * 0.01 * 100) / 100) },
  ];
  $('equivalents').innerHTML = equivs.map((r, i, a) => `
    <div class="row-flex" style="justify-content:space-between;padding:12px 0;${i < a.length - 1 ? 'border-bottom:1px dashed var(--border)' : ''}">
      <span class="t-body" style="color:var(--ink)">${r.l}</span>
      <span class="t-num" style="font-size:16px;color:var(--gold)">${r.v}</span>
    </div>
  `).join('');
}

/* ============ PROFILE TAB ============ */
function renderProfileTab() {
  $('profileName').textContent = `${t('quitter')} #${fmtNum(2847)}`;
  $('profileJoined').textContent = `${t('joined')} · ${new Date(userData.startedAt).toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US')}`;

  const items = [
    { icon: 'M2 16h16v4H2z M18 16v4 M14 16v4 M19 9c0-2 2-2 2-4 M16 9c0-2 2-2 2-4', l: t('cigsPerDay'), v: fmtNum(userData.perDay) },
    { icon: 'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0 M9 12h6 M12 8v8', l: t('packPrice'), v: `${fmtNum(userData.price)} EGP` },
    { icon: 'M12 22V11 M12 11c-4-2-6-6-4-9 3-1 6 2 7 5 M12 11c4-2 6-6 4-9-3-1-6 2-7 5', l: t('cigsPerPack'), v: fmtNum(userData.perPack) },
  ];

  $('profileSetup').innerHTML = items.map(r => {
    const paths = r.icon.split(' M').map((p, i) => `<path d="${i > 0 ? 'M' : ''}${p}"/>`).join('');
    return `
    <div class="row">
      <div class="row-flex gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>
        <span style="font-size:14px">${r.l}</span>
      </div>
      <span class="t-num" style="font-size:14px;color:var(--ink-2)">${r.v}</span>
    </div>`;
  }).join('');
}

/* ============ CRAVING SHEET ============ */
let cravingPhase = 'intro';
let cravingSecs = 60;

function openCravingSheet() {
  cravingPhase = 'intro';
  $('cravingSheet').style.display = '';
  renderCravingSheet();
}

function closeCravingSheet() {
  $('cravingSheet').style.display = 'none';
  if (cravingTimerInterval) { clearInterval(cravingTimerInterval); cravingTimerInterval = null; }
}

function renderCravingSheet() {
  const body = $('sheetBody');

  if (cravingPhase === 'intro') {
    body.innerHTML = `
      <div class="fade-in" style="margin-top:32px;text-align:center">
        <div style="display:inline-flex;padding:18px;border-radius:24px;background:color-mix(in oklab,var(--mint) 14%,transparent);color:var(--mint)">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h12a3 3 0 1 0-3-3"/><path d="M3 16h16a3 3 0 1 1-3 3"/><path d="M3 12h10"/></svg>
        </div>
        <h1 class="t-display mt-4" style="font-size:32px">${t('thisWillPass')}</h1>
        <p class="t-body mt-3" style="max-width:280px;margin:0 auto">${t('cravingSheetDesc')}</p>
        <div class="card mt-6" style="background:var(--surface-3);text-align:start">
          <div class="t-eyebrow">${t('yourRecord')}</div>
          <div class="row-flex mt-2" style="justify-content:space-between">
            <div class="t-num" style="font-size:28px;color:var(--mint)">${fmtNum(userData.cravings || 0)}</div>
            <div class="t-cap" style="text-align:end">${t('cravingsBeatSoFar')}</div>
          </div>
        </div>
        <button class="btn btn-primary mt-6" id="startBreathBtn">${t('startBreathing')} ${svgIcon('M5 12h14M13 6l6 6-6 6', 18)}</button>
      </div>
    `;
    $('startBreathBtn').addEventListener('click', () => { cravingPhase = 'breathe'; cravingSecs = 60; startCravingTimer(); renderCravingSheet(); });
  } else if (cravingPhase === 'breathe') {
    body.innerHTML = `
      <div class="fade-in" style="margin-top:24px;text-align:center;display:flex;flex-direction:column;align-items:center">
        <div class="t-eyebrow">${t('breatheInOut')}</div>
        <div class="breath mt-6">
          <div class="t-display" style="font-size:56px" id="breathCounter">${cravingSecs}</div>
        </div>
        <div class="t-cap mt-6">${t('matchBreath')}</div>
        <button class="btn btn-outline mt-6" id="skipBreathBtn">${t('skipAhead')}</button>
      </div>
    `;
    $('skipBreathBtn').addEventListener('click', () => { cravingPhase = 'reasons'; if (cravingTimerInterval) clearInterval(cravingTimerInterval); renderCravingSheet(); });
  } else if (cravingPhase === 'reasons') {
    const reasons = [
      { icon: 'M12 20s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C19 15.5 12 20 12 20z', t: t('myFamily'), s: t('myFamilySub'), c: 'var(--danger)' },
      { icon: 'M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0 M9 12h6 M12 8v8', t: t('moneySavings'), s: t('moneySavingsSub'), c: 'var(--gold)' },
      { icon: 'M12 4v9 M12 13c0-3-2-5-4-5s-4 2-4 5v3a4 4 0 0 0 4 4c1 0 2-1 2-2v-5 M12 13c0-3 2-5 4-5s4 2 4 5v3a4 4 0 0 1-4 4c-1 0-2-1-2-2v-5', t: t('breathingFreely'), s: t('breathingFreelySub'), c: 'var(--mint)' },
    ];
    body.innerHTML = `
      <div class="fade-in" style="margin-top:24px">
        <h2 class="t-display" style="font-size:28px">${t('whyDoingThis')}</h2>
        <div class="col gap-2 mt-4">
          ${reasons.map(r => {
            const paths = r.icon.split(' M').map((p, i) => `<path d="${i > 0 ? 'M' : ''}${p}"/>`).join('');
            return `<div class="card row-flex gap-3">
              <div style="width:40px;height:40px;border-radius:12px;background:color-mix(in oklab,${r.c} 14%,transparent);color:${r.c};display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>
              </div>
              <div>
                <div style="font-size:14px;font-weight:600">${r.t}</div>
                <div class="t-cap" style="margin-top:2px">${r.s}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <button class="btn btn-mint mt-6" style="width:100%" id="beatCravingBtn">${checkSvg} ${t('iBeatCraving')}</button>
        <button class="btn btn-outline mt-2" style="width:100%" id="notNowBtn">${t('notNow')}</button>
      </div>
    `;
    $('beatCravingBtn').addEventListener('click', () => {
      userData.cravings = (userData.cravings || 0) + 1;
      saveData();
      closeCravingSheet();
      showToast(currentLang === 'ar' ? '+١٠ نقطة · تغلبت على الرغبة' : '+10 XP · craving beaten');
      $('cravingCount').textContent = fmtNum(userData.cravings);
    });
    $('notNowBtn').addEventListener('click', closeCravingSheet);
  }
}

function startCravingTimer() {
  if (cravingTimerInterval) clearInterval(cravingTimerInterval);
  cravingTimerInterval = setInterval(() => {
    cravingSecs--;
    const el = $('breathCounter');
    if (el) el.textContent = cravingSecs;
    if (cravingSecs <= 0) {
      clearInterval(cravingTimerInterval);
      cravingPhase = 'reasons';
      renderCravingSheet();
    }
  }, 1000);
}

function showToast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.style.display = '';
  setTimeout(() => { el.style.display = 'none'; }, 2000);
}

document.addEventListener('DOMContentLoaded', init);
