import { ChangeEvent } from "react"

export interface IInput {
    label?: string
    svg: string | ""
    placeholder: string
    type: string
    name: string
    value: any
    disabled?: boolean
    onChange(e: ChangeEvent<HTMLInputElement>, value?: any): void
}