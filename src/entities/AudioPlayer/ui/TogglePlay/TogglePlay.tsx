import React, { memo, MutableRefObject, useCallback } from "react";
import pauseButton from "shared/assets/img/pause.svg";
import playButton from "shared/assets/img/play.svg";
import { ImgButton } from "shared/ui/ImgButton/ImgButton";

export interface TogglePlayProps {
  className?: string;
  isPlaying?: boolean;
  audioRef: MutableRefObject<any>;
  checkAudioRef?: boolean;
  setIsPlaying?: (value: boolean) => void;
}

export const TogglePlay = memo((props: TogglePlayProps) => {
  const { isPlaying, audioRef, setIsPlaying, checkAudioRef } = props;

  const audioClick = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying?.(!isPlaying);
    } else {
      audioRef.current?.play();
      setIsPlaying?.(!isPlaying);
    }
  }, [audioRef, isPlaying, setIsPlaying]);

  return (
    <>
      {isPlaying ? (
        <ImgButton
          onClick={audioClick}
          disable={!checkAudioRef}
          img={pauseButton}
          alt="pause"
        />
      ) : (
        <ImgButton
          onClick={audioClick}
          disable={!checkAudioRef}
          img={playButton}
          alt="play"
        />
      )}
    </>
  );
});
