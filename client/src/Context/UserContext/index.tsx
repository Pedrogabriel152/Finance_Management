import { ReactElement, createContext, useContext, useEffect, useState } from "react";

// Interfaces
import { IUserInput } from "../../Interfaces/IUserInput";
import { IUserContext } from "../../Interfaces/IUserContext";
import { IJobCreate } from "../../Interfaces/IJobCreate";

// Graphql
import { useReactiveVar } from "@apollo/client";
import { authenticationVar } from "../../Graphql/User/state";
import { useLogin, useRegister } from "../../Graphql/User/hooks";
import { useCreateJob } from "../../Graphql/Job/hooks";
import { IExpenseCreate } from "../../Interfaces/IExpenseCreate";
import { useCreateExpense } from "../../Graphql/Expense/hooks";
import { IIncomeCreate } from "../../Interfaces/IIncomeCreate";
import { useCreateIncome } from "../../Graphql/Incomes/hooks";

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
    createJob: () => null,
    createExpense: () => null,
    createIncome: () => null,
    logout: () => null,
    setPage: () => null,
    page: 1
});

const UserProvider = ({children}:UserProviderProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [Login, {loading: loadLogin}] = useLogin();
    const [Register, {loading: loadRegister}] = useRegister();
    const authentication = useReactiveVar(authenticationVar);
    const [auth, setAuth] = useState<any>();
    const [page, setPage] = useState<number>(1);
    const [addJob] = useCreateJob();
    const [addExpense] = useCreateExpense();
    const [addIncome] = useCreateIncome();

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

        const authJSON = JSON.stringify(authentication);
        localStorage.setItem('@auth', authJSON);
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

    const handlePage = (page: number) => {
        setPage(page);
    }

    const createJob = (job: IJobCreate) => {
        const auth = getAuthentication();
        job.wage = typeof job.wage === 'string'? parseFloat(job.wage) : job.wage;
        job.user_id = auth.user_id;

        addJob({
            variables: {
                job: job
            }
        })
    }

    const createExpense = (expense: IExpenseCreate) => {
        const auth= getAuthentication();
        expense.value_installment = typeof expense.value_installment === 'string'? parseFloat(expense.value_installment) : expense.value_installment;
        expense.user_id = auth.user_id;

        addExpense({
            variables: {
                expense: expense
            }
        });
    }

    const createIncome = (income: IIncomeCreate) => {
        const auth= getAuthentication();
        income.value_installment = typeof income.value_installment === 'string'? parseFloat(income.value_installment) : income.value_installment;
        income.user_id = auth.user_id;

        addIncome({
            variables: {
                income: income
            }
        });
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
                logout: logout,
                createJob: createJob,
                createExpense: createExpense,
                createIncome: createIncome,
                setPage: handlePage,
                page: page
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