// Graphql
import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";

// Queries
import { GETACTIVEJOBS, GETFIVEJOBS, GETIDLEJOBS, GETJOBS } from "./queries";

// Reactive Vars
import { getActiveJobsVar, getFiveJobsVar, getIdleJobsVar, getJobsVar } from "./state";

// Context
import { useUserContext } from "../../Context/UserContext";

// Interfaces
import { IJob } from "../../Interfaces/IJob";
import { IPaginate } from "../../Interfaces/IPaginate";

// Utils
import { updateLink } from "../../utils/updateLink";

export const useGetFiveJobs = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();

    return useQuery<{fiveJobs: IJob[]}>(GETFIVEJOBS, {
        variables: {
            user_id: auth?.user_id? auth.user_id : 0
        },
        onCompleted(data) {
            if(data){
                getFiveJobsVar(data.fiveJobs);
            }
        },
        
    });
};

export const useGetJobs = (page: number) => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    const client = useApolloClient();

    updateLink(`http://localhost/graphql?page=${page}`, auth, client);

    return useQuery<{ jobs: IPaginate }>(GETJOBS, {
        variables: {
            user_id: auth?.user_id ? auth.user_id : 0,
            first: page,
        },
        onCompleted(data) {
            if (data) {
                getJobsVar(data.jobs);
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
                getActiveJobsVar(data.getActiveJobs);
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
                getIdleJobsVar(data.getIdleJobs);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
};