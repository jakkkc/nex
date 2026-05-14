import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Apply theme before React renders to prevent flash
const savedTheme = localStorage.getItem('theme') || 'neon-void';
document.documentElement.setAttribute('data-theme', savedTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
