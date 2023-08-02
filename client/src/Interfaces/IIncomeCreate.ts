export interface IIncomeCreate {
    description: string
    establishment: string
    installments: number
    value_installment: number
    installments_received: number
    expires: string
    user_id: number
    merchandise_purchased: string
    received_income?: boolean
}