import React, { CSSProperties, memo } from "react";
import {
  Controller,
  RefCallBack,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import errorIcon from "../../assets/img/attention.svg";
import cls from "./Input.module.css";

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
  errorIconStyle?: string;
}

const Input = memo((props: InputProps) => {
  const control = useFormContext();
  const {
    name = "",
    placeholder = "",
    className,
    label,
    rules,
    errorIconStyle,
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
        <div className={cls.wrapperInput}>
          <input
            {...field}
            className={className}
            placeholder={placeholder}
            autoComplete="off"
            {...otherProps}
          />
          {errorMessage && (
            <img src={errorIcon} className={errorIconStyle} alt="error" />
          )}
        </div>
      )}
    />
  );
});

export default Input;
