import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'

import Doctors from './pages/Doctors.jsx';
import Homepage from './pages/Homepage.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Homepage />
  }
  ,
  {
    path:'/doctors',
    element: <Doctors />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
