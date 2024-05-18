import React from "react";

interface AuthFormProps {
    login?: boolean;
    children: React.ReactNode;
    onSubmit: (e: any) => void;
}
const AuthForm = ({ login, children, onSubmit }: AuthFormProps) => {
    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {login
                    ? `Log in to your account`
                    : "Register for new seller account"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                {children}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {login
                        ? " Don’t have an account yet? "
                        : "Already have an account? "}
                    <a
                        href={login ? "./register" : "./login"}
                        className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                    >
                        {login ? "Register" : "Login"}
                    </a>
                </p>
            </form>
        </>
    );
};

export default AuthForm;
