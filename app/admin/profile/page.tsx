"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Session from "../components/session";
import Link from "next/link";

export default function Profile() {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    async function fetchAdminInfo() {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.get('http://localhost:4000/admin/view-profile/own', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminInfo(response.data);
        localStorage.setItem('name',response.data.name);
        localStorage.setItem('file',response.data.path);
        console.log(response.data)

      } catch (error) {
        console.error('Error fetching admin info:', error);
      }
    }

    fetchAdminInfo();
  }, []);

  return (
    <>
    <Session>
      
        <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Admin Profile</h1>
        {adminInfo && (
          <div className='bg-green-200 p-8 rounded-lg shadow-md'>
            <img
                src={"http://localhost:4000/admin/profilePic/" + adminInfo.path}
                alt="Image Not Uploaded yet"
                className="mt-4 w-24 h-24 rounded-full "
              />
            <p className="text-lg font-semibold">Name:{adminInfo.name}</p>
            <p className="text-gray-600 mb-2">Email: {adminInfo.email}</p>
            <p className="text-gray-600">Role: {adminInfo.role}</p>
          </div>
        )}
        <div className="mt-4">
            <Link href="Main/dashboard">
              <div className="text-blue-500 hover:text-blue-700">Back to Dashboard</div>
            </Link>
          </div>
      </div>
    </Session>
    </>
  );
}
