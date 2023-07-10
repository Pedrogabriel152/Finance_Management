import BackTable from "../BackTable";
import { TableJobStyle } from "./style";

const TableJob = () => {
    return (
        <TableJobStyle>
            <BackTable titles={['Todos', 'Ativos', 'Inativos']} active={0}/>
            <table>
                <th>
                    <td>Estabelecimento</td>
                    <td>Início</td>
                    <td>Termino</td>
                    <td>Salário</td>
                </th>
                <tr>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                </tr>
                <tr>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                </tr>
                <tr>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                </tr>
                <tr>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                </tr>
                <tr>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                </tr>
                <tr>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                    <td>ytas</td>
                </tr>
            </table>
        </TableJobStyle>
    );
}

export default TableJob;