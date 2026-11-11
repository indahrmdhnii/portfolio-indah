import { useEffect, useRef, useState } from "react";
import SectionTitle from '../fx/SectionTitle';
import DomeGallery from "../ui/domegallery";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { withAlpha } from "../../hooks/useThemeColors";
import { useLanguage } from "../../contexts/LanguageContext";
import { skillGroups, ui } from "../../data/content";
import { skillLogos, toDataUri } from "../../data/logos";
import DraggableDaisy from '../fx/DraggableDaisy';

// The dome shows one tile per skill. Tiles are small generated SVG images,
// so there is nothing to upload: edit the skill list in src/data/content.ts.
const tilePalette = [
  { bg: "#FFF5F7", fg: "#8B5A65" },
  { bg: "#FDD5DF", fg: "#6B4C57" },
  { bg: "#C88B95", fg: "#FFFFFF" },
  { bg: "#FFFFFF", fg: "#B8727C" },
];

const wrapWords = (label: string) => {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  words.forEach((word) => {
    if (current && (current + " " + word).length > 11) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  });
  if (current) lines.push(current);
  return lines;
};

const makeTile = (label: string, index: number) => {
  const { bg, fg } = tilePalette[index % tilePalette.length];
  const lines = wrapWords(label);
  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = Math.min(34, Math.floor(300 / longest));
  const lineHeight = fontSize * 1.2;
  const startY = 100 - ((lines.length - 1) * lineHeight) / 2;
  const text = lines
    .map((line, i) => `<text x="100" y="${startY + i * lineHeight}" text-anchor="middle" dominant-baseline="central">${line.replace(/&/g, "&amp;")}</text>`)
    .join("");
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${bg}"/><g fill="${fg}" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="${fontSize}">${text}</g></svg>`;
  const logo = skillLogos[label];
  if (logo) {
    // Logo tile: white card, logo on top, name underneath
    const nested = logo.replace("<svg ", '<svg x="50" y="34" width="100" height="92" preserveAspectRatio="xMidYMid meet" ');
    const size = Math.min(28, Math.floor(260 / label.length));
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#FFFFFF"/>${nested}<text x="100" y="160" text-anchor="middle" dominant-baseline="central" fill="#8B5A65" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-weight="700" font-size="${size}">${label}</text></svg>`;
  }
  return { src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, alt: label };
};

// Interleave the groups so neighbouring tiles come from different areas
const domeTiles = (() => {
  const longestGroup = Math.max(...skillGroups.map((group) => group.items.length));
  const labels: string[] = [];
  for (let i = 0; i < longestGroup; i++) {
    skillGroups.forEach((group) => {
      if (group.items[i]) labels.push(group.items[i]);
    });
  }
  return labels.map(makeTile);
})();

const Skills = () => {
  const [scale, setScale] = useState(0.5);
  const sectionRef = useRef<HTMLDivElement>(null);
  const domeContainerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate visibility based on how centered the section is
      let visibilityRatio = 0;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const sectionHeight = rect.height;
        const sectionCenter = rect.top + sectionHeight / 2;
        const windowCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - windowCenter);
        const maxDistance = windowHeight / 2 + sectionHeight / 2;

        // Smooth curve that peaks when section is centered
        visibilityRatio = 1 - (distanceFromCenter / maxDistance);
        visibilityRatio = Math.max(0, Math.min(1, visibilityRatio));

        // Apply easing curve for more natural growth
        visibilityRatio = visibilityRatio * visibilityRatio * (3 - 2 * visibilityRatio);
      }

      // Scale from 0.5 to 1 instead of 0 to 1 for better starting size
      const minScale = 0.5;
      const maxScale = 1;
      const finalScale = minScale + (maxScale - minScale) * visibilityRatio;
      setScale(finalScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative" style={{
      background: themeColors.background.sections?.skills || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <DraggableDaisy style={{ top: '6%', right: '9%' }} size={40} rotate={10} />
      <DraggableDaisy style={{ top: '16%', left: '5%' }} size={24} rotate={-20} />
      {/* Gradient overlay for smooth transition from previous section */}
      <div 
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '300px',
          background: isDarkMode 
            ? `linear-gradient(180deg, ${themeColors.background.gradientEnd} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${themeColors.colors.pink[25]} 0%, transparent 100%)`,
          zIndex: 1
        }}
      />
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <SectionTitle subtitle={t(ui.skills.hint)}>{t(ui.skills.title)}</SectionTitle>
        <div
          ref={domeContainerRef}
          className="relative w-full skills-dome"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <DomeGallery images={domeTiles} />
          {/* Faded edges overlay with performance-optimized blending */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDarkMode
                ? `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.dark[900], 0.1)} 70%, ${withAlpha(themeColors.colors.dark[900], 0.6)} 90%, ${withAlpha(themeColors.colors.dark[900], 0.8)} 100%)`
                : `radial-gradient(ellipse at center, transparent 40%, ${withAlpha(themeColors.colors.pink[50], 0.1)} 70%, ${withAlpha(themeColors.colors.pink[50], 0.6)} 90%, ${withAlpha(themeColors.colors.pink[50], 0.8)} 100%)`,
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
            }}
          />
        </div>

        {/* The same skills as a plain, readable list */}
        <div className="skill-groups">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.title.en} className="skill-group" data-reveal="up" style={{
              ['--i' as string]: groupIndex,
              backgroundColor: themeColors.card.background,
              borderColor: themeColors.card.border,
            }}>
              <h3 style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[800] }}>{t(group.title)}</h3>
              <ul>
                {group.items.map((item, itemIndex) => (
                  <li key={item} data-reveal="pop" style={{
                    ['--i' as string]: groupIndex + itemIndex,
                    backgroundColor: themeColors.interactive.primary,
                    color: isDarkMode ? themeColors.colors.pink[200] : themeColors.colors.pink[800],
                  }}>
                    {skillLogos[item] && <span className="skill-logo" aria-hidden="true"><img src={toDataUri(skillLogos[item])} alt="" loading="lazy" /></span>}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;