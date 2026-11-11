import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AsciiMorphText from '../AsciiMorphText';
import TypewriterCarousel from '../TypewriterCarousel';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors, withAlpha } from '../../hooks/useThemeColors';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSplashDone } from '../../contexts/SplashContext';
import { aboutMeJournal, profileIndah, profilePhotos, stickers as stickerImages } from '../../assets';
import { about, hero } from '../../data/content';
import { icons3d } from '../../assets/icons3d';
import DraggableDaisy from '../fx/DraggableDaisy';
import { certs } from '../../data/certs';


const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { lang, t } = useLanguage();
  const splashDone = useSplashDone();

  const roles = hero.roles[lang];
  const profileImages = profilePhotos;
  const hasPhotos = profileImages.length > 0;
  const notes = about.notes[lang].map((note) => note.replace('{certCount}', String(certs.length)));


  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;

          // Calculate how much of the section is in view
          const visibleTop = Math.max(0, -rect.top);
          const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          const progress = visibleHeight / windowHeight;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus management for modal
  useEffect(() => {
    if (showProfileModal) {
      // Focus the modal when it opens
      const timer = setTimeout(() => {
        const modal = document.querySelector('[role="region"][aria-label="Profile photo carousel"]') as HTMLElement;
        if (modal) {
          modal.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showProfileModal]);

  // Carousel navigation functions
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? profileImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === profileImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Escape') {
      setIsClosing(true);
      setTimeout(() => {
        setShowProfileModal(false);
        setIsClosing(false);
      }, 300);
    }
  };

  const stickers = [
    { id: 1, image: stickerImages[0], initialX: -180, initialY: -80, finalX: -550, finalY: -100, mobileInitialX: -120, mobileInitialY: -60, mobileFinalX: -250, mobileFinalY: -80 },
    { id: 2, image: stickerImages[1], initialX: 180, initialY: -60, finalX: 600, finalY: -250, mobileInitialX: 120, mobileInitialY: -40, mobileFinalX: 200, mobileFinalY: -120 },
    { id: 3, image: stickerImages[2], initialX: -160, initialY: 240, finalX: -200, finalY: 380, mobileInitialX: -100, mobileInitialY: 160, mobileFinalX: -120, mobileFinalY: 220 },
    { id: 4, image: stickerImages[3], initialX: 190, initialY: 260, finalX: 500, finalY: 150, mobileInitialX: 110, mobileInitialY: 180, mobileFinalX: 180, mobileFinalY: 120 },
    { id: 5, image: stickerImages[4], initialX: -200, initialY: 120, finalX: -200, finalY: -380, mobileInitialX: -130, mobileInitialY: 80, mobileFinalX: -130, mobileFinalY: -180 },
    { id: 6, image: stickerImages[5], initialX: 170, initialY: 100, finalX: 150, finalY: -360, mobileInitialX: 110, mobileInitialY: 70, mobileFinalX: 100, mobileFinalY: -160 },
    { id: 7, image: stickerImages[6], initialX: -130, initialY: -130, finalX: -450, finalY: -380, mobileInitialX: -90, mobileInitialY: -90, mobileFinalX: -200, mobileFinalY: -200 },
    { id: 8, image: stickerImages[7], initialX: 150, initialY: 200, finalX: 200, finalY: 350, mobileInitialX: 100, mobileInitialY: 140, mobileFinalX: 130, mobileFinalY: 200 },
    { id: 9, image: stickerImages[8], initialX: -140, initialY: 300, finalX: -500, finalY: 200, mobileInitialX: -90, mobileInitialY: 200, mobileFinalX: -180, mobileFinalY: 160 },
    { id: 10, image: stickerImages[9], initialX: 200, initialY: 120, finalX: 500, finalY: -380, mobileInitialX: 130, mobileInitialY: 80, mobileFinalX: 200, mobileFinalY: -180 },
    { id: 11, image: stickerImages[10], initialX: -220, initialY: -40, finalX: 600, finalY: 10, mobileInitialX: -140, mobileInitialY: -30, mobileFinalX: 220, mobileFinalY: 10 },
    { id: 12, image: stickerImages[11], initialX: 110, initialY: -180, finalX: 500, finalY: 300, mobileInitialX: 80, mobileInitialY: -120, mobileFinalX: 180, mobileFinalY: 180 },
    { id: 13, image: stickerImages[12], initialX: -120, initialY: 360, finalX: 500, finalY: -100, mobileInitialX: -80, mobileInitialY: 240, mobileFinalX: 180, mobileFinalY: -80 },
    { id: 14, image: stickerImages[13], initialX: 210, initialY: 40, finalX: -640, finalY: -220, mobileInitialX: 140, mobileInitialY: 30, mobileFinalX: -220, mobileFinalY: -140 },
    { id: 15, image: stickerImages[14], initialX: -100, initialY: 160, finalX: -400, finalY: 320, mobileInitialX: -70, mobileInitialY: 110, mobileFinalX: -150, mobileFinalY: 200 },
    { id: 16, image: stickerImages[15], initialX: 130, initialY: -100, finalX: -600, finalY: 100, mobileInitialX: 90, mobileInitialY: -70, mobileFinalX: -200, mobileFinalY: 80 },
  ];

  const getStickerStyle = (sticker: typeof stickers[0]) => {
    const progress = scrollProgress; // Direct progress for spreading effect when closer
    const isMobile = window.innerWidth < 768;
    const isVerySmall = window.innerWidth < 375; // iPhone SE and similar

    // Use mobile positioning on smaller screens
    const initialX = isMobile ? sticker.mobileInitialX : sticker.initialX;
    const initialY = isMobile ? sticker.mobileInitialY : sticker.initialY;
    const finalX = isMobile ? sticker.mobileFinalX : sticker.finalX;
    const finalY = isMobile ? sticker.mobileFinalY : sticker.finalY;

    // Further constrain for very small screens to prevent ANY horizontal overflow
    const constrainedFinalX = isVerySmall
      ? Math.max(-100, Math.min(100, finalX * 0.3))
      : isMobile
        ? Math.max(-150, Math.min(150, finalX * 0.5))
        : finalX;
    const constrainedFinalY = isVerySmall ? finalY * 0.6 : finalY * 0.8;

    const x = initialX + (constrainedFinalX - initialX) * progress;
    const y = initialY + (constrainedFinalY - initialY) * progress;
    const scale = isVerySmall ? 0.4 + (0.15 * progress) : isMobile ? 0.6 + (0.2 * progress) : 0.8 + (0.4 * progress);
    const opacity = 0.9 + (0.1 * progress);
    const rotation = progress * 20; // Add slight rotation

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
      opacity,
      transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
      willChange: 'transform, opacity',
      width: isVerySmall ? '50px' : isMobile ? '60px' : '80px',
      height: isVerySmall ? '50px' : isMobile ? '60px' : '80px',
      filter: `drop-shadow(0 4px 8px ${themeColors.effects.dropShadow})`
    };
  };

  return (
    <section id="about" ref={sectionRef} className="min-h-screen" style={{
      background: themeColors.background.sections?.about || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out',
      width: '100%',
      maxWidth: '100vw',
      contain: 'layout style'
    }}>
      {/* Hero Section */}
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start max-w-6xl mx-auto gap-8 md:gap-10">
            <div className="text-left w-full md:w-auto md:flex-1 min-w-0">
              <div className="ascii-container justify-start">
                {splashDone ? <AsciiMorphText key={lang} text={t(hero.greeting)} /> : <div style={{ minHeight: '2.4rem' }} />}
              </div>
              <h1 className={`hero-tagline ${splashDone ? 'play' : ''}`} style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[900] }}>
                <span className="hero-line">
                  {t(hero.taglineA).split(' ').map((word, i) => (
                    <span key={`a-${lang}-${i}`} className="hero-word" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>{word}</span>
                  ))}
                </span>
                <span className="hero-line hero-line-b" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>
                  {t(hero.taglineB).split(' ').map((word, i) => (
                    <span key={`b-${lang}-${i}`} className="hero-word" style={{ animationDelay: `${0.55 + i * 0.12}s` }}>{word}</span>
                  ))}
                  <svg className="hero-squiggle" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3 13 C 50 3, 90 19, 140 10 S 230 3, 297 11" />
                  </svg>
                </span>
              </h1>
              <p className={`hero-label hero-fade ${splashDone ? 'play' : ''}`} style={{ color: isDarkMode ? themeColors.colors.pink[200] : themeColors.colors.pink[800] }}>
                {t(hero.label)}
              </p>
              <div className={`hero-fade hero-fade-2 ${splashDone ? 'play' : ''}`}><div className="hero-subtitle justify-start text-base md:text-lg lg:text-xl mt-2">
                <div className="flex flex-wrap items-center justify-start">
                  <span className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}>{t(hero.rolePrefix)}&nbsp;</span>
                  <TypewriterCarousel key={lang} roles={roles} className={isDarkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'} />
                </div>
              </div>
              </div>
              <div className={`hero-buttons hero-fade hero-fade-3 flex justify-start gap-3 mt-4 ${splashDone ? 'play' : ''}`}>
                <button
                  className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t(hero.ctaProjects)}
                </button>
                <Link
                  to="/contact"
                  className="hero-action-btn text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5"
                >
                  {t(hero.ctaContact)}
                </Link>
              </div>
            </div>
            {/* Polaroid photo: taped to the page, straightens on hover */}
            <figure className={`hero-photo hero-fade hero-fade-2 ${splashDone ? 'play' : ''} ${isDarkMode ? 'hero-photo-dark' : ''}`}>
              <span className="hero-photo-blob" aria-hidden="true" />
              <div className="polaroid">
                <span className="polaroid-tape" aria-hidden="true" />
                <div className="polaroid-img">
                  <img src={profileIndah} alt={t(hero.photoAlt)} width="720" height="808" loading="eager" decoding="async" />
                </div>
                <figcaption className="polaroid-caption">{t(hero.photoCaption)}</figcaption>
              </div>
              <img className="hero-photo-star" src={icons3d.starGold} alt="" aria-hidden="true" />
              <img className="hero-photo-heart" src={icons3d.heart} alt="" aria-hidden="true" />
              <DraggableDaisy style={{ bottom: '-22px', left: '-38px' }} size={66} rotate={-10} />
            </figure>
          </div>
        </div>
      </div>

      {/* About Section with Stickers and Journal */}
      <div className="py-8 md:py-12" style={{
        background: isDarkMode
          ? 'transparent'
          : `linear-gradient(180deg, transparent 0%, ${withAlpha(themeColors.colors.pink[50], 0.5)} 50%, ${themeColors.colors.pink[25]} 100%)`
      }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center relative min-h-[400px] md:min-h-[600px]">
            {/* Animated Stickers */}
            <div className="absolute inset-0 flex items-center justify-center">
              {stickers.map((sticker) => {
                const isVerySmall = window.innerWidth < 375;
                const isMobile = window.innerWidth < 768;
                return (
                  <img
                    key={sticker.id}
                    src={sticker.image}
                    alt=""
                    className="absolute z-10 pointer-events-none select-none"
                    style={getStickerStyle(sticker)}
                    loading={sticker.id <= 4 ? "eager" : "lazy"}
                    decoding="async"
                    width={isVerySmall ? "50" : isMobile ? "60" : "80"}
                    height={isVerySmall ? "50" : isMobile ? "60" : "80"}
                  />
                );
              })}
            </div>

            {/* About Me Journal: text is laid over the notebook pages */}
            <div className="w-full md:max-w-2xl lg:max-w-4xl relative z-20 px-1 md:px-0">
              <div
                data-reveal="up"
                className={`journal ${hasPhotos ? 'cursor-pointer' : ''}`}
                onClick={hasPhotos ? () => setShowProfileModal(true) : undefined}
              >
                <img
                  src={aboutMeJournal}
                  alt=""
                  className="journal-image"
                  width="1600"
                  height="1227"
                  fetchPriority="high"
                  loading="eager"
                />
                <DraggableDaisy style={{ top: '4%', right: '3%' }} size={72} rotate={12} className="daisy-journal" />
                <div className="journal-page journal-page-left">
                  <h2 className="journal-title">{t(about.leftTitle)}</h2>
                  {about.leftBody[lang].map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <p className="journal-invite">
                    {t(about.invite)}{' '}
                    <Link to="/contact" onClick={(e) => e.stopPropagation()}>{t(about.inviteCta)}</Link>
                  </p>
                </div>
                <div className="journal-page journal-page-right">
                  <h2 className="journal-title">{t(about.rightTitle)}</h2>
                  <ul>
                    {notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                  <p className="journal-open">{t(about.openTo)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && hasPhotos && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          style={{ backgroundColor: themeColors.background.overlay }}
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              setShowProfileModal(false);
              setIsClosing(false);
            }, 300);
          }}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className={`relative w-full max-w-sm md:max-w-md ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`} onClick={(e) => e.stopPropagation()}>
            {/* Carousel Container */}
            <div
              className="relative w-full bg-black rounded-lg shadow-2xl overflow-hidden focus:outline-none"
              style={{
                aspectRatio: '4/5',
                minHeight: '300px',
                maxHeight: '80vh'
              }}
              role="region"
              aria-label="Profile photo carousel"
              aria-live="polite"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {/* Image Display */}
              <div className="relative w-full h-full flex items-center justify-center">
                {profileImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    alt={`Profile photo ${index + 1}`}
                    className={`absolute w-full h-full object-contain transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    onError={(e) => {
                      console.error('Image failed to load:', image.src);
                      e.currentTarget.style.display = 'block';
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-300"
                style={{
                  backgroundColor: isDarkMode ? withAlpha(themeColors.colors.dark[700], 0.9) : withAlpha(themeColors.colors.white, 0.8),
                  color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[700],
                  border: isDarkMode ? '2px solid #374151' : 'none',
                  boxShadow: isDarkMode ? `0 4px 12px ${withAlpha(themeColors.colors.black, 0.6)}` : undefined
                } as React.CSSProperties}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-300"
                style={{
                  backgroundColor: isDarkMode ? withAlpha(themeColors.colors.dark[700], 0.9) : withAlpha(themeColors.colors.white, 0.8),
                  color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[700],
                  border: isDarkMode ? '2px solid #374151' : 'none',
                  boxShadow: isDarkMode ? `0 4px 12px ${withAlpha(themeColors.colors.black, 0.6)}` : undefined
                } as React.CSSProperties}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {profileImages.length}
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-base font-medium max-w-[220px] text-center">
                {profileImages[currentImageIndex].caption}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-0 mt-4">
              {profileImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 flex items-center justify-center"
                  style={{
                    minWidth: '44px',
                    minHeight: '44px',
                    padding: '0',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  } as React.CSSProperties}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <span
                    className="rounded-full transition-all"
                    style={{
                      width: index === currentImageIndex ? '32px' : '12px',
                      height: '12px',
                      backgroundColor: index === currentImageIndex ? themeColors.colors.pink[300] : (isDarkMode ? withAlpha(themeColors.colors.pink[300], 0.3) : themeColors.colors.dark[300])
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white rounded-full w-11 h-11 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
              style={{ 
                backgroundColor: themeColors.colors.pink[500],
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColors.colors.pink[600]}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = themeColors.colors.pink[500]}
              aria-label="Close modal"
              onClick={(e) => {
                e.stopPropagation();
                setIsClosing(true);
                setTimeout(() => {
                  setShowProfileModal(false);
                  setIsClosing(false);
                }, 300);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;