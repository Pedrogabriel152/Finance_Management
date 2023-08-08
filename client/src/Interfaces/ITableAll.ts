import { IDataAll } from "./IDataAll";
import { IFinanceTable } from "./IFinanceTable";

export interface ITableAll {
    data: IDataAll[]
    text: 'income' | 'expense'
    payInstallment: (id: number, user_id: number) => void
}