import React, { useState } from "react";
import { Player } from "../AudioPlayer/AudioPlayer";
import { Form } from "../Form/Form";

export const PlayerAndFormBlock = () => {
  const [currentSong, setCurrentSong] = useState<string>("");
  const [toPlayerAndBack, setToPlayerAndBack] = useState<boolean>(false);

  return (
    <>
      {toPlayerAndBack ? (
        <Player
          currentSong={currentSong}
          setToPlayerAndBack={setToPlayerAndBack}
        />
      ) : (
        <Form
          setCurrentSong={setCurrentSong}
          setToPlayerAndBack={setToPlayerAndBack}
        />
      )}
    </>
  );
};
