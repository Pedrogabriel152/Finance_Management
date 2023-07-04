import { makeVar } from "@apollo/client";
import { IJob } from "../../Interfaces/IJob";

export const getFiveJobsVar = makeVar<IJob[] | null>(null);
