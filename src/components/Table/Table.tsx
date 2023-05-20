import { memo } from "react";
import cls from "./Table.module.css";

interface IInfo {
  nameParam: string;
  value: string;
}

export interface TableProps {
  className?: string;
  tableInfo: IInfo[];
  tableInfo2: IInfo[];
}

export const Table = memo((props: TableProps) => {
  const { tableInfo, tableInfo2 } = props;
  return (
    <div className={cls.container}>
      <div className={cls.wrapper}>
        {tableInfo.map((paramItem: IInfo) => (
          <div className={cls.table}>
            <div className={cls.nameParam}>{paramItem.nameParam}</div>
            <div className={cls.value}>{paramItem.value}</div>
          </div>
        ))}
      </div>
      <div>
        {tableInfo2.map((paramItem: IInfo) => (
          <div className={cls.table}>
            <div className={cls.nameParam}>{paramItem.nameParam}</div>
            <div className={cls.value}>{paramItem.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
