interface IContext {
    authenticate: boolean
    logout(): void
    register(recordCompany: object): Promise<void>
    login(recordCompany: object): Promise<void>
    update(recordCompany: any): Promise<void>
}

export default IContext