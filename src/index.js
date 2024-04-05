import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Error from "./Error";
import Donate from "./Donate";
import CatsAndDogsFacts from './CatsAndDogsFacts';
import Jokes from './Jokes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'donate',
        element: <Donate />
      },
      {
        path: 'cats-and-dogs-facts',
        element: <CatsAndDogsFacts />
      },
      {
        path: 'jokes',
        element: <Jokes />
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);