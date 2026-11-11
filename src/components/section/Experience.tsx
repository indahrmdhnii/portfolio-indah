import { useState } from 'react';
import SectionTitle from '../fx/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLanguage } from '../../contexts/LanguageContext';
import { experiences, trackLabel, domainLabel, ui } from '../../data/content';
import type { ExpTrack } from '../../data/content';

const INITIAL_COUNT = 5;

const Experience = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<ExpTrack | 'all'>('all');
  const [expanded, setExpanded] = useState(false);

  const tracks: (ExpTrack | 'all')[] = ['all', 'bd', 'data', 'creative', 'program'];
  const filtered = filter === 'all' ? experiences : experiences.filter((exp) => exp.track === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const titleColor = isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800];

  return (
    <section id="experience" className="py-8 relative" style={{
      background: themeColors.background.sections?.experience || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      {/* Subtle gradient overlay for top edge blending */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />
      {/* Subtle gradient overlay for bottom edge blending to white divider */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.white} 100%)`,
          zIndex: 1
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <SectionTitle subtitle={t(ui.experience.subtitle)}>{t(ui.experience.title)}</SectionTitle>

        <div className="chip-row" role="group" aria-label={t(ui.experience.title)}>
          {tracks.map((track) => {
            const count = track === 'all' ? experiences.length : experiences.filter((exp) => exp.track === track).length;
            return (
              <button
                key={track}
                type="button"
                className={`chip ${filter === track ? 'chip-active' : ''}`}
                aria-pressed={filter === track}
                onClick={() => { setFilter(track); setExpanded(false); }}
              >
                {track === 'all' ? t(ui.experience.all) : t(trackLabel[track])}
                <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div key={filter} className="timeline max-w-4xl mx-auto" data-reveal="draw">
          {visible.map((exp, index) => (
            <div key={`${exp.company}-${exp.title.en}`} className="timeline-item" data-reveal="right" style={{ ['--i' as string]: index % INITIAL_COUNT }}>
            <span className={`timeline-dot ${exp.current ? 'timeline-dot-current' : ''}`} aria-hidden="true" />
            <Card className="exp-card border-2 border-pink-100 dark:border-[#7A6070] hover:border-pink-200 dark:hover:border-[#9A7F8E] transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-[#624A57]/95">
              <CardHeader className={exp.description ? 'pb-2' : ''}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div className="min-w-0">
                    <CardTitle className="text-xl md:text-2xl" style={{ color: titleColor }}>{t(exp.title)}</CardTitle>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">{exp.company}</p>
                    {exp.legalName && <p className="exp-legal">{exp.legalName}</p>}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.current && <span className="tag tag-current">{t(ui.experience.current)}</span>}
                      <span className="tag">{t(trackLabel[exp.track])}</span>
                      {exp.domain && <span className="tag tag-domain">{t(domainLabel[exp.domain])}</span>}
                    </div>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <div className="flex items-center md:justify-end gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm">{t(exp.period)}</span>
                    </div>
                    <div className="flex items-center md:justify-end gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span className="text-sm">{t(exp.location)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              {exp.description && (
                <CardContent className="pt-2">
                  <ul className="space-y-1">
                    {exp.description[lang].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2" style={{ color: themeColors.colors.pink[500] }}>•</span>
                        <span className="text-sm" style={{ color: isDarkMode ? themeColors.colors.dark[200] : themeColors.colors.dark[600] }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
            </div>
          ))}
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-6 mb-6">
            <button type="button" className="more-btn" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
              {expanded ? t(ui.experience.showLess) : `${t(ui.experience.showAll)} (${filtered.length})`}
              <ChevronDown className="h-4 w-4" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
