import React from "react";
import { PasswordProps } from "@/components/types";
import { TextBox } from "@/components/textbox";

export const Password = ({ revealPassword, ...rest }: PasswordProps) => {
  return <TextBox {...rest} type="password" />;
};
