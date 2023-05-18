import React, { ChangeEvent, CSSProperties, memo, RefObject } from "react";
import cls from "./InputRange.module.css";

export interface InputRangeProps {
  className?: string;
  styleForTrack?: string;
  styleForInput?: string;
  styleProgressBar?: string;
  maxDuration?: number;
  currentValue?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  animationTrack?: CSSProperties;
  style?: CSSProperties;
  id?: string;
  step?: number;
  ref?: RefObject<HTMLInputElement>;
}

export const InputRange = memo((props: InputRangeProps) => {
  const {
    className,
    id,
    currentValue,
    maxDuration,
    styleForInput,
    styleForTrack,
    styleProgressBar,
    animationTrack,
    style,
    step,
    ref,
    onChange,
  } = props;
  return (
    <div className={styleForTrack}>
      <input
        type="range"
        className={styleForInput}
        min={0}
        max={maxDuration}
        value={currentValue}
        onChange={onChange}
        style={style}
        id={id}
        step={step}
        ref={ref}
      />
      <div className={cls.progressBarWrapper}>
        <div className={styleProgressBar} style={animationTrack}></div>
      </div>
    </div>
  );
});
