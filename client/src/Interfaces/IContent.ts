import { IOptions } from "./IOptions"
import { ITable } from "./ITable"

export interface IContent {
    title: string
    chartType?: 'ColumnChart' | 'LineChart'
    type: 'graph' | 'table'
    data?: any[]
    options?: IOptions
    table?: ITable
    
}