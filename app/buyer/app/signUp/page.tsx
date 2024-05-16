// // import React from 'react'

// // export default function page() {
// //   return (
// //     <div>
// //         <div>
// //           <br>
// //           </br>
// //       <h1>Sign Up</h1>
// //       <input type="text" placeholder="Username" />
// //       <br />
// //       <input type="email" placeholder="Email" />
// //       <br />
// //       <input type="password" placeholder="Password" />
// //       <br />
// //       <input type="number" placeholder="Phn" />
// //       <br />
// //       <input type="text" placeholder="gender" />
// //       <br />
// //       <button>Sign Up</button>
// //       <br>
// //       </br>
// //       <br>
// //       </br>
// //     </div>
// //     </div>
// //   )
// // }

// "use client"
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function SignUp() {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [gender, setGender] = useState('');
//   const [phone, setPhoneNumber] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/auth/register', {
//         name,
//         email,
//         password,
//         gender,
//         phone,
//       });

//       if (response.status === 201) {
//         window.location.href = '/signIn';
//       } else {
//         setError('Sign up failed');
//       }
//     } catch (error) {
//       setError('Error during sign up');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-3xl font-semibold mb-6">Sign Up</h1>
//       <div className="w-64">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500"
//         />
//         <input
//           type="gender"
//           placeholder="Gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500"
//         />
//         <input
//           type="phone"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:border-blue-500"
//         />
//         <button
//           onClick={handleSignUp}
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//         >
//           Sign Up
//         </button>
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//       </div>
//     </div>
//   );
// }

"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/auth/register', formData);
        
        toast.success('Signup successful!');
        router.push('/signin');
     
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required (/^(?=.*[A-Z]).*$/) ' ;
    }

    if (!formData.gender) {
      errors.gender = 'Gender is required male/female';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 ">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-green shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
        </div>
        {/* <div className="mb-6">
          <label htmlFor="myfile" className="block text-gray-700 font-bold mb-2">
            File Upload
          </label>
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};


