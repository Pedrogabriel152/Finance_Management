import { makeVar } from "@apollo/client";
import { IPaginate } from "../../Interfaces/IPaginate";

export const getJobsVar = makeVar<IPaginate | null>(null);
export const getActiveJobsVar = makeVar<IPaginate | null>(null);
export const getIdleJobsVar = makeVar<IPaginate | null>(null);