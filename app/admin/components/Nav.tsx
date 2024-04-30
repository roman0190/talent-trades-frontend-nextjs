"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Searchbar from './searchbar';

function Navbar() {
    const [name, setName] = useState('');
    const [file, setFile] = useState('');

    useEffect(() => {
        const storedFile = localStorage.getItem('file');
        if (storedFile ) {
            setFile(storedFile);
        }
        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        } else {
            window.location.href = '/Auth/signIn';
        }
    }, []);


    return (
        <nav className="bg-gray-800">
            <div>
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/profile">
                                <span className="flex items-center">
                                    <img className="h-8 w-8 rounded-full" src={"http://localhost:4000/admin/profilePic/"+file} alt="Profile Picture" />
                                    <span className="ml-2 text-white">{name}</span>
                                </span>
                            </Link>
                        </div>
                        <Searchbar />
                    </div>
                   
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link href="/Main/manage-admin">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Admin</span>
                            </Link>
                            <Link href="/manage-users">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Users</span>
                            </Link>
                            <Link href="/manage-announcements">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Announcements</span>
                            </Link>
                            <Link href="/manage-gigs">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Gigs</span>
                            </Link>
                            <Link href="/manage-gigs">
                                <span className="text-red-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Sign Out</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>  
    );
}

export default Navbar;
