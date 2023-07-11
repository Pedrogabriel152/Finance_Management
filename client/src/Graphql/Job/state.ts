import { makeVar } from "@apollo/client";
import { IJob } from "../../Interfaces/IJob";
import { IPaginate } from "../../Interfaces/IPaginate";

export const getFiveJobsVar = makeVar<IJob[] | null>(null);
export const getJobsVar = makeVar<IPaginate | null>(null);
