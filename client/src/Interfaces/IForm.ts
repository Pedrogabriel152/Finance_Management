import { FormEvent } from "react"
import { IInput } from "./IInput"

export interface IForm {
    text: string
    link: string
    inputs: IInput[]
    submit(e: FormEvent<HTMLFormElement>): void
}