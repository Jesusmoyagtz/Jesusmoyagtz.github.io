// ═══════════════════════════════════════════════
//  JESUS MOYA-GUTIERREZ — ARCHITECTURE PORTFOLIO
//  main.js
// ═══════════════════════════════════════════════

(function () {
  'use strict';

  // ── Scroll-reveal ──────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target); // only animate once
        }
      });
    },
    { threshold: 0.07 }
  );

  document.querySelectorAll('.sec').forEach((s) => revealObserver.observe(s));

  // ── Nav shadow on scroll ───────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ── Mobile nav toggle ─────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });

  // ── Lightbox ──────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // Delay clearing src so closing animation isn't jarring
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  document.querySelectorAll('.zoomable').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Active nav link highlight ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navAnchors.forEach((a) => {
            a.style.color = a.getAttribute('href') === '#' + e.target.id
              ? 'var(--red)'
              : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => activeObserver.observe(s));

})();
