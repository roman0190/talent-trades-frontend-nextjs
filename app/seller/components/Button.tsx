import React, { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "./LoadingSpinner";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}
const Button = ({ loading, ...props }: ButtonProps) => {
    return (
        <button
            className={`w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 flex justify-center items-center gap-2 ${
                loading ? "pl-12" : ""
            } ${props.className}`}
            disabled={props.disabled || loading}
            {...props}
        >
            {props.children}
            {loading && <LoadingSpinner size="small" />}
        </button>
    );
};

export default Button;
