import React, { memo } from "react";
import { InputRange } from "shared/ui/InputRange/InputRange";
import cls from "./VolumeMusic.module.css";

export interface VolumeMusicProps {
  volume: number;
  volumeHandler:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
  rangeVolume: number;
}

export const VolumeMusic = memo((props: VolumeMusicProps) => {
  const { volume, volumeHandler, rangeVolume } = props;

  const animationVolume = {
    transform: `translateX(${rangeVolume * 100}%)`,
  };
  return (
    <InputRange
      styleForTrack={cls.trackVolume}
      currentValue={volume}
      maxDuration={1}
      step={0.01}
      animationTrack={animationVolume}
      styleProgressBar={cls.progressVolume}
      styleForInput={cls.input}
      onChange={volumeHandler}
      id={"volume"}
      type={"range"}
    />
  );
});
