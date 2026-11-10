import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { icons3d } from '../../assets/icons3d';
import CountUp from '../fx/CountUp';
import { awards, experiences, highlights, intellectualProperty, volunteering } from '../../data/content';
import { certs } from '../../data/certs';

/** Count-up stats strip + an endless keyword ticker, between the hero and the projects. */
const Highlights = () => {
  const { lang, t } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const stats = [
    { value: experiences.length, label: t(highlights.stats.roles), icon: icons3d.briefcase },
    { value: certs.length, label: t(highlights.stats.certs), icon: icons3d.certificate },
    { value: awards.length, label: t(highlights.stats.awards), icon: icons3d.medalGold },
    { value: intellectualProperty.length, label: t(highlights.stats.ip), icon: icons3d.bulb },
    { value: volunteering.length, label: t(highlights.stats.volunteer), icon: icons3d.heart },
  ];
  // Short list: repeat it so one ticker group is always wider than the screen
  const words = [...highlights.ticker[lang], ...highlights.ticker[lang]];

  return (
    <section className={`highlights ${isDarkMode ? 'highlights-dark' : ''}`} aria-label="Highlights">
      <div className="container mx-auto px-4 md:px-6">
        <div className="stat-row">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-card" data-reveal="pop" style={{ ['--i' as string]: i }}>
              <span className="stat-icon" aria-hidden="true"><img src={stat.icon} alt="" width="44" height="44" /></span>
              <span className="stat-value"><CountUp to={stat.value} /></span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="ticker-group">
              {words.map((word, wordIndex) => (
                <span key={`${copy}-${wordIndex}`} className="ticker-item">
                  {word}
                  <span className="ticker-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
