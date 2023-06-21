import { ChangeEvent } from "react"

export interface IInput {
    svg: string
    placeholder: string
    type: string
    name: string
    value: any
    onChange(e: ChangeEvent<HTMLInputElement>): void
}