import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

const PatientPortal = () => {
    const [appointments, setAppointments] = useState([]);
    const { patientId } = useParams();
    
    const fetchAppointments = () => {
        fetch(`${API_URL}/api/patients/${patientId}/appointments`)
        .then(res => res.json())
        .then(result => setAppointments(result.data || []))
        .catch(error => console.error("Failed to fetch appointments:",error));
    };

    useEffect( () => {
        fetchAppointments();
    },[patientId]);

    const handleReschedule = (appointmentId) => {
        const newTime = prompt("Please enter the new desired date and time(yyyy-mm-dd HH:MM):");
        if (!newTime) return;

        fetch(`${API_URL}/api/appointments/${appointmentId}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ new_appointment_time: newTime })
        })
        .then(response => response.json())
        .then(result => {
            if (result.message === "success"){
                alert("Appointment rescheduled successfully!");
                fetchAppointments();
            }
            else{
                alert("Failed to reschedule,Try again");
            }
        })
    }
  return (
    <div className='container mx-auto p-4'>
        <h1 className='text-3xl font-bold mb-6'>My Appointments</h1>
        <div className='space-y-4'>
            {appointments.length > 0 ?
            appointments.map(app => (
                <div key={app.a_id} className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'>
                    <div>
                        <p className='font-bold text-5xl'>
                           Dr. {app.doctor_name}
                        </p>
                        <p className='text-gray-600'>
                            Time: {new Date(app.appointment_time).toLocaleString()};
                        </p>
                    </div>
                    <button onClick={ () => handleReschedule(app.a_id)} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                        Reschedule
                    </button>
                </div>
            ))
            :

            <div>
                <p>You have no appointments scheduled</p>

                <div>
                    <p>
                        Request for an appointment today</p></div> 
            </div>
        }
        </div>
    </div>
  )
}

export default PatientPortal