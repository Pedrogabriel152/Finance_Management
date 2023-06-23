import { IJob } from "./IJob"

export interface IUser  {
    id?: number
    name: string
    cpf: string
    email: string
    address: string
    phone: string
    password: string
    jobs: IJob[]
    email_verified_at?: any
    created_at?: any
    updated_at?: any
}