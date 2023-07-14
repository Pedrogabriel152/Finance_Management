import React from "react";
import { ToggleMenuStyle } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";

const ToggleMenu = () => {
    const  { logout } = useUserContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <ToggleMenuStyle>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/jobs/all/1'}>Trabalhos</Link></li>
                <li><Link to={'/expenses/all/1'}>Despesas</Link></li>
                <li><Link to={'/incomes/all/1'}>Rendas</Link></li>
                <li><Link to={'/profile'}>Perfil</Link></li>
                <li><button onClick={handleLogout}>Sair</button></li>
            </ul>
        </ToggleMenuStyle>
    );
}

export default ToggleMenu;