import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';

document.documentElement.classList.add('dark');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);

reportWebVitals();
