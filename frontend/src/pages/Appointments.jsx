import React, { useEffect, useState } from 'react'


const API_URL ='http://localhost:3000'
const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    const [doctor_id, setDoctor_id] = useState('');
    const [patient_id, setPatient_id] = useState('');
    const [appointment_time, setAppointmentTime] = useState('');
    const [medicines_prescribed, setmedicines_prescribed] = useState('');
    const [medical_bill, setMedical_bill] = useState('');
    const [fee, setFee] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAppointment = { doctor_id,patient_id,appointment_time,medicines_prescribed,medical_bill,fee};

        try {
            const response = await fetch(`${API_URL}/api/appointments`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment)
            })
            if (response.ok){
                console.log("Succes");
            }
            else {
                alert('Failed');
            }
        }
        catch (error) {
            console.error('Failed:',error);
        }
    };
    
    useEffect( () => {
        fetch(`${API_URL}/api/appointments`)
        .then(response => response.json())
        .then(result => setAppointments(result.data || []))
        .catch(error => console.error('Error:',error));
    },[]);


  return (
    <div className='w-screen min-h-screen h-full'>
        {appointments.length > 0 ? <div className='mt-5 flex items-center flex-col p-10'>
            <h1 className='text-center text-5xl'>Appointment List</h1>
            {appointments.map( (app) => (
                <div className='flex flex-row space-x-5 mt-5' key={app.id}>
                  <p>{app.doctor_id}</p>
                  <p>{app.patient_id}</p>
                  <p>{app.appointment_time}</p>  
                  <p>{app.medicines_prescribed}</p>
                  <p>{app.medical_bill}</p>
                  <p>{app.fee}</p>
                </div>
            ))}
        </div>
        :
        <div>
            NO Appointments available
        </div>    
    }

    <div className='flex flex-col items-center'>
        <h1 className='text-center text-5xl'>Add Appointment</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-6 p-10 space-x-3 space-y-3'>
            <div className='flex flex-col'>
                <label htmlFor="doctor_id">doctor Id</label>
                <input type="text" className='border-black border-2 rounded-md' value={doctor_id} onChange={ (e) => setDoctor_id(e.target.value)} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="patient_id">Patient Id</label>
                <input type="text" className='border-black border-2 rounded-md' value={patient_id} onChange={ (e) => setPatient_id(e.target.value)} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="Appointment Time">Appointment Time</label>
                <input type="text" className='border-black border-2 rounded-md' value={appointment_time} onChange={ (e) => setAppointmentTime(e.target.value)} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="dmedicines">Medicines prescribed</label>
                <input type="text" className='border-black border-2 rounded-md' value={medicines_prescribed} onChange={ (e) => setmedicines_prescribed(e.target.value)} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="medical bill">medical_bill</label>
                <input type="text" className='border-black border-2 rounded-md' value={medical_bill} onChange={ (e) => setMedical_bill(e.target.value)} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="fee">Fee</label>
                <input type="text" className='border-black border-2 rounded-md' value={fee} onChange={ (e) => setFee(e.target.value)} />
            </div>
            <button className='text-white bg-green-400 border-black rounded-e-2xl' type='submit'>Add</button>
        </form>
    </div>
    </div>
  )
}

export default Appointments