import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { store } from './app/model/store';
import { SearchPage } from './pages/search';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SearchPage />
    </Provider>
  </React.StrictMode>,
);
