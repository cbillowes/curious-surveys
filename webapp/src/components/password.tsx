import React from "react";
import { PasswordProps } from "@/components/types";
import { TextBox } from "@/components/textbox";

export const Password = ({
  name,
  label,
  placeholder,
  isDisabled,
  revealPassword,
  state,
  message,
}: PasswordProps) => {
  return (
    <TextBox
      name={name}
      label={label}
      placeholder={placeholder}
      isDisabled={isDisabled}
      state={state}
      message={message}
    />
  );
};
