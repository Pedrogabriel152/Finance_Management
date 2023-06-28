import { IOptions } from "./IOptions"

export interface IContent {
    title: string
    type: 'graph' | 'table'
    options?: IOptions
}