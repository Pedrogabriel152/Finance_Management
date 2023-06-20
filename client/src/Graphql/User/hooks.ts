import { useMutation, useQuery } from "@apollo/client";
// import { CREATE_TASK, DELETE_TASK, EDIT_TASK, OBTER_TASKS } from "./queries";
// import { createTasksVar, deleteTasksVar, tasksVar, updateTasksVar } from "./state";
// import { ITasks } from "../../Interface/ITasks";
// import { ICreateTask } from "../../Interface/ICreateTask";
// import { IDeleteTask } from "../../Interface/IDeleteTask";

// export const useTasks = () => {
//     return useQuery<{dados: ITasks}>(OBTER_TASKS,{
//         onCompleted(data) {
//             if(data?.dados){
//                 console.log(data.dados)
//                 tasksVar(data?.dados)
//             }
//         },
//     });
// };

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