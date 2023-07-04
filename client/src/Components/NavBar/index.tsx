import { useEffect, useState } from "react";
import { NavBarStyle, MenuStyle } from "./style";
import Logo from "../../Assets/Images/image.png";

// Icons
import { FaBars, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ToggleMenu from "../ToggleMenu";

const NavBar = () => {
    const [size, setSize] = useState<number>(500);
    const [viewModal, setViewModal] = useState<boolean>(false);

    useEffect(() => {
        const size = window.screen.width;

        setSize(size);
    }, [size]);

    const handleToggleBar = () => {
        if(size < 501) {
            if(viewModal){
                return <FaAngleRight size={25} onClick={() => setViewModal(!viewModal)}/>
            }
            return <FaBars size={25} onClick={() => setViewModal(!viewModal)}/>
        }
    }

    return(
        <NavBarStyle>
            <Link to={'/'}><img src={Logo} alt="logo" /></Link>
            {handleToggleBar()}
            {viewModal && <ToggleMenu />}
            {size > 501 && (
                <MenuStyle>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/jobs'}>Trabalhos</Link></li>
                    <li><Link to={'/expense'}>Despesas</Link></li>
                    <li><Link to={'/incomes'}>Rendas</Link></li>
                    <li><Link to={'/profile'}>Perfil</Link></li>
                    <li><button>Sair</button></li>
                </MenuStyle>
            )}
        </NavBarStyle>
    );
}

export default NavBar;