import { ITotalExpenses } from "./ITotalExpenses";
import { ITotalIncomes } from "./ITotalIncomes";

export interface IFinancialSummary {
    totalExpenses: ITotalExpenses
    totalIncomes: ITotalIncomes
}