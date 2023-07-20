import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetIdleIcomes } from "../../../Graphql/Incomes/hooks";
import { getIdleIcomesVar } from "../../../Graphql/Incomes/state";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";

// Styled
import { DataBodyStyle } from "../style";

// Components
import ModalLoading from "../../../Components/ModalLoading";
import Paginate from "../../../Components/Paginate";
import TableAll from "../../../Components/TableAll";

// Toastify
import { toast } from "react-toastify";
import NewButton from "../../../Components/NewButton";

const InactiveIncomes = () => {
    const { page } = useParams();
    const { loading, error } = useGetIdleIcomes(parseInt(page? page : '1'));
    const inactieIncomes = useReactiveVar(getIdleIcomesVar);
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

    if(loading) {
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    if(!paginateInfo || !incomes){
        return <DataBodyStyle> <TableAll data={[]} text="income"/></DataBodyStyle>
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

export default InactiveIncomes;