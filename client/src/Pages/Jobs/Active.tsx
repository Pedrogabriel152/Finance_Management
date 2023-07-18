import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import ModalLoading from "../../Components/ModalLoading";
import { useReactiveVar } from "@apollo/client";
import NewButton from "../../Components/NewButton";

// GraphQL
import { useGetActiveJobs } from "../../Graphql/Job/hooks";
import { getActiveJobsVar } from "../../Graphql/Job/state";
import { JobBodyStyle } from "./style";

// Interfaces
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

// Toastify
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

    if(loading || !paginateInfo || !jobs  ){
        return <JobBodyStyle> <ModalLoading/></JobBodyStyle>
    }

    return (
        <JobBodyStyle>
            <NewButton path="job"/>
            <TableJob data={jobs}/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </JobBodyStyle>
    );
}

export default ActiveJob;