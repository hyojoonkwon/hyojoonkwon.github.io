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
