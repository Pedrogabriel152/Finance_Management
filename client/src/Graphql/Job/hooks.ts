import { createHttpLink, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { GETFIVEJOBS, GETJOBS } from "./queries";
import { getFiveJobsVar, getJobsVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
import { setContext } from '@apollo/client/link/context';
import { IJob } from "../../Interfaces/IJob";
import { IPaginate } from "../../Interfaces/IPaginate";

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

    const updateLink = (newUrl: any) => {
    const httpLink = createHttpLink({ uri: newUrl });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          'Authorization': `Bearer ${auth.token}`,
        },
      };
    });

    const link = authLink.concat(httpLink);
        client.setLink(link);
    };

    updateLink(`http://localhost/graphql?page=${page}`);

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