import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { getExpenseVar } from "../../../Graphql/Expense/state";
import { useGetExpenses } from "../../../Graphql/Expense/hooks";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";

// Style
import { DataBodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Components
import Paginate from "../../../Components/Paginate";
import ModalLoading from "../../../Components/ModalLoading";
import TableAll from "../../../Components/TableAll";
import NewButton from "../../../Components/NewButton";

const AllExpenses = () => {
    const { page } = useParams();
    const { loading, error } = useGetExpenses(parseInt(page? page : '1'));
    const allExpenses = useReactiveVar(getExpenseVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [expenses, setExpenses] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(allExpenses) {
            setPaginateInfo(allExpenses.paginatorInfo);
            setExpenses(allExpenses.data)
        } 
    }, [allExpenses]);

    if(error) {
        console.log(error)
        if(localStorage.getItem('@auth')){
            localStorage.removeItem('@auth');
        }
        navigate('/login');
        toast.error('Faça o login primeiro');
        
    }

    if(!paginateInfo || !expenses){
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="despesa"/>
            <TableAll data={expenses} text="income"/>
            <Paginate  
                lastPage={paginateInfo!.lastPage} 
            />
        </DataBodyStyle>
    );
}

export default AllExpenses;