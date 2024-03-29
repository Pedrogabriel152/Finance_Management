import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Paginate from "../../../Components/Paginate";
import TableAll from "../../../Components/TableAll";
import ModalLoading from "../../../Components/ModalLoading";
import NewButton from "../../../Components/NewButton";

// GraphQL
import { useGetActiveIncomes } from "../../../Graphql/Incomes/hooks";
import { useReactiveVar } from "@apollo/client";
import { getActiveIcomesVar } from "../../../Graphql/Incomes/state";

// Style
import { DataBodyStyle } from "../style";

// Toastify
import { toast } from "react-toastify";

// Interfaces
import { IPaginateInfo } from "../../../Interfaces/IPaginateInfo";
import { IFinanceTable } from "../../../Interfaces/IFinanceTable";

const ActiveIncomes = ({payInstallment}: IFinanceTable) => {
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
    }, [incomesActive]);

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

export default ActiveIncomes;