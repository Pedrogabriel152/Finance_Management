import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";

// Queries
import { CREATEINCOME, GETACTIVEINCOMES, GETIDLEINCOMES, GETINCOME, GETINCOMES, UPDATEINCOME } from "./queries";
import { GETFINANCE, GETFINANCIALSUMMARY, GETMONTHLYSUMMARY } from "../Finance/queries";

// States
import { getActiveIcomesVar, getIdleIcomesVar, getIcomesVar, createIncomeVar, getIncomeVar, updateIncomeVar } from "./state";

// Context
import { useUserContext } from "../../Context/UserContext";

// Utils
import { updateLink } from "../../utils/updateLink";

// Interface
import { IPaginate } from "../../Interfaces/IPaginate";
import { IResponse } from "../../Interfaces/IResponse";
import { IIncome } from "../../Interfaces/IIncome";

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

    return useQuery<{ incomesOpen: IPaginate }>(GETACTIVEINCOMES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getActiveIcomesVar(data.incomesOpen);
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

    return useQuery<{ incomesClose: IPaginate }>(GETIDLEINCOMES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getIdleIcomesVar(data.incomesClose);
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
            }},
            {query: GETFINANCIALSUMMARY, variables: {
                user_id: auth?.user_id? auth.user_id : 0
            }},
            {query: GETMONTHLYSUMMARY, variables: {
                user_id: auth?.user_id? auth.user_id : 0
            }}
        ]
    })
}

export const useGetIncome = (id: number, user_id: number) => {
    return useQuery<{ income: IIncome }>(GETINCOME, {
        variables: {
            user_id: user_id ? user_id : 0,
            id: id,
        },
        onCompleted(data) {
            if (data) {
                getIncomeVar(data.income);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
}

export const useUpdateIncome = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    return useMutation<{editIncome: IResponse}>(UPDATEINCOME, {
        onCompleted(data) {
            if(data) {
                updateIncomeVar(data.editIncome);
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