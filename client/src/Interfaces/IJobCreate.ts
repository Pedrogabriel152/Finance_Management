export interface IJobCreate {
    description: string
    wage: string | number
    establishment: string
    started: string
    leave?: string
    user_id: number
}