import { ChangeEvent } from "react"

export interface IInput {
    label?: string
    svg: string | ""
    placeholder: string
    type: string
    name: string
    value: any
    onChange(e: ChangeEvent<HTMLInputElement>, value?: any): void
}