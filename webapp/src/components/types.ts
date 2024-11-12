import { ReactNode } from "react";

export interface TextBoxProps {
  name: string;
  label: string;
  isDisabled?: boolean;
  isErrored?: boolean;
  isSuccess?: boolean;
  ref?: (e: HTMLInputElement) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  message?: string;
  placeholder?: string;
  type?: "text" | "tel" | "email" | "number" | "password";
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export interface PasswordProps extends TextBoxProps {
  revealPassword: boolean;
}

export interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  theme: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  onClick?: () => void;
}
