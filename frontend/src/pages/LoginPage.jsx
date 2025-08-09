import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // FIX 1: Import useNavigate

const API_URL = 'http://localhost:3000'; // Make sure your port is correct

const LoginPage = () => {
    const navigate = useNavigate(); // FIX 2: Initialize the navigate hook
    const [name, setName] = useState('');
    const [isDoctor, setIsDoctor] = useState(true); // Changed to true to default to Doctor Login
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        const loginType = isDoctor ? 'doctor' : 'patient';
        const endpoint = `${API_URL}/api/auth/login/${loginType}`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });

            const result = await response.json();

            if (response.ok) {
                const userId = isDoctor ? result.user.d_id : result.user.p_id;
                // FIX 3: Corrected the path and used the navigate function
                const portalPath = isDoctor ? `/doctors/${userId}` : `/portal/${userId}`;
                navigate(portalPath);
            } else {
                setError(result.error || 'Login Failed. Please check your credentials.');
            }
        } catch (error) {
            setError('An error has occurred. Please try again.');
        }
    };
    
    // ... your JSX remains the same ...
    return (
        <div className='w-screen h-full min-h-screen flex flex-col items-center space-y-2'>
            <h1 className='text-7xl mt-5'>TreatMate</h1>
            {isDoctor ? (
                <div className='space-y-3 flex flex-col'>
                    <h1 className='text-5xl mt-2 px-10'>Doctors Login</h1>
                    <div className='border-black flex items-center justify-center rounded-md w-[30vw] h-[500px] border-2'>
                        <form onSubmit={handleSubmit} className='flex-col flex space-y-2'>
                            <div className='flex flex-col'>
                                <label htmlFor="name">UserName</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-black rounded-sm' />
                            </div>
                            <div className='flex flex-col mt-2'>
                                <label htmlFor="password">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-black rounded-sm' />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type='submit' className='border-2 border-black bg-black text-white p-2 rounded-lg'>Login</button>
                            <Link to="/doctors">New Registration</Link>
                            <div className='mt-3 text-2xl'>Are You A Patient? <button type='button' onClick={() => setIsDoctor(false)}>Click Here</button></div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='space-y-3 flex flex-col'>
                    <h1 className='text-5xl mt-2 p-10'>Patients Login</h1>
                    <div className='border-black flex items-center justify-center rounded-md w-[30vw] h-[500px] border-2'>
                        <form onSubmit={handleSubmit} className='flex-col flex space-y-2'>
                             <div className='flex flex-col'>
                                <label htmlFor="name">UserName</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-black rounded-sm' />
                            </div>
                            <div className='flex flex-col mt-2'>
                                <label htmlFor="password">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-black rounded-sm' />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type='submit' className='border-2 border-black bg-black text-white p-2 rounded-lg'>Login</button>
                            <Link to="/patients">New Registration</Link>
                            <div className='mt-3 text-2xl'>Are You A Doctor? <button type='button' onClick={() => setIsDoctor(true)}>Click Here</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginPage;