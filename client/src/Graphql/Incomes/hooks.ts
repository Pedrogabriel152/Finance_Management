import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";

// Queries
import { CREATEINCOME, GETACTIVEINCOMES, GETIDLEINCOMES, GETINCOMES } from "./queries";
import { GETFINANCE } from "../Finance/queries";

// States
import { getActiveIcomesVar, getIdleIcomesVar, getIcomesVar, createIncomeVar } from "./state";

// Context
import { useUserContext } from "../../Context/UserContext";

// Utils
import { updateLink } from "../../utils/updateLink";

// Interface
import { IPaginate } from "../../Interfaces/IPaginate";
import { IResponse } from "../../Interfaces/IResponse";

export const useGetIncomes = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getAllIncomes: IPaginate }>(GETINCOMES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getIcomesVar(data.getAllIncomes);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetActiveIncomes = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getActiveIncomes: IPaginate }>(GETACTIVEINCOMES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getActiveIcomesVar(data.getActiveIncomes);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetIdleIcomes = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getIdleJobs: IPaginate }>(GETIDLEINCOMES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getIdleIcomesVar(data.getIdleJobs);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useCreateIncome = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    return useMutation<{createIncome: IResponse}>(CREATEINCOME, {
        onCompleted(data) {
            if(data){
                createIncomeVar(data?.createIncome)
            }
        },
        refetchQueries: [
            {query: GETFINANCE, variables: {
                user_id: auth?.user_id? auth.user_id : 0
            }},
            {query: GETINCOMES, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }},
            {query: GETACTIVEINCOMES, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }},
            {query: GETIDLEINCOMES, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }}
        ]
    })
}