import { PlayerInfoBlock } from "../../../widgets/PlayerInfoBlock/PlayerInfoBlock";
import { ContentBlock } from "../../../widgets/ContentBlock/ContentBlock";
import cls from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <main className={cls.container}>
      <PlayerInfoBlock />
      <ContentBlock />
    </main>
  );
};
