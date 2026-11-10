import { useEffect } from 'react';

/**
 * Watches every element with a `data-reveal` attribute and adds the
 * `revealed` class when it scrolls into view. Elements that mount later
 * (lazy sections, filters, "show all") are picked up automatically.
 *
 * Variants are set in CSS: data-reveal="up" | "pop" | "left" | "right" | "drop" | "flip" | "draw"
 * Stagger with style={{ '--i': index }}.
 */
const RevealObserver = () => {
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const revealAll = () =>
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.revealed)').forEach((el) => el.classList.add('revealed'));

    if (reduced || !('IntersectionObserver' in window)) {
      revealAll();
      const mo = new MutationObserver(revealAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    const watched = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => {
        if (!watched.has(el)) {
          watched.add(el);
          io.observe(el);
        }
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
};

export default RevealObserver;
