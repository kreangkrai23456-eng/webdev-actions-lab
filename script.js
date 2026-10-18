const root = document.documentElement;
const themeBtn = document.querySelector('#themeBtn');
const helloBtn = document.querySelector('#helloBtn');
const statusEl = document.querySelector('#status');
const typedEl = document.querySelector('#typed');

/* ---------- สลับธีม (จำค่าไว้) ---------- */
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด';
}

let saved = null;
try { saved = localStorage.getItem('theme-friend'); } catch (e) {}
const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (preferDark ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme-friend', next); } catch (e) {}
});

/* ---------- ปุ่ม Say Hello เปลี่ยนข้อความ ---------- */
const greetings = [
  'Hello from GitHub Pages! 🎉',
  'Push แล้ว Actions ทำงานให้เอง ⚙️',
  'เว็บของฉันออนไลน์แล้ว 🌐',
  'ยินดีที่ได้รู้จักครับ 🙏'
];
let n = 0;
helloBtn.addEventListener('click', () => {
  statusEl.textContent = greetings[n % greetings.length];
  n++;
  statusEl.classList.remove('pop');
  void statusEl.offsetWidth;
  statusEl.classList.add('pop');
});

/* ---------- ข้อความพิมพ์อัตโนมัติ ---------- */
const lines = [
  'เรียนรู้ Git และ GitHub',
  'สร้างเว็บด้วย HTML, CSS, JavaScript',
  'Deploy อัตโนมัติด้วย GitHub Actions'
];
let li = 0, ci = 0, deleting = false;

function type() {
  const text = lines[li];
  ci += deleting ? -1 : 1;
  typedEl.textContent = text.slice(0, ci);

  let delay = deleting ? 35 : 75;
  if (!deleting && ci === text.length) { delay = 1500; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ---------- แถบ Skills เลื่อนเมื่อเลื่อนมาถึง ---------- */
const skills = document.querySelector('#skills');
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('ready'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 }).observe(skills);
} else {
  skills.classList.add('ready');
}