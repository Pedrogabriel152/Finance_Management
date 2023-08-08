import { IExpenseCreate } from "./IExpenseCreate"
import { IIncomeCreate } from "./IIncomeCreate"
import { IJob } from "./IJob"
import { IJobCreate } from "./IJobCreate"

export interface IFinancesContext {
    createJob: (job: IJobCreate) => void
    createExpense: (expense: IExpenseCreate) => void
    createIncome: (income: IIncomeCreate) => void
    updateIncome: (id: number, income: IIncomeCreate) => void
    updateExpense: (id: number, expense: IExpenseCreate) => void
    updateJob: (id: number, job: IJob) => void
    payInstallmentExpense: (id: number, user_id: number) => void
    payInstallmentIncome: (id: number, user_id: number) => void
}