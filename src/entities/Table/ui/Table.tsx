import cls from "./Table.module.css";
import { TableInfo } from "../../../shared/ui/TableInfo/TableInfo";
import { IInfo } from "../model/types/tableInfoTypes";

export interface TableProps {
  className?: string;
  tableInfo: IInfo[];
  tableInfo2: IInfo[];
}

export const Table = (props: TableProps) => {
  const { tableInfo, tableInfo2 } = props;
  return (
    <div className={cls.container}>
      <div className={cls.wrapper}>
        <TableInfo tableInfo={tableInfo} />
      </div>
      <div className={cls.wrapperTableInfo2}>
        <TableInfo tableInfo={tableInfo2} />
      </div>
    </div>
  );
};
