import { Link, useParams } from "react-router-dom";

// Interface
import { ITableAll } from "../../Interfaces/ITableAll";

// Components
import BackTable from "../BackTable";

// Icons
import { BsFillCheckSquareFill } from "react-icons/bs";

// Styled
import { TableAllStyle, TableHead, TableBoddy,TableAllContainer } from "./style";
import { useUserContext } from "../../Context/UserContext";
import { formartDateBr, formatMoney } from "../../utils/formater";

const TableAll = ({data, text, payInstallment} : ITableAll) => {
    const {status} = useParams();
    const { getAuthentication } = useUserContext();
    const active = status == 'active'? 1 : status == 'all'? 0 : 2;
    const auth = getAuthentication();
    
    return (
        <TableAllContainer>
            <TableAllStyle>
                <BackTable titles={['Todos', 'Ativos', 'Inativos']} active={active}/>
                <TableHead>
                    <div>Nome</div>
                    <div>Vencimento</div>
                    <div>Parcela</div>
                    <div>#</div>
                </TableHead>
                {data.map((finance: any, index: number) => (
                    <TableBoddy key={index}>
                        <div><Link to={`/${text}/${finance.id}`}>{finance.establishment}</Link></div>
                        <div>{formartDateBr(finance.expires)}</div>
                        <div>{formatMoney(finance.value_installment)}</div>
                        <div onClick={() => payInstallment(finance.id, auth.user_id)}>{finance?.paid_expense || finance.received_income? '' :  <BsFillCheckSquareFill size={15} color="#1E781B"/> }</div>
                    </TableBoddy> 
                ))}
                
            </TableAllStyle>
        </TableAllContainer>
    );
}

export default TableAll;