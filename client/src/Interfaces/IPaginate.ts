import { IDataJobs } from "./IDataJobs"
import { IPaginateInfo } from "./IPaginateInfo"

export interface IPaginate {
    data: IDataJobs
    paginatorInfo: IPaginateInfo
}