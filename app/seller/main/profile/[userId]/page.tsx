"use client";
import LoadingSpinner from "@/app/seller/components/LoadingSpinner";
import SingleUserProfile from "@/app/seller/components/SingleUserProfile";

import { User } from "@/app/seller/utils/types";
import axios from "axios";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
interface ProfilePageProps {}
const ProfilePage = ({}: ProfilePageProps) => {
    const params = useParams();
    const userId = params.userId as string;
    return <SingleUserProfile userId={userId} />;
};

export default ProfilePage;
