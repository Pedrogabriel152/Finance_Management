import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBarStyle, MenuStyle } from "./style";
import Logo from "../../Assets/Images/image.png";

// Icons
import { FaBars, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ToggleMenu from "../ToggleMenu";
import { useUserContext } from "../../Context/UserContext";

const NavBar = () => {
    const [size, setSize] = useState<number>(500);
    const [viewModal, setViewModal] = useState<boolean>(false);
    const  { logout } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const size = window.screen.width;

        setSize(size);
    }, [size]);

    const handleToggleBar = () => {
        if(size < 530) {
            if(viewModal){
                return <FaAngleRight size={25} onClick={() => setViewModal(!viewModal)}/>
            }
            return <FaBars size={25} onClick={() => setViewModal(!viewModal)}/>
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return(
        <NavBarStyle>
            <Link to={'/'}><img src={Logo} alt="logo" /></Link>
            {handleToggleBar()}
            {viewModal && <ToggleMenu />}
            {size > 530 && (
                <MenuStyle>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/jobs/all/1'}>Trabalhos</Link></li>
                    <li><Link to={'/expenses/all/1'}>Despesas</Link></li>
                    <li><Link to={'/incomes/all/1'}>Rendas</Link></li>
                    <li><Link to={'/profile'}>Perfil</Link></li>
                    <li><button onClick={handleLogout}>Sair</button></li>
                </MenuStyle>
            )}
        </NavBarStyle>
    );
}

export default NavBar;