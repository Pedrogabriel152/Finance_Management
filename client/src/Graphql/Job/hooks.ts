import { useMutation, useQuery } from "@apollo/client";
import { GETFIVEJOBS } from "./queries";
import { getFiveJobsVar } from "./state";
import { useUserContext } from "../../Context/UserContext";
import { IJob } from "../../Interfaces/IJob";


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