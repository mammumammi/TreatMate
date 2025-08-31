'use client';

import api from "@/services/api";
import { FormEvent, useState } from "react";

interface AddPatientsProps {
    onPatientAdded: () => void;
}

const AddPatients = ({onPatientAdded}: AddPatientsProps) => {
    const [patientData,setPatientData] = useState({
        name: '',
        password: '',
        gender: 'Male',
        disease: '',
        severity: 'Mild',
        phone: 0,
        DOB: ''
    });

    const [error,setError] = useState('');
    const [isSubmitting,setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try{
            const response = await api.post('/patients',patientData);

            if (response.status === 201){
                alert('Patient Registered Successfully');
                setPatientData({
                    name: '',
        password: '',
        gender: 'Male',
        disease: '',
        severity: 'Mild',
        phone: 0,
        DOB: ''
                });
                onPatientAdded();
            }
            else{
                const result = response.data;
                setError( result.Error ||'AN Error has occured when adding a patients data');
            }
        }
        catch (err) {
            console.error('An error has occured in patient addition:',err);
            setError("An error has occured in adding patients");
        }
        finally{
            setIsSubmitting(false);
        }
    };
    return(
        <div>
            <h1>Patient Registration</h1>
            <form onSubmit={handleSubmit} className=" w-[70vw] m-auto  space-y-4 ">
                <div className="grid grid-cols-2">
                    <div className="flex flex-col space-y-0">
                    <label className="p-1.5" htmlFor="Name">Name</label>
                    <input type="text" placeholder="Name"
                    
                    value={patientData.name}
                    onChange={(e) => setPatientData({...patientData,name: e.target.value})}
                    required
                    className="w-1/2 border-2 rounded-md p-1.5"
                    />
                    </div> 
                    <div className="flex flex-col">
                    <label htmlFor="password" className="p-1.5">Password</label>
                    <input type="password" 
                    placeholder="password"
                    value={patientData.password}
                    onChange={ (e) => setPatientData({...patientData,password: e.target.value})}
                    required
                    className="w-1/2 p-1.5 border-2 rounded-md "
                    />
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="Gender" className="p-1.5">
                            Gender
                        </label>
                        <select name="gender" id="gender" className="p-1.5" value={patientData.gender}
                        onChange={ (e) => setPatientData({...patientData,gender: e.target.value})}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Prefers Not to Say">Prefers not to say</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label className="p-1.5" htmlFor="DOB">Date Of Birth</label>
                        <input type="date" id="dob" name='DOB' className="p-1.5"
                        value={patientData.DOB}
                        onChange={ (e) => setPatientData({...patientData,DOB: e.target.value})}
                        />
                    </div>
                
                    <div  className="flex flex-col">
                        <label htmlFor="phone" className="p-1.5">Phone Number</label>
                        <input type="number" name="phone" id="phone" value={patientData.phone}
                        onChange={ (e) => setPatientData({...patientData,phone: Number(e.target.value)})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col">
                        <label className="p-1.5" htmlFor="disease">Disease</label>
                        <input type="text" name="disease" id="disease" 
                        placeholder="disease"
                        className="p-1.5"
                        value={patientData.disease}
                        onChange={ (e) => setPatientData({...patientData,disease: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="severity" className="p-1.5">severity</label>
                        <input type="text" placeholder="severity"
                        value={patientData.severity}
                        onChange={ (e) => setPatientData({...patientData,severity: e.target.value})}
                        />
                    </div>
                </div>
                <div className="w-[60vw] m-auto flex items-center justify-center">

                <button className="bg-amber-300 text-blue-900 rounded-lg p-3"
                type="submit"
                disabled={isSubmitting}
                >Add Patient</button>
                </div>
            </form>
        </div>
    )

}

export default AddPatients;