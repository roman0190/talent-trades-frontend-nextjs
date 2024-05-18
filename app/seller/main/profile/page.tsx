"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) router.back();
    }, []);
    return <div></div>;
};

export default page;
