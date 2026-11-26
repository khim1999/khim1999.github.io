document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun = document.getElementById('iconSun');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const saved = localStorage.getItem('portfolio_theme');
  const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(initial);

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (iconMoon && iconSun) {
      iconMoon.style.display = theme === 'dark' ? 'none' : 'block';
      iconSun.style.display = theme === 'dark' ? 'block' : 'none';
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio_theme', next);
      setTheme(next);
    });
  }

  // Project filter tabs
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f);
      });
    });
  });

  // Subtle scroll-in reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }
});
