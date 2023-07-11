import { useParams } from "react-router-dom";
import { ITableJobs } from "../../Interfaces/ITableJobs";
import BackTable from "../BackTable";
import { TableJobStyle, TableHead, TableBoddy,TableJobContainer } from "./style";

const TableJob = ({jobs} : ITableJobs) => {
    const {status} = useParams();
    const active = status == 'active'? 1 : status == 'all'? 0 : 2;
    return (
        <TableJobContainer>
            <TableJobStyle>
                <BackTable titles={['Todos', 'Ativos', 'Inativos']} active={active}/>
                <TableHead>
                    <div>Nome</div>
                    <div>Status</div>
                    <div>Salário</div>
                </TableHead>
                {jobs.map((job: any, index: number) => (
                    <TableBoddy key={index}>
                        <div>{job.establishment}</div>
                        <div>{job.active? 'Ativo': 'Inativo'}</div>
                        <div>{parseFloat(job.wage).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </TableBoddy> 
                ))}
                
            </TableJobStyle>
        </TableJobContainer>
    );
}

export default TableJob;