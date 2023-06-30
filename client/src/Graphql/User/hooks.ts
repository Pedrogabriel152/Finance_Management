import { useMutation, useQuery } from "@apollo/client";
import { GETFINANCE, LOGIN, REGISTER } from "./queries";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { authenticationVar, getFinanceVar } from "./state";
import { IFinace } from "../../Interfaces/IFinace";
import { useUserContext } from "../../Context/UserContext";

export const useLogin = () => {
    return useMutation<{login: IAuthentication}>(LOGIN,{
        onCompleted(data) {
            if(data){
                authenticationVar(data.login);
            }
        },
        
    });
};

export const useRegister = () => {
    return useMutation<{createUser: IAuthentication}>(REGISTER,{
        onCompleted(data) {
            if(data){
                authenticationVar(data.createUser);
            }
        },
        
    });
};

export const useGetFinance = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();

    return useQuery<{getFiveExpense: any, getFiveIncomes: any}>(GETFINANCE, {
        variables: {
            user_id: auth.user_id? auth.user_id : 0
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