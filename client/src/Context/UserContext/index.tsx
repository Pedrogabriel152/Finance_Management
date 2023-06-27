import { ReactElement, createContext, useContext, useEffect, useState } from "react";

// Interfaces
import { IUserInput } from "../../Interfaces/IUserInput";
import { IUserContext } from "../../Interfaces/IUserContext";

// Graphql
import { useReactiveVar } from "@apollo/client";
import { authenticationVar } from "../../Graphql/User/state";
import { useLogin, useRegister } from "../../Graphql/User/hooks";

interface UserProviderProps {
    children: ReactElement
}

export const UserContext = createContext<IUserContext>({
    loading: false,
    login: () => null,
    register: () => null,
    createUserDatabase: () => null,
    SaveLocalStorage: () => null,
    getAuthentication: () => null
});

const UserProvider = ({children}:UserProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [Login, {loading: loadLogin}] = useLogin();
    const [Register, {loading: loadRegister}] = useRegister();
    const authentication = useReactiveVar(authenticationVar);
    const [auth, setAuth] = useState<any>();

    useEffect(() => {
        setLoading(true);
        SaveLocalStorage();
        setLoading(false);
    }, [authentication]);

    useEffect(() => {
        const auth = localStorage.getItem('@auth');

        if(auth){
            setAuth(JSON.parse(auth));
        }

        console.log(auth);

    }, []);

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
        if(authentication) {
            const authJSON = JSON.stringify(authentication);
            localStorage.setItem('@auth', authJSON);
        }
    }

    const getAuthentication = () => {
        const auth = localStorage.getItem('@auth')
        if(auth){
            return JSON.parse(auth);
        }

        return null;
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
                authentication: auth || authentication,
                createUserDatabase: () => null,
                loading: loading || loadLogin || loadRegister,
                login: login,
                SaveLocalStorage,
                register: register,
                getAuthentication: getAuthentication
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