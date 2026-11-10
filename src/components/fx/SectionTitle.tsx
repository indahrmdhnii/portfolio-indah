import { useDarkMode } from '../../contexts/DarkModeContext';
import { colors } from '../../styles/colors';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
}

/** Section heading with a hand-drawn marker squiggle that draws itself when scrolled into view. */
const SectionTitle = ({ children, subtitle }: SectionTitleProps) => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="section-title" data-reveal="up">
      <h2 style={{ color: isDarkMode ? colors.white : colors.pink[600] }}>
        <span className="section-title-spark" aria-hidden="true">✦</span>
        {children}
        <svg className="section-title-squiggle" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M4 15 C 40 4, 70 22, 110 12 S 180 4, 220 14 S 280 18, 296 8" />
        </svg>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
