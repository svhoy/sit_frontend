import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> {/* StrictMode sorgt dafür, dass das alles Doppelt geladen wird*/}
    <App />
  // </React.StrictMode>,
);
