export interface IExpenseCreate {
    description: string
    merchandise_purchased: string
    establishment: string
    installments: number
    value_installment: number
    installments_paid: number
    expires: string
    user_id: number
}