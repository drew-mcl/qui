import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error';
import Home from './components/Home';
import Launcher from './components/Launcher';
import OrderTable from './components/OrderTable';
import AppDataTable  from './components/ReleaseRadar';
import EtcdViewer from './components/EtcdViewer';
import Dashboard from './components/Dashboard';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import ConfigAdjuster from './components/ConfigAdjuster';

const materialTheme = materialExtendTheme();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home/",
        element: <Home />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
      },
      {
        path: "orders/",
        element: <OrderTable />,
      },
      {
        path: "launcher/",
        element: <Launcher />,
      },
      {
        path: "radar/",
        element: <AppDataTable/>,
      },
      {
        path: "config/",
        element: <ConfigAdjuster />,
      },
      {
        path: "etcd/",
        element: <EtcdViewer />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode> 
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
    <RouterProvider router={router} />
    </MaterialCssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
