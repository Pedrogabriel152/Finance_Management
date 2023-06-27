import React from "react";
import { ToggleMenuStyle } from "./style";
import { Link } from "react-router-dom";

const ToggleMenu = () => {
    return(
        <ToggleMenuStyle>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/jobs'}>Trabalhos</Link></li>
                <li><Link to={'/expense'}>Despesas</Link></li>
                <li><Link to={'/incomes'}>Rendas</Link></li>
                <li><Link to={'/profile'}>Perfil</Link></li>
                <li><button>Sair</button></li>
            </ul>
        </ToggleMenuStyle>
    );
}

export default ToggleMenu;