import { useState } from 'react';
import SectionTitle from '../fx/SectionTitle';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLanguage } from '../../contexts/LanguageContext';
import { volunteering, causeLabel, ui } from '../../data/content';

const INITIAL_COUNT = 6;
// Slight tilts make the cards feel like notes pinned to a board
const tilts = [-1.2, 0.8, -0.5, 1.1, -0.9, 0.6];

const Volunteering = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? volunteering : volunteering.slice(0, INITIAL_COUNT);

  return (
    <section id="volunteering" className="py-16 relative" style={{
      background: isDarkMode ? themeColors.background.gradientEnd : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, ${themeColors.colors.white} 40%, ${themeColors.colors.pink[50]} 100%)`,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6">
        <SectionTitle subtitle={t(ui.volunteering.subtitle)}>{t(ui.volunteering.title)}</SectionTitle>

        <div className="note-grid">
          {visible.map((item, index) => (
            <div key={`${item.org}-${item.title.en}`} data-reveal="drop" style={{ ['--i' as string]: index % INITIAL_COUNT, ['--tilt' as string]: `${tilts[index % tilts.length]}deg` }}>
            <article className="note-card" style={{
              backgroundColor: isDarkMode ? themeColors.card.background : themeColors.colors.white,
              borderColor: themeColors.card.border,
            }}>
              <div className="note-tape" aria-hidden="true" />
              <p className="note-date" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>{t(item.date)}</p>
              <h3 style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[800] }}>{t(item.title)}</h3>
              <p className="note-org" style={{ color: isDarkMode ? themeColors.colors.pink[200] : themeColors.colors.pink[800] }}>{item.org}</p>
              {item.description && (
                <p className="note-body" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{t(item.description)}</p>
              )}
              <div className="note-footer">
                <span className="tag">{t(causeLabel[item.cause])}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800] }}>
                    {t(ui.volunteering.seeMore)}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
            </div>
          ))}
        </div>

        {volunteering.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-8">
            <button type="button" className="more-btn" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
              {expanded ? t(ui.volunteering.showLess) : `${t(ui.volunteering.showAll)} (${volunteering.length})`}
              <ChevronDown className="h-4 w-4" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Volunteering;
