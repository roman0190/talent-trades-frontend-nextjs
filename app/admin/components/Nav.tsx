"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Nav() {
    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const handleLogout = () => {
        try {
            localStorage.removeItem('Token');
            window.location.href = '/Auth/signIn';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div>
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 ">
                            <Link href="/profile">
                                <span className="flex items-center">
                                    <img className="h-8 w-8 object-cover rounded-full" src={"http://localhost:4000/admin/profilePic/"+file} alt="Profile Picture" />
                                    <span className="ml-2 text-white">{name}</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="block md:hidden">
                        <button onClick={toggleMobileMenu} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                            Menu
                        </button>
                    </div>
                    {/* Desktop navigation */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link href="/Main/manage-admin">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Admin</span>
                            </Link>
                            <Link href="/Main/manage-users">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Users</span>
                            </Link>
                            <Link href="/Main/manage-announcement">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Announcements</span>
                            </Link>
                            <Link href="/Main/manage-gigs">
                                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Manage Gigs</span>
                            </Link>
                            <button 
                                onClick={handleLogout}
                            >
                                <span className="text-red-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile navigation menu */}
                <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/Main/manage-admin">
                            <div className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Manage Admin</div>
                        </Link>
                        <Link href="/manage-users">
                            <div className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Manage Users</div>
                        </Link>
                        <Link href="/Main/manage-announcement">
                            <div className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Manage Announcements</div>
                        </Link>
                        <Link href="/Main/manage-gigs">
                            <div className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Manage Gigs</div>
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="block text-red-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>  
    );
}

export default Nav;
