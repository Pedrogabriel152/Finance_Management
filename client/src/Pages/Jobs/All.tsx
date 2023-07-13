import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import { useReactiveVar } from "@apollo/client";
import ModalLoading from "../../Components/ModalLoading";

// Styled
import { JobBodyStyle } from "./style";

// GraphQL
import { useGetJobs } from "../../Graphql/Job/hooks";
import { getJobsVar } from "../../Graphql/Job/state";

// Interface
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

// Toastify
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

    if(loading || !paginateInfo || !jobs){
        return <JobBodyStyle> <ModalLoading/></JobBodyStyle>
    }

    return (
        <JobBodyStyle>
            <TableJob data={jobs}/>
            <Paginate  
                lastPage={paginateInfo!.lastPage} 
            />
        </JobBodyStyle>
    );
}

export default AllJob;