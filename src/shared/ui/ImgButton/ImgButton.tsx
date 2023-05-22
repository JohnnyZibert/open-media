import React, { memo } from "react";
import { Button } from "../Button/Button";

export interface ImgButtonProps {
  className?: string;
  img: string;
  onClick?: () => void;
  disable?: boolean;
  alt: string;
  type?: "button" | "submit" | "reset" | undefined;
}

export const ImgButton = memo((props: ImgButtonProps) => {
  const { onClick, img, disable, alt, className, type } = props;
  return (
    <Button
      onClick={onClick}
      disable={disable}
      className={className}
      type={type}
    >
      <img src={img} alt={alt} />
    </Button>
  );
});
