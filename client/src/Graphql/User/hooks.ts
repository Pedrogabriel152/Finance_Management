import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, REGISTER } from "./queries";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { authenticationVar } from "./state";

export const useLogin = () => {
    return useMutation<{login: IAuthentication}>(LOGIN,{
        onCompleted(data) {
            if(data){
                authenticationVar(data.login)
            }
        },
        
    });
};

export const useRegister = () => {
    return useMutation<{register: IAuthentication}>(REGISTER,{
        onCompleted(data) {
            if(data){
                console.log(data)
                authenticationVar(data.register)
            }
        },
        
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