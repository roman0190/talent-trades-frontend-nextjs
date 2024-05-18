import axios from "axios";
import { validateHeaderName } from "http";
import React, { useEffect, useState } from "react";
import { sellerUrl } from "../utils/constants";
import { getUserId, getUserToken } from "../utils/manageAuth";
import { User } from "../utils/types";
import { validateEmail, validateUsername } from "../utils/validations";
interface SingleUserProfileUpdateFormProps {
    userData: User;
    own?: boolean;
    userUpdated: () => void;
}
const SingleUserProfileUpdateForm = ({
    userData,
    own,
    userUpdated,
}: SingleUserProfileUpdateFormProps) => {
    useEffect(() => {
        setUsername(userData.username);
        setEmail(userData.email);
    }, [userData]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const updateData = async () => {
        setErrors([]);
        const usernameErrors = validateUsername(username);
        const emailErrors = validateEmail(email);
        console.log(usernameErrors, emailErrors);
        if (usernameErrors.length > 0 || emailErrors.length > 0) {
            setErrors([...usernameErrors, ...emailErrors]);
            return;
        }
        try {
            setLoading(true);
            const userId = getUserId();
            const accessToken = getUserToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            const reqBody = { username, email };
            const res = await axios.patch(
                `${sellerUrl}/update`,
                reqBody,
                config
            );
            const data = res.data;
            if (data.error) {
                console.log(data.error);
                setLoading(false);
            } else {
                userUpdated();
                alert("Updated");
                setLoading(false);
            }
        } catch (error: any) {
            const errorResponse = error?.response;

            if (errorResponse) {
                const errorMessages = errorResponse?.data?.message;

                console.log(errorMessages);
            } else {
                console.error(error);
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <p className="text-lg font-bold flex gap-5 items-center">
                <span className="w-32"> Username:</span>

                {own ? (
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-md w-full max-w-xs"
                    />
                ) : (
                    <span> {userData.username} </span>
                )}
            </p>
            <p className="text-lg font-bold flex gap-5 items-center">
                <span className="w-32"> Email:</span>
                {own ? (
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-md w-full max-w-xs"
                    />
                ) : (
                    <span> {userData.email} </span>
                )}
            </p>
            <p className="text-lg font-bold flex gap-5 items-center">
                <span className="w-32"> Joined:</span>
                {own ? (
                    <input
                        value={userData.joinDate}
                        disabled
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-md w-full max-w-xs"
                    />
                ) : (
                    <span> {userData.joinDate} </span>
                )}
            </p>
            {errors.map((error, index) => (
                <p className="text-red-600" key={error + index}>
                    {error}
                </p>
            ))}
            {own && (
                <button
                    onClick={updateData}
                    className="btn btn-neutral w-full max-w-xs"
                    disabled={loading}
                >
                    Update
                </button>
            )}
        </div>
    );
};

export default SingleUserProfileUpdateForm;
