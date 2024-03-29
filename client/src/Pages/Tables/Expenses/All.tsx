import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { getExpensesVar } from "../../../Graphql/Expense/state";
import { useGetExpenses } from "../../../Graphql/Expense/hooks";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";
import { IFinanceTable } from "../../../Interfaces/IFinanceTable";

// Style
import { DataBodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Components
import Paginate from "../../../Components/Paginate";
import ModalLoading from "../../../Components/ModalLoading";
import TableAll from "../../../Components/TableAll";
import NewButton from "../../../Components/NewButton";

const AllExpenses = ({payInstallment}: IFinanceTable) => {
    const { page } = useParams();
    const { loading, error } = useGetExpenses(parseInt(page? page : '1'));
    const allExpenses = useReactiveVar(getExpensesVar);
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
        if(localStorage.getItem('@auth')){
            localStorage.removeItem('@auth');
        }
        navigate('/login');
        toast.error('Faça o login primeiro');
    }

    if(loading) {
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    if(!paginateInfo || !expenses){
        return <DataBodyStyle> 
            <NewButton path="expense" text="Despesa"/>
            <TableAll data={[]} text="expense" payInstallment={payInstallment}/>
        </DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="expense" text="Despesa"/>
            <TableAll data={expenses.slice().sort((a:any, b:any) => a.expires.localeCompare(b.expires))} text="expense" payInstallment={payInstallment}/>
            {paginateInfo.lastPage >= 2 && (
                <Paginate  
                    lastPage={paginateInfo.lastPage} 
                />
            )}
        </DataBodyStyle>
    );
}

export default AllExpenses;