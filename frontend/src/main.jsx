import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'

import Doctors from './pages/Doctors.jsx';
import Homepage from './pages/Homepage.jsx';
import Patients from './pages/Patients.jsx';
import Appointments from './pages/Appointments.jsx';
import PatientPortal from './pages/PatientPortal.jsx';
import LoginPage from './pages/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<LoginPage />
  }
  ,
  {
    path:'/doctors',
    element: <Doctors />
  }
  ,
  {
    path:'/patients',
    element: <Patients />
  },
  {
    path:'/appointments',
    element: <Appointments />
  },
  {
    path: "/portal/:patientId",
    element: <PatientPortal/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
