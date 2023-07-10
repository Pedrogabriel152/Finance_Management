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
    getAuthentication: () => null,
    logout: () => null
});

const UserProvider = ({children}:UserProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [Login, {loading: loadLogin}] = useLogin();
    const [Register, {loading: loadRegister}] = useRegister();
    const authentication = useReactiveVar(authenticationVar);
    const [auth, setAuth] = useState<any>();

    useEffect(() => {
        async function loading(){
            setLoading(true);
            await SaveLocalStorage();
            setLoading(false);
        }

        loading();
        
    }, [authentication]);

    useEffect(() => {
        const auth = localStorage.getItem('@auth');

        if(auth){
            setAuth(JSON.parse(auth));
        }
    }, []);

    const login = (email: string, password: string) => {
        Login({
            variables: {
                email, 
                password
            }
        });

        if(authentication) {
            const authJSON = JSON.stringify(authentication);
            localStorage.setItem('@auth', authJSON);
        }
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

    const SaveLocalStorage = async () => {
        if(authentication) {
            const authJSON = JSON.stringify(authentication);
            await localStorage.setItem('@auth', authJSON);
        }
    }

    const getAuthentication = () => {
        const auth = localStorage.getItem('@auth')
        if(auth){
            return JSON.parse(auth);
        }

        return null;
    }

    const logout = () => {
        localStorage.removeItem('@auth');
    }

    return (
        <UserContext.Provider 
            value={{
                authentication: auth || authentication,
                createUserDatabase: () => null,
                loading: loading || loadLogin || loadRegister,
                login: login,
                SaveLocalStorage,
                register: register,
                getAuthentication: getAuthentication,
                logout: logout
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