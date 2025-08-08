import React, { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000';


const Patients = () => {
    const [patients, setPatients] = useState([]);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('N/A');
    const [medical_reports, setMedical_reports] = useState('');
    const [DOB, setDOB] = useState('');
    const [severity, setSeverity] = useState('');
    const [disease, setDisease] = useState('None');
    const [medicines_in_use, setMedicines_in_use] = useState('');

    useEffect( () => {
        fetch(`${API_URL}/api/patients`)
        .then(response => response.json())
        .then(result => setPatients(result.data || []))
        .catch(error => console.error('Error :',error));
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPatient = { name,gender,medical_reports,medicines_in_use,DOB,severity,disease};

        try {
            const response = await fetch(`${API_URL}/api/patients`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPatient)
            });
            if (response.ok){
                console.log("patient data added sucessfully");
                
            }
            else {
                alert('Failed to add data');
            }
        }
        catch (error) {
            console.error('Failed:',error);
        }
    };


  return (
    <div className='w-screen min-h-screen h-full'>
        {patients.length > 0 ? <div>
            <h1 className='text-center text-5xl'>Patients List</h1> 
            <div className='flex flex-col space-y-3 p-10 mt-10'>
                {patients.map((patient) => (
                    <div className='flex flex-row space-x-3' key={patient.id}>
                        <p>{patient.p_id}</p>
                        <p>{patient.name}</p>
                        <p>{patient.DOB}</p>
                        <p>{patient.disease}</p>
                        <p>{patient.medicines_in_use}</p>
                        <p>{patient.gender}</p>
                        <p>{patient.medical_reports}</p>
                    </div>
                ))}
            </div>
        </div>
            :
            <div>
            <h1>No patients available</h1>
            
            </ div>
        
        }
        <div className='mt-10 flex flex-col '>
                <h1 className='text-center text-5xl'>Add A Patient</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-6 space-x-3 space-y-3 p-10'>
                    <div className='flex flex-col space-x-1'>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={name} onChange={ (e) => setName(e.target.value)} className='border-2 border-black rounded-md' />
                    </div>
                    <div className='flex flex-col space-x-1'>
                        <label htmlFor="gender">gender</label>
                        <input type="text" value={gender} onChange={ (e) => setGender(e.target.value)} className='border-2 border-black rounded-md' />
                    </div>
                    <div className='flex flex-col space-x-1'>
                        <label htmlFor="medical_reports">MEdical reports</label>
                        <input type="text" value={medical_reports} onChange={ (e) => setMedical_reports(e.target.value)} className='border-2 border-black rounded-md' />
                    </div>
                    <div className='flex flex-col space-x-1'>
                        <label htmlFor="DOB">DOB (yyyy-mm-dd)</label>
                        <input type="text" value={DOB} onChange={ (e) => setDOB(e.target.value)} className='border-2 border-black rounded-md' />
                    </div>
                    <div className='flex flex-col space-x-1'>
                        <label htmlFor="disease">Disease</label>
                        <input type="text" value={disease} onChange={ (e) => setDisease(e.target.value)} className='border-2 border-black rounded-md' />
                    </div>
                    <div className='flex flex-col space-x-1'>
                        <label htmlFor="medicines_in_use">MEdicines in use</label>
                        <input type="text" value={medicines_in_use} onChange={ (e) => setMedicines_in_use(e.target.value)} className='border-2 border-black rounded-md' />
                    </div>
                    <button type="submit" className='bg-green-300 text-zinc-50 p-2 rounded-lg'>Add</button>
                </form>
            </div>

        
    </div>
  )
}

export default Patients