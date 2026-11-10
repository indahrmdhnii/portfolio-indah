import { useState, useRef, useEffect } from 'react';
import SectionTitle from '../fx/SectionTitle';
import TiltCard from '../fx/TiltCard';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ExternalLink, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { lightStars, darkStars, specialStars } from '../../assets/stars';
import { comingSoon } from '../../assets';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects, projectStatusLabel, ui } from '../../data/content';
import type { ProjectStatus } from '../../data/content';

const statusStyle: Record<ProjectStatus, { bg: string; fg: string; dot: string }> = {
  live: { bg: '#DCFCE7', fg: '#166534', dot: '#22C55E' },
  completed: { bg: '#E0E7FF', fg: '#3730A3', dot: '#6366F1' },
  development: { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },
  concept: { bg: '#F1F5F9', fg: '#334155', dot: '#94A3B8' },
};

const Projects = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { t } = useLanguage();

  // track all the random background stars
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; image: string; isDragging: boolean }>>([]);
  const [draggedStar, setDraggedStar] = useState<number | null>(null);

  // the special "drag me" star
  const [specialStar, setSpecialStar] = useState<{ x: number; y: number }>({ x: 85, y: 8 });
  const [isDraggingSpecial, setIsDraggingSpecial] = useState(false);

  // carousel state
  // Which screenshot the LinTas phone shows; changes only when the phone is tapped
  const [peekIndex, setPeekIndex] = useState(0);
  const [mascotPose, setMascotPose] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const projectsPerPage = 4;

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    // spawn stars when component mounts or dark mode changes
    const generatedStars = Array.from({ length: 30 }, (_, i) => {
      let x, y;

      // Keep stars away from the title and cards area (roughly 20-80% horizontally, 15-85% vertically)
      const zone = i % 4;
      if (zone === 0) {
        // top area - above the title
        x = Math.random() * 90 + 5;
        y = Math.random() * 10; // Only in top 10%
      } else if (zone === 1) {
        // bottom area - below the cards
        x = Math.random() * 90 + 5;
        y = Math.random() * 10 + 90; // Only in bottom 10%
      } else if (zone === 2) {
        // left side
        x = Math.random() * 15; // Only in left 15%
        y = Math.random() * 60 + 20; // Middle vertical area
      } else {
        // right side
        x = Math.random() * 15 + 85; // Only in right 15%
        y = Math.random() * 60 + 20; // Middle vertical area
      }

      return {
        id: i,
        x: x,
        y: y,
        image: (isDarkMode ? darkStars : lightStars)[Math.floor(Math.random() * (isDarkMode ? darkStars : lightStars).length)],
        isDragging: false
      };
    });
    setStars(generatedStars);
  }, [isDarkMode]);

  // Drag handlers for special star
  const handleSpecialStarMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingSpecial(true);
    isDraggingRef.current = true;
  };

  const handleSpecialStarTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDraggingSpecial(true);
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSpecial && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Keep within bounds
        const clampedX = Math.max(0, Math.min(95, x));
        const clampedY = Math.max(0, Math.min(95, y));

        setSpecialStar({ x: clampedX, y: clampedY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingSpecial && containerRef.current && e.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        // Keep within bounds
        const clampedX = Math.max(0, Math.min(95, x));
        const clampedY = Math.max(0, Math.min(95, y));

        setSpecialStar({ x: clampedX, y: clampedY });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSpecial(false);
      isDraggingRef.current = false;
    };

    const handleTouchEnd = () => {
      setIsDraggingSpecial(false);
      isDraggingRef.current = false;
    };

    if (isDraggingSpecial) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingSpecial]);

  // Drag handlers for regular stars
  const handleStarMouseDown = (starId: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggedStar(starId);
    isDraggingRef.current = true;
    setStars(prevStars =>
      prevStars.map(s => s.id === starId ? { ...s, isDragging: true } : s)
    );
  };

  const handleStarTouchStart = (starId: number) => (e: React.TouchEvent) => {
    e.stopPropagation();
    setDraggedStar(starId);
    isDraggingRef.current = true;
    setStars(prevStars =>
      prevStars.map(s => s.id === starId ? { ...s, isDragging: true } : s)
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggedStar !== null && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Keep within bounds
        const clampedX = Math.max(0, Math.min(95, x));
        const clampedY = Math.max(0, Math.min(95, y));

        setStars(prevStars =>
          prevStars.map(s =>
            s.id === draggedStar ? { ...s, x: clampedX, y: clampedY } : s
          )
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (draggedStar !== null && containerRef.current && e.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;

        // Keep within bounds
        const clampedX = Math.max(0, Math.min(95, x));
        const clampedY = Math.max(0, Math.min(95, y));

        setStars(prevStars =>
          prevStars.map(s =>
            s.id === draggedStar ? { ...s, x: clampedX, y: clampedY } : s
          )
        );
      }
    };

    const handleMouseUp = () => {
      if (draggedStar !== null) {
        setStars(prevStars =>
          prevStars.map(s => s.id === draggedStar ? { ...s, isDragging: false } : s)
        );
        setDraggedStar(null);
        isDraggingRef.current = false;
      }
    };

    const handleTouchEnd = () => {
      if (draggedStar !== null) {
        setStars(prevStars =>
          prevStars.map(s => s.id === draggedStar ? { ...s, isDragging: false } : s)
        );
        setDraggedStar(null);
        isDraggingRef.current = false;
      }
    };

    if (draggedStar !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [draggedStar]);

  // Calculate carousel pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  // Create placeholder cards for "Coming Soon" projects
  const placeholderCount = projectsPerPage - currentProjects.length;
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
    id: `placeholder-${i}`,
    isPlaceholder: true
  }));

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setDirection('left');
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection('right');
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 relative transition-colors duration-300"
      style={{
        background: themeColors.background.sections?.projects || themeColors.background.gradient,
        transition: 'background 0.3s ease-in-out'
      }}
      ref={containerRef}
    >
      {/* Gradient overlay for smooth transition from previous section */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '150px',
          background: isDarkMode
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 2
        }}
      />
      {/* Special Drag Me Star - Interactive with Click Me arrow */}
      <div
        className="special-draggable-star"
        onMouseDown={handleSpecialStarMouseDown}
        onTouchStart={handleSpecialStarTouchStart}
        style={{
          position: 'absolute',
          left: `${specialStar.x}%`,
          top: `${specialStar.y}%`,
          width: '44px',
          height: '44px',
          zIndex: 15,
          cursor: isDraggingSpecial ? 'grabbing' : 'grab',
          userSelect: 'none',
          animation: 'twinkle 3s infinite'
        }}
      >
        <img
          src={isDarkMode ? specialStars.dragMeStarDark : specialStars.dragMeStar}
          alt="Drag me star"
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
          draggable={false}
          loading="lazy"
          width="44"
          height="44"
        />
      </div>

      {/* Static "drag me!" text with arrow */}
      <div
        className="drag-me-hint"
        style={{
          position: 'absolute',
          left: '85%',
          top: '5%',
          zIndex: 16,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'none'
        }}
      >
        <img
          src={isDarkMode ? specialStars.arrowDark : specialStars.arrow}
          alt="Arrow"
          style={{
            width: '45px',
            height: '45px',
            marginLeft: '40px'
          }}
          draggable={false}
          loading="lazy"
        />
        <span
          style={{
            fontFamily: "'Covered By Your Grace', 'Caveat', cursive",
            fontSize: '24px',
            whiteSpace: 'nowrap',
            color: isDarkMode ? '#FDD5DF' : '#ec4899',
            fontWeight: 'bold',
            userSelect: 'none',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          {t(ui.projects.dragMe)}
        </span>
      </div>

      {/* all the regular draggable stars scattered around */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="draggable-star"
          onMouseDown={handleStarMouseDown(star.id)}
          onTouchStart={handleStarTouchStart(star.id)}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: '50px',
            height: '50px',
            zIndex: 1,
            cursor: star.isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
        >
          <img
            src={star.image}
            alt="Star"
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
            draggable={false}
            loading="lazy"
            width="50"
            height="50"
          />
        </div>
      ))}

      {/* main content container with the project cards */}
      <div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle={t(ui.projects.subtitle)}>{t(ui.projects.title)}</SectionTitle>

          {/* grid layout for project cards */}
          <div
            key={currentPage}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8"
            style={{
              animation: `slideIn${direction === 'right' ? 'Right' : 'Left'} 0.4s ease-out`
            }}
          >
            {currentProjects.map((project, index) => {
              const status = statusStyle[project.status];
              return (
              <div key={project.title} data-reveal="up" style={{ ['--i' as string]: index }} className={`h-full ${project.mascots ? 'relative has-mascot' : ''}`}>
              {project.mascots && (
                <img
                  key={mascotPose[project.title] ?? 0}
                  className="mascot-peek"
                  src={project.mascots[mascotPose[project.title] ?? 0].src}
                  alt={t(project.mascots[mascotPose[project.title] ?? 0].alt)}
                  loading="lazy"
                  draggable={false}
                />
              )}
              <TiltCard className="h-full">
              <Card className={`group hover:shadow-xl transition-shadow duration-300 relative flex flex-col h-full project-card ${project.preview ? 'has-live-peek' : ''}`} style={{
                backgroundColor: themeColors.card.background,
                border: `1px solid ${themeColors.card.border}`
              }} aria-label={project.title}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    {project.logo ? (
                      <div className="project-monogram project-monogram-logo" aria-hidden="true"><img src={project.logo} alt="" /></div>
                    ) : (
                      <div className="project-monogram" aria-hidden="true">{project.monogram}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-xl dark:text-gray-100 transition-colors group-hover:!text-pink-500 dark:group-hover:!text-pink-400">
                          {project.title}
                        </CardTitle>
                        <span className={`status-pill ${project.status === 'live' || project.status === 'development' ? 'pulse' : ''}`} style={{ backgroundColor: status.bg, color: status.fg, ['--dot' as string]: status.dot }}>
                          <span className="status-dot" style={{ backgroundColor: status.dot }} />
                          {t(projectStatusLabel[project.status])}
                        </span>
                      </div>
                      {project.role && (
                        <p className="text-sm mt-1 font-medium" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800] }}>
                          {t(ui.projects.role)}: {t(project.role)}
                        </p>
                      )}
                      <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
                        {t(project.description)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                  <div className="flex flex-wrap gap-2 mb-4 content-start" style={{ flex: '1 0 auto' }}>
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs tag-pop" data-reveal="pop"
                        style={{
                          ['--i' as string]: index * 2 + tagIndex,
                          backgroundColor: themeColors.interactive.primary,
                          color: themeColors.text.accent,
                          borderColor: themeColors.primary,
                          border: '1px solid'
                        }}>
                        {t(tag)}
                      </Badge>
                    ))}
                  </div>
                  {project.mascots && (
                    <div className="mascot-strip">
                      <p className="mascot-strip-label">{t(ui.projects.meetMascot)}</p>
                      <div className="mascot-strip-row">
                        {project.mascots.map((pose, poseIndex) => (
                          <button
                            key={poseIndex}
                            type="button"
                            className={`mascot-thumb ${(mascotPose[project.title] ?? 0) === poseIndex ? 'active' : ''}`}
                            onClick={() => setMascotPose((prev) => ({ ...prev, [project.title]: poseIndex }))}
                            aria-label={t(pose.alt)}
                            aria-pressed={(mascotPose[project.title] ?? 0) === poseIndex}
                          >
                            <img src={pose.src} alt="" loading="lazy" draggable={false} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3" style={{ marginTop: 'auto', paddingTop: '8px' }}>
                    {project.url ? (
                      <a href={project.url} className="project-btn flex items-center gap-1" style={{ textDecoration: 'none', color: 'white' }} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {project.urlText ? t(project.urlText) : `${t(ui.projects.visit)} ${project.urlLabel}`}
                      </a>
                    ) : project.status !== 'completed' && !project.preview ? (
                      <span className="project-soon flex items-center gap-1" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[500] }}>
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {t(ui.projects.previewSoon)}
                      </span>
                    ) : null}
                  </div>
                </CardContent>
                {project.preview && project.preview.shots.length > 0 && (
                  <div className="live-peek">
                    <span className="peek-label">{t(ui.projects.sneakPeek)}{project.preview.shots.length > 1 && <small> · {t(ui.projects.tapNext)}</small>}</span>
                    <div
                      className="mini-phone"
                      role="button"
                      tabIndex={0}
                      aria-label={`${t(ui.projects.tapNext)}: ${project.title} (${(peekIndex % project.preview.shots.length) + 1}/${project.preview.shots.length})`}
                      onClick={() => setPeekIndex((i) => i + 1)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPeekIndex((i) => i + 1); } }}
                    >
                      <span className="mini-phone-island" aria-hidden="true" />
                      <div className="mini-screen">
                        {project.preview.shots.map((shot, shotIndex) => (
                          <img
                            key={shotIndex}
                            src={shot}
                            alt={t(ui.projects.previewAlt)}
                            loading="lazy"
                            draggable={false}
                            className={shotIndex === peekIndex % project.preview!.shots.length ? 'active' : ''}
                          />
                        ))}
                      </div>
                    </div>
                    {project.preview.shots.length > 1 && (
                      <div className="peek-dots" aria-hidden="true">
                        {project.preview.shots.map((_, dotIndex) => (
                          <span key={dotIndex} className={dotIndex === peekIndex % project.preview!.shots.length ? 'on' : ''} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
              </TiltCard>
              </div>
              );
            })}

            {/* Placeholder cards fill the grid when a page has fewer than 4 projects */}
            {placeholders.map((placeholder) => (
              <Card key={placeholder.id} className="relative" style={{
                backgroundColor: themeColors.card.background,
                border: `1px dashed ${themeColors.card.border}`,
                opacity: 0.5
              }} aria-hidden="true">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <img src={comingSoon} alt="" className="w-12 h-12 rounded-lg object-cover opacity-60" loading="lazy" width="48" height="48" />
                    <CardTitle className="text-xl" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.dark[600] }}>
                      {t(ui.projects.previewSoon)}
                    </CardTitle>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Carousel navigation - subtle dots at bottom */}
          <div className="flex items-center justify-center gap-3 mt-4 relative z-10" style={{ minHeight: '32px', display: totalPages > 1 ? 'flex' : 'none' }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="transition-all duration-200 hover:scale-110"
              style={{
                color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400],
                opacity: currentPage === 0 ? 0.2 : 0.6,
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                background: 'none',
                border: 'none',
                padding: '4px',
                minWidth: '28px',
                minHeight: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Page dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i !== currentPage) {
                      setDirection(i > currentPage ? 'right' : 'left');
                      setCurrentPage(i);
                    }
                  }}
                  className="transition-all duration-200"
                  style={{
                    width: currentPage === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentPage === i
                      ? (isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400])
                      : (isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400]),
                    opacity: currentPage === i ? 1 : 0.3,
                    cursor: 'pointer',
                    border: 'none',
                    padding: 0
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="transition-all duration-200 hover:scale-110"
              style={{
                color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400],
                opacity: currentPage === totalPages - 1 ? 0.2 : 0.6,
                cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
                background: 'none',
                border: 'none',
                padding: '4px',
                minWidth: '28px',
                minHeight: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Next projects"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '150px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1
        }}
      />
    </section>
  );
};

export default Projects;