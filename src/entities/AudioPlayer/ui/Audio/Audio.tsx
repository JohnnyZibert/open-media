import React, { ChangeEvent, memo, RefObject } from "react";
import { SongInfo } from "../../model/types/songInfo";

export interface AudioProps {
  songInfo: SongInfo;
  setSongInfo: (value: SongInfo) => void;
  currentSong?: string;
  audioRef: RefObject<any>;
}

export const Audio = memo((props: AudioProps) => {
  const { setSongInfo, songInfo, currentSong, audioRef } = props;

  const timeUpdateHandler = (e: ChangeEvent<HTMLAudioElement>) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      currentPercentage: animationPercentage,
    });
  };

  return (
    <div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        src={currentSong}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
      ></audio>
    </div>
  );
});
