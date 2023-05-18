import React, { memo, useRef, useState } from "react";
import { Player } from "../AudioPlayer/AudioPlayer";
import { Form } from "../Form/Form";
import { number } from "yup";

export interface PlayerAndFormBlockProps {}

export const PlayerAndFormBlock = memo((props: PlayerAndFormBlockProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [toPlayerAndBack, setToPlayerAndBack] = useState(0);

  return (
    <div>
      {toPlayerAndBack !== 0 ? (
        <Player
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setToPlayerAndBack={setToPlayerAndBack}
          toPlayerAndBack={toPlayerAndBack}
        />
      ) : (
        <Form
          setCurrentSong={setCurrentSong}
          setToPlayerAndBack={setToPlayerAndBack}
          toPlayerAndBack={toPlayerAndBack}
        />
      )}
    </div>
  );
});
