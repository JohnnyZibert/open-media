import React, { CSSProperties, memo } from "react";
import cls from "./AudioTrack.module.css";
import { InputRange } from "../InputRange/InputRange";
import { SongInfo } from "../AudioPlayer/AudioPlayer";

export interface VolumeMusicProps {
  songInfo: SongInfo;
  dragHandler:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | undefined;
}

export const AudioTrack = memo((props: VolumeMusicProps) => {
  const { songInfo, dragHandler } = props;

  const animationTrack = {
    transform: `translateX(${songInfo.currentPercentage}%)`,
  };

  return (
    <InputRange
      styleForTrack={cls.track}
      currentValue={songInfo.currentTime}
      maxDuration={songInfo.duration}
      onChange={dragHandler}
      animationTrack={animationTrack}
      styleProgressBar={cls.progress}
      styleForInput={cls.input}
      type={"range"}
    />
  );
});
