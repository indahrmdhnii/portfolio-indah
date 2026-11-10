import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { Mail, ArrowUp, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { profile, ui } from '../data/content';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-6 mt-auto transition-colors duration-300 footer-waved" style={{
      backgroundColor: isDarkMode ? themeColors.background.gradientEnd : themeColors.colors.pink[50],
      color: isDarkMode ? themeColors.background.gradientEnd : themeColors.colors.pink[50]
    }}>
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0 30 C 180 0, 360 60, 540 30 S 900 0, 1080 30 S 1260 60, 1440 30 L 1440 60 L 0 60 Z" fill="currentColor" /></svg>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0 30 C 180 0, 360 60, 540 30 S 900 0, 1080 30 S 1260 60, 1440 30 L 1440 60 L 0 60 Z" fill="currentColor" /></svg>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left - little heart and copyright (centered on mobile) */}
          <div className="flex flex-col items-center md:items-start space-y-2 md:flex-1">
            <div className="flex items-center" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[700] }}>
              <span className="text-m font-medium">
                <span style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>˚ʚ♡ɞ˚</span>
              </span>
            </div>
            <div className="text-sm" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[700] }}>
              © {currentYear} {profile.name}. {t(ui.footer.rights)}
            </div>
          </div>

          {/* Center - Back to top button */}
          <div className="flex flex-col items-center justify-center md:flex-1">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{
                backgroundColor: isDarkMode ? themeColors.card.background : themeColors.colors.white,
                color: themeColors.colors.pink[500],
                border: `2px solid ${themeColors.colors.pink[300]}`,
                outline: 'none !important',
                WebkitTapHighlightColor: 'transparent'
              }}
              onFocus={(e) => e.currentTarget.blur()}
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
            <span className="text-xs mt-2" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[700] }}>
              {t(ui.footer.backToTop)}
            </span>
          </div>

          {/* Right - Social buttons */}
          <div className="flex items-center justify-end space-x-4 md:flex-1">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: isDarkMode ? themeColors.card.background : themeColors.colors.white,
                color: themeColors.colors.pink[500],
                border: `1px solid ${themeColors.colors.pink[200]}`,
              }}
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: isDarkMode ? themeColors.card.background : themeColors.colors.white,
                color: themeColors.colors.pink[500],
                border: `1px solid ${themeColors.colors.pink[200]}`,
              }}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: isDarkMode ? themeColors.card.background : themeColors.colors.white,
                color: themeColors.colors.pink[500],
                border: `1px solid ${themeColors.colors.pink[200]}`,
              }}
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;