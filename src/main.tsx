import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/700.css'
import '@fontsource/covered-by-your-grace/400.css'
import '@fontsource/sacramento/400.css'
import './index.css'
import App from './App.tsx'

// Reveal the handwritten text once its fonts have loaded, so it never flashes in a fallback font.
// Never wait longer than 1.5s: on a very slow connection the text simply shows with the fallback.
const fontsReady = Promise.all(
  ["400 1em 'Sacramento'", "400 1em 'Covered By Your Grace'", "500 1em 'Caveat'", "700 1em 'Caveat'"].map((f) => document.fonts?.load(f)),
)
Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1500))])
  .catch(() => undefined)
  .finally(() => document.documentElement.classList.remove('fonts-loading'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
