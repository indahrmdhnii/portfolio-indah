import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useThemeColors } from '../hooks/useThemeColors';
import { icons3d } from '../assets/icons3d';
import { stickers } from '../assets';
import DraggableDaisy from '../components/fx/DraggableDaisy';
import BackButton from '../components/BackButton';
import { useLanguage } from '../contexts/LanguageContext';
import { profile, ui } from '../data/content';

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const { t } = useLanguage();

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main aria-label="Contact page" className="min-h-screen py-20 transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: isDarkMode ? themeColors.background.primary : '#FEF8FA' }}>
      {/* Soft pink paper background with a few floating stickers */}
      <div className={`contact-bg ${isDarkMode ? 'contact-bg-dark' : ''}`} aria-hidden="true">
        <span className="contact-blob contact-blob-1" />
        <span className="contact-blob contact-blob-2" />
        <span className="contact-blob contact-blob-3" />
        <img className="contact-sticker cs-1" src={icons3d.heart} alt="" />
        <img className="contact-sticker cs-2" src={icons3d.starGold} alt="" />
        <img className="contact-sticker cs-3" src={stickers[4]} alt="" />
        <img className="contact-sticker cs-4" src={icons3d.bulb} alt="" />
        <img className="contact-sticker cs-5" src={stickers[0]} alt="" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <DraggableDaisy style={{ top: '-10px', right: '6%' }} size={70} rotate={8} />
        {/* Back Button */}
        <BackButton 
          to="/" 
          scrollToId="" 
          label={t(ui.contact.back)}
          ariaLabel={t(ui.contact.back)}
        />

        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600] }}>{t(ui.contact.title)}</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: themeColors.text.secondary }}>
            {t(ui.contact.subtitle)}
          </p>
        </header>

        {/* Contact Cards */}
        <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" aria-label="Contact methods">
          
          {/* Email Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="email-heading">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="email-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>{t(ui.contact.email)}</h3>
            <a 
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink,
                border: `1px solid ${themeColors.colors.pink[300]}`
              }}
            >
              {t(ui.contact.sendEmail)}
            </a>
            <p className="text-sm mt-3 break-all" style={{ color: themeColors.text.secondary }}>{profile.email}</p>
          </article>

          {/* LinkedIn Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="linkedin-heading">
            <div className="flex justify-center mb-4">
              <Linkedin className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="linkedin-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>LinkedIn</h3>
            <a 
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink,
                border: `1px solid ${themeColors.colors.pink[300]}`
              }}
            >
              {t(ui.contact.connect)}
            </a>
            <p className="text-sm mt-3 break-all" style={{ color: themeColors.text.secondary }}>{profile.linkedinDisplay}</p>
          </article>

          {/* Instagram Card */}
          <article className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300" style={{ backgroundColor: themeColors.card.background }} aria-labelledby="instagram-heading">
            <div className="flex justify-center mb-4">
              <Instagram className="h-12 w-12" style={{ color: themeColors.colors.pink[500] }} aria-hidden="true" />
            </div>
            <h3 id="instagram-heading" className="text-xl font-semibold mb-2" style={{ color: themeColors.text.primary }}>Instagram</h3>
            <a 
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink,
                border: `1px solid ${themeColors.colors.pink[300]}`
              }}
            >
              {t(ui.contact.follow)}
            </a>
            <p className="text-sm mt-3 break-all" style={{ color: themeColors.text.secondary }}>{profile.instagramDisplay}</p>
          </article>

        </section>
      </div>
    </main>
  );
};

export default Contact;