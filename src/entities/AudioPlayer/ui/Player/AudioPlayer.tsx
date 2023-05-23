import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import goBack from "shared/assets/img/goBack.svg";
import { Loader } from "shared/ui/Loader/Loader";
import { getTime } from "shared/helpers/getTimeToSeconds";
import { ImgButton } from "shared/ui/ImgButton/ImgButton";
import { SongInfo } from "../../model/types/songInfo";
import { TogglePlay } from "../TogglePlay/TogglePlay";
import { AudioTrack } from "../AudioTrack/AudioTrack";
import { VolumeMusic } from "../VolumeMusic/VolumeMusic";
import { Audio } from "../Audio/Audio";
import cls from "./AudioPlayer.module.css";

interface IProps {
  currentSong?: string;
  setToPlayerAndBack?: (value: boolean) => void;
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

  const onClickBack = useCallback(() => {
    setToPlayerAndBack?.(false);
    setIsPlaying(false);
  }, [setToPlayerAndBack]);

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

  const timerTrack = songInfo.currentTime
    ? songInfo.currentTime
    : Number("0:00");

  return (
    <>
      <ImgButton
        onClick={onClickBack}
        disable={!checkAudioRef}
        img={goBack}
        alt="go-back"
        className={cls.back}
      />
      <div className={cls.containerPlayer}>
        {!checkAudioRef && <Loader />}
        <TogglePlay
          checkAudioRef={checkAudioRef}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          audioRef={audioRef}
        />
        <div className={cls.audioControl}>
          <AudioTrack songInfo={songInfo} dragHandler={dragHandler} />
        </div>
        <div className={cls.playerFooter}>
          <p className={cls.timeMusic}>{getTime(timerTrack)}</p>
          <VolumeMusic
            volume={volume || 0.5}
            rangeVolume={rangeVolume || 0.5}
            volumeHandler={volumeHandler}
          />
        </div>
        <Audio
          audioRef={audioRef}
          songInfo={songInfo}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
        />
      </div>
    </>
  );
};
