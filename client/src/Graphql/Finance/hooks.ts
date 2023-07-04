import { useMutation, useQuery } from "@apollo/client";
import { GETFINANCE, GETFINANCIALSUMMARY, GETFIVEJOBS } from "./queries";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { getFinanceVar, getFinancialSummaryVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
import { IJob } from "../../Interfaces/IJob";

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

// export const useCreateTask = () => {
//     return useMutation<{createTask: ICreateTask}>(CREATE_TASK,{
//         onCompleted(data) {
//             if(data){
//                 createTasksVar(data?.createTask)
//             }
//         },
//         refetchQueries: [
//             'GetTasks'
//         ]
//     });
// };

// export const useDeleteTask = () => {
//     return useMutation<{deleteTask: IDeleteTask}>(DELETE_TASK,{
//         onCompleted(data) {
//             if(data){
//                 deleteTasksVar(data?.deleteTask)
//             }
//         },
//         refetchQueries: [
//             'GetTasks'
//         ]
//     });
// };

// export const useUpdateTask = () => {
//     return useMutation<{updateTask: ICreateTask}>(EDIT_TASK,{
//         onCompleted(data) {
//             if(data){
//                 updateTasksVar(data?.updateTask)
//             }
//         },
//         refetchQueries: [
//             'GetTasks'
//         ]
//     });
// };