"use client";
import LoadingSpinner from "@/app/seller/components/LoadingSpinner";
import { User } from "@/app/seller/utils/types";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
import { sellerUrl } from "../utils/constants";
import { getUserId } from "../utils/manageAuth";
import Button from "./Button";
import ImageInput from "./ImageInput";
import SingleUserProfileUpdateForm from "./SingleUserProfileUpdateForm";
interface SingleUserProfileProps {
    userId: string;
}
const SingleUserProfile = ({ userId }: SingleUserProfileProps) => {
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState<File>();
    const [userReloadCount, setUserReloadCount] = useState(0);
    const userUpdated = () => {
        setUserReloadCount((prev) => prev + 1);
    };
    const [myId, setMyId] = useState<string | null>("");
    useEffect(() => {
        setMyId(getUserId());
        const getUserData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${sellerUrl}/${userId}`);
                const data = res.data;
                if (data.error) {
                    console.log(data.error);
                    setLoading(false);
                } else {
                    setUserData(data);
                    setLoading(false);
                }
            } catch (error: any) {
                const errorResponse = error?.response;
                setLoading(false);
                if (errorResponse) {
                    const errorMessages = errorResponse?.data?.message;

                    console.log(errorMessages);
                } else {
                    console.error(error);
                }
            }
        };
        getUserData();
    }, [userId, userReloadCount]);
    if (loading || !userData)
        return (
            <div className="h-full w-full flex justify-center items-center">
                <LoadingSpinner size="large" />
            </div>
        );
    return (
        <div className="flex flex-col gap-10">
            <div
                className="flex justify-center items-center bg-gray-500 rounded-lg w-36 h-36 "
                onClick={() => alert("click")}
            >
                {image || userData.pfp ? (
                    <img
                        src={
                            image
                                ? URL.createObjectURL(image)
                                : `${sellerUrl}/getimage/${userData.pfp}`
                        }
                    />
                ) : (
                    "No image"
                )}
            </div>
            {myId && myId === userId && (
                <ImageInput
                    image={image}
                    setImage={setImage}
                    userUpdated={userUpdated}
                />
            )}

            <SingleUserProfileUpdateForm
                userUpdated={userUpdated}
                userData={userData}
                own={myId && myId === userId ? true : false}
            />
        </div>
    );
};

export default SingleUserProfile;
