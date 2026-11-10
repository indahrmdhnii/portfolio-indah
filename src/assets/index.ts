// Main assets module - consolidates common assets
import aboutMeJournal from './journal.webp';
import comingSoon from './coming_soon.webp';
import divider from './divider-original.webp';

// Add your profile photos here (they open when the journal is clicked):
// import profile1 from './profile1.jpg';
// export const profilePhotos = [{ src: profile1, caption: 'your caption' }];
import profileIndah from './profile/indah.webp';
// Left empty on purpose: clicking the journal should not open a photo (the photo lives in the hero polaroid).
export const profilePhotos: { src: string; caption: string }[] = [];
export { profileIndah };

export * from './stars';
export * from './stickers';

export { aboutMeJournal, comingSoon, divider };
