"use client"

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
 
interface User {

    name: string;
    phone: string;
  

}
 
export default function UpdateProfile() {

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [NumberInput, setNumberInput] = useState('');

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
 
    useEffect(() => {

        const fetchUserData = async () => {

            try {

                if (token) {

                    const response = await axios.get('http://localhost:8000/buyer/show_profile/'+email, {

                        headers: {

                            Authorization: `Bearer ${token}`,

                        },

                    });

                    setUser(response.data);

                    setNameInput(response.data.name);
                    setEmailInput(response.data.email);
                    setNumberInput(response.data.number);

                } else {

                    router.push('/signin');

                }

            } catch (error) {

                console.error('Error fetching user data:', error);

                router.push('/signin');

            }

        };
 
        fetchUserData();

    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     //const validationErrors = validateForm(formData);

     //if (Object.keys(validationErrors).length === 0) {
        try {
            const formDataObject = new FormData();
            formDataObject.append('name', nameInput);
            formDataObject.append('email', emailInput);
            formDataObject.append('number', NumberInput);
        // if (formData.myfile) {
        //   formDataObject.append('profilePic', formData.myfile);
        // }
        //console.log(formDataObject);
        //console.log(formData);
            const response = await axios.put('http://localhost:3001/seller/update_profile/' + username, formDataObject, {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });
        
            toast.success('Signup successful!');
            router.push('/Sales_Representatives/sign_in');
     
        } catch (error) {
           console.error('Error during signup:', error);
           toast.error('Signup failed. Please try again.');
        }
    // } else {
    //   //setErrors(validationErrors);
    // }
    }
 
    const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setNameInput(e.target.value);
    }

    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    }

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumberInput(e.target.value);

    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    }
 
    return (

        <>

            {/* <div className="card w-96 bg-base-100 shadow-xl">

                <figure className="px-10 pt-10">

                    <img src={'http://localhost:3008/warehouse/getimage/' + user.filename} alt="Shoes" className="rounded-xl" />

                </figure>

                <div className="card-body items-center text-center">

                    <h2 className="card-title">ID: {user.warehouseId}</h2>

                    Name: {user.name} <br />

                    UserName: {user.username} <br />

                    email: {user.email} <br />

                    Address: {user.address} <br />

                    <input type="text" value={emailInput} onChange={handleEmailChange} />

                    <div className="card-actions">

                        <button className="btn btn-primary">Update</button>

                    </div>

                </div>

            </div> */}

    <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <h1 className="">Sign up</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                 <input type="text" id="name" name="name" value={nameInput} onChange={handleNameInputChange} className="input input-bordered" placeholder="name" />
                 {/* {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>} */}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <input type="text" id="email"
                    name="email"
                    value={emailInput}
                    onChange={handleEmailInputChange} className="input input-bordered" placeholder="Email" />
                {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="number" id="number"
                    name="number"
                    value={NumberInput}
                    onChange={handleNumberInputChange} className="input input-bordered" placeholder="Phone Number" />
                {/* {errors.number && <p className="text-red-500 text-xs italic">{errors.number}</p>} */}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="position"
                    name="position"
                    value={user?.position}
                    className="input input-bordered" placeholder="Position" />
                {/* {errors.position && <p className="text-red-500 text-xs italic">{errors.position}</p>} */}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="username"
                    name="username"
                    value={user?.username}
                    className="input input-bordered" placeholder="Username" />
                {/* {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>} */}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="file" id="myfile"
                    name="myfile"
                    onChange={handleFileInputChange} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="btn btn-active"
                >
                    Sign Up
                </button>
            </div>
        </form>
    </div>

        </>

    );

}