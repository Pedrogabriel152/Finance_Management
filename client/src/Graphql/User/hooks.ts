import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "./queries";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { auteicacaoVar } from "./state";
// import { createTasksVar, deleteTasksVar, tasksVar, updateTasksVar } from "./state";
// import { ITasks } from "../../Interface/ITasks";
// import { ICreateTask } from "../../Interface/ICreateTask";
// import { IDeleteTask } from "../../Interface/IDeleteTask";

export const useLogin = () => {
    return useMutation<{login: IAuthentication}>(LOGIN,{
        onCompleted(data) {
            if(data){
                console.log("UseLogin",data.login)
                auteicacaoVar(data.login)
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