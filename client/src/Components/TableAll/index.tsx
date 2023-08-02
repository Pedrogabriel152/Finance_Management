import { Link, useParams } from "react-router-dom";

// Interface
import { ITableAll } from "../../Interfaces/ITableAll";

// Components
import BackTable from "../BackTable";

// Styled
import { TableAllStyle, TableHead, TableBoddy,TableAllContainer } from "./style";

const TableAll = ({data, text} : ITableAll) => {
    const {status} = useParams();
    const active = status == 'active'? 1 : status == 'all'? 0 : 2;
    
    return (
        <TableAllContainer>
            <TableAllStyle>
                <BackTable titles={['Todos', 'Ativos', 'Inativos']} active={active}/>
                <TableHead>
                    <div>Nome</div>
                    <div>Status</div>
                    <div>Parcela</div>
                </TableHead>
                {data.map((finance: any, index: number) => (
                    <TableBoddy key={index}>
                        <div><Link to={`/${text}/${finance.id}`}>{finance.establishment}</Link></div>
                        <div>{finance.received_income || finance.paid_expense? 'Inativo' : 'Ativo'}</div>
                        <div>{parseFloat(finance.value_installment).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </TableBoddy> 
                ))}
                
            </TableAllStyle>
        </TableAllContainer>
    );
}

export default TableAll;