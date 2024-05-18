"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
    const pathname = usePathname();
    console.log(pathname);
    return (
        <div className="drawer-side">
            <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>
            <ul className="menu pt-20 gap-5 p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                    <Link
                        href={"/seller/main/dashboard"}
                        className={
                            pathname === "/seller/main/dashboard"
                                ? "active"
                                : ""
                        }
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/seller/main/portfolio"}
                        className={
                            pathname === "/seller/main/portfolio"
                                ? "active"
                                : ""
                        }
                    >
                        Portfolio
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
