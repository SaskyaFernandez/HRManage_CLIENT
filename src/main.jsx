import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/index.jsx';

const router = createBrowserRouter(routes);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);