import { useNavigate, useParams } from "react-router-dom";

// Components
import Paginate from "../../../Components/Paginate";
import TableAll from "../../../Components/TableAll";
import ModalLoading from "../../../Components/ModalLoading";

// GraphQL
import { useGetActiveIncomes } from "../../../Graphql/Incomes/hooks";
import { useReactiveVar } from "@apollo/client";
import { getActiveIcomesVar } from "../../../Graphql/Incomes/state";
import { useEffect, useState } from "react";

// Style
import { DataBodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";
import NewButton from "../../../Components/NewButton";

const ActiveIncomes = () => {
    const { page } = useParams();
    const { loading, error } =  useGetActiveIncomes(parseInt(page? page : '1'));
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
        return <DataBodyStyle><ModalLoading/></DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="renda"/>
            <TableAll data={incomes} text="income"/>
            <Paginate  
                lastPage={paginateInfo.lastPage} 
            />
        </DataBodyStyle>
    );
}

export default ActiveIncomes;