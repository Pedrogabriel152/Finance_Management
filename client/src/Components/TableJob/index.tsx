import { Link, useParams } from "react-router-dom";

// Interface
import { ITableJobs } from "../../Interfaces/ITableJobs";

// Components
import BackTable from "../BackTable";

// Styled
import { TableJobStyle, TableHead, TableBoddy,TableJobContainer } from "./style";
import { formartDateBr, formatMoney } from "../../utils/formater";

const TableJob = ({data} : ITableJobs) => {
    const {status} = useParams();
    const active = status == 'active'? 1 : status == 'all'? 0 : 2;
    return (
        <TableJobContainer>
            <TableJobStyle>
                <BackTable titles={['Todos', 'Ativos', 'Inativos']} active={active}/>
                <TableHead>
                    <div>Nome</div>
                    <div>Status</div>
                    <div id="date">Início</div>
                    <div>Salário</div>
                </TableHead>
                {data.map((job: any, index: number) => (
                    <TableBoddy key={index}>
                        <div><Link to={`/job/${job.id}`}>{job.establishment}</Link></div>
                        <div>{job.active? 'Ativo': 'Inativo'}</div>
                        {job.started && (
                            <div id="date">{formartDateBr(job.started)}</div>
                        )}
                        <div>{formatMoney(job.wage)}</div>
                    </TableBoddy> 
                ))}
                
            </TableJobStyle>
        </TableJobContainer>
    );
}

export default TableJob;