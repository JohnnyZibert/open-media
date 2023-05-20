import React, {
  ChangeEvent,
  Dispatch,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import playButton from "../../assets/img/Play.svg";
import pauseButton from "../../assets/img/Pause.svg";
import goBack from "../../assets/img/lable.svg";
import { Button } from "../Button/Button";
import cls from "./AudioPlayer.module.css";
import { VolumeMusic } from "../VolumeMusic/VolumeMusic";
import { AudioTrack } from "../AudioTrack/AudioTrack";
import { Loader } from "../Loader/Loader";
import { getTime } from "../../helpers/getTimeToSeconds";

interface IProps {
  currentSong?: string;
  setToPlayerAndBack?: (value: boolean) => void;
}

export interface SongInfo {
  currentTime: number;
  duration: number;
  currentPercentage: number;
}

export const Player = (props: IProps) => {
  const { currentSong, setToPlayerAndBack } = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number | null>(null);
  const [rangeVolume, setRangeVolume] = useState<number | null>(null);
  const [songInfo, setSongInfo] = useState<SongInfo>({
    currentTime: 0,
    duration: 0,
    currentPercentage: 0,
  });

  const checkAudioRef = audioRef.current !== null;

  useEffect(() => {
    if (checkAudioRef) {
      audioRef.current.volume = 0.5;
      setVolume(audioRef.current.volume);
      setRangeVolume(audioRef.current.volume);
    }
  }, [checkAudioRef]);

  const audioClick = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current?.play();
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

  const onClickBack = () => {
    setToPlayerAndBack?.(false);
    setIsPlaying(false);
  };

  const dragHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkAudioRef) {
      audioRef.current.currentTime = Number(e.target.value);
    }

    setSongInfo({ ...songInfo, currentTime: Number(e.target.value) });
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const volumeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (checkAudioRef && currentSong) {
        const current = Number(e.target.value || 0);
        const duration = 1.0;
        const animationPercentage = current / duration;

        setVolume(current);
        setRangeVolume(animationPercentage);
        audioRef.current.volume = current;
      }
    },
    [audioRef, checkAudioRef, currentSong]
  );

  return (
    <>
      <Button className={cls.back} onClick={onClickBack}>
        <img src={goBack} alt="go-back" />
      </Button>
      <div className={cls.containerPlayer}>
        {!checkAudioRef && <Loader />}
        {isPlaying ? (
          <Button onClick={audioClick}>
            <img src={pauseButton} alt="pause" />
          </Button>
        ) : (
          <Button onClick={audioClick} disable={!checkAudioRef}>
            <img src={playButton} alt="play" />
          </Button>
        )}
        <div className="time-control">
          <AudioTrack songInfo={songInfo} dragHandler={dragHandler} />
        </div>
        <div className={cls.playerFooter}>
          <p className={cls.timeMusic}>
            {getTime(
              songInfo.currentTime ? songInfo.currentTime : Number("0:00")
            )}
          </p>
          <VolumeMusic
            volume={volume || 0.5}
            rangeVolume={rangeVolume || 0.5}
            volumeHandler={volumeHandler}
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
