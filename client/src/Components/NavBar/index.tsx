import { useEffect, useState } from "react";
import { NavBarStyle } from "./style";
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
        </NavBarStyle>
    );
}

export default NavBar;