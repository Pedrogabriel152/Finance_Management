import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Paginate from "../../../Components/Paginate";
import TableAll from "../../../Components/TableAll";
import ModalLoading from "../../../Components/ModalLoading";
import NewButton from "../../../Components/NewButton";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetActiveExpenses } from "../../../Graphql/Expense/hooks";
import { getActiveExpenseVar } from "../../../Graphql/Expense/state";

// Style
import { DataBodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";

const ActiveExpenses = () => {
    const { page } = useParams();
    const { loading, error } =  useGetActiveExpenses(parseInt(page? page : '1'));
    const expensesActive = useReactiveVar(getActiveExpenseVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [expenses, setExpenses] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(expensesActive) {
            setPaginateInfo(expensesActive.paginatorInfo);
            setExpenses(expensesActive.data)
            console.log(expensesActive.data)
        }
        if(error) {
            if(localStorage.getItem('@auth')){
                localStorage.removeItem('@auth');
            }
            navigate('/login');
            toast.error('Faça o login primeiro');
            return;
        }
    }, [expensesActive]);

    if(!paginateInfo || !expenses  ){
        return <DataBodyStyle><ModalLoading/></DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="renda"/>
            <TableAll data={expenses} text="income"/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </DataBodyStyle>
    );
}

export default ActiveExpenses;