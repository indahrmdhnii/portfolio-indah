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
/* 2. Water the meadow: every pour grows a whole field of daisies      */
/* ------------------------------------------------------------------ */
const MAX = 4;

/** tiny seeded random so the meadow looks the same on every visit */
const seeded = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

type Flower = { x: number; base: number; size: number; min: number; max: number; tilt: number; d: number; z: number; row: number; bend: number; leafSide: number };
// back row: small and faded, front row: big and bright, gives the field depth
const ROWS = [
  { count: 22, size: [10, 14], base: [68, 78], min: [4, 8], max: [20, 30] },
  { count: 16, size: [16, 22], base: [50, 60], min: [6, 12], max: [30, 44] },
  { count: 13, size: [24, 31], base: [30, 40], min: [8, 14], max: [44, 62] },
  { count: 9, size: [34, 42], base: [8, 18], min: [10, 18], max: [62, 84] },
];
const FLOWERS: Flower[] = (() => {
  const r = seeded(20260415);
  const between = ([a, b]: number[]) => a + r() * (b - a);
  const list: Flower[] = [];
  ROWS.forEach((row, ri) => {
    for (let i = 0; i < row.count; i++) {
      const step = 100 / row.count;
      const x = Math.min(97, Math.max(3, (i + 0.5 + (ri % 2 ? 0.35 : 0)) * step + (r() - 0.5) * step * 0.8));
      list.push({ x, base: between(row.base), size: between(row.size), min: between(row.min), max: between(row.max), tilt: (r() - 0.5) * 18, d: r() * 0.35, z: ri * 10 + 2, row: ri, bend: (r() - 0.5) * 8, leafSide: r() > 0.5 ? 1 : -1 });
    }
  });
  return list;
})();

/** a thin, slightly curved stem with narrow leaves; drawn at full height and
 *  clipped by the ground, so watering pulls more of it up out of the grass */
const STEM_W = 26;
const stemArt = (f: Flower) => {
  const H = Math.round(f.max) + 4;
  const c = STEM_W / 2;
  const x0 = c, x1 = c + f.bend, cx = c - f.bend * 0.8;
  const at = (t: number) => ({ x: (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, y: t * H });
  const L = [5, 7, 9, 11][f.row];
  const leaves = [0.3, 0.52, 0.74].map((t, i) => {
    const p = at(t);
    const side = (i % 2 ? -1 : 1) * f.leafSide;
    const len = L * (1 - i * 0.12);
    const tipX = p.x + side * len, tipY = p.y - len * 0.85;
    return `M${p.x.toFixed(1)} ${p.y.toFixed(1)} Q${(p.x + side * len * 0.75).toFixed(1)} ${(p.y - len * 0.1).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q${(p.x + side * len * 0.2).toFixed(1)} ${(p.y - len * 0.55).toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}Z`;
  }).join('');
  return { H, stem: `M${x0} 0 Q${cx.toFixed(1)} ${H / 2} ${x1.toFixed(1)} ${H}`, leaves, w: [1, 1.3, 1.6, 1.9][f.row] };
};
const STEMS = FLOWERS.map(stemArt);

/** a strip of grass blades, drawn once */
const grassPath = (seed: number, count: number, h: number) => {
  const r = seeded(seed);
  let d = '';
  for (let i = 0; i < count; i++) {
    const x = (i / count) * 400 + r() * 6 - 3;
    const w = 5 + r() * 5;
    const bh = h * (0.45 + r() * 0.55);
    const lean = (r() - 0.5) * 16;
    d += `M${x.toFixed(1)} ${h} Q${(x + lean * 0.3).toFixed(1)} ${(h - bh * 0.6).toFixed(1)} ${(x + w / 2 + lean).toFixed(1)} ${(h - bh).toFixed(1)} Q${(x + w * 0.7 + lean * 0.3).toFixed(1)} ${(h - bh * 0.5).toFixed(1)} ${(x + w).toFixed(1)} ${h}Z`;
  }
  return d;
};
const GRASS = [
  { cls: 'grass-far', h: 50, d: grassPath(3, 110, 50) },
  { cls: 'grass-back', h: 56, d: grassPath(7, 90, 56) },
  { cls: 'grass-mid', h: 44, d: grassPath(11, 80, 44) },
  { cls: 'grass-front', h: 32, d: grassPath(19, 70, 32) },
];

const WaterTheChart = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState(0);
  const [pouring, setPouring] = useState(false);
  const full = level >= MAX;
  const grow = level / MAX;

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
      <div className={`chart-garden meadow-garden ${full ? 'is-full' : ''}`}>
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
        <div className="meadow" aria-hidden="true">
          {GRASS.map((g, gi) => (
            <svg key={g.cls} className={`grass ${g.cls}`} viewBox={`0 0 400 ${g.h}`} preserveAspectRatio="none" style={{ zIndex: gi * 10 + 1 }}>
              <path d={g.d} />
            </svg>
          ))}
          {FLOWERS.map((f, i) => (
            <div
              key={i}
              className={`mf mf-row${f.row}`}
              style={{ left: `${f.x}%`, bottom: f.base, zIndex: f.z, ['--tilt' as string]: `${f.tilt.toFixed(1)}deg`, ['--d' as string]: `${f.d.toFixed(2)}s`, ['--sway' as string]: `${(2.6 + f.d * 4).toFixed(2)}s` }}
            >
              <img className="mf-head" src={icons3d.daisy} alt="" draggable={false} style={{ width: f.size, height: f.size, ['--s' as string]: `${(0.4 + 0.6 * grow).toFixed(2)}` }} />
              <span className="mf-stem" style={{ height: Math.round(f.min + grow * (f.max - f.min)) }}>
                <svg width={STEM_W} height={STEMS[i].H} viewBox={`0 0 ${STEM_W} ${STEMS[i].H}`}>
                  <path className="mf-leaves" d={STEMS[i].leaves} />
                  <path className="mf-stalk" d={STEMS[i].stem} strokeWidth={STEMS[i].w} />
                </svg>
              </span>
            </div>
          ))}
        </div>
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
