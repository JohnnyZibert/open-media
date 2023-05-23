import { memo } from "react";
import { TechnicalTable } from "features/TechnicalSchedale";
import { HowItWorks } from "entities/HowItWorks";
import cls from "./ContentBlock.module.css";

export const ContentBlock = memo(() => {
  return (
    <div className={cls.contentContainer}>
      <HowItWorks />
      <TechnicalTable />
    </div>
  );
});
