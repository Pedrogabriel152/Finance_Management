import React, { ReactElement, createContext, useContext, useState } from "react";
import { IUser } from "../../Interfaces/IUser";
import { IUserInput } from "../../Interfaces/IUserInput";
import { useLogin } from "../../Graphql/User/hooks";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { useReactiveVar } from "@apollo/client";
import { auteicacaoVar } from "../../Graphql/User/state";

interface UserProviderProps {
    children: ReactElement
}

export interface IUserContext{
    authentication?: IAuthentication | null
    user?: IUser
    SaveLocalStorage: () => void
    login: (email: string, password: string) => void
    createUserDatabase: (user: IUserInput) => void
    loading: boolean
}

export const UserContext = createContext<IUserContext>({
    loading: false,
    login: () => null,
    createUserDatabase: () => null,
    SaveLocalStorage: () => null
});

const UserProvider = ({children}:UserProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const authentication = useReactiveVar(auteicacaoVar);
    const [Login] = useLogin();


    const login = (email: string, password: string) => {
        Login({
            variables: {
                email, 
                password
            }
        })
    }

    const SaveLocalStorage = () => {
        if(authentication?.code == 200) {
            const authJSON = JSON.stringify(authentication);
            console.log("AQuiiasudiasiudiuasduiaisduasiduas")
            localStorage.setItem('@auth', authJSON);
        }
    }

    // const createTask = (descricao: string) => {

    //     adicionaTask({
    //         variables: {
    //             descricao: descricao
    //         }
    //     })
    // }

    // const deleteTask = (item: ITask) => {
    //     removeTask({
    //         variables: {
    //             id: item.id
    //         }
    //     })
    // }

    // const editTask = (task: ITask) => {
    //     updateTask({
    //         variables: {
    //             id: task.id,
    //             task: {
    //                 descricao: task.descricao,
    //                 status: task.status
    //             }
    //         }
    //     })
    // }

    return (
        <UserContext.Provider 
            value={{
                authentication: authentication? authentication : null,
                createUserDatabase: () => null,
                loading: false,
                login: login,
                SaveLocalStorage
                
                // tasks: data? data : tasks,
                // createTaskBanco: createTask, 
                // deleteTaskBanco: deleteTask, 
                // editTask: editTask,
                // carregando: loadTasks 
            }} 
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}

export default UserProvider;