import { IInput } from "./IInput";

export interface IFormCreate {
    data: IInput[]
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
    text: "finance" | "job"
}