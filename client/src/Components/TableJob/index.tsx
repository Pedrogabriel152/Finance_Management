import BackTable from "../BackTable";
import { TableJobStyle, TableHead, TableBoddy } from "./style";

const TableJob = () => {
    return (
        <TableJobStyle>
            <BackTable titles={['Todos', 'Ativos', 'Inativos']} active={0}/>
            <TableHead>
                <div>Nome</div>
                <div>Status</div>
                <div>Salário</div>
            </TableHead>
            <TableBoddy>
                <div>ytas</div>
                <div>Ativo</div>
                <div>1200,00</div>
            </TableBoddy>
            <TableBoddy>
                <div>ytas</div>
                <div>Ativo</div>
                <div>1200,00</div>
            </TableBoddy>
            <TableBoddy>
                <div>Produzindo Certo</div>
                <div>Inativo</div>
                <div>1200,00</div>
            </TableBoddy>
            <TableBoddy>
                <div>ytas</div>
                <div>Inativo</div>
                <div>1200,00</div>
            </TableBoddy>
            <TableBoddy>
                <div>ytas</div>
                <div>Ativo</div>
                <div>1200,00</div>
            </TableBoddy>
            <TableBoddy>
                <div>KSI</div>
                <div>Ativo</div>
                <div>1200,00</div>
            </TableBoddy>
        </TableJobStyle>
    );
}

export default TableJob;