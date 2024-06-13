import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'react-hook-theme';

import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider
      options={{
        theme: 'light',
        save: true
      }}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)