import { makeVar } from "@apollo/client";
import { IPaginate } from "../../Interfaces/IPaginate";

export const getIcomesVar = makeVar<IPaginate | null>(null);
export const getActiveIcomesVar = makeVar<IPaginate | null>(null);
export const getIdleIcomesVar = makeVar<IPaginate | null>(null);