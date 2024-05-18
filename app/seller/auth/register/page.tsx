"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { sellerUrl } from "../../utils/constants";
import { loginUser } from "../../utils/manageAuth";
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from "../../utils/validations";

const SellerRegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onSubmit = (e: any) => {
        e.preventDefault();
        setErrors([]);
        let currentErrors: string[] = [];
        const emailError = validateEmail(email);
        const usernameErrors = validateUsername(username);

        const passwordError = validatePassword(password);
        currentErrors = currentErrors.concat(passwordError, usernameErrors);
        // if (currentErrors.length > 0) {
        //     setErrors(currentErrors);
        //     return;
        // }
        handleRegister();
    };
    const handleRegister = async () => {
        setLoading(true);
        try {
            const reqBody = {
                email: email,
                username: username,
                password: password,
            };
            const res = await axios.post(`${sellerUrl}/register`, reqBody);
            const data = res.data;
            if (data.error) {
                setErrors([data.message]);
            } else {
                const { access_token } = data;
                loginUser(data);
                router.push("/seller/main/dashboard");
            }
            setLoading(false);
        } catch (error: any) {
            const errorResponse = error?.response;

            if (errorResponse) {
                const errorMessages = errorResponse?.data?.message;
                if (typeof errorMessages === "string") {
                    setErrors([errorMessages]);
                } else {
                    setErrors(errorMessages);
                }
            } else {
                console.error(error);
            }
            setLoading(false);
        }
    };
    return (
        <AuthForm onSubmit={onSubmit}>
            <Input
                label="Email"
                type="email"
                value={email}
                setValue={setEmail}
            />
            <Input
                label="Username"
                type="text"
                value={username}
                setValue={setUsername}
            />
            <Input
                label="Password"
                type="password"
                value={password}
                setValue={setPassword}
            />

            <Button type="submit" loading={loading}>
                Register
            </Button>
            {errors.map((error, index) => (
                <p className="text-red-600" key={error + index}>
                    {error}
                </p>
            ))}
        </AuthForm>
    );
};

export default SellerRegisterPage;
