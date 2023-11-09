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
import OrderTable from './components/OrderTable';
import AppDataTable  from './components/ReleaseRadar';
import EtcdViewer from './components/EtcdViewer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';


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
        path: "orders/",
        element: <OrderTable />,
      },
      {
        path: "radar/",
        element: <AppDataTable/>,
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
      <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
