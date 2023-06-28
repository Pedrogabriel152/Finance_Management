import { ISerie } from "./ISerie";
import { IXAxis } from "./IXAxis";

export interface IOptions {
    xAxis: IXAxis
    series: ISerie[]
    yAxis: {
        type: 'value'
    }
}