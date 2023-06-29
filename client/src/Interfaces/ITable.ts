import { ITableBody } from "./ITableBody";
import { ITableFooter } from "./ITableFooter";

export interface ITable {
    tableBody: ITableBody[]
    tableFooter: ITableFooter
}