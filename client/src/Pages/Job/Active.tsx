import { useReactiveVar } from "@apollo/client";
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import { useGetActiveJobs } from "../../Graphql/Job/hooks";
import { JobBodyStyle } from "./style";
import { getActiveJobsVar } from "../../Graphql/Job/state";
import { useEffect, useState } from "react";
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";
import { useNavigate, useParams } from "react-router-dom";
import ModalLoading from "../../Components/ModalLoading";
import { toast } from "react-toastify";

const ActiveJob = () => {
    const { page } = useParams();
    const { loading, error } =  useGetActiveJobs(parseInt(page? page : '1'));
    const jobsActivePaginate = useReactiveVar(getActiveJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [jobs, setJobs] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(jobsActivePaginate) {
            setPaginateInfo(jobsActivePaginate.paginatorInfo);
            setJobs(jobsActivePaginate.data)
        }
        if(error) {
            if(localStorage.getItem('@auth')){
                localStorage.removeItem('@auth');
            }
            navigate('/login');
            toast.error('Faça o login primeiro');
            return;
        }
    }, [jobsActivePaginate]);

    if(!paginateInfo || !jobs  ){
        return <JobBodyStyle> <ModalLoading/></JobBodyStyle>
    }

    return (
        <JobBodyStyle>
            <TableJob jobs={jobs}/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </JobBodyStyle>
    );
}

export default ActiveJob;