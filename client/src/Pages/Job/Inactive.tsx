import { useReactiveVar } from "@apollo/client";
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import { useGetIdleJobs, useGetJobs } from "../../Graphql/Job/hooks";
import { JobBodyStyle } from "./style";
import { getIdleJobsVar, getJobsVar } from "../../Graphql/Job/state";
import { useEffect, useState } from "react";
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";
import { useNavigate, useParams } from "react-router-dom";
import ModalLoading from "../../Components/ModalLoading";
import { toast } from "react-toastify";

const InactiveJob = () => {
    const { page } = useParams();
    const { loading, error } = useGetIdleJobs(parseInt(page? page : '1'));
    const jobsIdlePaginate = useReactiveVar(getIdleJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [jobs, setJobs] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(jobsIdlePaginate) {
            setPaginateInfo(jobsIdlePaginate.paginatorInfo);
            setJobs(jobsIdlePaginate.data)
        }
        if(error) {
            console.log(error)
            localStorage.removeItem('@auth');
            navigate('/login');
            toast.error('Faça o login primeiro');
            return;
        }
    }, [jobsIdlePaginate]);

    if(!paginateInfo || !jobs){
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

export default InactiveJob;