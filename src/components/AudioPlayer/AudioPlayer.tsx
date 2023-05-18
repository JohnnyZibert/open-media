import React, {
  ChangeEvent,
  Dispatch,
  RefObject,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import playButton from "../../assets/img/Play.svg";
import pauseButton from "../../assets/img/Pause.svg";
import goBack from "../../assets/img/lable.svg";
import { Button } from "../Button/Button";
import { InputRange } from "../InputRange/InputRange";
import cls from "./AudioPlayer.module.css";

interface IProps {
  isPlaying: boolean;
  setIsPlaying: Dispatch<boolean>;
  audioRef: RefObject<HTMLAudioElement>;
  currentSong?: string;
  setToPlayerAndBack?: (value: number) => void;
  toPlayerAndBack: number;
}

interface IVolume {
  currentVolume: number;
  currentPercentage: number;
}

export const Player = (props: IProps) => {
  const {
    isPlaying,
    setIsPlaying,
    audioRef,
    currentSong,
    setToPlayerAndBack,
    toPlayerAndBack,
  } = props;

  const checkAudioRef = audioRef.current !== null;

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    currentPercentage: 0,
    volumeMusic: audioRef.current?.volume,
  });
  const [valueVolume, setValueVolume] = useState<IVolume>({
    currentVolume: 0,
    currentPercentage: 0,
  });

  useEffect(() => {
    if (checkAudioRef) {
      const duration = 1.0;
      const animationPercentage =
        Number(audioRef.current?.volume * 0.5) / duration;
      setValueVolume({
        ...valueVolume,
        currentVolume: audioRef.current?.volume * 0.5,
        currentPercentage: animationPercentage,
      });
    }
  }, [checkAudioRef]);

  const audioClick = () => {
    if (isPlaying) {
      checkAudioRef && audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      checkAudioRef && audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
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

  const getTime = (time: number) => {
    return time
      ? Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      : "0:00";
  };

  const dragHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkAudioRef) {
      audioRef.current.currentTime = Number(e.target.value);
    }

    setSongInfo({ ...songInfo, currentTime: Number(e.target.value) });
  };

  const volumeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkAudioRef && currentSong) {
      const current = e.target.value;
      const duration = 1.0;
      const animationPercentage = Number(current) / duration;

      setValueVolume({
        ...valueVolume,
        currentVolume: Number(current),
        currentPercentage: animationPercentage,
      });

      audioRef.current.volume = Number(current);
    }
  };
  const animationTrack = {
    transform: `translateX(${songInfo.currentPercentage}%)`,
  };
  const animationVolume = {
    transform: `translateX(${valueVolume.currentPercentage * 100}%)`,
  };
  return (
    <>
      <Button
        className={cls.back}
        onClick={() => setToPlayerAndBack?.(toPlayerAndBack - 1)}
      >
        <img src={goBack} alt="play-button" />
      </Button>
      <div className={cls.containerPlayer}>
        {isPlaying ? (
          <Button onClick={audioClick}>
            <img src={pauseButton} alt="play-button" />
          </Button>
        ) : (
          <Button onClick={audioClick} disable={!checkAudioRef}>
            <img src={playButton} alt="play-button" />
          </Button>
        )}
        <div className="time-control">
          <InputRange
            styleForTrack={cls.track}
            currentValue={songInfo.currentTime}
            maxDuration={songInfo.duration}
            onChange={dragHandler}
            animationTrack={animationTrack}
            styleProgressBar={cls.progress}
            styleForInput={cls.input}
          />
        </div>
        <div className={cls.playerFooter}>
          <p className={cls.timeMusic}>
            {getTime(
              songInfo.currentTime ? songInfo.currentTime : Number("0:00")
            )}
          </p>
          <InputRange
            styleForTrack={cls.trackVolume}
            currentValue={valueVolume.currentVolume}
            maxDuration={1}
            step={0.1}
            animationTrack={animationVolume}
            styleProgressBar={cls.progressVolume}
            styleForInput={cls.input}
            id={"volume"}
            onChange={volumeHandler}
          />
        </div>
        <audio
          onTimeUpdate={timeUpdateHandler}
          src={currentSong}
          ref={audioRef}
          onLoadedMetadata={timeUpdateHandler}
        ></audio>
      </div>
    </>
  );
};
