import { useMutation, useQuery } from "@apollo/client";

// Queries
import { LOGIN, REGISTER } from "./queries";

// Interfaces 
import { IAuthentication } from "../../Interfaces/IAuthentication";

// Reactive Vars
import { authenticationVar } from "./state";

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
