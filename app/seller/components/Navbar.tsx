"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { logoutUser } from "../utils/manageAuth";

const Navbar = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        setUserId(userId);
    }, []);
    const handleLoginLogout = () => {
        if (userId) {
            logoutUser();
            router.push("/seller/home");
        } else {
            router.push("/seller/auth/login");
        }
    };
    return (
        <div className="w-full navbar bg-gray-700">
            <div className="flex-none lg:hidden">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
            <div className="flex-1 px-2 mx-2">Talent Tradez</div>
            <div className="flex-none  lg:block">
                <ul className="menu menu-horizontal">
                    {/* Navbar menu content here */}
                    {userId && (
                        <li>
                            <Link href={`/seller/main/profile/${userId}`}>
                                Profile
                            </Link>
                        </li>
                    )}
                    <li>
                        <a className="" onClick={handleLoginLogout}>
                            {userId ? "Logout" : "Login"}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
