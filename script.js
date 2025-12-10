// Typewriter effect
const texts = ["Web Developer", "UI/UX Designer", "ML Engineer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.getElementById("typing").textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1000); // Pause before switching
  } else {
    setTimeout(type, 150);
  }
})();


/*extra things */
/* ---------- Reveal animations (append to script.js) ---------- */
(function () {
  // Run after DOM is loaded to ensure elements exist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  function initReveal() {
    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        document.querySelectorAll('.anim-hidden, .anim-card').forEach(el => el.classList.add('show'));
        return;
      }

      const cards = Array.from(document.querySelectorAll('.anim-card'));
      const hidden = Array.from(document.querySelectorAll('.anim-hidden'));
      const items = hidden.concat(cards);

      if (!items.length) return;

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          // Stagger only for anim-card group
          if (el.classList.contains('anim-card')) {
            // compute index among anim-card elements
            const idx = cards.indexOf(el);
            const delay = Math.min(700, idx * 70); // 70ms per item, capped at 700ms
            el.style.transitionDelay = delay + 'ms';
          }

          el.classList.add('show');
          obs.unobserve(el); // animate once; remove this line if you want repeat on scroll
        });
      }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12
      });

      items.forEach(el => observer.observe(el));
    } catch (err) {
      // non-fatal: don't break the rest of your scripts
      console.error('initReveal error:', err);
    }
  }
})();

