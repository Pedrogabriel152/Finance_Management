import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetIdleIcomes } from "../../../Graphql/Incomes/hooks";
import { getIdleIcomesVar } from "../../../Graphql/Incomes/state";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";
import { IFinanceTable } from "../../../Interfaces/IFinanceTable";

// Styled
import { DataBodyStyle } from "../style";

// Components
import ModalLoading from "../../../Components/ModalLoading";
import Paginate from "../../../Components/Paginate";
import TableAll from "../../../Components/TableAll";
import NewButton from "../../../Components/NewButton";

// Toastify
import { toast } from "react-toastify";

const InactiveIncomes = ({payInstallment}: IFinanceTable) => {
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
    }, [inactieIncomes]);

    if(error) {
        localStorage.removeItem('@auth');
        navigate('/login');
        toast.error('Faça o login primeiro');
    }

    if(loading) {
        return <DataBodyStyle> <ModalLoading/></DataBodyStyle>
    }

    if(!paginateInfo || !incomes){
        return <DataBodyStyle> 
            <NewButton path="income" text="Renda"/>
            <TableAll data={[]} text="income" payInstallment={payInstallment}/>
        </DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="income" text="Renda"/>
            <TableAll data={incomes.slice().sort((a:any, b:any) => a.expires.localeCompare(b.expires))} text="income" payInstallment={payInstallment}/>
            {paginateInfo.lastPage >= 2 && (
                <Paginate  
                    lastPage={paginateInfo.lastPage} 
                />
            )}
        </DataBodyStyle>
    );
}

export default InactiveIncomes;