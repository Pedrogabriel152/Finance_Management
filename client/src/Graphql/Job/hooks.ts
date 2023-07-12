import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GETFIVEJOBS, GETJOBS } from "./queries";
import { getFiveJobsVar, getJobsVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
import { setContext } from '@apollo/client/link/context';
import { IJob } from "../../Interfaces/IJob";
import { IPaginate } from "../../Interfaces/IPaginate";
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

    const { data } = useQuery<{ jobs: IPaginate }>(GETJOBS, {
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
   

    return data
};