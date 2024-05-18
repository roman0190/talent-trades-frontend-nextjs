"use client"
import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';

const signUpSchema = z.object({
  name: z.string().regex(/^[^\d]+$/, { message: 'Name field should not contain any numbers' }),
  email: z.string().email().max(30, { message: 'Email Address field must be at most 30 characters long' }),
  password: z.string().regex(/[#@\$&]/, { message: 'Password field must contain one of the special characters (@, #, $, or &)' }),
  date: z.string().date(),
  number: z.string().max(11).regex(/^[0-9]+$/, { message: 'Phone number field must contain only digits' }),
});

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [error,setError] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    date: '',
    number: '',
  });

  const handleSignUp = async () => {
    setErrors({
      name: '',
      email: '',
      password: '',
      date: '',
      number: '',
    });

    if (!name || !email || !password || !date || !number) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: !name ? 'Name field is required' : '',
        email: !email ? 'Email field is required' : '',
        password: !password ? 'Password field is required' : '',
        date: !date ? 'Date field is required' : '',
        number: !number ? 'Number field is required' : '',
      }));
      return;
    }

    try {
      const formData = { name, email, password, date, number };
      signUpSchema.parse(formData); 

      const response = await axios.post('http://localhost:4000/admin/register', formData);

      if (response.status === 201) {
        window.location.href = '/Auth/signIn';
      } else {
        setError('Sign up failed');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [err.path[0]]: err.message,
            }));
          }
        });
      } else {
        setError('Error during sign up');
      }
    }
  };
  return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-gray-400/25 p-8 rounded-lg shadow-xl"> 
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
          <div className="w-64">
          {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
           {errors.date && <p className="text-red-500 mt-1">{errors.date}</p>}
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {errors.number && <p className="text-red-500 mt-1">{errors.number}</p>}
            <input
              type="number"
              placeholder="Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSignUp}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <span>Already have an account? <a className="text-blue-600 underline" href="/Auth/signIn/">SignIn</a></span>
        </div>
      </div>
  );
}
