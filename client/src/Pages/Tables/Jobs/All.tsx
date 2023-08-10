import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Paginate from "../../../Components/Paginate";
import TableJob from "../../../Components/TableJob";
import ModalLoading from "../../../Components/ModalLoading";
import NewButton from "../../../Components/NewButton";

// Styled
import { DataBodyStyle } from "../style";

// GraphQL
import { useGetJobs } from "../../../Graphql/Job/hooks";
import { getJobsVar } from "../../../Graphql/Job/state";
import { useReactiveVar } from "@apollo/client";

// Interface
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";

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
        if(localStorage.getItem('@auth')){
            localStorage.removeItem('@auth');
        }
        navigate('/login');
        toast.error('Faça o login primeiro');
        
    }

    if(loading){
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    if(!paginateInfo || !jobs){
        return <DataBodyStyle> 
            <NewButton path="job" text="Trabalho"/>
            <TableJob data={[]}/>
        </DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="job" text="Trabalho"/>
            <TableJob data={jobs}/>
            {paginateInfo.lastPage >= 2 && (
                <Paginate  
                    lastPage={paginateInfo.lastPage} 
                />
            )}
        </DataBodyStyle>
    );
}

export default AllJob;