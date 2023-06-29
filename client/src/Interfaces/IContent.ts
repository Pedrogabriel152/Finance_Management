import { IOptions } from "./IOptions"
import { ITable } from "./ITable"

export interface IContent {
    title: string
    type: 'graph' | 'table'
    options?: IOptions
    table?: ITable
}