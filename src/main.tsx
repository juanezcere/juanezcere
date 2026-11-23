import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './presentation/styles/tokens.css';
import './presentation/styles/global.css';

const rootElement = document.getElementById('root');

if (!(rootElement instanceof HTMLElement)) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <main className="bootstrap">
      <h1>Fase 1: dominio y contratos</h1>
      <p>Entidades, puertos y tokens de UI listos.</p>
    </main>
  </StrictMode>,
);
