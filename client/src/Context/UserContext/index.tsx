import { ReactElement, createContext, useContext, useEffect, useState } from "react";

// Interfaces
import { IUser } from "../../Interfaces/IUser";
import { IUserInput } from "../../Interfaces/IUserInput";
import { IAuthentication } from "../../Interfaces/IAuthentication";

// Graphql
import { useReactiveVar } from "@apollo/client";
import { authenticationVar } from "../../Graphql/User/state";
import { useLogin, useRegister } from "../../Graphql/User/hooks";

interface UserProviderProps {
    children: ReactElement
}

export interface IUserContext{
    authentication?: IAuthentication | null
    user?: IUser
    SaveLocalStorage: () => void
    login: (email: string, password: string) => void
    register: (user: IUserInput) => void
    createUserDatabase: (user: IUserInput) => void
    loading: boolean
}

export const UserContext = createContext<IUserContext>({
    loading: false,
    login: () => null,
    register: () => null,
    createUserDatabase: () => null,
    SaveLocalStorage: () => null
});

const UserProvider = ({children}:UserProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [Login, {loading: loadLogin}] = useLogin();
    const [Register, {loading: loadRegister}] = useRegister();
    const authentication = useReactiveVar(authenticationVar);
    const [auth, setAuth] = useState<any>(null);

    useEffect(() => {
        SaveLocalStorage();
    }, [authentication]);

    useEffect(() => {
        const auth = localStorage.getItem('@auth');

        if(auth){
            setAuth(JSON.parse(auth));
        }

    }, [authentication]);


    const login = (email: string, password: string) => {
        Login({
            variables: {
                email, 
                password
            }
        })
    }

    const register = (user: IUserInput) => {
        console.log(user)
        const phoneInc = user.phone.replace(/\D/g, '').split("");
        let phoneFinal = "";
        for(let i=0; i<phoneInc.length; i++){
            phoneFinal += phoneInc[i];
        }

        const cpfInc = user.cpf.replace(/\D/g, '').split("");
        let cpfFinal = "";
        for(let i = 0; i<cpfInc.length; i++){
            cpfFinal += cpfInc[i]
        }
        
        user.phone = phoneFinal;
        user.cpf = cpfFinal;
        Register({
            variables: {
                user
            }
        });
    }

    const SaveLocalStorage = () => {
        if(authentication?.code == 200) {
            const authJSON = JSON.stringify(authentication);
            localStorage.setItem('@auth', authJSON);
        }
    }

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
                authentication: authentication? authentication : auth? auth : null,
                createUserDatabase: () => null,
                loading: loadLogin? loadLogin : loadRegister,
                login: login,
                SaveLocalStorage,
                register: register
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