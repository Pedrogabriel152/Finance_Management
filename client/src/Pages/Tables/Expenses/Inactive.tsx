import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetIdleExpenses } from "../../../Graphql/Expense/hooks";
import { getIdleExpenseVar } from "../../../Graphql/Expense/state";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";

// Styled
import { DataBodyStyle } from "../style";

// Components
import ModalLoading from "../../../Components/ModalLoading";
import Paginate from "../../../Components/Paginate";
import TableAll from "../../../Components/TableAll";
import NewButton from "../../../Components/NewButton";

// Toastify
import { toast } from "react-toastify";

const InactiveExpenses = () => {
    const { page } = useParams();
    const { loading, error } = useGetIdleExpenses(parseInt(page? page : '1'));
    const inactiveExpenses = useReactiveVar(getIdleExpenseVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [expenses, setExpenses] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(inactiveExpenses) {
            setPaginateInfo(inactiveExpenses.paginatorInfo);
            setExpenses(inactiveExpenses.data)
        }
    }, [inactiveExpenses]);

    if(loading) {
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    if(error) {
        localStorage.removeItem('@auth');
        navigate('/login');
        toast.error('Faça o login primeiro');
        return;
    }

    if(!paginateInfo || !expenses){
        return <DataBodyStyle> 
            <NewButton path="expense" text="Despesa"/>
            <TableAll data={[]} text="expense"/>
        </DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="expense" text="Despesa"/>
            <TableAll data={expenses} text="expense"/>
            {paginateInfo.lastPage >= 2 && (
                <Paginate  
                    lastPage={paginateInfo.lastPage} 
                />
            )}
        </DataBodyStyle>
    );
}

export default InactiveExpenses;