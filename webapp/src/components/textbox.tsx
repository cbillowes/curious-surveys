import { FocusEvent } from "react";
import { twMerge } from "tailwind-merge";
import { TextBoxProps } from "@/components/types";

export const TextBox = ({
  name,
  label,
  placeholder,
  isDisabled,
  isErrored,
  isSuccess,
  message,
  prefix,
  suffix,
  type = "text",
  onChange,
  onBlur,
  ...rest
}: TextBoxProps) => {
  console.log(rest);
  return (
    <div className="mb-4 relative">
      <label
        htmlFor={name}
        className={twMerge(
          "absolute block mb-2 text-sm text-gray-800 dark:text-gray-200 my-2 mx-3",
          isSuccess && "text-green-700 dark:text-green-500",
          isErrored && "text-red-700 dark:text-red-500"
        )}
      >
        {label}
      </label>
      <input
        {...rest}
        id={name}
        name={name}
        type={type}
        className={twMerge(
          "w-full pb-2 pt-7 text-lg rounded-lg block",
          "bg-gray-50 border border-gray-300 text-gray-900",
          "focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          isSuccess &&
            "border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500",
          isErrored &&
            "border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500",
          isDisabled && "cursor-not-allowed"
        )}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        onBlur={(e: FocusEvent<HTMLInputElement>) => onBlur?.(e)}
      />
      <p
        className={twMerge(
          "mt-2 text-sm ",
          isSuccess && "text-green-600 dark:text-green-500",
          isErrored && "text-red-600 dark:text-red-500"
        )}
      >
        {message}
      </p>
    </div>
  );
};
