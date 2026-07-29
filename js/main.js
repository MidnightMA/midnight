/* ==========================================================================
   MIDNIGHT — main.js
   Small, calm, vanilla interactions. No frameworks, no build step.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Respect reduced motion ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme (day / night) toggle ---------- */
  const THEME_KEY = 'midnight-theme';
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === 'night') {
    root.setAttribute('data-theme', 'night');
  } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'night');
  }

  const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="12" y1="1.5" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22.5"/><line x1="1.5" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22.5" y2="12"/><line x1="4.4" y1="4.4" x2="6.1" y2="6.1"/><line x1="17.9" y1="17.9" x2="19.6" y2="19.6"/><line x1="4.4" y1="19.6" x2="6.1" y2="17.9"/><line x1="17.9" y1="6.1" x2="19.6" y2="4.4"/></g></svg>';
  const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none"><path d="M20.5 14.5C19.28 15.09 17.9 15.42 16.45 15.42C11.4 15.42 7.3 11.32 7.3 6.27C7.3 4.82 7.63 3.44 8.22 2.22C4.52 3.4 1.83 6.87 1.83 10.97C1.83 16.02 5.93 20.12 10.98 20.12C15.08 20.12 18.55 17.43 19.73 13.73C19.99 13.98 20.25 14.24 20.5 14.5Z" fill="currentColor"/></svg>';

  function updateToggleIcon() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    const isNight = root.getAttribute('data-theme') === 'night';
    toggle.setAttribute('aria-label', isNight ? 'Switch to daytime' : 'Switch to midnight');
    toggle.innerHTML = isNight ? SUN_ICON : MOON_ICON;
  }

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    updateToggleIcon();
    themeToggle.addEventListener('click', () => {
      const isNight = root.getAttribute('data-theme') === 'night';
      if (isNight) {
        root.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'day');
      } else {
        root.setAttribute('data-theme', 'night');
        localStorage.setItem(THEME_KEY, 'night');
      }
      updateToggleIcon();
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu after choosing a link (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Highlight active nav link ---------- */
  const currentPage = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Soft page-load veil (fades away on load) ---------- */
  const veil = document.querySelector('.page-veil');
  if (veil) {
    veil.classList.add('veil-enter');
    setTimeout(() => veil.remove(), 900);
  }

  /* ---------- Soft page-leave transition for internal links ---------- */
  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const url = link.getAttribute('href');
        const isExternal = link.target === '_blank' || link.hasAttribute('data-no-transition');
        if (isExternal) return;
        e.preventDefault();
        const leaveVeil = document.createElement('div');
        leaveVeil.className = 'page-veil veil-leave';
        document.body.appendChild(leaveVeil);
        setTimeout(() => { window.location.href = url; }, 380);
      });
    });
  }

  /* ---------- Sticky header shrink on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.style.boxShadow = y > 12 ? '0 4px 20px rgba(27,58,71,0.08)' : 'none';
      lastScroll = y;
    }, { passive: true });
  }

  /* ---------- Mascot: gentle mouse-follow gaze (desktop only, subtle) ---------- */
  const mascotEyes = document.querySelectorAll('.mascot-pupil');
  if (mascotEyes.length && window.matchMedia('(hover: hover)').matches && !prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      mascotEyes.forEach(pupil => {
        pupil.style.transform = `translate(${xRatio * 2.2}px, ${yRatio * 2}px)`;
      });
    });
  }

  /* ---------- Current year in footer ---------- */
  const yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
