import { IFinanceMonth } from "./IFinanceMonth";

export interface IMonthlySummary {
    expensesMonth: IFinanceMonth[]
    incomesMonth: IFinanceMonth[]
}