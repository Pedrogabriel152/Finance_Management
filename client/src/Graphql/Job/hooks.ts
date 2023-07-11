import { useMutation, useQuery } from "@apollo/client";
import { GETFIVEJOBS, GETJOBS } from "./queries";
import { getFiveJobsVar, getJobsVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
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
        }
    });
};

export const useGetJobs = () => {
    const {getAuthentication} = useUserContext();
    const auth = getAuthentication();

    return useQuery<{jobs: IPaginate}>(GETJOBS, {
        variables: {
            user_id: auth?.user_id? auth.user_id : 0,
            first: 1
        },
        onCompleted(data) {
            if(data){
                console.log(data)
                getJobsVar(data.jobs);
            }
        }
    });
};