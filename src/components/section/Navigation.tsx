import { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import LanguageToggle from '../LanguageToggle';
import { useLanguage } from '../../contexts/LanguageContext';
import { profile, ui } from '../../data/content';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../../hooks/useThemeColors';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();

  const tabs = useMemo(() => [
    { id: 'about', label: t(ui.nav.about) },
    { id: 'projects', label: t(ui.nav.projects) },
    { id: 'experience', label: t(ui.nav.experience) },
    { id: 'skills', label: t(ui.nav.skills) },
    { id: 'recognition', label: t(ui.nav.recognition) },
    { id: 'volunteering', label: t(ui.nav.volunteering) }
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled
      setIsScrolled(window.scrollY > 10);

      // Update active tab
      const sections = tabs.map(tab => tab.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveTab(currentSection);
      }
    };

    const handleResize = () => {
      // Close mobile menu if screen becomes desktop size
      if (window.innerWidth >= 1100 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [tabs, isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on the home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const goToContact = () => {
    navigate('/contact');
    setIsMobileMenuOpen(false);
  };

  const goHome = () => {
    if (location.pathname !== '/') navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const onContactPage = location.pathname === '/contact';

  // Sliding pill that sits behind the active desktop tab
  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  useLayoutEffect(() => {
    const place = () => {
      const active = tabsRef.current?.querySelector<HTMLElement>('.nav-tab.active');
      if (active) setPill({ left: active.offsetLeft, width: active.offsetWidth, visible: true });
      else setPill((prev) => ({ ...prev, visible: false }));
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place).catch(() => undefined);
    return () => window.removeEventListener('resize', place);
  }, [activeTab, onContactPage, tabs]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        width: '100%',
        zIndex: 99999,
        padding: '1rem 0',
        borderBottom: `1px solid ${isScrolled ? themeColors.navigation.borderScrolled : themeColors.navigation.border}`,
        boxShadow: `0 ${isScrolled ? '8px 32px' : '4px 24px'} ${isScrolled ? themeColors.navigation.shadowScrolled : themeColors.navigation.shadow}`,
        backdropFilter: 'saturate(200%) blur(30px)',
        WebkitBackdropFilter: 'saturate(200%) blur(30px)',
        transition: 'all 0.3s ease',
        background: `linear-gradient(135deg,
          ${withAlpha(isDarkMode ? themeColors.colors.dark[950] : themeColors.colors.pink[50], isScrolled ? 0.7 : 0.5)},
          ${withAlpha(isDarkMode ? themeColors.colors.dark[900] : themeColors.colors.pink[25], isScrolled ? 0.7 : 0.5)})`
      }}>
      <div className="nav-container">
        <button className="signature-name"
          style={{ 
            cursor: 'pointer', 
            color: themeColors.colors.pink[500], 
            background: 'none', 
            border: 'none',
            outline: 'none',
            WebkitTextFillColor: themeColors.colors.pink[500]
          }}
          onClick={goHome}
          aria-label={`${profile.name} - home`}>
          {profile.name}
        </button>
        
        {/* Desktop Navigation */}
        <div className="nav-tabs desktop-nav" ref={tabsRef}>
          <span
            className="nav-pill"
            aria-hidden="true"
            style={{ transform: `translateX(${pill.left}px)`, width: pill.width, opacity: pill.visible ? 1 : 0 }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`nav-tab ${!onContactPage && activeTab === tab.id ? 'active' : ''}`}
              style={{ color: themeColors.text.accent }}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={goToContact}
            className={`nav-tab ${onContactPage ? 'active' : ''}`}
            style={{ color: themeColors.text.accent }}
          >
            {t(ui.nav.contact)}
          </button>
          <div className="ml-2 flex items-center gap-1">
            <LanguageToggle />
            <DarkModeToggle
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn relative"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          style={{
            background: isDarkMode ? themeColors.card.background : themeColors.colors.white,
            border: `1px solid ${themeColors.colors.pink[200]}`,
            borderRadius: '12px',
            cursor: 'pointer',
            padding: '10px',
            display: 'none',
            color: themeColors.colors.pink[500],
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ position: 'relative', width: '24px', height: '24px' }}>
            <Menu
              size={24}
              style={{
                position: 'absolute',
                transition: 'opacity 0.3s ease',
                opacity: isMobileMenuOpen ? 0 : 1
              }}
            />
            <X
              size={24}
              style={{
                position: 'absolute',
                transition: 'opacity 0.3s ease',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          flexDirection: 'column',
          padding: '1rem',
          background: themeColors.navigation.mobile,
          borderTop: `1px solid ${themeColors.navigation.border}`,
          maxHeight: isMobileMenuOpen ? '85vh' : '0',
          overflowY: isMobileMenuOpen ? 'auto' : 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          boxShadow: isMobileMenuOpen
            ? `0 8px 25px ${themeColors.navigation.shadowScrolled}`
            : 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`mobile-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            style={{
              background: activeTab === tab.id
                ? withAlpha(
                    isDarkMode ? themeColors.colors.pink[50] : themeColors.colors.pink[50],
                    isDarkMode ? 0.05 : 0.8
                  )
                : 'none',
              border: activeTab === tab.id
                ? `1px solid ${themeColors.colors.pink[200]}`
                : '1px solid transparent',
              borderRadius: '12px',
              padding: '0.875rem 1.25rem',
              textAlign: 'left',
              color: activeTab === tab.id
                ? themeColors.colors.pink[500]
                : themeColors.text.accent,
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : '0s',
              marginBottom: '0.5rem',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              outline: 'none',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = withAlpha(
                  themeColors.colors.pink[50],
                  isDarkMode ? 0.03 : 0.5
                );
                e.currentTarget.style.borderColor = themeColors.colors.pink[200];
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={goToContact}
          className="mobile-nav-tab"
          style={{
            background: 'none',
            border: '1px solid transparent',
            borderRadius: '12px',
            padding: '0.875rem 1.25rem',
            textAlign: 'left',
            color: themeColors.text.accent,
            fontWeight: 500,
            fontSize: '1rem',
            cursor: 'pointer',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
        >
          {t(ui.nav.contact)}
        </button>
        <div
          className="mt-3 px-4"
          style={{
            borderTop: `1px solid ${themeColors.colors.pink[200]}`,
            paddingTop: '1rem',
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: isMobileMenuOpen ? '0.2s' : '0s',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <LanguageToggle />
          <DarkModeToggle
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;