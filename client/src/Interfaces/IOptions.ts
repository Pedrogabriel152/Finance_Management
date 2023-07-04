import { IHAxis } from "./IHAxis";
import { IVAxis } from "./IVAxis";

export interface IOptions {
    title: string
    vAxis?: IVAxis
    hAxis?: IHAxis
    seriesType?: string
    curveType?: string
    legend?: {}
    colors?: string[]
}