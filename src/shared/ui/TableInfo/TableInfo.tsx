import { memo } from "react";
import { IInfo } from "entities/Table";
import cls from "./TableInfo.module.css";

export interface TableInfoProps {
  tableInfo: IInfo[];
}

export const TableInfo = memo((props: TableInfoProps) => {
  const { tableInfo } = props;
  return (
    <>
      {tableInfo.map((paramItem: IInfo, index) => (
        <div className={cls.table} key={index}>
          <div className={cls.nameParam}>{paramItem.nameParam}</div>
          <div className={cls.value}>{paramItem.value}</div>
        </div>
      ))}
    </>
  );
});
