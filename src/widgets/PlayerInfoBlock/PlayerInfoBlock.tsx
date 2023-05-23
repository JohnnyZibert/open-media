import { memo } from "react";
import cls from "./PlayerInfoBlock.module.css";
import { PlayerAndFormBlock } from "features/PalyerAndFormBlock/ui/PlayerAndFormBlock";

export interface PlayerInfoBlockProps {
  className?: string;
}

export const PlayerInfoBlock = memo((props: PlayerInfoBlockProps) => {
  return (
    <section className={cls.head}>
      <div className={cls.wrapper}>
        <div className={cls.textBlock}>
          <h1 className={cls.title}>
            Play any audio sources directly in the browser!
          </h1>
          <div className={cls.playerMinWidth}>
            <PlayerAndFormBlock />
          </div>
          <h3 className={cls.subtitle}>Without any restrictions for free</h3>
          <p className={cls.agree}>
            By uploading the audio file, you agree to our{" "}
            <b>Terms of Service</b>.
          </p>
        </div>
        <div className={cls.playerContainer}>
          <PlayerAndFormBlock />
        </div>
      </div>
    </section>
  );
});
