import { IAuthentication } from "./IAuthentication"
import { IUser } from "./IUser"
import { IUserInput } from "./IUserInput"

export interface IUserContext{
    authentication?: IAuthentication | null
    user?: IUser
    SaveLocalStorage: () => void
    login: (email: string, password: string) => void
    register: (user: IUserInput) => void
    createUserDatabase: (user: IUserInput) => void
    loading: boolean
    getAuthentication: () => any
}