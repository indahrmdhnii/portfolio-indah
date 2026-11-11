import { useEffect, useRef, useState } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { icons3d } from '../../assets/icons3d';
import { useLanguage } from '../../contexts/LanguageContext';
import { music, ui } from '../../data/content';

const ORIGIN = 'https://www.youtube-nocookie.com';

/**
 * Floating daisy button that opens a small card with the official YouTube player
 * for Indah's song. The player loads only after the first tap (no autoplay on page load),
 * stays visible while playing, and pauses when the card is closed.
 */
const DaisyMusic = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  const send = (func: string) => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), ORIGIN);
  };

  // Listen for the player's state so the button and the spinning daisy stay in sync
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN || typeof e.data !== 'string') return;
      try {
        const data = JSON.parse(e.data);
        const state = data?.info?.playerState;
        if (state === 1) setPlaying(true);
        else if (state === 0 || state === 2) setPlaying(false);
      } catch { /* not a player message */ }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const onFrameLoad = () => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'daisy-music' }), ORIGIN);
  };

  const toggleOpen = () => {
    if (open) { send('pauseVideo'); setOpen(false); return; }
    setLoaded(true);
    setOpen(true);
  };

  const togglePlay = () => send(playing ? 'pauseVideo' : 'playVideo');

  const src = `${ORIGIN}/embed/${music.youtubeId}?enablejsapi=1&autoplay=1&rel=0&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`;

  return (
    <div className={`daisy-music ${open ? 'is-open' : ''}`}>
      {loaded && (
        <div className="daisy-music-card" role="dialog" aria-label={t(ui.music.label)} hidden={!open}>
          <div className="daisy-music-head">
            <div className="min-w-0">
              <p className="daisy-music-kicker">{playing ? t(ui.music.nowPlaying) : t(ui.music.paused)}</p>
              <p className="daisy-music-title">{music.title} <span>· {music.artist}</span></p>
            </div>
            <button type="button" className="daisy-music-close" onClick={toggleOpen} aria-label={t(ui.music.close)}><X size={16} /></button>
          </div>
          <div className="daisy-music-player">
            <iframe
              ref={frame}
              src={src}
              title={`${music.title} · ${music.artist}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              onLoad={onFrameLoad}
            />
          </div>
          <button type="button" className="daisy-music-play" onClick={togglePlay}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? t(ui.music.pause) : t(ui.music.play)}
          </button>
        </div>
      )}
      <button
        type="button"
        className={`daisy-music-btn ${playing ? 'spinning' : ''}`}
        onClick={toggleOpen}
        aria-label={open ? t(ui.music.close) : t(ui.music.open)}
        aria-expanded={open}
      >
        <img src={icons3d.daisy} alt="" draggable={false} />
        <span className="daisy-music-note" aria-hidden="true">♪</span>
      </button>
    </div>
  );
};

export default DaisyMusic;
