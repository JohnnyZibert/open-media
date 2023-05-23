import { TechnicalTable } from "features/TechnicalSchedale";
import { HowItWorks } from "entities/HowItWorks";
import cls from "./ContentBlock.module.css";

export const ContentBlock = () => {
  return (
    <article className={cls.contentContainer}>
      <HowItWorks />
      <TechnicalTable />
    </article>
  );
};
