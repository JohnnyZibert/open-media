import React, { CSSProperties } from "react";
import cls from "./Input.module.css";
import {
  Controller,
  RefCallBack,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface InputProps {
  name?: string;
  rules?: RegisterOptions;
  type?: string;
  label?: string;
  className?: string | undefined;
  id?: string | undefined;
  style?: CSSProperties;
  placeholder?: string;
  error?: boolean;
  onClick?: () => void;
  ref?: RefCallBack;
  errorMessage?: string;
}

const Input = (props: InputProps) => {
  const control = useFormContext();
  const {
    name = "",
    placeholder = "",
    className,
    label,
    rules,
    errorMessage,
    ...otherProps
  } = props;

  return (
    <Controller
      control={control.control}
      name={name}
      rules={rules}
      defaultValue={""}
      render={({ field }) => (
        <input
          {...field}
          className={className}
          placeholder={placeholder}
          autoComplete="off"
          {...otherProps}
        />
      )}
    />
  );
};

export default Input;
