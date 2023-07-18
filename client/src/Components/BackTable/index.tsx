import { useLocation, useNavigate } from "react-router-dom";

// Styled
import { Titles } from "./style";

// Interfaces
import { IBackTable } from "../../Interfaces/IBackTable";

const BackTable = ({titles, active}: IBackTable) => {
    const navigate = useNavigate();
    const route = ['all', 'active', 'inactive'];
    const location = useLocation();

    const handleClick = (index: number) => {
        const atualLocation = location.pathname.split('/')
        navigate(`/${atualLocation[1]}/${route[index]}/1`);
    }

    return (
        <Titles>
            {titles.map((title, index) => (
                <div key={index} id={index == active? "active" : ''} onClick={() => handleClick(index)}>{title}</div>
            ))} 
        </Titles>
    );
}

export default BackTable;