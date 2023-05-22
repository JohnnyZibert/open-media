import React from "react";
import { InputRange } from "../../../shared/ui/InputRange/InputRange";
import { SongInfo } from "features/AudioPlayer";
import cls from "./AudioTrack.module.css";

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
