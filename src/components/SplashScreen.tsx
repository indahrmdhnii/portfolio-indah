import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { stickers } from '../assets';
import { profile } from '../data/content';

interface SplashScreenProps {
  onDone: () => void;
}

const SHOW_MS = 2900; // how long the splash stays before leaving
const EXIT_MS = 650; // length of the exit animation

// Status line under the name, swapped as the animation plays
const steps = {
  en: ['analyzing the data…', 'building the plan…', 'ready!'],
  id: ['menganalisis data…', 'menyusun rencana…', 'siap!'],
};

// Stickers that pop in around the card: [sticker index, x, y, size, delay, rotate]
const floaters: [number, string, string, number, number, number][] = [
  [0, '12%', '18%', 64, 0.15, -12], // bar chart
  [3, '82%', '16%', 60, 0.3, 10], // medal
  [11, '8%', '70%', 58, 0.45, 8], // magnifier
  [12, '86%', '68%', 62, 0.6, -10], // rocket
  [6, '22%', '88%', 44, 0.75, 14], // heart
  [2, '72%', '88%', 48, 0.9, -6], // bulb
  [8, '50%', '8%', 40, 1.05, 18], // star
];

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const { lang } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(onDone, EXIT_MS);
  }, [onDone]);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStep(1), 1100),
      window.setTimeout(() => setStep(2), 2100),
      window.setTimeout(finish, SHOW_MS),
    ];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
    };
    window.addEventListener('keydown', onKey);
    // Lock page scroll while the splash is up
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [finish]);

  const firstName = profile.shortName;

  return (
    <div
      className={`splash ${isDarkMode ? 'splash-dark' : ''} ${leaving ? 'splash-leave' : ''}`}
      onClick={finish}
      role="status"
      aria-live="polite"
      aria-label={steps[lang][step]}
    >
      {/* Floating stickers */}
      {floaters.map(([index, x, y, size, delay, rotate]) => (
        <img
          key={index}
          src={stickers[index]}
          alt=""
          aria-hidden="true"
          className="splash-sticker"
          style={{
            left: x,
            top: y,
            width: size,
            height: size,
            animationDelay: `${delay}s, ${delay + 0.6}s`,
            ['--rot' as string]: `${rotate}deg`,
          }}
        />
      ))}

      <div className="splash-card">
        {/* Bar chart that grows, then a star pops on top */}
        <svg className="splash-chart" viewBox="0 0 160 120" aria-hidden="true">
          <line x1="14" y1="104" x2="146" y2="104" className="splash-axis" />
          <rect className="splash-bar splash-bar-1" x="30" y="64" width="24" height="40" rx="5" />
          <rect className="splash-bar splash-bar-2" x="68" y="46" width="24" height="58" rx="5" />
          <rect className="splash-bar splash-bar-3" x="106" y="26" width="24" height="78" rx="5" />
          <polyline className="splash-trend" points="42,58 80,40 118,20" />
          <g className="splash-star">
            <polygon points="118,0 122.7,9.5 133,11 125.5,18.3 127.3,28.5 118,23.6 108.7,28.5 110.5,18.3 103,11 113.3,9.5" />
          </g>
        </svg>

        <p className="splash-hi">{lang === 'en' ? "hi, i'm" : 'hai, aku'}</p>
        <h1 className="splash-name" aria-label={firstName}>
          {firstName.split('').map((letter, i) => (
            <span key={i} style={{ animationDelay: `${0.55 + i * 0.09}s` }} aria-hidden="true">
              {letter}
            </span>
          ))}
          <span className="splash-wave" aria-hidden="true">✦</span>
        </h1>

        <div className="splash-progress" aria-hidden="true">
          <div className="splash-progress-fill" style={{ animationDuration: `${SHOW_MS - 200}ms` }} />
        </div>
        <p key={step} className="splash-status">{steps[lang][step]}</p>
      </div>

      <button
        type="button"
        className="splash-skip"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
      >
        {lang === 'en' ? 'skip →' : 'lewati →'}
      </button>
    </div>
  );
};

export default SplashScreen;
