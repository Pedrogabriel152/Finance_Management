import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetJobs } from "../../Graphql/Job/hooks";
import { getJobsVar } from "../../Graphql/Job/state";

// Interfaces
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

// Style
import { JobBodyStyle } from "./style";

// Toastify
import { toast } from "react-toastify";

// Components
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import ModalLoading from "../../Components/ModalLoading";

const AllJob = () => {
    const { page } = useParams();
    const { loading, error } = useGetJobs(parseInt(page? page : '1'));
    const allIncomes = useReactiveVar(getJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [incomes, setIncomes] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(allIncomes) {
            setPaginateInfo(allIncomes.paginatorInfo);
            setIncomes(allIncomes.data)
        }

        
    }, [allIncomes]);

    if(error) {
        console.log(error)
        if(localStorage.getItem('@auth')){
            localStorage.removeItem('@auth');
        }
        navigate('/login');
        toast.error('Faça o login primeiro');
        
    }

    if(!paginateInfo || !incomes){
        return <JobBodyStyle> <ModalLoading/></JobBodyStyle>
    }

    return (
        <JobBodyStyle>
            <TableJob data={incomes}/>
            <Paginate  
                lastPage={paginateInfo!.lastPage} 
            />
        </JobBodyStyle>
    );
}

export default AllJob;