import { makeVar } from "@apollo/client";
import { IPaginate } from "../../Interfaces/IPaginate";
import { IResponse } from "../../Interfaces/IResponse";

export const getExpenseVar = makeVar<IPaginate | null>(null);
export const getActiveExpenseVar = makeVar<IPaginate | null>(null);
export const getIdleExpenseVar = makeVar<IPaginate | null>(null);
export const createExpenseVar = makeVar<IResponse | null>(null);