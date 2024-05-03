import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/index.jsx';

const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("L'élément root n'a pas été trouvé dans le DOM.");
}
