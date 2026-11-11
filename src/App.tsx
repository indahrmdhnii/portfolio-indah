import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { useThemeColors } from './hooks/useThemeColors'
import { colors } from './styles/colors'
import Navigation from './components/section/Navigation'
import About from './components/section/About'
import { divider } from './assets'
import SplashScreen from './components/SplashScreen'
import RevealObserver from './components/fx/RevealObserver'
import ClickSparkles from './components/fx/ClickSparkles'
import ScrollProgress from './components/fx/ScrollProgress'
import Highlights from './components/section/Highlights'
import DaisyMusic from './components/fx/DaisyMusic'
import { SplashContext } from './contexts/SplashContext'
import './App.css'
import './custom.css'

// Lazy load project pages - add your project page imports here
// Example: const MyProject = lazy(() => import('./pages/projects/MyProject'))
const Contact = lazy(() => import('./pages/Contact'))

// Lazy load below-the-fold components for better initial load
const Projects = lazy(() => import('./components/section/Projects'))
const Experience = lazy(() => import('./components/section/Experience'))
const Skills = lazy(() => import('./components/section/Skills'))
const Certifications = lazy(() => import('./components/section/Certifications'))
const Recognition = lazy(() => import('./components/section/Recognition'))
const Volunteering = lazy(() => import('./components/section/Volunteering'))
const Footer = lazy(() => import('./components/Footer'))

function HomePage() {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  return (
    <>
      <About />
      <Highlights />
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Experience />
      </Suspense>
      {/* Divider with gradient transitions */}
      <div className="w-full py-8 relative" style={{
        background: isDarkMode ? themeColors.background.gradientEnd : colors.white,
        transition: 'background 0.3s ease-in-out'
      }}>
        {/* Top gradient overlay to blend with Experience section */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '60px',
            background: isDarkMode
              ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
              : `linear-gradient(180deg, ${colors.white} 0%, transparent 100%)`,
            zIndex: 1
          }}
        />
        {/* Bottom gradient overlay to blend with Skills section */}
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '200px',
            background: isDarkMode 
              ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
              : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
            zIndex: 1
          }}
        />
        <img
          src={divider}
          alt=""
          className="w-full h-auto relative"
          style={{
            zIndex: 2,
            filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none',
            opacity: isDarkMode ? 0.7 : 1
          }}
          width="1200"
          height="100"
          loading="lazy"
        />
      </div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <Skills />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Recognition />
      </Suspense>
      <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
        <Volunteering />
      </Suspense>
    </>
  )
}

// Show the splash once per browser visit, and never to people who prefer reduced motion
const shouldShowSplash = () => {
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    if (sessionStorage.getItem('splashSeen') === '1') return false;
  } catch {
    /* storage unavailable: just show it */
  }
  return true;
};

function AppContent() {
  const { isDarkMode } = useDarkMode();
  const [splashVisible, setSplashVisible] = useState(shouldShowSplash);

  const handleSplashDone = () => {
    try {
      sessionStorage.setItem('splashSeen', '1');
    } catch {
      /* storage unavailable */
    }
    setSplashVisible(false);
  };

  return (
    <SplashContext.Provider value={!splashVisible}>
      {splashVisible && <SplashScreen onDone={handleSplashDone} />}
      <RevealObserver />
      <ClickSparkles />
      <ScrollProgress />
      {!splashVisible && <DaisyMusic />}
      <Navigation />
      <div className="app transition-colors duration-300" style={{ backgroundColor: isDarkMode ? '#4E3945' : undefined }}>
        <a
          href="#main-content"
          className="skip-link"
          onClick={(e) => {
            // Keep the hash for the router; just move focus to the content
            e.preventDefault();
            const main = document.getElementById('main-content');
            main?.setAttribute('tabindex', '-1');
            main?.focus();
          }}
        >
          Skip to main content
        </a>
        <main id="main-content" className="main-content">
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              {/* Add your project routes here */}
              {/* Example: <Route path="/projects/my-project" element={<MyProject />} /> */}
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-32 flex items-center justify-center">Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    </SplashContext.Provider>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DarkModeProvider>
  )
}

export default App