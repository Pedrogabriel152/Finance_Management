import { useReactiveVar } from "@apollo/client";
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import { useGetJobs } from "../../Graphql/Job/hooks";
import { JobBodyStyle } from "./style";
import { getJobsVar } from "../../Graphql/Job/state";
import { useEffect, useState } from "react";
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";
import { useNavigate, useParams } from "react-router-dom";
import ModalLoading from "../../Components/ModalLoading";
import { toast } from "react-toastify";

const AllJob = () => {
    const { page } = useParams();
    const { loading, error } = useGetJobs(parseInt(page? page : '1'));
    const jobsPaginate = useReactiveVar(getJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [jobs, setJobs] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(jobsPaginate) {
            setPaginateInfo(jobsPaginate.paginatorInfo);
            setJobs(jobsPaginate.data)
        }

        
    }, [jobsPaginate]);

    if(error) {
        console.log(error)
        if(localStorage.getItem('@auth')){
            localStorage.removeItem('@auth');
        }
        navigate('/login');
        toast.error('Faça o login primeiro');
        
    }

    if(!paginateInfo || !jobs){
        return <JobBodyStyle> <ModalLoading/></JobBodyStyle>
    }

    return (
        <JobBodyStyle>
            <TableJob jobs={jobs}/>
            <Paginate  
                lastPage={paginateInfo!.lastPage} 
            />
        </JobBodyStyle>
    );
}

export default AllJob;