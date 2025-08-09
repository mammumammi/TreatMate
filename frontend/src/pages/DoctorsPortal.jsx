// src/pages/DoctorPortalPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000'; // Make sure port is correct

const DoctorPortal = () => {
    const [appointments, setAppointments] = useState([]);
    const { doctorId } = useParams(); // Get the doctor's ID from the URL

    const fetchAppointments = () => {
        if (!doctorId) return;
        fetch(`${API_URL}/api/doctors/${doctorId}/appointments`)
            .then(res => res.json())
            .then(result => setAppointments(result.data || []))
            .catch(error => console.error("Failed to fetch appointments:", error));
    };

    useEffect(() => {
        fetchAppointments();
    }, [doctorId]);

    const handleCancelAppointment = (appointmentId) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            fetch(`${API_URL}/api/appointments/${appointmentId}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(result => {
                if (result.message.includes("success")) {
                    alert("Appointment cancelled!");
                    fetchAppointments(); // Refresh the list to remove the cancelled appointment
                } else {
                    alert("Failed to cancel appointment. Please try again.");
                }
            });
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-6'>Doctor's Dashboard</h1>
            <div className='space-y-4'>
                {appointments.length > 0 ?
                    appointments.map(app => (
                        <div key={app.a_id} className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'>
                            <div>
                                <p className='font-bold text-xl'>
                                    Patient: {app.patient_name}
                                </p>
                                <p className='text-gray-600'>
                                    Time: {new Date(app.appointment_time).toLocaleString()}
                                </p>
                            </div>
                            <button 
                                onClick={() => handleCancelAppointment(app.a_id)} 
                                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    ))
                    :
                    <div>
                        <p>You have no upcoming appointments.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default DoctorPortal;