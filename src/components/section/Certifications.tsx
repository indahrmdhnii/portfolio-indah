import { useState } from 'react';
import SectionTitle from '../fx/SectionTitle';
import { ChevronDown } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLanguage } from '../../contexts/LanguageContext';
import { ui } from '../../data/content';
import { certs } from '../../data/certs';
import type { CertCategory } from '../../data/certs';
import { issuerLogos, toDataUri } from '../../data/logos';

const INITIAL_COUNT = 9;

// Short issuer names + a colour for the little monogram tile
const issuers: Record<string, { short: string; mark: string; color: string }> = {
  'MySkill': { short: 'MySkill', mark: 'MS', color: '#B8727C' },
  'Microsoft': { short: 'Microsoft', mark: 'Mi', color: '#5B8DB8' },
  'Coding Camp powered by DBS Foundation': { short: 'Coding Camp · DBS Foundation', mark: 'CC', color: '#C2607A' },
  'Dicoding Indonesia': { short: 'Dicoding Indonesia', mark: 'Di', color: '#6B7A99' },
  'Packt': { short: 'Packt', mark: 'Pa', color: '#C9824F' },
  'DataCamp': { short: 'DataCamp', mark: 'DC', color: '#4E9A77' },
  'Cisco Networking Academy': { short: 'Cisco Networking Academy', mark: 'Ci', color: '#4F8FA8' },
  'Oracle': { short: 'Oracle', mark: 'Or', color: '#B85C4E' },
  'IBM': { short: 'IBM', mark: 'IBM', color: '#55679C' },
};

const monthId: Record<string, string> = { May: 'Mei', Aug: 'Agu', Oct: 'Okt', Dec: 'Des' };

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<CertCategory | 'all'>('all');
  const [expanded, setExpanded] = useState(false);

  const categories: (CertCategory | 'all')[] = ['all', 'data', 'ai', 'mobile', 'business'];
  const filtered = filter === 'all' ? certs : certs.filter((cert) => cert.category === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);

  const formatDate = (value: string) => {
    if (lang === 'en') return value;
    const [month, year] = value.split(' ');
    return `${monthId[month] ?? month} ${year}`;
  };

  return (
    <section id="certifications" className="py-12 relative" style={{
      background: themeColors.background.sections?.certifications || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <SectionTitle subtitle={t(ui.certs.subtitle).replace('{count}', String(certs.length))}>{t(ui.certs.title)}</SectionTitle>

        <div className="chip-row" role="group" aria-label={t(ui.certs.title)}>
          {categories.map((category) => {
            const count = category === 'all' ? certs.length : certs.filter((cert) => cert.category === category).length;
            return (
              <button
                key={category}
                type="button"
                className={`chip ${filter === category ? 'chip-active' : ''}`}
                aria-pressed={filter === category}
                onClick={() => { setFilter(category); setExpanded(false); }}
              >
                {category === 'all' ? t(ui.certs.all) : t(ui.certs.categories[category])}
                <span className="chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div key={`${filter}-${expanded}`} className="cert-grid">
          {visible.map((cert, index) => {
            const logo = issuerLogos[cert.issuer];
            const issuer = issuers[cert.issuer] ?? { short: cert.issuer, mark: cert.issuer.slice(0, 2), color: themeColors.colors.pink[600] };
            return (
              <div key={`${cert.title}-${cert.issued}`} data-reveal="flip" style={{ ['--i' as string]: index % INITIAL_COUNT }}>
              <article className="cert-card" style={{
                backgroundColor: themeColors.card.background,
                borderColor: themeColors.card.border,
              }}>
                {logo ? (
                  <div className={`cert-mark cert-mark-logo ${logo.fill ? 'cert-mark-fill' : ''} ${logo.wide ? 'cert-mark-wide' : ''}`} style={{ backgroundColor: logo.bg }} aria-hidden="true">
                    <img src={logo.src ?? toDataUri(logo.svg ?? '')} alt="" loading="lazy" />
                  </div>
                ) : (
                  <div className="cert-mark" style={{ backgroundColor: issuer.color }} aria-hidden="true">{issuer.mark}</div>
                )}
                <div className="min-w-0">
                  <h3 style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[800] }}>{cert.title}</h3>
                  <p className="cert-issuer" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800] }}>{issuer.short}</p>
                  <p className="cert-meta" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[500] }}>
                    {t(ui.certs.issued)} {formatDate(cert.issued)}
                    {cert.expires && <> · {t(ui.certs.expires)} {formatDate(cert.expires)}</>}
                  </p>
                  {cert.credentialId && (
                    <p className="cert-id" style={{ color: isDarkMode ? themeColors.colors.dark[400] : themeColors.colors.dark[500] }}>ID {cert.credentialId}</p>
                  )}
                </div>
              </article>
              </div>
            );
          })}
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-6">
            <button type="button" className="more-btn" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
              {expanded ? t(ui.certs.showLess) : `${t(ui.certs.showAll)} (${filtered.length})`}
              <ChevronDown className="h-4 w-4" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
