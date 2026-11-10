import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { colors } from '../styles/colors';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  const { isDarkMode } = useDarkMode();

  const options: { code: 'en' | 'id'; label: string; name: string }[] = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'id', label: 'ID', name: 'Bahasa Indonesia' },
  ];

  return (
    <div
      className="lang-toggle"
      role="group"
      aria-label="Language / Bahasa"
      style={{
        borderColor: isDarkMode ? 'rgba(234, 190, 195, 0.35)' : colors.pink[300],
        background: isDarkMode ? 'rgba(98, 74, 87, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      }}
    >
      {options.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={option.name}
            title={option.name}
            style={{
              background: active ? (isDarkMode ? colors.pink[300] : colors.pink[500]) : 'transparent',
              color: active ? (isDarkMode ? colors.dark[900] : colors.white) : isDarkMode ? colors.pink[200] : colors.pink[800],
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
