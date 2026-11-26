document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun = document.getElementById('iconSun');
  const year = document.getElementById('year');
  const progress = document.getElementById('scrollProgress');
  if (year) year.textContent = new Date().getFullYear();

  const saved = localStorage.getItem('portfolio_theme') || 'dark';
  setTheme(saved);

  function setTheme(theme) {
    html.classList.toggle('dark', theme === 'dark');
    if (iconMoon && iconSun) {
      iconMoon.classList.toggle('hidden', theme === 'dark');
      iconSun.classList.toggle('hidden', theme !== 'dark');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = html.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('portfolio_theme', next);
      setTheme(next);
    });
  }

  // Spotlight cursor glow
  document.querySelectorAll('.spotlight').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // One-click copy email
  document.querySelectorAll('.js-copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy;
      const label = btn.querySelector('.copy-label');
      try {
        await navigator.clipboard.writeText(text);
        if (label) {
          const orig = label.textContent;
          label.textContent = 'Copied!';
          setTimeout(() => (label.textContent = orig), 1800);
        }
      } catch {
        window.location.href = 'mailto:' + text;
      }
    });
  });

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

  // Scroll progress bar & active nav link
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('#navLinks a');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
    if (progress) progress.style.width = pct + '%';

    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 160) current = s.id;
    });
    navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }, { passive: true });

  // Scroll-in reveal
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
