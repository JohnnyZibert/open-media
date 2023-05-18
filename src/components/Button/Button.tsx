import classnames from "classnames";
import { memo, ReactNode } from "react";
import cls from "./Button.module.css";

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disable?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const { children, onClick, disable, className } = props;
  return (
    <button
      className={classnames(cls.button, className)}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
});
