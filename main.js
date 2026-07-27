/* ═══════════════════════════════════════════════════
   PETER TIEWAH PORTFOLIO — SHARED JS
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sidebar active link (hash-based for same-page) ──
  function setActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
      const href = a.getAttribute('href').split('#')[0];
      a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
    });
  }
  setActive();

  // ── Intersection observer — reveal on scroll ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('up'), i * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  }

  // ── Animated counters ──
  document.querySelectorAll('[data-count]').forEach(el => {
    const io2 = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const target = +el.dataset.count;
      let cur = 0;
      const step = Math.ceil(target / 50);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(t);
      }, 35);
      io2.unobserve(el);
    }, { threshold: 0.5 });
    io2.observe(el);
  });

  // ── Mobile sidebar ──
  const ham = document.getElementById('hamburger');
  const sb  = document.getElementById('sidebar');
  if (ham && sb) {
    ham.addEventListener('click', () => sb.classList.toggle('open'));
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
      a.addEventListener('click', () => sb.classList.remove('open'));
    });
    document.addEventListener('click', e => {
      if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== ham)
        sb.classList.remove('open');
    });
  }

  // ── Apple-style parallax on hero ──
  const heroBg = document.querySelector('.hero-parallax');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.4}px)`;
    }, { passive: true });
  }

  // ── Tabs ──
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const tabs   = tabGroup.querySelectorAll('[data-tab]');
    const panels = tabGroup.querySelectorAll('[data-panel]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tabGroup.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active');
      });
    });
  });

  // ── Accordion ──
  document.querySelectorAll('[data-accordion]').forEach(acc => {
    const trigger = acc.querySelector('[data-accordion-trigger]');
    const body    = acc.querySelector('[data-accordion-body]');
    if (trigger && body) {
      trigger.addEventListener('click', () => {
        acc.classList.toggle('open');
        body.style.maxHeight = acc.classList.contains('open') ? body.scrollHeight + 'px' : '0';
      });
    }
  });

});
