import { memo } from "react";
import { PlayerInfoBlock } from "../../../widgets/PlayerInfoBlock/PlayerInfoBlock";
import { ContentBlock } from "../../../widgets/ContentBlock/ContentBlock";
import cls from "./HomePage.module.css";

export const HomePage = memo(() => {
  return (
    <div className={cls.container}>
      <PlayerInfoBlock />
      <ContentBlock />
    </div>
  );
});
