/* main.js — Nakayama Lab */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('siteNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    /* Close nav when a link is clicked */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-label', 'メニューを開く');
      });
    });

    /* Close nav when clicking outside */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
      }
    });
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---- Fade-in on scroll ---- */
  const fadeEls = document.querySelectorAll(
    '.pillar-card, .news-item, .member-card, .pub-item, .cv-item, .link-card, .stat-item'
  );

  if ('IntersectionObserver' in window && fadeEls.length) {
    fadeEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 60);
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeEls.forEach(function (el) { fadeObserver.observe(el); });
  }

})();
