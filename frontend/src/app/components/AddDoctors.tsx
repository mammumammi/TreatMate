'use client';

import api from "@/services/api";
import { FormEvent, useState } from "react";

interface AddDoctorsProps {
    onDoctorsAdded: () => void;
}

const AddDoctors = ({onDoctorsAdded}: AddDoctorsProps) => {
    const [doctorData,setDoctorData] = useState({
        name: '',
        password: '',
        expertise: '',
        YOE: '',
        gender: 'Male'
    });

    const [Error,setError] = useState('');
    const [isSubmitting,setIsSubmitting] = useState(false);

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try{
            const response = await api.post('/doctors',{...doctorData,YOE: Number(doctorData.YOE)});

            if (response.status === 201){
                setError('');
                alert('Doctor registered successfully');
                setDoctorData({
                    name: '',
        password: '',
        expertise: '',
        YOE: '',
        gender: 'Male'
                });
            }
            else {
                const result = response.data;
                setError(result.Error || "An Error has occured when adding Doctor records to the doctor table");
                setIsSubmitting(false);
            }
        }
        catch(err) {
            console.error("An error has occured in the doctors table:",err);
            setError("Error in adding to doctors table");
        }
        finally{
            setIsSubmitting(false);
        }
    };
    return (
        <div className="w-[70vw] p-10">
            <form className="space-y-2 m-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 w-[70vw]">
                    <div className=" flex flex-col w-[80%]">
                        <label htmlFor="name" className="p-2">Name</label>
                        <input type="text" value={doctorData.name} placeholder="Name" 
                        onChange={ (e) => setDoctorData({...doctorData,name: e.target.value})}
                        className="p-2"
                        />
                    </div>
                    <div className="flex flex-col w-[50%]">
                        <label className="p-2" htmlFor="password">Password</label>
                        <input type="password" 
                        value={doctorData.password}
                        placeholder="Password"
                        onChange={ (e) => setDoctorData({...doctorData,password: e.target.value})}
                        className="p-2"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 w-[70vw]">
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="YOE" className="p-2">Years Of Experience</label>
                        <input type="number" className="p-2"
                        value={doctorData.YOE}
                        placeholder="Years Of Experience"
                        onChange={ (e) => setDoctorData({...doctorData,YOE: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Expertise" className="p-2">Expertise</label>
                        <input type="text"
                        className="p-2"
                        value={doctorData.expertise}
                        placeholder="Expertise"
                        onChange={ (e) => setDoctorData({...doctorData,expertise: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="text" className="p-2">Gender</label>
                        <select name="gender" id="gender"
                        value={doctorData.gender}
                        className="p-2"
                        onChange={ (e) => setDoctorData({...doctorData,gender: e.target.value})}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Prefer Not to say">Prefer Not to say</option>
                        </select>
                    </div>

                </div>
                <div className="w-[70vw] m-auto flex items-center justify-center">
                    <button type="submit" disabled={isSubmitting}
                    className="bg-amber-300 text-blue-900 rounded-lg p-3"
                    >Add Doctor</button>
                </div>
            </form>
        </div>
    )
}

export default AddDoctors