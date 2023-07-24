import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// GraphQL
import { useReactiveVar } from "@apollo/client";
import { useGetIncomes } from "../../../Graphql/Incomes/hooks";
import { getIcomesVar } from "../../../Graphql/Incomes/state";

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

const AllIncomes = () => {
    const { page } = useParams();
    const { loading, error } = useGetIncomes(parseInt(page? page : '1'));
    const allIncomes = useReactiveVar(getIcomesVar);
    const [paginateInfo, setPaginateInfo] = useState<IPaginateInfo | null>(null);
    const [incomes, setIncomes] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(allIncomes) {
            setPaginateInfo(allIncomes.paginatorInfo);
            setIncomes(allIncomes.data)
        }
    }, [allIncomes]);

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
            <TableAll data={[]} text="income"/>
        </DataBodyStyle>
    }

    return (
        <DataBodyStyle>
            <NewButton path="income" text="Renda"/>
            <TableAll data={incomes} text="income"/>
            {paginateInfo.lastPage >= 2 && (
                <Paginate  
                    lastPage={paginateInfo.lastPage} 
                />
            )}
        </DataBodyStyle>
    );
}

export default AllIncomes;