import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload the Three.js Beams chunk early to reduce Suspense fallback time
void import('./components/Beams');

createRoot(document.getElementById("root")!).render(<App />);
