import { ReactElement, createContext, useContext } from "react";

// Interfaces
import { IJobCreate } from "../../Interfaces/IJobCreate";
import { IExpenseCreate } from "../../Interfaces/IExpenseCreate";
import { IIncomeCreate } from "../../Interfaces/IIncomeCreate";
import { IFinancesContext } from "../../Interfaces/IFinancesContext";

// Graphql
import { useCreateJob } from "../../Graphql/Job/hooks";
import { useCreateExpense, useUpdateExpense } from "../../Graphql/Expense/hooks";
import { useCreateIncome, useUpdateIncome } from "../../Graphql/Incomes/hooks";

// Context
import { useUserContext } from "../UserContext";

interface FinancesProviderProps {
    children: ReactElement
}

export const FinancesContext = createContext<IFinancesContext>({
    createJob: () => null,
    createExpense: () => null,
    createIncome: () => null,
    updateIncome: () => null,
    updateExpense: () => null
});

const FinancesProvider = ({children}: FinancesProviderProps) => {
    const {getAuthentication} = useUserContext();
    const [addJob] = useCreateJob();
    const [addExpense] = useCreateExpense();
    const [addIncome] = useCreateIncome();
    const [editIncome] = useUpdateIncome();
    const [editExpense] = useUpdateExpense();
    const auth = getAuthentication();

    const createJob = (job: IJobCreate) => {
        job.wage = typeof job.wage === 'string'? parseFloat(job.wage) : job.wage;
        job.user_id = auth.user_id;

        addJob({
            variables: {
                job: job
            }
        })
    }

    const createExpense = (expense: IExpenseCreate) => {
        expense.value_installment = typeof expense.value_installment === 'string'? parseFloat(expense.value_installment) : expense.value_installment;
        expense.user_id = auth.user_id;

        addExpense({
            variables: {
                expense: expense
            }
        });
    }

    const createIncome = (income: IIncomeCreate) => {
        income.value_installment = typeof income.value_installment === 'string'? parseFloat(income.value_installment) : income.value_installment;
        income.user_id = auth.user_id;

        addIncome({
            variables: {
                income: income
            }
        });
    }

    const updateIncome = (id: number, income: IIncomeCreate) => {
        income.value_installment = typeof income.value_installment === 'string'? parseFloat(income.value_installment) : income.value_installment;
        income.installments = typeof income.installments === 'string'? parseInt(income.installments) : income.installments;
        income.user_id = auth.user_id? auth.user_id : 0;
        income.received_income = income.installments === income.installments_received;

        editIncome({
            variables: {
                id: id,
                user_id: auth.user_id,
                income: {
                    description: income.description,
                    establishment: income.establishment,
                    expires: income.expires,
                    installments: income.installments,
                    installments_received: income.installments_received,
                    merchandise_purchased: income.merchandise_purchased,
                    user_id: income.user_id,
                    value_installment: income.value_installment,
                    received_income: income.received_income
                }
            }
        })
    }

    const updateExpense = (id: number, expense: IExpenseCreate) => {
        expense.value_installment = typeof expense.value_installment === 'string'? parseFloat(expense.value_installment) : expense.value_installment;
        expense.installments = typeof expense.installments === 'string'? parseInt(expense.installments) : expense.installments;
        expense.user_id = auth.user_id? auth.user_id : 0;
        expense.paid_expense = expense.installments === expense.installments_paid;

        editExpense({
            variables: {
                id: id,
                user_id: auth.user_id,
                expense: {
                    description: expense.description,
                    establishment: expense.establishment,
                    expires: expense.expires,
                    installments: expense.installments,
                    installments_paid: expense.installments_paid,
                    merchandise_purchased: expense.merchandise_purchased,
                    user_id: expense.user_id,
                    value_installment: expense.value_installment,
                    paid_expense: expense.paid_expense
                }
            }
        })
    }

    return (
        <FinancesContext.Provider 
            value={{
                createExpense,
                createIncome,
                createJob,
                updateIncome,
                updateExpense
            }} 
        >
            {children}
        </FinancesContext.Provider>
    );
}

export const useFinancesContext = () => {
    return useContext(FinancesContext);
}

export default FinancesProvider;