import BackTable from "../BackTable";
import { TableJobStyle } from "./style";

const TableJob = () => {
    return (
        <TableJobStyle>
            <div>
                <BackTable titles={['Todos', 'Ativos', 'Inativos']}/>
                <table>
                    <th>
                        <td>Estabelecimento</td>
                        <td>Início</td>
                        <td>Termino</td>
                        <td>Salário</td>
                    </th>
                    <tr>
                        <td>ytas</td>
                    </tr>
                </table>
            </div>
        </TableJobStyle>
    );
}

export default TableJob;