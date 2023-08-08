import { makeVar } from "@apollo/client";
import { IPaginate } from "../../Interfaces/IPaginate";
import { IResponse } from "../../Interfaces/IResponse";
import { IIncome } from "../../Interfaces/IIncome";

export const getIncomeVar = makeVar<IIncome | null>(null);
export const getIcomesVar = makeVar<IPaginate | null>(null);
export const getActiveIcomesVar = makeVar<IPaginate | null>(null);
export const getIdleIcomesVar = makeVar<IPaginate | null>(null);
export const createIncomeVar = makeVar<IResponse | null>(null);
export const updateIncomeVar = makeVar<IResponse | null>(null);
export const payInstallmentIncomeVar = makeVar<IResponse | null>(null);