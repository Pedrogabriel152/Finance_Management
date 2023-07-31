export interface IExpense {
    id: number
    description: string
    merchandise_purchased: string
    establishment: string
    installments: number
    value_installment: number
    expires: string
    installments_paid: number
    paid_expense: boolean
    user_id: number
}