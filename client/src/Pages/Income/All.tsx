import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetIncomes } from "../../Graphql/Incomes/hooks";
import { getIcomesVar } from "../../Graphql/Incomes/state";

// Interfaces
import { IPaginateInfo } from "../../Interfaces/IPaginateInfo";

// Style
import { IncomeBodyStyle } from "./style";

// Toastify
import { toast } from "react-toastify";

// Components
import Paginate from "../../Components/Paginate";
import TableJob from "../../Components/TableJob";
import ModalLoading from "../../Components/ModalLoading";
import TableAll from "../../Components/TableAll";

const AllJob = () => {
    const { page } = useParams();
    const { loading, error } = useGetIncomes(parseInt(page? page : '1'));
    const allIncomes = useReactiveVar(getIcomesVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [incomes, setIncomes] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(allIncomes)
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
        return <IncomeBodyStyle> <ModalLoading/></IncomeBodyStyle>
    }

    return (
        <IncomeBodyStyle>
            <TableAll data={incomes} text="income"/>
            <Paginate  
                lastPage={paginateInfo!.lastPage} 
            />
        </IncomeBodyStyle>
    );
}

export default AllJob;