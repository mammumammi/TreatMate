import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000'; // Ensure your port is correct

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    // FIX #1: Use lowercase for state variable names for consistency
    const [name, setName] = useState('');
    const [expertise, setExpertise] = useState('');
    const [yoe, setYoe] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');

    const fetchDoctors = () => {
        fetch(`${API_URL}/api/doctors`)
            .then(response => response.json())
            .then(result => setDoctors(result.data || []))
            .catch(error => console.error('Error fetching details: ', error));
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // The 'yoe' state variable is used here
        const newDoctor = { name, expertise, YOE: Number(yoe), gender, password };

        try {
            const response = await fetch(`${API_URL}/api/doctors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoctor),
            });

            if (response.ok) {
                console.log('Data added successfully');
                // FIX #2: Refresh the list and clear the form after success
                fetchDoctors();
                setName('');
                setExpertise('');
                setYoe('');
                setGender('Male');
                setPassword('');
            } else {
                alert('Failed to add data. Please Try again');
            }
        } catch (error) {
            console.error('Failed error :', error);
        }
    };

    return (
        <div className='min-h-screen h-full w-full bg-gray-50 p-8'>
            <h1 className='text-center text-4xl font-bold text-gray-800'>Doctors Dashboard</h1>

            {/* Display Doctors List */}
            <div className='mt-10 max-w-4xl mx-auto'>
                <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
                <div className='bg-white p-4 rounded-lg shadow-md'>
                    <div className='grid grid-cols-5 gap-4 font-bold text-gray-500 border-b pb-2'>
                        <p>Name</p>
                        <p>Expertise</p>
                        <p>YOE</p>
                        <p>Gender</p>
                        <p>Patients Assigned</p>
                    </div>
                    {doctors.length > 0 ? doctors.map((doctor) => (
                        <div key={doctor.d_id} className='grid grid-cols-5 gap-4 py-2 border-b'>
                            <p>{doctor.name}</p>
                            <p>{doctor.expertise}</p>
                            <p>{doctor.YOE}</p>
                            <p>{doctor.gender}</p>
                            <p>{doctor.patients_assigned}</p>
                        </div>
                    )) : <p className="text-center py-4">No Available Doctors</p>}
                </div>
            </div>

            {/* Add Doctor Form */}
            <div className='mt-12 max-w-4xl mx-auto'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Add a New Doctor</h2>
                <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
                        </div>
                        <div>
                            <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
                            <input id="expertise" type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
                        </div>
                        <div>
                            <label htmlFor="YOE" className="block text-sm font-medium text-gray-700">Years Of Experience</label>
                            <input id="YOE" type="number" value={yoe} onChange={(e) => setYoe(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Password</label>
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
                        </div>
                    </div>
                    <button className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300' type='submit'>
                        Register Doctor
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Doctors;