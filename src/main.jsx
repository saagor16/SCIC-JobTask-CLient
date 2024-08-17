import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home';
import Main from './Layout/Main';
import Login from './Pages/Login';
import AuthProvider from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import Register from './Pages/Register';
import AllProduct from './Pages/AllProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path: "/products",
        element:<AllProduct></AllProduct>,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/register",
        element:<Register></Register>,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
)
