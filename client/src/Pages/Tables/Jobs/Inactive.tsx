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
import { useGetIdleJobs } from "../../../Graphql/Job/hooks";
import { getIdleJobsVar } from "../../../Graphql/Job/state";
import { useReactiveVar } from "@apollo/client";

// Interface
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";

// Toastify
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

    if(loading || !paginateInfo || !jobs){
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="job"/>
            <TableJob data={jobs}/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </DataBodyStyle>
    );
}

export default InactiveJob;