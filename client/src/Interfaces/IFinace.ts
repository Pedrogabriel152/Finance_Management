import { IExpenseHome } from "./IExpenseHome";
import { IIncomeHome } from "./IIncomeHome";

export interface IFinace {
    expenses: IExpenseHome[]
    incomes: IIncomeHome[]
}