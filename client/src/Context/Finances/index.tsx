import { ReactElement, createContext, useContext, useEffect, useState } from "react";

// Interfaces
import { IUserInput } from "../../Interfaces/IUserInput";
import { IUserContext } from "../../Interfaces/IUserContext";
import { IJobCreate } from "../../Interfaces/IJobCreate";

// Graphql
import { useReactiveVar } from "@apollo/client";
import { authenticationVar } from "../../Graphql/User/state";
import { useLogin, useRegister } from "../../Graphql/User/hooks";
import { useCreateJob } from "../../Graphql/Job/hooks";
import { IExpenseCreate } from "../../Interfaces/IExpenseCreate";
import { useCreateExpense } from "../../Graphql/Expense/hooks";
import { IIncomeCreate } from "../../Interfaces/IIncomeCreate";
import { useCreateIncome, useUpdateIncome } from "../../Graphql/Incomes/hooks";
import { IFinancesContext } from "../../Interfaces/IFinancesContext";
import { useUserContext } from "../UserContext";

interface FinancesProviderProps {
    children: ReactElement
}

export const FinancesContext = createContext<IFinancesContext>({
    createJob: () => null,
    createExpense: () => null,
    createIncome: () => null,
    updateIncome: () => null
});

const FinancesProvider = ({children}: FinancesProviderProps) => {
    const {getAuthentication} = useUserContext();
    const [addJob] = useCreateJob();
    const [addExpense] = useCreateExpense();
    const [addIncome] = useCreateIncome();
    const [editIncome] = useUpdateIncome();
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

        if(!income.received_income) {
            income.received_income = income.installments === income.installments_received;
        }

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

    return (
        <FinancesContext.Provider 
            value={{
                createExpense,
                createIncome,
                createJob,
                updateIncome
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