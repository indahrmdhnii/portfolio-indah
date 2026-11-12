import { useState } from 'react';
import { Link } from 'react-router-dom';
import DraggableDaisy from '../fx/DraggableDaisy';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { play } from '../../data/content';
import { icons3d } from '../../assets/icons3d';

/* ------------------------------------------------------------------ */
/* 1. Loves me, loves me not: pull the petals, the last one says yes   */
/* ------------------------------------------------------------------ */
const PETALS = 9; // odd, so the last petal always lands on the "yes"

const DaisyPetals = () => {
  const { lang, t } = useLanguage();
  const [picked, setPicked] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const lines = play.petals.lines[lang];
  const done = picked.length === PETALS;

  const pick = (i: number) => {
    if (picked.includes(i)) return;
    const next = [...picked, i];
    setPicked(next);
    setMessage(next.length === PETALS ? t(play.petals.final) : lines[(next.length - 1) % lines.length]);
  };
  const reset = () => { setPicked([]); setMessage(null); };

  return (
    <div className="play-card" data-reveal="up">
      <p className="play-kicker">{t(play.petals.kicker)}</p>
      <h3 className="play-title">{t(play.petals.title)}</h3>
      <div className={`petal-flower ${done ? 'is-done' : ''}`}>
        {Array.from({ length: PETALS }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`petal ${picked.includes(i) ? 'is-picked' : ''}`}
            style={{ ['--a' as string]: `${(360 / PETALS) * i}deg`, ['--fall' as string]: `${(i % 2 ? 1 : -1) * (40 + (i * 13) % 50)}px` }}
            onClick={() => pick(i)}
            disabled={picked.includes(i)}
            aria-label={`${t(play.petals.pickLabel)} ${i + 1}`}
          />
        ))}
        <span className="petal-center" aria-hidden="true" />
        {message && <span key={picked.length} className={`petal-bubble ${done ? 'is-final' : ''}`} aria-live="polite">{message}</span>}
      </div>
      <div className="play-actions">
        {done ? (
          <>
            <Link to="/contact" className="play-btn">{t(play.petals.cta)}</Link>
            <button type="button" className="play-btn play-btn-ghost" onClick={reset}>{t(play.again)}</button>
          </>
        ) : (
          <p className="play-hint">{t(play.petals.hint)} · {PETALS - picked.length} {t(play.petals.left)}</p>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 2. Water the chart: every pour grows the bars, then daisies bloom   */
/* ------------------------------------------------------------------ */
const MAX = 4;
const BASE = [26, 40, 56]; // starting bar heights (%)

const WaterTheChart = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState(0);
  const [pouring, setPouring] = useState(false);
  const full = level >= MAX;

  const water = () => {
    if (pouring || full) return;
    setPouring(true);
    window.setTimeout(() => { setLevel((l) => Math.min(MAX, l + 1)); setPouring(false); }, 700);
  };
  const reset = () => setLevel(0);

  return (
    <div className="play-card" data-reveal="up" style={{ ['--i' as string]: 1 }}>
      <p className="play-kicker">{t(play.chart.kicker)}</p>
      <h3 className="play-title">{t(play.chart.title)}</h3>
      <div className={`chart-garden ${full ? 'is-full' : ''}`}>
        <button
          type="button"
          className={`watering-can ${pouring ? 'is-pouring' : ''}`}
          onClick={water}
          disabled={full}
          aria-label={t(play.chart.waterLabel)}
        >
          <img src={icons3d.wateringCan} alt="" draggable={false} />
          <span className="drops" aria-hidden="true"><i /><i /><i /></span>
        </button>
        <div className="garden-bars">
          {BASE.map((b, i) => {
            const grow = level / MAX;
            return (
              <div key={i} className="garden-bar-wrap">
                <img
                  className={`garden-head ${full ? 'is-open' : ''}`}
                  src={icons3d.daisy}
                  alt=""
                  aria-hidden="true"
                  style={{ ['--s' as string]: `${0.55 + 0.45 * grow}`, ['--d' as string]: `${i * 0.12}s` }}
                />
                <div className="garden-stem" style={{ height: `calc((100% - 66px) * ${(0.62 * Math.min(100, b + grow * (100 - b)) / 100).toFixed(3)})`, ['--d' as string]: `${i * 0.08}s` }}>
                  <span className="leaf leaf-l" />
                  <span className="leaf leaf-r" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="garden-ground" aria-hidden="true" />
      </div>
      <div className="play-actions">
        {full ? (
          <>
            <p className="play-win">{t(play.chart.win)}</p>
            <button type="button" className="play-btn play-btn-ghost" onClick={reset}>{t(play.again)}</button>
          </>
        ) : (
          <p className="play-hint">{t(play.chart.hint)} · {level}/{MAX}</p>
        )}
      </div>
    </div>
  );
};

const PlayCorner = () => {
  const { isDarkMode } = useDarkMode();
  const { t } = useLanguage();
  return (
    <section id="play" className={`play-corner relative ${isDarkMode ? 'play-dark' : ''}`}>
      <DraggableDaisy style={{ top: '8%', left: '6%' }} size={30} rotate={-12} />
      <DraggableDaisy style={{ bottom: '10%', right: '7%' }} size={40} rotate={14} />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <p className="play-intro" data-reveal="up">{t(play.subtitle)}</p>
        <div className="play-grid play-grid-single">
          <DaisyPetals />
        </div>
      </div>
    </section>
  );
};

/** "Water the chart" on its own, placed near the top (after the stats strip) */
export const GrowCorner = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <section id="grow" className={`grow-corner relative ${isDarkMode ? 'play-dark' : ''}`}>
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <div className="play-grid play-grid-single">
          <WaterTheChart />
        </div>
      </div>
    </section>
  );
};

export default PlayCorner;
