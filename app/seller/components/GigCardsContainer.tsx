"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { sellerUrl } from "../utils/constants";
import { getAllGigs } from "../utils/getAllGigs";
import { Gig } from "../utils/types";
import GigCard from "./GigCard";
import LoadingSpinner from "./LoadingSpinner";
interface GigCardsContainerProps {
    primaryGigs?: any[];
    userId?: string;
    isLoading?: boolean;
    own: boolean;
}
const GigCardsContainer = ({
    primaryGigs = [],
    userId,
    isLoading = false,
    own = false,
}: GigCardsContainerProps) => {
    const [gigsReloader, setGigsReloader] = useState(0);
    const reloadGigs = () => {
        setGigsReloader((prev) => prev + 1);
    };
    const [loading, setLoading] = useState(isLoading);
    const [gigs, setGigs] = useState<Gig[]>(primaryGigs);
    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const data = await getAllGigs(userId);
                setGigs(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getData();
    }, [userId, gigsReloader]);

    if (loading || isLoading)
        return (
            <div className="w-full h-full justify-center items-center flex">
                <LoadingSpinner size="large" />
            </div>
        );
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">
            {gigs.map((gig, index) => (
                <GigCard
                    key={JSON.stringify(gig.id) + index}
                    title={gig.title}
                    description={gig.description}
                    price={gig.price}
                    gigImage={gig.gigImage}
                    gigThumbnail={gig.gigThumbnail}
                    id={gig.id}
                    own={own}
                    reloadGigs={reloadGigs}
                />
            ))}
        </div>
    );
};

export default GigCardsContainer;
