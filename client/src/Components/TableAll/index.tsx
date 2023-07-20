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
                {data.map((job: any, index: number) => (
                    <TableBoddy key={index}>
                        <div><Link to={`/${text}/${job.id}`}>{job.establishment}</Link></div>
                        <div>{job.active? 'Inativo' : 'Ativo'}</div>
                        <div>{parseFloat(job.value_installment).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </TableBoddy> 
                ))}
                
            </TableAllStyle>
        </TableAllContainer>
    );
}

export default TableAll;