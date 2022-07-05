import { createRoot } from 'react-dom/client';
import 'assets/styles/normalize.css';
import 'assets/styles/index.css';
import App from './App';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
