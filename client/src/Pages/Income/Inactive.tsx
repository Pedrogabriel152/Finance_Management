import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetIdleJobs, useGetJobs } from "../../Graphql/Job/hooks";
import { getIdleJobsVar, getJobsVar } from "../../Graphql/Job/state";

// Interfaces
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

// Styled
import { JobBodyStyle } from "./style";

// Components
import ModalLoading from "../../Components/ModalLoading";
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";

// Toastify
import { toast } from "react-toastify";

const InactiveJob = () => {
    const { page } = useParams();
    const { loading, error } = useGetIdleJobs(parseInt(page? page : '1'));
    const inactieIncomes = useReactiveVar(getIdleJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [incomes, setIncomes] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(inactieIncomes) {
            setPaginateInfo(inactieIncomes.paginatorInfo);
            setIncomes(inactieIncomes.data)
        }
        if(error) {
            console.log(error)
            localStorage.removeItem('@auth');
            navigate('/login');
            toast.error('Faça o login primeiro');
            return;
        }
    }, [inactieIncomes]);

    if(!paginateInfo || !incomes){
        return <JobBodyStyle> <ModalLoading/></JobBodyStyle>
    }

    return (
        <JobBodyStyle>
            <TableJob data={incomes}/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </JobBodyStyle>
    );
}

export default InactiveJob;