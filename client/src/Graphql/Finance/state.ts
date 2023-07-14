import { makeVar } from "@apollo/client";

// Interfaces
import { IFinace } from "../../Interfaces/IFinace";
import { IFinancialSummary } from "../../Interfaces/IFinancialSummary";
import { IMonthlySummary } from "../../Interfaces/IMonthlySummary";

export const getFinanceVar = makeVar<IFinace | null>(null);
export const getIncomeVar = makeVar<IFinace | null>(null);
export const getFinancialSummaryVar = makeVar<IFinancialSummary | null>(null);
export const getMonthlySummaryVar = makeVar<IMonthlySummary | null>(null);
