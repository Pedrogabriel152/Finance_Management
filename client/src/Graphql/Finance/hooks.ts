import { useMutation, useQuery } from "@apollo/client";

// Queries
import { GETFINANCE, GETFINANCIALSUMMARY, GETMONTHLYSUMMARY } from "./queries";

// Reactive Vars
import { getFinanceVar, getFinancialSummaryVar, getMonthlySummaryVar } from "./state";

// Context
import { useUserContext } from "../../Context/UserContext";

// Interfaces
import { IFinanceMonth } from "../../Interfaces/IFinanceMonth";

export const useGetFinance = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();

    return useQuery<{getFiveExpense: any, getFiveIncomes: any}>(GETFINANCE, {
        variables: {
            user_id: auth?.user_id? auth.user_id : 0
        },
        onCompleted(data) {
            if(data) {
                getFinanceVar({
                    expenses: data.getFiveExpense,
                    incomes: data.getFiveIncomes
                });
            }
        }
    })
}

export const useGetFinancialSummary = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();

    return useQuery<{totalIncomes: any, totalExpenses: any}>(GETFINANCIALSUMMARY, {
        variables: {
            user_id: auth?.user_id? auth.user_id : 0
        },
        onCompleted(data){
            if(data){
                getFinancialSummaryVar({
                    totalExpenses: data.totalExpenses,
                    totalIncomes: data.totalIncomes
                });
            }
        }
    });
};

export const useGetMonthlySummaryVar = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();

    return useQuery<{searchExpensesMonth: IFinanceMonth[], searchIncomesMonth: IFinanceMonth[]}>(GETMONTHLYSUMMARY, {
        variables: {
            user_id: auth?.user_id? auth.user_id : 0
        },
        onCompleted(data){
            if(data){
                console.log(data)
                getMonthlySummaryVar({
                    expensesMonth: data.searchExpensesMonth,
                    incomesMonth: data.searchIncomesMonth
                });
            }
        }
    })
}