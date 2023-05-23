import React from "react";
import cls from "./AudioTrack.module.css";
import { SongInfo } from "../../model/types/songInfo";
import { InputRange } from "shared/ui/InputRange/InputRange";

export interface VolumeMusicProps {
  songInfo: SongInfo;
  dragHandler:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

export const AudioTrack = (props: VolumeMusicProps) => {
  const { songInfo, dragHandler } = props;

  const animationTrack = {
    transform: `translateX(${songInfo.currentPercentage}%)`,
  };

  const currentTime =
    songInfo.currentPercentage === 0 ? 0 : songInfo.currentTime;

  return (
    <InputRange
      styleForTrack={cls.track}
      currentValue={currentTime}
      maxDuration={songInfo.duration}
      onChange={dragHandler}
      animationTrack={animationTrack}
      styleProgressBar={cls.progress}
      styleForInput={cls.input}
      type={"range"}
    />
  );
};
