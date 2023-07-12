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
    const incomesActive = useReactiveVar(getActiveJobsVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [incomes, setIncomes] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(incomesActive) {
            setPaginateInfo(incomesActive.paginatorInfo);
            setIncomes(incomesActive.data)
        }
        if(error) {
            if(localStorage.getItem('@auth')){
                localStorage.removeItem('@auth');
            }
            navigate('/login');
            toast.error('Faça o login primeiro');
            return;
        }
    }, [incomesActive]);

    if(!paginateInfo || !incomes  ){
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

export default ActiveJob;