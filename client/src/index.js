import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store';
 

// Importa el Service Worker (si usas Create React App)
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // <- Asegúrate de que este archivo exista

ReactDOM.render(
  <React.StrictMode>
      <DataProvider>
        <App />
      </DataProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// Registra el Service Worker (PWA)
serviceWorkerRegistration.register(); // <- Reemplaza "unregister()" por "register()" si usas CRA
 
// Opcional: Si no usas Create React App, registra el SW manualmente:
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}

reportWebVitals();