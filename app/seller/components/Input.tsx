import React, {
    ChangeEventHandler,
    Dispatch,
    InputHTMLAttributes,
    SetStateAction,
} from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;

    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}
const Input = ({ label, value, setValue, ...props }: InputProps) => {
    return (
        <div>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>
            )}
            <input
                {...props}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default Input;
