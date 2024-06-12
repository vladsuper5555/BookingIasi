import React from 'react'
import ReactDOM from 'react-dom/client'
import { CacheProvider } from '@emotion/react';
import App from './App.jsx'
import './index.css'
import cache from './emotionCache';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  // </React.StrictMode>,
)
