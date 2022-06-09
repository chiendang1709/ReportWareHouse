import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/style.scss'


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />  
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
