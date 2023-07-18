import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GETACTIVEJOBS, GETIDLEJOBS, GETINCOMES } from "./queries";
import { getActiveIcomesVar, getIdleIcomesVar, getIcomesVar } from "./state";

// Context
import { useUserContext } from "../../Context/UserContext";

// Utils
import { updateLink } from "../../utils/updateLink";

// Interface
import { IPaginate } from "../../Interfaces/IPaginate";

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
                console.log(data)
                getIcomesVar(data.getAllIncomes);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetActiveJobs = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getActiveJobs: IPaginate }>(GETACTIVEJOBS, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getActiveIcomesVar(data.getActiveJobs);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};

export const useGetIdleJobs = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ getIdleJobs: IPaginate }>(GETIDLEJOBS, {
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