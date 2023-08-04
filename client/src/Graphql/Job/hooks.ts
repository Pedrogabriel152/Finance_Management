// Graphql
import { useApolloClient, useMutation, useQuery } from "@apollo/client";

// Queries
import { CREATEJOB, GETACTIVEJOBS, GETFIVEJOBS, GETIDLEJOBS, GETJOB, GETJOBS, UPDATEJOB } from "./queries";

// Reactive Vars
import { createJobVar, getActiveJobsVar, getFiveJobsVar, getIdleJobsVar, getJobVar, getJobsVar, updateJobVar } from "./state";

// Context
import { useUserContext } from "../../Context/UserContext";

// Interfaces
import { IJob } from "../../Interfaces/IJob";
import { IPaginate } from "../../Interfaces/IPaginate";
import { IResponse } from "../../Interfaces/IResponse";

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

export const useCreateJob = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    return useMutation<{createJob: IResponse}>(CREATEJOB, {
        onCompleted(data) {
            if(data){
                createJobVar(data?.createJob)
            }
        },
        refetchQueries: [
            {query: GETFIVEJOBS, variables: {
                user_id: auth?.user_id? auth.user_id : 0
            }},
            {query: GETJOBS, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }},
            {query: GETACTIVEJOBS, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }},
            {query: GETIDLEJOBS, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }}
        ]
    })
}

export const useGetJob = (id: number, user_id: number) => {
    return useQuery<{ job: IJob }>(GETJOB, {
        variables: {
            user_id: user_id ? user_id : 0,
            id: id,
        },
        onCompleted(data) {
            if (data) {
                getJobVar(data.job);
            }
        },
        fetchPolicy: 'cache-and-network',
    });
}

export const useUpdateJob = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();
    return useMutation<{updateJob: IResponse}>(UPDATEJOB, {
        onCompleted(data) {
            if(data) {
                updateJobVar(data.updateJob);
            }
        },
        refetchQueries: [
            {query: GETFIVEJOBS, variables: {
                user_id: auth?.user_id? auth.user_id : 0
            }},
            {query: GETJOBS, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }},
            {query: GETACTIVEJOBS, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }},
            {query: GETIDLEJOBS, variables: {
                user_id: auth?.user_id ? auth.user_id : 0,
                first: 1
            }}
        ]
    })
}