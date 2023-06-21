import React from "react";
import LogoImg from "../../Assets/Images/image.png";
import { LogoComponent } from "./style";

const Logo = () => {
    return (
        <LogoComponent src={LogoImg} alt="logo"/>
    );
}

export default Logo;