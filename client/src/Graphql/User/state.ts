import { makeVar } from "@apollo/client";
import { IUser } from "../../Interfaces/IUser";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { IFinace } from "../../Interfaces/IFinace";
import { IFinancialSummary } from "../../Interfaces/IFinancialSummary";

export const userVar = makeVar<IUser | null>(null);
export const authenticationVar = makeVar<IAuthentication | null>(null);
export const getFinanceVar = makeVar<IFinace | null>(null);
export const getIncomeVar = makeVar<IFinace | null>(null);
export const getFinancialSummaryVar = makeVar<IFinancialSummary | null>(null);
// export const deleteTasksVar = makeVar<IDeleteTask | null>(null);
// export const updateTasksVar = makeVar<ICreateTask | null>(null);
