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
import { useCreateIncome } from "../../Graphql/Incomes/hooks";
import { IFinancesContext } from "../../Interfaces/IFinancesContext";
import { useUserContext } from "../UserContext";

interface FinancesProviderProps {
    children: ReactElement
}

export const FinancesContext = createContext<IFinancesContext>({
    createJob: () => null,
    createExpense: () => null,
    createIncome: () => null,
});

const FinancesProvider = ({children}: FinancesProviderProps) => {
    const {getAuthentication} = useUserContext();
    const [addJob] = useCreateJob();
    const [addExpense] = useCreateExpense();
    const [addIncome] = useCreateIncome();

    const createJob = (job: IJobCreate) => {
        const auth = getAuthentication();
        job.wage = typeof job.wage === 'string'? parseFloat(job.wage) : job.wage;
        job.user_id = auth.user_id;

        addJob({
            variables: {
                job: job
            }
        })
    }

    const createExpense = (expense: IExpenseCreate) => {
        const auth= getAuthentication();
        expense.value_installment = typeof expense.value_installment === 'string'? parseFloat(expense.value_installment) : expense.value_installment;
        expense.user_id = auth.user_id;

        addExpense({
            variables: {
                expense: expense
            }
        });
    }

    const createIncome = (income: IIncomeCreate) => {
        const auth= getAuthentication();
        income.value_installment = typeof income.value_installment === 'string'? parseFloat(income.value_installment) : income.value_installment;
        income.user_id = auth.user_id;

        addIncome({
            variables: {
                income: income
            }
        });
    }

    const updateIncome = () => {
        
    }

    return (
        <FinancesContext.Provider 
            value={{
                createExpense,
                createIncome,
                createJob
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