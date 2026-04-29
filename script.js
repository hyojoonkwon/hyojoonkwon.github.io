// ── Dark mode ──
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = theme === 'dark' ? '○' : '●';
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || preferred);
}

const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
  });
}

initTheme();

// ── Mobile menu ──
const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuBtn) menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
if (menuClose) menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Language toggle ──
const LANG_KEY = 'portfolio-lang';

function applyLang(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = lang === 'kr' ? (el.dataset.kr || el.dataset.en) : el.dataset.en;
    el.innerHTML = text;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem(LANG_KEY, lang);
}

function initLang() {
  const saved = localStorage.getItem(LANG_KEY) || 'en';
  applyLang(saved);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

initLang();

// ── Project category filter ──
const projectFilter = document.getElementById('projectFilter');
const projectCards  = document.querySelectorAll('#projectGrid .project-card');

if (projectFilter && projectCards.length) {
  projectFilter.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      projectFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

// ── Blog tag filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const blogItems  = document.querySelectorAll('.blog-item');
const blogGroups = document.querySelectorAll('.blog-group');
const postCount  = document.getElementById('postCount');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visible = 0;

      if (filter === 'all') {
        blogItems.forEach(item => { item.style.display = ''; visible++; });
        blogGroups.forEach(group => { group.style.display = ''; });
      } else {
        blogGroups.forEach(group => {
          let groupVisible = 0;
          group.querySelectorAll('.blog-item').forEach(item => {
            const tags = (item.dataset.tags || '').split(' ');
            const match = tags.includes(filter) || tags.includes(filter.replace(' ', '-'));
            item.style.display = match ? '' : 'none';
            if (match) { groupVisible++; visible++; }
          });
          group.style.display = groupVisible > 0 ? '' : 'none';
        });
      }

      if (postCount) {
        postCount.textContent = visible + (visible === 1 ? ' post' : ' posts');
      }
    });
  });
}
