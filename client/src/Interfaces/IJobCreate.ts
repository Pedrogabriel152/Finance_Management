export interface IJobCreate {
    description: string
    wage: number
    establishment: string
    started: string
    leave?: string
    user_id: number
}