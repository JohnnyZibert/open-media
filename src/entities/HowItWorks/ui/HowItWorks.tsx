import cloud from "../../../shared/assets/img/cloud.svg";
import line from "../../../shared/assets/img/line.svg";
import square from "../../../shared/assets/img/square.svg";
import cls from "./HowItWorks.module.css";

export const HowItWorks = () => {
  return (
    <>
      <section className={cls.description}>
        <div className={cls.descriptionContent}>
          <h2 className={cls.descriptionTitle}>How It Works</h2>
          <p className={cls.descriptionText}>
            Lorem Ipsum is a "fish" text often used in print and web design.
            Lorem Ipsum has been the standard "fish" for Latin texts since the
            early 16th century. At that time, an unnamed printer created a large
            collection of font sizes and shapes, using Lorem Ipsum for print
            samples.
          </p>
        </div>
        <aside className={cls.descriptionSchema}>
          <img src={square} alt="square" className={cls.schemaSquare} />
          <img src={line} alt="line" className={cls.schemaLine} />
          <img src={cloud} alt="cloud" className={cls.schemaCloud} />
        </aside>
      </section>
    </>
  );
};
