import { useMutation, useQuery } from "@apollo/client";

// Queries
import { GETUSER, LOGIN, REGISTER } from "./queries";

// Interfaces 
import { IAuthentication } from "../../Interfaces/IAuthentication";

// Reactive Vars
import { authenticationVar, getUserVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
import { IUser } from "../../Interfaces/IUser";

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

export const useGetUser = () => {
    return useQuery<{user: IUser}>(GETUSER, {
        onCompleted(data) {
            if(data){
                getUserVar(data.user);
            }  
        },
    });
}
