import { makeVar } from "@apollo/client";

// Interfaces
import { IJob } from "../../Interfaces/IJob";
import { IPaginate } from "../../Interfaces/IPaginate";
import { IResponse } from "../../Interfaces/IResponse";

export const getFiveJobsVar = makeVar<IJob[] | null>(null);
export const getJobsVar = makeVar<IPaginate | null>(null);
export const getActiveJobsVar = makeVar<IPaginate | null>(null);
export const getIdleJobsVar = makeVar<IPaginate | null>(null);
export const createJobVar = makeVar<IResponse | null>(null);
