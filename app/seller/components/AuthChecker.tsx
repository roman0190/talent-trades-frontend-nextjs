"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { getUserToken } from "../utils/manageAuth";

const AuthChecker = () => {
    const router = useRouter();
    useEffect(() => {
        const userToken = getUserToken();
        if (!userToken) {
            router.push("/seller/");
        }
    });
    return <></>;
};

export default AuthChecker;
