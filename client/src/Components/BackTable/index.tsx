import { IBackTable } from "../../Interfaces/IBackTable";
import { Titles } from "./style";

const BackTable = ({titles, active}: IBackTable) => {
    return (
        <Titles>
            {titles.map((title, index) => (
                <div key={index} id={index == active? "active" : ''}>{title}</div>
            ))} 
        </Titles>
    );
}

export default BackTable;