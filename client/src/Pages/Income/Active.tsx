import { useNavigate, useParams } from "react-router-dom";

// Components
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import ModalLoading from "../../Components/ModalLoading";

// GraphQL
import { useGetActiveJobs } from "../../Graphql/Job/hooks";
import { useReactiveVar } from "@apollo/client";
import { getActiveIcomesVar } from "../../Graphql/Incomes/state";
import { useEffect, useState } from "react";

// Style
import { IncomeBodyStyle } from "./style";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

const ActiveJob = () => {
    const { page } = useParams();
    const { loading, error } =  useGetActiveJobs(parseInt(page? page : '1'));
    const incomesActive = useReactiveVar(getActiveIcomesVar);
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
        return <IncomeBodyStyle><ModalLoading/></IncomeBodyStyle>
    }

    return (
        <IncomeBodyStyle>
            <TableJob data={incomes}/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </IncomeBodyStyle>
    );
}

export default ActiveJob;