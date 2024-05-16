// // // import React from 'react'

// // // export default function () {
// // //   return (
// // //     <div className=''>
// // //       <h1>Sign In</h1>
// // //       <input type="email" placeholder="Email" />
// // //       <br />
// // //       <input type="password" placeholder="Password" />
// // //       <br />
// // //       <button >Sign In</button>
      
// // //     </div>
// // //   )
// // // }

// "use client"
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignIn = async () => {
//     if (!email || !password) {
//       setError('Email and password are required');
//       return;
//     }
//     try {
//       const response = await axios.post('http://localhost:8000/auth/login', {
//         email,
//         password,
//       });
      
//       const  token = response.data;
//       console.log(token.accessToken);
//       if (token) {
//         localStorage.setItem('accessToken', token);
//         window.location.href = '/dashboard'; 
//       } else {
//         setError('Login failed');
//       }
//     } catch (error) {
//       setError('Invalid User');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen" >
//       <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
//       <div className="w-64">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//         />
//         <button
//           onClick={handleSignIn}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//         >
//           Sign In
//         </button>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//     </div>
//   );
// }


"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/login', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true });
      console.log(response.data);

      const  token  = response.data;
      console.log(token.access_token);
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('email', formData.email);

      toast.success('Sign in successful');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md w-full space-y-8">
        <div>
        <Toaster />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="text" autoComplete="email"  className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Email address" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password"  className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}