import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Button, CustomProvider, Container } from 'rsuite';
import { routes } from './routes/index.jsx';
import { CurrentUserContext } from './contexts/CurrentUserContext.jsx';
import 'rsuite/dist/rsuite.min.css';
const router = createBrowserRouter(routes);


ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomProvider theme="light">
    <CurrentUserContext>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    </CurrentUserContext>
  </CustomProvider>
);