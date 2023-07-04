import { makeVar } from "@apollo/client";
import { IFinace } from "../../Interfaces/IFinace";
import { IFinancialSummary } from "../../Interfaces/IFinancialSummary";

export const getFinanceVar = makeVar<IFinace | null>(null);
export const getIncomeVar = makeVar<IFinace | null>(null);
export const getFinancialSummaryVar = makeVar<IFinancialSummary | null>(null);
