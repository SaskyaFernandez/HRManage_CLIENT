import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes/index.jsx';

const router = createBrowserRouter(routes);

import { RecoilRoot } from 'recoil';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);