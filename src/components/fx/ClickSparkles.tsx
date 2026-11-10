import { useEffect } from 'react';

const SPARKS = ['✦', '★', '✧', '♥'];
const COLORS = ['#F6C453', '#E87A9A', '#C2607A', '#7FB6DC', '#EABEC3'];

/** Tiny bursts of stars wherever the visitor clicks or taps. */
const ClickSparkles = () => {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, .splash, [data-no-sparkle]')) return;
      const burst = document.createElement('div');
      burst.className = 'sparkle-burst';
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      const count = 7;
      for (let i = 0; i < count; i++) {
        const spark = document.createElement('span');
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const distance = 28 + Math.random() * 26;
        spark.textContent = SPARKS[i % SPARKS.length];
        spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
        spark.style.color = COLORS[(i + Math.floor(Math.random() * COLORS.length)) % COLORS.length];
        spark.style.fontSize = `${10 + Math.random() * 8}px`;
        burst.appendChild(spark);
      }
      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), 800);
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onDown);
  }, []);

  return null;
};

export default ClickSparkles;
