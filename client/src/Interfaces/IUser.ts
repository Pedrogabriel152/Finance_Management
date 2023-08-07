import { IJob } from "./IJob"

export interface IUser  {
    id?: number
    name: string
    cpf: string
    email: string
    address: string
    phone: string
    password?: string
    confirmPassword?: string
}