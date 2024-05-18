"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";

import GigCardsContainer from "../../components/GigCardsContainer";
import { getAllGigs } from "../../utils/getAllGigs";
import { getUserId } from "../../utils/manageAuth";

const DashboardPage = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [primaryGigs, setPrimaryGigs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const uid = getUserId();
        if (!uid) {
            return router.push("/seller");
        }
        setUserId(uid);
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await getAllGigs(uid);
                setPrimaryGigs(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="flex w-full h-full gap-10 flex-col">
            <button
                className="w-40 h-40 bg-gray-400 hover:bg-gray-500 flex flex-col justify-center items-center rounded-xl cursor-pointer  text-4xl"
                onClick={() => router.push("/seller/main/myGig/new")}
            >
                <p className="text-2xl">+</p>
                <p className="text-lg">Add Gig</p>
            </button>
            <hr className="w-full h-[1px] bg-gray-200" />

            {userId && primaryGigs ? (
                <GigCardsContainer
                    own
                    userId={userId}
                    isLoading={isLoading}
                    primaryGigs={primaryGigs}
                />
            ) : null}
        </div>
    );
};

export default DashboardPage;
