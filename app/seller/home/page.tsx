"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
import GigCardsContainer from "../components/GigCardsContainer";
import { getAllGigs } from "../utils/getAllGigs";
import { getUserId } from "../utils/manageAuth";

const HomePage = () => {
    const router = useRouter();

    const [primaryGigs, setPrimaryGigs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await getAllGigs();
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
            <h1 className="text-lg">Find your desired service</h1>
            <hr className="w-full h-[1px] bg-gray-200" />

            {primaryGigs ? (
                <GigCardsContainer
                    own={false}
                    isLoading={isLoading}
                    primaryGigs={primaryGigs}
                />
            ) : null}
        </div>
    );
};

export default HomePage;
