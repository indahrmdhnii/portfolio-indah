import { ExternalLink } from 'lucide-react';
import { icons3d } from '../../assets/icons3d';
import SectionTitle from '../fx/SectionTitle';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLanguage } from '../../contexts/LanguageContext';
import { awards, intellectualProperty, publications, ui } from '../../data/content';
import DraggableDaisy from '../fx/DraggableDaisy';

const medalColor = { gold: '#D9A21B', silver: '#8A94A6', star: '#C2607A' };

const Recognition = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { t } = useLanguage();

  const heading = { color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800] };
  const muted = { color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[500] };
  const card = { backgroundColor: themeColors.card.background, borderColor: themeColors.card.border };

  return (
    <section id="recognition" className="py-16 relative" style={{
      background: isDarkMode ? themeColors.background.gradientEnd : themeColors.colors.pink[25],
      transition: 'background 0.3s ease-in-out'
    }}>
      <DraggableDaisy style={{ top: '3%', left: '7%' }} size={44} rotate={8} />
      <DraggableDaisy style={{ top: '10%', right: '12%' }} size={22} rotate={-14} />
      <div className="container mx-auto px-6">
        <SectionTitle>{t(ui.recognition.title)}</SectionTitle>

        <div className="max-w-5xl mx-auto">
          <h3 className="sub-heading" style={heading}><img className="icon3d-heading" src={icons3d.medalGold} alt="" aria-hidden="true" />{t(ui.recognition.awards)}</h3>
          <div className="award-grid">
            {awards.map((award, index) => (
              <div key={award.title.en} data-reveal="pop" style={{ ['--i' as string]: index }}>
              <article className={`award-card award-${award.medal}`} style={card}>
                <div className="award-icon" style={{ color: medalColor[award.medal], backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : '#FFFFFF', borderColor: themeColors.card.border }} aria-hidden="true">
                  <img src={award.medal === 'gold' ? icons3d.medalGold : award.medal === 'silver' ? icons3d.medalSilver : icons3d.starPink} alt="" />
                </div>
                <div className="min-w-0">
                  <h4 style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[800] }}>{t(award.title)}</h4>
                  {award.detail && <p style={muted}>{t(award.detail)}</p>}
                </div>
              </article>
              </div>
            ))}
          </div>

          {/* HKI: highlighted panel, one card per work */}
          <div className={`work-panel work-panel-ip ${isDarkMode ? 'work-panel-dark' : ''}`} data-reveal="up">
            <div className="work-panel-head">
              <h3 className="sub-heading" style={heading}><img className="icon3d-heading" src={icons3d.bulb} alt="" aria-hidden="true" />{t(ui.recognition.ip)}</h3>
              <span className="work-count">{t(ui.recognition.ipCount).replace('{n}', String(intellectualProperty.length))}</span>
            </div>
            <div className="work-grid">
              {intellectualProperty.map((item, index) => (
                <article key={item.title} className="work-card" style={{ ...card, ['--i' as string]: index }} data-reveal="pop">
                  <div className="work-seal" aria-hidden="true"><span>©</span><small>{t(ui.recognition.ipBadge)}</small></div>
                  <div className="min-w-0 flex-1">
                    <h4 style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[800] }}>{item.title}</h4>
                    {(item.kind || item.number || item.date) && (
                      <p className="work-meta" style={muted}>
                        {item.kind && <span className="ip-kind">{t(item.kind)}</span>}
                        {item.number && <span className="ip-number">{item.number}</span>}
                        {item.date && <span>{t(ui.recognition.issued)} {t(item.date)}</span>}
                      </p>
                    )}
                    {item.url && (
                      <a className="work-link" href={item.url} target="_blank" rel="noopener noreferrer">
                        {t(ui.recognition.viewIp)} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className={`work-panel work-panel-pub ${isDarkMode ? 'work-panel-dark' : ''}`} data-reveal="up">
            <div className="work-panel-head">
              <h3 className="sub-heading" style={heading}><img className="icon3d-heading" src={icons3d.book} alt="" aria-hidden="true" />{t(ui.recognition.publications)}</h3>
              <span className="work-count">{t(ui.recognition.pubCount).replace('{n}', String(publications.length))}{publications.some((p) => p.sinta) ? ` · ${t(ui.recognition.pubCount2)}` : ''}</span>
            </div>
            <div className="work-grid">
              {publications.map((item, index) => (
                <article key={item.title} className="work-card work-card-pub" style={{ ...card, ['--i' as string]: index }} data-reveal="pop">
                  <div className="work-paper" aria-hidden="true"><img src={icons3d.document} alt="" /></div>
                  <div className="min-w-0 flex-1">
                    {item.sinta && (
                      <span className={`sinta-badge sinta-${item.sinta}`} title={t(ui.recognition.sintaNote)}>
                        <span className="sinta-word">SINTA</span><span className="sinta-rank">{item.sinta}</span>
                      </span>
                    )}
                    <h4 style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[800] }}>{item.title}</h4>
                    <p className="work-venue" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800] }}>{item.venue}</p>
                    <p className="work-meta" style={muted}>
                      {[item.publisher && t(item.publisher), item.date && t(item.date)].filter(Boolean).join(' · ')}
                    </p>
                    {item.doi && <p className="work-meta ip-number" style={muted}>DOI {item.doi}</p>}
                    {item.url && (
                      <a className="work-link" href={item.url} target="_blank" rel="noopener noreferrer">
                        {t(ui.recognition.readPub)} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
