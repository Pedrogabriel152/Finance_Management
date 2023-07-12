import { useMutation, useQuery } from "@apollo/client";
import { GETFINANCE, GETFINANCIALSUMMARY, GETMONTHLYSUMMARY } from "./queries";
import { getFinanceVar, getFinancialSummaryVar, getMonthlySummaryVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
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
                getMonthlySummaryVar({
                    expensesMonth: data.searchExpensesMonth,
                    incomesMonth: data.searchIncomesMonth
                });
            }
        }
    })
}