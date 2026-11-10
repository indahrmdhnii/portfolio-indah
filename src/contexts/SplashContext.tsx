import { createContext, useContext } from 'react';

/** True once the splash screen has finished (or was skipped). */
export const SplashContext = createContext<boolean>(true);

export const useSplashDone = () => useContext(SplashContext);
