import React, { useEffect, useState } from 'react';


const API_URL = 'http://localhost:3000';

const Doctors = () => {

    const [Doctors, setDoctors] = useState([]);

    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [YOE, setYOE] = useState('');
    const [gender, setGender] = useState('N/A');

    useEffect( () => {
        fetch(`${API_URL}/api/doctors`)
        .then(response => response.json())
        .then(result => setDoctors(result.data || []))
        .catch(error => console.error('Error fetching details : ',error));
    },[]);

    const handleSubmit= async (e) => {
        e.preventDefault();
        const newDoctor = { name,expertise,YOE,gender};

        try {
            const response = await fetch(`${API_URL}/api/doctors`,{
                method:'POST',
                headers:{'Content-Type': 'application/json',
                },
                body:JSON.stringify(newDoctor),
            });
            if (response.ok){
                console.log('Data added successfully')
            }
            else {
                alert('Failed to add data.Please Try again');
            }
        }
        catch (error) {
            console.error('Failed error :',error);
        }
    };

    


  return (
    <div className='min-h-screen h-full w-screen'>
        <h1 className='text-center mt-[50px] text-5xl'>Doctors List</h1>

        <div className='mt-10 p-10 '>
            {
                Doctors.length > 0 ? <div>
                    <h1>Available Doctors</h1>
                    <div className='mt-10 space-y-5 grid grid-cols-5 gap-x-6 '>
                        
                        <p>name</p>
                                <p>expertise</p>
                                <p>YOE</p>
                                <p>gender</p>
                                <p>patients_assigned </p>
                        
                        {Doctors.map((doctor) => (
                            <React.Fragment>
                                <p>{doctor.name}</p>
                                <p>{doctor.expertise}</p>
                                <p>{doctor.YOE}</p>
                                <p>{doctor.gender}</p>
                                <p> {doctor.patients_assigned} </p>
                                </React.Fragment>
                        ))}
                    </div>
                </div>

                :
                <div>
                    <h1>No Available Doctors</h1>
                </div>
            }
        </div>

        <div className='mt-5 space-y-5 p-10'>
            <h1 className='text-5xl text-center'>Add A New Doctor</h1>

            <form onSubmit={handleSubmit} className='space-y-3 flex flex-col items-center ' >
                <div className='flex flex-row space-x-2'>
                    <div className='flex flex-col space-y-2'>
                        
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className='border-[2px] rounded-md border-black' />
                    </div>
                        
                    <div className='flex flex-col space-y-2 pl-10'>
                    <label htmlFor="expertise">Expertise</label>
                    <input type="text" value={expertise} onChange={(e)=> setExpertise(e.target.value)} className='border-[2px] rounded-md border-black' />
                    </div>

                    <div className='flex flex-col space-y-2 pl-10'>
                    <label htmlFor="Gender">Gender</label>
                    <input type="text" value={gender} onChange={(e)=> setGender(e.target.value)} className='border-[2px] rounded-md border-black' />
                    </div>

                    <div className='flex flex-col space-y-2 pl-10'>
                    <label htmlFor="YOE">Years Of Experience</label>
                    <input type="text" value={YOE} onChange={(e)=> setYOE(e.target.value)} className='border-[2px] rounded-md border-black' />
                    </div>
                </div>
                <button className='flex items-center justify-center p-2 rounded-2xl border-2 border-black bg-green-600 text-white mt-5' type='submit'>Register Doctor</button>
            </form>

        </div>

    </div>
  )
}

export default Doctors