import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { icons3d } from '../../assets/icons3d';
import { useLanguage } from '../../contexts/LanguageContext';
import { music, ui } from '../../data/content';

// Minimal types for the Spotify iFrame API (https://developer.spotify.com/documentation/embeds)
interface SpotifyController {
  addListener: (event: string, cb: (e: { data: { isPaused: boolean } }) => void) => void;
  pause: () => void;
  togglePlay: () => void;
}
interface SpotifyIFrameAPI {
  createController: (el: HTMLElement, opts: { uri: string; width: string; height: number }, cb: (c: SpotifyController) => void) => void;
}
declare global {
  interface Window { onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void; __spotifyApi?: SpotifyIFrameAPI }
}

const loadSpotifyApi = () =>
  new Promise<SpotifyIFrameAPI>((resolve, reject) => {
    if (window.__spotifyApi) return resolve(window.__spotifyApi);
    window.onSpotifyIframeApiReady = (api) => { window.__spotifyApi = api; resolve(api); };
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    s.onerror = reject;
    document.body.appendChild(s);
  });

/**
 * Floating daisy button that opens a small card with Spotify's compact player
 * (music only, no video). The player loads only after the first tap, the daisy
 * spins while the song plays, and closing the card pauses it.
 */
const DaisyMusic = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [fallback, setFallback] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<SpotifyController | null>(null);

  useEffect(() => {
    if (!loaded || !host.current || controller.current) return;
    loadSpotifyApi()
      .then((api) => {
        if (!host.current) return;
        api.createController(host.current, { uri: `spotify:track:${music.spotifyId}`, width: '100%', height: 80 }, (c) => {
          controller.current = c;
          c.addListener('playback_update', (e) => setPlaying(!e.data.isPaused));
        });
      })
      .catch(() => setFallback(true));
  }, [loaded]);

  const toggleOpen = () => {
    if (open) { controller.current?.pause(); setPlaying(false); setOpen(false); return; }
    setLoaded(true);
    setOpen(true);
  };

  return (
    <div className={`daisy-music ${open ? 'is-open' : ''}`}>
      {loaded && (
        <div className="daisy-music-card" role="dialog" aria-label={t(ui.music.label)} hidden={!open}>
          <div className="daisy-music-head">
            <p className="daisy-music-kicker">{playing ? t(ui.music.nowPlaying) : t(ui.music.paused)}</p>
            <button type="button" className="daisy-music-close" onClick={toggleOpen} aria-label={t(ui.music.close)}><X size={16} /></button>
          </div>
          <div className="daisy-music-player">
            {fallback ? (
              <iframe
                src={`https://open.spotify.com/embed/track/${music.spotifyId}`}
                title={`${music.title} · ${music.artist}`}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            ) : (
              <div ref={host} />
            )}
          </div>
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
