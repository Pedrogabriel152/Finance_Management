import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GETEXPENSES, GETACTIVEEXPENSES, GETIDLEEXPENSES } from "./queries";
import { getActiveExpenseVar, getExpenseVar, getIdleExpenseVar } from "./state";
import { updateLink } from "../../utils/updateLink";

// Context
import { useUserContext } from "../../Context/UserContext";

// Interfaces
import { IPaginate } from "../../Interfaces/IPaginate";

export const useGetExpenses = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getAllExpense: IPaginate }>(GETEXPENSES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getExpenseVar(data.getAllExpense);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetActiveExpenses = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getActiveExpense: IPaginate }>(GETACTIVEEXPENSES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getActiveExpenseVar(data.getActiveExpense);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetIdleExpenses = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getIdleExpense: IPaginate }>(GETIDLEEXPENSES, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getIdleExpenseVar(data.getIdleExpense);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};