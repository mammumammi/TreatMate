'use client';

import AddPatients from '@/app/components/AddPatients';
import { ThemeSwitcher } from '@/app/components/ThemeSwitcher';
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import api from '@/services/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Doctor{
  d_id: number;
  name: string;
  YOE: number;
  expertise: string;
}

interface Patient{
  p_id: number;
  name: string;
  DOB: string;
  gender: string;
  phone: number;
}

interface Appointment{
  a_id: number;
  doctor_id: number;
  patient_id: number;
  app_time: string;
  status: string;
}




type Props = {}

const AdminDashboard = (props: Props) => {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments,setAppointments] = useState<Appointment[]>([]);
  const [ newDoctor,setNewDoctor] = useState({ name: '',expertise: '',YOE: '',password: ''});
  const [ newPatient,setNewPatient] = useState({ name: '',password: '',phone: '',DOB: ''});
  const [newAppointment,setNewAppointment] = useState({a_id: '',doctor_id: '',patient_id: '',app_time: '',status: ''})

  const fetchData = async() => 
  {
    try {
      const [doctorsRes,patientsRes,appointmentRes] = await Promise.all([
        api.get('/doctors'),
        api.get('/patients'),
        api.get('/appointments')
      ]);

      console.log(doctorsRes.data);
      setDoctors(doctorsRes.data.doctors || []);
      setPatients(patientsRes.data.patients || []);
      setAppointments(appointmentRes.data.data || []);


    }
    catch (error){
      console.error("Failed to fetch data:",error);
    }
  };

  useEffect( ()=>{
    fetchData()
  },[]);

  return (
    <>
      <AnimatedGridPattern  duration={2} numSquares={5} className=' min-h-[150vh]' />
    <main className='  h-full min-h-screen'>
      <ThemeSwitcher/>
      <section className='p-10'>
        <h1 className='m-4 text-3xl'>Admin Dashboard</h1>
        <p>Number of doctors in the platform:{doctors.length}</p>
        <p>NUmber of patients in the platform:{patients.length}</p>
      </section>
      <section className='p-10'>
        <h1 className='text-2xl m-5'>Doctors</h1>
        <p>Doctors available</p>
        <div>
          {doctors.map(doc=> 
            <div key={doc.d_id} className='flex flex-row space-x-5'><p>{doc.name}</p>
            <p>{doc.d_id}</p>
            <p>{doc.YOE}</p>
            <p>{doc.expertise}</p>
            </div>
          )}
        </div>
      </section>
      <section className='p-10'>
        <h1 className='text-2xl m-5'>Patients</h1>
        <p>Patients Available</p>
        <div>
          {patients.map(pat => 
            <div className='flex flex-row space-x-5' key={pat.p_id}>
              <p>{pat.name}</p>
              <p>{pat.DOB}</p>
              <p>{pat.p_id}</p>
              <p>{pat.gender}</p>
              <p>{pat.phone}</p>
            </div>
          )}
        </div>
        <AddPatients onPatientAdded={fetchData}/>
      </section>
      <section className='p-10'>
        <h1 className='m-5 text-2xl'>Appointments</h1>
        <p>Appointments available</p>
        <div>
          {appointments.map( app => 
            <div className='flex flex-row space-x-5'>
              <p>{app.a_id}</p>
              <p>{app.status}</p>
              <p>{app.patient_id}</p>
              <p>{app.doctor_id}</p>
              <p>{app.app_time}</p>
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  )
}

export default AdminDashboard