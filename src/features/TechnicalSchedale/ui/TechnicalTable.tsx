import { useState } from "react";
import cls from "./TechnicalTable.module.css";
import { Button } from "../../../shared/ui/Button/Button";
import { Table } from "entities/Table";

const variableTable = ["Own server", "Amazon Instance"];
const tableForAmazon1 = [
  { nameParam: "Instance", value: "g4dn.xlarge" },
  { nameParam: "vCPUs", value: "4" },
  { nameParam: "GPU", value: "1" },
];
const tableForAmazon2 = [
  { nameParam: "Memory", value: "16 GB RAM" },
  { nameParam: "Storage", value: "125 GBM" },
];

const tableForOwn1 = [
  { nameParam: "OS + apps", value: "Unix/OSX + docker + nvidia-docker" },
  { nameParam: "CPU", value: "4 cores or more (e.g. intel core i5)" },
  { nameParam: "Memory", value: "16 GB RAM" },
];

const tableForOwn2 = [
  { nameParam: "Free space", value: "100 GB of free space" },
  { nameParam: "Graphics hardware", value: "GPU: NVidia only 2Gb+" },
];

export const TechnicalTable = () => {
  const [active, setActive] = useState<number>(0);
  return (
    <section className={cls.technicalSection}>
      <p className={cls.title}>Technical requirements</p>
      <div className={cls.toggleTable}>
        {variableTable.map((tableBlock, index) => (
          <Button
            key={index}
            className={active === index ? cls.activeTable : cls.unSelectTable}
            onClick={() => setActive(index)}
          >
            {tableBlock}
          </Button>
        ))}
      </div>
      {active === 1 ? (
        <Table tableInfo={tableForAmazon1} tableInfo2={tableForAmazon2} />
      ) : (
        <div className={cls.infoTable2}>
          <Table tableInfo={tableForOwn1} tableInfo2={tableForOwn2} />
        </div>
      )}
    </section>
  );
};
